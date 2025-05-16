import { ReactNode } from 'react'

import { DropIndicator } from '@components/drop-indicator'
import { useDropArea } from '@hooks/use-drop-area'

interface DropAreaProps {
  children: ReactNode
  onFileAccepted: (file: File) => void
  cursorSmoothFactor?: number
}

export const DropArea = ({
  children,
  onFileAccepted,
  cursorSmoothFactor = 0.1,
}: DropAreaProps) => {
  const {
    dropAreaRef,
    dragOverlayRef,
    dropIndicatorRef,
    isDraggingOver,
    currentPosition,
  } = useDropArea({ onFileAccepted, cursorSmoothFactor })

  return (
    <div ref={dropAreaRef} className="w-full h-full relative outline-none">
      {children}

      {isDraggingOver && (
        <div
          ref={dragOverlayRef}
          className="fixed inset-0 z-50 bg-black bg-opacity-[1%]"
        >
          <div
            ref={dropIndicatorRef}
            className="pointer-events-none absolute w-[150px] h-[150px] will-change-transform flex items-center justify-center z-10"
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
            }}
          >
            <DropIndicator />
          </div>
        </div>
      )}
    </div>
  )
}
