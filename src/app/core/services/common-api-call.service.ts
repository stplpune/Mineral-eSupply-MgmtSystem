import { CommonMethodsService } from './common-methods.service';
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
  otp:any;
  verify:any;
  constructor(
    private apiService: CallApiService,
    private commonMethod:CommonMethodsService
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
        next: (res: any) => { if (res.statusCode == 200) { this.districtArray = res.responseData; obj.next(this.districtArray); } else { if (res.statusCode == 404 ){this.commonMethod.matSnackBar(res.statusMessage,1)}else{obj.error(res)}; } },
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

  generateOtp(mobileNo:any){
    return new Observable((obj) => {
      this.apiService.setHttp('post', "CoalApplication/GenerateOTP?mobileNumber=" + mobileNo, false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  verifyOtp(mobileNo:any,otp:any){
    return new Observable((obj) => {
      this.apiService.setHttp('post', "CoalApplication/ValidateOTP?mobileNumber=" + mobileNo + "&otpNumber=" + otp, false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getMonthYear(){
    return new Observable((obj) => {
      this.apiService.setHttp('get', "DropdownService/GetMonthYear", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res.responseData); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getDashboardData(){
    return new Observable((obj) => {
      this.apiService.setHttp('get', "Dashboard/GetDashboardAnaliticalData", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  getCollieryNameList(){
    return new Observable((obj) => {
      this.apiService.setHttp('get', "api/BookingAndDeliveryOrder/getCollieryNameList", false, false, false, 'WBMiningService');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == 200) { obj.next(res.responseData); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      })
    })
  }

  uploadFile(eventFront: any, eventSide: any, eventNumPlate: any, allowedDocTypes: string){
    return new Observable(obj => {
      if (eventFront.target.files[0] && eventSide.target.files[0] && eventNumPlate.target.files[0] ) {
        const fileFront = eventFront.target.files[0];
        const fileSide = eventSide.target.files[0];
        const fileNumPlate = eventNumPlate.target.files[0];
        const reader = new FileReader();
        const fd = new FormData();
        fd.append('VehicleFrontSideImage', fileFront);
        fd.append('VehicleSideImage', fileSide);
        fd.append('VehicleNumberImage', fileNumPlate);
        this.apiService.setHttp("post", 'WB-mining/uploads/save-vehicle-image', false, fd, false, 'WBMiningService')
        this.apiService.getHttp().subscribe({
            next: (response: any) => {
                if (response.statusCode === "200") {
                  obj.next(response);
                }
                else {
                  this.commonMethod.matSnackBar(response.statusMessage, 1);
                }
            },
            error: ((err: any) => {
              obj.error(err)
            })
        })
      }
    })
  }
}
