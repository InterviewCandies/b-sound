import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { interval } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
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
  isRepeating: boolean = false;
  endTime: number = 0;
  audios: AudioRecurence[] = [];

  constructor() {}

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

  getTimer(name: string): number {
    const selectedAudio = this.audios.find((item) =>
      this.getSoundName(item.audio.src)?.includes(name)
    );
    if (selectedAudio) return selectedAudio.timer;
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
}
