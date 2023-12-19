import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewConnectionRoutingModule } from './new-connection-routing.module';
import { NewConnectionComponent } from './new-connection.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [NewConnectionComponent],
  imports: [CommonModule, NewConnectionRoutingModule, MaterialModule, MatRadioModule,],
})
export class NewConnectionModule { }
