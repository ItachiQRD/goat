'use client'

import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

interface SplitTextProps {
  children: string
  className?: string
  delay?: number
}

export default function SplitText({ children, className = '', delay = 0 }: SplitTextProps) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  const words = children.split(' ')

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block mr-2">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              className="inline-block"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{
                duration: 0.5,
                delay: delay + (index * 0.05) + (charIndex * 0.02),
                ease: [0.6, -0.05, 0.01, 0.99],
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}





