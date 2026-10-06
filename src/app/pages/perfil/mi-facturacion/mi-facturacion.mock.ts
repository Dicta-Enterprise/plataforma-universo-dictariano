export interface Invoice {
  id: string;
  date: string;
  user: string;
  courseDescription: string;
  amount: number;
  status: 'Pagado' | 'Pendiente' | 'Rechazado';
  paymentMethod: string;
}

export interface InvoiceSummary {
  totalCourses: number;
  totalAmount: number;
  paymentMethod: string;
}

export const MOCK_INVOICES: Invoice[] = [
  { id: '1', date: '20/01/2027', user: 'Curso Niño', courseDescription: 'Ciberbullying', amount: 100000, status: 'Pagado', paymentMethod: 'Tarjeta Débito/Crédito' },
  { id: '2', date: '20/01/2027', user: 'Curso Niño', courseDescription: 'Teen Vamping', amount: 100000, status: 'Pagado', paymentMethod: 'Tarjeta Débito/Crédito' },
  { id: '3', date: '20/01/2027', user: 'Curso Niño', courseDescription: 'Grooming', amount: 100000, status: 'Pagado', paymentMethod: 'Tarjeta Débito/Crédito' },
  { id: '4', date: '15/01/2027', user: 'Curso Joven', courseDescription: 'Inteligencia social', amount: 100000, status: 'Pagado', paymentMethod: 'Tarjeta Débito/Crédito' },
  { id: '5', date: '15/01/2027', user: 'Curso Joven', courseDescription: 'Adolescencia y amor', amount: 100000, status: 'Pendiente', paymentMethod: 'PSE' },
  { id: '6', date: '15/01/2027', user: 'Curso Joven', courseDescription: 'Hikikomori', amount: 100000, status: 'Rechazado', paymentMethod: 'Tarjeta Débito/Crédito' }
];

export const MOCK_SUMMARY: InvoiceSummary = {
  totalCourses: 6,
  totalAmount: 600000,
  paymentMethod: 'Tarjeta Débito/Crédito'
};