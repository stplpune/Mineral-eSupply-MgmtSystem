import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MapsAPILoader } from '@agm/core';
import * as CryptoJS from 'crypto-js';
import { SuccessComponent } from 'src/app/partial/dialogs/success/success.component';

@Injectable({
  providedIn: 'root'
})
export class CommonMethodsService {
  codecareerPage!: string;
  geocoder: any;

  constructor(private snackBar: MatSnackBar, public location: Location, private datePipe: DatePipe, private router: Router, private dialog:MatDialog,
    public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
    });
  }

  createCaptchaCarrerPage() {
    //clear the contents of captcha div first
    let id: any = document.getElementById('captcha');
    id.innerHTML = "";
    // "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";

    var charsArray = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@#";
    var lengthOtp = 4;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 0); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha1";
    canv.width = 80;
    canv.height = 30;
    //var ctx:any = canv.getContext("2d");
    var ctx: any = canv.getContext("2d");
    ctx.font = "21px Open Sans";
    ctx.fillText(captcha.join(""), 0, 24);
    // ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.codecareerPage = captcha.join("");
    let appendChild: any = document.getElementById("captcha");
    appendChild.appendChild(canv); // adds the canvas to the body element
  }

  checkvalidateCaptcha() {
    return this.codecareerPage;
  }

  matSnackBar(data: string, status: number) {
    let snackClassArr: any = ['snack-success', 'snack-danger', 'snack-warning'];
    this.snackBar.open(data, " ", {
      duration: 2000,
      panelClass: [snackClassArr[status]],
      verticalPosition: 'top', // 'top' | 'bottom'
      horizontalPosition: 'right', //'start' | 'center' | 'end' | 'left' | 'right'

    })
  }

  redToPrevPage() {
    this.location.back();
  }

  checkDataType(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == null || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }

  findIndexOfArrayObject(array: any, key: any, val: any) { // find index of array object  [{'id:0',:name:'john'}, {'id:1',:name:'deo'}]
    let index = array.findIndex((x: any) => x[key] === val);
    return index
  }

  someOfArrayObject(array: any, key: any, val: any) {
    let flag = array.some((x: any) => x[key] === val);
    return flag
  }

  findIndexOfArrayValue(array: any, val: any) { // find index of array value [1,2,3,4]
    let index = array.indexOf(val);
    return index
  }

  filterArrayByVal(array: any, val: any, key:any) { // find index of array value [1,2,3,4]
    array.filter((ele: any) => {
      if(ele[key] == val){
        return ele
      }
    })
    return
  }

  dateWithTimeFormat(dateTime: any) { // 2022-05-11T13:01:46.067Z
    let dateWithTime = this.datePipe.transform(dateTime, 'yyyy-MM-dd' + 'T' + 'hh:mm:ss.ms');
    return dateWithTime + "Z";
  }

  dateFormat(dateTime: any) { // 2022-05-11T13:01:46.067Z
    let date = this.datePipe.transform(dateTime, 'yyyy-MM-dd');
    return date;
  }

  redToNextPageWithPar(id: any, link: string, label: string) {
    this.router.navigate([link + encodeURIComponent(CryptoJS.AES.encrypt(id.toString(), label).toString())]);
  }

  getAddressBylat_lng(latitude: number, longitude: number) { // get Address Using Latitude & logitude
    let address_pincodeObj = { 'pinCode': '', 'address': '' };
    this.geocoder.geocode(
      { location: { lat: latitude, lng: longitude, } },
      (results: any) => {
        address_pincodeObj.address = results[3].formatted_address;
        results[0].address_components.forEach((element: any) => {
          if (element.types[0] == 'postal_code') {
            address_pincodeObj.pinCode = element.long_name;
          }
        });
      });
    return address_pincodeObj;
  }

  scrollBar(value: any) {
    window.scroll({
      top: value,
      behavior: 'smooth'
    });
  }

  opensuccessModal(obj?: any) {
    const dialogRef = this.dialog.open(SuccessComponent, {
      width: '600px',
      height: 'auto',
      disableClose: true,
      data: obj ? obj : '',
    });
    // dialogRef.afterClosed().subscribe((result: any) => {
    //   result == 'u' ? this.getData() : result == 'i' ? this.searchData() : '';
    // });
  }


}
