
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Shield, Globe } from 'lucide-react';
import { View, ThemeMode } from '../App';

const MotionDiv = motion.div as any;

const PricingCard: React.FC<{
  title: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  onSelect: () => void;
  themeMode: ThemeMode;
}> = ({ title, price, description, features, recommended, onSelect, themeMode }) => {
  const isLight = themeMode === 'light';
  const isContrast = themeMode === 'contrast';
  
  // Card specific themes
  const cardStyle = recommended 
    ? (isLight ? 'bg-black text-white border-black' : 'bg-white text-black border-white') 
    : (isLight ? 'bg-white text-black border-gray-200' : isContrast ? 'bg-black text-white border-white' : 'bg-[#131416] text-white border-[#25282B]');

  const btnStyle = recommended 
    ? (isLight ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800') 
    : (isLight ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black hover:bg-gray-100');

  return (
    <MotionDiv
      whileHover={{ y: -5 }}
      className={`p-8 rounded-[32px] border flex flex-col gap-6 shadow-xl transition-all duration-700 ${cardStyle}`}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className={`text-sm opacity-60`}>{description}</p>
      </div>
      
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-black">{price}</span>
        <span className="text-sm opacity-60">{price === 'Custom' ? '' : '/mo'}</span>
      </div>

      <button 
        onClick={onSelect}
        className={`w-full py-3 rounded-full font-bold transition-all duration-500 ${btnStyle}`}
      >
        Get Started
      </button>

      <div className="flex flex-col gap-4 mt-4">
        {features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <Check className={`w-4 h-4 ${recommended ? (isLight ? 'text-yellow-400' : 'text-blue-500') : (isLight ? 'text-black' : 'text-white')}`} />
            <span className="text-sm font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </MotionDiv>
  );
};

const PricingPage: React.FC<{ onNavigate: (v: View) => void; themeMode: ThemeMode }> = ({ onNavigate, themeMode }) => {
  const isLight = themeMode === 'light';

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center mb-16 flex flex-col items-center gap-4">
        <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight">Simple Pricing.</h2>
        <p className={`text-lg max-w-xl font-medium transition-colors duration-700 ${isLight ? 'text-gray-500' : 'text-gray-400'}`}>
          Everything you need to master your emails, for teams of all sizes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard 
          title="Free"
          price="$0"
          description="Perfect for individuals managing light loads."
          onSelect={() => onNavigate('signup')}
          themeMode={themeMode}
          features={[
            "Unified Inbox (up to 3 accounts)",
            "Standard search",
            "Basic timeline view",
            "5GB storage"
          ]}
        />
        <PricingCard 
          title="Pro"
          price="$15"
          recommended
          description="Most popular for professionals and power users."
          onSelect={() => onNavigate('signup')}
          themeMode={themeMode}
          features={[
            "Unlimited accounts",
            "AI-powered organization",
            "Advanced search & filtering",
            "Full timeline control",
            "50GB storage"
          ]}
        />
        <PricingCard 
          title="Enterprise"
          price="Custom"
          description="Bespoke solutions for larger organizations."
          onSelect={() => onNavigate('signup')}
          themeMode={themeMode}
          features={[
            "All Pro features",
            "Dedicated account manager",
            "Enhanced security & compliance",
            "API Access",
            "Unlimited storage"
          ]}
        />
      </div>

      <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 text-center pb-24">
        <div className="flex flex-col items-center gap-4">
          <Zap className="w-10 h-10" />
          <h4 className="font-bold">Lightning Fast</h4>
          <p className="text-sm opacity-60">Optimized performance for managing thousands of mails without lag.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Shield className="w-10 h-10" />
          <h4 className="font-bold">Privacy First</h4>
          <p className="text-sm opacity-60">Zero-knowledge encryption for your sensitive conversations.</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Globe className="w-10 h-10" />
          <h4 className="font-bold">Global Sync</h4>
          <p className="text-sm opacity-60">Access your timeline from any device, anywhere in the world.</p>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
