import { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar } from 'lucide-react';
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
      className="space-y-10"
    >
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-3">Collection</p>
        <h1 className="font-headline text-5xl font-extrabold tracking-tight text-on-surface leading-tight">Scan History</h1>
        <p className="text-on-surface-variant mt-3 text-base">Review your past plant diagnostics and health reports.</p>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all",
              filter === f 
                ? "bg-primary text-white shadow-lg shadow-primary/20" 
                : "bg-surface-container-high text-on-surface-variant"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-12">
        {HISTORY_DATA.map((item) => (
          <motion.div 
            key={item.id}
            whileTap={{ scale: 0.98 }}
            className="bg-surface-container-lowest p-6 rounded-[32px] editorial-shadow flex gap-6 group transition-all cursor-pointer hover:bg-surface-container-low"
          >
            <div className="w-28 h-28 rounded-[24px] overflow-hidden shrink-0 bg-surface-container">
              <img 
                src={item.image} 
                alt={item.plantName} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col justify-between py-1 flex-grow">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-headline font-bold text-xl text-on-surface leading-tight">{item.plantName}</h3>
                  <span className={cn(
                    "text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shrink-0",
                    item.status === 'healthy' 
                      ? "bg-secondary-container text-on-secondary-container" 
                      : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
                  )}>
                    {item.status}
                  </span>
                </div>
                <p className="text-on-surface-variant text-base mt-2">{item.diagnosis}</p>
              </div>
              <div className="flex items-center gap-2 text-on-surface-variant/50 text-[11px] font-bold mt-4">
                <Calendar className="w-4 h-4" />
                <span>{item.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
