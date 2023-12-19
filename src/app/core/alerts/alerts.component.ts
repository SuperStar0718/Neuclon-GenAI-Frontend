import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
})
export class AlertsComponent {
  data: any;
  type: string = '';
  image: string = '';
  icon: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: any,
    public dialogRef: MatDialogRef<AlertsComponent>,
  ) {
    this.data = dialogData.data;
    this.type = dialogData.type;
    this.image = dialogData.image;
    this.icon = dialogData.icon;
  }
}
