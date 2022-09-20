import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  public checkInternetStatus = new Subject();   //check internet status

  geoFenceData = new Subject();

  setGeofence(value: any) {
    this.geoFenceData.next(value);
  }
}
