import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

const url = '../../../assets/data/users.json';

@Injectable()
export class UserService {
  private users: User[];
  usersPromise: Promise<User[]>;
  private usersBehaviorSubject = new BehaviorSubject<User[]>(null);
  readonly allUsers = this.usersBehaviorSubject.asObservable();
  private userBehaviorSubject = new BehaviorSubject<User>(null);
  readonly connectUser = this.userBehaviorSubject.asObservable();
  //
  constructor(private http: HttpClient,private datePipe: DatePipe) {
    this.usersPromise = this.loadInitialData(url);
    this.usersPromise.then(users => {
      this.users = users;
      this.usersBehaviorSubject.next(this.users);
      if (localStorage.getItem('user')) {
        let user = users.find(u => u.userName === localStorage.getItem('user'));
        this.logIn(user.email, user.password);
      }
    });
  }

  private loadInitialData(url: string): Promise<User[]> {
    return this.http
      .get(url)
      .pipe(map(json => json as User[]))
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    const msg = `Error status code ${error.status} at ${error.url}`;
    return Promise.reject(msg || error);
  } 

  getUser(userName:string):Observable<User>{
    return this.allUsers.pipe(map(users=>{
      return users? users.find(eachUser=>eachUser.userName===userName) : null;
    }));
  }

  getNowDate():string{
    return this.datePipe.transform(new Date(),'dd/MM/yyyy');
  }

  logIn(email: string, password: string): boolean {
    let user = this.users.find(user => user.email === email);
    if (user !== undefined && user.password === password) {
      user.lastLoginDate=this.getNowDate();
      this.userBehaviorSubject.next(user);
      localStorage.setItem('user', user.userName);
      return true;
    } else {
      return false;
    }
  }

  logOut() {
    this.userBehaviorSubject.next(null);
    localStorage.removeItem('user');
  }

  register(user: User): string {
    let findUser: User = this.users.find(u => u.userName === user.userName);
    if (findUser) {
      return 'userName';
    }
    findUser = this.users.find(u => u.email === user.email);
    if (findUser) {
      return 'email';
    }
    this.users.push(user);
    this.usersBehaviorSubject.next(this.users);
    this.logIn(user.email, user.password);
    return 'success';
  }

  isLogedInUser(userName: string): Observable<boolean> {
    return this.connectUser.pipe(
      map(user => {
        if (user) {
          if (user.userName === userName) {
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

  isUserStared(userNames: string[]): Observable<boolean> {
    return this.connectUser.pipe(
      map(user => {
        return userNames.find(u => u === user.userName) ? true : false;
      })
    );
  }

  isLogedIn(): Observable<boolean> {
    return this.connectUser.pipe(
      map(user => {
        return user ? true : false;
      })
    );
  }
}
