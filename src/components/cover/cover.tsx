import { MusicNotes } from '@phosphor-icons/react'
import React from 'react'

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

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${gradientClasses[gradient]}
        rounded-lg
        flex
        items-center
        justify-center
        border border-mediumGray
        ${className}
      `}
      onClick={onClick}
    >
      {icon || <MusicNotes size={iconSizes[size]} className="text-white" />}
    </div>
  )
}
