import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateModelRoutingModule } from './template-model-routing.module';
import { TemplateModelComponent } from './template-model.component';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  declarations: [TemplateModelComponent],
  imports: [CommonModule, TemplateModelRoutingModule, CoreModule],
})
export class TemplateModelModule {}
