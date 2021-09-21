import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './login/login.component';
import { AuthInputComponent } from './base/auth-input/auth-input.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RegisterComponent } from './register/register.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [LoginComponent, AuthInputComponent, RegisterComponent],
  providers: [FormBuilder],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [AuthInputComponent],
})
export class AuthModule {}
