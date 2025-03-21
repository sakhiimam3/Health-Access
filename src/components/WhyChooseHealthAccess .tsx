"use client"
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ConvinenceIcon, SearchIcon, VerifyIcon } from "./icons/icons";
import { useState } from "react";

const WhyChooseHealthAccess = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const features = [
        {
          title: "Convenience",
          text: "Search nearby pharmacies anytime.",
          icon: <ConvinenceIcon color={hoveredIndex === 0 ? "white" : "#189BA3"} />,
        },
        {
          title: "Transparency",
          text: "View prices and availability upfront.",
          icon: <SearchIcon color={hoveredIndex === 1 ? "white" : "#189BA3"} />,
        },
        {
          title: "Trust",
          text: "Connect with verified NHS and private pharmacies.",
          icon: <VerifyIcon color={hoveredIndex === 2 ? "white" : "#189BA3"} />,
        },
      ];

  return (
    <section className="">
      <h2 className="text-4xl text-center font-bold mb-6">
        Why Choose Health Access?
      </h2>

      {/* Cards Container */}
      <div className="grid grid-cols-3 gap-6 mt-6">
        {features.map((feature, index) => (
          <Card
            key={feature.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative overflow-hidden group border-dashed border-gray-300 rounded-lg shadow-sm transition-all duration-300 hover:bg-[#189BA3] cursor-pointer hover:text-white"
          >
            {index === 0 && (
              <div className="absolute right-0  bottom-[-8] rotate-[-55deg]">
                <Image
                  src={"/images/vacsine.png"}
                  alt={feature.title}
                  width={80}
                  height={80}
                />
              </div>
            )}

            <CardContent className="flex flex-col items-start p-6 space-y-3">
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="font-semibold text-lg group-hover:text-white">
                {feature.title}
              </h3>
              <p className="text-sm font-roboto group-hover:text-white text-gray-600">
                {feature.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseHealthAccess;
