import { FileText } from "lucide-react";
import LayoutWrapper from "@/components/layout/wrapper";
import DynamicSection from "./DynamicSection";
import LoadingSkeleton from "./LoadingSkeleton";
import { ServiceContentProps, ServiceSection } from "@/lib/type";



const ServiceContent = ({ data, isLoading }: ServiceContentProps) => {
  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (!data) {
    return (
      <LayoutWrapper>
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
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
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
    </LayoutWrapper>
  );
};

export default ServiceContent; 