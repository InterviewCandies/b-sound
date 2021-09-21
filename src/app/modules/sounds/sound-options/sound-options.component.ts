import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { debounceTime, take } from 'rxjs/operators';
import { AudioRecurence } from './types';

@Component({
  selector: 'app-sound-options',
  templateUrl: './sound-options.component.html',
  styleUrls: ['./sound-options.component.scss'],
})
export class SoundOptionsComponent implements OnInit, OnDestroy {
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
      if (selectedAudio.timer + 5 <= 25) {
        selectedAudio.timer += 5;
        selectedAudio.interval = setInterval(() => {
          selectedAudio.audio.play();
        }, this.convertToMs(selectedAudio.timer));
      } else {
        this.audios.splice(selectedAudioIndex, 1);
      }
    } else {
      const newAudio = new Audio();
      newAudio.src = src;
      newAudio.load();
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
    if (this.endTime + 5 <= 60) {
      this.endTime += 5;
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
      return `${title}: ${timer} minutes`;
    }
    return title;
  }

  ngOnDestroy() {
    for (const item of this.audios) clearInterval(item.interval);
  }

  private getSoundName(src: string) {
    return src.split('/').pop();
  }

  private convertToMs(minutes: number): number {
    return minutes * 60 * 60;
  }
}
