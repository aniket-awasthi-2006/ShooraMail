
import React, { useState, useEffect } from 'react';
import { Sun, Moon, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardPreview from './components/DashboardPreview';
import PricingPage from './components/PricingPage';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AdminPage from './components/AdminPage';

export type View = 'landing' | 'pricing' | 'signin' | 'signup' | 'dashboard' | 'admin';
export type ThemeMode = 'light' | 'dark' | 'colored';

// Use any cast for motion components to avoid type errors in certain environments
const MotionDiv = motion.div as any;

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
    colored: {
      bg: 'bg-white',
      text: 'text-black',
      mutedText: 'text-gray-500',
      border: 'border-gray-100'
    }
  };

  const currentTheme = themeStyles[themeMode];

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const path = window.location.pathname;

    if (isLoggedIn || path === '/Dashboard' || path === '/dashboard') {
      setView('dashboard');
    }
  }, []);

  useEffect(() => {
    if (themeMode === 'light') {
      document.body.className = 'mesh-bg';
      document.body.style.backgroundColor = '#ffffff';
    } else if (themeMode === 'dark') {
      document.body.className = '';
      document.body.style.backgroundColor = '#0B0C0D';
    } else {
      document.body.className = 'mesh-bg';
      document.body.style.backgroundColor = '#ffffff';
    }
  }, [themeMode]);

  const navigate = (v: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (v === 'dashboard') {
      window.history.pushState({}, '', '/Dashboard');
    } else if (v === 'landing') {
      window.history.pushState({}, '', '/');
    }
    setView(v);
  };

  const pageTransition: any = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  };

  const getToggleButtonStyles = (btnMode: ThemeMode) => {
    const isActive = themeMode === btnMode;
    if (themeMode === 'light') {
      if (isActive) return { background: '#000000', color: '#ffffff' };
      return { background: 'transparent', color: '#000000' };
    }
    if (themeMode === 'dark') {
      if (isActive) return { background: '#ffffff', color: '#000000' };
      return { background: 'transparent', color: '#ffffff' };
    }
    if (themeMode === 'colored') {
      if (isActive) return { background: 'linear-gradient(45deg, #2D62ED, #1E40AF)', color: '#ffffff' };
      return { background: 'transparent', color: '#2D62ED' };
    }
    return { background: 'transparent', color: 'inherit' };
  };

  const renderContent = () => {
    switch (view) {
      case 'admin':
        return (
          <MotionDiv key="admin" {...pageTransition} className="h-screen w-screen overflow-hidden">
            <AdminPage onNavigate={navigate} themeMode={themeMode} setThemeMode={setThemeMode} />
          </MotionDiv>
        );
      case 'dashboard':
        return (
          <MotionDiv key="dashboard" {...pageTransition} className="h-screen w-screen overflow-hidden">
            <Dashboard 
              onLogout={() => navigate('landing')} 
              themeMode={themeMode} 
              setThemeMode={setThemeMode} 
            />
          </MotionDiv>
        );
      case 'pricing':
        return (
          <MotionDiv key="pricing" {...pageTransition} className="pt-20 md:pt-32">
            <PricingPage onNavigate={navigate} themeMode={themeMode} />
          </MotionDiv>
        );
      case 'signin':
        return (
          <MotionDiv key="signin" {...pageTransition} className="pt-20 md:pt-32">
            <AuthPage mode="signin" onNavigate={navigate} themeMode={themeMode} />
          </MotionDiv>
        );
      case 'signup':
        return (
          <MotionDiv key="signup" {...pageTransition} className="pt-20 md:pt-32">
            <AuthPage mode="signup" onNavigate={navigate} themeMode={themeMode} />
          </MotionDiv>
        );
      default:
        return (
          <MotionDiv key="landing" {...pageTransition} className="pt-20 md:pt-32">
            <div className="pt-6 md:pt-20">
              <Hero onNavigate={navigate} themeMode={themeMode} />
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 md:mt-48 pb-48 md:pb-96">
              <DashboardPreview onOpenApp={() => setView('dashboard')} themeMode={themeMode} />
            </div>
          </MotionDiv>
        );
    }
  };

  return (
    <div className={`relative min-h-screen transition-all duration-700 ease-in-out ${currentTheme.bg} ${currentTheme.text}`}>
      <AnimatePresence mode="wait">
        {(view !== 'dashboard' && view !== 'admin') && (
          <MotionDiv
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
          </MotionDiv>
        )}
      </AnimatePresence>
      
      <main>
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>
      
      <AnimatePresence>
        {(view !== 'dashboard' && view !== 'admin') && (
          <MotionDiv 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed bottom-6 left-6 z-[60]"
          >
            <div className={`p-1.5 rounded-[24px] border shadow-2xl transition-all duration-700 flex items-center gap-1 backdrop-blur-lg ${
              themeMode === 'light' ? 'bg-white/90 border-gray-200' : 
              themeMode === 'dark' ? 'bg-[#1A1B1E]/90 border-[#25282B]' : 
              'bg-white/90 border-gray-200'
            }`}>
              {(['light', 'dark', 'colored'] as ThemeMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setThemeMode(mode)}
                  className={`p-2 md:p-2.5 rounded-full transition-all duration-500 flex items-center justify-center relative group ${themeMode === mode ? 'shadow-lg scale-110 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                  style={getToggleButtonStyles(mode)}
                >
                  {mode === 'light' && <Sun className="w-4 h-4 md:w-5 md:h-5" />}
                  {mode === 'dark' && <Moon className="w-4 h-4 md:w-5 md:h-5" />}
                  {mode === 'colored' && <Palette className="w-4 h-4 md:w-5 md:h-5" />}
                  <span className="hidden md:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    {mode}
                  </span>
                </button>
              ))}
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
