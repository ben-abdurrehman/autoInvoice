"use client";

import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/landing-page/ui/TemplateCard';
import Invoice1 from '@/assets/InvoicesTemplates/Invoice1.png';
import Invoice2 from '@/assets/InvoicesTemplates/Invoice2.png';
import Invoice3 from '@/assets/InvoicesTemplates/Invoice3.png';
import Invoice4 from '@/assets/InvoicesTemplates/Invoice4.png';
import Invoice5 from '@/assets/InvoicesTemplates/Invoice5.png';
import Invoice6 from '@/assets/InvoicesTemplates/Invoice6.png';




const templates = [
  {
    id: 'recommended',
    name: 'Recommended Invoice',
    image: Invoice1,
  },
  {
    id: 'basic',
    name: 'Basic Invoice',
    image: Invoice2,
  },
  {
    id: 'modren',
    name: 'Modern Invoice',
    image: Invoice3,
  },
    {
    id: 'digital',
    name: 'Digital Invoice',
    image: Invoice4,
  },
  {
    id: 'modern',
    name: 'Modern Invoice',
    image: Invoice5,
  },
  {
    id: 'classic',
    name: 'Classic Invoice',
    image: Invoice6,
  },
];




;

export default function Page() {
  const router = useRouter();

  const handleSelectTemplate = (templateId) => {
    router.push(`/create-invoice/${templateId}`);
  };

  return (
    <main className='w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white'>
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