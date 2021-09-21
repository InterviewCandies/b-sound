import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundEntity } from 'src/app/core/entities/sound.entity';
import { SoundService } from 'src/app/core/services/sound.service';
import { find, take } from 'rxjs/operators';
import { ShowHideStyleBuilder } from '@angular/flex-layout';
import { SoundOptionsComponent } from '../sound-options/sound-options.component';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit {
  @ViewChild('options', { static: false }) options: SoundOptionsComponent;
  @ViewChild('audio', { static: true }) audio: HTMLAudioElement;

  sound: SoundEntity | undefined;

  constructor(
    private route: ActivatedRoute,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as string;
    this.soundService
      .fetchSoundById(id)
      .pipe(take(1))
      .subscribe((categories) => {
        console.log(categories, id);
        const category = categories.find(
          (category) =>
            category.sounds.findIndex((sound) => sound.id == id) > -1
        );
        this.sound = category?.sounds.find((sound) => sound.id == id);
        console.log(category);
      });
  }

  private stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
