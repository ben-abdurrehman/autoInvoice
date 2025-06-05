"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import autoInvoiceLogo from "@/assets/all-variations/4-removedbg-Croped.png";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";
import { RiDashboardFill } from "react-icons/ri";
import Image from 'next/image';
import clsx from 'clsx';
import CONSTANTS from '@/constants';

const links = [
  { href: CONSTANTS.DASHBOARD, label: 'Dashboard', icon: <RiDashboardFill className="inline-block mr-2" /> },
  { href: CONSTANTS.INVOICE, label: 'Invoices', icon: <FaFileInvoiceDollar className="inline-block mr-2" /> },
  { href: CONSTANTS.SETTINGS, label: 'Settings', icon: <IoSettings className="inline-block mr-2" /> },
];

export default function AppLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className='flex h-screen overflow-auto'>
      {/* Sidebar */}
      <aside className="w-60 h-[100vh] bg-slate-900 p-3 space-y-6">
        <div className='w-full h-full flex flex-col gap-10 bg-slate-950 p-3 py-4 rounded-lg'>
          <Link href={CONSTANTS.HOME}>
            <Image
              src={autoInvoiceLogo}
              alt="logo"
              priority
              className="z-50 w-32 object-cover transition-all duration-300"
            />
          </Link>
          
          <nav className="space-y-2">
            {links.map((link) => (

              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'flex items-center justify-start px-4 py-2 rounded hover:border hover:border-green-400 text-green-400',
                  (pathname === link.href) ? 'border border-green-400 font-semibold' : 'border border-transparent'
                )}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-[calc(100%-200px)] flex items-center p-3 bg-slate-900 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
