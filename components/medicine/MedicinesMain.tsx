'use client';

import { useState } from 'react';
import { useFetchUserMedDetails } from '@/hooks/user-meds'
import Loader from '../ui-common/Loader';
import ErrorState from './Error';
import MedicineFilter from './MedicineFilter';
import MedicineCard from './MedicineCard';

const LOGGING = true;

function MedicinesMain() {
  const { data: medicines, error, isError, isLoading } = useFetchUserMedDetails();
  
  // NEW: Track which card is currently expanded
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (isLoading) return <Loader fullPage={true} />;
  if (isError) return <ErrorState fullPage={true} message={error.message} />;

  LOGGING && console.log("data is: ", medicines);

  // NEW: The toggle handler
  const handleToggle = (id: string) => {
    // If clicking the already open card, close it. Otherwise, open the new one.
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full">
      <div className="px-4 md:px-16 max-w-7xl mx-auto flex flex-col">
        
        <div className='sticky top-0 z-20 pt-6 md:pt-10 pb-4 bg-gray-50/90 backdrop-blur-lg border-b border-main/5'>
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-main text-xl md:text-2xl font-semibold">My Medicines</h1>
              <p className="text-sm text-main/70 font-medium hidden md:block">
                Manage your inventory and prescriptions...
              </p>
            </div>
            <div className="w-full md:w-auto">
              <button className="w-full md:w-auto bg-main text-white text-xs px-5 py-2.5 rounded-xl hover:rounded-full transition-all duration-300 font-medium hover:cursor-pointer shadow-sm">
                Add new medicine
              </button>
            </div>
          </section>

          <section className='mt-6'>
              <MedicineFilter />
          </section>
        </div>
      
        <section className='mt-4 pb-12 flex flex-col gap-4'>
            {medicines?.map((medicine) => (
              <MedicineCard 
                key={medicine._id} 
                med={medicine} 
                // Pass down the state and toggle function
                isExpanded={expandedId === medicine._id}
                onToggle={() => handleToggle(medicine._id)}
              />
            ))}
        </section>

      </div>
    </div>
  )
}

export default MedicinesMain;