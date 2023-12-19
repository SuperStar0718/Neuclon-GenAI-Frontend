import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'model-templates', pathMatch: 'full' },
  {
    path: 'new-model',
    loadChildren: () => import('./new-model/new-model.module').then(m => m.NewModelModule),
  },
  {
    path: 'model-templates',
    loadChildren: () => import('./template-model/template-model.module').then(m => m.TemplateModelModule),
  },
  {
    path: 'manage-model',
    loadChildren: () => import('./manage-model/manage-model.module').then(m => m.ManageModelModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModelsRoutingModule {}
