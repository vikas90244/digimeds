'use client';

import Link from 'next/link'
import React, { useState } from 'react'
import OCRUpload from './OCRUpload'
import { AlertTriangle, Calendar, Info, Pill, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'; 
function AddMedicine() {
    const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State matching your MedicineDetailType
  const [formData, setFormData] = useState({
    name: '',
    type: 'scheduled' as 'scheduled' | 'stored',
    instructions: '',
    warnings: '',
    expiryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    console.log("Submitting to API:", formData);
    
    setTimeout(() => {
      setIsSubmitting(false);
      // router.push('/dashboard/medicines');
    }, 1000);
  };
  return (
     <div className="w-full">
      <div className="max-w-7xl z-20 mx-auto flex flex-col">
        
        <div className=' pt-6 px-4 md:px-16 md:pt-10 pb-4 bg-gray-50/90 backdrop-blur-lg '>
          <section className="flex flex-col md:flex-row md:items-center md:pb-4 md:justify-between gap-4 px-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-main text-xl md:text-2xl font-semibold"> Add Medicine {"-->"} </h1>
              {/* <p className="text-sm text-main/70 font-medium hidden md:block">
                Manage your inventory and prescriptions...
              </p> */}
            </div>
          </section>

          <section className='mt-6 mb-4 mx-4 flex justify-center'>
            <OCRUpload />
          </section>
        </div>
      
        <div className="flex items-center gap-4">
          <div className="h-px bg-main/10 flex-1"></div>
          <span className="text-xs font-semibold text-main/80 uppercase tracking-widest">OR ENTER MANUALLY</span>
          <div className="h-px bg-main/10 flex-1"></div>
        </div>

        <section className='mt-4 pb-12 gap-4 flex justify-center '>   
            <form onSubmit={handleSubmit} className="bg-gray-100 w-80 md:max-w-4xl lg:max-w-6xl md:min-w-xl border border-main/10 rounded-md p-6 md:p-8  flex flex-col gap-6">
          
          {/* Top Row: Name and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold text-main flex items-center gap-2">
                <Pill className="w-3 h-3 text-main/50" /> Medicine Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Paracetamol 500mg"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border text-sm border-main/10 rounded-md text-main placeholder:text-main/40 placeholder:text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-theme/20 focus:border-theme transition-all font-medium"
              />
            </div>

            {/* Type Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-main">Inventory Type *</label>
              <div className="flex items-center bg-gray-50 p-1 border border-main/10 rounded-md h-[42px]">
                {(['scheduled', 'stored'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                    className={`flex-1 h-full rounded-lg hover:cursor-pointer text-xs font-bold capitalize transition-all ${
                      formData.type === type 
                        ? 'bg-cream text-theme-bold shadow-md ' 
                        : 'text-main/60 hover:text-main'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Instructions Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="instructions" className="text-xs font-bold text-main flex items-center gap-2">
              <Info className="w-3 h-3 text-main/40" /> Instructions <span className="text-main/50 font-medium">(Optional)</span>
            </label>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="e.g. Take 1 tablet after meals, twice a day."
              rows={3}
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-50 border border-main/10 rounded-md text-main placeholder:text-main/30
               placeholder:text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-theme/20 
               focus:border-theme transition-all font-medium resize-none text-sm"
            />
          </div>

          {/* Warnings & Expiry Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Warnings Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="warnings" className="text-xs font-bold text-main flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-orange-400" /> Warnings <span className="text-main/50 font-medium">(Optional)</span>
              </label>
              <textarea
                id="warnings"
                name="warnings"
                placeholder="e.g. May cause drowsiness."
                rows={2}
                value={formData.warnings}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-orange-100/40 border border-orange-200/80 rounded-md text-main placeholder:text-orange-800/30 placeholder:text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all font-medium resize-none"
              />
            </div>

            {/* Expiry Date Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="expiryDate" className="text-xs font-bold text-main flex items-center gap-2">
                <Calendar className="w-3 h-3 text-main/40" /> Expiry Date <span className="text-main/50 font-normal">(Optional)</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-50 border border-main/10 rounded-md text-main placeholder:text-main/30 text-[0.85rem] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-theme/20 focus:border-theme transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-main/5 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-main text-white px-8 py-3 rounded-md font-semibold text-xs hover:bg-main/90 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <><Save className="w-3 h-3" fill='#a9a9a9' /> Save Medicine</>
              )}
            </button>
          </div>

        </form>
        </section>


      </div>
    </div>
  )
}

export default AddMedicine