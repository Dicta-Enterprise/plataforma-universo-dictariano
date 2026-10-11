import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subject, combineLatest } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CursoFacade } from '../../patterns/facade/models/curso-facade';
import { CategoriaFacade } from '../../patterns/facade/models/categoria-facade';
import { Categoria, Cursos } from 'src/app/core/class/models';

@Component({
  selector: 'app-slider-courses',
  templateUrl: './slider-courses.component.html',
  styleUrls: ['./slider-courses.component.css'],
})
export class SliderCoursesComponent implements OnInit, OnDestroy {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  // Entradas configurables
  @Input() category!: 'todos' | 'ninos' | 'jovenes' | 'padres';
  @Input() bg_color = '#1F2F4A';
  @Input() primary_color = '#15b6cf';
  @Input() secondary_color = '#235E66';
  @Input() scrollStep = 316;
  @Input() maxCursos = 15;

  cursos: Cursos[] = [];
  loading = true;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly cursoFacade: CursoFacade,
    private readonly categoriaFacade: CategoriaFacade,
  ) {}

  ngOnInit(): void {
    this.categoriaFacade.listarCategorias();
    this.cursoFacade.listarCursos();

    this.setColorsByCategory();

    combineLatest([
      this.categoriaFacade.categorias$.asObservable(),
      this.cursoFacade.cursos$.asObservable(),
    ])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([categorias, cursos]) => {
        if (!categorias.length || !cursos.length) {
          return;
        }

        if (this.category === 'todos') {
          // Limita a máximo 15 cursos
          this.cursos = cursos.slice(0, this.maxCursos);
        } else {
          const catEncontrada = categorias.find(
            (cat: Categoria) =>
              cat.nombre.toLowerCase().replace('ñ', 'n') === this.category,
          );

          if (catEncontrada) {
            // Filtra por categoría y limita a máximo 15 cursos
            this.cursos = cursos
              .filter((curso: Cursos) => curso.categoriaId === catEncontrada.id)
              .slice(0, this.maxCursos);
          } else {
            this.cursos = [];
          }
        }

        this.loading = false;
      });
  }

  private setColorsByCategory(): void {
    switch (this.category) {
    case 'ninos':
      this.primary_color = 'var(--color-nino)';
      this.secondary_color = '#156B2B';
      break;

    case 'jovenes':
      this.primary_color = 'var(--color-joven)';
      this.secondary_color = '#b38f00';
      break;

    case 'padres':
      this.primary_color = 'var(--color-padre)';
      this.secondary_color = '#1a8fb3';
      break;

    default:
      this.primary_color = '#15b6cf';
      this.secondary_color = '#235E66';
    }
  }

  scrollTo(isNext: boolean): void {
    if (!this.sliderContainer) return;

    this.sliderContainer.nativeElement.scrollBy({
      left: isNext ? this.scrollStep : -this.scrollStep,
      behavior: 'smooth',
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
