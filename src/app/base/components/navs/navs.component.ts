import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/modules/auth/login/login.component';

@Component({
  selector: 'app-navs',
  templateUrl: './navs.component.html',
  styleUrls: ['./navs.component.scss'],
})
export class NavsComponent implements OnInit {
  constructor(private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  openLink(link: string) {
    if (this.isAuthenticated) this.router.navigateByUrl(link);
    else this.openAuthentication();
  }

  openAuthentication() {
    const dialogRef = this.dialog.open(LoginComponent);
    dialogRef.afterClosed().subscribe((result) => console.log(result));
  }

  openProfile() {
    localStorage.removeItem('bsound_token');
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem('bsound_token');
  }
}
