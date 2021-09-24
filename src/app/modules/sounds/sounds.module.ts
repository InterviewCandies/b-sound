import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EditorComponent } from '../sound-editor/editor/editor.component';
import { SoundsRoutingModule } from './sounds-routing.module';
import { SoundsComponent } from './sounds.component';
import { SoundsListComponent } from './sounds-list/sounds-list.component';
import { SoundsCollectionComponent } from './sounds-collection/sounds-collection.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BaseModule } from 'src/app/base/base.module';
import { CommonModule } from '@angular/common';
import { CategoryService } from 'src/app/core/services/category.service';
import { CoreModule } from 'src/app/core/core.module';
import { SoundPlayerComponent } from './sound-player/sound-player.component';
import { SoundOptionsComponent } from './sound-options/sound-options.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OptionButtonComponent } from './sound-options/option-button/option-button.component';
import { SoundProducerComponent } from './sound-producer/sound-producer.component';
import { SoundUploadComponent } from './sound-producer/sound-upload/sound-upload.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [
    SoundsComponent,
    SoundsListComponent,
    SoundsCollectionComponent,
    SoundPlayerComponent,
    SoundOptionsComponent,
    OptionButtonComponent,
    SoundProducerComponent,
    SoundUploadComponent,
  ],
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    FlexLayoutModule,
    MatFormFieldModule,
    ClipboardModule,
    IvyCarouselModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatChipsModule,
    CommonModule,
    BaseModule,
    CoreModule,
    RouterModule.forChild(SoundsRoutingModule),
  ],
})
export class SoundsModule {}
