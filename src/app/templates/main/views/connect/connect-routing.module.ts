import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { connect } from 'rxjs';
import { ConnectComponent } from './connect/connect.component';

const routes: Routes = [
  { path: '', component: ConnectComponent },
  {
    path: 'manage-connection',
    loadChildren: () => import('./manage-connection/manage-connection.module').then(m => m.ManageConnectionModule),
  },
  {
    path: 'new-connection',
    loadChildren: () => import('./new-connection/new-connection.module').then(m => m.NewConnectionModule),
  },
  {
    path: 'data-explorer',
    loadChildren: () => import('./data-explorer/data-explorer.module').then(m => m.DataExplorerModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConnectRoutingModule {}
