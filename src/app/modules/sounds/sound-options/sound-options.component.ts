import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';
import { interval } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import {
  ConfigurationEntity,
  SoundType,
  SUPPORT_SOUNDS,
} from 'src/app/core/entities/configuration.entity';
import { SoundService } from 'src/app/core/services/sound.service';
import { ToasterService } from 'src/app/core/services/toaster.service';
import utils from 'src/app/utils';
import { LoginComponent } from '../../auth/login/login.component';
import { AudioRecurence } from './types';

const MAXIMUM_TIMER = 60;
const MAXIMUM_RECURRENCE_TIME = 25;
const DIFF_TIME = 5;

@Component({
  selector: 'app-sound-options',
  templateUrl: './sound-options.component.html',
  styleUrls: ['./sound-options.component.scss'],
})
export class SoundOptionsComponent implements OnInit, OnDestroy {
  @Input() disabled: boolean = false;
  @Input() id: string = '';

  @Input()
  set audioConfigs(audios: AudioRecurence[]) {
    this.audios = audios;
  }

  @Input()
  set loop(value: boolean) {
    this.isRepeating = value;
  }

  @Input()
  set timer(value: number) {}

  isRepeating: boolean = false;
  endTime: number = 0;
  isSavingConfiguration: boolean = false;
  audios: AudioRecurence[] = [];

  constructor(
    private dialog: MatDialog,
    private soundService: SoundService,
    private toasterService: ToasterService
  ) {}

  get isSavable(): boolean {
    return this.isRepeating || this.audios.length > 0;
  }

  ngOnInit(): void {}

  onClickSound(src: string) {
    const selectedAudioIndex = this.audios.findIndex((item) => {
      return this.getSoundName(item.audio.src) == this.getSoundName(src);
    });

    if (selectedAudioIndex >= 0) {
      const selectedAudio = this.audios[selectedAudioIndex];
      clearInterval(selectedAudio.interval);
      if (selectedAudio.timer + DIFF_TIME <= MAXIMUM_RECURRENCE_TIME) {
        if (selectedAudio.timer === 1) selectedAudio.timer = 0;
        selectedAudio.timer += 5;
        selectedAudio.interval = setInterval(() => {
          if (!this.disabled) selectedAudio.audio.play();
        }, this.convertToMs(selectedAudio.timer));
      } else {
        this.audios.splice(selectedAudioIndex, 1);
      }
    } else {
      const newAudio = new Audio();
      newAudio.src = src;
      newAudio.load();
      newAudio.play();
      this.audios.push({
        audio: newAudio,
        interval: setInterval(() => {
          newAudio.play();
        }, this.convertToMs(1)),
        timer: 1,
      });
    }
  }

  onRepeat() {
    this.isRepeating = !this.isRepeating;
  }

  onSetTime() {
    if (this.endTime + DIFF_TIME <= MAXIMUM_TIMER) {
      this.endTime += DIFF_TIME;
    } else this.endTime = 0;
  }

  onSaveConfiguration() {
    if (!utils.isAuthenticated()) {
      const dialogRef = this.dialog.open(LoginComponent);
      dialogRef.afterClosed().subscribe((result) => console.log(result));
      return;
    }

    this.isSavingConfiguration = true;
    this.toasterService.showMessage('proccessing', 'Saving your configuration');

    const getSoundConfigs = () => {
      const obj: Record<string, number> = {};
      for (const sound of SUPPORT_SOUNDS)
        obj[sound] = this.getCurrentSoundConfig(sound);
      return obj;
    };

    const config = {
      time: 0,
      loop: this.isRepeating,
      ...getSoundConfigs(),
    } as ConfigurationEntity;

    this.soundService
      .saveSoundConfiguration(this.id, config)
      .pipe(take(1))
      .subscribe(
        (response) => {
          if (response.success) {
            this.toasterService.hideMessage();

            this.toasterService.showMessage(
              'success',
              'Configuration for this sound has been saved !'
            );
          } else {
            this.toasterService.showMessage('error', response.message);
          }
          this.isSavingConfiguration = false;
        },
        ({ error }) => {
          this.toasterService.showMessage('error', error.message);
          this.isSavingConfiguration = false;
        }
      );
  }

  getTimer(name: string): number {
    const selectedAudio = this.audios.find((item) =>
      this.getSoundName(item.audio.src)?.includes(name)
    );
    if (selectedAudio) return selectedAudio?.timer;
    return 0;
  }

  getSoundTooltip(title: string, key: string): string {
    const timer = this.getTimer(key);
    if (timer) {
      return `${title}: ${timer} ${timer === 1 ? 'minute' : 'minutes'}`;
    }
    return title;
  }

  ngOnDestroy() {
    for (const item of this.audios) {
      item.audio.pause();
      item.audio.src = '';
      if (item.timeout) clearTimeout(item.timeout);
      clearInterval(item.interval);
    }
  }

  private getSoundName(src: string) {
    return src.split('/').pop();
  }

  private convertToMs(minutes: number): number {
    return minutes * 60 * 60;
  }

  private getCurrentSoundConfig(sound: string): number {
    const audio = this.audios.find(
      (audio) => this.getSoundName(audio.audio.src) === sound + '.mp3'
    );

    if (audio) return audio.timer;
    return 0;
  }
}
