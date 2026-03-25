import { motion } from 'motion/react';
import { Sprout, Stethoscope, Clock, Scan, AlertTriangle } from 'lucide-react';

export const ResultsScreen = () => {
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
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?auto=format&fit=crop&q=80&w=1200" 
                alt="Infected Leaf" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              
              {/* Infected badge */}
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <span className="inline-flex items-center gap-1.5 bg-red-50/90 backdrop-blur-lg text-red-600 border border-red-200/50 px-3.5 py-1.5 rounded-full font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-3 h-3" />
                  Infected
                </span>
              </div>

              {/* Confidence pill */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 glass px-3.5 py-2 rounded-xl flex items-center gap-2">
                <span className="font-headline font-extrabold text-lg text-primary">85%</span>
                <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-on-surface-muted">Confidence</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="px-4 sm:px-5 lg:px-8 pb-5 sm:pb-6 lg:py-8 flex flex-col justify-center">
            <h2 className="font-headline text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-on-surface tracking-tight leading-tight mb-3 sm:mb-5">
              Tomato <br className="hidden sm:block"/><span className="text-gradient italic">Leaf Mold</span>
            </h2>
            
            {/* Progress bar */}
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden mb-5 sm:mb-6">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, #16a34a, #22c55e, #4ade80)' }}
              />
            </div>

            {/* Diagnosis text */}
            <div className="mb-5 sm:mb-6">
              <p className="text-[10px] uppercase tracking-[0.25em] text-primary font-bold mb-2">The Diagnosis</p>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                Leaf mold is caused by the fungus <span className="italic font-semibold text-on-surface">Passalora fulva</span>. It primarily affects tomatoes in greenhouse environments with high humidity and poor ventilation.
              </p>
            </div>

            {/* Causes & Action Plan */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-3 sm:gap-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-surface-container border border-outline-variant/50">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/8 flex items-center justify-center">
                    <Sprout className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-headline font-bold text-sm sm:text-base text-on-surface">Common Causes</p>
                </div>
                <ul className="space-y-2.5">
                  {[
                    "Humidity above 85%",
                    "Poor air circulation",
                    "Prolonged leaf wetness"
                  ].map((cause, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.08 }}
                      className="flex gap-2.5 items-center text-sm text-on-surface-variant"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {cause}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/3 border border-primary/8">
                <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Stethoscope className="w-4 h-4 text-primary" />
                  </div>
                  <p className="font-headline font-bold text-sm sm:text-base text-on-surface">Action Plan</p>
                </div>
                <div className="space-y-2.5 sm:space-y-3">
                  {[
                    "Prune infected lower leaves.",
                    "Improve ventilation & airflow.",
                    "Apply copper-based fungicide."
                  ].map((step, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + i * 0.08 }}
                      className="flex items-start gap-2.5"
                    >
                      <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 shadow-sm shadow-primary/20">
                        {i + 1}
                      </div>
                      <p className="text-sm text-on-surface-variant leading-snug">{step}</p>
                    </motion.div>
                  ))}
                </div>
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
        <button className="flex-1 btn-primary py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 active:scale-[0.98]">
          <Scan className="w-4 h-4" />
          New Scan
        </button>
      </div>
    </motion.div>
  );
};
