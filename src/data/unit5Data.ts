import { VocabItem, BoxingQuestion, ErrorCatchExercise, UnscrambleExercise, ReadingPassageGapFill, ReadingPassageTF } from '../types';

export const VOCABULARY_LIST_UNIT5: VocabItem[] = [
  // Episode 21: Don't Panic & Asking for Help (Xin lời khuyên & Nhờ trợ giúp)
  {
    id: 501,
    english: 'most grateful',
    type: 'phrase',
    ipa: "/məʊst 'ɡreɪtfl/",
    vietnamese: 'vô cùng biết ơn (khi nhờ vả trang trọng)',
    category: 'advice',
    exampleEn: 'I would be most grateful if you could give me some help with this project.',
    exampleVi: 'Tôi sẽ vô cùng biết ơn nếu anh có thể giúp tôi một tay trong dự án này.',
    emoji: '🙏'
  },
  {
    id: 502,
    english: 'spare a few minutes',
    type: 'phrase',
    ipa: "/speə(r) ə fjuː 'mɪnɪts/",
    vietnamese: 'dành ra vài phút quý báu',
    category: 'advice',
    exampleEn: 'I know you are busy but could you spare me a few minutes of your time please?',
    exampleVi: 'Tôi biết chị bận nhưng chị có thể bớt chút vài phút cho tôi được không?',
    emoji: '⏱️'
  },
  {
    id: 503,
    english: 'bite your head off',
    type: 'idiom',
    ipa: "/baɪt jɔː hed ɒf/",
    vietnamese: 'nổi đóa, gắt gỏng gay gắt với ai',
    category: 'advice',
    exampleEn: 'If you approach Mr Ingle politely, he will not bite your head off!',
    exampleVi: 'Nếu cô tiếp cận bác Ingle lịch sự, bác ấy sẽ không nổi đóa lên đâu!',
    emoji: '😡'
  },
  {
    id: 504,
    english: 'have a word with',
    type: 'idiom',
    ipa: "/hæv ə wɜːd wɪð/",
    vietnamese: 'nói chuyện riêng, trao đổi ngắn với ai',
    category: 'advice',
    exampleEn: 'Could I have a quick word with you about Mr Socrates’ upcoming visit?',
    exampleVi: 'Tôi có thể nói chuyện nhanh với anh về chuyến thăm sắp tới của ông Socrates không?',
    emoji: '🗣️'
  },
  {
    id: 505,
    english: 'point in the right direction',
    type: 'idiom',
    ipa: "/pɔɪnt ɪn ðə raɪt də'rekʃn/",
    vietnamese: 'chỉ dẫn, định hướng đi đúng đắn',
    category: 'advice',
    exampleEn: 'Could you possibly point me in the right direction for hotel bookings?',
    exampleVi: 'Anh có thể chỉ dẫn giúp tôi cách đặt khách sạn sao cho chuẩn nhất không?',
    emoji: '🧭'
  },

  // Episode 22: The Smoker & Making Firm Requests (Quy định an toàn & Nhắc nhở dứt khoát)
  {
    id: 506,
    english: 'extinguish',
    type: 'v',
    ipa: "/ɪk'stɪŋɡwɪʃ/",
    vietnamese: 'dập tắt (tàn thuốc, ngọn lửa)',
    category: 'safety',
    exampleEn: 'You need to extinguish your cigarette immediately.',
    exampleVi: 'Bác cần phải dập tắt điếu thuốc lá này ngay lập tức.',
    emoji: '🚭'
  },
  {
    id: 507,
    english: 'not permitted',
    type: 'phrase',
    ipa: "/nɒt pə'mɪtɪd/",
    vietnamese: 'không được phép, bị nghiêm cấm',
    category: 'safety',
    exampleEn: 'Smoking is strictly not permitted on company premises.',
    exampleVi: 'Hút thuốc bị nghiêm cấm hoàn toàn trong khuôn viên công ty.',
    emoji: '🚫'
  },
  {
    id: 508,
    english: 'safety regulation',
    type: 'noun phrase',
    ipa: "/'seɪfti ˌreɡju'leɪʃn/",
    vietnamese: 'quy định an toàn lao động',
    category: 'safety',
    exampleEn: 'Ignoring safety regulations in the warehouse could lead to severe penalties.',
    exampleVi: 'Phớt lờ các quy định an toàn trong kho có thể dẫn tới hình phạt nặng.',
    emoji: '⚠️'
  },
  {
    id: 509,
    english: 'flammable material',
    type: 'noun phrase',
    ipa: "/'flæməbl mə'tɪəriəl/",
    vietnamese: 'vật liệu dễ cháy nổ',
    category: 'safety',
    exampleEn: 'Cardboard boxes and plastic lemons are highly flammable materials.',
    exampleVi: 'Hộp các-tông và chanh nhựa là những vật liệu rất dễ bắt lửa.',
    emoji: '🔥'
  },

  // Episode 23: Risky Business & Health and Safety (Cảnh báo nguy cơ & Báo động PCCC)
  {
    id: 510,
    english: 'raise the alarm',
    type: 'phrase',
    ipa: "/reɪz ðə ə'lɑːm/",
    vietnamese: 'bật chuông báo động, hô hoán báo cháy',
    category: 'fire',
    exampleEn: 'If you see a fire, raise the alarm and call the fire service.',
    exampleVi: 'Nếu nhìn thấy lửa cháy, hãy kích hoạt chuông báo động và gọi cứu hỏa.',
    emoji: '🔔'
  },
  {
    id: 511,
    english: 'fire assembly point',
    type: 'noun phrase',
    ipa: "/'faɪə ə'sembli pɔɪnt/",
    vietnamese: 'điểm tập kết lánh nạn khi có hỏa hoạn',
    category: 'fire',
    exampleEn: 'Walk calmly to the nearest fire exit and meet at the fire assembly point.',
    exampleVi: 'Hãy bình tĩnh đi tới lối thoát hiểm gần nhất và tập kết tại điểm an toàn ngoài trời.',
    emoji: '📍'
  },
  {
    id: 512,
    english: 'let the cat out of the bag',
    type: 'idiom',
    ipa: "/let ðə kæt aʊt əv ðə bæɡ/",
    vietnamese: 'lỡ miệng làm lộ bí mật',
    category: 'fire',
    exampleEn: 'Anna accidentally let the cat out of the bag about Mr Ingle smoking.',
    exampleVi: 'Anna đã vô tình làm lộ bí mật chuyện bác Ingle hút thuốc trong kho.',
    emoji: '🐱'
  },
  {
    id: 513,
    english: 'fire extinguisher',
    type: 'noun phrase',
    ipa: "/'faɪər ɪk'stɪŋɡwɪʃə(r)/",
    vietnamese: 'bình chữa cháy cứu hỏa',
    category: 'fire',
    exampleEn: 'Make sure you know the location of the nearest fire extinguisher on your floor.',
    exampleVi: 'Hãy đảm bảo bạn biết vị trí bình chữa cháy gần nhất trên tầng của mình.',
    emoji: '🧯'
  },

  // Episode 24: Emergency & Taking Charge (Ứng phó khẩn cấp & Sơ tán an toàn)
  {
    id: 514,
    english: 'no need to panic',
    type: 'phrase',
    ipa: "/nəʊ niːd tuː 'pænɪk/",
    vietnamese: 'không cần phải hoảng sợ, giữ bình tĩnh',
    category: 'fire',
    exampleEn: 'There is no need to panic. Please leave the building and meet outside.',
    exampleVi: 'Mọi người không cần phải hoảng sợ. Xin hãy rời tòa nhà và tập trung bên ngoài.',
    emoji: '🧘'
  },
  {
    id: 515,
    english: 'use the stairs not the lift',
    type: 'phrase',
    ipa: "/juːz ðə steəz nɒt ðə lɪft/",
    vietnamese: 'đi cầu thang bộ, tuyệt đối không dùng thang máy',
    category: 'fire',
    exampleEn: 'In a fire emergency, you must use the stairs not the lift.',
    exampleVi: 'Trong tình huống cháy khẩn cấp, bạn bắt buộc phải dùng thang bộ chứ không dùng thang máy.',
    emoji: '🪜'
  },
  {
    id: 516,
    english: 'anybody missing',
    type: 'phrase',
    ipa: "/'enibɒdi 'mɪsɪŋ/",
    vietnamese: 'có ai bị thiếu / sót lại bên trong không',
    category: 'fire',
    exampleEn: 'Once outside at the assembly point, check: Is anybody missing?',
    exampleVi: 'Khi đã ra ngoài điểm tập kết, hãy kiểm tra: Còn ai bị kẹt bên trong không?',
    emoji: '👥'
  },
  {
    id: 517,
    english: 'evacuate the building',
    type: 'phrase',
    ipa: "/ɪ'vækjueɪt ðə 'bɪldɪŋ/",
    vietnamese: 'sơ tán toàn bộ người khỏi tòa nhà',
    category: 'fire',
    exampleEn: 'Anna took charge and instructed all colleagues to evacuate the building immediately.',
    exampleVi: 'Anna đã chủ động đứng ra chỉ huy và hướng dẫn đồng nghiệp sơ tán ngay lập tức.',
    emoji: '🏃'
  },

  // Episode 25: The Big Cheese & Booking a Hotel (Đón tiếp sếp lớn & Đặt phòng khách sạn)
  {
    id: 518,
    english: 'the big cheese',
    type: 'idiom',
    ipa: "/ðə bɪɡ tʃiːz/",
    vietnamese: 'nhân vật cốt cán, nhân vật quyền lực nhất (sếp lớn)',
    category: 'hotel',
    exampleEn: 'Mr Socrates is the big cheese from the American headquarters.',
    exampleVi: 'Ông Socrates là nhân vật quyền lực nhất đến từ trụ sở chính tại Mỹ.',
    emoji: '🧀'
  },
  {
    id: 519,
    english: 'check availability',
    type: 'phrase',
    ipa: "/tʃek əˌveɪlə'bɪləti/",
    vietnamese: 'kiểm tra tình trạng phòng trống',
    category: 'hotel',
    exampleEn: 'Hello, I would like to check availability and rates for a room please.',
    exampleVi: 'Xin chào, tôi muốn kiểm tra tình trạng phòng trống và giá phòng.',
    emoji: '🏨'
  },
  {
    id: 520,
    english: 'include breakfast',
    type: 'phrase',
    ipa: "/ɪn'kluːd 'brekfəst/",
    vietnamese: 'đã bao gồm bữa sáng',
    category: 'hotel',
    exampleEn: 'Does the price of £100 include a continental breakfast?',
    exampleVi: 'Mức giá 100 bảng đã bao gồm bữa sáng kiểu lục địa chưa?',
    emoji: '🥐'
  },
  {
    id: 521,
    english: 'business facilities',
    type: 'noun phrase',
    ipa: "/'bɪznəs fə'sɪlətiz/",
    vietnamese: 'tiện ích phục vụ công tác (wi-fi, máy in, phòng họp)',
    category: 'hotel',
    exampleEn: 'Do you have any business facilities such as high-speed internet and wi-fi?',
    exampleVi: 'Khách sạn có tiện ích công tác như internet tốc độ cao và wi-fi không?',
    emoji: '💻'
  },
  {
    id: 522,
    english: 'executive suite',
    type: 'noun phrase',
    ipa: "/ɪɡ'zekjətɪv swiːt/",
    vietnamese: 'phòng thương gia / phòng suite cao cấp cho lãnh đạo',
    category: 'hotel',
    exampleEn: 'Anna booked an executive suite for Mr Socrates with a panoramic city view.',
    exampleVi: 'Anna đã đặt phòng suite thương gia cho ông Socrates với tầm nhìn bao quát thành phố.',
    emoji: '👑'
  }
];

export const ERROR_CATCH_EXERCISES_UNIT5: ErrorCatchExercise[] = [
  {
    id: 1,
    sentenceWords: ["I", "would", "be", "most", "grateful", "if", "you", "can", "help", "me."],
    errorIndex: 7, // 'can' -> 'could'
    correctWord: "could",
    explanation: "Cấu trúc trang trọng chuẩn mực là 'I would be most grateful if you COULD...' (lùi thì lịch sự)."
  },
  {
    id: 2,
    sentenceWords: ["Smoking", "is", "not", "permit", "on", "these", "company", "premises."],
    errorIndex: 3, // 'permit' -> 'permitted'
    correctWord: "permitted",
    explanation: "Dạng bị động là 'is not permitted' (không được cho phép)."
  },
  {
    id: 3,
    sentenceWords: ["If", "you", "see", "a", "fire,", "rising", "the", "alarm", "immediately."],
    errorIndex: 5, // 'rising' -> 'raise'
    correctWord: "raise",
    explanation: "Câu mệnh lệnh chỉ dẫn an toàn bắt đầu bằng động từ nguyên mẫu: 'raise the alarm'."
  },
  {
    id: 4,
    sentenceWords: ["Please", "using", "the", "stairs", "not", "the", "lift", "outside."],
    errorIndex: 1, // 'using' -> 'use'
    correctWord: "use",
    explanation: "Sau 'Please' trong lời hướng dẫn khẩn cấp là động từ nguyên mẫu: 'Please use the stairs'."
  },
  {
    id: 5,
    sentenceWords: ["Does", "the", "price", "includes", "breakfast", "for", "the", "guests?"],
    errorIndex: 3, // 'includes' -> 'include'
    correctWord: "include",
    explanation: "Trong câu hỏi có trợ động từ 'Does', động từ chính trở về dạng nguyên mẫu: 'include'."
  }
];

export const UNSCRAMBLE_EXERCISES_UNIT5: UnscrambleExercise[] = [
  {
    id: 1,
    scrambledWords: ["I", "would", "be", "most", "grateful", "if", "you", "could", "help", "me."],
    correctSentence: "I would be most grateful if you could help me.",
    acceptedSentences: ["I would be most grateful if you could help me."],
    meaningVi: "Tôi sẽ vô cùng biết ơn nếu anh có thể giúp đỡ tôi.",
    hintStructure: "I would be most grateful + if you could help me."
  },
  {
    id: 2,
    scrambledWords: ["Smoking", "is", "strictly", "not", "permitted", "on", "company", "premises."],
    correctSentence: "Smoking is strictly not permitted on company premises.",
    acceptedSentences: ["Smoking is strictly not permitted on company premises."],
    meaningVi: "Hút thuốc bị nghiêm cấm hoàn toàn trong khuôn viên công ty.",
    hintStructure: "Smoking is strictly not permitted + on company premises."
  },
  {
    id: 3,
    scrambledWords: ["If", "you", "see", "a", "fire,", "raise", "the", "alarm", "quickly."],
    correctSentence: "If you see a fire, raise the alarm quickly.",
    acceptedSentences: ["If you see a fire, raise the alarm quickly."],
    meaningVi: "Nếu phát hiện có cháy, hãy kích hoạt chuông báo động thật nhanh.",
    hintStructure: "If you see a fire, + raise the alarm quickly."
  },
  {
    id: 4,
    scrambledWords: ["Please", "use", "the", "stairs", "not", "the", "lift", "now."],
    correctSentence: "Please use the stairs not the lift now.",
    acceptedSentences: ["Please use the stairs not the lift now."],
    meaningVi: "Xin hãy sử dụng cầu thang bộ, tuyệt đối không dùng thang máy.",
    hintStructure: "Please use the stairs + not the lift + now."
  },
  {
    id: 5,
    scrambledWords: ["I", "would", "like", "to", "check", "availability", "for", "a", "room."],
    correctSentence: "I would like to check availability for a room.",
    acceptedSentences: ["I would like to check availability for a room."],
    meaningVi: "Tôi muốn kiểm tra tình trạng còn phòng trống.",
    hintStructure: "I would like to check availability + for a room."
  }
];

export const READING_PASSAGE_1_UNIT5: ReadingPassageGapFill = {
  title: "Tip Top Trading: Warehouse Smoke & The Big Boss Hotel (Episodes 21 - 25)",
  instruction: "Chọn từ thích hợp từ ngân hàng từ vựng để điền vào các vị trí trống (1) - (10) trong câu chuyện dưới đây:",
  wordBank: ["advice", "smoke", "extinguish", "alarm", "stairs", "shoulder", "America", "cookies", "availability", "twin"],
  sentences: [
    { text: "Anna asks Denise for some (1) ", blankIndex: 1, expectedWord: "advice", afterText: " before visiting the warehouse manager." },
    { text: "In the warehouse, Anna is shocked to see Mr Ingle (2) ", blankIndex: 2, expectedWord: "smoke", afterText: " a cigarette during his break." },
    { text: "Anna politely but firmly asks him to (3) ", blankIndex: 3, expectedWord: "extinguish", afterText: " his cigarette immediately." },
    { text: "During safety training, Paul reminds everyone to raise the (4) ", blankIndex: 4, expectedWord: "alarm", afterText: " if they see a fire." },
    { text: "When a real fire breaks out, Anna instructs staff to use the (5) ", blankIndex: 5, expectedWord: "stairs", afterText: " not the lift." },
    { text: "Tom becomes a hero by carrying Mr Ingle out on his (6) ", blankIndex: 6, expectedWord: "shoulder", afterText: "!" },
    { text: "Suddenly, Mr Socrates arrives unannounced from (7) ", blankIndex: 7, expectedWord: "America", afterText: " to inspect the business." },
    { text: "Mr Socrates complains about British biscuits and asks for American (8) ", blankIndex: 8, expectedWord: "cookies", afterText: "." },
    { text: "Anna calls the Royal Imperial Hotel to check (9) ", blankIndex: 9, expectedWord: "availability", afterText: " and prices." },
    { text: "Tom tells Anna to book a single bed, but Mr Socrates actually prefers a (10) ", blankIndex: 10, expectedWord: "twin", afterText: " room!" }
  ],
  fullAudioText: "Anna asks Denise for some advice before visiting the warehouse manager. In the warehouse, Anna is shocked to see Mr Ingle smoke a cigarette during his break. Anna politely but firmly asks him to extinguish his cigarette immediately. During safety training, Paul reminds everyone to raise the alarm if they see a fire. When a real fire breaks out, Anna instructs staff to use the stairs not the lift. Tom becomes a hero by carrying Mr Ingle out on his shoulder! Suddenly, Mr Socrates arrives unannounced from America to inspect the business. Mr Socrates complains about British biscuits and asks for American cookies. Anna calls the Royal Imperial Hotel to check availability and prices. Tom tells Anna to book a single bed, but Mr Socrates actually prefers a twin room!"
};

export const READING_PASSAGE_2_UNIT5: ReadingPassageTF = {
  title: "Workplace Health & Safety Compliance and Hotel Reservations",
  passageText: `Workplace regulations demand strict adherence to health and safety protocols. Smoking inside corporate buildings is strictly illegal and presents a severe fire hazard. When violations occur, addressing them with polite firmness—such as requesting staff to 'extinguish' cigarettes—protects the organization. During fire emergencies, clear leadership is vital: employees must raise the alarm, evacuate via emergency stairs rather than elevators, and assemble at the designated fire assembly point for headcount verification. Furthermore, administrative tasks like executive hotel reservations require attention to detail. Confirming whether quotes include breakfast, verifying business amenities like wi-fi, and checking bed configurations (such as twin vs single requirements) ensures high executive satisfaction.`,
  questions: [
    {
      id: 1,
      statement: "Smoking inside company premises is permitted during official lunch breaks.",
      isTrue: false,
      explanation: "Sai, việc hút thuốc trong tòa nhà công ty là hoàn toàn trái luật và bị cấm kịch liệt."
    },
    {
      id: 2,
      statement: "Tom carried Mr Ingle out of the burning warehouse on his shoulders.",
      isTrue: true,
      explanation: "Đúng theo Ep 24: 'That's Tom coming out of the building and he's carrying someone on his shoulder! It's Mr Ingle!'"
    },
    {
      id: 3,
      statement: "During a fire alarm, employees should take the lift to exit quickly.",
      isTrue: false,
      explanation: "Sai, quy tắc an toàn bắt buộc là 'use the stairs not the lift' (dùng thang bộ, cấm dùng thang máy)."
    },
    {
      id: 4,
      statement: "The nightly room rate at the Royal Imperial Hotel was £100.",
      isTrue: true,
      explanation: "Đúng theo Ep 25: Lễ tân khách sạn báo giá phòng là £100 per night."
    },
    {
      id: 5,
      statement: "Mr Socrates demanded an organic, skinny cappuccino upon arriving in London.",
      isTrue: true,
      explanation: "Đúng theo Ep 25: Ông Socrates yêu cầu 'a triple-shot, organic, skinny cappuccino'."
    }
  ]
};

export const BOXING_QUESTIONS_UNIT5: BoxingQuestion[] = [
  {
    id: 501,
    question: "Từ chuyên môn nào được Anna dùng để yêu cầu bác Ingle dập tắt điếu thuốc lá (Ep 22)?",
    context: "Ep 22: The smoker",
    options: ["To destroy", "To extinguish", "To burn", "To throw"],
    correctIndex: 1,
    explanation: "Anna yêu cầu: 'You need to extinguish your cigarette... please.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 502,
    question: "Biển chỉ dẫn lối thoát hiểm PCCC trong các tòa nhà công sở Anh có màu gì (Ep 23)?",
    context: "Ep 23: Risky business",
    options: ["Màu đỏ (Red)", "Màu vàng (Yellow)", "Màu xanh lá (Green)", "Màu xanh dương (Blue)"],
    correctIndex: 2,
    explanation: "Paul nhắc: 'Walk calmly to our nearest fire exit, following the green signs.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 503,
    question: "Khi có báo động cháy trong tòa nhà (Ep 24), hành động nào là bắt buộc?",
    context: "Ep 24: No smoke without fire",
    options: [
      "Đi thang máy cho nhanh",
      "Quay lại lấy đồ dùng cá nhân",
      "Sử dụng cầu thang bộ, không dùng thang máy (Use the stairs not the lift)",
      "Khóa chặt cửa phòng làm việc"
    ],
    correctIndex: 2,
    explanation: "Anna ngăn Denise: 'No Denise. We must use the stairs not the lift.'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 504,
    question: "Cụm từ lóng 'The Big Cheese' trong tiêu đề Ep 25 dùng để chỉ ai?",
    context: "Ep 25: The big cheese",
    options: [
      "Người bán pho mát",
      "Nhân vật quyền lực, sếp lớn cấp cao (Mr Socrates)",
      "Người thích ăn bánh quy",
      "Người quản lý kho"
    ],
    correctIndex: 1,
    explanation: "'The big cheese' là thành ngữ chỉ nhân vật VIP/sếp quyền lực cao nhất của công ty.",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 505,
    question: "Giá phòng một đêm mà khách sạn Royal Imperial báo cho Anna (Ep 25) là bao nhiêu?",
    context: "Ep 25: The big cheese",
    options: ["£50 một đêm", "£100 một đêm", "£200 một đêm", "Miễn phí"],
    correctIndex: 1,
    explanation: "Lễ tân khách sạn thông báo: 'It's £100 a night.'",
    damage: 25,
    type: 'vocab'
  }
];

export const LETTER_CLUES_UNIT5 = [
  { id: 1, prompt: 'Vô cùng biết ơn sự giúp đỡ', clue: 'm___ g_______', fullWord: 'most grateful', emoji: '🙏' },
  { id: 2, prompt: 'Dành ra vài phút quý báu', clue: 's____ a f__ m______', fullWord: 'spare a few minutes', emoji: '⏱️' },
  { id: 3, prompt: 'Dập tắt tàn thuốc / ngọn lửa', clue: 'e_________', fullWord: 'extinguish', emoji: '🚭' },
  { id: 4, prompt: 'Không được phép / cấm', clue: 'n__ p________', fullWord: 'not permitted', emoji: '🚫' },
  { id: 5, prompt: 'Kích hoạt chuông báo động', clue: 'r____ t__ a____', fullWord: 'raise the alarm', emoji: '🔔' },
  { id: 6, prompt: 'Điểm tập kết an toàn PCCC', clue: 'f___ a_______ p____', fullWord: 'fire assembly point', emoji: '📍' },
  { id: 7, prompt: 'Không cần hoảng sợ', clue: 'n_ n___ t_ p____', fullWord: 'no need to panic', emoji: '🧘' },
  { id: 8, prompt: 'Kiểm tra phòng trống', clue: 'c____ a___________', fullWord: 'check availability', emoji: '🏨' }
];
