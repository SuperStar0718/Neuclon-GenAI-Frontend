import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { appButton } from 'src/app/Models/appButton';
import { Config } from '../../../config';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '80px' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AppTableComponent implements OnInit, OnChanges {
  objectKeys = Object.keys;
  @Input() dataSource: any = [];
  @Input() pagination: any;
  @Output() actionClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitCheckBox: EventEmitter<any> = new EventEmitter<any>();
  @Output() setPage: EventEmitter<any> = new EventEmitter<any>();

  checkedBoxes = [];
  headerCheckBoxValue: any;
  defaultPlaceholder: string = Config.default_placeholder;
  fileBaseUrl: string = Config.file_url;
  @Input() tableProps!: {
    colHeader: any;
    columnTypes: any;
    rowActions: appButton[];
    statusConfig: any;
  };

  selection = new SelectionModel<any>(true, []);

  constructor(protected router: Router) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.onAllChecked();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource);
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkBox(event: any, row: any) {
    if (event.checked) {
      row.checked = true;
    } else {
      row.checked = false;
    }
    this.onAllChecked();
  }

  checkBoxAll(checked: any) {
    if (checked) {
      this.dataSource.forEach((item: any) => {
        if (!item['dontShowCB']) {
          item.checked = true;
        }
      });
    } else {
      this.dataSource.forEach((item: any) => {
        item.checked = false;
      });
      this.headerCheckBoxValue = false;
    }
    this.headerCheckBoxValue = true;
    this.onAllChecked();
  }

  onAllChecked() {
    let checkedCount = 0;
    if (this.dataSource?.length > 0) {
      this.dataSource.forEach((element: any) => {
        if (element['checked']) {
          checkedCount++;
        }
      });
    }
    let dataLength = 0;
    if (this.dataSource?.length > 0) {
      this.dataSource.forEach((element: any) => {
        if (!element['dontShowCB']) {
          dataLength++;
        }
      });
    }
    this.headerCheckBoxValue = dataLength > 0 && dataLength == checkedCount ? true : false;

    let obj = {
      checkCount: checkedCount,
      checked: false,
    };
    this.emitCheckBox.emit(obj);
  }

  isChecked() {
    if (this.headerCheckBoxValue) return true;
    return false;
  }

  setPagination(page: any) {
    this.setPage.emit(page);
  }

  getPaginationText() {
    let pagination = 'Total Count: ';
    if (this.pagination.page < this?.pagination?.pages) {
      pagination += this.pagination.per_page * this?.pagination?.page + '/' + this?.pagination?.count;
    } else if (this?.pagination?.page == this?.pagination?.pages) {
      pagination += this?.pagination?.count + '/' + this?.pagination?.count;
    }

    return pagination;
  }

  onRowActionClicked(elem: any, act: any, index: any) {
    let row = {
      element: elem,
      action: act,
      index: index,
    };
    this.actionClicked.emit(row);
  }

  rowActionsVisibility(ele: any) {
    let show = false;
    let count = 0;

    this.tableProps?.rowActions.forEach(item => {
      if (item.type == 'view') {
        item.isCustom = ele.isviewCustom;
      }

      if (item.type == 'edit') {
        item.isCustom = ele.isEditCustom;
      }

      if (item.visibility && (ele[item.type] || !item.isCustom)) {
        count++;
      }
    });
    if (count > 0) {
      show = true;
    }
    return show;
  }
}