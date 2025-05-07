"use client";
import React from "react";
import { useParams } from "next/navigation";
import Breadcrumb from "@/components/breadcrum";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import PagesBanner from "@/components/pagesBanner";
import LayoutWrapper from "@/components/layout/wrapper";
import Blogs from "@/components/Blogs";
import ContactUs from "@/components/contactus";
import ButtonTheme from "@/components/shared/ButtonTheme";
import Image from "next/image";
import VitaminInfo from "@/components/VitaminInfo";

const PharmacyNestedPage = () => {
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={"Vitamin B12 Injection Service in Warburtons Pharmacy "}
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
                Vitamin B12 Injection
              </h2>
              <div className="mb-5">
                <p className="paragraphColor text-md font-roboto mb-5 ">
                  Are you looking for a private vitamin b12 injection service in
                  Islington? Now you can book a vitamin b12 injection with
                  Carters Chemist online. Simply select a convenient time and
                  complete a short medical screening form. One of our
                  prescribers will review your order and once approved, you can
                  attend your appointment to get the vitamin b12 injection
                  in-store.
                </p>
                <p className="paragraphColor text-md font-roboto ">
                  The vitamin b12 injection is an efficient way to boost your
                  b12 levels. The cost of the vitamin b12 injection service is
                  £29.{" "}
                </p>
                <ButtonTheme
                  bgColor="bg-[#189BA3]"
                  className="my-6 text-white py-3  text-lg rounded-[24px]"
                  children="Book Now"
                  paddingX="px-12"
                 
                />
              </div>
            </div>
            <div className="relative w-full h-[650px] mb-6 bg-white rounded-lg">
              {/* Left image - positioned at the top-left */}
              <div className="absolute left-0  top-0 w-1/2 p-4">
                <Image
                  src="/images/blog-1.png"
                  alt="Healthcare professional administering a vaccine to a patient"
                  width={400}
                  height={300}
                  className="w-full rounded-lg "
                />
              </div>

              <div className="absolute right-0 bottom-0 w-1/2 p-4">
                <Image
                  src="/images/vacine-sample.png"
                  alt="Laboratory-samples"
                  width={400}
                  height={300}
                  objectFit="cover"
                  className="w-full rounded-lg "
                />
              </div>
            </div>
            <div className="border-t-2 border-gray-200 mt-24"></div>
          </section>
          <section className="my-16">
            <VitaminInfo
              title="What is Vitamin B12?"
              description="Vitamin B12, also known as cobalamine, is a water-soluble vitamin that is naturally found in some foods. Due to limited dietary intake, insufficiency or deficiency is relatively common(1). Those who follow a vegetarian or vegan diet are more likely to be deficient as Vitamin B12 is mainly found in animal-based products."
              imageSrc="/images/b12.png"
            />
          </section>
          <section className="my-16">
            <VitaminInfo
              title="What are the main symptoms of Vitamin B12 deficiency?"
              description="The symptoms and severity of symptoms vary between individuals but the main symptoms associated with vitamin B12 deficiency are:"
              imageSrc="/images/b2-defecency.png"
              isReverse={true}
            />
          </section>

          <section className="my-16">
            <VitaminInfo
              title="How is the Vitamin B12 injection given?"
              description="The vitamin B12 injection is available in the UK as Hydroxocobalamin 1000mcg/1ml intramuscular injection. The injection is given in the upper arm just below the shoulder (deltoid muscle) by a fully-trained pharmacist or a pharmacy technician. The injection is given once your online consultation has been reviewed and authorised by one of our doctors/prescribers."
              description2="If you are unwell on the day of your appointment or the pharmacist finds that the b12 injection is not appropriate through this service, they will either reschedule your appointment or sign-post you to another service such as your GP, NHS 111 or the A&E."
              imageSrc="/images/vitamin-b2-given.png"
            />
          </section>

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
