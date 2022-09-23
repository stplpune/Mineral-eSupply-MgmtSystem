import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.scss']
})
export class ConsumersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['srno', 'consumer_name', 'district', 'consumer_address','mobile_no','email','quantity_allocated','lifted_quantity','action'];
  dataSource = ELEMENT_DATA;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, consumer_name: 'Hydrogen', district: 'maharashtra', consumer_address: 'H',mobile_no: 8669264767,email:'abc@gmail.com',quantity_allocated:12000,lifted_quantity:50000,action:''}
];
export interface PeriodicElement {
  srno: number;
  consumer_name: string;
  district: string;
  consumer_address: string;
  mobile_no: number;
  email: any;
  quantity_allocated: number;
  lifted_quantity: number;
  action: any;
}
