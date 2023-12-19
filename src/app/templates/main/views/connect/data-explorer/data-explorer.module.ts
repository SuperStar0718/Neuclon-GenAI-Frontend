import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { DataExplorerRoutingModule } from "./data-explorer-routing.module";
import { DataExplorerComponent } from "./data-explorer.component";
import { MaterialModule } from "src/app/shared/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { DropDownBoxModule } from "../drop-down-box/drop-down-box.module";
import { MatButtonModule } from "@angular/material/button";
import { DxDropDownButtonModule } from "devextreme-angular";
import { MatTableExporterModule } from "mat-table-exporter";
import { MatTableModule } from "@angular/material/table";

/**
 * Custom angular notifier options
 */
const customNotifierOptions: NotifierOptions = {
    position: {
        horizontal: {
            position: "right",
            distance: 12,
        },
        vertical: {
            position: "top",
            distance: 12,
            gap: 10,
        },
    },
    theme: "material",
    behaviour: {
        autoHide: 5000,
        onClick: "hide",
        onMouseover: "pauseAutoHide",
        showDismissButton: true,
        stacking: 4,
    },
    animations: {
        enabled: true,
        show: {
            preset: "slide",
            speed: 300,
            easing: "ease",
        },
        hide: {
            preset: "fade",
            speed: 300,
            easing: "ease",
            offset: 50,
        },
        shift: {
            speed: 300,
            easing: "ease",
        },
        overlap: 150,
    },
};

@NgModule({
    declarations: [DataExplorerComponent],
    imports: [
        CommonModule,
        DataExplorerRoutingModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatNativeDateModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        DropDownBoxModule,
        NotifierModule.withConfig(customNotifierOptions),
        MatButtonModule,
        DxDropDownButtonModule,
        MatTableExporterModule,
        MatTableModule,
    ],
})
export class DataExplorerModule {}
