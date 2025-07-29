import { useState, useEffect } from "react";

let isGoogleMapsLoading = false;
let isGoogleMapsLoaded = false;

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(isGoogleMapsLoaded);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      setIsLoaded(true);
      return;
    }

    if (isGoogleMapsLoading) {
      // Wait for the existing loading to complete
      const checkInterval = setInterval(() => {
        if (isGoogleMapsLoaded) {
          setIsLoaded(true);
          clearInterval(checkInterval);
        }
      }, 100);
      return () => clearInterval(checkInterval);
    }

    isGoogleMapsLoading = true;

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      isGoogleMapsLoaded = true;
      isGoogleMapsLoading = false;
      setIsLoaded(true);
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return isLoaded;
}

// Custom hook for Google Places Autocomplete
export function useGooglePlacesAutocomplete() {
  const isGoogleLoaded = useGoogleMaps();
  const [predictions, setPredictions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchPlaces = async (input: string) => {
    if (!isGoogleLoaded || !input.trim() || !window.google?.maps?.places) {
      setPredictions([]);
      return;
    }

    setIsLoading(true);

    const service = new window.google.maps.places.AutocompleteService();

    service.getPlacePredictions(
      {
        input: input.trim(),
        types: ["(cities)"], // Focus on cities, but you can change this
        componentRestrictions: { country: ["US", "GB"] }, // Restrict to US and UK
      },
      (predictions, status) => {
        setIsLoading(false);

        if (
          status === window.google.maps.places.PlacesServiceStatus.OK &&
          predictions
        ) {
          setPredictions(predictions);
        } else {
          setPredictions([]);
        }
      }
    );
  };

  const getPlaceDetails = async (
    placeId: string
  ): Promise<{
    name: string;
    latitude: number;
    longitude: number;
    formatted_address: string;
  } | null> => {
    if (!isGoogleLoaded || !window.google?.maps?.places) {
      return null;
    }

    return new Promise((resolve) => {
      const service = new window.google.maps.places.PlacesService(
        document.createElement("div")
      );

      service.getDetails(
        {
          placeId,
          fields: ["name", "geometry", "formatted_address"],
        },
        (place, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            place?.geometry?.location
          ) {
            resolve({
              name: place.formatted_address || place.name || "",
              latitude: place.geometry.location.lat(),
              longitude: place.geometry.location.lng(),
              formatted_address: place.formatted_address || place.name || "",
            });
          } else {
            resolve(null);
          }
        }
      );
    });
  };

  const clearPredictions = () => {
    setPredictions([]);
  };

  return {
    isGoogleLoaded,
    predictions,
    isLoading,
    searchPlaces,
    getPlaceDetails,
    clearPredictions,
  };
}
