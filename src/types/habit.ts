export type HabitCategory = 'health' | 'fitness' | 'mindfulness' | 'productivity' | 'learning' | 'social' | 'spiritual' | 'study' | 'reading' | 'coding';

export type FrequencyType = 'daily' | 'weekly' | 'monthly' | 'custom';

export type MissReason = 'lack-of-time' | 'laziness' | 'forgot' | 'busy-schedule' | 'low-motivation' | 'other';

export type MoodType = 'excellent' | 'good' | 'neutral' | 'bad' | 'terrible';

export type AchievementType = 'streak-7' | 'streak-30' | 'streak-100' | 'first-habit' | 'perfect-week' | 'milestone-master';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  category: HabitCategory;
  icon: string;
  color?: string;
  streak: number;
  bestStreak: number;
  completedToday: boolean;
  completedDates: string[];
  missedDates: string[];
  missReasons?: Record<string, MissReason>; // date -> reason
  createdAt: string;
  target: number; // times per week
  frequency: FrequencyType;
  specificDays?: number[]; // 0-6 for weekly habits (0 = Sunday)
  reminderTime?: string; // HH:mm format
  reminderEnabled: boolean;
  goalMinutes?: number; // for timed habits
  notes?: string;
  lastCompletedAt?: string;
  isArchived?: boolean;
}

export interface HabitCompletion {
  habitId: string;
  date: string;
  completedAt: string;
  duration?: number; // minutes
  notes?: string;
  mood?: MoodType;
}

export interface HabitStats {
  totalHabits: number;
  completedToday: number;
  longestStreak: number;
  totalCompletions: number;
  weeklyProgress: number;
  monthlyProgress: number;
  completionRate: number; // percentage
  bestStreak: number;
  currentXP: number;
  level: number;
  lifeScore: number;
}

export interface HabitAnalytics {
  habitId: string;
  period: 'week' | 'month' | 'quarter' | 'year' | 'all';
  completionRate: number;
  averageStreak: number;
  missReasonBreakdown: Record<MissReason, number>;
  mostConsistentDays: number[];
  leastConsistentDays: number[];
  trend: 'improving' | 'declining' | 'stable';
  predictedSuccessRate: number;
  riskScore: number; // 0-100
}

export interface GamificationAchievement {
  id: string;
  type: AchievementType;
  habitId?: string;
  unlockedAt: string;
  title: string;
  description: string;
  icon: string;
}

export interface UserLevel {
  level: number;
  xp: number;
  xpNeeded: number; // XP needed for next level
  title: string;
  badge: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: MoodType;
  habits: {
    habitId: string;
    completed: boolean;
  }[];
  relatedGoals?: string[];
  createdAt: string;
  updatedAt?: string;
}

export interface HabitGoal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  relatedHabits: string[];
  milestones: {
    id: string;
    title: string;
    date: string;
    completed: boolean;
  }[];
  progress: number; // percentage
  status: 'active' | 'completed' | 'abandoned';
}

export interface HabitPrediction {
  habitId: string;
  probabilityOfSuccess: number; // 0-1
  riskFactors: string[];
  recommendations: string[];
  predictedBreakDate?: string;
}

export interface LifeScoreBreakdown {
  category: string;
  score: number;
  weight: number;
  habits: string[];
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  totalXP: number;
  level: number;
  lifeScore: number;
  joinedAt: string;
  habits: string[]; // habit IDs
  achievements: string[]; // achievement IDs
  following?: string[];
  followers?: string[];
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
  spiritual: { bg: 'bg-indigo-500/20', text: 'text-indigo-400', border: 'border-indigo-500/30' },
  study: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30' },
  reading: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
  coding: { bg: 'bg-lime-500/20', text: 'text-lime-400', border: 'border-lime-500/30' },
};

export const categoryIcons: Record<HabitCategory, string> = {
  health: '🍎',
  fitness: '💪',
  mindfulness: '🧘',
  productivity: '⚡',
  learning: '📚',
  social: '👥',
  spiritual: '🙏',
  study: '📖',
  reading: '📕',
  coding: '💻',
};

export const achievementBadges: Record<AchievementType, { title: string; description: string; icon: string; xpReward: number }> = {
  'streak-7': { title: 'Week Warrior', description: 'Completed a 7-day streak', icon: '🔥', xpReward: 50 },
  'streak-30': { title: 'Monthly Master', description: 'Completed a 30-day streak', icon: '🏆', xpReward: 200 },
  'streak-100': { title: 'Century Champion', description: 'Completed a 100-day streak', icon: '👑', xpReward: 500 },
  'first-habit': { title: 'First Step', description: 'Created your first habit', icon: '🎯', xpReward: 10 },
  'perfect-week': { title: 'Perfect Week', description: 'Completed all habits for a full week', icon: '⭐', xpReward: 100 },
  'milestone-master': { title: 'Milestone Master', description: 'Achieved a major goal milestone', icon: '🎖️', xpReward: 150 },
};
