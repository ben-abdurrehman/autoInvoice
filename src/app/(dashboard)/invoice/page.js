"use client";

import { useRouter } from 'next/navigation';
import { useFormData } from '@/components/web-app/shared/FormContextProvider';
import { useState } from 'react';

export default function InvoiceFormPage() {
  const { updateFormData } = useFormData();
  const router = useRouter();

  const [form, setForm] = useState({
    businessName: '',
    businessAddress: '',
    cityZip: '',
    taxId: '',
    clientName: '',
    clientAddress: '',
    clientCity: '',
    invoiceNumber: '',
    invoiceDate: '',
    reference: '',
    dueDate: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    notes: '',
    website: '',
    phone: '',
    email: '',
    taxEnabled: true,
  });

  const [errors, setErrors] = useState({});

  const handleItemChange = (index, field, value) => {
    const updated = [...form.items];
    updated[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { name: '', quantity: 1, price: 0 }] });
  const removeItem = (index) => setForm({ ...form, items: form.items.filter((_, i) => i !== index) });

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'businessName', 'businessAddress', 'cityZip', 'clientName', 'clientAddress',
      'clientCity', 'invoiceNumber', 'invoiceDate', 'dueDate', 'email'
    ];
    requiredFields.forEach((field) => {
      if (!form[field] || form[field].toString().trim() === '') {
        newErrors[field] = 'Required';
      }
    });
    if (!form.items.length || form.items.some(item => !item.name || item.quantity <= 0 || item.price <= 0)) {
      newErrors.items = 'Each item must be complete and valid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    updateFormData(form);
    router.push('/output');
  };

  return (
    <main className='w-full  bg-slate-950 py-10 rounded-lg  '>
        <div className="w-lg lg:w-xl 2xl:w-2xl bg-white mx-auto p-6 rounded-lg space-y-6">
        <h1 className="text-3xl font-bold">Invoice Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input className="w-full border p-2 rounded" placeholder="Business Name" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} />
            {errors.businessName && <p className="text-red-500 text-sm">{errors.businessName}</p>}

            <input className="w-full border p-2 rounded" placeholder="Business Address" value={form.businessAddress} onChange={(e) => setForm({ ...form, businessAddress: e.target.value })} />
            {errors.businessAddress && <p className="text-red-500 text-sm">{errors.businessAddress}</p>}

            <input className="w-full border p-2 rounded" placeholder="City, Zip" value={form.cityZip} onChange={(e) => setForm({ ...form, cityZip: e.target.value })} />
            {errors.cityZip && <p className="text-red-500 text-sm">{errors.cityZip}</p>}

            <input className="w-full border p-2 rounded" placeholder="Tax ID (optional)" value={form.taxId} onChange={(e) => setForm({ ...form, taxId: e.target.value })} />

            <hr className="my-4" />

            <input className="w-full border p-2 rounded" placeholder="Client Name" value={form.clientName} onChange={(e) => setForm({ ...form, clientName: e.target.value })} />
            {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName}</p>}

            <input className="w-full border p-2 rounded" placeholder="Client Address" value={form.clientAddress} onChange={(e) => setForm({ ...form, clientAddress: e.target.value })} />
            {errors.clientAddress && <p className="text-red-500 text-sm">{errors.clientAddress}</p>}

            <input className="w-full border p-2 rounded" placeholder="Client City, Zip" value={form.clientCity} onChange={(e) => setForm({ ...form, clientCity: e.target.value })} />
            {errors.clientCity && <p className="text-red-500 text-sm">{errors.clientCity}</p>}

            <hr className="my-4" />

            <div className="grid grid-cols-2 gap-4">
            <input className="border p-2 rounded" placeholder="Invoice Number" value={form.invoiceNumber} onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })} />
            <input type="date" className="border p-2 rounded" placeholder="Invoice Date" value={form.invoiceDate} onChange={(e) => setForm({ ...form, invoiceDate: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Reference (optional)" value={form.reference} onChange={(e) => setForm({ ...form, reference: e.target.value })} />
            <input type="date" className="border p-2 rounded" placeholder="Due Date" value={form.dueDate} onChange={(e) => setForm({ ...form, dueDate: e.target.value })} />
            </div>
            {(errors.invoiceNumber || errors.invoiceDate || errors.dueDate) && <p className="text-red-500 text-sm">Invoice details are required.</p>}

            <hr className="my-4" />

            <h2 className="text-lg font-semibold">Items</h2>
            {form.items.map((item, index) => (
            <div key={index} className="grid grid-cols-4 gap-2 items-center">
                <input className="border p-2 rounded col-span-2" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
                <input type="number" className="border p-2 rounded" placeholder="Qty" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
                <input type="number" className="border p-2 rounded" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
                <button type="button" className="text-red-600" onClick={() => removeItem(index)}>Remove</button>
            </div>
            ))}
            {errors.items && <p className="text-red-500 text-sm">{errors.items}</p>}
            <button type="button" onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Item</button>

            <textarea className="w-full border p-2 rounded mt-4" placeholder="Payment Notes (e.g. Pay within 15 days)" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

            <div className="grid grid-cols-3 gap-4">
            <input className="border p-2 rounded" placeholder="Website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            <label className="flex items-center gap-2 pt-4">
            <input type="checkbox" checked={form.taxEnabled} onChange={(e) => setForm({ ...form, taxEnabled: e.target.checked })} />
            <span>Include Tax (10%)</span>
            </label>

            <button type="submit" className="mt-6 w-full cursor-pointer bg-green-600 text-white py-3 rounded font-semibold">Finish & Continue</button>
        </form>
        </div>
    </main>
  );
}
