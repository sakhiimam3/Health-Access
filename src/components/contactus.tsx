import React from "react";
import { EmailIcon, SupportIcon, LocationIcon, ClockIcon } from "@/components/icons/icons";

const contactData = [
  {
    icon: EmailIcon,
    title: 'Email',
    content: 'contact@warburtonpharmacy.co.uk'
  },
  {
    icon: SupportIcon,
    title: 'Support',
    content: '+44 1234 567890'
  },
  {
    icon: LocationIcon,
    title: 'Address',
    content: '78 Deansgate, Manchester, M3 2FW, UK'
  },
  {
    icon: ClockIcon,
    title: 'Opening Hours',
    content: 'Start new chat'
  }
];

const ContactUs = () => {
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
      <img 
        src="/images/map.png" 
        alt="City Map" 
        className="w-full h-auto object-cover"
      />
        </div>
      </div>
    </section>
  );
};

export default ContactUs;