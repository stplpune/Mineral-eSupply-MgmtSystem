import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coal-grade-master',
  templateUrl: './coal-grade-master.component.html',
  styleUrls: ['./coal-grade-master.component.scss']
})
export class CoalGradeMasterComponent implements OnInit {displayedColumns: string[] = ['position','sr', 'web',];
dataSource = ELEMENT_DATA;

constructor() { }

ngOnInit(): void {
}


}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, sr: 'Screen Access For All (SAFA)', web: '', },
 
];
export interface PeriodicElement {
position:number;
sr: string;
web: string;

}