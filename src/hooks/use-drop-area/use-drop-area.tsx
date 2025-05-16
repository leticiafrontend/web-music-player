import { useCallback, useEffect, useRef } from 'react'

import { useSmoothCursor } from '../use-smooth-cursor'

interface UseDropAreaOptions {
  onFileAccepted: (file: File) => void
  cursorSmoothFactor?: number
}

export function useDropArea({
  onFileAccepted,
  cursorSmoothFactor = 0.1,
}: UseDropAreaOptions) {
  const dropAreaRef = useRef<HTMLDivElement>(null)
  const dragOverlayRef = useRef<HTMLDivElement>(null)
  const dropIndicatorRef = useRef<HTMLDivElement>(null)

  const {
    isDragging: isDraggingOver,
    currentPosition,
    startTracking,
    stopTracking,
    updateCursorTarget,
  } = useSmoothCursor(cursorSmoothFactor)

  const setupDragListeners = useCallback(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      updateCursorTarget(e.clientX, e.clientY)

      if (!isDraggingOver) {
        startTracking(e.clientX, e.clientY)
      }
    }

    const handleDragLeave = (e: DragEvent) => {
      if (e.currentTarget === e.target) {
        stopTracking()
      }
    }

    const handleMouseLeave = () => {
      stopTracking()
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      stopTracking()

      if (onFileAccepted && e.dataTransfer?.files?.length > 0) {
        onFileAccepted(e.dataTransfer.files[0])
      }
    }

    document.addEventListener('dragover', handleDragOver)
    document.addEventListener('dragleave', handleDragLeave)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('drop', handleDrop)

    return () => {
      document.removeEventListener('dragover', handleDragOver)
      document.removeEventListener('dragleave', handleDragLeave)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('drop', handleDrop)
    }
  }, [
    isDraggingOver,
    startTracking,
    stopTracking,
    updateCursorTarget,
    onFileAccepted,
  ])

  useEffect(setupDragListeners, [setupDragListeners])

  useEffect(() => {
    if (!dropIndicatorRef.current) return

    const updateIndicator = () => {
      if (dropIndicatorRef.current && isDraggingOver) {
        dropIndicatorRef.current.style.transform = `translate(-50%, -50%) translate(${currentPosition.current.x}px, ${currentPosition.current.y}px)`
      }

      if (isDraggingOver) {
        requestAnimationFrame(updateIndicator)
      }
    }

    if (isDraggingOver) {
      requestAnimationFrame(updateIndicator)
    }
  }, [isDraggingOver])

  return {
    dropAreaRef,
    dragOverlayRef,
    dropIndicatorRef,
    isDraggingOver,
    currentPosition,
  }
}
