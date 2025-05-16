import Image from 'next/image';


const TemplateCard = ({ id, name, image, onSelect }) => (
  <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col items-center">
    <Image src={image} alt={name} width={300} height={200} className="rounded mb-4 object-cover" />
    <h3 className="font-semibold text-lg mb-2">{name}</h3>
    <button
      onClick={() => onSelect(id)}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      Use Template
    </button>
  </div>
);

export default TemplateCard;