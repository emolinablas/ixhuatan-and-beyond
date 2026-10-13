import React from 'react';
import { MessageCircle } from 'lucide-react';

/** Traffic-light color for a 1–5 ease score (5 = easiest). */
export const scoreTone = (score: number) =>
  score >= 4 ? 'good' : score === 3 ? 'ok' : 'hard';

const TONE_CLASSES = {
  good: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  ok: 'bg-amber-100 text-amber-900 border-amber-200',
  hard: 'bg-rose-100 text-rose-900 border-rose-200',
} as const;

export const toneClasses = (tone: keyof typeof TONE_CLASSES) => TONE_CLASSES[tone];

export const ScoreDots: React.FC<{ score: number; label: string }> = ({ score, label }) => (
  <span className="inline-flex items-center gap-0.5" role="img" aria-label={`${label}: ${score}/5`}>
    {[1, 2, 3, 4, 5].map(i => (
      <span
        key={i}
        className={`w-2 h-2 rounded-full ${i <= score
          ? scoreTone(score) === 'good' ? 'bg-emerald-600' : scoreTone(score) === 'ok' ? 'bg-amber-500' : 'bg-rose-600'
          : 'bg-slate-200'}`}
      />
    ))}
  </span>
);

export const WhatsAppButton: React.FC<{
  onClick: () => void;
  label: string;
  size?: 'sm' | 'md';
  className?: string;
}> = ({ onClick, label, size = 'md', className = '' }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center justify-center gap-1.5 rounded-xl font-bold transition-colors bg-[#0e7a40] hover:bg-[#0b6534] text-white ${
      size === 'sm' ? 'px-3 py-2 text-xs min-h-[40px]' : 'px-4 py-3 text-sm min-h-[48px]'
    } ${className}`}
  >
    <MessageCircle className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} aria-hidden />
    <span>{label}</span>
  </button>
);
