import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AICollaboratorComponent } from './ai-collaborator.component';

const routes: Routes = [{ path: '', component: AICollaboratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AICollaboratorRoutingModule { }
