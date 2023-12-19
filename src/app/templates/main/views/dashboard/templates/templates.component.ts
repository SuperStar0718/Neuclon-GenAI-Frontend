import { Component, OnInit } from '@angular/core';
import { Template } from './templates.model';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss'],
})
export class TemplatesComponent implements OnInit {
  cardsList: Template[] = [
    {
      img: './assets/images/d1.png',
      date: 14,
      month: 'APR',
      h_text: 'Executive Dashboard',
      p_text: 'Provide high-level insight into operations performance.',
    },
    {
      img: './assets/images/d2.png',
      date: 19,
      month: 'APR',
      h_text: 'Marketing Dashbaord',
      p_text: 'Tracks digital marketing, social media, content marketing, PPC, and SEO performance.',
    },
    {
      img: './assets/images/d3.png',
      date: 14,
      month: 'APR',
      h_text: 'Sales Dashboard',
      p_text: 'Provides comprehensive insight into performance of Sales Operations.',
    },
    {
      img: './assets/images/d4.png',
      date: 18,
      month: 'APR',
      h_text: 'Infrastructure Dashboard',
      p_text: 'Monitors system status and performance in real-time.',
    },
    {
      img: './assets/images/d5.png',
      date: 15,
      month: 'APR',
      h_text: 'Supply Chain Dashboard',
      p_text: 'Tracks inventory levels, logistics management, and warehouse operations.',
    },
    {
      img: './assets/images/d6.png',
      date: 11,
      month: 'APR',
      h_text: 'Call Center Dashboard',
      p_text:
        'Gain visibility into real-time, business-critical metrics on customer satisfication, lead pipeline, upcoming orders etc.',
    },
  ];
  constructor(
    private sharedService: SharedService
  ) {}


    ngOnInit(): void {
    this.sharedService.component.next('Template');
    localStorage.setItem('activeComp', 'Template');
  }
}
