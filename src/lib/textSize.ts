// Larger text for the grandparents. Sizes are rem-based, so scaling the root
// font size scales the whole app (Tailwind arbitrary sizes use rem too).

export type TextSize = 'normal' | 'large' | 'xlarge';

const KEY = 'ixhuatan_text_size';
const ROOT_SIZE: Record<TextSize, string> = { normal: '100%', large: '112.5%', xlarge: '125%' };
export const TEXT_SIZES: TextSize[] = ['normal', 'large', 'xlarge'];

export const getStoredTextSize = (): TextSize => {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'large' || saved === 'xlarge') return saved;
  } catch { /* storage unavailable */ }
  return 'normal';
};

export const applyTextSize = (size: TextSize) => {
  document.documentElement.style.fontSize = ROOT_SIZE[size];
  try { localStorage.setItem(KEY, size); } catch { /* ignore */ }
};
