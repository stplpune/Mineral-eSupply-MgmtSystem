import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-collary',
  templateUrl: './register-collary.component.html',
  styleUrls: ['./register-collary.component.scss']
})
export class RegisterCollaryComponent implements OnInit {displayedColumns: string[] = ['position','sr','dist', 'add','action',];
dataSource = ELEMENT_DATA;

constructor() { }

ngOnInit(): void {
}


}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, sr: '', dist:'', add:'', action: '', },
 
];
export interface PeriodicElement {
position:number;
sr: string;
dist: string;
add: string;
action: string;

}