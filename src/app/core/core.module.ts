import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CategoryService } from './services/category.service';
import { SoundService } from './services/sound.service';

@NgModule({
  imports: [HttpClientModule],
  providers: [CategoryService, SoundService],
})
export class CoreModule {}
