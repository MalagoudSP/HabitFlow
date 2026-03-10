import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { LifeScoreBreakdown } from '@/types/habit';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface LifeScoreDashboardProps {
  totalScore: number;
  breakdown: LifeScoreBreakdown[];
  trend?: 'improving' | 'declining' | 'stable';
  insight?: string;
}

export const LifeScoreDashboard: React.FC<LifeScoreDashboardProps> = ({
  totalScore,
  breakdown,
  trend = 'stable',
  insight,
}) => {
  const getTrendIcon = (t: string) => {
    switch (t) {
      case 'improving':
        return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'declining':
        return <TrendingDown className="w-5 h-5 text-red-500" />;
      default:
        return <Minus className="w-5 h-5 text-gray-500" />;
    }
  };

  const scoreColor = totalScore >= 80 ? 'text-green-600' : totalScore >= 60 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Life Discipline Score</span>
            {getTrendIcon(trend)}
          </CardTitle>
          <CardDescription>Your overall self-improvement progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className={`text-5xl font-bold ${scoreColor}`}>{totalScore}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">/100</div>
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Trend</div>
              <div className="text-lg font-semibold capitalize">{trend}</div>
            </div>
          </div>

          <Progress value={totalScore} className="h-4" />

          {insight && (
            <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-900 dark:text-blue-100">{insight}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
          <CardDescription>Score by life area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {breakdown.map(category => (
            <div key={category.category} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{category.category}</div>
                <div className="text-lg font-bold">{category.score}</div>
              </div>
              <Progress value={category.score} className="h-2" />
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {category.habits.length} habits ({Math.round(category.weight * 100)}% weight)
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

interface MistakeAnalysisProps {
  habitName: string;
  topReasons: string[];
  suggestions: string[];
  missedDays: number[];
  missCount: number;
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const MistakeAnalysis: React.FC<MistakeAnalysisProps> = ({
  habitName,
  topReasons,
  suggestions,
  missedDays,
  missCount,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Mistake Analysis</CardTitle>
        <CardDescription>{habitName}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
          <div className="text-sm text-red-900 dark:text-red-100 font-semibold">
            Missed {missCount} times
          </div>
        </div>

        {topReasons.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Top Reasons</h4>
            <div className="space-y-2">
              {topReasons.map((reason, idx) => (
                <Badge key={idx} variant="outline">
                  {reason}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {missedDays.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Most Missed Days</h4>
            <div className="flex gap-2 flex-wrap">
              {missedDays.map(day => (
                <Badge key={day} variant="secondary">
                  {dayNames[day]}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2">Improvement Tips</h4>
            <ul className="space-y-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-sm flex gap-2">
                  <span className="text-green-600 dark:text-green-400">→</span>
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface HabitPredictionProps {
  habitName: string;
  riskLevel: 'low' | 'medium' | 'high';
  probability: number;
  riskFactors: string[];
  recommendations: string[];
}

export const HabitPrediction: React.FC<HabitPredictionProps> = ({
  habitName,
  riskLevel,
  probability,
  riskFactors,
  recommendations,
}) => {
  const riskColor =
    riskLevel === 'high' ? 'text-red-600' : riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600';
  const bgColor =
    riskLevel === 'high'
      ? 'bg-red-50 dark:bg-red-950'
      : riskLevel === 'medium'
        ? 'bg-yellow-50 dark:bg-yellow-950'
        : 'bg-green-50 dark:bg-green-950';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{habitName}</CardTitle>
        <CardDescription>Habit success prediction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className={`p-4 rounded-lg ${bgColor}`}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-700 dark:text-gray-300">Risk Level</div>
              <div className={`text-2xl font-bold ${riskColor} capitalize`}>{riskLevel}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-700 dark:text-gray-300">Success Rate</div>
              <div className="text-2xl font-bold">{Math.round((1 - probability) * 100)}%</div>
            </div>
          </div>
        </div>

        {riskFactors.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-red-600">Risk Factors</h4>
            <ul className="space-y-1">
              {riskFactors.map((factor, idx) => (
                <li key={idx} className="text-sm flex gap-2">
                  <span className="text-red-500">⚠</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {recommendations.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 text-green-600">Recommendations</h4>
            <ul className="space-y-1">
              {recommendations.map((rec, idx) => (
                <li key={idx} className="text-sm flex gap-2">
                  <span className="text-green-500">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface GoalMilestoneProps {
  milestone: {
    title: string;
    date: string;
    completed: boolean;
  };
  goalProgress: number;
}

export const GoalMilestone: React.FC<GoalMilestoneProps> = ({ milestone, goalProgress }) => {
  return (
    <div
      className={`p-3 rounded-lg border-2 ${
        milestone.completed
          ? 'border-green-500 bg-green-50 dark:bg-green-950'
          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${
            milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          {milestone.completed ? '✓' : '○'}
        </div>
        <div className="flex-1">
          <div className={`font-semibold ${milestone.completed ? 'line-through' : ''}`}>
            {milestone.title}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Target: {new Date(milestone.date).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  );
};

interface GoalTrackerProps {
  goal: {
    title: string;
    description: string;
    targetDate: string;
    milestones: Array<{
      title: string;
      date: string;
      completed: boolean;
    }>;
    progress: number;
  };
}

export const GoalTracker: React.FC<GoalTrackerProps> = ({ goal }) => {
  const completedMilestones = goal.milestones.filter(m => m.completed).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{goal.title}</CardTitle>
        <CardDescription>{goal.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-bold">{goal.progress}%</span>
          </div>
          <Progress value={goal.progress} className="h-3" />
        </div>

        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm">
          Target Date: {new Date(goal.targetDate).toLocaleDateString()}
        </div>

        <div>
          <h4 className="font-semibold mb-3">Milestones</h4>
          <div className="space-y-2">
            {goal.milestones.map((milestone, idx) => (
              <GoalMilestone key={idx} milestone={milestone} goalProgress={goal.progress} />
            ))}
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400 mt-3">
            {completedMilestones} of {goal.milestones.length} completed
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default {
  LifeScoreDashboard,
  MistakeAnalysis,
  HabitPrediction,
  GoalMilestone,
  GoalTracker,
};
