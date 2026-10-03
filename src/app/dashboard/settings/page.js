import { createClient } from '@/utils/supabase/server'
import SettingsForm from '@/components/SettingsForm'

export const metadata = {
  title: 'Settings - AutoInvoice',
}

export default async function SettingsPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch existing workspace for this user
  const { data: workspace } = await supabase
    .from('workspaces')
    .select('*')
    .eq('user_id', user.id)
    .single()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500">Manage your workspace configuration and preferences.</p>
      </div>
      
      <SettingsForm initialData={workspace} />
    </div>
  )
}
