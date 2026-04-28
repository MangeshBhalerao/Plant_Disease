import { useEffect, useMemo, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { getNewsTicker } from '../api';

const fallbackHeadlines = [
  'Plant disease updates and crop care alerts will appear here',
  'Inspect leaves regularly to catch infections early',
  'Follow local agriculture guidance before applying treatments',
];

export const NewsTicker = () => {
  const [headlines, setHeadlines] = useState(fallbackHeadlines);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;

    const loadHeadlines = async () => {
      try {
        const response = await getNewsTicker();
        if (active && response.headlines.length > 0) {
          setHeadlines(response.headlines);
          setIsLive(response.live);
        }
      } catch {
        if (active) {
          setIsLive(false);
        }
      }
    };

    loadHeadlines();
    const intervalId = window.setInterval(loadHeadlines, 10 * 60 * 1000);

    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, []);

  const tickerText = useMemo(() => headlines.join('   |   '), [headlines]);

  return (
    <div className="mt-2 glass-strong rounded-xl px-3 sm:px-4 py-2 max-w-7xl mx-auto overflow-hidden flex items-center gap-3">
      <div className="shrink-0 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-primary">
        <Newspaper className="w-3.5 h-3.5" />
        {isLive ? 'Live' : 'News'}
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="news-ticker-track whitespace-nowrap text-xs sm:text-sm font-medium text-on-surface-variant">
          <span>{tickerText}</span>
          <span aria-hidden="true" className="pl-10">{tickerText}</span>
        </div>
      </div>
    </div>
  );
};
