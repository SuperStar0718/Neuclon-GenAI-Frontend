import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageModelRoutingModule } from './manage-model-routing.module';
import { ManageModelComponent } from './manage-model.component';
import { CoreModule } from 'src/app/core/core.module';


@NgModule({
  declarations: [
    ManageModelComponent
  ],
  imports: [
    CommonModule,
    ManageModelRoutingModule,
    CoreModule
  ]
})
export class ManageModelModule { }
