import { Plus, Search, Filter } from "lucide-react";

export default function MedicinesPage() {
  // Mock Data Array
  const mockMedicines = [
    { id: 1, name: "Paracetamol 500mg", type: "Stored", qty: 24, exp: "Dec 2026" },
    { id: 2, name: "Amoxicillin", type: "Scheduled", qty: 14, exp: "Aug 2026" },
    { id: 3, name: "Cough Syrup", type: "Stored", qty: "1 bottle", exp: "May 2027" },
    { id: 4, name: "Band-Aids", type: "Stored", qty: 50, exp: "Jan 2030" },
  ];

  return (
    <div className="flex flex-col gap-8">
      
      {/* Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-main font-heading mb-1">My Medicines</h1>
          <p className="text-main/60 text-sm">Manage your entire home inventory.</p>
        </div>
        
        <button className="flex items-center justify-center gap-2 bg-main text-white px-5 py-2.5 rounded-xl font-medium hover:bg-main/90 transition-colors shadow-sm">
          <Plus className="w-4 h-4" /> Add Medicine
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex items-center gap-4 bg-white p-2 rounded-xl border border-main/10 shadow-sm">
        <div className="flex-1 flex items-center gap-3 px-3">
          <Search className="w-5 h-5 text-main/30" />
          <input 
            type="text" 
            placeholder="Search medications..." 
            className="w-full bg-transparent border-none focus:outline-none text-sm text-main placeholder:text-main/30 py-2"
          />
        </div>
        <div className="w-[1px] h-6 bg-main/10"></div>
        <button className="flex items-center gap-2 px-4 py-2 text-main/60 hover:text-main transition-colors text-sm font-medium">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* The Medicine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {mockMedicines.map((med) => (
          <div key={med.id} className="bg-white rounded-2xl border border-main/10 p-5 shadow-sm hover:shadow-md hover:border-theme/40 transition-all group cursor-pointer">
            <div className="flex gap-5">
              
              {/* Image Placeholder (This is where the photo goes later) */}
              <div className="w-20 h-24 rounded-xl bg-gray-50 border border-main/5 flex flex-col items-center justify-center text-main/20 group-hover:bg-theme/5 transition-colors shrink-0">
                <span className="text-2xl mb-1">💊</span>
                <span className="text-[10px] font-medium uppercase tracking-widest">No Image</span>
              </div>
              
              {/* Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="font-bold text-main leading-tight">{med.name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${
                      med.type === 'Scheduled' ? 'bg-primary/10 text-primary' : 'bg-main/5 text-main/60'
                    }`}>
                      {med.type}
                    </span>
                  </div>
                  <p className="text-sm text-main/50 font-medium">Qty: {med.qty}</p>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-semibold text-main/40">
                  <span>Exp:</span>
                  <span className="text-main/70">{med.exp}</span>
                </div>
              </div>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}