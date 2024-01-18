import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DxTreeViewModule } from "devextreme-angular";
import { TreeViewComponent } from "./tree-view.component";

@NgModule({
  declarations: [TreeViewComponent],
  imports: [CommonModule, DxTreeViewModule],
  exports: [TreeViewComponent],
})
export class TreeViewModule {}
