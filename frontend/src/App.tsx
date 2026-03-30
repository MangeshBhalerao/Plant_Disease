/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Menu, Home, Scan, Clock, User } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './screens/HomeScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DetectResponse, DetectionHistoryItem } from './types';
import { cn } from './utils/cn';

const desktopNavItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/results', icon: Scan, label: 'Diagnose' },
  { path: '/history', icon: Clock, label: 'History' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<DetectResponse | null>(() => {
    const stored = sessionStorage.getItem('last-detection-result');
    return stored ? JSON.parse(stored) as DetectResponse : null;
  });

  const handleAnalyzeComplete = (result: DetectResponse) => {
    if (analysisResult?.preview_image_url?.startsWith('blob:') && analysisResult.preview_image_url !== result.preview_image_url) {
      URL.revokeObjectURL(analysisResult.preview_image_url);
    }
    setAnalysisResult(result);
    sessionStorage.setItem('last-detection-result', JSON.stringify(result));
    navigate('/results');
  };

  const handleNewScan = () => {
    if (analysisResult?.preview_image_url?.startsWith('blob:')) {
      URL.revokeObjectURL(analysisResult.preview_image_url);
    }
    setAnalysisResult(null);
    sessionStorage.removeItem('last-detection-result');
    navigate('/');
  };

  const handleOpenHistoryResult = (item: DetectionHistoryItem) => {
    if (analysisResult?.preview_image_url?.startsWith('blob:')) {
      URL.revokeObjectURL(analysisResult.preview_image_url);
    }

    const restoredResult: DetectResponse = {
      disease: item.disease_name,
      confidence: item.confidence ?? 0,
      remedy: item.remedy ?? 'No recommended actions found for this issue.',
      image_path: item.image_path,
      reasoning: item.reasoning ?? 'No reasoning available for this historical scan.',
    };

    setAnalysisResult(restoredResult);
    sessionStorage.setItem('last-detection-result', JSON.stringify(restoredResult));
    navigate('/results');
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.035] animate-float"
          style={{
            top: '10%', left: '5%',
            background: 'radial-gradient(circle, #22c55e, transparent 70%)',
            animationDelay: '0s',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] animate-float"
          style={{
            bottom: '15%', right: '10%',
            background: 'radial-gradient(circle, #14b8a6, transparent 70%)',
            animationDelay: '2s',
          }}
        />
        <div
          className="absolute w-[350px] h-[350px] rounded-full opacity-[0.025] animate-float"
          style={{
            top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            background: 'radial-gradient(circle, #84cc16, transparent 70%)',
            animationDelay: '4s',
          }}
        />
      </div>

      <header className="fixed top-0 left-0 w-full z-[50] px-3 sm:px-5 pt-2 sm:pt-3">
        <nav className="glass-strong rounded-2xl px-4 sm:px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
          <motion.div
            onClick={handleNewScan}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-md shadow-primary/15">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-base sm:text-lg font-headline font-bold text-on-surface tracking-tight">
              PlantCare <span className="text-gradient">AI</span>
            </span>
          </motion.div>

          <div className="hidden md:flex items-center gap-1">
            {desktopNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={cn(
                    'relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-primary bg-primary/8'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-black/[0.03]',
                  )}
                >
                  <item.icon className={cn('w-4 h-4', isActive && 'text-primary')} />
                  <span className="font-semibold">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="desktop-nav-pill"
                      className="absolute inset-0 bg-primary/8 rounded-xl -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="hidden md:block">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleNewScan}
              className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"
            >
              <Scan className="w-4 h-4" />
              New Scan
            </motion.button>
          </div>
        </nav>
      </header>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
        currentPath={location.pathname}
        onNavigate={(path) => {
          navigate(path);
          setSidebarOpen(false);
        }}
      />

      <main className="relative z-10 pt-20 sm:pt-24 pb-24 md:pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomeScreen key="home" onAnalyzeComplete={handleAnalyzeComplete} />} />
            <Route
              path="/results"
              element={
                <ResultsScreen
                  key="results"
                  result={analysisResult}
                  onNewScan={handleNewScan}
                  onAnalyzeComplete={handleAnalyzeComplete}
                />
              }
            />
            <Route path="/history" element={<HistoryScreen key="history" onOpenResult={handleOpenHistoryResult} />} />
            <Route path="/profile" element={<ProfileScreen key="profile" onBack={() => navigate('/')} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>

      <div className="md:hidden">
        <BottomNav currentPath={location.pathname} onNavigate={navigate} />
      </div>
    </div>
  );
}
