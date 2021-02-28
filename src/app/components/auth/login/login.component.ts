import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginInvalid = false;
  formSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.email],

      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authService.login({ username, password });
        this.route.navigate(['/dashboard']);
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
  async loginWithGoogle(): Promise<void> {
    try {
      await this.authService.loginWithgoogle();
      this.snackBar.open('Sign Successfully');
      this.route.navigate(['/dashboard']);
    } catch (err) {
      this.snackBar.open('Error', null, {
        duration: 2000,
      });
    }
  }
}
