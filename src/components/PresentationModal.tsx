import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ChevronLeft, ChevronRight, Volume2, VolumeX, 
  Maximize2, Minimize2, Sparkles, BookOpen, Headphones, 
  ListFilter, Layers, CheckCircle2, XCircle, Eye, EyeOff, Play, Pause
} from 'lucide-react';
import { SlideItem, TabType } from '../types';
import { toggleSpeech, playFlipSound, subscribeSpeech, VoiceSettings, VOICE_PRESETS, getVoiceSettings, playCorrectSound, playWrongSound } from '../utils/audio';

interface PresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: SlideItem[];
  title: string;
  initialSlideIndex?: number;
  initialTab?: TabType | 'all';
  onOpenVoiceSettings?: () => void;
}

export const PresentationModal: React.FC<PresentationModalProps> = ({
  isOpen,
  onClose,
  slides,
  title,
  initialSlideIndex = 0,
  initialTab = 'all',
  onOpenVoiceSettings
}) => {
  const [selectedTabFilter, setSelectedTabFilter] = useState<TabType | 'all'>(initialTab);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [currentVoiceSettings, setCurrentVoiceSettings] = useState<VoiceSettings>(getVoiceSettings());
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // Sync initialTab when opening
  useEffect(() => {
    if (isOpen) {
      setSelectedTabFilter(initialTab);
    }
  }, [isOpen, initialTab]);

  // Filter slides according to selectedTabFilter
  const filteredSlides = useMemo(() => {
    if (selectedTabFilter === 'all') {
      return slides;
    }
    const tabFiltered = slides.filter(s => s.tabId === selectedTabFilter);
    return tabFiltered.length > 0 ? tabFiltered : slides;
  }, [slides, selectedTabFilter]);

  // Adjust current index when tab or initial index changes
  useEffect(() => {
    if (isOpen) {
      if (initialSlideIndex >= 0 && initialSlideIndex < filteredSlides.length) {
        setCurrentIndex(initialSlideIndex);
      } else {
        setCurrentIndex(0);
      }
      setSelectedQuizOption(null);
      setShowAnswer(false);
    }
  }, [isOpen, selectedTabFilter, initialSlideIndex, filteredSlides.length]);

  useEffect(() => {
    const unsubSpeech = subscribeSpeech(text => setSpeakingText(text));
    return () => unsubSpeech();
  }, []);

  // Reset interactive states on slide change
  useEffect(() => {
    setSelectedQuizOption(null);
    setShowAnswer(false);
  }, [currentIndex]);

  // Auto-play timer
  useEffect(() => {
    if (!autoPlay || !isOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev < filteredSlides.length - 1) {
          playFlipSound();
          return prev + 1;
        } else {
          setAutoPlay(false);
          return prev;
        }
      });
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, isOpen, filteredSlides.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, filteredSlides.length]);

  if (!isOpen || slides.length === 0) return null;

  const currentSlide = filteredSlides[currentIndex] || filteredSlides[0] || slides[0];

  const handleNext = () => {
    if (currentIndex < filteredSlides.length - 1) {
      playFlipSound();
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      playFlipSound();
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleSpeak = (textToSpeak?: string) => {
    const text = textToSpeak || currentSlide.audioText || currentSlide.mainText;
    toggleSpeech(text);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const handleSelectQuizOption = (opt: string) => {
    setSelectedQuizOption(opt);
    if (currentSlide.correctAnswer) {
      if (opt.trim().toLowerCase() === currentSlide.correctAnswer.trim().toLowerCase()) {
        playCorrectSound();
      } else {
        playWrongSound();
      }
    }
  };

  // Tab category buttons info
  const tabFilters: { id: TabType | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'Tất Cả Bài Học', icon: '🌟' },
    { id: 'vocabulary', label: 'Từ Vựng Cốt Lõi', icon: '📖' },
    { id: 'vocab_practice', label: 'Luyện Từ & Manh Mối', icon: '🎯' },
    { id: 'grammar', label: 'Ngữ Pháp & Mẫu Câu', icon: '📚' },
    { id: 'grammar_practice', label: 'Bắt Lỗi & Ghép Câu', icon: '🛠️' },
    { id: 'reading', label: 'Đọc Hiểu & Tình Huống', icon: '📰' },
    { id: 'minigames', label: 'Võ Đài Quiz', icon: '🥊' },
  ];

  const progressPercent = ((currentIndex + 1) / filteredSlides.length) * 100;
  const isMainSpeaking = speakingText !== null && (
    speakingText === (currentSlide.audioText || currentSlide.mainText)
  );

  const activePreset = VOICE_PRESETS.find(p => p.id === currentVoiceSettings.presetId);

  return (
    <AnimatePresence>
      <div id="presentation-modal-backdrop" className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex flex-col justify-between p-3 md:p-6 select-none overflow-hidden">
        {/* Top Header Bar */}
        <div className="max-w-6xl w-full mx-auto pb-3 border-b border-white/10 flex flex-col gap-3">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-rose-500/20 rounded-2xl text-rose-400 border border-rose-500/30 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] uppercase tracking-wider font-extrabold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-800/50">
                    Trình Chiếu Slide Bài Giảng
                  </span>
                  <span className="text-[11px] text-slate-400 hidden sm:inline">• Nhấn Space/Mũi tên để chuyển slide</span>
                </div>
                <h2 className="text-base md:text-lg font-black truncate max-w-lg text-white mt-0.5">{title}</h2>
              </div>
            </div>

            <div className="flex items-center gap-1.5 md:gap-2.5">
              {/* Slide Drawer Toggle */}
              <button
                id="toggle-slide-drawer-btn"
                onClick={() => setShowDrawer(prev => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  showDrawer 
                    ? 'bg-rose-500 text-white border-rose-400' 
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
                }`}
                title="Xem danh sách tất cả các slide"
              >
                <Layers className="w-4 h-4" />
                <span className="hidden md:inline">Mục lục slide</span>
              </button>

              {/* Auto play toggle */}
              <button
                id="toggle-autoplay-btn"
                onClick={() => setAutoPlay(prev => !prev)}
                className={`p-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  autoPlay 
                    ? 'bg-emerald-500 text-white border-emerald-400 animate-pulse' 
                    : 'bg-white/10 hover:bg-white/20 text-slate-200 border-white/10'
                }`}
                title={autoPlay ? 'Dừng tự động chuyển slide' : 'Tự động chuyển slide (6s)'}
              >
                {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              {/* Voice Settings */}
              {onOpenVoiceSettings && (
                <button
                  onClick={onOpenVoiceSettings}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-rose-300 hover:text-white text-xs font-bold transition-all cursor-pointer border border-white/10"
                  title="Tùy chọn giọng đọc & tốc độ phát âm"
                >
                  <Headphones className="w-4 h-4" />
                  <span className="hidden lg:inline">{activePreset?.name.split('-')[0] || 'Mỹ'} ({currentVoiceSettings.rate}x)</span>
                </button>
              )}

              {/* Slide Counter */}
              <div className="bg-white/10 px-3 py-1.5 rounded-full text-xs font-mono font-bold text-slate-200 border border-white/10">
                {currentIndex + 1} / {filteredSlides.length}
              </div>

              {/* Fullscreen */}
              <button
                id="presentation-fullscreen-toggle"
                onClick={toggleFullscreen}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 transition-colors cursor-pointer border border-white/10"
                title="Toàn màn hình"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close */}
              <button
                id="presentation-close-button"
                onClick={onClose}
                className="p-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white transition-colors cursor-pointer shadow-md"
                title="Đóng (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Tab Selector Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-black uppercase text-rose-300/80 shrink-0 mr-1 flex items-center gap-1">
              <ListFilter className="w-3.5 h-3.5" /> Tab:
            </span>
            {tabFilters.map(tab => {
              const count = tab.id === 'all' 
                ? slides.length 
                : slides.filter(s => s.tabId === tab.id).length;
              if (count === 0 && tab.id !== 'all') return null;

              const isSelected = selectedTabFilter === tab.id;

              return (
                <button
                  key={tab.id}
                  id={`slide-tab-filter-${tab.id}`}
                  onClick={() => {
                    playFlipSound();
                    setSelectedTabFilter(tab.id);
                    setCurrentIndex(0);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-900/40 border border-rose-400 scale-102'
                      : 'bg-white/10 hover:bg-white/15 text-slate-300 border border-white/5 hover:text-white'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-rose-700/80 text-rose-100' : 'bg-black/30 text-slate-400'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slide Content Arena & Slide Drawer */}
        <div className="flex-1 flex items-center justify-center py-3 md:py-5 max-w-5xl w-full mx-auto relative overflow-y-auto">
          {/* Slide Drawer Tray */}
          {showDrawer && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 inset-x-0 z-30 bg-slate-900/95 border-2 border-rose-500/40 rounded-3xl p-4 shadow-2xl backdrop-blur-md max-h-72 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3 text-white">
                <span className="text-xs font-black uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" /> Danh Sách Slide Trong Phần Này ({filteredSlides.length})
                </span>
                <button
                  onClick={() => setShowDrawer(false)}
                  className="text-xs text-slate-400 hover:text-white cursor-pointer px-2 py-1 bg-white/10 rounded-lg"
                >
                  Đóng mục lục
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {filteredSlides.map((slide, idx) => (
                  <button
                    key={slide.id || idx}
                    onClick={() => {
                      playFlipSound();
                      setCurrentIndex(idx);
                      setShowDrawer(false);
                    }}
                    className={`text-left p-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer truncate border flex items-center gap-2 ${
                      idx === currentIndex
                        ? 'bg-rose-500 text-white border-rose-300 shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-black/40 text-[10px] flex items-center justify-center font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span className="truncate">{slide.title || slide.mainText}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Active Slide Presentation View */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedTabFilter}_${currentIndex}`}
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: -15 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="w-full bg-white rounded-3xl p-5 md:p-8 shadow-2xl border-4 border-rose-100 flex flex-col items-center justify-center text-center relative overflow-hidden my-auto"
              style={{ minHeight: '430px' }}
            >
              {/* Background ambient accents */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-rose-50 rounded-full blur-3xl -z-10" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10" />

              {/* Badge & Tab Category Indicator */}
              <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                {currentSlide.contentBadge && (
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-black uppercase tracking-wider border border-rose-200">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                    {currentSlide.contentBadge}
                  </div>
                )}
                {currentSlide.tabId && (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                    {tabFilters.find(t => t.id === currentSlide.tabId)?.label || 'Bài học'}
                  </span>
                )}
              </div>

              {/* Main Visual / Emoji */}
              {currentSlide.emoji && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                  className="text-5xl md:text-7xl mb-3 drop-shadow-sm select-none"
                >
                  {currentSlide.emoji}
                </motion.div>
              )}

              {/* Main Text / Term / Heading */}
              <div className="flex items-center justify-center gap-3 mb-2 flex-wrap max-w-3xl">
                <h1 className="text-2xl md:text-4xl font-black text-slate-800 tracking-tight leading-tight">
                  {currentSlide.mainText}
                </h1>
                <button
                  id={`speak-slide-${currentIndex}`}
                  onClick={() => handleSpeak()}
                  className={`p-2.5 md:p-3 rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center cursor-pointer ${
                    isMainSpeaking 
                      ? 'bg-[#A12A1B] text-white animate-pulse' 
                      : 'bg-rose-500 hover:bg-rose-600 text-white'
                  }`}
                  title={isMainSpeaking ? 'Dừng phát âm' : 'Nghe phát âm'}
                >
                  {isMainSpeaking ? <VolumeX className="w-5 h-5 md:w-6 md:h-6" /> : <Volume2 className="w-5 h-5 md:w-6 md:h-6" />}
                </button>
              </div>

              {/* Phonetics IPA */}
              {currentSlide.ipa && (
                <div className="text-rose-600 font-mono text-lg md:text-xl font-bold bg-rose-50 border border-rose-200 px-4 py-1 rounded-xl mb-3">
                  {currentSlide.ipa}
                </div>
              )}

              {/* Vietnamese Meaning / Subtext */}
              {currentSlide.subText && (
                <div className="text-lg md:text-2xl font-bold text-slate-600 mb-4 max-w-2xl">
                  {currentSlide.subText}
                </div>
              )}

              {/* Interactive Quiz Options (For Boxing Quiz / Practice Slides) */}
              {currentSlide.options && currentSlide.options.length > 0 && (
                <div className="w-full max-w-2xl my-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-left">
                    {currentSlide.options.map((opt, oIdx) => {
                      const isSelected = selectedQuizOption === opt;
                      const isCorrect = currentSlide.correctAnswer && opt.trim().toLowerCase() === currentSlide.correctAnswer.trim().toLowerCase();
                      const showResult = isSelected || showAnswer;

                      let btnStyle = 'bg-slate-50 hover:bg-rose-50/50 border-slate-200 text-slate-800';
                      if (showResult && isCorrect) {
                        btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-black shadow-xs';
                      } else if (showResult && isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectQuizOption(opt)}
                          className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between text-xs md:text-sm font-semibold ${btnStyle}`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </span>
                          {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                          {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-rose-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  {/* Toggle Answer Reveal */}
                  <div className="flex items-center justify-center gap-2 mt-3">
                    <button
                      onClick={() => setShowAnswer(prev => !prev)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-black cursor-pointer transition-colors"
                    >
                      {showAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showAnswer ? 'Ẩn đáp án' : 'Hiện đáp án chuẩn'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Example Sentences / Context Box */}
              {currentSlide.example && (
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 md:p-5 max-w-2xl w-full text-left mt-2 shadow-2xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider">Câu ví dụ thực tế trong công việc</span>
                    <button
                      onClick={() => handleSpeak(currentSlide.example)}
                      className="text-rose-600 hover:text-rose-700 flex items-center gap-1 text-xs font-bold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Nghe câu
                    </button>
                  </div>
                  <p className="text-sm md:text-base font-semibold text-slate-800">{currentSlide.example}</p>
                  {currentSlide.explanation && (
                    <p className="text-xs md:text-sm text-slate-500 mt-1 italic leading-relaxed">{currentSlide.explanation}</p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Navigation Controls & Progress Bar */}
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center gap-3">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <motion.div
              className="bg-rose-500 h-full rounded-full"
              initial={{ width: `${progressPercent}%` }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between w-full">
            <button
              id="presentation-prev-btn"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                  : 'bg-white text-slate-800 hover:bg-slate-100 shadow-lg active:scale-95'
              }`}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span>Slide trước (←)</span>
            </button>

            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Slide <span className="text-white font-bold">{currentIndex + 1}</span> / {filteredSlides.length}
            </span>

            <button
              id="presentation-next-btn"
              onClick={handleNext}
              disabled={currentIndex === filteredSlides.length - 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-xs md:text-sm transition-all cursor-pointer ${
                currentIndex === filteredSlides.length - 1
                  ? 'bg-white/10 text-slate-500 cursor-not-allowed'
                  : 'bg-rose-500 text-white hover:bg-rose-600 shadow-lg shadow-rose-900/30 active:scale-95'
              }`}
            >
              <span>Slide tiếp theo (→)</span>
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};
