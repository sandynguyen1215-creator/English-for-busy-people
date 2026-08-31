import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Volume2, VolumeX, Sparkles, Check, Sliders, Play, RotateCcw, 
  Globe, User, Zap
} from 'lucide-react';
import { 
  VoiceSettings, 
  VOICE_PRESETS, 
  getVoiceSettings, 
  saveVoiceSettings, 
  subscribeVoiceSettings,
  getAvailableEnglishVoices,
  toggleSpeech,
  stopSpeaking,
  subscribeSpeech
} from '../utils/audio';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SAMPLE_SENTENCES = [
  'Welcome to English 7 Global Success! Let\'s practice English together.',
  'She loves collecting dolls and doing yoga in her free time.',
  'Eating fresh fruit and coloured vegetables keeps your body healthy and strong.',
  'The early bird catches the worm.'
];

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [settings, setSettings] = useState<VoiceSettings>(getVoiceSettings());
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [testText, setTestText] = useState(SAMPLE_SENTENCES[0]);

  useEffect(() => {
    const unsubSettings = subscribeVoiceSettings(s => setSettings(s));
    const unsubSpeech = subscribeSpeech(t => setSpeakingText(t));

    // Load available voices
    const loadVoices = () => {
      const v = getAvailableEnglishVoices();
      setAvailableVoices(v);
    };
    loadVoices();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }

    return () => {
      unsubSettings();
      unsubSpeech();
    };
  }, []);

  if (!isOpen) return null;

  const isCurrentlyTesting = speakingText !== null && speakingText.trim() === testText.trim();

  const handleSelectPreset = (preset: typeof VOICE_PRESETS[number]) => {
    const newSettings: Partial<VoiceSettings> = {
      presetId: preset.id as VoiceSettings['presetId'],
      accent: preset.accent,
      gender: preset.gender,
      rate: preset.rate,
      pitch: preset.pitch,
      voiceURI: 'auto'
    };
    saveVoiceSettings(newSettings);
    // Play test speech immediately with new preset
    toggleSpeech(testText, preset.rate, preset.pitch, 'auto');
  };

  const handleAccentChange = (accent: VoiceSettings['accent']) => {
    saveVoiceSettings({ accent, presetId: 'custom' });
  };

  const handleVoiceURIChange = (voiceURI: string) => {
    saveVoiceSettings({ voiceURI, presetId: 'custom' });
  };

  const handleRateChange = (rate: number) => {
    saveVoiceSettings({ rate, presetId: 'custom' });
  };

  const handlePitchChange = (pitch: number) => {
    saveVoiceSettings({ pitch, presetId: 'custom' });
  };

  const handleResetDefaults = () => {
    saveVoiceSettings({
      presetId: 'us-female',
      accent: 'en-US',
      gender: 'female',
      rate: 0.88,
      pitch: 1.05,
      voiceURI: 'auto'
    });
  };

  const handleTestSpeech = () => {
    toggleSpeech(testText);
  };

  // Filter voices based on accent filter
  const filteredVoices = availableVoices.filter(v => {
    if (settings.accent === 'all') return true;
    return v.lang.startsWith(settings.accent);
  });

  return (
    <AnimatePresence>
      <div 
        id="voice-settings-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.2 }}
          onClick={e => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-5 md:p-6 bg-gradient-to-r from-[#FFF5F3] via-rose-50 to-amber-50 border-b border-rose-100/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#C23320] text-white flex items-center justify-center shadow-md shadow-rose-200">
                <Volume2 className="w-6 h-6" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 text-[#C23320] font-black text-[10px] uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  <span>Speech Synthesis Control</span>
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
                  Tùy Chọn Giọng Đọc Tiếng Anh
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700 border border-slate-200 shadow-2xs transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 md:p-6 space-y-6 overflow-y-auto flex-1 text-slate-700">
            
            {/* Presets Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>1. Chọn nhanh Giọng mẫu theo chuẩn (Presets)</span>
                </span>
                <span className="text-[11px] font-bold text-[#C23320]">
                  Áp dụng tức thì cho toàn bộ bài học
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {VOICE_PRESETS.map(preset => {
                  const isSelected = settings.presetId === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                        isSelected 
                          ? 'border-[#C23320] bg-[#FFF5F3] shadow-xs' 
                          : 'border-slate-200/80 bg-white hover:border-rose-200 hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{preset.emoji}</span>
                          <div>
                            <div className="font-extrabold text-sm text-slate-800 leading-snug">
                              {preset.name}
                            </div>
                            <div className="text-[11px] font-medium text-slate-400">
                              {preset.englishLabel}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#C23320] text-white flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        {preset.description}
                      </p>

                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center gap-2 text-[11px] font-bold text-slate-400">
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          Tốc độ: {preset.rate}x
                        </span>
                        <span className="px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-600">
                          Cao độ: {preset.pitch}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Detailed Accent & Voice Picker */}
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span>2. Chọn Vùng miền & Giọng máy thiết bị</span>
              </span>

              {/* Accent Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'en-US' as const, label: '🇺🇸 Anh - Mỹ', sub: 'US English' },
                  { id: 'en-GB' as const, label: '🇬🇧 Anh - Anh', sub: 'UK English' },
                  { id: 'en-AU' as const, label: '🇦🇺 Anh - Úc', sub: 'Australian' },
                  { id: 'all' as const, label: '🌐 Tất cả', sub: 'All Voices' },
                ].map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => handleAccentChange(acc.id)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      settings.accent === acc.id
                        ? 'bg-white border-[#C23320] text-[#C23320] font-black shadow-xs ring-1 ring-[#C23320]'
                        : 'bg-white/70 border-slate-200 text-slate-600 font-bold hover:bg-white'
                    }`}
                  >
                    <div className="text-xs">{acc.label}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{acc.sub}</div>
                  </button>
                ))}
              </div>

              {/* Specific Voice Select */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 flex items-center justify-between">
                  <span>Giọng phát hiện trên máy / trình duyệt:</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {filteredVoices.length} giọng sẵn sàng
                  </span>
                </label>

                <select
                  value={settings.voiceURI}
                  onChange={e => handleVoiceURIChange(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm font-bold text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C23320]/30 focus:border-[#C23320]"
                >
                  <option value="auto">✨ Tự động chọn giọng Tối ưu & Tự nhiên nhất</option>
                  {filteredVoices.map((v, idx) => (
                    <option key={v.voiceURI || idx} value={v.voiceURI}>
                      {v.name} ({v.lang}) {v.default ? '★ Mặc định' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Speed & Pitch Controls */}
            <div className="p-4.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-emerald-500" />
                <span>3. Tinh chỉnh Tốc độ & Cao độ</span>
              </span>

              {/* Speed Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Tốc độ đọc (Reading Speed):</span>
                  <span className="font-mono text-[#C23320] font-black bg-[#FFF5F3] px-2 py-0.5 rounded-md border border-rose-200">
                    {settings.rate}x
                  </span>
                </div>

                <input
                  type="range"
                  min="0.5"
                  max="1.4"
                  step="0.05"
                  value={settings.rate}
                  onChange={e => handleRateChange(parseFloat(e.target.value))}
                  className="w-full accent-[#C23320] cursor-pointer"
                />

                <div className="flex items-center justify-between gap-1.5 pt-1">
                  {[
                    { val: 0.7, label: '0.7x (Chậm)' },
                    { val: 0.85, label: '0.85x (Chuẩn)' },
                    { val: 1.0, label: '1.0x (Tự nhiên)' },
                    { val: 1.2, label: '1.2x (Nhanh)' },
                  ].map(item => (
                    <button
                      key={item.val}
                      onClick={() => handleRateChange(item.val)}
                      className={`text-[11px] font-bold px-2 py-1 rounded-lg border transition-all cursor-pointer ${
                        settings.rate === item.val
                          ? 'bg-[#C23320] text-white border-[#C23320]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pitch Slider */}
              <div className="space-y-2 pt-2 border-t border-slate-200/60">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700">Cao độ âm thanh (Voice Pitch):</span>
                  <span className="font-mono text-slate-700 font-black bg-white px-2 py-0.5 rounded-md border border-slate-200">
                    {settings.pitch}
                  </span>
                </div>

                <input
                  type="range"
                  min="0.8"
                  max="1.3"
                  step="0.05"
                  value={settings.pitch}
                  onChange={e => handlePitchChange(parseFloat(e.target.value))}
                  className="w-full accent-[#C23320] cursor-pointer"
                />
              </div>
            </div>

            {/* Test Voice Section */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-br from-[#FFF5F3] to-rose-50/40 border-2 border-rose-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-[#C23320] flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-[#C23320]" />
                  <span>4. Nghe thử câu phát âm trực tiếp</span>
                </span>

                <button
                  onClick={handleResetDefaults}
                  className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer transition-colors"
                  title="Khôi phục cài đặt gốc"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Mặc định</span>
                </button>
              </div>

              <div className="space-y-2">
                <textarea
                  value={testText}
                  onChange={e => setTestText(e.target.value)}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-rose-200 bg-white text-sm font-medium text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-[#C23320]/30 resize-none leading-relaxed"
                  placeholder="Nhập câu tiếng Anh bạn muốn nghe thử..."
                />

                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-400 mr-1">Câu mẫu:</span>
                  {SAMPLE_SENTENCES.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setTestText(s)}
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-md border transition-all cursor-pointer ${
                        testText === s
                          ? 'bg-rose-200/80 text-[#C23320] border-rose-300'
                          : 'bg-white text-slate-500 border-rose-100 hover:bg-rose-50'
                      }`}
                    >
                      Mẫu {idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleTestSpeech}
                  className={`flex-1 py-3 px-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
                    isCurrentlyTesting
                      ? 'bg-[#A12A1B] text-white animate-pulse'
                      : 'bg-[#C23320] hover:bg-[#A12A1B] text-white shadow-rose-200 hover:scale-[1.01]'
                  }`}
                >
                  {isCurrentlyTesting ? (
                    <>
                      <VolumeX className="w-5 h-5" />
                      <span>Đang phát... (Nhấp để dừng)</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-5 h-5" />
                      <span>Nghe Thử Giọng Này 🔊</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200/80 flex items-center justify-between shrink-0">
            <span className="text-xs font-medium text-slate-500">
              Cài đặt giọng đọc đã được lưu tự động trên thiết bị.
            </span>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
