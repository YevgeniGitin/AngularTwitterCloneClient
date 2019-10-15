import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { User, RegisterUser } from '../../../core/models/user';
import { UserService } from '../../../core/services/user.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { LocalizationService } from '../../../core/services/localization.service';
//pattern that checks min length 8 and must include atleast one capital letter and one number
const passwordPattern:string='^(?=.*?[A-Z])(?=.*?[0-9]).{8,}$';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})

export class RegisterFormComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  language:string;
  languageSub: Subscription;
  registerSub:Subscription;
  resultRegister:string;

  constructor( private fb: FormBuilder,private userService:UserService,private router:Router, private localizationService:LocalizationService) { 
    this.registerForm = this.fb.group({
      emailInput: ['', [Validators.required, Validators.email]],
      userNameInput: ['',Validators.required],
      passwordInput: ['', [Validators.required,Validators.pattern(passwordPattern)]],
    });
    this.languageSub=this.localizationService.selectedLanguage.subscribe(ln=>this.language=ln);
  }

  ngOnInit() {
  }
//get the data from the fields in the form
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
    //create user for register
    let user:RegisterUser={
      email: formModel.emailInput,
      userHandle: formModel.userNameInput,
      password: formModel.passwordInput,
    };
    //send to the server the request
    this.userService.register(user);
    //get the ans of the server(msg)
    this.registerSub=this.userService.msg.subscribe(msg=>this.resultRegister=msg);
  }
//unsubscribe all the subscribes
  ngOnDestroy(){
    if(this.registerSub){
      this.registerSub.unsubscribe();
    }
    this.languageSub.unsubscribe();
  }
}