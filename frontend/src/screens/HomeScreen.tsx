import { motion } from 'motion/react';
import { BrainCircuit, Upload, Camera, Sprout, History as HistoryIcon, Sparkles, ArrowRight, Shield } from 'lucide-react';
import { Plant3D } from '../components/Plant3D';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } }
};

export const HomeScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-12 sm:space-y-16 lg:space-y-20"
    >
      {/* Hero Section */}
      <section>
        <div className="card-glass overflow-hidden relative">
          {/* Decorative gradient border glow */}
          <div className="absolute inset-0 rounded-3xl opacity-50 pointer-events-none" 
            style={{ 
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), transparent 50%, rgba(52, 211, 153, 0.05))',
            }} 
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
            {/* 3D Preview */}
            <div className="h-[300px] sm:h-[350px] lg:h-auto w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface/50 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-surface/30 z-10 pointer-events-none" />
              <Plant3D />
              
              {/* Floating badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute top-4 sm:top-6 left-4 sm:left-6 glass-strong px-4 py-2.5 rounded-2xl flex items-center gap-3 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse-glow" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-[11px] font-bold text-primary uppercase tracking-widest">Next-Gen AI</p>
                  <p className="text-[9px] text-on-surface-muted font-medium">Neural Engine v4.2</p>
                </div>
              </motion.div>
            </div>
            
            {/* Content */}
            <motion.div 
              {...stagger}
              className="p-6 sm:p-10 lg:p-16 xl:p-20 flex flex-col justify-center"
            >
              <motion.div {...fadeUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-primary w-fit mb-6 sm:mb-8">
                <BrainCircuit className="w-3.5 h-3.5" />
                Smart Diagnosis
              </motion.div>
              
              <motion.h1 {...fadeUp} className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-on-surface mb-5 sm:mb-8">
                Your Plants, <br/>
                <span className="text-gradient italic">Perfectly</span> Healthy.
              </motion.h1>
              
              <motion.p {...fadeUp} className="text-on-surface-variant text-base sm:text-lg lg:text-xl leading-relaxed mb-8 sm:mb-12 max-w-md opacity-80">
                Identify 500+ plant diseases with a single photo. Get instant treatment plans powered by advanced computer vision.
              </motion.p>
              
              <motion.div {...fadeUp} className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
                <button className="flex-1 py-4 sm:py-5 px-6 sm:px-8 btn-primary text-white text-base sm:text-lg flex items-center justify-center gap-3 group">
                  <Upload className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Upload Image
                  <ArrowRight className="w-4 h-4 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                </button>
                <button className="flex-1 py-4 sm:py-5 px-6 sm:px-8 glass-strong text-on-surface font-bold text-base sm:text-lg rounded-2xl flex items-center justify-center gap-3 hover:bg-surface-container-highest transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] group">
                  <Camera className="w-5 h-5 group-hover:text-primary transition-colors" />
                  Use Camera
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
      >
        {[
          { value: '500+', label: 'Diseases' },
          { value: '98.4%', label: 'Accuracy' },
          { value: '2M+', label: 'Samples' },
          { value: '<2s', label: 'Results' },
        ].map((stat, i) => (
          <div key={i} className="card-glass p-4 sm:p-5 text-center group cursor-default">
            <p className="font-headline font-extrabold text-xl sm:text-2xl lg:text-3xl text-gradient mb-1">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-on-surface-muted font-medium uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </motion.section>

      {/* Features */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
        {[
          { icon: BrainCircuit, title: "98.4% Accuracy", desc: "Validated by expert botanists and trained on 2M+ leaf samples.", gradient: 'from-primary/10 to-secondary/5' },
          { icon: Sparkles, title: "Instant Results", desc: "Full health report and treatment plan in under 2 seconds.", gradient: 'from-secondary/10 to-accent/5' },
          { icon: Sprout, title: "Expert Care", desc: "Recovery guides tailored to your specific plant species.", gradient: 'from-accent/10 to-primary/5' },
          { icon: Shield, title: "Garden History", desc: "Track your garden's health over time with automated sync.", gradient: 'from-primary/10 to-accent/5' },
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.4 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="card-glass p-6 sm:p-8 flex flex-col gap-5 sm:gap-6 group cursor-default relative overflow-hidden"
          >
            {/* Subtle background gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

            <div className="relative z-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/10 group-hover:border-primary/20 transition-colors group-hover:glow-sm">
                <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="font-headline font-bold text-on-surface text-lg sm:text-xl mb-2">{feature.title}</h3>
              <p className="text-sm text-on-surface-muted leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
};
