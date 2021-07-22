import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
//   SignupForm = new FormGroup({
//     email: new FormControl('', [Validators.required, Validators.email]),
//     password: new FormControl('', [Validators.required, Validators.minLength(8)])
//  })
  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  signup(data:any): void{
    this.authService.signup(data).subscribe((msg) => {
      console.log(msg);
      this.router.navigate([''])
    })
  }
}
