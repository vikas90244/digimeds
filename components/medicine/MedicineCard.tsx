import { MedicineDetailType } from '@/types/medicine';
import { Pill, Calendar, AlertCircle, ChevronDown, Camera, Edit2, Info, CheckCircle2 } from 'lucide-react';
import { formatExpiry } from '@/utils/date-time';
interface MedicineCardProp {
  med: MedicineDetailType;
  isExpanded: boolean;
  onToggle: () => void;
}

export default function MedicineCard({ med, isExpanded, onToggle }: MedicineCardProp) {
 

  const isMissingExpiry = !med.expiryDate;

  return (
    <div 
      onClick={onToggle}
      className={`bg-gray-100 border rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
        isExpanded 
          ? 'border-theme/40  my-2' 
          : 'border-main/10  hover:border-theme/30 hover:bg-gray-200/90'
      }`}
    >
      {/* ==========================================
          THE COLLAPSED STATE 
          ========================================== */}
      <div className="px-4 md:px-5 py-2 md:py-2.5 flex items-center justify-between gap-4">
        
        <div className="flex items-center gap-4 md:gap-5 flex-1 min-w-0">
          {/* THE FUTURE IMAGE ZONE */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-theme/10 to-main/5 border border-main/5 flex items-center justify-center shrink-0 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            <Pill className="w-8 h-8 text-primary/50" />
          </div>
          
          {/* Core Details */}
          <div className="flex flex-col flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <h3 className="font-bold text-main w-full text-md md:text-[0.90rem] leading-none capitalize truncate">
                {med.name}
              </h3>
              <span className={`text-[0.55rem] uppercase font-bold tracking-wider px-3 py-0.5 rounded-md shrink-0 ${
                med.type === 'scheduled' ? 'bg-theme/20 text-theme-bold' : 'bg-main/5 text-main/80'
              }`}>
                {med.type}
              </span>
            </div>
            
            <p className="text-xs text-main/60 truncate font-semibold max-w-md">
              {med.instructions || "Tap to add instructions"}
            </p>
          </div>
        </div>

        {/* Right Side Status & Chevron */}
        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-[0.65rem] font-semibold text-main/70 uppercase tracking-widest mb-1 flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Expiry
            </span>
            <div className="flex items-center gap-1.5">
              {isMissingExpiry && <AlertCircle className="w-4 h-4 text-orange-400" />}
              <span className={`text-[0.65rem] font-semibold ${isMissingExpiry ? 'text-orange-400' : 'text-main'}`}>
                {formatExpiry(med.expiryDate)}
              </span>
            </div>
          </div>

          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isExpanded ? ' text-primary' : 'text-theme-bold hover:text-main/70'}`}>
            <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? '-rotate-180' : ''}`} />
          </div>
        </div>
      </div>

      {/* ==========================================
          THE EXPANDED STATE 
          ========================================== */}
      <div className={`grid transition-all duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          
          
          <div className="px-4 md:px-5 pb-2 pt-2 border-t border-main/5 mt-1 mx-4 md:mx-5 flex flex-col gap-2">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
              
              <div className="px-4 py-1 ">
                <h4 className="text-[0.75rem] font-semibold text-main/50  flex items-center gap-1.5 mb-2">
                  <Info className="w-4 h-4" /> INSTRUCTIONS
                </h4>
                <p className="text-[0.70rem] font-medium text-main/90 leading-relaxed">
                  {med.instructions || "No instructions provided. Click edit to add dosage details."}
                </p>
              </div>

              {med.warnings && (
                <div className="bg-orange-50/50 rounded-xl px-4 py-2">
                  <h4 className="text-[0.60rem] font-bold text-orange-500  flex items-center gap-1 mb-2">
                    <AlertCircle className="w-3 h-3" /> WARNINGS
                  </h4>
                  <p className="text-[0.65rem] font-semibold text-orange-800/80 leading-relaxed">
                    {med.warnings}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3">
              
              <button 
                onClick={(e) => e.stopPropagation()} 
                className="flex items-center gap-2 text-xs font-semibold text-theme-bold hover:bg-theme-bold/5 hover:cursor-pointer px-4 py-2 rounded-xl transition-colors w-full sm:w-auto justify-center"
              >
                <Camera className="w-4 h-4" /> Update via OCR
              </button>

              <div className="flex w-full sm:w-auto gap-3">
                <button 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-1.5 rounded-xl font-medium text-main/70 bg-gray-100 hover:bg-main/5 border border-main/15 text-xs transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                
                <button 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-1.5 rounded-xl text-[0.5rem] md:text-xs font-semibold bg-main text-white/90 hover:bg-main/90 shadow-sm transition-all"
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