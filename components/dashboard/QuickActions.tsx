'use client';

import { CalendarClock, PillBottle, Plus, ScanLine } from 'lucide-react';
import Link from 'next/link';

const actions = [
  {
    label: 'Add Medicine',
    description: 'Log a new medicine to your inventory',
    href: '/dashboard/medicines/add',
    icon: Plus,
    iconBg: 'bg-theme/20',
    iconColor: 'text-theme-bold',
  },
  {
    label: 'My Medicines',
    description: 'Browse and manage your inventory',
    href: '/dashboard/medicines',
    icon: PillBottle,
    iconBg: 'bg-health/10',
    iconColor: 'text-health',
  },
  {
    label: 'Schedule',
    description: 'View your medication schedule',
    href: '/dashboard/schedule',
    icon: CalendarClock,
    iconBg: 'bg-theme-bold/10',
    iconColor: 'text-theme-bold',
  },
];

export default function QuickActions() {
  return (
    <div className="bg-gray-100 border border-main/10 rounded-md p-5">
      <span className="text-sm font-bold text-main block mb-4">Quick Actions</span>
      <div className="flex flex-col gap-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-200/70 transition-colors group"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${action.iconBg}`}>
              <action.icon className={`w-4 h-4 ${action.iconColor}`} />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-main group-hover:text-theme-bold transition-colors">{action.label}</span>
              <span className="text-[0.60rem] text-main/50 font-medium">{action.description}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
