import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, Star, Tv
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BoxingQuestion } from '../types';
import { BOXING_QUESTIONS } from '../data/unit1Data';
import { MascotHoa, HoaState } from './MascotHoa';
import { 
  playCorrectSound, playWrongSound, playPunchSound, 
  playVictorySound 
} from '../utils/audio';
import { SpeakButton } from './SpeakButton';

// Utility helper to shuffle questions and their option positions
function shuffleArray<T>(arr: T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function randomizeBoxingQuestions(questions: BoxingQuestion[]): BoxingQuestion[] {
  const shuffledList = shuffleArray(questions);
  return shuffledList.map(q => {
    const correctOptionText = q.options[q.correctIndex];
    const randomizedOptions = shuffleArray(q.options);
    const newCorrectIndex = randomizedOptions.indexOf(correctOptionText);

    return {
      ...q,
      options: randomizedOptions,
      correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0
    };
  });
}

interface MiniGamesHubProps {
  boxingQuestions?: BoxingQuestion[];
  unitTitle?: string;
  onAddScore: (pts: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onUnlockBadge: (badgeId: string) => void;
  onHoaDefeated: () => void;
  onOpenSlideMode?: () => void;
  streak: number;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  boxingQuestions = BOXING_QUESTIONS,
  unitTitle = 'Workplace & Emails',
  onAddScore,
  onIncrementStreak,
  onResetStreak,
  onUnlockBadge,
  onHoaDefeated,
  onOpenSlideMode,
  streak
}) => {
  // ================= BOXING ARENA STATE =================
  const [hoaHp, setHoaHp] = useState(100);
  const [hoaMaxHp] = useState(100);
  const [hoaState, setHoaState] = useState<HoaState>('idle');
  const [hoaSpeech, setHoaSpeech] = useState('Sẵn sàng bước lên võ đài chưa? 🥊');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [questionFeedback, setQuestionFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isVictory, setIsVictory] = useState(false);

  const [shuffledQuestions, setShuffledQuestions] = useState<BoxingQuestion[]>(() => 
    randomizeBoxingQuestions(boxingQuestions.length > 0 ? boxingQuestions : BOXING_QUESTIONS)
  );

  const currentQ: BoxingQuestion = shuffledQuestions[currentQIndex] || shuffledQuestions[0];

  useEffect(() => {
    const raw = boxingQuestions.length > 0 ? boxingQuestions : BOXING_QUESTIONS;
    setShuffledQuestions(randomizeBoxingQuestions(raw));
    setHoaHp(100);
    setHoaState('idle');
    setHoaSpeech(`Ván mới môn ${unitTitle}! Đấm hết mình xem nào! 🥊`);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setQuestionFeedback('idle');
    setIsVictory(false);
  }, [boxingQuestions, unitTitle]);

  const handleChooseBoxingOption = (optIndex: number) => {
    if (questionFeedback !== 'idle' || isVictory || !currentQ) return;
    setSelectedOption(optIndex);

    if (optIndex === currentQ.correctIndex) {
      // CORRECT!
      playPunchSound();
      playCorrectSound();
      setQuestionFeedback('correct');
      setHoaState('hit');
      setHoaSpeech('Oái... đấm đau thế! 😵');
      onAddScore(50 + (streak * 10));
      onIncrementStreak();
      onUnlockBadge('first_hit');

      // Reduce HP
      const nextHp = Math.max(0, hoaHp - currentQ.damage);
      setHoaHp(nextHp);

      if (nextHp <= 0) {
        // VICTORY KNOCKOUT!
        setIsVictory(true);
        setHoaState('ko');
        setHoaSpeech('K.O! Bạn là Nhà Vô Địch Từ Vựng! 🏆');
        playVictorySound();
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
        setTimeout(() => {
          confetti({ particleCount: 110, spread: 100, origin: { x: 0.2, y: 0.5 } });
          confetti({ particleCount: 110, spread: 100, origin: { x: 0.8, y: 0.5 } });
        }, 300);
        setTimeout(() => {
          confetti({ particleCount: 140, spread: 120, origin: { y: 0.4 } });
        }, 600);
        onUnlockBadge('hoa_champion');
        onHoaDefeated();
      } else {
        // Next Question auto-advance
        setTimeout(() => {
          setQuestionFeedback('idle');
          setSelectedOption(null);
          setCurrentQIndex(prev => (prev + 1) % (shuffledQuestions.length || 1));
          setHoaState('idle');
          setHoaSpeech('Chưa xong đâu nha! Tiếp chiêu nè! 😜');
        }, 1200);
      }
    } else {
      // WRONG!
      playWrongSound();
      setQuestionFeedback('wrong');
      setHoaState('shrug');
      setHoaSpeech('Lêu lêu, hụt rồi nha! Chọn lại đê! 😛');
      onResetStreak();

      setTimeout(() => {
        setQuestionFeedback('idle');
        setSelectedOption(null);
      }, 1000);
    }
  };

  const restartBoxingMatch = () => {
    const raw = boxingQuestions.length > 0 ? boxingQuestions : BOXING_QUESTIONS;
    setShuffledQuestions(randomizeBoxingQuestions(raw));
    setHoaHp(100);
    setHoaState('idle');
    setHoaSpeech('Ván mới! Đã đảo ngẫu nhiên câu & đáp án! 🥊');
    setCurrentQIndex(0);
    setSelectedOption(null);
    setQuestionFeedback('idle');
    setIsVictory(false);
  };

  return (
    <div id="minigames-hub-tab" className="space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="bg-white p-3 sm:p-4 rounded-3xl border border-[#F0E8DD] shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-xl shadow-sm">
            🥊
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-800">
              Võ Đài Boxing Quiz - {unitTitle}
            </h3>
            <p className="text-xs text-slate-500 font-medium hidden sm:block">
              Trả lời đúng các câu hỏi trắc nghiệm để hạ gục đối thủ và giành đai vô địch!
            </p>
          </div>
        </div>

        {onOpenSlideMode && (
          <button
            id="minigames-presentation-btn"
            onClick={onOpenSlideMode}
            className="py-2.5 px-4 rounded-2xl font-black text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:scale-102 active:scale-98 shrink-0"
            title="Trình chiếu Slide câu hỏi Quiz đấu trường tương tác"
          >
            <Tv className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Trình Chiếu</span> Đấu Trường
          </button>
        )}
      </div>

      {/* ================= BOXING ARENA ================= */}
      <div className="bg-gradient-to-b from-[#FFF5F3] to-amber-50/40 p-6 md:p-8 rounded-3xl border-2 border-[#FEE2E2] shadow-sm relative overflow-hidden">
        {/* Ring ropes decorative header */}
        <div className="flex items-center justify-between border-b border-[#FEE2E2] pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🥊</span>
            <div>
              <h3 className="text-xl font-black text-slate-800 tracking-tight">
                Võ Đài Boxing Quiz Thử Thách
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Trả lời đúng để tung cú đấm quyết định khiến đối thủ mất máu và giành chiến thắng K.O!
              </p>
            </div>
          </div>

          <button
            onClick={restartBoxingMatch}
            className="p-2 rounded-xl bg-white hover:bg-[#FFF5F3] text-[#C23320] border border-[#FEE2E2] text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-transform active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Đấu lại</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Mascot Character Arena (5 cols) */}
          <div className="md:col-span-5 flex flex-col items-center justify-center py-4 bg-white/70 backdrop-blur-xs rounded-3xl border border-[#F0E8DD] p-6 shadow-2xs">
            <MascotHoa
              hp={hoaHp}
              maxHp={hoaMaxHp}
              state={hoaState}
              speechText={hoaSpeech}
              size="lg"
              onManualPunch={() => {
                setHoaHp(prev => Math.max(0, prev - 5));
              }}
            />
          </div>

          {/* Quiz Question Box (7 cols) */}
          <div className="md:col-span-7 space-y-4">
            {!isVictory ? (
              <div className="bg-white p-6 rounded-3xl border border-[#F0E8DD] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-[#C23320] bg-[#FFF5F3] px-2.5 py-1 rounded-full">
                    Hiệp đấu {currentQIndex + 1} / {shuffledQuestions.length}
                  </span>
                  <SpeakButton 
                    text={currentQ.audioPrompt || currentQ.question} 
                    variant="pill"
                    label="Nghe câu hỏi"
                    size="sm"
                  />
                </div>

                <h4 className="text-base md:text-lg font-black text-slate-800 leading-snug">
                  {currentQ.question}
                </h4>

                {/* 4 Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle = 'bg-slate-50 hover:bg-[#FFF5F3] text-slate-800 border-slate-200';

                    if (isSelected) {
                      if (questionFeedback === 'correct') {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md animate-bounce';
                      } else if (questionFeedback === 'wrong') {
                        btnStyle = 'bg-[#C23320] text-white border-[#991B1B] shadow-md animate-shake';
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        id={`boxing-option-btn-${idx}`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChooseBoxingOption(idx)}
                        className={`p-3.5 rounded-2xl text-xs md:text-sm font-extrabold border-2 text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span className="truncate">{opt}</span>
                        <span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-[10px] font-black shrink-0 ml-2">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {questionFeedback === 'correct' && (
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl text-xs font-medium text-emerald-800">
                    💡 {currentQ.explanation}
                  </div>
                )}
              </div>
            ) : (
              /* KO Victory Screen */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center space-y-4 max-w-lg mx-auto relative overflow-hidden"
              >
                <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white rounded-3xl flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                  🥊
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                    🎉 HẠ ĐO VÁN ĐỐI THỦ THÀNH CÔNG!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                    "Chùm cuối ra tay, thổi bay bài tập!"
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 font-medium">
                    Chúc mừng bạn đã xuất sắc vượt qua tất cả các câu hỏi và giành trọn vẹn danh hiệu{' '}
                    <strong className="text-[#C23320]">"Nhà Vô Địch Quiz {unitTitle}"</strong>!
                  </p>
                </div>

                <div className="flex justify-center gap-1 text-amber-400 py-2">
                  <Star className="w-6 h-6 fill-amber-400" />
                  <Star className="w-8 h-8 fill-amber-400 -mt-2" />
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>

                <button
                  onClick={restartBoxingMatch}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
                >
                  Tái Đấu Trận Mới 🥊
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
