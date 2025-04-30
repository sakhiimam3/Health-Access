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

import { useGetPartners } from "@/lib/hooks";
// import { partners } from "@/mockdata";
import { Loader2 } from "lucide-react";

const pharmacySlider = () => {
  const { data, isLoading, error, refetch } = useGetPartners();

  // Show loader while data is loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>
          <Loader2 className="w-10 h-10 animate-spin" />
        </p>
      </div>
    );
  }

  if (!data || !data.data || data.data.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <LayoutWrapper>
        <div className="mb-10">
          <CenterHeader
            title="Trusted Pharmacies, Ready to Serve You"
            description="Explore the top-rated pharmacies on Health Access, handpicked for their exceptional service and customer satisfaction. Find the perfect match for your healthcare needs."
          />
        </div>
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="gap-2">
              {data.data.map((pharmacy: any, index: any) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:basis-1/2 lg:basis-1/3"
                >
                  <PharmacyCard
                    image={pharmacy.image || pharmacy1}
                    title={pharmacy.businessName}
                    address={pharmacy.location?.name}
                    services={pharmacy.services || []}
                    id={pharmacy.id}

                    isSearch={false}
                    key={pharmacy.id}
                    btnText={"View Pharmacy"}
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
        <div className="border-t-2 border-gray-200 mt-24"></div>
      </LayoutWrapper>
    </section>
  );
};

export default pharmacySlider;
