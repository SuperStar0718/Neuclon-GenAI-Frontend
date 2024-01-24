import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

import { DxTreeViewComponent } from "devextreme-angular";

import CustomStore from "devextreme/data/custom_store";
import { ApiService } from "src/app/services/api.service";
import { EventEmitter, Input, Output } from "@angular/core";
import { event } from "devextreme/events";

@Component({
  selector: "app-drop-down-box",
  templateUrl: "./drop-down-box.component.html",
  styleUrls: ["./drop-down-box.component.scss"],
})
export class DropDownBoxComponent {
  @Input() multipleSelection: boolean = false;
  @Input() expandAll: boolean = false;
  @Output() selectedDatabaseInfo: EventEmitter<any> = new EventEmitter<any>();
  treeDataSource: any;

  treeBoxValue: Array<string>;

  gridDataSource: any;

  isTreeBoxOpened: boolean;

  gridBoxValue: number[] = [3];

  isGridBoxOpened: boolean;

  constructor(
    private httpClient: HttpClient,
    private ref: ChangeDetectorRef,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) {
    this.isGridBoxOpened = false;
    this.treeBoxValue = ["1_1_1"];
  }
  ngOnInit() {
    this.apiService.getDatabaseList().subscribe((res) => {
      console.log("database list: ", res);
      let selectedDataset: Array<object> = [];

      if (this.multipleSelection) {
        this.treeBoxValue = res
          .filter((item: any) => item.leaf === true)
          .map((item: any) => {
            return item.ID;
          });
        selectedDataset = res;
        this.selectedDatabaseInfo.emit(selectedDataset);
      } else {
        const foundItem = res.find(
          (item: any) => item.ID === this.treeBoxValue[0]
        );

        if (foundItem !== undefined) {
          selectedDataset.push(foundItem);
        }
        this.selectedDatabaseInfo.emit(selectedDataset[0]);
      }

      this.treeDataSource = this.makeAsyncDataSource(res);

      this.cdr.detectChanges(); // Trigger change detection
    });
  }
  onTreeViewReady(e: any) {
    console.log("onTreeViewReady: ", e);
    this.updateSelection(e.component);
  }

  updateSelection(treeView: any) {
    if (!treeView) return;

    if (!this.treeBoxValue) {
      treeView.unselectAll();
    }

    if (this.treeBoxValue) {
      this.treeBoxValue.forEach((value) => {
        treeView.selectItem(value);
      });
    }
  }

  isLeaf(value: any) {
    return value.leaf;
  }

  makeAsyncDataSource(jsonData: any) {
    return new CustomStore({
      loadMode: "raw",
      key: "ID",
      load() {
        return jsonData;
      },
    });
  }

  treeView_itemSelectionChanged(e: any) {
    // this.treeBoxValue = e.component.getSelectedNodeKeys();

    console.log("treeView_itemSelectionChanged: ", e);
    console.log("treeBoxValue: ", this.treeBoxValue);
    let selectedDataset: Array<object> = [];
    selectedDataset = e.component
      .getSelectedNodes()
      .filter((node: { itemData: any }) => node.itemData.leaf === true)
      .map((node: { itemData: any; leaf: boolean }) => node.itemData);
    console.log("selectedDataset from treeview changed: ", selectedDataset);
    this.treeBoxValue = selectedDataset.map((item: any) => item.ID);
    this.selectedDatabaseInfo.emit(
      this.multipleSelection ? selectedDataset : e.itemData
    );
  }

  gridBox_displayExpr(item: any) {
    return item && `${item.CompanyName} <${item.Phone}>`;
  }

  onTreeBoxOptionChanged(e: any) {
    if (e.name === "value") {
      this.isTreeBoxOpened = false;
      this.ref.detectChanges();
    }
  }

  onGridBoxOptionChanged(e: any) {
    if (e.name === "value") {
      this.isGridBoxOpened = false;
      this.ref.detectChanges();
    }
  }
}
