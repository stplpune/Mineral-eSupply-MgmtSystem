import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agm-map',
  templateUrl: './agm-map.component.html',
  styleUrls: ['./agm-map.component.scss']
})
export class AgmMapComponent implements OnInit {
  map:any;
  
  constructor() { }

  ngOnInit(): void {

  }

  onMapReady(map: any) {
    this.map = map;
  }

}
