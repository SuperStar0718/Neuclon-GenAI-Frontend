import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
// import { Alert, AskingAlert } from '../models/alert';
// import { appButton } from '../models/appButton';
// import { AlertService } from '../services/alert.service';
// import { ApiService } from '../services/api.service';

@Component({
  selector: "app-global-list",
  template: ``,
})
export class GlobalListComponent implements OnInit {
  allDataItems: any[] = [];
  dataItems: any[] = [];
  pagination: any;
  pageNumber: any = 1;
  pageSize: any = 10;
  filterUrl: any;
  deleteApi!: string;
  listApi!: string;
  paginationUrl!: string;
  type: any;
  sub!: Subscription;
  tableProps: any = {};

  constructor(
    protected router: Router,
    protected _route: ActivatedRoute // protected apiService: ApiService, // protected alertService: AlertService
  ) {
    this.dataItems = [];
    this.pagination = {
      page: this.pageNumber,
      pages: this.pageSize,
      perPage: 10,
      count: 100,
    };
    this.paginationUrl = `?PageNumber=${this.pagination.page}&PageSize=${this.pagination.perPage}&SortColumn=id&SortOrder=z`;
  }

  ngOnInit() {
    this.sub = this._route.params.subscribe((params) => {
      this.type = params["type"];
    });
  }

  onClickActionRoute(url: string): void {
    this.router.navigateByUrl(url);
  }

  onDateRange(event: any): void {}

  onPagination(event: any): void {
    this.pageNumber = event.page;
    this.pageSize = event.perPage;
    this.paginationUrl = `?PageNumber=${this.pageNumber}&PageSize=${this.pageSize}&SortColumn=id&SortOrder=z`;
    this.pagination.page = this.pageNumber;
    this.pagination.perPage = this.pageSize;
    this.pagination.pages = Math.floor(
      this.allDataItems.length / this.pagination.perPage + 1
    );

    const startAt = (this.pageNumber - 1) * this.pageSize;
    const endAt = startAt + this.pageSize;
    this.dataItems = this.allDataItems.slice(startAt, endAt);
  }

  setPage(event: any) {
    this.pageNumber = event.page;
    this.pageSize = event.perPage;
    this.getListPost();
  }

  finalFilters(event: any): void {
    let filterUrl = "";

    if (event.sort) {
      filterUrl = filterUrl + event.sort;
    }
    if (event.range) {
      filterUrl = filterUrl + event.range;
    }
    if (event.search) {
      filterUrl = filterUrl + `&Search=${event.search}`;
    }

    if (event.date) {
      filterUrl = filterUrl + event.date;
    }

    this.getList(filterUrl);
  }

  getList(filterUrl?: any): void {
    let url = this.listApi;

    if (this.paginationUrl) {
      url = url + this.paginationUrl;
    }

    if (filterUrl) {
      url = url + filterUrl;
      this.filterUrl = filterUrl;
    }

    // this.apiService.get(url).then((result:any) => {
    //   if (result?.succeeded) {
    //     if (result.data != null) {
    //       if (result.data.hasOwnProperty('listing')) {
    //         this.dataItems = result.data.listing;
    //       } else {
    //         this.dataItems = result.data;
    //       }
    //     }
    //     else {
    //       this.dataItems = [];
    //     }
    //     this.pagination = {
    //       count: result.totalRecords,
    //       pages: result.totalPages,
    //       page: result.pageNumber,
    //       perPage: this.pageSize
    //     };
    //     this.afterListResponse();
    //   } else {
    //     this.dataItems = [];
    //     this.alertService.error('error', {
    //       heading: 'Error',
    //       message: result.message
    //     });
    //   }
    // });
  }

  getListPost(obj?: any): void {
    let url = this.listApi;
    obj["pageNumber"] = this.pageNumber;
    obj["pageSize"] = this.pageSize;
    // this.apiService.post(url, obj).then(result => {
    //   if (result?.succeeded) {
    //     if (result.data.hasOwnProperty('listing')) {
    //       this.dataItems = result.data.listing;
    //     } else {
    //       this.dataItems = result.data;
    //     }
    //     this.pagination = {
    //       'count': result.totalRecords,
    //       'pages': result.totalPages,
    //       'page': result.pageNumber
    //     };
    //     this.afterListResponse();
    //   } else {
    //     this.dataItems = [];
    //     this.alertService.error('error', {
    //       heading: 'Error',
    //       message: result.message
    //     });
    //   }
    // });
  }

  afterListResponse(): void {}

  onDelete(url: string) {
    // let data: AskingAlert = {
    //   heading: 'Delete',
    //   message: 'Are you sure you want to delete?',
    //   leftButton: 'Cancel',
    //   rightButton: 'Delete'
    // }
    // this.alertService.askAlert('ask', data).then((result:any) => {
    //   if (result.key) {
    //     this.apiService.get(url).then((result:any) => {
    //       if (result.succeeded) {
    //         this.getList();
    //         this.alertService.success('success',{
    //           heading:'Success',
    //           message: result.message
    //         });
    //       } else {
    //         this.alertService.error('error',{
    //           heading:'Error',
    //           message: result.message
    //         });
    //       }
    //     });
    //   }else{
    //     this.getList();
    //   }
    // });
  }

  actionClicked(event: any) {
    console.log("actionClicked", event);
  }

  searchData(event: any) {
    let obj = { search: event };
    this.finalFilters(obj);
  }

  onDateFilters(event: any) {
    console.log("onDateFilters", event);
  }

  headerButton(event: any) {
    console.log("headerButton", event);
  }

  onChangefilter(event: any) {}
}
