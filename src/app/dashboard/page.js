import { FiTrendingUp, FiClock, FiCheckCircle, FiMoreHorizontal } from 'react-icons/fi'

export default function DashboardPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">$12,450.00</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <FiTrendingUp className="text-2xl" />
            </div>
          </div>
          <p className="text-sm text-emerald-600 font-medium flex items-center gap-1">
             +14% <span className="text-slate-500 font-normal">from last month</span>
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Outstanding</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">$3,200.00</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-500">
              <FiClock className="text-2xl" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">
             3 invoices pending
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-shadow hover:shadow-md">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Paid Invoices</p>
              <h3 className="text-3xl font-bold text-slate-900 mt-1">42</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
              <FiCheckCircle className="text-2xl" />
            </div>
          </div>
          <p className="text-sm text-slate-500 font-medium">
             In the last 30 days
          </p>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h2 className="font-semibold text-slate-800 text-lg">Recent Invoices</h2>
          <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-white border-b border-slate-100">
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
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 font-semibold text-slate-900">INV-2026-001</td>
                <td className="px-6 py-4 text-slate-600 font-medium">Acme Corp</td>
                <td className="px-6 py-4 text-slate-500">Oct 03, 2026</td>
                <td className="px-6 py-4 text-slate-900 font-semibold">$1,200.00</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-200">Paid</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1"><FiMoreHorizontal className="text-lg" /></button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 font-semibold text-slate-900">INV-2026-002</td>
                <td className="px-6 py-4 text-slate-600 font-medium">Globex Inc</td>
                <td className="px-6 py-4 text-slate-500">Oct 01, 2026</td>
                <td className="px-6 py-4 text-slate-900 font-semibold">$3,450.00</td>
                <td className="px-6 py-4">
                  <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold border border-amber-200">Pending</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1"><FiMoreHorizontal className="text-lg" /></button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-6 py-4 font-semibold text-slate-900">INV-2026-003</td>
                <td className="px-6 py-4 text-slate-600 font-medium">Initech LLC</td>
                <td className="px-6 py-4 text-slate-500">Sep 28, 2026</td>
                <td className="px-6 py-4 text-slate-900 font-semibold">$850.00</td>
                <td className="px-6 py-4">
                  <span className="bg-rose-100 text-rose-700 px-3 py-1 rounded-full text-xs font-semibold border border-rose-200">Overdue</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-400 hover:text-blue-600 transition-colors p-1"><FiMoreHorizontal className="text-lg" /></button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
