import { Component, OnInit } from '@angular/core';
interface Food {
  value: string;
  viewValue: string;
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
  displayedColumns: string[] = ['date', 'particulars', 'debit', 'credit','remarks'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
