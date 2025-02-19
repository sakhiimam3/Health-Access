import React from 'react';
import Image from 'next/image';
import HowItWorksImage from '../../public/images/howitworks.png';
import LayoutWrapper from './layout/wrapper';

const HowItWorks = () => {
  return (
    <section className='mt-80 mb-4'> 
        <LayoutWrapper>
       
      {/* Main Title */}
      <div className="text-center mb-20">
        <h1 className="text-5xl font-bold">
          <span className="text-teal-500">Connecting</span>
          <span className="text-gray-700"> You To</span>
        </h1>
        <h2 className="text-4xl text-gray-700 font-bold mt-2">Health Services</h2>
      </div>

      {/* Content Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
        {/* Image Section */}
        <div className='w-full flex  items-start h-[100%] '>
          <Image
            src={HowItWorksImage}
            alt="how it works"
            // layout='responsive'
            height={500}
            width={500}
            
            // objectFit='cover'
            // objectPosition='top'
            // priority
          />
        </div>

        <div className="relative flex flex-col justify-start">
          <h3 className="text-4xl font-[700] text-gray-800 mb-8">How It Works</h3>
          
          <div className="space-y-5 relative">
            <div className="pl-8 relative">
              <div className="absolute left-0 top-2 bottom-0 w-0.5 h-16 bg-[#189BA3]"></div>
              <h4 className="text-xl font-semibold  mb-1">Search for Services</h4>
              <p className="font-roboto text-sm text-[#52525B]">Enter your postcode and the service you need, such as vaccinations, health checks, or consultations.</p>
            </div>

            <div className="pl-8">
              <h4 className="text-xl font-[700] mb-1">Compare Pharmacies</h4>
              <p className="font-roboto text-sm text-[#52525B]">Browse nearby pharmacies compare prices, check availability, and read reviews to make an informed decision.</p>
            </div>

            <div className="pl-8">
              <h4 className="text-xl font-[700] mb-1">Book Online</h4>
              <p className="font-roboto text-sm text-[#52525B]">Select your preferred pharmacy and schedule your appointment through our secure online booking system.</p>
            </div>

           
            <div className="pl-8">
              <h4 className="text-xl font-[700] mb-1">Receive Confirmation</h4>
              <p className="font-roboto text-sm">Your chosen pharmacy will receive a notification of your booking, and you&apos;ll get a confirmation email or SMS with all the details.</p>
            </div>
          </div>
        </div>
      </div>
       <div className='border-t-2 border-gray-200 mt-10'></div>
        </LayoutWrapper>
    </section>
 
  );
};

export default HowItWorks;