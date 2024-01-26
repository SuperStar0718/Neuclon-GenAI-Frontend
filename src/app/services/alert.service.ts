import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Alert, AskingAlert } from "../Models/alert";
import { AlertsComponent } from "../core/alerts/alerts.component";

@Injectable({
  providedIn: "root",
})
export class AlertService {
  constructor(protected dialog: MatDialog) {}

  success(data: Alert) {
    this.dialog.open(AlertsComponent, {
      width: "300px",
      data: {
        imagePath: "",
        icon: "check_circle_outline",
        data: data,
        type: "success",
      },
    });
  }

  error(data: Alert) {
    this.dialog.open(AlertsComponent, {
      width: "300px",
      data: {
        imagePath: "assets/icons/ic_alert_error.svg",
        icon: "",
        type: "error",
        data: data,
      },
    });
  }

  askAlert(data: AskingAlert) {
    var promise = new Promise((resolve, reject) => {
      let dialogRef: any = this.dialog.open(AlertsComponent, {
        width: "500px",
        panelClass: "custom-dialog-container",
        disableClose: true,
        data: {
          type: "ask",
          data: data,
          image: "",
        },
      });

      dialogRef.afterClosed().subscribe((result: any) => {
        resolve(result);
      });
    });
    return promise;
  }
}
