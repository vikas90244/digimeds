'use client';

import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: number | string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  sub?: string;
  subColor?: string;
}

export default function StatCard({ label, value, icon: Icon, iconColor, iconBg, sub, subColor }: StatCardProps) {
  return (
    <div className="bg-gray-100 border border-main/10 rounded-md px-5 py-4 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div className="flex flex-col min-w-0">
        <span className="text-[0.60rem] font-bold text-main uppercase tracking-widest">{label}</span>
        <span className="text-xl font-bold text-main leading-tight">{value}</span>
        {sub && (
          <span className={`text-[0.65rem] font-semibold mt-0.5 ${subColor ?? 'text-main/60'}`}>{sub}</span>
        )}
      </div>
    </div>
  );
}
