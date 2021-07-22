import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  loggedIn$= false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isUserLoggedIn$) => {
      this.loggedIn$ = isUserLoggedIn$
    })
  }
  
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.isUserLoggedIn$.next(false)
    this.router.navigate(['']);  }
}
