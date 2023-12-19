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
import { EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: "app-drop-down-box",
	templateUrl: "./drop-down-box.component.html",
	styleUrls: ["./drop-down-box.component.scss"],
})
export class DropDownBoxComponent {
	@ViewChild(DxTreeViewComponent, { static: false }) treeView: any;
	@Output() selectedDatabaseInfo: EventEmitter<any> = new EventEmitter<any>();
	treeDataSource: any;

	treeBoxValue: string;

	isTreeBoxOpened: boolean;

	gridDataSource: any;

	gridBoxValue: number[] = [3];

	isGridBoxOpened: boolean;

	gridColumns: any = ["CompanyName", "City", "Phone"];

	jsonData: any = [
		{
			ID: 1,
			name: "DataBases",
			expanded: true,
		},
		{
			ID: "1_1",
			categoryId: "1",
			name: "MongoDB",
			expanded: true,
		},
		{
			ID: "1_1_1",
			categoryId: "1_1",
			name: "DB_Name_1",
			expanded: true,
		},
		{
			ID: "1_1_1_1",
			categoryId: "1_1_1",
			name: "Collection Name 1",
			price: 220,
			expanded: true,
		},
		{
			ID: "1_1_1_2",
			categoryId: "1_1_1",
			name: "Collection Name 2",
			price: 270,
		},
		{
			ID: "1_1_2",
			categoryId: "1_1",
			name: "DB_Name_2",
		},
		{
			ID: "1_1_2_1",
			categoryId: "1_1_2",
			name: "Collection Name 1",
			price: 1200,
		},
		{
			ID: "1_1_2_2",
			categoryId: "1_1_2",
			name: "Collection Name 2",
			price: 1450,
		},
		{
			ID: "1_1_2_3",
			categoryId: "1_1_2",
			name: "Collection Name 3",
			price: 1600,
		},
		{
			ID: "1_1_2_4",
			categoryId: "1_1_2",
			name: "Collection Name 4",
			price: 1750,
		},
		{
			ID: "1_1_2_5",
			categoryId: "1_1_2",
			name: "Collection Name 5",
			price: 4000,
		},
		{
			ID: "1_1_3",
			categoryId: "1_1",
			name: "DB_Name_3",
		},
		{
			ID: "1_1_3_1",
			categoryId: "1_1_3",
			name: "Collection Name 1",
		},
		{
			ID: "1_1_4",
			categoryId: "1_1",
			name: "DB_Name_4",
		},
		{
			ID: "1_1_4_1",
			categoryId: "1_1_4",
			name: "collection Name 1",
		},
		{
			ID: "1_1_4_2",
			categoryId: "1_1_4",
			name: "collection Name 2",
		},
		{
			ID: "1_2",
			categoryId: 1,
			name: "PostgreSQL",
		},
		{
			ID: "1_2_1",
			categoryId: "1_2",
			name: "DB_Name_1",
		},
		{
			ID: "1_2_1_1",
			categoryId: "1_2_1",
			name: "Table Name 1",
		},
		{
			ID: "1_2_1_2",
			categoryId: "1_2_1",
			name: "Table Name 2",
		},
		{
			ID: "1_2_1_3",
			categoryId: "1_2_1",
			name: "Table Name 3",
		},
		{
			ID: "1_2_1_4",
			categoryId: "1_2_1",
			name: "Table Name 4",
		},
		{
			ID: "1_2_1_5",
			categoryId: "1_2_1",
			name: "Table Name 5",
		},
		{
			ID: "1_2_2",
			categoryId: "1_2",
			name: "DB_Name_2",
		},
		{
			ID: "1_2_2_1",
			categoryId: "1_2_2",
			name: "Table Name 1",
		},
		{
			ID: "1_2_2_2",
			categoryId: "1_2_2",
			name: "Table Name 2",
		},
		{
			ID: "1_2_2_3",
			categoryId: "1_2_2",
			name: "Table Name 3",
		},
		{
			ID: "1_2_2_4",
			categoryId: "1_2_2",
			name: "Table Name 4",
		},
		{
			ID: "1_2_2_5",
			categoryId: "1_2_2",
			name: "Table Name 5",
		},
		{
			ID: "1_3",
			categoryId: 1,
			name: "MS SQL",
		},
		{
			ID: "1_3_1",
			categoryId: "1_3",
			name: "DB_Name_1",
		},
		{
			ID: "1_3_1_1",
			categoryId: "1_3_1",
			name: "Table Name 1",
		},
		{
			ID: "1_3_1_2",
			categoryId: "1_3_1",
			name: "Table Name 2",
		},
		{
			ID: "1_3_1_3",
			categoryId: "1_3_1",
			name: "Table Name 3",
		},
		{
			ID: "1_3_1_4",
			categoryId: "1_3_1",
			name: "Table Name 4",
		},
		{
			ID: "1_3_1_5",
			categoryId: "1_3_1",
			name: "Table Name 5",
		},
		{
			ID: "1_3_2",
			categoryId: "1_3",
			name: "DB_Name_2",
		},
		{
			ID: "1_3_2_1",
			categoryId: "1_3_2",
			name: "Table Name 1",
		},
		{
			ID: "1_3_2_2",
			categoryId: "1_3_2",
			name: "Table Name 2",
		},
		{
			ID: "1_3_2_3",
			categoryId: "1_3_2",
			name: "Table Name 3",
		},
		{
			ID: "1_3_2_4",
			categoryId: "1_3_2",
			name: "Table Name 4",
		},
		{
			ID: "1_3_2_5",
			categoryId: "1_3_2",
			name: "Table Name 5",
		},
	];

	constructor(
		private httpClient: HttpClient,
		private ref: ChangeDetectorRef,
		private apiService: ApiService,
		private cdr: ChangeDetectorRef
	) {
		// this.gridDataSource = this.makeAsyncDataSource(
		//   this.httpClient,
		//   "customers.json"
		// );
		// this.apiService.getDatabaseList().subscribe((res) => {
		//   console.log("database list: ", res);
		//     this.treeDataSource = this.makeAsyncDataSource(res);
		// });
		this.isTreeBoxOpened = false;
		this.isGridBoxOpened = false;
		this.treeBoxValue = "1_1_1";
	}
	ngOnInit() {
		// this.treeDataSource = this.makeAsyncDataSource(this.jsonData);
		this.apiService.getDatabaseList().subscribe((res) => {
			console.log("database list: ", res);
			const table = res.find((item: any)=> item.ID === this.treeBoxValue);


			this.treeDataSource = this.makeAsyncDataSource(res);
			this.selectedDatabaseInfo.emit(table);

			this.cdr.detectChanges(); // Trigger change detection
		});
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
			this.selectedDatabaseInfo.emit(e.itemData);
		}
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
