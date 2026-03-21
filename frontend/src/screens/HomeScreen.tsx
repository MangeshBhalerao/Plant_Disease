import { motion } from 'motion/react';
import { BrainCircuit, Upload, Camera, Sprout, History as HistoryIcon } from 'lucide-react';

export const HomeScreen = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12"
    >
      <section>
        <div className="bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-[0_20px_40px_rgba(25,28,27,0.04)] relative grid grid-cols-1 lg:grid-cols-2">
          <div className="h-72 lg:h-auto w-full relative overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&q=80&w=1200" 
              alt="Monstera Leaf" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 right-6 glass px-6 py-4 rounded-2xl flex items-center gap-4">
              <div className="bg-primary/10 p-2.5 rounded-xl">
                <BrainCircuit className="w-6 h-6 text-primary" />
              </div>
              <p className="text-[12px] font-bold text-primary uppercase tracking-widest">AI Scanning Active</p>
            </div>
          </div>
          
          <div className="p-10 lg:p-16 flex flex-col items-center lg:items-start text-center lg:text-left justify-center">
            <h1 className="font-headline font-extrabold text-4xl lg:text-6xl leading-tight tracking-tight text-on-surface mb-6">
              Detect Plant Diseases <span className="text-primary italic">Instantly</span>
            </h1>
            <p className="text-on-surface-variant font-sans text-lg leading-relaxed mb-10 max-w-md">
              Upload or capture a photo to diagnose plant health using our advanced neural-network AI.
            </p>
            
            <div className="flex flex-col sm:flex-row w-full gap-4">
              <button className="flex-1 py-5 px-8 bg-gradient-to-br from-primary to-primary-container text-white font-bold text-lg rounded-full flex items-center justify-center gap-3 shadow-lg shadow-primary/20 active:scale-95 transition-transform">
                <Upload className="w-6 h-6" />
                Upload Image
              </button>
              <button className="flex-1 py-5 px-8 bg-surface-container-high text-on-surface font-bold text-lg rounded-full flex items-center justify-center gap-3 active:scale-95 transition-transform">
                <Camera className="w-6 h-6" />
                Use Camera
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-secondary-container/30 p-8 rounded-[32px] flex flex-col gap-6">
          <BrainCircuit className="w-8 h-8 text-on-secondary-container" />
          <div>
            <h3 className="font-bold text-on-secondary-container text-xl">98% Accuracy</h3>
            <p className="text-sm text-on-secondary-container/70">Trained on 1M+ plants across 50+ species</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[32px] flex flex-col gap-6">
          <div className="w-8 h-8 flex items-center justify-center">
            <div className="w-2.5 h-8 bg-primary rounded-full animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-on-surface text-xl">Real-time</h3>
            <p className="text-sm text-on-surface-variant">Diagnostics in under 3 seconds</p>
          </div>
        </div>
        <div className="bg-surface-container-low p-8 rounded-[32px] flex flex-col gap-6">
          <Sprout className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-bold text-on-surface text-xl">Expert Care</h3>
            <p className="text-sm text-on-surface-variant">Actionable treatment plans for every diagnosis</p>
          </div>
        </div>
        <div className="bg-secondary-container/30 p-8 rounded-[32px] flex flex-col gap-6">
          <HistoryIcon className="w-8 h-8 text-on-secondary-container" />
          <div>
            <h3 className="font-bold text-on-secondary-container text-xl">Cloud Sync</h3>
            <p className="text-sm text-on-secondary-container/70">Access your garden history from any device</p>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
