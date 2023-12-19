import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryType } from 'src/app/Models/category-type';
import { FormService } from '../new-connection/form.service';
import { MatRadioModule } from '@angular/material/radio';
import {NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'dataset-synchronization',
  templateUrl: './dataset-synchronization.component.html',
  styleUrls: ['./dataset-synchronization.component.scss'],
})
export class DatasetSynchronizationComponent implements OnInit {

  dataSetCategories!: CategoryType;
  selectConnects: any[] = [];
  private readonly notifier: NotifierService

  constructor(
    private http:HttpClient,
    public dialogRef: MatDialogRef<DatasetSynchronizationComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: CategoryType,
    private formDataService: FormService,
    notifierService: NotifierService,
    private apiService: ApiService
  ) { 
    this.notifier = notifierService;
  }
  currentForm: any;
  
  
  ngOnInit(): void {
    console.log('dialog data ====>>>>>', this.dialogData);
    this.dataSetCategories = this.dialogData;
    if (this.dataSetCategories.categoryName === 'Salesforce') {
      this.selectConnects = salesforceSelectConnects;
    } else if (this.dataSetCategories.categoryName === 'MBrain') {
      this.selectConnects = mBrainSelectConnects;
    } else {
      this.selectConnects = allSelectConnects;
    }
    this.switchForm(this.dataSetCategories.categoryName);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  buttonText: string = 'Edit';
  switchForm(formName: string) {
    this.formDataService.getFormData(formName).subscribe(data => {
      this.currentForm = data;
    }, error => console.log(error));
  }

  toggleInputField(field: { disabled: boolean }) {
    field.disabled = !field.disabled;
    this.buttonText = field.disabled ? 'Edit' : 'Cancel';
  }
  changeConnectionMethod(event: any) {
    if(event == "constring"){
      this.currentForm.fields = [
        {
          "type": "select",
          "label": "Certificate",
          "name": "certificate",
          "value": "constring",
          "formOptions": [
            {
              "value": "manual",
              "label": "Manual Certificate"
            },
            {
              "value": "constring",
              "label": "Connect using string "
            }
          ]
        },
        {
        "type": "text",
        "label": "Connection URI",
        "name": "uri",
        "value": "",
        "validations": [
          {
            "name": "required",
            "validator": "required",
            "message": "Field is required"
          }
        ]
      }]
    }
    else{
      this.formDataService.getFormData(this.dataSetCategories.categoryName).subscribe(data => {
        this.currentForm = data;
      }, error => console.log(error));
    }
  }



  connectDB() {
    console.log(this.currentForm);
    let connectionData: { [key: string]: any } = {};
    this.currentForm.fields.forEach((field:any)=>{
      connectionData[field.name] = field.value;
    })
    connectionData['type'] = this.dataSetCategories.categoryName;
    this.apiService.establishConnection(connectionData).subscribe(res => {
        console.log('success');
        this.notifier.notify('success', 'Connection Successful');
      },
      error => {
        console.log(error);
        this.notifier.notify('error', 'Whoops, something went wrong.');
      }
    );
  }


  
}

const allSelectConnects: any[] = [
  {
    id: 1,
    connect: 'Material master',
  },
  {
    id: 2,
    connect: 'customer master',
  },
  {
    id: 3,
    connect: 'supplier master',
  },
  {
    id: 4,
    connect: 'inventory transaction',
  },
  {
    id: 5,
    connect: 'customer transaction',
  },
  {
    id: 6,
    connect: 'sales transaction',
  },
  {
    id: 7,
    connect: 'customer backlog',
  },
  {
    id: 8,
    connect: 'supplier transaction',
  },
  {
    id: 9,
    connect: 'purchase transaction',
  },
  {
    id: 10,
    connect: 'purchase backlog',
  },
  {
    id: 11,
    connect: 'process routing',
  },
];

const mBrainSelectConnects: any[] = [
  {
    id: 1,
    connect: 'Operator Cycle Times',
  },
  {
    id: 2,
    connect: 'Planned Cycle Time',
  },
  {
    id: 3,
    connect: 'Downtimes',
  },
  {
    id: 4,
    connect: 'Changeovers',
  },
  {
    id: 5,
    connect: 'Process Exit Cycles',
  },
  {
    id: 6,
    connect: 'Process Lead Time',
  },
  {
    id: 7,
    connect: 'WIP',
  },
];

const salesforceSelectConnects: any[] = [
  {
    id: 1,
    connect: 'Historical Sales Data',
  },
  {
    id: 2,
    connect: 'Customer Data',
  },
  {
    id: 3,
    connect: 'Opportunity Data',
  },
  {
    id: 4,
    connect: 'Lead Data',
  },
  {
    id: 5,
    connect: 'Product Data',
  },
  {
    id: 6,
    connect: 'Campaign Data',
  },
  {
    id: 7,
    connect: 'Service Data',
  },
];
