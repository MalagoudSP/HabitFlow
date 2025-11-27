export type HabitCategory = 'health' | 'fitness' | 'mindfulness' | 'productivity' | 'learning' | 'social';

export interface Habit {
  id: string;
  name: string;
  category: HabitCategory;
  icon: string;
  streak: number;
  completedToday: boolean;
  completedDates: string[];
  createdAt: string;
  target: number; // times per week
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  totalCompletions: number;
  weeklyProgress: number;
}

export const categoryColors: Record<HabitCategory, { bg: string; text: string; border: string }> = {
  health: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  fitness: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/30' },
  mindfulness: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/30' },
  productivity: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
  learning: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', border: 'border-yellow-500/30' },
  social: { bg: 'bg-pink-500/20', text: 'text-pink-400', border: 'border-pink-500/30' },
};

export const categoryIcons: Record<HabitCategory, string> = {
  health: '🍎',
  fitness: '💪',
  mindfulness: '🧘',
  productivity: '⚡',
  learning: '📚',
  social: '👥',
};
