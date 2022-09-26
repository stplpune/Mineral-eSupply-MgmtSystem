import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class LedgerComponent implements OnInit {
  partyArray =['Julfikar Coke Briquette', 'CHANDRA COKE BRIQUETTE','ASIA AND SONS','TAJ GUL FACTORY','STAR COKE BRIQUETTE' ,'Gobinda Coke Briquette','Bani Enterprise'];
  paymentMode= ['Cash','Cheque','DD',"Net Banking",'UPI'];
  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['date', 'particulars', 'debit', 'credit','remarks'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  particulars: string;
  date: string;
  debit: number;
  credit: number;
  remarks: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '12-02-2021', particulars: 'Hydrogen', debit: 1.0079, credit: 45345, remarks:'asf'},
  {date: '12-02-2021', particulars: 'Helium', debit: 4.0026, credit: 345, remarks:'wer'},
  {date:'12-02-2021', particulars: 'Lithium', debit: 6.941, credit: 2534, remarks:'asdf'},
  {date: '12-02-2021', particulars: 'Beryllium', debit: 9.0122, credit: 345, remarks:'asdf'},
];