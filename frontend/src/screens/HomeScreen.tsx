import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { BrainCircuit, Upload, Camera, Sprout, Shield, Sparkles, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { Plant3D } from '../components/Plant3D';
import { detectDisease } from '../api';
import { DetectResponse } from '../types';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

interface HomeScreenProps {
  onAnalyzeComplete?: (result: DetectResponse) => void;
}

export const HomeScreen = ({ onAnalyzeComplete }: HomeScreenProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsAnalyzing(true);
      // Call our Axios API function
      const result = await detectDisease(file);
      
      if (onAnalyzeComplete) {
        onAnalyzeComplete(result);
      }
    } catch (error) {
      console.error('Failed to detect disease', error);
      alert('Error analyzing the image. Please ensure the backend is running.');
    } finally {
      setIsAnalyzing(false);
      // Reset input so the same file can be uploaded again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 sm:space-y-14 lg:space-y-16"
    >
      {/* Hidden file input */}
      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef}
        onChange={handleFileUpload}
      />

      {/* ====== HERO SECTION ====== */}
      <section>
        <div className="card-soft overflow-hidden relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
            {/* 3D Preview */}
            <div className="h-[280px] sm:h-[340px] lg:h-auto w-full relative overflow-hidden bg-gradient-to-br from-surface-container to-white">
              <Plant3D />
              
              {/* Floating AI badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="absolute top-4 sm:top-5 left-4 sm:left-5 glass px-3 py-2 rounded-xl flex items-center gap-2.5 z-20"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse-soft" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-wider leading-none">Next-Gen AI</p>
                  <p className="text-[9px] text-on-surface-muted font-medium leading-none mt-0.5">Neural Engine v4.2</p>
                </div>
              </motion.div>
            </div>
            
            {/* Content */}
            <motion.div 
              initial="initial"
              animate="animate"
              className="p-6 sm:p-8 lg:p-12 xl:p-16 flex flex-col justify-center"
            >
              <motion.div {...fadeUp} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/8 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.12em] text-primary w-fit mb-5 sm:mb-6">
                <BrainCircuit className="w-3.5 h-3.5" />
                Smart Diagnosis
              </motion.div>
              
              <motion.h1 {...fadeUp} className="font-headline font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.08] tracking-tight text-on-surface mb-4 sm:mb-6">
                Your Plants, <br/>
                <span className="text-gradient italic">Perfectly</span> Healthy.
              </motion.h1>
              
              <motion.p {...fadeUp} className="text-on-surface-variant text-sm sm:text-base lg:text-lg leading-relaxed mb-6 sm:mb-8 max-w-md">
                Identify 500+ plant diseases with a single photo. Get instant treatment plans powered by advanced computer vision.
              </motion.p>
              
              <motion.div {...fadeUp} className="flex flex-col sm:flex-row w-full gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isAnalyzing}
                  className="flex-1 py-3.5 sm:py-4 px-6 btn-primary text-sm sm:text-base flex items-center justify-center gap-2.5 group disabled:opacity-70"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                      Upload Image
                      <ArrowRight className="w-3.5 h-3.5 opacity-0 -ml-1 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    </>
                  )}
                </button>
                <button 
                  disabled={isAnalyzing}
                  className="flex-1 py-3.5 sm:py-4 px-6 glass text-on-surface font-semibold text-sm sm:text-base rounded-2xl flex items-center justify-center gap-2.5 hover:bg-white/80 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] group disabled:opacity-70"
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-primary transition-colors" />
                  Use Camera
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== STATS BAR ====== */}
      <motion.section 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
      >
        {[
          { value: '500+', label: 'Diseases', icon: Zap },
          { value: '98.4%', label: 'Accuracy', icon: Shield },
          { value: '2M+', label: 'Samples', icon: BrainCircuit },
          { value: '<2s', label: 'Results', icon: Sparkles },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            whileHover={{ y: -3 }}
            className="card-soft p-4 sm:p-5 text-center cursor-default group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/12 transition-colors">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
            <p className="font-headline font-extrabold text-lg sm:text-xl lg:text-2xl text-gradient">{stat.value}</p>
            <p className="text-[10px] sm:text-xs text-on-surface-muted font-medium uppercase tracking-wider mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ====== FEATURES GRID ====== */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: BrainCircuit, title: "98.4% Accuracy", desc: "Validated by expert botanists and trained on 2M+ leaf samples." },
          { icon: Sparkles, title: "Instant Results", desc: "Full health report and treatment plan in under 2 seconds." },
          { icon: Sprout, title: "Expert Care", desc: "Recovery guides tailored to your specific plant species." },
          { icon: Shield, title: "Garden Tracker", desc: "Track your garden's health over time with automated sync." },
        ].map((feature, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i + 0.35 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="card-soft p-6 sm:p-7 flex flex-col gap-4 group cursor-default"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/8 to-secondary/5 flex items-center justify-center border border-primary/8 group-hover:border-primary/15 group-hover:shadow-sm group-hover:shadow-primary/5 transition-all">
              <feature.icon className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface text-base sm:text-lg mb-1.5">{feature.title}</h3>
              <p className="text-sm text-on-surface-muted leading-relaxed">{feature.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>
    </motion.div>
  );
};
