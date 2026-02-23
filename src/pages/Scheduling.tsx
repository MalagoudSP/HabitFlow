import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Repeat, Bell, Calendar, TrendingUp } from "lucide-react";

export default function AdvancedScheduling() {
  const schedules = [
    {
      id: 1,
      name: "Morning Routine",
      habits: ["Morning Run", "Meditation", "Journaling"],
      time: "6:30 AM",
      frequency: "Daily",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      reminder: true,
      flexibility: "Flexible (±30 min)",
    },
    {
      id: 2,
      name: "Evening Wind-down",
      habits: ["Reading", "Reflection"],
      time: "8:00 PM",
      frequency: "Daily",
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      reminder: true,
      flexibility: "Strict (exact time)",
    },
    {
      id: 3,
      name: "Fitness Track",
      habits: ["Strength Training", "Cardio"],
      time: "7:00 PM",
      frequency: "Weekly",
      days: ["Mon", "Wed", "Fri"],
      reminder: true,
      flexibility: "Flexible (±1 hour)",
    },
  ];

  const aiRecommendations = [
    {
      icon: "📊",
      title: "Optimal Scheduling",
      description: "Based on your completion history, move workouts to 7 AM for +28% success rate",
    },
    {
      icon: "⚡",
      title: "Energy Analysis",
      description: "You have highest energy on weekdays. Add challenging habits on those days",
    },
    {
      icon: "🔄",
      title: "Spacing Optimization",
      description: "Your habits are perfectly spaced. Maintain 2-3 hour gaps between activities",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Advanced Habit Scheduling</h1>
          <p className="text-muted-foreground">AI-optimized schedules for maximum productivity and consistency</p>
        </div>

        {/* AI Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {aiRecommendations.map((rec, idx) => (
            <Card key={idx} className="p-4 card-elevated">
              <div className="text-3xl mb-2">{rec.icon}</div>
              <h3 className="font-semibold text-foreground mb-1">{rec.title}</h3>
              <p className="text-sm text-muted-foreground">{rec.description}</p>
            </Card>
          ))}
        </div>

        {/* Schedules */}
        <div className="space-y-6">
          {schedules.map((schedule) => (
            <Card key={schedule.id} className="p-6 card-elevated">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{schedule.name}</h2>
                  <p className="text-muted-foreground">{schedule.frequency}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-foreground font-semibold mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                    {schedule.time}
                  </div>
                  <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    {schedule.flexibility}
                  </div>
                </div>
              </div>

              {/* Habits in this schedule */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Linked Habits</h3>
                <div className="flex flex-wrap gap-2">
                  {schedule.habits.map((habit) => (
                    <div key={habit} className="px-3 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium">
                      {habit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Days */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Active Days</h3>
                <div className="flex gap-2">
                  {schedule.days.map((day) => (
                    <div
                      key={day}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                        schedule.days.includes(day)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>

              {/* Reminder Status */}
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Reminders {schedule.reminder ? "Enabled" : "Disabled"}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Edit</Button>
                  <Button className="btn-primary">View Calendar</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Smart Scheduler Suggestion */}
        <Card className="p-8 card-elevated mt-8 bg-primary/5 border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="text-4xl">✨</div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-foreground mb-2">AI-Powered Smart Scheduler</h2>
              <p className="text-foreground mb-4">
                Let our AI create an optimal schedule based on your habits, energy levels, and success patterns.
              </p>
              <Button className="btn-primary">Generate Optimal Schedule</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
