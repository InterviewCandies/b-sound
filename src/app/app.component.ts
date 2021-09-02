import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ProfileComponent} from "./modules/profile/profile.component";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'b-sound';

  constructor(private dialog: MatDialog) {}

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
    dialogRef.afterClosed().subscribe(result => console.log(result));
  }

}
