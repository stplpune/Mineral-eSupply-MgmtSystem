import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CommonApiCallService } from 'src/app/core/services/common-api-call.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';

@Component({
  selector: 'app-etp-report',
  templateUrl: './etp-report.component.html',
  styleUrls: ['./etp-report.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class EtpReportComponent implements OnInit {

  collieryArray:any;
  constructor(
    public commonService: CommonApiCallService,
    public error: ErrorHandlerService,
  ) { }

  ngOnInit(): void {
    this. getCollieryData();
  }
  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['Sr.No.', 'Challan_No', 'Vehicle_No', 'Mineral','Grade','Colliery_Name','Destination','Quantity'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | any;


  getCollieryData() {
    this.commonService.getCollieryNameList().subscribe({
      next: (response: any) => {
        this.collieryArray = response//.push({ 'value': 0, 'text': 'All State' }, ...response);
      },
      error: ((error: any) => { this.error.handelError(error.status) })
    })
  }

}
export interface PeriodicElement {
  srno: number;
  Challan_No: number;
  Vehicle_No: number;
  Mineral: string;
  Grade: string;
  Colliery_Name: string;
  Destination: string;
  Quantity: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    srno: 1,
    Challan_No: 123625658,
    Vehicle_No: 1.0079,
    Mineral: 'H',
    Grade:'G3',
        Colliery_Name: 'dsfhsdhfjsdhf',
        Destination: 'djfhsdhfshfsofh',
        Quantity: 123333
  }
];