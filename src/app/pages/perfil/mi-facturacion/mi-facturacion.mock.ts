export interface Invoice {
  id: string;
  date: string;
  user: string;
  courseDescription: string;
  amount: number;
  status: 'Pagado';
  paymentMethod: 'Efectivo' | 'Tarjeta de Débito' | 'Tarjeta de Crédito';
}

export interface InvoiceSummary {
  totalCourses: number;
  totalAmount: number;
  paymentMethod: string;
}

export const MOCK_INVOICES: Invoice[] = [
  {
    id: '001',
    date: '20/01/2027',
    user: 'Curso Niño',
    courseDescription: 'Ciberbullying',
    amount: 100000,
    status: 'Pagado',
    paymentMethod: 'Tarjeta de Crédito'
  },
  {
    id: '002',
    date: '20/01/2027',
    user: 'Curso Niño',
    courseDescription: 'Teen Vamping',
    amount: 100000,
    status: 'Pagado',
    paymentMethod: 'Tarjeta de Débito'
  },
  {
    id: '003',
    date: '20/01/2027',
    user: 'Curso Niño',
    courseDescription: 'Grooming',
    amount: 100000,
    status: 'Pagado',
    paymentMethod: 'Efectivo'
  },
  {
    id: '004',
    date: '15/01/2027',
    user: 'Curso Joven',
    courseDescription: 'Inteligencia social',
    amount: 100000,
    status: 'Pagado',
    paymentMethod: 'Tarjeta de Crédito'
  }
];

export const MOCK_SUMMARY: InvoiceSummary = {
  totalCourses: 4,
  totalAmount: 400000,
  paymentMethod: 'Tarjeta de Crédito'
};