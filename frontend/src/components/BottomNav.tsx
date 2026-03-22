import { 
  Home as HomeIcon, 
  Scan, 
  History as HistoryIcon
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  setScreen: (s: Screen) => void;
}

export const BottomNav = ({ currentScreen, setScreen }: BottomNavProps) => {
  const navItems = [
    { id: 'home', icon: HomeIcon, label: 'Home' },
    { id: 'results', icon: Scan, label: 'Diagnose' },
    { id: 'history', icon: HistoryIcon, label: 'History' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-center items-end px-4 pb-4 sm:pb-5 z-50 md:hidden">
      <div className="glass-navbar rounded-2xl px-3 py-2.5 flex justify-around items-center w-full max-w-sm">
        {navItems.map((item) => {
          const isActive = currentScreen === item.id;
          const isCenter = item.id === 'results';

          if (isCenter) {
            return (
              <motion.button
                key={item.id}
                onClick={() => setScreen('results')}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "relative flex flex-col items-center justify-center rounded-xl px-5 py-3 transition-all duration-300",
                  currentScreen === 'results'
                    ? "bg-gradient-to-r from-primary to-secondary text-white glow-sm"
                    : "bg-gradient-to-r from-primary/80 to-secondary/80 text-white hover:from-primary hover:to-secondary"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[8px] font-bold uppercase tracking-wider mt-1">{item.label}</span>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.id}
              onClick={() => setScreen(item.id as Screen)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                "relative flex flex-col items-center justify-center px-5 py-3 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-primary" 
                  : "text-on-surface-muted hover:text-on-surface-variant"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-all",
                isActive && "drop-shadow-[0_0_10px_rgba(16,185,129,0.6)]"
              )} />
              <span className="text-[8px] font-bold uppercase tracking-wider mt-1">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -bottom-0.5 w-6 h-0.5 rounded-full bg-gradient-to-r from-primary to-secondary"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
