"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import PagesBanner from "@/components/pagesBanner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PharmacySlider from "@/components/pharmacySlider";
import FrequentlyAsked from "@/components/frequently-asked";
import { useGetServiceContent } from "@/lib/hooks";
import { ServiceContent, ServiceCallToAction } from "@/components/services";

const VaccinationServices = () => {
  return (
    <PagesWrapper
      bgColor="bg-[#189BA3]"
      isSearchPage={true}
      type={true}
      btnColor="#189BA3"
    >
      <div className="mt-52">
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
  const serviceId = searchParams.get("serviceId");

  const { data: serviceContent, isLoading } = useGetServiceContent(
    serviceId as string
  );

  const data = serviceContent?.data;

  return (
    <>
      <PagesBanner
        title={data?.name || serviceName}
        height="h-[200px]"
        textColor="white"
        fromColor="#189BA3"
        toColor="#189BA3"
        isDetail={true}
      />

      <ServiceContent data={data} isLoading={isLoading} />

      <div className="py-6">
        <PharmacySlider />
      </div>

      <FrequentlyAsked btnColor="#189BA3" />

      <ServiceCallToAction serviceName={serviceName} />
    </>
  );
};

export default VaccinationServices;
