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

  downloadPdf(invoiceId: string): void {
    alert(`[Simulación] Descargando comprobante PDF de la factura ID #${invoiceId}`);
  }

  downloadAllPdfs(): void {
    alert('[Simulación] Descargando paquete completo con todas las facturas en PDF');
  }

  toggleEmptyState(): void {
    this.showEmptyState = !this.showEmptyState;
    this.invoices = this.showEmptyState ? [] : MOCK_INVOICES;
  }
}