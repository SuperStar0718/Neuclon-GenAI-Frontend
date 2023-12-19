import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ConnectDevice } from 'src/app/Models/connect-devices';

@Component({
  selector: 'connect-device',
  templateUrl: './connect-device.component.html',
  styleUrls: ['./connect-device.component.scss'],
})
export class ConnectDeviceComponent implements OnInit {
  connectDevices?: ConnectDevice[];
  constructor(private dialogRef: MatDialogRef<ConnectDeviceComponent>, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.connectDevices = connectDevices;
    this.createForm();
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createForm() {
    this.formBuilder.group({});
  }
}

const connectDevices: ConnectDevice[] = [
  { id: 1, connection: 'Fanuc CNC Ethernet' },
  { id: 2, connection: 'Fanuc CRM Ethernet' },
  { id: 3, connection: 'Fanuc DNS Ethernet' },
  { id: 4, connection: 'Fanuc ORM Ethernet' },
];
