'use client'

import React, { useState } from 'react';

export default function InvoiceForm() {
  const [businessInfo, setBusinessInfo] = useState({
    name: '',
    address: '',
    cityStateZip: '',
    taxId: ''
  });

  const [clientInfo, setClientInfo] = useState({
    name: '',
    address: '',
    cityZip: ''
  });

  const [invoiceMeta, setInvoiceMeta] = useState({
    number: '',
    date: '',
    reference: '',
    dueDate: ''
  });

  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [taxEnabled, setTaxEnabled] = useState(true);
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState({ website: '', phone: '', email: '' });

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = field === 'quantity' || field === 'price' ? Number(value) : value;
    setItems(newItems);
  };

  const addItem = () => setItems([...items, { name: '', quantity: 1, price: 0 }]);
  const removeItem = (index) => setItems(items.filter((_, i) => i !== index));

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Invoice Builder</h1>

      {/* Business Info */}
      <div className="space-y-2">
        <h2 className="font-semibold">Your Business Info</h2>
        <input placeholder="Business Name" className="w-full border p-2 rounded" value={businessInfo.name} onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })} />
        <input placeholder="Business Address" className="w-full border p-2 rounded" value={businessInfo.address} onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })} />
        <input placeholder="City, State, Zip" className="w-full border p-2 rounded" value={businessInfo.cityStateZip} onChange={(e) => setBusinessInfo({ ...businessInfo, cityStateZip: e.target.value })} />
        <input placeholder="TAX ID" className="w-full border p-2 rounded" value={businessInfo.taxId} onChange={(e) => setBusinessInfo({ ...businessInfo, taxId: e.target.value })} />
      </div>

      {/* Client Info */}
      <div className="space-y-2">
        <h2 className="font-semibold">Billed To</h2>
        <input placeholder="Client Company Name" className="w-full border p-2 rounded" value={clientInfo.name} onChange={(e) => setClientInfo({ ...clientInfo, name: e.target.value })} />
        <input placeholder="Client Address" className="w-full border p-2 rounded" value={clientInfo.address} onChange={(e) => setClientInfo({ ...clientInfo, address: e.target.value })} />
        <input placeholder="City, Country - Zip" className="w-full border p-2 rounded" value={clientInfo.cityZip} onChange={(e) => setClientInfo({ ...clientInfo, cityZip: e.target.value })} />
      </div>

      {/* Invoice Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <input placeholder="Invoice Number" className="border p-2 rounded" value={invoiceMeta.number} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, number: e.target.value })} />
        <input type="date" placeholder="Invoice Date" className="border p-2 rounded" value={invoiceMeta.date} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, date: e.target.value })} />
        <input placeholder="Reference" className="border p-2 rounded" value={invoiceMeta.reference} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, reference: e.target.value })} />
        <input type="date" placeholder="Due Date" className="border p-2 rounded" value={invoiceMeta.dueDate} onChange={(e) => setInvoiceMeta({ ...invoiceMeta, dueDate: e.target.value })} />
      </div>

      {/* Item Table */}
      <div className="space-y-2">
        <h2 className="font-semibold">Services</h2>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-5 gap-2">
            <input placeholder="Item Name" className="col-span-2 border p-2 rounded" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} />
            <input type="number" placeholder="Qty" className="border p-2 rounded" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} />
            <input type="number" placeholder="Rate" className="border p-2 rounded" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} />
            <button className="text-red-600" onClick={() => removeItem(index)}>Remove</button>
          </div>
        ))}
        <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Item</button>
      </div>

      {/* Tax Toggle */}
      <label className="flex items-center space-x-2">
        <input type="checkbox" checked={taxEnabled} onChange={(e) => setTaxEnabled(e.target.checked)} />
        <span>Include Tax (10%)</span>
      </label>

      {/* Notes */}
      <textarea placeholder="Notes (e.g. payment terms)" rows={3} className="w-full border p-2 rounded" value={notes} onChange={(e) => setNotes(e.target.value)} />

      {/* Contact Info */}
      <div className="grid grid-cols-3 gap-4">
        <input placeholder="www.website.com" className="border p-2 rounded" value={contact.website} onChange={(e) => setContact({ ...contact, website: e.target.value })} />
        <input placeholder="Phone" className="border p-2 rounded" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
        <input placeholder="Email" className="border p-2 rounded" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
      </div>
    </div>
  );
}