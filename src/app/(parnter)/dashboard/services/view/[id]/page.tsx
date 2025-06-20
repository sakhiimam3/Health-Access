"use client";

import { useGetPartnerServiceDetails } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const ServiceDetails = () => {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.id as string;

  const { data: service, isLoading } = useGetPartnerServiceDetails(serviceId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Service not found</h1>
          <Button
            onClick={() => router.back()}
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-teal-600">Service Details</h1>
          <Button
            onClick={() => router.back()}
            variant="outline"
          >
            Back to List
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          {service.image && (
            <div className="relative h-48 w-full">
              <Image
                src={service.image}
                alt={service.name || "Service image"}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Name</h3>
              <p className="mt-1 text-lg text-gray-900">{service.name || "N/A"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Price</h3>
              <p className="mt-1 text-lg text-gray-900">${service.price || "N/A"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    service.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {service.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-gray-900 whitespace-pre-wrap">
              {service.description || "No description available"}
            </p>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              onClick={() => router.push(`/dashboard/services/edit/${serviceId}`)}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              Edit Service
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails; 