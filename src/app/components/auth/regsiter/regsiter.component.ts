import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-regsiter',
  templateUrl: './regsiter.component.html',
  styleUrls: ['./regsiter.component.scss'],
})
export class RegsiterComponent implements OnInit {
  form = new FormGroup(
    {
      username: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    this.checkPasswords
  );
  registerInvalid = false;
  formSubmitAttempt: boolean;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private route: Router
  ) {}
  checkPasswords(group: FormGroup): Validators {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;
    return password === confirmPassword ? null : { notSame: true };
  }
  ngOnInit(): void {}
  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;
        await this.authService.register(username, password);
        this.snackBar.open('Sign Successfully', null, {
          duration: 2000,
        });
        this.route.navigate(['/auth/login']);
      } catch (err) {
        this.snackBar.open('Error');

        this.registerInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }
  async registerWithGoogle(): Promise<void> {
    try {
      await this.authService.loginWithgoogle();
      this.snackBar.open('Sign Successfully', null, {
        duration: 2000,
      });
      this.route.navigate(['/dashboard']);
    } catch (err) {
      this.snackBar.open('Error', null, {
        duration: 2000,
      });

      this.registerInvalid = true;
    }
  }
}
