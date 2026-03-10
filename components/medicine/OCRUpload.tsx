'use client';

import { Camera, Image as ImageIcon, Loader2 } from 'lucide-react';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface OCRUploadProps {
  onScanSuccess: (data: 
    { name?: string; 
      instructions?: string;
      warnings?: string; 
      expiryDate?: string 
    }) => void;
}

function OCRUpload({ onScanSuccess }: OCRUploadProps) {
  // We need two refs: one for the camera, one for the file gallery
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isScanning, setIsScanning] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    const loadingToast = toast.loading("AI is reading the label...");

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async () => {
        const base64String = reader.result as string;

        const res = await fetch('/api/scan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64String }),
        });

        const data = await res.json();

        console.log("output data is: ", data);
        if (data.success) {
          toast.success("Medicine details extracted!", { id: loadingToast });
          onScanSuccess(data.extractedData);
        } else {
          toast.error(data.error || "Failed to read label.", { id: loadingToast });
        }
        setIsScanning(false);
      };
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.", { id: loadingToast });
      setIsScanning(false);
    }
    
    // Reset both inputs so they can be used again
    if (cameraInputRef.current) cameraInputRef.current.value = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className={`bg-gradient-to-br from-theme/20 to-theme-bold/2 border-2 border-dashed border-theme/40
                rounded-md p-5 flex flex-col items-center justify-center text-center w-full
                 transition-all ${isScanning ? 'opacity-70 cursor-wait' : 'hover:border-theme/90 hover:bg-theme/4'}`}
    >
      {/* Hidden Input 1: Forces Mobile Camera */}
      <input
        type="file"
        ref={cameraInputRef}
        onChange={handleFileChange}
        accept="image/*"
        capture="environment"
        className="hidden"
      />

      {/* Hidden Input 2: Opens File Browser / Gallery */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {isScanning ? (
        <div className="flex flex-col items-center py-4">
          <div className="w-14 h-14 bg-cream rounded-full flex items-center justify-center mb-4">
            <Loader2 className="w-6 h-6 text-theme animate-spin" />
          </div>
          <h3 className="text-main/80 font-bold text-md mb-1">Analyzing Image...</h3>
          <p className="text-xs text-main/70 max-w-md font-medium">Gemini AI is extracting medicine details...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center w-full">
          <h3 className="text-main/80 font-bold text-md mb-2">Smart Add with AI</h3>
          <p className="text-xs text-main/70 max-w-md font-medium mb-6">
            Upload a photo of the medicine label and we'll fill out this form automatically.
          </p>
          
          <div className="flex items-center gap-4">
            <button 
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              className="flex items-center hover:cursor-pointer gap-2 bg-white/40 border border-main/10 
              hover:border-theme shadow-xs px-4 py-2 rounded-lg text-xs font-semibold text-main 
              transition-all hover:-translate-y-0.5"
            >
              <Camera className="w-4 h-4 text-theme" />
              Use Camera
            </button>

            {/* Button 2: Upload */}
            <button 
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 bg-white/40 hover:cursor-pointer border
               border-main/10 hover:border-theme shadow-xs px-4 py-2 rounded-lg text-xs font-semibold
               text-main transition-all hover:-translate-y-0.5"
            >
              <ImageIcon className="w-4 h-4 text-theme" />
              Upload Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default OCRUpload;