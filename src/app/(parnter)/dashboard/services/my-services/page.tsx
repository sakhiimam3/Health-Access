"use client";

import { useGetPartnerServices, useDeletePartnerService } from "@/lib/hooks";
import { Button } from "@/components/ui/button";
import { Eye, EyeIcon, Pencil, Trash2, FileText } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Pagination } from "@/components/ui/pagination";
import { DeleteModal } from "@/components/ui/delete-modal";
import { ServiceFormModal } from "@/components/services/service-form-modal";
import { isValidUrl } from "@/lib/isValidUrl";
import NotFound from "../../../../../../public/images/notfound.jpg";

const MyServiceListing = () => {
  const router = useRouter();  
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    isActive: undefined as boolean | undefined
  });
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<any>(null);

  const limit = 10;

  // Fetch services with the typeId from params
  const {
    data: services,
    isLoading,
    refetch,
  } = useGetPartnerServices({
    page,
    limit,
   
  });

  const { mutate: deleteService, isPending: isDeleting } = useDeletePartnerService(
    serviceToDelete || ""
  );
  
//   const handleDelete = (id: string) => {
//     setServiceToDelete(id);
//     setDeleteModalOpen(true);
//   };

  const handleEdit = (service: any) => {
    // Format the service data to match what the modal expects
    const formattedService = {
      price: service.service?.basePrice || 0,
      description: service.description || "",
      isActive: service.isActive || false,
      image: service.image || "",
    };
    
    setServiceToEdit({
      id: service.service.id,
      ...formattedService
    });
    setFormModalOpen(true);
  };

  // const confirmDelete = () => {
  //   if (serviceToDelete) {
  //     deleteService(undefined, {
  //       onSuccess: () => {
  //         toast.success("Service deleted successfully");
  //         setDeleteModalOpen(false);
  //         setServiceToDelete(null);
  //         refetch();
  //       },
  //       onError: (error) => {
  //         toast.error(error.message || "Failed to delete service");
  //       }
  //     });
  //   }
  // };

  // const handleFilterChange = (newFilters: {
  //   isActive: boolean | undefined;
  // }) => {
  //   setFilters({
  //     ...filters,
  //     ...newFilters
  //   });
  //   setPage(1); // Reset to first page when filters change
  // };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const clearFilters = () => {
    setFilters({
      isActive: undefined
    });
    setPage(1);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-teal-600">Services</h1>
        {/* <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <select
              value={filters.isActive === undefined ? "all" : filters.isActive ? "active" : "inactive"}
              onChange={(e) => handleFilterChange({ 
                isActive: e.target.value === "all" ? undefined : e.target.value === "active",
              })}
              className="border rounded px-3 py-2 text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            {filters.isActive !== undefined && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="h-8 px-2 text-gray-600 hover:text-gray-900"
              >
                Clear
              </Button>
            )}
          </div>
        
        </div> */}
      </div>

      <div className="rounded-md border">
        <table className="w-full border-collapse">
          <thead className="bg-teal-600">
            <tr>
              <th className="w-[80px] text-white text-left p-3">S.No</th>
              <th className="text-white text-left p-3">Image</th>
              <th className="text-white text-left p-3">Name</th>
              <th className="text-white text-left p-3">Base Price</th>
              <th className="text-white text-left p-3">Status</th>
              <th className="text-white text-left p-3">Created At</th>
              <th className="text-white text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index}>
                  <td className="p-3"><div className="h-4 w-8 bg-gray-200 animate-pulse"></div></td>
                  <td className="p-3"><div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div></td>
                  <td className="p-3"><div className="h-4 w-32 bg-gray-200 animate-pulse"></div></td>
                  <td className="p-3"><div className="h-4 w-20 bg-gray-200 animate-pulse"></div></td>
                  <td className="p-3"><div className="h-4 w-16 bg-gray-200 animate-pulse"></div></td>
                  <td className="p-3"><div className="h-4 w-32 bg-gray-200 animate-pulse"></div></td>
                  <td className="p-3"><div className="h-8 w-24 bg-gray-200 animate-pulse"></div></td>
                </tr>
              ))
            ) : services?.data && services.data.length > 0 ? (
              services.data?.map((service, index) => (
                <tr key={`${service.id}-${index}`} className="border-b">
                  <td className="p-3 font-medium">
                    {(page - 1) * limit + index + 1}
                  </td>
                  <td className="p-3">
                    <div className="h-10 w-10 relative">
                      {service.image ? (
                        <Image
                          src={isValidUrl(service.image) ? service.image : NotFound}
                          alt={service.service?.name || "Service"}
                          fill
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-xs text-gray-500">No img</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-3">{service.service?.name || "N/A"}</td>
                  <td className="p-3">${service.service?.basePrice || "N/A"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.isActive 
                        ? "bg-green-100 text-green-800" 
                        : "bg-red-100 text-red-800"
                    }`}>
                      {service.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center">
                      {/* <Button
                        onClick={() =>
                          router.push(`/dashboard/services/view/${service.id}`)
                        }
                        variant="ghost"
                        size="icon"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(service)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          router.push(`/dashboard/services/cms/${service.service?.id}`)
                        }
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                      {/* <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleDelete(service.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button> */}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <p className="text-lg font-medium">Services not found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {services?.total && services.total > limit && (
        <Pagination
          currentPage={page}
          totalPages={Math.ceil(services.total / limit)}
          onPageChange={handlePageChange}
        />
      )}

      {/* <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setServiceToDelete(null);
        }}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
        title="Delete Service"
        description="Are you sure you want to delete this service? This action cannot be undone."
      /> */}

      <ServiceFormModal
        isOpen={formModalOpen}
        onClose={() => {
          setFormModalOpen(false);
          setServiceToEdit(null);
        }}
        onSuccess={refetch}
        serviceId={serviceToEdit?.id}
        initialData={serviceToEdit}
      />
    </div>
  );
};

export default MyServiceListing;
