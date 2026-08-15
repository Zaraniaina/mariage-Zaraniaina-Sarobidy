import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  duration?: number
  className?: string
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  duration = 800,
  className = ''
}) => {
  const { ref, isVisible } = useScrollReveal(0.15)

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case 'up':
          return 'translateY(40px)'
        case 'down':
          return 'translateY(-40px)'
        case 'left':
          return 'translateX(40px)'
        case 'right':
          return 'translateX(-40px)'
        case 'fade':
          return 'translateY(0)'
        default:
          return 'translateY(40px)'
      }
    }
    return 'translateY(0) translateX(0)'
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms ease-out, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
