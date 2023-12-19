import { Component } from '@angular/core';

@Component({
  selector: 'app-template-model',
  templateUrl: './template-model.component.html',
  styleUrls: ['./template-model.component.scss'],
})
export class TemplateModelComponent {
  // toggleLayout: boolean = false;
  // templates: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  EXArr: any[] = [
    'Get started by selecting an examples or describing your own automation idea',
    'send this month’s operations reports with sales data attachment via outlook',
    'when a new item is created in SharePoint, send me an email',
    'Copy all rows from an excel file to another excel file with a click of a button',
  ];

  templates: any[] = [
    {
      imgs: ['assets/logos/SAP.png', 'assets/logos/Salesforce.png'],
      text: 'send specific data from salesforce into SAP',
    },
    {
      imgs: ['assets/logos/Oracle.png', 'assets/logos/fedex.png'],
      text: 'Integrate oracle orders seamlessly with FEDEX for efficient shipping management.',
    },
    {
      imgs: ['assets/logos/neuclon.svg', 'assets/logos/opc.png'],
      text: 'Connect industrial equipment securely with Neuclon via OPC UA protocol.',
    },
    {
      imgs: ['assets/logos/fanuc.jpeg', 'assets/logos/x.png'],
      text: 'Sense abnormal condition from Fanuc robot and automatically schedule work order for maintenance',
    },
    {
      imgs: ['assets/logos/excel.png', 'assets/logos/SAP.png'],
      text: 'Send specific data from Excel Worksheet into SAP',
    },
    {
      imgs: ['assets/logos/sheets.png', 'assets/logos/insight.png'],
      text: 'Build advance analytics from your data on google sheet in real time.',
    },
    {
      imgs: ['assets/logos/neuclon.svg', 'assets/logos/Oracle.png', 'assets/logos/mb.png'],
      text: 'Create data pipeline to connect data from oracle, industrial equipment and MES.',
    },
    {
      imgs: ['assets/logos/slack.png', 'assets/logos/gmail.png'],
      text: 'Send new Gmail emails as Slack channel messages..',
    },
    {
      imgs: ['assets/logos/shopify.png', 'assets/logos/channel.png'],
      text: 'Sell products from your online store in Amazon, eBay, Walmart and 50+ marketplaces.',
    },
    {
      imgs: ['assets/logos/elephant.png', 'assets/logos/snowflake.png'],
      text: 'Automatically sync data between PostgreSQL and Snowflake',
    },
    {
      imgs: ['assets/logos/restapi.png', 'assets/logos/insight.png'],
      text: 'Build advanced AI-Powered analytics dashboard from custom application via REST API',
    },
    {
      imgs: ['assets/logos/youtube.png', 'assets/logos/facebook.png'],
      text: 'Send new YouTube videos in a channel to a Facebook page',
    },
  ];
  pagination: any;
  pageNumber: number = 1;
  pageSize: number = 10;

  constructor() {
    this.pagination = {
      page: this.pageNumber,
      pages: this.pageSize,
      perPage: 10,
      count: 100,
    };
  }

  onPagination(event: any): void {
    this.pageNumber = event.page;
    this.pageSize = event.perPage;
  }
}
