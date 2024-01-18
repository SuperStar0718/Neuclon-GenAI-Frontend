import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ManageConnectionRoutingModule } from "./manage-connection-routing.module";
import { ManageConnectionComponent } from "./manage-connection.component";
import { CoreModule } from "../../../../../core/core.module";

@NgModule({
  declarations: [ManageConnectionComponent],
  imports: [CommonModule, ManageConnectionRoutingModule, CoreModule],
})
export class ManageConnectionModule {}
