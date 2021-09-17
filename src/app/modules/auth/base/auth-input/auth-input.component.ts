import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Input,
  forwardRef,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-auth-input',
  templateUrl: './auth-input.component.html',
  styleUrls: ['./auth-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthInputComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class AuthInputComponent implements ControlValueAccessor {
  @Input()
  set value(val: string | number) {
    if (val !== this._value) {
      this._value = val;
      this.onChange(this._value);
    }
  }
  get value() {
    return this._value;
  }

  @Input() icon: string;
  @Input() placeholder: string;
  @Input() type: string;
  @Output() focus: EventEmitter<any> = new EventEmitter<any>();

  private _value: string | number = '';
  onChange = (_: any) => {};
  onTouch = () => {};

  writeValue(value: string | number): void {
    if (value !== undefined) {
      this.value = value;
    }
  }

  onInput(event: Event): void {
    const value: string | number = (event?.target as HTMLInputElement).value;
    this._value = value;
    this.onChange(this._value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onFocus(event: Event) {
    this.focus.emit(event);
  }
}
