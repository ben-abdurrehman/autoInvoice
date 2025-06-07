"use client";

import { useState, useEffect } from 'react';
import { useLocalStorage } from '@/components/web-app/shared/useLocalStorage';
import toast from 'react-hot-toast';
import Image from 'next/image';

const defaultSettings = {
  companyName: '',
  address: '',
  cityZip: '',
  taxId: '',
  email: '',
  phone: '',
  website: '',
  logo: ''
};

export default function SettingsPage() {
  const [companyInfo, setCompanyInfo] = useLocalStorage('companyInfo', defaultSettings);
  const [formData, setFormData] = useState(companyInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCompanyInfo(formData);
    toast.success('Settings saved');
  };

  const handleReset = () => {
    setCompanyInfo(defaultSettings);
    setFormData(defaultSettings);
    toast.success('Settings reset to defaults');
  };

  return (
    <main className="w-full bg-slate-950 h-full overflow-auto rounded-lg text-white p-6 space-y-6">
      <div className='w-lg lg:w-xl 2xl:w-2xl flex flex-col gap-10 mx-auto'>
        <h1 className="text-3xl font-bold">Business Settings</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input type="text" name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} className="w-full border p-2 rounded" />
            <textarea name="address" placeholder="Business Address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" rows={2} />
            <input type="text" name="cityZip" placeholder="City, Zip" value={formData.cityZip} onChange={handleChange} className="w-full border p-2 rounded" />
            <input type="text" name="taxId" placeholder="Tax ID (optional)" value={formData.taxId} onChange={handleChange} className="w-full border p-2 rounded" />

            <div className="grid grid-cols-2 gap-4">
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 rounded" />
            <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
            </div>

            <input type="text" name="website" placeholder="Website (optional)" value={formData.website} onChange={handleChange} className="w-full border p-2 rounded" />

            <div>
            <label className="block font-medium mb-1">Logo Upload</label>
            <input type="file" accept="image/*" onChange={handleLogoUpload} className="block" />
            {formData.logo && <Image src={formData.logo} alt="Logo Preview" className="mt-2 h-20 object-contain" />}
            </div>

            <div className="flex gap-4">
            <button type="submit" className="mt-4  bg-green-400  text-lg border border-transparent hover:bg-transparent hover:border-green-500 transition duration-300 shadow-lg hover:shadow-xl cursor-pointer active:scale-95 text-white px-4 py-2 rounded">
                Save Settings
            </button>
            <button type="button" onClick={handleReset} className="mt-4  bg-red-500 text-white  text-lg border border-transparent hover:bg-transparent hover:border-red-500 transition duration-300 shadow-lg hover:shadow-xl cursor-pointer active:scale-95 px-4 py-2 rounded">
                Reset to Defaults
            </button>
            </div>
        </form>
      </div>  
    </main>
  );
}
