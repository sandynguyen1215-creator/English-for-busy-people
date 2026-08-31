import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, RotateCw, LayoutGrid, Table as TableIcon, Tv, Headphones } from 'lucide-react';
import { VocabItem } from '../types';
import { playFlipSound } from '../utils/audio';
import { SpeakButton } from './SpeakButton';

interface VocabularyTabProps {
  vocabList: VocabItem[];
  unitNum: number;
  unitTitle?: string;
  onOpenSlideMode: (initialIndex?: number) => void;
  onOpenVoiceSettings?: () => void;
}

export const VocabularyTab: React.FC<VocabularyTabProps> = ({
  vocabList,
  unitNum,
  unitTitle,
  onOpenSlideMode,
  onOpenVoiceSettings
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});

  const filteredList = vocabList.filter(item => {
    const matchesSearch =
      item.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.vietnamese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.ipa.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFlip = (id: number) => {
    playFlipSound();
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = unitNum === 6 ? [
    { id: 'all', label: `Tất cả (${vocabList.length} từ)`, icon: '🌟' },
    { id: 'complaint', label: 'Khiếu nại dịch vụ (Ep 26)', icon: '🏨' },
    { id: 'badnews', label: 'Thông báo tin xấu (Ep 27)', icon: '📉' },
    { id: 'etiquette', label: 'Tác phong công việc (Ep 28)', icon: '👔' },
    { id: 'negotiation', label: 'Đàm phán giá & Thỏa hiệp (Ep 29-30)', icon: '🤝' },
  ] : unitNum === 5 ? [
    { id: 'all', label: `Tất cả (${vocabList.length} từ)`, icon: '🌟' },
    { id: 'advice', label: 'Xin lời khuyên (Ep 21)', icon: '💡' },
    { id: 'safety', label: 'Quy định an toàn (Ep 22)', icon: '🚭' },
    { id: 'fire', label: 'Sơ tán PCCC (Ep 23-24)', icon: '🚨' },
    { id: 'hotel', label: 'Đặt phòng khách sạn (Ep 25)', icon: '🛎️' },
  ] : unitNum === 4 ? [
    { id: 'all', label: `Tất cả (${vocabList.length} từ)`, icon: '🌟' },
    { id: 'refusal', label: 'Từ chối lịch sự (Ep 16)', icon: '✋' },
    { id: 'order', label: 'Đặt hàng nhà cung cấp (Ep 17)', icon: '📦' },
    { id: 'email', label: 'Viết email thương mại (Ep 18)', icon: '✉️' },
    { id: 'meeting', label: 'Chủ trì agenda họp (Ep 19-20)', icon: '📋' },
  ] : unitNum === 3 ? [
    { id: 'all', label: `Tất cả (${vocabList.length} từ)`, icon: '🌟' },
    { id: 'overtime', label: 'Làm thêm giờ (Ep 11)', icon: '⏰' },
    { id: 'pitch', label: 'Thuyết trình sản phẩm (Ep 12-13)', icon: '🎤' },
    { id: 'phone', label: 'Nghe gọi điện thoại (Ep 14-15)', icon: '📞' },
  ] : unitNum === 2 ? [
    { id: 'all', label: `Tất cả (${vocabList.length} từ)`, icon: '🌟' },
    { id: 'schedule', label: 'Trùng lịch & Tiếp khách (Ep 6)', icon: '📅' },
    { id: 'apology', label: 'Xử lý sự cố & Đền bù (Ep 7-8)', icon: '🙇' },
    { id: 'warehouse', label: 'Kiểm tra kho bãi (Ep 9)', icon: '🏭' },
    { id: 'brainstorm', label: 'Họp ý tưởng & Phản biện (Ep 10)', icon: '💡' },
  ] : [
    { id: 'all', label: `Tất cả (${vocabList.length} từ)`, icon: '🌟' },
    { id: 'interview', label: 'Phỏng vấn & STAR (Ep 1)', icon: '💼' },
    { id: 'computer', label: 'Sự cố & Nhờ vả (Ep 2-3)', icon: '💻' },
    { id: 'lunch', label: 'Mời ăn trưa & Tác phong (Ep 4-5)', icon: '🍽️' },
  ];

  return (
    <div id="vocabulary-showcase-tab" className="space-y-5 max-w-6xl mx-auto">
      {/* Header & Filter Controls Bar */}
      <div className="bg-white p-4 md:p-5 rounded-3xl border border-[#F0E8DD] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            id="vocab-search-input"
            type="text"
            placeholder="Tìm kiếm từ tiếng Anh, nghĩa tiếng Việt, IPA..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs md:text-sm font-medium text-slate-800 focus:outline-none focus:border-[#C23320] focus:bg-white transition-colors"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
            >
              ✕
            </button>
          )}
        </div>

        {/* View Mode, Voice Settings & Presentation Launcher */}
        <div className="flex items-center justify-between md:justify-end gap-2 flex-wrap">
          {/* Voice Settings */}
          {onOpenVoiceSettings && (
            <button
              onClick={onOpenVoiceSettings}
              className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white hover:bg-[#FFF5F3] text-slate-700 hover:text-[#C23320] border border-slate-200 hover:border-rose-200 text-xs font-bold transition-all cursor-pointer"
              title="Đổi giọng đọc (Mỹ, Anh, Úc, Tốc độ)"
            >
              <Headphones className="w-3.5 h-3.5 text-[#C23320]" />
              <span className="hidden sm:inline">Giọng đọc</span>
            </button>
          )}

          {/* View toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              id="vocab-view-cards-btn"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'cards' ? 'bg-white text-[#C23320] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Thẻ 3D</span>
            </button>
            <button
              id="vocab-view-table-btn"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'table' ? 'bg-white text-[#C23320] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Dạng Bảng</span>
            </button>
          </div>

          {/* Slide Mode */}
          <button
            id="vocab-slide-mode-btn"
            onClick={() => onOpenSlideMode(0)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FFF5F3] hover:bg-[#FEE2E2] text-[#C23320] border border-[#FEE2E2] text-xs font-bold transition-colors cursor-pointer"
            title="Trình chiếu từng từ vựng phóng to trên màn hình"
          >
            <Tv className="w-3.5 h-3.5 text-[#C23320]" />
            <span className="hidden sm:inline">Slide từ vựng</span>
          </button>
        </div>
      </div>


      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as typeof selectedCategory)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#C23320] text-white shadow-sm shadow-[#C23320]/20'
                : 'bg-white text-slate-600 hover:bg-[#FFF5F3] border border-slate-200'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content Area: 3D Flashcards View */}
      {viewMode === 'cards' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredList.map((item) => {
            const isFlipped = !!flippedCards[item.id];
            return (
              <div
                key={item.id}
                id={`vocab-card-${item.id}`}
                className="perspective-[1000px] h-[265px] cursor-pointer group"
                onClick={() => toggleFlip(item.id)}
              >
                <motion.div
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  style={{ transformStyle: 'preserve-3d' }}
                  className="w-full h-full relative rounded-3xl"
                >
                  {/* FRONT SIDE */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="absolute inset-0 w-full h-full bg-white rounded-3xl p-5 border-2 border-[#F0E8DD] hover:border-[#C23320]/40 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="flex items-start justify-between">
                      <span className="w-6 h-6 rounded-lg bg-[#FFF5F3] text-[#C23320] font-bold text-xs flex items-center justify-center">
                        {item.id}
                      </span>
                      <SpeakButton 
                        text={item.english} 
                        size="sm" 
                        title={`Phát âm từ ${item.english}`}
                      />
                    </div>

                    <div className="text-center my-auto">
                      <div className="text-4xl mb-2 select-none group-hover:scale-110 transition-transform duration-300">
                        {item.emoji}
                      </div>
                      <h3 className="font-black text-slate-800 text-base md:text-lg tracking-tight line-clamp-1">
                        {item.english}
                      </h3>
                      <p className="text-xs font-mono font-bold text-[#C23320] mt-0.5">{item.ipa}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span className="italic">{item.type}</span>
                      <span className="flex items-center gap-1 text-[#C23320] font-bold group-hover:text-[#A12A1B]">
                        <RotateCw className="w-3 h-3" /> Lật xem nghĩa
                      </span>
                    </div>
                  </div>

                  {/* BACK SIDE */}
                  <div
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                    className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#C23320] to-[#991B1B] text-white rounded-3xl p-5 shadow-md flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-rose-200 bg-white/10 px-2 py-0.5 rounded-full">
                        Nghĩa & Ví dụ
                      </span>
                      <SpeakButton 
                        text={item.exampleEn} 
                        size="sm" 
                        className="bg-white/20 hover:bg-white/30 text-white border-white/20"
                        title="Nghe câu ví dụ"
                      />
                    </div>

                    <div className="my-auto">
                      <div className="text-base md:text-lg font-black text-white leading-snug">
                        {item.vietnamese}
                      </div>
                      <div className="mt-2 text-xs text-rose-100 bg-white/10 p-2.5 rounded-xl backdrop-blur-2xs">
                        <p className="font-semibold text-white">"{item.exampleEn}"</p>
                        <p className="text-[10px] text-rose-200 mt-1 italic">{item.exampleVi}</p>
                      </div>
                    </div>

                    <div className="pt-1 text-center">
                      <span className="text-[10px] text-rose-200 flex items-center justify-center gap-1">
                        <RotateCw className="w-3 h-3" /> Nhấp để quay lại
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Detailed Table View */
        <div className="bg-white rounded-3xl border border-[#F0E8DD] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#FFF5F3] text-slate-700 font-extrabold uppercase tracking-wider text-[10px] md:text-xs border-b border-[#F0E8DD]">
                <tr>
                  <th className="py-3 px-4 w-12 text-center">STT</th>
                  <th className="py-3 px-4">Minh họa</th>
                  <th className="py-3 px-4">Từ tiếng Anh</th>
                  <th className="py-3 px-4">Loại từ</th>
                  <th className="py-3 px-4 font-mono">Phiên âm IPA</th>
                  <th className="py-3 px-4">Nghĩa tiếng Việt</th>
                  <th className="py-3 px-4 text-center">Phát âm</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredList.map(item => (
                  <tr key={item.id} className="hover:bg-[#FFF5F3]/50 transition-colors">
                    <td className="py-3 px-4 text-center font-bold text-slate-400">{item.id}</td>
                    <td className="py-3 px-4 text-2xl text-center select-none">{item.emoji}</td>
                    <td className="py-3 px-4 font-extrabold text-slate-900">{item.english}</td>
                    <td className="py-3 px-4 text-slate-500 italic">{item.type}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#C23320]">{item.ipa}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{item.vietnamese}</td>
                    <td className="py-3 px-4 text-center">
                      <SpeakButton 
                        text={item.english} 
                        size="sm" 
                        title={`Phát âm từ ${item.english}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredList.length === 0 && (
        <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300">
          <p className="text-slate-500 font-medium">Không tìm thấy từ vựng nào phù hợp với từ khóa "{searchTerm}".</p>
          <button
            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
            className="mt-3 px-4 py-2 bg-[#C23320] text-white rounded-xl text-xs font-bold cursor-pointer"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}
    </div>
  );
};
