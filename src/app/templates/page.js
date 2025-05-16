"use client";

import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/ui/TemplateCard';
import Invoice from '@/assets/InvoicesTemplates/Invoice1.png';




const templates = [
  {
    id: 'classic',
    name: 'Classic Invoice',
    image: Invoice,
  },
  {
    id: 'modern',
    name: 'Modern Invoice',
    image: Invoice,
  },
];




;

export default function Page() {
  const router = useRouter();

  const handleSelectTemplate = (templateId) => {
    router.push(`/create-invoice/${templateId}`);
  };

  return (
    <main className='w-full h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white'>
      <div className="max-w-6xl mx-auto pt-40 p-8">
      <h1 className="text-5xl font-bold mb-10 text-center">Choose a Template</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {templates.map((tpl) => (
          <TemplateCard
            key={tpl.id}
            id={tpl.id}
            name={tpl.name}
            image={tpl.image}
            onSelect={handleSelectTemplate}
          />
        ))}
      </div>
      </div>
    </main>
  );
}