import ClientForm from '@/components/ClientForm'

export default function NewClientPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Client</h1>
        <p className="text-slate-500">Create a new client profile for your address book.</p>
      </div>
      <ClientForm />
    </div>
  )
}
