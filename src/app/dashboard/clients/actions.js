'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addClient(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  // Get workspace
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!workspace) throw new Error('Please configure your workspace settings first')

  const name = formData.get('name')
  const email = formData.get('email')
  const phone = formData.get('phone')
  const address = formData.get('address')

  const { error } = await supabase
    .from('clients')
    .insert({
      workspace_id: workspace.id,
      name,
      email,
      phone,
      address
    })

  if (error) {
    console.error(error)
    throw new Error('Failed to add client: ' + error.message)
  }

  revalidatePath('/dashboard/clients')
  redirect('/dashboard/clients')
}
