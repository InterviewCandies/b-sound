import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationStart, Router } from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sounds',
  templateUrl: './sounds.component.html',
  styleUrls: ['./sounds.component.scss'],
})
export class SoundsComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit() {}

  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent);
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
}
