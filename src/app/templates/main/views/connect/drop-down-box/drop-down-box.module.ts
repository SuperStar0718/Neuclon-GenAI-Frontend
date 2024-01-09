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
import { NotifierModule, NotifierOptions } from "angular-notifier";
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

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
  position: {
      horizontal: {
          position: "right",
          distance: 12,
      },
      vertical: {
          position: "top",
          distance: 12,
          gap: 10,
      },
  },
  theme: "material",
  behaviour: {
      autoHide: 5000,
      onClick: "hide",
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4,
  },
  animations: {
      enabled: true,
      show: {
          preset: "slide",
          speed: 300,
          easing: "ease",
      },
      hide: {
          preset: "fade",
          speed: 300,
          easing: "ease",
          offset: 50,
      },
      shift: {
          speed: 300,
          easing: "ease",
      },
      overlap: 150,
  },
};


@NgModule({
  declarations: [DropDownBoxComponent],
  imports: [
    CommonModule,
    BrowserTransferStateModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    HttpClientModule,
    DxDataGridModule,
    NotifierModule.withConfig(customNotifierOptions),

  ],
  exports: [DropDownBoxComponent],
})
export class DropDownBoxModule {}
// platformBrowserDynamic().bootstrapModule(DropDownBoxModule);
