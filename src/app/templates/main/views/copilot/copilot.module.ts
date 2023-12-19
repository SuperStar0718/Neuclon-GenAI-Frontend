import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CopilotRoutingModule } from './copilot-routing.module';
import { CopilotComponent } from './copilot.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatContentComponent } from './chat-content/chat-content.component';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [CopilotComponent, ChatContentComponent],
  imports: [CommonModule, CopilotRoutingModule, SharedModule, MarkdownModule.forRoot()],
  providers: [],
})
export class CopilotModule {}
