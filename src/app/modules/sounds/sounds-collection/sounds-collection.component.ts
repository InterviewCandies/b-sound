import { Component, OnInit } from '@angular/core';
import { SoundService } from 'src/app/core/services/sound.service';
import { take } from 'rxjs/operators';
import { ConfigurationEntity } from 'src/app/core/entities/configuration.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sounds-collection',
  templateUrl: './sounds-collection.component.html',
  styleUrls: ['./sounds-collection.component.scss'],
})
export class SoundsCollectionComponent implements OnInit {
  configs: ConfigurationEntity[] = [];
  isLoading: boolean;

  constructor(private soundService: SoundService, private router: Router) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.soundService
      .getAllConfiguration()
      .pipe(take(1))
      .subscribe((configs) => {
        this.configs = configs;
        this.isLoading = false;
      });
  }

  onPlayAudio(id: string) {
    this.router.navigateByUrl('sounds/' + id);
  }
}
