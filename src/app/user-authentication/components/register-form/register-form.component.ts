import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocalizationService } from '../../../core/services/localization.service';

const passwordPattern:string='^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$';
const profileImage:string='../../../assets/img/profile.png';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit, OnDestroy {
  userNameExists:boolean=false;
  emailExists:boolean=false;
  registerForm: FormGroup;
  language:string;
  sub: Subscription;

  constructor( private fb: FormBuilder,private userService:UserService,private router:Router, private localizationService:LocalizationService) { 
    this.registerForm = this.fb.group({
      emailInput: ['', [Validators.required, Validators.email]],
      userNameInput: ['',Validators.required],
      passwordInput: ['', [Validators.required,Validators.pattern(passwordPattern)]],
    });
    this.sub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
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
      img: profileImage,
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

  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}