import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { View, ThemeMode } from '../App';
import { LogoBlack, LogoWhite } from './Logo';

const MotionDiv = motion.div as any;

interface AuthPageProps {
  mode: 'signin' | 'signup';
  onNavigate: (v: View) => void;
  themeMode: ThemeMode;
}

const AuthPage: React.FC<AuthPageProps> = ({ mode, onNavigate, themeMode }) => {
  const isSignIn = mode === 'signin';
  const isLight = themeMode === 'light';
  const isColored = themeMode === 'colored';
  const isDark = themeMode === 'dark';
  const isNormalMode = isLight || isColored;

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`max-w-md w-full rounded-[40px] shadow-2xl border p-10 flex flex-col gap-8 transition-all duration-700 ${
          isNormalMode ? 'bg-white border-gray-100' : 
          isDark ? 'bg-[#131416] border-[#25282B]' : 
          'bg-black border-white'
        }`}
      >
        <div className="flex justify-center">
          <div className={`w-12 h-12 p-2 rounded-2xl flex items-center justify-center transition-all duration-700 ${
            isColored ? 'bg-[#2D62ED]/10' : 
            isLight ? 'bg-black/5' : 
            'bg-white/10'
          }`}>
            {isDark ? (
              <LogoWhite className="w-full h-full" />
            ) : (
              <LogoBlack className="w-full h-full" style={{ fill: isColored ? '#2D62ED' : 'black' }} />
            )}
          </div>
        </div>

        <div className="text-center flex flex-col gap-2">
          <h2 className={`text-3xl font-black tracking-tighter transition-colors ${isColored ? 'text-[#2D62ED]' : ''}`}>
            {isSignIn ? 'Welcome back.' : 'Create your workspace.'}
          </h2>
          <p className="opacity-60 text-sm font-medium">
            {isSignIn 
              ? 'Enter your credentials to access ShooraMail' 
              : 'Join thousands of users organizing their digital lives.'}
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`flex items-center justify-center gap-3 w-full py-3.5 px-4 rounded-2xl border font-bold text-sm transition-all duration-500 ${
              isNormalMode ? 'border-gray-200 hover:bg-gray-50 hover:border-gray-300' : 'border-[#25282B] hover:bg-white/5 hover:border-white/20'
            }`}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="relative flex items-center gap-4">
          <div className={`flex-1 h-px ${isNormalMode ? 'bg-gray-100' : 'bg-[#25282B]'}`}></div>
          <span className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Or email</span>
          <div className={`flex-1 h-px ${isNormalMode ? 'bg-gray-100' : 'bg-[#25282B]'}`}></div>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleAuth}>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="email" 
              placeholder="Email address"
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent text-sm font-medium transition-all duration-500 outline-none ${
                isNormalMode ? 'bg-gray-50 focus:border-[#2D62ED] focus:bg-white' : 'bg-white/5 focus:border-white focus:bg-white/10 text-white'
              }`}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              type="password" 
              placeholder="Password"
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent text-sm font-medium transition-all duration-500 outline-none ${
                isNormalMode ? 'bg-gray-50 focus:border-[#2D62ED] focus:bg-white' : 'bg-white/5 focus:border-white focus:bg-white/10 text-white'
              }`}
            />
          </div>
          <button 
            type="submit"
            className={`w-full py-4 mt-2 rounded-full font-bold shadow-xl transition-all duration-700 flex items-center justify-center gap-2 transform active:scale-95 ${
              isColored ? 'bg-[#2D62ED] text-white hover:bg-blue-700' :
              isLight ? 'bg-black text-white hover:bg-gray-800' : 
              'bg-white text-black hover:bg-gray-100'
            }`}
          >
            {isSignIn ? 'Sign In' : 'Sign Up'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-sm font-medium opacity-60">
          {isSignIn ? "Don't have an account? " : "Already have an account? "}
          <button 
            onClick={() => onNavigate(isSignIn ? 'signup' : 'signin')}
            className={`font-bold hover:underline underline-offset-4 transition-colors ${isColored ? 'text-[#2D62ED]' : isLight ? 'text-black' : 'text-white'}`}
          >
            {isSignIn ? 'Sign Up' : 'Log In'}
          </button>
        </p>
      </MotionDiv>
    </div>
  );
};

export default AuthPage;