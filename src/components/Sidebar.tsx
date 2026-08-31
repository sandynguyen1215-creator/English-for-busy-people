import React from 'react';
import { ChevronRight } from 'lucide-react';
import { UserStats } from '../types';

interface SidebarProps {
  stats: UserStats;
  onSelectUnit: (unitNum: number) => void;
  selectedUnit: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  stats,
  onSelectUnit,
  selectedUnit
}) => {
  const units = [
    { num: 1, title: 'Ep 1 - 5: Workplace & Crisis', vi: 'Phỏng vấn, Sự cố & Ăn trưa', active: true, progress: 100 },
    { num: 2, title: 'Ep 6 - 10: Clients & Brainstorm', vi: 'Khách hàng, Kho hàng & Họp ý tưởng', active: true, progress: 100 },
    { num: 3, title: 'Ep 11 - 15: Pitch & Phone Manners', vi: 'Thuyết trình sản phẩm & Điện thoại', active: true, progress: 100 },
    { num: 4, title: 'Ep 16 - 20: Orders, Emails & Agenda', vi: 'Từ chối, Đặt hàng & Viết Email', active: true, progress: 100 },
    { num: 5, title: 'Ep 21 - 25: Safety, Fire & Hotel', vi: 'An toàn PCCC, Sơ tán & Khách sạn', active: true, progress: 100 },
    { num: 6, title: 'Ep 26 - 30: Complaining & Deals', vi: 'Khiếu nại, Chào hàng & Đàm phán', active: true, progress: 100 },
  ];

  const unlockedBadgesCount = stats.badges.filter(b => b.unlocked).length;

  return (
    <aside id="app-sidebar" className="w-full lg:w-64 bg-white/70 backdrop-blur-sm border-r border-rose-100 p-4 flex flex-col justify-between shrink-0 space-y-6">
      <div className="space-y-5">
        {/* Profile / Professional Card */}
        <div className="bg-gradient-to-br from-rose-50 to-amber-50 p-3.5 rounded-2xl border border-rose-200/60 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-xl shadow-sm">
              💼
            </div>
            <div>
              <div className="text-[11px] font-bold uppercase text-rose-600 tracking-wider">Business English</div>
              <div className="text-sm font-extrabold text-slate-800">Pro Professional</div>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-rose-200/40 grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-white/80 p-1.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium">Thắng Võ Đài</span>
              <span className="font-black text-rose-600">{stats.hoaBattlesWon} lần 🥊</span>
            </div>
            <div className="bg-white/80 p-1.5 rounded-xl">
              <span className="text-[10px] text-slate-400 block font-medium">Huy hiệu</span>
              <span className="font-black text-amber-600">{unlockedBadgesCount}/{stats.badges.length} 🏆</span>
            </div>
          </div>
        </div>

        {/* Units Navigation List */}
        <div>
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Chương trình English at Work</span>
            <span className="text-[10px] font-semibold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full">6 Modules</span>
          </div>

          <div className="space-y-1.5">
            {units.map(unit => {
              const isSelected = selectedUnit === unit.num;
              return (
                <button
                  key={unit.num}
                  id={`unit-nav-btn-${unit.num}`}
                  onClick={() => onSelectUnit(unit.num)}
                  className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-200 font-bold'
                      : unit.active
                      ? 'bg-white hover:bg-rose-50/70 text-slate-700 border border-slate-100 hover:border-rose-200'
                      : 'bg-slate-50/60 text-slate-400 border border-transparent cursor-not-allowed opacity-60'
                  }`}
                  disabled={!unit.active}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {unit.num}
                    </span>
                    <div>
                      <div className="text-xs leading-tight font-extrabold">{unit.title}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>{unit.vi}</div>
                    </div>
                  </div>

                  {unit.active ? (
                    <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                  ) : (
                    <span className="text-[9px] font-bold bg-slate-200 text-slate-500 px-1.5 py-0.5 rounded">Sắp ra mắt</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Motivational Bottom Quote */}
      <div className="pt-4 border-t border-rose-100/60 text-center">
        <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100">
          <p className="text-[11px] font-semibold text-rose-800 leading-relaxed">
            💼 "Tiếng Anh công sở ngắn gọn, thực chiến - Tự tin giao tiếp và bứt phá sự nghiệp!"
          </p>
        </div>
      </div>
    </aside>
  );
};
