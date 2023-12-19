import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [MainComponent],
  imports: [CommonModule, MainRoutingModule, MaterialModule, CoreModule],
})
export class MainModule {}
