/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Menu } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import { HomeScreen } from './screens/HomeScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { HistoryScreen } from './screens/HistoryScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Screen } from './types';

export default function App() {
  const [currentScreen, setScreen] = useState<Screen>('home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container/30">
      {/* Top Bar */}
      <header className="fixed top-0 left-0 w-full bg-surface/70 backdrop-blur-xl z-[50] flex justify-between items-center px-6 py-5">
        <div 
          onClick={() => setScreen('home')}
          className="text-xl font-black text-primary flex items-center gap-2 font-headline tracking-tight cursor-pointer"
        >
          <Leaf className="w-6 h-6" />
          <span>PlantCare AI</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(true)}
          className="text-on-surface-variant hover:opacity-80 transition-opacity p-1"
        >
          <Menu className="w-7 h-7" />
        </button>
      </header>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onNavigate={(screen) => setScreen(screen)}
      />

      {/* Main Content */}
      <main className="pt-24 pb-32 px-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && <HomeScreen key="home" />}
          {currentScreen === 'results' && <ResultsScreen key="results" />}
          {currentScreen === 'history' && <HistoryScreen key="history" />}
          {currentScreen === 'profile' && (
             <ProfileScreen key="profile" onBack={() => setScreen('home')} />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav currentScreen={currentScreen} setScreen={setScreen} />
    </div>
  );
}
