import { Component, OnInit } from '@angular/core';

interface Food {
  value: string;
  viewValue: string;
}
export interface PeriodicElement {
  srno: number;
  name: string;
  mobileno: number;
  usertype: string;
  subusertype: string;
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, name: 'Hydrogen', mobileno: 1.0079, usertype: 'H',subusertype: 'H',actions:''},
  {srno: 2, name: 'Helium', mobileno: 4.0026, usertype: 'He',subusertype: 'H',actions:''},
  {srno: 3, name: 'Lithium', mobileno: 6.941, usertype: 'Li',subusertype: 'H',actions:''},
  {srno: 4, name: 'Beryllium', mobileno: 9.0122, usertype: 'Be',subusertype: 'H',actions:''},
  {srno: 5, name: 'Boron', mobileno: 10.811, usertype: 'B',subusertype: 'H',actions:''},
  {srno: 6, name: 'Carbon', mobileno: 12.0107, usertype: 'C',subusertype: 'H',actions:''},
  {srno: 7, name: 'Nitrogen', mobileno: 14.0067, usertype: 'N',subusertype: 'H',actions:''},
  {srno: 8, name: 'Oxygen', mobileno: 15.9994, usertype: 'O',subusertype: 'H',actions:''},
  {srno: 9, name: 'Fluorine', mobileno: 18.9984, usertype: 'F',subusertype: 'H',actions:''},
  {srno: 10, name: 'Neon', mobileno: 20.1797, usertype: 'Ne',subusertype: 'H',actions:''},
];
@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'name', 'mobileno', 'usertype', 'subusertype','actions'];
  dataSource = ELEMENT_DATA;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
