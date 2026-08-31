import { VocabItem, BoxingQuestion, ErrorCatchExercise, UnscrambleExercise, ReadingPassageGapFill, ReadingPassageTF } from '../types';

export const VOCABULARY_LIST_UNIT2: VocabItem[] = [
  // Episode 6: Double-booked & Offering Help (Trùng lịch hẹn & Tiếp đón khách hàng)
  {
    id: 201,
    english: 'double-booked',
    type: 'adj',
    ipa: "/ˌdʌbl 'bʊkt/",
    vietnamese: 'bị trùng lịch hẹn (2 cuộc hẹn cùng giờ)',
    category: 'schedule',
    exampleEn: 'Tom is double-booked with two extremely important clients at the same time.',
    exampleVi: 'Tom bị trùng lịch với hai khách hàng cực kỳ quan trọng cùng một thời điểm.',
    emoji: '📅'
  },
  {
    id: 202,
    english: 'give a hand',
    type: 'idiom',
    ipa: "/ɡɪv ə hænd/",
    vietnamese: 'giúp một tay, phụ giúp',
    category: 'schedule',
    exampleEn: 'Can I give you a hand with your coat and scarf, Mr Lime?',
    exampleVi: 'Tôi có thể giúp một tay đỡ áo khoác và khăn quàng cho ông được không, ông Lime?',
    emoji: '🤝'
  },
  {
    id: 203,
    english: 'give me a shout',
    type: 'idiom',
    ipa: "/ɡɪv miː ə ʃaʊt/",
    vietnamese: 'cứ gọi tôi nhé (khi cần trợ giúp)',
    category: 'schedule',
    exampleEn: 'Well, give me a shout if you need anything!',
    exampleVi: 'Cứ gọi tôi một tiếng nếu anh cần bất cứ thứ gì nhé!',
    emoji: '🗣️'
  },
  {
    id: 204,
    english: 'juice bar',
    type: 'noun phrase',
    ipa: "/dʒuːs bɑː(r)/",
    vietnamese: 'quán nước ép hoa quả',
    category: 'schedule',
    exampleEn: 'Citrus Ventures owns hundreds of juice bars across the city.',
    exampleVi: 'Citrus Ventures sở hữu hàng trăm quán nước ép khắp thành phố.',
    emoji: '🍹'
  },
  {
    id: 205,
    english: 'reschedule',
    type: 'v',
    ipa: "/ˌriː'ʃedjuːl/",
    vietnamese: 'dời lại lịch hẹn sang lúc khác',
    category: 'schedule',
    exampleEn: 'Would it be possible to reschedule our meeting for tomorrow afternoon?',
    exampleVi: 'Liệu chúng ta có thể dời lại cuộc hẹn sang chiều mai được không?',
    emoji: '🕒'
  },
  {
    id: 206,
    english: 'make yourself at home',
    type: 'idiom',
    ipa: "/meɪk jɔː'self æt həʊm/",
    vietnamese: 'cứ tự nhiên như ở nhà (lời mời khách thoải mái)',
    category: 'schedule',
    exampleEn: 'Please take a seat and make yourself at home while you wait for Tom.',
    exampleVi: 'Xin mời ông ngồi và cứ tự nhiên thoải mái trong lúc chờ Tom nhé.',
    emoji: '🛋️'
  },

  // Episode 7: Mr Lime's grapefruits & Apologising (Xử lý sự cố giao hàng & Lời xin lỗi)
  {
    id: 207,
    english: 'unacceptable',
    type: 'adj',
    ipa: "/ˌʌnək'septəbl/",
    vietnamese: 'không thể chấp nhận được',
    category: 'apology',
    exampleEn: 'Getting 800,000 pineapples instead of 8,000 grapefruits is totally unacceptable.',
    exampleVi: 'Nhận 800.000 quả dứa thay vì 8.000 quả bưởi chùm là hoàn toàn không thể chấp nhận.',
    emoji: '❌'
  },
  {
    id: 208,
    english: 'inconvenient',
    type: 'adj',
    ipa: "/ˌɪnkən'viːniənt/",
    vietnamese: 'bất tiện, phiền phức',
    category: 'apology',
    exampleEn: 'That must have been very inconvenient for you.',
    exampleVi: 'Điều đó chắc hẳn đã gây ra rất nhiều bất tiện phiền phức cho quý khách.',
    emoji: '⚠️'
  },
  {
    id: 209,
    english: 'make up for',
    type: 'phrasal verb',
    ipa: "/meɪk ʌp fɔː(r)/",
    vietnamese: 'bù đắp cho (tổn thất, sơ suất)',
    category: 'apology',
    exampleEn: 'We can include some latest imitation oranges to make up for the inconvenience.',
    exampleVi: 'Chúng tôi xin tặng thêm cam nhân tạo đời mới để bù đắp cho sự bất tiện này.',
    emoji: '🎁'
  },
  {
    id: 210,
    english: 'you have my word',
    type: 'idiom',
    ipa: "/juː hæv maɪ wɜːd/",
    vietnamese: 'tôi xin cam đoan, tôi xin hứa chắc chắn',
    category: 'apology',
    exampleEn: 'You have my word that we will sort this out immediately.',
    exampleVi: 'Tôi xin cam đoan chắc chắn với ông rằng chúng tôi sẽ giải quyết việc này ngay.',
    emoji: '🤞'
  },
  {
    id: 211,
    english: 'laser-curve technology',
    type: 'noun phrase',
    ipa: "/'leɪzə kɜːv tek'nɒlədʒi/",
    vietnamese: 'công nghệ định hình đường cong laser',
    category: 'apology',
    exampleEn: 'Our Imperial Lemon is made with revolutionary laser-curve technology.',
    exampleVi: 'Quả chanh Hoàng đế của chúng tôi được sản xuất bằng công nghệ laser uốn cong đột phá.',
    emoji: '🍋'
  },
  {
    id: 212,
    english: 'rectify the mistake',
    type: 'phrase',
    ipa: "/'rektɪfaɪ ðə mɪ'steɪk/",
    vietnamese: 'khắc phục, sửa chữa sai sót ngay lập tức',
    category: 'apology',
    exampleEn: 'We will dispatch the replacement grapefruits today to rectify the mistake.',
    exampleVi: 'Chúng tôi sẽ xuất kho lô bưởi thay thế ngay hôm nay để khắc phục sai sót.',
    emoji: '🔄'
  },

  // Episode 8: Room 301 & Giving Praise (Phòng họp 301 & Lời khen ngợi)
  {
    id: 213,
    english: 'room 301',
    type: 'noun phrase',
    ipa: "/ruːm θriː əʊ wʌn/",
    vietnamese: 'phòng 301 (nơi diễn ra các cuộc họp căng thẳng/kỷ luật)',
    category: 'apology',
    exampleEn: 'Paul called Tom and Anna into Room 301, where difficult conversations happen.',
    exampleVi: 'Paul gọi Tom và Anna vào phòng 301, nơi diễn ra các cuộc trò chuyện khó khăn.',
    emoji: '🚪'
  },
  {
    id: 214,
    english: 'handle it well',
    type: 'phrase',
    ipa: "/'hændl ɪt wel/",
    vietnamese: 'xử lý tình huống rất tốt',
    category: 'apology',
    exampleEn: 'You were in a difficult situation and you handled it well.',
    exampleVi: 'Cô đã ở trong một tình huống khó khăn và cô đã xử lý nó rất khéo léo.',
    emoji: '👏'
  },
  {
    id: 215,
    english: 'really impressed',
    type: 'phrase',
    ipa: "/'rɪəli ɪm'prest/",
    vietnamese: 'thực sự ấn tượng',
    category: 'apology',
    exampleEn: 'Great job Anna, I am really impressed with your professionalism.',
    exampleVi: 'Làm tốt lắm Anna, tôi thực sự rất ấn tượng với sự chuyên nghiệp của cô.',
    emoji: '🤩'
  },
  {
    id: 216,
    english: 'big boss',
    type: 'noun phrase',
    ipa: "/bɪɡ bɒs/",
    vietnamese: 'sếp tổng cấp cao (Mr Socrates ở Mỹ)',
    category: 'apology',
    exampleEn: 'Mr Socrates is the big boss of Tip Top Trading based in America.',
    exampleVi: 'Ông Socrates là sếp tổng cao nhất của Tip Top Trading đặt trụ sở tại Mỹ.',
    emoji: '👑'
  },
  {
    id: 217,
    english: 'keep up the good work',
    type: 'idiom',
    ipa: "/kiːp ʌp ðə ɡʊd wɜːk/",
    vietnamese: 'hãy tiếp tục phát huy phong độ tốt',
    category: 'apology',
    exampleEn: 'Paul told Anna to keep up the good work after saving the client contract.',
    exampleVi: 'Paul động viên Anna tiếp tục phát huy phong độ sau khi cứu được hợp đồng với khách.',
    emoji: '🌟'
  },

  // Episode 9: The warehouse & Checking Information (Kiểm tra kho bãi & Xác thực số liệu)
  {
    id: 218,
    english: 'clarify',
    type: 'v',
    ipa: "/'klærəfaɪ/",
    vietnamese: 'làm rõ, xác minh chi tiết',
    category: 'warehouse',
    exampleEn: 'Could you possibly clarify what went out in today’s delivery?',
    exampleVi: 'Bác có thể vui lòng làm rõ những gì đã được xuất trong chuyến giao hôm nay không?',
    emoji: '🔍'
  },
  {
    id: 219,
    english: 'absolutely clear',
    type: 'phrase',
    ipa: "/'æbsəluːtli klɪə(r)/",
    vietnamese: 'rõ ràng tuyệt đối, không nhầm lẫn',
    category: 'warehouse',
    exampleEn: 'Just to be absolutely clear, you sent the soft mangos, not the plastic ones?',
    exampleVi: 'Để rõ ràng tuyệt đối, bác đã gửi xoài mềm chứ không phải loại nhựa đúng không?',
    emoji: '🎯'
  },
  {
    id: 220,
    english: 'warehouse manager',
    type: 'noun phrase',
    ipa: "/'weəhaʊs 'mænɪdʒə/",
    vietnamese: 'quản lý kho hàng (Mr Ingle)',
    category: 'warehouse',
    exampleEn: 'Mr Ingle has been the warehouse manager for thirty years.',
    exampleVi: 'Bác Ingle đã làm quản lý kho hàng suốt ba mươi năm.',
    emoji: '📦'
  },
  {
    id: 221,
    english: 'redcurrant',
    type: 'n',
    ipa: "/'redˌkʌrənt/",
    vietnamese: 'quả lý chua đỏ (loại quả xuất kho cho Bluetree)',
    category: 'warehouse',
    exampleEn: '500 redcurrants were delivered to Mr Berry of Bluetree Enterprises.',
    exampleVi: '500 quả lý chua đỏ đã được giao cho ông Berry của công ty Bluetree Enterprises.',
    emoji: '🍒'
  },
  {
    id: 222,
    english: 'cross-check',
    type: 'v',
    ipa: "/krɒs tʃek/",
    vietnamese: 'đối chiếu, kiểm tra chéo thông tin',
    category: 'warehouse',
    exampleEn: 'Always cross-check the delivery note against the warehouse stock log.',
    exampleVi: 'Luôn luôn đối chiếu phiếu giao hàng với sổ nhật ký tồn kho.',
    emoji: '📑'
  },
  {
    id: 223,
    english: 'delivery note',
    type: 'noun phrase',
    ipa: "/dɪ'lɪvəri nəʊt/",
    vietnamese: 'phiếu giao hàng / vận đơn giao nhận',
    category: 'warehouse',
    exampleEn: 'Could you please sign the delivery note to confirm receipt of the mangos?',
    exampleVi: 'Xin bác ký vào phiếu giao hàng để xác nhận đã nhận đủ số xoài.',
    emoji: '📝'
  },

  // Episode 10: The Brainstorm & Disagreeing (Họp ý tưởng & Tranh luận phản biện)
  {
    id: 224,
    english: 'brainstorm',
    type: 'n / v',
    ipa: "/'breɪnstɔːm/",
    vietnamese: 'buổi họp động não, chia sẻ ý tưởng',
    category: 'brainstorm',
    exampleEn: 'The team is brainstorming ideas on how to launch the Imperial Lemon.',
    exampleVi: 'Cả nhóm đang họp động não tìm ý tưởng ra mắt sản phẩm Chanh Hoàng Đế.',
    emoji: '🧠'
  },
  {
    id: 225,
    english: 'see your point',
    type: 'phrase',
    ipa: "/siː jɔː pɔɪnt/",
    vietnamese: 'hiểu quan điểm của bạn (nhưng chuẩn bị phản biện)',
    category: 'brainstorm',
    exampleEn: 'I see your point, but actually I think happy clients will come back to buy more.',
    exampleVi: 'Tôi hiểu quan điểm của chị, nhưng thực ra tôi nghĩ khách hàng vui vẻ sẽ quay lại mua thêm.',
    emoji: '💡'
  },
  {
    id: 226,
    english: 'not so sure about that',
    type: 'phrase',
    ipa: "/nɒt səʊ ʃɔːr ə'baʊt ðæt/",
    vietnamese: 'không thực sự chắc chắn về điều đó (phản bác lịch sự)',
    category: 'brainstorm',
    exampleEn: 'Well, I’m not so sure about that. A special discount will attract new clients.',
    exampleVi: 'Tôi không thực sự nghĩ vậy. Mức chiết khấu đặc biệt sẽ thu hút khách hàng mới.',
    emoji: '🤔'
  },
  {
    id: 227,
    english: 'special opening offer',
    type: 'noun phrase',
    ipa: "/'speʃl 'əʊpnɪŋ 'ɒfə/",
    vietnamese: 'ưu đãi đặc biệt nhân dịp khai trương/ra mắt',
    category: 'brainstorm',
    exampleEn: 'Anna suggested a special opening offer of 20% off Imperial Lemon orders.',
    exampleVi: 'Anna đề xuất ưu đãi ra mắt giảm 20% cho các đơn hàng Chanh Hoàng Đế.',
    emoji: '🏷️'
  },
  {
    id: 228,
    english: 'bankrupt',
    type: 'adj',
    ipa: "/'bæŋkrʌpt/",
    vietnamese: 'phá sản',
    category: 'brainstorm',
    exampleEn: 'Denise panicked: "If we give a 20% discount, we will be bankrupt!"',
    exampleVi: 'Denise hoảng hốt: "Nếu giảm giá 20%, chúng ta sẽ phá sản mất!"',
    emoji: '📉'
  },
  {
    id: 229,
    english: 'think outside the box',
    type: 'idiom',
    ipa: "/θɪŋk ˌaʊt'saɪd ðə bɒks/",
    vietnamese: 'tư duy đột phá, sáng tạo vượt khỏi lối mòn',
    category: 'brainstorm',
    exampleEn: 'To launch the Imperial Lemon effectively, we need to think outside the box.',
    exampleVi: 'Để ra mắt Chanh Hoàng Đế hiệu quả, chúng ta cần tư duy thật đột phá sáng tạo.',
    emoji: '📦'
  },
  {
    id: 230,
    english: 'agree to disagree',
    type: 'idiom',
    ipa: "/ə'ɡriː tuː ˌdɪsə'ɡriː/",
    vietnamese: 'chấp nhận sự khác biệt quan điểm để tiếp tục làm việc',
    category: 'brainstorm',
    exampleEn: 'Let’s agree to disagree on the discount rate and vote on the final plan.',
    exampleVi: 'Chúng ta hãy chấp nhận các ý kiến khác nhau về mức giảm giá rồi bỏ phiếu quyết định.',
    emoji: '🤝'
  }
];

export const ERROR_CATCH_EXERCISES_UNIT2: ErrorCatchExercise[] = [
  {
    id: 1,
    sentenceWords: ["I", "am", "really", "sorry", "for", "hear", "that", "Mr", "Lime."],
    errorIndex: 4, // 'for' -> 'to'
    correctWord: "to",
    explanation: "Cấu trúc chuẩn là 'I'm sorry TO hear that' (Tôi rất tiếc khi nghe điều đó), đi với động từ to-infinitive."
  },
  {
    id: 2,
    sentenceWords: ["That", "must", "have", "been", "very", "inconvenience", "for", "your", "business."],
    errorIndex: 5, // 'inconvenience' (noun) -> 'inconvenient' (adj)
    correctWord: "inconvenient",
    explanation: "Sau trạng từ 'very' bổ nghĩa cho tính từ: 'very inconvenient' (rất bất tiện)."
  },
  {
    id: 3,
    sentenceWords: ["You", "have", "my", "words", "that", "we", "will", "fix", "this."],
    errorIndex: 3, // 'words' -> 'word'
    correctWord: "word",
    explanation: "Thành ngữ chuẩn giữ danh từ số ít: 'You have my word' (Tôi xin lấy danh dự/lời hứa bảo đảm)."
  },
  {
    id: 4,
    sentenceWords: ["Could", "you", "possibly", "clarifying", "what", "was", "sent", "today?"],
    errorIndex: 3, // 'clarifying' -> 'clarify'
    correctWord: "clarify",
    explanation: "Sau 'Could you possibly + V (nguyên mẫu)', không dùng V-ing."
  },
  {
    id: 5,
    sentenceWords: ["I", "see", "your", "point,", "although", "actually", "I", "think", "it", "works."],
    errorIndex: 4, // 'although' -> 'but'
    correctWord: "but",
    explanation: "Cụm câu phản biện chuẩn trong văn phòng là 'I see your point, BUT actually I think...'."
  }
];

export const UNSCRAMBLE_EXERCISES_UNIT2: UnscrambleExercise[] = [
  {
    id: 1,
    scrambledWords: ["You", "have", "my", "word", "that", "we", "will", "sort", "this", "out."],
    correctSentence: "You have my word that we will sort this out.",
    acceptedSentences: ["You have my word that we will sort this out."],
    meaningVi: "Tôi cam đoan rằng chúng tôi sẽ giải quyết dứt điểm vấn đề này.",
    hintStructure: "You have my word + that + we will sort this out."
  },
  {
    id: 2,
    scrambledWords: ["I", "see", "your", "point,", "but", "actually", "I", "think", "differently."],
    correctSentence: "I see your point, but actually I think differently.",
    acceptedSentences: ["I see your point, but actually I think differently."],
    meaningVi: "Tôi hiểu quan điểm của bạn, nhưng thực ra tôi có suy nghĩ khác.",
    hintStructure: "I see your point, + but actually I think + [adverb/clause]."
  },
  {
    id: 3,
    scrambledWords: ["Could", "you", "possibly", "clarify", "what", "went", "out", "today?"],
    correctSentence: "Could you possibly clarify what went out today?",
    acceptedSentences: ["Could you possibly clarify what went out today?"],
    meaningVi: "Bác có thể vui lòng làm rõ những gì đã xuất kho hôm nay không?",
    hintStructure: "Could you possibly clarify + what went out today?"
  },
  {
    id: 4,
    scrambledWords: ["Give", "me", "a", "shout", "if", "you", "need", "any", "help."],
    correctSentence: "Give me a shout if you need any help.",
    acceptedSentences: ["Give me a shout if you need any help."],
    meaningVi: "Cứ ới tôi một tiếng nếu anh cần bất kỳ sự trợ giúp nào nhé.",
    hintStructure: "Give me a shout + if + you need any help."
  },
  {
    id: 5,
    scrambledWords: ["That", "must", "have", "been", "very", "inconvenient", "for", "you."],
    correctSentence: "That must have been very inconvenient for you.",
    acceptedSentences: ["That must have been very inconvenient for you."],
    meaningVi: "Điều đó chắc hẳn đã gây ra rất nhiều bất tiện cho quý khách.",
    hintStructure: "That must have been + very inconvenient for you."
  }
];

export const READING_PASSAGE_1_UNIT2: ReadingPassageGapFill = {
  title: "Tip Top Trading: Mr Lime's Delivery & The Brainstorm (Episodes 6 - 10)",
  instruction: "Chọn từ thích hợp từ ngân hàng từ vựng để điền vào các vị trí trống (1) - (10) trong câu chuyện dưới đây:",
  wordBank: ["double-booked", "pineapples", "unacceptable", "word", "inconvenience", "praise", "warehouse", "redcurrants", "disagree", "discount"],
  sentences: [
    { text: "Tom is in a panic because he is (1) ", blankIndex: 1, expectedWord: "double-booked", afterText: " with two angry clients at once." },
    { text: "Mr Lime ordered 8,000 grapefruits but received 800,000 (2) ", blankIndex: 2, expectedWord: "pineapples", afterText: "!" },
    { text: "Anna calms Mr Lime by stating: 'That is totally (3) ", blankIndex: 3, expectedWord: "unacceptable", afterText: ".'" },
    { text: "She promises: 'You have my (4) ", blankIndex: 4, expectedWord: "word", afterText: " that we will sort this out today.'" },
    { text: "Anna offers imitation oranges to make up for the (5) ", blankIndex: 5, expectedWord: "inconvenience", afterText: " and presents the new Imperial Lemon." },
    { text: "In Room 301, Paul gives Anna well-deserved (6) ", blankIndex: 6, expectedWord: "praise", afterText: " for keeping calm and professional." },
    { text: "Anna visits the (7) ", blankIndex: 7, expectedWord: "warehouse", afterText: " to check order numbers with Mr Ingle." },
    { text: "Mr Ingle clarifies that 500 (8) ", blankIndex: 8, expectedWord: "redcurrants", afterText: " went to Bluetree Enterprises." },
    { text: "During the brainstorm, Anna learns how to politely (9) ", blankIndex: 9, expectedWord: "disagree", afterText: " with Denise." },
    { text: "Paul approves Anna's idea to offer a 20% (10) ", blankIndex: 10, expectedWord: "discount", afterText: " to regular clients for the launch." }
  ],
  fullAudioText: "Tom is in a panic because he is double-booked with two angry clients at once. Mr Lime ordered 8,000 grapefruits but received 800,000 pineapples! Anna calms Mr Lime by stating: 'That is totally unacceptable.' She promises: 'You have my word that we will sort this out today.' Anna offers imitation oranges to make up for the inconvenience and presents the new Imperial Lemon. In Room 301, Paul gives Anna well-deserved praise for keeping calm and professional. Anna visits the warehouse to check order numbers with Mr Ingle. Mr Ingle clarifies that 500 redcurrants went to Bluetree Enterprises. During the brainstorm, Anna learns how to politely disagree with Denise. Paul approves Anna's idea to offer a 20% discount to regular clients for the launch."
};

export const READING_PASSAGE_2_UNIT2: ReadingPassageTF = {
  title: "Professional Crisis Management & Constructive Workplace Meetings",
  passageText: `Handling operational errors requires empathy, accountability, and clear communication. When a delivery mishap occurs, repeating the client's frustration with phrases like 'That must have been very inconvenient' validates their concerns. Giving explicit guarantees ('You have my word') rebuilds trust. Internally, managers must deliver balanced feedback; recognizing composure during crises motivates staff to excel. Furthermore, when verifying logistics with warehouse personnel, precision is essential—using clarifying phrases like 'Just to be absolutely clear' prevents repeat delivery mistakes. Finally, constructive brainstorming meetings thrive when colleagues express disagreement respectfully ('I see your point, but actually...'), turning potential conflicts into innovative business strategies.`,
  questions: [
    {
      id: 1,
      statement: "Mr Lime was sent 800,000 plastic pineapples instead of 8,000 grapefruits.",
      isTrue: true,
      explanation: "Đúng theo diễn biến Ep 7: Mr Lime received 800,000 plastic pineapples instead of 8,000 grapefruits."
    },
    {
      id: 2,
      statement: "Tip Top Trading's 'big boss' Mr Socrates lives in London.",
      isTrue: false,
      explanation: "Sai, ông Socrates đặt trụ sở và sinh sống tại Mỹ (America)."
    },
    {
      id: 3,
      statement: "Mr Berry of Bluetree Enterprises received a delivery of 500 redcurrants.",
      isTrue: true,
      explanation: "Đúng theo Ep 9: Mr Ingle xác nhận '500 redcurrants' đã được chuyển cho Bluetree Enterprises."
    },
    {
      id: 4,
      statement: "Paul rejected Anna's proposal of a 20% opening discount during the brainstorm.",
      isTrue: false,
      explanation: "Sai, Paul đã đồng ý: 'I like that idea. Good: 20% off for all regular clients just for this month.'"
    },
    {
      id: 5,
      statement: "Saying 'I see your point, but...' is a polite technique for disagreeing in business meetings.",
      isTrue: true,
      explanation: "Đúng, bài đọc và giáo trình BBC khẳng định đây là mẫu câu phản biện lịch sự, chuyên nghiệp."
    }
  ]
};

export const BOXING_QUESTIONS_UNIT2: BoxingQuestion[] = [
  {
    id: 201,
    question: "Trong Ep 7, Anna đã làm gì để xoa dịu cơn thịnh nộ của khách hàng Mr Lime?",
    context: "Ep 7: Mr Lime's grapefruits",
    options: [
      "Đổ lỗi hoàn toàn cho Tom và yêu cầu ông Lime tự trả lại hàng",
      "Xin lỗi chân thành, hứa chuyển phát nhanh bưởi và tặng kèm cam nhân tạo đời mới",
      "Mời ông Lime đi uống bia tại quán rượu",
      "Giảm giá 50% cho đơn hàng năm sau"
    ],
    correctIndex: 1,
    explanation: "Anna nói: 'That's totally unacceptable. You have my word we will sort this out. We'll send your grapefruit via express delivery and include our latest-edition imitation oranges.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 202,
    question: "Trong Ep 8, tại sao Paul lại khen ngợi Anna trong phòng họp 301?",
    context: "Ep 8: Room 301",
    options: [
      "Vì cô ấy đến văn phòng sớm nhất",
      "Vì cô ấy mua bánh quy cho Paul",
      "Vì cô ấy giữ được sự bình tĩnh, thân thiện và tác phong chuyên nghiệp (calm, friendly, professional)",
      "Vì cô ấy biết nói tiếng Pháp"
    ],
    correctIndex: 2,
    explanation: "Paul khen: 'You were in a difficult situation and you handled it well. You remained calm, friendly and professional. Great job.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 203,
    question: "Loại trái cây nào đã được xuất xưởng cho công ty Bluetree Enterprise trong Ep 9?",
    context: "Ep 9: The warehouse",
    options: ["15 quả xoài nhựa", "500 quả lý chua đỏ (redcurrants)", "800 quả chuối tím", "5.000 quả chanh"],
    correctIndex: 1,
    explanation: "Bác Ingle xác nhận: '500 redcurrants' cho Mr Berry của Bluetree Enterprises.",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 204,
    question: "Để phản đối một ý kiến trong cuộc họp mà không làm mếch lòng đồng nghiệp (Ep 10), bạn nên dùng:",
    context: "Ep 10: The brainstorm",
    options: [
      "You are completely wrong!",
      "That is a stupid idea!",
      "I don't care what you think.",
      "I see your point, but actually I think..."
    ],
    correctIndex: 3,
    explanation: "Narrator khuyên: 'To seem more polite, you can try: I see your point, but actually I think...'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 205,
    question: "Mức chiết khấu mà Anna đề xuất cho sản phẩm Imperial Lemon trong buổi họp brainstorm là bao nhiêu?",
    context: "Ep 10: The brainstorm",
    options: ["5%", "20%", "10%", "50%"],
    correctIndex: 1,
    explanation: "Anna đề xuất 20% giảm giá cho đơn hàng đặt trong tháng ra mắt và Paul đã thông qua.",
    damage: 25,
    type: 'vocab'
  }
];

export const LETTER_CLUES_UNIT2 = [
  { id: 1, prompt: 'Trùng hai cuộc hẹn cùng giờ', clue: 'd_____-b_____', fullWord: 'double-booked', emoji: '📅' },
  { id: 2, prompt: 'Hoàn toàn không thể chấp nhận được', clue: 'u___________', fullWord: 'unacceptable', emoji: '❌' },
  { id: 3, prompt: 'Gây ra nhiều bất tiện, phiền hà', clue: 'i___________', fullWord: 'inconvenient', emoji: '⚠️' },
  { id: 4, prompt: 'Lời cam đoan, hứa danh dự', clue: 'y__ h___ m_ w___', fullWord: 'you have my word', emoji: '🤞' },
  { id: 5, prompt: 'Làm rõ thông tin, chi tiết', clue: 'c_______', fullWord: 'clarify', emoji: '🔍' },
  { id: 6, prompt: 'Hiểu quan điểm nhưng phản biện lịch sự', clue: 'I s__ y___ p____', fullWord: 'I see your point', emoji: '💡' },
  { id: 7, prompt: 'Ưu đãi đặc biệt khi ra mắt', clue: 'o______ o____', fullWord: 'opening offer', emoji: '🏷️' },
  { id: 8, prompt: 'Quản lý kho hàng', clue: 'w________ m______', fullWord: 'warehouse manager', emoji: '📦' }
];
