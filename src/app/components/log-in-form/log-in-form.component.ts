import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css']
})
export class LogInFormComponent implements OnInit {
  email:string;
  password:string;
  success:boolean=true;

  constructor(private router:Router,private userService:UserService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.success=this.userService.logIn(this.email,this.password);
    console.log(this.success);
    if(this.success){
      this.router.navigate(['home'])
    }
  }

}
