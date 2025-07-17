"use client"
import React, { useState } from 'react';
import LayoutWrapper from './layout/wrapper';
import HowItWorksCard from './howitworksCard';


interface HowItWorksProps {
  data: any[];
  isNested?: boolean;
}

const HowItWorks = ({ data, isNested }: HowItWorksProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className={`${isNested ? 'mt-20' : 'mt-80'} mb-4`}>
      <LayoutWrapper>
        {/* Main Title */}
        {!isNested && (
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold">
              <span className="text-teal-500">Connecting</span>
              <span className="text-gray-700"> You To</span>
            </h1>
            <h2 className="text-4xl text-gray-700 font-bold mt-2">Health Services</h2>
          </div>
        )}
        <div>
          <h1 className='text-4xl font-bold text-center'>How it works</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-8 gap-4'>
            {data?.slice(0,4).map((item, index) => (
              <div
                key={item._id ?? index}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <HowItWorksCard
                  icon={item.icon}
                  title={item.title}
                  text={item.description}
                />
              </div>
            ))}
          </div>
        </div>
        <div className='border-t-2 border-[#DCDCDC] mt-10'></div>
      </LayoutWrapper>
    </section>
  );
};

export default HowItWorks;