"use client"
import React from "react";
import LayoutWrapper from "./layout/wrapper";
import DifferentServices from "./different-services";
import ButtonTheme from "./shared/ButtonTheme";
import Link from "next/link";
import { useHomeServices } from "@/lib/hooks";
import Notofound from "@public/images/notfound.jpg"
const homeServices = ({link, isNested}: {link: string, isNested: boolean}) => {
  const { data:servicesData, isLoading, error, refetch } = useHomeServices();

  // Only show main services with children
  const mainServicesWithChildren = servicesData?.data?.services?.filter((main: any) => Array.isArray(main.children) && main.children.length > 0) || [];
 console.log(mainServicesWithChildren,"mmm")
  return (
    <section className="mb-12">
      <LayoutWrapper>
        {mainServicesWithChildren.map((main: any) => (
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
        ))}
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

export default homeServices;
