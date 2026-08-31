/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  BookOpen, Gamepad2, Brain, Sparkles, Tv, Home, CheckSquare, 
  HelpCircle, MessageCircle, ArrowRight, Award, Music, LayoutGrid
} from 'lucide-react';
import { TabType, UserStats, SlideItem } from './types';
import { 
  VOCABULARY_LIST as VOCABULARY_LIST_UNIT1, 
  LETTER_CLUES as LETTER_CLUES_UNIT1,
  ERROR_CATCH_EXERCISES as ERROR_CATCH_EXERCISES_UNIT1,
  UNSCRAMBLE_EXERCISES as UNSCRAMBLE_EXERCISES_UNIT1,
  READING_PASSAGE_1 as READING_PASSAGE_1_UNIT1,
  READING_PASSAGE_2 as READING_PASSAGE_2_UNIT1,
  BOXING_QUESTIONS as BOXING_QUESTIONS_UNIT1,
  INITIAL_BADGES 
} from './data/unit1Data';
import { 
  VOCABULARY_LIST_UNIT2, 
  LETTER_CLUES_UNIT2,
  ERROR_CATCH_EXERCISES_UNIT2,
  UNSCRAMBLE_EXERCISES_UNIT2,
  READING_PASSAGE_1_UNIT2,
  READING_PASSAGE_2_UNIT2,
  BOXING_QUESTIONS_UNIT2 
} from './data/unit2Data';
import { 
  VOCABULARY_LIST_UNIT3, 
  LETTER_CLUES_UNIT3,
  ERROR_CATCH_EXERCISES_UNIT3,
  UNSCRAMBLE_EXERCISES_UNIT3,
  READING_PASSAGE_1_UNIT3,
  READING_PASSAGE_2_UNIT3,
  BOXING_QUESTIONS_UNIT3 
} from './data/unit3Data';
import { 
  VOCABULARY_LIST_UNIT4, 
  LETTER_CLUES_UNIT4,
  ERROR_CATCH_EXERCISES_UNIT4,
  UNSCRAMBLE_EXERCISES_UNIT4,
  READING_PASSAGE_1_UNIT4,
  READING_PASSAGE_2_UNIT4,
  BOXING_QUESTIONS_UNIT4 
} from './data/unit4Data';
import { 
  VOCABULARY_LIST_UNIT5, 
  LETTER_CLUES_UNIT5,
  ERROR_CATCH_EXERCISES_UNIT5,
  UNSCRAMBLE_EXERCISES_UNIT5,
  READING_PASSAGE_1_UNIT5,
  READING_PASSAGE_2_UNIT5,
  BOXING_QUESTIONS_UNIT5 
} from './data/unit5Data';
import { 
  VOCABULARY_LIST_UNIT6, 
  LETTER_CLUES_UNIT6,
  ERROR_CATCH_EXERCISES_UNIT6,
  UNSCRAMBLE_EXERCISES_UNIT6,
  READING_PASSAGE_1_UNIT6,
  READING_PASSAGE_2_UNIT6,
  BOXING_QUESTIONS_UNIT6 
} from './data/unit6Data';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { VocabularyTab } from './components/VocabularyTab';
import { VocabPracticeTab } from './components/VocabPracticeTab';
import { GrammarTab } from './components/GrammarTab';
import { GrammarPracticeTab } from './components/GrammarPracticeTab';
import { ReadingTab } from './components/ReadingTab';
import { MiniGamesHub } from './components/MiniGamesHub';
import { PresentationModal } from './components/PresentationModal';
import { BadgesModal } from './components/BadgesModal';
import { VoiceSettingsModal } from './components/VoiceSettingsModal';
import { 
  setSoundEffectsEnabled, 
  isSoundEnabled, 
  playComboSound, 
  getVoiceSettings, 
  subscribeVoiceSettings,
  VoiceSettings 
} from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isPresentationOpen, setIsPresentationOpen] = useState<boolean>(false);
  const [presentationTab, setPresentationTab] = useState<TabType | 'all'>('all');
  const [isBadgesOpen, setIsBadgesOpen] = useState<boolean>(false);
  const [isVoiceSettingsOpen, setIsVoiceSettingsOpen] = useState<boolean>(false);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(getVoiceSettings());
  const [initialSlideIndex, setInitialSlideIndex] = useState<number>(0);

  useEffect(() => {
    const unsub = subscribeVoiceSettings(s => setVoiceSettings(s));
    return () => unsub();
  }, []);

  // User Stats & Gamification Persistence
  const [stats, setStats] = useState<UserStats>({
    score: 120,
    streak: 0,
    highestStreak: 0,
    hoaBattlesWon: 0,
    cardsMatched: 0,
    exercisesCompleted: 0,
    badges: INITIAL_BADGES
  });

  const handleToggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    setSoundEffectsEnabled(newState);
  };

  const handleAddScore = (points: number) => {
    setStats(prev => ({
      ...prev,
      score: prev.score + points,
      exercisesCompleted: prev.exercisesCompleted + 1
    }));
  };

  const handleIncrementStreak = () => {
    setStats(prev => {
      const nextStreak = prev.streak + 1;
      if (nextStreak === 5) {
        handleUnlockBadge('streak_fire');
      }
      return {
        ...prev,
        streak: nextStreak,
        highestStreak: Math.max(prev.highestStreak, nextStreak)
      };
    });
  };

  const handleResetStreak = () => {
    setStats(prev => ({
      ...prev,
      streak: 0
    }));
  };

  const handleUnlockBadge = (badgeId: string) => {
    setStats(prev => ({
      ...prev,
      badges: prev.badges.map(b => (b.id === badgeId ? { ...b, unlocked: true } : b))
    }));
  };

  const handleHoaDefeated = () => {
    setStats(prev => ({
      ...prev,
      hoaBattlesWon: prev.hoaBattlesWon + 1
    }));
  };

  // Open presentation with tab filter
  const handleOpenPresentation = (tab?: TabType | 'all', slideIndex: number = 0) => {
    const targetTab = tab || (activeTab === 'dashboard' ? 'all' : activeTab);
    setPresentationTab(targetTab);
    setInitialSlideIndex(slideIndex);
    setIsPresentationOpen(true);
  };

  // Active Unit Data Resolution
  const currentVocabList = selectedUnit === 6 ? VOCABULARY_LIST_UNIT6 : selectedUnit === 5 ? VOCABULARY_LIST_UNIT5 : selectedUnit === 4 ? VOCABULARY_LIST_UNIT4 : selectedUnit === 3 ? VOCABULARY_LIST_UNIT3 : selectedUnit === 2 ? VOCABULARY_LIST_UNIT2 : VOCABULARY_LIST_UNIT1;
  const currentLetterClues = selectedUnit === 6 ? LETTER_CLUES_UNIT6 : selectedUnit === 5 ? LETTER_CLUES_UNIT5 : selectedUnit === 4 ? LETTER_CLUES_UNIT4 : selectedUnit === 3 ? LETTER_CLUES_UNIT3 : selectedUnit === 2 ? LETTER_CLUES_UNIT2 : LETTER_CLUES_UNIT1;
  const currentErrorCatch = selectedUnit === 6 ? ERROR_CATCH_EXERCISES_UNIT6 : selectedUnit === 5 ? ERROR_CATCH_EXERCISES_UNIT5 : selectedUnit === 4 ? ERROR_CATCH_EXERCISES_UNIT4 : selectedUnit === 3 ? ERROR_CATCH_EXERCISES_UNIT3 : selectedUnit === 2 ? ERROR_CATCH_EXERCISES_UNIT2 : ERROR_CATCH_EXERCISES_UNIT1;
  const currentUnscramble = selectedUnit === 6 ? UNSCRAMBLE_EXERCISES_UNIT6 : selectedUnit === 5 ? UNSCRAMBLE_EXERCISES_UNIT5 : selectedUnit === 4 ? UNSCRAMBLE_EXERCISES_UNIT4 : selectedUnit === 3 ? UNSCRAMBLE_EXERCISES_UNIT3 : selectedUnit === 2 ? UNSCRAMBLE_EXERCISES_UNIT2 : UNSCRAMBLE_EXERCISES_UNIT1;
  const currentReading1 = selectedUnit === 6 ? READING_PASSAGE_1_UNIT6 : selectedUnit === 5 ? READING_PASSAGE_1_UNIT5 : selectedUnit === 4 ? READING_PASSAGE_1_UNIT4 : selectedUnit === 3 ? READING_PASSAGE_1_UNIT3 : selectedUnit === 2 ? READING_PASSAGE_1_UNIT2 : READING_PASSAGE_1_UNIT1;
  const currentReading2 = selectedUnit === 6 ? READING_PASSAGE_2_UNIT6 : selectedUnit === 5 ? READING_PASSAGE_2_UNIT5 : selectedUnit === 4 ? READING_PASSAGE_2_UNIT4 : selectedUnit === 3 ? READING_PASSAGE_2_UNIT3 : selectedUnit === 2 ? READING_PASSAGE_2_UNIT2 : READING_PASSAGE_2_UNIT1;
  const currentBoxingQuestions = selectedUnit === 6 ? BOXING_QUESTIONS_UNIT6 : selectedUnit === 5 ? BOXING_QUESTIONS_UNIT5 : selectedUnit === 4 ? BOXING_QUESTIONS_UNIT4 : selectedUnit === 3 ? BOXING_QUESTIONS_UNIT3 : selectedUnit === 2 ? BOXING_QUESTIONS_UNIT2 : BOXING_QUESTIONS_UNIT1;
  const unitTitle = selectedUnit === 6 
    ? 'Ep 26 - 30: Complaining, Cold Calling & Negotiation' 
    : selectedUnit === 5 
    ? 'Ep 21 - 25: Safety Procedures, Evacuation & Hotel Booking' 
    : selectedUnit === 4 
    ? 'Ep 16 - 20: Polite Refusal, Orders, Formal Emails & Agendas' 
    : selectedUnit === 3 
    ? 'Ep 11 - 15: Overtime, Pitching Products & Phone Manners' 
    : selectedUnit === 2 
    ? 'Ep 6 - 10: Handling Clients, Warehouse & Brainstorming' 
    : 'Ep 1 - 5: The Interview, Office Crisis & Team Lunch';

  // Compile Comprehensive Presentation Slides tagged with tabId
  const presentationSlides = useMemo<SlideItem[]>(() => {
    const slides: SlideItem[] = [];

    // 1. Intro Slide (all)
    const unitOverviews: Record<number, { title: string; sub: string; desc: string; emoji: string }> = {
      1: {
        title: 'UNIT 1: EPISODES 1 - 5',
        sub: 'The Interview • The Interruption • The Crisis • Doing Lunch • The Queen of Sheba',
        desc: 'Nắm vững 30 từ vựng cốt lõi: giới thiệu bản thân, đề xuất giải pháp, mời đối tác ăn trưa và thuật ngữ văn phòng Tip Top Trading.',
        emoji: '✉️'
      },
      2: {
        title: 'UNIT 2: EPISODES 6 - 10',
        sub: 'Double-booked • Mr Lime’s Grapefruits • Room 301 • The Warehouse • The Brainstorm',
        desc: 'Nghệ thuật xử lý khủng hoảng giao nhầm hàng, cam kết bồi thường, đối thoại trong phòng 301, kiểm tra kho bãi và phản biện lịch sự khi họp ý tưởng.',
        emoji: '👥'
      },
      3: {
        title: 'UNIT 3: EPISODES 11 - 15',
        sub: 'Overtime • The Big Day • The Imperial Lemon • Telephone Tell-Tale • Seb Lime',
        desc: 'Làm việc thêm giờ không kiệt sức, mẫu câu mở đầu bài thuyết trình sản phẩm, làm nổi bật thế mạnh và quy chuẩn nghe gọi điện thoại văn phòng.',
        emoji: '🤝'
      },
      4: {
        title: 'UNIT 4: EPISODES 16 - 20',
        sub: 'Slimy Limey! • Luxury Boxes • The Email • The Open Window • The Team Meeting',
        desc: 'Từ chối lời mời riêng tư khéo léo, đặt hàng nhà cung cấp, viết email thương mại chuẩn mực thay vì tin nhắn viết tắt và điều phối agenda cuộc họp.',
        emoji: '📢'
      },
      5: {
        title: 'UNIT 5: EPISODES 21 - 25',
        sub: 'Don’t Panic! • The Smoker • Risky Business • No Smoke Without Fire • The Big Cheese',
        desc: 'Hỏi xin lời khuyên đồng nghiệp, quy định an toàn PCCC, chỉ dẫn sơ tán khẩn cấp và kỹ năng gọi điện đặt phòng khách sạn cho sếp tổng.',
        emoji: '💵'
      },
      6: {
        title: 'UNIT 6: EPISODES 26 - 30',
        sub: 'You Cannot Be Serious! • Getting Down to Business • Home Truths • Feelers Out • Two Heads',
        desc: 'Khiếu nại dịch vụ phòng không đạt chuẩn, thông báo viễn cảnh sụt giảm lợi nhuận, giữ tác phong công việc và nghệ thuật đàm phán chốt hợp đồng Châu Âu.',
        emoji: '📈'
      }
    };

    const overview = unitOverviews[selectedUnit] || unitOverviews[1];

    slides.push({
      id: `slide_intro_u${selectedUnit}`,
      tabId: 'all',
      title: overview.title,
      contentBadge: 'Tổng quan bài học',
      mainText: overview.title,
      subText: overview.sub,
      explanation: overview.desc,
      emoji: overview.emoji
    });

    // 2. Vocabulary Slides (tabId: 'vocabulary')
    currentVocabList.forEach((vocab, idx) => {
      slides.push({
        id: `slide_vocab_u${selectedUnit}_${vocab.id}`,
        tabId: 'vocabulary',
        title: `TỪ VỰNG ${idx + 1}/${currentVocabList.length}: ${vocab.english}`,
        contentBadge: `Từ vựng • ${vocab.category.toUpperCase()}`,
        mainText: vocab.english,
        ipa: vocab.ipa,
        subText: vocab.vietnamese,
        example: vocab.exampleEn,
        explanation: vocab.exampleVi,
        audioText: vocab.english,
        emoji: vocab.emoji
      });
    });

    // 3. Vocab Practice Slides (tabId: 'vocab_practice')
    currentVocabList.slice(0, 8).forEach((item, idx) => {
      slides.push({
        id: `slide_match_u${selectedUnit}_${item.id || idx}`,
        tabId: 'vocab_practice',
        title: `NỐI TỪ & NGHĨA ${idx + 1}: ${item.english}`,
        contentBadge: 'Luyện Phản Xạ Ghép Nối',
        mainText: `${item.english} ➔ ${item.vietnamese}`,
        subText: `Phiên âm: ${item.ipa} • Phân loại: ${item.category}`,
        example: `Ví dụ: ${item.exampleEn}`,
        explanation: `Dịch nghĩa: ${item.exampleVi}`,
        audioText: item.english,
        emoji: item.emoji || '🎯'
      });
    });

    // 4. Grammar Slides (tabId: 'grammar')
    if (selectedUnit === 1) {
      slides.push({
        id: 'slide_u1_email_formulas',
        tabId: 'grammar',
        title: 'CẤU TRÚC VIẾT EMAIL CHUYÊN NGHIỆP',
        contentBadge: 'Business Email Formulas',
        mainText: 'Please find attached + [Tên tệp] • Would you mind + V-ing?',
        subText: 'I am writing to follow up on... • Please feel free to reach out if...',
        example: 'Please find attached the updated quarterly budget report.',
        explanation: 'Sử dụng các cấu trúc trang trọng và lịch sự giúp nâng tầm tác phong công sở.',
        emoji: '📧'
      });
      slides.push({
        id: 'slide_u1_priority_verbs',
        tabId: 'grammar',
        title: 'THÁP ĐỘNG TỪ ƯU TIÊN CÔNG VIỆC',
        contentBadge: 'Work Priority Action Verbs',
        mainText: 'Prioritize > Expedite > Recommend > Prefer > Delegate > Avoid > Prohibit',
        subText: 'Sắp xếp mức độ ưu tiên và phân bổ quỹ thời gian hợp lý',
        example: 'We prioritize client satisfaction and expedite critical deliveries.',
        explanation: 'Lựa chọn động từ chuẩn xác khi giao việc và báo cáo tiến độ với sếp.',
        emoji: '🎯'
      });
      slides.push({
        id: 'slide_u1_phonetics',
        tabId: 'grammar',
        title: 'NGỮ ÂM CÔNG SỞ: ÂM /ə/ VÀ /ɜ:/',
        contentBadge: 'Phonetics Sounds',
        mainText: 'Âm /ə/ (agenda, confirm, proposal) vs Âm /ɜ:/ (workload, urgent, service)',
        subText: 'Phát âm chuẩn xác giúp tăng độ tin cậy trong giao tiếp văn phòng',
        example: 'Please confirm the agenda for our quarterly review.',
        explanation: 'Âm /ə/ không nhấn trọng âm; âm /ɜ:/ ngân dài có trọng âm.',
        emoji: '🗣️'
      });
    } else if (selectedUnit === 2) {
      slides.push({
        id: 'slide_u2_apologising',
        tabId: 'grammar',
        title: 'NGHỆ THUẬT XIN LỖI & CAM KẾT VỚI KHÁCH HÀNG (EP 7)',
        contentBadge: 'Crisis & Customer Service',
        mainText: 'I\'m really sorry to hear that • That must have been very inconvenient',
        subText: 'You have my word that we will sort this out • We can make up for it',
        example: 'You have my word that we will deliver the grapefruits via express courier today.',
        explanation: 'Khẳng định tinh thần trách nhiệm và phục hồi niềm tin của khách hàng.',
        emoji: '🤝'
      });
      slides.push({
        id: 'slide_u2_disagreeing',
        tabId: 'grammar',
        title: 'PHẢN BIỆN LỊCH SỰ TRONG CUỘC HỌP Ý TƯỞNG (EP 10)',
        contentBadge: 'Polite Disagreement',
        mainText: 'I see your point, but actually I think... • I\'m not so sure about that',
        subText: 'Kỹ thuật ghi nhận ý kiến đồng nghiệp trước khi đưa ra góc nhìn đối lập',
        example: 'I see your point Denise, but actually I think a 20% launch discount will attract buyers.',
        explanation: 'Bảo vệ quan điểm cá nhân mà vẫn duy trì bầu không khí tôn trọng lẫn nhau.',
        emoji: '💡'
      });
    } else if (selectedUnit === 3) {
      slides.push({
        id: 'slide_u3_pitch_signposts',
        tabId: 'grammar',
        title: 'CẤU TRÚC MỞ ĐẦU BÀI THUYẾT TRÌNH BÁN HÀNG (EP 12 - 13)',
        contentBadge: 'Pitching Signposting',
        mainText: 'Today I\'m going to... ➡️ I\'ll start by... ➡️ Move on to discuss... ➡️ Finally...',
        subText: 'The company has a strong track record of... • Our key strengths are...',
        example: 'Today I\'m going to present our revolutionary Imperial Lemon with laser-curve technology.',
        explanation: 'Dẫn dắt người nghe bằng lộ trình rõ ràng và nhấn mạnh giá trị vượt trội.',
        emoji: '🎤'
      });
      slides.push({
        id: 'slide_u3_phone_etiquette',
        tabId: 'grammar',
        title: 'QUY CHUẨN GIAO TIẾP QUA ĐIỆN THOẠI (EP 14 - 15)',
        contentBadge: 'Telephone Manners',
        mainText: 'Tip Top Trading, Anna speaking. How can I help you?',
        subText: 'I\'m really sorry, he\'s not available at the moment. Can I take a message?',
        example: 'I\'m afraid he is in a meeting, shall I ask him to call you back this afternoon?',
        explanation: 'Tác phong chuyên nghiệp khi nhận cuộc gọi và ghi lại lời nhắn chính xác.',
        emoji: '📞'
      });
    } else if (selectedUnit === 4) {
      slides.push({
        id: 'slide_u4_refusing_orders',
        tabId: 'grammar',
        title: 'TỪ CHỐI LỊCH SỰ & ĐẶT HÀNG NHÀ CUNG CẤP (EP 16 - 17)',
        contentBadge: 'Refusals & Orders',
        mainText: 'Against company policy • With regret, I\'m going to have to say no',
        subText: 'I\'d like to place an order for... • When can we expect to receive them?',
        example: 'I\'m afraid it is against company policy to have non-business lunches with clients.',
        explanation: 'Giữ ranh giới chuyên nghiệp trong công việc và quản lý tiến độ đặt hàng.',
        emoji: '📦'
      });
      slides.push({
        id: 'slide_u4_email_agenda',
        tabId: 'grammar',
        title: 'VIẾT EMAIL THƯƠNG MẠI & CHỦ TRÌ CUỘC HỌP (EP 18 - 20)',
        contentBadge: 'Business Emails & Meeting Agendas',
        mainText: 'Dear Mr Lime • I am writing regarding... • Yours sincerely / Best wishes',
        subText: 'There are four items on the agenda today ➡️ Any other business (AOB) ➡️ Wrap up',
        example: 'I am writing regarding your request for 300 green luxury boxes for the lemons.',
        explanation: 'Tránh viết tắt tin nhắn SMS, tuân thủ văn phong trang trọng và điều phối họp hiệu quả.',
        emoji: '✉️'
      });
    } else if (selectedUnit === 5) {
      slides.push({
        id: 'slide_u5_safety_evacuation',
        tabId: 'grammar',
        title: 'QUY TẮC AN TOÀN PCCC & CHỈ DẪN SƠ TÁN KHẨN CẤP (EP 22 - 24)',
        contentBadge: 'Safety Rules & Evacuation',
        mainText: 'Not permitted on company premises • Extinguish your cigarette',
        subText: 'If you see a fire, raise the alarm • Use the stairs not the lift • Fire assembly point',
        example: 'There is no need to panic. Please leave the building and meet at the assembly point.',
        explanation: 'Mệnh lệnh dứt khoát, bình tĩnh bảo vệ tính mạng tập thể khi có sự cố cháy.',
        emoji: '🔔'
      });
      slides.push({
        id: 'slide_u5_hotel_booking',
        tabId: 'grammar',
        title: 'ĐẶT PHÒNG KHÁCH SẠN CHO LÃNH ĐẠO CẤP CAO (EP 25)',
        contentBadge: 'Executive Hospitality',
        mainText: 'Check availability and rates • Does the price include breakfast?',
        subText: 'Business facilities (Wi-Fi, printer) • Twin bed vs Single bed reservation',
        example: 'Hello, I\'d like to check availability and rates for a room from tonight please.',
        explanation: 'Hỏi rõ chi phí, dịch vụ kèm theo và tiện ích phục vụ công tác của sếp.',
        emoji: '🏨'
      });
    } else if (selectedUnit === 6) {
      slides.push({
        id: 'slide_u6_complaints_badnews',
        tabId: 'grammar',
        title: 'KHIẾU NẠI DỊCH VỤ & THÔNG BÁO TIN XẤU TRỰC DIỆN (EP 26 - 27)',
        contentBadge: 'Complaints & Direct Communication',
        mainText: 'Disappointed with your service • The standard did not meet expectations',
        subText: 'I have got to give it to you straight • The outlook is gloomy • Profit warning',
        example: 'I would like this matter resolved as quickly as possible with a room upgrade or refund.',
        explanation: 'Đòi quyền lợi chính đáng và truyền đạt sự thật khó khăn với cấp dưới.',
        emoji: '📉'
      });
      slides.push({
        id: 'slide_u6_negotiation',
        tabId: 'grammar',
        title: 'KỸ THUẬT ĐÀM PHÁN GIÁ & THỎA HIỆP WIN-WIN (EP 29 - 30)',
        contentBadge: 'Cold Calling & Price Negotiation',
        mainText: 'What kind of price are you willing to pay? • We can\'t go that low',
        subText: 'If you buy more stock, I can offer a bigger discount • I\'ll meet you half way',
        example: 'If you can order 5,000 units, I\'ll meet you half way on the unit price at £3.50.',
        explanation: 'Chốt hợp đồng thành công mà vẫn bảo vệ biên lợi nhuận của doanh nghiệp.',
        emoji: '🤝'
      });
    }

    // 5. Grammar Practice Slides (tabId: 'grammar_practice')
    currentUnscramble.slice(0, 5).forEach((ex, idx) => {
      slides.push({
        id: `slide_unscramble_u${selectedUnit}_${idx}`,
        tabId: 'grammar_practice',
        title: `MẪU CÂU CÔNG SỞ ${idx + 1}: ${ex.meaningVi}`,
        contentBadge: 'Cấu Trúc Ghép Câu Hoàn Chỉnh',
        mainText: ex.correctSentence,
        subText: ex.meaningVi,
        example: ex.hintStructure ? `Mẫu công thức: ${ex.hintStructure}` : undefined,
        explanation: 'Ứng dụng trong thư từ, thông báo và biên bản công việc.',
        audioText: ex.correctSentence,
        emoji: '🧩'
      });
    });

    // 6. Reading Slides (tabId: 'reading')
    slides.push({
      id: `slide_reading1_u${selectedUnit}`,
      tabId: 'reading',
      title: `BÀI ĐỌC 1: ${currentReading1.title}`,
      contentBadge: 'Reading & Situation Analysis',
      mainText: currentReading1.title,
      subText: 'Đoạn văn tình huống doanh nghiệp thực tế',
      example: currentReading1.fullAudioText,
      explanation: `Từ khóa trọng tâm: ${currentReading1.wordBank.join(', ')}`,
      audioText: currentReading1.fullAudioText,
      emoji: '📰'
    });
    slides.push({
      id: `slide_reading2_u${selectedUnit}`,
      tabId: 'reading',
      title: `BÀI ĐỌC 2: ${currentReading2.title}`,
      contentBadge: 'Case Study & Analysis',
      mainText: currentReading2.title,
      subText: 'Đọc hiểu & Đánh giá True/False',
      example: currentReading2.passageText,
      explanation: 'Phân tích thông điệp chính và bài học quản trị doanh nghiệp.',
      audioText: currentReading2.passageText,
      emoji: '📊'
    });

    // 7. MiniGames Boxing Quiz Interactive Slides (tabId: 'minigames')
    currentBoxingQuestions.forEach((q, idx) => {
      const questionCategory = q.type ? q.type.toUpperCase() : 'BUSINESS QUIZ';
      slides.push({
        id: `slide_quiz_u${selectedUnit}_${idx}`,
        tabId: 'minigames',
        title: `CÂU HỎI QUIZ ${idx + 1}/${currentBoxingQuestions.length}: ${questionCategory}`,
        contentBadge: `Đấu Trường Quiz • ${questionCategory}`,
        mainText: q.question,
        subText: 'Chọn một trong 4 phương án dưới đây:',
        options: q.options,
        correctAnswer: q.options[q.correctIndex],
        example: `Đáp án chuẩn: ${q.options[q.correctIndex]}`,
        explanation: q.explanation,
        audioText: q.question,
        emoji: '🥊'
      });
    });

    return slides;
  }, [selectedUnit, currentVocabList, currentLetterClues, currentUnscramble, currentReading1, currentReading2, currentBoxingQuestions]);

  const tabTitles: Record<TabType, string> = {
    dashboard: `Trang chủ • Unit ${selectedUnit}: ${unitTitle}`,
    vocabulary: `Thẻ từ vựng 3D (${currentVocabList.length} từ)`,
    vocab_practice: 'Ôn từ vựng & Lật thẻ siêu trí nhớ',
    grammar: `Lý thuyết Ngữ pháp Unit ${selectedUnit}`,
    grammar_practice: 'Luyện tập Ngữ pháp & Sắp xếp câu',
    reading: `Đọc hiểu Unit ${selectedUnit}`,
    minigames: 'Võ Đài Boxing Quiz Thử Thách'
  };

  const navTabs = [
    { id: 'dashboard', label: 'Trang Chủ', icon: '🏠' },
    { id: 'vocabulary', label: `Từ Vựng (${currentVocabList.length})`, icon: selectedUnit === 6 ? '📈' : selectedUnit === 5 ? '💵' : selectedUnit === 4 ? '📢' : selectedUnit === 3 ? '🤝' : selectedUnit === 2 ? '👥' : '💼' },
    { id: 'vocab_practice', label: 'Ôn Từ & Lật Thẻ', icon: '🃏' },
    { id: 'grammar', label: 'Ngữ Pháp & Mẫu Câu', icon: '📚' },
    { id: 'grammar_practice', label: 'Luyện Câu & Bắt Lỗi', icon: '🛠️' },
    { id: 'reading', label: 'Đọc Hiểu Tình Huống', icon: '📰' },
    { id: 'minigames', label: 'Võ Đài Quiz', icon: '🥊' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-slate-800 antialiased font-sans selection:bg-[#C23320] selection:text-white">
      {/* Top Header */}
      <Header
        stats={stats}
        soundEnabled={soundEnabled}
        unitNum={selectedUnit}
        unitTitle={unitTitle}
        activeTab={activeTab}
        voiceSettings={voiceSettings}
        onToggleSound={handleToggleSound}
        onOpenPresentation={(tab) => handleOpenPresentation(tab || activeTab, 0)}
        onOpenBadges={() => setIsBadgesOpen(true)}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
        activeTabTitle={tabTitles[activeTab]}
      />

      <div className="flex-1 flex flex-col lg:flex-row max-w-7xl w-full mx-auto p-2 sm:p-4 gap-4">
        {/* Left Navigation Sidebar */}
        <Sidebar
          selectedUnit={selectedUnit}
          onSelectUnit={setSelectedUnit}
          stats={stats}
        />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-[#FFFDF9] rounded-3xl border border-[#F0E8DD] p-3 sm:p-6 shadow-xs">
          <div className="max-w-5xl mx-auto space-y-5">
            {/* Horizontal Lesson Category Cards Bar (Cấu trúc Global Success 7 - Chuyên mục bài học theo hàng ngang) */}
            <div id="horizontal-lesson-categories" className="bg-white p-2.5 sm:p-3 rounded-2xl sm:rounded-3xl border border-[#EAE0D5] shadow-2xs">
              <div className="flex items-center justify-between px-1.5 mb-2">
                <div className="flex items-center gap-2">
                  <LayoutGrid className="w-4 h-4 text-[#C23320]" />
                  <span className="text-[11px] sm:text-xs font-black uppercase text-slate-700 tracking-wider">
                    Chuyên Mục Bài Học • Unit {selectedUnit}
                  </span>
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-[#C23320] bg-[#FFF5F3] px-2.5 py-0.5 rounded-full border border-rose-100">
                  {navTabs.length} Chuyên mục
                </span>
              </div>

              {/* Horizontal Scrollable Category Cards Strip */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {navTabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`horizontal-tab-${tab.id}`}
                      onClick={() => setActiveTab(tab.id as TabType)}
                      className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap shrink-0 border ${
                        isActive
                          ? 'bg-[#C23320] text-white border-[#C23320] shadow-sm scale-102'
                          : 'bg-slate-50/80 hover:bg-rose-50/80 text-slate-700 hover:text-[#C23320] border-slate-200/80 hover:border-rose-200 shadow-2xs'
                      }`}
                    >
                      <span className="text-base">{tab.icon}</span>
                      <span>{tab.label}</span>
                      {tab.id === 'minigames' && !isActive && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {activeTab === 'dashboard' && (
              <Dashboard
                stats={stats}
                unitNum={selectedUnit}
                onNavigateTab={setActiveTab}
                onOpenPresentation={(tab) => handleOpenPresentation(tab || 'all', 0)}
              />
            )}

            {activeTab === 'vocabulary' && (
              <VocabularyTab
                vocabList={currentVocabList}
                unitNum={selectedUnit}
                unitTitle={unitTitle}
                onOpenSlideMode={(index) => handleOpenPresentation('vocabulary', index ?? 0)}
                onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
              />
            )}

            {activeTab === 'vocab_practice' && (
              <VocabPracticeTab
                vocabList={currentVocabList}
                letterClues={currentLetterClues}
                unitNum={selectedUnit}
                onAddScore={handleAddScore}
                onIncrementStreak={handleIncrementStreak}
                onResetStreak={handleResetStreak}
                onUnlockBadge={handleUnlockBadge}
                onOpenSlideMode={() => handleOpenPresentation('vocab_practice', 0)}
                streak={stats.streak}
              />
            )}

            {activeTab === 'grammar' && (
              <GrammarTab
                unitNum={selectedUnit}
                onOpenSlideMode={() => handleOpenPresentation('grammar', 0)}
              />
            )}

            {activeTab === 'grammar_practice' && (
              <GrammarPracticeTab
                errorCatchExercises={currentErrorCatch}
                unscrambleExercises={currentUnscramble}
                unitNum={selectedUnit}
                onAddScore={handleAddScore}
                onIncrementStreak={handleIncrementStreak}
                onResetStreak={handleResetStreak}
                onUnlockBadge={handleUnlockBadge}
                onOpenSlideMode={() => handleOpenPresentation('grammar_practice', 0)}
                streak={stats.streak}
              />
            )}

            {activeTab === 'reading' && (
              <ReadingTab
                readingPassage1={currentReading1}
                readingPassage2={currentReading2}
                unitNum={selectedUnit}
                onAddScore={handleAddScore}
                onIncrementStreak={handleIncrementStreak}
                onResetStreak={handleResetStreak}
                onOpenSlideMode={() => handleOpenPresentation('reading', 0)}
              />
            )}

            {activeTab === 'minigames' && (
              <MiniGamesHub
                boxingQuestions={currentBoxingQuestions}
                unitTitle={unitTitle}
                onAddScore={handleAddScore}
                onIncrementStreak={handleIncrementStreak}
                onResetStreak={handleResetStreak}
                onUnlockBadge={handleUnlockBadge}
                onHoaDefeated={handleHoaDefeated}
                onOpenSlideMode={() => handleOpenPresentation('minigames', 0)}
                streak={stats.streak}
              />
            )}
          </div>
        </main>
      </div>

      {/* Presentation Mode Modal with initialTab prop */}
      <PresentationModal
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        slides={presentationSlides}
        title={`Unit ${selectedUnit}: ${unitTitle} - English at Work`}
        initialTab={presentationTab}
        initialSlideIndex={initialSlideIndex}
        onOpenVoiceSettings={() => setIsVoiceSettingsOpen(true)}
      />

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceSettingsOpen}
        onClose={() => setIsVoiceSettingsOpen(false)}
      />

      {/* Badges Modal */}
      <BadgesModal
        isOpen={isBadgesOpen}
        onClose={() => setIsBadgesOpen(false)}
        badges={stats.badges}
      />
    </div>
  );
}
