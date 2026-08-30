import { useEffect, useRef, useState } from 'react'

export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(element)
        }
      },
      { threshold }
    )

    observer.observe(element)

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight || document.documentElement.clientHeight
    const isInViewport = rect.top < windowHeight && rect.bottom > 0

    if (isInViewport) {
      setIsVisible(true)
      observer.disconnect()
    } else {
      const timeoutId = setTimeout(() => {
        setIsVisible(true)
        observer.disconnect()
      }, 800)

      return () => {
        clearTimeout(timeoutId)
        observer.disconnect()
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}
