import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from "@angular/forms";

const CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchComponent),
  multi: true,
};

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CONTROL_ACCESSOR],
})
export class SearchComponent {
  @Input() value!: string;
  @Output() valueChange = new EventEmitter<string>();

  private onChange = (_: any) => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  writeValue(value: string): void {
    this.value = value;
  }

  change(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value
    this.onChange(target.value);
    this.valueChange.emit(target.value);
  }
}
