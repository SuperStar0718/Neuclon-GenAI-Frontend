import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ConnectRoutingModule } from "./connect-routing.module";
import { MaterialModule } from "src/app/shared/material.module";
import { ConnectDeviceComponent } from "./connect-device/connect-device.component";
import { DatasetSynchronizationComponent } from "./dataset-synchronization/dataset-synchronization.component";
import { ConnectComponent } from "./connect/connect.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "src/app/core/core.module";
import { MatRadioModule } from "@angular/material/radio";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { DataExplorerComponent } from "./data-explorer/data-explorer.component";
import { MatPaginatorGotoComponent } from "./mat-paginator-goto/mat-paginator-goto.component";
import { DropDownBoxComponent } from "./drop-down-box/drop-down-box.component";
import { DropDownBoxModule } from "./drop-down-box/drop-down-box.module";

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
  declarations: [
    ConnectDeviceComponent,
    DatasetSynchronizationComponent,
    ConnectComponent,
    MatPaginatorGotoComponent,
  ],
  imports: [
    CommonModule,
    ConnectRoutingModule,
    MaterialModule,
    SharedModule,
    CoreModule,
    MatRadioModule,
    FormsModule,
    HttpClientModule,
    DropDownBoxModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
})
export class ConnectModule {}
