'use client';

import { MedicineDetailType } from '@/types/medicine';
import { ArrowRight, Pill } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface RecentMedicinesProps {
  medicines: MedicineDetailType[];
}

export default function RecentMedicines({ medicines }: RecentMedicinesProps) {
  const recent = medicines.slice(0, 5);

  return (
    <div className="bg-gray-100 border border-main/10 rounded-md p-5 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-main">Recent Medicines</span>
        <Link href="/dashboard/medicines" className="text-[0.65rem] font-semibold text-theme-bold hover:text-main flex items-center gap-1 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-main/40">
          <Pill className="w-8 h-8 mb-2 text-theme/60" />
          <p className="text-xs font-medium">No medicines yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {recent.map((med) => (
            <Link key={med._id} href={`/dashboard/medicines/${med._id}`} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-gray-200/60 transition-colors">
              {med.imageUrl ? (
                <Image src={med.imageUrl} alt={med.name} width={36} height={36} className="w-9 h-9 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-theme/20 flex items-center justify-center shrink-0">
                  <Pill className="w-4 h-4 text-theme-bold" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-main capitalize truncate">{med.name}</p>
                <p className="text-[0.60rem] text-main/50 font-medium truncate">{med.instructions || 'No instructions'}</p>
              </div>
              <span className={`text-[0.55rem] font-bold px-2 py-0.5 rounded-md shrink-0 ${
                med.type === 'scheduled' ? 'bg-theme/20 text-theme-bold' : 'bg-main/5 text-main/60'
              }`}>
                {med.type}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
