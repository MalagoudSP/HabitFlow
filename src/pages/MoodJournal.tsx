import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Cloud, Sun, Moon, BookOpen } from "lucide-react";

export default function MoodJournal() {
  const moodEntries = [
    {
      date: "Today",
      mood: "excited",
      emoji: "🚀",
      entry: "Great day! Completed all habits and feeling productive.",
      habits: ["Morning Run", "Meditation", "Reading"],
    },
    {
      date: "Yesterday",
      mood: "happy",
      emoji: "😊",
      entry: "Good progress on the new habit. Feeling motivated.",
      habits: ["Morning Run", "Meditation"],
    },
    {
      date: "2 days ago",
      mood: "neutral",
      emoji: "😐",
      entry: "Average day. Missed one habit but kept the streak.",
      habits: ["Meditation"],
    },
  ];

  const moodStats = [
    { mood: "Excited", emoji: "🚀", percentage: 35, count: 24 },
    { mood: "Happy", emoji: "😊", percentage: 45, count: 31 },
    { mood: "Neutral", emoji: "😐", percentage: 15, count: 10 },
    { mood: "Stressed", emoji: "😰", percentage: 5, count: 3 },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Habit Journal & Mood Tracker</h1>
          <p className="text-muted-foreground">Track your mood and journal your journey</p>
        </div>

        {/* Mood Quick Select */}
        <Card className="p-6 card-elevated mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">How are you feeling today?</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { emoji: "😭", label: "Terrible" },
              { emoji: "😞", label: "Sad" },
              { emoji: "😐", label: "Okay" },
              { emoji: "😊", label: "Happy" },
              { emoji: "🚀", label: "Excited" },
            ].map((mood) => (
              <button
                key={mood.emoji}
                className="p-4 rounded-lg border-2 border-muted hover:border-primary hover:bg-primary/5 transition-all text-center"
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className="text-xs font-medium text-muted-foreground">{mood.label}</div>
              </button>
            ))}
          </div>
        </Card>

        {/* Mood Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 card-elevated">
            <h2 className="text-lg font-semibold text-foreground mb-4">Mood Distribution (Last 30 Days)</h2>
            <div className="space-y-4">
              {moodStats.map((stat) => (
                <div key={stat.mood}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">
                      {stat.emoji} {stat.mood} ({stat.count})
                    </span>
                    <span className="text-sm text-muted-foreground">{stat.percentage}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-primary h-full"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 card-elevated">
            <h2 className="text-lg font-semibold text-foreground mb-4">Mood vs Habit Completion</h2>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-foreground">📈 Strong Correlation: Better mood on days with 100% habit completion</p>
              </div>
              <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                <p className="text-sm font-medium text-foreground">💡 Insight: Morning exercise directly impacts mood positively</p>
              </div>
              <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                <p className="text-sm font-medium text-foreground">✨ Pattern: 85% happier mood after 3 consecutive days of habits</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Journal Entries */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Recent Entries
            </h2>
            <Button className="btn-primary">New Entry</Button>
          </div>

          <div className="space-y-4">
            {moodEntries.map((entry, idx) => (
              <Card key={idx} className="p-6 card-elevated hover:shadow-card transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{entry.emoji}</span>
                      <span className="font-bold text-foreground capitalize">{entry.mood.charAt(0).toUpperCase() + entry.mood.slice(1)}</span>
                      <span className="text-sm text-muted-foreground">{entry.date}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-foreground mb-4">{entry.entry}</p>

                <div className="flex flex-wrap gap-2">
                  {entry.habits.map((habit) => (
                    <div
                      key={habit}
                      className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                    >
                      ✓ {habit}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
