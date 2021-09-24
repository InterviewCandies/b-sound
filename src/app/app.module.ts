import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BaseModule } from './base/base.module';
import { MODULES } from './modules';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './modules/sound-editor/editor/editor.component';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './modules/profile/profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './modules/auth/login/login.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RegisterComponent } from './modules/auth/register/register.component';
import { SoundsComponent } from './modules/sounds/sounds.component';
import { SoundsListComponent } from './modules/sounds/sounds-list/sounds-list.component';
import { SoundsCollectionComponent } from './modules/sounds/sounds-collection/sounds-collection.component';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { CategoryService } from './core/services/category.service';
import { SoundPlayerComponent } from './modules/sounds/sound-player/sound-player.component';
import { SoundProducerComponent } from './modules/sounds/sound-producer/sound-producer.component';

const appRoutes: Routes = [
  { path: 'sounds/:id', component: SoundPlayerComponent },
  { path: 'sounds/sharing/:id', redirectTo: 'sounds/:id' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [AppComponent, ProfileComponent],
  imports: [
    BrowserModule,
    BaseModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    CoreModule,
    RouterModule.forRoot(appRoutes),
    ...MODULES,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
