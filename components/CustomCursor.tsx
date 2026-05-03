'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springConfig = { damping: 25, stiffness: 300 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Initialiser la position au centre de l'écran
    if (typeof window !== 'undefined') {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(centerX)
      mouseY.set(centerY)
      setIsMounted(true)
    }

    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleHoverableEnter = () => setIsHovering(true)
    const handleHoverableLeave = () => setIsHovering(false)

    const hoverables = document.querySelectorAll('a, button, [data-cursor-hover]')
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', handleHoverableEnter)
      el.addEventListener('mouseleave', handleHoverableLeave)
    })

    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      hoverables.forEach(el => {
        el.removeEventListener('mouseenter', handleHoverableEnter)
        el.removeEventListener('mouseleave', handleHoverableLeave)
      })
    }
  }, [mouseX, mouseY])

  if (!isMounted) return null

  // Particules autour du curseur
  const particleCount = 15
  const particles = Array.from({ length: particleCount }, (_, i) => {
    const angle = (i / particleCount) * Math.PI * 2
    const radius = isHovering ? 50 : 35
    return {
      id: i,
      angle,
      radius,
      size: 4 + Math.random() * 4,
    }
  })

  return (
    <>
      {/* Particules autour du curseur */}
      {particles.map((particle) => {
        const xOffset = Math.cos(particle.angle) * particle.radius
        const yOffset = Math.sin(particle.angle) * particle.radius
        
        return (
          <motion.div
            key={particle.id}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
              x: cursorX,
              y: cursorY,
            }}
          >
            <motion.div
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: '#60a5fa',
                borderRadius: '50%',
                boxShadow: `0 0 ${particle.size * 2}px rgba(96, 165, 250, 0.8)`,
                opacity: 0.7,
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3 + particle.id * 0.3,
                repeat: Infinity,
                ease: 'linear',
                delay: particle.id * 0.1,
              }}
            />
          </motion.div>
        )
      })}

      {/* Cercle externe */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-[#3b82f6] rounded-full"
          style={{
            width: isClicking ? '35px' : isHovering ? '55px' : '45px',
            height: isClicking ? '35px' : isHovering ? '55px' : '45px',
            boxShadow: `0 0 25px rgba(59, 130, 246, 0.5)`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      {/* Curseur central */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: isClicking ? '10px' : isHovering ? '16px' : '14px',
            height: isClicking ? '10px' : isHovering ? '16px' : '14px',
            backgroundColor: isHovering ? '#60a5fa' : '#3b82f6',
            boxShadow: `
              0 0 25px ${isHovering ? 'rgba(96, 165, 250, 1)' : 'rgba(59, 130, 246, 1)'},
              0 0 50px ${isHovering ? 'rgba(96, 165, 250, 0.7)' : 'rgba(59, 130, 246, 0.7)'},
              0 0 80px ${isHovering ? 'rgba(96, 165, 250, 0.4)' : 'rgba(59, 130, 246, 0.4)'}
            `,
          }}
          animate={{
            scale: isClicking ? [1, 0.8, 1] : isHovering ? [1, 1.2, 1] : [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </>
  )
}
