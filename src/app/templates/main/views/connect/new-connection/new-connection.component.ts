import { DialogRef } from "@angular/cdk/dialog";
import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DataSetCategories } from "src/app/Models/dataset-categories";
import { NewConnectionCategories } from "src/app/Models/new-connection-categories";
import { DatasetSynchronizationComponent } from "../dataset-synchronization/dataset-synchronization.component";
import { ConnectDeviceComponent } from "../connect-device/connect-device.component";
import { CategoryType } from "src/app/Models/category-type";
import { FormService } from "./form.service";
import { SharedService } from "src/app/services/shared.service";
import dataSetCategories from "src/assets/categoryType/categoryType";

@Component({
  selector: "app-new-connection",
  templateUrl: "./new-connection.component.html",
  styleUrls: ["./new-connection.component.scss"],
})
export class NewConnectionComponent {
  selectedCategory: string = "All";
  categories: string[] = [];
  datasetCategories: DataSetCategories[];

  constructor(
    private dialogRef: MatDialog,
    private formDataService: FormService,
    private sharedService: SharedService
  ) {
    this.categories = dataSetCategories.map((s) => s.category);
    this.datasetCategories = dataSetCategories;
  }

  ngOnInit(): void {
    this.sharedService.component.next("App Center");
    localStorage.setItem("activeComp", "App Center");
  }

  filter(category: string) {
    this.selectedCategory = category;
    if (category == "All") {
      this.datasetCategories = dataSetCategories;
    } else {
      this.datasetCategories = dataSetCategories.filter(
        (s) => s.category == category
      );
    }
  }

  syncPopup(syncDataset: CategoryType) {
    console.log(syncDataset);
    this.dialogRef.open(DatasetSynchronizationComponent, {
      data: syncDataset,
      width: "550px",
    });
  }

  getTotalCategoryTypeCount(): number {
    return dataSetCategories.reduce(
      (total, category) => total + category.categoryType.length,
      0
    );
  }
}
