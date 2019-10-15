export interface User{
    avatarUrl: string;
    email: string;
    userHandle: string;
    registrationDate: string;
    lastLoginDate: string;
}
export interface GetUser extends User{
    _id:string;
}
export interface GetUserAfterLoginOrRegister extends GetUser{
    token:string;
}
export interface LogInUser{
    email: string;
    password: string;
}
export interface RegisterUser{
    email: string;
    userHandle: string;
    password: string;
}
export interface UserToken {
    id: string;
    userName: string;
  }