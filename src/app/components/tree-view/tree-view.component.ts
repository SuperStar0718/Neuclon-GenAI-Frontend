import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from "@angular/core";
import { DxTreeViewComponent } from "devextreme-angular";

export interface IDBTable {
  id: string;

  text: string;

  expanded?: boolean;

  items?: IDBTable[];

  selected?: boolean;

  isTable?: boolean;

  parentDB?: string;
  headers?: string;
}

@Component({
  selector: "app-tree-view",
  templateUrl: "./tree-view.component.html",
  styleUrls: ["./tree-view.component.scss"],
})
export class TreeViewComponent  {
  @Input() DBTables: IDBTable[];
  @Output() selectDBTables: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild("treeView") treeView: DxTreeViewComponent;
  products: IDBTable[];

  currentItem: IDBTable;

  constructor() {
  }
 

  selectItem(e: any) {

    this.currentItem = e.itemData;
    const selectedItems = e.component.getSelectedNodes().map((node: any) => {
      return node.itemData;
    });
    this.selectDBTables.emit(selectedItems);
    console.log("currentItem: ", selectedItems);
  }
}
