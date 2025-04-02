"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import React from "react";

import Image from "next/image";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons/icons";

const BlogDetails = () => {
  //   const searchParams = useSearchParams();

  return (
    <PagesWrapper type={false} bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={"Everything You Need to Know About the Flu Vaccine"}
          image="/images/pharmacy-detail.png"
          height="h-[200px]"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
          isDetail={true}
        />
        <LayoutWrapper>
          <div className="my-14">
            {/* Header Image Section */}
            <div className="relative mb-8 rounded-[10px] w-full h-[600px]">
              <Image
                src="/images/blogsDetial.png"
                alt="Vaccination scene"
                layout="fill"
                objectFit="cover"
                className="rounded-[10px]"
              />
              <div className="absolute inset-0 bg-black opacity-40 rounded-[10px]"></div>
              <div className="absolute inset-0 flex items-center justify-center text-white"></div>

              {/* Admin and Social Icons Section */}
              <div className="absolute  bottom-0 left-0 right-0 bg-white p-3 flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 border border-gray-300 rounded-full">
                    <AvatarImage src="/images/notfoundAvatar.png" />
                  </Avatar>
                  <div className="flex flex-col ">
                    <span className="text-sm text-[#189BA3] font-roboto ">
                      Admin
                    </span>
                    <span className="text-sm text-[#189BA3] font-roboto ">
                      01 Jan 2025 . 5 minutes read
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <FacebookIcon />
                  <InstagramIcon />
                  <XIcon />
                  <LinkedInIcon />
                </div>
              </div>
            </div>

            {/* Introduction Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Introduction
              </h2>
              <p className="paragraphColor text-sm font-roboto">
                The flu vaccine is a critical tool in safeguarding public
                health, especially during the flu season. It not only protects
                individuals but also helps prevent the spread of <br />{" "}
                influenza within communities. Understanding the importance,
                types, and recommendations associated with the flu vaccine can
                aid in making informed decisions about <br /> your health.{" "}
              </p>
            </section>

            {/* Importance of Flu Vaccine Section */}
            <section className="mb-8">
              <h2 className="text-2xl mb-4 font-semibold text-gray-800 mb-4">
                Importance of the Flu Vaccine
              </h2>
              <p className="paragraphColor text-sm font-roboto">
                Influenzas, commonly known as the flu, is a contagious
                respiratory illness caused by influenza viruses. It can lead to
                mild to severe illness and, at times, can result in <br />{" "}
                hospitalization or death. The Centers for Disease Control and
                Prevention (CDC) recommends annual flu vaccination for everyone
                aged 6 months and older, with rare <br /> exceptions.
                Vaccination is particularly important for individuals at higher
                risk of serious complications from the flu, including young
                children, older adults, pregnant <br /> women, and people with
                certain chronic health conditions.{" "}
              </p>
              <div className="relative my-12">
                <img
                  src="/images/blogsvaccine.png"
                  alt="Vaccine vials"
                  className="w-full h-[500px] object-cover rounded-lg"
                />
              </div>
            </section>

            {/* Types of Flu Vaccines Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Types of Flu Vaccines
              </h2>
              <p className="paragraphColor mb-2 text-sm font-roboto">
                Several types of flu vaccines are available, tailored to
                different age groups and health conditions:
              </p>
              <ul className="space-y-2 list-disc pl-5 text-paragraphColor font-roboto">
                <li>
                  <span className="font-medium">Standard-Dose Flu Shots:</span>{" "}
                  These are the most common and are suitable for most people
                  aged 6 months and older.
                </li>
                <li>
                  <span className="font-medium">High-Dose Flu Shots:</span>{" "}
                  Designed for individuals aged 65 and older, these vaccines
                  contain a higher dose to provide better protection.
                </li>
                <li>
                  <span className="font-medium">Adjuvanted Flu Shots:</span>{" "}
                  Also aimed at older adults, these vaccines include an adjuvant
                  to boost the body's immune response.
                </li>
                <li>
                  <span className="font-medium">
                    Live Attenuated Influenza Vaccine (LAIV):
                  </span>{" "}
                  Administered as a nasal spray, this vaccine is approved for
                  healthy individuals aged 2 through 49 years who are not
                  pregnant.
                </li>
              </ul>
              <p className="paragraphColor font-normal mt-4 text-sm font-roboto">
                It's essential to consult with a healthcare provider to
                determine the most appropriate vaccine type based on individual
                health status and age.{" "}
              </p>
            </section>

            {/* Timing of Vaccination Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold paragraphColor mb-4">
                Timing of Vaccination
              </h2>
              <p className="paragraphColor text-sm font-roboto">
                The ideal time to get vaccinated is before flu viruses begin
                spreading in your community, as it takes about two weeks after
                vaccination for antibodies to develop in the <br /> body. The
                CDC recommends getting vaccinated by the end of October.
                However, getting vaccinated later can still be beneficial, and
                vaccination should continue to be <br /> offered throughout the
                flu season.
              </p>
            </section>

            {/* Effectiveness of Flu Vaccine Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Effectiveness of the Flu Vaccine
              </h2>
              <p className="paragraphColor text-sm font-roboto">
                The effectiveness of the flu vaccine can vary from season to
                season and among different age and risk groups. Factors
                influencing effectiveness include the match <br /> between the
                vaccine viruses and circulating viruses and the individual's
                age and health status. While the vaccine may not prevent all
                cases of the flu, it has been shown <br /> to reduce the severity
                of illness in vaccinated individuals who get sick.
              </p>
            </section>

            {/* Safety and Side Effects Section */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold paragraphColor mb-4">
                Safety and Side Effects
              </h2>
              <p className="paragraphColor text-sm font-roboto">
                Flu vaccines have a strong safety record. Common side effects
                are generally mild and may include soreness at the injection
                site, low-grade fever, and aches. These side <br /> effects
                typically resolve within a few days. Severe allergic reactions
                are rare but can occur. Individuals with a history of severe
                allergic reactions to any component of the <br /> flu vaccine
                should consult their healthcare provider before vaccination.
              </p>
            </section>

            {/* Conclusion Section */}
            <section>
              <h2 className="text-2xl font-semibold paragraphColor mb-4">
                Conclusion
              </h2>
              <p className="paragraphColor text-sm font-roboto">
                Annual flu vaccination is a safe and effective way to protect
                yourself and others from influenza. By staying informed and
                getting vaccinated, you contribute to the <br /> broader effort
                of reducing flu-related illnesses and complications in the
                community.
              </p>
            </section>
          </div>
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

export default BlogDetails;
