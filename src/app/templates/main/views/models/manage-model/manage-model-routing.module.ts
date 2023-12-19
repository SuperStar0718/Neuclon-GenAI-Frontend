import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageModelComponent } from './manage-model.component';

const routes: Routes = [{ path: '', component: ManageModelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageModelRoutingModule { }
