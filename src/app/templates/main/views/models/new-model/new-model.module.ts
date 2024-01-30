import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { NewModelRoutingModule } from "./new-model-routing.module";
import { NewModelComponent } from "./new-model.component";
import { SharedModule } from "src/app/shared/shared.module";
import { CoreModule } from "src/app/core/core.module";
import { DiagramComponent } from "./diagram/diagram.component";
import { InspectorComponent } from "./inspector/inspector.component";
import { JointjsComponent } from "./jointjs/jointjs.component";
import { NotifierModule, NotifierOptions } from "angular-notifier";

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
    NewModelComponent,
    DiagramComponent,
    InspectorComponent,
    JointjsComponent,
  ],
  imports: [
    CommonModule,
    NewModelRoutingModule,
    SharedModule,
    CoreModule,
    NotifierModule.withConfig(customNotifierOptions),
  ],
})
export class NewModelModule {}
