import { VocabItem, BoxingQuestion, ErrorCatchExercise, UnscrambleExercise, ReadingPassageGapFill, ReadingPassageTF } from '../types';

export const VOCABULARY_LIST_UNIT4: VocabItem[] = [
  // Episode 16: Slimy Limey & Politely Refusing (Từ chối lịch sự & Giữ giới hạn công việc)
  {
    id: 401,
    english: 'company policy',
    type: 'noun phrase',
    ipa: "/'kʌmpəni 'pɒləsi/",
    vietnamese: 'quy định / chính sách của công ty',
    category: 'refusal',
    exampleEn: 'I am afraid it is against company policy to have non-business lunches with clients.',
    exampleVi: 'Tôi e rằng việc đi ăn trưa phi công việc với khách hàng là trái với quy định công ty.',
    emoji: '📜'
  },
  {
    id: 402,
    english: 'appropriate',
    type: 'adj',
    ipa: "/ə'prəʊpriət/",
    vietnamese: 'phù hợp, thích đáng, đúng mực',
    category: 'refusal',
    exampleEn: 'It would not be appropriate to discuss personal matters during office hours.',
    exampleVi: 'Sẽ là không phù hợp nếu bàn chuyện cá nhân trong giờ làm việc.',
    emoji: '⚖️'
  },
  {
    id: 403,
    english: 'with regret',
    type: 'phrase',
    ipa: "/wɪð rɪ'ɡret/",
    vietnamese: 'với sự tiếc nuối (dùng khi từ chối trang trọng)',
    category: 'refusal',
    exampleEn: 'So, with regret, I am going to have to say no to your invitation.',
    exampleVi: 'Vì vậy, với sự tiếc nuối, tôi buộc phải từ chối lời mời của ông.',
    emoji: '🙇'
  },
  {
    id: 404,
    english: 'politely decline',
    type: 'phrase',
    ipa: "/pə'laɪtli dɪ'klaɪn/",
    vietnamese: 'từ chối một cách lịch thiệp và nhã nhặn',
    category: 'refusal',
    exampleEn: 'Anna managed to politely decline Seb Lime’s private dinner offer.',
    exampleVi: 'Anna đã khéo léo từ chối một cách lịch thiệp lời mời ăn tối riêng của Seb Lime.',
    emoji: '✋'
  },
  {
    id: 405,
    english: 'draw the line',
    type: 'idiom',
    ipa: "/drɔː ðə laɪn/",
    vietnamese: 'vạch rõ ranh giới, giữ khoảng cách chuyên nghiệp',
    category: 'refusal',
    exampleEn: 'You need to draw the line between professional relations and personal requests.',
    exampleVi: 'Bạn cần vạch rõ ranh giới giữa quan hệ công việc và các yêu cầu cá nhân.',
    emoji: '📏'
  },

  // Episode 17: Lemon-sized luxury boxes & Placing Orders (Đặt hàng nhà cung cấp)
  {
    id: 406,
    english: 'place an order',
    type: 'phrase',
    ipa: "/pleɪs ən 'ɔːdə(r)/",
    vietnamese: 'đặt hàng (với nhà cung cấp)',
    category: 'order',
    exampleEn: 'I would like to place an order for some lemon-sized luxury boxes.',
    exampleVi: 'Tôi muốn đặt một đơn hàng gồm các hộp cao cấp kích cỡ vừa quả chanh.',
    emoji: '📦'
  },
  {
    id: 407,
    english: 'expect to receive',
    type: 'phrase',
    ipa: "/ɪk'spekt tuː rɪ'siːv/",
    vietnamese: 'dự kiến nhận hàng vào thời điểm nào',
    category: 'order',
    exampleEn: 'When can we expect to receive the delivery of the green boxes?',
    exampleVi: 'Khi nào thì chúng tôi có thể dự kiến nhận được lô hàng hộp màu xanh lá?',
    emoji: '🚚'
  },
  {
    id: 408,
    english: 'copy in',
    type: 'phrasal verb',
    ipa: "/'kɒpi ɪn/",
    vietnamese: 'gửi đính kèm (CC) ai đó trong email',
    category: 'order',
    exampleEn: 'Copy in Paul and Tom so it is clear you mean business only.',
    exampleVi: 'Hãy CC cả Paul và Tom vào email để làm rõ rằng cô chỉ trao đổi công việc thuần túy.',
    emoji: '📨'
  },
  {
    id: 409,
    english: 'unit price',
    type: 'noun phrase',
    ipa: "/'juːnɪt praɪs/",
    vietnamese: 'đơn giá từng sản phẩm / từng chiếc',
    category: 'order',
    exampleEn: 'Could you please confirm the unit price for a batch of 500 luxury boxes?',
    exampleVi: 'Bạn có thể vui lòng xác nhận đơn giá cho lô 500 chiếc hộp cao cấp không?',
    emoji: '🏷️'
  },
  {
    id: 410,
    english: 'lead time',
    type: 'noun phrase',
    ipa: "/liːd taɪm/",
    vietnamese: 'thời gian từ lúc đặt hàng đến khi nhận hàng',
    category: 'order',
    exampleEn: 'What is your standard lead time for customized packaging orders?',
    exampleVi: 'Thời gian sản xuất và giao hàng tiêu chuẩn cho bao bì thiết kế riêng là bao lâu?',
    emoji: '⏱️'
  },

  // Episode 18: The Email & Business Writing (Viết email thương mại chuyên nghiệp)
  {
    id: 411,
    english: 'writing regarding',
    type: 'phrase',
    ipa: "/'raɪtɪŋ rɪ'ɡɑːdɪŋ/",
    vietnamese: 'viết thư liên quan đến / về vấn đề...',
    category: 'email',
    exampleEn: 'I am writing regarding your request for luxury boxes for the Imperial Lemon delivery.',
    exampleVi: 'Tôi viết thư này liên quan đến yêu cầu hộp cao cấp cho đợt giao Chanh Hoàng Đế của quý khách.',
    emoji: '✍️'
  },
  {
    id: 412,
    english: 'yours sincerely',
    type: 'phrase',
    ipa: "/jɔːz sɪn'sɪəli/",
    vietnamese: 'trân trọng (kết thúc thư trang trọng khi biết tên người nhận)',
    category: 'email',
    exampleEn: 'Use "Yours sincerely" or "Best wishes" at the end of a professional email.',
    exampleVi: 'Dùng "Yours sincerely" hoặc "Best wishes" ở cuối email công việc chuyên nghiệp.',
    emoji: '🤝'
  },
  {
    id: 413,
    english: 'supply',
    type: 'v',
    ipa: "/sə'plaɪ/",
    vietnamese: 'cung cấp, đáp ứng nguồn hàng',
    category: 'email',
    exampleEn: 'We will indeed be able to supply the 300 boxes you requested.',
    exampleVi: 'Chúng tôi chắc chắn sẽ có thể cung cấp đủ 300 chiếc hộp như quý khách yêu cầu.',
    emoji: '📦'
  },
  {
    id: 414,
    english: 'please find attached',
    type: 'phrase',
    ipa: "/pliːz faɪnd ə'tætʃt/",
    vietnamese: 'xin vui lòng xem tệp đính kèm',
    category: 'email',
    exampleEn: 'Please find attached our official price quote and product brochure.',
    exampleVi: 'Xin vui lòng xem bảng báo giá chính thức và tài liệu giới thiệu đính kèm.',
    emoji: '📎'
  },
  {
    id: 415,
    english: 'prompt response',
    type: 'noun phrase',
    ipa: "/prɒmpt rɪ'spɒns/",
    vietnamese: 'phản hồi nhanh chóng, kịp thời',
    category: 'email',
    exampleEn: 'Thank you for your prompt response regarding the delivery schedule.',
    exampleVi: 'Cảm ơn bạn đã phản hồi nhanh chóng về lịch trình giao nhận hàng.',
    emoji: '⚡'
  },

  // Episode 19: The Open Window & Explaining Misunderstandings (Giải thích hiểu lầm)
  {
    id: 416,
    english: 'misunderstanding',
    type: 'n',
    ipa: "/ˌmɪsʌndə'stændɪŋ/",
    vietnamese: 'sự hiểu lầm, nhầm lẫn ngoài ý muốn',
    category: 'meeting',
    exampleEn: 'I think there has been a misunderstanding; I wrote that stock report.',
    exampleVi: 'Tôi nghĩ đã có một sự hiểu lầm ở đây; chính tôi đã viết bản báo cáo tồn kho đó.',
    emoji: '🤷'
  },
  {
    id: 417,
    english: 'mix-up',
    type: 'n',
    ipa: "/'mɪks ʌp/",
    vietnamese: 'sự lộn xộn, nhầm lẫn do sơ suất',
    category: 'meeting',
    exampleEn: 'There has been a bit of a mix-up because the window was left open.',
    exampleVi: 'Đã có một chút nhầm lẫn xảy ra do cửa sổ bị để mở qua đêm.',
    emoji: '🌪️'
  },
  {
    id: 418,
    english: 'stock management system',
    type: 'noun phrase',
    ipa: "/stɒk 'mænɪdʒmənt 'sɪstəm/",
    vietnamese: 'hệ thống quản trị hàng tồn kho',
    category: 'meeting',
    exampleEn: 'We need to develop an efficient stock management system for our new fruit range.',
    exampleVi: 'Chúng ta cần xây dựng một hệ thống quản trị tồn kho hiệu quả cho dòng quả mới.',
    emoji: '📊'
  },
  {
    id: 419,
    english: 'set the record straight',
    type: 'idiom',
    ipa: "/set ðə 'rekɔːd streɪt/",
    vietnamese: 'làm sáng tỏ sự thật, đính chính thông tin',
    category: 'meeting',
    exampleEn: 'Anna wanted to set the record straight that the stock proposal was her idea, not Tom’s.',
    exampleVi: 'Anna muốn đính chính rõ sự thật rằng đề án quản trị kho là ý tưởng của cô, không phải của Tom.',
    emoji: '⚖️'
  },

  // Episode 20: The Team Meeting & Setting Agendas (Chủ trì & Điều phối agenda cuộc họp)
  {
    id: 420,
    english: 'items on the agenda',
    type: 'noun phrase',
    ipa: "/'aɪtəmz ɒn ðə ə'dʒendə/",
    vietnamese: 'các mục nội dung trong chương trình cuộc họp',
    category: 'meeting',
    exampleEn: 'Thank you for coming. There are four items on the agenda today.',
    exampleVi: 'Cảm ơn mọi người đã đến tham dự. Có bốn nội dung trong chương trình họp hôm nay.',
    emoji: '📋'
  },
  {
    id: 421,
    english: 'any other business (AOB)',
    type: 'phrase',
    ipa: "/'eni 'ʌðə(r) 'bɪznəs/",
    vietnamese: 'các vấn đề phát sinh khác (mục cuối cuộc họp)',
    category: 'meeting',
    exampleEn: 'And finally, any other business, before we can wrap up.',
    exampleVi: 'Và cuối cùng là các vấn đề phát sinh khác, trước khi chúng ta kết thúc cuộc họp.',
    emoji: '📌'
  },
  {
    id: 422,
    english: 'wrap up',
    type: 'phrasal verb',
    ipa: "/ræp ʌp/",
    vietnamese: 'kết thúc, tổng kết cuộc họp',
    category: 'meeting',
    exampleEn: 'It is time for the meeting to end, so let’s wrap up.',
    exampleVi: 'Đã đến giờ kết thúc cuộc họp rồi, chúng ta hãy cùng tổng kết và giải tán nhé.',
    emoji: '🎬'
  },
  {
    id: 423,
    english: 'stick to the agenda',
    type: 'phrase',
    ipa: "/stɪk tuː ðə ə'dʒendə/",
    vietnamese: 'bám sát chương trình nghị sự của cuộc họp',
    category: 'meeting',
    exampleEn: 'We only have 30 minutes left, so let’s stick to the agenda.',
    exampleVi: 'Chúng ta chỉ còn 30 phút, vì vậy hãy bám sát vào các mục trong chương trình họp.',
    emoji: '🎯'
  }
];

export const ERROR_CATCH_EXERCISES_UNIT4: ErrorCatchExercise[] = [
  {
    id: 1,
    sentenceWords: ["I", "am", "afraid", "it", "is", "against", "to", "company", "policy."],
    errorIndex: 6, // 'to' is redundant
    correctWord: "company",
    explanation: "Cụm chuẩn là 'against company policy' (trái với quy định công ty), không có giới từ 'to' ở giữa."
  },
  {
    id: 2,
    sentenceWords: ["I", "am", "writing", "regard", "your", "request", "for", "luxury", "boxes."],
    errorIndex: 3, // 'regard' -> 'regarding'
    correctWord: "regarding",
    explanation: "Cấu trúc chuẩn trong email thương mại là 'I am writing regarding + Noun' (Tôi viết thư liên quan đến...)."
  },
  {
    id: 3,
    sentenceWords: ["There", "have", "been", "a", "bit", "of", "a", "mix-up", "today."],
    errorIndex: 1, // 'have' -> 'has'
    correctWord: "has",
    explanation: "Chủ ngữ là 'a bit of a mix-up' (số ít) nên dùng 'There has been', không dùng 'have'."
  },
  {
    id: 4,
    sentenceWords: ["There", "are", "four", "item", "on", "the", "agenda", "for", "today."],
    errorIndex: 3, // 'item' -> 'items'
    correctWord: "items",
    explanation: "Sau số đếm 'four' danh từ phải ở dạng số nhiều: 'four items'."
  },
  {
    id: 5,
    sentenceWords: ["Let's", "wrapping", "up", "the", "discussion", "and", "start", "working."],
    errorIndex: 1, // 'wrapping' -> 'wrap'
    correctWord: "wrap",
    explanation: "Sau 'Let's' là động từ nguyên mẫu không to: 'Let's wrap up'."
  }
];

export const UNSCRAMBLE_EXERCISES_UNIT4: UnscrambleExercise[] = [
  {
    id: 1,
    scrambledWords: ["I", "am", "afraid", "it", "is", "against", "company", "policy."],
    correctSentence: "I am afraid it is against company policy.",
    acceptedSentences: ["I am afraid it is against company policy."],
    meaningVi: "Tôi e rằng điều đó là trái với quy định của công ty.",
    hintStructure: "I am afraid + it is against + company policy."
  },
  {
    id: 2,
    scrambledWords: ["I", "would", "like", "to", "place", "an", "order", "for", "luxury", "boxes."],
    correctSentence: "I would like to place an order for luxury boxes.",
    acceptedSentences: ["I would like to place an order for luxury boxes."],
    meaningVi: "Tôi muốn đặt một đơn hàng gồm các hộp sang trọng.",
    hintStructure: "I would like to place an order for + [Noun phrase]."
  },
  {
    id: 3,
    scrambledWords: ["I", "am", "writing", "regarding", "your", "request", "for", "the", "delivery."],
    correctSentence: "I am writing regarding your request for the delivery.",
    acceptedSentences: ["I am writing regarding your request for the delivery."],
    meaningVi: "Tôi viết thư này liên quan đến yêu cầu giao hàng của quý khách.",
    hintStructure: "I am writing regarding + your request for + the delivery."
  },
  {
    id: 4,
    scrambledWords: ["There", "are", "four", "items", "on", "the", "agenda", "today."],
    correctSentence: "There are four items on the agenda today.",
    acceptedSentences: ["There are four items on the agenda today."],
    meaningVi: "Hôm nay có bốn mục nội dung trong chương trình cuộc họp.",
    hintStructure: "There are + [number] items on the agenda + today."
  },
  {
    id: 5,
    scrambledWords: ["I", "think", "there", "has", "been", "a", "misunderstanding", "between", "us."],
    correctSentence: "I think there has been a misunderstanding between us.",
    acceptedSentences: ["I think there has been a misunderstanding between us."],
    meaningVi: "Tôi nghĩ rằng đã có một sự hiểu lầm xảy ra giữa chúng ta.",
    hintStructure: "I think there has been + a misunderstanding between us."
  }
];

export const READING_PASSAGE_1_UNIT4: ReadingPassageGapFill = {
  title: "Tip Top Trading: Polite Refusal, Orders & The Agenda (Episodes 16 - 20)",
  instruction: "Chọn từ thích hợp từ ngân hàng từ vựng để điền vào các vị trí trống (1) - (10) trong câu chuyện dưới đây:",
  wordBank: ["refuse", "policy", "order", "receive", "email", "regarding", "misunderstanding", "wind", "agenda", "wrap"],
  sentences: [
    { text: "Anna seeks advice on how to politely (1) ", blankIndex: 1, expectedWord: "refuse", afterText: " Seb Lime's personal lunch invitation." },
    { text: "Denise tells Anna to say it is against company (2) ", blankIndex: 2, expectedWord: "policy", afterText: " to have non-business lunches with clients." },
    { text: "Seb Lime calls back to place an (3) ", blankIndex: 3, expectedWord: "order", afterText: " for 300 green luxury boxes for his lemons." },
    { text: "Anna asks the supplier when Tip Top Trading can expect to (4) ", blankIndex: 4, expectedWord: "receive", afterText: " the shipment." },
    { text: "Paul instructs Anna to write a proper business (5) ", blankIndex: 5, expectedWord: "email", afterText: " rather than informal SMS slang." },
    { text: "Anna starts her email: 'Dear Mr Lime, I am writing (6) ", blankIndex: 6, expectedWord: "regarding", afterText: " your request for luxury boxes.'" },
    { text: "The next morning, Anna explains there has been a (7) ", blankIndex: 7, expectedWord: "misunderstanding", afterText: " over a note left on her desk." },
    { text: "The note had been blown under her desk by the overnight (8) ", blankIndex: 8, expectedWord: "wind", afterText: " from an open window." },
    { text: "Leading her first team meeting, Anna announces the items on the (9) ", blankIndex: 9, expectedWord: "agenda", afterText: "." },
    { text: "After discussing stock and new fruit colours, Anna invites any other business before they (10) ", blankIndex: 10, expectedWord: "wrap", afterText: " up." }
  ],
  fullAudioText: "Anna seeks advice on how to politely refuse Seb Lime's personal lunch invitation. Denise tells Anna to say it is against company policy to have non-business lunches with clients. Seb Lime calls back to place an order for 300 green luxury boxes for his lemons. Anna asks the supplier when Tip Top Trading can expect to receive the shipment. Paul instructs Anna to write a proper business email rather than informal SMS slang. Anna starts her email: 'Dear Mr Lime, I am writing regarding your request for luxury boxes.' The next morning, Anna explains there has been a misunderstanding over a note left on her desk. The note had been blown under her desk by the overnight wind from an open window. Leading her first team meeting, Anna announces the items on the agenda. After discussing stock and new fruit colours, Anna invites any other business before they wrap up."
};

export const READING_PASSAGE_2_UNIT4: ReadingPassageTF = {
  title: "Professional Standards: Refusals, Procurement, Emails and Meetings",
  passageText: `Maintaining professionalism in the workplace requires mastering diplomatic language in varied scenarios. When declining non-business social advances from clients, framing the refusal around company policies and appropriateness protects working relationships while maintaining firm boundaries. In procurement, placing orders accurately involves specifying exact quantities, custom specifications (such as branding labels), and delivery timelines. When communicating with clients via email, formal conventions—such as 'Dear Mr [Surname]', 'I am writing regarding...', and 'Yours sincerely'—must strictly replace shorthand texting jargon. Lastly, effective meeting chairs maintain discipline by establishing sequential agenda items ('Firstly', 'Secondly', 'After that') and providing a structured opportunity for Any Other Business before officially wrapping up.`,
  questions: [
    {
      id: 1,
      statement: "Seb Lime requested green luxury boxes for each Imperial Lemon delivered.",
      isTrue: true,
      explanation: "Đúng theo Ep 17: 'He wants each Imperial Lemon you deliver to come in a luxury green box.'"
    },
    {
      id: 2,
      statement: "Paul was thrilled with Anna's first email that used abbreviations like 'pls c-d-u cfirm wnt 300 ta'.",
      isTrue: false,
      explanation: "Sai, Paul nhắc nhở cô viết lại email bằng từ ngữ chuẩn mực: 'That's not really the best way of writing an email to a client.'"
    },
    {
      id: 3,
      statement: "The note about the stock management system was originally intended for Tom.",
      isTrue: true,
      explanation: "Đúng theo Ep 19: Paul xác nhận 'that note was for Tom' nhưng bị gió thổi sang bàn của Anna."
    },
    {
      id: 4,
      statement: "In meeting management, 'AOB' stands for 'Any Other Business'.",
      isTrue: true,
      explanation: "Đúng, AOB là thuật ngữ viết tắt của Any Other Business (các vấn đề khác ngoài agenda)."
    },
    {
      id: 5,
      statement: "'To wrap up' in a business meeting means to put on warm coats.",
      isTrue: false,
      explanation: "Sai, Narrator giải thích 'Let's wrap up. It means let's finish.'"
    }
  ]
};

export const BOXING_QUESTIONS_UNIT4: BoxingQuestion[] = [
  {
    id: 401,
    question: "Để từ chối lời mời ăn trưa riêng tư của khách hàng một cách khéo léo (Ep 16), Anna đã nói:",
    context: "Ep 16: Slimy Limey!",
    options: [
      "Go away Slimy Limey!",
      "I'm afraid it is against company policy... with regret, I'm going to have to say no.",
      "I hate having lunch with you.",
      "I am already married."
    ],
    correctIndex: 1,
    explanation: "Anna dùng mẫu câu từ chối chuẩn mực: 'Thank you for your offer. But I'm really sorry... I'm afraid it is against company policy... with regret, I'm going to have to say no.'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 402,
    question: "Khi đặt hàng 300 chiếc hộp cho Mr Lime (Ep 17), câu nào thể hiện sự lịch sự và đầy đủ thông tin?",
    context: "Ep 17: Lemon-sized luxury boxes",
    options: [
      "Send 300 boxes immediately or I cancel.",
      "Give me boxes right now.",
      "I'd like to place an order for 300 green boxes... when can we expect to receive them?",
      "Where are my boxes?"
    ],
    correctIndex: 2,
    explanation: "Narrator hướng dẫn cấu trúc: 'I'd like to place an order for... We're going to need... When can we expect to receive them?'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 403,
    question: "Trong Ep 18, cụm mở đầu email thương mại chuẩn mực thay thế cho tin nhắn SMS tắt là gì?",
    context: "Ep 18: The email",
    options: [
      "Yo Lime! Boxes r ready.",
      "Dear Mr Lime, I hope you are well. I am writing regarding...",
      "Hey man, check this out.",
      "What's up Lime, confirm 300 ta."
    ],
    correctIndex: 1,
    explanation: "Tom và Narrator hướng dẫn mẫu câu email chuẩn: 'Dear Mr Lime, I hope you are well. I am writing regarding your request...'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 404,
    question: "Trong Ep 20, mục thứ hai trong chương trình cuộc họp (agenda) mà Anna điều hành là gì?",
    context: "Ep 20: The Team Meeting",
    options: [
      "Hệ thống quản lý kho (stock management systems)",
      "Kế hoạch cho hoạt động teambuilding (plans for a team-building activity)",
      "Màu sắc của quả táo mới",
      "Chọn địa điểm ăn tối"
    ],
    correctIndex: 1,
    explanation: "Anna thông báo: 'Secondly, plans for a team-building activity (collective groan).'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 405,
    question: "Cụm 'Let's wrap up' ở cuối buổi họp (Ep 20) có nghĩa là gì?",
    context: "Ep 20: The Team Meeting",
    options: [
      "Chúng ta hãy gói quà mang về",
      "Chúng ta hãy bắt đầu tranh luận",
      "Chúng ta hãy đi ăn trưa",
      "Chúng ta hãy kết thúc / tổng kết cuộc họp tại đây"
    ],
    correctIndex: 3,
    explanation: "Narrator giải thích: 'Let's wrap up. It means let's finish.'",
    damage: 25,
    type: 'vocab'
  }
];

export const LETTER_CLUES_UNIT4 = [
  { id: 1, prompt: 'Trái với quy định của công ty', clue: 'a______ c______ p_____', fullWord: 'against company policy', emoji: '📜' },
  { id: 2, prompt: 'Tiếc nuối từ chối lời mời', clue: 'w___ r_____', fullWord: 'with regret', emoji: '🙇' },
  { id: 3, prompt: 'Tiến hành đặt một đơn hàng', clue: 'p____ a_ o____', fullWord: 'place an order', emoji: '📦' },
  { id: 4, prompt: 'Tôi viết thư liên quan đến...', clue: 'w______ r________', fullWord: 'writing regarding', emoji: '✍️' },
  { id: 5, prompt: 'Sự nhầm lẫn ngoài ý muốn', clue: 'm_______________', fullWord: 'misunderstanding', emoji: '🤷' },
  { id: 6, prompt: 'Các mục trong chương trình họp', clue: 'i____ o_ t__ a_____', fullWord: 'items on the agenda', emoji: '📋' },
  { id: 7, prompt: 'Các vấn đề phát sinh khác (AOB)', clue: 'a__ o____ b_______', fullWord: 'any other business', emoji: '📌' },
  { id: 8, prompt: 'Kết thúc và tổng kết cuộc họp', clue: 'w___ u_', fullWord: 'wrap up', emoji: '🎬' }
];
