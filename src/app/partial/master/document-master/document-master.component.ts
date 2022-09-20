import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-document-master',
  templateUrl: './document-master.component.html',
  styleUrls: ['./document-master.component.scss']
})
export class DocumentMasterComponent implements OnInit {displayedColumns: string[] = ['position','sr', 'Mandatory','web',];
dataSource = ELEMENT_DATA;

constructor() { }

ngOnInit(): void {
}


}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, sr: '', Mandatory:'', web: '', },
 
];
export interface PeriodicElement {
position:number;
sr: string;
Mandatory: string;
web: string;

}
