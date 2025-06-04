import { useState, useEffect } from 'react'

let isGoogleMapsLoading = false
let isGoogleMapsLoaded = false

export function useGoogleMaps() {
  const [isLoaded, setIsLoaded] = useState(isGoogleMapsLoaded)

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      setIsLoaded(true)
      return
    }

    if (isGoogleMapsLoading) {
      // Wait for the existing loading to complete
      const checkInterval = setInterval(() => {
        if (isGoogleMapsLoaded) {
          setIsLoaded(true)
          clearInterval(checkInterval)
        }
      }, 100)
      return () => clearInterval(checkInterval)
    }

    isGoogleMapsLoading = true

    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`
    script.async = true
    script.defer = true
    script.onload = () => {
      isGoogleMapsLoaded = true
      isGoogleMapsLoading = false
      setIsLoaded(true)
    }
    document.head.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return isLoaded
} 