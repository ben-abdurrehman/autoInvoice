'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createInvoice(payload) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Not authenticated')

  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!workspace) throw new Error('Please setup your workspace first.')

  // Generate a professional invoice number (e.g., INV-2026-4091)
  const invoice_number = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`

  // Insert the main Invoice record
  const { data: invoice, error: invoiceError } = await supabase
    .from('invoices')
    .insert({
      workspace_id: workspace.id,
      client_id: payload.client_id,
      invoice_number,
      issue_date: payload.issue_date,
      due_date: payload.due_date,
      subtotal: payload.subtotal,
      tax_rate: payload.tax_rate,
      total: payload.total,
      notes: payload.notes,
      template: payload.template,
      status: 'sent'
    })
    .select('id')
    .single()

  if (invoiceError) throw new Error('Failed to create invoice: ' + invoiceError.message)

  // Format and insert the line items
  const itemsToInsert = payload.items.map(item => ({
    invoice_id: invoice.id,
    description: item.description,
    quantity: item.quantity,
    unit_price: item.unit_price,
    total: item.quantity * item.unit_price
  }))

  const { error: itemsError } = await supabase
    .from('invoice_items')
    .insert(itemsToInsert)

  if (itemsError) throw new Error('Failed to add invoice items: ' + itemsError.message)

  revalidatePath('/dashboard')
  
  // Return the invoice ID so the frontend can redirect to the share page
  return invoice.id
}
