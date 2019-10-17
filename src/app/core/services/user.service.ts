import { Injectable, OnDestroy } from '@angular/core';
import {UserToken, GetUser, LogInUser, GetUserAfterLoginOrRegister, RegisterUser} from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map, tap, catchError, shareReplay } from 'rxjs/operators';
import { Observable, BehaviorSubject, Subscription, of } from 'rxjs';
import { DatePipe } from '@angular/common';
import * as jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';

const authUrl = 'http://localhost:3001/api/auth/';
const memberUrl = 'http://localhost:3001/api/members/';

@Injectable()
export class UserService implements OnDestroy {
  private userBehaviorSubject = new BehaviorSubject<GetUser>(null);
  readonly connectUser = this.userBehaviorSubject.asObservable();
  private msgBehaviorSubject = new BehaviorSubject<string>(null);
  readonly msg = this.msgBehaviorSubject.asObservable();
  private token: UserToken;
  loginSub: Subscription;
  registerSub: Subscription;

  //check if has token in local storage
  constructor(private http: HttpClient, private datePipe: DatePipe, private router: Router) {
    let token: string = localStorage.getItem('token');
    if (token) {
      this.token = this.getDecodedToken(token);
      this.loginSub = this.getUserById(this.token.id).subscribe(user =>
        this.userBehaviorSubject.next(user)
      );
    }
  }
  //get token and decode him
  private getDecodedToken(token: string): UserToken {
    try {
      return jwt_decode(token);
    } catch (err) {
      console.log(err);
    }
  }
  //error
  private handleError(error: Response) {
    console.error(error);
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Observable.throw(msg);
  }
  //return observable user by id
  getUserById(userId: string): Observable<GetUser> {
    return this.http.get(`${memberUrl}${userId}`).pipe(
      map(json => json as GetUser),
      catchError(this.handleError)
    );
  }
  //log in function
  logIn(email: string, password: string): boolean {
    //create login request body
    let userData: LogInUser = {
      email: email,
      password: password
    };
    //flag if to show error it will be send if the response with error
    let success: boolean = false;
    this.loginSub = this.http
      .post(`${authUrl}login`, userData)
      .pipe(map(data => data as GetUserAfterLoginOrRegister))
      .subscribe(
        data => {
          //create current user
          let user: GetUser = {
            _id: data._id,
            avatarUrl: data.avatarUrl,
            email: data.email,
            userHandle: data.userHandle,
            registrationDate: data.registrationDate,
            lastLoginDate: data.lastLoginDate
          };
          //save in the BehaviorSubject
          this.userBehaviorSubject.next(user);
          //save the token
          localStorage.setItem('token', data.token);
          //navigate to home page
          this.router.navigate(['home']);
        },
        error => {
          console.log(error);
        }
      );
    //will return only if some thing bad
    return success;
  }
  //log out function
  logOut() {
    //clear the log in subscribe
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
    //current user null
    this.userBehaviorSubject.next(null);
    //remove the token
    localStorage.removeItem('token');
  }
  //register function
  register(fd) {
    this.registerSub = this.http
      .post(`${authUrl}register`, fd)
      .pipe(map(data => data as GetUserAfterLoginOrRegister))
      .subscribe(
        data => {
          //create current user
          let user: GetUser = {
            _id: data._id,
            avatarUrl: data.avatarUrl,
            email: data.email,
            userHandle: data.userHandle,
            registrationDate: data.registrationDate,
            lastLoginDate: data.lastLoginDate
          };
          //save in the BehaviorSubject
          this.userBehaviorSubject.next(user);
          //save the token
          localStorage.setItem('token', data.token);
          //navigate to home page
          this.router.navigate(['home']);
        },
        error => {
          //update the error msg for the UI to show
          this.msgBehaviorSubject.next(error.error.message);
        }
      );
  }
  //check if the input name is the name of the current user
  isLogedInUser(userName: string): Observable<boolean> {
    return this.connectUser.pipe(
      map(user => {
        if (user) {
          if (user.userHandle === userName) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      })
    );
  }
  //check if some user is loged in
  isLogedIn(): Observable<boolean> {
    return this.connectUser.pipe(
      map(user => {
        return user ? true : false;
      })
    );
  }

  ngOnDestroy() {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}
