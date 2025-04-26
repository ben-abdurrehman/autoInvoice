"use client";
import { events } from '@/data/objects/StoryTimline'

const StoryTimeline = () => {
  return (
    <section className="bg-gradient-to-br from-gray-900  via-gray-800 to-black py-8 text-white">
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
        <p className="text-center text-lg mb-20">The four steps guidelines</p>
      </div>
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative w-full flex flex-col items-center justify-center text-center mb-10">
          {events.map((event, index) => (
            <div
              key={index}
              className={`w-5/6 relative mb-10 ml-6 md:ml-0 md:flex md:justify-between md:items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
            >
              {/* Timeline Point */}
              <div className='absolute flex flex-col gap-2 item-center justify-center md:left-1/2 top-16 transform md:-translate-x-1/2 z-10'>
                <div className="relative w-4 h-4 bg-gradient-to-r from-pink-500 to-red-500 rounded-full z-10"></div>
                {index !== events.length - 1 && <hr className='relative mx-auto w-[2px] bg-white h-40' ></hr>}
              </div>
              {/* Content */}
              <div className="mt-4 md:w-[48%] md:mt-0 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
                <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{event.title}</h3>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoryTimeline;
