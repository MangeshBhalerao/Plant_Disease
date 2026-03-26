import { motion } from 'motion/react';
import { Sprout, Stethoscope, Clock, Scan, AlertTriangle, CheckCircle } from 'lucide-react';
import { DetectResponse } from '../types';

interface ResultsScreenProps {
  result: DetectResponse | null;
  onNewScan: () => void;
}

const API_URL = 'http://127.0.0.1:8000'; // Define backend URL

export const ResultsScreen = ({ result, onNewScan }: ResultsScreenProps) => {
  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-center px-4">
        <Sprout className="w-16 h-16 text-primary/30 mb-4" />
        <h2 className="text-xl font-bold font-headline text-on-surface mb-2">No Analysis Found</h2>
        <p className="text-on-surface-muted text-sm mb-6 max-w-sm">
          Please upload or take a photo of a leaf to get an instant diagnosis.
        </p>
        <button onClick={onNewScan} className="btn-primary px-6 py-3">
          Start Scan
        </button>
      </div>
    );
  }

  // Backend currently returns a single string for remedy, split it manually for UI or show as one block
  const isHealthy = result.disease.toLowerCase().includes('healthy') || result.disease === 'No pathogens detected';
  const confidencePercent = Math.round(result.confidence);
  
  // Format the image URL so the frontend can load it from the backend server
  // Assumes backend path is "uploaded_images/..." and backend creates a static mount at "/uploaded_images"
  const imageUrl = result.image_path.startsWith('http') 
    ? result.image_path 
    : `${API_URL}/${result.image_path.replace(/\\/g, '/')}`;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-5 sm:space-y-8"
    >
      {/* Title */}
      <div>
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5">Analysis Complete</p>
        <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
          Diagnosis <span className="text-gradient italic">Results</span>
        </h1>
      </div>

      {/* Main Result Card */}
      <section className="card-soft overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image */}
          <div className="p-4 sm:p-5 lg:p-6">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-surface-dim">
              <img 
                src={imageUrl} 
                alt="Analyzed Leaf" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback if image not found
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?auto=format&fit=crop&q=80&w=1200';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Status badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                {isHealthy ? (
                   <span className="inline-flex items-center gap-1.5 bg-green-50/90 backdrop-blur-lg text-green-700 border border-green-200/50 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                     <CheckCircle className="w-3 h-3" />
                     Healthy
                   </span>
                ) : (
                   <span className="inline-flex items-center gap-1.5 bg-red-50/90 backdrop-blur-lg text-red-600 border border-red-200/50 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                     <AlertTriangle className="w-3 h-3" />
                     Infected
                   </span>
                )}
              </div>

              {/* Confidence pill */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass px-3.5 py-2 rounded-xl flex items-center gap-2">
                <span className="font-headline font-extrabold text-lg text-primary">{confidencePercent}%</span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-on-surface-muted">Confidence</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 sm:px-5 lg:px-8 pb-5 sm:pb-6 lg:py-8 flex flex-col justify-center">
            <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-3 sm:mb-5">
              {result.disease}
            </h2>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden mb-5 sm:mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidencePercent}%` }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full rounded-full"
                style={{ background: isHealthy 
                  ? 'linear-gradient(90deg, #16a34a, #22c55e, #4ade80)'
                  : 'linear-gradient(90deg, #ef4444, #f87171, #fca5a5)'
                }}
              />
            </div>

            {/* Causes & Action Plan */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4 flex-grow">
               <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/3 border border-primary/8 h-full">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-headline font-bold text-sm sm:text-base text-on-surface">Recommendation / Remedy</p>
                </div>
                
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {result.remedy || 'No recommended actions found for this issue.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pb-6 sm:pb-8 max-w-lg mx-auto w-full">
        <button className="flex-1 glass py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all text-on-surface-variant hover:text-on-surface hover:bg-white/80">
          <Clock className="w-4 h-4" />
          Save to History
        </button>
        <button onClick={onNewScan} className="flex-1 btn-primary py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 active:scale-[0.98]">
          <Scan className="w-4 h-4" />
          New Scan
        </button>
      </div>
    </motion.div>
  );
};
