import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class AppPaginationComponent implements OnInit {
  @Output() setPage: EventEmitter<any> = new EventEmitter<any>();
  @Input() pagination: any;
  perPage: any = '10';

  constructor() {}

  ngOnInit() {}

  setPagination(page: any) {
    let obj = { page: page, perPage: +this.perPage };
    this.setPage.emit(obj);
  }

  onChangePerPage(evt: any) {
    let obj = { page: this.pagination.page, perPage: +evt.value };
    this.perPage = evt.value;
    this.setPage.emit(obj);
  }

  getPaginationText() {
    let pagination;
    if (this.pagination.page < this.pagination?.pages) {
      pagination = `${this.pagination.page} - ${this.pagination.perPage * this.pagination?.page} of ${
        this.pagination?.count
      }`;
    } else if (this.pagination?.page == this.pagination?.pages) {
      pagination = `${this.pagination?.count} of ${this.pagination?.count}`;
    } else {
      pagination = '0 of 0';
    }

    return pagination;
  }
}
