import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/configs/config.service';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  lat!: number;
  long!: number;
  zoom!: number;
  viewType: any;
  map: any;

  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
    this.setMapData();
    this.bindTable();
  }

  setMapData() {
    this.lat = this.configService.lat;
    this.long = this.configService.long;
    this.zoom = this.configService.zoom;
    this.viewType = this.configService.viewType;
  }

  onMapReady(map: any) {
    this.map = map;
  }

  bindTable() {
  
  }

  //------------------------------------------------------ agm mrker controls start heare --------------------------------------------------//

 //------------------------------------------------------ agm mrker controls end heare ----------------------------------------------------//

}
