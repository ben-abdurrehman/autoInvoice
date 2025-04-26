import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { featuresImages, featuresDetails } from '@/data/objects/Features';
import { AnimatePresence, motion } from 'framer-motion';

export default function FeatureAccordionSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="w-full h-[80vh]  px-4 py-12 bg-gradient-to-bl from-black via-gray-800 to-gray-900 text-white">
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
        <p className="text-center text-lg mb-20">Everything you need. Nothing you don’t.</p>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Left Column - Accordions */}
        <div className="md:w-[45%] flex flex-col gap-4">
          {featuresDetails.map((feature, index) => {
            const isActive = index === activeIndex;
            return (
              <div key={index} className="w-full">
                <button
                  onClick={() => setActiveIndex(index)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border shadow transition-all
                    ${isActive ? 'bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition text-white' : 'dark:bg-gray-800 dark:border-gray-700 text-white hover:bg-gradient-to-r from-pink-500 to-red-500 hover:opacity-90 transition'}`}
                >
                  <span className="text-lg font-semibold">{feature.title}</span>
                  {isActive ? <FiMinus className="w-5 h-5" /> : <FiPlus className="w-5 h-5" />}
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ opacity: 0.3, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: 'easeIn' }}
                      className="overflow-hidden px-4 py-2 text-sm text-white"
                    >
                      {feature.description}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Right Column - Image Display */}
        <div className="md:w-[45%] flex items-center justify-center rounded-xl overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full object-cover h-auto p-4"
            >
              {featuresImages[activeIndex].image}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
