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
import { Loader2 } from "lucide-react";
import NHSServicesCard from "@/components/NHSServicesCard";
import { useUserContext } from "@/context/userStore";

const PharmacyNestedPage = () => {
  const { id } = useParams();
  const {user}=useUserContext()
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('service');
  const { data: servicesData, isLoading } = useGetPublicPartnerServices(id as string);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-10 w-10 animate-spin text-[#189BA3]" />
      </div>
    );
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
                {/* Only show Book Now for customers. If not logged in, disable and show tooltip. */}
                {user?.data?.role === "customer" ? (
                  <Link href={`/booking-form?partnerId=${id}&serviceId=${serviceId}&serviceName=${encodeURIComponent(service.service.name)}&address=${encodeURIComponent(servicesData?.data?.location?.name || '')}`}>
                    <ButtonTheme
                      bgColor="bg-[#189BA3]"
                      className="my-6 text-white py-3 text-lg rounded-[24px]"
                      children="Book Now"
                      paddingX="px-12"
                    />
                  </Link>
                ) : !user ? (
                  <div className="relative group inline-block">
                    <ButtonTheme
                      bgColor="bg-[#189BA3]"
                      className="my-6 text-white py-3 text-lg rounded-[24px] opacity-60 cursor-not-allowed"
                      children="Book Now"
                      paddingX="px-12"
                      disabled={true}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2  w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      You need to login first
                    </div>
                  </div>
                ) : null}
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
            {/* Extract contact info from service.partner or similar object */}
            <ContactUs contactInfo={{
              email: servicesData?.data?.user?.email || '',
              phone: servicesData?.data?.phoneNumber || '',
              address: servicesData?.data?.location?.name || '',
              timings: servicesData?.data?.timings?.map((timing: any) =>
                `${timing.dayOfWeek}: ${timing.isClosed ? "Closed" : `${timing.openTime} - ${timing.closeTime}`}`
              ),
              location: {
                name: servicesData?.data?.location?.name || '',
                latitude: servicesData?.data?.location?.latitude || '',
                longitude: servicesData?.data?.location?.longitude || '',
              }
            }} />
          </div>
          <Blogs />
         
        </LayoutWrapper>
        <section className="mt-14">
          <NHSServicesCard
            serviceName={service.service?.name || ''}
            pharmacyName={servicesData?.data?.businessName || ''}
            pharmacyDescription={service.description || service.service?.description || ''}
            serviceId={service.service?.id || ''}
            partnerId={id as string}
            address={servicesData?.data?.location?.name || ''}
          />
        </section>
      </div>
    </PagesWrapper>
  );
};

export default PharmacyNestedPage;
