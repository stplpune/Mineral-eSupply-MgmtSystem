import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  partyArray =['Julfikar Coke Briquette', 'CHANDRA COKE BRIQUETTE','ASIA AND SONS','TAJ GUL FACTORY','STAR COKE BRIQUETTE' ,'Gobinda Coke Briquette','Bani Enterprise'];
  paymentMode= ['Cash','Cheque','DD',"Net Banking",'UPI'];
bankArray= ['ICICI Bank [909768768786]','HDFC [8457567676866]'];
  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['date', 'particulars', 'debit', 'credit','remarks'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  particulars: string;
  date: string;
  debit: string;
  credit: string;
  remarks: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {date: '12-02-2021', particulars: 'Purchase Order No. 215/25', debit: '53,100', credit:'-', remarks:'-'},
  {date: '14-02-2021', particulars: 'Purchase GST 5%', debit: '59,100', credit: '-', remarks:'-'},
  {date:'15-02-2021', particulars: 'HDFC Bank - 60220807120', debit: '-', credit: '1,25,134', remarks:'-'},
  {date: '21-02-2021', particulars: 'AMCU Sale @ 18%', debit: '-', credit: '3,45,000', remarks:'asdf'},
];