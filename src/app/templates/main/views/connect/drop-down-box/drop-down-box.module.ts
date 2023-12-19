import { CommonModule } from "@angular/common";
import {
  NgModule,
  Component,
  ViewChild,
  enableProdMode,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from "@angular/core";
import {
  BrowserModule,
  BrowserTransferStateModule,
} from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { DropDownBoxComponent } from "./drop-down-box.component";

import {
  DxDropDownBoxModule,
  DxTreeViewModule,
  DxDataGridModule,
  DxTreeViewComponent,
} from "devextreme-angular";

@NgModule({
  declarations: [DropDownBoxComponent],
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    HttpClientModule,
    DxDataGridModule,
  ],
  exports: [DropDownBoxComponent],
})
export class DropDownBoxModule {}
// platformBrowserDynamic().bootstrapModule(DropDownBoxModule);
