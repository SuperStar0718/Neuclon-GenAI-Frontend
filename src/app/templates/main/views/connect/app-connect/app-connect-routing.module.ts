import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConnectComponent } from './app-connect.component';

const routes: Routes = [{ path: '', component: AppConnectComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppConnectRoutingModule {}
