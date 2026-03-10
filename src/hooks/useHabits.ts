import { useState, useEffect, useCallback } from 'react';
import {
  Habit,
  HabitStats,
  HabitCategory,
  JournalEntry,
  HabitGoal,
  GamificationAchievement,
  MissReason,
  AchievementType,
} from '@/types/habit';
import { useAuth } from '@/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';
import { differenceInDays, parseISO } from 'date-fns';

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    category: 'mindfulness',
    icon: '🧘',
    streak: 12,
    bestStreak: 30,
    completedToday: false,
    completedDates: [],
    missedDates: [],
    createdAt: new Date().toISOString(),
    target: 7,
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '06:00',
  },
  {
    id: '2',
    name: 'Exercise 30 mins',
    category: 'fitness',
    icon: '🏃',
    streak: 5,
    bestStreak: 15,
    completedToday: true,
    completedDates: [new Date().toISOString().split('T')[0]],
    missedDates: [],
    createdAt: new Date().toISOString(),
    target: 5,
    frequency: 'weekly',
    reminderEnabled: true,
    reminderTime: '18:00',
  },
  {
    id: '3',
    name: 'Read 20 pages',
    category: 'learning',
    icon: '📖',
    streak: 8,
    bestStreak: 25,
    completedToday: false,
    completedDates: [],
    missedDates: [],
    createdAt: new Date().toISOString(),
    target: 7,
    frequency: 'daily',
    reminderEnabled: false,
  },
  {
    id: '4',
    name: 'Drink 8 glasses of water',
    category: 'health',
    icon: '💧',
    streak: 15,
    bestStreak: 60,
    completedToday: true,
    completedDates: [new Date().toISOString().split('T')[0]],
    missedDates: [],
    createdAt: new Date().toISOString(),
    target: 7,
    frequency: 'daily',
    reminderEnabled: true,
    reminderTime: '09:00',
  },
];

export function useHabits() {
  const { user } = useAuth();
  const storageKey = user ? `habitflow-habits-${user.id}` : 'habitflow-habits';
  const journalKey = user ? `habitflow-journal-${user.id}` : 'habitflow-journal';
  const goalsKey = user ? `habitflow-goals-${user.id}` : 'habitflow-goals';
  const achievementsKey = user ? `habitflow-achievements-${user.id}` : 'habitflow-achievements';
  const statsKey = user ? `habitflow-stats-${user.id}` : 'habitflow-stats';

  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultHabits;
    }
    return defaultHabits;
  });

  const [journals, setJournals] = useState<JournalEntry[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(journalKey);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [goals, setGoals] = useState<HabitGoal[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(goalsKey);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [achievements, setAchievements] = useState<GamificationAchievement[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(achievementsKey);
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  const [userStats, setUserStats] = useState<{
    totalXP: number;
    level: number;
    lifeScore: number;
  }>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(statsKey);
      return stored
        ? JSON.parse(stored)
        : { totalXP: 0, level: 1, lifeScore: 50 };
    }
    return { totalXP: 0, level: 1, lifeScore: 50 };
  });

  // Persist to storage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(habits));
  }, [habits, storageKey]);

  useEffect(() => {
    localStorage.setItem(journalKey, JSON.stringify(journals));
  }, [journals, journalKey]);

  useEffect(() => {
    localStorage.setItem(goalsKey, JSON.stringify(goals));
  }, [goals, goalsKey]);

  useEffect(() => {
    localStorage.setItem(achievementsKey, JSON.stringify(achievements));
  }, [achievements, achievementsKey]);

  useEffect(() => {
    localStorage.setItem(statsKey, JSON.stringify(userStats));
  }, [userStats, statsKey]);

  // Core habit operations
  const toggleHabit = useCallback(
    (id: string, missReason?: MissReason) => {
      const today = new Date().toISOString().split('T')[0];
      setHabits((prev) =>
        prev.map((habit) => {
          if (habit.id !== id) return habit;

          const isCompleting = !habit.completedToday;
          const completedDates = isCompleting
            ? [...habit.completedDates, today]
            : habit.completedDates.filter((d) => d !== today);

          const missedDates = !isCompleting
            ? [...habit.missedDates, today]
            : habit.missedDates.filter((d) => d !== today);

          const newStreak = isCompleting ? habit.streak + 1 : 0;
          const bestStreak = Math.max(habit.bestStreak, newStreak);

          const newMissReasons = { ...habit.missReasons } || {};
          if (missReason) {
            if (isCompleting) {
              delete newMissReasons[today];
            } else {
              newMissReasons[today] = missReason;
            }
          }

          // Award XP
          if (isCompleting) {
            const xpReward = 10 + Math.floor(newStreak / 7) * 5;
            setUserStats((prev) => ({
              ...prev,
              totalXP: prev.totalXP + xpReward,
            }));
          }

          return {
            ...habit,
            completedToday: isCompleting,
            completedDates,
            missedDates,
            streak: newStreak,
            bestStreak,
            missReasons: Object.keys(newMissReasons).length > 0 ? newMissReasons : undefined,
            lastCompletedAt: isCompleting ? new Date().toISOString() : habit.lastCompletedAt,
          };
        })
      );
    },
    []
  );

  const addHabit = useCallback(
    (
      name: string,
      category: HabitCategory,
      icon: string,
      target: number,
      frequency: string = 'daily'
    ) => {
      const newHabit: Habit = {
        id: uuidv4(),
        name,
        category,
        icon,
        streak: 0,
        bestStreak: 0,
        completedToday: false,
        completedDates: [],
        missedDates: [],
        createdAt: new Date().toISOString(),
        target,
        frequency: frequency as any,
        reminderEnabled: false,
      };
      setHabits((prev) => [...prev, newHabit]);

      // Award first habit achievement
      if (habits.length === 0) {
        const achievement: GamificationAchievement = {
          id: uuidv4(),
          type: 'first-habit',
          habitId: newHabit.id,
          unlockedAt: new Date().toISOString(),
          title: 'First Step',
          description: 'Created your first habit',
          icon: '🎯',
        };
        setAchievements((prev) => [...prev, achievement]);
        setUserStats((prev) => ({ ...prev, totalXP: prev.totalXP + 10 }));
      }
    },
    [habits.length]
  );

  const updateHabit = useCallback((id: string, updates: Partial<Habit>) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, ...updates } : h))
    );
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
    setGoals((prev) =>
      prev.map((g) => ({
        ...g,
        relatedHabits: g.relatedHabits.filter((hid) => hid !== id),
      }))
    );
  }, []);

  // Journal operations
  const addJournalEntry = useCallback((entry: Omit<JournalEntry, 'id' | 'createdAt'>) => {
    const newEntry: JournalEntry = {
      ...entry,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setJournals((prev) => [...prev, newEntry]);
  }, []);

  const updateJournalEntry = useCallback((id: string, updates: Partial<JournalEntry>) => {
    setJournals((prev) =>
      prev.map((j) =>
        j.id === id ? { ...j, ...updates, updatedAt: new Date().toISOString() } : j
      )
    );
  }, []);

  const deleteJournalEntry = useCallback((id: string) => {
    setJournals((prev) => prev.filter((j) => j.id !== id));
  }, []);

  // Goal operations
  const addGoal = useCallback((goal: Omit<HabitGoal, 'id'>) => {
    const newGoal: HabitGoal = { ...goal, id: uuidv4() };
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<HabitGoal>) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  }, []);

  // Achievement operations
  const unlockAchievement = useCallback((type: AchievementType, habitId?: string) => {
    if (!achievements.some((a) => a.type === type)) {
      const achievement: GamificationAchievement = {
        id: uuidv4(),
        type,
        habitId,
        unlockedAt: new Date().toISOString(),
        title: type,
        description: `Achieved ${type}`,
        icon: '🏆',
      };
      setAchievements((prev) => [...prev, achievement]);
    }
  }, [achievements]);

  // Statistics
  const getStats = useCallback((): HabitStats => {
    const completedToday = habits.filter((h) => h.completedToday).length;
    const longestStreak = Math.max(...habits.map((h) => h.streak), 0);
    const bestStreak = Math.max(...habits.map((h) => h.bestStreak), 0);
    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    const weeklyProgress =
      habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

    const monthStart = new Date();
    monthStart.setDate(1);
    const monthCompletions = habits.reduce(
      (acc, h) =>
        acc +
        h.completedDates.filter((d) => new Date(d) >= monthStart).length,
      0
    );
    const possibleCompletions = habits.length * Math.ceil(differenceInDays(new Date(), monthStart) + 1);
    const monthlyProgress = possibleCompletions > 0
      ? Math.round((monthCompletions / possibleCompletions) * 100)
      : 0;

    const completionRate =
      totalCompletions > 0
        ? Math.round(
            (completedToday / Math.max(...habits.map((h) => h.target), 1)) * 100
          )
        : 0;

    return {
      totalHabits: habits.length,
      completedToday,
      longestStreak,
      bestStreak,
      totalCompletions,
      weeklyProgress,
      monthlyProgress,
      completionRate,
      currentXP: userStats.totalXP,
      level: userStats.level,
      lifeScore: userStats.lifeScore,
    };
  }, [habits, userStats]);

  const getHabitById = useCallback((id: string) => habits.find((h) => h.id === id), [habits]);

  const getJournalEntriesForDate = useCallback(
    (date: string) => journals.filter((j) => j.date === date),
    [journals]
  );

  const getRecentJournalEntries = useCallback(
    (days: number = 7) => {
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - days);
      return journals.filter((j) => new Date(j.date) >= cutoff);
    },
    [journals]
  );

  return {
    // State
    habits,
    journals,
    goals,
    achievements,
    userStats,

    // Habit operations
    toggleHabit,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitById,

    // Journal operations
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    getJournalEntriesForDate,
    getRecentJournalEntries,

    // Goal operations
    addGoal,
    updateGoal,

    // Achievement operations
    unlockAchievement,

    // Statistics
    getStats,
  };
}

