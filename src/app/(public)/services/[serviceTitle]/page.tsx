"use client";
import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import PagesBanner from "@/components/pagesBanner";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PharmacySlider from "@/components/pharmacySlider";
import ButtonTheme from "@/components/shared/ButtonTheme";
import FrequentlyAsked from "@/components/frequently-asked";
import { useGetServiceContent } from "@/lib/hooks";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, FileText, ImageIcon, Video } from "lucide-react";

interface ServiceSection {
  id: string;
  layout:
    | "one_column"
    | "two_column"
    | "three_column"
    | "two_by_two_column"
    | "three_by_three_column";
  title: string;
  columns: Array<{
    id: string;
    type: "text" | "image" | "video" | "list";
    content: string;
    columnOrder: number;
  }>;
}

const renderParsedContent = (content: string) => {
  try {
    return JSON.parse(content);
  } catch (error) {
    return content;
  }
};

const ContentTypeIcon = ({ type }: { type: string }) => {
  const iconProps = { className: "w-4 h-4" };

  switch (type) {
    case "text":
    case "list":
      return <FileText {...iconProps} />;
    case "image":
      return <ImageIcon {...iconProps} />;
    case "video":
      return <Video {...iconProps} />;
    default:
      return <FileText {...iconProps} />;
  }
};

const DynamicSection = ({ section }: { section: ServiceSection }) => {
  const isOneColumn = section.layout === "one_column";
  const isThreeByThree = section.layout === "three_by_three_column";

  const getGridClasses = () => {
    switch (section.layout) {
      case "two_column":
        return "lg:grid-cols-2";
      case "three_column":
        return "lg:grid-cols-3";
      case "two_by_two_column":
        return "grid-cols-1 sm:grid-cols-2";
      case "three_by_three_column":
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <section className="py-12 px-4">
      <div className="mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 text-[#189BA3] border-[#189BA3]"
          >
            {section.layout.replace(/_/g, " ").toUpperCase()}
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {section.title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#189BA3] to-[#14a085] mx-auto rounded-full"></div>
        </div>

        {/* Content Grid */}
        <div
          className={`grid gap-6 ${getGridClasses()} ${
            isOneColumn ? "mx-auto" : ""
          }`}
        >
          {section.columns
            .sort((a, b) => a.columnOrder - b.columnOrder)
            .map((column, index) => (
              <Card
                key={column.id}
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-1 ${
                  isOneColumn ? "text-center" : ""
                } ${column.content === "" ? "opacity-50" : ""}`}
              >
                <CardContent className="p-0 h-full">
                  {/* Content Type Header */}
                  <div className="flex items-center gap-2 p-4 bg-gradient-to-r from-[#189BA3]/5 to-[#14a085]/5 border-b">
                    <ContentTypeIcon type={column.type} />
                    <span className="text-sm font-medium text-[#189BA3] capitalize">
                      {column.type}
                    </span>
                  </div>

                  <div className="p-6">
                    {column.type === "text" && (
                      <div className="prose prose-lg max-w-none">
                        <div
                          className="text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: renderParsedContent(column.content),
                          }}
                        />
                      </div>
                    )}

                    {column.type === "image" && column.content && (
                      <div className="relative aspect-video rounded-lg overflow-hidden group-hover:scale-[1.02] transition-transform duration-300">
                        <Image
                          src={column.content || "/placeholder.svg"}
                          alt={section.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    )}

                    {column.type === "video" && column.content && (
                      <div className="relative rounded-lg overflow-hidden">
                        <video
                          src={column.content}
                          controls
                          className="w-full aspect-video rounded-lg"
                          poster="/placeholder.svg?height=400&width=600"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/50 text-white border-0">
                            <Play className="w-3 h-3 mr-1" />
                            Video
                          </Badge>
                        </div>
                      </div>
                    )}

                    {column.type === "list" && (
                      <div className="prose prose-lg max-w-none">
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{
                            __html: renderParsedContent(column.content),
                          }}
                        />
                      </div>
                    )}

                    {column.content === "" && (
                      <div className="flex items-center justify-center h-32 text-gray-400">
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center">
                            <ContentTypeIcon type={column.type} />
                          </div>
                          <p className="text-sm">No content available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </section>
  );
};

const LoadingSkeleton = () => (
  <div className="mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <div className="w-24 h-6 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
      <div className="w-64 h-8 bg-gray-200 rounded mx-auto mb-4 animate-pulse"></div>
      <div className="w-24 h-1 bg-gray-200 rounded mx-auto animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="h-4 bg-gray-200 animate-pulse"></div>
          <div className="p-6">
            <div className="w-full h-48 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const VaccinationServices = () => {
  return (
    <PagesWrapper
      bgColor="bg-[#189BA3]"
      isSearchPage={true}
      type={true}
      btnColor="#189BA3"
    >
      <div className="mt-56">
        <Suspense fallback={<LoadingSkeleton />}>
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

{/*       
      {data && (
        <div className="bg-gradient-to-b from-[#189BA3]/5 to-white py-12">
          <LayoutWrapper>
            <div className="mx-auto text-center">
              {data.image && (
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg">
                  <Image
                    src={data.image || "/images/notfound.jpg"}
                    alt={data.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {data.name}
              </h1>
              {data.description && (
                <p className="text-xl text-gray-600 leading-relaxed">
                  {data.description}
                </p>
              )}
              {data.category && (
                <Badge variant="secondary" className="mt-4">
                  {data.category.name}
                </Badge>
              )}
            </div>
          </LayoutWrapper>
        </div>
      )} */}

      <LayoutWrapper>
        {isLoading ? (
          <LoadingSkeleton />
        ) : data ? (
          <>
            {data.sections && data.sections.length > 0 ? (
              <div className="space-y-4">
                {data.sections.map((section: ServiceSection) => (
                  <DynamicSection key={section.id} section={section} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Content Available
                </h3>
                <p className="text-gray-600">
                  No sections found for this service.
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
              <FileText className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Service Not Found
            </h3>
            <p className="text-gray-600">
              The requested service content could not be found.
            </p>
          </div>
        )}
      </LayoutWrapper>

      <div className="py-6">
        <PharmacySlider />
      </div>

      <FrequentlyAsked btnColor="#189BA3" />

      <section
        className="w-full flex items-center h-[300px] bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            serviceName === "Travel Vaccines"
              ? "url('/images/partner-bg-1.png')"
              : "url('/images/bg-2.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <LayoutWrapper>
          <div className="grid md:grid-cols-2 w-full max-w-[1320px] relative z-10">
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
                <p className="text-white text-xl font-roboto">
                  Stay protected wherever you go! Find a nearby pharmacy and{" "}
                  <br /> book your travel vaccines now.
                </p>
              ) : (
                <p className="text-white text-xl font-roboto">
                  Don&apos;t wait until it&apos;s too late – take action today!
                  Find a Pharmacy Near You to explore personalized hair loss
                  solutions.
                </p>
              )}

              <ButtonTheme
                bgColor="bg-[#189BA3]"
                className="my-6 w-[200px] text-white py-3 text-lg rounded-[24px] hover:bg-[#14a085] transition-colors duration-300"
                children="Book Now"
                paddingX="px-12"
              />
            </div>
          </div>
        </LayoutWrapper>
      </section>
    </>
  );
};

export default VaccinationServices;
