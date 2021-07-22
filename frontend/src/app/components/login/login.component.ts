import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isUserLoggedIn$.value) {
      this.router.navigate(['posts'])
    }
  }

  login(): void {
    this.authService.login(this.LoginForm.value).subscribe((msg) => { console.log(msg.message) })
  }

  get email(): any { return this.LoginForm.get('email'); }
  get password(): any { return this.LoginForm.get('password') }
}
