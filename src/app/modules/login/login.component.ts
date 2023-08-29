import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    this.authService
      .login({
        username: this.f.username.value,
        password: this.f.password.value
      })
      .subscribe((success: boolean) => {
        if (success) {
          if (localStorage.getItem('ROLES').includes('ADMIN')) {
            this.router.navigate(['/dashboard']);
          } else if (localStorage.getItem('ROLES').includes('ResponsableVoyages')) {
            this.router.navigate(['/dashboard/']);
          } else if (localStorage.getItem('ROLES').includes('ResponsablesQualite')) {
            this.router.navigate(['/dashboard/']);
          }
        }
      });
  }
}
