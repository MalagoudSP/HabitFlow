import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserProfile, Habit } from '@/types/habit';
import { Share2, Plus, UserCheck, Mail } from 'lucide-react';

interface UserProfileCardProps {
  user: UserProfile;
  isCurrentUser?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
  following?: boolean;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({
  user,
  isCurrentUser,
  onFollow,
  onMessage,
  following,
}) => {
  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getInitials(user.username)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-bold">{user.username}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.bio}</p>
              <div className="flex gap-2 mt-2">
                <Badge variant="outline">Level {user.level}</Badge>
                <Badge variant="outline">{user.totalXP.toLocaleString()} XP</Badge>
              </div>
            </div>
          </div>

          {!isCurrentUser && (
            <div className="flex gap-2">
              {onFollow && (
                <Button
                  size="sm"
                  variant={following ? 'outline' : 'default'}
                  onClick={onFollow}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {following ? 'Following' : 'Follow'}
                </Button>
              )}
              {onMessage && (
                <Button size="sm" variant="outline" onClick={onMessage}>
                  <Mail className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold">{user.habits.length}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Habits</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{user.followers?.length || 0}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{user.following?.length || 0}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Following</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface ActivityFeedItem {
  id: string;
  type: 'streak' | 'achievement' | 'goal' | 'milestone';
  user: {
    username: string;
    avatar?: string;
  };
  title: string;
  description: string;
  timestamp: string;
  icon: string;
}

interface ActivityFeedProps {
  items: ActivityFeedItem[];
  title?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ items, title = 'Community Activity' }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex gap-3 pb-3 border-b last:border-b-0">
              <div className="flex-shrink-0">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={item.user.avatar} />
                  <AvatarFallback>{item.user.username[0]}</AvatarFallback>
                </Avatar>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold">{item.user.username}</span>
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">{item.title}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{item.description}</p>
                <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface ShareableContentProps {
  type: 'streak' | 'achievement' | 'goal';
  title: string;
  description: string;
  value?: string;
  icon?: string;
  onShare: (platform: 'twitter' | 'facebook' | 'copy') => void;
}

export const ShareableContent: React.FC<ShareableContentProps> = ({
  type,
  title,
  description,
  value,
  icon,
  onShare,
}) => {
  const shareText = `${title}! ${description} #HabitFlow #Productivity`;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon && <span className="text-2xl">{icon}</span>}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
          {value && <div className="text-3xl font-bold mb-2">{value}</div>}
          <p className="text-sm text-gray-700 dark:text-gray-300">{description}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare('twitter')}
            className="w-full"
          >
            X
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare('facebook')}
            className="w-full"
          >
            FB
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onShare('copy')}
            className="w-full"
          >
            Copy
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface FriendFeedProps {
  friends: {
    id: string;
    username: string;
    status: string;
    currentStreak: number;
    avatar?: string;
  }[];
  title?: string;
}

export const FriendFeed: React.FC<FriendFeedProps> = ({ friends, title = 'Friends' }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{friends.length} active friends</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {friends.map(friend => (
            <div
              key={friend.id}
              className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={friend.avatar} />
                <AvatarFallback>{friend.username[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">{friend.username}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{friend.status}</div>
              </div>
              <Badge variant="secondary" className="text-xs">
                🔥 {friend.currentStreak}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface ChallengeProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  duration: string;
  participants: number;
  joined: boolean;
  onJoin: () => void;
}

export const HabitChallenge: React.FC<ChallengeProps> = ({
  id,
  title,
  description,
  icon,
  duration,
  participants,
  joined,
  onJoin,
}) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <h3 className="font-bold">{title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant={joined ? 'secondary' : 'default'}
            onClick={onJoin}
          >
            {joined ? <UserCheck className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {joined ? 'Joined' : 'Join'}
          </Button>
        </div>

        <div className="flex justify-between items-center pt-3 border-t text-sm text-gray-600 dark:text-gray-400">
          <span>⏱ {duration}</span>
          <span>👥 {participants} joined</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default {
  UserProfileCard,
  ActivityFeed,
  ShareableContent,
  FriendFeed,
  HabitChallenge,
};
