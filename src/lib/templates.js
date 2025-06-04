import ClassicInvoice from '@/components/templates/ClassicInvoice';
import ModernInvoice from '@/components/templates/ModernInvoice';

export const templates = {
  classic: {
    id: 'classic',
    name: 'Classic Invoice',
    image: '/assets/templates/classic.png',
    component: ClassicInvoice,
    fields: {
      logo: true,
      business: ['name', 'address', 'cityZip', 'taxId'],
      client: ['name', 'address', 'cityZip'],
      metadata: ['invoiceNumber', 'invoiceDate', 'reference', 'dueDate'],
      items: ['name', 'quantity', 'rate'],
      tax: true,
      notes: true,
      footer: ['website', 'phone', 'email']
    }
  },

  modern: {
    id: 'modern',
    name: 'Modern Invoice',
    image: '/assets/templates/modern.png',
    component: ModernInvoice,
    fields: {
      logo: true,
      business: ['name', 'address'],
      client: ['name', 'email'],
      metadata: ['invoiceNumber', 'invoiceDate'],
      items: ['name', 'quantity', 'price'],
      tax: false,
      notes: true,
      footer: ['email']
    }
  }
};
