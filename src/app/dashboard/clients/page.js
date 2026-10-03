import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { FiPlus, FiMoreHorizontal } from 'react-icons/fi'

export default async function ClientsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Get workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  let clients = []
  if (workspace) {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('workspace_id', workspace.id)
      .order('created_at', { ascending: false })
    clients = data || []
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Clients</h1>
          <p className="text-slate-500">Manage your address book.</p>
        </div>
        <Link href="/dashboard/clients/new" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm">
          <FiPlus className="text-lg" /> Add Client
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {clients.length === 0 ? (
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-slate-400">👋</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">No clients yet</h3>
            <p className="text-slate-500 mb-6 max-w-sm">Add your first client to start generating invoices faster.</p>
            <Link href="/dashboard/clients/new" className="text-blue-600 font-semibold hover:underline">
              Create your first client
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Email</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">Added On</th>
                  <th className="px-6 py-4 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map(client => (
                  <tr key={client.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 font-semibold text-slate-900">{client.name}</td>
                    <td className="px-6 py-4 text-slate-600">{client.email || '-'}</td>
                    <td className="px-6 py-4 text-slate-600">{client.phone || '-'}</td>
                    <td className="px-6 py-4 text-slate-500">{new Date(client.created_at).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-blue-600 transition-colors p-1"><FiMoreHorizontal className="text-lg" /></button>
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
