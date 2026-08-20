import { Pipe, PipeTransform } from '@angular/core';
import { MESES } from 'src/app/core/constants/constants';

@Pipe({
  name: 'dayMonthFormat',
})
export class DayMonthFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || !value.includes('-')) return value;

    const [mesStr, diaStr] = value.split('-');
    const mesIndex = parseInt(mesStr, 10) - 1;
    const diaNum = parseInt(diaStr, 10);

    if (isNaN(mesIndex) || isNaN(diaNum) || !MESES[mesIndex]) return value;

    return `${diaNum} de ${MESES[mesIndex]}`;
  }
}
