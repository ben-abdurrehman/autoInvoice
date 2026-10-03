import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px] pointer-events-none" />

      <header className="px-8 py-6 flex justify-between items-center relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">AI</div>
          <span className="font-semibold text-slate-900 text-xl tracking-tight">AutoInvoice</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors">Sign in</Link>
          <Link href="/signup" className="px-5 py-2.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-medium shadow-sm transition-colors text-sm">
            Get Started
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center px-4 max-w-5xl mx-auto mt-[-10vh] relative z-10">
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          Introducing AutoInvoice 2.0
        </div>
        
        <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
          Get paid faster with <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">smart invoicing.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl leading-relaxed">
          Create, send, and track professional invoices in seconds. Stop chasing payments and focus on what you do best.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Link href="/signup" className="flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-semibold shadow-lg shadow-blue-600/20 transition-all active:scale-95 text-base w-full sm:w-auto justify-center">
            Start for free <FiArrowRight className="text-lg" />
          </Link>
          <Link href="/login" className="flex items-center gap-2 px-8 py-4 bg-white text-slate-700 rounded-xl hover:bg-slate-50 font-semibold shadow-sm border border-slate-200 transition-all active:scale-95 text-base w-full sm:w-auto justify-center">
            View dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
