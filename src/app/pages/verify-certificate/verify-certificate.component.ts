import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CertificatesApiService } from 'src/app/core/services/certificates/certificates-api.service';
import {
  ICertificatePublic,
  ICertificateVerification,
} from 'src/app/core/interfaces/certificates/ICertificate.interface';

@Component({
  selector: 'app-verify-certificate',
  templateUrl: './verify-certificate.component.html',
})
export class VerifyCertificateComponent implements OnInit {
  cargando = false;
  error: string | null = null;
  publico: ICertificatePublic | null = null;
  resultadoPdf: ICertificateVerification | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: CertificatesApiService,
  ) {}

  ngOnInit(): void {
    // Llegada desde el QR: /verificar-certificado?id=<uuid>
    const id = this.route.snapshot.queryParamMap.get('id');
    if (!id) return;
    this.cargando = true;
    this.api.obtenerPublico(id).subscribe({
      next: (r) => { this.publico = r; this.cargando = false; },
      error: (e) => {
        this.publico = e?.status === 404 ? e.error : null;
        this.error = e?.status === 404 ? null : 'No se pudo conectar con el servicio de certificados.';
        this.cargando = false;
      },
    });
  }

  alSeleccionarPdf(evento: Event): void {
    const archivo = (evento.target as HTMLInputElement).files?.[0];
    if (!archivo) return;
    this.cargando = true;
    this.error = null;
    this.resultadoPdf = null;
    this.api.verificarPdf(archivo).subscribe({
      next: (r) => { this.resultadoPdf = r; this.cargando = false; },
      error: () => { this.error = 'No se pudo verificar el archivo.'; this.cargando = false; },
    });
  }
}
