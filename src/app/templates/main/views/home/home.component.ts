import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { AlertService } from 'src/app/services/alert.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  // lock: boolean = false;
  // widgets: any[] = [
  //   { type: 'notifications', heading: 'ACTIVE, CRITICAL ALARAMS' },
  //   { type: 'map', heading: 'MAP' },
  //   { type: 'chart', heading: 'Pie Chart' },
  // ];
  // public pieChartOptions: ChartOptions<'pie'> = {
  //   responsive: true,
  // };
  // public pieChartLabels = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  // public pieChartDatasets = [
  //   {
  //     data: [300, 500, 100],
  //   },
  // ];
  // public pieChartLegend = false;
  // public pieChartPlugins = [];
  // center = { lat: 25.286106, lng: 51.534817 };
  // zoom = 10;
  // lat: any;
  // lng: any;
  // markerOptions: google.maps.MarkerOptions = { draggable: true, animation: google.maps.Animation.DROP };
  // markerPositions: google.maps.LatLngLiteral[] = [];
  // marker: google.maps.Marker[] = [];
  steppers: any[] = [
    {
      id: 1,
      label: 'Connect Enterprise Application',
      text: 'Unlock seamless connectivity to enterprise applications with Neuclon. Effortlessly integrate and enhance your workflows for increased productivity.',
      opened: false,
    },
    {
      id: 2,
      label: 'Create Data Model',
      text: 'Learn how to effortlessly create a data model using Neuclon in just a few clicks. Simplify your data management and analytics with our intuitive platform.',
      opened: false,
    },
    {
      id: 3,
      label: 'Create Automation Model',
      text: 'Discover the power of Neuclon for creating automation (workflow) models with ease. Streamline your processes and boost efficiency using our user-friendly platform.',
      opened: false,
    },
    {
      id: 4,
      label: 'Create Reports',
      text: 'Effortlessly generate insightful reports with Neuclon. Empower data-driven decision-making with our user-friendly reporting tools.',
      opened: false,
    },
    {
      id: 5,
      label: 'Create Dashboard',
      text: "Build dynamic dashboards with ease using Neuclon's drag-and-drop widgets. Customize your data visualization effortlessly for actionable insights.",
      opened: false,
    },
    {
      id: 6,
      label: 'Interact with Copilot',
      text: 'Engage with Copilot, powered by advanced Neuclon AI, for intelligent assistance and enhanced productivity. Seamlessly collaborate with our smart AI assistant. Generate reports in Excel, Word and PowerPoint formats. Generate email with your data and send through your email app.',
      opened: false,
    },
    {
      id: 7,
      label: 'Monitor Alerts and Events',
      text: "Efficiently monitor alerts and events using Neuclon's intuitive interface. Stay informed and responsive with our real-time monitoring tools.",
      opened: false,
    },
    {
      id: 8,
      label: 'Other Neuclon Applications',
      text: 'Explore other Neuclon Applications – Machine Learning, AppWave, NeuclonIoT and Single Insight.',
      opened: false,
    },
  ];

  constructor(private sharedService: SharedService, private alertService: AlertService) {
    // this.sharedService.widgetLock.subscribe(item => {
    //   this.lock = item;
    // });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  // addMarker(event: google.maps.MapMouseEvent) {
  //   this.markerPositions.pop();
  //   this.markerPositions.push(event.latLng!.toJSON());
  //   let coordinates = event.latLng!.toJSON();
  // }

  onStepper(item: any) {
    this.steppers.map((step: any) => {
      if (!step.opened) {
        step.opened = step.id == item.id ? true : false;
      } else if (step.opened) {
        step.opened = false;
      }
    });
  }

  onFinish() {
    this.alertService.success({
      heading: 'Welcome On Board',
      message: 'You did great with it',
    });
  }

  onNeuclink() {
    window.location.reload();
  }
}
