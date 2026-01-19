import { useState, useEffect, useRef } from 'react'

/**
 * useScrollAnimation - Intersection Observer hook for scroll-triggered animations
 * Detekterer når et element kommer i view og trigger fade-in animasjon
 *
 * @param {Object} options - Intersection Observer options
 * @param {number} options.threshold - % av element som må være synlig (default: 0.3)
 * @param {string} options.rootMargin - Margin offset (default: '0px')
 * @returns {Array} [ref, isVisible] - Ref til element og synlighet-status
 */
function useScrollAnimation(options = {}) {
  const { threshold = 0.3, rootMargin = '0px' } = options
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Unobserve after first trigger (fade-in kun én gang)
          observer.unobserve(entry.target)
        }
      },
      { threshold, rootMargin }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return [ref, isVisible]
}

export default useScrollAnimation
