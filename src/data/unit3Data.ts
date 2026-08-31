import { VocabItem, BoxingQuestion, ErrorCatchExercise, UnscrambleExercise, ReadingPassageGapFill, ReadingPassageTF } from '../types';

export const VOCABULARY_LIST_UNIT3: VocabItem[] = [
  // Episode 11: Overtime & Working Long Hours (Tăng ca & Cân bằng áp lực)
  {
    id: 301,
    english: 'burn the candle at both ends',
    type: 'idiom',
    ipa: "/bɜːn ðə 'kændl æt bəʊθ endz/",
    vietnamese: 'làm việc ngày đêm kiệt sức (vừa thức khuya vừa dậy sớm làm việc)',
    category: 'overtime',
    exampleEn: 'Anna, you are really burning the candle at both ends to prepare your presentation.',
    exampleVi: 'Anna, cô đang thực sự làm việc ngày đêm kiệt sức để chuẩn bị bài thuyết trình.',
    emoji: '🕯️'
  },
  {
    id: 302,
    english: 'do overtime',
    type: 'phrase',
    ipa: "/duː 'əʊvətaɪm/",
    vietnamese: 'làm thêm giờ, tăng ca ngoài giờ hành chính',
    category: 'overtime',
    exampleEn: 'You have been doing hours of overtime, but we do not pay overtime here!',
    exampleVi: 'Cô đã làm thêm giờ hàng tiếng đồng hồ, nhưng ở đây chúng tôi không trả lương tăng ca!',
    emoji: '⏱️'
  },
  {
    id: 303,
    english: 'put in the hours',
    type: 'idiom',
    ipa: "/pʊt ɪn ðə 'aʊəz/",
    vietnamese: 'dành nhiều thời gian tâm huyết để đạt mục tiêu',
    category: 'overtime',
    exampleEn: 'It is good that you are putting in the hours Anna, but you should take some rest.',
    exampleVi: 'Thật tốt khi cô dồn nhiều thời gian tâm huyết như vậy, nhưng cô nên nghỉ ngơi một chút.',
    emoji: '⌛'
  },
  {
    id: 304,
    english: 'burn out',
    type: 'phrasal verb',
    ipa: "/bɜːn aʊt/",
    vietnamese: 'kiệt sức, cạn kiệt năng lượng vì làm việc quá tải',
    category: 'overtime',
    exampleEn: 'If you are not careful, you will burn out and be as useful as a chocolate teapot.',
    exampleVi: 'Nếu không cẩn thận, cô sẽ bị kiệt sức và vô dụng như một chiếc ấm trà bằng sô-cô-la.',
    emoji: '🔋'
  },
  {
    id: 305,
    english: 'as useful as a chocolate teapot',
    type: 'idiom',
    ipa: "/æz 'juːsfl æz ə 'tʃɒklət 'tiːpɒt/",
    vietnamese: 'vô dụng, không dùng được vào việc gì',
    category: 'overtime',
    exampleEn: 'If you burn out, you will be as useful as a chocolate teapot.',
    exampleVi: 'Nếu bạn bị kiệt sức, bạn sẽ trở nên vô dụng hoàn toàn (ấm sô-cô-la gặp nước sôi sẽ tan chảy).',
    emoji: '🫖'
  },
  {
    id: 306,
    english: 'work-life balance',
    type: 'noun phrase',
    ipa: "/wɜːk laɪf 'bæləns/",
    vietnamese: 'sự cân bằng giữa công việc và đời sống cá nhân',
    category: 'overtime',
    exampleEn: 'Maintaining a healthy work-life balance is crucial for long-term productivity.',
    exampleVi: 'Duy trì sự cân bằng giữa công việc và cuộc sống là điều tối quan trọng để làm việc bền bỉ.',
    emoji: '⚖️'
  },
  {
    id: 307,
    english: 'take a breather',
    type: 'idiom',
    ipa: "/teɪk ə 'briːðə(r)/",
    vietnamese: 'nghỉ ngơi xả hơi trong chốc lát',
    category: 'overtime',
    exampleEn: 'You’ve been working for six hours straight, go take a breather and get some air.',
    exampleVi: 'Bạn làm việc suốt 6 tiếng liên tục rồi, hãy nghỉ xả hơi một chút và hít thở không khí.',
    emoji: '☕'
  },

  // Episode 12: The Big Day & Opening Presentations (Mở đầu bài thuyết trình sản phẩm)
  {
    id: 308,
    english: 'open a presentation',
    type: 'phrase',
    ipa: "/'əʊpən ə ˌprezn'teɪʃn/",
    vietnamese: 'mở đầu bài thuyết trình chuyên nghiệp',
    category: 'pitch',
    exampleEn: 'Today I am going to present our revolutionary Imperial Lemon.',
    exampleVi: 'Hôm nay tôi xin được giới thiệu sản phẩm Chanh Hoàng Đế mang tính đột phá của chúng tôi.',
    emoji: '🎤'
  },
  {
    id: 309,
    english: 'move on to discuss',
    type: 'phrase',
    ipa: "/muːv ɒn tuː dɪ'skʌs/",
    vietnamese: 'chuyển sang phần thảo luận tiếp theo',
    category: 'pitch',
    exampleEn: 'And then I am going to move on to discuss the product specifications.',
    exampleVi: 'Và tiếp theo tôi xin phép chuyển sang thảo luận về thông số chi tiết của sản phẩm.',
    emoji: '➡️'
  },
  {
    id: 310,
    english: 'close up',
    type: 'adv phrase',
    ipa: "/kləʊs ʌp/",
    vietnamese: 'ở cự ly gần, tận mắt quan sát',
    category: 'pitch',
    exampleEn: 'Finally, you will all have a chance to see it close up and ask questions.',
    exampleVi: 'Cuối cùng, tất cả quý vị sẽ có cơ hội được xem sản phẩm ở cự ly gần và đặt câu hỏi.',
    emoji: '🔍'
  },
  {
    id: 311,
    english: 'outline the agenda',
    type: 'phrase',
    ipa: "/'aʊtlaɪn ðə ə'dʒendə/",
    vietnamese: 'khái quát các đề mục chính trong bài trình bày',
    category: 'pitch',
    exampleEn: 'Allow me to briefly outline the agenda before we delve into the details.',
    exampleVi: 'Cho phép tôi khái quát ngắn gọn các đề mục trước khi đi sâu vào chi tiết.',
    emoji: '📋'
  },
  {
    id: 312,
    english: 'visual aids',
    type: 'noun phrase',
    ipa: "/'vɪʒuəl eɪdz/",
    vietnamese: 'tài liệu trực quan minh họa (slide, mẫu sản phẩm)',
    category: 'pitch',
    exampleEn: 'Anna used plastic fruit samples as visual aids to captivate the buyers.',
    exampleVi: 'Anna đã dùng các mẫu hoa quả nhựa làm giáo cụ trực quan để cuốn hút người mua.',
    emoji: '📊'
  },

  // Episode 13: The Imperial Lemon & Pitching (Giới thiệu điểm mạnh và ưu thế sản phẩm)
  {
    id: 313,
    english: 'strong track record',
    type: 'noun phrase',
    ipa: "/strɒŋ træk 'rekɔːd/",
    vietnamese: 'bề dày thành tích ấn tượng, uy tín đã được chứng minh',
    category: 'pitch',
    exampleEn: 'Our company has a strong track record of reliability in Europe.',
    exampleVi: 'Công ty chúng tôi có bề dày thành tích uy tín đã được kiểm chứng tại Châu Âu.',
    emoji: '🏆'
  },
  {
    id: 314,
    english: 'key strengths',
    type: 'noun phrase',
    ipa: "/kiː streŋkθs/",
    vietnamese: 'những điểm mạnh then chốt, ưu thế vượt trội',
    category: 'pitch',
    exampleEn: 'The Imperial Lemon’s key strengths are its design and flexibility.',
    exampleVi: 'Điểm mạnh then chốt của Chanh Hoàng Đế là thiết kế và tính linh hoạt.',
    emoji: '💪'
  },
  {
    id: 315,
    english: 'authentic-looking',
    type: 'adj',
    ipa: "/ɔː'θentɪk 'lʊkɪŋ/",
    vietnamese: 'trông như thật, độ chân thực cao',
    category: 'pitch',
    exampleEn: 'Our fruits have won awards for being the most authentic-looking in Europe.',
    exampleVi: 'Hoa quả của chúng tôi đã đạt giải thưởng vì là sản phẩm trông giống thật nhất Châu Âu.',
    emoji: '✨'
  },
  {
    id: 316,
    english: 'unique selling point (USP)',
    type: 'noun phrase',
    ipa: "/juː'niːk 'selɪŋ pɔɪnt/",
    vietnamese: 'điểm bán hàng độc nhất, nét khác biệt cốt lõi',
    category: 'pitch',
    exampleEn: 'The Imperial Lemon’s curved stem is our unique selling point.',
    exampleVi: 'Cuống uốn cong của Chanh Hoàng Đế chính là điểm bán hàng độc nhất của chúng tôi.',
    emoji: '💎'
  },
  {
    id: 317,
    english: 'competitive advantage',
    type: 'noun phrase',
    ipa: "/kəm'petətɪv əd'vɑːntɪdʒ/",
    vietnamese: 'lợi thế cạnh tranh so với đối thủ',
    category: 'pitch',
    exampleEn: 'Laser curvature gives us a distinct competitive advantage over rival brands.',
    exampleVi: 'Độ cong laser tạo cho chúng ta lợi thế cạnh tranh rõ rệt so với các đối thủ.',
    emoji: '🥇'
  },

  // Episode 14: Telephone Tell-Tale & Feedback (Tác phong điện thoại & Tiếp thu góp ý)
  {
    id: 318,
    english: 'telephone manner',
    type: 'noun phrase',
    ipa: "/'telɪfəʊn 'mænə(r)/",
    vietnamese: 'tác phong, thái độ giao tiếp qua điện thoại',
    category: 'phone',
    exampleEn: 'Paul said: I am a little bit concerned about your telephone manner.',
    exampleVi: 'Paul nói: Tôi có một chút bận tâm về tác phong nghe điện thoại của cô.',
    emoji: '📞'
  },
  {
    id: 319,
    english: 'concerned about',
    type: 'adj phrase',
    ipa: "/kən'sɜːnd ə'baʊt/",
    vietnamese: 'băn khoăn, lo ngại / nhắc nhở khéo léo',
    category: 'phone',
    exampleEn: 'I am a little bit concerned about the way you speak to important clients.',
    exampleVi: 'Tôi có chút lo ngại về cách cô nói chuyện với các khách hàng quan trọng.',
    emoji: '😟'
  },
  {
    id: 320,
    english: 'work on',
    type: 'phrasal verb',
    ipa: "/wɜːk ɒn/",
    vietnamese: 'rèn luyện, cải thiện thêm',
    category: 'phone',
    exampleEn: 'You need to work on being more polite when answering client calls.',
    exampleVi: 'Cô cần rèn luyện để lịch sự hơn khi trả lời các cuộc gọi của khách hàng.',
    emoji: '🛠️'
  },
  {
    id: 321,
    english: 'room for improvement',
    type: 'phrase',
    ipa: "/ruːm fɔːr ɪm'pruːvmənt/",
    vietnamese: 'vẫn còn chỗ để hoàn thiện tốt hơn',
    category: 'phone',
    exampleEn: 'Your product knowledge is great, but there is still room for improvement in your phone etiquette.',
    exampleVi: 'Kiến thức sản phẩm của bạn rất tốt, nhưng vẫn còn điểm cần cải thiện trong tác phong nghe máy.',
    emoji: '📈'
  },

  // Episode 15: Seb Lime & Answering Calls (Tiếp nhận cuộc gọi & Ghi lời nhắn)
  {
    id: 322,
    english: 'take a message',
    type: 'phrase',
    ipa: "/teɪk ə 'mesɪdʒ/",
    vietnamese: 'ghi lại lời nhắn (khi đồng nghiệp vắng mặt)',
    category: 'phone',
    exampleEn: 'Tom is not available at the moment. Can I take a message?',
    exampleVi: 'Tom hiện không có ở đây. Tôi có thể ghi lại lời nhắn giúp quý khách được không?',
    emoji: '📝'
  },
  {
    id: 323,
    english: 'call you back',
    type: 'phrase',
    ipa: "/kɔːl juː bæk/",
    vietnamese: 'gọi điện thoại lại cho bạn sau',
    category: 'phone',
    exampleEn: 'I am afraid he is busy, shall I ask him to call you back?',
    exampleVi: 'Tôi e rằng anh ấy đang bận, tôi có thể bảo anh ấy gọi lại cho bạn sau được không?',
    emoji: '📲'
  },
  {
    id: 324,
    english: 'on first name terms',
    type: 'idiom',
    ipa: "/ɒn fɜːst neɪm tɜːmz/",
    vietnamese: 'gọi nhau bằng tên thân mật (không cần dùng Mr/Mrs)',
    category: 'phone',
    exampleEn: 'Mr Lime said: I think we should be on first name terms now, so call me Seb.',
    exampleVi: 'Ông Lime nói: Tôi nghĩ chúng ta nên xưng hô bằng tên thân mật, cứ gọi tôi là Seb.',
    emoji: '🤝'
  },
  {
    id: 325,
    english: 'personal nature',
    type: 'noun phrase',
    ipa: "/'pɜːsənl 'neɪtʃə(r)/",
    vietnamese: 'vấn đề cá nhân / tính chất riêng tư (Anna nhầm thành personnel - nhân sự)',
    category: 'phone',
    exampleEn: 'Seb Lime wanted to discuss a matter of a personal nature over lunch.',
    exampleVi: 'Seb Lime muốn bàn một chuyện mang tính chất cá nhân trong bữa trưa.',
    emoji: '💌'
  },
  {
    id: 326,
    english: 'put you through',
    type: 'phrasal verb',
    ipa: "/pʊt juː θruː/",
    vietnamese: 'chuyển máy / nối máy điện thoại cho bạn',
    category: 'phone',
    exampleEn: 'Please hold the line for a moment while I put you through to Mr Darcy.',
    exampleVi: 'Xin vui lòng giữ máy trong giây lát để tôi nối máy tới ông Darcy.',
    emoji: '📞'
  },
  {
    id: 327,
    english: 'hold the line',
    type: 'phrase',
    ipa: "/həʊld ðə laɪn/",
    vietnamese: 'giữ máy chờ một lát',
    category: 'phone',
    exampleEn: 'Could you hold the line please? I will check if she is at her desk.',
    exampleVi: 'Quý khách vui lòng giữ máy nhé? Tôi sẽ kiểm tra xem cô ấy có ở bàn làm việc không.',
    emoji: '⏳'
  }
];

export const ERROR_CATCH_EXERCISES_UNIT3: ErrorCatchExercise[] = [
  {
    id: 1,
    sentenceWords: ["Today", "I", "am", "going", "for", "present", "our", "new", "Imperial", "Lemon."],
    errorIndex: 4, // 'for' -> 'to'
    correctWord: "to",
    explanation: "Cấu trúc mở đầu bài thuyết trình là 'Today I am going TO present...' (dùng to-infinitive)."
  },
  {
    id: 2,
    sentenceWords: ["The", "company", "has", "a", "strong", "track", "record", "for", "reliability."],
    errorIndex: 7, // 'for' -> 'of'
    correctWord: "of",
    explanation: "Cụm danh từ chuẩn là 'a strong track record OF something' (bề dày thành tích về cái gì)."
  },
  {
    id: 3,
    sentenceWords: ["I", "am", "a", "little", "bit", "concern", "about", "your", "telephone", "manner."],
    errorIndex: 5, // 'concern' -> 'concerned'
    correctWord: "concerned",
    explanation: "Tính từ mô tả trạng thái lo ngại là 'concerned' (to be concerned about something)."
  },
  {
    id: 4,
    sentenceWords: ["I", "am", "really", "sorry,", "he", "is", "not", "availability", "at", "the", "moment."],
    errorIndex: 7, // 'availability' -> 'available'
    correctWord: "available",
    explanation: "Sau động từ to-be 'is not' cần tính từ 'available' (sẵn sàng/có mặt), không dùng danh từ 'availability'."
  },
  {
    id: 5,
    sentenceWords: ["You", "are", "burning", "the", "candle", "in", "both", "ends", "lately."],
    errorIndex: 5, // 'in' -> 'at'
    correctWord: "at",
    explanation: "Thành ngữ chuẩn là 'burn the candle AT both ends' (làm việc kiệt sức cả ngày lẫn đêm)."
  }
];

export const UNSCRAMBLE_EXERCISES_UNIT3: UnscrambleExercise[] = [
  {
    id: 1,
    scrambledWords: ["Today", "I", "am", "going", "to", "present", "our", "new", "product."],
    correctSentence: "Today I am going to present our new product.",
    acceptedSentences: ["Today I am going to present our new product."],
    meaningVi: "Hôm nay tôi xin phép được giới thiệu sản phẩm mới của chúng tôi.",
    hintStructure: "Today I am going to present + [Noun phrase]."
  },
  {
    id: 2,
    scrambledWords: ["The", "company", "has", "a", "strong", "track", "record", "of", "reliability."],
    correctSentence: "The company has a strong track record of reliability.",
    acceptedSentences: ["The company has a strong track record of reliability."],
    meaningVi: "Công ty chúng tôi có bề dày thành tích ấn tượng về độ tin cậy.",
    hintStructure: "The company + has + a strong track record of + reliability."
  },
  {
    id: 3,
    scrambledWords: ["I", "am", "a", "little", "bit", "concerned", "about", "your", "telephone", "manner."],
    correctSentence: "I am a little bit concerned about your telephone manner.",
    acceptedSentences: ["I am a little bit concerned about your telephone manner."],
    meaningVi: "Tôi có một chút bận tâm về tác phong giao tiếp qua điện thoại của cô.",
    hintStructure: "I am a little bit concerned about + [Noun phrase]."
  },
  {
    id: 4,
    scrambledWords: ["I", "am", "afraid", "he", "is", "busy,", "shall", "I", "ask", "him", "to", "call", "you", "back?"],
    correctSentence: "I am afraid he is busy, shall I ask him to call you back?",
    acceptedSentences: ["I am afraid he is busy, shall I ask him to call you back?"],
    meaningVi: "Tôi e rằng anh ấy đang bận, tôi có thể nhắn anh ấy gọi lại cho bạn không?",
    hintStructure: "I am afraid + S + is busy, + shall I ask him to call you back?"
  },
  {
    id: 5,
    scrambledWords: ["The", "Imperial", "Lemon's", "key", "strengths", "are", "its", "design", "and", "flexibility."],
    correctSentence: "The Imperial Lemon's key strengths are its design and flexibility.",
    acceptedSentences: ["The Imperial Lemon's key strengths are its design and flexibility."],
    meaningVi: "Điểm mạnh then chốt của Chanh Hoàng Đế là thiết kế và tính linh hoạt.",
    hintStructure: "[Subject]'s key strengths + are + [Noun A and Noun B]."
  }
];

export const READING_PASSAGE_1_UNIT3: ReadingPassageGapFill = {
  title: "Tip Top Trading: Pitching The Imperial Lemon & Telephone Lessons (Episodes 11 - 15)",
  instruction: "Chọn từ thích hợp từ ngân hàng từ vựng để điền vào các vị trí trống (1) - (10) trong câu chuyện dưới đây:",
  wordBank: ["overtime", "teapot", "present", "discuss", "strengths", "order", "concerned", "manner", "message", "personal"],
  sentences: [
    { text: "Anna works late doing hours of (1) ", blankIndex: 1, expectedWord: "overtime", afterText: " to prepare her pitch for Citrus Ventures." },
    { text: "Denise warns that if Anna burns out, she will be as useful as a chocolate (2) ", blankIndex: 2, expectedWord: "teapot", afterText: "!" },
    { text: "At the pitch, Anna begins: 'Today I am going to (3) ", blankIndex: 3, expectedWord: "present", afterText: " our revolutionary Imperial Lemon.'" },
    { text: "She continues: 'I'll start with Tip Top Trading and then move on to (4) ", blankIndex: 4, expectedWord: "discuss", afterText: " design features.'" },
    { text: "When slides freeze, Anna highlights the product's key (5) ", blankIndex: 5, expectedWord: "strengths", afterText: ": design and flexibility." },
    { text: "Impressed, Mr Lime immediately places a huge (6) ", blankIndex: 6, expectedWord: "order", afterText: " for 300,000 Imperial Lemons." },
    { text: "Back at the office, Paul tells Anna he is a little bit (7) ", blankIndex: 7, expectedWord: "concerned", afterText: " about her phone calls." },
    { text: "Paul advises Anna that she needs to work on her telephone (8) ", blankIndex: 8, expectedWord: "manner", afterText: " with clients." },
    { text: "Denise trains Anna how to take a polite (9) ", blankIndex: 9, expectedWord: "message", afterText: " when colleagues are busy." },
    { text: "Seb Lime calls and invites Anna to lunch to discuss a matter of a (10) ", blankIndex: 10, expectedWord: "personal", afterText: " nature!" }
  ],
  fullAudioText: "Anna works late doing hours of overtime to prepare her pitch for Citrus Ventures. Denise warns that if Anna burns out, she will be as useful as a chocolate teapot! At the pitch, Anna begins: 'Today I am going to present our revolutionary Imperial Lemon.' She continues: 'I'll start with Tip Top Trading and then move on to discuss design features.' When slides freeze, Anna highlights the product's key strengths: design and flexibility. Impressed, Mr Lime immediately places a huge order for 300,000 Imperial Lemons. Back at the office, Paul tells Anna he is a little bit concerned about her phone calls. Paul advises Anna that she needs to work on her telephone manner with clients. Denise trains Anna how to take a polite message when colleagues are busy. Seb Lime calls and invites Anna to lunch to discuss a matter of a personal nature!"
};

export const READING_PASSAGE_2_UNIT3: ReadingPassageTF = {
  title: "Presentation Signposting & Professional Telephone Etiquette",
  passageText: `Delivering a powerful sales pitch requires clear signposting at the start. Structuring an introduction with 'Today I'm going to...', 'I'll start by...', 'Then I'll move on to discuss...', and 'Finally...' sets realistic audience expectations. If visual aids malfunction, an agile presenter focuses directly on core value propositions, such as proving a company's strong track record and highlighting key product strengths. Furthermore, professional phone etiquette is vital for maintaining corporate reputation. Abruptly answering with 'Yes?' or hanging up on callers damages client goodwill. Instead, answering with the company name, offering assistance politely, taking detailed messages, and promising prompt follow-up calls preserves high service standards.`,
  questions: [
    {
      id: 1,
      statement: "According to Anna's pitch, the Imperial Lemon's key strengths are design and flexibility.",
      isTrue: true,
      explanation: "Đúng theo Ep 13: 'The Imperial Lemon's key strengths are its design and flexibility.'"
    },
    {
      id: 2,
      statement: "Mr Lime ordered 30,000 Imperial Lemons after Anna's presentation.",
      isTrue: false,
      explanation: "Sai, ông Lime đặt mua tới 300.000 (three hundred thousand) quả chanh."
    },
    {
      id: 3,
      statement: "Paul was satisfied with how Anna answered client phone calls on her first try.",
      isTrue: false,
      explanation: "Sai, Paul nhắc nhở: 'I'm a little bit concerned about your telephone manner.'"
    },
    {
      id: 4,
      statement: "Denise taught Anna to say 'Tip Top Trading, Anna speaking. How can I help you?'",
      isTrue: true,
      explanation: "Đúng, Denise đã hướng dẫn tỉ mỉ các câu chào chuẩn mực qua điện thoại trong Ep 15."
    },
    {
      id: 5,
      statement: "Seb Lime wanted to talk with Anna about personnel recruitment for his company.",
      isTrue: false,
      explanation: "Sai, Seb Lime nói rõ 'personal nature' (chuyện riêng tư cá nhân/hẹn hò), không phải 'personnel' (nhân sự)."
    }
  ]
};

export const BOXING_QUESTIONS_UNIT3: BoxingQuestion[] = [
  {
    id: 301,
    question: "Thành ngữ 'as useful as a chocolate teapot' mà Denise nói với Anna trong Ep 11 có nghĩa là gì?",
    context: "Ep 11: Overtime",
    options: [
      "Rất ngọt ngào và đáng yêu",
      "Hoàn toàn vô dụng (vì ấm trà sô-cô-la đựng nước nóng sẽ tan chảy)",
      "Được mọi người vô cùng yêu thích",
      "Tiết kiệm chi phí văn phòng"
    ],
    correctIndex: 1,
    explanation: "Đây là câu thành ngữ kinh điển của người Anh chỉ sự hoàn toàn vô ích/vô dụng.",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 302,
    question: "Mẫu câu mở đầu chuẩn bài thuyết trình (Ep 12) theo thứ tự là gì?",
    context: "Ep 12: The big day",
    options: [
      "Look at me -> Listen carefully -> Pay attention -> Buy now",
      "My name is... -> I like biscuits -> Here is the price -> Goodbye",
      "Today I'm going to... -> I'll start by... -> Move on to discuss... -> And finally...",
      "Firstly -> But -> Because -> However"
    ],
    correctIndex: 2,
    explanation: "Narrator hướng dẫn cấu trúc signposting kinh điển: Today I'm going to... / I'll start by... / And then I'm going to move on to discuss... / And finally...",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 303,
    question: "Số lượng quả Imperial Lemon mà Mr Lime đặt mua ngay sau bài thuyết trình của Anna (Ep 13) là bao nhiêu?",
    context: "Ep 13: The Imperial Lemon",
    options: ["30.000 quả", "8.000 quả", "300.000 quả", "100.000 quả"],
    correctIndex: 2,
    explanation: "Mr Lime thốt lên: 'Those lemons - wow. I'd like to put in an order for three hundred thousand right away.'",
    damage: 25,
    type: 'vocab'
  },
  {
    id: 304,
    question: "Khi người gọi muốn gặp đồng nghiệp đang bận, câu xử lý lịch sự chuẩn mực (Ep 15) là gì?",
    context: "Ep 15: Seb Lime",
    options: [
      "He is busy now, do not call again.",
      "I'm really sorry, he's not available at the moment. Can I take a message?",
      "I don't know where he is, call his mobile.",
      "Shut up and wait for five minutes."
    ],
    correctIndex: 1,
    explanation: "Denise dạy Anna câu chuẩn mực: 'I'm really sorry, he's not available at the moment. Can I take a message? Or: I'm afraid he's busy, shall I ask him to call you back?'",
    damage: 25,
    type: 'grammar'
  },
  {
    id: 305,
    question: "Khi sếp muốn nhắc nhở khéo léo nhân viên cải thiện tác phong (Ep 14), sếp thường nói:",
    context: "Ep 14: Telephone tell-tale",
    options: [
      "You are fired right now!",
      "I hate your working style.",
      "Never do that again or else.",
      "I'm a little bit concerned about... You need to work on..."
    ],
    correctIndex: 3,
    explanation: "Paul đã dùng mẫu câu lịch sự kiểu Anh: 'I'm a little bit concerned about... You need to work on...'",
    damage: 25,
    type: 'grammar'
  }
];

export const LETTER_CLUES_UNIT3 = [
  { id: 1, prompt: 'Làm việc ngày đêm kiệt sức', clue: 'b___ t__ c_____ a_ b___ e___', fullWord: 'burn the candle at both ends', emoji: '🕯️' },
  { id: 2, prompt: 'Làm thêm giờ ngoài giờ hành chính', clue: 'o_______', fullWord: 'overtime', emoji: '⏱️' },
  { id: 3, prompt: 'Bề dày thành tích uy tín', clue: 't____ r_____', fullWord: 'track record', emoji: '🏆' },
  { id: 4, prompt: 'Những điểm mạnh then chốt', clue: 'k__ s________', fullWord: 'key strengths', emoji: '💪' },
  { id: 5, prompt: 'Tác phong nghe gọi điện thoại', clue: 't________ m_____', fullWord: 'telephone manner', emoji: '📞' },
  { id: 6, prompt: 'Ghi lại lời nhắn từ người gọi', clue: 't___ a m______', fullWord: 'take a message', emoji: '📝' },
  { id: 7, prompt: 'Xưng hô thân mật bằng tên riêng', clue: 'f____ n___ t____', fullWord: 'first name terms', emoji: '🤝' },
  { id: 8, prompt: 'Chuyển sang phần trình bày tiếp', clue: 'm___ o_ t_ d______', fullWord: 'move on to discuss', emoji: '➡️' }
];
