import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { CategoryType } from "src/app/Models/category-type";
import { FormService } from "../new-connection/form.service";
import { MatRadioModule } from "@angular/material/radio";
import { NgForm } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { NotifierService } from "angular-notifier";
import { ApiService } from "src/app/services/api.service";
import { MatTabGroup } from "@angular/material/tabs";
import { DropDownBoxComponent } from "../drop-down-box/drop-down-box.component";
import { TreeViewComponent } from "src/app/components/tree-view/tree-view.component";
import { json } from "express";
import { JsonExporterService } from "cdk-table-exporter";
import CustomStore from "devextreme/data/custom_store";
import { error } from "jquery";
import { IDBTable } from "src/app/components/tree-view/tree-view.component";
import { IConnection, IConnectionInfo } from "src/app/Models/connection";

@Component({
  selector: "dataset-synchronization",
  templateUrl: "./dataset-synchronization.component.html",
  styleUrls: ["./dataset-synchronization.component.scss"],
})
export class DatasetSynchronizationComponent implements OnInit {
  dataSetCategories!: CategoryType;
  selectConnects: any[] = [];
  private readonly notifier: NotifierService;
  @ViewChild("tabGroup") tabGroup: MatTabGroup;
  @ViewChild("treeView") treeView: TreeViewComponent;

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DatasetSynchronizationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public dialogData: CategoryType | IConnectionInfo,
    private formDataService: FormService,
    notifierService: NotifierService,
    private apiService: ApiService
  ) {
    this.notifier = notifierService;
  }
  currentForm: any;
  existingConnectionInfo: IConnection;
  dataBaseConnected: boolean;
  availableTables: Array<string>;
  selectedTables: Array<IDBTable> = [];
  connection: {
    status?: string;
    tables?: string;
    type?: string;
    uri?: string;
    host?: string;
    port?: string;
    username?: string;
    password?: string;
    dbname: string;
  };

  ngOnInit(): void {
    this.dataBaseConnected = false;
    if ("categoryInfo" in this.dialogData) {
      this.dataSetCategories = this.dialogData.categoryInfo;
      this.existingConnectionInfo = this.dialogData.dataSetInfo;
      console.log("dialog data ====>>>>>", this.dialogData);
    } else {
      this.dataSetCategories = this.dialogData;
    }

    if (this.dataSetCategories.categoryName === "Salesforce") {
      this.selectConnects = salesforceSelectConnects;
    } else if (this.dataSetCategories.categoryName === "MBrain") {
      this.selectConnects = mBrainSelectConnects;
    } else {
      this.selectConnects = allSelectConnects;
    }
    this.switchForm(this.dataSetCategories.categoryName);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  buttonText: string = "Edit";
  switchForm(formName: string) {
    this.formDataService.getFormData(formName).subscribe(
      (data) => {
        this.currentForm = data;
        if (this.existingConnectionInfo) {
          this.currentForm?.fields.forEach((field: any) => {
            const fieldName = field.name as keyof IConnection;
            if (this.existingConnectionInfo[fieldName])
              field.value = this.existingConnectionInfo[fieldName];
          });
        }
      },
      (error) => console.log(error)
    );
  }

  toggleInputField(field: { disabled: boolean }) {
    field.disabled = !field.disabled;
    this.buttonText = field.disabled ? "Edit" : "Cancel";
  }
  changeConnectionMethod(event: any) {
    if (event == "constring") {
      this.currentForm.fields = [
        {
          type: "select",
          label: "Certificate",
          name: "certificate",
          value: "constring",
          formOptions: [
            {
              value: "manual",
              label: "Manual Certificate",
            },
            {
              value: "constring",
              label: "Connect using string ",
            },
          ],
        },
        {
          type: "text",
          label: "Connection URI",
          name: "uri",
          value: "",
          validations: [
            {
              name: "required",
              validator: "required",
              message: "Field is required",
            },
          ],
        },
      ];
    } else {
      this.formDataService
        .getFormData(this.dataSetCategories.categoryName)
        .subscribe(
          (data) => {
            this.currentForm = data;
          },
          (error) => console.log(error)
        );
    }
    if (this.existingConnectionInfo) {
      this.currentForm?.fields.forEach((field: any) => {
        const fieldName = field.name as keyof IConnection;
        if (this.existingConnectionInfo[fieldName])
          field.value = this.existingConnectionInfo[fieldName];
      });
    }
  }

  onSelectedDatabaseInfoChange(databaseInfo: Array<object>): void {
    // this.selectedDataset = databaseInfo;
    // console.log('selectedDataset: ', this.selectedDataset)
    console.log("selected Dataset:", databaseInfo);
  }

  connectDB() {
    console.log(this.currentForm);
    let connectionData: { [key: string]: any } = {};
    this.currentForm.fields.forEach((field: any) => {
      connectionData[field.name] = field.value;
    });
    connectionData["type"] = this.dataSetCategories.displayName;
    console.log("connection data:", connectionData);
    this.apiService.establishConnection(connectionData).subscribe(
      (res) => {
        console.log("success:", JSON.parse(res.tables));
        const tablesData = JSON.parse(res.tables);
        let treeData: Array<IDBTable> = [];
        tablesData.forEach((database: any, index: number) => {
          ++index;
          const tables: IDBTable[] = database.collections.map(
            (
              collection: { collectionName: string; status: boolean },
              i: number
            ) => {
              return {
                id: `${index}_${++i}`,
                text: collection.collectionName,
                isTable: true,
                parentDB: database.name,
              };
            }
          );

          treeData.push({
            id: `${index}`,
            text: database.name,
            expanded: true,
            items: tables,
          });
        });
        this.connection = res;
        this.dataBaseConnected = true;
        this.treeView.DBTables = treeData;
        this.tabGroup.selectedIndex = 1;
        this.notifier.notify("success", "Connection Successful");
      },
      (error) => {
        console.log("error:", error.message);
        this.notifier.notify("error", "Whoops, something went wrong.");
      }
    );
  }
  selectDBTables(selectionData: any) {
    this.selectedTables = selectionData;
  }

  connectTables() {
    console.log("selected tables:", this.selectedTables);
    const selectedTables = this.selectedTables
      .filter((table: IDBTable) => table.isTable)
      .reduce((acc: any[], table: IDBTable) => {
        // Find the database in the accumulator
        const db = acc.find((db) => db.name === table.parentDB);

        const collectionName = table.text;
        if (db) {
          // If the database is already in the accumulator, add the table to its collections
          db.collections.push({
            collectionName: collectionName,
            status: true,
          });
        } else {
          // If the database is not in the accumulator, add it
          acc.push({
            name: table.parentDB,
            collections: [{ collectionName: collectionName, status: true }],
          });
        }

        return acc;
      }, []);
    const data = {
      type: this.connection.type,
      tables: JSON.stringify(selectedTables),
      host: this.connection.host,
    };
    console.log("data:", data);
    this.apiService.connectTables(data).subscribe(
      (res) => {
        console.log("success:", res);
        this.notifier.notify("success", "Tables Connected Successfully");
      },
      (error) => {
        console.log("error:", error.message);
        this.notifier.notify("error", "Whoops, something went wrong.");
      }
    );
  }
}

const allSelectConnects: any[] = [
  {
    id: 1,
    connect: "Material master",
  },
  {
    id: 2,
    connect: "customer master",
  },
  {
    id: 3,
    connect: "supplier master",
  },
  {
    id: 4,
    connect: "inventory transaction",
  },
  {
    id: 5,
    connect: "customer transaction",
  },
  {
    id: 6,
    connect: "sales transaction",
  },
  {
    id: 7,
    connect: "customer backlog",
  },
  {
    id: 8,
    connect: "supplier transaction",
  },
  {
    id: 9,
    connect: "purchase transaction",
  },
  {
    id: 10,
    connect: "purchase backlog",
  },
  {
    id: 11,
    connect: "process routing",
  },
];

const mBrainSelectConnects: any[] = [
  {
    id: 1,
    connect: "Operator Cycle Times",
  },
  {
    id: 2,
    connect: "Planned Cycle Time",
  },
  {
    id: 3,
    connect: "Downtimes",
  },
  {
    id: 4,
    connect: "Changeovers",
  },
  {
    id: 5,
    connect: "Process Exit Cycles",
  },
  {
    id: 6,
    connect: "Process Lead Time",
  },
  {
    id: 7,
    connect: "WIP",
  },
];

const salesforceSelectConnects: any[] = [
  {
    id: 1,
    connect: "Historical Sales Data",
  },
  {
    id: 2,
    connect: "Customer Data",
  },
  {
    id: 3,
    connect: "Opportunity Data",
  },
  {
    id: 4,
    connect: "Lead Data",
  },
  {
    id: 5,
    connect: "Product Data",
  },
  {
    id: 6,
    connect: "Campaign Data",
  },
  {
    id: 7,
    connect: "Service Data",
  },
];
