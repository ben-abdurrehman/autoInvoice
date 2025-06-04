"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const links = [
  { href: '/create', label: 'Invoices' },
  { href: '/settings', label: 'Settings' },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-60 bg-gray-100 p-6 space-y-6 border-r">
        <h1 className="text-xl font-bold text-blue-600">📄 MyInvoiceApp</h1>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                'block px-4 py-2 rounded hover:bg-blue-50',
                pathname.startsWith(link.href) && 'bg-blue-100 text-blue-700 font-semibold'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-white overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
