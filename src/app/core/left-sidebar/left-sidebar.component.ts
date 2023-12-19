import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Connectors } from 'src/app/Models/sidebar';
import { BreakpointobserverService } from 'src/app/services/breakpointobserver.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss'],
})
export class LeftSidebarComponent implements OnInit {
  @Input() isHideSidebarMenu: boolean | undefined;

  // breakpoints variables
  isSmBreakpoint: boolean = false;
  isXsBreakpoint: boolean = false;
  isBgToggled: boolean = false;
  isNestedNode: boolean = false;
  istoggle: boolean = false;

  // site menu variables
  selectedNode: any;
  isSelectedItem: Connectors | undefined;
  hasChild: boolean = false;
  sidebarMenu = UpperConnectors;
  sidebarMenu1 = LowerConnectors;

  constructor(private breakpointObserver: BreakpointobserverService, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.isXsBreakpoint = this.breakpointObserver.isXsBreakpoint;
    this.isSmBreakpoint = this.breakpointObserver.isSmBreakpoint;
  }

  onNodeClicked(item: Connectors) {
    this.istoggle = !this.istoggle;

    if (item == this.isSelectedItem) this.isSelectedItem = undefined;
    else this.isSelectedItem = item;
    this.sharedService.component.next(item.name);
    localStorage.setItem('activeComp', item.name);
  }

  onChildrenClicked(title : String){
    localStorage.setItem('activeComp', title.toString());
  }
}

const LowerConnectors: Connectors[] = [
  {
    img: '../../../assets/icons/CRM.svg',
    name: 'CRM',
    children: [{ name: 'Device' }, { name: 'Application' }],
  },
  {
    img: '../../../assets/icons/ERP.svg',
    name: 'ERP',
  },
  {
    img: '../../../assets/icons/Robots.svg',
    name: 'Robots',
  },
  {
    img: '../../../assets/icons/IoTSensors.svg',
    name: 'IoT Sensors',
  },
  {
    img: '../../../assets/icons/OPC.svg',
    name: 'OPC',
  },
  {
    img: '../../../assets/icons/CNC.svg',
    name: 'CNC',
  },
  {
    img: '../../../assets/icons/TestSystems.svg',
    name: 'Test Systems',
  },
  {
    img: '../../../assets/icons/HRMS.svg',
    name: 'HRMS',
  },
];

const UpperConnectors: Connectors[] = [
  {
    name: 'Home',
    route: 'home',
  },

  {
    img: '../../../assets/icons/Connect.svg',
    name: 'Connect',
    children: [
      { name: 'App Center', route: 'connect/new-connection' },
      { name: 'Manage Connections', route: 'connect/manage-connection' },
      { name: 'Data Explorer', route: 'connect/data-explorer'},
    ],
    route: 'connect',
  },
  
  {
    img: '../../../assets/icons/Model.svg',
    name: 'Models',
    route: 'models',
    children: [
      { name: 'Model Templates', route: 'models/model-templates' },
      { name: 'New Model', route: 'models/new-model' },
      { name: 'Manage Model', route: 'models/manage-model' },
    ],
  },
  {
    img: '../../../assets/icons/Dashboard.svg',
    name: 'Dashboard',
    route: 'dashboard',
    children: [
      { name: 'Template', route: 'dashboard/templates' },
      { name: 'New DashBoard', route: 'dashboard/new-dashboard' },
    ],
  },
  {
    img: '../../../assets/icons/CoPllotConfig.svg',
    name: 'Copllot',
    route: 'copilot',
  },
];
