import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
sanitzedURL?:SafeUrl
embededURL:string="https://app-backend-ru65767i4t4pc.azurewebsites.net";
  constructor(private domSanitizer:DomSanitizer) {
    this.sanitzedURL=this.domSanitizer.bypassSecurityTrustResourceUrl(this.embededURL);
   }
}
