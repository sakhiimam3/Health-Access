import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import Image from "next/image";
import CoreValues from "@/components/corevalues";

const Aboutus = () => {
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56 mb-4">
        <PagesBanner
          title="About Us"
          image="/images/how-it-works.png"
          height="h-85"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
        />
        <LayoutWrapper>
          <div className="my-10">
            <div>
              <div>
                <div className="grid lg:grid-cols-2 gap-2 my-16">
                  <h2 className="text-2xl md:text-4xl max-w-[800px] font-bold leading-tight">
                    Empowering Better Healthcare Experiences
                  </h2>
                  <p className="text-[#52525B] text-md">
                    AP Health's Access service is on a mission to transform how
                    people interact with pharmacy services. Whether you're
                    seeking PDPs, Medicaid resources, or private healthcare
                    options, we're here to make the process simple, transparent,
                    and reliable.
                  </p>
                </div>

                <div className="relative mt-6 rounded-lg">
                  <Image
                    src="/images/about-us.png"
                    alt="Healthcare interaction"
                    width={900}
                    height={500}
                    className="rounded-lg shadow-md w-full"
                  />
                  <div className="absolute top-1/2 left-[30%] w-[40%] h-0  transform -translate-y-1/2" />
                </div>
              </div>
            </div>
          </div>
          <div className="border-t-2  border-gray-200 "></div>

          <div className="p-4 my-10 max-w-[700px] mx-auto  text-center">
            <h2 className="text-xl md:text-5xl font-bold font-ubantu">
              Our Mission
            </h2>
            <p className="text-[#189BA3] text-xl font-roboto md:text-xl mt-2">
              To make healthcare more accessible, personalized, and efficient
              for everyone across the UK.
            </p>
          </div>
          <div className="border-t-2  border-gray-200 "></div>

          <div className="my-10">
           <CoreValues />
          </div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default Aboutus;
