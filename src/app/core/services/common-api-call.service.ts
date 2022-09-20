import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallApiService } from './call-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiCallService {
  OrganizationType: any[] = [];
  stateArray: any[] = [];
  districtArray: any[] = [];
  Forecast: any[] = [];
  userType: any[] = [];
  subuserType: any = [];
  constructor(
    private apiService: CallApiService
  ) { }

  getOrganizationType() {
    return new Observable((obj) => {
      this.apiService.setHttp('get', "DropdownService/GetOrganizationType", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { this.OrganizationType = res.responseData; obj.next(this.OrganizationType); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getState() {
    return new Observable((obj) => {
      this.apiService.setHttp('get', "DropdownService/GetStateDetails", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { this.stateArray = res.responseData; obj.next(this.stateArray); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getDistrictByStateId(id: any) {
    return new Observable((obj) => {
      this.apiService.setHttp('get', "DropdownService/GetDistrictDetails?stateId=" + id, false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { this.districtArray = res.responseData; obj.next(this.districtArray); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getWeatherForecast() {
    return new Observable((obj) => {
      this.apiService.setHttp('get', "WeatherForecast", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.length) { this.Forecast = res; obj.next(this.Forecast); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getuserType() {
    return new Observable((obj) => {
      this.apiService.setHttp('get', "DropdownService/GetUserTypeDetails", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { this.userType = res.responseData; obj.next(this.userType); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getSubuserType(id:any) {
    return new Observable((obj) => {
      this.apiService.setHttp('get', "DropdownService/GetSubUserTypeDetails?userTypeId=" + id, false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { this.subuserType = res.responseData; obj.next(this.subuserType); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

}
