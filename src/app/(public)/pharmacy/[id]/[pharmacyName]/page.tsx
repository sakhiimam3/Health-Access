"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";
import ButtonTheme from "@/components/shared/ButtonTheme";
import Image from "next/image";
import VitaminInfo from "@/components/VitaminInfo";
import ContactUs from "@/components/contactus";
import Blogs from "@/components/Blogs";
import { useGetPublicPartnerServices } from "@/lib/hooks";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import isValidUrl from "@/lib/isValidUrl";

const PharmacyNestedPage = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const { data: servicesData, isLoading } = useGetPublicPartnerServices(id as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const service = servicesData?.data?.services?.find((s: any) => s.service.id === serviceId);
  
  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={service.service.name}
          height="h-[200px]"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
          isDetail={true}
        />
        <LayoutWrapper>
          <section>
            <div className="grid lg:grid-cols-2 gap-6 mt-16 mb-8">
              <h2 className="text-2xl md:text-3xl max-w-[800px] font-bold leading-tight">
                {service.service.name}
              </h2>
              <div className="mb-5">
                <p className="paragraphColor text-md font-roboto mb-5">
                  {service.description || service.service.description}
                </p>
                <p className="paragraphColor text-md font-roboto">
                  The cost of this service is £{service.price}.
                </p>
                <Link href={`/booking-form?partnerId=${id}&serviceId=${serviceId}`}>
                  <ButtonTheme
                    bgColor="bg-[#189BA3]"
                    className="my-6 text-white py-3 text-lg rounded-[24px]"
                    children="Book Now"
                    paddingX="px-12"
                  />
                </Link>
              </div>
            </div>
            <div className="relative w-full h-[650px] mb-6 bg-white rounded-lg">
              <div className="absolute left-0 top-0 w-1/2 p-4">
                <Image
                    src={isValidUrl(service.service.image) ? service.service.image : "/images/notfound.jpg"}
                    alt={service.service.name}
                  width={400}
                  height={300}
                  className="w-full rounded-lg"
                />
              </div>

              <div className="absolute right-0 bottom-0 w-1/2 p-4">
                <Image
                  src={isValidUrl(service.service.image) ? service.service.image : "/images/notfound.jpg"}
                  alt={service.service.name}
                  width={400}
                  height={300}
                  className="w-full rounded-lg"
                />
              </div>
            </div>
            <div className="border-t-2 border-gray-200 mt-24"></div>
          </section>

          {service.sections?.map((section: any, index: number) => (
            <section key={section.id} className="my-16">
              <VitaminInfo
                title={section.title}
                description={section.columns[0]?.content}
                imageSrc={section.columns[1]?.content?.src || "/images/service-default.png"}
                isReverse={index % 2 !== 0}
              />
            </section>
          ))}

          <div className="my-8">
            <ContactUs />
          </div>
          <Blogs />
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default PharmacyNestedPage;
