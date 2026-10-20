import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cursos } from 'src/app/core/class/models';
import { CursosService } from 'src/app/core/services/models/cursos/cursos.service';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-cursos-todos',
  templateUrl: './cursos-todos.component.html',
})
export class CursosTodosComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  allCursos: Cursos[] = [];
  cursosFiltrados: Cursos[] = [];
  cursosVisibles: Cursos[] = [];

  loading = true;
  pageSize = 8;
  displayCount = 8;

  // Filtros seleccionados actuales
  selectedUserType: string | null = null; // 'ninos' | 'jovenes' | 'padres'
  selectedTopic: string | null = null; // ID del topic

  // Indica si se aplicó un filtro proveniente de parámetros de URL o botón buscar
  filtersApplied = false;

  // Opciones de Audiencia en formato de botones
  userTypes = [
    { label: 'Padres', value: 'padres', icon: 'pi pi-heart' },
    { label: 'Jóvenes', value: 'jovenes', icon: 'pi pi-send' },
    { label: 'Niños', value: 'ninos', icon: 'pi pi-star' },
  ];

  // Temas / Categorías provistos en formato de botones con iconos
  topics = [
    {
      id: 'salud-fisica',
      name: 'Peligros en la salud física',
      icon: 'pi pi-heart',
    },
    {
      id: 'salud-mental',
      name: 'Peligros en la salud mental',
      icon: 'pi pi-sun',
    },
    {
      id: 'salud-social',
      name: 'Peligros en la salud social',
      icon: 'pi pi-users',
    },
    {
      id: 'riesgos-ciberneticos',
      name: 'Riesgos cibernéticos',
      icon: 'pi pi-globe',
    },
  ];

  constructor(
    private readonly cursosService: CursosService,
    private readonly alertService: AlertService,
    private readonly route: ActivatedRoute, // <- Inyectar ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Escuchar los queryParams de la URL al cargar el componente
    this.subscription.add(
      this.route.queryParams.subscribe((params) => {
        const target = params['target'];
        const category = params['category'];

        if (target) {
          this.selectedUserType = target;
        }
        if (category) {
          this.selectedTopic = category;
        }

        // Si viene con parámetros desde el home, marcamos los filtros como aplicados y ejecutamos la búsqueda automáticamente
        if (target || category) {
          this.filtersApplied = true;
        }

        this.cargarCursos();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  cargarCursos() {
    this.loading = true;
    this.subscription.add(
      this.cursosService.listarCursosService$().subscribe({
        next: (data) => {
          this.allCursos = data;

          // Si hay filtros seleccionados por URL, filtramos de inmediato al cargar los cursos
          if (this.selectedUserType !== null || this.selectedTopic !== null) {
            this.ejecutarFiltradoInterno();
          } else {
            this.cursosFiltrados = [...this.allCursos];
            this.actualizarCursosVisibles();
          }

          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.alertService.showError(
            'Upss..',
            'Ocurrió un error al listar los cursos',
          );
        },
      }),
    );
  }

  // Seleccionar o deseleccionar audiencia (Selección única)
  selectUserType(value: string) {
    if (this.selectedUserType === value) {
      this.selectedUserType = null;
    } else {
      this.selectedUserType = value;
    }
  }

  // Seleccionar o deseleccionar categoría (Selección única)
  selectTopic(id: string) {
    if (this.selectedTopic === id) {
      this.selectedTopic = null;
    } else {
      this.selectedTopic = id;
    }
  }

  // El botón de filtrar se habilita si hay al menos un filtro seleccionado
  get isSearchEnabled(): boolean {
    return this.selectedUserType !== null || this.selectedTopic !== null;
  }

  // Lógica interna para filtrar los cursos
  private ejecutarFiltradoInterno() {
    this.cursosFiltrados = this.allCursos.filter((curso: Cursos) => {
      const matchUser = this.selectedUserType
        ? curso.categoriaId?.toLowerCase() ===
          this.selectedUserType.toLowerCase()
        : true;

      const matchTopic = this.selectedTopic
        ? curso.categoria === this.selectedTopic
        : true;

      return matchUser && matchTopic;
    });

    this.displayCount = this.pageSize;
    this.actualizarCursosVisibles();
  }

  // Aplicar filtros mediante el botón Buscar
  onSearch() {
    this.filtersApplied = true;
    this.ejecutarFiltradoInterno();
  }

  // Limpiar filtros
  clearFilters() {
    this.selectedUserType = null;
    this.selectedTopic = null;
    this.filtersApplied = false;
    this.cursosFiltrados = [...this.allCursos];
    this.displayCount = this.pageSize;
    this.actualizarCursosVisibles();
  }

  // Lógica de lazy loading
  actualizarCursosVisibles() {
    this.cursosVisibles = this.cursosFiltrados.slice(0, this.displayCount);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = window.innerHeight + window.scrollY;
    const max = document.documentElement.scrollHeight;

    if (pos >= max - 300 && this.hasMoreCourses && !this.loading) {
      this.loadMore();
    }
  }

  loadMore() {
    this.displayCount += this.pageSize;
    this.actualizarCursosVisibles();
  }

  get hasMoreCourses(): boolean {
    return this.displayCount < this.cursosFiltrados.length;
  }
}
