import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakpointobserverService implements OnInit {
  isMdBreakpoint: boolean = false;
  isSmBreakpoint: boolean = false;
  isLgBreakpoint: boolean = false;
  isXsBreakpoint: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    // breakpoints observer
    this.isLgBreakpoint = this.breakpointObserver.isMatched(Breakpoints.Large);
    this.isMdBreakpoint = this.breakpointObserver.isMatched(Breakpoints.Medium);
    this.isSmBreakpoint = this.breakpointObserver.isMatched(Breakpoints.Small);
    this.isXsBreakpoint = this.breakpointObserver.isMatched(Breakpoints.XSmall);

    // console.log("breakpoint observer===>>>>", breakpointObserver)
    // console.log(" large breakpoint observer===>>>>", this.isLgBreakpoint)
  }

  ngOnInit(): void {}
}
