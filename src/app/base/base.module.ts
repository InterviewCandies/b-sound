import { NgModule } from '@angular/core';
import { NavsComponent } from './components/navs/navs.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CustomDialogComponent } from './components/custom-dialog/custom-dialog.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SoundsRoutingModule } from '../modules/sounds/sounds-routing.module';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonModule } from '@angular/common';
import { SimpleToasterComponent } from './components/simple-toaster/simple-toaster.component';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import {
  MatProgressSpinner,
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavsComponent,
    SearchBarComponent,
    CustomDialogComponent,
    LoaderComponent,
    SimpleToasterComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatFormFieldModule,
    RouterModule.forChild(SoundsRoutingModule),
  ],
  exports: [
    NavsComponent,
    SearchBarComponent,
    RouterModule,
    LoaderComponent,
    SimpleToasterComponent,
  ],
})
export class BaseModule {}
