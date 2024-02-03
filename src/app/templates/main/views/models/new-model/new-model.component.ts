import {
  CdkDragDrop,
  copyArrayItem,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component } from "@angular/core";
import { Config } from "src/config";
import { EventEmitter, Input, Output } from "@angular/core";

import * as go from "gojs";

const $ = go.GraphObject.make;

@Component({
  selector: "app-new-model",
  templateUrl: "./new-model.component.html",
  styleUrls: ["./new-model.component.scss"],
})
export class NewModelComponent {
  @Output() setJoinedTable: EventEmitter<any> = new EventEmitter<any>();

  availableConnections: any[] = [];
  defaultPlaceholder: string = Config.default_placeholder;
  tableProps: any;
  dataSource: any[] = [];
  models: any[] = [];
  isExpanded: boolean = true;

  public model: go.GraphLinksModel = new go.GraphLinksModel({
    copiesArrays: true,
    copiesArrayObjects: true,
    linkFromPortIdProperty: "fromPort",
    linkToPortIdProperty: "toPort",
    nodeDataArray: [
      {
        key: 1,
        name: "Server",
        inservices: [{ name: "s1" }, { name: "s2" }],
        outservices: [{ name: "o1" }],
        loc: "0 0",
      },
      {
        key: 2,
        name: "Other",
        inservices: [{ name: "s1" }, { name: "s2" }],
        loc: "200 60",
      },
    ],
    linkDataArray: [{ from: 1, fromPort: "o1", to: 2, toPort: "s2" }],
  });

  constructor(private cdr: ChangeDetectorRef) {
    this.availableConnections = [
      {
        img: "assets/logos/Epicor.png",
        name: "EPICOR",
      },
      {
        img: "assets/logos/adp.png",
        name: "ADP",
      },
      {
        img: "assets/logos/Epson.png",
        name: "EPSON",
      },
      {
        img: "assets/logos/sap.png",
        name: "SAP",
      },
      {
        img: "assets/logos/Hubspot.png",
        name: "Hubspot",
      },
      {
        img: "assets/logos/kronos.png",
        name: "KRONOS",
      },
      {
        img: "assets/logos/Salesforce.png",
        name: "salesforce",
      },
      {
        img: "assets/logos/Oracle.png",
        name: "Oracle",
      },
    ];

    this.tableProps = {
      colHeader: {},
      columnTypes: {},
    };

    // this.dataSource = [
    //   {
    //     instance: "flow - [2339]",
    //     timestramp: "april 30, 2023, 11:25:22 aM",
    //     message:
    //       "Lorem ipsum dolor sit amet consectetur. Urna non adipiscing neque odio. Nunc non vitae quis enim leo.",
    //   },
    //   {
    //     instance: "flow - [2339]",
    //     timestramp: "april 30, 2023, 11:25:22 aM",
    //     message:
    //       "Lorem ipsum dolor sit amet consectetur. Urna non adipiscing neque odio. Nunc non vitae quis enim leo.",
    //   },
    //   {
    //     instance: "flow - [2339]",
    //     timestramp: "april 30, 2023, 11:25:22 aM",
    //     message:
    //       "Lorem ipsum dolor sit amet consectetur. Urna non adipiscing neque odio. Nunc non vitae quis enim leo.",
    //   },
    //   {
    //     instance: "flow - [2339]",
    //     timestramp: "april 30, 2023, 11:25:22 aM",
    //     message:
    //       "Lorem ipsum dolor sit amet consectetur. Urna non adipiscing neque odio. Nunc non vitae quis enim leo.",
    //   },
    // ];
  }

  onSetJoinedtable(joinedTable: any) {
    this.dataSource = joinedTable;
    const headers = Object.keys(joinedTable[0]);
    console.log("headers", headers);
    this.tableProps = {
      colHeader: headers.reduce((obj: any, header: string) => {
        obj[header] = header;
        return obj;
      }, {}),

      columnTypes: {},
    };
    // this.cdr.detectChanges();
  }

  onDrop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
