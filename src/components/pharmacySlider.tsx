"use client";
import React from "react";
import LayoutWrapper from "./layout/wrapper";
import { CenterHeader } from "./shared/centerHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PharmacyCard } from "./sliderCard";
import pharmacy1 from "../../public/images/pharmacy-1.png";
import pharmacy2 from "../../public/images/pharmacy-2.png";
import pharmacy3 from "../../public/images/pharmacy-3.png";
import pharmacy4 from "../../public/images/pharmacy-1.png";
import pharmacy5 from "../../public/images/pharmacy-2.png";

const pharmacySlider = () => {
  const pharmacies = [
    {
      imageSrc: pharmacy1,
      title: "CarePlus Pharmacy",
      description: "45 High Street, Birmingham, B4 7SL",
      address: "Pharmacy Address",
      services: [],
    },
    {
      imageSrc: pharmacy2,
      title: "Warburtons Pharmacy ",
      address: "78 Deansgate, Manchester, M3 2FW",
      services: [],
    },
    {
      imageSrc: pharmacy3,
      title: "Warburtons Pharmacy",
      address: "78 Deansgate, Manchester, M3 2FW",
      services: [
        { id: "1", name: "Travel Vaccine" },
        { id: "2", name: "Antimalarial Vaccine" },
        { id: "3", name: "NHS Services" },
      ],
    },
    {
      imageSrc: pharmacy4,
      title: "CityCare Pharmacy",
      address: "101 Queen Street, Glasgow, G1 3DN",
      phone: "12345 678910",
      services: [
        { id: "1", name: "Travel Vaccine" },
        { id: "2", name: "Antimalarial Vaccine" },
        { id: "3", name: "NHS Services" },
      ],
    },
    {
      imageSrc: pharmacy5,
      title: "New Pharmacy",
      address: "123 New Street, London, E1 6AN",
      phone: "11122 334455",
      services: [
        { id: "1", name: "Travel Vaccine" },
        { id: "2", name: "Antimalarial Vaccine" },
        { id: "3", name: "NHS Services" },
      ],
    },
  ];

  return (
    <section >
      <LayoutWrapper>
        <div className="mb-10">
          <CenterHeader
            title="Trusted Pharmacies, Ready to Serve You"
            description="Explore the top-rated pharmacies on Health Access, handpicked for their exceptional service and customer satisfaction. Find the perfect match for your healthcare needs."
          />
        </div>
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="gap-2 " >
              {pharmacies.map((pharmacy, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:basis-1/2 lg:basis-1/3"
                >
                  <PharmacyCard
                    image={pharmacy.imageSrc}
                    title={pharmacy.title}
                    address={pharmacy.address}
                    services={pharmacy.services || []}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute bottom-[-30px] right-12 flex gap-1">
              <CarouselPrevious className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
              <CarouselNext className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
            </div>
        
          </Carousel>
        </div>
        <div className='border-t-2 border-gray-200 mt-24'></div>
      </LayoutWrapper>
    </section>
  );
};

export default pharmacySlider;
