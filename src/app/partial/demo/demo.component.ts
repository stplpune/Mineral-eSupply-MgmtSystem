import { Component, OnInit } from '@angular/core';
import { ConfigService } from 'src/app/configs/config.service';
import { CallApiService } from 'src/app/core/services/call-api.service';

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

  constructor(public configService: ConfigService, private callApiService: CallApiService) { }

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
    // this.callApiService.setHttp('get', 'vehicle-tracking/tracking/get-vehicle-tracking_v1?' + praram, true, false, false, 'stplVtsTrackingBaseUrlAPI');
    this.callApiService.setHttp('get', 'tracking/get-vehicle-tracking_v1?vehicleNumber=MH49AT4177&fromDate=2022-09-18%2010:38&toDate=2022-09-19%2010:38', true, false, false, 'stplVtsTrackingBaseUrlAPI');
    this.callApiService.getHttp().subscribe((responseData: any) => {
      if (responseData.statusCode === "200") {
        console.log(responseData);
        // this.bindinvoiceData();
        // this.hideCardvehicle = true;
        // this.locationData;
        // responseData.responseData.map((dt: { locationDeviceTimeMap: any; }, i: number) => (
        //   responseData.responseData.length - 1 > i && (
        //     this.locationData = i == 0 ? [...dt.locationDeviceTimeMap, ...responseData.responseData[i + 1].locationDeviceTimeMap] : [...this.locationData, ...responseData.responseData[i + 1].locationDeviceTimeMap]
        //   )));
        // this.directions = responseData.responseData.length == 1 ? responseData.responseData[0].locationDeviceTimeMap : this.locationData;
        // this.spinner.hide();
      }
    })
  }

}
