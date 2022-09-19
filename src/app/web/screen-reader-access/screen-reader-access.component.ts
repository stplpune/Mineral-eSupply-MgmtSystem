import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screen-reader-access',
  templateUrl: './screen-reader-access.component.html',
  styleUrls: ['./screen-reader-access.component.scss']
})
export class ScreenReaderAccessComponent implements OnInit {
  displayedColumns: string[] = ['sr', 'web', 'freecom'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }
  

}
const ELEMENT_DATA: PeriodicElement[] = [
    {sr: 'Screen Access For All (SAFA)', web: 'http://safa-reader.software.informer.com', freecom: 'Free'},
   
  ];
export interface PeriodicElement {
  sr: string;
  web: string;
  freecom: string;
}
