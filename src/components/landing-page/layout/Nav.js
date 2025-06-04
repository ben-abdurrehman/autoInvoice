import Link from 'next/link';

import AnimatedButton from '@/components/landing-page/ui/AnimatedButton';

const Nav = ({ mobileClose }) => {
  return (
    <nav className="font-roboto flex flex-col items-start p-10 md:flex-row md:items-center bg-white md:p-[6px] lg:space-x-4 xl:space-x-6 rounded-2xl md:shadow-[0_4px_4px_#00000040] shadow-none md:relative z-50">
      <div className="flex flex-col md:px-5 md:text-xs md:text-[13px] xl:text-sm xl:px-3 md:flex-row items-center sm:space-x-3 lg:space-x-5 xl:space-x-10">
        {["Home", "About", "Services", "Projects", "Contact"].map((item) => (
          <Link
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-gray-600 hover:text-blue-600 py-2 md:py-0 transition-colors"
            onClick={mobileClose}
          >
            {item}
          </Link>
        ))}
      </div>
      <AnimatedButton text="Lets Talk" a =  {<a href="#contact">Lets Talk</a>} />
    </nav>
  );
};

export default  Nav;



