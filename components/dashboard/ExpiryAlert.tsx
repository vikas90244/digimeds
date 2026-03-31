'use client';

import { AlertCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { MedicineDetailType } from '@/types/medicine';
import Link from 'next/link';

interface ExpiryAlertProps {
  medicines: MedicineDetailType[];
}

function getDaysUntilExpiry(dateString?: string | Date): number | null {
  if (!dateString) return null;
  const expiry = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function ExpiryAlert({ medicines }: ExpiryAlertProps) {
  const alerts = medicines
    .filter((m) => {
      const days = getDaysUntilExpiry(m.expiryDate);
      return days !== null && days <= 30;
    })
    .sort((a, b) => {
      const da = getDaysUntilExpiry(a.expiryDate) ?? 999;
      const db = getDaysUntilExpiry(b.expiryDate) ?? 999;
      return da - db;
    })
    .slice(0, 4);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-orange-50/60 border border-orange-200/70 rounded-md p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-500" />
          <span className="text-sm font-bold text-orange-700">Expiry Alerts</span>
        </div>
        <Link href="/dashboard/medicines" className="text-[0.65rem] font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1 transition-colors">
          View all <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        {alerts.map((med) => {
          const days = getDaysUntilExpiry(med.expiryDate)!;
          const isExpired = days < 0;
          return (
            <div key={med._id} className="flex items-center justify-between bg-white/70 rounded-xl px-4 py-2.5 border border-orange-100">
              <div className="flex items-center gap-2 min-w-0">
                <AlertCircle className={`w-3.5 h-3.5 shrink-0 ${isExpired ? 'text-red-500' : 'text-orange-400'}`} />
                <span className="text-xs font-semibold text-main capitalize truncate">{med.name}</span>
              </div>
              <span className={`text-[0.65rem] font-bold shrink-0 ml-3 ${isExpired ? 'text-red-500' : 'text-orange-500'}`}>
                {isExpired ? 'Expired' : days === 0 ? 'Today' : `${days}d left`}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
