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
import { MatDialogRef } from '@angular/material/dialog';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<NavsComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.registerForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmedPassword: ['', [Validators.required]],
      },
      { validators: this.checkPasswords }
    );
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('password').value;
    let confirmPass = group.get('confirmedPassword').value;
    return pass === confirmPass ? null : { notSame: true };
  };

  onRegister() {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username').value;
      const password = this.registerForm.get('password').value;
      this.isRegister = true;
      this.authService
        .register(username, password)
        .pipe(take(1))
        .subscribe(
          (token) => {
            this.onSuccess(token);
            this.isRegister = false;
          },
          ({ error }) => {
            this.toasterService.showMessage('error', error.message);
            this.isRegister = false;
          }
        );
    }
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
            this.onSuccess(token);
          },
          ({ error }) => {
            this.toasterService.showMessage('error', error.message);
            this.isLogin = false;
          }
        );
    }
  }

  onSuccess(token: string) {
    localStorage.setItem('bsound_token', token);
    this.dialogRef.close();
  }
}
