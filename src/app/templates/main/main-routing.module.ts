import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'models',
    loadChildren: () => import('./views/models/models.module').then(m => m.ModelsModule),
  },
  {
    path: 'connect',
    loadChildren: () => import('./views/connect/connect.module').then(m => m.ConnectModule),
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  
  {
    path: 'copilot',
    loadChildren: () => import('./views/copilot/copilot.module').then(m => m.CopilotModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
