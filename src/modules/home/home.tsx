import { useState } from 'react'

import { Button } from '@components/button'
import { Cover } from '@components/cover'
import { DropArea } from '@components/drop-area'

export const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileAccepted = (file: File) => {
    setSelectedFile(file)
    console.log('Accepted file:', file)
  }

  return (
    <DropArea onFileAccepted={handleFileAccepted}>
      <div className="bg-charcoal h-screen w-screen flex flex-col items-center justify-center text-white">
        <Cover />
        <h1 className="text-2xl font-semibold my-10">
          {selectedFile
            ? `Selected file: ${selectedFile.name}`
            : 'Add your first music file'}
        </h1>
        <Button className="w-64">Add music</Button>
      </div>
    </DropArea>
  )
}
