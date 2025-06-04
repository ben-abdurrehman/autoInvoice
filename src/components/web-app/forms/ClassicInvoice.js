"use client";

export default function ClassicInvoice({ data }) {
  const subtotal = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const taxAmount = data.taxEnabled ? subtotal * 0.1 : 0;
  const total = subtotal + taxAmount;

  return (
    <div className="space-y-6 text-sm text-[#808080]">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <h2 className="text-xl font-bold">Billed To:</h2>
          <p>{data.clientName}</p>
          <p>{data.clientAddress}</p>
          <p>{data.clientCity}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-bold text-[#0000ff]">{data.businessName}</h2>
          <p>{data.businessAddress}</p>
          <p>{data.cityZip}</p>
          {data.taxId && <p>TAX ID {data.taxId}</p>}
        </div>
      </div>

      {/* Metadata */}
      <div className="grid grid-cols-2 gap-4">
        <p><strong>Invoice #</strong>: {data.invoiceNumber}</p>
        <p><strong>Invoice Date</strong>: {data.invoiceDate}</p>
        <p><strong>Reference</strong>: {data.reference}</p>
        <p><strong>Due Date</strong>: {data.dueDate}</p>
      </div>

      {/* Items */}
      <table className="w-full border mt-4">
        <thead className="bg-[#E5E7EB]">
          <tr>
            <th className="p-2 text-left">Item</th>
            <th className="p-2">Qty</th>
            <th className="p-2">Rate</th>
            <th className="p-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{item.name}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-center">${item.price.toFixed(2)}</td>
              <td className="p-2 text-right">${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-[#E5E7EB]">
          <tr>
            <td colSpan="3" className="p-2 text-right font-semibold">Subtotal</td>
            <td className="p-2 text-right">${subtotal.toFixed(2)}</td>
          </tr>
          {data.taxEnabled && (
            <tr>
              <td colSpan="3" className="p-2 text-right font-semibold">Tax (10%)</td>
              <td className="p-2 text-right">${taxAmount.toFixed(2)}</td>
            </tr>
          )}
          <tr>
            <td colSpan="3" className="p-2 text-right font-bold text-[#0000ff]">Total</td>
            <td className="p-2 text-right text-[#0000ff] font-bold">${total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      {/* Notes */}
      {data.notes && (
        <p className="text-[#808080]0 italic pt-4">{data.notes}</p>
      )}

      {/* Footer */}
      <div className="flex justify-between text-xs text-[#808080]0 border-t pt-4">
        <span>{data.website}</span>
        <span>{data.phone}</span>
        <span>{data.email}</span>
      </div>
    </div>
  );
}
