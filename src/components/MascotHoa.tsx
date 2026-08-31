import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Zap } from 'lucide-react';
import { playPunchSound } from '../utils/audio';

export type HoaState = 'idle' | 'hit' | 'shrug' | 'ko' | 'cheer';

interface MascotHoaProps {
  hp: number;
  maxHp: number;
  state?: HoaState;
  onManualPunch?: () => void;
  speechText?: string;
  size?: 'sm' | 'md' | 'lg';
  showHpBar?: boolean;
}

export const MascotHoa: React.FC<MascotHoaProps> = ({
  hp,
  maxHp,
  state = 'idle',
  onManualPunch,
  speechText,
  size = 'md',
  showHpBar = true
}) => {
  const [internalState, setInternalState] = useState<HoaState>(state);
  const [floatTexts, setFloatTexts] = useState<{ id: number; text: string; x: number; color: string }[]>([]);
  const hpPercent = Math.max(0, Math.min(100, Math.round((hp / maxHp) * 100)));

  useEffect(() => {
    setInternalState(state);
    if (state === 'hit') {
      triggerHitEffect('BỐP! 💥', '#EF4444');
      const timer = setTimeout(() => {
        if (hp <= 0) {
          setInternalState('ko');
        } else {
          setInternalState('idle');
        }
      }, 700);
      return () => clearTimeout(timer);
    } else if (state === 'shrug') {
      const timer = setTimeout(() => setInternalState('idle'), 1400);
      return () => clearTimeout(timer);
    }
  }, [state, hp]);

  const triggerHitEffect = (text: string, color: string) => {
    const newId = Date.now() + Math.random();
    const randomX = (Math.random() - 0.5) * 60;
    setFloatTexts(prev => [...prev.slice(-3), { id: newId, text, x: randomX, color }]);
    setTimeout(() => {
      setFloatTexts(prev => prev.filter(item => item.id !== newId));
    }, 1000);
  };

  const handleBagClick = () => {
    playPunchSound();
    triggerHitEffect('BỐP! 🥊', '#F43F5E');
    setInternalState('hit');
    if (onManualPunch) onManualPunch();
    setTimeout(() => {
      if (hp <= 0) setInternalState('ko');
      else setInternalState('idle');
    }, 600);
  };

  const dimensions = {
    sm: { w: 120, h: 180, bagW: 80, bagH: 120 },
    md: { w: 180, h: 260, bagW: 110, bagH: 170 },
    lg: { w: 240, h: 340, bagW: 140, bagH: 220 }
  }[size];

  // HP color gradient
  const hpColor = hpPercent > 60 ? 'bg-emerald-500' : hpPercent > 25 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div id="mascot-hoa-container" className="flex flex-col items-center justify-center select-none relative">
      {/* Speech bubble */}
      <AnimatePresence>
        {speechText && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="mb-2 bg-white px-3.5 py-1.5 rounded-2xl shadow-md border border-rose-100 text-xs font-semibold text-rose-700 max-w-[200px] text-center relative z-20"
          >
            {speechText}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rotate-45 border-r border-b border-rose-100" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating hit comic texts */}
      <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
        {floatTexts.map(item => (
          <motion.div
            key={item.id}
            initial={{ opacity: 1, y: 0, x: item.x, scale: 0.7 }}
            animate={{ opacity: 0, y: -70, scale: 1.4, rotate: (Math.random() - 0.5) * 30 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute font-black text-lg md:text-xl drop-shadow-md"
            style={{ color: item.color }}
          >
            {item.text}
          </motion.div>
        ))}
      </div>

      {/* Punching Bag Rig */}
      <div
        className="relative cursor-pointer transition-transform active:scale-95 group"
        onClick={handleBagClick}
        title="Nhấp để tung cú đấm luyện tập!"
      >
        {/* Top hanging chain */}
        <div className="flex flex-col items-center mb-0.5">
          <div className="w-10 h-2 bg-slate-700 rounded-t-sm shadow-inner" />
          <div className="w-1.5 h-7 bg-gradient-to-b from-slate-400 via-slate-300 to-slate-500 rounded" />
          <div className="w-4 h-4 rounded-full border-2 border-slate-600 -mt-1 bg-slate-300 shadow-sm" />
        </div>

        {/* The Animated Bag */}
        <motion.div
          animate={
            internalState === 'hit'
              ? {
                  rotate: [-14, 12, -8, 6, 0],
                  x: [15, -12, 8, -4, 0],
                  scale: [0.95, 1.05, 0.98, 1]
                }
              : internalState === 'ko'
              ? { rotate: 82, y: 40, opacity: 0.85 }
              : internalState === 'shrug'
              ? { rotate: [-5, 5, -5, 5, 0], y: [0, -6, 0, -6, 0] }
              : internalState === 'cheer'
              ? { y: [0, -12, 0, -12, 0], rotate: [-4, 4, -4, 4, 0] }
              : {
                  rotate: [-1.5, 1.5, -1.5],
                  transition: { repeat: Infinity, duration: 3, ease: 'easeInOut' }
                }
          }
          transition={{ duration: internalState === 'hit' ? 0.6 : 0.4 }}
          style={{ width: dimensions.bagW, height: dimensions.bagH }}
          className="relative mx-auto rounded-[36px] bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 shadow-xl border-4 border-rose-700/40 flex flex-col items-center justify-between p-3 overflow-hidden"
        >
          {/* Cute Pink Bow on Top */}
          <div className="absolute -top-1.5 z-10 flex items-center justify-center">
            <div className="w-4 h-3 bg-pink-300 rounded-l-full border border-pink-400 -rotate-12" />
            <div className="w-3 h-3 bg-pink-400 rounded-full border border-pink-500 z-10" />
            <div className="w-4 h-3 bg-pink-300 rounded-r-full border border-pink-400 rotate-12" />
          </div>

          {/* Boxing Tape Stripes */}
          <div className="w-full flex justify-between px-2 pt-2 opacity-40">
            <div className="w-full h-1 bg-white/40 rounded-full" />
          </div>

          {/* Face Elements */}
          <div className="flex flex-col items-center my-auto w-full">
            {/* Eyes */}
            <div className="flex items-center justify-center space-x-4 my-1">
              {internalState === 'hit' ? (
                <>
                  <div className="text-amber-300 text-sm font-black animate-spin">💫</div>
                  <div className="text-amber-300 text-sm font-black animate-spin">⭐</div>
                </>
              ) : internalState === 'ko' ? (
                <>
                  <div className="text-slate-800 text-base font-black">✖️</div>
                  <div className="text-slate-800 text-base font-black">✖️</div>
                </>
              ) : internalState === 'shrug' ? (
                <>
                  <div className="w-3 h-1.5 bg-slate-900 rounded-t-full" />
                  <div className="w-3 h-1.5 bg-slate-900 rounded-t-full" />
                </>
              ) : (
                <>
                  <div className="w-3.5 h-3.5 bg-slate-900 rounded-full flex items-start justify-end p-0.5 shadow-inner">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                  <div className="w-3.5 h-3.5 bg-slate-900 rounded-full flex items-start justify-end p-0.5 shadow-inner">
                    <div className="w-1 h-1 bg-white rounded-full" />
                  </div>
                </>
              )}
            </div>

            {/* Rosy Cheeks */}
            <div className="flex justify-between w-14 -mt-0.5">
              <div className="w-2.5 h-1.5 bg-rose-300/80 rounded-full blur-[0.5px]" />
              <div className="w-2.5 h-1.5 bg-rose-300/80 rounded-full blur-[0.5px]" />
            </div>

            {/* Mouth */}
            <div className="mt-1 flex items-center justify-center">
              {internalState === 'hit' ? (
                <div className="w-4 h-3 rounded-full bg-slate-900 border border-rose-300" />
              ) : internalState === 'ko' ? (
                <div className="w-4 h-1.5 bg-slate-800 rounded-full" />
              ) : internalState === 'shrug' ? (
                <div className="w-3 h-1 bg-slate-900 rounded-full rotate-6" />
              ) : (
                <div className="w-3.5 h-2 border-b-2 border-slate-900 rounded-b-full" />
              )}
            </div>

            {/* Cute Nameplate on Bag */}
            <div className="mt-3 bg-white/90 px-2 py-0.5 rounded-full border border-rose-300 shadow-sm">
              <span className="text-[10px] font-black tracking-tight text-rose-800">
                {internalState === 'ko' ? 'K.O' : 'Champion 🥊'}
              </span>
            </div>
          </div>

          {/* Bottom band */}
          <div className="w-full flex justify-center pb-1">
            <div className="w-3/4 h-1 bg-rose-800/40 rounded-full" />
          </div>
        </motion.div>
      </div>

      {/* HP Bar */}
      {showHpBar && (
        <div className="w-full max-w-[160px] mt-3">
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-700 mb-1">
            <span className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              <span>HP Đối Thủ</span>
            </span>
            <span className="font-extrabold text-rose-600">{hp}/{maxHp}</span>
          </div>
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden p-0.5 shadow-inner border border-slate-300">
            <motion.div
              initial={{ width: `${hpPercent}%` }}
              animate={{ width: `${hpPercent}%` }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className={`h-full rounded-full transition-colors ${hpColor}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};
