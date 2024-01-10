import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CopilotRoutingModule } from "./copilot-routing.module";
import { CopilotComponent } from "./copilot.component";
import { SharedModule } from "src/app/shared/shared.module";
import { ChatContentComponent } from "./chat-content/chat-content.component";
import { MarkdownModule } from "ngx-markdown";
import { DropDownBoxModule } from "../connect/drop-down-box/drop-down-box.module";

@NgModule({
    declarations: [CopilotComponent, ChatContentComponent],
    imports: [
        CommonModule,
        CopilotRoutingModule,
        SharedModule,
        MarkdownModule.forRoot(),
        DropDownBoxModule,
    ],
    providers: [],
})
export class CopilotModule {}
