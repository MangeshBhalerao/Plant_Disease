import { motion } from 'motion/react';
import { Sprout, Stethoscope, History as HistoryIcon, Scan, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ResultsScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Title */}
      <div className="relative">
        <div className="absolute -top-16 -left-16 w-48 h-48 bg-primary/[0.07] rounded-full blur-[80px] pointer-events-none" />
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2">Analysis Complete</p>
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-none relative z-10">
          Diagnosis<br/><span className="text-gradient italic">Results</span>
        </h1>
      </div>

      {/* Main Result Card */}
      <section className="card-glass overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent pointer-events-none rounded-3xl" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 relative">
          {/* Image */}
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?auto=format&fit=crop&q=80&w=1200" 
                alt="Infected Leaf" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                <span className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-xl text-red-300 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-xs sm:text-sm uppercase tracking-[0.15em] border border-red-500/20">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Infected
                </span>
              </div>
              {/* Confidence pill at bottom */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex items-center gap-3 glass-strong px-4 py-2.5 rounded-xl">
                <span className="font-headline font-extrabold text-lg sm:text-xl text-primary">85%</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-on-surface-muted">Confidence</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 sm:px-6 lg:px-10 pb-6 sm:pb-8 lg:py-10 flex flex-col justify-center">
            <h2 className="font-headline text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-extrabold text-on-surface tracking-tight leading-tight mb-4 sm:mb-6">
              Tomato <br className="hidden sm:block"/><span className="text-gradient italic">Leaf Mold</span>
            </h2>
            
            {/* Progress bar */}
            <div className="w-full h-2 sm:h-3 bg-surface-container-high rounded-full overflow-hidden mb-6 sm:mb-8">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #10b981, #34d399, #6ee7b7)',
                }}
              >
                <div className="absolute inset-0 animate-gradient" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  backgroundSize: '200% 100%',
                }} />
              </motion.div>
            </div>

            {/* Diagnosis text */}
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-primary font-bold mb-3">The Diagnosis</p>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base lg:text-lg">
                Leaf mold is caused by the fungus <span className="italic font-semibold text-on-surface">Passalora fulva</span>. It primarily affects tomatoes in greenhouse environments with high humidity and poor ventilation.
              </p>
            </div>

            {/* Causes & Action Plan */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="card-glass p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center">
                    <Sprout className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-headline font-bold text-base sm:text-lg text-on-surface">Common Causes</p>
                </div>
                <ul className="space-y-3">
                  {[
                    "Relative humidity above 85%",
                    "Restricted air circulation",
                    "Prolonged leaf wetness"
                  ].map((cause, i) => (
                    <motion.li 
                      key={i} 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex gap-3 items-center text-sm sm:text-base text-on-surface-variant"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {cause}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-5 sm:p-6 rounded-3xl relative overflow-hidden" style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(52, 211, 153, 0.04))',
                border: '1px solid rgba(16, 185, 129, 0.1)',
              }}>
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-headline font-bold text-base sm:text-lg text-on-surface">Action Plan</p>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    "Prune infected lower leaves immediately.",
                    "Reduce humidity with ventilation.",
                    "Apply a copper-based fungicide."
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-[10px] sm:text-xs font-bold shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <p className="text-sm sm:text-base text-on-surface-variant leading-snug">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pb-8 sm:pb-12 max-w-2xl mx-auto w-full">
        <button className="flex-1 glass-strong py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 active:scale-[0.97] transition-all text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest">
          <HistoryIcon className="w-5 h-5" />
          Save to History
        </button>
        <button className="flex-1 btn-primary text-white py-4 sm:py-5 rounded-2xl font-bold text-base sm:text-lg flex items-center justify-center gap-3 active:scale-[0.97]">
          <Scan className="w-5 h-5" />
          New Scan
        </button>
      </div>
    </motion.div>
  );
};
