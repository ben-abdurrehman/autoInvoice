'use client'

import { useRef, useState } from 'react'
import QRCode from 'react-qr-code'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { FiDownload, FiShare2, FiCopy, FiCheck, FiImage } from 'react-icons/fi'

export default function InvoiceShareView({ invoice, items, client, workspace, shareUrl }) {
  const invoiceRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [showQR, setShowQR] = useState(false)

  const template = invoice.template || 'modern'

  const subtotal = items.reduce((sum, item) => sum + Number(item.total), 0)
  const taxAmount = subtotal * (Number(invoice.tax_rate) / 100)
  const total = Number(invoice.total)

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  const exportPDF = async () => {
    if (!invoiceRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save(`${invoice.invoice_number}.pdf`)
    } catch (err) {
      console.error(err)
    }
    setExporting(false)
  }

  const exportImage = async (format) => {
    if (!invoiceRef.current) return
    setExporting(true)
    try {
      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff'
      })
      const mimeType = format === 'webp' ? 'image/webp' : 'image/png'
      const ext = format === 'webp' ? 'webp' : 'png'
      const link = document.createElement('a')
      link.download = `${invoice.invoice_number}.${ext}`
      link.href = canvas.toDataURL(mimeType, 0.95)
      link.click()
    } catch (err) {
      console.error(err)
    }
    setExporting(false)
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">AI</div>
            <div>
              <h1 className="font-semibold text-slate-900 text-sm">{invoice.invoice_number}</h1>
              <p className="text-xs text-slate-500">by {workspace?.name || 'AutoInvoice'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            <button
              onClick={copyLink}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-200"
            >
              {copied ? <><FiCheck className="text-emerald-600" /> Copied!</> : <><FiCopy /> Copy Link</>}
            </button>
            <button
              onClick={() => setShowQR(!showQR)}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-200"
            >
              <FiShare2 /> QR Code
            </button>
            <button
              onClick={() => exportImage('png')}
              disabled={exporting}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-200"
            >
              <FiImage /> PNG
            </button>
            <button
              onClick={() => exportImage('webp')}
              disabled={exporting}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-sm font-medium text-slate-700 transition-colors border border-slate-200"
            >
              <FiImage /> WebP
            </button>
            <button
              onClick={exportPDF}
              disabled={exporting}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium text-white transition-colors shadow-sm"
            >
              {exporting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><FiDownload /> PDF</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Overlay */}
      {showQR && (
        <div className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
          <div className="bg-white rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-slate-900">Scan to View Invoice</h3>
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-inner">
              <QRCode value={shareUrl} size={200} />
            </div>
            <p className="text-sm text-slate-500 text-center">Anyone who scans this QR code will see this invoice live on the web.</p>
            <button
              onClick={() => setShowQR(false)}
              className="mt-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Invoice Document */}
      <div className="max-w-[21cm] mx-auto py-12 px-4">
        <div ref={invoiceRef} className={`bg-white shadow-2xl rounded-sm w-full min-h-[29.7cm] p-16 flex flex-col ${template === 'classic' ? 'font-serif' : 'font-sans'}`}>
          {/* Header */}
          <div className={`flex justify-between items-start mb-16 ${template === 'minimal' ? 'flex-col gap-8' : ''}`}>
            <div>
              <h1 className={`text-5xl font-black tracking-tight mb-2 ${template === 'modern' ? 'text-blue-600' : 'text-slate-900'}`}>INVOICE</h1>
              <p className="text-slate-500 font-semibold text-lg"># {invoice.invoice_number}</p>
            </div>
            <div className={`${template === 'minimal' ? 'text-left' : 'text-right'}`}>
              <h3 className="font-bold text-slate-900 text-2xl mb-1">{workspace?.name || 'Your Company'}</h3>
            </div>
          </div>

          {/* Info Row */}
          <div className="flex justify-between mb-14">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-3">Billed To</p>
              <h4 className="font-bold text-slate-900 text-xl">{client?.name || 'N/A'}</h4>
              {client?.email && <p className="text-slate-600 mt-1">{client.email}</p>}
              {client?.phone && <p className="text-slate-600">{client.phone}</p>}
              {client?.address && <p className="text-slate-500 mt-1 max-w-xs whitespace-pre-wrap">{client.address}</p>}
            </div>
            <div className="text-right flex flex-col gap-5">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Issue Date</p>
                <p className="font-semibold text-slate-900">{new Date(invoice.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Due Date</p>
                <p className="font-semibold text-slate-900">{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.15em] mb-1">Status</p>
                <p className="font-bold text-blue-600 uppercase">{invoice.status}</p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b-2 ${template === 'modern' ? 'border-blue-200 bg-blue-50/50' : 'border-slate-900'}`}>
                  <th className="py-4 px-3 font-bold text-sm uppercase text-slate-800 w-1/2">Description</th>
                  <th className="py-4 px-3 font-bold text-sm uppercase text-slate-800 text-center">Qty</th>
                  <th className="py-4 px-3 font-bold text-sm uppercase text-slate-800 text-right">Price</th>
                  <th className="py-4 px-3 font-bold text-sm uppercase text-slate-800 text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100">
                    <td className="py-5 px-3 font-medium text-slate-800">{item.description}</td>
                    <td className="py-5 px-3 text-center text-slate-600">{Number(item.quantity)}</td>
                    <td className="py-5 px-3 text-right text-slate-600">${Number(item.unit_price).toFixed(2)}</td>
                    <td className="py-5 px-3 text-right font-semibold text-slate-900">${Number(item.total).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mt-10 mb-12">
            <div className="w-80 space-y-3">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Tax ({Number(invoice.tax_rate)}%)</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between items-center pt-4 border-t-2 mt-4 ${template === 'modern' ? 'border-blue-200' : 'border-slate-900'}`}>
                <span className="font-bold text-slate-900 text-lg">Total Due</span>
                <span className={`text-3xl font-black ${template === 'modern' ? 'text-blue-600' : 'text-slate-900'}`}>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {invoice.notes && (
            <div className="mt-auto pt-8 border-t border-slate-200">
              <p className="font-bold text-slate-700 mb-2 text-sm uppercase tracking-wider">Notes</p>
              <p className="text-slate-500 whitespace-pre-wrap">{invoice.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
