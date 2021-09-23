import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  isRegister: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toasterService: ToasterService,
    public dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
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
    if (this.registerForm.valid) {
      const username = this.registerForm.get('username').value;
      const password = this.registerForm.get('password').value;
      this.isRegister = true;
      this.authService
        .register(username, password)
        .pipe(take(1))
        .subscribe(
          (token) => {
            this.onSuccess(token, 'Register');
            this.isRegister = false;
          },
          ({ error }) => {
            this.toasterService.showMessage('error', error.message);
            this.isRegister = false;
          }
        );
    }
  }

  onSuccess(token: string, action: string = '') {
    this.toasterService.showMessage('success', action + ' successfully!');
    this.dialogRef.close();
  }
}
