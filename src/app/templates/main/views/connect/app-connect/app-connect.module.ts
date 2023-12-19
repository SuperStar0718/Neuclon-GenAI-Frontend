import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppConnectRoutingModule } from './app-connect-routing.module';
import { AppConnectComponent } from './app-connect.component';
import { CoreModule } from '../../../../../core/core.module';

@NgModule({
  declarations: [AppConnectComponent],
  imports: [CommonModule, AppConnectRoutingModule, CoreModule],
})
export class AppConnectModule {}
