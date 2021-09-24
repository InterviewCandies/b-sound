import { Component, OnInit } from '@angular/core';
import { SoundService } from 'src/app/core/services/sound.service';
import { take } from 'rxjs/operators';
import { ConfigurationEntity } from 'src/app/core/entities/configuration.entity';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/core/services/toaster.service';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'app-sounds-collection',
  templateUrl: './sounds-collection.component.html',
  styleUrls: ['./sounds-collection.component.scss'],
})
export class SoundsCollectionComponent implements OnInit {
  configs: ConfigurationEntity[] = [];
  isLoading: boolean;

  constructor(
    private soundService: SoundService,
    private router: Router,
    private toasterSevice: ToasterService,
    private clipBoardService: ClipboardService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.soundService
      .getAllConfiguration()
      .pipe(take(1))
      .subscribe(
        (configs) => {
          this.configs = configs;
          this.isLoading = false;
        },
        ({ error }) => {
          this.toasterSevice.showMessage('error', error.message);
        }
      );
  }

  onPlayAudio(id: string) {
    this.router.navigateByUrl('sounds/' + id);
  }

  onCopyLink(config: ConfigurationEntity) {
    this.toasterSevice.showMessage('proccessing', 'Processing...');
    this.soundService
      .getSharedConfigurationCode(config.sound._id, config)
      .pipe(take(1))
      .subscribe(
        (code) => {
          this.toasterSevice.hideMessage();
          const origin = window.location.origin;
          const url = `${origin}/sounds/sharing/${code}`;
          this.clipBoardService.copy(url);
          this.toasterSevice.showMessage('success', 'Link copied !');
        },
        ({ error }) => {
          this.toasterSevice.showMessage('error', error.message);
        }
      );
  }
}
