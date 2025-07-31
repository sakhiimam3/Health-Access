"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import PagesBanner from "@/components/pagesBanner";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useGetServices } from "@/lib/hooks";
import { Suspense } from "react";
import Image from "next/image";
import LayoutWrapper from "@/components/layout/wrapper";
import Link from "next/link";
import isValidUrl from "@/lib/isValidUrl";
import ImageNotExist from "@public/images/notfound.jpg";

const ServiceCarousel = ({ parentService, router }) => {
  // Fetch child services for this parent
  const {
    data: childServices,
    isLoading: childLoading,
    error: childError,
  } = useGetServices({
    parentId: parentService.id || "",
  });

  if (childLoading) {
    return (
      <div className="my-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
            {parentService.name || parentService.title || "Loading..."}
          </h2>
        </div>
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#189BA3]"></div>
        </div>
      </div>
    );
  }

  if (childError || !childServices?.data?.length) {
    return (
      <div className="my-20">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
            {parentService.name || parentService.title}
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-[#52525B]">
            No services available in this category.
          </p>
        </div>
      </div>
    );
  }

  // Check if we have enough services to show carousel navigation
  const showNavigation = childServices?.data.length > 4;

  return (
    <div className="my-20">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold mb-8 text-[#52525B]">
          {parentService.name || parentService.title}
        </h2>
        {showNavigation && (
          <div>
            <Link
              href="#"
              className="underline text-[#52525B] hover:text-teal-500"
            >
              View All
            </Link>
          </div>
        )}
      </div>

      {childServices?.data?.length <= 2 ? (
        // Show as grid for 1-2 items (like Women's Health Services)
        <div className="flex gap-4">
          {childServices?.data?.map((service, index) => (
            <div
              key={service.id || index}
              className="w-[50%] cursor-pointer"
              onClick={() => {
                const slug = (service.title || service.name || "service").replace(/\s+/g, "-");
                router.push(
                  `/services/${slug}?serviceName=${service.name || service.title || "Service"}&serviceId=${service?.id}`
                );
              }}
            >

              <div className="h-[200px] relative overflow-hidden">
                <Image
                  src={
                    isValidUrl(service.image) ? service.image : ImageNotExist
                  }
                  alt={service.name || service.title}
                  fill
                  style={{ objectFit: "cover", width: "100%" }}
                  className="rounded-[16px]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-6 text-[#52525B] text-md font-[700] font-ubantu">
                {service.name || service.title}
              </h3>
            </div>
          ))}
        </div>
      ) : (
        // Show as carousel for 3+ items
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent className="gap-2">
              {childServices?.data?.map((service, index) => (
                <CarouselItem
                  onClick={() =>
                    router.push(
                      `/services/${service.name.replace(/\s+/g, "-")}?serviceName=${
                        service.name || service.title
                      }&serviceId=${service?.id}`
                    )
                  }
                  key={index}
                  className="pl-2 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 cursor-pointer"
                >
                  <div className="rounded-lg overflow-hidden min-h-[200px]">
                    <div className="relative rounded">
                      <Image
                        src={
                          isValidUrl(service.image) ?
                          service.image 
                           : ImageNotExist
                        }
                        alt={service.name || service.title}
                        width={354}
                        height={200}
                        className="rounded-[16px] object-cover h-[200px]"
                        priority
                      />
                    </div>
                    <div className="my-4">
                      <h3 className="text-md text-[#52525B] font-[700] font-ubantu">
                        {service.name || service.title}
                      </h3>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {showNavigation && (
              <div className="absolute bottom-[-30px] right-12 flex gap-1">
                <CarouselPrevious className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
                <CarouselNext className="group bg-white shadow-lg rounded-full p-2 transition-colors duration-300 hover:bg-gray-200 active:bg-gray-300" />
              </div>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

const PharmacyServices = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "N/A";
  const typeid = searchParams.get("typeid") || undefined;

  // Fetch parent services by typeid
  const {
    data: parentServices,
    isLoading: parentLoading,
    error: parentError,
  } = useGetServices({
    typeId: typeid || "",
  });

  console.log(parentServices, "parentServices");

  if (parentLoading) {
    return (
      <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
        <div className="mt-56">
          <PagesBanner
            title={name}
            image="/images/phr-banner.png"
            height="h-60"
            textColor="white"
            fromColor="#189BA3"
            toColor="#189BA3"
          />
          <LayoutWrapper>
            <div className="my-20 flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#189BA3] mx-auto mb-4"></div>
                <p className="text-[#52525B]">Loading services...</p>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </PagesWrapper>
    );
  }

  if (parentError || !parentServices?.data?.length) {
    return (
      <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
        <div className="mt-56">
          <PagesBanner
            title={name}
            image="/images/phr-banner.png"
            height="h-60"
            textColor="white"
            fromColor="#189BA3"
            toColor="#189BA3"
          />
          <LayoutWrapper>
            <div className="my-20 flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <p className="text-[#52525B]">No services found.</p>
              </div>
            </div>
          </LayoutWrapper>
        </div>
      </PagesWrapper>
    );
  }

  return (
    <PagesWrapper bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <div className="mt-56">
        <PagesBanner
          title={name}
          image="/images/phr-banner.png"
          height="h-60"
          textColor="white"
          fromColor="#189BA3"
          toColor="#189BA3"
        />
        <LayoutWrapper>
          {parentServices?.data?.map((parentService, parentIndex) => (
            <ServiceCarousel
              key={parentService.id || parentIndex}
              parentService={parentService}
              router={router}
            />
          ))}
        </LayoutWrapper>
      </div>
    </PagesWrapper>
  );
};

const PharmacyServicesPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PharmacyServices />
  </Suspense>
);

export default PharmacyServicesPage;
