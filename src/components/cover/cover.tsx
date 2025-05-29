import { MusicNotes } from '@phosphor-icons/react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

type GradientType = 'none' | 'green' | 'blue' | 'pink'

interface CoverProps {
  gradient?: GradientType
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
}

export const Cover: React.FC<CoverProps> = ({
  gradient = 'none',
  icon,
  size = 'md',
  className = '',
  onClick,
}) => {
  const [previousGradient, setPreviousGradient] =
    useState<GradientType>(gradient)
  const [showSplash, setShowSplash] = useState(false)

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
  }

  const gradientClasses = {
    none: 'bg-darkgray bg-opacity-[33%]',
    green: 'bg-gradient-green',
    blue: 'bg-gradient-blue',
    pink: 'bg-gradient-pink',
  }

  const iconSizes = {
    sm: 32,
    md: 64,
    lg: 96,
  }

  useEffect(() => {
    if (gradient !== previousGradient && previousGradient !== gradient) {
      if (gradient !== 'none') {
        setShowSplash(true)

        const timer = setTimeout(() => {
          setShowSplash(false)
        }, 800)

        return () => clearTimeout(timer)
      }
      setPreviousGradient(gradient)
    }
  }, [gradient, previousGradient])

  const waveVariants = {
    hidden: {
      scale: 0,
      opacity: 0.8,
    },
    visible: (i: number) => ({
      scale: [0, 1.2, 1.5],
      opacity: [0.8, 0.4, 0],
      transition: {
        duration: 0.8,
        delay: i * 0.1,
        ease: 'easeOut',
      },
    }),
  }

  const backgroundVariants = {
    initial: { scale: 1, opacity: 1 },
    changing: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 0.6,
        ease: 'easeInOut',
      },
    },
  }

  return (
    <div className="relative">
      <motion.div
        className={`
          ${sizeClasses[size]}
          ${gradientClasses[gradient]}
          rounded-lg
          flex
          items-center
          justify-center
          border border-mediumGray
          relative
          overflow-hidden
          ${className}
        `}
        onClick={onClick}
        variants={backgroundVariants}
        initial="initial"
        animate={showSplash ? 'changing' : 'initial'}
      >
        <AnimatePresence>
          {showSplash && (
            <motion.div
              className="absolute inset-0 bg-white mix-blend-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={
            showSplash
              ? {
                  scale: [1, 1.1, 1],
                  rotateZ: [0, 5, -5, 0],
                }
              : { scale: 1, rotateZ: 0 }
          }
          transition={{ duration: 0.6 }}
        >
          {icon || <MusicNotes size={iconSizes[size]} className="text-white" />}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {showSplash && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className={`
                  absolute inset-0 rounded-lg border-4
                  ${gradient === 'green' ? 'border-green-400' : ''}
                  ${gradient === 'blue' ? 'border-blue-400' : ''}
                  ${gradient === 'pink' ? 'border-pink-400' : ''}
                `}
                custom={i}
                variants={waveVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSplash && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => {
              const angle = i * 45 * (Math.PI / 180)
              const distance = 80
              const x = Math.cos(angle) * distance
              const y = Math.sin(angle) * distance

              return (
                <motion.div
                  key={i}
                  className={`
                    absolute w-2 h-2 rounded-full top-1/2 left-1/2
                    ${gradient === 'green' ? 'bg-green-400' : ''}
                    ${gradient === 'blue' ? 'bg-blue-400' : ''}
                    ${gradient === 'pink' ? 'bg-pink-400' : ''}
                  `}
                  initial={{
                    x: -4,
                    y: -4,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: x - 4,
                    y: y - 4,
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: 0.2 + i * 0.05,
                    ease: 'easeOut',
                  }}
                />
              )
            })}
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSplash && (
          <motion.div
            className={`
              absolute inset-0 rounded-lg opacity-20
              ${gradientClasses[gradient]}
            `}
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0, 0.3, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.8,
              ease: 'easeOut',
            }}
            style={{ zIndex: -1 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
