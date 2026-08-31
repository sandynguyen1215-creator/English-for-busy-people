import { VocabItem, BoxingQuestion, ErrorCatchExercise, UnscrambleExercise, Badge, ReadingPassageGapFill, ReadingPassageTF } from '../types';

export const VOCABULARY_LIST: VocabItem[] = [
  // Episode 1: The Interview (Phỏng vấn xin việc)
  {
    id: 1,
    english: 'sales executive',
    type: 'noun phrase',
    ipa: "/seɪlz ɪɡ'zekjətɪv/",
    vietnamese: 'chuyên viên kinh doanh',
    category: 'interview',
    exampleEn: 'Anna is interviewing for the job of Sales Executive at Tip Top Trading.',
    exampleVi: 'Anna đang phỏng vấn cho vị trí Chuyên viên Kinh doanh tại Tip Top Trading.',
    emoji: '💼'
  },
  {
    id: 2,
    english: 'sell yourself',
    type: 'idiom',
    ipa: "/sel jɔː'self/",
    vietnamese: 'thể hiện năng lực, tự quảng bá bản thân',
    category: 'interview',
    exampleEn: 'In an interview, you need to sell yourself and be confident, not arrogant.',
    exampleVi: 'Trong buổi phỏng vấn, bạn cần tự tin làm nổi bật giá trị bản thân, không kiêu ngạo.',
    emoji: '⭐'
  },
  {
    id: 3,
    english: 'come to mind',
    type: 'idiom',
    ipa: "/kʌm tuː maɪnd/",
    vietnamese: 'nảy ra trong đầu, chợt nhớ tới',
    category: 'interview',
    exampleEn: 'A good example that comes to mind is my campaign for the debating society.',
    exampleVi: 'Một ví dụ điển hình nảy ra trong đầu tôi là chiến dịch cho hội tranh biện.',
    emoji: '💡'
  },
  {
    id: 4,
    english: 'particularly proud of',
    type: 'phrase',
    ipa: "/pə'tɪkjələli praʊd əv/",
    vietnamese: 'đặc biệt tự hào về điều gì',
    category: 'interview',
    exampleEn: "I'm particularly proud of how I organised the finances on a small budget.",
    exampleVi: 'Tôi đặc biệt tự hào về cách mình đã quản lý tài chính với ngân sách rất nhỏ.',
    emoji: '🏆'
  },
  {
    id: 5,
    english: 'timekeeping',
    type: 'n',
    ipa: "/'taɪmˌkiːpɪŋ/",
    vietnamese: 'tính đúng giờ, sự quản lý thời gian',
    category: 'interview',
    exampleEn: 'Timekeeping is important to me; I never hand in assignments late.',
    exampleVi: 'Sự đúng giờ rất quan trọng với tôi; tôi không bao giờ nộp bài muộn.',
    emoji: '⏰'
  },
  {
    id: 6,
    english: 'punctuality',
    type: 'n',
    ipa: "/ˌpʌŋktʃu'æləti/",
    vietnamese: 'sự đúng giờ, tác phong chuẩn giờ',
    category: 'interview',
    exampleEn: 'Paul said: That is good to hear, we like punctuality here.',
    exampleVi: 'Paul nói: Thật tốt khi nghe điều đó, chúng tôi rất coi trọng sự đúng giờ ở đây.',
    emoji: '⏱️'
  },
  {
    id: 7,
    english: 'treasurer',
    type: 'n',
    ipa: "/'treʒərə(r)/",
    vietnamese: 'thủ quỹ, người quản lý ngân sách',
    category: 'interview',
    exampleEn: 'Anna was the treasurer of the debating society at university.',
    exampleVi: 'Anna từng là thủ quỹ của câu lạc bộ tranh biện tại trường đại học.',
    emoji: '💰'
  },
  {
    id: 8,
    english: 'pass with flying colours',
    type: 'idiom',
    ipa: "/pɑːs wɪð 'flaɪɪŋ 'kʌləz/",
    vietnamese: 'vượt qua xuất sắc, đạt kết quả rực rỡ',
    category: 'interview',
    exampleEn: 'Anna passed the initial interview stage with flying colours.',
    exampleVi: 'Anna đã vượt qua vòng phỏng vấn đầu tiên với kết quả vô cùng xuất sắc.',
    emoji: '🎓'
  },

  // Episode 2: The Interruption & Structuring Answers (Cấu trúc câu trả lời phỏng vấn)
  {
    id: 9,
    english: 'motivated',
    type: 'adj',
    ipa: "/'məʊtɪveɪtɪd/",
    vietnamese: 'có động lực, giàu nhiệt huyết phấn đấu',
    category: 'computer',
    exampleEn: 'I really want this job and I am motivated to work hard.',
    exampleVi: 'Tôi thực sự muốn công việc này và có động lực làm việc rất chăm chỉ.',
    emoji: '🔥'
  },
  {
    id: 10,
    english: 'structure your answer',
    type: 'phrase',
    ipa: "/'strʌktʃə jɔːr 'ɑːnsə/",
    vietnamese: 'cấu trúc câu trả lời mạch lạc (Firstly, Secondly, Above all)',
    category: 'computer',
    exampleEn: 'Structure your answer using Firstly, Secondly, and Above all.',
    exampleVi: 'Hãy sắp xếp câu trả lời bằng cách dùng: Trước hết, Thứ hai là, và Quan trọng nhất là.',
    emoji: '📑'
  },
  {
    id: 11,
    english: 'ideal match',
    type: 'noun phrase',
    ipa: "/aɪ'dɪəl mætʃ/",
    vietnamese: 'sự kết hợp lý tưởng, hoàn toàn phù hợp',
    category: 'computer',
    exampleEn: 'Firstly, this job is an ideal match for my skills and experience.',
    exampleVi: 'Trước hết, công việc này là sự kết hợp hoàn hảo với kỹ năng và kinh nghiệm của tôi.',
    emoji: '🎯'
  },
  {
    id: 12,
    english: 'above all',
    type: 'phrase',
    ipa: "/ə'bʌv ɔːl/",
    vietnamese: 'trên hết, điều quan trọng nhất là',
    category: 'computer',
    exampleEn: 'And above all, the reason I want this job is because I want to grow with you.',
    exampleVi: 'Và trên hết, lý do tôi muốn công việc này là vì tôi muốn cùng phát triển với công ty.',
    emoji: '🌟'
  },
  {
    id: 13,
    english: 'fastest-growing',
    type: 'adj',
    ipa: "/'fɑːstɪst 'ɡrəʊɪŋ/",
    vietnamese: 'phát triển nhanh nhất',
    category: 'computer',
    exampleEn: 'Tip Top Trading is the fastest-growing company in the plastic fruits sector.',
    exampleVi: 'Tip Top Trading là công ty tăng trưởng nhanh nhất trong ngành hoa quả nhựa.',
    emoji: '📈'
  },
  {
    id: 14,
    english: 'career prospects',
    type: 'noun phrase',
    ipa: "/kə'rɪə 'prɒspekts/",
    vietnamese: 'triển vọng nghề nghiệp tương lai',
    category: 'computer',
    exampleEn: 'I chose this firm because of the excellent long-term career prospects.',
    exampleVi: 'Tôi chọn công ty này vì triển vọng phát triển nghề nghiệp lâu dài tuyệt vời.',
    emoji: '🚀'
  },
  {
    id: 15,
    english: 'salary expectations',
    type: 'noun phrase',
    ipa: "/'sæləri ˌekspek'teɪʃnz/",
    vietnamese: 'mức lương kỳ vọng',
    category: 'computer',
    exampleEn: 'What are your salary expectations for this entry position?',
    exampleVi: 'Mức lương kỳ vọng của bạn cho vị trí khởi đầu này là bao nhiêu?',
    emoji: '💵'
  },

  // Episode 3: The Crisis & Making Suggestions (Sự cố máy tính & Đề xuất giải pháp)
  {
    id: 16,
    english: 'make a suggestion',
    type: 'phrase',
    ipa: "/meɪk ə sə'dʒestʃən/",
    vietnamese: 'đưa ra một đề xuất / gợi ý',
    category: 'computer',
    exampleEn: 'Can I make a suggestion? Why don’t you check your email inbox?',
    exampleVi: 'Tôi có thể đưa ra một gợi ý được không? Sao chị không kiểm tra hộp thư đến?',
    emoji: '💡'
  },
  {
    id: 17,
    english: 'memory stick',
    type: 'noun phrase',
    ipa: "/'meməri stɪk/",
    vietnamese: 'thẻ nhớ USB, ổ lưu trữ dữ liệu',
    category: 'computer',
    exampleEn: 'Denise lost the memory stick containing the PowerPoint presentation.',
    exampleVi: 'Denise đã làm thất lạc thẻ nhớ USB chứa bài thuyết trình PowerPoint.',
    emoji: '💾'
  },
  {
    id: 18,
    english: 'proof-read',
    type: 'v',
    ipa: "/'pruːf riːd/",
    vietnamese: 'đọc soát lỗi chính tả / văn bản',
    category: 'computer',
    exampleEn: 'Denise had emailed the slides to Paul so he could proof-read them.',
    exampleVi: 'Denise đã gửi email bản slide cho Paul để anh ấy đọc soát lỗi.',
    emoji: '🔍'
  },
  {
    id: 19,
    english: 'think on your feet',
    type: 'idiom',
    ipa: "/θɪŋk ɒn jɔː fiːt/",
    vietnamese: 'phản ứng nhanh nhạy, ứng biến linh hoạt',
    category: 'computer',
    exampleEn: 'Paul hired Anna because she can think on her feet during a crisis.',
    exampleVi: 'Paul tuyển Anna vì cô ấy có khả năng ứng biến nhanh nhạy khi xảy ra sự cố.',
    emoji: '🧠'
  },
  {
    id: 20,
    english: 'people person',
    type: 'noun phrase',
    ipa: "/'piːpl 'pɜːsn/",
    vietnamese: 'người hòa đồng, giỏi giao tiếp và ứng xử',
    category: 'computer',
    exampleEn: 'We need someone who is a first-rate people person.',
    exampleVi: 'Chúng tôi cần một người có khả năng giao tiếp và đối nhân xử thế hạng nhất.',
    emoji: '🤝'
  },
  {
    id: 21,
    english: 'sort out',
    type: 'phrasal verb',
    ipa: "/sɔːt aʊt/",
    vietnamese: 'tháo gỡ, sắp xếp ổn thỏa vấn đề',
    category: 'computer',
    exampleEn: 'Don’t panic, we can sort this presentation issue out together.',
    exampleVi: 'Đừng hoảng sợ, chúng ta có thể cùng nhau tháo gỡ sự cố bài thuyết trình này.',
    emoji: '🛠️'
  },
  {
    id: 22,
    english: 'technical support',
    type: 'noun phrase',
    ipa: "/'teknɪkl sə'pɔːt/",
    vietnamese: 'hỗ trợ kỹ thuật IT',
    category: 'computer',
    exampleEn: 'Should I call technical support to recover the lost presentation files?',
    exampleVi: 'Tôi có nên gọi bộ phận kỹ thuật để khôi phục các tệp bài thuyết trình bị mất không?',
    emoji: '🖥️'
  },

  // Episode 4: Doing Lunch & Introductions (Làm quen đồng nghiệp & Mời ăn trưa)
  {
    id: 23,
    english: 'do lunch',
    type: 'idiom',
    ipa: "/duː lʌntʃ/",
    vietnamese: 'đi ăn trưa cùng nhau (để bàn việc hoặc giao lưu)',
    category: 'lunch',
    exampleEn: 'Tom asked "Can you do lunch?" meaning go to a café together, not cook lunch!',
    exampleVi: 'Tom hỏi "Can you do lunch?" với ý là cùng đi ăn trưa bên ngoài, chứ không phải nấu ăn!',
    emoji: '🍽️'
  },
  {
    id: 24,
    english: 'joined the team',
    type: 'phrase',
    ipa: "/dʒɔɪnd ðə tiːm/",
    vietnamese: 'mới gia nhập đội ngũ / công ty',
    category: 'lunch',
    exampleEn: 'Hello, you must be Tom. I’m Anna, I’ve just joined the team.',
    exampleVi: 'Xin chào, anh chắc là Tom. Tôi là Anna, tôi vừa mới gia nhập công ty.',
    emoji: '👋'
  },
  {
    id: 25,
    english: 'first impression',
    type: 'noun phrase',
    ipa: "/fɜːst ɪm'preʃn/",
    vietnamese: 'ấn tượng ban đầu',
    category: 'lunch',
    exampleEn: 'Today is my first day and I really want to make a good first impression.',
    exampleVi: 'Hôm nay là ngày làm việc đầu tiên và tôi rất muốn tạo ấn tượng ban đầu tốt đẹp.',
    emoji: '✨'
  },
  {
    id: 26,
    english: 'senior account manager',
    type: 'noun phrase',
    ipa: "/'siːniə ə'kaʊnt 'mænɪdʒə/",
    vietnamese: 'quản lý khách hàng cấp cao',
    category: 'lunch',
    exampleEn: 'Tom Darcy is the Senior Account Manager at Tip Top Trading.',
    exampleVi: 'Tom Darcy là Giám đốc quản lý khách hàng cấp cao tại Tip Top Trading.',
    emoji: '👔'
  },
  {
    id: 27,
    english: 'seal the deal',
    type: 'idiom',
    ipa: "/siːl ðə diːl/",
    vietnamese: 'chốt giao dịch, hoàn tất thỏa thuận',
    category: 'lunch',
    exampleEn: 'Tom was on the phone boasting that he would seal the deal.',
    exampleVi: 'Tom đang nghe điện thoại và khoe rằng anh ấy sẽ chốt xong thương vụ.',
    emoji: '✍️'
  },
  {
    id: 28,
    english: 'settle in',
    type: 'phrasal verb',
    ipa: "/'setl ɪn/",
    vietnamese: 'dần quen và hòa nhập vào môi trường mới',
    category: 'lunch',
    exampleEn: 'How are you settling in on your first week at the office, Anna?',
    exampleVi: 'Anna ơi, tuần đầu tiên ở văn phòng bạn đã quen dần với môi trường mới chưa?',
    emoji: '🏠'
  },
  {
    id: 29,
    english: 'show someone the ropes',
    type: 'idiom',
    ipa: "/ʃəʊ 'sʌmwʌn ðə rəʊps/",
    vietnamese: 'hướng dẫn ai làm quen với công việc',
    category: 'lunch',
    exampleEn: 'Paul asked Denise to show Anna the ropes around the office.',
    exampleVi: 'Paul nhờ Denise hướng dẫn Anna làm quen với mọi việc trong văn phòng.',
    emoji: '🧭'
  },

  // Episode 5: The Queen of Sheba & Polite Requests (Nhờ vả lịch sự & Tác phong)
  {
    id: 30,
    english: 'polite request',
    type: 'noun phrase',
    ipa: "/pə'laɪt rɪ'kwest/",
    vietnamese: 'lời yêu cầu lịch sự (Could you possibly...? / Would you mind...?)',
    category: 'lunch',
    exampleEn: 'Use could and would to make a polite request in the office.',
    exampleVi: 'Hãy dùng could và would để đưa ra lời nhờ vả lịch sự trong văn phòng.',
    emoji: '🙏'
  },
  {
    id: 31,
    english: 'I was wondering if',
    type: 'phrase',
    ipa: "/aɪ wəz 'wʌndərɪŋ ɪf/",
    vietnamese: 'tôi tự hỏi liệu bạn có thể...',
    category: 'lunch',
    exampleEn: 'I was wondering if you could do something for me?',
    exampleVi: 'Tôi tự hỏi liệu bạn có thể giúp tôi một việc được không?',
    emoji: '💭'
  },
  {
    id: 32,
    english: 'would you mind',
    type: 'phrase',
    ipa: "/wʊd juː maɪnd/",
    vietnamese: 'bạn có phiền... (đi kèm V-ing)',
    category: 'lunch',
    exampleEn: 'Would you mind sending me the background file on CBL?',
    exampleVi: 'Bạn có phiền gửi giúp tôi tệp thông tin nền tảng về công ty CBL không?',
    emoji: '📨'
  },
  {
    id: 33,
    english: 'supplier',
    type: 'n',
    ipa: "/sə'plaɪə(r)/",
    vietnamese: 'nhà cung cấp',
    category: 'lunch',
    exampleEn: 'Convincing Bananas Limited (CBL) is one of our key suppliers.',
    exampleVi: 'Convincing Bananas Limited (CBL) là một trong những nhà cung cấp chính của chúng tôi.',
    emoji: '🏭'
  },
  {
    id: 34,
    english: 'urgent',
    type: 'adj',
    ipa: "/'ɜːdʒənt/",
    vietnamese: 'khẩn cấp, cấp bách',
    category: 'lunch',
    exampleEn: 'It is really urgent, Paul needs the document in the next ten minutes.',
    exampleVi: 'Việc này rất khẩn cấp, Paul cần tài liệu trong vòng 10 phút tới.',
    emoji: '🚨'
  },
  {
    id: 35,
    english: 'confidential',
    type: 'adj',
    ipa: "/ˌkɒnfɪ'denʃl/",
    vietnamese: 'bảo mật, tuyệt mật',
    category: 'lunch',
    exampleEn: 'There are confidential documents in this office that non-staff cannot see.',
    exampleVi: 'Có những tài liệu bảo mật trong văn phòng này mà người ngoài không được xem.',
    emoji: '🔒'
  },
  {
    id: 36,
    english: 'asset to the company',
    type: 'phrase',
    ipa: "/'æset tuː ðə 'kʌmpəni/",
    vietnamese: 'tài sản quý giá của công ty (nhân sự giỏi)',
    category: 'lunch',
    exampleEn: 'If Anna gets that job, she will be a great asset to the company.',
    exampleVi: 'Nếu Anna nhận được công việc đó, cô ấy sẽ là một nhân tố quý báu của công ty.',
    emoji: '💎'
  },
  {
    id: 37,
    english: 'act like the Queen of Sheba',
    type: 'idiom',
    ipa: "/ækt laɪk ðə kwiːn əv 'ʃiːbə/",
    vietnamese: 'ra oai, hách dịch như bà hoàng (lời Denise nói về Anna khi ra lệnh thiếu tế nhị)',
    category: 'lunch',
    exampleEn: 'Denise complained that Anna was acting like the Queen of Sheba.',
    exampleVi: 'Denise cằn nhằn rằng Anna mới vào 5 phút mà đã ra oai như nữ hoàng Sheba.',
    emoji: '👑'
  },
  {
    id: 38,
    english: 'step on someone’s toes',
    type: 'idiom',
    ipa: "/step ɒn 'sʌmwʌnz təʊz/",
    vietnamese: 'can thiệp vào việc của người khác làm họ phật ý',
    category: 'lunch',
    exampleEn: 'Anna didn’t mean to step on Denise’s toes when asking for the CBL file.',
    exampleVi: 'Anna không hề có ý can thiệp hay làm phật ý Denise khi xin tệp CBL.',
    emoji: '🦶'
  }
];

export const ERROR_CATCH_EXERCISES: ErrorCatchExercise[] = [
  {
    id: 1,
    sentenceWords: ["A", "good", "example", "that", "comes", "on", "mind", "is", "my", "debating", "club."],
    errorIndex: 5, // 'on' -> 'to'
    correctWord: "to",
    explanation: "Cụm thành ngữ chuẩn là 'come TO mind' (nảy ra trong tâm trí), không dùng giới từ 'on'."
  },
  {
    id: 2,
    sentenceWords: ["I", "am", "particularly", "proud", "with", "organising", "the", "budget", "efficiently."],
    errorIndex: 4, // 'with' -> 'of'
    correctWord: "of",
    explanation: "Cấu trúc chuẩn là 'proud OF something/doing something' (tự hào về điều gì)."
  },
  {
    id: 3,
    sentenceWords: ["Please", "email", "me", "the", "file,", "I", "must", "to", "have", "it", "now."],
    errorIndex: 7, // 'to' -> '' (redundant)
    correctWord: "have",
    explanation: "Động từ khuyết thiếu 'must' đi trực tiếp với động từ nguyên mẫu không to (must have, không dùng must to have)."
  },
  {
    id: 4,
    sentenceWords: ["Would", "you", "mind", "write", "your", "email", "later", "please?"],
    errorIndex: 3, // 'write' -> 'writing'
    correctWord: "writing",
    explanation: "Cấu trúc lịch sự 'Would you mind + V-ing?' yêu cầu động từ ở dạng V-ing (writing)."
  },
  {
    id: 5,
    sentenceWords: ["Why", "don't", "you", "trying", "looking", "in", "your", "recycle", "bin?"],
    errorIndex: 3, // 'trying' -> 'try'
    correctWord: "try",
    explanation: "Cấu trúc đưa ra lời gợi ý 'Why don't you + V (nguyên mẫu)?' -> dùng 'try'."
  },
  {
    id: 6,
    sentenceWords: ["I", "was", "wondering", "if", "you", "can", "print", "this", "document", "for", "me."],
    errorIndex: 5, // 'can' -> 'could'
    correctWord: "could",
    explanation: "Trong câu yêu cầu lịch sự trang trọng 'I was wondering if you COULD...' lùi thì sang quá khứ lịch sự 'could'."
  }
];

export const UNSCRAMBLE_EXERCISES: UnscrambleExercise[] = [
  {
    id: 1,
    scrambledWords: ["Firstly,", "this", "job", "is", "an", "ideal", "match", "for", "my", "skills."],
    correctSentence: "Firstly, this job is an ideal match for my skills.",
    acceptedSentences: [
      "Firstly, this job is an ideal match for my skills."
    ],
    meaningVi: "Trước hết, công việc này là sự kết hợp lý tưởng cho các kỹ năng của tôi.",
    hintStructure: "Firstly, + this job + is + an ideal match for + my skills."
  },
  {
    id: 2,
    scrambledWords: ["A", "good", "example", "that", "comes", "to", "mind", "is", "my", "sales", "campaign."],
    correctSentence: "A good example that comes to mind is my sales campaign.",
    acceptedSentences: [
      "A good example that comes to mind is my sales campaign."
    ],
    meaningVi: "Một ví dụ điển hình nảy ra trong đầu tôi là chiến dịch bán hàng của mình.",
    hintStructure: "A good example that comes to mind is + [Noun phrase]."
  },
  {
    id: 3,
    scrambledWords: ["Could", "you", "possibly", "help", "me", "with", "the", "printer?"],
    correctSentence: "Could you possibly help me with the printer?",
    acceptedSentences: [
      "Could you possibly help me with the printer?"
    ],
    meaningVi: "Anh có thể vui lòng giúp tôi với máy in được không?",
    hintStructure: "Could + you + possibly + help me with + [Object]?"
  },
  {
    id: 4,
    scrambledWords: ["Would", "you", "mind", "sending", "me", "the", "background", "file", "on", "CBL?"],
    correctSentence: "Would you mind sending me the background file on CBL?",
    acceptedSentences: [
      "Would you mind sending me the background file on CBL?"
    ],
    meaningVi: "Chị có phiền gửi cho tôi tệp thông tin nền tảng về công ty CBL không?",
    hintStructure: "Would you mind + V-ing (sending) + me + the background file on CBL?"
  },
  {
    id: 5,
    scrambledWords: ["Timekeeping", "is", "very", "important", "to", "me", "in", "the", "workplace."],
    correctSentence: "Timekeeping is very important to me in the workplace.",
    acceptedSentences: [
      "Timekeeping is very important to me in the workplace."
    ],
    meaningVi: "Sự đúng giờ là điều vô cùng quan trọng đối với tôi nơi công sở.",
    hintStructure: "Timekeeping + is + very important to me + in the workplace."
  }
];

export const READING_PASSAGE_1: ReadingPassageGapFill = {
  title: "Tip Top Trading: Anna's Job Interview & First Impressions (Episodes 1 - 5)",
  instruction: "Chọn từ thích hợp từ ngân hàng từ vựng để điền vào các vị trí trống (1) - (10) trong câu chuyện công sở dưới đây:",
  wordBank: ["interview", "treasurer", "motivated", "match", "suggestion", "tea", "joined", "lunch", "wondering", "possibly"],
  sentences: [
    { text: "Anna arrives at Tip Top Trading for her job (1) ", blankIndex: 1, expectedWord: "interview", afterText: " with the manager, Paul." },
    { text: "When asked for an example of teamwork, she explains that she was the (2) ", blankIndex: 2, expectedWord: "treasurer", afterText: " of the debating society." },
    { text: "Anna emphasizes that she is extremely (3) ", blankIndex: 3, expectedWord: "motivated", afterText: " and willing to work very hard." },
    { text: "She structures her answer clearly: Firstly, the job is an ideal (4) ", blankIndex: 4, expectedWord: "match", afterText: " for her skills and experience." },
    { text: "When Denise panics over a lost presentation, Anna makes a smart (5) ", blankIndex: 5, expectedWord: "suggestion", afterText: " to check Paul's inbox." },
    { text: "It turns out the USB memory stick was accidentally dropped into Paul's cup of (6) ", blankIndex: 6, expectedWord: "tea", afterText: "!" },
    { text: "On her first day, Anna introduces herself to Tom: 'Hello, I've just (7) ", blankIndex: 7, expectedWord: "joined", afterText: " the team.'" },
    { text: "When Tom asks 'Can you do (8) ", blankIndex: 8, expectedWord: "lunch", afterText: "?', Anna brings pans and food to the office thinking she had to cook!" },
    { text: "Paul asks Anna politely: 'I was (9) ", blankIndex: 9, expectedWord: "wondering", afterText: " if you could print out a file for me?'" },
    { text: "Anna learns to ask Tom for help properly: 'Could you (10) ", blankIndex: 10, expectedWord: "possibly", afterText: " help me with the printer?'" }
  ],
  fullAudioText: "Anna arrives at Tip Top Trading for her job interview with the manager, Paul. When asked for an example of teamwork, she explains that she was the treasurer of the debating society. Anna emphasizes that she is extremely motivated and willing to work very hard. She structures her answer clearly: Firstly, the job is an ideal match for her skills and experience. When Denise panics over a lost presentation, Anna makes a smart suggestion to check Paul's inbox. It turns out the USB memory stick was accidentally dropped into Paul's cup of tea! On her first day, Anna introduces herself to Tom: 'Hello, I've just joined the team.' When Tom asks 'Can you do lunch?', Anna brings pans and food to the office thinking she had to cook! Paul asks Anna politely: 'I was wondering if you could print out a file for me?' Anna learns to ask Tom for help properly: 'Could you possibly help me with the printer?'"
};

export const READING_PASSAGE_2: ReadingPassageTF = {
  title: "Workplace Etiquette: From The Interview to Polite Office Requests",
  passageText: `Joining a new company requires mastering specific conversational strategies. During a job interview, candidates should structure their answers logically by using sequence markers like 'Firstly', 'Secondly', and 'Above all'. Providing concrete past accomplishments—such as managing society budgets or maintaining strict timekeeping—demonstrates competence without sounding arrogant. Once in the workplace, understanding idiomatic expressions is crucial; for example, 'doing lunch' refers to dining together rather than preparing meals. Furthermore, British office culture places immense value on polite indirect requests. Simply saying 'Please do this' can be perceived as blunt or bossy, whereas phrases like 'Would you mind sending me the file?' or 'Could you possibly help me?' foster collaborative relationships across departments.`,
  questions: [
    {
      id: 1,
      statement: "Using 'Firstly', 'Secondly', and 'Above all' helps structure interview responses clearly.",
      isTrue: true,
      explanation: "Đúng theo bài: 'candidates should structure their answers logically by using sequence markers like Firstly, Secondly, and Above all'."
    },
    {
      id: 2,
      statement: "In workplace English, 'doing lunch' means you are expected to cook food for your colleagues.",
      isTrue: false,
      explanation: "Sai, bài đọc làm rõ: ''doing lunch' refers to dining together rather than preparing meals'."
    },
    {
      id: 3,
      statement: "Just adding the word 'please' is always considered the most polite way to request help.",
      isTrue: false,
      explanation: "Sai, bài nêu: 'Simply saying 'Please do this' can be perceived as blunt or bossy'."
    },
    {
      id: 4,
      statement: "Phrases like 'Would you mind...' and 'Could you possibly...' make requests much more polite.",
      isTrue: true,
      explanation: "Đúng theo câu: 'phrases like 'Would you mind sending me the file?' or 'Could you possibly help me?' foster collaborative relationships'."
    },
    {
      id: 5,
      statement: "Anna was the president of the debating society at university.",
      isTrue: false,
      explanation: "Sai, trong giáo trình Anna từng làm 'treasurer' (thủ quỹ) của hội tranh biện."
    }
  ]
};

export const BOXING_QUESTIONS: BoxingQuestion[] = [
  {
    id: 1,
    question: "Trong Ep 1, Anna từng giữ chức vụ gì tại câu lạc bộ tranh biện trường đại học?",
    context: "Ep 1: The Interview",
    options: ["Chủ tịch (President)", "Thủ quỹ (Treasurer)", "Thư ký (Secretary)", "Trưởng ban truyền thông"],
    correctIndex: 1,
    explanation: "Anna trả lời Paul: 'I was the treasurer of the debating society at university. I organised the finances on a small budget.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 2,
    question: "Để cấu trúc câu trả lời phỏng vấn ấn tượng (Ep 2), thứ tự từ nối chuẩn là gì?",
    context: "Ep 2: The Interruption",
    options: [
      "One -> Two -> Three",
      "Finally -> At first -> Then",
      "Firstly -> Secondly -> Above all",
      "Because -> Although -> Therefore"
    ],
    correctIndex: 2,
    explanation: "Narrator hướng dẫn: 'Say firstly, then secondly, then say above all and give an enthusiastic final reason!'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 3,
    question: "Tại sao chiếc USB chứa bài thuyết trình PowerPoint bị ướt trong Ep 3?",
    context: "Ep 3: The Crisis",
    options: [
      "Vì Denise làm rơi vào bồn rửa chén",
      "Vì Paul đã dùng nó để khuấy tách trà nóng của mình",
      "Vì trời mưa qua cửa sổ",
      "Vì Tom đổ nước cam lên bàn"
    ],
    correctIndex: 1,
    explanation: "Paul thú nhận: 'Oh golly gosh, the USB stick! I think maybe I stirred my tea with it at one point.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 4,
    question: "Cụm từ 'Can you do lunch tomorrow?' của Tom trong Ep 4 mang ý nghĩa gì?",
    context: "Ep 4: Doing Lunch",
    options: [
      "Bạn có thể nấu bữa trưa mang đến văn phòng cho tôi không?",
      "Bạn có thể đặt đồ ăn trưa giúp tôi không?",
      "Bạn có bận ăn trưa không?",
      "Bạn có rảnh để cùng đi ăn trưa tại quán café không?"
    ],
    correctIndex: 3,
    explanation: "Tom giải thích: 'When I said 'Can you do lunch?' it didn't mean 'Can you make lunch?' It meant 'Are you available to come to lunch with me?''",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 5,
    question: "Cách nào dưới đây là lời đề nghị lịch sự đúng chuẩn công sở Anh (Ep 5)?",
    context: "Ep 5: The Queen of Sheba",
    options: [
      "Send me the file right now please.",
      "Would you mind sending me the file?",
      "You must give me the file.",
      "Give me the file quickly."
    ],
    correctIndex: 1,
    explanation: "Narrator giải thích: 'Instead of saying 'Please send me the file' you could say 'Would you mind sending me the file?' or 'Could you possibly send me the file?''",
    damage: 25,
    type: 'grammar'
  }
];

export const LETTER_CLUES = [
  { id: 1, prompt: 'Đặc biệt tự hào về thành tích', clue: 'p__________ p____ o_', fullWord: 'particularly proud of', emoji: '🏆' },
  { id: 2, prompt: 'Tác phong đúng giờ giấc', clue: 't__________', fullWord: 'timekeeping', emoji: '⏰' },
  { id: 3, prompt: 'Có động lực, giàu nhiệt huyết', clue: 'm________', fullWord: 'motivated', emoji: '🔥' },
  { id: 4, prompt: 'Trên hết, quan trọng nhất là', clue: 'a____ a__', fullWord: 'above all', emoji: '🌟' },
  { id: 5, prompt: 'Ứng biến nhanh nhạy, xử lý tức thì', clue: 't____ o_ y___ f___', fullWord: 'think on your feet', emoji: '🧠' },
  { id: 6, prompt: 'Người hòa đồng, giỏi đối nhân xử thế', clue: 'p_____ p_____', fullWord: 'people person', emoji: '🤝' },
  { id: 7, prompt: 'Đưa ra lời gợi ý / giải pháp', clue: 'm___ a s_________', fullWord: 'make a suggestion', emoji: '💡' },
  { id: 8, prompt: 'Bạn có phiền làm việc gì (+ V-ing)', clue: 'w____ y__ m___', fullWord: 'would you mind', emoji: '🙏' }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'first_hit',
    title: 'Cú Đấm Công Sở',
    description: 'Tung cú đấm chính xác đầu tiên trên võ đài thử thách',
    icon: '🥊',
    unlocked: false
  },
  {
    id: 'memory_master',
    title: 'Bậc Thầy Trí Nhớ Tip Top',
    description: 'Hoàn thành 1 màn lật thẻ thuật ngữ BBC English at Work',
    icon: '🃏',
    unlocked: false
  },
  {
    id: 'hoa_champion',
    title: 'Chuyên Viên Xuất Sắc',
    description: 'Hạ knock-out đối thủ trên võ đài thử thách (HP = 0)',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'streak_fire',
    title: 'Phản Xạ Tia Chớp',
    description: 'Đạt chuỗi 5 câu xử lý tình huống công sở đúng liên tiếp',
    icon: '🔥',
    unlocked: false
  },
  {
    id: 'grammar_guru',
    title: 'Bậc Thầy Giao Tiếp Lịch Sự',
    description: 'Bắt đúng toàn bộ lỗi ngữ pháp và soạn câu lịch sự chuẩn mực',
    icon: '⭐',
    unlocked: false
  }
];

export const LIKE_VERBS_PYRAMID = [
  { rank: 1, verb: 'Sell yourself', meaning: 'Tự tin nêu bật thế mạnh bản thân', level: 'High Positive' as const, color: 'from-emerald-500 to-emerald-600', example: 'You need to sell yourself and be confident.' },
  { rank: 2, verb: 'Structure answers', meaning: 'Sắp xếp câu trả lời lớp lang (Firstly, Secondly, Above all)', level: 'High Positive' as const, color: 'from-teal-500 to-teal-600', example: 'Structure your response with Firstly, Secondly, and Above all.' },
  { rank: 3, verb: 'Make suggestions', meaning: 'Đưa ra giải pháp mang tính xây dựng', level: 'Moderate' as const, color: 'from-blue-500 to-blue-600', example: 'Why don’t you try looking in your recycle bin?' },
  { rank: 4, verb: 'Polite requests', meaning: 'Dùng Would you mind / Could you possibly', level: 'Moderate' as const, color: 'from-indigo-500 to-indigo-600', example: 'Could you possibly help me with the printer?' },
  { rank: 5, verb: 'Avoid bluntness', meaning: 'Tránh ra lệnh cụt ngủn hoặc thô lỗ', level: 'Dislike' as const, color: 'from-amber-500 to-amber-600', example: 'Avoid saying just "Please do this" as it can sound bossy.' },
  { rank: 6, verb: 'Act like Queen of Sheba', meaning: 'Cấm hách dịch, ra oai với đồng nghiệp', level: 'Extreme Hate' as const, color: 'from-rose-600 to-red-700', example: 'Never act like the Queen of Sheba when asking for help.' }
];

export const PHONETICS_DATA = [
  { sound: '/ə/', label: 'Schwa (Âm ngắn không nhấn)', examples: ['agenda', 'confirm', 'proposal', 'polite', 'assistant'] },
  { sound: '/ɜː/', label: 'Long bird sound (Âm dài nhấn trọng âm)', examples: ['workplace', 'urgent', 'service', 'person', 'early'] },
  { sound: '/wʊd/', label: 'Modal Would', examples: ['would you mind', 'would you be able to', 'would like'] },
  { sound: '/kʊd/', label: 'Modal Could', examples: ['could you possibly', 'could I have', 'could you clarify'] }
];
