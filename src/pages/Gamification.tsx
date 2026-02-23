import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Trophy, Star, Zap } from "lucide-react";

export default function Gamification() {
  const badges = [
    { name: "Early Bird", icon: "🌅", unlocked: true, date: "Jan 15, 2024" },
    { name: "Week Warrior", icon: "⚔️", unlocked: true, date: "Jan 22, 2024" },
    { name: "Month Master", icon: "👑", unlocked: false, progress: 65 },
    { name: "Century Club", icon: "💯", unlocked: false, progress: 42 },
    { name: "Consistency King", icon: "🔥", unlocked: true, date: "Feb 1, 2024" },
    { name: "Goal Crusher", icon: "🚀", unlocked: false, progress: 75 },
  ];

  const levels = [
    { level: 1, name: "Beginner", xp: 0, current: true },
    { level: 2, name: "Intermediate", xp: 500, current: false },
    { level: 3, name: "Advanced", xp: 1500, current: false },
    { level: 4, name: "Expert", xp: 3500, current: false },
    { level: 5, name: "Master", xp: 7000, current: false },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Gamification System</h1>
          <p className="text-muted-foreground">Track achievements and level up your habit-building journey</p>
        </div>

        {/* Level Progress */}
        <Card className="p-6 card-elevated mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Your Level
            </h2>
            <Badge variant="secondary">Level 1: Beginner</Badge>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">XP Progress</span>
              <span className="font-medium text-foreground">245 / 500</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-primary h-full" style={{ width: "49%" }}></div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {levels.map((lv) => (
              <div key={lv.level} className={`text-center p-2 rounded-lg ${lv.current ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                <div className="font-bold">{lv.level}</div>
                <div className="text-xs">{lv.name}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Badges Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-6 h-6 text-primary" />
            Badges & Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge, idx) => (
              <Card key={idx} className={`p-6 card-elevated border-2 ${badge.unlocked ? 'border-primary/30 bg-primary/5' : 'border-muted opacity-60'}`}>
                <div className="text-center">
                  <div className="text-5xl mb-2">{badge.icon}</div>
                  <h3 className="font-bold text-foreground mb-1">{badge.name}</h3>
                  {badge.unlocked ? (
                    <p className="text-xs text-muted-foreground">Unlocked on {badge.date}</p>
                  ) : (
                    <div>
                      <div className="w-full bg-muted rounded-full h-2 my-2 overflow-hidden">
                        <div className="bg-primary h-full" style={{ width: `${badge.progress}%` }}></div>
                      </div>
                      <p className="text-xs text-muted-foreground">{badge.progress}% progress</p>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard Preview */}
        <Card className="p-6 card-elevated">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            Weekly Leaderboard
          </h2>
          <div className="space-y-3">
            {[
              { rank: 1, name: "You", xp: 450, streak: 42 },
              { rank: 2, name: "Alex Johnson", xp: 428, streak: 38 },
              { rank: 3, name: "Sarah Chen", xp: 412, streak: 35 },
              { rank: 4, name: "Michael Brown", xp: 398, streak: 31 },
              { rank: 5, name: "Emma Davis", xp: 375, streak: 28 },
            ].map((row) => (
              <div key={row.rank} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {row.rank}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{row.name}</p>
                    <p className="text-xs text-muted-foreground">{row.streak} day streak</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-primary">{row.xp} XP</div>
                  <div className="text-xs text-muted-foreground">this week</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
