import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Gamepad2, BookOpen, Flame, ArrowRight, Play, Award, Tv, Heart, CheckCircle2, LayoutGrid, Target } from 'lucide-react';
import { TabType, UserStats } from '../types';
import { MascotHoa } from './MascotHoa';

interface DashboardProps {
  stats: UserStats;
  unitNum?: number;
  onNavigateTab: (tab: TabType) => void;
  onOpenPresentation: (tab?: TabType | 'all') => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  stats: _stats,
  unitNum = 1,
  onNavigateTab,
  onOpenPresentation
}) => {
  const isUnit6 = unitNum === 6;
  const isUnit5 = unitNum === 5;
  const isUnit4 = unitNum === 4;
  const isUnit3 = unitNum === 3;
  const isUnit2 = unitNum === 2;

  const mainTabs = [
    {
      id: 'vocabulary' as TabType,
      title: isUnit6 ? 'Từ Vựng Tuyển Dụng & Lãnh Đạo' : isUnit5 ? 'Từ Vựng Tài Chính & Vận Hành' : isUnit4 ? 'Từ Vựng Thuyết Trình & Tiếp Thị' : isUnit3 ? 'Từ Vựng Đàm Phán & Hợp Đồng' : isUnit2 ? 'Từ Vựng Cuộc Họp & Thảo Luận' : '30+ Thẻ Lật Từ Vựng Công Sở 3D',
      subtitle: isUnit6 ? 'Từ vựng CV xin việc, phỏng vấn, thăng tiến, đánh giá hiệu suất & quản lý nhân sự' : isUnit5 ? 'Từ vựng doanh thu, chi phí, ngân sách quý, báo cáo dòng tiền & chỉ số ROI' : isUnit4 ? 'Từ vựng chiến dịch tiếp thị, khách hàng mục tiêu, thông điệp thương hiệu & thuyết trình' : isUnit3 ? 'Từ vựng đàm phán thương mại, điều khoản hợp đồng, thỏa hiệp đôi bên cùng có lợi' : isUnit2 ? 'Từ vựng khai mạc, điều phối cuộc họp, các bên liên quan & phân công nhiệm vụ' : 'Xem danh sách từ, phiên âm IPA, nghe phát âm chuẩn và câu ví dụ công sở thực tế',
      icon: isUnit6 ? '📈' : isUnit5 ? '💵' : isUnit4 ? '📢' : isUnit3 ? '🤝' : isUnit2 ? '👥' : '💼',
      badge: 'Từ vựng cốt lõi',
      accent: 'border-[#C23320]/30 hover:border-[#C23320] bg-white',
      badgeColor: 'bg-[#FFF5F3] text-[#C23320]'
    },
    {
      id: 'vocab_practice' as TabType,
      title: 'Lật Thẻ Siêu Trí Nhớ & Ghép Cặp',
      subtitle: 'Game Memory Match 3D ghép cặp thuật ngữ Anh - Việt và bài tập kiểm tra phản xạ từ vựng',
      icon: '🃏',
      badge: 'Top 1 Yêu Thích',
      accent: 'border-amber-200 hover:border-amber-400 bg-amber-50/40',
      badgeColor: 'bg-amber-100 text-amber-900'
    },
    {
      id: 'grammar' as TabType,
      title: isUnit6 ? 'Ngữ Pháp & Mẫu Câu Phỏng Vấn' : isUnit5 ? 'Cấu Trúc Báo Cáo & Số Liệu Tài Chính' : isUnit4 ? 'Cấu Trúc Thuyết Trình & Pitching' : isUnit3 ? 'Mẫu Câu Đàm Phán & Đề Xuất Hợp Đồng' : isUnit2 ? 'Mẫu Câu Điều Phối & Lấy Ý Kiến Cuộc Họp' : 'Ngữ Pháp & Mẫu Câu Email Công Sở',
      subtitle: isUnit6 ? 'Mẫu câu thể hiện thành tích, năng lực lãnh đạo và câu hỏi phỏng vấn chuẩn chuyên nghiệp' : isUnit5 ? 'Cấu trúc so sánh số liệu, biểu đồ tài chính, tăng giảm doanh thu và dự báo ngân sách' : isUnit4 ? 'Mẫu câu mở đầu, dẫn dắt slide, nhấn mạnh điểm cốt lõi và kết bài thuyết trình ấn tượng' : isUnit3 ? 'Cấu trúc câu điều kiện If/Unless trong đàm phán, đề nghị đối ứng và chốt thỏa thuận' : isUnit2 ? 'Cấu trúc xin phát biểu, làm rõ ý kiến, đạt đồng thuận và tóm tắt biên bản cuộc họp' : 'Cấu trúc viết email lịch sự, yêu cầu cập nhật tiến độ, xác nhận lịch hẹn và đính kèm tệp',
      icon: '💡',
      badge: 'Mẫu câu thực chiến',
      accent: 'border-sky-200 hover:border-sky-400 bg-sky-50/40',
      badgeColor: 'bg-sky-100 text-sky-900'
    },
    {
      id: 'grammar_practice' as TabType,
      title: 'Sắp Xếp Câu & Bắt Lỗi Văn Bản',
      subtitle: isUnit6 ? 'Kéo thả câu trả lời phỏng vấn, bắt lỗi ngữ pháp trong CV và thư cảm ơn' : isUnit5 ? 'Kéo thả câu phân tích tài chính, bắt lỗi báo cáo doanh thu và chi phí' : isUnit4 ? 'Kéo thả ghép câu pitching sản phẩm, bắt lỗi câu thuyết trình trước đối tác' : isUnit3 ? 'Kéo thả câu đàm phán hợp đồng, sửa lỗi văn phong thương mại và điều khoản pháp lý' : isUnit2 ? 'Kéo thả câu điều hành cuộc họp, sửa lỗi ngữ pháp email mời họp và biên bản' : 'Kéo thả câu email công sở chuẩn, bắt lỗi sai ngữ pháp thường gặp trong công việc',
      icon: '🎯',
      badge: 'Có Gợi ý & Kéo thả',
      accent: 'border-emerald-200 hover:border-emerald-400 bg-emerald-50/40',
      badgeColor: 'bg-emerald-100 text-emerald-900'
    },
    {
      id: 'minigames' as TabType,
      title: 'Võ Đài Đấm Bốc Xả Stress',
      subtitle: 'Mỗi câu trả lời đúng từ vựng thương mại là 1 cú đấm chuẩn xác hạ gục bao cát đối thủ',
      icon: '🥊',
      badge: 'Hài hước xả stress',
      accent: 'border-rose-200 hover:border-rose-400 bg-rose-50/40',
      badgeColor: 'bg-rose-100 text-rose-900'
    },
    {
      id: 'reading' as TabType,
      title: isUnit6 ? 'Đọc Hiểu: Nghệ Thuật Lãnh Đạo & Tuyển Dụng' : isUnit5 ? 'Đọc Hiểu: Báo Cáo Tài Chính & Tối Ưu Chi Phí' : isUnit4 ? 'Đọc Hiểu: Chiến Lược Tiếp Thị Đột Phá' : isUnit3 ? 'Đọc Hiểu: Nghệ Thuật Đàm Phán Win-Win' : isUnit2 ? 'Đọc Hiểu: Tối Ưu Hiệu Quả Cuộc Họp Doanh Nghiệp' : 'Đọc Hiểu: Tối Ưu Email & Quản Trị Công Việc',
      subtitle: isUnit6 ? 'Bài đọc về xây dựng văn hóa doanh nghiệp, thu hút nhân tài và phát triển kỹ năng quản lý' : isUnit5 ? 'Bài đọc phân tích báo cáo doanh thu, chiến lược cắt giảm chi phí và tối đa hóa lợi nhuận' : isUnit4 ? 'Bài đọc phân tích chiến dịch marketing số, định vị thương hiệu và tiếp cận khách hàng' : isUnit3 ? 'Bài đọc kỹ thuật thương lượng hợp đồng B2B, xử lý xung đột lợi ích và chốt giao dịch' : isUnit2 ? 'Bài đọc về cách tổ chức cuộc họp 15 phút tinh gọn, biên bản ghi nhớ và phân công nhiệm vụ' : 'Bài đọc kỹ năng quản lý hộp thư email chuyên nghiệp, thiết lập thứ tự ưu tiên và hạn chót',
      icon: '📖',
      badge: 'Tình huống công sở',
      accent: 'border-indigo-200 hover:border-indigo-400 bg-indigo-50/40',
      badgeColor: 'bg-indigo-100 text-indigo-900'
    }
  ];

  return (
    <div id="dashboard-tab" className="space-y-6 max-w-6xl mx-auto py-2">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#C23320] via-[#D34533] to-[#B82B18] text-white p-6 md:p-8 shadow-xl shadow-[#C23320]/15">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-rose-100 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>English at Work • Business English Program • Unit {unitNum}</span>
            </div>

            <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
              Làm Chủ Tiếng Anh Thương Mại <br className="hidden md:inline" />
              <span className="text-amber-200 underline decoration-wavy decoration-amber-300">Nhanh Chóng & Thực Chiến</span> Cho Người Bận Rộn! 💼
            </h1>

            <p className="text-sm md:text-base text-rose-100 max-w-xl font-medium leading-relaxed">
              {isUnit6
                ? 'Luyện trọn bộ thuật ngữ Unit 6: Career & Leadership, mẫu câu phỏng vấn ấn tượng, từ vựng quản lý và văn hóa công sở hiện đại!'
                : isUnit5
                ? 'Luyện trọn bộ thuật ngữ Unit 5: Finance & Operations, doanh thu, chi phí, chỉ số ROI và kỹ năng đọc báo cáo tài chính!'
                : isUnit4
                ? 'Luyện trọn bộ thuật ngữ Unit 4: Marketing & Pitches, thông điệp chiến dịch, khách hàng mục tiêu và kỹ năng thuyết trình trước ban điều hành!'
                : isUnit3
                ? 'Luyện trọn bộ thuật ngữ Unit 3: Negotiations & Deals, nghệ thuật thương thảo hợp đồng, điều khoản thanh toán và chốt giao dịch Win-Win!'
                : isUnit2 
                ? 'Luyện trọn bộ thuật ngữ Unit 2: Business Meetings, chủ trì cuộc họp tinh gọn, phân công đầu việc và đạt được sự đồng thuận!'
                : 'Luyện trọn bộ thuật ngữ Unit 1: Workplace & Emails, kỹ năng viết email chuyên nghiệp, sắp xếp công việc ưu tiên và quản lý tiến độ chuẩn xác!'}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                id="hero-start-learning-btn"
                onClick={() => onNavigateTab('vocab_practice')}
                className="px-6 py-3.5 rounded-2xl bg-white text-[#C23320] hover:bg-[#FFF5F3] font-black text-sm md:text-base shadow-lg shadow-black/10 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-[#C23320]" />
                <span>Luyện Tập Thực Chiến Ngay</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-presentation-btn"
                onClick={onOpenPresentation}
                className="px-5 py-3.5 rounded-2xl bg-slate-900/40 hover:bg-slate-900/60 text-white font-bold text-sm backdrop-blur-sm border border-white/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Tv className="w-4 h-4 text-amber-300" />
                <span>Mở Slide Trình Chiếu</span>
              </button>
            </div>
          </div>

          {/* Quick Mascot Preview */}
          <div className="shrink-0 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 flex flex-col items-center">
            <MascotHoa hp={80} maxHp={100} size="sm" speechText="Luyện từ vựng chuẩn rồi so găng trên võ đài nhé! 💼🥊" />
          </div>
        </div>
      </div>

      {/* Showcase of All Main Tabs - Chuyên Mục Bài Học Theo Hàng Ngang */}
      <div>
        <div className="flex items-center justify-between mb-4 px-1">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <LayoutGrid className="w-5 h-5 text-[#C23320]" />
              <span>Chuyên Mục Bài Học Ôn Tập (Unit {unitNum})</span>
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Chọn chuyên mục bài học dưới đây để bắt đầu trải nghiệm ôn luyện thực chiến
            </p>
          </div>
          <span className="text-xs font-bold text-[#C23320] bg-[#FFF5F3] px-3 py-1 rounded-full border border-[#FEE2E2]">
            6 Chuyên mục bài học
          </span>
        </div>

        {/* Horizontal Card Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainTabs.map((tab) => (
            <motion.div
              key={tab.id}
              whileHover={{ y: -3, scale: 1.01 }}
              onClick={() => onNavigateTab(tab.id)}
              className={`p-4 rounded-3xl border-2 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group ${tab.accent}`}
            >
              <div className="flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shrink-0">
                  {tab.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${tab.badgeColor}`}>
                      {tab.badge}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenPresentation(tab.id);
                      }}
                      className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-slate-900 bg-white/90 hover:bg-white px-2 py-0.5 rounded-md border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                      title={`Trình chiếu Slide riêng cho mục ${tab.title}`}
                    >
                      <Tv className="w-3 h-3 text-[#C23320]" />
                      <span>Slide</span>
                    </button>
                  </div>

                  <h3 className="text-sm md:text-base font-black text-slate-800 group-hover:text-[#C23320] transition-colors line-clamp-1">
                    {tab.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                    {tab.subtitle}
                  </p>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200/50 flex items-center justify-between text-xs font-bold text-[#C23320]">
                <span className="text-[11px] text-slate-400 font-medium">Bấm để học</span>
                <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform font-black">
                  Vào học ngay <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
