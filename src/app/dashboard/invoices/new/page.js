import InvoiceBuilder from '@/components/InvoiceBuilder'
import { createClient } from '@/utils/supabase/server'

export default async function NewInvoicePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('user_id', user.id)
    .single()

  // Fetch clients to populate the dropdown
  let clients = []
  if (workspace) {
    const { data } = await supabase
      .from('clients')
      .select('*')
      .eq('workspace_id', workspace.id)
      .order('name', { ascending: true })
    clients = data || []
  }

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Invoice</h1>
        <p className="text-slate-500">Design your invoice and send it to your client.</p>
      </div>
      
      <InvoiceBuilder clients={clients} workspace={workspace} />
    </div>
  )
}
