import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Flame, Volume2, VolumeX, Tv, Award, Headphones, ChevronDown, BookOpen, Layers, Check } from 'lucide-react';
import { TabType, UserStats } from '../types';
import { VoiceSettings, VOICE_PRESETS } from '../utils/audio';

interface HeaderProps {
  stats: UserStats;
  soundEnabled: boolean;
  unitNum?: number;
  unitTitle?: string;
  activeTab: TabType;
  voiceSettings: VoiceSettings;
  onToggleSound: () => void;
  onOpenPresentation: (tab?: TabType | 'all') => void;
  onOpenBadges: () => void;
  onOpenVoiceSettings: () => void;
  activeTabTitle: string;
}

export const Header: React.FC<HeaderProps> = ({
  stats,
  soundEnabled,
  unitNum = 1,
  unitTitle = 'Workplace & Emails',
  activeTab,
  voiceSettings,
  onToggleSound,
  onOpenPresentation,
  onOpenBadges,
  onOpenVoiceSettings,
  activeTabTitle
}) => {
  const [showPresentationMenu, setShowPresentationMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const currentPreset = VOICE_PRESETS.find(p => p.id === voiceSettings.presetId);
  const voiceLabel = currentPreset ? currentPreset.emoji.split(' ')[0] : '🎙️';

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowPresentationMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tabNames: Record<TabType, string> = {
    dashboard: 'Tổng Quan Unit',
    vocabulary: 'Từ Vựng Cốt Lõi',
    vocab_practice: 'Luyện Từ & Manh Mối',
    grammar: 'Ngữ Pháp & Mẫu Câu',
    grammar_practice: 'Bắt Lỗi & Ghép Câu',
    reading: 'Đọc Hiểu Tình Huống',
    minigames: 'Võ Đài Quiz'
  };

  const tabIcons: Record<TabType, string> = {
    dashboard: '🏠',
    vocabulary: '📖',
    vocab_practice: '🎯',
    grammar: '📚',
    grammar_practice: '🛠️',
    reading: '📰',
    minigames: '🥊'
  };

  return (
    <header id="main-app-header" className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-rose-100 px-3 md:px-4 py-2.5 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 md:gap-4">
        {/* Left: Unit Branding & Section Title */}
        <div className="flex items-center gap-2.5 md:gap-3 min-w-0">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-600 flex items-center justify-center text-white shadow-md shadow-rose-200 shrink-0">
            <span className="font-black text-base md:text-lg">U{unitNum}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                English at Work • Business English
              </span>
            </div>
            <h1 className="text-sm md:text-base font-extrabold text-slate-800 tracking-tight leading-tight truncate">
              Unit {unitNum}: {unitTitle} <span className="text-slate-400 font-medium hidden sm:inline">• {activeTabTitle}</span>
            </h1>
          </div>
        </div>

        {/* Right: Gamified Stats & Utility Controls */}
        <div className="flex items-center gap-1.5 md:gap-2.5 shrink-0">
          {/* Streak Flame */}
          <div
            id="streak-badge"
            className={`flex items-center gap-1.5 px-2.5 md:px-3 py-1.5 rounded-full border text-xs font-black transition-all ${
              stats.streak >= 3
                ? 'bg-amber-50 border-amber-300 text-amber-600 shadow-2xs animate-pulse'
                : 'bg-white border-slate-200 text-slate-600'
            }`}
            title={`Chuỗi đúng liên tiếp: ${stats.streak} câu (Cao nhất: ${stats.highestStreak})`}
          >
            <Flame className={`w-4 h-4 ${stats.streak >= 3 ? 'text-amber-500 fill-amber-500' : 'text-slate-400'}`} />
            <span>{stats.streak}</span>
            {stats.streak >= 5 && <span className="text-[10px] text-amber-600 font-bold bg-amber-200/60 px-1 rounded hidden sm:inline">2x</span>}
          </div>

          {/* Persistent Score Badge */}
          <div
            id="score-badge"
            className="flex items-center gap-1.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-2.5 md:px-3.5 py-1.5 rounded-full shadow-md shadow-rose-200 font-black text-xs md:text-sm"
            title="Tổng điểm tích lũy của bạn"
          >
            <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-300 fill-amber-300" />
            <span className="font-mono tracking-tight">{stats.score}</span>
            <span className="text-[10px] text-rose-200 uppercase font-bold hidden sm:inline">pts</span>
          </div>

          {/* Voice Settings Button */}
          <button
            id="voice-settings-btn"
            onClick={onOpenVoiceSettings}
            className="flex items-center gap-1.5 px-2 md:px-2.5 py-1.5 rounded-xl bg-white border border-rose-200 hover:border-[#C23320] text-slate-700 hover:text-[#C23320] shadow-2xs transition-all cursor-pointer group"
            title={`Tùy chọn giọng đọc câu tiếng Anh (Hiện tại: ${currentPreset?.name || 'Tùy chỉnh'} • ${voiceSettings.rate}x)`}
          >
            <Headphones className="w-4 h-4 text-[#C23320] group-hover:scale-110 transition-transform" />
            <span className="text-xs font-black hidden lg:inline text-slate-700 group-hover:text-[#C23320]">
              Giọng đọc
            </span>
            <span className="text-[10px] md:text-[11px] font-bold px-1.5 py-0.5 rounded-md bg-[#FFF5F3] text-[#C23320] border border-rose-100 hidden sm:inline">
              {voiceLabel} {voiceSettings.rate}x
            </span>
          </button>

          {/* Badges / Trophy Button */}
          <button
            id="badges-modal-btn"
            onClick={onOpenBadges}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-600 shadow-2xs transition-colors relative cursor-pointer"
            title="Xem Huy hiệu thành tích"
          >
            <Award className="w-4 h-4 md:w-5 md:h-5 text-amber-500" />
            {stats.badges.filter(b => b.unlocked).length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center">
                {stats.badges.filter(b => b.unlocked).length}
              </span>
            )}
          </button>

          {/* Sound Toggle */}
          <button
            id="sound-toggle-btn"
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-white border border-slate-200 hover:border-rose-300 text-slate-700 hover:text-rose-600 shadow-2xs transition-colors cursor-pointer"
            title={soundEnabled ? 'Tắt âm thanh hiệu ứng' : 'Bật âm thanh hiệu ứng'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-rose-500" /> : <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />}
          </button>

          {/* Presentation Mode Dropdown / Button */}
          <div className="relative" ref={menuRef}>
            <div className="flex items-center">
              <button
                id="global-presentation-btn"
                onClick={() => onOpenPresentation(activeTab)}
                className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-l-xl font-bold text-xs md:text-sm shadow-sm transition-all cursor-pointer border-r border-slate-700"
                title={`Trình chiếu Slide cho tab hiện tại (${tabNames[activeTab]})`}
              >
                <Tv className="w-4 h-4 text-rose-400" />
                <span className="hidden sm:inline">Trình chiếu</span>
                <span className="text-[10px] bg-rose-500/80 px-1.5 py-0.5 rounded text-white font-bold hidden md:inline">
                  {tabIcons[activeTab]} {tabNames[activeTab]}
                </span>
              </button>
              <button
                id="presentation-menu-toggle-btn"
                onClick={() => setShowPresentationMenu(prev => !prev)}
                className="bg-slate-800 hover:bg-slate-900 text-white px-1.5 md:px-2 py-1.5 md:py-2 rounded-r-xl transition-all cursor-pointer"
                title="Chọn tab để trình chiếu slide"
              >
                <ChevronDown className="w-3.5 h-3.5 text-slate-300" />
              </button>
            </div>

            {/* Dropdown Menu for selecting tab to present */}
            {showPresentationMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-2xl shadow-xl border border-rose-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2.5 py-1.5 border-b border-slate-100 mb-1">
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-1">
                    <Layers className="w-3 h-3 text-[#C23320]" /> Chọn chế độ trình chiếu
                  </span>
                </div>

                {/* All slides option */}
                <button
                  onClick={() => {
                    onOpenPresentation('all');
                    setShowPresentationMenu(false);
                  }}
                  className="w-full text-left px-2.5 py-2 rounded-xl text-xs font-black text-slate-800 hover:bg-[#FFF5F3] hover:text-[#C23320] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span>🌟</span>
                    <span>Tất Cả Bài Học (Trọn Gói)</span>
                  </span>
                </button>

                {/* Individual Tab Options */}
                {(['vocabulary', 'vocab_practice', 'grammar', 'grammar_practice', 'reading', 'minigames'] as TabType[]).map(tabKey => {
                  const isCurrent = activeTab === tabKey;
                  return (
                    <button
                      key={tabKey}
                      onClick={() => {
                        onOpenPresentation(tabKey);
                        setShowPresentationMenu(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent 
                          ? 'bg-rose-50 text-[#C23320] font-black' 
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{tabIcons[tabKey]}</span>
                        <span>{tabNames[tabKey]}</span>
                      </span>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#C23320]" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
