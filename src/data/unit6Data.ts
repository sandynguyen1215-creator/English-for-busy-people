import { VocabItem, BoxingQuestion, ErrorCatchExercise, UnscrambleExercise, ReadingPassageGapFill, ReadingPassageTF } from '../types';

export const VOCABULARY_LIST_UNIT6: VocabItem[] = [
  // Episode 26: You cannot be serious! & Complaining (Khiếu nại dịch vụ khách sạn)
  {
    id: 601,
    english: 'disappointed with your service',
    type: 'phrase',
    ipa: "/ˌdɪsə'pɔɪntɪd wɪð jɔː 'sɜːvɪs/",
    vietnamese: 'thất vọng về chất lượng dịch vụ của bạn',
    category: 'complaint',
    exampleEn: 'I am very disappointed with your service; the room did not meet my expectations.',
    exampleVi: 'Tôi rất thất vọng về dịch vụ của quý khách; căn phòng không đáp ứng được kỳ vọng của tôi.',
    emoji: '👎'
  },
  {
    id: 602,
    english: 'standard of service',
    type: 'noun phrase',
    ipa: "/'stændəd əv 'sɜːvɪs/",
    vietnamese: 'tiêu chuẩn / đẳng cấp dịch vụ',
    category: 'complaint',
    exampleEn: 'The standard of service is simply not good enough for a five-star hotel.',
    exampleVi: 'Đẳng cấp dịch vụ đơn giản là chưa đủ tốt đối với một khách sạn năm sao.',
    emoji: '⭐'
  },
  {
    id: 603,
    english: 'meet my expectations',
    type: 'phrase',
    ipa: "/miːt maɪ ˌekspek'teɪʃnz/",
    vietnamese: 'đáp ứng sự mong đợi của tôi',
    category: 'complaint',
    exampleEn: 'The single bed provided in Room 101 did not meet our expectations.',
    exampleVi: 'Chiếc giường đơn được bố trí ở phòng 101 đã không đáp ứng được sự mong đợi của chúng tôi.',
    emoji: '📉'
  },
  {
    id: 604,
    english: 'matter resolved',
    type: 'phrase',
    ipa: "/'mætə rɪ'zɒlvd/",
    vietnamese: 'vấn đề được giải quyết thỏa đáng',
    category: 'complaint',
    exampleEn: 'I would like this matter resolved as quickly as possible.',
    exampleVi: 'Tôi muốn vấn đề này được giải quyết thỏa đáng càng nhanh càng tốt.',
    emoji: '⚖️'
  },
  {
    id: 605,
    english: 'full refund',
    type: 'noun phrase',
    ipa: "/fʊl 'riːfʌnd/",
    vietnamese: 'hoàn lại toàn bộ tiền',
    category: 'complaint',
    exampleEn: 'Mr Socrates demanded a full refund for the terrible night in the small room.',
    exampleVi: 'Ông Socrates yêu cầu hoàn lại toàn bộ tiền cho đêm nghỉ tồi tệ trong phòng chật hẹp.',
    emoji: '💵'
  },

  // Episode 27: Getting down to business & Bad News (Thông báo tin xấu & Áp lực doanh số)
  {
    id: 606,
    english: 'give it to you straight',
    type: 'idiom',
    ipa: "/ɡɪv ɪt tuː juː streɪt/",
    vietnamese: 'nói thẳng, nói thật không giấu giếm',
    category: 'badnews',
    exampleEn: 'I have got to give it to you straight: the company outlook is gloomy.',
    exampleVi: 'Tôi phải nói thẳng thắn với các bạn: viễn cảnh tương lai công ty đang rất ảm đạm.',
    emoji: '🎯'
  },
  {
    id: 607,
    english: 'outlook is gloomy',
    type: 'phrase',
    ipa: "/'aʊtlʊk ɪz 'ɡluːmi/",
    vietnamese: 'viễn cảnh / tương lai ảm đạm, u tối',
    category: 'badnews',
    exampleEn: 'Due to the recession, the economic outlook is gloomy for our sector.',
    exampleVi: 'Do suy thoái kinh tế, viễn cảnh tương lai cho ngành của chúng ta rất ảm đạm.',
    emoji: '🌧️'
  },
  {
    id: 608,
    english: 'profit warning',
    type: 'noun phrase',
    ipa: "/'prɒfɪt 'wɔːnɪŋ/",
    vietnamese: 'cảnh báo sụt giảm lợi nhuận',
    category: 'badnews',
    exampleEn: 'Mr Socrates had to announce a profit warning to the London team.',
    exampleVi: 'Ông Socrates đã phải đưa ra lời cảnh báo sụt giảm lợi nhuận tới đội ngũ London.',
    emoji: '📉'
  },
  {
    id: 609,
    english: 'necks will be on the line',
    type: 'idiom',
    ipa: "/neks wɪl biː ɒn ðə laɪn/",
    vietnamese: 'nguy cơ bị sa thải / chịu trách nhiệm trước số phận công việc',
    category: 'badnews',
    exampleEn: 'If profits do not improve, your necks will be on the line – especially Paul’s.',
    exampleVi: 'Nếu lợi nhuận không cải thiện, chiếc ghế của các bạn sẽ bị lung lay – đặc biệt là Paul.',
    emoji: '⚡'
  },
  {
    id: 610,
    english: 'drastic measures',
    type: 'noun phrase',
    ipa: "/'dræstɪk 'meʒəz/",
    vietnamese: 'những biện pháp quyết liệt, mạnh tay',
    category: 'badnews',
    exampleEn: 'Unless sales increase drastically, headquarters will take drastic measures.',
    exampleVi: 'Trừ khi doanh số tăng vọt, nếu không trụ sở chính sẽ áp dụng các biện pháp mạnh tay.',
    emoji: '✂️'
  },

  // Episode 28: Home truths & Professional Language (Tác phong công việc & Giữ chừng mực)
  {
    id: 611,
    english: 'keep the conversation professional',
    type: 'phrase',
    ipa: "/kiːp ðə ˌkɒnvə'seɪʃn prə'feʃənl/",
    vietnamese: 'giữ cho cuộc trò chuyện đúng mực, thuần túy công việc',
    category: 'etiquette',
    exampleEn: 'Anna said: Can we keep our conversation professional please?',
    exampleVi: 'Anna nói: Liệu chúng ta có thể giữ cho cuộc trò chuyện đúng mực công việc được không?',
    emoji: '👔'
  },
  {
    id: 612,
    english: 'change the subject',
    type: 'phrase',
    ipa: "/tʃeɪndʒ ðə 'sʌbdʒɪkt/",
    vietnamese: 'chuyển đề tài nói chuyện',
    category: 'etiquette',
    exampleEn: 'Could we change the subject please? Let’s talk about our European strategy.',
    exampleVi: 'Liệu chúng ta có thể đổi chủ đề được không? Hãy bàn về chiến lược Châu Âu.',
    emoji: '🔄'
  },
  {
    id: 613,
    english: 'not appropriate',
    type: 'phrase',
    ipa: "/nɒt ə'prəʊpriət/",
    vietnamese: 'không phù hợp, không đứng đắn',
    category: 'etiquette',
    exampleEn: 'Mr Socrates, I do not think it is appropriate to talk like that in the pub.',
    exampleVi: 'Ông Socrates, tôi không nghĩ việc nói chuyện như vậy trong quán rượu là phù hợp.',
    emoji: '🛑'
  },
  {
    id: 614,
    english: 'maintain boundaries',
    type: 'phrase',
    ipa: "/meɪn'teɪn 'baʊndriz/",
    vietnamese: 'duy trì giới hạn lịch thiệp nơi công sở',
    category: 'etiquette',
    exampleEn: 'It is important to maintain professional boundaries even outside the office.',
    exampleVi: 'Việc duy trì ranh giới chuyên nghiệp ngay cả khi ở ngoài văn phòng là rất quan trọng.',
    emoji: '🛡️'
  },

  // Episode 29: Cold calling & Putting feelers out (Chào hàng trực tiếp & Thăm dò thị trường)
  {
    id: 615,
    english: 'cold calling',
    type: 'noun phrase',
    ipa: "/kəʊld 'kɔːlɪŋ/",
    vietnamese: 'chào hàng qua điện thoại tới khách hàng chưa từng liên hệ',
    category: 'negotiation',
    exampleEn: 'Cold calling is when you call prospective clients who are not expecting your call.',
    exampleVi: 'Cold calling là khi bạn gọi điện cho các khách hàng tiềm năng chưa từng hẹn trước.',
    emoji: '📞'
  },
  {
    id: 616,
    english: 'put the feelers out',
    type: 'idiom',
    ipa: "/pʊt ðə 'fiːləz aʊt/",
    vietnamese: 'thăm dò thị trường, thăm dò phản ứng khách hàng',
    category: 'negotiation',
    exampleEn: 'Paul suggested putting the feelers out across Europe to find new buyers.',
    exampleVi: 'Paul đề xuất thăm dò thị trường khắp Châu Âu để tìm người mua mới.',
    emoji: '📡'
  },
  {
    id: 617,
    english: 'prospective clients',
    type: 'noun phrase',
    ipa: "/prə'spektɪv 'klaɪənts/",
    vietnamese: 'khách hàng tiềm năng',
    category: 'negotiation',
    exampleEn: 'Anna prepared a pitch deck targeting new prospective clients in France.',
    exampleVi: 'Anna chuẩn bị một bộ hồ sơ thuyết trình nhắm tới các khách hàng tiềm năng mới ở Pháp.',
    emoji: '🎯'
  },

  // Episode 30: Two heads are better than one & Negotiating (Đàm phán giá cả & Thỏa hiệp)
  {
    id: 618,
    english: 'negotiate',
    type: 'v',
    ipa: "/nɪ'ɡəʊʃieɪt/",
    vietnamese: 'thương lượng, đàm phán giá cả',
    category: 'negotiation',
    exampleEn: 'You must negotiate: ask them what kind of price they are willing to pay.',
    exampleVi: 'Cô phải đàm phán: hãy hỏi họ mức giá nào mà họ sẵn sàng chi trả.',
    emoji: '🤝'
  },
  {
    id: 619,
    english: 'cannot go that low',
    type: 'phrase',
    ipa: "/'kænɒt ɡəʊ ðæt ləʊ/",
    vietnamese: 'không thể giảm giá xuống mức thấp như vậy',
    category: 'negotiation',
    exampleEn: 'I am sorry, but I do not think we can go that low on our Imperial Lemons.',
    exampleVi: 'Tôi rất tiếc, nhưng tôi không nghĩ chúng tôi có thể hạ giá sâu đến mức như vậy.',
    emoji: '📉'
  },
  {
    id: 620,
    english: 'meet you half way',
    type: 'idiom',
    ipa: "/miːt juː hɑːf weɪ/",
    vietnamese: 'nhượng bộ đôi bên cùng có lợi (thỏa hiệp ở mức giá trung gian)',
    category: 'negotiation',
    exampleEn: 'If we cannot agree on £4, I will meet you half way at £3.50.',
    exampleVi: 'Nếu chúng ta chưa thống nhất được giá 4 bảng, tôi xin nhượng bộ ở mức giữa 3.50 bảng.',
    emoji: '🤝'
  },
  {
    id: 621,
    english: 'stationery cupboard',
    type: 'noun phrase',
    ipa: "/'steɪʃənri 'kʌbəd/",
    vietnamese: 'tủ chứa văn phòng phẩm (nơi Anna và Tom bị nhốt)',
    category: 'negotiation',
    exampleEn: 'Anna and Tom got locked inside the stationery cupboard while looking for an envelope.',
    exampleVi: 'Anna và Tom đã bị kẹt trong tủ văn phòng phẩm khi đang tìm phong bì gửi hợp đồng.',
    emoji: '🗄️'
  }
];

export const ERROR_CATCH_EXERCISES_UNIT6: ErrorCatchExercise[] = [
  {
    id: 1,
    sentenceWords: ["I", "am", "very", "disappoint", "with", "the", "standard", "of", "service."],
    errorIndex: 3, // 'disappoint' -> 'disappointed'
    correctWord: "disappointed",
    explanation: "Cấu trúc chỉ cảm xúc là tính từ dạng bị động: 'I am very disappointed with...'"
  },
  {
    id: 2,
    sentenceWords: ["I", "have", "got", "to", "give", "it", "to", "you", "straightly."],
    errorIndex: 8, // 'straightly' -> 'straight'
    correctWord: "straight",
    explanation: "Thành ngữ chuẩn là 'give it to you straight' (nói thẳng), từ 'straight' vừa là tính từ vừa là phó từ."
  },
  {
    id: 3,
    sentenceWords: ["Can", "we", "keeping", "our", "conversation", "professional", "please?"],
    errorIndex: 2, // 'keeping' -> 'keep'
    correctWord: "keep",
    explanation: "Sau động từ khuyết thiếu 'Can we' là động từ nguyên mẫu: 'Can we keep...'."
  },
  {
    id: 4,
    sentenceWords: ["I", "do", "not", "think", "we", "can", "go", "so", "lower."],
    errorIndex: 8, // 'lower' -> 'low'
    correctWord: "low",
    explanation: "Cụm thành ngữ đàm phán chuẩn là 'we can't go that low' (không thể hạ xuống thấp đến vậy)."
  },
  {
    id: 5,
    sentenceWords: ["If", "you", "will", "buy", "more", "stock,", "I", "offer", "a", "discount."],
    errorIndex: 2, // 'will' in if-clause -> remove 'will'
    correctWord: "buy",
    explanation: "Trong mệnh đề điều kiện loại 1 (If-clause), không dùng 'will': 'If you buy more stock, I will offer a discount.'"
  }
];

export const UNSCRAMBLE_EXERCISES_UNIT6: UnscrambleExercise[] = [
  {
    id: 1,
    scrambledWords: ["I", "am", "very", "disappointed", "with", "your", "standard", "of", "service."],
    correctSentence: "I am very disappointed with your standard of service.",
    acceptedSentences: ["I am very disappointed with your standard of service."],
    meaningVi: "Tôi rất thất vọng với tiêu chuẩn dịch vụ của quý khách sạn.",
    hintStructure: "I am very disappointed with + your standard of service."
  },
  {
    id: 2,
    scrambledWords: ["I", "have", "got", "to", "give", "it", "to", "you", "straight."],
    correctSentence: "I have got to give it to you straight.",
    acceptedSentences: ["I have got to give it to you straight."],
    meaningVi: "Tôi phải nói thẳng thắn và trung thực với các bạn.",
    hintStructure: "I have got to give it to you straight."
  },
  {
    id: 3,
    scrambledWords: ["Can", "we", "keep", "our", "conversation", "professional", "please?"],
    correctSentence: "Can we keep our conversation professional please?",
    acceptedSentences: ["Can we keep our conversation professional please?"],
    meaningVi: "Chúng ta có thể giữ cho cuộc trò chuyện đúng mực công việc được không?",
    hintStructure: "Can we keep our conversation professional + please?"
  },
  {
    id: 4,
    scrambledWords: ["I", "do", "not", "think", "we", "can", "go", "that", "low."],
    correctSentence: "I do not think we can go that low.",
    acceptedSentences: ["I do not think we can go that low."],
    meaningVi: "Tôi không nghĩ rằng chúng tôi có thể hạ giá xuống mức thấp như vậy.",
    hintStructure: "I do not think + we can go that low."
  },
  {
    id: 5,
    scrambledWords: ["If", "you", "buy", "more", "stock,", "I", "can", "offer", "a", "bigger", "discount."],
    correctSentence: "If you buy more stock, I can offer a bigger discount.",
    acceptedSentences: ["If you buy more stock, I can offer a bigger discount."],
    meaningVi: "Nếu quý khách mua số lượng lớn hơn, tôi có thể chiết khấu cao hơn.",
    hintStructure: "If you buy more stock, + I can offer a bigger discount."
  }
];

export const READING_PASSAGE_1_UNIT6: ReadingPassageGapFill = {
  title: "Tip Top Trading: Complaining, Bad News & The French Deal (Episodes 26 - 30)",
  instruction: "Chọn từ thích hợp từ ngân hàng từ vựng để điền vào các vị trí trống (1) - (10) trong câu chuyện dưới đây:",
  wordBank: ["expectations", "refund", "gloomy", "Europe", "professional", "pub", "calling", "France", "negotiate", "cupboard"],
  sentences: [
    { text: "Anna complains to the Royal Imperial Hotel that the room failed to meet (1) ", blankIndex: 1, expectedWord: "expectations", afterText: "." },
    { text: "Denise takes over the phone and demands an immediate room change or a full (2) ", blankIndex: 2, expectedWord: "refund", afterText: "." },
    { text: "Mr Socrates addresses the London team, warning that the company outlook is (3) ", blankIndex: 3, expectedWord: "gloomy", afterText: "." },
    { text: "To save the business, Mr Socrates announces plans to expand aggressively into (4) ", blankIndex: 4, expectedWord: "Europe", afterText: "." },
    { text: "At the Rose and Crown pub, Anna asks Mr Socrates to keep the conversation (5) ", blankIndex: 5, expectedWord: "professional", afterText: "." },
    { text: "Mr Socrates enjoys drinking English beer at the (6) ", blankIndex: 6, expectedWord: "pub", afterText: " and decides not to fire Tom." },
    { text: "Back at the office, Anna tries cold (7) ", blankIndex: 7, expectedWord: "calling", afterText: " prospective fruit traders in France." },
    { text: "A fruit trader from (8) ", blankIndex: 8, expectedWord: "France", afterText: " calls back complaining that Tip Top is too expensive." },
    { text: "Tom gives Anna expert advice on how to (9) ", blankIndex: 9, expectedWord: "negotiate", afterText: " and meet them half way." },
    { text: "Anna closes a 5,000 lemon deal but ends up locked with Tom in the stationery (10) ", blankIndex: 10, expectedWord: "cupboard", afterText: "!" }
  ],
  fullAudioText: "Anna complains to the Royal Imperial Hotel that the room failed to meet expectations. Denise takes over the phone and demands an immediate room change or a full refund. Mr Socrates addresses the London team, warning that the company outlook is gloomy. To save the business, Mr Socrates announces plans to expand aggressively into Europe. At the Rose and Crown pub, Anna asks Mr Socrates to keep the conversation professional. Mr Socrates enjoys drinking English beer at the pub and decides not to fire Tom. Back at the office, Anna tries cold calling prospective fruit traders in France. A fruit trader from France calls back complaining that Tip Top is too expensive. Tom gives Anna expert advice on how to negotiate and meet them half way. Anna closes a 5,000 lemon deal but ends up locked with Tom in the stationery cupboard!"
};

export const READING_PASSAGE_2_UNIT6: ReadingPassageTF = {
  title: "Assertive Problem-Solving, Strategic Pivots and Negotiation Skills",
  passageText: `Corporate professionals frequently navigate high-stakes interactions ranging from resolving vendor disputes to closing international contracts. When addressing unsatisfactory services, asserting that 'the standard of service did not meet expectations' communicates dissatisfaction firmly while allowing vendors to rectify the issue. In times of organizational distress, executive leadership must deliver difficult truths—such as profit warnings and market expansion imperatives—with direct clarity ('giving it straight'). Furthermore, maintaining professional conduct during informal social gatherings prevents workplace boundaries from blurring. In commercial sales, cold calling requires politeness and brevity, while price negotiations depend on concession strategies: offering discounts only in exchange for higher volume ('if you buy more stock, we can offer a bigger discount') or proposing to 'meet halfway'.`,
  questions: [
    {
      id: 1,
      statement: "Mr Socrates announced that Tip Top Trading would expand into the European market.",
      isTrue: true,
      explanation: "Đúng theo Ep 27: 'My plan is... we're going into Europe.'"
    },
    {
      id: 2,
      statement: "The pub where the team took Mr Socrates is called The Rose and Crown.",
      isTrue: true,
      explanation: "Đúng theo Ep 28: Địa điểm quán rượu là The Rose and Crown."
    },
    {
      id: 3,
      statement: "In negotiation, 'I'll meet you half way' means travelling to a midpoint city like Paris.",
      isTrue: false,
      explanation: "Sai, đây là thành ngữ thương lượng có nghĩa là thỏa hiệp ở mức giá trung gian đôi bên cùng chấp nhận."
    },
    {
      id: 4,
      statement: "Fruit Traders International in France agreed to buy 5,000 Imperial Lemons.",
      isTrue: true,
      explanation: "Đúng theo Ep 30: 'Success! They've agreed to buy 5,000 Imperial Lemons.'"
    },
    {
      id: 5,
      statement: "Tom and Anna were looking for biscuits when they got locked in the stationery cupboard.",
      isTrue: false,
      explanation: "Sai, họ vào tủ để tìm phong bì (envelopes) gửi hợp đồng cho khách hàng Pháp."
    }
  ]
};

export const BOXING_QUESTIONS_UNIT6: BoxingQuestion[] = [
  {
    id: 601,
    question: "Tên quán rượu mà cả nhóm Tip Top Trading mời Mr Socrates đến thưởng thức bia Anh (Ep 28) là gì?",
    context: "Ep 28: Home truths",
    options: ["The King's Head", "The Red Lion", "The Rose and Crown", "The Queen's Arms"],
    correctIndex: 2,
    explanation: "Cả nhóm đã đưa ông Socrates đến quán rượu The Rose and Crown gần văn phòng.",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 602,
    question: "Khi đối tác chê giá sản phẩm quá đắt (Ep 30), câu đàm phán thông minh để giữ biên lợi nhuận là:",
    context: "Ep 30: Two heads are better than one",
    options: [
      "Okay, take it for free.",
      "If you buy more stock, I can offer you a bigger discount.",
      "You are too cheap, go away.",
      "We will sell at a huge loss for you."
    ],
    correctIndex: 1,
    explanation: "Tom hướng dẫn Anna: 'If they want a bigger discount, tell them they will have to buy more stock.'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 603,
    question: "Số lượng quả Imperial Lemon mà công ty Fruit Traders International ở Pháp đồng ý ký hợp đồng mua (Ep 30) là:",
    context: "Ep 30: Two heads are better than one",
    options: ["500 quả", "50.000 quả", "5.000 quả", "800.000 quả"],
    correctIndex: 2,
    explanation: "Anna vui mừng thông báo: 'Success! They've agreed to buy 5,000 Imperial Lemons.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 604,
    question: "Cụm từ 'to meet you half way' trong nghệ thuật đàm phán thương mại mang ý nghĩa gì?",
    context: "Ep 30: Two heads are better than one",
    options: [
      "Hẹn gặp nhau ở giữa đường (nửa quãng đường)",
      "Thỏa hiệp đôi bên cùng có lợi ở mức giá trung gian",
      "Đi máy bay sang Paris gặp mặt",
      "Chia đôi số lượng hàng hóa"
    ],
    correctIndex: 1,
    explanation: "Tom giải thích: 'Half way on the price. That line always works for me.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 605,
    question: "Khi sếp nói chuyện quá suồng sã hoặc thô lỗ ngoài giờ làm (Ep 28), câu đề nghị chuẩn mực là:",
    context: "Ep 28: Home truths",
    options: [
      "Shut up right now!",
      "I hate your attitude.",
      "You are a terrible boss.",
      "Can we keep our conversation professional please?"
    ],
    correctIndex: 3,
    explanation: "Narrator hướng dẫn Anna: 'Can we keep our conversation professional please? / It's not appropriate to talk like that.'",
    damage: 25,
    type: 'grammar'
  }
];

export const LETTER_CLUES_UNIT6 = [
  { id: 1, prompt: 'Thất vọng về chất lượng dịch vụ', clue: 'd___________ w___ s______', fullWord: 'disappointed with service', emoji: '👎' },
  { id: 2, prompt: 'Nói thẳng, không giấu giếm', clue: 'g___ i_ t_ y__ s_______', fullWord: 'give it to you straight', emoji: '🎯' },
  { id: 3, prompt: 'Cảnh báo sụt giảm lợi nhuận', clue: 'p_____ w______', fullWord: 'profit warning', emoji: '📉' },
  { id: 4, prompt: 'Giữ cuộc nói chuyện chuyên nghiệp', clue: 'k___ c___________ p___________', fullWord: 'keep conversation professional', emoji: '👔' },
  { id: 5, prompt: 'Chào hàng qua điện thoại', clue: 'c___ c______', fullWord: 'cold calling', emoji: '📞' },
  { id: 6, prompt: 'Thăm dò thị trường', clue: 'p__ t__ f______ o__', fullWord: 'put the feelers out', emoji: '📡' },
  { id: 7, prompt: 'Thỏa hiệp mức giá trung gian', clue: 'm___ h___ w__', fullWord: 'meet half way', emoji: '🤝' },
  { id: 8, prompt: 'Tủ chứa văn phòng phẩm', clue: 's_________ c______', fullWord: 'stationery cupboard', emoji: '🗄️' }
];
