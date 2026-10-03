'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createInvoice } from '@/app/dashboard/invoices/actions'
import { FiPlus, FiTrash2, FiSave, FiEye } from 'react-icons/fi'

export default function InvoiceBuilder({ clients, workspace }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  // Invoice State
  const [clientId, setClientId] = useState(clients[0]?.id || '')
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0])
  
  // Default due date to 14 days from now
  const defaultDue = new Date()
  defaultDue.setDate(defaultDue.getDate() + 14)
  const [dueDate, setDueDate] = useState(defaultDue.toISOString().split('T')[0])
  
  const [taxRate, setTaxRate] = useState(0)
  const [notes, setNotes] = useState('Thank you for your business!')
  const [template, setTemplate] = useState('modern')
  
  // Line Items State
  const [items, setItems] = useState([
    { id: Date.now(), description: '', quantity: 1, unit_price: 0 }
  ])

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)
  const taxAmount = subtotal * (taxRate / 100)
  const total = subtotal + taxAmount

  const selectedClient = clients.find(c => c.id === clientId)

  const handleAddItem = () => {
    setItems([...items, { id: Date.now(), description: '', quantity: 1, unit_price: 0 }])
  }

  const handleRemoveItem = (id) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        return { ...item, [field]: field === 'description' ? value : Number(value) }
      }
      return item
    }))
  }

  const handleSave = () => {
    if (!clientId) return alert('Please select a client.')
    if (items.some(i => !i.description)) return alert('Please provide descriptions for all items.')

    const payload = {
      client_id: clientId,
      issue_date: issueDate,
      due_date: dueDate,
      tax_rate: taxRate,
      subtotal,
      total,
      notes,
      template,
      items
    }

    startTransition(async () => {
      try {
        const invoiceId = await createInvoice(payload)
        router.push(`/share/${invoiceId}`) // Navigate to the public/share view
      } catch (error) {
        alert(error.message)
      }
    })
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[calc(100vh-8rem)]">
      {/* Editor Panel (Left) */}
      <div className="w-full lg:w-1/2 flex flex-col space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h2 className="text-lg font-bold text-slate-900">Invoice Details</h2>
            <select 
              value={template} 
              onChange={(e) => setTemplate(e.target.value)}
              className="px-3 py-1.5 bg-slate-100 rounded-lg text-sm font-medium border border-slate-200 focus:outline-none"
            >
              <option value="modern">Modern Template</option>
              <option value="classic">Classic Template</option>
              <option value="minimal">Minimal Template</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Billed To (Client)</label>
              {clients.length === 0 ? (
                <div className="text-sm text-red-500 font-medium p-3 bg-red-50 rounded-lg">
                  You have no clients! Please add a client first.
                </div>
              ) : (
                <select 
                  value={clientId} 
                  onChange={(e) => setClientId(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
                >
                  <option value="" disabled>Select a client...</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Issue Date</label>
              <input 
                type="date" 
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Due Date</label>
              <input 
                type="date" 
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Line Items Panel */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex-1">
          <h2 className="text-lg font-bold text-slate-900 mb-4 pb-4 border-b border-slate-100">Line Items</h2>
          
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group">
                <div className="flex-1">
                  <input 
                    type="text" 
                    placeholder="Item description..." 
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full bg-transparent font-medium text-slate-900 placeholder:text-slate-400 outline-none mb-2"
                  />
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Qty:</span>
                      <input 
                        type="number" 
                        min="1" 
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-md outline-none"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">Price:</span>
                      <input 
                        type="number" 
                        min="0" 
                        step="0.01"
                        value={item.unit_price}
                        onChange={(e) => updateItem(item.id, 'unit_price', e.target.value)}
                        className="w-24 px-2 py-1 bg-white border border-slate-200 rounded-md outline-none"
                      />
                    </div>
                  </div>
                </div>
                <div className="text-right flex flex-col justify-between h-full items-end gap-2">
                  <span className="font-semibold text-slate-900">
                    ${(item.quantity * item.unit_price).toFixed(2)}
                  </span>
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-1 opacity-0 group-hover:opacity-100"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={handleAddItem}
            className="mt-4 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-4 py-2 rounded-lg transition-colors w-full justify-center border border-blue-100"
          >
            <FiPlus /> Add Line Item
          </button>

          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
             <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Tax Rate (%)</span>
                  <input 
                    type="number" 
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => setTaxRate(Number(e.target.value))}
                    className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded-md outline-none"
                  />
                </div>
                <span className="font-semibold text-slate-900">${taxAmount.toFixed(2)}</span>
             </div>
             <div className="flex justify-between items-center pt-3 border-t border-slate-100">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-blue-600">${total.toFixed(2)}</span>
             </div>
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">Notes / Payment Instructions</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows="3"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors resize-none text-sm"
            placeholder="e.g. Payment due within 14 days. Bank: ..."
          />
        </div>

        <button 
          onClick={handleSave}
          disabled={isPending || clients.length === 0}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white py-4 rounded-xl font-semibold transition-all shadow-lg active:scale-[0.98] text-lg"
        >
          {isPending ? (
             <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
             <><FiSave className="text-xl" /> Generate Invoice & Share</>
          )}
        </button>
      </div>

      {/* Live Preview Panel (Right) */}
      <div className="hidden lg:block w-1/2 bg-slate-200/50 rounded-3xl p-8 sticky top-8 h-[calc(100vh-8rem)] overflow-y-auto shadow-inner border border-slate-200/60">
        <div className="flex items-center gap-2 mb-6 text-slate-500 font-medium justify-center">
          <FiEye /> Live Preview ({template})
        </div>

        {/* The Actual Preview Document */}
        <div className={`bg-white shadow-xl mx-auto w-full max-w-[21cm] min-h-[29.7cm] p-12 flex flex-col ${template === 'classic' ? 'font-serif' : 'font-sans'} transition-all duration-300`}>
           <div className={`flex justify-between items-start mb-16 ${template === 'minimal' ? 'flex-col gap-8' : ''}`}>
             <div>
                <h1 className={`text-4xl font-black text-slate-900 mb-2 tracking-tight ${template === 'modern' ? 'text-blue-600' : ''}`}>INVOICE</h1>
                <p className="text-slate-500 font-medium"># INV-PREVIEW</p>
             </div>
             <div className={`text-right ${template === 'minimal' ? 'text-left' : ''}`}>
               <h3 className="font-bold text-slate-900 text-xl mb-1">{workspace?.name || 'Your Company'}</h3>
               <p className="text-slate-500 text-sm whitespace-pre-wrap">123 Business Avenue<br/>City, State 12345</p>
             </div>
           </div>

           <div className="flex justify-between mb-12">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</p>
                {selectedClient ? (
                  <>
                    <h4 className="font-bold text-slate-900 text-lg">{selectedClient.name}</h4>
                    <p className="text-slate-600 text-sm">{selectedClient.email}</p>
                    {selectedClient.address && <p className="text-slate-500 text-sm mt-1 max-w-xs">{selectedClient.address}</p>}
                  </>
                ) : (
                  <p className="text-slate-400 italic">No client selected</p>
                )}
              </div>
              <div className="text-right flex flex-col gap-4">
                 <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Issue Date</p>
                   <p className="font-medium text-slate-900">{new Date(issueDate).toLocaleDateString()}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</p>
                   <p className="font-medium text-slate-900">{new Date(dueDate).toLocaleDateString()}</p>
                 </div>
              </div>
           </div>

           <div className="flex-1">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr className={`border-b-2 border-slate-900 text-slate-900 ${template === 'modern' ? 'border-blue-200 text-blue-900 bg-blue-50/50' : ''}`}>
                   <th className="py-3 px-2 font-bold w-1/2 text-sm uppercase">Description</th>
                   <th className="py-3 px-2 font-bold text-center text-sm uppercase">Qty</th>
                   <th className="py-3 px-2 font-bold text-right text-sm uppercase">Price</th>
                   <th className="py-3 px-2 font-bold text-right text-sm uppercase">Total</th>
                 </tr>
               </thead>
               <tbody>
                 {items.map((item) => (
                   <tr key={item.id} className="border-b border-slate-100">
                     <td className="py-4 px-2 font-medium text-slate-800">{item.description || <span className="text-slate-300 italic">Item description...</span>}</td>
                     <td className="py-4 px-2 text-center text-slate-600">{item.quantity}</td>
                     <td className="py-4 px-2 text-right text-slate-600">${Number(item.unit_price).toFixed(2)}</td>
                     <td className="py-4 px-2 text-right font-semibold text-slate-900">${(item.quantity * item.unit_price).toFixed(2)}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="flex justify-end mt-8 mb-12">
              <div className="w-72 space-y-3">
                 <div className="flex justify-between text-slate-600 font-medium">
                   <span>Subtotal</span>
                   <span>${subtotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-slate-600 font-medium">
                   <span>Tax ({taxRate}%)</span>
                   <span>${taxAmount.toFixed(2)}</span>
                 </div>
                 <div className={`flex justify-between items-center pt-4 border-t-2 ${template === 'modern' ? 'border-blue-200' : 'border-slate-900'} mt-4`}>
                   <span className="font-bold text-slate-900">Total Due</span>
                   <span className={`text-2xl font-black ${template === 'modern' ? 'text-blue-600' : 'text-slate-900'}`}>${total.toFixed(2)}</span>
                 </div>
              </div>
           </div>

           <div className="mt-auto pt-8 border-t border-slate-200 text-center text-slate-500 text-sm">
              <p className="font-medium text-slate-700 mb-1">Notes</p>
              <p className="whitespace-pre-wrap">{notes}</p>
           </div>
        </div>
      </div>
    </div>
  )
}
