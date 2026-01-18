import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoBeneficios'
})
export class FormatoBeneficiosPipe implements PipeTransform {

  transform(beneficio: {titulo:string,descripcion:string}): string {
    beneficio.descripcion = beneficio.descripcion.slice(0,20) + '...';
    
    return `${beneficio.titulo}: ${beneficio.descripcion}`;
  }
}
