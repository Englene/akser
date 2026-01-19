import { useState, useEffect } from 'react'

/**
 * useScrollZoom - Custom hook for scroll-triggered zoom
 * Bruker Intersection Observer til å detektere når en lokasjon kommer i view
 */
function useScrollZoom() {
  const [activeLocation, setActiveLocation] = useState(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const locationId = entry.target.dataset.city
            if (locationId) {
              setActiveLocation(locationId)
            }
          }
        })
      },
      {
        threshold: 0.5,  // Trigger når 50% av element er synlig
        rootMargin: '-20% 0px -20% 0px'  // Offset for bedre timing
      }
    )

    // Observer alle location triggers
    const triggers = document.querySelectorAll('[data-city]')
    triggers.forEach(trigger => observer.observe(trigger))

    return () => {
      observer.disconnect()
    }
  }, [])

  return activeLocation
}

export default useScrollZoom
