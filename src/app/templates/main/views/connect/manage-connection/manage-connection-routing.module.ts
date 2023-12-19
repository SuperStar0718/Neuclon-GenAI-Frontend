import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageConnectionComponent } from './manage-connection.component';

const routes: Routes = [{ path: '', component: ManageConnectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageConnectionRoutingModule { }
