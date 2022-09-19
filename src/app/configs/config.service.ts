import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  dialogBoxWidth = ['320px', '400px', '700px', '1024px'];  // Set angular material dialog box width

  disableCloseBtnFlag: boolean = true// When click on body material dialog box is not closed flag 

  pageSize: number = 10; // Angular material data table page size limt

  matFormField: string | any = 'outline'; // Reactive form fill appearance

  //------------------------------------------ Maps Settings  starte heare -------------------------------------------//

  lat = 20.879865;

  long = 78.905043;

  zoom: number = 12;

  viewType: string = 'roadmap';

  static googleApiObj: object = { // google api key 
    apiKey: 'AIzaSyAkNBALkBX7trFQFCrcHO2I85Re2MmzTo8',
    language: 'en',
    libraries: ['places', 'geometry'],
  };

  //------------------------------------------ Maps Settings  starte heare -------------------------------------------//
  
  constructor() { }
}
