import { Component, ElementRef, EventEmitter, Inject, NgZone, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { Config } from 'src/config';
import { AlertComponent } from '../alert/alert.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  default_placeholder: string = Config.default_placeholder;
  activeComponent: string = 'Home';
  durationInSeconds = 5;
  menus: any[] = [
    { label: 'User Settings', img: null, icon: 'person' },
    { label: 'Access denied requests', img: null, icon: 'person' },
    { label: 'Logout', img: null, icon: 'exit_to_app' },
    { label: 'Request support', img: null, icon: 'help' },
  ];
  // isSubHeader: boolean = false;

  constructor(
    private sharedService: SharedService,
    private _snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.sharedService.component.subscribe(comp => {
      if (comp) {
        this.activeComponent = comp;
        console.log('component name:', comp);
        // this.isSubHeader = comp == 'Home' ? true : false;
      }
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('activeComp')) {
      this.activeComponent = localStorage.getItem('activeComp')!;
      // this.isSubHeader = localStorage.getItem('activeComp') == 'Home' ? true : false;
    }
  }

  onChangeLockStatus(evt: any) {
    this.sharedService.widgetLock.next(evt.checked);
    this._snackBar.openFromComponent(AlertComponent, {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: this.durationInSeconds * 1000,
      data: {
        text: evt.checked ? 'Your Dashboard Is Locked Now' : 'Your Dashboard Is Unlocked Now',
        icon: 'check_circle_outline',
      },
    });
  }

  onFullScreen() {
    if (document.fullscreenElement) {
      // If the document is currently in full screen mode, exit full screen.
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    } else {
      // If not in full screen, request full screen.
      const element = document.getElementsByTagName('body')[0];
      if (element.requestFullscreen) {
        element.requestFullscreen();
      }
    }
  }

  onNeuclink() {
    window.location.reload();
  }

  onNeuclonAI(evt: any) {
    window.open('https://neuclonai.vercel.app/', '_blank');
  }

  onNeuclonEdge() {
    window.open('http://demo.neuclonedge.com/', '_blank');
  }
}
