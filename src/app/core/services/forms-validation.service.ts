import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormsValidationService {
  
  excludeZeroAtStart = '^(?!0+$)[0-9]{0,20}$';
  onlyAlphabets = '^[a-zA-Z]+$';
  alphabetsWithSpaces = '^[a-zA-Z][a-zA-Z ]*$';
  alphaNumeric = '^[a-zA-Z0-9]*$';
  alphaNumericWithSpace = '^[a-zA-Z0-9][a-zA-Z0-9 ]*$';
  alphaNumericWithSpaceAndSpecialChar = '^[a-zA-Z0-9 /(,)&.+-@#$]*$';
  onlyDigits = '^[0-9]*$';
  numbersWithDot = '^[0-9\s]*\.?[0-9\s]+$'

  constructor() { }

  removeSpaceAtBegining(event: any) {
    let temp = true;
    try {
        if (!event.target.value[0].trim()) {
            event.target.value = event.target.value.substring(1).trim();
            temp = false;
        }
    }
    catch (e) {
        temp = false;
    }
    return temp
  }

}
