import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { FiPlus, FiMoreHorizontal, FiExternalLink } from 'react-icons/fi'

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  let invoices = []
  if (workspace) {
    const { data } = await supabase
      .from('invoices')
      .select('*, clients(name)')
      .eq('workspace_id', workspace.id)
      .order('created_at', { ascending: false })
    invoices = data || []
  }

  const statusColors = {
    draft: 'bg-slate-100 text-slate-700 border-slate-200',
    sent: 'bg-blue-100 text-blue-700 border-blue-200',
    paid: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    overdue: 'bg-rose-100 text-rose-700 border-rose-200',
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Invoices</h1>
          <p className="text-slate-500">Create, manage and track your invoices.</p>
        </div>
        <Link href="/dashboard/invoices/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <FiPlus className="text-lg" /> New Invoice
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {invoices.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-slate-400">📄</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No invoices yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm">Create your first invoice and start getting paid.</p>
            <Link href="/dashboard/invoices/new" className="text-blue-600 font-semibold hover:underline">
              Create your first invoice
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Invoice No.</th>
                  <th className="px-6 py-4 font-semibold">Client</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map(invoice => (
                  <tr key={invoice.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-900">{invoice.invoice_number}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{invoice.clients?.name || '-'}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(invoice.issue_date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-slate-900 font-semibold">${Number(invoice.total).toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border capitalize ${statusColors[invoice.status] || statusColors.draft}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link href={`/share/${invoice.id}`} className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-xs transition-colors">
                        <FiExternalLink /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
