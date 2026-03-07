import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this data. Please try again.",
  fullPage = false,
  onRetry,
}: {
  title?: string;
  message?: string;
  fullPage?: boolean;
  onRetry?: () => void;
}) {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-8 text-center ${
        fullPage 
          ? "fixed inset-0 z-50 bg-gray-50/90 backdrop-blur-sm" 
          : "w-full min-h-[40vh] bg-red-50/30 rounded-2xl border border-red-100/50"
      }`}
    >
      <div className="bg-red-100/50 p-4 rounded-full mb-4 border border-red-200/50">
        <AlertCircle className="w-8 h-8 text-red-500" />
      </div>

      <h3 className="text-lg font-bold text-main font-heading mb-2">
        {title}
      </h3>
      
      <p className="text-sm font-medium text-main/60 max-w-md mb-6">
        {message}
      </p>

      {onRetry && (
        <button 
          onClick={onRetry}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border border-main/10 text-main font-medium rounded-xl hover:bg-main/5 hover:text-primary transition-all shadow-sm group"
        >
          <RotateCcw className="w-4 h-4 text-main/40 group-hover:text-primary group-hover:-rotate-180 transition-all duration-500" />
          Try Again
        </button>
      )}
    </div>
  );
}