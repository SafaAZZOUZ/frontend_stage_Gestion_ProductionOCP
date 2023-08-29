import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      this.authService.registerUser(formData).subscribe(
        (response) => {
          if (!response.error) {
            console.log('User registered successfully:', response);
            this.router.navigate(['/login']);
          } else {
            console.error('Error registering user:', response.error);
          }
        },
        (error) => {
          console.error('Error registering user:', error);
        }
      );
    }
  }
}
