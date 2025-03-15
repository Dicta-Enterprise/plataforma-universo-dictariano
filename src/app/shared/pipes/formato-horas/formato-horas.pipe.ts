import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoHoras'
})
export class FormatoHorasPipe implements PipeTransform {

  transform(horas: number): string {
    const dias = Math.floor(horas / 24);
    const horasRestantes = horas % 24;

    if(dias === 0){
      return `${horasRestantes} Hora(s)`;
    }

    if(horasRestantes === 0){
      return `${dias} Día(s)`;
    }

    return `${dias} Días ${horasRestantes} Horas`;
  }
}
