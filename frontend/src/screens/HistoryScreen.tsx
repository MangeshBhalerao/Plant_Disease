import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { cn } from '../utils/cn';
import { ScanResult } from '../types';

const HISTORY_DATA: ScanResult[] = [
  {
    id: '1',
    plantName: 'Monstera Deliciosa',
    diagnosis: 'No pathogens detected',
    status: 'healthy',
    matchPercentage: 98,
    date: 'Oct 24, 2023 • 14:30',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '2',
    plantName: 'Fiddle Leaf Fig',
    diagnosis: 'Bacterial Leaf Spot',
    status: 'infected',
    matchPercentage: 85,
    date: 'Oct 22, 2023 • 09:15',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '3',
    plantName: 'Jade Plant',
    diagnosis: 'Optimal hydration',
    status: 'healthy',
    matchPercentage: 95,
    date: 'Oct 18, 2023 • 11:45',
    image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e59?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: '4',
    plantName: 'Golden Pothos',
    diagnosis: 'Vibrant foliage growth',
    status: 'healthy',
    matchPercentage: 92,
    date: 'Oct 15, 2023 • 16:20',
    image: 'https://images.unsplash.com/photo-1597055181300-e3633a207519?auto=format&fit=crop&q=80&w=400'
  }
];

export const HistoryScreen = () => {
  const [filter, setFilter] = useState('All Scans');
  const filters = ['All Scans', 'Healthy', 'At Risk', 'Recovering'];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div>
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-primary mb-2 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5" />
          Collection
        </p>
        <h1 className="font-headline text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
          Scan <span className="text-gradient">History</span>
        </h1>
        <p className="text-on-surface-muted mt-2 text-sm sm:text-base">Review your past plant diagnostics and health reports.</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300",
              filter === f 
                ? "bg-gradient-to-r from-primary to-secondary text-white glow-sm" 
                : "glass text-on-surface-muted hover:text-on-surface-variant"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 pb-8 sm:pb-12">
        {HISTORY_DATA.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="card-glass p-4 sm:p-5 flex gap-4 group cursor-pointer relative overflow-hidden"
          >
            {/* Hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shrink-0 relative">
              <img 
                src={item.image} 
                alt={item.plantName} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            <div className="flex flex-col justify-between py-0.5 flex-grow min-w-0 relative z-10">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-headline font-bold text-base sm:text-lg text-on-surface leading-tight truncate">{item.plantName}</h3>
                  <span className={cn(
                    "text-[8px] sm:text-[9px] font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg uppercase tracking-wider shrink-0",
                    item.status === 'healthy' 
                      ? "bg-primary/15 text-primary" 
                      : "bg-red-500/15 text-red-400"
                  )}>
                    {item.status}
                  </span>
                </div>
                <p className="text-on-surface-muted text-xs sm:text-sm mt-1.5 truncate">{item.diagnosis}</p>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-1.5 text-on-surface-muted/50 text-[10px] sm:text-[11px] font-medium">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{item.date}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-on-surface-muted/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
