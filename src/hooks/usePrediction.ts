import { useMemo, useCallback } from 'react';
import { Habit, HabitCompletion, HabitPrediction } from '@/types/habit';
import { useHabitAnalytics } from './useAnalytics';
import { differenceInDays, parseISO, startOfDay, endOfDay } from 'date-fns';

export const useHabitPrediction = (habit: Habit) => {
  const { predictSuccessRate, estimateRiskScore } = useHabitAnalytics();

  const prediction = useMemo((): HabitPrediction => {
    const successRate = predictSuccessRate(habit);
    const riskScore = estimateRiskScore(habit);
    
    const riskFactors: string[] = [];
    const recommendations: string[] = [];

    // Analyze risk factors
    if (habit.streak === 0) {
      riskFactors.push('No active streak');
      recommendations.push('Focus on building a consistent routine');
    }

    if (habit.missedDates.length > 3) {
      riskFactors.push('Multiple recent misses');
      recommendations.push('Re-evaluate your habit schedule or goals');
    }

    if (successRate < 0.5) {
      riskFactors.push('Low completion rate');
      recommendations.push('Start with a smaller, more achievable version');
    }

    if (habit.completedDates.length === 0) {
      riskFactors.push('Never completed');
      recommendations.push('Begin with this habit today');
    }

    // Positive factors
    if (habit.streak > 7) {
      recommendations.push('Your streak momentum is strong - keep it up!');
    }

    if (successRate > 0.8) {
      recommendations.push('You\'re doing great - consider adding a new habit');
    }

    // Predict break date based on pattern
    let predictedBreakDate: string | undefined;
    if (habit.streak > 0 && habit.missedDates.length > 0) {
      const avgDaysBetweenMisses = habit.missedDates.length > 0
        ? differenceInDays(
            parseISO(habit.missedDates[habit.missedDates.length - 1]),
            parseISO(habit.missedDates[0])
          ) / habit.missedDates.length
        : 0;
      
      if (avgDaysBetweenMisses > 0) {
        const nextPredictedMiss = new Date();
        nextPredictedMiss.setDate(nextPredictedMiss.getDate() + Math.ceil(avgDaysBetweenMisses));
        predictedBreakDate = nextPredictedMiss.toISOString().split('T')[0];
      }
    }

    return {
      habitId: habit.id,
      probabilityOfSuccess: successRate,
      riskFactors,
      recommendations,
      predictedBreakDate,
    };
  }, [habit, predictSuccessRate, estimateRiskScore]);

  return prediction;
};

interface CompletionHistory {
  date: string;
  completed: boolean;
  timestamp: string;
}

export const useHabitHistory = (habit: Habit) => {
  const getCompletionHistory = useCallback(
    (days: number = 30): CompletionHistory[] => {
      const history: CompletionHistory[] = [];
      const today = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        history.push({
          date: dateStr,
          completed: habit.completedDates.includes(dateStr),
          timestamp: date.toISOString(),
        });
      }

      return history;
    },
    [habit]
  );

  const getStreak = useCallback(() => {
    let count = 0;
    const today = new Date();

    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      if (habit.completedDates.includes(dateStr)) {
        count++;
      } else if (i > 0) {
        // If today is not completed and we have a streak, break here
        break;
      }
    }

    return count;
  }, [habit]);

  const getConsistency = useCallback(
    (days: number = 30) => {
      const completed = habit.completedDates.filter(d => {
        const date = new Date(d);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return new Date(d) >= cutoff;
      }).length;

      return (completed / days) * 100;
    },
    [habit]
  );

  const getTrendingUp = useCallback(() => {
    const last7Days = habit.completedDates.filter(d => {
      const date = new Date(d);
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - 7);
      return date >= cutoff;
    }).length;

    const previous7Days = habit.completedDates.filter(d => {
      const date = new Date(d);
      const now = new Date();
      const diff = differenceInDays(now, date);
      return diff > 7 && diff <= 14;
    }).length;

    return last7Days > previous7Days;
  }, [habit]);

  return {
    getCompletionHistory,
    getStreak,
    getConsistency,
    getTrendingUp,
  };
};

export const useGoalProgress = (goal: { milestones: Array<{ completed: boolean }> }) => {
  const progress = useMemo(() => {
    const completed = goal.milestones.filter(m => m.completed).length;
    return (completed / goal.milestones.length) * 100;
  }, [goal]);

  return { progress };
};

export default {
  useHabitPrediction,
  useHabitHistory,
  useGoalProgress,
};
