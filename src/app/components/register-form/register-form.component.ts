import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';

const passwordPattern:string='^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit {
  userNameExists:boolean=false;
  emailExists:boolean=false;
  registerForm: FormGroup;

  constructor( private fb: FormBuilder,private userService:UserService,private router:Router) { 
    this.registerForm = this.fb.group({
      emailInput: ['', [Validators.required, Validators.email]],
      userNameInput: ['',Validators.required],
      passwordInput: ['', [Validators.required,Validators.pattern(passwordPattern)]],
    });
  }

  ngOnInit() {
  }

  get emailInput(): AbstractControl {
    return this.registerForm.get('emailInput');
  }

  get userNameInput(): AbstractControl {
    return this.registerForm.get('userNameInput');
  }

  get passwordInput(): AbstractControl {
    return this.registerForm.get('passwordInput');
  }


  onSubmit(){
    const formModel = this.registerForm.value;
    let user:User={
      img:"../../../assets/img/profile.png",
      email: formModel.emailInput,
      userName: formModel.userNameInput,
      password: formModel.passwordInput,
      registrationDate: this.userService.getNowDate(),
      lastLoginDate:''
    };
    let resultRegister:string=this.userService.register(user);
    if(resultRegister==='userName'){
      this.userNameExists=true;
      this.emailExists=false;
    }
    else if(resultRegister==='email'){
      this.emailExists=true;
      this.userNameExists=false;
    }else{
      this.router.navigate(['home']);
    }
  }

}