import React from 'react';
import Image from 'next/image';
import HowItWorksImage from '../../public/images/howitworks.png';
import LayoutWrapper from './layout/wrapper';
import { BookIcon, CompassIcon, Computer, GitCompareIcon, SearchIcon } from 'lucide-react';
import { ComputerIcon, VerifyIcon } from './icons/icons';
import HowItWorksCard from './howitworksCard';


const HowItWorks = () => {


  const svg=<svg width="42" height="44" viewBox="0 0 42 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.23405 35.7009L10.6767 26.0484L12.1455 27.5173L15.2931 24.3697C13.6144 21.8517 12.5653 18.9139 12.5653 15.5565C12.5653 8.42211 18.2309 2.127 25.3653 1.07778C35.2277 -0.181245 43.6211 8.42211 41.7326 18.4943C40.6834 24.3697 35.8572 28.9862 29.9817 30.0353C25.5751 30.8746 21.5882 29.6156 18.4407 27.3074L15.2931 30.455L16.7619 32.1337L7.31926 41.7862C5.64053 43.4649 2.91268 43.4649 1.44385 41.7862C-0.444679 39.8976 -0.444679 37.3795 1.23405 35.7009ZM27.2538 26.0483C33.1292 26.0483 37.7457 21.4319 37.7457 15.5564C37.7457 9.68093 33.1293 5.06465 27.2538 5.06465C21.3783 5.06465 16.7619 9.68103 16.7619 15.5565C16.7619 21.432 21.3784 26.0483 27.2538 26.0483Z" fill="white"/>
  </svg>
  

  const howItWorks = [
    {
      icon: <SearchIcon className="group-hover:text-white" />,
      title: "Search for Services",
      text: "Enter your postcode and the service you need, such as vaccinations, health checks, or consultations."
    },
    {
      icon: <BookIcon className="group-hover:text-white" />,
      title: "Compare Pharmacies",
      text: "Browse nearby pharmacies, compare prices, check availability, and read reviews to make an informed decision."
    },
    {
      icon: <ComputerIcon className="group-hover:text-white" />,
      title: "Book Online",
      text: "Select your preferred pharmacy and schedule your appointment through our secure online booking system."
    },
    {
      icon: <VerifyIcon className="group-hover:text-white" />,
      title: "Receive Confirmation",
      text: "Your chosen pharmacy will receive a notification of your booking, and you'll get a confirmation email or SMS with all the details."
    }
  ]
  
  return (
    <section className='mt-80 mb-4'> 
        <LayoutWrapper>
       
      {/* Main Title */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">
          <span className="text-teal-500">Connecting</span>
          <span className="text-gray-700"> You To</span>
        </h1>
        <h2 className="text-4xl text-gray-700 font-bold mt-2">Health Services</h2>
      </div>
        <div>
          <h1 className='text-4xl font-bold text-center'>How it works</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-8 gap-4'>
          {howItWorks.map((item, index) => (
            <HowItWorksCard key={index} {...item} />
          ))}
          </div>
        </div>


      {/* Content Container */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 items-start">
        <div className='w-full flex  items-start h-[100%] '>
          <Image
            src={HowItWorksImage}
            alt="how it works"
            height={500}
            width={500}
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
      </div> */}
       <div className='border-t-2 border-gray-200 mt-10'></div>
        </LayoutWrapper>
    </section>
 
  );
};

export default HowItWorks;