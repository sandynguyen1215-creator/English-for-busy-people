import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, CheckCircle2, ArrowRight, RotateCcw, 
  Lightbulb, MoveHorizontal, ChevronLeft, ChevronRight,
  HelpCircle, Volume2, Tv
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ErrorCatchExercise, UnscrambleExercise } from '../types';
import { playCorrectSound, playWrongSound, playPunchSound, playVictorySound } from '../utils/audio';
import { SpeakButton } from './SpeakButton';

interface GrammarPracticeTabProps {
  errorCatchExercises: ErrorCatchExercise[];
  unscrambleExercises: UnscrambleExercise[];
  unitNum: number;
  onAddScore: (pts: number) => void;
  onIncrementStreak: () => void;
  onResetStreak: () => void;
  onUnlockBadge: (badgeId: string) => void;
  onOpenSlideMode?: () => void;
  streak: number;
}

export const GrammarPracticeTab: React.FC<GrammarPracticeTabProps> = ({
  errorCatchExercises,
  unscrambleExercises,
  unitNum,
  onAddScore,
  onIncrementStreak,
  onResetStreak,
  onUnlockBadge,
  onOpenSlideMode,
  streak
}) => {
  const [activeDrill, setActiveDrill] = useState<'error_catch' | 'unscramble' | 'collocation_sort'>('error_catch');

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

  // ================= 1. INTERACTIVE ERROR CATCHING STATE =================
  const [currentErrorIdx, setCurrentErrorIdx] = useState(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);
  const [errorFeedback, setErrorFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isErrorCompleted, setIsErrorCompleted] = useState(false);

  useEffect(() => {
    setCurrentErrorIdx(0);
    setSelectedWordIdx(null);
    setErrorFeedback('idle');
    setIsErrorCompleted(false);
  }, [errorCatchExercises]);

  const errorList = errorCatchExercises && errorCatchExercises.length > 0 ? errorCatchExercises : [];
  const currentErrorQ = errorList[currentErrorIdx] || {
    id: 1,
    sentence: ['I', 'likes', 'reading'],
    errorIndex: 1,
    correction: 'like',
    explanation: 'Chủ ngữ I đi với động từ nguyên mẫu',
    fullCorrectSentence: 'I like reading'
  };

  const handleSelectWord = (wordIndex: number) => {
    if (errorFeedback !== 'idle' || isErrorCompleted) return;
    setSelectedWordIdx(wordIndex);

    if (wordIndex === currentErrorQ.errorIndex) {
      playCorrectSound();
      playPunchSound();
      setErrorFeedback('correct');
      onAddScore(30);
      onIncrementStreak();
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });

      setTimeout(() => {
        setErrorFeedback('idle');
        setSelectedWordIdx(null);
        if (currentErrorIdx < errorList.length - 1) {
          setCurrentErrorIdx(prev => prev + 1);
        } else {
          setIsErrorCompleted(true);
          playVictorySound();
          triggerGrandFireworks();
          onUnlockBadge('grammar_guru');
          onAddScore(100);
        }
      }, 1400);
    } else {
      playWrongSound();
      setErrorFeedback('wrong');
      onResetStreak();
      setTimeout(() => {
        setErrorFeedback('idle');
        setSelectedWordIdx(null);
      }, 1000);
    }
  };

  // ================= 2. SENTENCE UNSCRAMBLE STATE & DRAG/REORDER =================
  const [currentUnscrambleIdx, setCurrentUnscrambleIdx] = useState(0);
  const [isUnscrambleCompleted, setIsUnscrambleCompleted] = useState(false);
  const unscrambleList = unscrambleExercises && unscrambleExercises.length > 0 ? unscrambleExercises : [];
  const currentUnscrambleQ = unscrambleList[currentUnscrambleIdx] || {
    id: 1,
    scrambledWords: ['reading', 'I', 'books', 'enjoy'],
    correctSentence: 'I enjoy reading books.',
    meaningVi: 'Tôi thích đọc sách.',
    hintStructure: 'S + V + O'
  };

  useEffect(() => {
    setCurrentUnscrambleIdx(0);
    setIsUnscrambleCompleted(false);
  }, [unscrambleExercises]);

  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>(
    () => [...currentUnscrambleQ.scrambledWords].sort(() => Math.random() - 0.5)
  );
  const [unscrambleFeedback, setUnscrambleFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [draggedFrom, setDraggedFrom] = useState<{ source: 'placed' | 'available'; index: number } | null>(null);
  const [dragOverPlacedIdx, setDragOverPlacedIdx] = useState<number | null>(null);

  // Sync state when current question changes
  useEffect(() => {
    setPlacedWords([]);
    setAvailableWords([...currentUnscrambleQ.scrambledWords].sort(() => Math.random() - 0.5));
    setUnscrambleFeedback('idle');
    setShowHint(false);
  }, [currentUnscrambleIdx, unscrambleExercises]);

  const handleAddWordToSentence = (word: string, indexInAvailable: number, targetInsertIndex?: number) => {
    if (unscrambleFeedback === 'correct') return;
    if (typeof targetInsertIndex === 'number' && targetInsertIndex >= 0) {
      setPlacedWords(prev => {
        const next = [...prev];
        next.splice(targetInsertIndex, 0, word);
        return next;
      });
    } else {
      setPlacedWords(prev => [...prev, word]);
    }
    setAvailableWords(prev => prev.filter((_, idx) => idx !== indexInAvailable));
  };

  const handleRemoveWordFromSentence = (word: string, indexInPlaced: number) => {
    if (unscrambleFeedback === 'correct') return;
    setPlacedWords(prev => prev.filter((_, idx) => idx !== indexInPlaced));
    setAvailableWords(prev => [...prev, word]);
  };

  // Move a placed word to the left or right
  const handleShiftPlacedWord = (fromIdx: number, direction: 'left' | 'right') => {
    const toIdx = direction === 'left' ? fromIdx - 1 : fromIdx + 1;
    if (toIdx < 0 || toIdx >= placedWords.length) return;

    setPlacedWords(prev => {
      const next = [...prev];
      const temp = next[fromIdx];
      next[fromIdx] = next[toIdx];
      next[toIdx] = temp;
      return next;
    });
  };

  // Drag & Drop handlers
  const handleDragStartPlaced = (e: React.DragEvent, index: number) => {
    setDraggedFrom({ source: 'placed', index });
    e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'placed', index }));
  };

  const handleDragStartAvailable = (e: React.DragEvent, index: number) => {
    setDraggedFrom({ source: 'available', index });
    e.dataTransfer.setData('text/plain', JSON.stringify({ source: 'available', index }));
  };

  const handleDragOver = (e: React.DragEvent, targetIdx?: number) => {
    e.preventDefault();
    if (typeof targetIdx === 'number') {
      setDragOverPlacedIdx(targetIdx);
    }
  };

  const handleDropOnPlaced = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    setDragOverPlacedIdx(null);
    if (!draggedFrom) return;

    if (draggedFrom.source === 'placed') {
      const sourceIdx = draggedFrom.index;
      if (sourceIdx === targetIdx) return;
      setPlacedWords(prev => {
        const next = [...prev];
        const [movedItem] = next.splice(sourceIdx, 1);
        next.splice(targetIdx, 0, movedItem);
        return next;
      });
    } else if (draggedFrom.source === 'available') {
      const sourceIdx = draggedFrom.index;
      const word = availableWords[sourceIdx];
      if (word) {
        handleAddWordToSentence(word, sourceIdx, targetIdx);
      }
    }
    setDraggedFrom(null);
  };

  const handleDropOnZone = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOverPlacedIdx(null);
    if (!draggedFrom) return;

    if (draggedFrom.source === 'available') {
      const sourceIdx = draggedFrom.index;
      const word = availableWords[sourceIdx];
      if (word) {
        handleAddWordToSentence(word, sourceIdx);
      }
    }
    setDraggedFrom(null);
  };

  // Normalized sentence comparison helper
  const normalizeSentence = (str: string) => {
    return str
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[.,?!]/g, '');
  };

  const checkUnscrambleAnswer = () => {
    if (isUnscrambleCompleted) return;
    const formedSentence = placedWords.join(' ');
    const normalizedFormed = normalizeSentence(formedSentence);
    const normalizedCorrect = normalizeSentence(currentUnscrambleQ.correctSentence);
    const isAccepted = currentUnscrambleQ.acceptedSentences?.some(
      s => normalizeSentence(s) === normalizedFormed
    );

    const isMatch = (normalizedFormed === normalizedCorrect) || Boolean(isAccepted) || (formedSentence === currentUnscrambleQ.correctSentence);

    if (isMatch) {
      playCorrectSound();
      playPunchSound();
      setUnscrambleFeedback('correct');
      onAddScore(35);
      onIncrementStreak();
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });

      setTimeout(() => {
        if (currentUnscrambleIdx < unscrambleExercises.length - 1) {
          setCurrentUnscrambleIdx(prev => prev + 1);
        } else {
          setIsUnscrambleCompleted(true);
          playVictorySound();
          triggerGrandFireworks();
          onUnlockBadge('sentence_architect');
          onAddScore(120);
        }
      }, 1500);
    } else {
      playWrongSound();
      setUnscrambleFeedback('wrong');
      setShowHint(true);
      onResetStreak();
      setTimeout(() => {
        if (unscrambleFeedback !== 'correct') {
          setUnscrambleFeedback('idle');
        }
      }, 1200);
    }
  };

  // Smart Hint: Suggest / auto-place the next correct word
  const handleApplyNextWordHint = () => {
    const targetWords = currentUnscrambleQ.correctSentence.split(' ');
    
    // Find the first index where placed words differ from the target sentence
    let targetWordNeeded = '';
    let targetSlot = 0;

    for (let i = 0; i < targetWords.length; i++) {
      const targetNorm = normalizeSentence(targetWords[i]);
      const currentPlacedNorm = placedWords[i] ? normalizeSentence(placedWords[i]) : '';

      if (currentPlacedNorm !== targetNorm) {
        targetWordNeeded = targetWords[i];
        targetSlot = i;
        break;
      }
    }

    if (!targetWordNeeded) return;

    // Find the matching word in availableWords or placedWords
    const availableIndex = availableWords.findIndex(w => normalizeSentence(w) === normalizeSentence(targetWordNeeded));

    if (availableIndex !== -1) {
      const matchedWord = availableWords[availableIndex];
      handleAddWordToSentence(matchedWord, availableIndex, targetSlot);
    } else {
      // It might be currently placed in the wrong position
      const currentPlacedIndex = placedWords.findIndex(w => normalizeSentence(w) === normalizeSentence(targetWordNeeded));
      if (currentPlacedIndex !== -1 && currentPlacedIndex !== targetSlot) {
        setPlacedWords(prev => {
          const next = [...prev];
          const [movedItem] = next.splice(currentPlacedIndex, 1);
          next.splice(targetSlot, 0, movedItem);
          return next;
        });
      }
    }

    setShowHint(true);
    playCorrectSound();
  };

  // Helper to check if a placed word at index matches correct sequence
  const isWordAtCorrectPosition = (idx: number) => {
    const targetWords = currentUnscrambleQ.correctSentence.split(' ');
    if (!placedWords[idx] || !targetWords[idx]) return false;
    return normalizeSentence(placedWords[idx]) === normalizeSentence(targetWords[idx]);
  };

  // ================= 3. RAPID SORT / DRILL ALIGNED 100% TO ENGLISH AT WORK =================
  // UNIT 1: Episodes 1 - 5 (Interview, Suggestions Why don't you try + V-ing, Polite requests Could you / Would you mind, Lunch invites, Office etiquette)
  const unit1VerbFormsDrill = [
    { 
      prompt: "Why don't you try ______ in your recycle bin?", 
      correctChoice: 'looking', 
      fullPhrase: "Why don't you try looking in your recycle bin?", 
      options: ['look', 'looking', 'to look'] 
    },
    { 
      prompt: "Could you possibly ______ me with the scanner please?", 
      correctChoice: 'help', 
      fullPhrase: "Could you possibly help me with the scanner please?", 
      options: ['help', 'helping', 'to help'] 
    },
    { 
      prompt: "Would you mind ______ me where the spare paper is kept?", 
      correctChoice: 'showing', 
      fullPhrase: "Would you mind showing me where the spare paper is kept?", 
      options: ['show', 'showing', 'to show'] 
    },
    { 
      prompt: "Shall we ______ lunch sometime this week to celebrate?", 
      correctChoice: 'do', 
      fullPhrase: "Shall we do lunch sometime this week to celebrate?", 
      options: ['do', 'doing', 'to do'] 
    },
    { 
      prompt: "I am particularly proud of ______ the finances on a small budget.", 
      correctChoice: 'organising', 
      fullPhrase: "I am particularly proud of organising the finances on a small budget.", 
      options: ['organise', 'organising', 'to organise'] 
    },
    { 
      prompt: "Perhaps you could ______ IT support to restore the file.", 
      correctChoice: 'call', 
      fullPhrase: "Perhaps you could call IT support to restore the file.", 
      options: ['call', 'calling', 'to call'] 
    },
    { 
      prompt: "A good example that comes to mind is ______ the debating team.", 
      correctChoice: 'leading', 
      fullPhrase: "A good example that comes to mind is leading the debating team.", 
      options: ['lead', 'leading', 'to lead'] 
    },
    { 
      prompt: "Why don't you try ______ your computer before panicking?", 
      correctChoice: 'restarting', 
      fullPhrase: "Why don't you try restarting your computer before panicking?", 
      options: ['restart', 'restarting', 'to restart'] 
    },
    { 
      prompt: "Would you mind ______ these presentation slides for me?", 
      correctChoice: 'printing', 
      fullPhrase: "Would you mind printing these presentation slides for me?", 
      options: ['print', 'printing', 'to print'] 
    },
    { 
      prompt: "Could you possibly ______ this sales report to Paul today?", 
      correctChoice: 'send', 
      fullPhrase: "Could you possibly send this sales report to Paul today?", 
      options: ['send', 'sending', 'to send'] 
    },
    { 
      prompt: "Timekeeping is essential; I always aim ______ tasks on schedule.", 
      correctChoice: 'to deliver', 
      fullPhrase: "Timekeeping is essential; I always aim to deliver tasks on schedule.", 
      options: ['deliver', 'delivering', 'to deliver'] 
    },
    { 
      prompt: "How about ______ for a quick coffee break after the meeting?", 
      correctChoice: 'going', 
      fullPhrase: "How about going for a quick coffee break after the meeting?", 
      options: ['go', 'going', 'to go'] 
    },
    { 
      prompt: "You should avoid ______ like the Queen of Sheba at work.", 
      correctChoice: 'acting', 
      fullPhrase: "You should avoid acting like the Queen of Sheba at work.", 
      options: ['act', 'acting', 'to act'] 
    },
    { 
      prompt: "In an interview, you need ______ yourself with confidence.", 
      correctChoice: 'to sell', 
      fullPhrase: "In an interview, you need to sell yourself with confidence.", 
      options: ['sell', 'selling', 'to sell'] 
    }
  ];

  // UNIT 2: Episodes 6 - 10 (Double-booked, Customer Service Apologies, Clarifying stock, Polite disagreement)
  const unit2BusinessDrill = [
    { prompt: "Can I give you a ______ with your coat, Mr Lime?", correctChoice: 'hand', fullPhrase: "Can I give you a hand with your coat, Mr Lime?", options: ['hand', 'word', 'point', 'shout'] },
    { prompt: "Give me a ______ if you need any extra help!", correctChoice: 'shout', fullPhrase: "Give me a shout if you need any extra help!", options: ['hand', 'word', 'point', 'shout'] },
    { prompt: "You have my ______ that we will sort this problem out today.", correctChoice: 'word', fullPhrase: "You have my word that we will sort this problem out today.", options: ['hand', 'word', 'point', 'shout'] },
    { prompt: "I see your ______, but actually I think discounts boost sales.", correctChoice: 'point', fullPhrase: "I see your point, but actually I think discounts boost sales.", options: ['hand', 'word', 'point', 'shout'] },
    { prompt: "We will send extra fruit to make ______ for the inconvenience.", correctChoice: 'up', fullPhrase: "We will send extra fruit to make up for the inconvenience.", options: ['up', 'out', 'off', 'in'] },
    { prompt: "Just to be ______ clear, you sent soft mangos, not plastic ones?", correctChoice: 'absolutely', fullPhrase: "Just to be absolutely clear, you sent soft mangos, not plastic ones?", options: ['absolutely', 'really', 'hardly', 'nearly'] },
    { prompt: "That must have been very ______ for your business.", correctChoice: 'inconvenient', fullPhrase: "That must have been very inconvenient for your business.", options: ['inconvenient', 'convenient', 'pleased', 'excited'] },
    { prompt: "Could you possibly ______ what went out in today's delivery?", correctChoice: 'clarify', fullPhrase: "Could you possibly clarify what went out in today's delivery?", options: ['clarify', 'clarification', 'clarified', 'clarifying'] }
  ];

  // UNIT 3: Episodes 11 - 15 (Pitching Imperial Lemon, Signposting, Telephone skills)
  const unit3PitchingDrill = [
    { prompt: "Today I am going to ______ our revolutionary Imperial Lemon.", correctChoice: 'present', fullPhrase: "Today I am going to present our revolutionary Imperial Lemon.", options: ['present', 'presenting', 'presence', 'presentation'] },
    { prompt: "I will start ______ introducing our core company values.", correctChoice: 'by', fullPhrase: "I will start by introducing our core company values.", options: ['by', 'with', 'on', 'to'] },
    { prompt: "Now let's move ______ to discuss our market pricing strategy.", correctChoice: 'on', fullPhrase: "Now let's move on to discuss our market pricing strategy.", options: ['on', 'in', 'up', 'off'] },
    { prompt: "Tip Top Trading, Anna ______. How can I help you today?", correctChoice: 'speaking', fullPhrase: "Tip Top Trading, Anna speaking. How can I help you today?", options: ['speaking', 'speaks', 'spoken', 'speech'] },
    { prompt: "I am really sorry, he is not ______ at the moment.", correctChoice: 'available', fullPhrase: "I am really sorry, he is not available at the moment.", options: ['available', 'availability', 'avail', 'availing'] },
    { prompt: "Can I ______ a message for him, please?", correctChoice: 'take', fullPhrase: "Can I take a message for him, please?", options: ['take', 'make', 'do', 'give'] },
    { prompt: "Hold the line please, I will put you ______ to the sales team.", correctChoice: 'through', fullPhrase: "Hold the line please, I will put you through to the sales team.", options: ['through', 'out', 'on', 'over'] },
    { prompt: "Our company has a strong track ______ of reliability.", correctChoice: 'record', fullPhrase: "Our company has a strong track record of reliability.", options: ['record', 'road', 'track', 'route'] }
  ];

  // UNIT 4: Episodes 16 - 20 (Refusing, Placing orders, Business email, Meeting agenda)
  const unit4OfficeDrill = [
    { prompt: "I am afraid it is ______ company policy to accept personal gifts.", correctChoice: 'against', fullPhrase: "I am afraid it is against company policy to accept personal gifts.", options: ['against', 'for', 'with', 'under'] },
    { prompt: "We would like to ______ an order for 500 luxury fruit boxes.", correctChoice: 'place', fullPhrase: "We would like to place an order for 500 luxury fruit boxes.", options: ['place', 'make', 'do', 'take'] },
    { prompt: "I am writing ______ your inquiry about delivery dates.", correctChoice: 'regarding', fullPhrase: "I am writing regarding your inquiry about delivery dates.", options: ['regarding', 'regard', 'regards', 'regarded'] },
    { prompt: "Please find ______ the updated price list for Q3.", correctChoice: 'attached', fullPhrase: "Please find attached the updated price list for Q3.", options: ['attached', 'attaching', 'attach', 'attachment'] },
    { prompt: "There are four items on the ______ for this morning's meeting.", correctChoice: 'agenda', fullPhrase: "There are four items on the agenda for this morning's meeting.", options: ['agenda', 'calendar', 'schedule', 'diary'] },
    { prompt: "Before we finish, is there any other ______ (AOB)?", correctChoice: 'business', fullPhrase: "Before we finish, is there any other business (AOB)?", options: ['business', 'matter', 'problem', 'topic'] },
    { prompt: "With ______, I have to say no to non-business lunches.", correctChoice: 'regret', fullPhrase: "With regret, I have to say no to non-business lunches.", options: ['regret', 'sorry', 'pity', 'shame'] },
    { prompt: "Let's ______ up the discussion and return to work.", correctChoice: 'wrap', fullPhrase: "Let's wrap up the discussion and return to work.", options: ['wrap', 'pack', 'shut', 'close'] }
  ];

  // UNIT 5: Episodes 21 - 25 (Advice, Safety compliance, Evacuation, Hotel booking)
  const unit5SafetyHotelDrill = [
    { prompt: "I would be most ______ if you could give me some advice.", correctChoice: 'grateful', fullPhrase: "I would be most grateful if you could give me some advice.", options: ['grateful', 'gratefully', 'gratitude', 'great'] },
    { prompt: "Smoking is strictly not ______ on company premises.", correctChoice: 'permitted', fullPhrase: "Smoking is strictly not permitted on company premises.", options: ['permitted', 'permitting', 'permission', 'permit'] },
    { prompt: "Please ______ your cigarette immediately in the ashtray.", correctChoice: 'extinguish', fullPhrase: "Please extinguish your cigarette immediately in the ashtray.", options: ['extinguish', 'turn off', 'shut down', 'stop'] },
    { prompt: "In case of emergency, please ______ the alarm immediately.", correctChoice: 'raise', fullPhrase: "In case of emergency, please raise the alarm immediately.", options: ['raise', 'rise', 'lift', 'put'] },
    { prompt: "Please use the ______ and do not take the lift during an evacuation.", correctChoice: 'stairs', fullPhrase: "Please use the stairs and do not take the lift during an evacuation.", options: ['stairs', 'escalator', 'window', 'roof'] },
    { prompt: "All staff must gather at the fire ______ point outside.", correctChoice: 'assembly', fullPhrase: "All staff must gather at the fire assembly point outside.", options: ['assembly', 'meeting', 'station', 'group'] },
    { prompt: "I would like to check room ______ for next Wednesday night.", correctChoice: 'availability', fullPhrase: "I would like to check room availability for next Wednesday night.", options: ['availability', 'available', 'avail', 'avails'] },
    { prompt: "Does the corporate room rate ______ complimentary breakfast?", correctChoice: 'include', fullPhrase: "Does the corporate room rate include complimentary breakfast?", options: ['include', 'including', 'includes', 'inclusion'] }
  ];

  // UNIT 6: Episodes 26 - 30 (Hotel complaints, Gloomy outlook, Professionalism, Negotiation)
  const unit6NegotiationDrill = [
    { prompt: "I am very ______ with the hotel service; it did not meet expectations.", correctChoice: 'disappointed', fullPhrase: "I am very disappointed with the hotel service; it did not meet expectations.", options: ['disappointed', 'disappointing', 'disappoint', 'disappointment'] },
    { prompt: "We request a full ______ for the unusable executive suite.", correctChoice: 'refund', fullPhrase: "We request a full refund for the unusable executive suite.", options: ['refund', 'return', 'rebate', 'receipt'] },
    { prompt: "I have got to give it to you ______: our sales outlook is gloomy.", correctChoice: 'straight', fullPhrase: "I have got to give it to you straight: our sales outlook is gloomy.", options: ['straight', 'direct', 'honest', 'flat'] },
    { prompt: "The economic outlook for next quarter looks quite ______. ", correctChoice: 'gloomy', fullPhrase: "The economic outlook for next quarter looks quite gloomy.", options: ['gloomy', 'bright', 'sunny', 'clear'] },
    { prompt: "Can we keep our conversation ______ please during work hours?", correctChoice: 'professional', fullPhrase: "Can we keep our conversation professional please during work hours?", options: ['professional', 'profession', 'professionally', 'professor'] },
    { prompt: "What price are you ______ to pay for an order of 1,000 units?", correctChoice: 'willing', fullPhrase: "What price are you willing to pay for an order of 1,000 units?", options: ['willing', 'wish', 'want', 'will'] },
    { prompt: "That is too low for us; let's meet ______ way at $8.50 per box.", correctChoice: 'half', fullPhrase: "That is too low for us; let's meet half way at $8.50 per box.", options: ['half', 'mid', 'center', 'part'] },
    { prompt: "If we agree on free shipping, we can ______ the deal today.", correctChoice: 'seal', fullPhrase: "If we agree on free shipping, we can seal the deal today.", options: ['seal', 'lock', 'close', 'shut'] }
  ];

  const activeQuickDrills = unitNum === 6 ? unit6NegotiationDrill : unitNum === 5 ? unit5SafetyHotelDrill : unitNum === 4 ? unit4OfficeDrill : unitNum === 3 ? unit3PitchingDrill : unitNum === 2 ? unit2BusinessDrill : unit1VerbFormsDrill;
  const [currentCollocIdx, setCurrentCollocIdx] = useState(0);
  const [collocFeedback, setCollocFeedback] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [isCollocCompleted, setIsCollocCompleted] = useState(false);

  useEffect(() => {
    setCurrentCollocIdx(0);
    setIsCollocCompleted(false);
  }, [unitNum]);

  const currentColloc = activeQuickDrills[currentCollocIdx] || activeQuickDrills[0];

  const handleCollocChoice = (chosen: string) => {
    if (collocFeedback !== 'idle' || isCollocCompleted) return;

    if (chosen.toLowerCase() === currentColloc.correctChoice.toLowerCase()) {
      playCorrectSound();
      playPunchSound();
      setCollocFeedback('correct');
      onAddScore(20);
      onIncrementStreak();

      setTimeout(() => {
        setCollocFeedback('idle');
        if (currentCollocIdx < activeQuickDrills.length - 1) {
          setCurrentCollocIdx(prev => prev + 1);
        } else {
          setIsCollocCompleted(true);
          playVictorySound();
          triggerGrandFireworks();
          onUnlockBadge('grammar_guru');
          onAddScore(100);
        }
      }, 900);
    } else {
      playWrongSound();
      setCollocFeedback('wrong');
      onResetStreak();
      setTimeout(() => setCollocFeedback('idle'), 800);
    }
  };

  return (
    <div id="grammar-practice-tab" className="space-y-6 max-w-5xl mx-auto">
      {/* Submode Selector */}
      <div className="bg-white p-2 rounded-3xl border border-[#F0E8DD] shadow-xs flex flex-wrap sm:flex-nowrap items-center justify-between gap-1.5 overflow-x-auto">
        <button
          id="drill-error-btn"
          onClick={() => setActiveDrill('error_catch')}
          className={`flex-1 py-3 px-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeDrill === 'error_catch'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <span>🎯</span>
          <span>1. Bắt Lỗi Sai Ngữ Pháp</span>
        </button>

        <button
          id="drill-unscramble-btn"
          onClick={() => setActiveDrill('unscramble')}
          className={`flex-1 py-3 px-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeDrill === 'unscramble'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <span>🧩</span>
          <span>2. Sắp Xếp Ghép Câu Hoàn Chỉnh</span>
        </button>

        <button
          id="drill-colloc-btn"
          onClick={() => setActiveDrill('collocation_sort')}
          className={`flex-1 py-3 px-3 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-1.5 whitespace-nowrap transition-all cursor-pointer ${
            activeDrill === 'collocation_sort'
              ? 'bg-[#C23320] text-white shadow-md shadow-[#C23320]/20'
              : 'text-slate-600 hover:bg-[#FFF5F3]'
          }`}
        >
          <span>⚡</span>
          <span>
            {unitNum === 6 ? '3. Phản Xạ Đàm Phán & Tác Phong' : unitNum === 5 ? '3. Phản Xạ An Toàn & Đặt Phòng' : unitNum === 4 ? '3. Phản Xạ Đặt Hàng & Email' : unitNum === 3 ? '3. Phản Xạ Pitching & Điện Thoại' : unitNum === 2 ? '3. Phản Xạ Xử Lý & Cam Kết' : '3. Phản Xạ Mẫu Câu & Động Từ'}
          </span>
        </button>

        {onOpenSlideMode && (
          <button
            id="grammar-practice-presentation-btn"
            onClick={onOpenSlideMode}
            className="py-3 px-4 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:scale-102 active:scale-98 shrink-0"
            title="Trình chiếu Slide bài tập bắt lỗi & cấu trúc câu"
          >
            <Tv className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">Trình Chiếu</span> Bài Tập
          </button>
        )}
      </div>

      {/* ================= 1. INTERACTIVE ERROR CATCH DRILL ================= */}
      {activeDrill === 'error_catch' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F0E8DD] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C23320] bg-[#FFF5F3] px-2.5 py-1 rounded-full">
                Thử thách Bắt Lỗi Sai
              </span>
              <h3 className="text-lg font-black text-slate-800 mt-1">
                Chạm trực tiếp vào từ viết SAI ngữ pháp để sửa
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <SpeakButton 
                text={currentErrorQ.sentenceWords.join(' ')} 
                variant="pill" 
                label="Nghe câu"
                autoSpeak={true}
              />
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentErrorIdx + 1} / {errorCatchExercises.length}
              </span>
            </div>
          </div>

          <div className="py-6 max-w-2xl mx-auto text-center space-y-6">
            <p className="text-xs text-slate-500 font-medium">
              👉 Hãy đọc kỹ câu bên dưới và nhấp chọn từ mà bạn cho rằng bị sai ngữ pháp:
            </p>

            {/* Interactive Sentence Words */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-6 bg-slate-50 border border-slate-200 rounded-3xl">
              {currentErrorQ.sentenceWords.map((word, wIdx) => {
                const isSelected = selectedWordIdx === wIdx;
                const isTheError = currentErrorQ.errorIndex === wIdx;

                let btnStyle = 'bg-white hover:bg-rose-50 text-slate-800 border-slate-200 shadow-2xs';
                if (isSelected) {
                  if (errorFeedback === 'correct' && isTheError) {
                    btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md animate-bounce';
                  } else if (errorFeedback === 'wrong') {
                    btnStyle = 'bg-[#C23320] text-white border-rose-600 shadow-md animate-shake';
                  }
                }

                return (
                  <button
                    key={wIdx}
                    id={`error-word-btn-${wIdx}`}
                    onClick={() => handleSelectWord(wIdx)}
                    className={`px-4 py-2.5 rounded-2xl text-base md:text-lg font-extrabold border-2 transition-all hover:scale-105 active:scale-95 cursor-pointer ${btnStyle}`}
                  >
                    {word}
                  </button>
                );
              })}
            </div>

            {/* Feedback / Explanation Box */}
            <AnimatePresence>
              {errorFeedback === 'correct' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-900 text-xs md:text-sm font-semibold space-y-1 text-left"
                >
                  <div className="flex items-center gap-2 font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Chính xác! Sửa lại thành: <strong className="text-emerald-950 underline font-mono text-base">"{currentErrorQ.correctWord}"</strong></span>
                  </div>
                  <p className="text-slate-600">{currentErrorQ.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Catch Victory Modal */}
            <AnimatePresence>
              {isErrorCompleted && (
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
                      🎉 Bắt Lỗi Siêu Đẳng!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                      "Chùm cuối ra tay, thổi bay bài tập!"
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Bạn đã hoàn thành chính xác toàn bộ {errorList.length} câu bắt lỗi ngữ pháp!
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsErrorCompleted(false);
                      setCurrentErrorIdx(0);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Luyện Tập Lại Từ Đầu</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ================= 2. SENTENCE UNSCRAMBLER DRILL (DRAG & DROP + REORDER + HINT) ================= */}
      {activeDrill === 'unscramble' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F0E8DD] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C23320] bg-[#FFF5F3] px-2.5 py-1 rounded-full">
                Thử thách Exercise 4
              </span>
              <h3 className="text-lg font-black text-slate-800 mt-1">
                Sắp xếp các từ lộn xộn thành câu hoàn chỉnh
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <SpeakButton 
                text={currentUnscrambleQ.correctSentence} 
                variant="pill" 
                label="Nghe mẫu"
                title="Nghe câu hoàn chỉnh chuẩn"
              />
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentUnscrambleIdx + 1} / {unscrambleExercises.length}
              </span>
            </div>
          </div>

          <div className="py-4 space-y-5 max-w-2xl mx-auto">
            {/* Vietnamese Meaning Hint */}
            <div className="bg-amber-50 border border-amber-200/80 p-4 rounded-2xl text-center space-y-1">
              <span className="text-xs font-bold text-amber-700 block">Nghĩa tiếng Việt của câu cần ghép:</span>
              <p className="text-sm md:text-base font-black text-slate-800">
                "{currentUnscrambleQ.meaningVi}"
              </p>
            </div>

            {/* Instruction tooltip */}
            <div className="flex items-center justify-between text-xs text-slate-500 px-1">
              <span className="flex items-center gap-1">
                <MoveHorizontal className="w-3.5 h-3.5 text-[#C23320]" />
                <span>Kéo thả hoặc dùng nút mũi tên <strong>← →</strong> để di chuyển vị trí từ:</span>
              </span>
              {placedWords.length > 0 && (
                <span className="text-slate-400">
                  {placedWords.length}/{currentUnscrambleQ.scrambledWords.length} từ đã ghép
                </span>
              )}
            </div>

            {/* Answer Sentence Drop Zone with Drag-and-Drop & Slot Target Highlights */}
            <div 
              onDragOver={e => handleDragOver(e)}
              onDrop={handleDropOnZone}
              className={`min-h-[84px] p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center justify-center gap-2 relative ${
                unscrambleFeedback === 'correct'
                  ? 'bg-emerald-50 border-emerald-400'
                  : unscrambleFeedback === 'wrong'
                  ? 'bg-rose-50 border-[#C23320]'
                  : 'bg-slate-50 border-dashed border-slate-300'
              }`}
            >
              {placedWords.length === 0 ? (
                <span className="text-xs text-slate-400 italic pointer-events-none">
                  Nhấp vào các từ bên dưới hoặc kéo thả trực tiếp vào đây...
                </span>
              ) : (
                placedWords.map((word, idx) => {
                  const isCorrectPos = isWordAtCorrectPosition(idx);
                  const isDragTarget = dragOverPlacedIdx === idx;

                  return (
                    <div
                      key={`${word}-${idx}`}
                      draggable
                      onDragStart={e => handleDragStartPlaced(e, idx)}
                      onDragOver={e => handleDragOver(e, idx)}
                      onDrop={e => handleDropOnPlaced(e, idx)}
                      className={`group relative flex items-center rounded-xl p-1 shadow-xs border transition-all cursor-move ${
                        isDragTarget ? 'ring-2 ring-[#C23320] scale-105' : ''
                      } ${
                        showHint && isCorrectPos
                          ? 'bg-emerald-500 text-white border-emerald-600'
                          : showHint && !isCorrectPos
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-[#C23320] hover:bg-[#A12A1B] text-white border-[#C23320]'
                      }`}
                    >
                      {/* Left arrow quick shift */}
                      {idx > 0 && (
                        <button
                          type="button"
                          onClick={() => handleShiftPlacedWord(idx, 'left')}
                          className="p-1 hover:bg-black/20 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                          title="Chuyển sang trái"
                        >
                          <ChevronLeft className="w-3 h-3" />
                        </button>
                      )}

                      {/* Word text */}
                      <span className="px-2 py-0.5 font-black text-xs md:text-sm select-none">
                        {word}
                      </span>

                      {/* Right arrow quick shift */}
                      {idx < placedWords.length - 1 && (
                        <button
                          type="button"
                          onClick={() => handleShiftPlacedWord(idx, 'right')}
                          className="p-1 hover:bg-black/20 rounded-lg text-white/80 hover:text-white transition-colors cursor-pointer"
                          title="Chuyển sang phải"
                        >
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}

                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveWordFromSentence(word, idx)}
                        className="ml-1 p-1 hover:bg-black/20 rounded-lg text-white/70 hover:text-white transition-colors cursor-pointer"
                        title="Gỡ từ này xuống kho từ"
                      >
                        <span className="text-xs font-bold leading-none">✕</span>
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* Hint & Structure Clue Box */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs space-y-2 text-slate-700"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-800 flex items-center gap-1.5">
                      <Lightbulb className="w-4 h-4 text-amber-500 fill-amber-500" />
                      <span>Gợi ý cấu trúc câu:</span>
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyNextWordHint}
                      className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-white font-black text-[11px] rounded-lg shadow-2xs transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1"
                    >
                      <span>✨ Đặt từ tiếp theo đúng vị trí</span>
                    </button>
                  </div>
                  <p className="font-mono text-amber-950 font-bold bg-amber-100/70 p-2 rounded-xl">
                    {currentUnscrambleQ.hintStructure || 'Hãy chú ý vị trí Chủ ngữ (S) + Trợ động từ/Động từ (V) + Tân ngữ (O).'}
                  </p>
                  <p className="text-[11px] text-amber-700">
                    💡 Thẻ màu xanh là từ đã ở vị trí đúng. Thẻ màu cam là từ cần đổi lại thứ tự!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Available Words Pool */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
                Kho từ còn lại (Nhấp hoặc kéo lên để đưa vào câu):
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2 p-3 bg-slate-50/70 rounded-2xl border border-slate-200/70 min-h-[56px]">
                {availableWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Đã dùng hết tất cả các từ trong kho!</span>
                ) : (
                  availableWords.map((word, idx) => (
                    <button
                      key={`${word}-${idx}`}
                      draggable
                      onDragStart={e => handleDragStartAvailable(e, idx)}
                      onClick={() => handleAddWordToSentence(word, idx)}
                      className="px-4 py-2 rounded-xl bg-white hover:bg-[#FFF5F3] border border-slate-200 font-extrabold text-xs md:text-sm text-slate-800 shadow-2xs hover:border-[#C23320]/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                      title="Nhấp để thêm vào câu hoặc kéo thả"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* Action Bar: Reset, Hint, Check */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
              {/* Reset */}
              <button
                type="button"
                onClick={() => {
                  setPlacedWords([]);
                  setAvailableWords([...currentUnscrambleQ.scrambledWords].sort(() => Math.random() - 0.5));
                  setShowHint(false);
                  setUnscrambleFeedback('idle');
                }}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Xếp lại từ đầu</span>
              </button>

              {/* Hint */}
              <button
                type="button"
                onClick={handleApplyNextWordHint}
                className="px-4 py-2.5 rounded-2xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-black flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
                <span>Gợi ý (Hint)</span>
              </button>

              {/* Check Answer */}
              <button
                type="button"
                onClick={checkUnscrambleAnswer}
                disabled={placedWords.length === 0}
                className="px-6 py-2.5 rounded-2xl bg-[#C23320] hover:bg-[#A12A1B] disabled:opacity-50 text-white font-black text-xs md:text-sm shadow-md shadow-[#C23320]/20 flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Kiểm tra câu</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Unscramble Victory Modal */}
            <AnimatePresence>
              {isUnscrambleCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center max-w-lg mx-auto space-y-4 relative overflow-hidden mt-4"
                >
                  <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                    🧩
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                      🎉 Bậc Thầy Cấu Trúc Câu!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                      "Chùm cuối ra tay, thổi bay bài tập!"
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Bạn đã hoàn thành chính xác toàn bộ {unscrambleExercises.length} câu sắp xếp hoàn chỉnh!
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsUnscrambleCompleted(false);
                      setCurrentUnscrambleIdx(0);
                      setPlacedWords([]);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Luyện Tập Lại Từ Đầu</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* ================= 3. RAPID QUICK CHOICE DRILL ================= */}
      {activeDrill === 'collocation_sort' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-[#F0E8DD] shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#C23320] bg-[#FFF5F3] px-2.5 py-1 rounded-full">
                Phản xạ siêu tốc
              </span>
              <h3 className="text-lg font-black text-slate-800 mt-1">
                {unitNum === 6 ? 'Chọn từ then chốt: Đàm phán & Tác phong công sở (Ep 26-30)' : unitNum === 5 ? 'Chọn từ chuẩn: An toàn lao động & Đặt phòng khách sạn (Ep 21-25)' : unitNum === 4 ? 'Chọn từ chuẩn: Đặt hàng, Email & Chủ trì cuộc họp (Ep 16-20)' : unitNum === 3 ? 'Chọn từ chuẩn: Thuyết trình Pitching & Kỹ năng gọi điện (Ep 11-15)' : unitNum === 2 ? 'Chọn từ chuẩn: Tiếp đón, Xin lỗi & Cam kết khách hàng (Ep 6-10)' : 'Chọn dạng động từ chuẩn: V-bare, V-ing hay to-V (Ep 1-5)'}
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <SpeakButton 
                text={currentColloc.fullPhrase} 
                variant="pill" 
                label="Nghe câu"
                autoSpeak={true}
              />
              <span className="text-xs font-mono font-bold text-slate-400">
                {currentCollocIdx + 1} / {activeQuickDrills.length}
              </span>
            </div>
          </div>

          <div className="py-8 max-w-lg mx-auto text-center space-y-6">
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FFF5F3] via-amber-50 to-pink-50 border-2 border-[#F0E8DD]">
              <span className="text-xs font-bold text-slate-400 block mb-1">
                {unitNum === 6 ? 'Điền từ thích hợp vào ngữ cảnh đàm phán:' : unitNum === 5 ? 'Điền từ thích hợp vào quy tắc an toàn & đặt phòng:' : unitNum === 4 ? 'Điền từ thích hợp vào mẫu thư tín & cuộc họp:' : unitNum === 3 ? 'Điền từ thích hợp vào bài thuyết trình & cuộc gọi:' : unitNum === 2 ? 'Điền từ thích hợp vào mẫu câu tiếp khách & cam kết:' : 'Chọn dạng động từ đúng điền vào câu phỏng vấn & giao tiếp:'}
              </span>
              <div className="text-xl md:text-2xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
                <span>
                  "{currentColloc.prompt}"
                </span>
              </div>
            </div>

            {/* Dynamic Quick Choice Buttons */}
            <div className={`grid gap-3 ${currentColloc.options.length === 4 ? 'grid-cols-2 sm:grid-cols-4' : 'grid-cols-3'}`}>
              {currentColloc.options.map((opt, oIdx) => {
                const colors = [
                  'bg-sky-500 hover:bg-sky-600 text-white border-sky-600',
                  'bg-emerald-500 hover:bg-emerald-600 text-white border-emerald-600',
                  'bg-amber-500 hover:bg-amber-600 text-white border-amber-600',
                  'bg-[#C23320] hover:bg-[#A12A1B] text-white border-[#A12A1B]'
                ];
                const colorClass = colors[oIdx % colors.length];

                return (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleCollocChoice(opt)}
                    className={`py-3.5 rounded-2xl font-black text-base uppercase tracking-wider border-2 shadow-sm transition-colors cursor-pointer ${colorClass}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>

            {/* Collocation Drill Victory Modal */}
            <AnimatePresence>
              {isCollocCompleted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  className="bg-white p-6 sm:p-8 rounded-3xl border-4 border-amber-400 shadow-2xl text-center max-w-lg mx-auto space-y-4 relative overflow-hidden mt-4"
                >
                  <div className="w-18 h-18 rounded-3xl bg-gradient-to-tr from-amber-500 via-rose-500 to-red-600 text-white flex items-center justify-center text-4xl mx-auto shadow-lg shadow-rose-500/30">
                    ⚡
                  </div>

                  <div className="space-y-1">
                    <span className="inline-block px-3 py-1 bg-amber-100 text-amber-900 border border-amber-300 rounded-full text-xs font-black uppercase tracking-wider">
                      🎉 Phản Xạ Thần Tốc!
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-[#C23320] leading-tight">
                      "Chùm cuối ra tay, thổi bay bài tập!"
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 font-medium">
                      Bạn đã hoàn thành chính xác toàn bộ {activeQuickDrills.length} câu phản xạ nhanh!
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsCollocCompleted(false);
                      setCurrentCollocIdx(0);
                    }}
                    className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Luyện Tập Lại Từ Đầu</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};
