import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu, Search, Star, Send, FileText, Trash2, Mail,
  ChevronDown, MoreHorizontal, Reply, Forward, Mails, Pin,
  Plus, Circle, LogOut, Sun, Moon, Palette, ArrowLeft, X,
  Settings, Bell, Shield, HelpCircle, Inbox, RefreshCw,
  Clock, Calendar, Archive, AlertCircle, RotateCcw
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
  colored: {
    sidebarBg: '#F1F3F5',
    middlePaneBg: '#FFFFFF',
    rightPaneBg: '#F8F9FA',
    textMain: '#1A1D1F',
    textMuted: '#64748b',
    border: '#E2E8F0',
    itemBg: 'transparent',
    itemActiveBg: '#FFFFFF',
    primary: '#2D62ED',
    unread: '#2D62ED',
    attachmentBg: '#F1F5F9',
    inputBg: '#F1F5F9',
  }
};

interface Message {
  id: string;
  sender: string;
  subject: string;
  preview: string;
  body: string;
  date: string;
  unread?: boolean;
  flagged?: boolean;
  categoryColor?: string;
  category?: string;
  attachments?: boolean;
  avatar: string;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'snoozed' | 'scheduled';
  important?: boolean;
}

const MOCK_MESSAGES: Message[] = [
  { id: '1', folder: 'inbox', category: 'promotions', sender: 'Google', subject: 'Manual Account Verification', preview: 'Hello 7ahang, Your account has been verified successfully. Please review your security settings to ensure everything is up to date.', body: 'Hello 7ahang,\n\nYour account has been verified successfully. Please review your security settings to ensure everything is up to date.\n\nBest,\nGoogle Team', date: 'June 25', unread: true, categoryColor: '#2D62ED', avatar: 'https://i.pravatar.cc/100?u=google' },
  { id: '2', folder: 'inbox', category: 'promotions', sender: 'Medium', subject: "Today's highlights: Design Trends 2024", preview: 'Tint and shade are areas of color theory that many beginners overlook. In this week\'s highlights, we dive deep into...', body: 'Tint and shade are areas of color theory that many beginners overlook. In this week\'s highlights, we dive deep into the nuances of color palettes in modern web design.', date: 'June 23', unread: true, categoryColor: '#2D62ED', avatar: 'https://i.pravatar.cc/100?u=medium' },
  { id: '3', folder: 'inbox', category: 'work', sender: 'Tamas Bunce', subject: 'Work Enquiry - New Project', preview: 'This is Tamas who contacted you on Dribbble regarding the brand identity project. I was wondering if you had time for a quick call next week...', body: 'Hi,\n\nThis is Tamas who contacted you on Dribbble regarding the brand identity project. I was wondering if you had time for a quick call next week to discuss the details?\n\nThanks, Tamas', date: 'June 22', categoryColor: '#34A853', attachments: true, avatar: 'https://i.pravatar.cc/100?u=tamas' },
  { id: '4', folder: 'inbox', category: 'personal', sender: 'Slack', subject: "Now's the perfect time to upgrade", preview: "That's okay! If you want to learn more about our new enterprise features, we've attached a full guide below...", body: "That's okay! If you want to learn more about our new enterprise features, we've attached a full guide below. Check out the new pricing plans.", date: 'June 19', flagged: true, categoryColor: '#FFB800', avatar: 'https://i.pravatar.cc/100?u=slack' }
];

const SidebarItem: React.FC<{ icon: any; label: string; count?: number; active?: boolean; color?: string; isCollapsed: boolean; colors: ThemeColors; onClick?: () => void }> = ({ icon: Icon, label, count, active, color, isCollapsed, colors, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center ${isCollapsed ? 'justify-center w-12 h-12 mx-auto' : 'justify-between px-4 py-2.5'} rounded-xl cursor-pointer transition-all duration-700 ease-in-out group`}
    style={{ backgroundColor: active ? colors.itemActiveBg : 'transparent' }}
  >
    <div className="flex items-center gap-3">
      {color ? (
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 transition-colors duration-700" style={{ backgroundColor: color }}></div>
      ) : (
        <Icon className="w-5 h-5 flex-shrink-0 transition-colors duration-700" style={{ color: active ? colors.primary : colors.textMuted }} />
      )}
      {!isCollapsed && (
        <span className="text-[13px] font-bold whitespace-nowrap transition-colors duration-700" style={{ color: active ? (colors.primary) : colors.textMuted }}>{label}</span>
      )}
    </div>
    {!isCollapsed && count && (
      <span className="text-[11px] font-bold opacity-60 group-hover:opacity-100 transition-all duration-700" style={{ color: colors.textMuted }}>{count.toLocaleString()}</span>
    )}
  </div>
);

interface UserData {
  userName: string;
  email: string;
  inboxMails?: any[];
}
interface DashboardProps {
  userData: UserData;
  onLogout?: () => void;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, themeMode, setThemeMode, userData }) => {
  const initialMessages = Array.isArray(userData.inboxMails) ? userData.inboxMails : MOCK_MESSAGES;
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [selectedMailId, setSelectedMailId] = useState<string | null>(initialMessages.length > 0 ? initialMessages[0].id : null);
  const [activeFolder, setActiveFolder] = useState<string>('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isDeleteWarningOpen, setIsDeleteWarningOpen] = useState(false);
  const [isLogoutWarningOpen, setIsLogoutWarningOpen] = useState(false);
  const [isReloading, setIsReloading] = useState(false);

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

  const selectedMail = messages.find(m => m.id === selectedMailId) || null;

  const filteredMessages = messages.filter(msg => {
    let matchesFolder = false;
    if (activeFolder === 'inbox') matchesFolder = msg.folder === 'inbox' && !!msg.unread;
    else if (activeFolder === 'starred') matchesFolder = !!msg.flagged;
    else if (activeFolder === 'snoozed') matchesFolder = msg.folder === 'snoozed';
    else if (activeFolder === 'important') matchesFolder = !!msg.important;
    else if (activeFolder === 'sent') matchesFolder = msg.folder === 'sent';
    else if (activeFolder === 'scheduled') matchesFolder = msg.folder === 'scheduled';
    else if (activeFolder === 'drafts') matchesFolder = msg.folder === 'drafts';
    else if (activeFolder === 'all') matchesFolder = msg.folder !== 'trash';
    else if (activeFolder === 'trash') matchesFolder = msg.folder === 'trash';
    else if (['work', 'personal', 'promotions'].includes(activeFolder)) matchesFolder = msg.category === activeFolder && msg.folder !== 'trash';

    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      msg.subject.toLowerCase().includes(searchLower) ||
      msg.sender.toLowerCase().includes(searchLower) ||
      msg.preview.toLowerCase().includes(searchLower);

    return matchesFolder && matchesSearch;
  });

  const handleSelectMail = (mail: Message) => {
    setSelectedMailId(mail.id);
    if (mail.unread) {
      setMessages(prev => prev.map(m => m.id === mail.id ? { ...m, unread: false } : m));
    }
  };

  const handleDelete = () => {
    if (!selectedMail) return;
    if (selectedMail.folder === 'trash') {
      setIsDeleteWarningOpen(true);
    } else {
      setMessages(prev => prev.map(m => m.id === selectedMail.id ? { ...m, folder: 'trash' } : m));
      setSelectedMailId(null);
    }
  };

  const confirmDelete = () => {
    if (!selectedMail) return;
    setMessages(prev => prev.filter(m => m.id !== selectedMail.id));
    setSelectedMailId(null);
    setIsDeleteWarningOpen(false);
  };

  const confirmLogout = () => {
    if (onLogout) onLogout();
    setIsLogoutWarningOpen(false);
  };

  const handleImportant = () => {
    if (!selectedMail) return;
    setMessages(prev => prev.map(m => m.id === selectedMail.id ? { ...m, important: !m.important } : m));
  };

  const handleRestore = () => {
    if (!selectedMail) return;
    setMessages(prev => prev.map(m => m.id === selectedMail.id ? { ...m, folder: 'inbox' } : m));
    setSelectedMailId(null);
  };

  const handleStar = () => {
    if (!selectedMail) return;
    setMessages(prev => prev.map(m => m.id === selectedMail.id ? { ...m, flagged: !m.flagged } : m));
  };

  const handleReloadInbox = async () => {
    setIsReloading(true);
    try {
      const password = localStorage.getItem('password');
      const response = await fetch('http://localhost:5000/api/inbox-fetch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userData.email,
          password: password || ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched Mails:\n\n", data.mails);
        const fetchedMails = data.mails;
        const mappedMessages: Message[] = fetchedMails.map((mail: any, index: number) => ({
          id: String(index + 1),
          sender: mail.sender || mail.from || 'Unknown Sender',
          subject: mail.subject || '(No Subject)',
          preview: mail.preview || mail.snippet || (mail.body ? mail.body.substring(0, 100) : ''),
          body: mail.body || mail.text || '',
          date: mail.date || new Date().toLocaleDateString(),
          unread: mail.unread !== undefined ? mail.unread : true,
          flagged: mail.flagged || false,
          categoryColor: mail.categoryColor || '#2D62ED',
          category: mail.category || 'personal',
          attachments: mail.attachments || false,
          avatar: mail.avatar || `https://i.pravatar.cc/100?u=${mail.sender || 'unknown'}`,
          folder: 'inbox',
          important: mail.important || false,
        }));

        userData.inboxMails = mappedMessages;
        setMessages(mappedMessages);
        console.log("Mails reloaded successfully\n\nMapped Messages:\n\n", mappedMessages);
      }
    } catch (error) {
      console.error("Failed to reload mails", error);
    } finally {
      setIsReloading(false);
    }
  };

  const scrollbarClass = `custom-scrollbar ${themeMode !== 'light' ? 'dark-scrollbar' : ''}`;

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

  return (
    <>
      <div className={`flex h-screen w-full overflow-hidden font-sans transition-colors duration-700 ease-in-out`} style={{ backgroundColor: colors.middlePaneBg }}>
        <MotionDiv
          initial={false}
          animate={{
            width: isMobile ? '280px' : (isCollapsed ? 88 : '20%'),
            x: (isMobile && !mobileSidebarOpen) ? -300 : 0,
            opacity: 1
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed lg:relative z-50 lg:z-auto h-full border-r flex flex-col transition-all duration-700 ease-in-out`}
          style={{
            backgroundColor: colors.sidebarBg,
            borderColor: colors.border,
          }}
        >
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center gap-4 h-12 overflow-hidden mb-8">
              <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-4 rounded-xl hidden lg:block hover:bg-black/5 transition-colors duration-700" style={{ color: colors.textMuted }}>
                <Menu className="w-6 h-6 " />
              </button>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-2 rounded-xl lg:hidden hover:bg-black/5 transition-colors duration-700" style={{ color: colors.textMuted }}>
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2 min-w-max">
                {themeMode === 'dark' ? <LogoWhite className="w-7 h-7" /> : <LogoBlack className="w-7 h-7" style={{ fill: themeMode === 'colored' ? '#2D62ED' : 'black' }} />}
                <span className="text-xl font-black tracking-tighter transition-colors duration-700" style={{ color: themeMode === 'colored' ? '#2D62ED' : colors.textMain }}>ShooraMail</span>
              </div>
            </div>

            <div className={`flex flex-col gap-1 overflow-y-auto ${scrollbarClass} flex-grow`}>
              <SidebarItem icon={Inbox} label="Inbox" count={messages.filter(m => m.folder === 'inbox' && m.unread).length || undefined} active={activeFolder === 'inbox'} onClick={() => setActiveFolder('inbox')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Star} label="Starred" count={messages.filter(m => m.flagged).length || undefined} active={activeFolder === 'starred'} onClick={() => setActiveFolder('starred')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Clock} label="Snoozed" count={messages.filter(m => m.folder === 'snoozed').length || undefined} active={activeFolder === 'snoozed'} onClick={() => setActiveFolder('snoozed')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Pin} label="Important" count={messages.filter(m => m.important).length || undefined} active={activeFolder === 'important'} onClick={() => setActiveFolder('important')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Send} label="Sent" count={messages.filter(m => m.folder === 'sent').length || undefined} active={activeFolder === 'sent'} onClick={() => setActiveFolder('sent')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Calendar} label="Scheduled" count={messages.filter(m => m.folder === 'scheduled').length || undefined} active={activeFolder === 'scheduled'} onClick={() => setActiveFolder('scheduled')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={FileText} label="Drafts" count={messages.filter(m => m.folder === 'drafts').length || undefined} active={activeFolder === 'drafts'} onClick={() => setActiveFolder('drafts')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Mails} label="All Mails" count={messages.filter(m => m.folder !== 'trash').length || undefined} active={activeFolder === 'all'} onClick={() => setActiveFolder('all')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Trash2} label="Trash" count={messages.filter(m => m.folder === 'trash').length || undefined} active={activeFolder === 'trash'} onClick={() => setActiveFolder('trash')} isCollapsed={isCollapsed && !isMobile} colors={colors} />

              {(!isCollapsed || isMobile) && (
                <p className="px-4 mt-8 mb-2 text-[10px] font-black uppercase tracking-widest opacity-40 transition-colors duration-700" style={{ color: colors.textMain }}>Categories</p>
              )}
              <SidebarItem icon={Circle} label="Work" color="#34A853" active={activeFolder === 'work'} onClick={() => setActiveFolder('work')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Circle} label="Personal" color="#FFB800" active={activeFolder === 'personal'} onClick={() => setActiveFolder('personal')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
              <SidebarItem icon={Circle} label="Promotions" color="#2D62ED" active={activeFolder === 'promotions'} onClick={() => setActiveFolder('promotions')} isCollapsed={isCollapsed && !isMobile} colors={colors} />
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t mt-auto transition-colors duration-700" style={{ borderColor: colors.border }}>
              <div className={`flex items-center gap-1 p-1 rounded-2xl border transition-all duration-700 ${isCollapsed && !isMobile ? 'flex-col' : 'justify-between'}`} style={{ backgroundColor: colors.inputBg, borderColor: colors.border }}>
                {(['light', 'dark', 'colored'] as ThemeMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setThemeMode(mode)}
                    className={`p-2 rounded-xl flex-1 flex items-center justify-center transition-all duration-700 ${themeMode === mode ? 'shadow-lg scale-105 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                    style={getToggleButtonStyles(mode)}
                  >
                    {mode === 'light' && <Sun className="w-4 h-4" />}
                    {mode === 'dark' && <Moon className="w-4 h-4" />}
                    {mode === 'colored' && <Palette className="w-4 h-4" />}
                  </button>
                ))}
              </div>

              <div
                onClick={() => setIsLogoutWarningOpen(true)}
                className={`border p-1 rounded-[15px] flex items-center gap-2 cursor-pointer group hover:opacity-80 transition-all duration-700 ${isCollapsed && !isMobile ? 'justify-center p-2' : ''}`}
                style={{ backgroundColor: colors.itemActiveBg, borderColor: colors.border }}
              >
                <img src={`https://i.pravatar.cc/100?u=${userData.email}`} className="w-10 h-10 rounded-xl flex-shrink-0" />
                {(!isCollapsed || isMobile) && (
                  <div className="flex-1 overflow-hidden transition-all duration-700">
                    <span className="text-[12px] font-black block truncate transition-colors duration-700" style={{ color: colors.textMain }}>{userData.userName}</span>
                    <span className="text-[10px] font-bold opacity-60 truncate block transition-colors duration-700" style={{ color: colors.textMuted }}>{userData.email}</span>
                  </div>
                )}
                {(!isCollapsed || isMobile) && (
                  <LogOut className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-all duration-700" style={{ color: colors.textMain }} />
                )}
              </div>
            </div>
          </div>
        </MotionDiv>

        {mobileSidebarOpen && (
          <div className="fixed inset-0 bg-black/40 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-700" onClick={() => setMobileSidebarOpen(false)}></div>
        )}

        <div
          className={`w-full lg:w-[32%] xl:w-[30%] border-r flex flex-col h-full relative transition-all duration-700 ease-in-out
          ${(selectedMail && isMobile) ? 'hidden' : 'flex'}`}
          style={{ backgroundColor: colors.middlePaneBg, borderColor: colors.border }}
        >
          <div className="p-4 md:p-6 border-b z-10 sticky top-0 transition-all duration-700 ease-in-out" style={{ backgroundColor: colors.middlePaneBg, borderColor: colors.border }}>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <div className="flex items-center gap-3 lg:hidden">
                <button onClick={() => setMobileSidebarOpen(true)} className="p-2 hover:bg-black/5 rounded-lg transition-colors duration-700" style={{ color: colors.textMain }}>
                  <Menu className="w-6 h-6 transition-colors duration-700" style={{ color: colors.textMain }} />
                </button>
              </div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter transition-colors duration-700 capitalize" style={{ color: colors.textMain }}>{activeFolder}</h2>
              <button onClick={() => setIsComposeOpen(true)} className={`p-2 rounded-full transition-all duration-700 ${themeMode === 'colored' ? 'bg-[#2D62ED]/10 text-[#2D62ED]' : 'hover:bg-black/5 text-current'}`} style={{ color: colors.textMain }}>
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors duration-700" style={{ color: colors.textMuted }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none transition-all duration-700 focus:ring-2"
                style={{ backgroundColor: colors.inputBg, color: colors.textMain } as any}
              />
            </div>
          </div>

          <div className={`flex-1 overflow-y-auto ${scrollbarClass} pb-24 transition-colors duration-700`}>
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => handleSelectMail(msg)}
                className="px-6 py-5 border-b cursor-pointer transition-all duration-700"
                style={{
                  backgroundColor: selectedMailId === msg.id ? colors.primary + '0D' : 'transparent',
                  borderColor: colors.border,
                  borderLeft: selectedMailId === msg.id ? `4px solid ${colors.primary}` : '4px solid transparent'
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex items-center gap-2">
                    {msg.unread && <div className="w-2 h-2 rounded-full transition-colors duration-700" style={{ backgroundColor: colors.unread }}></div>}
                    <span className={`text-sm transition-colors duration-700 ${msg.unread ? 'font-black' : 'font-bold'}`} style={{ color: colors.textMain }}>{msg.sender}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider transition-colors duration-700" style={{ color: colors.textMuted }}>{msg.date}</span>
                </div>
                <h4 className="text-[13px] font-bold truncate mb-1 transition-colors duration-700" style={{ color: colors.textMain }}>{msg.subject}</h4>
                <p className="text-[11px] line-clamp-2 leading-relaxed transition-colors duration-700" style={{ color: colors.textMuted }}>{msg.preview}</p>
              </div>
            ))}

            <div className="p-6 flex justify-center">
              <button
                onClick={handleReloadInbox}
                disabled={isReloading}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all duration-700 hover:shadow-md active:scale-95 ${isReloading ? 'opacity-60 cursor-wait' : 'hover:scale-105'}`}
                style={{ backgroundColor: colors.itemActiveBg, color: colors.primary }}
              >
                <RefreshCw className={`w-4 h-4 ${isReloading ? 'animate-spin' : ''}`} />
                <span>{isReloading ? 'Syncing...' : 'Reload Mails'}</span>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`flex-1 flex flex-col h-full relative transition-all duration-700 ease-in-out
          ${(!selectedMail && isMobile) ? 'hidden' : 'flex'}`}
          style={{ backgroundColor: colors.rightPaneBg }}
        >
          {selectedMail ? (
            <>
              <div className="p-4 border-b flex items-center justify-between sticky top-0 z-20 backdrop-blur-md transition-all duration-700" style={{ backgroundColor: colors.rightPaneBg + 'CC', borderColor: colors.border }}>
                <div className="flex items-center gap-2">
                  <button onClick={() => setSelectedMailId(null)} className="p-2 rounded-lg lg:hidden hover:bg-black/5 transition-colors duration-700">
                    <ArrowLeft className="w-6 h-6 transition-colors duration-700" style={{ color: colors.textMain }} />
                  </button>
                  <div className="hidden sm:flex gap-1">
                    {selectedMail.folder === 'trash' ? (
                      <button onClick={handleRestore} className={`p-2 rounded-lg hover:bg-black/5 transition-colors duration-700 ${themeMode === 'colored' ? 'text-[#2D62ED]' : ''}`} title="Restore"><RotateCcw className="w-5 h-5 opacity-60" /></button>
                    ) : (
                      <>
                        <button className={`p-2 rounded-lg hover:bg-black/5 transition-colors duration-700 ${themeMode === 'colored' ? 'text-[#2D62ED]' : ''}`} title="Reply"><Reply className="w-5 h-5 opacity-60" /></button>
                        <button className={`p-2 rounded-lg hover:bg-black/5 transition-colors duration-700 ${themeMode === 'colored' ? 'text-[#2D62ED]' : ''}`} title="Forward"><Forward className="w-5 h-5 opacity-60" /></button>
                        <button onClick={handleImportant} className="p-2 rounded-lg hover:bg-black/5 transition-colors duration-700" title="Mark as Important"><Pin className={`w-5 h-5 transition-all duration-700 ${selectedMail.important ? 'fill-red-500 text-red-500 opacity-100' : 'opacity-60'} ${themeMode === 'colored' ? 'text-[#2D62ED]' : ''}`} /></button>
                        <button onClick={handleStar} className="p-2 rounded-lg hover:bg-black/5 transition-colors duration-700" title="Star"><Star className={`w-5 h-5 transition-all duration-700 ${selectedMail.flagged ? 'fill-yellow-400 text-yellow-400 opacity-100' : 'opacity-60'} ${themeMode === 'colored' ? 'text-[#2D62ED]' : ''}`} /></button>
                      </>
                    )}
                    <button onClick={handleDelete} className="p-2 rounded-lg hover:bg-black/5 transition-colors duration-700" title={selectedMail.folder === 'trash' ? "Delete Permanently" : "Delete"}><Trash2 className="w-5 h-5 opacity-60 text-red-400" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-black uppercase tracking-widest transition-all duration-700" style={{ borderColor: colors.border, color: colors.textMuted }}>
                    <Shield className="w-3 h-3 text-green-500" /> Secure
                  </div>
                  <button className={`p-2 rounded-lg hover:bg-black/5 transition-colors duration-700 ${themeMode === 'colored' ? 'text-[#2D62ED]' : ''}`}><MoreHorizontal className="w-5 h-5 opacity-60" /></button>
                </div>
              </div>

              <div className={`flex-1 overflow-y-auto p-6 md:p-12 lg:p-16 ${scrollbarClass} transition-colors duration-700`}>
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl md:text-5xl font-black mb-10 tracking-tighter leading-[1.1] transition-colors duration-700" style={{ color: colors.textMain }}>{selectedMail.subject}</h1>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 border-b pb-10 transition-colors duration-700" style={{ borderColor: colors.border }}>
                    <div className="flex items-center gap-4">
                      <img src={selectedMail.avatar} className="w-14 h-14 rounded-2xl shadow-sm" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-black text-xl transition-colors duration-700" style={{ color: colors.textMain }}>{selectedMail.sender}</p>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase transition-all duration-700 ${themeMode === 'colored' ? 'bg-[#2D62ED]/10 text-[#2D62ED]' : 'bg-black/5'}`} style={{ color: colors.textMuted }}>Verified</span>
                        </div>
                        <p className="text-sm font-bold opacity-60 transition-colors duration-700" style={{ color: colors.textMuted }}>{selectedMail.sender.toLowerCase()}@official.com</p>
                      </div>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1 transition-colors duration-700" style={{ color: colors.textMuted }}>Received</p>
                      <p className="text-sm font-black transition-colors duration-700" style={{ color: colors.textMain }}>{selectedMail.date}, 10:24 AM</p>
                    </div>
                  </div>

                  <div className="space-y-8 text-lg md:text-xl leading-[1.6] font-medium transition-colors duration-700" style={{ color: colors.textMain }}>
                    <p className="whitespace-pre-wrap">{selectedMail.body}</p>
                    <p>We are excited to share that your account has been successfully upgraded to the new ShooraMail environment. This transition includes all your historical data, now organized chronologically in the new Timeline view.</p>
                    <div className="p-8 rounded-[32px] border-2 border-dashed flex flex-col items-center justify-center gap-4 my-10 transition-all duration-700" style={{ borderColor: colors.border }}>
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-700 ${themeMode === 'colored' ? 'bg-[#2D62ED]/10' : 'bg-blue-50'}`}>
                        <FileText className={`w-8 h-8 transition-colors duration-700 ${themeMode === 'colored' ? 'text-[#2D62ED]' : 'text-blue-500'}`} />
                      </div>
                      <p className="text-sm font-bold opacity-60 text-center transition-colors duration-700" style={{ color: colors.textMain }}>Security_Report_June_2024.pdf</p>
                      <button className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest hover:scale-105 transition-all duration-700 ${themeMode === 'colored' ? 'bg-[#2D62ED] text-white shadow-lg' : 'bg-black text-white'}`}>Download Report</button>
                    </div>
                    <p>Here's to the crazy ones. The misfits. The rebels. The troublemakers. The round pegs in the square holes. The ones who see things differently. They’re not fond of rules. And they have no respect for the status quo. You can quote them, disagree with them, glorify or vilify them. About the only thing you can’t do is ignore them.</p>
                    <p>Best regards,<br /><span className="font-black">The ShooraMail Team</span></p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-10 opacity-40 transition-all duration-700">
              <div className="w-24 h-24 rounded-full border-4 border-dashed mb-6 flex items-center justify-center transition-colors duration-700" style={{ borderColor: colors.border }}>
                <Mail className="w-10 h-10 transition-colors duration-700" style={{ color: colors.textMain }} />
              </div>
              <h3 className="text-xl font-black mb-2 transition-colors duration-700" style={{ color: colors.textMain }}>No message selected</h3>
              <p className="text-sm font-bold max-w-xs transition-colors duration-700" style={{ color: colors.textMuted }}>Select a conversation from the list to read its content here.</p>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isComposeOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ backgroundColor: colors.middlePaneBg }}
            >
              <div className="p-4 border-b flex justify-between items-center" style={{ borderColor: colors.border }}>
                <h3 className="font-bold" style={{ color: colors.textMain }}>New Message</h3>
                <button onClick={() => setIsComposeOpen(false)}><X className="w-5 h-5" style={{ color: colors.textMuted }} /></button>
              </div>
              <div className="p-4 flex flex-col gap-4">
                <input placeholder="To" className="w-full p-3 rounded-xl border bg-transparent outline-none transition-colors" style={{ borderColor: colors.border, color: colors.textMain }} />
                <input placeholder="Subject" className="w-full p-3 rounded-xl border bg-transparent outline-none transition-colors" style={{ borderColor: colors.border, color: colors.textMain }} />
                <textarea placeholder="Message" className="w-full p-3 rounded-xl border bg-transparent outline-none h-40 resize-none transition-colors" style={{ borderColor: colors.border, color: colors.textMain }}></textarea>
                <div className="flex justify-end">
                  <button onClick={() => {
                    const newMsg: Message = { id: Date.now().toString(), sender: 'Me', subject: 'New Message', preview: 'This is a new message...', body: 'Content of the new message.', date: 'Just now', folder: 'sent', avatar: 'https://i.pravatar.cc/100?u=me', unread: false };
                    setMessages([newMsg, ...messages]);
                    setIsComposeOpen(false);
                  }} className="px-6 py-2.5 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-all" style={{ backgroundColor: colors.primary }}>Send Message</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteWarningOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 gap-4" style={{ backgroundColor: colors.middlePaneBg }}
            >
              <h3 className="text-lg font-bold" style={{ color: colors.textMain }}>Delete Permanently?</h3>
              <p className="text-sm" style={{ color: colors.textMuted }}>This action cannot be undone. Are you sure you want to permanently delete this message?</p>
              <div className="flex justify-end gap-3 mt-2">
                <button onClick={() => setIsDeleteWarningOpen(false)} className="px-4 py-2 rounded-xl font-bold text-sm transition-colors hover:bg-black/5" style={{ color: colors.textMain }}>Cancel</button>
                <button onClick={confirmDelete} className="px-4 py-2 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLogoutWarningOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden flex flex-col p-6 gap-4" style={{ backgroundColor: colors.middlePaneBg }}
            >
              <h3 className="text-lg font-bold" style={{ color: colors.textMain }}>Log Out?</h3>
              <p className="text-sm" style={{ color: colors.textMuted }}>Are you sure you want to log out of your account?</p>
              <div className="flex justify-end gap-3 mt-2">
                <button onClick={() => setIsLogoutWarningOpen(false)} className="px-4 py-2 rounded-xl font-bold text-sm transition-colors hover:bg-black/5" style={{ color: colors.textMain }}>Cancel</button>
                <button onClick={confirmLogout} className="px-4 py-2 rounded-xl font-bold text-sm text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg">Log Out</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Dashboard;