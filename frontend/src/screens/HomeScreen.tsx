import { motion } from 'motion/react';
import { BrainCircuit, Upload, Camera, Sprout, History as HistoryIcon, Sparkles } from 'lucide-react';
import { Plant3D } from '../components/Plant3D';

export const HomeScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-16"
    >
      <section>
        <div className="bg-surface-container-lowest rounded-[48px] overflow-hidden shadow-[0_32px_64px_rgba(25,28,27,0.06)] relative grid grid-cols-1 lg:grid-cols-2 border border-outline-variant/10">
          <div className="h-[400px] lg:h-auto w-full relative bg-gradient-to-b from-surface-container-low to-surface-container-lowest overflow-hidden">
            <Plant3D />
            <div className="absolute top-8 left-8 glass px-6 py-4 rounded-3xl flex items-center gap-4 border border-white/30 shadow-xl">
              <div className="bg-primary/10 p-2.5 rounded-2xl">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
              </div>
              <div>
                <p className="text-[12px] font-black text-primary uppercase tracking-widest">Next-Gen AI</p>
                <p className="text-[10px] text-primary/60 font-bold">Neural Engine v4.2</p>
              </div>
            </div>
          </div>
          
          <div className="p-10 lg:p-20 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-container/50 text-on-secondary-container text-[11px] font-bold uppercase tracking-widest mb-8">
              <BrainCircuit className="w-4 h-4" />
              Smart Diagnosis
            </div>
            <h1 className="font-headline font-extrabold text-5xl lg:text-7xl leading-[1.1] tracking-tight text-on-surface mb-8">
              Your Plants, <br/>
              <span className="text-primary italic">Perfectly</span> Healthy.
            </h1>
            <p className="text-on-surface-variant font-sans text-xl leading-relaxed mb-12 max-w-md opacity-80">
              Identify 500+ plant diseases with a single photo. Get instant treatment plans and expert care advice powered by advanced computer vision.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full gap-5">
              <button className="flex-1 py-6 px-10 bg-primary text-white font-bold text-xl rounded-[24px] flex items-center justify-center gap-4 shadow-2xl shadow-primary/30 hover:bg-primary-container transition-all hover:-translate-y-1 active:scale-95 group">
                <Upload className="w-7 h-7 group-hover:scale-110 transition-transform" />
                Upload Image
              </button>
              <button className="flex-1 py-6 px-10 bg-surface-container-high text-on-surface font-bold text-xl rounded-[24px] flex items-center justify-center gap-4 hover:bg-surface-container-highest transition-all hover:-translate-y-1 active:scale-95 group">
                <Camera className="w-7 h-7 group-hover:scale-110 transition-transform" />
                Use Camera
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: BrainCircuit, title: "98.4% Accuracy", desc: "Validated by expert botanists and trained on 2M+ leaf samples.", color: "bg-secondary-container/30" },
          { icon: Sparkles, title: "Instant Results", desc: "Get a full health report and treatment plan in under 2 seconds.", color: "bg-surface-container-low" },
          { icon: Sprout, title: "Expert Care", desc: "Step-by-step recovery guides tailored to your specific plant species.", color: "bg-surface-container-low" },
          { icon: HistoryIcon, title: "Garden History", desc: "Track your garden's health over time with automated cloud sync.", color: "bg-secondary-container/30" }
        ].map((feature, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -8 }}
            className={`${feature.color} p-10 rounded-[40px] flex flex-col gap-8 border border-outline-variant/5 transition-all`}
          >
            <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm">
              <feature.icon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="font-headline font-extrabold text-on-surface text-2xl mb-3">{feature.title}</h3>
              <p className="text-base text-on-surface-variant leading-relaxed opacity-70">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
};
