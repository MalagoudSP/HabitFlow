import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { GamificationAchievement, AchievementType, achievementBadges } from '@/types/habit';
import { Trophy, Zap, Star, Medal } from 'lucide-react';

interface XPProgressProps {
  currentXP: number;
  xpNeeded: number;
  level: number;
  levelTitle: string;
  nextMilestone?: number;
}

export const XPProgress: React.FC<XPProgressProps> = ({
  currentXP,
  xpNeeded,
  level,
  levelTitle,
  nextMilestone,
}) => {
  const progressPercentage = (currentXP / (currentXP + xpNeeded)) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          Experience Points
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div>
              <div className="text-3xl font-bold">{level}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{levelTitle}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{currentXP.toLocaleString()}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {xpNeeded} to next level
              </div>
            </div>
          </div>
          <Progress value={progressPercentage} className="h-3" />
        </div>

        {nextMilestone && (
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg text-sm">
            <div className="text-gray-700 dark:text-gray-300">
              Next milestone at {nextMilestone.toLocaleString()} XP
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface AchievementBadgeProps {
  achievement: GamificationAchievement;
  locked?: boolean;
}

export const AchievementBadge: React.FC<AchievementBadgeProps> = ({ achievement, locked }) => {
  const badgeInfo = achievementBadges[achievement.type];

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`text-4xl p-4 rounded-lg flex items-center justify-center ${
          locked
            ? 'bg-gray-200 dark:bg-gray-700 opacity-50'
            : 'bg-yellow-100 dark:bg-yellow-900'
        }`}
      >
        {badgeInfo.icon}
      </div>
      <div className="text-center">
        <div className="font-semibold text-sm">{badgeInfo.title}</div>
        <div className="text-xs text-gray-600 dark:text-gray-400">
          {badgeInfo.xpReward} XP
        </div>
        {!locked && (
          <div className="text-xs text-green-600 dark:text-green-400 mt-1">
            Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

interface AchievementsDisplayProps {
  achievements: GamificationAchievement[];
  allTypes: AchievementType[];
  title?: string;
}

export const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({
  achievements,
  allTypes,
  title = 'Achievements',
}) => {
  const achievedTypes = new Set(achievements.map(a => a.type));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {title}
        </CardTitle>
        <CardDescription>
          {achievements.length} of {allTypes.length} achieved
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
          {achievements.map(achievement => (
            <AchievementBadge key={achievement.id} achievement={achievement} />
          ))}

          {Array.from(allTypes)
            .filter(type => !achievedTypes.has(type))
            .slice(0, 3)
            .map((type, idx) => (
              <div key={`locked-${idx}`} className="flex flex-col items-center gap-2">
                <div className="text-4xl p-4 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-gray-700 opacity-50">
                  {achievementBadges[type].icon}
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm blur-sm">
                    {achievementBadges[type].title}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {achievementBadges[type].xpReward} XP
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface LeaderboardProps {
  entries: Array<{
    rank: number;
    username: string;
    xp: number;
    level: number;
    streak: number;
  }>;
  currentUserRank?: number;
  title?: string;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({
  entries,
  currentUserRank,
  title = 'Leaderboard',
}) => {
  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Medal className="w-5 h-5" />
          {title}
        </CardTitle>
        {currentUserRank && (
          <CardDescription>You're ranked #{currentUserRank}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {entries.map((entry, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-lg ${
                idx === currentUserRank ? 'bg-blue-50 dark:bg-blue-950' : 'bg-gray-50 dark:bg-gray-800'
              }`}
            >
              <div className="w-8 text-center font-bold">
                {getMedalIcon(entry.rank) || `#${entry.rank}`}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{entry.username}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  Level {entry.level} • {entry.streak} day streak
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-yellow-600 dark:text-yellow-400">
                  {entry.xp.toLocaleString()} XP
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface DailyQuestProps {
  quests: Array<{
    id: string;
    title: string;
    description: string;
    reward: number;
    completed: boolean;
    icon: string;
  }>;
  title?: string;
}

export const DailyQuests: React.FC<DailyQuestProps> = ({ quests, title = 'Daily Quests' }) => {
  const completedCount = quests.filter(q => q.completed).length;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {completedCount} of {quests.length} completed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {quests.map(quest => (
            <div
              key={quest.id}
              className={`flex items-start gap-3 p-3 rounded-lg border ${
                quest.completed
                  ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                  : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="text-2xl">{quest.icon}</div>
              <div className="flex-1">
                <div className={`font-semibold ${quest.completed ? 'line-through' : ''}`}>
                  {quest.title}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {quest.description}
                </div>
              </div>
              <Badge variant={quest.completed ? 'secondary' : 'default'}>
                +{quest.reward} XP
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default {
  XPProgress,
  AchievementBadge,
  AchievementsDisplay,
  Leaderboard,
  DailyQuests,
};
