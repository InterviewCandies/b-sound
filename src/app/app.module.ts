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
import {FileUploadComponent} from "./modules/sound-editor/file-upload/file-upload.component";
import {MatIconModule} from "@angular/material/icon";

const appRoutes: Routes = [
  {path: '', component: EditorComponent},
  {path: 'list', component: FileUploadComponent}
]

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BaseModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forRoot(appRoutes),
    ...MODULES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
