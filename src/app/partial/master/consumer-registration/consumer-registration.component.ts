import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumer-registration',
  templateUrl: './consumer-registration.component.html',
  styleUrls: ['./consumer-registration.component.scss']
})
export class ConsumerRegistrationComponent implements OnInit {

constructor() { }

ngOnInit(): void {
}
displayedColumns: string[] = ['srno', 'state', 'consumer_name','consumer_type' ,'mobile_no','email','pan','action'];
dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  srno: number;
  state: string;
  consumer_name: string;
  consumer_type: string;
  mobile_no: number;
  email: string;
  pan: number;
  action: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, state: 'Hydrogen', consumer_name: 'abcdd',consumer_type:'organization', mobile_no: 8669264767,email:'a@gmail.com',pan: 84757574 , action:''},
];

