import { MedicineDetailType } from '@/types/medicine';
import { Pill, Calendar, AlertCircle, ChevronDown, Camera, Edit2, Info, CheckCircle2 } from 'lucide-react';

interface MedicineCardProp {
  med: MedicineDetailType;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function MedicineCard({ med, isExpanded, onToggle }: MedicineCardProp) {
  const formatExpiry = (dateString?: string) => {
    if (!dateString) return "Not set";
    return new Date(dateString).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const isMissingExpiry = !med.expiryDate;

  return (
    <div 
      onClick={onToggle}
      className={`bg-white border rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden ${
        isExpanded 
          ? 'border-theme/40 shadow-lg shadow-theme/5 scale-[1.01] my-2' 
          : 'border-main/10 shadow-sm hover:border-theme/30 hover:shadow-md'
      }`}
    >
      {/* ==========================================
          THE COLLAPSED STATE 
          ========================================== */}
      <div className="p-4 md:p-5 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
          {/* THE FUTURE IMAGE ZONE */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-theme/10 to-main/5 border border-main/5 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <Pill className="w-8 h-8 text-primary/50" />
          </div>
          
          {/* Core Details */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h3 className="font-bold text-main text-lg md:text-xl leading-none capitalize truncate">
                {med.name}
              </h3>
              <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-lg shrink-0 ${
                med.type === 'scheduled' ? 'bg-primary/10 text-primary' : 'bg-main/5 text-main/60'
              }`}>
                {med.type}
              </span>
            </div>
            
            <p className="text-sm text-main/50 truncate font-medium max-w-md">
              {med.instructions || "Tap to add instructions"}
            </p>
          </div>
        </div>

        {/* Right Side Status & Chevron */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[10px] font-bold text-main/40 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Expiry
            </span>
            <div className="flex items-center gap-1.5">
              {isMissingExpiry && <AlertCircle className="w-4 h-4 text-orange-400" />}
              <span className={`text-sm font-semibold ${isMissingExpiry ? 'text-orange-400' : 'text-main'}`}>
                {formatExpiry(med.expiryDate)}
              </span>
            </div>
          </div>

          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? 'bg-theme/10 text-primary' : 'bg-gray-50 text-main/40'}`}>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? '-rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* ==========================================
          THE EXPANDED STATE 
          ========================================== */}
      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          
          {/* Inner Content Wrapper */}
          <div className="px-4 md:px-5 pb-5 pt-2 border-t border-main/5 mt-2 mx-4 md:mx-5 flex flex-col gap-6">
            
            {/* Detailed Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-main/5">
                <h4 className="text-xs font-bold text-main/40 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                  <Info className="w-4 h-4" /> Instructions
                </h4>
                <p className="text-sm font-medium text-main/80 leading-relaxed">
                  {med.instructions || "No instructions provided. Click edit to add dosage details."}
                </p>
              </div>

              {med.warnings && (
                <div className="bg-orange-50/50 rounded-2xl p-4 border border-orange-100/50">
                  <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-4 h-4" /> Warnings
                  </h4>
                  <p className="text-sm font-medium text-orange-800/80 leading-relaxed">
                    {med.warnings}
                  </p>
                </div>
              )}
            </div>

            {/* Action Bar (OCR, Edit, Log) */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-main/5">
              
              {/* Future OCR Button Placeholder */}
              <button 
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center gap-2 text-xs font-semibold text-primary hover:bg-primary/5 px-4 py-2 rounded-xl transition-colors w-full sm:w-auto justify-center"
              >
                <Camera className="w-4 h-4" /> Update via OCR
              </button>

              <div className="flex w-full sm:w-auto gap-3">
                <button 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-medium text-main/70 bg-gray-50 hover:bg-main/5 border border-main/5 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                
                <button 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-main text-white hover:bg-main/90 shadow-sm transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" /> Log Dose
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}