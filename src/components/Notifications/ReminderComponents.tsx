import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Clock, Bell, Mail, MessageCircle } from 'lucide-react';

interface Reminder {
  id: string;
  habitId: string;
  time: string;
  type: 'push' | 'email' | 'in-app' | 'sms';
  enabled: boolean;
  beforeMinutes?: number; // reminder before habit time
}

interface ReminderSettingsProps {
  reminders: Reminder[];
  habitName: string;
  onAdd: (reminder: Omit<Reminder, 'id'>) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({
  reminders,
  habitName,
  onAdd,
  onDelete,
  onToggle,
}) => {
  const [time, setTime] = useState('09:00');
  const [type, setType] = useState<'push' | 'email' | 'in-app' | 'sms'>('push');
  const [beforeMinutes, setBeforeMinutes] = useState('15');

  const handleAdd = () => {
    onAdd({
      habitId: '', // will be set by parent
      time,
      type,
      enabled: true,
      beforeMinutes: parseInt(beforeMinutes),
    });
    setTime('09:00');
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'push':
        return <Bell className="w-4 h-4" />;
      case 'email':
        return <Mail className="w-4 h-4" />;
      case 'sms':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reminders - {habitName}</CardTitle>
        <CardDescription>Smart reminders for consistent habit tracking</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div>
            <Label htmlFor="reminder-time">Reminder Time</Label>
            <Input
              id="reminder-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="reminder-type">Notification Type</Label>
            <Select value={type} onValueChange={(val: any) => setType(val)}>
              <SelectTrigger id="reminder-type" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="push">Push Notification</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="in-app">In-App</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="before-minutes">Remind Before (minutes)</Label>
            <Input
              id="before-minutes"
              type="number"
              min="0"
              max="120"
              value={beforeMinutes}
              onChange={(e) => setBeforeMinutes(e.target.value)}
              className="mt-1"
            />
          </div>

          <Button onClick={handleAdd} className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Add Reminder
          </Button>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Active Reminders</h4>
          {reminders.length === 0 ? (
            <p className="text-sm text-gray-600 dark:text-gray-400">No reminders set yet</p>
          ) : (
            <div className="space-y-2">
              {reminders.map(reminder => (
                <div key={reminder.id} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={reminder.enabled}
                      onCheckedChange={(checked) => onToggle(reminder.id, checked)}
                    />
                    <div className="flex items-center gap-2">
                      {getReminderIcon(reminder.type)}
                      <div>
                        <div className="text-sm font-semibold">{reminder.time}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {reminder.beforeMinutes} min before
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline" className="capitalize text-xs">
                      {reminder.type}
                    </Badge>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(reminder.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface NotificationPreference {
  type: 'push' | 'email' | 'sms' | 'telegram';
  enabled: boolean;
  frequency: 'immediate' | 'daily-digest' | 'weekly-digest';
}

interface NotificationSettingsProps {
  preferences: NotificationPreference[];
  onUpdate: (prefs: NotificationPreference[]) => void;
}

export const NotificationSettings: React.FC<NotificationSettingsProps> = ({
  preferences,
  onUpdate,
}) => {
  const handleToggle = (type: string, enabled: boolean) => {
    const updated = preferences.map(p =>
      p.type as string === type ? { ...p, enabled } : p
    );
    onUpdate(updated);
  };

  const handleFrequencyChange = (type: string, frequency: string) => {
    const updated = preferences.map(p =>
      p.type as string === type ? { ...p, frequency: frequency as any } : p
    );
    onUpdate(updated);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <CardDescription>Control how you receive habit reminders and updates</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {preferences.map(pref => (
          <div key={pref.type} className="p-4 border rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-semibold capitalize">{pref.type}</label>
              <Switch
                checked={pref.enabled}
                onCheckedChange={(checked) => handleToggle(pref.type, checked)}
              />
            </div>

            {pref.enabled && (
              <div>
                <Label htmlFor={`freq-${pref.type}`}>Frequency</Label>
                <Select
                  value={pref.frequency}
                  onValueChange={(val) => handleFrequencyChange(pref.type, val)}
                >
                  <SelectTrigger id={`freq-${pref.type}`} className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="daily-digest">Daily Digest</SelectItem>
                    <SelectItem value="weekly-digest">Weekly Digest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

interface SmartReminderSuggestion {
  habitName: string;
  suggestedTime: string;
  reason: string;
  basedonHistory: boolean;
}

interface SmartReminderAnalysisProps {
  suggestions: SmartReminderSuggestion[];
  onApply: (suggestion: SmartReminderSuggestion) => void;
}

export const SmartReminderAnalysis: React.FC<SmartReminderAnalysisProps> = ({
  suggestions,
  onApply,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-500" />
          Smart Reminder Suggestions
        </CardTitle>
        <CardDescription>Based on your habit completion patterns</CardDescription>
      </CardHeader>
      <CardContent>
        {suggestions.length === 0 ? (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            More data needed to generate smart suggestions
          </p>
        ) : (
          <div className="space-y-3">
            {suggestions.map((suggestion, idx) => (
              <div
                key={idx}
                className="p-4 border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950 rounded-lg"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="font-semibold">{suggestion.habitName}</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      Suggested time: {suggestion.suggestedTime}
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ML-Powered
                  </Badge>
                </div>

                <p className="text-sm mb-3 text-gray-700 dark:text-gray-300">{suggestion.reason}</p>

                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onApply(suggestion)}
                  className="w-full"
                >
                  Apply Suggestion
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default {
  ReminderSettings,
  NotificationSettings,
  SmartReminderAnalysis,
};
