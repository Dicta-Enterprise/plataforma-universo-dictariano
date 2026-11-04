import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

export interface VideoItem {
  id: string;
  titulo: string;
  subtitulo?: string;
  thumbnail: string;
  src: string;
  badge?: string;
  duracionSemanas?: number;
  valoracion?: string;
  likesCount: number;
}

@Component({
  selector: 'app-video-carousel',
  templateUrl: './video-carousel.component.html',
})
export class VideoCarouselComponent implements OnInit {
  @ViewChild('sliderContainer') sliderContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('player') playerRef?: ElementRef<HTMLVideoElement>;

  @Input() videos: VideoItem[] = [];
  @Input() maxVideos = 10;

  playingId: string | null = null;
  isPaused = false;
  isMuted = false;
  progreso = 0;

  /** Videos de prueba. Se usan solo si no llegan videos por @Input. */
  private readonly videosPrueba: VideoItem[] = [
    {
      id: 'v1',
      titulo: 'Introducción al uso de computadoras',
      thumbnail:
        'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      badge: 'Estreno',
      likesCount: 150,
    },
    {
      id: 'v2',
      titulo: 'Navegación segura en internet',
      thumbnail:
        'https://images.pexels.com/photos/3771069/pexels-photo-3771069.jpeg',
      src: 'https://www.w3schools.com/html/movie.mp4',
      likesCount: 200,
    },
    {
      id: 'v3',
      titulo: 'Manejo de correo electrónico',
      thumbnail:
        'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      likesCount: 180,
    },
    {
      id: 'v4',
      titulo: 'Procesadores de texto básicos',
      thumbnail:
        'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg',
      src: 'https://www.w3schools.com/html/movie.mp4',
      likesCount: 160,
    },
    {
      id: 'v5',
      titulo: 'Hojas de cálculo para principiantes',
      thumbnail:
        'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      badge: 'Nuevo',
      likesCount: 140,
    },
    {
      id: 'v6',
      titulo: 'Cómo identificar noticias falsas',
      thumbnail:
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
      src: 'https://www.w3schools.com/html/movie.mp4',
      likesCount: 130,
    },
    {
      id: 'v7',
      titulo: 'Seguridad de contraseñas',
      thumbnail:
        'https://images.pexels.com/photos/1820919/pexels-photo-1820919.jpeg',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      likesCount: 120,
    },
    {
      id: 'v8',
      titulo: 'Búsqueda efectiva en Google',
      thumbnail:
        'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      src: 'https://www.w3schools.com/html/movie.mp4',
      likesCount: 110,
    },
    {
      id: 'v9',
      titulo: 'Herramientas de videollamadas',
      thumbnail:
        'https://images.pexels.com/photos/1487613/pexels-photo-1487613.jpeg',
      src: 'https://www.w3schools.com/html/mov_bbb.mp4',
      likesCount: 100,
    },
    {
      id: 'v10',
      titulo: 'Compras en línea de forma segura',
      thumbnail:
        'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg',
      src: 'https://www.w3schools.com/html/movie.mp4',
      badge: 'Estreno',
      likesCount: 90,
    },
  ];

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const fuente = this.videos.length ? this.videos : this.videosPrueba;
    this.videos = fuente.slice(0, this.maxVideos);
  }

  trackById(_: number, video: VideoItem): string {
    return video.id;
  }

  onPlay(video: VideoItem): void {
    if (this.playingId === video.id) {
      this.togglePlay();
      return;
    }

    this.playingId = video.id;
    this.progreso = 0;
    this.isPaused = false;
    this.cdr.detectChanges();
    this.centrar(video.id);
  }

  togglePlay(): void {
    const video = this.playerRef?.nativeElement;
    if (!video) return;

    if (video.paused) {
      video
        .play()
        .then(() => {
          this.isPlayingState(true);
        })
        .catch(() => {
          this.isPlayingState(false);
        });
    } else {
      video.pause();
      this.isPlayingState(false);
    }
  }

  toggleMute(): void {
    this.isMuted = !this.isMuted;
    this.cdr.markForCheck();
  }

  onTimeUpdate(): void {
    const video = this.playerRef?.nativeElement;
    if (!video || !video.duration) return;

    this.progreso = (video.currentTime / video.duration) * 100;
    this.cdr.markForCheck();
  }

  onPause(): void {
    this.isPaused = true;
    this.cdr.markForCheck();
  }

  onPlaying(): void {
    this.isPaused = false;
    this.cdr.markForCheck();
  }

  private isPlayingState(playing: boolean): void {
    this.isPaused = !playing;
    this.cdr.markForCheck();
  }

  shareVideo(video: VideoItem): void {
    if (navigator.share) {
      navigator.share({
        title: video.titulo,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  }

  private centrar(id: string): void {
    const contenedor = this.sliderContainer?.nativeElement;
    if (!contenedor) return;

    const tarjeta = contenedor.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!tarjeta) return;

    const posicion =
      tarjeta.offsetLeft - contenedor.clientWidth / 2 + tarjeta.offsetWidth / 2;
    const maximo = contenedor.scrollWidth - contenedor.clientWidth;

    contenedor.scrollTo({
      left: Math.max(0, Math.min(posicion, maximo)),
      behavior: 'smooth',
    });
  }

  scrollTo(isNext: boolean): void {
    const contenedor = this.sliderContainer?.nativeElement;
    if (!contenedor) return;

    const tarjetas = Array.from(
      contenedor.querySelectorAll<HTMLElement>('[data-id]'),
    );
    if (!tarjetas.length) return;

    const posicionActual = contenedor.scrollLeft;
    const tolerancia = 2;

    const destino = isNext
      ? tarjetas.find((t) => t.offsetLeft > posicionActual + tolerancia)
      : [...tarjetas]
        .reverse()
        .find((t) => t.offsetLeft < posicionActual - tolerancia);

    if (!destino) {
      contenedor.scrollTo({
        left: isNext ? contenedor.scrollWidth : 0,
        behavior: 'smooth',
      });
      return;
    }

    contenedor.scrollTo({
      left: destino.offsetLeft,
      behavior: 'smooth',
    });
  }
}
