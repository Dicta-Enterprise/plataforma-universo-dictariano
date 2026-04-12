import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  imagenes = [
    {
      img: 'https://lucaedu.com/wp-content/uploads/2022/02/salud-mental-en-ninos-1.jpg',
      title: 'Salud emocional en los niños',
      desc: 'lorem ipsumg elidunt ut labore et dolore magna aliqua.'
    },
    {
      img: 'https://cdn-3.expansion.mx/dims4/default/c550113/2147483647/resize/1280x/quality/90/?url=https%3A%2F%2Fcdn-3.expansion.mx%2Fca%2Fb3%2Fb5f81307436f80dc775f0f7bd85f%2Fistock-1471729424.jpg',
      title: 'Protección del internet',
      desc: 'lorem ipsumg elidunt ut labore et dolore magna aliqua.'
    },
    {
      img: 'https://tubbies.mx/cdn/shop/articles/9a25ab919b0c1259484982be8eae7ece.jpg?v=1592856032&width=2048',
      title: 'Salud social infantil',
      desc: 'lorem ipsumg elidunt ut labore et dolore magna aliqua.'
    }
  ];
  values = [
    {
      title: 'Seguridad',
      desc: 'La protección digital de las familias está en el centro de todo lo que hacemos.',
      color: 'teal',
      icon: `<svg viewBox="0 0 28 28"><path d="M14 3L3 8v10l11 7 11-7V8L14 3Z" stroke="#40E0D0" stroke-width="2"/></svg>`
    },
    {
      title: 'Confianza',
      desc: 'Construimos relaciones transparentes con nuestros usuarios.',
      color: 'yellow',
      icon: `<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="11" stroke="#F7C50F" stroke-width="2"/></svg>`
    },
    {
      title: 'Innovación',
      desc: 'Experiencias educativas interactivas y envolventes.',
      color: 'green',
      icon: `<svg viewBox="0 0 28 28"><path d="M14 4C9 4 5 8 5 13" stroke="#90EE90" stroke-width="2"/></svg>`
    },
    {
      title: 'Inclusión',
      desc: 'Educación accesible para todos.',
      color: 'teal',
      icon: `<svg viewBox="0 0 28 28"><circle cx="14" cy="14" r="6" stroke="#40E0D0" stroke-width="2"/></svg>`
    },
    {
      title: 'Empatía',
      desc: 'Entendemos cada necesidad digital.',
      color: 'yellow',
      icon: `<svg viewBox="0 0 28 28"><path d="M7 13c0-4 3-7 7-7" stroke="#F7C50F" stroke-width="2"/></svg>`
    },
    {
      title: 'Comunidad',
      desc: 'Crecemos juntos como ecosistema.',
      color: 'green',
      icon: `<svg viewBox="0 0 28 28"><circle cx="9" cy="10" r="4" stroke="#90EE90" stroke-width="2"/></svg>`
    }
  ];
}
