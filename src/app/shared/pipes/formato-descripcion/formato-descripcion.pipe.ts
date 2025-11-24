import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoDescripcion'
})
export class FormatoDescripcionPipe implements PipeTransform {

  transform(descripcion: string): string {
    descripcion = descripcion.slice(0,50) + '...';
    
    return descripcion;
  }
}
