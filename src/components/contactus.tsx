import React from "react";
import { EmailIcon, SupportIcon, LocationIcon, ClockIcon } from "@/components/icons/icons";

// Define the type for the contactInfo prop
export type ContactInfo = {
  email: string;
  phone: string;
  address: string;
  timings: string[];
  location: {
    name: string;
    latitude: string;
    longitude: string;
  };
};

// Add a function to format each timing string
function formatTiming(timing: string) {
  return timing.charAt(0).toUpperCase() + timing.slice(1);
}

const ContactUs = ({ contactInfo }: { contactInfo: ContactInfo }) => {
  const contactData = [
    {
      icon: EmailIcon,
      title: 'Email',
      content: contactInfo?.email
    },
    {
      icon: SupportIcon,
      title: 'Support',
      content: contactInfo?.phone
    },
    {
      icon: LocationIcon,
      title: 'Address',
      content: contactInfo?.address
    },
    {
      icon: ClockIcon,
      title: 'Opening Hours',
      content: contactInfo?.timings && contactInfo.timings.length > 0
        ? contactInfo.timings.map(formatTiming).join(' | ')
        : "N/A"
    }
  ];

  return (
    <section>
      <div className="my-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactData.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="mb-4 flex items-center gap-2 flex-col">
                <item.icon className="text-[#189BA3]" />
                <div className="font-bold text-lg font-ubantu">{item.title}</div>
              </div>
              <div className="text-[#52525B] font-roboto">{item.content}</div>
            </div>
          ))}
        </div>
        <div className="w-full mt-14">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(contactInfo.location.latitude)},${encodeURIComponent(contactInfo.location.longitude)}&z=15&output=embed`}
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Location Map"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;