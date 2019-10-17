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
  path:string;
  file: File;
  fd=new FormData;

  constructor( private fb: FormBuilder,private userService:UserService,private router:Router, private localizationService:LocalizationService) { 
    this.registerForm = this.fb.group({
      pathInput: ['',],
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

  get pathInput(): AbstractControl {
    return this.registerForm.get('pathInput');
  }

  get imageInput(): AbstractControl {
    return this.registerForm.get('imageInput');
  }

  get userNameInput(): AbstractControl {
    return this.registerForm.get('userNameInput');
  }

  get passwordInput(): AbstractControl {
    return this.registerForm.get('passwordInput');
  }

uploaded(event){
  this.file = event.target.files[0];
  this.registerForm.controls['pathInput'].setValue(this.file.name);
}

  onSubmit(){
    const formModel = this.registerForm.value;
    //create user for register
    this.fd.append('email',formModel.emailInput);
    this.fd.append('userHandle',formModel.userNameInput);
    this.fd.append('password',formModel.passwordInput);
    this.fd.append('image',this.file? this.file: null);
    console.log(this.fd);
    //send to the server the request
    this.userService.register(this.fd);
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