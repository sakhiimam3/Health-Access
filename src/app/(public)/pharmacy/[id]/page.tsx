"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React, { Suspense, useState } from "react";

import consultant from "@public/images/consultant.png";
import warbunsdeatil from "@public/images/warbunsdeatil.png";
import { useParams } from "next/navigation";
import ButtonTheme from "@/components/shared/ButtonTheme";
import Image from "next/image";
import HomeServices from "@/components/home-services";
import VaccinationPriceList from "@/components/vaccinationTable";
import NHSServicesCard from "@/components/NHSServicesCard";
// import { ClockIcon, EmailIcon, LocationIcon, SupportIcon } from "@/components/icons/icons";
import ContactUs from "@/components/contactus";
import { partners } from "@/mockdata";
import { useGetPartners } from "@/lib/hooks";
import Modal from "@/components/modal";
import pharmacy1 from "@public/images/pharmacy-1.png";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, error, refetch } = useGetPartners();
  console.log(data, "data1111");

  const pharmacy = data?.data?.find((pharmacy: any) => pharmacy?.id === id);
  const pharmacyName = pharmacy?.businessName.replace(/\s+/g, "-");
  const imageSrc =
    typeof pharmacy?.image === "string" ? pharmacy?.image : pharmacy1.src;

  return (
    <div className="mt-56">
      <PagesBanner
        title={pharmacyName}
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
              Your Trusted Local Pharmacy for NHS and Private Services{" "}
            </h2>
            <div className="relative after:absolute after:w-4 after:h-0.5 after:-bottom-8 after:left-0 after:bg-[pink] before:absolute before:w-4 before:h-0.5 before:-top-8 before:left-0 before:bg-[#189BA3] mb-5">
              <p className="paragraphColor text-md font-roboto ">
                Warburtons Pharmacy is a trusted and community-focused
                independent pharmacy located in{" "}
                <span className="text-[#189BA3] hover:underline cursor-pointer">
                  Manchester, M3 2FW
                </span>
                . Renowned for its friendly service and personalized care,
                Warburtons Pharmacy is dedicated to offering exceptional
                healthcare solutions and building strong relationships with
                every customer.
              </p>
              <ButtonTheme
                bgColor="bg-[#189BA3]"
                className="my-6 text-white py-3  text-lg rounded-[24px]"
                children="Book Now"
                paddingX="px-12"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="h-[600px] w-[92%] rounded-lg  relative">
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
          <div className="text-3xl  text-center font-bold my-14">
            Our Services
          </div>

          <HomeServices isNested={false} link={`/services`} />
        </section>
        <section>
          <VaccinationPriceList />
        </section>
      </LayoutWrapper>
      <section className="mt-14">
        <NHSServicesCard />
      </section>
      <LayoutWrapper>
        <section>
          <ContactUs />
        </section>
      </LayoutWrapper>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default PharmacyDetails;
