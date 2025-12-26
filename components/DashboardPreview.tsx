
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeMode } from '../App';

const MotionDiv = motion.div as any;

interface DashboardPreviewProps {
  onOpenApp?: () => void;
  themeMode: ThemeMode;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onOpenApp, themeMode }) => {
  const [index, setIndex] = useState(0);
  const isNormalMode = themeMode === 'light' || themeMode === 'colored';

  /**
   * IMPORTANT: Ensure your local folder is named 'assets' (lowercase) 
   * and contains these exact filenames.
   */
  const displayImages = [
    "./assets/slide1.png",
    "./assets/slide2.png",
    "./assets/slide3.png"
  ];

  // Robust fallbacks to ensure the UI looks great even if local assets are 404ing
  const fallbackImages = [
    "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % 3);
    }, 5000); // Slightly longer duration for smoother transition feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full relative group cursor-pointer" onClick={onOpenApp}>
      {/* Dynamic Theme Glow */}
      <div className={`absolute -inset-10 rounded-[100px] blur-3xl opacity-20 group-hover:opacity-40 transition-all duration-1000 pointer-events-none ${
        isNormalMode ? 'bg-blue-400' : 'bg-indigo-600'
      }`}></div>

      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-[32px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] border transition-all duration-700 overflow-hidden flex flex-col aspect-[16/10] backdrop-blur-sm ${
          isNormalMode ? 'bg-white border-gray-200/60' : 'bg-[#0B0C0D] border-white/5'
        }`}
      >
        <div className="relative w-full h-full flex-1">
          <AnimatePresence mode="popLayout">
            <MotionDiv
              key={index}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 1.8,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="w-full h-full relative">
                {/* Visual Consistency Overlay */}
                <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-1000 ${
                  themeMode === 'dark' ? 'bg-black/10' : 'bg-transparent'
                }`}></div>

                <img
                  src={displayImages[index]}
                  alt={`ShooraMail Interface ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-[5000ms] ease-linear group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    // Prevent infinite loop if fallback also fails
                    if (target.src !== fallbackImages[index]) {
                      console.warn(`Local asset not found: ${displayImages[index]}. Switching to cloud fallback.`);
                      target.src = fallbackImages[index];
                    }
                  }}
                />

                {/* Status Indicator */}
                <div className="absolute top-8 left-8 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/20 backdrop-blur-xl border border-white/20 shadow-2xl">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    index === 0 ? 'bg-blue-400' : index === 1 ? 'bg-indigo-400' : 'bg-emerald-400'
                  }`}></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    {index === 0 ? 'Core Module' : index === 1 ? 'Shadow Layer' : 'Prism View'}
                  </span>
                </div>
              </div>
            </MotionDiv>
          </AnimatePresence>
        </div>

        {/* Progress Timeline */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {[0, 1, 2].map((i) => (
            <div 
              key={i}
              className={`h-1 rounded-full overflow-hidden transition-all duration-500 ${
                index === i ? 'w-20 bg-white/30' : 'w-12 bg-white/10'
              }`}
            >
              {index === i && (
                <MotionDiv
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className={`h-full ${isNormalMode ? 'bg-black' : 'bg-white'}`}
                />
              )}
            </div>
          ))}
        </div>
      </MotionDiv>

      {/* Floating CTA Overlay */}
      <div className={`absolute -bottom-6 left-1/2 -translate-x-1/2 px-10 py-4 rounded-full text-[11px] font-black tracking-[0.3em] uppercase shadow-2xl z-30 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 pointer-events-none whitespace-nowrap ${
        themeMode === 'colored' ? 'bg-[#2D62ED] text-white' : 
        themeMode === 'dark' ? 'bg-white text-black' : 
        'bg-black text-white'
      }`}>
        Explore Dashboard
      </div>
    </div>
  );
};

export default DashboardPreview;
