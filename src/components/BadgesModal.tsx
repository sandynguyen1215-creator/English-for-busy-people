import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, CheckCircle2, Lock } from 'lucide-react';
import { Badge } from '../types';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter(b => b.unlocked).length;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl border border-rose-100 relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl shadow-inner">
              🏆
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-800">Bộ Sưu Tập Huy Hiệu</h3>
              <p className="text-xs text-slate-500 font-medium">
                Đã mở khóa <strong className="text-rose-600 font-bold">{unlockedCount}/{badges.length}</strong> danh hiệu vinh dự!
              </p>
            </div>
          </div>

          <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            {badges.map(badge => (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                  badge.unlocked
                    ? 'bg-gradient-to-r from-amber-50/70 to-rose-50/70 border-amber-200 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                  badge.unlocked ? 'bg-white shadow-xs' : 'bg-slate-200 text-slate-400'
                }`}>
                  {badge.unlocked ? badge.icon : <Lock className="w-5 h-5 text-slate-400" />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-extrabold text-sm text-slate-800">{badge.title}</h4>
                    {badge.unlocked && (
                      <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Đã nhận
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{badge.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 text-center">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-black text-sm shadow-md shadow-rose-200 transition-all active:scale-95"
            >
              Tiếp tục bài học
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
