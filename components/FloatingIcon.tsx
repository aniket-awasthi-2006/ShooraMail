
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ThemeMode } from '../App';

interface FloatingIconProps {
  icon: LucideIcon;
  delay?: number;
  className?: string;
  themeMode?: ThemeMode;
}

const MotionDiv = motion.div as any;

const FloatingIcon: React.FC<FloatingIconProps> = ({ icon: Icon, delay = 0, className = "", themeMode = 'light' }) => {
  const isLight = themeMode === 'light';

  return (
    <MotionDiv
      initial={{ y: 0 }}
      animate={{ y: [-15, 15, -15] }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
      className={`absolute ${className} z-10`}
    >
      <div className={`p-4 rounded-2xl shadow-xl border transition-all duration-700 flex items-center justify-center hover:scale-110 cursor-default ${
        isLight ? 'bg-white border-gray-100 text-gray-800' : 
        themeMode === 'dark' ? 'bg-[#131416] border-[#25282B] text-gray-200' : 
        'bg-black border-white text-white'
      }`}>
        <Icon className="w-6 h-6" strokeWidth={1.5} />
      </div>
    </MotionDiv>
  );
};

export default FloatingIcon;
