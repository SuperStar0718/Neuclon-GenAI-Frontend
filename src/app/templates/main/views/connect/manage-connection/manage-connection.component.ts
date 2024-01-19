import { Component, OnInit } from "@angular/core";
import { IConnection } from "src/app/Models/connection";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { ConnectDeviceComponent } from "../connect-device/connect-device.component";
import { HttpClient } from "@angular/common/http";
import { ApiService } from "src/app/services/api.service";
import { SharedService } from "src/app/services/shared.service";

@Component({
  selector: "app-manage-connection",
  templateUrl: "./manage-connection.component.html",
  styleUrls: ["./manage-connection.component.scss"],
})
export class ManageConnectionComponent implements OnInit {
  manageConnectCollection!: IConnection[];

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private apiService: ApiService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    this.sharedService.component.next("Manage Connections");
    localStorage.setItem("activeComp", "Manage Connections");
    this.apiService.getAllConnections().subscribe((res: any) => {
      this.manageConnectCollection = res;
      let dataEndpoints: Array<IConnection> = [];
      res.forEach((connection: IConnection) => {
        const tables = JSON.parse(connection.tables);
        tables.forEach(
          (table: { name: string; collections: Array<string> }) => {
            table.collections.forEach((collection: string) => {
              dataEndpoints.push({
                ...connection,
                dataset: collection,
              });
            });
          }
        );
      });
      console.log("data endpoints: ", dataEndpoints);
      this.manageConnectCollection = dataEndpoints;
    });
    // this.manageConnectCollection = manageConnectionCollection;
  }

  openConnectionDialog() {
    this.dialog.open(ConnectDeviceComponent, {
      width: "900px",
    });
  }
}

// const manageConnectionCollection: connection[] = [
//   {
//     id: 1,
//     status: 'connected',
//     name: 'KUKA',
//     text: 'L1_Machine1_1_OPC',
//     url1: 'OPCUA Client Poll',
//     url2: 'BA00-3C01-45A4-9255-F73DD147438A',
//     ip: '172.22.0.1',
//     port: 4040,
//   },
//   {
//     id: 2,
//     status: 'connected',
//     name: 'UNIVERSAL ROBOT',
//     text: 'L2_Machine2_2_OPC',
//     url1: 'MTCONNECT Client Poll',
//     url2: 'BA01-3C02-45A4-9255-F73DD147438A',
//     ip: '172.22.0.2',
//     port: 4041,
//   },
//   {
//     id: 3,
//     status: 'connected',
//     name: 'KEYENCE',
//     text: 'L3_Machine3_4_OPC',
//     url1: 'HTTP Client Poll',
//     url2: 'BA02-3C03-45A4-9255-F73DD147438A',
//     ip: '172.22.0.3',
//     port: 4042,
//   },
//   {
//     id: 4,
//     status: 'connected',
//     name: 'FANUC ROBOT',
//     text: 'L4_Machine4_4_OPC',
//     url1: 'OPCUA Client Poll',
//     url2: 'BA04-3C04-45A4-9255-F73DD147438A',
//     ip: '172.22.0.4',
//     port: 4043,
//   },
//   {
//     id: 5,
//     status: 'connected',
//     name: 'KUKA',
//     text: 'L5_Machine5_5_OPC',
//     url1: 'MTCONNECT Client Poll',
//     url2: 'BA05-3C05-45A4-9255-F73DD147438A',
//     ip: '172.22.0.5',
//     port: 4044,
//   },
//   {
//     id: 6,
//     status: 'connected',
//     name: 'MAZAK',
//     text: 'L6_Machine6_6_OPC',
//     url1: 'HTTP Client Poll',
//     url2: 'BA06-3C06-45A4-9255-F73DD147438A',
//     ip: '172.22.0.6',
//     port: 4045,
//   },
//   {
//     id: 7,
//     status: 'connected',
//     name: 'SIEMENS',
//     text: 'L7_Machine7_7_OPC',
//     url1: 'OPCUA Client Poll',
//     url2: 'BA07-3C07-45A4-9255-F73DD147438A',
//     ip: '172.22.0.7',
//     port: 4046,
//   },
//   {
//     id: 8,
//     status: 'connected',
//     name: 'KUKA',
//     text: 'L8_Machine8_8_OPC',
//     url1: 'MTCONNECT Client Poll',
//     url2: 'BA08-3C08-45A4-9255-F73DD147438A',
//     ip: '172.22.0.8',
//     port: 4047,
//   },
// ];
