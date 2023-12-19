import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss'],
})
export class CopilotComponent implements OnInit {
  isExpanded: boolean = true;
  filtersList = [
    {
      heading: 'GETTING STARTED WITH NEUCLINK',
      list: [
        { type: 'checkbox', controlName: '', text: 'Introduction' },
        { type: 'checkbox', controlName: '', text: 'Importing Data' },
        { type: 'checkbox', controlName: '', text: 'Fundamentals of Data Management' },
      ],
      expanded: false,
    },
    {
      heading: 'CONNECT',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'Databases' },
        { type: 'checkbox', controlName: '', icon: '', text: 'APIs' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Cloud Storage' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Plugins' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Connectors' },
      ],
      expanded: false,
    },
    {
      heading: 'WORKFLOW MODEL',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'Editor' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Data Models' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Process Flow Models' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Metrics' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Data Explorer' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Manage Models' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Model Templates' },
      ],
      expanded: false,
    },
    {
      heading: 'MACHINE LEARNING',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'ML Models' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Model Groups' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Pipelines' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Predictions' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Resources' },
        { type: 'checkbox', controlName: '', icon: '', text: 'PyTorch' },
        { type: 'checkbox', controlName: '', icon: '', text: 'TensorFlow' },
      ],
      expanded: false,
    },
    {
      heading: 'COPILOT',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'Insight' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Analytics' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Recommendation' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Report' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Chat' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Quicklinks' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Configuration' },
      ],
      expanded: false,
    },
    {
      heading: 'DASHBOARD',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'Templates' },
        { type: 'checkbox', controlName: '', icon: '', text: 'New Dashboard' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Widget Library' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Share' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Favorite' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Notification' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Trends' },
      ],
      expanded: false,
    },
    {
      heading: 'REPORTS',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'Datasets' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Report Types' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Report Editor' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Report Viewer' },
      ],
      expanded: false,
    },
    {
      heading: 'WORKSPACE',
      list: [
        { type: 'checkbox', controlName: '', icon: '', text: 'App Builder' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Components' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Layout' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Forms' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Integrations' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Environments' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Version Control' },
        { type: 'checkbox', controlName: '', icon: '', text: 'Preview and Share' },
      ],
      expanded: false,
    },
  ];
  resultList = [
    {
      type: 'GETTING STARTED WITH NEUCLINK',
      title: 'Introduction',
    },
    {
      type: 'GETTING STARTED WITH NEUCLINK',
      title: 'Importing Data',
    },
    {
      type: 'GETTING STARTED WITH NEUCLINK',
      title: 'Fundamentals of Data Management',
    },
    {
      type: 'CONNECT',
      title: 'Databases ',
    },
    {
      type: 'CONNECT',
      title: 'APIs',
    },
    {
      type: 'CONNECT',
      title: 'Cloud Storage',
    },
    {
      type: 'CONNECT',
      title: 'Plugins',
    },
    {
      type: 'CONNECT',
      title: 'Connectors',
    },
  ];
  isChecked: boolean = false;
  libFilters = this._formBuilder.group({
    overview: true,
  });

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  onFilterToggle() {
    this.isExpanded = !this.isExpanded;
  }

  onSelectCategories(categories: any) {
    this.isChecked = false;
    this.resultList = [];
    this.resultList = categories.list.map((item: any) => {
      return {
        type: categories.heading,
        title: item.text,
      };
    });
    this.filtersList.map(item => {
      item.expanded = item.heading == categories.heading ? true : false;
    });
  }

  onSelectCategory(category: any, type: string) {
    if (!this.isChecked) {
      this.resultList = [];
      this.resultList.push({
        type: type,
        title: category.text,
      });
      this.isChecked = true;
    } else if (this.isChecked) {
      this.resultList.push({
        type: type,
        title: category.text,
      });
    }
  }
}
