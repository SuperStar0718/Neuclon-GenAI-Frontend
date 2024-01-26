import { BreakpointObserver } from "@angular/cdk/layout";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { BreakpointobserverService } from "src/app/services/breakpointobserver.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  isExpandedLeftSidebar: boolean = false;
  isExpandedRightSidebar: boolean = false;
  isExpandable: boolean = false;
  isMdBreakpoint: boolean = false;
  isSmBreakpoint: boolean = false;
  isLgBreakpoint: boolean = false;
  isXsBreakpoint: boolean = false;
  isSidebarExtend: boolean | undefined;
  hasHeader: boolean = true;

  @ViewChild("sidenav") sidenav: ElementRef | undefined;

  bgActive: boolean = false;
  sidenavMode: any = "over";

  constructor(
    private breakpointObserverService: BreakpointobserverService,
    private bpS: BreakpointObserver,
    private elementRef: ElementRef,
    private router: Router
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hasHeader = !event.url.includes("automation");
      }
    });
  }

  ngOnInit(): void {
    this.isLgBreakpoint = this.breakpointObserverService.isLgBreakpoint;
    this.isMdBreakpoint = this.breakpointObserverService.isMdBreakpoint;
    this.isSmBreakpoint = this.breakpointObserverService.isSmBreakpoint;
    this.isXsBreakpoint = this.breakpointObserverService.isXsBreakpoint;
  }

  extendRightSidebar(isExtend: boolean) {
    this.isSidebarExtend = isExtend;
  }
}
