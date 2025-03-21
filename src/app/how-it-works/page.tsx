import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import Image from "next/image";
import HowItWorksImage from "../../../public/images/howitworks.png";
import {
  BookIcon,
  ComputerIcon,
  SearchIcon,
  VerifyIcon,
} from "@/components/icons/icons";

const HowItWorks = () => {
  const howItWorks = [
    {
      icon: <SearchIcon className="group-hover:text-white" />,
      title: "Search for Services",
      text: "Enter your postcode and the service you need, such as vaccinations, health checks, or consultations.",
    },
    {
      icon: <BookIcon className="group-hover:text-white" />,
      title: "Compare Pharmacies",
      text: "Browse nearby pharmacies, compare prices, check availability, and read reviews to make an informed decision.",
    },
    {
      icon: <ComputerIcon className="group-hover:text-white" />,
      title: "Book Online",
      text: "Select your preferred pharmacy and schedule your appointment through our secure online booking system.",
    },
    {
      icon: <VerifyIcon className="group-hover:text-white" />,
      title: "Receive Confirmation",
      text: "Your chosen pharmacy will receive a notification of your booking, and you'll get a confirmation email or SMS with all the details.",
    },
    {
      icon: <VerifyIcon className="group-hover:text-white" />,
      title: "Visit Your Pharmacy",
      text: "Attend your appointment at the scheduled time and location. Get expert care without the hassle.",
    },
  ];
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title="How It Works"
          image="/images/how-it-works.png"
          height="h-85"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
        />
        <LayoutWrapper>
          <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-2 items-start">
            <div className="w-full flex  items-start h-[100%] ">
              <Image
                src={HowItWorksImage}
                alt="how it works"
                height={500}
                width={500}
              />
            </div>

            <div className="relative flex flex-col justify-start">
              <h3 className="text-4xl font-[700] text-gray-800 mb-8">
                How It Works
              </h3>
              <div className="space-y-5 relative">
                {howItWorks.map((step, index) => (
                  <div key={index} className="pl-8 relative">
                    {index === 0 && (
                      <div className="absolute left-0 top-2 bottom-0 w-0.5 h-16 bg-[#189BA3]"></div>
                    )}
                    <h4 className="text-xl font-[700] mb-1">{step.title}</h4>
                    <p className="font-roboto text-sm text-[#52525B]">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default HowItWorks;
