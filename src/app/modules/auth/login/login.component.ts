import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { NavsComponent } from 'src/app/base/components/navs/navs.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLogin: boolean = false;
  isRegister: boolean = false;
  loginErrorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<NavsComponent>,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username').value;
      const password = this.loginForm.get('password').value;
      this.isLogin = true;

      this.authService
        .login(username, password)
        .pipe(take(1))
        .subscribe(
          (token) => {
            this.isLogin = false;
            this.onSuccess(token, 'Login');
          },
          ({ error }) => {
            this.toasterService.showMessage('error', error.message);
            this.loginErrorMessage = error.message;
            console.log(this.loginErrorMessage);
            this.isLogin = false;
          }
        );
    }
  }
  openRegister() {
    this.dialog.open(RegisterComponent);
  }
  onSuccess(token: string, action: string = '') {
    localStorage.setItem('bsound_token', token);
    this.toasterService.showMessage('success', action + ' successfully!');
    this.dialogRef.close();
  }
}
