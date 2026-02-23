import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, TrendingUp, Calendar, Users, Brain } from "lucide-react";

export default function DeepAnalytics() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Deep Habit Analytics</h1>
          <p className="text-muted-foreground">Advanced insights, patterns, and predictive analysis</p>
        </div>

        {/* Time Period Selector */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["7 days", "30 days", "90 days", "1 year", "All time"].map((period) => (
            <Button
              key={period}
              variant={period === "30 days" ? "default" : "outline"}
              className={period === "30 days" ? "btn-primary" : ""}
            >
              {period}
            </Button>
          ))}
        </div>

        {/* Core Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Completion Rate</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">87.3%</p>
            <p className="text-xs text-muted-foreground mt-2">+5.2% from last period</p>
          </Card>

          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Average Streak</h3>
              <Calendar className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-accent">24.5 days</p>
            <p className="text-xs text-muted-foreground mt-2">Best: 89 days</p>
          </Card>

          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">Total Sessions</h3>
              <BarChart className="w-5 h-5 text-success" />
            </div>
            <p className="text-3xl font-bold text-success">892</p>
            <p className="text-xs text-muted-foreground mt-2">Across 12 habits</p>
          </Card>

          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-muted-foreground">AI Score</h3>
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary">92.4</p>
            <p className="text-xs text-muted-foreground mt-2">/100 Health Score</p>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Habit Comparison */}
          <Card className="p-6 card-elevated">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Habit Performance Comparison
            </h2>
            <div className="space-y-4">
              {[
                { name: "Morning Run", rate: 95, color: "primary" },
                { name: "Meditation", rate: 88, color: "accent" },
                { name: "Reading", rate: 82, color: "success" },
                { name: "Journaling", rate: 76, color: "primary" },
                { name: "Strength Training", rate: 71, color: "accent" },
              ].map((habit) => (
                <div key={habit.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-foreground">{habit.name}</span>
                    <span className="font-bold text-foreground">{habit.rate}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <div
                      className={`bg-${habit.color} h-full`}
                      style={{
                        width: `${habit.rate}%`,
                        backgroundColor: habit.color === "primary" ? "hsl(217 91% 40%)" : 
                                       habit.color === "accent" ? "hsl(217 91% 50%)" : "hsl(142 76% 46%)"
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Time Pattern Analysis */}
          <Card className="p-6 card-elevated">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <LineChart className="w-5 h-5" />
              Best Time Patterns
            </h2>
            <div className="space-y-4">
              {[
                { time: "Morning (6-9 AM)", successRate: 92, habits: 8 },
                { time: "Afternoon (12-3 PM)", successRate: 78, habits: 4 },
                { time: "Evening (6-9 PM)", successRate: 85, habits: 7 },
                { time: "Night (9-12 PM)", successRate: 72, habits: 3 },
              ].map((period) => (
                <div key={period.time} className="p-3 rounded-lg bg-muted/20 border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">{period.time}</p>
                      <p className="text-xs text-muted-foreground">{period.habits} habits scheduled</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{period.successRate}%</p>
                      <p className="text-xs text-muted-foreground">success rate</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Predictive Analysis */}
        <Card className="p-6 card-elevated mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Predictive Analysis
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm text-muted-foreground mb-2">30-Day Success Prediction</p>
              <p className="text-2xl font-bold text-primary">91%</p>
              <p className="text-xs text-muted-foreground mt-2">Based on current patterns</p>
            </div>

            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm text-muted-foreground mb-2">Risk Habits (Next 7 Days)</p>
              <p className="text-2xl font-bold text-accent">2</p>
              <p className="text-xs text-muted-foreground mt-2">Strength Training, Reading</p>
            </div>

            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <p className="text-sm text-muted-foreground mb-2">Next Milestone</p>
              <p className="text-2xl font-bold text-success">100 Days</p>
              <p className="text-xs text-muted-foreground mt-2">21 days away</p>
            </div>
          </div>
        </Card>

        {/* Recommendations */}
        <Card className="p-6 card-elevated">
          <h2 className="text-lg font-semibold text-foreground mb-4">AI Recommendations</h2>
          <div className="space-y-3">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium text-foreground">🎯 Optimization: Add 1-2 challenges to your routine to maintain engagement</p>
            </div>
            <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
              <p className="text-sm font-medium text-foreground">📊 Pattern: Your evening habits have increased 34% in the past week - keep it up!</p>
            </div>
            <div className="p-4 rounded-lg bg-success/5 border border-success/20">
              <p className="text-sm font-medium text-foreground">✨ Strategy: Link your weakest habit (Reading) with your strongest (Morning Run) for better compliance</p>
            </div>
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-sm font-medium text-foreground">💡 Insight: You're 23% more likely to complete tasks on Mondays - use this for important goals</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
