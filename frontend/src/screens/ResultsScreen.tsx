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

      <section className="bg-surface-container-lowest rounded-[48px] shadow-editorial overflow-hidden border border-outline-variant/10">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 lg:p-10">
            <div className="relative aspect-square rounded-[40px] overflow-hidden bg-surface-container h-full shadow-inner">
              <img 
                src="https://images.unsplash.com/photo-1591857177580-dc82b9ac4e17?auto=format&fit=crop&q=80&w=1200" 
                alt="Infected Leaf" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-10 right-10">
                <span className="bg-error-container text-on-error-container px-8 py-4 rounded-full font-black text-[14px] uppercase tracking-[0.3em] shadow-2xl backdrop-blur-md border border-white/20">
                  Infected
                </span>
              </div>
            </div>
          </div>

          <div className="px-10 lg:px-16 pb-16 lg:py-16 flex flex-col justify-center">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-4 mb-8">
              <h2 className="font-headline text-4xl lg:text-6xl font-black text-on-surface tracking-tight leading-tight">Tomato <br/><span className="text-primary italic">Leaf Mold</span></h2>
              <div className="flex flex-col items-end">
                <span className="font-black text-2xl text-primary">85%</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Confidence</span>
              </div>
            </div>
            
            <div className="w-full h-4 bg-surface-container rounded-full overflow-hidden mb-12 shadow-inner">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full bg-gradient-to-r from-primary via-primary-container to-primary rounded-full" 
              />
            </div>

            <div className="space-y-12">
              <div>
                <p className="text-[12px] uppercase tracking-[0.4em] text-primary font-black mb-6">The Diagnosis</p>
                <p className="text-on-surface-variant leading-relaxed text-xl opacity-80">
                  Leaf mold is caused by the fungus <span className="italic font-bold text-on-surface">Passalora fulva</span>. It primarily affects tomatoes grown in greenhouse environments with high humidity and poor ventilation.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8">
                <div className="p-10 bg-surface-container-low rounded-[40px] border border-outline-variant/10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      <Sprout className="w-7 h-7 text-primary" />
                    </div>
                    <p className="font-headline font-black text-xl">Common Causes</p>
                  </div>
                  <ul className="text-lg text-on-surface-variant space-y-5">
                    {[
                      "Relative humidity above 85%",
                      "Restricted air circulation",
                      "Prolonged leaf wetness"
                    ].map((cause, i) => (
                      <li key={i} className="flex gap-5 items-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shrink-0" />
                        {cause}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-10 bg-secondary-container/30 rounded-[40px] border border-outline-variant/10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                      <Stethoscope className="w-7 h-7 text-primary" />
                    </div>
                    <p className="font-headline font-black text-xl">Action Plan</p>
                  </div>
                  <div className="space-y-6">
                    {[
                      "Prune infected lower leaves immediately.",
                      "Reduce humidity with ventilation.",
                      "Apply a copper-based fungicide."
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-5">
                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[12px] font-black shrink-0 mt-0.5 shadow-lg shadow-primary/20">
                          {i + 1}
                        </div>
                        <p className="text-lg text-on-surface-variant leading-snug">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-col sm:flex-row gap-6 pb-16 max-w-3xl mx-auto w-full">
        <button className="flex-1 bg-surface-container-high text-on-surface py-7 rounded-[24px] font-black text-xl flex items-center justify-center gap-4 active:scale-95 transition-all hover:bg-surface-container-highest">
          <HistoryIcon className="w-7 h-7" />
          Save to History
        </button>
        <button className="flex-1 bg-primary text-white py-7 rounded-[24px] font-black text-xl shadow-2xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-4 hover:bg-primary-container">
          <Scan className="w-7 h-7" />
          New Scan
        </button>
      </div>
    </motion.div>
  );
};
