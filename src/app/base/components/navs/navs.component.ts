import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss'],
})
export class NavsComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openAuthentication() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }
}
