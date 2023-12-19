import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss'],
})
export class NewDashboardComponent implements OnInit {
  layouts = [
    { sizes: ['50'], icon: './assets/icons/layout-100.svg' },
    { sizes: ['45', '45'], icon: './assets/icons/layout-50-50.svg' },
    { sizes: ['30', '60'], icon: './assets/icons/layout-25-75.svg' },
    { sizes: ['60', '30'], icon: './assets/icons/layout-75-25.svg' },
    { sizes: ['30', '30', '30'], icon: './assets/icons/layout-33-33-33.svg' },
  ];
  selectedLayout: number = 1;
  renderSelectedLayout: string[] = [];
  classes: string =
    'grow-0 md:grow bg-[#EDEDED] border border-dashed border-[#005F65] h-[200px] md:h-[391px]';

  constructor(
    private matIconResgistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private sharedService: SharedService
  ) {
    this.matIconResgistry.addSvgIcon(
      'exit_icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../../../assets/icons/exit.svg'
      )
    );
  }

  ngOnInit(): void {
    this.renderSelectedLayout = this.layouts[this.selectedLayout].sizes;
    this.sharedService.component.next('New Dashboard');
    localStorage.setItem('activeComp', 'New Dashboard');
  }

  onLayoutSelection(index: number) {
    this.selectedLayout = index;
    this.renderSelectedLayout = this.layouts[index].sizes;
  }
}
