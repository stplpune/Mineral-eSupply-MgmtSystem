import { Component, OnInit } from '@angular/core';
import { Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-access-denied',
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.scss']
})
export class AccessDeniedComponent implements OnInit {

  constructor(public location:Location, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.hide();
  }

}
