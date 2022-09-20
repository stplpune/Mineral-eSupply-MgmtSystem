import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['srno', 'approval_status', 'application_number', 'application_date','allocated_quantity','Year','Consumer_name','district','view'];
  dataSource = ELEMENT_DATA;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, approval_status: 'Pending', application_number: 202236589745, application_date: '15-9-2022',allocated_quantity:'1000',Year:'2023',Consumer_name:'ABC Enterpirses',district:'BArmuri',view:'view'},
 
];
export interface PeriodicElement {
  srno: number;
  approval_status: string;
  application_number: number;
  application_date: string;
  allocated_quantity: string;
  Year: string;
  Consumer_name: string;
  district: string;
  view: string;
}