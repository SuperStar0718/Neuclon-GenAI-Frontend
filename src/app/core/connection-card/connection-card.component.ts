import { Component, Input , ChangeDetectorRef} from '@angular/core';
import { connection } from 'src/app/Models/connection';
import { ApiService } from 'src/app/services/api.service';
import { NotifierService } from 'angular-notifier';
import { MatDialog } from '@angular/material/dialog';
import { DatasetSynchronizationComponent } from 'src/app/templates/main/views/connect/dataset-synchronization/dataset-synchronization.component';
import { CategoryType } from 'src/app/Models/category-type';
import {MatDialogRef} from '@angular/material/dialog';
import dataSetCategories from 'src/assets/categoryType/categoryType'


@Component({
  selector: 'app-connection-card',
  templateUrl: './connection-card.component.html',
  styleUrls: ['./connection-card.component.scss']
})
export class ConnectionCardComponent {

  @Input() props!:connection;
  private readonly notifier: NotifierService
  display = true;

  constructor(
    private dialogRef: MatDialog,
    private apiService: ApiService,
    notifierService: NotifierService,
    private changeDetector: ChangeDetectorRef
    ) { 
    this.notifier = notifierService;
    }

  refreshConnection(props: connection) {
    console.log(props)
    this.apiService.establishConnection(props).subscribe(res => {
      console.log('success');
      this.props = res;
      this.changeDetector.detectChanges();
      this.notifier.notify('success', 'Connection Successful');
    },
    error => {
      console.log(error);
      this.notifier.notify('error', 'Whoops, something went wrong.');
    });
  }

  stopConnection(props: connection) {
    console.log(props)
    this.apiService.stopConnection(props).subscribe(res => {
      console.log('success');
      this.props = res;
      this.changeDetector.detectChanges();
      this.notifier.notify('success', 'Connection Stopped');
    },
    error => {
      console.log(error);
      this.notifier.notify('error', 'Whoops, something went wrong.');
    });
  }

  deleteConnection(props: connection) {
    console.log(props)
    this.apiService.deleteConnection(props).subscribe(res => {
      console.log('success');
      this.display = false;
      this.notifier.notify('success', 'Connection Deleted');
    },
    error => {
      console.log(error);
      this.notifier.notify('error', 'Whoops, something went wrong.');
    });
  }

  syncPopup(dbname: string) {
    const syncDataset = dataSetCategories
                .map(item => item.categoryType) // flatten categoryType arrays
                .flat()
                .filter(item1 => item1.categoryName === dbname);
    this.dialogRef.open(DatasetSynchronizationComponent, {
      data: syncDataset[0],
      width: '550px',
    });
  }
}
