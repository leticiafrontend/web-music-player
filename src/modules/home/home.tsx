import { useState } from 'react'

import { Cover } from '@components/cover'
import { DropArea } from '@components/drop-area'
import { MiniPlayer } from '@components/mini-player'
import { useAudioPlayer } from '@hooks/use-audio-player'

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const audioPlayer = useAudioPlayer(selectedFile)

  const handleFileAccepted = (file: File) => {
    setSelectedFile(file)
    console.log('Accepted file:', file)
  }

  // const formatTime = (seconds: number) => {
  //   const mins = Math.floor(seconds / 60)
  //   const secs = Math.floor(seconds % 60)
  //   return `${mins}:${secs.toString().padStart(2, '0')}`
  // }

  return (
    <DropArea onFileAccepted={handleFileAccepted}>
      <div className="bg-charcoal h-screen w-screen flex flex-col items-center justify-center text-white relative">
        <Cover gradient={selectedFile ? 'pink' : undefined} />
        <h1 className="text-2xl font-semibold my-10">
          {selectedFile ? audioPlayer.metadata.album : 'Drop your music file'}
        </h1>

        {/* <div className="text-center my-10">
          {selectedFile ? (
            <div>
              <h1 className="text-2xl font-semibold mb-4">
                {audioPlayer.metadata.title || selectedFile.name}
              </h1>
              <p className="text-lg text-gray-300 mb-2">
                {audioPlayer.metadata.artist || 'Unknown Artist'}
              </p>
              {audioPlayer.metadata.album && (
                <p className="text-sm text-gray-400 mb-4">
                  {audioPlayer.metadata.album}
                </p>
              )}

              {audioPlayer.isLoading ? (
                <p className="text-sm text-gray-400">Loading audio...</p>
              ) : (
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={audioPlayer.controls.togglePlay}
                    className="bg-white text-black px-6 py-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    {audioPlayer.isPlaying ? 'Pause' : 'Play'}
                  </button>

                  <div className="text-sm text-gray-400">
                    {formatTime(audioPlayer.currentTime)} /{' '}
                    {formatTime(audioPlayer.duration)}
                  </div>
                </div>
              )}

              <div className="w-64 mx-auto">
                <input
                  type="range"
                  min={0}
                  max={audioPlayer.duration}
                  value={audioPlayer.currentTime}
                  onChange={(e) =>
                    audioPlayer.controls.seek(Number(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            </div>
          ) : (
            <h1 className="text-2xl font-semibold">Drop your music file</h1>
          )}
        </div> */}

        {selectedFile && !audioPlayer.isLoading && (
          <MiniPlayer audioPlayer={audioPlayer} />
        )}
      </div>
    </DropArea>
  )
}
