import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import InvoiceShareView from '@/components/InvoiceShareView'

export async function generateMetadata({ params }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: invoice } = await supabase
    .from('invoices')
    .select('invoice_number')
    .eq('id', id)
    .single()

  return {
    title: invoice ? `${invoice.invoice_number} - AutoInvoice` : 'Invoice Not Found',
  }
}

export default async function SharePage({ params }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch the invoice (we use the service role implicitly here since this is a public share page)
  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !invoice) {
    notFound()
  }

  // Fetch the associated line items
  const { data: items } = await supabase
    .from('invoice_items')
    .select('*')
    .eq('invoice_id', invoice.id)

  // Fetch the client
  const { data: client } = await supabase
    .from('clients')
    .select('*')
    .eq('id', invoice.client_id)
    .single()

  // Fetch the workspace (company info)
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('id', invoice.workspace_id)
    .single()

  // Build the share URL dynamically
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const host = process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000'
  const shareUrl = `${protocol}://${host}/share/${id}`

  return (
    <InvoiceShareView
      invoice={invoice}
      items={items || []}
      client={client}
      workspace={workspace}
      shareUrl={shareUrl}
    />
  )
}
