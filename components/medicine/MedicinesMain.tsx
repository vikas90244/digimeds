'use client';

import { useMemo, useState } from 'react';
import { useFetchUserMedDetails } from '@/hooks/user-meds'
import Loader from '../ui-common/Loader';
import ErrorState from './Error';
import MedicineFilter from './MedicineFilter';
import MedicineCard from './MedicineCard';
import Link from 'next/link';

const LOGGING = true;

function MedicinesMain() {

  const [expandedId, setExpandedId] = useState<string | null>(null);

  // filter states
  const [query, setQuery] = useState<string>("");
  const [activeType, setActiveType] = useState<'all' | 'stored' | 'scheduled'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'expiry' | 'name'>('newest');

  // data-hook
  const { data:medicines, error, isError, isLoading } = useFetchUserMedDetails();


  // filter track
  const isFiltering = query.trim().length >= 2 || activeType !== 'all';

  const filteredMedicines = useMemo(()=>{
    if(!medicines) return [];

    let result = [...medicines];

    if(query.length >= 2 && query.trim()){
      result = result.filter((med)=> med.name.toLowerCase().includes(query.toLowerCase())||med.instructions?.toLowerCase().includes(query.toLowerCase()));
    }
    if(activeType !== 'all'){
      result = result.filter((med) => med.type===activeType);
    }
    result.sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === 'expiry') {
        if (!a.expiryDate) return 1;
        if (!b.expiryDate) return -1;
        return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return result;
  }, [medicines, query, activeType, sortBy])



  if (isLoading) return <Loader fullPage={true} />;
  if (isError) return <ErrorState fullPage={true} message={error.message} />;


  LOGGING && console.log("data is: ", medicines);

  const handleToggle = (id: string) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="w-full">
      <div className="px-4 md:px-16 max-w-7xl mx-auto flex flex-col">
        
        <div className='sticky top-0 z-20 pt-6 md:pt-10 pb-4 bg-gray-50/90 backdrop-blur-lg border-b border-main/5'>
          <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 px-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-main text-xl md:text-2xl font-semibold">My Medicines</h1>
              <p className="text-sm text-main/70 font-medium hidden md:block">
                Manage your inventory and prescriptions...
              </p>
            </div>
            <div className="w-full md:w-auto">
              <Link 
              href={`/dashboard/medicines/add`}
              className="w-full md:w-auto bg-main text-white text-xs px-4 py-2.5 rounded-xl hover:rounded-full transition-all duration-300 font-medium hover:cursor-pointer shadow-sm">
                Add new medicine
              </Link>
            </div>
          </section>

          <section className='mt-6'>
              <MedicineFilter
               query={query}
               setQuery={setQuery}
               activeType={activeType}
               setActiveType={setActiveType}
               sortBy={sortBy}
               setSortBy={setSortBy}
               />
          </section>
        </div>
      
        <section className='mt-4 pb-12 flex flex-col gap-4'>
          
          {isFiltering && filteredMedicines.length>0 && (
            <div className="text-sm font-medium text-main/60 mb-2 px-2">
              Showing {filteredMedicines.length} result{filteredMedicines.length !== 1 ? 's' : ''} 
              {query.trim().length >= 2 && <span> for "<span className="text-main">{query}</span>"</span>}
            </div>
          )}

           {filteredMedicines.length === 0 ? (
            <div className="text-center py-10 text-main/50 font-medium bg-gray-50/50 ">
              No medicines found matching your current filters.
            </div>
          ) : (
            filteredMedicines.map((medicine) => (
              <MedicineCard 
                key={medicine._id} 
                med={medicine} 
                isExpanded={expandedId === medicine._id}
                onToggle={() => handleToggle(medicine._id)}
                searchQuery={query}
              />
            ))
          )}
        </section>

      </div>
    </div>
  )
}

export default MedicinesMain;