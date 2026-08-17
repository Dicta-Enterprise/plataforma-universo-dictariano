import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MESES } from 'src/app/core/constants/constants';

// Funciones noop externas para evitar arrow functions vacías en la clase
const noop = (): void => {
  void 0;
};
const noopValue = (val: string): string => val;

@Component({
  selector: 'app-month-day-picker',
  templateUrl: './month-day-picker.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MonthDayPickerComponent),
      multi: true,
    },
  ],
})
export class MonthDayPickerComponent implements ControlValueAccessor {
  dia = '01';
  mes = '01';

  readonly dias = Array.from({ length: 31 }, (_, i) =>
    String(i + 1).padStart(2, '0'),
  );

  readonly meses = MESES.map((label, index) => ({
    value: String(index + 1).padStart(2, '0'),
    label,
  }));

  private onChange: (value: string) => void = noopValue;
  private onTouched: () => void = noop;

  writeValue(value: string): void {
    if (value && value.includes('-')) {
      const [m, d] = value.split('-');
      this.mes = m;
      this.dia = d;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onDiaChange(event: Event): void {
    this.dia = (event.target as HTMLSelectElement).value;
    this.emitValue();
  }

  onMesChange(event: Event): void {
    this.mes = (event.target as HTMLSelectElement).value;
    this.emitValue();
  }

  private emitValue(): void {
    this.onChange(`${this.mes}-${this.dia}`);
    this.onTouched();
  }
}
