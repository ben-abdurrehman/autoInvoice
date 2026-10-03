'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveWorkspaceSettings(formData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const name = formData.get('name')
  const currency = formData.get('currency')

  // Check if workspace exists for this user
  const { data: existingWorkspace } = await supabase
    .from('workspaces')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (existingWorkspace) {
    // Update existing
    const { error: updateError } = await supabase
      .from('workspaces')
      .update({ name, currency })
      .eq('id', existingWorkspace.id)
      
    if (updateError) throw new Error('Update failed: ' + updateError.message)
  } else {
    // Create new workspace
    const { error: insertError } = await supabase
      .from('workspaces')
      .insert({ user_id: user.id, name, currency })
      
    if (insertError) throw new Error('Insert failed: ' + insertError.message)
  }

  // Revalidate the dashboard so the sidebar and other components see the update
  revalidatePath('/dashboard', 'layout')
  
  return { success: true }
}
