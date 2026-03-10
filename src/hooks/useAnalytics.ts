import { useState, useCallback } from 'react';
import { Habit, HabitAnalytics, MissReason } from '@/types/habit';
import { differenceInDays, startOfDay, parseISO, isBefore, isAfter, startOfWeek, endOfWeek } from 'date-fns';

export const useHabitAnalytics = () => {
  const calculateCompletionRate = (habit: Habit, days: number = 30): number => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const relevantDates = habit.completedDates.filter(
      date => new Date(date) >= cutoffDate
    );

    return Math.round((relevantDates.length / days) * 100);
  };

  const calculateTrend = (habit: Habit): 'improving' | 'declining' | 'stable' => {
    const last7Days = habit.completedDates.filter(date => {
      const d = new Date(date);
      const now = new Date();
      return differenceInDays(now, d) <= 7;
    }).length;

    const previous7Days = habit.completedDates.filter(date => {
      const d = new Date(date);
      const now = new Date();
      const diff = differenceInDays(now, d);
      return diff > 7 && diff <= 14;
    }).length;

    if (last7Days > previous7Days) return 'improving';
    if (last7Days < previous7Days) return 'declining';
    return 'stable';
  };

  const getMostConsistentDays = (habit: Habit): number[] => {
    const dayCount: Record<number, number> = {};

    habit.completedDates.forEach(date => {
      const day = new Date(date).getDay();
      dayCount[day] = (dayCount[day] || 0) + 1;
    });

    return Object.entries(dayCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([day]) => parseInt(day));
  };

  const predictSuccessRate = (habit: Habit): number => {
    const completionRate = calculateCompletionRate(habit);
    const consistency = habit.completedDates.length / differenceInDays(new Date(), parseISO(habit.createdAt));
    const streakBonus = Math.min(habit.streak / 30, 1); // Boost based on streak

    return Math.min(completionRate + streakBonus * 20) / 100;
  };

  const estimateRiskScore = (habit: Habit): number => {
    const successRate = predictSuccessRate(habit);
    const streakLength = habit.streak;
    const recentMisses = habit.missedDates.filter(date => {
      const d = new Date(date);
      const now = new Date();
      return differenceInDays(now, d) <= 7;
    }).length;

    let risk = 100 * (1 - successRate);
    risk -= Math.min(streakLength / 30, 10); // Good streaks reduce risk
    risk += recentMisses * 10; // Recent misses increase risk

    return Math.max(0, Math.min(100, risk));
  };

  return {
    calculateCompletionRate,
    calculateTrend,
    getMostConsistentDays,
    predictSuccessRate,
    estimateRiskScore,
  };
};

export const useGamification = () => {
  const calculateXPForCompletion = (habit: Habit): number => {
    const baseXP = 10;
    const streakBonus = Math.floor(habit.streak / 7) * 5; // 5 XP per 7 days
    return baseXP + streakBonus;
  };

  const calculateLevel = (totalXP: number): { level: number; xpInLevel: number; xpNeeded: number } => {
    const baseXPPerLevel = 100;
    let level = 1;
    let xpUsed = 0;

    while (xpUsed + baseXPPerLevel * level <= totalXP) {
      xpUsed += baseXPPerLevel * level;
      level++;
    }

    const xpInLevel = totalXP - xpUsed;
    const xpNeeded = baseXPPerLevel * level - xpInLevel;

    return { level, xpInLevel, xpNeeded };
  };

  const checkAchievements = (
    habit: Habit,
    currentXP: number,
    perfectWeeks: number,
    totalHabits: number
  ): string[] => {
    const achievements: string[] = [];

    if (habit.streak === 7) achievements.push('streak-7');
    if (habit.streak === 30) achievements.push('streak-30');
    if (habit.streak === 100) achievements.push('streak-100');
    if (totalHabits === 1) achievements.push('first-habit');
    if (perfectWeeks > 0) achievements.push('perfect-week');

    return achievements;
  };

  const getLevelTitle = (level: number): string => {
    const titles = [
      'Novice Tracker',
      'Habit Starter',
      'Consistency Builder',
      'Dedicated Practitioner',
      'Master of Habits',
      'Legendary Achiever',
    ];
    return titles[Math.min(level - 1, titles.length - 1)];
  };

  return {
    calculateXPForCompletion,
    calculateLevel,
    checkAchievements,
    getLevelTitle,
  };
};

export const useMistakeAnalysis = () => {
  const analyzeMissPatterns = (
    habit: Habit
  ): {
    topReasons: MissReason[];
    frequencyByDay: Record<number, number>;
    frequencyByWeek: Record<number, number>;
  } => {
    const reasonCounts: Record<MissReason, number> = {
      'lack-of-time': 0,
      laziness: 0,
      forgot: 0,
      'busy-schedule': 0,
      'low-motivation': 0,
      other: 0,
    };

    const dayFrequency: Record<number, number> = {};
    const weekFrequency: Record<number, number> = {};

    habit.missedDates.forEach(date => {
      const d = new Date(date);
      const day = d.getDay();
      const week = Math.floor((d.getDate() - 1) / 7);

      dayFrequency[day] = (dayFrequency[day] || 0) + 1;
      weekFrequency[week] = (weekFrequency[week] || 0) + 1;

      const reason = habit.missReasons?.[date];
      if (reason) reasonCounts[reason]++;
    });

    const topReasons = Object.entries(reasonCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([reason]) => reason as MissReason);

    return { topReasons, frequencyByDay: dayFrequency, frequencyByWeek: weekFrequency };
  };

  const getSuggestions = (
    habit: Habit,
    topReasons: MissReason[],
    mostMissedDays: number[]
  ): string[] => {
    const suggestions: string[] = [];

    if (topReasons.includes('lack-of-time')) {
      suggestions.push('Consider scheduling your habit at a less busy time or breaking it into smaller chunks.');
    }

    if (topReasons.includes('laziness')) {
      suggestions.push('Try gamifying the habit or pairing it with an activity you enjoy.');
    }

    if (topReasons.includes('forgot')) {
      suggestions.push('Enable reminder notifications and set a specific time for this habit.');
    }

    if (topReasons.includes('busy-schedule')) {
      suggestions.push('Adjust your habit schedule to fit around your busiest days.');
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (mostMissedDays.length > 0) {
      suggestions.push(`You miss this habit most on ${mostMissedDays.map(d => dayNames[d]).join(' and ')}. Plan ahead for these days.`);
    }

    return suggestions;
  };

  return { analyzeMissPatterns, getSuggestions };
};

export const useHeatmapData = () => {
  const generateHeatmapData = (habits: Habit[], period: 'month' | 'quarter' | 'year' = 'month') => {
    const now = new Date();
    const daysDuration = period === 'month' ? 30 : period === 'quarter' ? 90 : 365;
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - daysDuration);

    const data: Record<string, number> = {};

    habits.forEach(habit => {
      habit.completedDates.forEach(dateStr => {
        const date = new Date(dateStr);
        if (date >= startDate && date <= now) {
          const dateKey = dateStr.split('T')[0];
          data[dateKey] = (data[dateKey] || 0) + 1;
        }
      });
    });

    return data;
  };

  return { generateHeatmapData };
};

export default { useHabitAnalytics, useGamification, useMistakeAnalysis, useHeatmapData };
