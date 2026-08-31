import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, Timer, CheckCircle, Star, Tv, Sparkles, Volume2, 
  ArrowRightLeft, Trophy, Check, X, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MatchingCard, VocabItem } from '../types';
import { 
  playCorrectSound, playWrongSound, playPunchSound, 
  playFlipSound, playVictorySound, playComboSound, speakText 
} from '../utils/audio';
import { SpeakButton } from './SpeakButton';

export interface LetterClueQuestion {
  id: number;
  prompt: string;
  clue: string;
  fullWord: string;
  emoji: string;
}

interface VocabPracticeTabProps {
  vocabList: VocabItem[];
  letterClues?: LetterClueQuestion[];
  unitNum: number;
  onAddScore: (points: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenSlideMode?: () => void;
  streak: number;
}

export const VocabPracticeTab: React.FC<VocabPracticeTabProps> = ({
  vocabList,
  unitNum: _unitNum,
  onAddScore,
  onIncrementStreak,
  onResetStreak,
  onUnlockBadge,
  onOpenSlideMode,
  streak
}) => {
  // Practice Sub-modes: 'word_match' (Nối từ) | 'memory' (Lật thẻ siêu trí nhớ)
  const [activeSubMode, setActiveSubMode] = useState<'word_match' | 'memory'>('word_match');

  // ================= 1. WORD & MEANING MATCHING GAME STATE =================
  const [matchBatchSize, setMatchBatchSize] = useState<number>(6);
  const [matchBatchIndex, setMatchBatchIndex] = useState<number>(0);
  const [selectedEnId, setSelectedEnId] = useState<number | null>(null);
  const [selectedViId, setSelectedViId] = useState<number | null>(null);
  const [matchedIds, setMatchedIds] = useState<number[]>([]);
  const [wrongPair, setWrongPair] = useState<{ enId: number; viId: number } | null>(null);
  const [matchTimer, setMatchTimer] = useState(0);
  const [matchMoves, setMatchMoves] = useState(0);
  const [isMatchWon, setIsMatchWon] = useState(false);
  const [isMatchActive, setIsMatchActive] = useState(true);

  // Pool of current items for word matching
  const currentBatchItems = useMemo(() => {
    if (!vocabList || vocabList.length === 0) return [];
    const startIndex = (matchBatchIndex * matchBatchSize) % vocabList.length;
    let items = vocabList.slice(startIndex, startIndex + matchBatchSize);
    if (items.length < matchBatchSize && vocabList.length >= matchBatchSize) {
      items = [...items, ...vocabList.slice(0, matchBatchSize - items.length)];
    }
    return items;
  }, [vocabList, matchBatchIndex, matchBatchSize]);

  // Shuffled Vietnamese meanings for the right column
  const [shuffledViItems, setShuffledViItems] = useState<VocabItem[]>([]);
  const [autoAdvanceNotice, setAutoAdvanceNotice] = useState<string | null>(null);

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

  const startNewMatchRound = useCallback((newBatchIdx?: number) => {
    const nextIdx = newBatchIdx !== undefined ? newBatchIdx : matchBatchIndex;
    setMatchBatchIndex(nextIdx);
    setSelectedEnId(null);
    setSelectedViId(null);
    setMatchedIds([]);
    setWrongPair(null);
    setMatchMoves(0);
    setMatchTimer(0);
    setIsMatchWon(false);
    setIsMatchActive(true);
    setAutoAdvanceNotice(null);

    const startIndex = (nextIdx * matchBatchSize) % (vocabList.length || 1);
    let items = vocabList.slice(startIndex, startIndex + matchBatchSize);
    if (items.length < matchBatchSize && vocabList.length >= matchBatchSize) {
      items = [...items, ...vocabList.slice(0, matchBatchSize - items.length)];
    }
    // Shuffle Vietnamese column
    const viShuffled = [...items].sort(() => Math.random() - 0.5);
    setShuffledViItems(viShuffled);
  }, [matchBatchIndex, matchBatchSize, vocabList]);

  // Initialize Word Match Round
  useEffect(() => {
    startNewMatchRound(0);
  }, [vocabList, matchBatchSize]);

  // Match Game Timer loop
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isMatchActive && !isMatchWon && activeSubMode === 'word_match') {
      interval = setInterval(() => {
        setMatchTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isMatchActive, isMatchWon, activeSubMode]);

  // Handle English Card Click
  const handleSelectEn = (item: VocabItem) => {
    if (matchedIds.includes(item.id) || wrongPair || autoAdvanceNotice) return;
    speakText(item.english);
    playFlipSound();

    if (selectedEnId === item.id) {
      setSelectedEnId(null);
      return;
    }

    setSelectedEnId(item.id);

    // If a Vietnamese item is already selected, verify match
    if (selectedViId !== null) {
      checkPairMatch(item.id, selectedViId);
    }
  };

  // Handle Vietnamese Card Click
  const handleSelectVi = (item: VocabItem) => {
    if (matchedIds.includes(item.id) || wrongPair || autoAdvanceNotice) return;
    playFlipSound();

    if (selectedViId === item.id) {
      setSelectedViId(null);
      return;
    }

    setSelectedViId(item.id);

    // If an English item is already selected, verify match
    if (selectedEnId !== null) {
      checkPairMatch(selectedEnId, item.id);
    }
  };

  // Check if English ID and Vietnamese ID match
  const checkPairMatch = (enId: number, viId: number) => {
    setMatchMoves(prev => prev + 1);

    if (enId === viId) {
      // MATCH SUCCESS!
      playCorrectSound();
      playPunchSound();
      playComboSound(streak + 1);
      onAddScore(35 + (streak * 5));
      onIncrementStreak();
      onUnlockBadge('vocab_connector');

      const nextMatched = [...matchedIds, enId];
      setMatchedIds(nextMatched);
      setSelectedEnId(null);
      setSelectedViId(null);

      confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });

      if (nextMatched.length === currentBatchItems.length) {
        const totalBatches = Math.ceil(vocabList.length / matchBatchSize);
        const hasNextBatch = matchBatchIndex + 1 < totalBatches;

        if (hasNextBatch) {
          // AUTO ADVANCE TO NEXT BATCH!
          setAutoAdvanceNotice(`Xuất sắc! Đang tự động chuyển sang Đợt ${matchBatchIndex + 2}/${totalBatches}...`);
          playCorrectSound();
          setTimeout(() => {
            startNewMatchRound(matchBatchIndex + 1);
          }, 1200);
        } else {
          // ALL BATCHES CLEARED - GRAND FINALE!
          setIsMatchWon(true);
          playVictorySound();
          triggerGrandFireworks();
          onUnlockBadge('vocab_master_round');
          onAddScore(150);
        }
      }
    } else {
      // MISMATCH!
      playWrongSound();
      onResetStreak();
      setWrongPair({ enId, viId });

      setTimeout(() => {
        setWrongPair(null);
        setSelectedEnId(null);
        setSelectedViId(null);
      }, 700);
    }
  };

  const handleNextBatch = () => {
    const totalBatches = Math.ceil(vocabList.length / matchBatchSize);
    const nextIdx = (matchBatchIndex + 1) % (totalBatches || 1);
    startNewMatchRound(nextIdx);
  };

  // ================= 2. MEMORY MATCHING GAME STATE =================
  const [pairMode, setPairMode] = useState<'en_vi' | 'en_img'>('en_vi');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [cards, setCards] = useState<MatchingCard[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameTimer, setGameTimer] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  const pairCounts = { easy: 4, medium: 6, hard: 8 };

  const startNewMemoryGame = useCallback(() => {
    const totalPairs = pairCounts[difficulty];
    const shuffledVocab = [...vocabList].sort(() => Math.random() - 0.5).slice(0, totalPairs);

    const generatedCards: MatchingCard[] = [];

    shuffledVocab.forEach((item, index) => {
      const matchId = `pair_${item.id}`;

      // Card A: English Word
      generatedCards.push({
        id: `card_${index}_a`,
        uniqueKey: `key_${item.id}_a`,
        type: 'en',
        content: item.english,
        subText: item.ipa,
        matchId: matchId,
        isFlipped: false,
        isMatched: false
      });

      // Card B: based on pairMode
      if (pairMode === 'en_vi') {
        generatedCards.push({
          id: `card_${index}_b`,
          uniqueKey: `key_${item.id}_b`,
          type: 'vi',
          content: item.vietnamese,
          subText: item.emoji,
          matchId: matchId,
          isFlipped: false,
          isMatched: false
        });
      } else {
        generatedCards.push({
          id: `card_${index}_b`,
          uniqueKey: `key_${item.id}_b`,
          type: 'img',
          content: item.emoji,
          subText: item.vietnamese,
          matchId: matchId,
          isFlipped: false,
          isMatched: false
        });
      }
    });

    const shuffled = generatedCards.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedCount(0);
    setMoves(0);
    setGameTimer(0);
    setIsGameActive(true);
    setIsGameWon(false);
  }, [difficulty, pairMode, vocabList]);

  // Timer loop for memory game
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && !isGameWon && activeSubMode === 'memory') {
      interval = setInterval(() => {
        setGameTimer(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, isGameWon, activeSubMode]);

  useEffect(() => {
    if (activeSubMode === 'memory') {
      startNewMemoryGame();
    }
  }, [startNewMemoryGame, activeSubMode]);

  const handleCardClick = (index: number) => {
    if (!isGameActive || isGameWon) return;
    if (cards[index].isMatched || cards[index].isFlipped) return;
    if (flippedIndices.length >= 2) return;

    playFlipSound();

    if (cards[index].type === 'en') {
      speakText(cards[index].content);
    }

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [firstIdx, secondIdx] = newFlipped;
      const firstCard = newCards[firstIdx];
      const secondCard = newCards[secondIdx];

      if (firstCard.matchId === secondCard.matchId) {
        setTimeout(() => {
          playCorrectSound();
          playComboSound(streak + 1);
          onAddScore(30 + (streak * 5));
          onIncrementStreak();

          newCards[firstIdx].isMatched = true;
          newCards[secondIdx].isMatched = true;
          setCards([...newCards]);
          setFlippedIndices([]);
          setMatchedCount(prev => {
            const nextCount = prev + 1;
            if (nextCount === pairCounts[difficulty]) {
              setIsGameWon(true);
              playVictorySound();
              confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
              onUnlockBadge('memory_master');
              onAddScore(100);
            }
            return nextCount;
          });
        }, 500);
      } else {
        setTimeout(() => {
          playWrongSound();
          onResetStreak();
          newCards[firstIdx].isFlipped = false;
          newCards[secondIdx].isFlipped = false;
          setCards([...newCards]);
          setFlippedIndices([]);
        }, 1100);
      }
    }
  };

  const totalBatches = Math.ceil(vocabList.length / matchBatchSize);

  return (
    <div id="vocab-practice-tab" className="space-y-6 max-w-5xl mx-auto">
      {/* Submode Selector Navigation */}
      <div className="bg-white p-2 rounded-3xl border border-[#F0E8DD] shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 overflow-x-auto">
        <button
          id="submode-wordmatch-btn"
          onClick={() => setActiveSubMode('word_match')}
          className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubMode === 'word_match'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <ArrowRightLeft className="w-4 h-4" />
          <span>Nối Từ Tiếng Anh Với Nghĩa Tiếng Việt</span>
        </button>

        <button
          id="submode-memory-btn"
          onClick={() => setActiveSubMode('memory')}
          className={`flex-1 py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
            activeSubMode === 'memory'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <span>🃏</span>
          <span>Siêu Trí Nhớ Lật Thẻ (Memory Match)</span>
        </button>

        {onOpenSlideMode && (
          <button
            id="vocab-practice-presentation-btn"
            onClick={onOpenSlideMode}
            className="py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:scale-102 active:scale-98 shrink-0"
            title="Trình chiếu Slide ôn luyện từ vựng"
          >
            <Tv className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Trình Chiếu</span> Luyện Từ
          </button>
        )}
      </div>

      {/* ================= 1. WORD & MEANING MATCHING ARENA ================= */}
      {activeSubMode === 'word_match' && (
        <div className="space-y-4">
          {/* Controls & Statistics Bar */}
          <div className="bg-white p-4 rounded-3xl border border-[#F0E8DD] shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Batch / Difficulty Selector */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500">Số cặp/lượt:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl">
                {[4, 6, 8].map(size => (
                  <button
                    key={size}
                    onClick={() => {
                      setMatchBatchSize(size);
                      setMatchBatchIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      matchBatchSize === size
                        ? 'bg-[#C23320] text-white shadow-xs'
                        : 'text-slate-600 hover:bg-white'
                    }`}
                  >
                    {size} Cặp
                  </button>
                ))}
              </div>

              {totalBatches > 1 && (
                <div className="flex items-center gap-1 text-xs font-bold text-slate-600 bg-rose-50/70 border border-rose-100 px-3 py-1.5 rounded-xl">
                  <span>Đợt từ:</span>
                  <span className="font-black text-[#C23320]">{matchBatchIndex + 1}/{totalBatches}</span>
                </div>
              )}
            </div>

            {/* Live Stats: Timer, Moves & Next Batch Button */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                <Timer className="w-3.5 h-3.5 text-[#C23320]" />
                <span>{Math.floor(matchTimer / 60)}:{(matchTimer % 60).toString().padStart(2, '0')}</span>
              </div>

              <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                Đã nối: <span className="font-mono text-emerald-600 font-black">{matchedIds.length}</span> / {currentBatchItems.length}
              </div>

              <button
                onClick={() => startNewMatchRound()}
                className="p-2 rounded-xl bg-[#FFF5F3] hover:bg-[#FEE2E2] text-[#C23320] transition-transform active:scale-95 cursor-pointer"
                title="Trộn lại lượt này"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              {totalBatches > 1 && (
                <button
                  onClick={handleNextBatch}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-black transition-all hover:scale-105 active:scale-95 flex items-center gap-1 cursor-pointer"
                  title="Chuyển sang nhóm từ vựng kế tiếp"
                >
                  <span>Đợt Tiếp</span>
                  <ArrowRightLeft className="w-3.5 h-3.5 text-amber-300" />
                </button>
              )}
            </div>
          </div>

          {/* Auto Advance Notification Pill */}
          <AnimatePresence>
            {autoAdvanceNotice && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-gradient-to-r from-amber-500 via-rose-500 to-emerald-500 text-white p-3 rounded-2xl shadow-md text-center font-black text-xs sm:text-sm flex items-center justify-center gap-2 animate-pulse"
              >
                <span>⚡</span>
                <span>{autoAdvanceNotice}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Matching Game Interactive Columns */}
          <div className="bg-gradient-to-b from-[#FFF5F3]/50 to-white p-4 sm:p-6 rounded-3xl border border-[#F0E8DD] shadow-xs">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-rose-100/60">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-800">
                    Chọn 1 từ tiếng Anh bên trái ➔ Ghép với nghĩa tiếng Việt đúng bên phải
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Nhấp vào từ để nghe phát âm chuẩn và luyện phản xạ ghi nhớ từ vựng tức thì!
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
              {/* LEFT COLUMN: English Words / Phrases */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-2 text-xs font-black text-[#C23320] uppercase tracking-wider">
                  <span>🇺🇸 Cụm Từ Tiếng Anh (English)</span>
                  <span className="text-[10px] font-bold text-slate-400">({currentBatchItems.length} từ)</span>
                </div>

                <div className="space-y-2">
                  {currentBatchItems.map((item, idx) => {
                    const isMatched = matchedIds.includes(item.id);
                    const isSelected = selectedEnId === item.id;
                    const isWrong = wrongPair && wrongPair.enId === item.id;

                    let cardStyle = 'bg-white hover:bg-rose-50/50 border-slate-200/80 text-slate-800 shadow-2xs';

                    if (isMatched) {
                      cardStyle = 'bg-emerald-50/80 border-emerald-400 text-emerald-900 opacity-80 cursor-default';
                    } else if (isWrong) {
                      cardStyle = 'bg-rose-50 border-[#C23320] text-rose-900 ring-2 ring-[#C23320] animate-shake';
                    } else if (isSelected) {
                      cardStyle = 'bg-[#FFF5F3] border-[#C23320] text-[#C23320] ring-2 ring-[#C23320] shadow-md scale-101';
                    }

                    return (
                      <motion.div
                        key={`en_${item.id}_${idx}`}
                        id={`match-en-card-${item.id}`}
                        whileHover={!isMatched ? { scale: 1.01 } : {}}
                        whileTap={!isMatched ? { scale: 0.99 } : {}}
                        onClick={() => handleSelectEn(item)}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 select-none cursor-pointer ${cardStyle}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                            isMatched
                              ? 'bg-emerald-200/70 text-emerald-800'
                              : isSelected
                              ? 'bg-[#C23320] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isMatched ? <Check className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                          </div>

                          <div className="min-w-0">
                            <div className="font-black text-xs sm:text-sm tracking-tight truncate flex items-center gap-1.5">
                              <span>{item.english}</span>
                              {item.category && (
                                <span className="text-[9px] uppercase px-1.5 py-0.2 bg-slate-100 text-slate-500 rounded font-bold">
                                  {item.category}
                                </span>
                              )}
                            </div>
                            {item.ipa && (
                              <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                {item.ipa}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
                          <button
                            onClick={() => speakText(item.english)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-[#C23320] hover:bg-white transition-colors"
                            title="Nghe phát âm"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* RIGHT COLUMN: Vietnamese Meanings */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between px-2 text-xs font-black text-[#C23320] uppercase tracking-wider">
                  <span>🇻🇳 Nghĩa Tiếng Việt (Vietnamese)</span>
                  <span className="text-[10px] font-bold text-slate-400">(Trộn ngẫu nhiên)</span>
                </div>

                <div className="space-y-2">
                  {shuffledViItems.map((item, idx) => {
                    const isMatched = matchedIds.includes(item.id);
                    const isSelected = selectedViId === item.id;
                    const isWrong = wrongPair && wrongPair.viId === item.id;

                    let cardStyle = 'bg-white hover:bg-rose-50/50 border-slate-200/80 text-slate-800 shadow-2xs';

                    if (isMatched) {
                      cardStyle = 'bg-emerald-50/80 border-emerald-400 text-emerald-900 opacity-80 cursor-default';
                    } else if (isWrong) {
                      cardStyle = 'bg-rose-50 border-[#C23320] text-rose-900 ring-2 ring-[#C23320] animate-shake';
                    } else if (isSelected) {
                      cardStyle = 'bg-[#FFF5F3] border-[#C23320] text-[#C23320] ring-2 ring-[#C23320] shadow-md scale-101';
                    }

                    return (
                      <motion.div
                        key={`vi_${item.id}_${idx}`}
                        id={`match-vi-card-${item.id}`}
                        whileHover={!isMatched ? { scale: 1.01 } : {}}
                        whileTap={!isMatched ? { scale: 0.99 } : {}}
                        onClick={() => handleSelectVi(item)}
                        className={`p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-center justify-between gap-3 select-none cursor-pointer ${cardStyle}`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                            isMatched
                              ? 'bg-emerald-200/70 text-emerald-800'
                              : isSelected
                              ? 'bg-[#C23320] text-white'
                              : 'bg-slate-100 text-slate-600'
                          }`}>
                            {isMatched ? <Check className="w-4 h-4" /> : `${idx + 1}`}
                          </div>

                          <div className="min-w-0">
                            <div className="font-bold text-xs sm:text-sm text-slate-800 truncate">
                              {item.vietnamese}
                            </div>
                            <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                              {item.exampleVi}
                            </div>
                          </div>
                        </div>

                        <div className="text-xl shrink-0">
                          {item.emoji}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Round Victory Celebration Modal */}
          <AnimatePresence>
            {isMatchWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center max-w-lg mx-auto space-y-4 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-rose-200/40 rounded-full blur-xl pointer-events-none" />

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                  👑
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                    🎉 Chiến Thắng Tuyệt Đối!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                    "Chùm cuối ra tay, thổi bay bài tập!"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Bạn đã xuất sắc chinh phục toàn bộ các đợt nối từ vựng ({vocabList.length} từ) trong{' '}
                    <span className="font-bold text-[#C23320] font-mono">{matchTimer}s</span> với{' '}
                    <span className="font-bold text-[#C23320] font-mono">{matchMoves} lượt</span>!
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-amber-500 py-1">
                  <Star className="w-6 h-6 fill-amber-400" />
                  <Star className="w-8 h-8 fill-amber-400 -mt-2" />
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => startNewMatchRound(0)}
                    className="flex-1 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Luyện Tập Lại Từ Đầu</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ================= 2. MEMORY MATCHING ARENA ================= */}
      {activeSubMode === 'memory' && (
        <div className="space-y-4">
          {/* Game Bar: Options & Stats */}
          <div className="bg-white p-4 rounded-3xl border border-[#F0E8DD] shadow-xs flex flex-wrap items-center justify-between gap-3">
            {/* Pair Type Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-2xl">
              <button
                onClick={() => setPairMode('en_vi')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pairMode === 'en_vi' ? 'bg-white text-[#C23320] shadow-xs' : 'text-slate-600'
                }`}
              >
                Tiếng Anh ↔ Tiếng Việt
              </button>
              <button
                onClick={() => setPairMode('en_img')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  pairMode === 'en_img' ? 'bg-white text-[#C23320] shadow-xs' : 'text-slate-600'
                }`}
              >
                Tiếng Anh ↔ Tranh/Emoji
              </button>
            </div>

            {/* Difficulty Pills */}
            <div className="flex items-center gap-1">
              {(['easy', 'medium', 'hard'] as const).map(diff => (
                <button
                  key={diff}
                  onClick={() => setDifficulty(diff)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize transition-all cursor-pointer ${
                    difficulty === diff
                      ? 'bg-[#C23320] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {diff === 'easy' ? 'Dễ (4 cặp)' : diff === 'medium' ? 'Vừa (6 cặp)' : 'Khó (8 cặp)'}
                </button>
              ))}
            </div>

            {/* Live Stats: Timer & Moves */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                <Timer className="w-4 h-4 text-[#C23320]" />
                <span>{Math.floor(gameTimer / 60)}:{(gameTimer % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl">
                Lượt lật: <span className="font-mono text-[#C23320] font-black">{moves}</span>
              </div>
              <button
                onClick={startNewMemoryGame}
                className="p-2 rounded-xl bg-[#FFF5F3] hover:bg-[#FEE2E2] text-[#C23320] transition-transform active:scale-95 cursor-pointer"
                title="Trộn lại ván mới"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div
            className={`grid gap-3 ${
              difficulty === 'easy'
                ? 'grid-cols-2 sm:grid-cols-4'
                : difficulty === 'medium'
                ? 'grid-cols-3 sm:grid-cols-4'
                : 'grid-cols-4 sm:grid-cols-4'
            }`}
          >
            {cards.map((card, index) => {
              const isFlipped = card.isFlipped || card.isMatched;

              return (
                <div
                  key={card.id}
                  id={`memory-card-${index}`}
                  onClick={() => handleCardClick(index)}
                  className="perspective-[1000px] h-32 sm:h-36 cursor-pointer select-none"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.45, ease: 'easeInOut' }}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="w-full h-full relative rounded-3xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* CARD BACK (Hidden Face) */}
                    <div
                      style={{ backfaceVisibility: 'hidden' }}
                      className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#C23320] via-[#D34533] to-[#991B1B] rounded-3xl border-2 border-[#E07A6D] flex flex-col items-center justify-center text-white p-3"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-xl font-black mb-1">
                        ?
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-rose-100">Vocab Memory</span>
                    </div>

                    {/* CARD FRONT (Revealed Face) */}
                    <div
                      style={{
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                      className={`absolute inset-0 w-full h-full rounded-3xl border-2 p-3 flex flex-col items-center justify-center text-center transition-colors ${
                        card.isMatched
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-inner'
                          : 'bg-white border-[#C23320]/40 text-slate-800'
                      }`}
                    >
                      {card.type === 'img' ? (
                        <>
                          <div className="text-4xl mb-1">{card.content}</div>
                          <div className="text-[11px] font-extrabold text-slate-700">{card.subText}</div>
                        </>
                      ) : (
                        <>
                          <div className="font-extrabold text-xs sm:text-sm tracking-tight leading-tight line-clamp-2">
                            {card.content}
                          </div>
                          {card.subText && (
                            <div className="text-[10px] text-slate-400 font-mono mt-1">{card.subText}</div>
                          )}
                        </>
                      )}

                      {card.isMatched && (
                        <div className="absolute top-2 right-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Victory Modal Overlay */}
          <AnimatePresence>
            {isGameWon && (
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="bg-white p-6 md:p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center max-w-lg mx-auto space-y-4 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-28 h-28 bg-amber-200/40 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-28 h-28 bg-rose-200/40 rounded-full blur-xl pointer-events-none" />

                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                  🃏
                </div>

                <div className="space-y-1">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                    🎉 Thần Trí Nhớ!
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                    "Chùm cuối ra tay, thổi bay bài tập!"
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium">
                    Bạn đã ghép đúng tất cả các cặp thẻ trong{' '}
                    <span className="font-bold text-[#C23320] font-mono">{gameTimer}s</span> với{' '}
                    <span className="font-bold text-[#C23320] font-mono">{moves} lượt</span> lật!
                  </p>
                </div>

                <div className="flex items-center justify-center gap-2 text-amber-500 py-1">
                  <Star className="w-6 h-6 fill-amber-400" />
                  <Star className="w-8 h-8 fill-amber-400 -mt-2" />
                  <Star className="w-6 h-6 fill-amber-400" />
                </div>

                <button
                  onClick={startNewMemoryGame}
                  className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Chơi Lại Ván Mới</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
