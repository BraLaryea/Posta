import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs'
import { first, tap } from 'rxjs/operators'

import { User } from '../models/User'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3000/auth";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };

  userId = Number(localStorage.getItem('user'))

  isUserLoggedIn$ = new BehaviorSubject<boolean>(this.loggedIn$());

  renderer: any

  loggedIn$() {
    if (localStorage.getItem("token") !== null) {
      return true
    }
    else {
      return false
    }
  }

  constructor(private http: HttpClient, private router: Router) { }

  signup(user: Observable<User>) {
    return this.http
      .post(`${this.url}/signup`, user, this.httpOptions)
      .pipe(
        first()
      )
  }

  login(user: Observable<User>): Observable<{ token: string; userId: number; message: string }> {
    return this.http
      .post(`${this.url}/login`, user, this.httpOptions)
      .pipe(
        first(),
        tap((tokenObject: any) => {
          localStorage.setItem('user', tokenObject.userId)
          localStorage.setItem('token', tokenObject.token);
          this.router.navigate(['posts']);
          this.isUserLoggedIn$.next(true)
        })
      )
  }
}