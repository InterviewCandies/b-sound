import {NgModule} from "@angular/core";
import {SoundsViewComponent} from "./sounds-view/sounds-view.component";
import { SoundsResultComponent } from './sounds-result/sounds-result.component';
import {BaseModule} from "../../base/base.module";

@NgModule({
  declarations: [
    SoundsViewComponent,
    SoundsResultComponent
  ],
  imports: [
    BaseModule
  ]
})

export class SoundsModule {}
