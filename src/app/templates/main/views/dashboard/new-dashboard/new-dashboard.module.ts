import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewDashboardRoutingModule } from './new-dashboard-routing.module';
import { NewDashboardComponent } from './new-dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NewDashboardComponent],
  imports: [CommonModule, NewDashboardRoutingModule, SharedModule],
})
export class NewDashboardModule {}
