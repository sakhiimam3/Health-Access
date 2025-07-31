import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import Image from "next/image";
import HowItWorksImage from "../../../public/images/howitworks.png";
import { getApiBaseUrl } from "@/lib/utils";
// import {
//   BookIcon,
//   ComputerIcon,
//   SearchIcon,
//   VerifyIcon,
// } from "@/components/icons/icons";
import HowItWorks from "@/components/howitworks";

interface HowItWorksItem {
  _id: string;
  title: string;
  description: string;
  icon: string;
  image?: string;
}

interface HowItWorksData {
  howItWorks: HowItWorksItem[];
  faqs: any[];
  menuTypes: any[];
}

async function getHowItWorksData(): Promise<HowItWorksItem[]> {
  try {
    const response = await fetch(`${getApiBaseUrl()}/v1/api/cms/how-it-works`, {
      cache: 'no-store', // This ensures fresh data on each request
    });

    if (!response.ok) {
      throw new Error('Failed to fetch how-it-works data');
    }

    const json = await response.json();
    return json.data?.howItWorks || [];
  } catch (error) {
    console.error('Error fetching how-it-works data:', error);
    return [];
  }
}

const HowItWorksPage = async () => {
  const howItWorksData = await getHowItWorksData();

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
          {/* <div className="grid grid-cols-1 mt-20 lg:grid-cols-2 gap-2 items-start">
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
          </div> */}
          <HowItWorks data={howItWorksData} isNested={true} />
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default HowItWorksPage;
