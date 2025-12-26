import React from 'react';
import { ArrowRight, Menu } from 'lucide-react';
import { View, ThemeMode } from '../App';
import { LogoBlack, LogoWhite } from './Logo';

interface NavbarProps {
  onNavigate: (view: View) => void;
  currentView: View;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, themeMode, setThemeMode }) => {
  const isLight = themeMode === 'light';
  const isDark = themeMode === 'dark';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-all duration-700 ease-in-out ${
      isLight ? 'bg-white/80 border-gray-100' : 
      isDark ? 'bg-[#0B0C0D]/80 border-[#25282B]' : 
      'bg-black/80 border-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Left: Logo */}
        <div 
          className="flex items-center gap-2 md:gap-3 cursor-pointer group" 
          onClick={() => onNavigate('landing')}
        >
          {isLight ? <LogoBlack className="w-8 h-8 md:w-9 md:h-9 transition-transform group-hover:-rotate-6" /> : <LogoWhite className="w-8 h-8 md:w-9 md:h-9 transition-transform group-hover:-rotate-6" />}
          <span className={`font-black text-lg md:text-xl tracking-tighter transition-colors duration-700 ${isLight ? 'text-black' : 'text-white'}`}>ShooraMail</span>
        </div>
        
        {/* Right: Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden sm:flex items-center gap-6 text-[10px] md:text-sm font-black uppercase tracking-widest">
            <button 
              onClick={() => onNavigate('pricing')} 
              className={`transition-all duration-500 hover:opacity-100 ${currentView === 'pricing' ? 'opacity-100' : 'opacity-40'} ${isLight ? 'text-black' : 'text-white'}`}
            >
              Pricing
            </button>
            <button 
              onClick={() => onNavigate('signin')} 
              className={`transition-all duration-500 hover:opacity-100 ${currentView === 'signin' ? 'opacity-100' : 'opacity-40'} ${isLight ? 'text-black' : 'text-white'}`}
            >
              Log In
            </button>
          </div>

          <button 
            onClick={() => onNavigate('signup')}
            className={`px-5 md:px-7 py-2.5 md:py-3 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all duration-700 shadow-xl group ${
              isLight ? 'bg-black text-white hover:bg-gray-900' : 'bg-white text-black hover:bg-gray-100'
            }`}
          >
            Sign Up
            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          {/* Mobile Menu Placeholder - Visual only for aesthetics */}
          <button className="sm:hidden p-1 opacity-40">
             <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;