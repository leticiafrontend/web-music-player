import { useCallback, useEffect, useRef, useState } from 'react'

export const useSmoothCursor = (smoothFactor = 0.1) => {
  const cursorPositionRef = useRef({ x: 0, y: 0 })
  const currentPositionRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const updateCursorPosition = useCallback(() => {
    const dx = cursorPositionRef.current.x - currentPositionRef.current.x
    const dy = cursorPositionRef.current.y - currentPositionRef.current.y

    currentPositionRef.current.x += dx * smoothFactor
    currentPositionRef.current.y += dy * smoothFactor

    if (isDragging) {
      animationFrameRef.current = requestAnimationFrame(updateCursorPosition)
    }
  }, [isDragging, smoothFactor])

  const startTracking = useCallback((initialX: number, initialY: number) => {
    cursorPositionRef.current = { x: initialX, y: initialY }
    currentPositionRef.current = { x: initialX, y: initialY }
    setIsDragging(true)
  }, [])

  const stopTracking = useCallback(() => {
    setIsDragging(false)
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }, [])

  const updateCursorTarget = useCallback((x: number, y: number) => {
    cursorPositionRef.current = { x, y }
  }, [])

  useEffect(() => {
    if (isDragging && !animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(updateCursorPosition)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
        animationFrameRef.current = null
      }
    }
  }, [isDragging, updateCursorPosition])

  return {
    isDragging,
    currentPosition: currentPositionRef,
    startTracking,
    stopTracking,
    updateCursorTarget,
  }
}
