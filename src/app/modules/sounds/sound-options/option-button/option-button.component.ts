import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-option-button',
  templateUrl: './option-button.component.html',
  styleUrls: ['./option-button.component.scss'],
})
export class OptionButtonComponent implements OnInit {
  @ViewChild('tooltip', { static: false }) tooltip: MatTooltip;

  @Input() disabled: boolean = false;
  @Input() tooltipMessage: string = '';
  @Input() color: string = '';
  @Input() icon: string = '';

  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.tooltip.show();
    this.onClick.emit();
  }
}
