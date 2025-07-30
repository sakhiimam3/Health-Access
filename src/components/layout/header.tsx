"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin, Stethoscope, Loader2 } from "lucide-react";
import LayoutWrapper from "./wrapper";
import { NavItems } from "@/mockdata";
import ButtonTheme from "../shared/ButtonTheme";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useUserContext } from "@/context/userStore";
import HeaderMenu from "../headerMenu";
import { useGetServices, useGetSeriveTypes } from "@/lib/hooks";
import { useGetHowItWorks } from "../useGetHowItWorks";

interface HeaderProps {}

interface SearchParams {
  location: string;
  serviceId: string;
  serviceName: string;
  date: string;
  latitude?: number;
  longitude?: number;
}

// Static location data for now (as requested)
const staticLocations = [
  { id: "1", name: "128 Main Street, San Francisco, CA 94105", latitude: 39.7749, longitude: -122.4194 },
  { id: "2", name: "123 Main Street, San Francisco, CA 94105", latitude: 37.7749, longitude: -122.4194 },
];

const AirbnbStyleSearch = () => {
  const [activeTab, setActiveTab] = useState<'location' | 'service' | 'date' | null>(null);
  const [searchParams, setSearchParams] = useState<SearchParams>({
    location: '',
    serviceId: '',
    serviceName: '',
    date: '',
    latitude: undefined,
    longitude: undefined,
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [locationInput, setLocationInput] = useState('');
  const [serviceSearchInput, setServiceSearchInput] = useState('');
  const [debouncedServiceSearch, setDebouncedServiceSearch] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const urlSearchParams = useSearchParams();
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Debounce service search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedServiceSearch(serviceSearchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [serviceSearchInput]);
  
  // Get services and service types from API
  const { data: servicesData, isLoading: servicesLoading } = useGetServices({
    search: debouncedServiceSearch
  });
  const { data: serviceTypesData } = useGetSeriveTypes();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
        setShowServiceDropdown(false);
        setShowDatePicker(false);
        setActiveTab(null);
        // Reset service search when closing dropdown
        setServiceSearchInput('');
        setDebouncedServiceSearch('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sync search params with URL parameters when on search page
  useEffect(() => {
    if (pathname === '/search' && urlSearchParams) {
      const location = urlSearchParams.get('location') || '';
      const serviceId = urlSearchParams.get('serviceId') || '';
      const date = urlSearchParams.get('date') || '';
      const latitude = urlSearchParams.get('latitude');
      const longitude = urlSearchParams.get('longitude');
      
      // Find service name from serviceId if available
      let serviceName = '';
      if (serviceId && servicesData?.data) {
        const service = servicesData.data.find((s: any) => s.id === serviceId);
        serviceName = service?.name || '';
      }

      setSearchParams({
        location,
        serviceId,
        serviceName,
        date,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
      });
      
      // Set location input to match current location
      setLocationInput(location);
    }
  }, [pathname, urlSearchParams, servicesData]);

  const handleLocationSelect = (location: typeof staticLocations[0]) => {
    setSearchParams(prev => ({
      ...prev,
      location: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
    }));
    setLocationInput(location.name);
    setShowLocationDropdown(false);
    setActiveTab('service'); // Auto-progress to next tab
  };

  const handleLocationInputChange = (value: string) => {
    setLocationInput(value);
    setSearchParams(prev => ({ 
      ...prev, 
      location: value,
      // Clear coordinates when manually typing location
      latitude: undefined,
      longitude: undefined
    }));
  };

  const resetSearchParams = () => {
    setSearchParams({
      location: '',
      serviceId: '',
      serviceName: '',
      date: '',
      latitude: undefined,
      longitude: undefined,
    });
    setLocationInput('');
    setServiceSearchInput('');
    setDebouncedServiceSearch('');
    setActiveTab(null);
    setShowLocationDropdown(false);
    setShowServiceDropdown(false);
    setShowDatePicker(false);
  };

  const handleServiceSelect = (service: any) => {
    setSearchParams(prev => ({
      ...prev,
      serviceId: service.id,
      serviceName: service.name,
    }));
    setShowServiceDropdown(false);
    setActiveTab('date'); // Auto-progress to next tab
    setShowDatePicker(true);
  };

  const handleDateSelect = (date: string) => {
    setSearchParams(prev => ({ ...prev, date }));
    setShowDatePicker(false);
    setActiveTab(null);
    // Auto-search after all fields are filled
    if (searchParams.location && searchParams.serviceId && date) {
      setTimeout(() => handleSearch(date), 300);
    }
  };

  const handleSearch = (selectedDate?: string) => {
    // Create fresh URLSearchParams to ensure no parameter conflicts
    const queryParams = new URLSearchParams();
    
    // Only add parameters that have values
    if (searchParams.location?.trim()) {
      queryParams.set('location', searchParams.location.trim());
    }
    if (searchParams.serviceId?.trim()) {
      queryParams.set('serviceId', searchParams.serviceId.trim());
    }
    
    const dateToUse = selectedDate || searchParams.date;
    if (dateToUse?.trim()) {
      queryParams.set('date', dateToUse.trim());
    }
    
    if (searchParams.latitude !== undefined) {
      queryParams.set('latitude', searchParams.latitude.toString());
    }
    if (searchParams.longitude !== undefined) {
      queryParams.set('longitude', searchParams.longitude.toString());
    }
    
    // Use the search path with completely new query parameters
    const newUrl = `/search?${queryParams.toString()}`;
    
    // If we're already on search page, replace to avoid adding to history
    if (pathname === '/search') {
      router.replace(newUrl);
    } else {
      router.push(newUrl);
    }
  };

  // Custom date picker component
  const CustomDatePicker = () => {
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
    
    const generateCalendarDays = (startDate: Date) => {
      const days = [];
      const firstDay = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
      const lastDay = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);
      const startCalendar = new Date(firstDay);
      startCalendar.setDate(startCalendar.getDate() - firstDay.getDay());
      
      for (let i = 0; i < 42; i++) {
        const currentDate = new Date(startCalendar);
        currentDate.setDate(startCalendar.getDate() + i);
        days.push(currentDate);
      }
      return days;
    };

    const formatDate = (date: Date) => {
      return date.toISOString().split('T')[0];
    };

    const isToday = (date: Date) => {
      return formatDate(date) === formatDate(today);
    };

    const isSelected = (date: Date) => {
      return searchParams.date === formatDate(date);
    };

    const isDisabled = (date: Date) => {
      return date < today;
    };

    const currentMonthDays = generateCalendarDays(today);
    const nextMonthDays = generateCalendarDays(nextMonth);

    return (
      <div className="p-6 bg-white rounded-lg shadow-xl border">
        <div className="text-lg font-semibold mb-4 text-center">Select a date</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Month */}
          <div>
            <div className="text-center font-medium mb-3">
              {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
              {currentMonthDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === today.getMonth();
                return (
                  <button
                    key={index}
                    onClick={() => !isDisabled(date) && handleDateSelect(formatDate(date))}
                    disabled={isDisabled(date)}
                    className={`
                      p-2 text-sm rounded-full transition-all duration-200
                      ${!isCurrentMonth ? 'text-gray-300' : ''}
                      ${isDisabled(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                      ${isSelected(date) ? 'bg-[#189BA3] text-white' : ''}
                      ${isToday(date) && !isSelected(date) ? 'bg-gray-200 font-medium' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Next Month */}
          <div>
            <div className="text-center font-medium mb-3">
              {nextMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                <div key={day} className="text-xs font-medium text-gray-500 p-2">
                  {day}
                </div>
              ))}
              {nextMonthDays.map((date, index) => {
                const isCurrentMonth = date.getMonth() === nextMonth.getMonth();
                return (
                  <button
                    key={index}
                    onClick={() => !isDisabled(date) && handleDateSelect(formatDate(date))}
                    disabled={isDisabled(date)}
                    className={`
                      p-2 text-sm rounded-full transition-all duration-200
                      ${!isCurrentMonth ? 'text-gray-300' : ''}
                      ${isDisabled(date) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                      ${isSelected(date) ? 'bg-[#189BA3] text-white' : ''}
                    `}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick date options */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="text-sm font-medium mb-3">Quick options</div>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Today', date: today },
              { label: 'Tomorrow', date: new Date(today.getTime() + 24 * 60 * 60 * 1000) },
              { label: 'This Weekend', date: new Date(today.getTime() + (6 - today.getDay()) * 24 * 60 * 60 * 1000) },
              { label: 'Next Week', date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000) },
            ].map((option) => (
              <button
                key={option.label}
                onClick={() => handleDateSelect(formatDate(option.date))}
                className="px-3 py-2 text-sm border rounded-full hover:bg-gray-50 transition-colors"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-4xl mx-auto">
      {/* Desktop Search */}
      <div className="hidden md:flex items-center bg-white rounded-full shadow-lg border border-gray-200 p-1">
        {/* Location Tab */}
        <div 
          className={`flex-1 relative transition-all duration-200 ${
            activeTab === 'location' ? 'bg-white shadow-md rounded-full z-10' : ''
          }`}
          onClick={() => {
            setActiveTab('location');
            setShowLocationDropdown(true);
            setShowServiceDropdown(false);
            setShowDatePicker(false);
            // Sync locationInput with current location
            if (!locationInput && searchParams.location) {
              setLocationInput(searchParams.location);
            }
          }}
        >
          <div className="p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <MapPin className={`h-5 w-5 transition-colors ${
                searchParams.location ? 'text-[#189BA3]' : 'text-gray-400'
              }`} />
              <div>
                <div className="font-semibold text-sm">Location</div>
                <div className={`text-sm ${
                  searchParams.location ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {searchParams.location || 'Where to?'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Tab */}
        <div 
          className={`flex-1 relative border-l border-gray-200 transition-all duration-200 ${
            activeTab === 'service' ? 'bg-white shadow-md rounded-full z-10' : ''
          }`}
          onClick={() => {
            setActiveTab('service');
            setShowServiceDropdown(true);
            setShowLocationDropdown(false);
            setShowDatePicker(false);
            // Reset service search when opening dropdown
            setServiceSearchInput('');
            setDebouncedServiceSearch('');
          }}
        >
          <div className="p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <Stethoscope className={`h-5 w-5 transition-colors ${
                searchParams.serviceName ? 'text-[#189BA3]' : 'text-gray-400'
              }`} />
              <div>
                <div className="font-semibold text-sm">Service</div>
                <div className={`text-sm ${
                  searchParams.serviceName ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {searchParams.serviceName || 'Add service'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Date Tab */}
        <div 
          className={`flex-1 relative border-l border-gray-200 transition-all duration-200 ${
            activeTab === 'date' ? 'bg-white shadow-md rounded-full z-10' : ''
          }`}
          onClick={() => {
            setActiveTab('date');
            setShowDatePicker(true);
            setShowLocationDropdown(false);
            setShowServiceDropdown(false);
          }}
        >
          <div className="p-4 cursor-pointer">
            <div className="flex items-center gap-3">
              <Calendar className={`h-5 w-5 transition-colors ${
                searchParams.date ? 'text-[#189BA3]' : 'text-gray-400'
              }`} />
              <div>
                <div className="font-semibold text-sm">Date</div>
                <div className={`text-sm ${
                  searchParams.date ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {searchParams.date ? new Date(searchParams.date).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric' 
                  }) : 'Add date'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button
          size="icon"
          onClick={() => handleSearch()}
          disabled={!searchParams.location || !searchParams.serviceId}
          className="bg-[#189BA3] hover:bg-teal-600 rounded-full h-12 w-12 ml-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Search className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Mobile Search - keeping existing implementation */}
      <div className="md:hidden bg-white rounded-lg shadow-lg border border-gray-200 p-4 space-y-4">
        {/* Location */}
        <div 
          className="border border-gray-200 rounded-lg p-3 cursor-pointer"
          onClick={() => {
            setActiveTab('location');
            setShowLocationDropdown(true);
            setShowServiceDropdown(false);
            setShowDatePicker(false);
            // Sync locationInput with current location
            if (!locationInput && searchParams.location) {
              setLocationInput(searchParams.location);
            }
          }}
        >
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-[#189BA3]" />
            <div>
              <div className="font-semibold text-sm">Location</div>
              <div className="text-gray-500 text-sm">
                {searchParams.location || 'Where to?'}
              </div>
            </div>
          </div>
        </div>

        {/* Service */}
        <div 
          className="border border-gray-200 rounded-lg p-3 cursor-pointer"
          onClick={() => {
            setActiveTab('service');
            setShowServiceDropdown(true);
            setShowLocationDropdown(false);
            setShowDatePicker(false);
            // Reset service search when opening dropdown
            setServiceSearchInput('');
            setDebouncedServiceSearch('');
          }}
        >
          <div className="flex items-center gap-3">
            <Stethoscope className="h-5 w-5 text-[#189BA3]" />
            <div>
              <div className="font-semibold text-sm">Service</div>
              <div className="text-gray-500 text-sm">
                {searchParams.serviceName || 'Add service'}
              </div>
            </div>
          </div>
        </div>

        {/* Date */}
        <div 
          className="border border-gray-200 rounded-lg p-3 cursor-pointer"
          onClick={() => {
            setActiveTab('date');
            setShowDatePicker(true);
            setShowLocationDropdown(false);
            setShowServiceDropdown(false);
          }}
        >
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-[#189BA3]" />
            <div>
              <div className="font-semibold text-sm">Date</div>
              <div className="text-gray-500 text-sm">
                {searchParams.date ? new Date(searchParams.date).toLocaleDateString() : 'Add date'}
              </div>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <Button
          onClick={() => handleSearch()}
          disabled={!searchParams.location || !searchParams.serviceId}
          className="w-full bg-[#189BA3] hover:bg-teal-600 text-white py-3 disabled:opacity-50"
        >
          <Search className="h-5 w-5 mr-2" />
          Search
        </Button>
      </div>

      {/* Location Dropdown */}
      {showLocationDropdown && activeTab === 'location' && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4">
            {/* Autocomplete Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Start typing your location..."
                value={locationInput}
                onChange={(e) => handleLocationInputChange(e.target.value)}
                className="w-full h-12 px-4 text-base rounded-lg border border-gray-200 shadow-sm focus:border-[#189BA3] focus:ring-1 focus:ring-[#189BA3] focus:outline-none transition-colors"
                autoFocus
                autoComplete="off"
              />
            </div>

            {/* Filtered Locations */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {staticLocations
                .filter(location => 
                  locationInput === '' || 
                  location.name.toLowerCase().includes(locationInput.toLowerCase())
                )
                .map((location) => (
                  <div
                    key={location.id}
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3 transition-colors"
                    onClick={() => handleLocationSelect(location)}
                  >
                    <MapPin className="h-4 w-4 text-[#189BA3]" />
                    <div>
                      <div className="font-medium text-gray-900">{location.name}</div>
                      <div className="text-sm text-gray-500">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </div>
                    </div>
                  </div>
                ))}
              
              {/* No results message */}
              {locationInput !== '' && 
                staticLocations.filter(location => 
                  location.name.toLowerCase().includes(locationInput.toLowerCase())
                ).length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">No locations found</p>
                  <p className="text-xs">Try a different search term</p>
                </div>
              )}
            </div>

            {/* Helper text */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Type to search available locations
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Service Dropdown */}
      {showServiceDropdown && activeTab === 'service' && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border z-50">
          <div className="p-4">
            {/* Service Search Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search for services..."
                value={serviceSearchInput}
                onChange={(e) => setServiceSearchInput(e.target.value)}
                className="w-full h-12 px-4 text-base rounded-lg border border-gray-200 shadow-sm focus:border-[#189BA3] focus:ring-1 focus:ring-[#189BA3] focus:outline-none transition-colors"
                autoFocus
                autoComplete="off"
              />
              {serviceSearchInput && (
                <button
                  onClick={() => {
                    setServiceSearchInput('');
                    setDebouncedServiceSearch('');
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Services List */}
            <div className="space-y-1 max-h-64 overflow-y-auto">
              {servicesLoading ? (
                // Skeleton Loading
                <div className="space-y-2">
                  {[...Array(3)].map((_, index) => (
                    <div key={index} className="p-3 rounded-lg animate-pulse">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 bg-gray-200 rounded"></div>
                        <div className="flex-1">
                          <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="text-sm font-medium text-gray-900 mb-3">
                    {serviceSearchInput ? `Search results for "${serviceSearchInput}"` : 'Available services'}
                  </div>
                  {servicesData?.data?.map((service: any) => (
                    <div
                      key={service.id}
                      className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3 transition-colors"
                      onClick={() => handleServiceSelect(service)}
                    >
                      <Stethoscope className="h-4 w-4 text-[#189BA3]" />
                      <div>
                        <div className="font-medium text-gray-900">{service.name}</div>
                        {service.description && (
                          <div className="text-sm text-gray-500 line-clamp-1">
                            {service.description}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* No results message */}
                  {(!servicesData?.data || servicesData.data.length === 0) && !servicesLoading && (
                    <div className="p-4 text-center text-gray-500">
                      <Stethoscope className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                      <p className="text-sm">
                        {serviceSearchInput ? 'No services found' : 'No services available'}
                      </p>
                      {serviceSearchInput && (
                        <p className="text-xs">Try a different search term</p>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Helper text */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 flex items-center">
                <Stethoscope className="h-3 w-3 mr-1" />
                Type to search for healthcare services
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Date Picker */}
      {showDatePicker && activeTab === 'date' && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <CustomDatePicker />
        </div>
      )}
    </div>
  );
};

const Header = ({}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [forceShowMainSearch, setForceShowMainSearch] = useState(false);
  const pathName = usePathname();
  const { user } = useUserContext();
  
  // Fetch menuTypes using hook
  const { menuTypes, loading: menuTypesLoading } = useGetHowItWorks();
  const loading = menuTypesLoading;

  const dropdownRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Reset forceShowMainSearch when scrolling back to top
      if (scrollY <= 50) {
        setForceShowMainSearch(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isDropdownOpen) {
      scrollPositionRef.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, scrollPositionRef.current);
    }
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScrolledSearchClick = () => {
    setForceShowMainSearch(true);
  };

  // Determine whether to show main search or scrolled search
  const shouldShowMainSearch = !isScrolled || forceShowMainSearch;

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50">
      <LayoutWrapper>
        {loading ? (
          <div className="w-full h-16 flex items-center px-4 animate-pulse">
            <div className="h-10 w-40 bg-gray-200 rounded mr-8" />
            <div className="flex-1 flex space-x-8">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="h-5 w-24 bg-gray-200 rounded" />
              ))}
            </div>
            <div className="h-10 w-10 bg-gray-200 rounded-full ml-8" />
          </div>
        ) : (
          <>
            <nav className="flex justify-between items-center h-20">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="HealthAccess Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto"
                />
              </Link>
              <button
                className="md:hidden block focus:outline-none"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label="Open menu"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="#189BA3"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              {pathName !== "/partner/onboarding" && (
                <>
                  {!isScrolled && (
                    <div className="hidden md:flex items-center space-x-12 transition-opacity duration-300">
                      <Link
                        href={NavItems[0].href}
                        className="capitalize text-sm font-[400] font-ubuntu relative group"
                      >
                        {NavItems[0].label}
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                      </Link>
                      {menuTypes?.slice(0, 2)?.map((type, idx) => (
                        <Link
                          key={type.id}
                          href={`/${type?.name?.replace(/\s+/g, "-")}?typeid=${type.id}&name=${encodeURIComponent(type.name)}`}
                          className="capitalize text-sm font-[400] font-ubuntu relative group"
                        >
                          {type.name}
                          <span className="absolute -bottom-1 left-0 w-full h-1 bg-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                        </Link>
                      ))}
                      <Link
                        href={NavItems[3].href}
                        className="capitalize text-sm font-[400] font-ubuntu relative group"
                      >
                        {NavItems[3].label}
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                      </Link>
                      <Link
                        href={NavItems[4].href}
                        className="capitalize text-sm font-[400] font-ubuntu relative group"
                      >
                        {NavItems[4].label}
                        <span className="absolute -bottom-1 left-0 w-full h-1 bg-teal-500 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                      </Link>
                    </div>
                  )}

                  {isScrolled && !forceShowMainSearch && (
                    <div 
                      className="flex justify-center items-center w-full max-w-2xl mx-auto cursor-pointer"
                      onClick={handleScrolledSearchClick}
                    >
                      <div className="bg-white p-2 rounded-full shadow-lg border border-gray-200 flex items-center gap-4 w-full max-w-lg hover:shadow-xl transition-shadow">
                        <div className="flex items-center gap-2 flex-1">
                          <MapPin className="h-4 w-4 text-[#189BA3]" />
                          <span className="text-sm text-gray-600">Location</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 border-l border-gray-200 pl-4">
                          <Stethoscope className="h-4 w-4 text-[#189BA3]" />
                          <span className="text-sm text-gray-600">Service</span>
                        </div>
                        <div className="flex items-center gap-2 flex-1 border-l border-gray-200 pl-4">
                          <Calendar className="h-4 w-4 text-[#189BA3]" />
                          <span className="text-sm text-gray-600">Date</span>
                        </div>
                        <Button
                          size="icon"
                          className="bg-[#189BA3] hover:bg-teal-600 rounded-full h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleScrolledSearchClick();
                          }}
                        >
                          <Search className="h-4 w-4 text-white" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {user ? (
                    <HeaderMenu />
                  ) : (
                    <div className="flex items-center space-x-4">
                      <ButtonTheme
                        onClick={() => router.push("/partner/become-partner")}
                        className="rounded-[24px]"
                        paddingY="py-4"
                        paddingX="px-6"
                        bgColor="bg-[#1E222B]"
                        textColor="text-white"
                      >
                        Become a Partner
                      </ButtonTheme>
                      <Link href="/login">
                        <span className="hidden underline text-sm font-ubuntu font-[400] md:inline">
                          Sign In
                        </span>
                      </Link>
                    </div>
                  )}
                </>
              )}
            </nav>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="md:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-50 flex flex-col items-center py-6 space-y-4 border-b border-[#DCDCDC]"
              >
                <Link
                  href={NavItems[0].href}
                  className="capitalize text-base font-[400] font-ubuntu py-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {NavItems[0].label}
                </Link>
                {loading
                  ? [0, 1].map((i) => (
                      <div
                        key={i}
                        className="h-6 w-40 bg-gray-200 animate-pulse rounded my-2"
                      />
                    ))
                  : menuTypes?.slice(0, 2).map((type, idx) => (
                      <Link
                        key={type.id}
                        href={`${NavItems[idx + 1].href}?typeid=${
                          type.id
                        }&name=${encodeURIComponent(type.name)}`}
                        className="capitalize text-base font-[400] font-ubuntu py-2"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        {type.name}
                      </Link>
                    ))}
                <Link
                  href={NavItems[3].href}
                  className="capitalize text-base font-[400] font-ubuntu py-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {NavItems[3].label}
                </Link>
                <Link
                  href={NavItems[4].href}
                  className="capitalize text-base font-[400] font-ubuntu py-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {NavItems[4].label}
                </Link>
              </div>
            )}
            {pathName !== "/partner/onboarding" && (
              <div
                className={`w-full bg-white transition-all z-50 duration-300 ${
                  shouldShowMainSearch ? "py-6 opacity-100 h-auto" : "py-2 opacity-0 h-0"
                }`}
              >
                <div className="px-4">
                  <AirbnbStyleSearch />
                </div>
              </div>
            )}
          </>
        )}
      </LayoutWrapper>
      <div className="border-b border-[#DCDCDC] border-width-2"></div>
    </header>
  );
};

export default Header;
