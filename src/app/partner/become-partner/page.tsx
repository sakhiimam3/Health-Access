import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import PharmacyPartnership from "@/components/PharmacyPartnership";
import PharmacySignUpForm from "@/components/PharmacySignUpForm";
import Wrapper from "@/components/layout/wrapper";
import Image from "next/image";
import React from "react";
import { DoubleCheckIcon } from "@/components/icons/icons";
import { PlayIcon } from "lucide-react";

const page = () => {
  const benefitsList = [
    {
      id: 1,
      text: "Boost visibility with a growing audience of health-conscious users.",
    },
    {
      id: 2,
      text: "Receive & manage bookings directly through our platform.",
    },
    {
      id: 3,
      text: "Get alerts by SMS/email for every appointment.",
    },
    {
      id: 4,
      text: "List both NHS and private services effortlessly.",
    },
    {
      id: 5,
      text: "Support team to help you onboard quickly.",
    },
  ];

  const howItWorks = [
    {
      id: 1,
      title: "Fill Out Your Pharmacy Details",
      description: "Tell us about your services, team, and contact info.",
    },
    {
      id: 2,
      title: "Get Verified By Our Team",
      description:
        "We'll review and approve your listing to ensure quality care.",
    },
    {
      id: 3,
      title: "Start Receiving Bookings",
      description:
        "Patients will find your pharmacy and book services directly through our platform.",
    },
  ];

  return (
    <div className="mt-56">
      <PagesWrapper
        type={true}
        isSearchPage={true}
        isPartner={false}
        bgColor="bg-[#189BA3]"
        btnColor="#189BA3"
      >
        <PharmacyPartnership  />

        {/* Why Partner with Health Access Section */}
        <div className="py-16 ">
          <Wrapper>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2">
                <div className="relative rounded-lg overflow-hidden">
                  <Image
                    src="/images/why-partner.png"
                    alt="Pharmacist helping a customer"
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white rounded-full p-4 cursor-pointer">
                      <PlayIcon />
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2">
                <h2 className="text-4xl max-w-[500px] font-bold mb-6">
                  Why Partner with{" "}
                  <span className="text-[#189BA3]">Health Access?</span>
                </h2>

                <ul className="space-y-4">
                  {benefitsList.map((benefit) => (
                    <li key={benefit.id} className="flex items-center gap-3">
                      <DoubleCheckIcon />
                      <p className="font-roboto text-sm paragraphColor  text-[#52525B]">
                        {benefit.text}
                      </p>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 font-medium">
                  Join 100+ pharmacies already making healthcare more
                  accessible.
                </p>
              </div>
            </div>
            <div className="border-t-2 border-[#DCDCDC] mt-10"></div>
          </Wrapper>
        </div>

        {/* How It Works Section */}
        <div className="pb-12">
          <Wrapper>
            <h2 className="text-4xl max-w-[500px] font-bold mb-6">
              How It Works
            </h2>
            <p className="mb-6 font-roboto text-sm paragraphColor text-[#52525B]">
              Getting started with Health Access is quick and easy. Join a
              trusted network of <br /> pharmacies in just a few simple steps.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-6">
              {howItWorks.map((step) => (
                <div
                  key={step.id}
                  className="flex-1 text-center flex items-start"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-[#189BA3] rounded-full text-white font-bold text-lg mr-4">
                    {step.id}
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium text-[#189BA3]">{step.title}</h4>
                    <p className="text-sm text-[#52525B] font-roboto">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          
          </Wrapper>
        </div>
        <PharmacySignUpForm />

      </PagesWrapper>

    </div>
  );
};

export default page;
