import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Cursos } from 'src/app/core/class/models';
import { CursoFacade } from 'src/app/shared/patterns/facade/models/curso-facade';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { AuthService } from 'src/app/pages/auth/services/auth.service';

export interface Lesson {
  id: number;
  number: number;
  title: string;
  videoUrl: string;
  isLocked: boolean;
  likesCount?: string;
  commentsCount?: number;
}

@Component({
  selector: 'app-curso-short',
  templateUrl: './curso-short.component.html',
})
export class CursoShortComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly location: Location,
    private readonly cursoFacade: CursoFacade,
    private readonly cart: CartService,
    public auth: AuthService,
  ) {}

  // Referencia al elemento <video> en el HTML
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  courseData: Cursos | undefined;

  currentLesson: Lesson | null = null;
  isPlaying = false;
  isMuted = false;
  videoProgress = 0;

  // Logica del modal para mostrar la lección bloqueada
  showLockedModal = false;
  selectedLockedLesson: Lesson | null = null;

  lessons: Lesson[] = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
    title: i === 0 ? 'Introducción al curso' : `Clase ${i + 1}`,
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    isLocked: i >= 3,
  }));

  ngOnInit(): void {
    this.cursoFacade.listarCursos();

    this.cursoFacade.cursos$.subscribe((listaCursos) => {
      const id = this.route.snapshot.paramMap.get('id');
      if (id && listaCursos.length > 0) {
        this.courseData = listaCursos.find((c) => c.id.toString() === id);
      }
    });

    if (this.lessons.length > 0) {
      this.currentLesson = this.lessons[0];
    }
  }

  // Se ejecuta cuando la vista y el DOM ya están completamente renderizados
  ngAfterViewInit(): void {
    this.playVideoSafely();
  }

  togglePlay(): void {
    const video = this.videoPlayer?.nativeElement;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(() => {
          this.isPlaying = false;
        });
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  private playVideoSafely() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video
        .play()
        .then(() => {
          this.isPlaying = true;
        })
        .catch(() => {
          this.isPlaying = false;
        });
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
  }

  agregarAlCarrito(): void {
    if (!this.courseData) return;
    this.cart.addToCart(this.courseData);
  }

  goBack(): void {
    this.location.back();
  }

  // Método que se ejecuta cuando el usuario hace clic en una lección
  selectLesson(lesson: Lesson): void {
    if (lesson.isLocked) {
      this.selectedLockedLesson = lesson;
      this.showLockedModal = true;

      this.isPlaying = false;
      if (this.videoPlayer?.nativeElement) {
        this.videoPlayer.nativeElement.pause();
      }
    } else {
      this.currentLesson = lesson;
      this.isPlaying = true;

      // Damos un respiro al DOM para que cargue la nueva URL y reproducimos
      setTimeout(() => {
        this.playVideoSafely();
      });
    }
  }

  onObtenerPase() {
    this.closeLockedModal();
    this.router.navigate(['/cart']);
  }

  closeLockedModal() {
    this.showLockedModal = false;
    this.selectedLockedLesson = null;

    // Al cerrar el modal, reanudamos la reproducción
    this.isPlaying = true;
    setTimeout(() => {
      this.playVideoSafely();
    });
  }

  // Método para avanzar a la siguiente lección
  nextLesson(): void {
    if (!this.currentLesson || this.lessons.length === 0) return;

    const currentIndex = this.lessons.findIndex(
      (l) => l.id === this.currentLesson?.id,
    );

    if (currentIndex !== -1 && currentIndex < this.lessons.length - 1) {
      const nextItem = this.lessons[currentIndex + 1];
      // Reutilizamos tu lógica existente para validar si está bloqueada o no
      this.selectLesson(nextItem);
    }
  }

  // Método que se ejecuta constantemente mientras el video avanza
  updateProgress(event: Event): void {
    const video = event.target as HTMLVideoElement;
    if (video.duration) {
      this.videoProgress = (video.currentTime / video.duration) * 100;
    }
  }
}
