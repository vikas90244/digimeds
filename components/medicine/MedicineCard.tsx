import { MedicineDetailType } from '@/types/medicine';
import { Pill, Calendar, AlertCircle } from 'lucide-react';
import { formatExpiry } from '@/utils/date-time';
import Image from 'next/image';
import Link from 'next/link';

interface MedicineCardProp {
  med: MedicineDetailType;
  searchQuery: string;
}

function HighlightedText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim() || highlight.trim().length < 3) return <>{text}</>;
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === highlight.toLowerCase() ? (
          <span key={i} className="inline-block bg-cream-bold/80 text-main py-0.5">{part}</span>
        ) : (
          <span key={i} className="text-main">{part}</span>
        )
      )}
    </>
  );
}

const getExpiryStatus = (dateString?: string | Date) => {
  if (!dateString) return 'missing';
  const expiry = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  expiry.setHours(0, 0, 0, 0);
  const diffDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0) return 'expired';
  if (diffDays <= 30) return 'expiring-soon';
  return 'valid';
};

export default function MedicineCard({ med, searchQuery }: MedicineCardProp) {
  const expiryStatus = getExpiryStatus(med.expiryDate);

  return (
    <Link
      href={`/dashboard/medicines/${med._id}`}
      className="bg-gray-100 border border-main/10 rounded-2xl transition-all duration-200 hover:border-theme/30 hover:bg-gray-200/90 flex items-center gap-2 md:gap-5 px-4 md:px-5 py-2 md:py-2.5"
    >
      {/* Image / Icon */}
      {med.imageUrl ? (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-main/5 shrink-0 overflow-hidden">
          <Image src={med.imageUrl} alt={med.name} width={80} height={80} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-theme/10 to-main/5 border border-main/5 flex items-center justify-center shrink-0">
          <Pill className="w-8 h-8 text-theme-bold" />
        </div>
      )}

      {/* Name + instructions */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="font-bold text-main text-[0.75rem] md:text-[0.90rem] leading-none capitalize truncate">
            <HighlightedText text={med.name} highlight={searchQuery} />
          </h3>
          <span className={`text-[0.55rem] font-bold tracking-wider px-2 py-0.5 rounded-md shrink-0 ${
            med.type === 'scheduled' ? 'bg-theme/20 text-theme-bold' : 'bg-main/5 text-main/80'
          }`}>
            {med.type}
          </span>
        </div>
        <p className="text-[0.60rem] text-main/70 truncate font-semibold max-w-md">
          <HighlightedText text={med.instructions || 'No instructions'} highlight={searchQuery} />
        </p>
      </div>

      {/* Expiry */}
      <div className="flex flex-col items-end shrink-0">
        <span className="text-[0.55rem] md:text-[0.65rem] font-semibold text-main/50 uppercase tracking-widest mb-1 flex items-center gap-1">
          <Calendar className="w-3 h-3" /> Expiry
        </span>
        <div className="flex items-center gap-1">
          {expiryStatus === 'missing' && <div className="text-[0.60rem] md:text-[0.70rem] text-orange-400 font-medium flex gap-1 items-center"><AlertCircle className="w-3 h-3" /> missing</div>}
          {expiryStatus === 'valid' && <div className="text-[0.60rem] md:text-[0.70rem] text-green-700 font-medium">{formatExpiry(med.expiryDate)}</div>}
          {expiryStatus === 'expired' && <div className="text-[0.60rem] md:text-[0.70rem] text-red-400 flex gap-1 items-center font-medium"><AlertCircle className="w-3 h-3" /> expired</div>}
          {expiryStatus === 'expiring-soon' && <div className="text-[0.60rem] md:text-[0.70rem] text-orange-400 font-medium">{formatExpiry(med.expiryDate)}</div>}
        </div>
      </div>
    </Link>
  );
}
