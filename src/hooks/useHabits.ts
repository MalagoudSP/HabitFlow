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
import { habitAPI } from '@/services/api';
import { v4 as uuidv4 } from 'uuid';
import { differenceInDays } from 'date-fns';

export function useHabits() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [journals, setJournals] = useState<JournalEntry[]>([]);
  const [goals, setGoals] = useState<HabitGoal[]>([]);
  const [achievements, setAchievements] = useState<GamificationAchievement[]>([]);
  const [userStats, setUserStats] = useState<{
    totalXP: number;
    level: number;
    lifeScore: number;
  }>({ totalXP: 0, level: 1, lifeScore: 50 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setHabits([]);
      setIsLoading(false);
      return;
    }

    let cancelled = false;

    const loadHabits = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [habitsResponse, statsResponse] = await Promise.all([
          habitAPI.getHabits(),
          habitAPI.getUserStats(),
        ]);

        if (cancelled) return;

        setHabits(habitsResponse.data);
        setUserStats((prev) => ({ ...prev, ...statsResponse.data }));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load habits');
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadHabits();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const toggleHabit = useCallback(
    async (id: string, missReason?: MissReason) => {
      if (!user) return;
      try {
        const response = await habitAPI.completeHabit(id, { missReason });
        setHabits(response.data);
      } catch (err) {
        console.error('Failed to update habit completion', err);
      }
    },
    [user]
  );

  const addHabit = useCallback(
    async (
      name: string,
      category: HabitCategory,
      icon: string,
      target: number,
      frequency: string = 'daily'
    ) => {
      if (!user) return;

      try {
        const response = await habitAPI.createHabit({
          name,
          category,
          icon,
          target,
          frequency,
          reminderEnabled: false,
        });
        setHabits((prev) => [...prev, response.data]);
      } catch (err) {
        console.error('Failed to add habit', err);
      }
    },
    [user]
  );

  const updateHabit = useCallback(
    async (id: string, updates: Partial<Habit>) => {
      if (!user) return;

      try {
        const response = await habitAPI.updateHabit(id, updates);
        setHabits((prev) => prev.map((h) => (h.id === id ? response.data : h)));
      } catch (err) {
        console.error('Failed to update habit', err);
      }
    },
    [user]
  );

  const deleteHabit = useCallback(
    async (id: string) => {
      if (!user) return;

      try {
        await habitAPI.deleteHabit(id);
        setHabits((prev) => prev.filter((h) => h.id !== id));
      } catch (err) {
        console.error('Failed to delete habit', err);
      }
    },
    [user]
  );

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

  const addGoal = useCallback((goal: Omit<HabitGoal, 'id'>) => {
    const newGoal: HabitGoal = { ...goal, id: uuidv4() };
    setGoals((prev) => [...prev, newGoal]);
  }, []);

  const updateGoal = useCallback((id: string, updates: Partial<HabitGoal>) => {
    setGoals((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  }, []);

  const unlockAchievement = useCallback(
    (type: AchievementType, habitId?: string) => {
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
    },
    [achievements]
  );

  const getStats = useCallback((): HabitStats => {
    const completedToday = habits.filter((h) => h.completedToday).length;
    const longestStreak = Math.max(...habits.map((h) => h.streak), 0);
    const bestStreak = Math.max(...habits.map((h) => h.bestStreak), 0);
    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    const weeklyProgress = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

    const monthStart = new Date();
    monthStart.setDate(1);
    const monthCompletions = habits.reduce(
      (acc, h) => acc + h.completedDates.filter((d) => new Date(d) >= monthStart).length,
      0
    );
    const possibleCompletions = habits.length * Math.ceil(differenceInDays(new Date(), monthStart) + 1);
    const monthlyProgress = possibleCompletions > 0 ? Math.round((monthCompletions / possibleCompletions) * 100) : 0;

    const completionRate = totalCompletions > 0
      ? Math.round((completedToday / Math.max(...habits.map((h) => h.target), 1)) * 100)
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
    habits,
    journals,
    goals,
    achievements,
    userStats,
    isLoading,
    error,
    toggleHabit,
    addHabit,
    updateHabit,
    deleteHabit,
    getHabitById,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    getJournalEntriesForDate,
    getRecentJournalEntries,
    addGoal,
    updateGoal,
    unlockAchievement,
    getStats,
  };
}

