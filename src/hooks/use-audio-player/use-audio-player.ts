import { useEffect, useRef, useState } from 'react'

interface AudioMetadata {
  title?: string
  artist?: string
  album?: string
  duration?: number
  cover?: string
}

interface AudioPlayerState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  isLoading: boolean
  metadata: AudioMetadata
  audioUrl: string | null
}

interface AudioPlayerControls {
  play: () => void
  pause: () => void
  togglePlay: () => void
  seek: (time: number) => void
  setVolume: (volume: number) => void
  stop: () => void
}

export interface UseAudioPlayer extends AudioPlayerState {
  controls: AudioPlayerControls
}

export const useAudioPlayer = (file: File | null): UseAudioPlayer => {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isLoading: false,
    metadata: {},
    audioUrl: null,
  })

  const extractMetadata = async (file: File): Promise<AudioMetadata> => {
    console.log(file)
    return new Promise((resolve) => {
      const fallbackMetadata: AudioMetadata = {
        title: file.name.replace(/\.[^/.]+$/, ''),
        artist: 'Unknown Artist',
        album: 'Unknown Album',
      }

      if (window.jsmediatags) {
        window.jsmediatags.read(file, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onSuccess: (tag: any) => {
            console.log(tag)
            const metadata: AudioMetadata = {
              title: tag.tags.title || fallbackMetadata.title,
              artist: tag.tags.artist || fallbackMetadata.artist,
              album: tag.tags.album || fallbackMetadata.album,
            }

            if (tag.tags.picture) {
              const picture = tag.tags.picture
              const base64String = picture.data.reduce(
                (acc: string, byte: number) => {
                  return acc + String.fromCharCode(byte)
                },
                '',
              )
              metadata.cover = `data:${picture.format};base64,${btoa(base64String)}`
            }

            resolve(metadata)
          },
          onError: () => {
            resolve(fallbackMetadata)
          },
        })
      } else {
        resolve(fallbackMetadata)
      }
    })
  }

  useEffect(() => {
    if (!file) {
      setState((prev) => ({
        ...prev,
        audioUrl: null,
        metadata: {},
        isPlaying: false,
        currentTime: 0,
        duration: 0,
      }))
      return
    }

    const loadAudio = async () => {
      setState((prev) => ({ ...prev, isLoading: true }))

      try {
        const audioUrl = URL.createObjectURL(file)

        const metadata = await extractMetadata(file)

        if (audioRef.current) {
          audioRef.current.pause()
          URL.revokeObjectURL(audioRef.current.src)
        }

        const audio = new Audio(audioUrl)
        audioRef.current = audio

        const handleLoadedMetadata = () => {
          setState((prev) => ({
            ...prev,
            duration: audio.duration,
            isLoading: false,
            audioUrl,
            metadata,
          }))
        }

        const handleTimeUpdate = () => {
          setState((prev) => ({
            ...prev,
            currentTime: audio.currentTime,
          }))
        }

        const handleEnded = () => {
          setState((prev) => ({
            ...prev,
            isPlaying: false,
            currentTime: 0,
          }))
        }

        const handleError = () => {
          setState((prev) => ({
            ...prev,
            isLoading: false,
          }))
          console.error('Error loading audio')
        }

        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('ended', handleEnded)
        audio.addEventListener('error', handleError)

        return () => {
          audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
          audio.removeEventListener('timeupdate', handleTimeUpdate)
          audio.removeEventListener('ended', handleEnded)
          audio.removeEventListener('error', handleError)
          URL.revokeObjectURL(audioUrl)
        }
      } catch (error) {
        console.error('Error processing file:', error)
        setState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    loadAudio()
  }, [file])

  const controls: AudioPlayerControls = {
    play: () => {
      if (audioRef.current) {
        audioRef.current.play()
        setState((prev) => ({ ...prev, isPlaying: true }))
      }
    },

    pause: () => {
      if (audioRef.current) {
        audioRef.current.pause()
        setState((prev) => ({ ...prev, isPlaying: false }))
      }
    },

    togglePlay: () => {
      if (state.isPlaying) {
        controls.pause()
      } else {
        controls.play()
      }
    },

    seek: (time: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = time
        setState((prev) => ({ ...prev, currentTime: time }))
      }
    },

    setVolume: (volume: number) => {
      if (audioRef.current) {
        audioRef.current.volume = Math.max(0, Math.min(1, volume))
        setState((prev) => ({ ...prev, volume }))
      }
    },

    stop: () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
        setState((prev) => ({
          ...prev,
          isPlaying: false,
          currentTime: 0,
        }))
      }
    },
  }

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        if (state.audioUrl) {
          URL.revokeObjectURL(state.audioUrl)
        }
      }
    }
  }, [])

  return {
    ...state,
    controls,
  }
}
