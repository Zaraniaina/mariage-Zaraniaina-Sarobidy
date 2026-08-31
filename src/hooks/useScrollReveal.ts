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

    const timeoutId = setTimeout(() => {
      setIsVisible(true)
      observer.disconnect()
    }, 1000)

    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [threshold])

  return { ref, isVisible }
}
