"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import PagesBanner from "@/components/pagesBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetServices } from "@/lib/hooks";
import { Suspense } from "react";

import React from "react";
import Vs1 from "@public/images/vs-1.png";
import Vs2 from "@public/images/vs-2.png";
import Vs3 from "@public/images/vs-3.png";
import Vs4 from "@public/images/vs-4.png";
import Women1 from "@public/images/womens-1.png";
import Women2 from "@public/images/womens-2.png";
import Ph1 from "@public/images/ph-1.png";
import Ph2 from "@public/images/ph-2.png";
import Ph3 from "@public/images/ph-3.png";
import Ph4 from "@public/images/ph-4.png";

import Other1 from "@public/images/other-1.png";
import Other2 from "@public/images/other-2.png";
import Other3 from "@public/images/other-3.png";
import Other4 from "@public/images/other-4.png";

import Image from "next/image";
import LayoutWrapper from "@/components/layout/wrapper";
import Link from "next/link";

const PharmacyServices = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "N/A";
  const typeid = searchParams.get("typeid") || undefined;

  // Fetch services by typeid
  const { data: services, isLoading, error } = useGetServices({
    typeId:typeid || ""
  });

    console.log(services,"services111111")

  React.useEffect(() => {
    if (services) {
      console.log("Fetched services:", services);
    }
  }, [services]);

  const servicesData = [
    {
      title: "Travel Vaccines",
      image: Vs1,
      type: "vaccination",
    },
    {
      title: "Weight Management",
      image: Vs2,
    },
    {
      title: "Vitamin B12 Injections",
      image: Vs3,
    },
    {
      title: "Yellow Fever Clinic",
      image: Vs4,
    },
    {
      title: "Travel Vaccines",
      image: Vs1,
      type: "vaccination",
    },
    {
      title: "Weight Management",
      image: Vs2,
    },
    {
      title: "Vitamin B12 Injections",
      image: Vs3,
    },
  ];

  const pharmacyServicesData = [
    {
      title: "UTI Review",
      image: Ph1,
    },
    {
      title: "Shingles Review",
      image: Ph2,
    },
    {
      title: "Sore Throat Review",
      image: Ph3,
    },
    {
      title: "Sinusitis",
      image: Ph4,
    },
  ];

  const otherServicesData = [
    {
      title: "Earwax Removal",
      image: Other1,
    },
    {
      title: "Oral Anti-Malarial",
      image: Other2,
    },
    {
      title: "Blood Pressure Check",
      image: Other3,
    },
    {
      title: "Heart Rhythm Check",
      image: Other4,
    },
  ];

  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={name}
          image="/images/phr-banner.png"
          height="h-60"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
        />
        <LayoutWrapper>
          <div className="my-20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
                Vaccination Services
              </h2>

              {true && (
                <div>
                  <Link
                    href={"#"}
                    className="underline text-[#52525B]  hover:text-teal-500"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent className="gap-2">
                  {servicesData.map((service, index) => (
                    <CarouselItem
                      key={index}
                      onClick={() =>
                        router.push(
                          `/services/vaccinations-services?serviceName=${service.title}`
                        )
                      }
                      className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden min-h-[200px]"
                      >
                        <div className="relative rounded ">
                          {index === 0 && service.type === "vaccination" ? (
                            <div className="absolute overf inset-0 bg-gradient-to-t from-[#189BA3]/80 via-[#189BA3]/40 to-transparent z-10 rounded-[16px]" />
                          ) : null}
                          <Image
                            src={service.image}
                            alt="Medical consultation"
                            width={354}
                            height={200}
                            className="rounded-[16px] object-cover h-[200px]"
                            priority
                          />
                        </div>
                        <div className="my-4">
                          <h3 className="text-md  text-[#52525B] font-[700] font-ubantu ">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-[-30px] right-12 flex gap-1">
                  <CarouselPrevious className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                  <CarouselNext className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                </div>
              </Carousel>
            </div>
          </div>
          {/* womes health services */}
          <div className="my-20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
                Women's Health Services
              </h2>

              {true && (
                <div>
                  <Link
                    href={"#"}
                    className="underline text-[#52525B]  hover:text-teal-500"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            <div
              className="flex gap-4"
              onClick={() =>
                router.push(
                  `/services/vaccinations-services?serviceName=Erectile Dysfunction`
                )
              }
            >
              <div className="w-[50%]">
                <div className="h-[200px] relative overflow-hidden">
                  <Image
                    src={Women1}
                    alt="Women's Health Services"
                    fill
                    style={{ objectFit: "cover", width: "100%" }}
                    className="rounded-[16px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="mt-6 text-[#52525B] text-md font-[700] font-ubantu">
                  Erectile Dysfunction
                </h3>
              </div>
              <div
                className="w-[50%]"
                onClick={() =>
                  router.push(
                    `/services/vaccinations-services?serviceName=Hair loss`
                  )
                }
              >
                <div className="h-[200px] relative">
                  <Image
                    src={Women2}
                    alt="Women's Health Services"
                    fill
                    style={{ objectFit: "cover", width: "100%" }}
                    className="rounded-[16px]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <h3 className="mt-6 text-[#52525B] text-md font-[700] font-ubantu">
                  Hair loss
                </h3>
              </div>
            </div>
          </div>
          {/* pharmacy first services */}
          <div className="my-20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
                Pharmacy 1st Services
              </h2>

              {true && (
                <div>
                  <Link
                    href={"#"}
                    className="underline text-[#52525B]  hover:text-teal-500"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent className="gap-2">
                  {pharmacyServicesData.map((pharmacy, index) => (
                    <CarouselItem
                      key={index}
                      onClick={() =>
                        router.push(
                          `/services/vaccinations-services?serviceName=${pharmacy.title}`
                        )
                      }
                      className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden min-h-[200px]"
                      >
                        <div className="relative rounded ">
                          <Image
                            src={pharmacy.image}
                            alt="Medical consultation"
                            width={354}
                            height={200}
                            className="rounded-[16px] object-cover h-[200px]"
                            priority
                          />
                        </div>
                        <div className="my-4">
                          <h3 className="text-md  text-[#52525B] font-[700] font-ubantu ">
                            {pharmacy.title}
                          </h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-[-30px] right-12 flex gap-1">
                  <CarouselPrevious className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                  <CarouselNext className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                </div>
              </Carousel>
            </div>
          </div>
          {/* Other Services */}
          <div className="my-20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
                Other Services
              </h2>

              {true && (
                <div>
                  <Link
                    href={"#"}
                    className="underline text-[#52525B]  hover:text-teal-500"
                  >
                    View All
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <Carousel className="w-full">
                <CarouselContent className="gap-2">
                  {otherServicesData.map((other, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                    >
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden min-h-[200px]"
                      >
                        <div className="relative rounded ">
                          <Image
                            src={other.image}
                            alt="Medical consultation"
                            width={354}
                            height={200}
                            className="rounded-[16px] object-cover h-[200px]"
                            priority
                          />
                        </div>
                        <div className="my-4">
                          <h3 className="text-md  text-[#52525B] font-[700] font-ubantu ">
                            {other.title}
                          </h3>
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="absolute bottom-[-30px] right-12 flex gap-1">
                  <CarouselPrevious className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                  <CarouselNext className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                </div>
              </Carousel>
            </div>
          </div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

const PharmacyServicesPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PharmacyServices />
  </Suspense>
);

export default PharmacyServicesPage;
