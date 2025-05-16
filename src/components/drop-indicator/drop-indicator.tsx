import { memo } from 'react'

interface DropIndicatorProps {
  width?: number
  height?: number
}

export const DropIndicator = memo(
  ({ width = 150, height = 150 }: DropIndicatorProps) => {
    const widthWithPadding = width + 4
    const heightWithPadding = height + 4

    return (
      <svg
        width={widthWithPadding}
        height={heightWithPadding}
        className="absolute inset-0"
      >
        <defs>
          <linearGradient
            id="borderGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#71FF67" />
            <stop offset="100%" stopColor="#29BBBB" />
          </linearGradient>
        </defs>
        <rect
          x="2"
          y="2"
          width={width}
          height={height}
          fill="rgba(113, 255, 103, 0.2)"
          rx="8"
          ry="8"
        />
        <rect
          x="2"
          y="2"
          width={width}
          height={height}
          rx="8"
          ry="8"
          fill="none"
          stroke="url(#borderGradient)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />
      </svg>
    )
  },
)

DropIndicator.displayName = 'DropIndicator'
