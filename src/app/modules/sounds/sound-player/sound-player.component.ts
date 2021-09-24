import {
  AfterViewInit,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SoundEntity } from 'src/app/core/entities/sound.entity';
import { SoundService } from 'src/app/core/services/sound.service';
import { find, skipUntil, take, takeUntil } from 'rxjs/operators';
import { ShowHideStyleBuilder } from '@angular/flex-layout';
import { SoundOptionsComponent } from '../sound-options/sound-options.component';
import { combineLatest, fromEvent, Subject } from 'rxjs';
import { ConfigurationEntity } from 'src/app/core/entities/configuration.entity';
import { AudioRecurence } from '../sound-options/types';
import utils from 'src/app/utils';
import { ToasterService } from 'src/app/core/services/toaster.service';

const BASE_SRC = '../../../../assets/audios/';
const BASE_TYPE = '.mp3';

@Component({
  selector: 'app-sound-player',
  templateUrl: './sound-player.component.html',
  styleUrls: ['./sound-player.component.scss'],
})
export class SoundPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('options', { static: false }) options: SoundOptionsComponent;
  @ViewChild('audio', { static: true }) audio: HTMLAudioElement;

  sound: SoundEntity = null;
  isLoading: boolean = false;
  isHideGoBackButton = false;
  isLoop: boolean = false;
  unsubscriber$ = new Subject();
  soundId: string = '';
  customAudios: AudioRecurence[] = [];

  constructor(
    private route: ActivatedRoute,
    private soundService: SoundService,
    private toasterService: ToasterService,
    public location: Location
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'] as string;
    this.soundId = id;

    this.isLoading = true;

    this.soundService
      .getConfigurationByCode(id)
      .pipe(take(1))
      .subscribe((response) => {
        if (response) {
          this.isHideGoBackButton = true;
          this.soundId = response.sound._id;
        }
        combineLatest(
          this.soundService.fetchSoundById(this.soundId),
          this.soundService.getSoundConfiguration(this.soundId)
        )
          .pipe(take(1))
          .subscribe(
            ([sound, config]) => {
              this.sound = sound;
              if (config) {
                const { loop, time, ...sounds } = config;
                this.isLoop = loop;
                console.log(loop);
                this.getCustomSoundConfigs(sounds);
              }
              this.isLoading = false;
            },
            ({ error }) => {
              this.toasterService.showMessage('error', error.message);
              this.isLoading = false;
            }
          );
      });
  }

  private getCustomSoundConfigs(sounds: object) {
    for (const [name, time] of Object.entries(sounds)) {
      if (typeof time === 'number' && time) {
        const newAudio = new Audio();
        newAudio.src = BASE_SRC + name + BASE_TYPE;
        this.customAudios.push({
          audio: newAudio,
          interval: setInterval(() => {
            newAudio.play();
          }, utils.convertToMs(time)),
          timer: time,
        });
      }
    }
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
