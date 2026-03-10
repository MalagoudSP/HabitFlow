import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { JournalEntry, MoodType, Habit } from '@/types/habit';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { Heart, BookOpen, Trash2 } from 'lucide-react';

interface JournalEntryComponentProps {
  entry: JournalEntry;
  habits: Habit[];
  onDelete?: (id: string) => void;
  onEdit?: (entry: JournalEntry) => void;
}

const moodEmojis: Record<MoodType, { emoji: string; color: string }> = {
  excellent: { emoji: '😄', color: 'text-yellow-500' },
  good: { emoji: '😊', color: 'text-green-500' },
  neutral: { emoji: '😐', color: 'text-gray-500' },
  bad: { emoji: '😔', color: 'text-orange-500' },
  terrible: { emoji: '😞', color: 'text-red-500' },
};

export const JournalEntryView: React.FC<JournalEntryComponentProps> = ({
  entry,
  habits,
  onDelete,
  onEdit,
}) => {
  const habitCount = entry.habits.filter(h => h.completed).length;
  const completionRate = (habitCount / entry.habits.length) * 100;
  const mood = moodEmojis[entry.mood];

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-3xl ${mood.color}`}>{mood.emoji}</span>
              <div>
                <CardTitle>{new Date(entry.date).toLocaleDateString()}</CardTitle>
                <CardDescription className="text-xs">
                  {formatDistanceToNow(parseISO(entry.createdAt), { addSuffix: true })}
                </CardDescription>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            {onEdit && (
              <Button variant="ghost" size="sm" onClick={() => onEdit(entry)}>
                Edit
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="sm" onClick={() => onDelete(entry.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{entry.content}</p>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
            <h4 className="text-sm font-semibold mb-2">Habits Today</h4>
            <div className="space-y-2">
              {entry.habits.map(habitTrack => {
                const habit = habits.find(h => h.id === habitTrack.habitId);
                return (
                  <div key={habitTrack.habitId} className="flex items-center gap-2 text-sm">
                    <span className={habitTrack.completed ? 'text-green-500' : 'text-gray-400'}>
                      {habitTrack.completed ? '✓' : '✗'}
                    </span>
                    <span>{habit?.name || 'Unknown'}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t text-xs text-gray-600 dark:text-gray-400">
              Completed: {habitCount} of {entry.habits.length} ({completionRate.toFixed(0)}%)
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface JournalEditorProps {
  date: string;
  habits: Habit[];
  onSave: (entry: Omit<JournalEntry, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  initialEntry?: JournalEntry;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({
  date,
  habits,
  onSave,
  onCancel,
  initialEntry,
}) => {
  const [content, setContent] = useState(initialEntry?.content || '');
  const [mood, setMood] = useState<MoodType>(initialEntry?.mood || 'neutral');
  const [habitStatus, setHabitStatus] = useState<Record<string, boolean>>(
    initialEntry
      ? Object.fromEntries(initialEntry.habits.map(h => [h.habitId, h.completed]))
      : Object.fromEntries(habits.map(h => [h.id, h.completedToday]))
  );

  const handleSave = () => {
    onSave({
      date,
      content,
      mood,
      habits: Object.entries(habitStatus).map(([habitId, completed]) => ({
        habitId,
        completed,
      })),
      ...(initialEntry?.relatedGoals && { relatedGoals: initialEntry.relatedGoals }),
      updatedAt: new Date().toISOString(),
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journal Entry - {new Date(date).toLocaleDateString()}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">How do you feel today?</label>
          <Select value={mood} onValueChange={(val) => setMood(val as MoodType)}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excellent">😄 Excellent</SelectItem>
              <SelectItem value="good">😊 Good</SelectItem>
              <SelectItem value="neutral">😐 Neutral</SelectItem>
              <SelectItem value="bad">😔 Bad</SelectItem>
              <SelectItem value="terrible">😞 Terrible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium">Reflection</label>
          <Textarea
            placeholder="What went well today? What habits did you complete? What will you improve tomorrow?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 min-h-[150px]"
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">Habit Completion</label>
          <div className="space-y-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
            {habits.map(habit => (
              <label key={habit.id} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={habitStatus[habit.id] || false}
                  onChange={(e) =>
                    setHabitStatus({
                      ...habitStatus,
                      [habit.id]: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded"
                />
                <span className="text-sm">{habit.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-2 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <BookOpen className="w-4 h-4 mr-2" />
            Save Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

interface MoodTrackerProps {
  entries: JournalEntry[];
  title?: string;
}

export const MoodTracker: React.FC<MoodTrackerProps> = ({ entries, title = 'Mood Trend' }) => {
  const moodScores: Record<MoodType, number> = {
    excellent: 5,
    good: 4,
    neutral: 3,
    bad: 2,
    terrible: 1,
  };

  const last7Days = entries.slice(-7);
  const moodDistribution = {
    excellent: 0,
    good: 0,
    neutral: 0,
    bad: 0,
    terrible: 0,
  };

  entries.forEach(entry => {
    moodDistribution[entry.mood]++;
  });

  const averageMood = (
    entries.reduce((sum, e) => sum + moodScores[e.mood], 0) / entries.length
  ).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Your emotional patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-5 gap-2 mb-4">
          {(Object.entries(moodEmojis) as [MoodType, any][]).map(([mood, { emoji }]) => (
            <div key={mood} className="text-center">
              <div className="text-2xl">{emoji}</div>
              <div className="text-xs text-gray-600 mt-1">{moodDistribution[mood]}</div>
            </div>
          ))}
        </div>

        <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">Average Mood</div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{averageMood}/5</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default { JournalEntryView, JournalEditor, MoodTracker };
