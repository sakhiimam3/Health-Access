"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React, { Suspense } from "react";
import consultant from "@public/images/consultant.png";
import { useParams } from "next/navigation";
import Image from "next/image";
import VaccinationPriceList from "@/components/vaccinationTable";
import NHSServicesCard from "@/components/NHSServicesCard";
import ContactUs from "@/components/contactus";
import { useGetPartners, useGetPublicPartnerServices } from "@/lib/hooks";
import pharmacy1 from "@public/images/pharmacy-1.png";
import Link from "next/link";
import isValidUrl from "@/lib/isValidUrl";

const PharmacyDetails = () => {
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <Suspense fallback={<div>Loading...</div>}>
        <PharmacyContent />
      </Suspense>
    </PagesWrapper>
  );
};

const PharmacyContent = () => {
  const { id } = useParams();
  const { data: partnersData, isLoading: partnersLoading } = useGetPartners();
  const { data: servicesData, isLoading: servicesLoading } = useGetPublicPartnerServices(id as string);
 
  const pharmacy = partnersData?.data?.find((pharmacy: any) => pharmacy?.id === id);
  const pharmacyName = pharmacy?.businessName.replace(/\s+/g, "-");
  const imageSrc = typeof pharmacy?.image === "string" ? pharmacy?.image : pharmacy1.src;

  if (partnersLoading || servicesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-56">
      <PagesBanner
        title={pharmacyName || ""}
        image="/images/pharmacyDetail.png"
        height="h-[300px]"
        textColor="white"
        fromColor="#189BA3"
        toColor="#189BA3"
        isDetail={false}
      />
      <LayoutWrapper>
        <section>
          <div className="grid lg:grid-cols-2 gap-6 my-16">
            <h2 className="text-2xl md:text-3xl max-w-[800px] font-bold leading-tight">
              {pharmacy?.businessName || "Your Trusted Local Pharmacy"}
            </h2>
            <div className="relative after:absolute after:w-4 after:h-0.5 after:-bottom-8 after:left-0 after:bg-[pink] before:absolute before:w-4 before:h-0.5 before:-top-8 before:left-0 before:bg-[#189BA3] mb-5">
              <p className="paragraphColor text-md font-roboto">
                {pharmacy?.description || `${pharmacyName} is a trusted and community-focused independent pharmacy located in ${pharmacy?.location?.name || 'your area'}. We are dedicated to offering exceptional healthcare solutions and building strong relationships with every customer.`}
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="h-[600px] w-[92%] rounded-lg relative">
            <img
              src={imageSrc}
              alt={"pharmacy-detail"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <div className="absolute top-[50px] right-[-100px] h-[250px] w-[240px] z-10">
              <Image
                src={consultant}
                alt={"pharmacy-small-detail"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="border-t-1 border-[#DCDCDC] mt-10"></div>
        </section>
        <section>
          <div className="text-3xl text-center font-bold my-14">
            Our Services
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 my-12 lg:grid-cols-3 gap-6">
            {servicesData?.data?.services?.map((service: any) => (
              <Link 
                href={`/pharmacy/${id}/${pharmacyName}?service=${service.service.id}`} 
                key={service.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="h-48 relative mb-4">
                  <Image
                    src={isValidUrl(service.service.image) ? service.service.image : "/images/notfound.jpg"}
                    alt={service.service.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.service.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{service.description || service.service.description}</p>
                <p className="text-[#189BA3] font-semibold">£{service.price}</p>
              </Link>
            ))}
          </div>
        </section>
        <section>
          <VaccinationPriceList />
        </section>
      </LayoutWrapper>
      {/* <section className="mt-14">
        <NHSServicesCard />
      </section> */}
      <LayoutWrapper>
        <section>
          <ContactUs  contactInfo={{
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
        </section>
      </LayoutWrapper>
    </div>
  );
};

export default PharmacyDetails;
