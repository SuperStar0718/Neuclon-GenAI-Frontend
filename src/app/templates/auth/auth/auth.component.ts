import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loginForm!:FormGroup;
  signupForm!:FormGroup;
  forgotForm!:FormGroup;
  resetPasswordForm!:FormGroup;
  visibilityIcon:boolean = false;
  visibilityIconConfrimPWD:boolean = false;
  view:string = 'login'

  constructor(private formBuilder: FormBuilder,private _route:ActivatedRoute){
    this.initForm();
  }

  ngOnInit(): void {
    this._route.params.subscribe((param: any) => {
      this.view = param.type;
    })
  }

  initForm(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
    this.signupForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
    })
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
    })
    this.resetPasswordForm = this.formBuilder.group({
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    })
  }
  
  visibilityIconClick(ev: any, type: string) {
    ev.preventDefault();
    ev.stopPropagation();
    if (type == "password") {
      this.visibilityIcon = !this.visibilityIcon;
    }else if(type == 'confirmPassword'){
      this.visibilityIconConfrimPWD = !this.visibilityIconConfrimPWD
    }
  }
}
