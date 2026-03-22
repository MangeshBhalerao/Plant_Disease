import { 
  Leaf, 
  X, 
  User, 
  Sprout, 
  History as HistoryIcon, 
  Settings, 
  LogOut, 
  BrainCircuit,
  ChevronRight,
  Sparkles,
  Crown,
  Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (screen: 'profile') => void;
}

const navItems = [
  { icon: User, label: 'Profile', desc: 'Account & settings', action: 'profile' as const },
  { icon: Sprout, label: 'My Plants', desc: '12 plants tracked', action: null },
  { icon: HistoryIcon, label: 'History', desc: '47 past scans', action: null },
  { icon: Shield, label: 'Privacy', desc: 'Data & permissions', action: null },
  { icon: Settings, label: 'Settings', desc: 'App preferences', action: null },
];

export const Sidebar = ({ isOpen, onClose, onNavigate }: SidebarProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60]"
            style={{
              background: 'radial-gradient(ellipse at 0% 50%, rgba(16, 185, 129, 0.08), rgba(0, 0, 0, 0.7))',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          />

          {/* Sidebar panel */}
          <motion.aside
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-[85vw] max-w-[320px] z-[70] flex flex-col overflow-y-auto no-scrollbar glass-sidebar"
          >
            {/* ---- Top gradient accent ---- */}
            <div className="absolute top-0 left-0 right-0 h-48 pointer-events-none" style={{
              background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.08), transparent)',
            }} />

            {/* ---- Header ---- */}
            <header className="relative z-10 flex justify-between items-center w-full px-5 py-5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-sm">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-headline font-bold text-on-surface tracking-tight">
                  PlantCare <span className="text-gradient">AI</span>
                </span>
              </div>
              <motion.button 
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-muted hover:text-on-surface hover:bg-surface-container-high transition-all"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </header>

            {/* ---- User profile card ---- */}
            <div className="relative z-10 mx-4 mb-6 p-4 rounded-2xl overflow-hidden" style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(255, 255, 255, 0.03))',
              border: '1px solid rgba(16, 185, 129, 0.12)',
            }}>
              {/* Card shimmer */}
              <div className="absolute inset-0 opacity-30 overflow-hidden rounded-2xl">
                <div className="absolute inset-0 animate-shimmer" style={{
                  background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.06), transparent)',
                  width: '200%',
                }} />
              </div>

              <div className="relative flex items-center gap-3.5">
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" 
                    alt="User" 
                    className="w-13 h-13 rounded-xl object-cover ring-2 ring-primary/30"
                    referrerPolicy="no-referrer"
                    style={{ width: '52px', height: '52px' }}
                  />
                  <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-primary rounded-md flex items-center justify-center border-2 border-surface-elevated">
                    <Crown className="w-2.5 h-2.5 text-white" />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-headline text-base font-bold text-on-surface truncate">Garden Explorer</span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-bold px-2.5 py-0.5 bg-gradient-to-r from-accent-warm/20 to-primary/20 text-accent-warm rounded-full w-fit mt-1.5 border border-accent-warm/10">
                    <Sparkles className="w-2.5 h-2.5" />
                    Pro Member
                  </span>
                </div>
              </div>
            </div>

            {/* ---- Navigation ---- */}
            <nav className="relative z-10 flex flex-col gap-0.5 px-3 flex-grow">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.label}
                  onClick={() => {
                    if (item.action === 'profile') {
                      onNavigate('profile');
                      onClose();
                    }
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  whileHover={{ x: 6, backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between px-4 py-3 text-on-surface-variant hover:text-on-surface rounded-xl text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-surface-container-high group-hover:bg-primary/10 flex items-center justify-center transition-colors">
                      <item.icon className="w-4.5 h-4.5 text-on-surface-muted group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <span className="text-sm font-medium block">{item.label}</span>
                      <span className="text-[10px] text-on-surface-muted/60">{item.desc}</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-40 transition-all group-hover:translate-x-0.5" />
                </motion.button>
              ))}

              {/* Divider + Logout */}
              <div className="mt-auto pt-3">
                <div className="h-px bg-gradient-to-r from-transparent via-outline-variant to-transparent mx-2 mb-2" />
                <motion.button 
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-3 px-4 py-3 text-on-surface-muted hover:text-accent-rose rounded-xl text-sm text-left transition-all w-full group"
                >
                  <div className="w-9 h-9 rounded-lg bg-surface-container-high group-hover:bg-accent-rose/10 flex items-center justify-center transition-colors">
                    <LogOut className="w-4.5 h-4.5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </motion.button>
              </div>
            </nav>

            {/* ---- AI Insights card ---- */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10 mx-4 mb-6 mt-4 p-5 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(52, 211, 153, 0.06))',
                border: '1px solid rgba(16, 185, 129, 0.12)',
              }}
            >
              <div className="absolute -right-3 -top-3 opacity-[0.07]">
                <BrainCircuit className="w-24 h-24 text-primary" />
              </div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 animate-pulse-glow" />
                AI Insights
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed relative z-10">
                Your Monstera deliciosa is showing signs of new growth. Tap to check the health report.
              </p>
              <button className="mt-3 text-[11px] font-bold text-primary hover:text-secondary transition-colors">
                View Report →
              </button>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
