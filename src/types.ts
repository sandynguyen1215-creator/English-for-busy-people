export type TabType = 
  | 'dashboard'
  | 'vocabulary'
  | 'vocab_practice'
  | 'grammar'
  | 'grammar_practice'
  | 'reading'
  | 'minigames';

export interface VocabItem {
  id: number;
  english: string;
  type: string;
  ipa: string;
  vietnamese: string;
  category: string;
  exampleEn: string;
  exampleVi: string;
  emoji: string;
  phoneticGroup?: string;
}

export interface GrammarRule {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  structures: {
    name: string;
    positive: string;
    negative: string;
    question: string;
    examples: { en: string; vi: string }[];
  }[];
  notes?: string[];
  signals?: string[];
}

export interface LikeVerb {
  rank: number;
  verb: string;
  meaning: string;
  level: 'High Positive' | 'Moderate' | 'Neutral' | 'Dislike' | 'Extreme Hate';
  color: string;
  example: string;
}

export interface MatchingCard {
  id: string;
  uniqueKey: string;
  type: 'en' | 'vi' | 'img' | 'verb' | 'v_ing';
  content: string;
  matchId: string;
  subText?: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface BoxingQuestion {
  id: number;
  question: string;
  context?: string;
  audioPrompt?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  damage: number; // HP to deduct from Hoa
  type: 'vocab' | 'grammar' | 'phonetics' | 'spelling';
}

export interface ErrorCatchExercise {
  id: number;
  sentenceWords: string[];
  errorIndex: number;
  correctWord: string;
  explanation: string;
}

export interface UnscrambleExercise {
  id: number;
  scrambledWords: string[];
  correctSentence: string;
  acceptedSentences?: string[];
  meaningVi: string;
  hintStructure?: string;
}

export interface SlideItem {
  id: string;
  title: string;
  subtitle?: string;
  contentBadge?: string;
  tabId?: TabType | 'all';
  mainText: string;
  subText?: string;
  ipa?: string;
  example?: string;
  explanation?: string;
  category?: string;
  audioText?: string;
  imageUrl?: string;
  emoji?: string;
  options?: string[];
  correctAnswer?: string;
}

export interface UserStats {
  score: number;
  streak: number;
  highestStreak: number;
  hoaBattlesWon: number;
  cardsMatched: number;
  exercisesCompleted: number;
  badges: Badge[];
}

export interface ReadingPassageGapFill {
  title: string;
  instruction?: string;
  wordBank: string[];
  sentences: {
    text: string;
    blankIndex: number;
    expectedWord: string;
    afterText: string;
  }[];
  fullAudioText: string;
}

export interface ReadingPassageTF {
  title: string;
  passageText: string;
  questions: {
    id: number;
    statement: string;
    isTrue: boolean;
    explanation: string;
  }[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}
