"use client";

import { useRouter } from 'next/navigation';
import { FaPlus } from "react-icons/fa6";

export default function NewInvoicePage() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/create');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center  overflow-hidden py-32 text-center space-y-6">
      <h1 className="text-3xl font-bold text-white">Ready to create your first invoice?</h1>
      <p className="text-gray-300">Click the button below to start building your invoice using our clean template.</p>
      <button
        onClick={handleStart}
        className="flex items-center gap-2 px-4 py-3 bg-green-400 text-white rounded-md text-lg border border-transparent hover:bg-transparent hover:border-green-500 transition duration-300 shadow-lg hover:shadow-xl cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaPlus /> 
        <span>
          Create New Invoice
        </span>
      </button>
    </div>
  );
}
