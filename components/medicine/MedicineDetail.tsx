'use client';

import { useFetchMedicineById } from '@/hooks/user-meds';
import { formatExpiry } from '@/utils/date-time';
import {
  AlertCircle, ArrowLeft, Calendar, Camera,
  CheckCircle2, Edit2, Info, Pill,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Loader from '../ui-common/Loader';

function getExpiryStatus(dateString?: string) {
  if (!dateString) return 'missing';
  const expiry = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  const days = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return 'expired';
  if (days <= 30) return 'expiring-soon';
  return 'valid';
}

function getDaysLeft(dateString?: string): number | null {
  if (!dateString) return null;
  const expiry = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  return Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

const expiryStyles = {
  valid: { bar: 'bg-health', text: 'text-health', label: 'Valid' },
  'expiring-soon': { bar: 'bg-warning', text: 'text-warning', label: 'Expiring Soon' },
  expired: { bar: 'bg-red-400', text: 'text-red-400', label: 'Expired' },
  missing: { bar: 'bg-main/20', text: 'text-main/40', label: 'No expiry set' },
};

export default function MedicineDetail({ id }: { id: string }) {
  const { data: med, isLoading, isError, error } = useFetchMedicineById(id);

  if (isLoading) return <Loader fullPage />;

  if (isError || !med) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3 text-main/50">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <p className="text-sm font-medium">{(error as Error)?.message || 'Medicine not found'}</p>
        <Link href="/dashboard/medicines" className="text-xs font-semibold text-theme-bold hover:underline">
          Back to medicines
        </Link>
      </div>
    );
  }

  const expiryStatus = getExpiryStatus(med.expiryDate);
  const daysLeft = getDaysLeft(med.expiryDate);
  const style = expiryStyles[expiryStatus];
  const addedDate = new Date(med.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 flex flex-col gap-6">

        {/* back */}
        <Link
          href="/dashboard/medicines"
          className="flex items-center gap-1.5 text-xs font-semibold text-main/50 hover:text-theme-bold transition-colors w-fit"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Medicines
        </Link>

        {/* header card */}
        <div className="bg-gray-100 border border-main/10 rounded-2xl p-5 flex items-center gap-5">
          {med.imageUrl ? (
            <Image
              src={med.imageUrl}
              alt={med.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-main/10"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-theme/20 flex items-center justify-center shrink-0">
              <Pill className="w-9 h-9 text-theme-bold" />
            </div>
          )}
          <div className="flex flex-col gap-1.5 min-w-0">
            <h1 className="text-lg md:text-xl font-bold text-main capitalize font-heading leading-tight truncate">
              {med.name}
            </h1>
            <span className={`text-[0.60rem] font-bold tracking-wider px-2.5 py-0.5 rounded-md w-fit ${
              med.type === 'scheduled' ? 'bg-theme/20 text-theme-bold' : 'bg-main/5 text-main/70'
            }`}>
              {med.type}
            </span>
            <p className="text-[0.65rem] text-main/40 font-medium">Added {addedDate}</p>
          </div>
        </div>

        {/* expiry status */}
        <div className="bg-gray-100 border border-main/10 rounded-2xl p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-main/40" />
              <span className="text-xs font-bold text-main">Expiry Date</span>
            </div>
            <span className={`text-xs font-bold ${style.text}`}>{style.label}</span>
          </div>

          {/* progress bar */}
          <div className="h-1.5 w-full bg-main/10 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${style.bar}`}
              style={{
                width: expiryStatus === 'missing'
                  ? '0%'
                  : expiryStatus === 'expired'
                  ? '100%'
                  : expiryStatus === 'expiring-soon'
                  ? `${Math.max(10, 100 - ((daysLeft ?? 0) / 30) * 100)}%`
                  : '30%',
              }}
            />
          </div>

          <div className="flex items-center justify-between text-[0.65rem] font-medium text-main/50">
            <span>{med.expiryDate ? formatExpiry(med.expiryDate) : 'Not set'}</span>
            {daysLeft !== null && (
              <span className={style.text}>
                {daysLeft < 0 ? `Expired ${Math.abs(daysLeft)}d ago` : daysLeft === 0 ? 'Expires today' : `${daysLeft} days left`}
              </span>
            )}
          </div>
        </div>

        {/* instructions & warnings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 border border-main/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-main/40" />
              <span className="text-xs font-bold text-main">Instructions</span>
            </div>
            <p className="text-sm text-main/70 font-medium leading-relaxed">
              {med.instructions || 'No instructions provided.'}
            </p>
          </div>

          <div className={`rounded-2xl p-5 border ${med.warnings ? 'bg-orange-50/60 border-orange-200/60' : 'bg-gray-100 border-main/10'}`}>
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className={`w-4 h-4 ${med.warnings ? 'text-orange-400' : 'text-main/30'}`} />
              <span className={`text-xs font-bold ${med.warnings ? 'text-orange-600' : 'text-main'}`}>Warnings</span>
            </div>
            <p className={`text-sm font-medium leading-relaxed ${med.warnings ? 'text-orange-800/80' : 'text-main/40'}`}>
              {med.warnings || 'No warnings noted.'}
            </p>
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-theme-bold border border-theme/30 hover:bg-theme/10 transition-colors">
            <Camera className="w-4 h-4" /> Update via OCR
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-main/70 border border-main/15 hover:bg-main/5 transition-colors">
            <Edit2 className="w-4 h-4" /> Edit Details
          </button>
          <button className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-main text-white hover:bg-main/90 transition-colors shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Log Dose
          </button>
        </div>

      </div>
    </div>
  );
}
