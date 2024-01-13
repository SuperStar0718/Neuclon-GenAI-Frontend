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
    @ViewChild(DxTreeViewComponent, { static: false }) treeView: any;
    @Input() multipleSelection: boolean = false;
    @Output() selectedDatabaseInfo: EventEmitter<any> = new EventEmitter<any>();
    treeDataSource: any;

    treeBoxValue: Array<string>;

    isTreeBoxOpened: boolean;

    gridDataSource: any;

    gridBoxValue: number[] = [3];

    isGridBoxOpened: boolean;

    constructor(
        private httpClient: HttpClient,
        private ref: ChangeDetectorRef,
        private apiService: ApiService,
        private cdr: ChangeDetectorRef
    ) {
        this.isTreeBoxOpened = false;
        this.isGridBoxOpened = false;
        this.treeBoxValue = ["1_1_1"];
    }
    ngOnInit() {
        this.apiService.getDatabaseList().subscribe((res) => {
            console.log("database list: ", res);
            const table = res.find(
                (item: any) => item.ID === this.treeBoxValue
            );
            this.treeDataSource = this.makeAsyncDataSource(res);
            this.selectedDatabaseInfo.emit(table);
            this.cdr.detectChanges(); // Trigger change detection
        });
    }
    onTreeViewReady(e : any) {
        this.updateSelection(e.component);
      }
    
      updateSelection(treeView: any) {
        if (!treeView) return;
    
        if (!this.treeBoxValue) {
          treeView.unselectAll();
        }
    
        if (this.treeBoxValue) {
          this.treeBoxValue.forEach(((value) => {
            treeView.selectItem(value);
          }));
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

    syncTreeViewSelection(e: any) {
        if (!this.treeView) return;

        if (!this.treeBoxValue) {
            this.treeView.instance.unselectAll();
        } else {
            this.treeView.instance.selectItem(this.treeBoxValue);
        }
    }

    treeView_itemSelectionChanged(e: any) {
        console.log("treeView_itemSelectionChanged: ", e);
        if (e.itemData.leaf) {
            this.treeBoxValue = e.component.getSelectedNodeKeys();
            this.selectedDatabaseInfo.emit(this.multipleSelection ? e.component.getSelectedNodes() : e.itemData);
        }
    }

    gridBox_displayExpr(item: any) {
        return item && `${item.CompanyName} <${item.Phone}>`;
    }

    // onTreeBoxOptionChanged(e: any) {
    //     if (e.name === "value") {
    //         this.isTreeBoxOpened = false;
    //         this.ref.detectChanges();
    //     }
    // }

    onGridBoxOptionChanged(e: any) {
        if (e.name === "value") {
            this.isGridBoxOpened = false;
            this.ref.detectChanges();
        }
    }
}
