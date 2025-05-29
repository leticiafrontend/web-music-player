import {
  FastForward,
  Pause,
  Play,
  Queue,
  Repeat,
  Rewind,
  Shuffle,
  SpeakerHigh,
} from '@phosphor-icons/react'
import { motion } from 'framer-motion'
import { useCallback, useMemo } from 'react'

import { type UseAudioPlayer } from '@hooks/use-audio-player'

export const MiniPlayer = ({
  audioPlayer,
}: {
  audioPlayer: UseAudioPlayer
}) => {
  const { metadata, controls } = audioPlayer

  const title = useMemo(() => metadata.title || 'Unknown Title', [metadata])
  const artist = useMemo(() => metadata.artist || 'Unknown Artist', [metadata])
  const isPlaying = useMemo(() => audioPlayer.isPlaying, [audioPlayer])

  const handleForward = useCallback(() => {
    controls.seek(audioPlayer.currentTime + 10)
  }, [controls, audioPlayer.currentTime])

  const handleBack = useCallback(() => {
    controls.seek(audioPlayer.currentTime - 10)
  }, [controls, audioPlayer.currentTime])

  const handlePlay = useCallback(() => {
    controls.togglePlay()
  }, [controls])

  return (
    <motion.div
      className="bg-darkgray border border-mediumGray bg-opacity-30 border-opacity-30 h-14 rounded-full p-2 flex items-center gap-3 justify-between absolute bottom-10"
      initial={{
        y: 100,
        width: 56,
        opacity: 0,
      }}
      animate={{
        y: 0,
        width: 600,
        opacity: 1,
      }}
      transition={{
        y: { duration: 0.6, ease: 'easeOut' },
        width: { duration: 0.6, delay: 0.4, ease: 'easeOut' },
        opacity: { duration: 0.3 },
      }}
    >
      <motion.div
        className="flex items-center gap-3 w-[200px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-pink" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          <p className="font-semibold text-white text-sm truncate max-w-[132px]">
            {title}
          </p>
          <p className="text-white text-xs">{artist}</p>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center gap-2 w-[200px] justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      >
        <Rewind size={20} onClick={handleBack} className="cursor-pointer" />
        {isPlaying ? (
          <Pause size={20} onClick={handlePlay} className="cursor-pointer" />
        ) : (
          <Play size={20} onClick={handlePlay} className="cursor-pointer" />
        )}
        <FastForward
          size={20}
          onClick={handleForward}
          className="cursor-pointer"
        />
      </motion.div>

      <motion.div
        className="mr-1 flex items-center gap-2 w-[200px] justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <Shuffle size={20} />
          <Repeat size={20} />
          <Queue size={20} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.3 }}
        >
          <SpeakerHigh size={20} />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
