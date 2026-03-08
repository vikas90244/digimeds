'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Camera, Save, Pill, AlertTriangle, Calendar, Info } from 'lucide-react';
import { MedicineDetailType } from '@/types/medicine';

export default function AddMedicine() {
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
    
    // TEMPORARY: Just logging the data so you can see it works
    console.log("Submitting to API:", formData);
    
    // We will add the TanStack Query mutation here next!
    setTimeout(() => {
      setIsSubmitting(false);
      // router.push('/dashboard/medicines');
    }, 1000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto pb-20">
      
      {/* 1. Sticky Header */}
      <div className="sticky top-0 z-20 pt-6 md:pt-10 pb-4 px-4 md:px-8 bg-gray-50/90 backdrop-blur-lg border-b border-main/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/dashboard/medicines"
            className="w-10 h-10 rounded-full bg-white border border-main/10 flex items-center justify-center text-main/60 hover:text-main hover:bg-main/5 hover:border-main/20 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-main text-xl font-bold">Add Medicine</h1>
            <p className="text-sm text-main/50 font-medium">Create a new inventory record</p>
          </div>
        </div>
      </div>

      <div className="px-4 md:px-8 mt-6 flex flex-col gap-6">

        {/* 2. The OCR Teaser Zone (Future Feature) */}
        <div className="bg-gradient-to-br from-primary/5 to-theme/10 border-2 border-dashed border-primary/20 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-primary/40 transition-all hover:bg-primary/5">
          <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
            <Camera className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-main font-bold text-lg mb-1">Smart Add via Camera</h3>
          <p className="text-sm text-main/60 max-w-sm font-medium">
            Take a photo of the medicine label and our AI will fill out this form automatically. (Coming soon)
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-px bg-main/10 flex-1"></div>
          <span className="text-xs font-bold text-main/30 uppercase tracking-widest">OR ENTER MANUALLY</span>
          <div className="h-px bg-main/10 flex-1"></div>
        </div>

        {/* 3. The Manual Form */}
        <form onSubmit={handleSubmit} className="bg-white border border-main/10 rounded-3xl p-6 md:p-8 shadow-sm flex flex-col gap-6">
          
          {/* Top Row: Name and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-bold text-main flex items-center gap-2">
                <Pill className="w-4 h-4 text-main/40" /> Medicine Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="e.g. Paracetamol 500mg"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-main/10 rounded-xl text-main placeholder:text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
            </div>

            {/* Type Selector (Custom Pill UI) */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-main">Inventory Type *</label>
              <div className="flex items-center bg-gray-50 p-1 border border-main/10 rounded-xl h-[50px]">
                {(['scheduled', 'stored'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, type }))}
                    className={`flex-1 h-full rounded-lg text-sm font-bold capitalize transition-all ${
                      formData.type === type 
                        ? 'bg-white text-primary shadow-sm border border-main/5' 
                        : 'text-main/40 hover:text-main'
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
            <label htmlFor="instructions" className="text-sm font-bold text-main flex items-center gap-2">
              <Info className="w-4 h-4 text-main/40" /> Instructions <span className="text-main/30 font-normal">(Optional)</span>
            </label>
            <textarea
              id="instructions"
              name="instructions"
              placeholder="e.g. Take 1 tablet after meals, twice a day."
              rows={3}
              value={formData.instructions}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-main/10 rounded-xl text-main placeholder:text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium resize-none"
            />
          </div>

          {/* Warnings & Expiry Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Warnings Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="warnings" className="text-sm font-bold text-main flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" /> Warnings <span className="text-main/30 font-normal">(Optional)</span>
              </label>
              <textarea
                id="warnings"
                name="warnings"
                placeholder="e.g. May cause drowsiness."
                rows={2}
                value={formData.warnings}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-orange-50/30 border border-orange-100/50 rounded-xl text-main placeholder:text-orange-800/30 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all font-medium resize-none"
              />
            </div>

            {/* Expiry Date Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="expiryDate" className="text-sm font-bold text-main flex items-center gap-2">
                <Calendar className="w-4 h-4 text-main/40" /> Expiry Date <span className="text-main/30 font-normal">(Optional)</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-50 border border-main/10 rounded-xl text-main placeholder:text-main/30 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-main/5 mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-main text-white px-8 py-3.5 rounded-xl font-bold hover:bg-main/90 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <><Save className="w-5 h-5" /> Save Medicine</>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}