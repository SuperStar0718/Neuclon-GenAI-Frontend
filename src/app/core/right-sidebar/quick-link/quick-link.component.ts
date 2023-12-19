import { Component } from '@angular/core';

@Component({
  selector: 'quick-link',
  templateUrl: './quick-link.component.html',
  styleUrls: ['./quick-link.component.scss']
})
export class QuickLinkComponent {
  quickLinkArray = quickLinkArray;

}

const quickLinkArray = ["real time productivity dashboard", "operator performance analytics", "cell performance analytics", 'SQDIP daily management board', 'line performance analytics', 'machine monitoring dashboard', 'production schedule', 'downtown analytics']

