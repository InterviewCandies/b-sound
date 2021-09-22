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
import { find, take, takeUntil } from 'rxjs/operators';
import { ShowHideStyleBuilder } from '@angular/flex-layout';
import { SoundOptionsComponent } from '../sound-options/sound-options.component';
import { fromEvent, Subject } from 'rxjs';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('options', { static: false }) options: SoundOptionsComponent;
  @ViewChild('audio', { static: true }) audio: HTMLAudioElement;

  sound: SoundEntity;
  isLoading: boolean = false;
  unsubscriber$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as string;
    this.isLoading = true;
    this.soundService
      .fetchSoundById(id)
      .pipe(take(1))
      .subscribe((sound) => {
        this.sound = sound;
        this.isLoading = false;
      });

    this.soundService
      .getSoundConfiguration(id)
      .pipe(take(1))
      .subscribe((sound) => {
        console.log(sound);
      });
  }

  private stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  ngOnDestroy() {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}
