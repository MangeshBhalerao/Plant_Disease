import { 
  Leaf, 
  X, 
  User, 
  Sprout, 
  History as HistoryIcon, 
  Settings, 
  LogOut, 
  BrainCircuit 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: 'profile') => void;
}

export const Sidebar = ({ isOpen, onClose, onNavigate }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-80 bg-surface z-[70] rounded-r-[24px] shadow-2xl flex flex-col p-6 overflow-y-auto"
          >
            <header className="flex justify-between items-center w-full py-4 mb-6">
              <div className="text-xl font-black text-primary flex items-center gap-2 font-headline tracking-tight">
                <Leaf className="w-6 h-6" />
                <span>PlantCare AI</span>
              </div>
              <button onClick={onClose} className="text-on-surface-variant hover:opacity-80">
                <X className="w-6 h-6" />
              </button>
            </header>

            <div className="flex items-center gap-4 p-4 mb-8 bg-surface-container-low rounded-2xl">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
                  alt="User" 
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-primary-container border-2 border-surface rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-headline text-lg font-bold text-primary">Garden Explorer</span>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-secondary-container text-on-secondary-container rounded-full w-fit mt-1">Pro Plan Member</span>
              </div>
            </div>

            <nav className="flex flex-col gap-2 flex-grow">
              <button 
                onClick={() => { onNavigate('profile'); onClose(); }}
                className="flex items-center gap-4 p-4 bg-surface-container-low text-primary font-bold rounded-xl font-headline text-lg text-left"
              >
                <User className="w-6 h-6" />
                <span>Profile</span>
              </button>
              <button className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-low rounded-xl font-headline text-lg text-left transition-colors">
                <Sprout className="w-6 h-6" />
                <span>My Plants</span>
              </button>
              <button className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-low rounded-xl font-headline text-lg text-left transition-colors">
                <HistoryIcon className="w-6 h-6" />
                <span>History</span>
              </button>
              <button className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-low rounded-xl font-headline text-lg text-left transition-colors">
                <Settings className="w-6 h-6" />
                <span>Settings</span>
              </button>

              <div className="mt-auto pt-4 border-t border-outline-variant/20">
                <button className="flex items-center gap-4 p-4 text-on-surface-variant hover:bg-surface-container-low rounded-xl font-headline text-lg text-left transition-colors w-full">
                  <LogOut className="w-6 h-6" />
                  <span>Logout</span>
                </button>
              </div>
            </nav>

            <div className="mt-6 p-5 rounded-2xl bg-primary-container text-on-primary-container relative overflow-hidden editorial-shadow">
              <div className="absolute -right-4 -top-4 opacity-10">
                <BrainCircuit className="w-24 h-24" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">AI Insights</p>
              <p className="text-sm font-medium leading-tight relative z-10">Your Monstera deliciosa is showing signs of new growth. Check the health report.</p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
