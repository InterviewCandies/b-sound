import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthGuard } from './guards/auth.guards';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/category.service';
import { SoundService } from './services/sound.service';
import { ToasterService } from './services/toaster.service';

@NgModule({
  imports: [HttpClientModule, MatSnackBarModule],
  providers: [
    CategoryService,
    SoundService,
    AuthService,
    ToasterService,
    AuthGuard,
  ],
})
export class CoreModule {}
