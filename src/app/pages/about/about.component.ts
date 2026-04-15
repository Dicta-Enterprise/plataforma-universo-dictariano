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
  
}
