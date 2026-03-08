import { Camera } from 'lucide-react'
import React from 'react'

function OCRUpload() {
  return (
    <div className='bg-gradient-to-br from-theme/20 to-theme-bold/2 border-2 border-dashed border-theme/40
              rounded-md p-3 md:p-5 flex flex-col items-center justify-center text-center max-w-5xl
               group cursor-pointer hover:border-theme/90 transition-all hover:bg-theme/4'
    >
          <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Camera className="w-6 h-6 text-theme" />
          </div>

          <h3 className="text-main/80 font-bold text-md mb-1">Smart Add via Camera</h3>
          <p className="text-xs text-main/70 max-w-md font-medium">
            Take a photo of the medicine label and AI will fill out this form automatically. (Coming soon)
          </p>
    </div>
  )
}

export default OCRUpload