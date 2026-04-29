import { 
  Leaf, 
  X, 
  User, 
  Sprout, 
  Clock, 
  Settings, 
  LogOut,
  Home,
  Scan,
  BrainCircuit,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../utils/cn';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath: string;
  onNavigate: (path: string) => void;
}

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Scan, label: 'Diagnose', path: '/results' },
  { icon: Sprout, label: 'My Plants', path: null },
  { icon: Clock, label: 'History', path: '/history' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Settings, label: 'Settings', path: null },
];

export const Sidebar = ({ isOpen, onClose, currentPath, onNavigate }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
          />

          {/* Sidebar panel — glass effect */}
          <motion.aside
            initial={{ x: '-100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0.8 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[82vw] max-w-[300px] z-[70] flex flex-col overflow-y-auto no-scrollbar glass-sidebar"
          >
            {/* Header */}
            <header className="flex justify-between items-center px-5 py-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-sm shadow-primary/15">
                  <Leaf className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-headline font-bold text-on-surface tracking-tight">
                  Crop<span className="text-gradient">Care</span>
                </span>
              </div>
              <button 
                onClick={onClose} 
                className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-muted hover:text-on-surface hover:bg-black/5 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* User card */}
            <div className="mx-4 mb-5 p-3.5 rounded-2xl bg-surface-container flex items-center gap-3">
              <div className="relative shrink-0">
                <img 
                  src="https://img.freepik.com/free-vector/farmer-using-technology-digital-agriculture_53876-113813.jpg?semt=ais_hybrid&w=740&q=80" 
                  alt="User" 
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-primary/10"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary border-2 border-white rounded-full" />
              </div>
              <div className="min-w-0">
                <span className="font-headline text-sm font-bold text-on-surface block truncate">Garden Explorer</span>
                <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full mt-0.5">
                  <Sparkles className="w-2.5 h-2.5" />
                  Pro Member
                </span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-0.5 px-3 flex-grow">
              {navItems.map((item) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    if (item.path) {
                      onNavigate(item.path);
                    }
                  }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center justify-between px-3 py-3 rounded-xl font-medium text-sm text-left transition-all group",
                    currentPath === item.path
                      ? "bg-primary/8 text-primary"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className={cn(
                      "w-[18px] h-[18px] transition-colors",
                      currentPath === item.path
                        ? "text-primary"
                        : "text-on-surface-muted group-hover:text-primary"
                    )} />
                    <span>{item.label}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-40 transition-opacity" />
                </motion.button>
              ))}

              {/* Logout */}
              <div className="mt-auto pt-3 border-t border-outline-variant mx-1 mb-2">
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-3 py-3 text-on-surface-muted hover:text-error rounded-xl text-sm text-left transition-colors w-full"
                >
                  <LogOut className="w-[18px] h-[18px]" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </nav>

            {/* AI Insights card */}
            <div className="mx-4 mb-5 p-4 rounded-2xl relative overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/10">
              <div className="absolute -right-2 -top-2 opacity-10">
                <BrainCircuit className="w-16 h-16 text-primary" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3 h-3 animate-pulse-soft" />
                AI Insights
              </p>
              <p className="text-xs text-on-surface-variant leading-relaxed relative z-10">
                Your Monstera is showing new growth. Time to check its health!
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
