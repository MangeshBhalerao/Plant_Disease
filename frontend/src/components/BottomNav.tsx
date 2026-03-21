import { 
  Home as HomeIcon, 
  Scan, 
  History as HistoryIcon
} from 'lucide-react';
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
    <nav className="fixed bottom-0 left-0 w-full flex justify-center items-end px-4 pb-6 bg-white/80 backdrop-blur-xl z-50 rounded-t-[24px] border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(25,28,27,0.04)]">
      <div className="flex justify-around items-end w-full max-w-2xl">
        {navItems.map((item) => {
        const isActive = currentScreen === item.id;
        const isCenter = item.id === 'results';

        if (isCenter) {
          return (
            <button
              key={item.id}
              onClick={() => setScreen('results')}
              className={cn(
                "flex flex-col items-center justify-center rounded-full p-4 mb-2 transform -translate-y-2 shadow-lg transition-all active:scale-90",
                currentScreen === 'results' ? "bg-primary-container text-white shadow-primary/20" : "bg-primary text-white shadow-primary/20"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{item.label}</span>
            </button>
          );
        }

        return (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "flex flex-col items-center justify-center p-3 transition-colors active:scale-90",
              isActive ? "text-primary" : "text-on-surface-variant"
            )}
          >
            <item.icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-[10px] font-bold uppercase tracking-wider mt-1">{item.label}</span>
          </button>
        );
      })}
      </div>
    </nav>
  );
};
