import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, ArrowRight, User, AlertCircle, CheckCircle } from 'lucide-react';
import { View, ThemeMode } from '../App';
import { LogoBlack, LogoWhite } from './Logo';
import api from '../axios';

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

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const submitData = {
      ...formData,
      email: formData.email.trim().toLowerCase(),
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim()
    };

    try {
      if (isSignIn) {
        await api.post('/api/auth/login', {
          email: submitData.email,
          password: submitData.password
        });
        
        onNavigate('dashboard');
      } else {
        await api.post('/api/auth/register', submitData);
        setShowSuccessModal(true);
      }
    } catch (err: any) {
      const status = err.response?.status;
      const msg = err.response?.data?.message || 'An error occurred';

      if (isSignIn) {
        if (status === 404 || msg.toLowerCase().includes('not found')) {
          setError("Account not found. You need to sign up first.");
        } else {
          setError(msg);
        }
      } else {
        if (status === 409 || msg.toLowerCase().includes('already registered')) {
          setError("This email is already registered. Please login instead.");
        } else {
          setError(msg);
        }
      }
    } finally {
      setIsLoading(false);
    }
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

      

     

        {error && (
          <div className={`p-3 rounded-xl flex items-start gap-3 text-sm ${
            isNormalMode ? 'bg-red-50 text-red-600' : 'bg-red-900/20 text-red-400'
          }`}>
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div className="flex flex-col gap-1">
              <span>{error}</span>
              {error.includes('not found') && isSignIn && (
                <button 
                  onClick={() => onNavigate('signup')}
                  className="text-left font-bold underline underline-offset-2 hover:opacity-80"
                >
                  Sign up now
                </button>
              )}
            </div>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleAuth}>
          {!isSignIn && (
            <div className="flex gap-4">
              <div className="relative flex-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  required
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  type="text" 
                  placeholder="First Name"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent text-sm font-medium transition-all duration-500 outline-none ${
                    isNormalMode ? 'bg-gray-50 focus:border-[#2D62ED] focus:bg-white' : 'bg-white/5 focus:border-white focus:bg-white/10 text-white'
                  }`}
                />
              </div>
              <div className="relative flex-1">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input 
                  required
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  type="text" 
                  placeholder="Last Name"
                  className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent text-sm font-medium transition-all duration-500 outline-none ${
                    isNormalMode ? 'bg-gray-50 focus:border-[#2D62ED] focus:bg-white' : 'bg-white/5 focus:border-white focus:bg-white/10 text-white'
                  }`}
                />
              </div>
            </div>
          )}

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password" 
              placeholder="Password"
              className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border-2 border-transparent text-sm font-medium transition-all duration-500 outline-none ${
                isNormalMode ? 'bg-gray-50 focus:border-[#2D62ED] focus:bg-white' : 'bg-white/5 focus:border-white focus:bg-white/10 text-white'
              }`}
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 mt-2 rounded-full font-bold shadow-xl transition-all duration-700 flex items-center justify-center gap-2 transform active:scale-95 ${
              isColored ? 'bg-[#2D62ED] text-white hover:bg-blue-700' :
              isLight ? 'bg-black text-white hover:bg-gray-800' : 
              'bg-white text-black hover:bg-gray-100'
            } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Processing...' : (isSignIn ? 'Sign In' : 'Sign Up')}
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

      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={`max-w-sm w-full p-8 rounded-3xl shadow-2xl text-center flex flex-col items-center gap-4 ${
                isNormalMode ? 'bg-white' : 'bg-[#131416] border border-[#25282B] text-white'
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold">Registration successful!</h3>
              <p className="opacity-60">A verification link has been sent to your inbox. Please verify to continue.</p>
              <button
                onClick={() => { setShowSuccessModal(false); onNavigate('signin'); }}
                className="w-full py-3 rounded-xl bg-black text-white font-bold mt-4 hover:bg-gray-800 transition-colors"
              >
                Go to Login
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthPage;