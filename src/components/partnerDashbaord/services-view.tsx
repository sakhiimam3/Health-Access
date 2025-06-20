"use client";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Loader2, Check, FileText } from "lucide-react";
import {
  useGetServices,
  useGetSeriveTypes,
  useGetMyServices,
  useGetPartnerProfile,
  useUpdatePartnerProfile,
} from "@/lib/hooks";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function ServicesView() {
  const router = useRouter();
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [selectedSubParentId, setSelectedSubParentId] = useState<string | null>(
    null
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Cache for service relationships to improve counting logic
  const [serviceRelationships, setServiceRelationships] = useState<{
    childToParent: Record<string, string>;
    subChildToChild: Record<string, string>;
    mainServiceTypes: Record<string, string>;
  }>({
    childToParent: {},
    subChildToChild: {},
    mainServiceTypes: {},
  });

  // Fetch service types
  const { data: serviceTypesData, isLoading: typesLoading } =
    useGetSeriveTypes();

  // Fetch my selected services
  const {
    data: myServicesData,
    isLoading: myServicesLoading,
    refetch: refetchMyServices,
  } = useGetMyServices();

  // Get partner profile for update
  const { data: partnerProfileData } = useGetPartnerProfile();

  // Update services mutation
  const { mutate: updateProfile, isPending: isProfileUpdating } =
    useUpdatePartnerProfile();

  // Fetch main services based on selected type
  const { data: mainServicesData, isLoading: mainServicesLoading } =
    useGetServices({
      typeId: selectedTypeId || undefined,
    });

  // Fetch child services based on selected parent
  const { data: childServicesData, isLoading: childServicesLoading } =
    useGetServices({
      parentId: selectedParentId || undefined,
    });

  // Fetch sub-child services based on selected sub-parent
  const { data: subChildServicesData, isLoading: subChildServicesLoading } =
    useGetServices({
      parentId: selectedSubParentId || undefined,
    });

  // Initialize selectedServices with myServicesData
  useEffect(() => {
    if (myServicesData?.data?.length > 0) {
      setSelectedServices(myServicesData.data);
    }
  }, [myServicesData]);

  // Set initial service type selection
  useEffect(() => {
    if (serviceTypesData?.data?.length > 0 && !selectedTypeId) {
      const firstType = serviceTypesData.data[0];
      setSelectedTypeId(firstType.id);
    }
  }, [serviceTypesData, selectedTypeId]);

  // Reset selections when main services are empty
  useEffect(() => {
    if (!mainServicesData?.data?.length) {
      setSelectedParentId(null);
      setSelectedSubParentId(null);
    }
  }, [mainServicesData]);

  // Update service relationships for main services
  useEffect(() => {
    if (mainServicesData?.data) {
      const mainTypes: Record<string, string> = {};
      mainServicesData.data.forEach((service) => {
        if (service.typeId) {
          mainTypes[service.id] = service.typeId;
        }
      });

      setServiceRelationships((prev) => ({
        ...prev,
        mainServiceTypes: { ...prev.mainServiceTypes, ...mainTypes },
      }));
    }
  }, [mainServicesData]);

  // Update service relationships for child services
  useEffect(() => {
    if (childServicesData?.data && selectedParentId) {
      const childToParent: Record<string, string> = {};
      childServicesData.data.forEach((service) => {
        if (service.parentId) {
          childToParent[service.id] = service.parentId;
        }
      });

      setServiceRelationships((prev) => ({
        ...prev,
        childToParent: { ...prev.childToParent, ...childToParent },
      }));
    }
  }, [childServicesData, selectedParentId]);

  // Update service relationships for sub-child services
  useEffect(() => {
    if (subChildServicesData?.data && selectedSubParentId) {
      const subChildToChild: Record<string, string> = {};
      subChildServicesData.data.forEach((service) => {
        if (service.parentId) {
          subChildToChild[service.id] = service.parentId;
        }
      });

      setServiceRelationships((prev) => ({
        ...prev,
        subChildToChild: { ...prev.subChildToChild, ...subChildToChild },
      }));
    }
  }, [subChildServicesData, selectedSubParentId]);

  // Check if a service has children
  const hasChildren = (serviceId: string) => {
    // For a child service, check if it has sub-children
    if (subChildServicesData?.data && subChildServicesData.data.length > 0) {
      return subChildServicesData.data.some(
        (service) => service.parentId === serviceId
      );
    }
    // For a main service, check if it has children
    if (childServicesData?.data && childServicesData.data.length > 0) {
      return childServicesData.data.some(
        (service) => service.parentId === serviceId
      );
    }
    return false;
  };

  // Find the type ID for a service (even if it's a child or sub-child)
  const findServiceTypeId = (serviceId: string): string | undefined => {
    // Check if it's a main service
    const mainServiceTypeId = serviceRelationships.mainServiceTypes[serviceId];
    if (mainServiceTypeId) return mainServiceTypeId;

    // Check if it's a child service
    const parentId = serviceRelationships.childToParent[serviceId];
    if (parentId) {
      return serviceRelationships.mainServiceTypes[parentId];
    }

    // Check if it's a sub-child service
    const childId = serviceRelationships.subChildToChild[serviceId];
    if (childId) {
      const parentId = serviceRelationships.childToParent[childId];
      if (parentId) {
        return serviceRelationships.mainServiceTypes[parentId];
      }
    }

    return undefined;
  };

  // Check if a service is selectable (only last level services are selectable)
  const isServiceSelectable = (serviceId: string, level: number): boolean => {
    // Main service is selectable only if it has no children
    if (level === 0) {
      return !hasChildren(serviceId);
    }

    // Child service is selectable only if it has no sub-children
    if (level === 1) {
      return !hasChildren(serviceId);
    }

    // Sub-child services are always selectable
    return true;
  };

  // Calculate service counts for each type - only count last level services
  const calculateMyServiceCount = (typeId: string) => {
    if (!selectedServices || selectedServices.length === 0) return 0;

    // Count only services that belong to this type and are at the last level
    return selectedServices.filter((serviceId) => {
      const serviceTypeId = findServiceTypeId(serviceId);
      // Only count if it's a last level service (either a child without sub-children or a sub-child)
      const isLastLevel = !hasChildren(serviceId);
      return serviceTypeId === typeId && isLastLevel;
    }).length;
  };

  // Check if a service is in my selected services
  const isMyService = (serviceId: string) => {
    return myServicesData?.data?.includes(serviceId) || false;
  };

  // Check if a service is currently selected for update
  const isSelectedForUpdate = (serviceId: string) => {
    return selectedServices.includes(serviceId);
  };

  // Loading skeleton component
  const LoadingSkeleton = ({ count = 3 }: { count?: number }) => (
    <div className="space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  // Function to handle service selection
  const handleServiceClick = (service: any) => {
    if (service.parentId) {
      // This is a child service
      if (selectedSubParentId === service.id) {
        setSelectedSubParentId(null);
      } else {
        setSelectedSubParentId(service.id);
      }
    } else if (service.typeId) {
      // This is a main service
      if (selectedParentId === service.id) {
        setSelectedParentId(null);
        setSelectedSubParentId(null);
      } else {
        setSelectedParentId(service.id);
        setSelectedSubParentId(null);
      }
    }
  };

  // Function to handle sub-child service selection
  const handleSubChildClick = (service: any) => {
    // Sub-children are always selectable as they are the last level
    setSelectedServices((prev) => {
      if (prev.includes(service.id)) {
        return prev.filter((id) => id !== service.id);
      } else {
        return [...prev, service.id];
      }
    });
  };

  // Function to handle child service selection for update
  const handleChildServiceSelect = (service: any) => {
    // Check if this child service has sub-children
    const hasSubChildren = hasChildren(service.id);

    // Only allow selection if it doesn't have sub-children
    if (!hasSubChildren) {
      setSelectedServices((prev) => {
        if (prev.includes(service.id)) {
          return prev.filter((id) => id !== service.id);
        } else {
          return [...prev, service.id];
        }
      });
    }
  };

  // Update services function
  const handleUpdateServices = () => {
  

    setIsUpdating(true);

    // Only send the currently selected services
    const selectedLastLevelServices = selectedServices.filter(serviceId => !hasChildren(serviceId));

    updateProfile(
      {
        serviceIds: selectedLastLevelServices,
      },
      {
        onSuccess: () => {
          toast.success("Services updated successfully");
          refetchMyServices();
          setIsUpdating(false);
        },
        onError: (error) => {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data.message || "Failed to update services");
          } else {
            toast.error("Failed to update services");
          }
          console.error(error);
          setIsUpdating(false);
        },
      }
    );
  };

  // Check if services were changed
  const hasChanges = () => {
    if (!myServicesData?.data) return false;

    // Check if lengths are different
    if (myServicesData.data.length !== selectedServices.length) return true;

    // Check if contents are different
    const myServiceSet = new Set(myServicesData.data);
    return selectedServices.some((id) => !myServiceSet.has(id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar */}
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-0">
            <div className="space-y-1">
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <h3 className="font-ubuntu font-semibold text-teal-600">
                  Service Types
                </h3>
              </div>
              <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
                {typesLoading ? (
                  <LoadingSkeleton count={5} />
                ) : (
                  serviceTypesData?.data?.map((type) => {
                    const selectedCount = calculateMyServiceCount(type.id);
                    return (
                      <button
                        key={type.id}
                        onClick={() => {
                          setSelectedTypeId(
                            selectedTypeId === type.id ? null : type.id
                          );
                          setSelectedParentId(null);
                          setSelectedSubParentId(null);
                        }}
                        className={`w-full text-left px-4 py-3 text-sm font-roboto transition-colors hover:bg-gray-50 ${
                          selectedTypeId === type.id
                            ? "bg-gray-100 text-gray-900 border-r-2 border-teal-500"
                            : "text-gray-600"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{type.name}</span>
                          {selectedCount > 0 && (
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                              {selectedCount}
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            {selectedTypeId ? (
              <h1 className="text-2xl font-ubuntu font-semibold text-gray-900">
                {
                  serviceTypesData?.data?.find(
                    (type) => type.id === selectedTypeId
                  )?.name
                }
              </h1>
            ) : (
              <h1 className="text-2xl font-ubuntu font-semibold text-gray-900">
                All Services
              </h1>
            )}

            {/* Actions Buttons */}
            <div className="flex gap-2">
              {/* CMS Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      className="bg-teal-600 rounded-full hover:bg-teal-700 text-white"
                      onClick={() =>
                        router.push(`/dashboard/services/my-services`)
                      }
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      Manage Services
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View and manage your service details</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Update Button */}
              
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-teal-600 rounded-full hover:bg-teal-700 text-white"
                        onClick={handleUpdateServices}
                        disabled={isProfileUpdating || isUpdating}
                      >
                        {isProfileUpdating || isUpdating ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Services"
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Save your service selection changes</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              
            </div>
          </div>

          {/* Service Selection Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Column 1: Main Services */}
            <div className="space-y-6">
              {mainServicesLoading ? (
                <LoadingSkeleton count={4} />
              ) : mainServicesData?.data?.length === 0 ? (
                <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                  No services available
                </div>
              ) : (
                mainServicesData?.data?.map((service) => {
                  // Count selected services under this main service
                  const childCount = selectedServices.filter((id) => {
                    const parentId = serviceRelationships.childToParent[id];
                    const childId = serviceRelationships.subChildToChild[id];

                    if (childId) {
                      // It's a sub-child service
                      const parentOfChild =
                        serviceRelationships.childToParent[childId];
                      return parentOfChild === service.id;
                    } else if (parentId) {
                      // It's a child service
                      return parentId === service.id;
                    }
                    return false;
                  }).length;

                  return (
                    <button
                      key={service.id}
                      onClick={() => handleServiceClick(service)}
                      className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                        selectedParentId === service.id
                          ? "border-teal-500 bg-teal-50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">
                          {service.name}
                        </span>
                        <div className="flex items-center">
                          {childCount > 0 && (
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mr-2">
                              {childCount}
                            </span>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Column 2: Child Services */}
            {selectedParentId && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">
                  Child Services
                </h3>
                {childServicesLoading ? (
                  <LoadingSkeleton count={3} />
                ) : childServicesData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                    No sub-services available
                  </div>
                ) : (
                  childServicesData?.data?.map((service) => {
                    const hasSubChildren = hasChildren(service.id);

                    // Count sub-child services under this child service
                    const subChildCount = hasSubChildren
                      ? selectedServices.filter((id) => {
                          return (
                            serviceRelationships.subChildToChild[id] ===
                            service.id
                          );
                        }).length
                      : 0;

                    return (
                      <button
                        key={service.id}
                        onClick={() => {
                          handleServiceClick(service);
                          if (!hasSubChildren) {
                            handleChildServiceSelect(service);
                          }
                        }}
                        className={`w-full h-12 p-3 text-left rounded-[20px] border ${
                          isSelectedForUpdate(service.id) && !hasSubChildren
                            ? "border-teal-500 bg-teal-50"
                            : "border-[#E7E7E7] hover:border-gray-300"
                        } shadow-sm transition-all ${
                          selectedSubParentId === service.id
                            ? "ring-2 ring-teal-200"
                            : ""
                        } ${
                          hasSubChildren
                            ? "cursor-pointer bg-gray-50"
                            : "cursor-pointer hover:border-teal-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="font-medium text-gray-900 text-sm">
                              {service.name}
                            </span>
                          </div>
                          <div className="flex items-center">
                            {!hasSubChildren &&
                              isSelectedForUpdate(service.id) && (
                                <Check className="w-4 h-4 text-teal-500 mr-2" />
                              )}
                            {isMyService(service.id) && !hasSubChildren && (
                              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mr-2">
                                Current
                              </span>
                            )}
                            {hasSubChildren && (
                              <>
                                {subChildCount > 0 && (
                                  <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full mr-2">
                                    {subChildCount}
                                  </span>
                                )}
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}

            {selectedSubParentId && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-teal-600 mb-4">
                  Sub-Child Services
                </h3>
                {subChildServicesLoading ? (
                  <LoadingSkeleton count={2} />
                ) : subChildServicesData?.data?.length === 0 ? (
                  <div className="p-4 text-center text-gray-500 border border-[#E7E7E7] rounded-[20px] shadow-sm">
                    No additional options available
                  </div>
                ) : (
                  subChildServicesData?.data?.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => handleSubChildClick(service)}
                      className={`w-full h-12 p-3 text-left rounded-[20px] border ${
                        isSelectedForUpdate(service.id)
                          ? "border-teal-500 bg-teal-50"
                          : "border-[#E7E7E7] hover:border-gray-300"
                      } shadow-sm transition-all`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 text-sm">
                          {service.name}
                        </span>
                        <div className="flex items-center">
                          {isSelectedForUpdate(service.id) && (
                            <Check className="w-4 h-4 text-teal-500 mr-2" />
                          )}
                          {isMyService(service.id) && (
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
