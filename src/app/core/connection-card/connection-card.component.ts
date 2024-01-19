import { Component, Input, ChangeDetectorRef } from "@angular/core";
import { IConnection } from "src/app/Models/connection";
import { ApiService } from "src/app/services/api.service";
import { NotifierService } from "angular-notifier";
import { MatDialog } from "@angular/material/dialog";
import { DatasetSynchronizationComponent } from "src/app/templates/main/views/connect/dataset-synchronization/dataset-synchronization.component";
import { CategoryType } from "src/app/Models/category-type";
import { MatDialogRef } from "@angular/material/dialog";
import dataSetCategories from "src/assets/categoryType/categoryType";

import * as moment from "moment";

@Component({
  selector: "app-connection-card",
  templateUrl: "./connection-card.component.html",
  styleUrls: ["./connection-card.component.scss"],
})
export class ConnectionCardComponent {
  @Input() props!: IConnection;
  private readonly notifier: NotifierService;
  display = true;

  constructor(
    private dialogRef: MatDialog,
    private apiService: ApiService,
    notifierService: NotifierService,
    private changeDetector: ChangeDetectorRef
  ) {
    this.notifier = notifierService;
  }

  refreshConnection(props: IConnection) {
    console.log(props);
    this.apiService.refreshConnection(props).subscribe(
      (res) => {
        console.log("success");
        console.log("res:", res);
        props.dataset.status = true;
        this.props.dataset = props.dataset;
        this.changeDetector.detectChanges();
        this.notifier.notify("success", "Connection Successful");
      },
      (error) => {
        console.log(error);
        this.notifier.notify("error", "Whoops, something went wrong.");
      }
    );
  }

  momentFormat(date: string) {
    return moment(date).format("M/D/YYYY-hh:mm A");
  }

  stopConnection(props: IConnection) {
    console.log(props);
    this.apiService.stopConnection(props).subscribe(
      (res) => {
        console.log("success");
        props.dataset.status = false;
        this.props.dataset = props.dataset;
        this.changeDetector.detectChanges();
        this.notifier.notify("success", "Connection Stopped");
      },
      (error) => {
        console.log(error);
        this.notifier.notify("error", "Whoops, something went wrong.");
      }
    );
  }

  deleteConnection(props: IConnection) {
    console.log(props);
    this.apiService.deleteConnection(props).subscribe(
      (res) => {
        console.log("success");
        this.display = false;
        this.notifier.notify("success", "Connection Deleted");
      },
      (error) => {
        console.log(error);
        this.notifier.notify("error", "Whoops, something went wrong.");
      }
    );
  }

  syncPopup(props: IConnection) {
    const syncDataset = dataSetCategories
      .map((item) => item.categoryType) // flatten categoryType arrays
      .flat()
      .filter(
        (item1) => item1.displayName?.toLowerCase() === props.type.toLowerCase()
      );

    console.log("Edit data:", syncDataset);
    this.dialogRef.open(DatasetSynchronizationComponent, {
      data: {
        categoryInfo: syncDataset[0],
        dataSetInfo: props,
      },
      width: "550px",
    });
  }
}
