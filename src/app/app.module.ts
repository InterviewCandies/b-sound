import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {BaseModule} from "./base/base.module";
import {MODULES} from "./modules";
import {RouterModule, Routes} from "@angular/router";
import {EditorComponent} from "./modules/sound-editor/editor/editor.component";
import {MatIconModule} from "@angular/material/icon";
import {SoundsViewComponent} from "./modules/sounds/sounds-view/sounds-view.component";
import { ProfileComponent } from './modules/profile/profile.component';
import {MatDialogModule} from "@angular/material/dialog";

const appRoutes: Routes = [
  {path: '', component: EditorComponent},
  {path: 'sounds', component: SoundsViewComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    BaseModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes),
    ...MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
