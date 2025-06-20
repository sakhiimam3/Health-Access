"use client"
import React from "react";
import LayoutWrapper from "./layout/wrapper";
import ButtonTheme from "./shared/ButtonTheme";
import { useGetHowItWorks } from "./useGetHowItWorks";
import { Loader2 } from "lucide-react";

const FrequentlyAsked = ({ btnColor }: { btnColor: string }) => {
  const hexColor = btnColor.match(/#[0-9a-fA-F]{6}/)[0];
  const { faqs, loading, error } = useGetHowItWorks();

  const fallbackFaqItems = [
    {
      question: "How do I book a service with Health Access?",
      answer:
        "Simply enter your postcode, select the service you need, and book an appointment online with a pharmacy near you.",
    },
    {
      question: "What services can I access through Health Access?",
      answer:
        "We connect you to a variety of NHS and private pharmacy services, including vaccinations, health checks, and diagnostic tests.",
    },
    {
      question: "Is the booking system free to use?",
      answer:
        "Yes, our platform is completely free for customers to search and book services.",
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer:
        "Yes, you can manage your bookings easily through your Health Access account. Rescheduling and cancellation options are available.",
    },
    {
      question: "Are all services NHS-funded?",
      answer:
        "Some services are funded by the NHS, while others are private and may have associated costs. These details will be clearly listed.",
    },
    {
      question: "How do pharmacies receive my booking?",
      answer:
        "Once you book a service, the pharmacy will receive a notification via email or SMS to confirm your appointment.",
    },
    {
      question: "Can I read reviews before choosing a pharmacy?",
      answer:
        "Yes, customer reviews and ratings are available for participating pharmacies to help you make an informed decision.",
    },
    {
      question: "What happens if my chosen pharmacy is unavailable?",
      answer:
        "In case of unavailability, we'll suggest alternative pharmacies nearby offering the same service.",
    },
  ];

  // Use API FAQ if available, otherwise fallback
  const hasApiFaqs = faqs && faqs.length > 0;
  const faqsToShow = hasApiFaqs ? faqs : fallbackFaqItems;

  return (
    <section className="py-16 bg-white">
      <LayoutWrapper>
        <div>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold  mb-5">
              Frequently Asked Questions
            </h1>
            {faqsToShow.length > 0 && (
              <div className="pb-12">
                <h3 className="font-semibold  text-lg  mb-2">
                  {faqsToShow[0].question}
                </h3>
                <p className="font-roboto text-sm">{faqsToShow[0].answer}</p>
              </div>
            )}
          </div>

          {loading && (
            <div className="flex justify-center items-center my-8">
              <Loader2 className="w-8 h-8 animate-spin text-teal-500 mr-2" />
              <span className="text-gray-600">Loading FAQs...</span>
            </div>
          )}
          {error && <div className="my-8 text-red-500">{error}</div>}

          {/* Show the rest of the FAQ array below */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {faqsToShow.slice(1).map((item, index) => (
              <div key={index} className="pb-6">
                <h3 className="font-semibold  text-lg  mb-2">
                  {item.question}
                </h3>
                <p className="font-roboto text-sm">{item.answer}</p>
              </div>
            ))}
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
