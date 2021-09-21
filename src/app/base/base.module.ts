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
import { SoundsRoutingModule } from './sounds-routing.module';

@NgModule({
  declarations: [NavsComponent, SearchBarComponent, CustomDialogComponent],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FlexLayoutModule,
    MatFormFieldModule,
    RouterModule.forChild(SoundsRoutingModule),
  ],
  exports: [NavsComponent, SearchBarComponent, RouterModule],
})
export class BaseModule {}
