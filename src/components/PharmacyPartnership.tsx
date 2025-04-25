import React from 'react';
import ButtonTheme from './shared/ButtonTheme';
import Image from 'next/image';
import Wrapper from './layout/wrapper';

const PharmacyPartnership: React.FC = () => {
  return (
    <div  className='bg-[#189BA3]'>
   <Wrapper>
    
    <div className="text-white">
      <div className="flex flex-col py-24 md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-5xl font-bold mb-4">Grow your pharmacy.</h2>
          <h2 className="text-5xl font-bold mb-4">Reach more patients.</h2>
          <h2 className="text-5xl font-bold mb-6">Deliver trusted care.</h2>
          
          <p className="mb-8 text-md  text-white font-robot max-w-[550px]">
            We're looking for trusted pharmacies across the UK to join our growing network.
            List your services, manage bookings with ease, and help patients access
            essential care - both NHS and private.
          </p>
          
          <ButtonTheme 
            bgColor="bg-[#52525B]" 
            textColor="text-white"
            paddingX="px-6"
            paddingY="py-3"
            className="rounded-[24px]"

          >
            Sign Up As Partner
          </ButtonTheme>
        </div>
        
        <div className="md:w-1/2">
          <div className="rounded-lg overflow-hidden">
            <Image
                src="/images/partner-banner.png" 
                alt="Pharmacist working in a modern pharmacy" 
              className="w-full h-auto object-cover rounded-lg"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </div>
    
    </Wrapper>
    </div>
  );
};

export default PharmacyPartnership; 