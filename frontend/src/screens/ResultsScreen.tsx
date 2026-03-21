import { motion } from 'motion/react';
import { Sprout, Stethoscope, History as HistoryIcon, Scan } from 'lucide-react';

export const ResultsScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="space-y-8"
    >
      <div className="relative">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl" />
        <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface leading-none relative z-10">
          Diagnosis<br/><span className="text-primary italic">Results</span>
        </h1>
      </div>

      <section className="bg-surface-container-lowest rounded-[40px] editorial-shadow overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-4 lg:p-8">
            <div className="relative aspect-square rounded-[32px] overflow-hidden bg-surface-container h-full">
              <img 
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?auto=format&fit=crop&q=80&w=1200" 
                alt="Infected Leaf" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 right-8">
                <span className="bg-error-container text-on-error-container px-6 py-3 rounded-full font-bold text-[12px] uppercase tracking-[0.25em] shadow-lg">
                  Infected
                </span>
              </div>
            </div>
          </div>

          <div className="px-8 lg:px-12 pb-12 lg:py-12 flex flex-col justify-center">
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="font-headline text-3xl lg:text-5xl font-bold text-on-surface">Tomato Leaf Mold</h2>
              <span className="font-bold text-lg text-primary">85% Match</span>
            </div>
            
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden mb-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full" 
              />
            </div>

            <div className="space-y-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.3em] text-outline font-bold mb-4">The Diagnosis</p>
                <p className="text-on-surface-variant leading-relaxed text-lg">
                  Leaf mold is caused by the fungus <span className="italic font-medium text-on-surface">Passalora fulva</span>. It primarily affects tomatoes grown in greenhouse environments with high humidity and poor ventilation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="p-8 bg-surface-container-low rounded-[32px]">
                  <div className="flex items-center gap-4 mb-6">
                    <Sprout className="w-6 h-6 text-primary" />
                    <p className="font-headline font-bold text-lg">Common Causes</p>
                  </div>
                  <ul className="text-base text-on-surface-variant space-y-4">
                    <li className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      Relative humidity above 85%
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      Restricted air circulation
                    </li>
                    <li className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      Prolonged leaf wetness
                    </li>
                  </ul>
                </div>

                <div className="p-8 bg-secondary-container/30 rounded-[32px]">
                  <div className="flex items-center gap-4 mb-6">
                    <Stethoscope className="w-6 h-6 text-primary" />
                    <p className="font-headline font-bold text-lg">Action Plan</p>
                  </div>
                  <div className="space-y-5">
                    {[
                      "Prune infected lower leaves immediately.",
                      "Reduce humidity with ventilation.",
                      "Apply a copper-based fungicide."
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-base text-on-surface-variant leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-4 pb-12 max-w-2xl mx-auto w-full">
        <button className="flex-1 bg-surface-container-high text-on-surface py-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all">
          <HistoryIcon className="w-6 h-6" />
          Save to History
        </button>
        <button className="flex-1 bg-gradient-to-br from-primary to-primary-container text-white py-6 rounded-full font-bold text-lg shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-3">
          <Scan className="w-6 h-6" />
          New Scan
        </button>
      </div>
    </motion.div>
  );
};
