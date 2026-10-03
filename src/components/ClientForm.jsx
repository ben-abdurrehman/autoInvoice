'use client'

import { useTransition } from 'react'
import { addClient } from '@/app/dashboard/clients/actions'
import { FiSave } from 'react-icons/fi'

export default function ClientForm() {
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData) {
    startTransition(async () => {
      await addClient(formData)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">Client Name / Company</label>
          <input type="text" id="name" name="name" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors" placeholder="e.g. Acme Corp" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
          <input type="email" id="email" name="email" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors" placeholder="contact@acme.com" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
          <input type="tel" id="phone" name="phone" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors" placeholder="+1 (555) 000-0000" />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block text-sm font-semibold text-slate-700 mb-1.5">Billing Address</label>
          <textarea id="address" name="address" rows="3" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors resize-none" placeholder="123 Business Rd..." />
        </div>
      </div>

      <div className="pt-6 flex items-center justify-end border-t border-slate-100 mt-8">
        <button type="submit" disabled={isPending} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm active:scale-95">
          {isPending ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FiSave className="text-lg" /> Save Client</>}
        </button>
      </div>
    </form>
  )
}
