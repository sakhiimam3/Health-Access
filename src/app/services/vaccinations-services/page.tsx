"use client";
import Blogs from "@/components/Blogs";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import VaccineSection from "@/components/vaccineSection";
import TravelVaccines from "@/components/travelVaccines";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import VitaminInfo from "@/components/VitaminInfo";
import PharmacySlider from "@/components/pharmacySlider";
import ButtonTheme from "@/components/shared/ButtonTheme";
import DifferentServices from "@/components/different-services";

const VaccinationServices = () => {
  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <Suspense fallback={<div>Loading...</div>}>
          <Content />
        </Suspense>
      </div>
    </PagesWrapper>
  );
};

const Content = () => {
  const searchParams = useSearchParams();
  const serviceName = searchParams.get("serviceName")?.replace(/-/g, " ");

  const vaccines = [
    {
      name: "Hepatitis A",
      description:
        "Spread through contaminated food and water, common in many developing countries.",
    },
    {
      name: "Typhoid",
      description:
        "A bacterial infection spread through contaminated food and water, especially in South Asia, Africa, and South America.",
    },
    {
      name: "Yellow Fever",
      description:
        "Required for entry into some countries in Africa and South America. A single dose provides lifelong protection.",
    },
    {
      name: "Rabies",
      description:
        "Recommended for travelers visiting rural areas where they may come into contact with wild or domestic animals.",
    },
    {
      name: "Cholera",
      description:
        "Spread through contaminated water, prevalent in regions with poor sanitation and natural disasters.",
    },
    {
      name: "Meningitis (ACWY)",
      description:
        "Recommended for travelers to the 'Meningitis Belt' in Africa and required for those performing Hajj or Umrah in Saudi Arabia.",
    },
  ];

  const mensHealthVaccines = [
    {
      title: "Male Pattern Baldness (Androgenetic Alopecia)",
      points: [
        "The most common cause of hair loss in men, affecting around 50% of men over 50.",
        "It's caused by a genetic sensitivity to DHT, which shrinks hair follicles over time.",
        "Typically starts with a receding hairline and thinning at the crown.",
      ],
    },
    {
      title: "Stress & Lifestyle Factors",
      points: [
        "High stress levels can lead to temporary hair loss (telogen effluvium).",
        "Poor diet lacking essential nutrients like iron, zinc, and biotin can weaken hair.",
        "Smoking and excessive alcohol consumption can contribute to hair thinning.",
      ],
    },
    {
      title: "Medical Conditions & Medications",
      points: [
        "Certain conditions like thyroid disorders, anemia, and scalp infections can cause hair loss.",
        "Medications for high blood pressure, depression, and chemotherapy can lead to hair thinning.",
      ],
    },
    {
      title: "Nutritional Deficiencies",
      points: [
        "Lack of iron, zinc, vitamin D, or protein can weaken hair and slow growth.",
        "Poor diet, crash dieting, or medical conditions like anemia may contribute.",
      ],
    },
  ];

  const servicesData = [
    {
      image: "/images/vs-2.png",
      title: "Weight Management",
    },
    {
      image: "/images/vs-3.png",
      title: "Vitamin B12 Injections",
    },
    {
      image: "/images/vs-4.png",
      title: "Yellow Fever Clinic",
    },
    {
      image: "/images/cs-4.png",
      title: "Anti-Sweat Injections",
    },
  ];

  const treatmentPrevention = [
    {
      title: "Prescription Medications",
      points: [
        "A daily oral tablet that blocks DHT, helping slow and even reverse hair loss.",
        "A typical treatment applied to the scalp to stimulate hair regrowth.",
      ],
    },
    {
      title: "Hair Growth Supplements",
      points: [
        "Biotin, zinc, iron, and vitamin D promote healthy hair growth.",
        "Collagen and keratin supplements support hair strength.",
      ],
    },
    {
      title: "Lifestyle & Natural Remedies",
      points: [
        "A balanced diet rich in protein and omega-3 fatty acids helps maintain strong hair.",
        "Regular scalp massages can improve blood circulation and follicle health.",
        "Reducing stress through exercise, meditation, and better sleep can prevent stress-related hair loss.",
      ],
    },
    {
      title: "Advanced Hair Restoration Treatments",
      points: [
        "PRP Therapy (Platelet-Rich Plasma): Uses your own blood plasma to stimulate hair growth.",
        "Laser Therapy: Low-level laser light can encourage hair regrowth.",
        "Hair Transplants: A permanent solution where hair follicles are moved from one part of the scalp to another.",
      ],
    },
  ];

  return (
    <>
      <PagesBanner
        title={serviceName}
        height="h-[200px]"
        textColor="white"
        fromColor="#189BA3"
        toColor="#189BA3"
        isDetail={true}
      />
      <LayoutWrapper>
        <VaccineSection
          title="Why Travel Vaccines Are Important"
          description="Traveling exposes you to different environments, climates, and health risks. Many countries have infectious diseases that are uncommon in your home country. Travel vaccines protect you against these diseases and ensure you have a safe and healthy journey. Some vaccines are even required for entry into certain countries."
        imageSrc={
          serviceName === "Travel Vaccines"
            ? "/images/travel-vaccine.png"
            : "/images/mensHealth.png"
        }
        buttonText="Book Now"
      />
      <TravelVaccines
        title={
          serviceName === "Travel Vaccines"
            ? "Common Travel Vaccines"
            : "Common Causes of Hair Loss in Men"
        }
        vaccines={vaccines}
        mensHealthVaccines={mensHealthVaccines}
      />
      <section className="py-6">
        <VitaminInfo
          title="When to Get Vaccinated?"
          description="It's recommended to get vaccinated 4-6 weeks before travel, as some vaccines require multiple doses for full protection. Check with a travel health specialist to plan your vaccinations based on your itinerary."
          imageSrc="/images/checkup.png"
          isReverse={false}
        />
      </section>
      {serviceName !== "Travel Vaccines" && (
        <section>
          <TravelVaccines
            title={"Treatment & Prevention of Male Pattern Baldness"}
            mensHealthVaccines={treatmentPrevention}
          />
        </section>
      )}
      <div className="py-6">
        <PharmacySlider />
      </div>
      {serviceName === "Travel Vaccines" && <Blogs />}
      <section
        className={`w-full flex items-center  h-[300px]  bg-cover bg-center bg-no-repeat`}
        style={{
          backgroundImage:
            serviceName === "Travel Vaccines"
              ? "url('/images/partner-bg-1.png')"
              : "url('/images/bg-2.png')",
        }}
      >
        <LayoutWrapper>
          <div className="grid md:grid-cols-2 w-[1320px]">
            <div>
              {serviceName === "Travel Vaccines" ? (
                <h1 className="text-3xl leading-relaxed font-bold text-white md:text-4xl lg:text-5xl">
                  Book Your Travel <br /> Vaccines Today
                </h1>
              ) : (
                <h1 className="text-3xl leading-relaxed font-bold text-white md:text-4xl lg:text-5xl">
                  Book a Consultation for <br /> Hair Loss Treatment
                </h1>
              )}
            </div>
            <div className="flex flex-col gap-6">
              {serviceName === "Travel Vaccines" ? (
                <p className="text-white mx-w-[30px] text-xl font-roboto">
                  Stay protected wherever you go! Find a nearby pharmacy and{" "}
                  <br /> book your travel vaccines now.
                </p>
              ) : (
                <p className="text-white mx-w-[30px] text-xl font-roboto">
                  Don&apos;t wait until it&apos;s too late – take action today!
                  Find a Pharmacy Near You to explore personalized hair loss
                  solutions.
                </p>
              )}

              <ButtonTheme
                bgColor="bg-[#189BA3]"
                className="my-6 w-[200px] text-white py-3 text-lg rounded-[24px]"
                children="Book Now"
                paddingX="px-12"
              />
            </div>
          </div>
        </LayoutWrapper>
      </section>
      <LayoutWrapper>
        {serviceName === "Travel Vaccines" ? (
          <div className="py-12">
            <DifferentServices
              title="Related Services"
              services={servicesData}
              type="vaccination"
              link="/services"
              isNested={false}
              viewAllLink={false}
            />
          </div>
        ) : (
          <Blogs />
        )}
      </LayoutWrapper>
    </LayoutWrapper>
    </>
  );
};

export default VaccinationServices;
