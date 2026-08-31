import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Square } from 'lucide-react';
import { toggleSpeech, subscribeSpeech, isCurrentlySpeaking } from '../utils/audio';

interface SpeakButtonProps {
  text: string;
  label?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'pill' | 'filled' | 'icon-only';
  className?: string;
  autoSpeak?: boolean;
  title?: string;
}

export const SpeakButton: React.FC<SpeakButtonProps> = ({
  text,
  label,
  size = 'sm',
  variant = 'icon-only',
  className = '',
  autoSpeak = false,
  title
}) => {
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeSpeech(activeText => {
      setSpeakingText(activeText);
    });
    return () => unsubscribe();
  }, []);

  const isSpeaking = speakingText !== null && speakingText.trim().toLowerCase() === text.trim().toLowerCase();

  useEffect(() => {
    if (autoSpeak && text) {
      const timer = setTimeout(() => {
        toggleSpeech(text);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [text, autoSpeak]);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSpeech(text);
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const baseStyle = 'inline-flex items-center justify-center transition-all cursor-pointer select-none active:scale-95';

  let variantStyle = '';
  if (variant === 'icon-only') {
    variantStyle = isSpeaking
      ? 'p-1.5 rounded-xl bg-[#C23320] text-white shadow-sm ring-2 ring-[#C23320]/30 animate-pulse'
      : 'p-1.5 rounded-xl bg-[#FFF5F3] hover:bg-[#FEE2E2] text-[#C23320] border border-[#FEE2E2] hover:scale-105';
  } else if (variant === 'pill') {
    variantStyle = isSpeaking
      ? 'px-3 py-1.5 rounded-full bg-[#C23320] text-white font-bold text-xs shadow-sm ring-2 ring-[#C23320]/30 animate-pulse gap-1.5'
      : 'px-3 py-1.5 rounded-full bg-[#FFF5F3] hover:bg-[#FEE2E2] text-[#C23320] font-bold text-xs border border-[#FEE2E2] gap-1.5';
  } else if (variant === 'filled') {
    variantStyle = isSpeaking
      ? 'px-3.5 py-2 rounded-2xl bg-[#C23320] text-white font-bold text-xs shadow-md shadow-[#C23320]/20 ring-2 ring-[#C23320]/30 animate-pulse gap-2'
      : 'px-3.5 py-2 rounded-2xl bg-[#C23320] hover:bg-[#A12A1B] text-white font-bold text-xs shadow-sm gap-2';
  } else {
    // ghost
    variantStyle = isSpeaking
      ? 'p-1 rounded-lg text-[#C23320] font-bold text-xs bg-[#FEE2E2] animate-pulse gap-1'
      : 'p-1 rounded-lg text-slate-500 hover:text-[#C23320] hover:bg-[#FFF5F3] gap-1';
  }

  const tooltipTitle = isSpeaking 
    ? (title ? `${title} (Nhấp để dừng)` : 'Đang phát âm... Nhấp để dừng')
    : (title || 'Nhấp để nghe phát âm');

  return (
    <button
      type="button"
      onClick={handleClick}
      title={tooltipTitle}
      className={`${baseStyle} ${variantStyle} ${className}`}
      aria-label={tooltipTitle}
    >
      {isSpeaking ? (
        <VolumeX className={`${iconSizes[size]} text-current shrink-0`} />
      ) : (
        <Volume2 className={`${iconSizes[size]} text-current shrink-0`} />
      )}
      {label && <span className="truncate">{isSpeaking ? 'Dừng' : label}</span>}
    </button>
  );
};
