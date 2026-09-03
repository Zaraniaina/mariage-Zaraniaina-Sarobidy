import React from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade'
type Effect = 'none' | 'blur' | 'zoom' | 'zoom-in' | 'zoom-blur'

interface ScrollRevealProps {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  effect?: Effect
  distance?: number
  duration?: number
  className?: string
  style?: React.CSSProperties
}

const PREMIUM_EASING = 'cubic-bezier(0.22, 1, 0.36, 1)'

const getHiddenStyles = (
  direction: Direction,
  effect: Effect,
  distance: number
): Pick<React.CSSProperties, 'transform' | 'filter'> => {
  const translate =
    direction === 'up'
      ? `translate3d(0, ${distance}px, 0)`
      : direction === 'down'
        ? `translate3d(0, -${distance}px, 0)`
        : direction === 'left'
          ? `translate3d(${distance}px, 0, 0)`
          : direction === 'right'
            ? `translate3d(-${distance}px, 0, 0)`
            : 'translate3d(0, 0, 0)'

  let transform = translate
  if (effect === 'zoom' || effect === 'zoom-blur') transform = `${translate} scale(0.92)`
  else if (effect === 'zoom-in') transform = `${translate} scale(1.06)`

  const filter = effect === 'blur' || effect === 'zoom-blur' ? 'blur(10px)' : undefined

  return { transform, filter }
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  effect = 'none',
  distance = 40,
  duration = 900,
  className = '',
  style,
}) => {
  const { ref, isVisible } = useScrollReveal(0.15)

  const useBlur = effect === 'blur' || effect === 'zoom-blur'

  const hiddenStyles = getHiddenStyles(direction, effect, distance)

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : hiddenStyles.transform,
        ...(useBlur ? { filter: isVisible ? 'blur(0px)' : hiddenStyles.filter } : {}),
        transition: `opacity ${duration}ms ${PREMIUM_EASING}, transform ${duration}ms ${PREMIUM_EASING}${
          useBlur ? `, filter ${duration}ms ${PREMIUM_EASING}` : ''
        }`,
        transitionDelay: `${delay}ms`,
        willChange: 'opacity, transform',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default ScrollReveal
