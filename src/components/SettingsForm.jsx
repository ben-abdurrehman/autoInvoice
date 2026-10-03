'use client'

import { useTransition, useState } from 'react'
import { saveWorkspaceSettings } from '@/app/dashboard/settings/actions'
import { FiSave, FiCheck } from 'react-icons/fi'

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
]

export default function SettingsForm({ initialData }) {
  const [isPending, startTransition] = useTransition()
  const [saved, setSaved] = useState(false)

  async function handleSubmit(formData) {
    startTransition(async () => {
      await saveWorkspaceSettings(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    })
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Workspace Settings</h2>
        <p className="text-sm text-slate-500 mt-1">Manage your business profile and defaults.</p>
      </div>

      <div className="space-y-5 pt-4 border-t border-slate-100">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Business Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={initialData?.name || ''}
            required
            placeholder="e.g. Acme Corporation"
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors"
          />
        </div>

        <div>
          <label htmlFor="currency" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Default Currency
          </label>
          <div className="relative">
            <select
              id="currency"
              name="currency"
              defaultValue={initialData?.currency || 'USD'}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-colors appearance-none cursor-pointer pr-10"
            >
              {CURRENCIES.map(c => (
                <option key={c.code} value={c.code}>
                  {c.code} - {c.name} ({c.symbol})
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6 flex items-center justify-end border-t border-slate-100 mt-8">
        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-sm active:scale-95"
        >
          {isPending ? (
             <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
             <><FiCheck className="text-lg" /> Saved</>
          ) : (
             <><FiSave className="text-lg" /> Save Settings</>
          )}
        </button>
      </div>
    </form>
  )
}
