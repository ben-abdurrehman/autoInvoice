"use client";

import { useFormData } from '@/components/web-app/shared/FormContextProvider';
import ClassicInvoice from '@/components/web-app/forms/ClassicInvoice';
import { exportToPdf, exportToImage } from '@/lib/export';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OutputPage() {
  const { formData } = useFormData();
  const invoiceRef = useRef();
  const router = useRouter();

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!formData || Object.keys(formData).length === 0 || !formData.items || formData.items.length === 0) {
      router.replace('/invoice');
    } else {
      setIsValid(true);
    }
  }, [formData, router]);

  if (!isValid) return null; // ✅ prevent rendering until formData is confirmed

  return (
    <main className='w-full h-full bg-slate-950 overflow-auto rounded-lg py-10'>
      <div className="lg:w-xl 2xl:w-2xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl text-white font-bold text-center">Preview Your Invoice</h1>

        <div ref={invoiceRef} className="bg-[#ffffff] p-6 shadow rounded">
          <ClassicInvoice data={formData} />
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <button onClick={() => exportToPdf(invoiceRef.current)} className="cursor-pointer  bg-green-400 text-white text-lg border border-transparent hover:bg-transparent hover:border-green-500 transition duration-300 shadow-lg hover:shadow-xl active:scale-95 py-2 rounded px-4">
            Export PDF
          </button>
          <button onClick={() => exportToImage(invoiceRef.current, 'png')} className="cursor-pointer  bg-green-400 text-white text-lg border border-transparent hover:bg-transparent hover:border-green-500 transition duration-300 shadow-lg hover:shadow-xl active:scale-95 py-2 rounded px-4">
            Export PNG
          </button>
          <button onClick={() => exportToImage(invoiceRef.current, 'jpeg')} className="cursor-pointer  bg-green-400 text-white text-lg border border-transparent hover:bg-transparent hover:border-green-500 transition duration-300 shadow-lg hover:shadow-xl active:scale-95 py-2 rounded px-4">
            Export JPG
          </button>
        </div>
      </div>
    </main>
  );
}
