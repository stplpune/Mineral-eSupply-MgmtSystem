import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  loginFrm !:FormGroup;
  ngOnInit(): void {
    this.defaultForm();
  }
  defaultForm(){
    this.loginFrm = this.fb.group({
      userName :['',Validators.required],
      passWord :['',Validators.required],
      captcha:['']
    })

  }


  onSubmit(){

  }
}
