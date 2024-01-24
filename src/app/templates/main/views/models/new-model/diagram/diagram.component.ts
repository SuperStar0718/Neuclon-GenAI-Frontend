import { AfterViewInit, Component, Input } from "@angular/core";
import * as go from "gojs";

const $ = go.GraphObject.make;
const initJson = ``;

@Component({
  selector: "app-diagram",
  templateUrl: "./diagram.component.html",
  styleUrls: ["./diagram.component.scss"],
})
export class DiagramComponent implements AfterViewInit {
  @Input() model!: go.Model;

  public diagram!: go.Diagram;
  public myPalette!: go.Palette;
  public initJson = initJson;

  ngAfterViewInit(): void {
    this.init();
  }

  init() {
    // Since 2.2 you can also author concise templates with method chaining instead of GraphObject.make
    // For details, see https://gojs.net/latest/intro/buildingObjects.html
    const $ = go.GraphObject.make; // for conciseness in defining templates
    const showSmallPorts = this.showSmallPorts.bind(this);
    this.diagram = new go.Diagram(
      "myDiagramDiv", // must name or refer to the DIV HTML element
      {
        grid: $(
          go.Panel,
          "Grid",
          $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0 }),
          $(go.Shape, "LineH", {
            stroke: "gray",
            strokeWidth: 0,
            interval: 10,
          }),
          $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0 }),
          $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0, interval: 10 })
        ),
        "draggingTool.dragsLink": false,
        "draggingTool.isGridSnapEnabled": true,
        "linkingTool.isUnconnectedLinkValid": false,
        "linkingTool.portGravity": 20,
        "relinkingTool.isUnconnectedLinkValid": false,
        "relinkingTool.portGravity": 20,
        "relinkingTool.fromHandleArchetype": $(go.Shape, "Diamond", {
          segmentIndex: 0,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "tomato",
          stroke: "darkred",
        }),
        "relinkingTool.toHandleArchetype": $(go.Shape, "Diamond", {
          segmentIndex: -1,
          cursor: "pointer",
          desiredSize: new go.Size(8, 8),
          fill: "darkred",
          stroke: "tomato",
        }),
        "linkReshapingTool.handleArchetype": $(go.Shape, "Diamond", {
          desiredSize: new go.Size(7, 7),
          fill: "lightblue",
          stroke: "deepskyblue",
        }),
        "rotatingTool.handleAngle": 270,
        "rotatingTool.handleDistance": 30,
        "rotatingTool.snapAngleMultiple": 15,
        "rotatingTool.snapAngleEpsilon": 15,
        "undoManager.isEnabled": true,
      }
    );

    // when the document is modified, add a "*" to the title and enable the "Save" button
    this.diagram.addDiagramListener("Modified", (e: any) => {
      var button = document.getElementById("SaveButton") as HTMLButtonElement;
      if (button) button.disabled = !this.diagram.isModified;
      var idx = document.title.indexOf("*");
      if (this.diagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.slice(0, idx);
      }
    });

    // Define a function for creating a "port" that is normally transparent.
    // The "name" is used as the GraphObject.portId, the "spot" is used to control how links connect
    // and where the port is positioned on the node, and the boolean "output" and "input" arguments
    // control whether the user can draw links from or to the port.

    var nodeSelectionAdornmentTemplate = $(
      go.Adornment,
      "Auto",
      $(go.Shape, {
        fill: null,
        stroke: "deepskyblue",
        strokeWidth: 3,
        strokeDashArray: [4, 2],
      }),
      $(go.Placeholder)
    );

    var nodeResizeAdornmentTemplate = $(
      go.Adornment,
      "Spot",
      { locationSpot: go.Spot.Right },
      $(go.Placeholder),
      $(go.Shape, {
        alignment: go.Spot.TopLeft,
        cursor: "nw-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.Top,
        cursor: "n-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.TopRight,
        cursor: "ne-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),

      $(go.Shape, {
        alignment: go.Spot.Left,
        cursor: "w-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.Right,
        cursor: "e-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),

      $(go.Shape, {
        alignment: go.Spot.BottomLeft,
        cursor: "se-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.Bottom,
        cursor: "s-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        alignment: go.Spot.BottomRight,
        cursor: "sw-resize",
        desiredSize: new go.Size(6, 6),
        fill: "lightblue",
        stroke: "deepskyblue",
      })
    );

    var nodeRotateAdornmentTemplate = $(
      go.Adornment,
      { locationSpot: go.Spot.Center, locationObjectName: "ELLIPSE" },
      $(go.Shape, "Ellipse", {
        name: "ELLIPSE",
        cursor: "pointer",
        desiredSize: new go.Size(7, 7),
        fill: "lightblue",
        stroke: "deepskyblue",
      }),
      $(go.Shape, {
        geometryString: "M3.5 7 L3.5 30",
        isGeometryPositioned: true,
        stroke: "deepskyblue",
        strokeWidth: 1.5,
        strokeDashArray: [4, 2],
      })
    );

    function activeHandler(e: any, obj: any) {
      var node = obj.part;
      var data = node.data;
      if (data && typeof data.isActive === "boolean") {
        node.data.isActive = !data.isActive;
        node.diagram.model.commit(
          (m: any) => m.set(data, "clickCount", !data.isActive),
          "status"
        );
      }
    }
    // node template
    this.diagram.nodeTemplate = $(
      go.Node,
      "Auto",
      { locationSpot: go.Spot.Center },
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
        go.Point.stringify
      ),
      {
        selectable: true,
        selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
      },
      {
        resizable: false,
        resizeObjectName: "PANEL",
        resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
      },
      {
        rotatable: false,
        rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
      },
      new go.Binding("angle").makeTwoWay(),
      // the main object is a Panel that surrounds a TextBlock with a Shape
      $(
        go.Panel,
        "Auto",
        { name: "PANEL", width: 300, height: 90 },
        new go.Binding("desiredSize", "size", go.Size.parse).makeTwoWay(
          go.Size.stringify
        ),
        $(
          go.Shape,
          "Rectangle", // default figure
          {
            portId: "", // the default port: if no spot on link data, use closest side
            fromLinkable: true,
            toLinkable: true,
            cursor: "pointer",
            fill: "lightgray", // default color
            // strokeWidth: 2,
            stroke: "#f4f4f4",
          },
          new go.Binding("figure"),
          new go.Binding("fill")
        ),
        $(
          go.Panel,
          "Vertical",
          { alignment: go.Spot.TopLeft, padding: 10 },
          $(
            go.TextBlock,
            {
              font: "bold 10pt Helvetica, Arial, sans-serif",
              // margin: 2,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              alignment: go.Spot.TopLeft,
              editable: false,
            },
            new go.Binding("text").makeTwoWay()
          ),
          $(
            go.TextBlock,
            {
              font: "10pt Helvetica, Arial, sans-serif",
              // margin: 2,
              maxSize: new go.Size(160, NaN),
              wrap: go.TextBlock.WrapFit,
              alignment: go.Spot.TopLeft,
              editable: false,
            },
            new go.Binding("text", "description").makeTwoWay()
          )
        ),

        $(
          go.Panel,
          "Horizontal",
          { alignment: go.Spot.BottomCenter },
          $(
            "Button",
            {
              margin: 2,
              isEnabled: true,
              click: activeHandler,
              "ButtonBorder.figure": "Circle",
              "ButtonBorder.fill": "white",
              "ButtonBorder.stroke": "white",
              "ButtonBorder.strokeWidth": 1,
              _buttonFillOver: "white",
              _buttonFillPressed: "lightgray",
            },
            $(go.Picture, "/assets/icons/ok.svg")
          ),
          $(
            "Button",
            {
              margin: 2,
              isEnabled: true,
              click: activeHandler,
              "ButtonBorder.figure": "Circle",
              "ButtonBorder.fill": "white",
              "ButtonBorder.stroke": "white",
              "ButtonBorder.strokeWidth": 1,
              _buttonFillOver: "white",
              _buttonFillPressed: "lightgray",
            },
            $(go.Picture, "/assets/icons/visibility.svg")
          ),
          $(
            "Button",
            {
              margin: 2,
              isEnabled: true,
              click: activeHandler,
              "ButtonBorder.figure": "Circle",
              "ButtonBorder.fill": "white",
              "ButtonBorder.stroke": "white",
              "ButtonBorder.strokeWidth": 1,
              _buttonFillOver: "white",
              _buttonFillPressed: "lightgray",
            },
            $(go.Picture, "/assets/icons/shutdown.svg")
          ),
          $(
            "Button",
            {
              margin: 2,
              isEnabled: true,
              click: activeHandler,
              "ButtonBorder.figure": "none",
              "ButtonBorder.fill": "#f4f4f4",
              "ButtonBorder.stroke": "#f4f4f4",
              "ButtonBorder.strokeWidth": 0,
              _buttonFillOver: "#f4f4f4",
              _buttonFillPressed: "#f4f4f4",
              alignment: go.Spot.BottomRight,
            },
            $(go.Picture, "/assets/icons/menuvertical.svg")
          )
        )
        // $(go.TextBlock, new go.Binding('text', 'clickCount', c => 'Clicked ' + c + ' times.')),
      ),
      // four small named ports, one on each side:
      // this.makePort('T', go.Spot.Top, false, true),
      this.makePort("L", go.Spot.Left, true, true),
      this.makePort("R", go.Spot.Right, true, true),
      // this.makePort('B', go.Spot.Bottom, true, false),
      {
        // handle mouse enter/leave events to show/hide the ports
        mouseEnter: (e: any, node: any) => showSmallPorts(node, true),
        mouseLeave: (e: any, node: any) => showSmallPorts(node, false),
      }
    );

    var linkSelectionAdornmentTemplate = $(
      go.Adornment,
      "Link",
      $(
        go.Shape,
        // isPanelMain declares that this Shape shares the Link.geometry
        { isPanelMain: true, fill: null, stroke: "deepskyblue", strokeWidth: 0 }
      ) // use selection object's strokeWidth
    );

    this.diagram.linkTemplate = $(
      go.Link, // the whole link panel
      {
        selectable: true,
        selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
      },
      { relinkableFrom: true, relinkableTo: true, reshapable: true },
      {
        routing: go.Link.AvoidsNodes,
        curve: go.Link.JumpOver,
        corner: 5,
        toShortLength: 4,
      },
      new go.Binding("points").makeTwoWay(),
      $(
        go.Shape, // the link path shape
        { isPanelMain: true, strokeWidth: 2 }
      ),
      $(
        go.Shape, // the arrowhead
        { toArrow: "Standard", stroke: null }
      ),
      $(
        go.Panel,
        "Auto",
        new go.Binding("visible", "isSelected").ofObject(),
        $(
          go.Shape,
          "RoundedRectangle", // the link shape
          { fill: "#F8F8F8", stroke: null }
        ),
        $(
          go.TextBlock,
          {
            textAlign: "center",
            font: "bold 9pt poppins",
            stroke: "#919191",
            margin: 2,
            minSize: new go.Size(10, NaN),
            editable: true,
          },
          new go.Binding("text").makeTwoWay()
        )
      )
    );

    this.load(); // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    this.myPalette = new go.Palette(
      "myPaletteDiv", // must name or refer to the DIV HTML element
      {
        maxSelectionCount: 1,
        scale: 0.7,
        allowZoom: false,
        padding: new go.Margin(125, 0, 0, 0),
        // nodeTemplateMap: this.diagram.nodeTemplateMap, // share the templates used by this.diagram
        nodeTemplate: $(
          go.Node,
          "Auto",
          { locationSpot: go.Spot.Center },
          new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
            go.Point.stringify
          ),
          {
            selectable: true,
            selectionAdornmentTemplate: nodeSelectionAdornmentTemplate,
          },
          {
            resizable: false,
            resizeObjectName: "PANEL",
            resizeAdornmentTemplate: nodeResizeAdornmentTemplate,
          },
          {
            rotatable: false,
            rotateAdornmentTemplate: nodeRotateAdornmentTemplate,
          },
          new go.Binding("angle").makeTwoWay(),
          // the main object is a Panel that surrounds a TextBlock with a Shape
          $(
            go.Panel,
            "Auto",
            { name: "PANEL" },
            new go.Binding("desiredSize", "sizeb", go.Size.parse).makeTwoWay(
              go.Size.stringify
            ),
            $(
              go.Shape,
              "Rectangle", // default figure
              {
                portId: "", // the default port: if no spot on link data, use closest side
                fromLinkable: true,
                toLinkable: true,
                cursor: "pointer",
                fill: "white", // default color
                background: "white",
                strokeWidth: 0,
                stroke: null,
              },
              new go.Binding("figure"),
              new go.Binding("fill")
            ),
            $(
              go.Picture,
              {
                margin: 8,
                visible: true,
                desiredSize: new go.Size(50, 30),
                background: "#F4F4F4",
              },
              new go.Binding("source")
            ),
            $(
              go.TextBlock,
              {
                font: "bold 9pt poppins",
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                alignment: go.Spot.BottomCenter,
                editable: false,
                position: new go.Point(0.5, 1),
              },
              new go.Binding("text").makeTwoWay()
            )
          ),
          // four small named ports, one on each side:
          // this.makePort('T', go.Spot.Top, false, true),
          this.makePort("L", go.Spot.Left, true, true),
          this.makePort("R", go.Spot.Right, true, true),
          // this.makePort('B', go.Spot.Bottom, true, false),
          {
            // handle mouse enter/leave events to show/hide the ports
            mouseEnter: (e: any, node: any) => showSmallPorts(node, true),
            mouseLeave: (e: any, node: any) => showSmallPorts(node, false),
          }
        ),
        // simplify the link template, just in this Palette
        linkTemplate: $(
          go.Link,
          {
            // because the GridLayout.alignment is Location and the nodes have locationSpot == Spot.Center,
            // to line up the Link in the same manner we have to pretend the Link has the same location spot
            locationSpot: go.Spot.Center,
            selectionAdornmentTemplate: $(
              go.Adornment,
              "Link",
              { locationSpot: go.Spot.Center },
              $(go.Shape, {
                isPanelMain: true,
                fill: null,
                stroke: "deepskyblue",
                strokeWidth: 0,
              }),
              $(
                go.Shape, // the arrowhead
                { toArrow: "Standard", stroke: null }
              )
            ),
          },
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
          },
          new go.Binding("points"),
          $(
            go.Shape, // the link path shape
            { isPanelMain: true, strokeWidth: 2 }
          ),
          $(
            go.Shape, // the arrowhead
            { toArrow: "Standard", stroke: null }
          )
        ),
        model: new go.GraphLinksModel(
          [
            {
              source: "assets/logos/Epicor.png",
              description: "Machine Cycle Time",
              text: "EPICOR",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 90",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/adp.png",
              description: "Machine Cycle Time",
              text: "ADP",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/Epson.png",
              description: "Machine Cycle Time",
              text: "EPSON",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/sap.png",
              description: "Production Orders",
              text: "SAP",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/sap.png",
              description: "Sales Orders",
              text: "SAP",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/Hubspot.png",
              description: "Machine Cycle Time",
              text: "Hubspot",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/kronos.png",
              description: "Machine Cycle Time",
              text: "KRONOS",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/Salesforce.png",
              description: "Opportunity Data",
              text: "salesforce",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/Oracle.png",
              description: "Machine Cycle Time",
              text: "Oracle",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/icons/iot.svg",
              description: "Machine Cycle Time",
              text: "NeuclonIoT",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/MBrain.png",
              description: "Operator Cycle Time",
              text: "MBrain",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
            {
              source: "assets/logos/MBrain.png",
              description: "Process Exit Cycles",
              text: "MBrain",
              figure: "RoundedRectangle",
              fill: "#f4f4f4",
              size: "200 100",
              sizeb: "100 100",
              isActive: true,
              dataFieldVisible: false,
              isMarked: true,
              menuList: [],
            },
          ],
          [
            // // the Palette also has a disconnected Link, which the user can drag-and-drop
            // {
            //   points: new go.List(/*go.Point*/).addAll([
            //     new go.Point(0, 0),
            //     new go.Point(30, 0),
            //     new go.Point(30, 40),
            //     new go.Point(60, 40),
            //   ]),
            // },
          ]
        ),
      }
    );
  }

  makePort(name: any, spot: any, output: any, input: any) {
    // the port is basically just a small transparent circle
    return $(go.Shape, "Circle", {
      fill: null, // not seen, by default; set to a translucent gray by showSmallPorts, defined below
      stroke: null,
      desiredSize: new go.Size(7, 7),
      alignment: spot, // align the port on the main Shape
      alignmentFocus: spot, // just inside the Shape
      portId: name, // declare this object to be a "port"
      fromSpot: spot,
      toSpot: spot, // declare where links may connect at this port
      fromLinkable: output,
      toLinkable: input, // declare whether the user may draw links to/from here
      cursor: "pointer", // show a different cursor to indicate potential link point
    });
  }

  showSmallPorts(node: any, show: boolean) {
    node.ports.each((port: { portId: string; fill: string | null }) => {
      if (port.portId !== "") {
        // don't change the default port, which is the big shape
        port.fill = show ? "rgba(0,0,0,.3)" : null;
      }
    });
  }

  // Show the diagram's model in JSON format that the user may edit
  save() {
    this.saveDiagramProperties(); // do this first, before writing to JSON
    (document.getElementById("mySavedModel") as HTMLInputElement)!.value =
      this.diagram.model.toJson();
    this.diagram.isModified = false;
  }
  load() {
    const json = JSON.parse(
      (document.getElementById("mySavedModel") as HTMLInputElement).value
    );
    this.diagram.model = go.Model.fromJson(json);
    this.loadDiagramProperties(); // do this after the Model.modelData has been brought into memory
  }

  saveDiagramProperties() {
    this.diagram.model.modelData["position"] = go.Point.stringify(
      this.diagram.position
    );
  }
  loadDiagramProperties() {
    // set Diagram.initialPosition, not Diagram.position, to handle initialization side-effects
    var pos = this.diagram.model.modelData["position"];
    if (pos) this.diagram.initialPosition = go.Point.parse(pos);
  }
}
