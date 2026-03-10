'use client';

import OCRUpload from './OCRUpload';
import { AlertTriangle, Calendar, Info, Pill, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'; 
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateMedicine } from '@/hooks/user-meds';
import toast from 'react-hot-toast';

const medicineSchema = z.object({
  name: z.string()
    .min(2, "Medicine name must be at least 2 characters.")
    .max(100, "Name is too long."),
  type: z.enum(['scheduled', 'stored'], {
    message: "Please select an inventory type.",
  }),
  instructions: z.string().max(500, "Instructions cannot exceed 500 characters.").optional(),
  warnings: z.string().max(500, "Warnings cannot exceed 500 characters.").optional(),
  imageUrl: z.string().max(1000, "string is too long ").optional(),
  expiryDate: z.string().optional(), 
});

export type MedicineFormValues = z.infer<typeof medicineSchema>;

function AddMedicine() {

  const router = useRouter();
  const {mutate, isPending} = useCreateMedicine();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<MedicineFormValues>({
    resolver: zodResolver(medicineSchema),
    defaultValues: {
        name: '',
        type: 'scheduled',
        instructions: '',
        warnings: '',
        expiryDate: '',
        imageUrl:'',
    },
  });

  const selectedType = watch('type');

  const handleScanSuccess = (extractedData: any) => {
    if (extractedData.unvalidImage) {
       toast.error("image is not a valid medical package");
       return;
    }
    if (extractedData.imageUrl) setValue('imageUrl', extractedData.imageUrl, {shouldValidate: true});
    if (extractedData.name) setValue('name', extractedData.name, { shouldValidate: true });
    if (extractedData.instructions) setValue('instructions', extractedData.instructions, { shouldValidate: true });
    if (extractedData.warnings) setValue('warnings', extractedData.warnings, { shouldValidate: true });
    if (extractedData.expiryDate) setValue('expiryDate', extractedData.expiryDate, { shouldValidate: true });
  };

  const onSubmit = async (data: MedicineFormValues) => {
    
    mutate(data, {
        onSuccess:()=>{
            toast.success("Medicine saved successfully!");
            reset();
            router.push('/dashboard/medicines');
        }, 
        onError:(error)=>{
            toast.error(error.message);
        }
    })
  };
  
  return (
     <div className="w-full">
      <div className="max-w-7xl z-20 mx-auto flex flex-col">
        
        <div className=' pt-6 px-4 md:px-16 md:pt-10 pb-4 bg-gray-50/90 backdrop-blur-lg '>
          <section className="flex flex-col md:flex-row md:items-center md:pb-4 md:justify-between gap-4 px-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-main text-xl md:text-2xl font-semibold"> Add Medicine {"-->"} </h1>
            </div>
          </section>

          <section className='mt-6 mb-4 mx-4 flex justify-center'>
          </section>
        </div>
      
        {/* <div className="flex items-center gap-4">
          <div className="h-px bg-main/10 flex-1"></div>
          <span className="text-xs font-semibold text-main/80 uppercase tracking-widest">OR ENTER MANUALLY</span>
          <div className="h-px bg-main/10 flex-1"></div>
        </div> */}

       

        <section className='mt-4 pb-12 gap-4 flex justify-center '>   
            <form onSubmit={handleSubmit(onSubmit)} className="bg-gray-100 w-90 sm:w-90 md:max-w-4xl lg:max-w-6xl md:min-w-xl border border-main/10 rounded-md p-6 md:p-8 flex flex-col gap-6">
          
          {/* Top Row: Name and Type */}
          <div>
              <OCRUpload onScanSuccess={handleScanSuccess} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Name Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-xs font-bold text-main flex items-center gap-2">
                <Pill className="w-3 h-3 text-main/50" /> Medicine Name *
              </label>
              <input
                id="name"
                placeholder="e.g. Paracetamol 500mg"
                {...register('name')}
                className={`w-full px-4 py-2 bg-cream/50  border text-sm rounded-md text-main placeholder:text-main/40 placeholder:text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-theme/20 transition-all font-medium ${
                  errors.name ? 'border-red-400 focus:border-red-400' : 'border-main/10 focus:border-theme'
                }`}
              />
              {errors.name && <span className="text-[10px] text-red-500 font-semibold">{errors.name.message}</span>}
            </div>

            {/* Type Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-main">Inventory Type *</label>
              <div className="flex items-center bg-gray-50 p-1 border border-main/10 rounded-md h-[42px]">
                {(['scheduled', 'stored'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setValue('type', type, { shouldValidate: true })}
                    className={`flex-1 h-full rounded-lg hover:cursor-pointer text-xs font-bold capitalize transition-all ${
                      selectedType === type 
                        ? 'bg-cream text-theme-bold shadow-md' 
                        : 'text-main/60 hover:text-main'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.type && <span className="text-[10px] text-red-500 font-semibold">{errors.type.message}</span>}
            </div>
          </div>

          {/* Instructions Input */}
          <div className="flex flex-col gap-2">
            <label htmlFor="instructions" className="text-xs font-bold text-main flex items-center gap-2">
              <Info className="w-3 h-3 text-main/40" /> Instructions <span className="text-main/50 font-medium">(Optional)</span>
            </label>
            <textarea
              id="instructions"
              placeholder="e.g. Take 1 tablet after meals, twice a day."
              rows={3}
              {...register('instructions')}
              className="w-full px-4 py-2 bg-cream/50 border border-main/10 rounded-md text-main placeholder:text-main/30 placeholder:text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-theme/20 focus:border-theme transition-all font-medium resize-none text-sm"
            />
          </div>

          {/* Warnings & Expiry Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Warnings Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="warnings" className="text-xs font-bold text-main flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-orange-400" /> Warnings <span className="text-main/50 font-medium">(Optional)</span>
              </label>
              <textarea
                id="warnings"
                placeholder="e.g. May cause drowsiness."
                rows={2}
                {...register('warnings')}
                className="w-full px-4 py-2 bg-orange-100/40 border border-orange-200/80 rounded-md text-main placeholder:text-orange-800/30 placeholder:text-[0.85rem] focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-400 transition-all font-medium resize-none"
              />
            </div>

            {/* Expiry Date Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="expiryDate" className="text-xs font-bold text-main flex items-center gap-2">
                <Calendar className="w-3 h-3 text-main/40" /> Expiry Date <span className="text-main/50 font-normal">(Optional)</span>
              </label>
              <input
                type="date"
                id="expiryDate"
                {...register('expiryDate')}
                className="w-full px-4 py-2 bg-gray-50 border border-main/10 rounded-md text-main placeholder:text-main/30 text-[0.85rem] hover:cursor-pointer focus:outline-none focus:ring-2 focus:ring-theme/20 focus:border-theme transition-all font-medium"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-main/5 mt-2">
            <button
              type="submit"
              disabled={isPending}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-main text-white px-8 py-3 rounded-md font-semibold text-xs hover:bg-main/90 transition-all shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending? (
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <><Save className="w-3 h-3" fill='#a9a9a9' /> Save Medicine</>
              )}
            </button>
          </div>

        </form>
        </section>

      </div>
    </div>
  )
}

export default AddMedicine