'use client';

const AnimatedButton = ({ text, a = <></>}) => {
  return (
    <button className="cursor-pointer bg-[#211951] shadow-[0_4px_4px_#00000040]  py-1 px-4 lg:py-2 lg:px-6 rounded-lg md:text-[13px] xl:text-sm 2xl:text-base text-white mt-4 md:mt-0 overflow-hidden group">
      <span className="flex flex-col items-center justify-center relative h-[20px]">
        <span
          className="block transition-transform duration-400 group-hover:translate-y-[100%]"
        >
          {text}
        </span>
        <span
          className="block absolute left-0 top-0 transition-transform duration-400 translate-y-[-120%] group-hover:translate-y-0"
        >
          {a ?  <a href="#contact">{text}</a> : {text}}
        </span>
      </span>
    </button>
  );
};

export default AnimatedButton;
