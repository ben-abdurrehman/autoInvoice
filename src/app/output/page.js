"use client";

import { useFormData } from '@/components/shared/FormContextProvider';
import ClassicInvoice from '@/components/forms/ClassicInvoice';
import { exportToPdf, exportToImage } from '@/lib/export';
import { useRef } from 'react';

export default function OutputPage() {
  const { formData } = useFormData();
  const invoiceRef = useRef();

  return (
    <main className='w-full py-40'>
        <div className="lg:w-3xl 2xl:w-4xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center">Preview Your Invoice</h1>

        <div ref={invoiceRef} className="bg-[#ffffff] p-6 shadow rounded">
            <ClassicInvoice data={formData} />
        </div>

        <div className="flex justify-center gap-4 pt-6">
            <button onClick={() => exportToPdf(invoiceRef.current)} className="bg-[#00A63E] text-[#ffffff] px-4 py-2 rounded cursor-pointer">
            Export PDF
            </button>
            <button onClick={() => exportToImage(invoiceRef.current, 'png')} className="bg-[#00A63E] text-[#ffffff] px-4 py-2 rounded cursor-pointer">
            Export PNG
            </button>
            <button onClick={() => exportToImage(invoiceRef.current, 'jpeg')} className="bg-[#00A63E] text-[#ffffff] px-4 py-2 rounded cursor-pointer">
            Export JPG
            </button>
        </div>
        </div>
    </main>
  );
}
