import { useState, useEffect } from 'react';
import { Habit, HabitStats, HabitCategory } from '@/types/habit';
import { useAuth } from '@/context/AuthContext';

const defaultHabits: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    category: 'mindfulness',
    icon: '🧘',
    streak: 12,
    completedToday: false,
    completedDates: [],
    createdAt: new Date().toISOString(),
    target: 7,
  },
  {
    id: '2',
    name: 'Exercise 30 mins',
    category: 'fitness',
    icon: '🏃',
    streak: 5,
    completedToday: true,
    completedDates: [new Date().toISOString().split('T')[0]],
    createdAt: new Date().toISOString(),
    target: 5,
  },
  {
    id: '3',
    name: 'Read 20 pages',
    category: 'learning',
    icon: '📖',
    streak: 8,
    completedToday: false,
    completedDates: [],
    createdAt: new Date().toISOString(),
    target: 7,
  },
  {
    id: '4',
    name: 'Drink 8 glasses of water',
    category: 'health',
    icon: '💧',
    streak: 15,
    completedToday: true,
    completedDates: [new Date().toISOString().split('T')[0]],
    createdAt: new Date().toISOString(),
    target: 7,
  },
  {
    id: '5',
    name: 'No social media for 2hrs',
    category: 'productivity',
    icon: '📵',
    streak: 3,
    completedToday: false,
    completedDates: [],
    createdAt: new Date().toISOString(),
    target: 7,
  },
];

export function useHabits() {
  const { user } = useAuth();
  const storageKey = user ? `habitflow-habits-${user.id}` : 'habitflow-habits';

  const [habits, setHabits] = useState<Habit[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultHabits;
    }
    return defaultHabits;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(habits));
  }, [habits, storageKey]);

  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits((prev) =>
      prev.map((habit) => {
        if (habit.id !== id) return habit;
        
        const isCompleting = !habit.completedToday;
        const completedDates = isCompleting
          ? [...habit.completedDates, today]
          : habit.completedDates.filter((d) => d !== today);
        
        return {
          ...habit,
          completedToday: isCompleting,
          completedDates,
          streak: isCompleting ? habit.streak + 1 : Math.max(0, habit.streak - 1),
        };
      })
    );
  };

  const addHabit = (name: string, category: HabitCategory, icon: string, target: number) => {
    const newHabit: Habit = {
      id: Date.now().toString(),
      name,
      category,
      icon,
      streak: 0,
      completedToday: false,
      completedDates: [],
      createdAt: new Date().toISOString(),
      target,
    };
    setHabits((prev) => [...prev, newHabit]);
  };

  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((h) => h.id !== id));
  };

  const getStats = (): HabitStats => {
    const completedToday = habits.filter((h) => h.completedToday).length;
    const longestStreak = Math.max(...habits.map((h) => h.streak), 0);
    const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
    const weeklyProgress = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;

    return {
      totalHabits: habits.length,
      completedToday,
      longestStreak,
      totalCompletions,
      weeklyProgress,
    };
  };

  return { habits, toggleHabit, addHabit, deleteHabit, getStats };
}

