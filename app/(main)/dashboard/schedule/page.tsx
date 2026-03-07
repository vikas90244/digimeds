'use client';

import { useFetchUserMedDetails } from '@/hooks/user-meds';
import Loader from '@/components/ui-common/Loader';
import ErrorState from '@/components/medicine/Error';
import { Pill, Calendar, Plus, ChevronRight, AlertCircle } from 'lucide-react';
import Link from 'next/link';

const LOGGING = false;

export default function MedicinesMain() {
  const { data: medicines, error, isError, isLoading } = useFetchUserMedDetails();

  if (isLoading) return <Loader fullPage={true} />;
  if (isError) return <ErrorState fullPage={true} message={error?.message} />;

  LOGGING && console.log("data is: ", medicines);

  // Helper to format the date cleanly
  const formatExpiry = (dateString?: string) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <div className="w-full max-w-6xl mx-auto pb-12">
      
      {/* 1. Header Section */}
      <section className="py-8 px-6 md:px-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <h1 className="text-main text-2xl font-bold font-heading tracking-tight">My Medicines</h1>
          <p className="text-sm text-main/50 mt-1 font-medium">Manage your inventory and prescriptions</p>
        </div>

        {/* Action Button (Ready for your Add page) */}
        <Link 
          href="/dashboard/medicines/add" 
          className="flex items-center justify-center gap-2 bg-main text-white px-5 py-2.5 rounded-xl font-medium hover:bg-main/90 transition-all shadow-sm active:scale-95 w-full md:w-auto"
        >
          <Plus className="w-4 h-4" /> Add Medicine
        </Link>
      </section>

      {/* 2. Content Section */}
      <section className="px-6 md:px-12">
        
        {/* Empty State */}
        {!medicines || medicines.length === 0 ? (
          <div className="bg-white border border-main/10 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
            <div className="bg-theme/10 p-4 rounded-full mb-4">
              <Pill className="w-8 h-8 text-primary opacity-80" />
            </div>
            <h3 className="text-lg font-bold text-main mb-2">Your cabinet is empty</h3>
            <p className="text-main/50 text-sm max-w-sm mb-6">
              You haven't added any medicines yet. Click the button above to start tracking your inventory.
            </p>
          </div>
        ) : (
          
          /* Card Rows */
          <div className="flex flex-col gap-4">
            {medicines.map((med) => {
              // Basic check if expiry is missing to show a warning icon
              const isMissingExpiry = !med.expiryDate;

              return (
                <div 
                  key={med._id} 
                  className="bg-white border border-main/10 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-[2px_4px_16px_rgba(0,0,0,0.02)] hover:border-theme/40 hover:shadow-md transition-all group cursor-pointer"
                >
                  
                  {/* Left Side: Icon & Details */}
                  <div className="flex items-center gap-5">
                    
                    {/* Icon Box */}
                    <div className="w-14 h-14 rounded-xl bg-theme/10 border border-theme/20 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-theme/20 transition-all">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    
                    {/* Text Details */}
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-main text-lg leading-none capitalize">
                          {med.name}
                        </h3>
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md ${
                          med.type === 'scheduled' ? 'bg-primary/10 text-primary' : 'bg-main/5 text-main/60'
                        }`}>
                          {med.type}
                        </span>
                      </div>
                      
                      <p className="text-sm text-main/50 line-clamp-1 font-medium">
                        {med.instructions || "No instructions added"}
                      </p>
                    </div>

                  </div>

                  {/* Right Side: Expiry & Chevron */}
                  <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 border-main/5 pt-4 md:pt-0 mt-2 md:mt-0 w-full md:w-auto">
                    
                    {/* Expiry Block */}
                    <div className="flex flex-col md:items-end">
                      <span className="text-[10px] font-bold text-main/40 uppercase tracking-widest mb-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> Expiry
                      </span>
                      
                      <div className="flex items-center gap-1.5">
                        {isMissingExpiry && <AlertCircle className="w-4 h-4 text-warning" />}
                        <span className={`text-sm font-semibold ${isMissingExpiry ? 'text-warning' : 'text-main'}`}>
                          {formatExpiry(med.expiryDate)}
                        </span>
                      </div>
                    </div>

                    {/* Interaction Hint */}
                    <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                      <ChevronRight className="w-4 h-4 text-main/30 group-hover:text-primary transition-colors" />
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>
    </div>
  );
}