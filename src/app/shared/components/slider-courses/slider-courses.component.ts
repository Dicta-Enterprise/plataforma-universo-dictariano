import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Curso } from 'src/app/core/class/curso/curso.class';

@Component({
  selector: 'app-slider-courses',
  templateUrl: './slider-courses.component.html',
  styleUrls: ['./slider-courses.component.css'],
})
export class SliderCoursesComponent {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;

  @Input() cursos: Curso[] = [];

  // Paso de desplazamiento opcional
  @Input() scrollStep = 316;

  scrollTo(isNext: boolean): void {
    if (!this.sliderContainer) return;

    this.sliderContainer.nativeElement.scrollBy({
      left: isNext ? this.scrollStep : -this.scrollStep,
      behavior: 'smooth',
    });
  }
}
