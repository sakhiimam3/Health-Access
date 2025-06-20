"use client"
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import aesthetic1 from "../../../../public/images/aesthetic-1.png";
import aesthetic2 from "../../../../public/images/aesthetic-2.png";
import aesthetic3 from "../../../../public/images/asthetic-3.png";
import aesthetic4 from "../../../../public/images/asthetic-4.png";
import aesthetic5 from "../../../../public/images/aesthetic-5.png";
import aesthetic6 from "../../../../public/images/asthetic-6.png";
import LayoutWrapper from "@/components/layout/wrapper";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useGetServices } from "@/lib/hooks";
import { Loader2 } from "lucide-react";
import notfound from "@/../public/images/notfound.jpg";
import isValidUrl from "@/lib/isValidUrl";

// Skeleton loader for service cards
const CardSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 my-10 lg:grid-cols-4 gap-4">
    {Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className="bg-white rounded-lg p-4 animate-pulse">
        <div className="h-48 bg-gray-200 rounded-[16px] mb-4" />
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
      </div>
    ))}
  </div>
);

const AestheticServices = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "N/A";
  const typeid = searchParams.get("typeid") || undefined;


  const { data: servicesData, isLoading, error } = useGetServices({
    typeId:typeid || ""
  });

  console.log(servicesData,"servicesData")

  const services = [
    {
      title: "Skin Boosters",
      image: aesthetic1,
    },
    {
      title: "Dermal Fillers",
      image: aesthetic2,
    },
    {
      title: "Lip Fillers",
      image: aesthetic3,
    },
    {
      title: "Anti-Sweat Injections",
      image: aesthetic4,
    },
    {
      title: "Polynucleotides",
      image: aesthetic5,
    },
    {
      title: "Anti-wrinkle face and neck injections",
      image: aesthetic6,
    },
  ];

  return (
    <PagesWrapper bgColor="bg-[#FC6D64]" btnColor="#FC6D64">
      <div className="mt-56">
        <PagesBanner
          title={name || ""}
          image="/images/aesthetic-banner.png"
          height="h-64"
          fromColor="#FC6D64"
          toColor="#FC6D64"
          textColor="white"
        />
        <LayoutWrapper>
          {isLoading ? (
            <CardSkeleton count={6} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 my-10 lg:grid-cols-4 ">
              {servicesData?.data?.slice(0, 6).map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-4">
                  <div className="h-48 overflow-hidden rounded-[16px]">
                    <Image
                      src={isValidUrl( service.image) ? service.image : notfound}
                      alt={service.title}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover rounded-[16px]"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (target.src !== notfound.src) target.src = notfound.src;
                      }}
                    />
                  </div>
                  <h3 className="text-md font-bold max-w-[250px] text-[#52525B] mt-4">
                    {service?.name || "N/A"}
                  </h3>
                </div>
              ))}
            </div>
          )}
          <div className="border-t-2 border-gray-200 mt-10"></div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default AestheticServices;
