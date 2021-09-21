import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
})
export class SoundsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
}
