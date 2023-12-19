import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { BreakpointobserverService } from 'src/app/services/breakpointobserver.service';

@Component({
  selector: 'right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss'],
})
export class RightSidebarComponent implements OnInit {
  isExpandable: boolean = false;
  isMdBreakpoint: boolean = false;
  isSmBreakpoint: boolean = false;
  isLgBreakpoint: boolean = false;
  isXsBreakpoint: boolean = false;
  bgActive: boolean = false;
  sidenavMode: any = 'side';
  isFullWidth: boolean = false;

  @Input() isHideRightSidebarMenu: boolean = false;
  @ViewChild('sidenav') sidenav: ElementRef | undefined;
  @Output() onRightSidebar = new EventEmitter<boolean>();

  constructor(
    private breakpointObserverService: BreakpointobserverService,
    private bpS: BreakpointObserver,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.isLgBreakpoint = this.breakpointObserverService.isLgBreakpoint;
    this.isMdBreakpoint = this.breakpointObserverService.isMdBreakpoint;
    this.isSmBreakpoint = this.breakpointObserverService.isSmBreakpoint;
    this.isXsBreakpoint = this.breakpointObserverService.isXsBreakpoint;
  }

  extendRightSidebar() {
    // this.isFullWidth = !this.isFullWidth
    // this.onRightSidebar.emit(this.isFullWidth);

    this.router.navigateByUrl('/main/automation');
  }
}
