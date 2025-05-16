import React from 'react'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'gradient-green'
  | 'gradient-blue'
  | 'gradient-pink'
  | 'dark'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  icon?: React.ReactNode
  isLoading?: boolean
}

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  const baseStyles =
    'rounded-lg font-medium transition-all duration-200 focus:outline-none flex items-center justify-center'

  const variantStyles = {
    primary: 'bg-lightgray text-dark hover:bg-opacity-90',
    secondary:
      'bg-transparent border border-lightgray text-lightgray hover:bg-lightgray hover:bg-opacity-10',
    'gradient-green': 'bg-gradient-green text-dark hover:opacity-90',
    'gradient-blue': 'bg-gradient-blue text-white hover:opacity-90',
    'gradient-pink': 'bg-gradient-pink text-white hover:opacity-90',
    dark: 'bg-dark text-lightgray hover:bg-charcoal',
  }

  const sizeStyles = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  }

  const disabledStyle = 'opacity-50 cursor-not-allowed'

  const widthStyle = fullWidth ? 'w-full' : ''

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${widthStyle}
        ${disabled || isLoading ? disabledStyle : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="mr-2">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      ) : icon ? (
        <span className="mr-2">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
