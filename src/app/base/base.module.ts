import {NgModule} from "@angular/core";
import {NavsComponent} from "./components/navs/navs.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    NavsComponent
  ],
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NavsComponent,
    RouterModule
  ],
})

export class BaseModule {}
