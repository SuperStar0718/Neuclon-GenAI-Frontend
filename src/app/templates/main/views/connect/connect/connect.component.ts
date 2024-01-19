import { Component } from "@angular/core";
import { IConnection } from "src/app/Models/connection";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-connect",
  templateUrl: "./connect.component.html",
  styleUrls: ["./connect.component.scss"],
})
export class ConnectComponent {
  manageConnectCollection!: IConnection[];

  connection_card_data: IConnection[] = [];
  videoStatusRight: boolean = false;
  videoStatusLeft1: boolean = false;
  videoStatusLeft2: boolean = false;
  videoStatusLeft3: boolean = false;
  videoStatusLeft4: boolean = false;

  connections = [
    {
      img: "assets/icons/crm_black.svg",
      name: "CRM",
    },
    {
      img: "assets/icons/erp_black.svg",
      name: "ERP",
    },
    {
      img: "assets/icons/databases.svg",
      name: "Databases",
    },
    {
      img: "assets/icons/files_black.svg",
      name: "Files",
    },
    {
      img: "assets/icons/iot_black.svg",
      name: "API",
    },
  ];

  anySources: any[] = [
    { id: 1, name: "CRM" },
    { id: 2, name: "ERP" },
    { id: 3, name: "IoT" },
    { id: 4, name: "IMS" },
    { id: 5, name: "Robotics" },
  ];

  intelligences: any[] = [
    { id: 1, name: "Classificaiton" },
    { id: 2, name: "Clustering" },
    { id: 3, name: "Forecast" },
    { id: 4, name: "Outliers" },
    { id: 5, name: "Time Series" },
    { id: 6, name: "Machine Learning" },
    { id: 7, name: "Single Insight AI" },
  ];

  insights: any[] = [
    { id: 1, name: "Dashboard" },
    { id: 2, name: "Descriptive and Diagnostic" },
    { id: 3, name: "Predictive and Prescriptive" },
  ];

  codes: any[] = [
    { id: 1, name: "Python" },
    { id: 2, name: "R" },
  ];

  constructor(private apiService: ApiService) {
    // this.connection_card_data = [
    //   {
    //     id: 1,
    //     status: 'connected',
    //     name: 'KUKA',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.1',
    //     port: 4040,
    //   },
    //   {
    //     id: 2,
    //     status: 'connected',
    //     name: 'UNIVERSAL ROBOT',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.2',
    //     port: 4040,
    //   },
    //   {
    //     id: 3,
    //     status: 'connected',
    //     name: 'kEYENCE',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.3',
    //     port: 4040,
    //   },
    //   {
    //     id: 4,
    //     status: 'connected',
    //     name: 'FUNUC ROBOT',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.4',
    //     port: 4040,
    //   },
    //   {
    //     id: 5,
    //     status: 'connected',
    //     name: 'MAZAK',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.4',
    //     port: 4040,
    //   },
    //   {
    //     id: 6,
    //     status: 'connected',
    //     name: 'SIEMENS',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.5',
    //     port: 4040,
    //   },
    //   {
    //     id: 7,
    //     status: 'connected',
    //     name: 'SIEMENS',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.6',
    //     port: 4040,
    //   },
    //   {
    //     id: 8,
    //     status: 'connected',
    //     name: 'SIEMENS',
    //     text: 'L3_Machine1_1_OPC',
    //     url1: 'OPCUA Client Poll',
    //     url2: 'BA05-3CC1-45A4-9255-F73DD147438A',
    //     ip: '172.20.0.7',
    //     port: 4040,
    //   },
    // ];
  }
  ngOnInit(): void {
    this.apiService.getAllConnections().subscribe((data: any) => {
      this.connection_card_data = data;
    });
    this.apiService.getAllConnections().subscribe((res: any) => {
      console.log("all connections: ", res);
      this.manageConnectCollection = res;
    });
  }
}
