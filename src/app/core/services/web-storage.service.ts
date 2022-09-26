import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebStorageService {

  constructor() { }

  checkUserIsLoggedIn() { // check user isLoggedIn or not
    let sessionData: any = sessionStorage.getItem('loggedIn');
    sessionData == null || sessionData == '' ? localStorage.clear() : '';
    if (localStorage.getItem('loggedInData') && sessionData == 'true') return true;
    else return false;
  }

  getLoggedInLocalstorageData() {
    if (this.checkUserIsLoggedIn() == true) {
      let data = JSON.parse(localStorage['loggedInData']);
      return data;
    }
  }

  getUserId(){
    let data =this.getLoggedInLocalstorageData();
    return data.responseData.userId
  }

  getSubUserType(){
    let data =this.getLoggedInLocalstorageData();
    return data.responseData.subUserTypeId
  }

  getAllPageName() {
    if (this.checkUserIsLoggedIn() == true) {
      let getAllPageName = this.getLoggedInLocalstorageData();
      return getAllPageName.responseData2;
    }
  }

  redirectToDashborad() {
    if (this.checkUserIsLoggedIn() == true) {
      let logInUserType: any = this.getAllPageName();
      let redirectToDashboard = logInUserType[0].pageURL;
      return redirectToDashboard;
    }
  }

getUserName(){
  let userName = this.getLoggedInLocalstorageData().responseData?.userName;
  return userName;
}

}
