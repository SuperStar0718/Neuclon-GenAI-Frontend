import { Component, OnInit, ViewChild } from "@angular/core";
import {
    AbstractControl,
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
} from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { startWith, tap } from "rxjs/operators";
import { ApiService } from "src/app/services/api.service";
import { NotifierService } from "angular-notifier";
import { SharedService } from "src/app/services/shared.service";
import { DropDownBoxComponent } from "../drop-down-box/drop-down-box.component";
import { MatButtonModule } from "@angular/material/button";

import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import autoTable, { RowInput } from "jspdf-autotable";

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

@Component({
    selector: "app-data-explorer",
    templateUrl: "./data-explorer.component.html",
    styleUrls: ["./data-explorer.component.css"],
})
export class DataExplorerComponent implements OnInit {
    @ViewChild(MatTable) table: MatTable<any>;
    displayedColumns: string[];
    dataSource = new MatTableDataSource<any>();
    filteredData: any[];
    dbName: string;

    isLoading = true;
    noData = false;
    tempData: any;
    private readonly notifier: NotifierService;

    pageNumber: number = 1;
    VOForm: FormGroup;
    isEditableNew: boolean = true;
    dataGroup: any;

    actions: Array<{ id: Number; text: String; icon: String; value: String }> =
        [
            { id: 1, text: "Export to PDF", icon: "exportpdf", value: "pdf" },
            {
                id: 2,
                text: "Export to Excel",
                icon: "exportxlsx",
                value: "xlsx",
            },
        ];

    constructor(
        private fb: FormBuilder,
        private _formBuilder: FormBuilder,
        private apiService: ApiService,
        notifierService: NotifierService,
        private sharedService: SharedService
    ) {
        this.notifier = notifierService;
    }

    onSelectedDatabaseInfoChange(databaseInfo: any): void {
        console.log("databaseInfo", databaseInfo);
        this.dbName = databaseInfo.name;
        this.isLoading = true;
        if (!databaseInfo) {
            this.isLoading = false;
            return;
        }
        this.fetchDataFromDatabase(databaseInfo);
    }

    logAction(e: any) {
        console.log(e.itemData.value + " was clicked");
        if(e.itemData.value === "xlsx")
            this.exportAsXLSX()
    }
    logButtonClick(value: String) {
        console.log("value:", value);
    }

    exportAsPDF() {
        let tableColumns =[... this.displayedColumns]
        tableColumns.pop(); // Remove the last element (action field)

        const tableData:any = this.filteredData.map((row) =>{
            let rowData = {...row.value};
            let rowValues: any[] = [];

            tableColumns.forEach(x => {
                if (x==='isEditable' || x==='isNewRow' || x==='action'){
                    return;
                } 
                if (!rowData.hasOwnProperty(x)) {
                  rowData[x] = 'Null';
                }
                rowValues.push(rowData[x]);
            });
            return rowValues;
        });
        console.log("tableData", tableData);

        const format = tableColumns.length < 12 ? 'a3' : 'a2';

        const doc = new jsPDF({
            format: format,
            orientation: 'landscape',
        });
        console.log("tableColumns", tableColumns);

        autoTable(doc, {
            head: [tableColumns],
            body: tableData,
        });

        doc.save(`${this.dbName}.pdf`);
    }

    exportAsXLSX() {
        let tableColumns =[... this.displayedColumns]
        tableColumns.pop(); // Remove the last element (action field)
        const tableData:any = this.filteredData.map((row) =>{
            let rowData = {...row.value};
            let rowValues: any[] = [];

            tableColumns.forEach(x => {
                if (x==='isEditable' || x==='isNewRow' || x==='action'){
                    return;
                } 
                if (!rowData.hasOwnProperty(x)) {
                  rowData[x] = 'Null';
                }
                rowValues.push(rowData[x]);
            });
            return rowValues;
        });
        console.log("tableData", tableData);
        tableData.unshift(tableColumns);
        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
            tableData
        );
        const workbook: XLSX.WorkBook = {
            Sheets: { data: worksheet },
            SheetNames: ["data"],
        };
        const excelBuffer: any = XLSX.write(workbook, {
            bookType: "xlsx",
            type: "array",
        });
        const data: Blob = new Blob([excelBuffer], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
        });
        const fileName: string = `${this.dbName}.xlsx`;
        saveAs(data, fileName);
    }

    fetchDataFromDatabase(databaseInfo: any): void {
        this.apiService.getData(databaseInfo).subscribe((data: Array<any>) => {
            console.log("data", data);
            if (data.length === 0) {
                this.noData = true;
                this.isLoading = false;
                return;
            }
            const formGroups = data.map((item) => {
                const group: { [key: string]: FormControl } = {};
                Object.keys(item).forEach((key) => {
                    group[key] = new FormControl(item[key]);
                });
                group["action"] = new FormControl("existingRecord");
                group["isEditable"] = new FormControl(true);
                group["isNewRow"] = new FormControl(false);
                return new FormGroup(group);
            });
            this.dataGroup = formGroups;

            this.VOForm = this.fb.group({
                VORows: this.fb.array(formGroups),
            });

            this.isLoading = false;
            this.dataSource = new MatTableDataSource(
                (this.VOForm.get("VORows") as FormArray).controls
            );
            this.filteredData = this.dataSource.data;
            this.dataSource.paginator = this.paginator;
            console.log("data source data:", this.dataSource.data);

            if (
                this.VOForm.get("VORows") &&
                this.VOForm.get("VORows")?.value.length > 0
            ) {
                this.displayedColumns = Object.keys(
                    this.VOForm.get("VORows")?.value[0]
                );
            }
            this.displayedColumns.pop();
            this.displayedColumns.pop();
            // console.log("this.displayedColumns", this.displayedColumns);
            const filterPredicate = this.dataSource.filterPredicate;
            this.dataSource.filterPredicate = (
                data: AbstractControl,
                filter
            ) => {
                return filterPredicate.call(
                    this.dataSource,
                    data.value,
                    filter
                );
            };
        });
    }

    ngOnInit(): void {
        localStorage.setItem("activeComp", "Data Explorer");
        this.sharedService.component.next("Data Explorer");

        this.VOForm = this._formBuilder.group({
            VORows: this._formBuilder.array([]),
        });

        //Custom filter according to name column
        // this.dataSource.filterPredicate = (data: {name: string}, filterValue: string) =>
        //   data.name.trim().toLowerCase().indexOf(filterValue) !== -1;
    }

    @ViewChild(MatPaginator) paginator: MatPaginator;

    goToPage() {
        this.paginator.pageIndex = this.pageNumber - 1;
        this.paginator.page.next({
            pageIndex: this.paginator.pageIndex,
            pageSize: this.paginator.pageSize,
            length: this.paginator.length,
        });
    }
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.paginatorList = document.getElementsByClassName(
            "mat-paginator-range-label"
        );

        this.onPaginateChange(this.paginator, this.paginatorList);

        this.paginator.page.subscribe(() => {
            // this is page change event
            this.onPaginateChange(this.paginator, this.paginatorList);
        });
    }

    applyFilter(event: Event) {
        //  debugger;
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        // Get the filtered data
        this.filteredData = this.dataSource.filteredData;
    }

    // @ViewChild('table') table: MatTable<PeriodicElement>;
    AddNewRow() {
        // this.getBasicDetails();
        const control = this.VOForm.get("VORows") as FormArray;
        control.insert(0, this.dataGroup);
        this.dataSource = new MatTableDataSource(control.controls);
        // control.controls.unshift(this.initiateVOForm());
        // this.openPanel(panel);
        // this.table.renderRows();
        // this.dataSource.data = this.dataSource.data;
    }

    // this function will enabled the select field for editd
    EditSVO(VOFormElement: any, i: any) {
        // VOFormElement.get('VORows').at(i).get('name').disabled(false)
        this.tempData = VOFormElement.get("VORows").at(i).value;
        VOFormElement.get("VORows").at(i).get("isEditable").patchValue(false);
        // this.isEditableNew = true;
    }

    // On click of correct button in table (after click on edit) this method will call
    SaveVO(VOFormElement: any, i: any) {
        const data = {
            data: VOFormElement.get("VORows").at(i).value,
            db: "mongodb",
        };
        console.log("data", data);
        this.apiService.saveData(data).subscribe(
            (res) => {
                console.log("res", res);
                this.notifier.notify("success", "Saved Successfully");
            },
            (error) => {
                console.log(error);
                //set the previous data
                VOFormElement.get("VORows").at(i).patchValue(this.tempData);
                this.notifier.notify("error", "Whoops, something went wrong.");
            }
        );

        // alert('SaveVO')
        VOFormElement.get("VORows").at(i).get("isEditable").patchValue(true);
    }

    // On click of cancel button in the table (after click on edit) this method will call and reset the previous data
    CancelSVO(VOFormElement: any, i: any) {
        VOFormElement.get("VORows").at(i).patchValue(this.tempData);

        // VOFormElement.get('VORows').at(i).get('isEditable').patchValue(true);
    }

    // On click of delete button in the table this method will call
    DeleteSVO(VOFormElement: any, i: any) {
        const data = {
            data: VOFormElement.get("VORows").at(i).value,
            db: "mongodb",
        };
        this.apiService.deleteData(data).subscribe(
            (res) => {
                console.log("res", res);
                VOFormElement.get("VORows").removeAt(i);
                // console.log("data rows:",VOFormElement.get('VORows').controls)
                this.dataSource.data = VOFormElement.get("VORows").controls;
                this.notifier.notify("success", "Deleted Successfully");

                this.table.renderRows();
                // this.dataSource = new MatTableDataSource(VOFormElement.controls);
            },
            (error) => {
                console.log(error);
                this.notifier.notify("error", "Whoops, something went wrong.");
            }
        );
    }

    paginatorList: HTMLCollectionOf<Element>;
    idx: number;
    onPaginateChange(paginator: MatPaginator, list: HTMLCollectionOf<Element>) {
        setTimeout(
            (idx) => {
                let from = paginator.pageSize * paginator.pageIndex + 1;

                let to =
                    paginator.length <
                    paginator.pageSize * (paginator.pageIndex + 1)
                        ? paginator.length
                        : paginator.pageSize * (paginator.pageIndex + 1);

                let toFrom = paginator.length == 0 ? 0 : `${from} - ${to}`;
                let pageNumber =
                    paginator.length == 0
                        ? `0 of 0`
                        : `${
                              paginator.pageIndex + 1
                          } of ${paginator.getNumberOfPages()}`;
                let rows = `Page ${pageNumber} (${toFrom} of ${paginator.length})`;

                if (list.length >= 1) list[0].innerHTML = rows;
            },
            0,
            paginator.pageIndex
        );
    }

    initiateVOForm(): FormGroup {
        // return this.fb.group(this.dataGroup);
        return this.fb.group({
            VORows: this.fb.array(this.dataGroup),
        });

        // return this.fb.group({
        //   position: new FormControl(234),
        //   name: new FormControl(""),
        //   weight: new FormControl(""),
        //   symbol: new FormControl(""),
        //   action: new FormControl("newRecord"),
        //   isEditable: new FormControl(false),
        //   isNewRow: new FormControl(true),
        // });
    }
}
