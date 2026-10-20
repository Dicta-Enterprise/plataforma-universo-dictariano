import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(public auth: AuthService) {}

  // Sección de Categorías por Audiencia
  audiences = [
    {
      id: 'padres',
      title: 'Padres',
      subtitle: 'Guía y control parental',
      icon: 'pi pi-heart',
      textColor: 'text-padre',
      activeBorder: 'border-padre',
      hoverBorder: 'hover:border-padre',
      hoverShadow: 'hover:shadow-padre/30',
      activeShadow: 'shadow-padre/40',
      gradientFrom: 'from-padre/20',
    },
    {
      id: 'jovenes',
      title: 'Jóvenes',
      subtitle: 'Ciudadanía digital y redes',
      icon: 'pi pi-send',
      textColor: 'text-joven',
      activeBorder: 'border-joven',
      hoverBorder: 'hover:border-joven',
      hoverShadow: 'hover:shadow-joven/30',
      activeShadow: 'shadow-joven/40',
      gradientFrom: 'from-joven/20',
    },
    {
      id: 'ninos',
      title: 'Niños',
      subtitle: 'Aprende jugando seguro',
      icon: 'pi pi-star',
      textColor: 'text-nino',
      activeBorder: 'border-nino',
      hoverBorder: 'hover:border-nino',
      hoverShadow: 'hover:shadow-nino/30',
      activeShadow: 'shadow-nino/40',
      gradientFrom: 'from-nino/20',
    },
  ];

  // Temáticas de Alfabetización y Seguridad Digital
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

  // Logica de selección de audiencia y galaxias
  selectedAudience: string | null = null;
  selectAudience(id: string) {
    if (this.selectedAudience === id) {
      this.selectedAudience = null;
    } else {
      this.selectedAudience = id;
    }
  }
}
