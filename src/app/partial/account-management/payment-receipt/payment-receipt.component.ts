import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
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

@Component({
  selector: 'app-payment-receipt',
  templateUrl: './payment-receipt.component.html',
  styleUrls: ['./payment-receipt.component.scss']
})
export class PaymentReceiptComponent implements OnInit {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  partyArray =['Julfikar Coke Briquette', 'Julfikar Coke Briquette','CHANDRA COKE BRIQUETTE','ASIA AND SONS','TAJ GUL FACTORY','STAR COKE BRIQUETTE' ,'Gobinda Coke Briquette','Bani Enterprise'];
  paymentMode= ['Cash','Cheque','DD',"Net Banking",'UPI'];
bankArray= ['ICICI Bank [909768768786]','HDFC [8457567676866]'];
  displayedColumns: string[] = ['date', 'particulars', 'debit', 'credit','remarks'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
