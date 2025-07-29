"use client";

import PagesWrapper from "@/components/layout/pagesWrapper.tsx";
import LayoutWrapper from "@/components/layout/wrapper";
import React, { useEffect, useState } from "react";
import { PharmacyCard } from "@/components/sliderCard";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useSearchPartners } from "@/lib/hooks";
import { Loader2, MapPin, Star, Clock, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Enhanced PharmacyCard component for search results
const SearchPharmacyCard = ({ partner }: { partner: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={partner.image || "/images/pharmacy-1.png"}
          alt={partner.businessName}
          fill
          className="object-cover"
        />
        {partner.isOpen && (
          <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
            Open
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{partner.businessName}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{partner.rating}</span>
            <span className="text-sm text-gray-500">({partner.reviewCount})</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{partner.location?.name}</span>
          <span className="text-sm ml-2 text-gray-500">({partner.distance} km away)</span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{partner.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-3">
          {partner.services?.slice(0, 2).map((service: any, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {service.name}
            </Badge>
          ))}
          {partner.services?.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{partner.services.length - 2} more
            </Badge>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            <span>{partner.nextAvailableSlot}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button 
              className="text-sm text-[#189BA3] hover:underline text-left sm:text-center"
              onClick={() => window.location.href = `/pharmacy/${partner.id}`}
            >
              View Details
            </button>
            {partner.acceptsOnlineBooking && (
              <button className="bg-[#189BA3] text-white px-3 py-1 rounded text-sm hover:bg-teal-600 whitespace-nowrap">
                Book Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState({
    location: searchParams.get('location') || '',
    serviceId: searchParams.get('serviceId') || '',
    date: searchParams.get('date') || '',
    latitude: searchParams.get('latitude') ? parseFloat(searchParams.get('latitude')!) : 53.4808, // Default to Manchester
    longitude: searchParams.get('longitude') ? parseFloat(searchParams.get('longitude')!) : -2.2426,
    page: 1,
    limit: 10,
  });

  const { data, isLoading, error, refetch } = useSearchPartners(searchQuery);

  useEffect(() => {
    // Update search query when URL parameters change
    setSearchQuery({
      location: searchParams.get('location') || '',
      serviceId: searchParams.get('serviceId') || '',
      date: searchParams.get('date') || '',
      latitude: searchParams.get('latitude') ? parseFloat(searchParams.get('latitude')!) : 53.4808,
      longitude: searchParams.get('longitude') ? parseFloat(searchParams.get('longitude')!) : -2.2426,
      page: 1,
      limit: 10,
    });
  }, [searchParams]);

  const handlePageChange = (newPage: number) => {
    setSearchQuery(prev => ({ ...prev, page: newPage }));
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setSearchQuery(prev => ({ ...prev, [filterType]: value, page: 1 }));
  };

  if (isLoading) {
    return (
      <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
        <LayoutWrapper>
          <div className="flex justify-center items-center h-64 mt-60">
            <Loader2 className="w-10 h-10 animate-spin text-[#189BA3]" />
          </div>
        </LayoutWrapper>
      </PagesWrapper>
    );
  }

  if (error) {
    return (
      <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
        <LayoutWrapper>
          <div className="mt-60 text-center">
            <p className="text-red-500">Error loading search results. Please try again.</p>
          </div>
        </LayoutWrapper>
      </PagesWrapper>
    );
  }

  const partners = data?.data?.partners || [];
  const stats = data?.data?.stats;
  const pagination = {
    page: data?.data?.page || 1,
    totalPages: data?.data?.totalPages || 1,
    total: data?.data?.total || 0,
    hasMore: data?.data?.hasMore || false,
  };

  return (
    <PagesWrapper isSearchPage={true} bgColor="bg-[#189BA3]" btnColor="#189BA3">
      <LayoutWrapper>
        <section className="mt-60 mb-10">
          {/* Search Summary */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Healthcare Partners {searchQuery.location && `in ${searchQuery.location}`}
            </h1>
            {stats && (
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{stats.totalPartners} total partners</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{stats.partnersInRadius} within {searchQuery.location || 'your area'}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{stats.availablePartners} available today</span>
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex flex-col lg:flex-row gap-6 lg:gap-10">
            <div className="w-full lg:w-[60%]">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div>
                  <p className="text-md font-plusJakartaSans font-medium">
                    Showing {((pagination.page - 1) * searchQuery.limit) + 1} – {Math.min(pagination.page * searchQuery.limit, pagination.total)} of {pagination.total} results
                  </p>
                </div>
                <div className="w-full sm:w-auto min-w-[200px] py-3 px-4 border border-gray-[#737373] rounded-[30px]">
                  <select 
                    className="w-full text-[#737373] outline-none border-none"
                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                  >
                    <option value="">Sort by</option>
                    <option value="distance">Distance</option>
                    <option value="rating">Rating</option>
                    <option value="availability">Availability</option>
                  </select>
                </div>
              </div>

              {/* Results Grid */}
              <div>
                {partners.length > 0 ? (
                  <div className="grid my-10 grid-cols-1 lg:grid-cols-2 gap-6">
                    {partners.map((partner: any) => (
                      <SearchPharmacyCard key={partner.id} partner={partner} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-500 text-lg mb-2">No partners found</div>
                    <p className="text-gray-400">Try adjusting your search criteria</p>
                  </div>
                )}

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-8">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = pagination.page - 2 + i;
                      if (pageNum < 1 || pageNum > pagination.totalPages) return null;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 border rounded-lg ${
                            pageNum === pagination.page
                              ? 'bg-[#189BA3] text-white border-[#189BA3]'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={!pagination.hasMore}
                      className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="w-full lg:w-[40%] order-first lg:order-last">
              <div className="lg:sticky lg:top-24">
                <div className="relative w-full h-[300px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src="/images/search-map.png"
                    alt="Map showing partner locations"
                    fill
                    className="object-cover"
                  />
                  
                  {/* Map overlay with search area info */}
                  <div className="absolute top-4 left-4 right-4 bg-white p-3 rounded-lg shadow-md">
                    <div className="text-sm font-medium mb-1">Search Area</div>
                    <div className="text-xs text-gray-600 flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {searchQuery.location || 'Current location'}
                    </div>
                    {stats && (
                      <div className="text-xs text-gray-600 mt-1">
                        Average distance: {stats.averageDistance} km
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LayoutWrapper>
    </PagesWrapper>
  );
};

export default SearchPage;
