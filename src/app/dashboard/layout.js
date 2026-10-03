import Link from 'next/link'
import { FiHome, FiFileText, FiUsers, FiSettings, FiLogOut } from 'react-icons/fi'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              AI
            </div>
            <span className="font-semibold text-slate-900 tracking-tight">AutoInvoice</span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1.5 px-3">
            <li>
              <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2.5 text-blue-600 bg-blue-50 rounded-lg text-sm font-medium">
                <FiHome className="text-lg" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/dashboard/invoices" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                <FiFileText className="text-lg" />
                Invoices
              </Link>
            </li>
            <li>
              <Link href="/dashboard/clients" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                <FiUsers className="text-lg" />
                Clients
              </Link>
            </li>
            <li>
              <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors">
                <FiSettings className="text-lg" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center text-slate-600 font-semibold text-xs shrink-0">
              {user.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-slate-900 truncate">{user.email}</p>
            </div>
          </div>
          <form action="/auth/signout" method="post">
            <button type="submit" className="flex items-center justify-center gap-2 w-full px-2 py-2.5 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors border border-slate-200 hover:border-red-100">
              <FiLogOut />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 justify-between shrink-0">
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Overview</h1>
          <div>
            <Link href="/dashboard/invoices/new" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
              <span className="text-lg leading-none">+</span> New Invoice
            </Link>
          </div>
        </header>
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
