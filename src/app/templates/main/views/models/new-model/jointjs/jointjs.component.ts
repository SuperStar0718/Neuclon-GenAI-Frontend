import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { dia, ui, shapes, setTheme, linkTools } from "@clientio/rappid";
import { anchorNamespace } from "./anchors";
import { routerNamespace } from "./routers";
import { TableHighlighter } from "./highlighters";
import { Table, Link } from "./shapes";

@Component({
  selector: "app-jointjs",
  templateUrl: "./jointjs.component.html",
  styleUrls: ["./jointjs.component.scss"],
})
export class JointjsComponent implements OnInit, AfterViewInit {
  @ViewChild("canvas") canvas: ElementRef;
  @ViewChild("app") app: ElementRef;

  private graph: dia.Graph;
  private paper: dia.Paper;
  private scroller: ui.PaperScroller;

  ngOnInit(): void {
    setTheme("my-theme");

    const graph = new dia.Graph({}, { cellNamespace: shapes });
    this.graph = graph;

    const paper = new dia.Paper({
      model: graph,
      width: 1000,
      height: 800,
      gridSize: 20,
      interactive: true,
      defaultConnector: { name: "rounded" },
      async: true,
      frozen: true,
      sorting: dia.Paper.sorting.APPROX,
      cellViewNamespace: shapes,
      routerNamespace: routerNamespace,
      defaultRouter: { name: "customRouter" },
      anchorNamespace: anchorNamespace,
      defaultAnchor: { name: "customAnchor" },
      snapLinks: true,
      linkPinning: false,
      magnetThreshold: "onleave",
      highlighting: {
        connecting: {
          name: "addClass",
          options: {
            className: "column-connected",
          },
        },
      },
      defaultLink: () => new Link(),
      validateConnection: function (srcView, srcMagnet, tgtView, tgtMagnet) {
        return srcMagnet !== tgtMagnet;
      },
    });

    this.paper = paper;
    paper.scale(0.8);

    const scroller = new ui.PaperScroller({
      paper,
      cursor: "grab",
      baseWidth: 100,
      baseHeight: 100,
      inertia: { friction: 0.8 },
      autoResizePaper: true,
      contentOptions: function () {
        return {
          useModelGeometry: true,
          allowNewOrigin: "any",
          padding: 30,
          allowNegativeBottomRight: true,
        };
      },
    });

    this.scroller = scroller;
    scroller.render().center();

    const users = new Table()
      .setName("Bigquery")
      // .setTabColor('#6495ED')
      .position(170, 220)
      .setColumns([
        { name: "id", type: "int", key: true },
        { name: "full_name", type: "varchar" },
        { name: "created_at", type: "datetime" },
        { name: "country_code", type: "int" },
      ])
      .addTo(graph);

    const orders = new Table()
      .setName("Clickhouse")
      // .setTabColor('#008B8B')
      .position(570, 140)
      .setColumns([
        { name: "user_id", type: "int", key: true },
        { name: "status", type: "varchar" },
        { name: "product_id", type: "int" },
        { name: "created_at", type: "datetime" },
      ])
      .addTo(graph);

    const countries = new Table()
      .setName("firestore")
      // .setTabColor('#CD5C5C')
      .position(170, 540)
      .setColumns([
        { name: "code", type: "int", key: true },
        { name: "name", type: "varchar" },
      ])
      .addTo(graph);

    const products = new Table()
      .setName("cosmosdb")
      // .setTabColor('#FFD700')
      .position(570, 440)
      .setColumns([
        { name: "id", type: "int", key: true },
        { name: "name", type: "varchar" },
        { name: "price", type: "int" },
        { name: "status", type: "varchar" },
        { name: "created_at", type: "datetime" },
      ])
      .addTo(graph);

    const links = [
      new Link({
        source: { id: users.id, port: "id" },
        target: { id: orders.id, port: "user_id" },
      }),
      new Link({
        source: { id: users.id, port: "country_code" },
        target: { id: countries.id, port: "code" },
      }),
      new Link({
        source: { id: orders.id, port: "product_id" },
        target: { id: products.id, port: "id" },
      }),
    ];

    links.forEach((link) => {
      link.addTo(graph);
    });

    // Register events
    paper.on("link:mouseenter", (linkView: dia.LinkView) => {
      showLinkTools(linkView);
    });

    paper.on("link:mouseleave", (linkView: dia.LinkView) => {
      linkView.removeTools();
    });

    paper.on("blank:pointerdown", (evt: dia.Event) =>
      scroller.startPanning(evt)
    );

    paper.on(
      "blank:mousewheel",
      (evt: dia.Event, ox: number, oy: number, delta: number) => {
        evt.preventDefault();
        zoom(ox, oy, delta);
      }
    );
    paper.on(
      "cell:mousewheel",
      (_, evt: dia.Event, ox: number, oy: number, delta: number) => {
        evt.preventDefault();
        zoom(ox, oy, delta);
      }
    );
    function zoom(x: number, y: number, delta: number) {
      scroller.zoom(delta * 0.1, { min: 0.1, max: 1, grid: 0.1, ox: x, oy: y });
    }

    paper.on("element:pointerclick", (elementView: dia.ElementView) => {
      editTable(elementView, this.app);
    });

    paper.on(
      "blank:pointerdblclick",
      (evt: dia.Event, x: number, y: number) => {
        const table = new Table();
        table.position(x, y);
        table.setColumns([
          {
            name: "id",
            type: "int",
          },
        ]);
        table.addTo(graph);
        editTable(table.findView(paper) as dia.ElementView, this.app);
      }
    );

    paper.unfreeze();

    // Actions
    function showLinkTools(linkView: dia.LinkView) {
      const tools = new dia.ToolsView({
        tools: [
          new linkTools.Remove({
            distance: "50%",
            markup: [
              {
                tagName: "circle",
                selector: "button",
                attributes: {
                  r: 7,
                  fill: "#f6f6f6",
                  stroke: "#ff5148",
                  "stroke-width": 2,
                  cursor: "pointer",
                },
              },
              {
                tagName: "path",
                selector: "icon",
                attributes: {
                  d: "M -3 -3 3 3 M -3 3 3 -3",
                  fill: "none",
                  stroke: "#ff5148",
                  "stroke-width": 2,
                  "pointer-events": "none",
                },
              },
            ],
          }),
          new linkTools.SourceArrowhead(),
          new linkTools.TargetArrowhead(),
        ],
      });
      linkView.addTools(tools);
    }

    function editTable(tableView: dia.ElementView, appEl: ElementRef) {
      const HIGHLIGHTER_ID = "table-selected";
      const table = tableView.model as Table;
      const tableName = table.getName();
      if (TableHighlighter.get(tableView, HIGHLIGHTER_ID)) return;

      TableHighlighter.add(tableView, "root", HIGHLIGHTER_ID);

      const inspector = new ui.Inspector({
        cell: table,
        theme: "default",
        inputs: {
          "attrs/tabColor/fill": {
            label: "Color",
            type: "color",
          },
          "attrs/headerLabel/text": {
            label: "Name",
            type: "text",
          },
          columns: {
            label: "Columns",
            type: "list",
            addButtonLabel: "Add Column",
            removeButtonLabel: "Remove Column",
            item: {
              type: "object",
              properties: {
                name: {
                  label: "Name",
                  type: "text",
                },
                type: {
                  label: "Type",
                  type: "select",
                  options: [
                    "char",
                    "varchar",
                    "int",
                    "datetime",
                    "timestamp",
                    "boolean",
                    "enum",
                    "uniqueidentifier",
                  ],
                },
                key: {
                  label: "Key",
                  type: "toggle",
                },
              },
            },
          },
        },
      });

      inspector.render();
      inspector.el.style.position = "relative";

      const dialog = new ui.Dialog({
        theme: "default",
        modal: false,
        draggable: true,
        closeButton: false,
        width: 300,
        title: tableName || "New Table*",
        content: inspector.el,
        buttons: [
          {
            content: "Remove",
            action: "remove",
            position: "left",
          },
          {
            content: "Close",
            action: "close",
          },
        ],
      });

      dialog.open(appEl.nativeElement);

      const dialogTitleBar = dialog.el.querySelector(
        ".titlebar"
      ) as HTMLDivElement;
      const dialogTitleTab = document.createElement("div");
      dialogTitleTab.style.background = table.getTabColor();
      dialogTitleTab.setAttribute("class", "titletab");
      dialogTitleBar.appendChild(dialogTitleTab);

      inspector.on("change:attrs/tabColor/fill", () => {
        dialogTitleTab.style.background = table.getTabColor();
      });
      inspector.on("change:attrs/headerLabel/text", () => {
        dialogTitleBar.textContent = table.getName();
      });

      dialog.on("action:close", () => {
        inspector.remove();
        TableHighlighter.remove(tableView, HIGHLIGHTER_ID);
      });
      dialog.on("action:remove", () => {
        dialog.close();
        table.remove();
      });

      if (!tableName) {
        const inputEl = inspector.el.querySelector(
          'input[data-attribute="attrs/headerLabel/text"]'
        ) as HTMLInputElement;
        inputEl.focus();
      }
    }
  }

  ngAfterViewInit(): void {
    const { scroller, paper, canvas } = this;
    canvas.nativeElement.appendChild(this.scroller.el);
    scroller.center();
    paper.unfreeze();
  }
}
