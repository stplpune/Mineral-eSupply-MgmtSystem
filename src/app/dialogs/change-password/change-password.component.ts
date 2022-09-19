import { Component, OnInit } from '@angular/core';
import { AngularMaterialModule } from '../../shared/angular-material.module'
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  hide = true;
  constructor() { }

  ngOnInit(): void {
  }

}
