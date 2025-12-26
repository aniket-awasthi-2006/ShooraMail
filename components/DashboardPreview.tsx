
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Plus, AtSign, MessageCircle, MoreHorizontal, Send, ShieldCheck } from 'lucide-react';
import { ThemeMode } from '../App';

const MotionDiv = motion.div as any;

const SidebarItem: React.FC<{ label: string; active?: boolean; dot?: boolean; count?: number; themeMode: ThemeMode }> = ({ label, active, dot, count, themeMode }) => {
  const isLight = themeMode === 'light';
  return (
    <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl cursor-pointer group transition-all duration-500 ${
      active ? (isLight ? 'bg-gray-100 font-bold' : 'bg-white/10 font-bold text-white') : 
      (isLight ? 'hover:bg-gray-50' : 'hover:bg-white/5')
    }`}>
      <div className="flex items-center gap-3">
        <span className={`text-sm transition-colors duration-500 ${active ? (isLight ? 'text-black' : 'text-white') : (isLight ? 'text-gray-500 group-hover:text-gray-900' : 'text-gray-400 group-hover:text-gray-200')}`}>{label}</span>
        {dot && <div className="w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_rgba(239,68,68,0.5)]"></div>}
      </div>
      {count && <span className="text-[10px] font-bold opacity-40">{count}</span>}
    </div>
  );
};

const UserAvatar: React.FC<{ src: string }> = ({ src }) => (
  <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden shadow-sm flex-shrink-0">
    <img src={src} alt="user" className="w-full h-full object-cover" />
  </div>
);

interface DashboardPreviewProps {
  onOpenApp?: () => void;
  themeMode: ThemeMode;
}

const DashboardPreview: React.FC<DashboardPreviewProps> = ({ onOpenApp, themeMode }) => {
  const isLight = themeMode === 'light';
  const isDark = themeMode === 'dark';
  const isContrast = themeMode === 'contrast';

  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = 8 + Math.floor(i / 2);
    const min = i % 2 === 0 ? "00" : "30";
    return `${hour}:${min}`;
  });

  return (
    <div className="w-full relative group cursor-pointer" onClick={onOpenApp}>
      {/* Decorative background glow */}
      <div className={`absolute -inset-10 rounded-[100px] blur-3xl opacity-30 group-hover:opacity-50 transition-all duration-1000 pointer-events-none ${
        isLight ? 'bg-gradient-to-r from-gray-100 via-gray-50 to-transparent' : 'bg-gradient-to-r from-blue-900 via-indigo-900 to-transparent'
      }`}></div>

      <MotionDiv 
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative rounded-[32px] shadow-2xl border transition-all duration-700 overflow-hidden flex flex-col md:flex-row min-h-[600px] backdrop-blur-sm ${
          isLight ? 'bg-white border-gray-200/60' : 
          isDark ? 'bg-[#131416] border-[#25282B]' : 
          'bg-black border-white'
        }`}
      >
        {/* Sidebar */}
        <div className={`w-full md:w-72 border-r flex flex-col p-8 gap-8 transition-all duration-700 ${
          isLight ? 'bg-gray-50/20 border-gray-100/80' : 
          isDark ? 'bg-[#0B0C0D] border-[#25282B]' : 
          'bg-black border-white'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-all duration-500 ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>
                <ChevronLeft className="w-5 h-5" />
              </div>
              <span className={`font-extrabold text-base tracking-tight transition-colors duration-700 ${isLight ? 'text-black' : 'text-white'}`}>Campaign</span>
            </div>
            <button className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-500 ${isLight ? 'border-gray-200 text-gray-400 hover:text-black hover:bg-white' : 'border-[#25282B] text-gray-500 hover:text-white'}`}>
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <SidebarItem label="Inbox" active dot count={12} themeMode={themeMode} />
            <SidebarItem label="Focused" dot themeMode={themeMode} />
            <SidebarItem label="Attachments" themeMode={themeMode} />
            <SidebarItem label="Drafts" count={3} themeMode={themeMode} />
            <SidebarItem label="Sent" themeMode={themeMode} />
            <SidebarItem label="Spam" themeMode={themeMode} />
          </div>

          <div className={`mt-auto pt-8 border-t transition-all duration-700 ${isLight ? 'border-gray-100' : 'border-[#25282B]'}`}>
             <div className={`p-4 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-500 ${isLight ? 'bg-gray-100 hover:bg-gray-200' : 'bg-white/5 hover:bg-white/10'}`}>
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                   <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <div>
                   <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">Workspace</p>
                   <p className={`text-sm font-bold transition-colors duration-500 ${isLight ? 'text-black' : 'text-white'}`}>Secure Cloud</p>
                </div>
             </div>
          </div>
        </div>

        {/* Main Timeline Content */}
        <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-700 ${isLight ? 'bg-white' : 'bg-[#131416]'}`}>
          {/* Timeline Header */}
          <div className={`flex border-b sticky top-0 z-20 transition-all duration-700 ${isLight ? 'border-gray-100 bg-white/50' : 'border-[#25282B] bg-[#131416]/50'}`}>
            {timeSlots.map((time, idx) => (
              <div key={idx} className={`flex-1 min-w-[90px] py-6 text-[11px] font-bold text-center border-r transition-all duration-500 ${
                isLight ? 'border-gray-50 text-gray-400' : 'border-[#25282B] text-gray-500'
              } ${time === '9:00' ? (isLight ? 'bg-black text-white shadow-xl' : 'bg-white text-black shadow-xl') : ''}`}>
                {time}
              </div>
            ))}
          </div>

          {/* Timeline Content Grid */}
          <div className="relative flex-1 overflow-x-auto no-scrollbar">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex pointer-events-none">
              {timeSlots.map((_, idx) => (
                <div key={idx} className={`flex-1 min-w-[90px] border-r h-full transition-all duration-700 ${isLight ? 'border-gray-50' : 'border-[#25282B]'}`}></div>
              ))}
            </div>

            {/* Indicator */}
            <div className={`absolute left-[225px] top-0 bottom-0 w-[2px] z-10 flex flex-col items-center transition-all duration-700 ${isLight ? 'bg-black' : 'bg-white'}`}>
               <div className={`w-3 h-3 rounded-full mt-[-4px] shadow-lg ${isLight ? 'bg-black' : 'bg-white'}`}></div>
            </div>

            {/* Content Cards */}
            <div className="relative z-10 p-10 flex flex-col gap-10 h-full min-w-[1200px]">
              <div className="flex">
                <div className={`px-5 py-3 rounded-full border shadow-md flex items-center gap-4 ml-[45px] transition-all duration-700 ${isLight ? 'bg-white border-gray-200' : 'bg-[#1A1B1E] border-[#25282B]'}`}>
                  <div className={`w-4 h-4 rounded-full border-[3px] ${isLight ? 'border-gray-200' : 'border-[#25282B]'}`}></div>
                  <div className="flex flex-col">
                    <span className={`text-[12px] font-bold transition-colors duration-700 ${isLight ? 'text-black' : 'text-white'}`}>Product Strategy: Feed Refresh</span>
                    <span className="text-[10px] text-gray-400 font-medium">Re: New Design Mockups</span>
                  </div>
                  <div className="flex -space-x-2 pl-2 border-l border-gray-100 ml-2">
                    <UserAvatar src="https://i.pravatar.cc/100?u=1" />
                    <UserAvatar src="https://i.pravatar.cc/100?u=2" />
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className={`px-8 py-3 rounded-full shadow-2xl flex items-center justify-between ml-[315px] w-[420px] transition-all duration-700 ${isLight ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span className="text-xs font-bold tracking-tight">Launch Sequence: Pro</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="px-2 py-0.5 rounded-full bg-black/10 text-[9px] font-bold uppercase tracking-wider">Scheduled</div>
                    <UserAvatar src="https://i.pravatar.cc/100?u=4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MotionDiv>

      <div className={`absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-xl z-30 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ${
        isLight ? 'bg-black text-white' : 'bg-white text-black'
      }`}>
        Open Application
      </div>
    </div>
  );
};

export default DashboardPreview;
