import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Clock, Brain, AlertCircle } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function SmartNotifications() {
  const notifications = [
    {
      id: 1,
      type: "reminder",
      title: "Time for your Morning Run",
      message: "Your usual morning routine start time is 6:30 AM. Ready to build your streak?",
      timestamp: "Now",
      icon: "🏃",
      read: false,
    },
    {
      id: 2,
      type: "milestone",
      title: "Streak Milestone Reached!",
      message: "You've reached 7 consecutive days! Keep it going! 🎉",
      timestamp: "2 hours ago",
      icon: "🔥",
      read: true,
    },
    {
      id: 3,
      type: "insight",
      title: "AI Insight: Best Time to Exercise",
      message: "Your data shows you're 23% more likely to complete exercises at 7 AM",
      timestamp: "Yesterday",
      icon: "💡",
      read: true,
    },
    {
      id: 4,
      type: "reminder",
      title: "Don't Miss Your Evening Meditation",
      message: "You typically meditate around 8 PM. Your streak is 15 days!",
      timestamp: "Yesterday",
      icon: "🧘",
      read: true,
    },
  ];

  const notificationSettings = [
    {
      title: "Smart Time-Based Reminders",
      description: "Get reminders at your optimal times based on AI analysis",
      enabled: true,
      icon: "⏰",
    },
    {
      title: "Motivational Messages",
      description: "Receive personalized motivation messages",
      enabled: true,
      icon: "🎯",
    },
    {
      title: "Milestone Celebrations",
      description: "Get notified when you hit streaks and goals",
      enabled: true,
      icon: "🎉",
    },
    {
      title: "Friend Activity Updates",
      description: "See when friends complete habits and hit milestones",
      enabled: false,
      icon: "👥",
    },
    {
      title: "Weekly AI Insights",
      description: "Get weekly summaries and behavior analysis",
      enabled: true,
      icon: "📊",
    },
    {
      title: "Failed Habit Recovery",
      description: "Smart reminders if you miss a habit streak",
      enabled: true,
      icon: "🔔",
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Smart Notification System</h1>
          <p className="text-muted-foreground">AI-powered notifications sent at the right time for maximum effectiveness</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Notifications List */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Recent Notifications
              </h2>
              <Button variant="outline" size="sm">Mark all as read</Button>
            </div>

            {notifications.map((notif) => (
              <Card
                key={notif.id}
                className={`p-4 card-elevated cursor-pointer hover:shadow-card transition-all ${
                  !notif.read ? "border-primary/50 bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">{notif.icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-foreground ${!notif.read ? "font-bold text-primary" : ""}`}>
                      {notif.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-2">{notif.timestamp}</p>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Settings Sidebar */}
          <div>
            <Card className="p-6 card-elevated">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Smart Settings
              </h2>

              <div className="space-y-4">
                {notificationSettings.map((setting, idx) => (
                  <div key={idx} className="flex items-start gap-3 pb-4 border-b border-border last:border-0">
                    <Toggle
                      defaultPressed={setting.enabled}
                      className={setting.enabled ? "bg-primary" : "bg-muted"}
                      aria-label="Toggle notification"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <span>{setting.icon}</span>
                        {setting.title}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{setting.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button className="w-full btn-primary mt-6">Save Preferences</Button>
            </Card>

            {/* AI Notification Insights */}
            <Card className="p-6 card-elevated mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                AI Insights
              </h2>
              <div className="space-y-3 text-sm">
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="font-medium text-foreground">Best Time: Your success is highest at 7 AM reminders</p>
                </div>
                <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
                  <p className="font-medium text-foreground">Optimization: Limit to 3 notifications daily</p>
                </div>
                <div className="p-3 bg-success/5 rounded-lg border border-success/20">
                  <p className="font-medium text-foreground">Impact: +34% completion with smart reminders</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
