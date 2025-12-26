import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, Search, Star, Send, FileText, Trash2, Mail, 
  ChevronDown, MoreHorizontal, Reply, Forward, 
  Plus, Circle, LogOut, Sun, Moon, Contrast, ArrowLeft,
  Settings, Bell, Shield, HelpCircle, Inbox
} from 'lucide-react';
import { ThemeMode } from '../App';
import { LogoBlack, LogoWhite } from './Logo';

const MotionDiv = motion.div as any;

interface ThemeColors {
  sidebarBg: string;
  middlePaneBg: string;
  rightPaneBg: string;
  textMain: string;
  textMuted: string;
  border: string;
  itemBg: string;
  itemActiveBg: string;
  primary: string;
  unread: string;
  attachmentBg: string;
  inputBg: string;
}

const THEMES: Record<ThemeMode, ThemeColors> = {
  light: {
    sidebarBg: '#F1F3F5',
    middlePaneBg: '#FFFFFF',
    rightPaneBg: '#F8F9FA',
    textMain: '#1A1D1F',
    textMuted: '#6F767E',
    border: '#E9ECEF',
    itemBg: 'transparent',
    itemActiveBg: '#FFFFFF',
    primary: '#2D62ED',
    unread: '#2D62ED',
    attachmentBg: '#F8F9FA',
    inputBg: '#F8F9FA',
  },
  dark: {
    sidebarBg: '#0B0C0D',
    middlePaneBg: '#131416',
    rightPaneBg: '#1A1B1E',
    textMain: '#ECEEF2',
    textMuted: '#9499A1',
    border: '#25282B',
    itemBg: 'transparent',
    itemActiveBg: '#25282B',
    primary: '#4D7FFF',
    unread: '#4D7FFF',
    attachmentBg: '#25282B',
    inputBg: '#1A1B1E',
  },
  contrast: {
    sidebarBg: '#000000',
    middlePaneBg: '#000000',
    rightPaneBg: '#000000',
    textMain: '#FFFFFF',
    textMuted: '#FFFFFF',
    border: '#FFFFFF',
    itemBg: '#000000',
    itemActiveBg: '#333333',
    primary: '#FFFF00',
    unread: '#FFFF00',
    attachmentBg: '#000000',
    inputBg: '#000000',
  }
};

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  date: string;
  unread?: boolean;
  flagged?: boolean;
  categoryColor?: string;
  attachments?: boolean;
  avatar: string;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', sender: 'Google', subject: 'Manual Account Verification', preview: 'Hello 7ahang, Your account has been verified successfully. Please review your security settings to ensure everything is up to date.', date: 'June 25', unread: true, categoryColor: '#2D62ED', avatar: 'https://i.pravatar.cc/100?u=google' },
  { id: '2', sender: 'Medium', subject: "Today's highlights: Design Trends 2024", preview: 'Tint and shade are areas of color theory that many beginners overlook. In this week\'s highlights, we dive deep into...', date: 'June 23', unread: true, categoryColor: '#2D62ED', avatar: 'https://i.pravatar.cc/100?u=medium' },
  { id: '3', sender: 'Tamas Bunce', subject: 'Work Enquiry - New Project', preview: 'This is Tamas who contacted you on Dribbble regarding the brand identity project. I was wondering if you had time for a quick call next week...', date: 'June 22', categoryColor: '#34A853', attachments: true, avatar: 'https://i.pravatar.cc/100?u=tamas' },
  { id: '4', sender: 'Slack', subject: "Now's the perfect time to upgrade", preview: "That's okay! If you want to learn more about our new enterprise features, we've attached a full guide below...", date: 'June 19', flagged: true, categoryColor: '#FFB800', avatar: 'https://i.pravatar.cc/100?u=slack' }
];

const SidebarItem: React.FC<{ icon: any; label: string; count?: number; active?: boolean; color?: string; isCollapsed: boolean; colors: ThemeColors }> = ({ icon: Icon, label, count, active, color, isCollapsed, colors }) => (
  <div 
    className={`flex items-center ${isCollapsed ? 'justify-center w-12 h-12 mx-auto' : 'justify-between px-4 py-2.5'} rounded-xl cursor-pointer transition-all duration-300 ease-in-out group`}
    style={{ backgroundColor: active ? colors.itemActiveBg : 'transparent' }}
  >
    <div className="flex items-center gap-3">
      {color ? (
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }}></div>
      ) : (
        <Icon className="w-5 h-5 flex-shrink-0" style={{ color: active ? colors.primary : colors.textMuted }} />
      )}
      {!isCollapsed && (
        <span className="text-[13px] font-bold whitespace-nowrap" style={{ color: active ? colors.textMain : colors.textMuted }}>{label}</span>
      )}
    </div>
    {!isCollapsed && count && (
      <span className="text-[11px] font-bold opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: colors.textMuted }}>{count.toLocaleString()}</span>
    )}
  </div>
);

interface DashboardProps {
  onLogout?: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, themeMode, setThemeMode }) => {
  const [selectedMail, setSelectedMail] = useState<Message | null>(MOCK_MESSAGES[0]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const colors = THEMES[themeMode];

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setMobileSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSelectMail = (mail: Message) => {
    setSelectedMail(mail);
  };

  const scrollbarClass = `custom-scrollbar ${themeMode !== 'light' ? 'dark-scrollbar' : ''}`;

  return (
    <div className="flex h-screen w-full overflow-hidden font-sans" style={{ backgroundColor: colors.middlePaneBg }}>
      {/* Sidebar - Mobile Slide-over + Desktop Fixed */}
      <MotionDiv 
        initial={false}
        animate={{ 
          width: isMobile ? '280px' : (isCollapsed ? 88 : '20%'),
          x: (isMobile && !mobileSidebarOpen) ? -300 : 0,
          opacity: 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`fixed lg:relative z-50 lg:z-auto h-full border-r flex flex-col`}
        style={{ 
          backgroundColor: colors.sidebarBg, 
          borderColor: colors.border,
        }}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-4 h-12 overflow-hidden mb-8">
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-xl hidden lg:block hover:bg-black/5" style={{ color: colors.textMuted }}>
              <Menu className="w-6 h-6" />
            </button>
            <button onClick={() => setMobileSidebarOpen(false)} className="p-2 rounded-xl lg:hidden hover:bg-black/5" style={{ color: colors.textMuted }}>
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2 min-w-max">
              {themeMode === 'light' ? <LogoBlack className="w-7 h-7" /> : <LogoWhite className="w-7 h-7" />}
              <span className="text-xl font-black tracking-tighter" style={{ color: colors.textMain }}>ShooraMail</span>
            </div>
          </div>

          <div className={`flex flex-col gap-1 overflow-y-auto ${scrollbarClass} flex-grow`}>
            <SidebarItem icon={Mail} label="Inbox" count={1025} active isCollapsed={isCollapsed && !isMobile} colors={colors} />
            <SidebarItem icon={Star} label="Starred" count={97} isCollapsed={isCollapsed && !isMobile} colors={colors} />
            <SidebarItem icon={Send} label="Sent" count={412} isCollapsed={isCollapsed && !isMobile} colors={colors} />
            <SidebarItem icon={FileText} label="Drafts" count={3} isCollapsed={isCollapsed && !isMobile} colors={colors} />
            <SidebarItem icon={Trash2} label="Trash" isCollapsed={isCollapsed && !isMobile} colors={colors} />
            
            {(!isCollapsed || isMobile) && (
              <p className="px-4 mt-8 mb-2 text-[10px] font-black uppercase tracking-widest opacity-40">Categories</p>
            )}
            <SidebarItem icon={Circle} label="Work" color="#34A853" isCollapsed={isCollapsed && !isMobile} colors={colors} />
            <SidebarItem icon={Circle} label="Personal" color="#FFB800" isCollapsed={isCollapsed && !isMobile} colors={colors} />
            <SidebarItem icon={Circle} label="Promotions" color="#2D62ED" isCollapsed={isCollapsed && !isMobile} colors={colors} />
          </div>

          {/* Sidebar Bottom Section with Theme Toggle and Profile */}
          <div className="flex flex-col gap-4 pt-4 border-t mt-auto" style={{ borderColor: colors.border }}>
            
            {/* Integrated Theme Toggle */}
            <div className={`flex items-center gap-1 p-1 rounded-2xl border transition-all duration-500 ${isCollapsed && !isMobile ? 'flex-col' : 'justify-between'}`} style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
               {(['light', 'dark', 'contrast'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setThemeMode(mode)}
                    className={`p-2 rounded-xl flex-1 flex items-center justify-center transition-all duration-300 ${themeMode === mode ? 'shadow-md scale-105' : 'opacity-40 hover:opacity-100'}`}
                    style={{ 
                      backgroundColor: themeMode === mode ? (mode === 'contrast' ? '#FFFF00' : colors.primary) : 'transparent',
                      color: themeMode === mode ? (mode === 'contrast' ? '#000' : '#fff') : colors.textMain
                    }}
                  >
                    {mode === 'light' && <Sun className="w-4 h-4" />}
                    {mode === 'dark' && <Moon className="w-4 h-4" />}
                    {mode === 'contrast' && <Contrast className="w-4 h-4" />}
                  </button>
               ))}
            </div>

            <div 
              onClick={onLogout}
              className={`border p-3 rounded-[20px] flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-all ${isCollapsed && !isMobile ? 'justify-center p-2' : ''}`} 
              style={{ backgroundColor: colors.itemActiveBg, borderColor: colors.border }}
            >
              <img src="https://i.pravatar.cc/100?u=7ahang" className="w-10 h-10 rounded-xl flex-shrink-0" />
              {(!isCollapsed || isMobile) && (
                <div className="flex-1 overflow-hidden">
                  <span className="text-[12px] font-black block truncate" style={{ color: colors.textMain }}>7ahang</span>
                  <span className="text-[10px] font-bold opacity-60 truncate block">7ahang@gmail.com</span>
                </div>
              )}
              {(!isCollapsed || isMobile) && (
                <LogOut className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: colors.textMain }} />
              )}
            </div>
          </div>
        </div>
      </MotionDiv>

      {/* Overlay for mobile sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity" onClick={() => setMobileSidebarOpen(false)}></div>
      )}

      {/* Column 2: Middle Pane (Inbox List) */}
      <div 
        className={`w-full lg:w-[32%] xl:w-[30%] border-r flex flex-col h-full relative transition-all duration-300
          ${(selectedMail && isMobile) ? 'hidden' : 'flex'}`} 
        style={{ backgroundColor: colors.middlePaneBg, borderColor: colors.border }}
      >
        <div className="p-4 md:p-6 border-b z-10 sticky top-0" style={{ backgroundColor: colors.middlePaneBg, borderColor: colors.border }}>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-3 lg:hidden">
              <button onClick={() => setMobileSidebarOpen(true)} className="p-2 hover:bg-black/5 rounded-lg transition-colors">
                <Menu className="w-6 h-6" style={{ color: colors.textMain }} />
              </button>
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tighter" style={{ color: colors.textMain }}>Inbox</h2>
            <button className="p-2 rounded-full hover:bg-black/5 transition-colors">
              <Plus className="w-6 h-6" style={{ color: colors.primary }} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: colors.textMuted }} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none transition-all focus:ring-2"
              style={{ backgroundColor: colors.inputBg, color: colors.textMain } as any}
            />
          </div>
        </div>
        
        <div className={`flex-1 overflow-y-auto ${scrollbarClass} pb-24`}>
          {MOCK_MESSAGES.map((msg) => (
            <div 
              key={msg.id} 
              onClick={() => handleSelectMail(msg)}
              className="px-6 py-5 border-b cursor-pointer transition-all duration-200"
              style={{ 
                backgroundColor: selectedMail?.id === msg.id ? colors.primary + '0D' : 'transparent',
                borderColor: colors.border,
                borderLeft: selectedMail?.id === msg.id ? `4px solid ${colors.primary}` : '4px solid transparent'
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-2">
                  {msg.unread && <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.primary }}></div>}
                  <span className={`text-sm ${msg.unread ? 'font-black' : 'font-bold'}`} style={{ color: colors.textMain }}>{msg.sender}</span>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-wider" style={{ color: colors.textMuted }}>{msg.date}</span>
              </div>
              <h4 className="text-[13px] font-bold truncate mb-1" style={{ color: colors.textMain }}>{msg.subject}</h4>
              <p className="text-[11px] line-clamp-2 leading-relaxed" style={{ color: colors.textMuted }}>{msg.preview}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Column 3: Reading Pane */}
      <div 
        className={`flex-1 flex flex-col h-full relative transition-all duration-300
          ${(!selectedMail && isMobile) ? 'hidden' : 'flex'}`} 
        style={{ backgroundColor: colors.rightPaneBg }}
      >
        {selectedMail ? (
          <>
            <div className="p-4 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md" style={{ backgroundColor: colors.rightPaneBg + 'CC', borderColor: colors.border }}>
              <div className="flex items-center gap-2">
                <button onClick={() => setSelectedMail(null)} className="p-2 rounded-lg lg:hidden hover:bg-black/5">
                  <ArrowLeft className="w-6 h-6" style={{ color: colors.textMain }} />
                </button>
                <div className="hidden sm:flex gap-1">
                  <button className="p-2 rounded-lg hover:bg-black/5 transition-colors" title="Reply"><Reply className="w-5 h-5 opacity-60" style={{ color: colors.textMain }} /></button>
                  <button className="p-2 rounded-lg hover:bg-black/5 transition-colors" title="Forward"><Forward className="w-5 h-5 opacity-60" style={{ color: colors.textMain }} /></button>
                  <button className="p-2 rounded-lg hover:bg-black/5 transition-colors" title="Star"><Star className={`w-5 h-5 ${selectedMail.flagged ? 'fill-yellow-400 text-yellow-400 opacity-100' : 'opacity-60'}`} style={{ color: colors.textMain }} /></button>
                  <button className="p-2 rounded-lg hover:bg-black/5 transition-colors" title="Delete"><Trash2 className="w-5 h-5 opacity-60 text-red-400" /></button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest" style={{ borderColor: colors.border, color: colors.textMuted }}>
                  <Shield className="w-3 h-3 text-green-500" /> Secure
                </div>
                <button className="p-2 rounded-lg hover:bg-black/5 transition-colors"><MoreHorizontal className="w-5 h-5 opacity-60" style={{ color: colors.textMain }} /></button>
              </div>
            </div>

            <div className={`flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 ${scrollbarClass}`}>
              <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-black mb-10 tracking-tighter leading-[1.1]" style={{ color: colors.textMain }}>{selectedMail.subject}</h1>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 border-b pb-10" style={{ borderColor: colors.border }}>
                  <div className="flex items-center gap-4">
                    <img src={selectedMail.avatar} className="w-14 h-14 rounded-2xl shadow-sm" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-black text-xl" style={{ color: colors.textMain }}>{selectedMail.sender}</p>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/5 uppercase" style={{ color: colors.textMuted }}>Verified</span>
                      </div>
                      <p className="text-sm font-bold opacity-60" style={{ color: colors.textMuted }}>{selectedMail.sender.toLowerCase()}@official.com</p>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Received</p>
                    <p className="text-sm font-black" style={{ color: colors.textMain }}>{selectedMail.date}, 10:24 AM</p>
                  </div>
                </div>

                <div className="space-y-8 text-lg md:text-xl leading-[1.6] font-medium" style={{ color: colors.textMain }}>
                  <p>Hello there,</p>
                  <p>We are excited to share that your account has been successfully upgraded to the new ShooraMail environment. This transition includes all your historical data, now organized chronologically in the new Timeline view.</p>
                  <div className="p-8 rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center gap-4 my-10" style={{ borderColor: colors.border }}>
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-50">
                      <FileText className="w-8 h-8 text-blue-500" />
                    </div>
                    <p className="text-sm font-bold opacity-60 text-center">Security_Report_June_2024.pdf</p>
                    <button className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-black uppercase tracking-widest hover:scale-105 transition-transform">Download Report</button>
                  </div>
                  <p>Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They’re not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can’t do is ignore them.</p>
                  <p>Best regards,<br /><span className="font-black">The ShooraMail Team</span></p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-40">
            <div className="w-24 h-24 rounded-full border-4 border-dashed mb-6 flex items-center justify-center" style={{ borderColor: colors.border }}>
              <Mail className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black mb-2" style={{ color: colors.textMain }}>No message selected</h3>
            <p className="text-sm font-bold max-w-xs" style={{ color: colors.textMuted }}>Select a conversation from the list to read its content here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;