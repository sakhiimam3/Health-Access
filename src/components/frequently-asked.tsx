import React from "react";
import LayoutWrapper from "./layout/wrapper";
import ButtonTheme from "./shared/ButtonTheme";

const FrequentlyAsked = () => {
  const faqItems = [
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

  return (
    <section className="py-16 bg-white">
      <LayoutWrapper>
        <div>
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-5">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 mb-14">
              Have questions? We've got answers! Explore our FAQs to learn more
              about our services, booking process, and how we ensure seamless
              healthcare access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <h3 className="font-semibold  text-lg  mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 ">
            <h3 className="text-xl font-medium text-[#189BA3] mb-4">
              Still have questions?
            </h3>

            <ButtonTheme bgColor="bg-[#189BA3]" paddingX="px-10" textColor="text-white">
              Contact Us
            </ButtonTheme>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
};

export default FrequentlyAsked;
