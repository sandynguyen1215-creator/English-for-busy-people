import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { RotateCcw, ArrowRight, Tv, Star, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ReadingPassageGapFill, ReadingPassageTF } from '../types';
import { playCorrectSound, playWrongSound, playVictorySound } from '../utils/audio';
import { SpeakButton } from './SpeakButton';

interface ReadingTabProps {
  readingPassage1: ReadingPassageGapFill;
  readingPassage2: ReadingPassageTF;
  unitNum?: number;
  onAddScore: (pts: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onOpenSlideMode?: () => void;
}

export const ReadingTab: React.FC<ReadingTabProps> = ({
  readingPassage1,
  readingPassage2,
  unitNum = 1,
  onAddScore,
  onIncrementStreak,
  onResetStreak,
  onOpenSlideMode
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'gap_fill' | 'true_false'>('gap_fill');

  const triggerGrandFireworks = () => {
    confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    setTimeout(() => {
      confetti({ particleCount: 110, spread: 100, origin: { x: 0.2, y: 0.5 } });
      confetti({ particleCount: 110, spread: 100, origin: { x: 0.8, y: 0.5 } });
    }, 300);
    setTimeout(() => {
      confetti({ particleCount: 140, spread: 120, origin: { y: 0.4 } });
    }, 600);
  };

  // ================= PASSAGE 1: GAP FILL STATE =================
  const [userFills, setUserFills] = useState<Record<number, string>>({});
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [isCheckComplete, setIsCheckComplete] = useState(false);
  const [isGapFillWon, setIsGapFillWon] = useState(false);
  const [fillResults, setFillResults] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setUserFills({});
    setSelectedWord(null);
    setIsCheckComplete(false);
    setIsGapFillWon(false);
    setFillResults({});
  }, [readingPassage1]);

  const handleFillBlank = (blankIdx: number) => {
    if (!selectedWord) return;
    setUserFills(prev => ({
      ...prev,
      [blankIdx]: selectedWord
    }));
    setSelectedWord(null);
  };

  const handleResetGapFill = () => {
    setUserFills({});
    setIsCheckComplete(false);
    setIsGapFillWon(false);
    setFillResults({});
  };

  const checkGapFill = () => {
    let allCorrect = true;
    const newResults: Record<number, boolean> = {};

    readingPassage1.sentences.forEach(s => {
      const userWord = (userFills[s.blankIndex] || '').trim().toLowerCase();
      const isCorrect = userWord === s.expectedWord.toLowerCase();
      newResults[s.blankIndex] = isCorrect;
      if (!isCorrect) allCorrect = false;
    });

    setFillResults(newResults);
    setIsCheckComplete(true);

    if (allCorrect) {
      setIsGapFillWon(true);
      playCorrectSound();
      playVictorySound();
      triggerGrandFireworks();
      onAddScore(100);
      onIncrementStreak();
    } else {
      playWrongSound();
    }
  };

  // ================= PASSAGE 2: TRUE / FALSE STATE =================
  const [tfAnswers, setTfAnswers] = useState<Record<number, boolean | null>>({});
  const [tfFeedback, setTfFeedback] = useState<Record<number, 'correct' | 'wrong' | null>>({});
  const [isTFWon, setIsTFWon] = useState(false);

  useEffect(() => {
    setTfAnswers({});
    setTfFeedback({});
    setIsTFWon(false);
  }, [readingPassage2]);

  const handleChooseTF = (questionId: number, userChoice: boolean) => {
    const q = readingPassage2.questions.find(item => item.id === questionId);
    if (!q) return;

    const isCorrect = userChoice === q.isTrue;
    const updatedFeedback = { ...tfFeedback, [questionId]: isCorrect ? ('correct' as const) : ('wrong' as const) };
    setTfAnswers(prev => ({ ...prev, [questionId]: userChoice }));
    setTfFeedback(updatedFeedback);

    if (isCorrect) {
      playCorrectSound();
      onAddScore(20);
      onIncrementStreak();

      // Check if all questions are answered correctly
      const totalQ = readingPassage2.questions.length;
      const correctCount = Object.values(updatedFeedback).filter(f => f === 'correct').length;
      if (correctCount === totalQ) {
        setIsTFWon(true);
        playVictorySound();
        triggerGrandFireworks();
        onAddScore(80);
      }
    } else {
      playWrongSound();
      onResetStreak();
    }
  };

  return (
    <div id="reading-practice-tab" className="space-y-6 max-w-5xl mx-auto">
      {/* Subtab navigation */}
      <div className="bg-white p-2 rounded-3xl border border-[#F0E8DD] shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 overflow-x-auto">
        <button
          id="reading-gap-fill-btn"
          onClick={() => setActiveSubTab('gap_fill')}
          className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'gap_fill'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <span>📝</span>
          <span>Bài 1: Điền Từ Đoạn Văn</span>
        </button>

        <button
          id="reading-true-false-btn"
          onClick={() => setActiveSubTab('true_false')}
          className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubTab === 'true_false'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <span>📖</span>
          <span>Bài 2: Đọc Tình Huống & T/F</span>
        </button>

        {onOpenSlideMode && (
          <button
            id="reading-presentation-btn"
            onClick={onOpenSlideMode}
            className="py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:scale-102 active:scale-98 shrink-0"
            title="Trình chiếu Slide bài đọc hiểu và tình huống"
          >
            <Tv className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Trình Chiếu</span> Đọc Hiểu
          </button>
        )}
      </div>

      {/* ================= 1. GAP FILL PASSAGE ================= */}
      {activeSubTab === 'gap_fill' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F0E8DD] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C23320] bg-[#FFF5F3] px-2.5 py-1 rounded-full">
                Reading Exercise 1
              </span>
              <h3 className="text-xl font-black text-slate-800 mt-1">
                {readingPassage1.title}
              </h3>
            </div>
            <SpeakButton 
              text={readingPassage1.fullAudioText} 
              variant="pill" 
              label="Nghe đọc bài mẫu"
              size="sm"
            />
          </div>

          {/* Word Bank Pool */}
          <div className="bg-[#FFF5F3] border border-[#FEE2E2] p-4 rounded-2xl space-y-2">
            <span className="text-xs font-bold text-[#C23320] block">
              1. Nhấp chọn 1 từ trong ngân hàng từ dưới đây:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {readingPassage1.wordBank.map(word => {
                const isSelected = selectedWord === word;
                return (
                  <button
                    key={word}
                    onClick={() => setSelectedWord(word)}
                    className={`px-3.5 py-2 rounded-xl font-extrabold text-xs md:text-sm border transition-all hover:scale-105 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C23320] text-white border-[#991B1B] shadow-sm'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-[#C23320]/40'
                    }`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Passage Text */}
          <div className="p-5 md:p-6 bg-slate-50/70 border border-slate-200/80 rounded-3xl space-y-4 text-sm md:text-base leading-loose font-medium text-slate-800">
            <p>
              {readingPassage1.sentences.map(s => {
                const filledValue = userFills[s.blankIndex];
                const isEvaluated = isCheckComplete;
                const isCorrect = fillResults[s.blankIndex];

                let blankBg = 'bg-white border-[#C23320]/40 text-[#C23320]';
                if (isEvaluated) {
                  blankBg = isCorrect
                    ? 'bg-emerald-100 border-emerald-500 text-emerald-800 font-black'
                    : 'bg-rose-100 border-[#C23320] text-[#C23320] font-black';
                }

                return (
                  <span key={s.blankIndex}>
                    {s.text}
                    <button
                      onClick={() => handleFillBlank(s.blankIndex)}
                      className={`inline-flex items-center justify-center min-w-[90px] px-3 py-1 mx-1.5 rounded-xl border-2 font-mono text-sm transition-all hover:scale-105 cursor-pointer ${blankBg} ${
                        !filledValue ? 'border-dashed border-[#C23320]/40 text-slate-400' : 'shadow-2xs'
                      }`}
                      title="Nhấp để điền từ đã chọn vào đây"
                    >
                      {filledValue || `(${s.blankIndex}) ___`}
                    </button>
                    {s.afterText}
                  </span>
                );
              })}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={handleResetGapFill}
              className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Xóa làm lại</span>
            </button>

            <button
              onClick={checkGapFill}
              className="px-6 py-2.5 rounded-2xl bg-[#C23320] hover:bg-[#A12A1B] text-white font-black text-xs md:text-sm shadow-md shadow-[#C23320]/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>Kiểm tra bài làm</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Gap Fill Victory Modal */}
          <AnimatePresence>
            {isGapFillWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center max-w-lg mx-auto space-y-4 relative overflow-hidden mt-4"
              >
                <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                  📖
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                    🎉 Hoàn Thành Bài Đọc Điền Từ!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                    "Chùm cuối ra tay, thổi bay bài tập!"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Bạn đã điền chính xác 100% tất cả các từ còn thiếu trong bài đọc!
                  </p>
                </div>

                <button
                  onClick={handleResetGapFill}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Luyện Tập Lại Bài Này</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ================= 2. TRUE / FALSE COMPREHENSION ================= */}
      {activeSubTab === 'true_false' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F0E8DD] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C23320] bg-[#FFF5F3] px-2.5 py-1 rounded-full">
                Reading Exercise 2
              </span>
              <h3 className="text-xl md:text-2xl font-black text-slate-800 mt-1">
                {readingPassage2.title}
              </h3>
            </div>
            <SpeakButton 
              text={readingPassage2.passageText} 
              variant="pill" 
              label="Nghe bài đọc"
              size="sm"
            />
          </div>

          {/* Reading text box with 2 sizes larger typography */}
          <div className="p-6 md:p-8 bg-slate-50 border-2 border-slate-200/90 rounded-3xl text-base md:text-lg lg:text-xl leading-loose font-medium text-slate-800 italic shadow-2xs">
            "{readingPassage2.passageText}"
          </div>

          {/* 6 T/F Questions with enlarged typography */}
          <div className="space-y-4 pt-2">
            {readingPassage2.questions.map((q, idx) => {
              const userAnswer = tfAnswers[q.id];
              const feedback = tfFeedback[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 md:p-6 rounded-2xl bg-white border-2 border-[#F0E8DD] hover:border-[#C23320]/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-start gap-2.5">
                      <div className="text-base md:text-lg lg:text-xl font-black text-slate-800 leading-snug">
                        <span className="text-[#C23320] font-mono mr-2">{idx + 1}.</span>
                        {q.statement}
                      </div>
                      <SpeakButton text={q.statement} size="sm" />
                    </div>
                    {feedback && (
                      <p className="text-sm md:text-base text-slate-600 font-semibold italic bg-[#FFF5F3] px-3 py-1.5 rounded-xl border border-rose-100">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>

                  {/* T / F Buttons without Vietnamese translations, enlarged size */}
                  <div className="flex items-center gap-2.5 shrink-0">
                    <button
                      onClick={() => handleChooseTF(q.id, true)}
                      className={`px-5 py-2.5 rounded-xl text-sm md:text-base font-black border-2 transition-all hover:scale-105 cursor-pointer ${
                        userAnswer === true
                          ? feedback === 'correct'
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                            : 'bg-[#C23320] text-white border-[#991B1B] shadow-md'
                          : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      TRUE
                    </button>

                    <button
                      onClick={() => handleChooseTF(q.id, false)}
                      className={`px-5 py-2.5 rounded-xl text-sm md:text-base font-black border-2 transition-all hover:scale-105 cursor-pointer ${
                        userAnswer === false
                          ? feedback === 'correct'
                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-md'
                            : 'bg-[#C23320] text-white border-[#991B1B] shadow-md'
                          : 'bg-slate-50 hover:bg-[#FFF5F3] text-slate-700 border-slate-200'
                      }`}
                    >
                      FALSE
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* True / False Victory Modal */}
          <AnimatePresence>
            {isTFWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center max-w-lg mx-auto space-y-4 relative overflow-hidden mt-4"
              >
                <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                  🎯
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                    🎉 Hoàn Thành Đọc Hiểu True/False!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                    "Chùm cuối ra tay, thổi bay bài tập!"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Bạn đã trả lời đúng 100% toàn bộ các câu hỏi đọc hiểu của bài học!
                  </p>
                </div>

                <button
                  onClick={() => {
                    setTfAnswers({});
                    setTfFeedback({});
                    setIsTFWon(false);
                  }}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Luyện Tập Lại Bài Này</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
