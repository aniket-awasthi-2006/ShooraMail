
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Contrast } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import PricingPage from './components/PricingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import { LogoBlack, LogoWhite } from './components/Logo';

export type View = 'landing' | 'pricing' | 'signin' | 'signup' | 'dashboard';
export type ThemeMode = 'light' | 'dark' | 'contrast';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const themeStyles = {
    light: {
      bg: 'bg-white',
      text: 'text-black',
      mutedText: 'text-gray-500',
      border: 'border-gray-100'
    },
    dark: {
      bg: 'bg-[#0B0C0D]',
      text: 'text-[#ECEEF2]',
      mutedText: 'text-[#9499A1]',
      border: 'border-[#25282B]'
    },
    contrast: {
      bg: 'bg-black',
      text: 'text-white',
      mutedText: 'text-white/70',
      border: 'border-white'
    }
  };

  const currentTheme = themeStyles[themeMode];

  useEffect(() => {
    document.body.style.transition = 'background-color 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    if (themeMode === 'light') {
      document.body.style.backgroundColor = '#ffffff';
    } else if (themeMode === 'dark') {
      document.body.style.backgroundColor = '#0B0C0D';
    } else {
      document.body.style.backgroundColor = '#000000';
    }
  }, [themeMode]);

  const navigate = (v: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setView(v);
  };

  // Fixed type inference for framer-motion transition by using any to avoid cubic-bezier array mismatch
  const pageTransition: any = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

  const renderContent = () => {
    switch (view) {
      case 'dashboard':
        return (
          <motion.div key="dashboard" {...pageTransition} className="h-screen w-screen overflow-hidden">
            <Dashboard 
              onLogout={() => setView('landing')} 
              themeMode={themeMode} 
              setThemeMode={setThemeMode} 
            />
          </motion.div>
        );
      case 'pricing':
        return (
          <motion.div key="pricing" {...pageTransition} className="pt-20 md:pt-32">
            <PricingPage onNavigate={navigate} themeMode={themeMode} />
          </motion.div>
        );
      case 'signin':
        return (
          <motion.div key="signin" {...pageTransition} className="pt-20 md:pt-32">
            <AuthPage mode="signin" onNavigate={navigate} themeMode={themeMode} />
          </motion.div>
        );
      case 'signup':
        return (
          <motion.div key="signup" {...pageTransition} className="pt-20 md:pt-32">
            <AuthPage mode="signup" onNavigate={navigate} themeMode={themeMode} />
          </motion.div>
        );
      default:
        return (
          <motion.div key="landing" {...pageTransition} className="pt-20 md:pt-32">
            <div className="pt-6 md:pt-20">
              <Hero onNavigate={navigate} themeMode={themeMode} />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-48 pb-48 md:pb-96">
              <DashboardPreview onOpenApp={() => setView('dashboard')} themeMode={themeMode} />
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className={`relative min-h-screen transition-all duration-700 ease-in-out ${currentTheme.bg} ${currentTheme.text}`}>
      <AnimatePresence mode="wait">
        {view !== 'dashboard' && (
          <motion.div
            key="navbar"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 left-0 right-0 z-50"
          >
            <Navbar 
              onNavigate={navigate} 
              currentView={view} 
              themeMode={themeMode} 
              setThemeMode={setThemeMode} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      <main>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      
      {/* Global Floating Theme Toggle - Bottom Left (Hidden in Dashboard View) */}
      <AnimatePresence>
        {view !== 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-6 left-6 z-[60]"
          >
            <div className={`p-1.5 rounded-[24px] border shadow-2xl transition-all duration-700 flex items-center gap-1 backdrop-blur-lg ${
              themeMode === 'light' ? 'bg-white/90 border-gray-200' : 
              themeMode === 'dark' ? 'bg-[#1A1B1E]/90 border-[#25282B]' : 
              'bg-black/90 border-white'
            }`}>
              {(['light', 'dark', 'contrast'] as ThemeMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  className={`p-2 md:p-2.5 rounded-full transition-all duration-500 flex items-center justify-center relative group ${themeMode === mode ? 'shadow-lg scale-110' : 'opacity-40 hover:opacity-100'}`}
                  style={{ 
                    backgroundColor: themeMode === mode ? (mode === 'contrast' ? '#FFFF00' : '#2D62ED') : 'transparent',
                    color: themeMode === mode ? (mode === 'contrast' ? '#000' : '#fff') : (themeMode === 'light' ? '#000' : '#fff') 
                  }}
                >
                  {mode === 'light' && <Sun className="w-4 h-4 md:w-5 md:h-5" />}
                  {mode === 'dark' && <Moon className="w-4 h-4 md:w-5 md:h-5" />}
                  {mode === 'contrast' && <Contrast className="w-4 h-4 md:w-5 md:h-5" />}
                  
                  <span className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {mode}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Brand Seal Bottom Right - Icon Only (Hidden on dashboard) */}
      <AnimatePresence>
        {view !== 'dashboard' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 pointer-events-none group hidden sm:block"
          >
            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-[20px] flex items-center justify-center shadow-2xl border-2 transition-all duration-700 transform hover:rotate-12 ${themeMode === 'light' ? 'bg-black border-white/20' : 'bg-white border-black/20'}`}>
              {themeMode === 'light' ? <LogoWhite className="w-6 h-6 md:w-8 md:h-8" /> : <LogoBlack className="w-6 h-6 md:w-8 md:h-8" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
