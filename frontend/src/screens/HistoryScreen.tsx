import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { buildImageUrl, getDetectionHistory } from '../api';
import { DetectionHistoryItem } from '../types';
import { cn } from '../utils/cn';

export const HistoryScreen = () => {
  const [filter, setFilter] = useState('All Scans');
  const [historyItems, setHistoryItems] = useState<DetectionHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const filters = ['All Scans', 'Healthy', 'At Risk', 'Recovering'];

  useEffect(() => {
    let active = true;

    const loadHistory = async () => {
      try {
        const data = await getDetectionHistory();
        if (active) {
          setHistoryItems(data);
        }
      } catch {
        if (active) {
          setError('Failed to load scan history from the backend.');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadHistory();

    return () => {
      active = false;
    };
  }, []);

  const filteredItems = useMemo(() => {
    return historyItems.filter((item) => {
      const isHealthy = item.disease_name.toLowerCase().includes('healthy');

      if (filter === 'Healthy') {
        return isHealthy;
      }
      if (filter === 'At Risk') {
        return !isHealthy;
      }
      return true;
    });
  }, [filter, historyItems]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-5 sm:space-y-7"
    >
      <div>
        <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-1.5 flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5" />
          Collection
        </p>
        <h1 className="font-headline text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface leading-tight">
          Scan <span className="text-gradient">History</span>
        </h1>
        <p className="text-on-surface-muted mt-1.5 text-sm">Review your past plant diagnostics.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar -mx-4 px-4 sm:-mx-6 sm:px-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200',
              filter === f
                ? 'btn-primary text-white'
                : 'glass text-on-surface-muted hover:text-on-surface-variant',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 pb-6 sm:pb-10">
        {isLoading && (
          <div className="card-soft p-6 text-sm text-on-surface-muted md:col-span-2 xl:col-span-3">
            Loading scan history...
          </div>
        )}

        {error && !isLoading && (
          <div className="card-soft p-6 text-sm text-red-500 md:col-span-2 xl:col-span-3">
            {error}
          </div>
        )}

        {!isLoading && !error && filteredItems.length === 0 && (
          <div className="card-soft p-6 text-sm text-on-surface-muted md:col-span-2 xl:col-span-3">
            No scan history found yet. Upload a leaf image from the home screen to create your first record.
          </div>
        )}

        {filteredItems.map((item, index) => {
          const isHealthy = item.disease_name.toLowerCase().includes('healthy');
          const formattedDate = new Date(item.created_at).toLocaleString();
          const imageUrl = buildImageUrl(item.image_path);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.99 }}
              className="card-soft p-3.5 sm:p-4 flex gap-3.5 group cursor-pointer"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
                <img
                  src={imageUrl}
                  alt={item.disease_name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex flex-col justify-between py-0.5 flex-grow min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-headline font-bold text-sm sm:text-base text-on-surface leading-tight truncate">
                      {item.disease_name}
                    </h3>
                    <span
                      className={cn(
                        'text-[8px] sm:text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0',
                        isHealthy
                          ? 'bg-primary/10 text-primary'
                          : 'bg-red-50 text-red-500',
                      )}
                    >
                      {isHealthy ? 'healthy' : 'infected'}
                    </span>
                  </div>
                  <p className="text-on-surface-muted text-xs sm:text-sm mt-1 truncate">
                    {item.remedy || 'No remedy saved'}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-on-surface-muted/60 text-[10px] font-medium">
                    <Calendar className="w-3 h-3" />
                    <span>{formattedDate}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-on-surface-muted/20 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
