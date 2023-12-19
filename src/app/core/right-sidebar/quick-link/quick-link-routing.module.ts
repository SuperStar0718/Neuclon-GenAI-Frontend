import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickLinkComponent } from './quick-link.component';

const routes: Routes = [{ path: '', component: QuickLinkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuickLinkRoutingModule { }
