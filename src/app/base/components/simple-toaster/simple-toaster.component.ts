import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { StatusType } from 'src/app/core/entities/status.entity';

@Component({
  selector: 'app-simple-toaster',
  templateUrl: './simple-toaster.component.html',
  styleUrls: ['./simple-toaster.component.scss'],
})
export class SimpleToasterComponent implements OnInit {
  message: string = '';
  status: StatusType;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.status = data.status;
  }

  ngOnInit(): void {}
}
