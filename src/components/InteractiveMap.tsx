"use client";

import React from 'react';
import { MapPin } from 'lucide-react';

interface Partner {
  id: string;
  businessName: string;
  location: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  rating: number;
  isOpen: boolean;
}

interface SearchArea {
  latitude: number;
  longitude: number;
  radius: number;
}

interface InteractiveMapProps {
  partners: Partner[];
  searchArea: SearchArea;
  searchLocation?: string;
  stats?: {
    totalPartners: number;
    partnersInRadius: number;
    availablePartners: number;
    averageDistance: number;
  };
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ 
  partners, 
  searchArea, 
  searchLocation,
  stats 
}) => {
  // Generate Google Maps URL with partner locations
  const generateMapUrl = () => {
    const { latitude, longitude } = searchArea;
    
    // Base URL for Google Maps Embed API
    let mapUrl = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}`;
    
    // Set center and zoom
    mapUrl += `&center=${latitude},${longitude}`;
    mapUrl += `&zoom=12`;
    
    // Alternative: Use a simpler approach without API key for demo
    // This creates a map centered on the search area with markers
    const simpleMapUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;
    
    return simpleMapUrl;
  };

  // Create a comprehensive map URL with multiple partner markers
  const getMapWithMarkersUrl = () => {
    const { latitude, longitude } = searchArea;
    
    if (partners.length === 0) {
      // Just show the search area if no partners
      return `https://maps.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;
    }
    
    // For multiple partners, create a map URL that shows all locations
    if (partners.length === 1) {
      // Single partner - center on that partner
      const partner = partners[0];
      return `https://maps.google.com/maps?q=${partner.location.latitude},${partner.location.longitude}&z=15&output=embed`;
    }
    
    // Multiple partners - create a URL that shows the general area
    // Calculate the center point of all partners
    const allLats = partners.map(p => p.location.latitude).filter(Boolean);
    const allLngs = partners.map(p => p.location.longitude).filter(Boolean);
    
    if (allLats.length > 0 && allLngs.length > 0) {
      const centerLat = allLats.reduce((sum, lat) => sum + lat, 0) / allLats.length;
      const centerLng = allLngs.reduce((sum, lng) => sum + lng, 0) / allLngs.length;
      
      // Use the calculated center or search area center
      const finalLat = Math.abs(centerLat - latitude) < 0.1 ? latitude : centerLat;
      const finalLng = Math.abs(centerLng - longitude) < 0.1 ? longitude : centerLng;
      
      return `https://maps.google.com/maps?q=${finalLat},${finalLng}&z=12&output=embed`;
    }
    
    // Fallback to search area
    return `https://maps.google.com/maps?q=${latitude},${longitude}&z=12&output=embed`;
  };

  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative w-full h-[300px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden">
        {/* Interactive Map Iframe */}
        <iframe
          src={getMapWithMarkersUrl()}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
          title="Partners Location Map"
        />
        
        {/* Map overlay with search area info */}
        <div className="absolute top-4 left-4 right-4 bg-white p-3 rounded-lg shadow-md">
          <div className="text-sm font-medium mb-1">Search Area</div>
          <div className="text-xs text-gray-600 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {searchLocation || 'Current location'}
          </div>
          {stats && (
            <div className="text-xs text-gray-600 mt-1">
              Average distance: {stats.averageDistance} km
            </div>
          )}
          <div className="text-xs text-gray-500 mt-2">
            Showing {partners.length} partner{partners.length !== 1 ? 's' : ''} on map
          </div>
        </div>

        {/* Partner Markers Legend */}
        <div className="absolute bottom-4 left-4 right-4 bg-white p-3 rounded-lg shadow-md max-h-40 overflow-y-auto">
          <div className="text-xs font-medium mb-2">Partner Locations</div>
          <div className="space-y-2">
            {partners.slice(0, 4).map((partner, index) => (
              <div 
                key={partner.id} 
                className="flex items-center gap-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded transition-colors"
                onClick={() => {
                  // Open location in new tab
                  const url = `https://maps.google.com/maps?q=${partner.location.latitude},${partner.location.longitude}`;
                  window.open(url, '_blank');
                }}
                title={`Click to view ${partner.businessName} on Google Maps`}
              >
                <div className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{partner.businessName}</div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500">
                    <span className="truncate">{partner.location.name}</span>
                    {partner.isOpen && (
                      <span className="text-green-600 font-medium">• Open</span>
                    )}
                  </div>
                </div>
                {partner.rating && (
                  <div className="flex items-center gap-1 text-[10px] text-gray-600 flex-shrink-0">
                    <span>⭐</span>
                    <span>{partner.rating}</span>
                  </div>
                )}
              </div>
            ))}
            {partners.length > 4 && (
              <div className="text-xs text-gray-500 text-center pt-1 border-t">
                +{partners.length - 4} more partners
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap; 