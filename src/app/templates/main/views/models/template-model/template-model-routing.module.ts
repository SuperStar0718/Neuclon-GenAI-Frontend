import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateModelComponent } from './template-model.component';

const routes: Routes = [{ path: '', component: TemplateModelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateModelRoutingModule { }
