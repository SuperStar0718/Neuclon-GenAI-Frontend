import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewModelRoutingModule } from './new-model-routing.module';
import { NewModelComponent } from './new-model.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { DiagramComponent } from './diagram/diagram.component';
import { InspectorComponent } from './inspector/inspector.component';
import { JointjsComponent } from './jointjs/jointjs.component';

@NgModule({
  declarations: [NewModelComponent, DiagramComponent, InspectorComponent, JointjsComponent],
  imports: [CommonModule, NewModelRoutingModule, SharedModule, CoreModule],
})
export class NewModelModule {}
