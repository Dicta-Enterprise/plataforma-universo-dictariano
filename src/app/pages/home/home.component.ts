import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  constructor(
    public auth: AuthService,
    private route: ActivatedRoute,
  ) {}

  // Logica de seleccion de galaxias y tags
  galaxiasSeleccionadas: string[] = ['Peligros Digitales'];
  tagsSeleccionados: string[] = ['Niños', 'Jóvenes'];

  toggle(item: string, lista: string[]) {
    const index = lista.indexOf(item);
    if (index > -1) {
      lista.splice(index, 1);
    } else {
      lista.push(item);
    }
  }

  getChipClass(item: string, lista: string[]): string {
    const isSelected = lista.includes(item);
    return isSelected
      ? '!bg-white !text-black font-semibold !text-xs cursor-pointer'
      : '!bg-neutral-900 !text-gray-300 !text-xs font-semibold cursor-pointer hover:!bg-neutral-800';
  }

  // Logica de redireccion a seccion de cursos cuando se hace click en el boton de (+) de card de cuenta asociada
  @ViewChild('seccionCursos') seccionCursos!: ElementRef<HTMLElement>;
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const tagParam = params['tag'];

      if (tagParam) {
        this.tagsSeleccionados = [tagParam];
      }
    });
  }
  ngAfterViewInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'seccionCursos') {
        setTimeout(() => {
          if (this.seccionCursos) {
            this.seccionCursos.nativeElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }, 100);
      }
    });
  }
}
