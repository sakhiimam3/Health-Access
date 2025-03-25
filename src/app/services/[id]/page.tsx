import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import Image from "next/image";
import Vs1 from "../../../../public/images/vs-1.png";
import Vs2 from "../../../../public/images/vs-2.png";
import Vs3 from "../../../../public/images/vs-3.png";
import Vs4 from "../../../../public/images/vs-4.png"   ;
import Vs5 from "../../../../public/images/service-detail.png"   ;
const ServicesDetails = () => {
    const servicesData = [
        {
          title: "Travel Vaccines",
          image: Vs1,
        },
        {
          title: "Weight Management",
          image: Vs2,
        },
        {
          title: "Vitamin B12 Injections",
          image: Vs3,
        },
        {
          title: "Yellow Fever Clinic",
          image: Vs4,
        },
        {
            title: "Anti-Sweat Injections",
            image: Vs5,
          },
          
      ];
    
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title="Vaccination Services"
          image="/images/how-it-works.png"
          height="h-85"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
        />
        <LayoutWrapper>
         <div className="my-12">
           <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {servicesData.map((service, index) => (
              <div
                key={index}
                className={`rounded-lg overflow-hidden min-h-[350px] group ${
                  index === servicesData.length - 1 ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div className="relative rounded h-[350px] w-full">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#189BA3]/80 via-[#189BA3]/40 to-transparent z-10 rounded-[16px] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Image
                    src={service.image}
                    alt="Medical consultation"
                    fill
                    className="rounded-[16px] object-cover h-[200px]"
                    priority
                  />
                </div>
                <div className="my-4">
                  <h3 className="text-md text-[#52525B] font-[700] font-ubantu">
                    {service.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
         </div>
         <div className='border-t-2 border-[#DCDCDC] mt-10'></div>

        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default ServicesDetails;
