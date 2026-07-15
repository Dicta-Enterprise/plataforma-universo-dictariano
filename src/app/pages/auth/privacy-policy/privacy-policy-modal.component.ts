import { Component, EventEmitter, Input, Output,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
  styleUrls: ['./privacy-policy-modal.component.css'], 
})
export class PrivacyPolicyModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() politicaLeida = new EventEmitter<void>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  leida = false;
  progreso = 0;

  onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    this.progreso = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    if (this.progreso >= 95 && !this.leida) {
      this.leida = true;
      this.politicaLeida.emit();
    }
  }

  cerrar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}