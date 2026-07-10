import { Component, EventEmitter, Input, Output,ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-privacy-policy-modal',
  templateUrl: './privacy-policy-modal.component.html',
})
export class PrivacyPolicyModalComponent {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() politicaLeida = new EventEmitter<void>();
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  leida = false;

  onScroll(event: Event): void {
    const el = event.target as HTMLElement;
    const llegóAlFinal = el.scrollHeight - el.scrollTop <= el.clientHeight + 50;
    if (llegóAlFinal && !this.leida) {
      this.leida = true;
      this.politicaLeida.emit();
    }
  }

  cerrar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
  }
}