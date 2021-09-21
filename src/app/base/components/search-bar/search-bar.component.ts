import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { SoundService } from 'src/app/core/services/sound.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { SoundEntity } from 'src/app/core/entities/sound.entity';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  searchTerm$ = new Subject<string>();
  sounds: SoundEntity[] = [];

  constructor(private soundService: SoundService) {}

  ngOnInit(): void {
    this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((term: string) => this.soundService.searchSoundByName(term))
      )
      .subscribe((sounds) => {
        this.sounds = sounds;
      });
  }

  onKeyUp(event: Event) {
    this.searchTerm$.next((event.target as HTMLInputElement).value);
  }

  ngOnDestroy() {
    this.searchTerm$.next();
    this.searchTerm$.complete();
  }
}
