import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GlobalListComponent } from "src/app/shared/global-list";
import { ApiService } from "src/app/services/api.service";
import { IConnection } from "src/app/Models/connection";
import { AlertService } from "src/app/services/alert.service";

@Component({
  selector: "app-manage-model",
  templateUrl: "./manage-model.component.html",
  styleUrls: ["./manage-model.component.scss"],
})
export class ManageModelComponent
  extends GlobalListComponent
  implements OnInit
{
  constructor(
    protected override router: Router,
    protected override _route: ActivatedRoute,
    protected formbuilder: FormBuilder,
    protected override apiService: ApiService,
    protected override alertService: AlertService,
  ) {
    super(router,apiService, alertService ,_route);

    this.tableProps = {
      colHeader: {
        checkbox: "",
        Name: "Name",
        icon: "Connectors",
        status: "Status",
        endpointUrl: "EndPoint Url",
        lastupdated: "Last Updated",
        actions: "Quick Actions",
      },
      columnTypes: {
        Name: "Name",
        icon: "icon",
        actions: "actionsSeperate",
        status: "statusToShow",
        endpointUrl: "endpointUrl",
        lastupdated: "lastupdated",
      },
      statusConfig: [
        {
          status: "Running",
          color: "white",
          backgroundColor: "#005F65",
        },
      ],
      rowActions: [
        {
          label: null,
          type: "delete",
          visibility: true,
          isCustom: false,
          background: "transparent",
          color: "black",
          icon: "delete_forever",
        },
        {
          label: null,
          type: "edit",
          visibility: true,
          isCustom: false,
          background: "transparent",
          color: "black",
          icon: "edit",
        },
        {
          label: null,
          type: "copy",
          visibility: true,
          isCustom: false,
          background: "transparent",
          color: "black",
          icon: "file_copy",
        },
      ],
    };

    // this.dataItems = [
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    //   {
    //     imageText: {
    //       img: "assets/icons/model_list_icon.svg",
    //       name: "demo_s7_devices4_1",
    //     },
    //     status: "Running",
    //     description:
    //       "us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server",
    //     created: new Date(),
    //     ip: "10.30.50.15.172.20.0.5",
    //     ports: "file_copy",
    //   },
    // ];
  }

  override async ngOnInit(): Promise<void> {
    const res: any = await this.apiService.getAllConnections().toPromise();
    let dataEndpoints: any = [];
    console.log("response:", res);
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
                Name: collection.collectionName,
                status: "Running",
                icon: `assets/logos/${connection.type.toLowerCase()}.png`,
                endpointUrl: connection.host,
                description: collection.collectionName,
                text: connection.type,
                headers: collection.headers,
                dbname: table.name,
                lastupdated: connection.updated_at
              });
            }
          );
        }
      );
    });
    this.dataItems = dataEndpoints;
    console.log("dataEndpoints:", dataEndpoints);
  }

}
