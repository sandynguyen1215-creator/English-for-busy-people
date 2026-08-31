import React, { useState } from 'react';
import { Tv, Sparkles, ArrowRight } from 'lucide-react';
import { SpeakButton } from './SpeakButton';

interface GrammarTabProps {
  unitNum: number;
  onOpenSlideMode?: () => void;
}

export const GrammarTab: React.FC<GrammarTabProps> = ({ unitNum, onOpenSlideMode }) => {
  const [activeSubTab, setActiveSubTab] = useState<number>(0);

  // Reset activeSubTab when unit changes
  React.useEffect(() => {
    setActiveSubTab(0);
  }, [unitNum]);

  // UNIT 1: Episodes 1 - 5
  const renderUnit1 = () => {
    const subTabs = [
      { id: 0, label: '1. Phỏng Vấn & STAR (Ep 1)', icon: '⭐' },
      { id: 2, label: '2. Đề Xuất & Nhờ Vả (Ep 2-3)', icon: '💡' },
      { id: 3, label: '3. Mời Ăn Trưa & Tác Phong (Ep 4-5)', icon: '🍽️' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-rose-100 shadow-xs overflow-x-auto">
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === tab.id ? 'bg-[#C23320] text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeSubTab === 0 && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl">
                💼
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-slate-800">Mẫu Câu Trả Lời Phỏng Vấn Gây Ấn Tượng (Episode 1)</h3>
                <p className="text-xs text-slate-500">Tự tin nêu bật thế mạnh, cấu trúc câu trả lời logic mạch lạc</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-800">1. Dẫn chứng ví dụ điển hình</span>
                  <SpeakButton text="A good example that comes to mind is my campaign for the debating society." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">A good example that comes to mind is + [Noun/Gerund]</p>
                <p className="text-xs text-slate-600 italic">"A good example that comes to mind is my project management."</p>
                <p className="text-[11px] text-slate-500">👉 Một ví dụ điển hình nảy ra trong tâm trí tôi là...</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-amber-900">2. Nhấn mạnh thành tựu tự hào</span>
                  <SpeakButton text="I am particularly proud of how I organized the finances on a small budget." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">I am particularly proud of + [Noun/Clause]</p>
                <p className="text-xs text-slate-600 italic">"I'm particularly proud of how I turned the crisis into profit."</p>
                <p className="text-[11px] text-slate-500">👉 Tôi đặc biệt tự hào về cách mình đã xử lý...</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-sky-900">3. Cấu trúc câu trả lời 3 phần</span>
                  <SpeakButton text="Firstly, I have the passion. Secondly, the experience. Above all, I work well in a team." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Firstly... Secondly... Above all...</p>
                <p className="text-xs text-slate-600 italic">"Firstly, hard work. Secondly, precision. Above all, integrity."</p>
                <p className="text-[11px] text-slate-500">👉 Thứ nhất... Thứ hai... Và quan trọng trên hết là...</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-emerald-900">4. Kỹ năng quản lý thời gian</span>
                  <SpeakButton text="Timekeeping is very important to me; I always deliver tasks on schedule." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Timekeeping is important to me</p>
                <p className="text-xs text-slate-600 italic">"Timekeeping is essential; I never miss project deadlines."</p>
                <p className="text-[11px] text-slate-500">👉 Tính đúng giờ là ưu tiên hàng đầu của tôi.</p>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 2 && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-xl">
                💡
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-slate-800">Đề Xuất Giải Pháp & Nhờ Trợ Giúp (Episodes 2 - 3)</h3>
                <p className="text-xs text-slate-500">Gợi ý khéo léo khi gặp sự cố máy tính và cách nhờ vả lịch sự</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-sky-900">1. Gợi ý giải pháp tích cực</span>
                  <SpeakButton text="Why don't you try looking in your recycle bin?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Why don't you try + V-ing...?</p>
                <p className="text-xs text-slate-700 italic">"Why don't you try restarting the server first?"</p>
                <p className="text-[11px] text-slate-500">👉 Sao anh không thử tìm trong thùng rác xem sao?</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-amber-900">2. Nhờ vả lịch sự trang trọng</span>
                  <SpeakButton text="Could you possibly help me with the scanner please?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Could you possibly + V-bare...?</p>
                <p className="text-xs text-slate-700 italic">"Could you possibly send me the updated price list?"</p>
                <p className="text-[11px] text-slate-500">👉 Anh có thể vui lòng giúp tôi một tay được không?</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-emerald-900">3. Cấu trúc Would you mind</span>
                  <SpeakButton text="Would you mind showing me where the spare paper is kept?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Would you mind + V-ing...?</p>
                <p className="text-xs text-slate-700 italic">"Would you mind checking this email before I send it?"</p>
                <p className="text-[11px] text-slate-500">👉 Bạn có phiền chỉ cho tôi nơi để giấy in không?</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-900">4. Đề nghị một khả năng</span>
                  <SpeakButton text="Perhaps you could call IT support to restore the file." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Perhaps you could + V-bare...</p>
                <p className="text-xs text-slate-700 italic">"Perhaps you could contact the client to confirm delivery."</p>
                <p className="text-[11px] text-slate-500">👉 Có lẽ anh có thể thử liên hệ bộ phận IT xem sao.</p>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 3 && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
                🍽️
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-slate-800">Mời Ăn Trưa & Tác Phong Không Hách Dịch (Episodes 4 - 5)</h3>
                <p className="text-xs text-slate-500">Rủ đồng nghiệp đi ăn trưa và bài học không làm 'Nữ hoàng Sheba'</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-amber-900">1. Mời ăn trưa thân mật</span>
                  <SpeakButton text="Shall we do lunch sometime this week to celebrate?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Shall we do lunch...? / How about lunch...?</p>
                <p className="text-xs text-slate-700 italic">"Shall we do lunch together today?"</p>
                <p className="text-[11px] text-slate-500">👉 Hôm nào chúng ta đi ăn trưa cùng nhau nhé?</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-900">2. Quy tắc 'Queen of Sheba'</span>
                  <SpeakButton text="Never act like the Queen of Sheba by ordering colleagues around rudely." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Act like the Queen of Sheba (Idiom)</p>
                <p className="text-xs text-slate-700 italic">"Denise felt Anna was acting like the Queen of Sheba."</p>
                <p className="text-[11px] text-slate-500">👉 Tránh ra vẻ bề trên, hách dịch hoặc sai vặt đồng nghiệp.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // UNIT 2: Episodes 6 - 10
  const renderUnit2 = () => {
    const subTabs = [
      { id: 0, label: '1. Đề Nghị Giúp Đỡ (Ep 6)', icon: '🤝' },
      { id: 1, label: '2. Xin Lỗi & Bồi Thường (Ep 7-8)', icon: '🙇' },
      { id: 2, label: '3. Xác Minh Kho & Phản Biện (Ep 9-10)', icon: '🔍' },
    ];

    return (
      <div className="space-y-6">
        <div className="flex gap-2 bg-white p-2 rounded-2xl border border-rose-100 shadow-xs overflow-x-auto">
          {subTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`flex-1 py-2.5 px-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                activeSubTab === tab.id ? 'bg-[#C23320] text-white shadow-sm' : 'text-slate-600 hover:bg-rose-50'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {activeSubTab === 0 && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
                🤝
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-slate-800">Đề Nghị Giúp Đỡ Khi Trùng Lịch (Episode 6)</h3>
                <p className="text-xs text-slate-500">Xử lý khi đồng nghiệp double-booked và đón tiếp khách hàng</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-emerald-900">1. Đề nghị chủ động giúp một tay</span>
                  <SpeakButton text="Is there anything I can do? Can I give you a hand?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Can I give you a hand with + [Noun]?</p>
                <p className="text-xs text-slate-700 italic">"Can I give you a hand with your coat, Mr Lime?"</p>
                <p className="text-[11px] text-slate-500">👉 Tôi có thể giúp một tay với áo khoác của ông được không?</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-amber-900">2. Sẵn lòng hỗ trợ bất cứ lúc nào</span>
                  <SpeakButton text="Give me a shout if you need anything at all!" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Give me a shout if you need + [Noun]</p>
                <p className="text-xs text-slate-700 italic">"Give me a shout if you need extra coffee."</p>
                <p className="text-[11px] text-slate-500">👉 Cứ ới tôi một tiếng nếu bạn cần bất kỳ thứ gì nhé!</p>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 1 && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl">
                🙇
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-slate-800">Xoa Dịu Cơn Giận Khách Hàng & Khen Ngợi (Episodes 7 - 8)</h3>
                <p className="text-xs text-slate-500">Thừa nhận lỗi lầm, cam kết khắc phục và khen ngợi sự bình tĩnh</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-900">1. Đồng cảm & Thừa nhận sự cố</span>
                  <SpeakButton text="I am really sorry to hear that. That must have been very inconvenient for you." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">That must have been very inconvenient for you.</p>
                <p className="text-[11px] text-slate-500">👉 Điều đó chắc hẳn đã gây ra rất nhiều bất tiện cho quý khách.</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-amber-900">2. Lời cam kết đanh thép</span>
                  <SpeakButton text="You have my word that we will sort this out today." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">You have my word that + [Clause]</p>
                <p className="text-[11px] text-slate-500">👉 Tôi xin cam đoan rằng chúng tôi sẽ giải quyết việc này ngay.</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-emerald-900">3. Đề nghị bồi thường thiện chí</span>
                  <SpeakButton text="We can include our latest-edition faux-oranges to make up for the inconvenience." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">To make up for the inconvenience</p>
                <p className="text-[11px] text-slate-500">👉 Chúng tôi xin gửi tặng thêm sản phẩm mới để bù đắp sự bất tiện này.</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-sky-900">4. Khen ngợi nhân viên xử lý tốt</span>
                  <SpeakButton text="You were in a difficult situation and you handled it well. Great job!" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">You remained calm, friendly and professional.</p>
                <p className="text-[11px] text-slate-500">👉 Cô đã giữ được sự bình tĩnh, thân thiện và chuyên nghiệp.</p>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 2 && (
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center text-xl">
                🔍
              </div>
              <div>
                <h3 className="text-base md:text-lg font-black text-slate-800">Xác Minh Số Liệu Kho & Phản Biện Lịch Sự (Episodes 9 - 10)</h3>
                <p className="text-xs text-slate-500">Làm rõ đơn hàng với quản lý kho và nghệ thuật phản biện trong cuộc họp</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-indigo-900">1. Làm rõ thông tin giao nhận</span>
                  <SpeakButton text="Could you possibly clarify what went out in today's delivery?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Could you possibly clarify + [Question clause]?</p>
                <p className="text-[11px] text-slate-500">👉 Bác có thể làm rõ những gì đã xuất kho hôm nay không?</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-sky-900">2. Xác nhận rõ ràng tuyệt đối</span>
                  <SpeakButton text="Just to be absolutely clear, you sent soft mangos, not the plastic ones?" size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Just to be absolutely clear, + [Clause]?</p>
                <p className="text-[11px] text-slate-500">👉 Để rõ ràng tuyệt đối, bác đã gửi xoài mềm đúng không?</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-amber-900">3. Phản biện lịch sự (I see your point...)</span>
                  <SpeakButton text="I see your point Denise, but actually I think happy clients will buy more." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">I see your point, but actually I think...</p>
                <p className="text-[11px] text-slate-500">👉 Tôi hiểu quan điểm của chị, nhưng thực ra tôi nghĩ...</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-rose-900">4. Thể hiện nghi vấn tế nhị</span>
                  <SpeakButton text="Well, I'm not so sure about that. A 20% discount could boost sales." size="sm" />
                </div>
                <p className="text-xs font-mono font-bold text-slate-800">Well, I'm not so sure about that...</p>
                <p className="text-[11px] text-slate-500">👉 Tôi không thực sự nghĩ vậy; giảm giá 20% sẽ kích cầu.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // UNIT 3: Episodes 11 - 15
  const renderUnit3 = () => (
    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl">
          🎤
        </div>
        <div>
          <h3 className="text-base md:text-lg font-black text-slate-800">Thuyết Trình Bán Hàng & Tác Phong Điện Thoại (Episodes 11 - 15)</h3>
          <p className="text-xs text-slate-500">Khai mạc bài pitch, làm nổi bật thế mạnh và trả lời điện thoại chuyên nghiệp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-amber-900">1. Khai mạc bài thuyết trình (Ep 12)</span>
            <SpeakButton text="Today I am going to present our revolutionary Imperial Lemon." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Today I'm going to... ➡️ I'll start by... ➡️ Move on to discuss...</p>
          <p className="text-[11px] text-slate-500">👉 Hôm nay tôi xin giới thiệu... Tôi sẽ bắt đầu bằng... Tiếp theo là...</p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-rose-900">2. Khẳng định thế mạnh vượt trội (Ep 13)</span>
            <SpeakButton text="The company has a strong track record of reliability. Our key strengths are design and flexibility." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Strong track record • Key strengths are...</p>
          <p className="text-[11px] text-slate-500">👉 Bề dày uy tín ấn tượng và điểm mạnh then chốt là thiết kế & linh hoạt.</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/60 border border-sky-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-sky-900">3. Chào hỏi qua điện thoại (Ep 15)</span>
            <SpeakButton text="Tip Top Trading, Anna speaking. How can I help you today?" size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">[Company name], [Your name] speaking. How can I help you?</p>
          <p className="text-[11px] text-slate-500">👉 Tip Top Trading, Anna xin nghe. Tôi có thể giúp gì cho quý khách?</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-emerald-900">4. Nhận lời nhắn khi đồng nghiệp vắng (Ep 15)</span>
            <SpeakButton text="I am really sorry, he is not available at the moment. Can I take a message?" size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">He's not available. Can I take a message? / Ask him to call you back?</p>
          <p className="text-[11px] text-slate-500">👉 Anh ấy hiện không có mặt. Tôi có thể ghi lại lời nhắn được không?</p>
        </div>
      </div>
    </div>
  );

  // UNIT 4: Episodes 16 - 20
  const renderUnit4 = () => (
    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center text-xl">
          ✉️
        </div>
        <div>
          <h3 className="text-base md:text-lg font-black text-slate-800">Từ Chối Khéo Léo, Đặt Hàng & Viết Email Chuẩn (Episodes 16 - 20)</h3>
          <p className="text-xs text-slate-500">Giữ ranh giới công việc, quy trình đặt hàng và điều hành agenda cuộc họp</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-rose-800">1. Từ chối dựa trên quy định (Ep 16)</span>
            <SpeakButton text="I am afraid it is against company policy to have non-business lunches with clients." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Against company policy • With regret, I have to say no</p>
          <p className="text-[11px] text-slate-500">👉 Trái với quy định công ty; với sự tiếc nuối tôi buộc phải từ chối.</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-amber-900">2. Đặt hàng nhà cung cấp (Ep 17)</span>
            <SpeakButton text="I would like to place an order for 300 green luxury boxes. When can we expect to receive them?" size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Place an order for... • Expect to receive them</p>
          <p className="text-[11px] text-slate-500">👉 Tôi muốn đặt 300 hộp sang trọng; khi nào chúng tôi có thể nhận hàng?</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-sky-900">3. Email thương mại chuẩn (Ep 18)</span>
            <SpeakButton text="Dear Mr Lime, I am writing regarding your request for luxury boxes. Yours sincerely." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Dear Mr [Surname] • I am writing regarding... • Yours sincerely</p>
          <p className="text-[11px] text-slate-500">👉 Kính gửi ông Lime, tôi viết thư liên quan đến... Trân trọng.</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-emerald-900">4. Điều hành agenda cuộc họp (Ep 20)</span>
            <SpeakButton text="There are four items on the agenda today. Firstly, stock. Secondly, team-building. Any other business? Let us wrap up." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Items on agenda ➡️ AOB (Any other business) ➡️ Wrap up</p>
          <p className="text-[11px] text-slate-500">👉 Điểm qua các mục trong chương trình họp và giải tán đúng giờ.</p>
        </div>
      </div>
    </div>
  );

  // UNIT 5: Episodes 21 - 25
  const renderUnit5 = () => (
    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl">
          🔔
        </div>
        <div>
          <h3 className="text-base md:text-lg font-black text-slate-800">An Toàn PCCC, Sơ Tán & Đặt Khách Sạn (Episodes 21 - 25)</h3>
          <p className="text-xs text-slate-500">Xin lời khuyên, quy định an toàn, mệnh lệnh sơ tán và đặt phòng sếp tổng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-amber-900">1. Xin lời khuyên đồng nghiệp (Ep 21)</span>
            <SpeakButton text="I would be most grateful if you could give me some advice." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">I would be most grateful if you could + [Verb]</p>
          <p className="text-[11px] text-slate-500">👉 Tôi sẽ vô cùng biết ơn nếu anh có thể cho tôi một lời khuyên.</p>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-rose-900">2. Yêu cầu tuân thủ an toàn (Ep 22)</span>
            <SpeakButton text="Smoking is strictly not permitted on company premises. Please extinguish your cigarette." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Not permitted on company premises • Extinguish cigarette</p>
          <p className="text-[11px] text-slate-500">👉 Cấm hút thuốc trong khuôn viên công ty; hãy dập thuốc ngay.</p>
        </div>

        <div className="p-4 rounded-2xl bg-red-50/40 border border-red-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-red-900">3. Chỉ dẫn sơ tán khẩn cấp (Ep 23-24)</span>
            <SpeakButton text="There is no need to panic. Please use the stairs not the lift and meet at the assembly point." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Raise the alarm • Use the stairs not the lift • Fire assembly point</p>
          <p className="text-[11px] text-slate-500">👉 Kích hoạt chuông báo; đi thang bộ không dùng thang máy; tập trung ngoài trời.</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-sky-900">4. Đặt phòng khách sạn điều hành (Ep 25)</span>
            <SpeakButton text="I would like to check availability and rates for a room. Does the price include breakfast?" size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Check availability • Business facilities • Twin bed vs single bed</p>
          <p className="text-[11px] text-slate-500">👉 Kiểm tra phòng trống, tiện ích công tác và xác nhận loại giường.</p>
        </div>
      </div>
    </div>
  );

  // UNIT 6: Episodes 26 - 30
  const renderUnit6 = () => (
    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl">
          📉
        </div>
        <div>
          <h3 className="text-base md:text-lg font-black text-slate-800">Khiếu Nại, Tin Xấu, Giữ Tác Phong & Đàm Phán (Episodes 26 - 30)</h3>
          <p className="text-xs text-slate-500">Yêu cầu bồi thường dịch vụ, thông báo sụt giảm lợi nhuận và đàm phán chốt hợp đồng</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-rose-900">1. Khiếu nại dịch vụ khách sạn (Ep 26)</span>
            <SpeakButton text="I am very disappointed with your service. The standard did not meet our expectations." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Disappointed with service • Did not meet expectations • Full refund</p>
          <p className="text-[11px] text-slate-500">👉 Rất thất vọng về dịch vụ; phòng không đáp ứng kỳ vọng; yêu cầu hoàn tiền.</p>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-amber-900">2. Nói thẳng sự thật khó khăn (Ep 27)</span>
            <SpeakButton text="I have got to give it to you straight: the company outlook is gloomy." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Give it to you straight • Outlook is gloomy • Profit warning</p>
          <p className="text-[11px] text-slate-500">👉 Tôi phải nói thẳng với các bạn: viễn cảnh công ty đang rất ảm đạm.</p>
        </div>

        <div className="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-sky-900">3. Giữ tác phong công việc (Ep 28)</span>
            <SpeakButton text="Can we keep our conversation professional please? Let us change the subject." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">Keep conversation professional • Change the subject</p>
          <p className="text-[11px] text-slate-500">👉 Giữ cuộc trò chuyện đúng mực công việc và chuyển sang đề tài khác.</p>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-xs text-emerald-900">4. Đàm phán giá & Thỏa hiệp (Ep 29 - 30)</span>
            <SpeakButton text="If you buy more stock, I can offer a bigger discount. Let us meet half way." size="sm" />
          </div>
          <p className="text-xs font-mono font-bold text-slate-800">What price are you willing to pay? • Can't go that low • Meet half way</p>
          <p className="text-[11px] text-slate-500">👉 Mua nhiều hơn để nhận chiết khấu; thỏa hiệp nhượng bộ đôi bên cùng có lợi.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div id="grammar-tab-container" className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Top Banner & Slide Mode Action */}
      <div className="bg-white p-4 rounded-3xl border border-rose-100 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0">
            💡
          </div>
          <div>
            <h2 className="text-base font-black text-slate-800">
              Lý Thuyết & Mẫu Câu Thực Chiến • Unit {unitNum} (Episodes {((unitNum - 1) * 5) + 1} - {unitNum * 5})
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Bám sát 100% tình huống, ngữ cảnh đối thoại và giải pháp giao tiếp trong giáo trình English at Work
            </p>
          </div>
        </div>

        {onOpenSlideMode && (
          <button
            id="grammar-presentation-btn"
            onClick={onOpenSlideMode}
            className="px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-white shadow-sm hover:scale-102 active:scale-98 cursor-pointer transition-all shrink-0"
            title="Trình chiếu Slide lý thuyết ngữ pháp & mẫu câu"
          >
            <Tv className="w-4 h-4 text-amber-300" />
            <span>Trình Chiếu Ngữ Pháp</span>
          </button>
        )}
      </div>

      {unitNum === 6 && renderUnit6()}
      {unitNum === 5 && renderUnit5()}
      {unitNum === 4 && renderUnit4()}
      {unitNum === 3 && renderUnit3()}
      {unitNum === 2 && renderUnit2()}
      {unitNum === 1 && renderUnit1()}
    </div>
  );
};
