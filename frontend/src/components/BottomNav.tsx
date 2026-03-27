import { 
  Home as HomeIcon, 
  Scan, 
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils/cn';

interface BottomNavProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const BottomNav = ({ currentPath, onNavigate }: BottomNavProps) => {
  const navItems = [
    { path: '/', icon: HomeIcon, label: 'Home' },
    { path: '/results', icon: Scan, label: 'Diagnose' },
    { path: '/history', icon: Clock, label: 'History' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-center px-4 pb-4 z-50">
      <div className="glass-strong rounded-2xl px-3 py-2 flex justify-around items-center w-full max-w-sm">
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const isCenter = item.path === '/results';

          if (isCenter) {
            return (
              <motion.button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.93 }}
                className={cn(
                  "flex flex-col items-center justify-center rounded-xl px-5 py-2.5 transition-all duration-200",
                  currentPath === '/results'
                    ? "btn-primary glow-green"
                    : "bg-gradient-to-r from-primary to-secondary text-white opacity-85 hover:opacity-100 shadow-md shadow-primary/15"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.93 }}
              className={cn(
                "relative flex flex-col items-center justify-center px-5 py-2.5 rounded-xl transition-all duration-200",
                isActive 
                  ? "text-primary bg-primary/8" 
                  : "text-on-surface-muted hover:text-on-surface-variant"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  className="absolute -bottom-0 w-4 h-[2px] rounded-full bg-primary"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};
