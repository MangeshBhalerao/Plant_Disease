import { useEffect, useMemo, useState } from 'react';
import { Newspaper } from 'lucide-react';
import { getNewsTicker } from '../api';
import { NewsHeadline } from '../types';

const fallbackHeadlines: NewsHeadline[] = [
  {
    title: 'Plant disease updates and crop care alerts will appear here',
    url: 'https://news.google.com/search?q=plant%20disease%20agriculture',
  },
  {
    title: 'Inspect leaves regularly to catch infections early',
    url: 'https://news.google.com/search?q=early%20plant%20disease%20detection',
  },
  {
    title: 'Follow local agriculture guidance before applying treatments',
    url: 'https://news.google.com/search?q=agriculture%20crop%20treatment%20guidance',
  },
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

  const tickerItems = useMemo(() => [...headlines, ...headlines], [headlines]);

  return (
    <div className="mt-2 glass-strong rounded-xl px-3 sm:px-4 py-2 max-w-7xl mx-auto overflow-hidden flex items-center gap-3">
      <div className="shrink-0 inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-[0.12em] text-primary">
        <Newspaper className="w-3.5 h-3.5" />
        {isLive ? 'Live' : 'News'}
      </div>
      <div className="relative min-w-0 flex-1 overflow-hidden">
        <div className="news-ticker-track whitespace-nowrap text-xs sm:text-sm font-medium text-on-surface-variant">
          {tickerItems.map((item, index) => (
            <a
              key={`${item.title}-${index}`}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 pr-8 hover:text-primary transition-colors"
            >
              <span>{item.title}</span>
              <span className="text-primary/50" aria-hidden="true">|</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
