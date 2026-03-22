/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Leaf, Menu, Home, Scan, History, Search } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* ===== ANIMATED MESH GRADIENT BACKGROUND ===== */}
      <div className="bg-mesh" aria-hidden="true">
        <div className="bg-mesh-orb-3" />
        <div className="bg-mesh-orb-4" />
      </div>
      <div className="bg-noise" aria-hidden="true" />
      <div className="bg-top-line" aria-hidden="true" />

      {/* ===== GLASSMORPHIC NAVBAR ===== */}
      <header className="fixed top-0 left-0 w-full z-[50] px-3 sm:px-5 pt-3">
        <nav className="glass-navbar rounded-2xl px-4 sm:px-6 py-3 flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <motion.div 
            onClick={() => setScreen('home')}
            className="flex items-center gap-2.5 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-sm">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              {/* Tiny pulse dot */}
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full animate-pulse-glow border border-surface" />
            </div>
            <span className="text-base sm:text-lg font-headline font-bold text-on-surface tracking-tight group-hover:text-primary transition-colors duration-300">
              PlantCare <span className="text-gradient">AI</span>
            </span>
          </motion.div>

          {/* Right side nav items — desktop */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', screen: 'home' as Screen, icon: Home },
              { label: 'Diagnose', screen: 'results' as Screen, icon: Scan },
              { label: 'History', screen: 'history' as Screen, icon: History },
            ].map(item => (
              <motion.button
                key={item.label}
                onClick={() => setScreen(item.screen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  currentScreen === item.screen
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-muted hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Hamburger for sidebar */}
          <motion.button 
            onClick={() => setSidebarOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-all duration-300 relative group"
          >
            <Menu className="w-5 h-5" />
            {/* Circle pulse on hover */}
            <div className="absolute inset-0 rounded-xl border border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
          </motion.button>
        </nav>
      </header>

      {/* ===== SIDEBAR ===== */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
        onNavigate={(screen) => setScreen(screen)}
      />

      {/* ===== MAIN CONTENT ===== */}
      <main className="relative z-10 pt-20 sm:pt-24 pb-28 sm:pb-32 px-3 sm:px-5 lg:px-6 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && <HomeScreen key="home" />}
          {currentScreen === 'results' && <ResultsScreen key="results" />}
          {currentScreen === 'history' && <HistoryScreen key="history" />}
          {currentScreen === 'profile' && (
             <ProfileScreen key="profile" onBack={() => setScreen('home')} />
          )}
        </AnimatePresence>
      </main>

      {/* ===== BOTTOM NAV (mobile) ===== */}
      <BottomNav currentScreen={currentScreen} setScreen={setScreen} />
    </div>
  );
}
