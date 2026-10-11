import { Component } from '@angular/core';
import { MOCK_INVOICES, MOCK_SUMMARY, Invoice, InvoiceSummary } from './mi-facturacion.mock';

@Component({
  selector: 'app-mi-facturacion',
  templateUrl: './mi-facturacion.component.html',
  styleUrls: ['./mi-facturacion.component.css']
})
export class MiFacturacionComponent {
  invoices: Invoice[] = MOCK_INVOICES;
  summary: InvoiceSummary = MOCK_SUMMARY;
  showEmptyState = false;
  toastMessage: string | null = null;

  downloadPdf(invoiceId: string): void {
    this.showToast(`Descargando comprobante PDF de la factura ID #${invoiceId}...`);
  }

  downloadAllPdfs(): void {
    this.showToast('Generando paquete completo con todas las facturas en PDF...');
  }

  toggleEmptyState(): void {
    this.showEmptyState = !this.showEmptyState;
    this.invoices = this.showEmptyState ? [] : MOCK_INVOICES;
  }

  private showToast(message: string): void {
    this.toastMessage = message;
    setTimeout(() => {
      this.toastMessage = null;
    }, 3500);
  }
}