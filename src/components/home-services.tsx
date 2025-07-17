"use client"
import React from "react";
import LayoutWrapper from "./layout/wrapper";
import DifferentServices from "./different-services";
import Notofound from "@public/images/notfound.jpg"
import Skeleton from "./ui/Skeleton";

interface HomeServicesProps {
  servicesData: any[];
  link: string;
  isNested: boolean;
}

const HomeServices = ({ servicesData, link, isNested }: HomeServicesProps) => {
  // Only show main services with children
  const mainServicesWithChildren = servicesData?.filter((main: any) => Array.isArray(main.children) && main.children.length > 0) || [];

  return (
    <section className="mb-12">
      <LayoutWrapper>
        {servicesData === undefined ? (
          <div>
            {/* Simulate 2 main service sections with 4 cards each */}
            {[1, 2].map((sectionIdx) => (
              <div key={sectionIdx} className="py-8">
                <div className="flex justify-between items-center">
                  <Skeleton className="w-48 h-8 mb-8" />
                  <Skeleton className="w-24 h-6 mb-8" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-lg overflow-hidden min-h-[200px]">
                      <Skeleton className="w-full h-[200px] rounded-[16px]" />
                      <div className="my-4">
                        <Skeleton className="w-32 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          mainServicesWithChildren.map((main: any) => (
            <div key={main.id}>
              <DifferentServices
                title={main.name}
                services={main.children.map((child: any) => ({
                  title: child.name,
                  image: child.image || Notofound, // You can set a default image or use child.image if available
                }))}
                link={link}
                isNested={isNested}
                viewAllLink={true}
              />
            </div>
          ))
        )}
        {/* <div className="flex justify-center items-center">
          <Link href={link}>
            <ButtonTheme
              bgColor="bg-[#52525B] hover:bg-[#52525B] px-12"
              textColor="text-white"
              paddingX="px-14"
              paddingY="py-3"
            >
              View All Services
            </ButtonTheme>
          </Link>
        </div> */}
        <div className="border-t-2 border-[#DCDCDC] mt-10"></div>
      </LayoutWrapper>
    </section>
  );
};

export default HomeServices;
