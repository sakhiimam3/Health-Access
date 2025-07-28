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

interface ServiceData {
  id: string;
  name: string;
  typeId?: string;
  parentId?: string;
}

interface ServiceResponse {
  data: ServiceData[];
}

export function ServicesView() {
  const router = useRouter();
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [selectedSubParentId, setSelectedSubParentId] = useState<string | null>(
    null
  );
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Add caching for better performance and relationship tracking
  const [cachedMainServices, setCachedMainServices] = useState<{
    [key: string]: ServiceResponse;
  }>({});
  const [cachedChildServices, setCachedChildServices] = useState<{
    [key: string]: ServiceResponse;
  }>({});
  const [cachedSubChildServices, setCachedSubChildServices] = useState<{
    [key: string]: ServiceResponse;
  }>({});

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

  // Cache main services when they change
  useEffect(() => {
    if (mainServicesData && selectedTypeId) {
      setCachedMainServices((prev) => ({
        ...prev,
        [`type_${selectedTypeId}`]: mainServicesData,
      }));

      // Update service relationships for main services
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
  }, [mainServicesData, selectedTypeId]);

  // Cache child services and handle auto-selection for leaf nodes
  useEffect(() => {
    if (childServicesData && selectedParentId) {
      setCachedChildServices((prev) => ({
        ...prev,
        [`parent_${selectedParentId}`]: childServicesData,
      }));

      // Update service relationships for child services
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

      // If no children found, the parent is a leaf node - auto-select it
      if (childServicesData.data.length === 0) {
        const parentService = Object.values(cachedMainServices)
          .flatMap(services => services.data)
          .find(service => service.id === selectedParentId);
        
        if (parentService && !selectedServices.includes(parentService.id)) {
          setSelectedServices(prev => [...prev, parentService.id]);
        }
      }
    }
  }, [childServicesData, selectedParentId, cachedMainServices, selectedServices]);

  // Cache sub-child services and handle auto-selection for leaf nodes
  useEffect(() => {
    if (subChildServicesData && selectedSubParentId) {
      setCachedSubChildServices((prev) => ({
        ...prev,
        [`subparent_${selectedSubParentId}`]: subChildServicesData,
      }));

      // Update service relationships for sub-child services
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

      // If no sub-children found, the parent is a leaf node - auto-select it
      if (subChildServicesData.data.length === 0) {
        const parentService = Object.values(cachedChildServices)
          .flatMap(services => services.data)
          .find(service => service.id === selectedSubParentId);
        
        if (parentService && !selectedServices.includes(parentService.id)) {
          setSelectedServices(prev => [...prev, parentService.id]);
        }
      }
    }
  }, [subChildServicesData, selectedSubParentId, cachedChildServices, selectedServices]);

  // Check if a service has children using cached data
  const hasChildren = (serviceId: string, level: 0 | 1 = 0): boolean => {
    if (level === 0) {
      // Check if main service has children
      const childServices = cachedChildServices[`parent_${serviceId}`];
      return childServices ? childServices.data.length > 0 : false;
    } else {
      // Check if child service has sub-children
      const subChildServices = cachedSubChildServices[`subparent_${serviceId}`];
      return subChildServices ? subChildServices.data.length > 0 : false;
    }
  };

  // Check if data is loaded for a service
  const isDataLoaded = (serviceId: string, level: 0 | 1 = 0): boolean => {
    if (level === 0) {
      return cachedChildServices[`parent_${serviceId}`] !== undefined;
    } else {
      return cachedSubChildServices[`subparent_${serviceId}`] !== undefined;
    }
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

  // Calculate service counts for each type - only count leaf level services
  const calculateMyServiceCount = (typeId: string) => {
    if (!selectedServices || selectedServices.length === 0) return 0;

    return selectedServices.filter((serviceId) => {
      const serviceTypeId = findServiceTypeId(serviceId);
      return serviceTypeId === typeId;
    }).length;
  };

  // Get selected services count by parent
  const getSelectedServicesCountByParent = (parentId: string) => {
    return selectedServices.filter((serviceId) => {
      // Check if this is a direct child
      const childServices = cachedChildServices[`parent_${parentId}`] || { data: [] };
      if (childServices.data.some((s) => s.id === serviceId)) return true;

      // Check if this is a sub-child
      let foundInSubChild = false;
      Object.values(cachedSubChildServices).forEach((services) => {
        const subService = services.data.find((s) => s.id === serviceId);
        if (subService) {
          const parentChildService = childServices.data.find(
            (s) => s.id === subService.parentId
          );
          if (parentChildService) foundInSubChild = true;
        }
      });

      return foundInSubChild;
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

  // Handle main service click
  const handleMainServiceClick = (service: ServiceData) => {
    setSelectedParentId(service.id);
    setSelectedSubParentId(null);
  };

  // Handle child service click
  const handleChildServiceClick = (service: ServiceData) => {
    setSelectedSubParentId(service.id);
  };

  // Handle service selection (for leaf nodes only)
  const handleServiceSelect = (serviceId: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(serviceId)) {
        return prev.filter((id) => id !== serviceId);
      } else {
        return [...prev, serviceId];
      }
    });
  };

  // Update services function
  const handleUpdateServices = () => {
    setIsUpdating(true);

    // Only send the currently selected services (they are already leaf nodes)
    updateProfile(
      {
        serviceIds: selectedServices,
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
                      disabled={isProfileUpdating || isUpdating || !hasChanges()}
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
                  const hasSubChildren = hasChildren(service.id, 0);
                  const isDataLoadedForService = isDataLoaded(service.id, 0);
                  const isLeafNode = isDataLoadedForService && !hasSubChildren;
                  const isFormSelected = isSelectedForUpdate(service.id);
                  const isNavigationActive = selectedParentId === service.id;
                  const childCount = getSelectedServicesCountByParent(service.id);

                  return (
                    <button
                      key={service.id}
                      onClick={() => {
                        handleMainServiceClick(service);
                        // If it's a leaf node, also toggle selection
                        if (isLeafNode) {
                          handleServiceSelect(service.id);
                        }
                      }}
                      className={`w-full h-12 p-3 text-left rounded-[20px] border border-[#E7E7E7] shadow-sm transition-all ${
                        isFormSelected
                          ? "border-teal-500 bg-teal-50"
                          : isNavigationActive
                          ? "border-teal-300 bg-teal-50/50"
                          : "hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 text-sm">
                            {service.name}
                          </span>
                          {childCount > 0 && (
                            <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                              {childCount}
                            </span>
                          )}
                          {isFormSelected && (
                            <Check className="w-4 h-4 text-teal-500" />
                          )}
                          {isMyService(service.id) && (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              Current
                            </span>
                          )}
                        </div>
                        {(hasSubChildren || !isDataLoadedForService) && (
                          <ChevronRight className="w-4 h-4 text-gray-400" />
                        )}
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
                    const hasSubChildren = hasChildren(service.id, 1);
                    const isDataLoadedForService = isDataLoaded(service.id, 1);
                    const isLeafNode = isDataLoadedForService && !hasSubChildren;
                    const isFormSelected = isSelectedForUpdate(service.id);
                    const isNavigationActive = selectedSubParentId === service.id;
                    const subChildCount = getSelectedServicesCountByParent(service.id);

                    return (
                      <button
                        key={service.id}
                        onClick={() => {
                          handleChildServiceClick(service);
                          // If it's a leaf node, also toggle selection
                          if (isLeafNode) {
                            handleServiceSelect(service.id);
                          }
                        }}
                        className={`w-full h-12 p-3 text-left rounded-[20px] border ${
                          isFormSelected
                            ? "border-teal-500 bg-teal-50"
                            : isNavigationActive
                            ? "border-teal-300 bg-teal-50/50"
                            : "border-[#E7E7E7] hover:border-gray-300"
                        } shadow-sm transition-all`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">
                              {service.name}
                            </span>
                            {subChildCount > 0 && (
                              <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full">
                                {subChildCount}
                              </span>
                            )}
                            {isFormSelected && (
                              <Check className="w-4 h-4 text-teal-500" />
                            )}
                            {isMyService(service.id) && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                          {(hasSubChildren || !isDataLoadedForService) && (
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}

            {/* Column 3: Sub-Child Services */}
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
                  subChildServicesData?.data?.map((service) => {
                    const isFormSelected = isSelectedForUpdate(service.id);

                    return (
                      <button
                        key={service.id}
                        onClick={() => handleServiceSelect(service.id)}
                        className={`w-full h-12 p-3 text-left rounded-[20px] border ${
                          isFormSelected
                            ? "border-teal-500 bg-teal-50"
                            : "border-[#E7E7E7] hover:border-gray-300"
                        } shadow-sm transition-all`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900 text-sm">
                              {service.name}
                            </span>
                            {isFormSelected && (
                              <Check className="w-4 h-4 text-teal-500" />
                            )}
                            {isMyService(service.id) && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
