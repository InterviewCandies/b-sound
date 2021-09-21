import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SimpleToasterComponent } from 'src/app/base/components/simple-toaster/simple-toaster.component';
import { StatusType } from '../entities/status.entity';

@Injectable()
export class ToasterService {
  durationInSeconds = 5;

  constructor(private snackBar: MatSnackBar) {}

  showMessage(status: StatusType, message: string) {
    this.snackBar.openFromComponent(SimpleToasterComponent, {
      data: {
        status,
        message,
      },
      duration: this.durationInSeconds * 1000,
    });
  }
}
