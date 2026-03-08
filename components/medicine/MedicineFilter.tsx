'use client';

import { Search, ArrowUpDown } from 'lucide-react';
import { useState } from 'react';

interface MedicineFilterPropType{

  query: string;
  setQuery: (val: string)=>void;
  activeType: 'all' | 'stored' | 'scheduled';
  setActiveType: (val: 'all' | 'stored' | 'scheduled')=>void;
  sortBy: 'newest' | 'expiry' | 'name';
  setSortBy: (val: 'newest' | 'expiry' | 'name') => void;

}
export default function MedicineFilter({
  query, setQuery, activeType, setActiveType, setSortBy
}: MedicineFilterPropType) {

  return (
    <div className="flex flex-col xl:flex-row gap-3 w-full">
      {/* input */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-main/40" />
        <input
          type="text"
          placeholder="Search medicines..."
          value={query}
          onChange={(e)=>setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-main/20 rounded-xl text-sm text-main placeholder:text-main/40 focus:outline-none focus:ring-2 focus:ring-theme focus:bg-white transition-all font-medium"
        />
      </div>

      <div className="flex flex-row gap-2 md:gap-3 w-full xl:w-auto shrink-0">

        {/* filter by type */}
        <div className="flex items-center gap-1 bg-gray-50 p-1 border border-main/20 rounded-xl flex-1 overflow-x-auto">
          {(['all', 'stored', 'scheduled'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex-1 px-2 py-2 md:px-4 text-[11px] sm:text-xs font-semibold capitalize rounded-lg transition-all whitespace-nowrap ${activeType === type
                  ? 'bg-theme text-main shadow-sm '
                  : 'text-main/60 hover:text-main hover:bg-cream'
                }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* sort by expiry */}
        <div className="relative w-10 md:w-11 shrink-0 bg-gray-50 border border-main/20 rounded-xl flex items-center justify-center hover:bg-main/5 transition-colors group">

          <ArrowUpDown className="w-4 h-4 text-main group-hover:text-main transition-colors" />

          <select
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
            title="Sort medicines"
            onChange={(e) => setSortBy(e.target.value as 'newest' | 'expiry' | 'name')}

          >
            <option value="newest" >Sort by: Newest</option>
            <option value="expiry" >Sort by: Expiring</option>
            <option value="name" >Sort by: A-Z</option>
          </select>
        </div>

      </div>
    </div>
  );
}