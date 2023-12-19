import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CopilotComponent } from './copilot.component';

const routes: Routes = [{ path: '', component: CopilotComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopilotRoutingModule {}
