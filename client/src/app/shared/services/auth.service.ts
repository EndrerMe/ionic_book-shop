// Vendors
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Environment
import { environment } from 'src/environments/environment';
// Interfaces
import { IUser } from 'src/app/shared/interfaces';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public registUser(userData: IUser): Observable<IUser> {
    const registData = {
      userName: userData.userName,
      userPassword: userData.userPassword,
      userEmail: userData.userEmail,
      userGender: userData.userGender,
      userRole: userData.userRole
    };
    return this.http.post<IUser>(`${environment.mongodb.databaseURL}/auth/createUser`, registData);
  }

  public getUserForLogin(loginData: IUser): Observable<IUser> {
    const logData = {
      userName: loginData.userName,
      userPassword: loginData.userPassword
    };
    return this.http.post<IUser>(`${environment.mongodb.databaseURL}/auth/login`, logData);
  }

  public getCurrentUser(): IUser {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  public userLogOut(): void {
    localStorage.removeItem('currentUser');
  }

}
