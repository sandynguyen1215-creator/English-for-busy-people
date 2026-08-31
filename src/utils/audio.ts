// Web Audio API and Speech Synthesis Utilities

export interface VoiceSettings {
  presetId: 'us-female' | 'us-male' | 'uk-female' | 'uk-male' | 'au-natural' | 'slow-learner' | 'custom';
  accent: 'en-US' | 'en-GB' | 'en-AU' | 'all';
  gender: 'female' | 'male' | 'all';
  rate: number; // 0.5 to 1.5, default 0.85
  pitch: number; // 0.8 to 1.3, default 1.05
  voiceURI: string; // 'auto' or specific voiceURI
}

export const VOICE_PRESETS = [
  {
    id: 'us-female',
    name: 'Mỹ - Nữ Tự Nhiên',
    englishLabel: 'US English (Female)',
    emoji: '🇺🇸 👩',
    accent: 'en-US' as const,
    gender: 'female' as const,
    rate: 0.88,
    pitch: 1.05,
    description: 'Giọng nữ Mỹ truyền cảm, rõ ràng, dễ nghe cho học sinh'
  },
  {
    id: 'us-male',
    name: 'Mỹ - Nam Trầm Ấm',
    englishLabel: 'US English (Male)',
    emoji: '🇺🇸 👨',
    accent: 'en-US' as const,
    gender: 'male' as const,
    rate: 0.88,
    pitch: 0.95,
    description: 'Giọng nam Mỹ dứt khoát, chuẩn âm phát âm quốc tế'
  },
  {
    id: 'uk-female',
    name: 'Anh - Nữ Chuẩn Oxford',
    englishLabel: 'UK English (Female)',
    emoji: '🇬🇧 👩',
    accent: 'en-GB' as const,
    gender: 'female' as const,
    rate: 0.85,
    pitch: 1.05,
    description: 'Giọng nữ Anh - Anh quý phái, chuẩn ngữ điệu Global Success'
  },
  {
    id: 'uk-male',
    name: 'Anh - Nam Lịch Lãm',
    englishLabel: 'UK English (Male)',
    emoji: '🇬🇧 👨',
    accent: 'en-GB' as const,
    gender: 'male' as const,
    rate: 0.85,
    pitch: 0.95,
    description: 'Giọng nam Anh - Anh thanh lịch, rõ từng nguyên âm'
  },
  {
    id: 'slow-learner',
    name: 'Luyện Phát Âm Chậm Rõ',
    englishLabel: 'Slow & Crystal Clear',
    emoji: '🐢 🎯',
    accent: 'en-US' as const,
    gender: 'female' as const,
    rate: 0.7,
    pitch: 1.0,
    description: 'Tốc độ 0.7x chậm rãi, nhấn từng âm tiết cho người mới học'
  },
  {
    id: 'au-natural',
    name: 'Anh - Úc Năng Động',
    englishLabel: 'Australian English',
    emoji: '🇦🇺 🦘',
    accent: 'en-AU' as const,
    gender: 'all' as const,
    rate: 0.9,
    pitch: 1.05,
    description: 'Giọng phát âm tự nhiên khu vực Úc - New Zealand'
  }
];

const DEFAULT_SETTINGS: VoiceSettings = {
  presetId: 'us-female',
  accent: 'en-US',
  gender: 'female',
  rate: 0.88,
  pitch: 1.05,
  voiceURI: 'auto'
};

const STORAGE_KEY = 'english7_voice_settings';

function loadStoredVoiceSettings(): VoiceSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    }
  } catch {
    // fallback
  }
  return DEFAULT_SETTINGS;
}

let currentVoiceSettings: VoiceSettings = loadStoredVoiceSettings();
const voiceSettingsListeners = new Set<(settings: VoiceSettings) => void>();

export function getVoiceSettings(): VoiceSettings {
  return currentVoiceSettings;
}

export function saveVoiceSettings(newSettings: Partial<VoiceSettings>) {
  currentVoiceSettings = { ...currentVoiceSettings, ...newSettings };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentVoiceSettings));
  } catch {
    // ignore
  }
  voiceSettingsListeners.forEach(l => {
    try {
      l(currentVoiceSettings);
    } catch {
      // ignore
    }
  });
}

export function subscribeVoiceSettings(listener: (settings: VoiceSettings) => void) {
  voiceSettingsListeners.add(listener);
  listener(currentVoiceSettings);
  return () => {
    voiceSettingsListeners.delete(listener);
  };
}

let audioCtx: AudioContext | null = null;
let soundEnabled = true;

// Speech synthesis tracking
let currentSpeakingText: string | null = null;
const speechListeners = new Set<(speakingText: string | null) => void>();

function notifySpeechChange(text: string | null) {
  currentSpeakingText = text;
  speechListeners.forEach(listener => {
    try {
      listener(text);
    } catch {
      // ignore listener error
    }
  });
}

export function subscribeSpeech(listener: (speakingText: string | null) => void) {
  speechListeners.add(listener);
  listener(currentSpeakingText);
  return () => {
    speechListeners.delete(listener);
  };
}

export function isCurrentlySpeaking(text?: string): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  if (!window.speechSynthesis.speaking) return false;
  if (!text) return true;
  return currentSpeakingText?.trim().toLowerCase() === text.trim().toLowerCase();
}

export function getCurrentSpeakingText(): string | null {
  return currentSpeakingText;
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
  } catch {
    // ignore
  }
  notifySpeechChange(null);
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setSoundEffectsEnabled(enabled: boolean) {
  soundEnabled = enabled;
  if (!enabled) {
    stopSpeaking();
  }
}

export function isSoundEnabled(): boolean {
  return soundEnabled;
}

// Sound effects
export function playCorrectSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sine';
  osc1.frequency.setValueAtTime(587.33, now); // D5
  osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

  osc2.type = 'triangle';
  osc2.frequency.setValueAtTime(880, now + 0.08);
  osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.28); // D6

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now + 0.08);
  osc1.stop(now + 0.4);
  osc2.stop(now + 0.4);
}

export function playWrongSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.linearRampToValueAtTime(140, now + 0.2);

  gain.gain.setValueAtTime(0.12, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

export function playPunchSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(160, now);
  osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.2);

  const bufferSize = ctx.sampleRate * 0.08;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.25, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);

  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(now);
}

export function playFlipSound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(300, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

export function playVictorySound() {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, index) => {
    const now = ctx.currentTime + index * 0.12;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.4);
  });
}

export function playComboSound(streak: number) {
  if (!soundEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const baseFreq = 440;
  const multiplier = 1 + Math.min(streak, 10) * 0.08;
  const now = ctx.currentTime;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(baseFreq * multiplier, now);
  osc.frequency.exponentialRampToValueAtTime(baseFreq * multiplier * 1.5, now + 0.15);

  gain.gain.setValueAtTime(0.2, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.25);
}

// 7. Web Speech API (TTS) with Multi-Voice Support & Custom Settings
export function getAvailableEnglishVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return [];
  const voices = window.speechSynthesis.getVoices();
  return voices.filter(v => v.lang.startsWith('en'));
}

export function resolveSelectedVoice(settings: VoiceSettings = currentVoiceSettings): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // 1. If explicit voiceURI specified and not 'auto'
  if (settings.voiceURI && settings.voiceURI !== 'auto') {
    const found = voices.find(v => v.voiceURI === settings.voiceURI);
    if (found) return found;
  }

  const enVoices = voices.filter(v => v.lang.startsWith('en'));
  if (!enVoices.length) return voices[0] || null;

  const targetLang = settings.accent === 'all' ? 'en' : settings.accent;
  const langVoices = enVoices.filter(v => v.lang.startsWith(targetLang));
  const pool = langVoices.length > 0 ? langVoices : enVoices;

  const femaleKeywords = ['female', 'samantha', 'jenny', 'ava', 'victoria', 'karen', 'zira', 'susan', 'fiona', 'moira', 'tessa', 'google us english'];
  const maleKeywords = ['male', 'david', 'mark', 'guy', 'george', 'oliver', 'daniel', 'alex', 'fred', 'ryan', 'google uk english male', 'standard-b', 'wavenet-b', 'neural2-b'];

  if (settings.gender === 'female') {
    const match = pool.find(v => {
      const name = v.name.toLowerCase();
      return femaleKeywords.some(kw => name.includes(kw));
    });
    if (match) return match;
  } else if (settings.gender === 'male') {
    const match = pool.find(v => {
      const name = v.name.toLowerCase();
      return maleKeywords.some(kw => name.includes(kw));
    });
    if (match) return match;
  }

  // Natural/High-quality priority
  const naturalMatch = pool.find(v => 
    v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Online') || v.name.includes('Neural')
  );
  if (naturalMatch) return naturalMatch;

  return pool[0] || null;
}

export function speakText(
  text: string, 
  overrideRate?: number, 
  overridePitch?: number, 
  overrideVoiceURI?: string
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // If already speaking this exact text, toggle stop
  if (window.speechSynthesis.speaking && currentSpeakingText === text) {
    stopSpeaking();
    return;
  }

  // Cancel any ongoing speech before starting new
  window.speechSynthesis.cancel();

  const cleanText = text.trim();
  if (!cleanText) return;

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const settings = currentVoiceSettings;

  utterance.lang = settings.accent === 'all' ? 'en-US' : settings.accent;
  utterance.rate = overrideRate ?? settings.rate;
  utterance.pitch = overridePitch ?? settings.pitch;

  let activeVoice: SpeechSynthesisVoice | null = null;
  if (overrideVoiceURI && overrideVoiceURI !== 'auto') {
    const voices = window.speechSynthesis.getVoices();
    activeVoice = voices.find(v => v.voiceURI === overrideVoiceURI) || null;
  }
  
  if (!activeVoice) {
    activeVoice = resolveSelectedVoice(settings);
  }

  if (activeVoice) {
    utterance.voice = activeVoice;
    utterance.lang = activeVoice.lang;
  }

  utterance.onstart = () => {
    notifySpeechChange(text);
  };

  utterance.onend = () => {
    notifySpeechChange(null);
  };

  utterance.onerror = () => {
    notifySpeechChange(null);
  };

  notifySpeechChange(text);
  window.speechSynthesis.speak(utterance);
}

export function toggleSpeech(
  text: string, 
  overrideRate?: number, 
  overridePitch?: number, 
  overrideVoiceURI?: string
): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;

  if (window.speechSynthesis.speaking) {
    const wasSpeakingCurrent = currentSpeakingText?.trim().toLowerCase() === text.trim().toLowerCase();
    stopSpeaking();
    if (wasSpeakingCurrent) {
      return false; // stopped
    }
  }

  speakText(text, overrideRate, overridePitch, overrideVoiceURI);
  return true; // started
}


