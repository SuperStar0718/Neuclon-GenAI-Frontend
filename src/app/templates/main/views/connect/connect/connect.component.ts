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

  //   connection_card_data: IConnection[] = [];
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
  }
  ngOnInit(): void {
    this.apiService.getAllConnections().subscribe((res: any) => {
      this.manageConnectCollection = res;
      let dataEndpoints: Array<IConnection> = [];
      res.forEach((connection: IConnection) => {
        const tables = JSON.parse(connection.tables);
        tables.forEach(
          (table: {
            name: string;
            collections: Array<{
              collectionName: string;
              headers: string;
              status: boolean;
            }>;
          }) => {
            table.collections.forEach(
              (collection: {
                collectionName: string;
                headers: string;
                status: boolean;
              }) => {
                dataEndpoints.push({
                  ...connection,
                  dataset: collection,
                });
              }
            );
          }
        );
      });
      console.log("data endpoints: ", dataEndpoints);
      this.manageConnectCollection = dataEndpoints;
    });
  }
}
