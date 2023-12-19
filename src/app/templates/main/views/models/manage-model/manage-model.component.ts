import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalListComponent } from 'src/app/shared/global-list';

@Component({
  selector: 'app-manage-model',
  templateUrl: './manage-model.component.html',
  styleUrls: ['./manage-model.component.scss'],
})
export class ManageModelComponent extends GlobalListComponent implements OnInit {
  constructor(
    protected override router: Router,
    protected override _route: ActivatedRoute,
    protected formbuilder: FormBuilder,
  ) {
    super(router, _route);

    this.tableProps = {
      colHeader: {
        checkbox: '',
        imageText: 'Name',
        status: 'Status',
        description: 'Description',
        created: 'Created',
        ip: 'IP',
        ports: 'Ports',
        actions: 'Quick Actions',
      },
      columnTypes: {
        imageText: 'imageText',
        actions: 'actionsSeperate',
        status: 'statusToShow',
        description: 'textExceeded',
        created: 'date',
        ports: 'icon',
      },
      statusConfig: [
        {
          status: 'Running',
          color: 'white',
          backgroundColor: '#005F65',
        },
      ],
      rowActions: [
        {
          label: null,
          type: 'stop',
          visibility: true,
          isCustom: false,
          background: 'transparent',
          color: 'black',
          icon: 'stop',
        },
        {
          label: null,
          type: 'pause',
          visibility: true,
          isCustom: false,
          background: 'transparent',
          color: 'black',
          icon: 'pause',
        },
        {
          label: null,
          type: 'info',
          visibility: true,
          isCustom: false,
          background: 'transparent',
          color: 'black',
          icon: 'info',
        },
        {
          label: null,
          type: 'view',
          visibility: true,
          isCustom: false,
          background: 'transparent',
          color: 'black',
          icon: 'visibility',
        },
        {
          label: null,
          type: 'delete',
          visibility: true,
          isCustom: false,
          background: 'transparent',
          color: 'black',
          icon: 'delete_forever',
        },
        {
          label: null,
          type: 'upload',
          visibility: true,
          isCustom: false,
          background: 'transparent',
          color: 'black',
          icon: '',
          source: 'assets/icons/Upload.svg',
        },
      ],
    };

    this.dataItems = [
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
      {
        imageText: {
          img: 'assets/icons/model_list_icon.svg',
          name: 'demo_s7_devices4_1',
        },
        status: 'Running',
        description: 'us-docker.pkd.dev/litmus-sales-enablement/litmus-cs-repo/litmus/opcua-server',
        created: new Date(),
        ip: '10.30.50.15.172.20.0.5',
        ports: 'file_copy',
      },
    ];
  }
}
