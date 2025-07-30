"use client"
import React from "react";
import LayoutWrapper from "./layout/wrapper";
import ButtonTheme from "./shared/ButtonTheme";
import { useGetHowItWorks } from "./useGetHowItWorks";
import { Loader2 } from "lucide-react";

const FrequentlyAsked = ({ btnColor }: { btnColor: string }) => {
  const hexColor = btnColor.match(/#[0-9a-fA-F]{6}/)[0];
  const { faqs, loading, error } = useGetHowItWorks();

  // Use API FAQ if available, otherwise fallback
  const hasApiFaqs = faqs && faqs.length > 0;
  const faqsToShow = hasApiFaqs ? faqs : [];

  return (
    <section className="py-16 bg-white">
      <LayoutWrapper>
        <div>
          <div className="">
            <h1 className="text-4xl font-bold mb-5">
              Frequently Asked Questions
            </h1>
             <p className="text-[#52525B] text-sm mb-10">
             Have questions? We’ve got answers! Explore our FAQs to learn more about our services, booking process, and <br /> how we ensure seamless healthcare access.
             </p>
            {loading ? (
              <div className="flex justify-center items-center my-8">
                <Loader2 className="w-8 h-8 animate-spin text-teal-500 mr-2" />
                <span className="text-gray-600">Loading FAQs...</span>
              </div>
            ) : faqsToShow.length === 0 ? (
              <div className=" w-full  my-8">
                <div className="border border-gray-300 rounded-lg p-6 shadow-md">
                  <span className="text-gray-600">No FAQs found.</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {faqsToShow.map((item, index) => (
                  <div key={index} className="pb-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {item.question}
                    </h3>
                    <p className="font-roboto text-sm text-[#52525B]">{item.answer}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4" style={{ color: hexColor }}>
              Still have questions?
            </h3>

            <ButtonTheme bgColor={`bg-[${hexColor}]`} paddingX="px-10" textColor="text-white">
              Contact Us
            </ButtonTheme>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default FrequentlyAsked;
