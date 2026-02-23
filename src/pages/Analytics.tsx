import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, BarChart, PieChart, TrendingUp } from "lucide-react";

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Advanced Analytics Dashboard</h1>
          <p className="text-muted-foreground">AI-Powered insights into your habit patterns and progress</p>
        </div>

        {/* AI Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Card 1 */}
          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Habit Success Rate</h3>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary mb-2">87%</p>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </Card>

          {/* Card 2 */}
          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Current Streak</h3>
              <LineChart className="w-5 h-5 text-accent" />
            </div>
            <p className="text-3xl font-bold text-accent mb-2">42 Days</p>
            <p className="text-xs text-muted-foreground">Longest: 89 days</p>
          </Card>

          {/* Card 3 */}
          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">Total Completions</h3>
              <BarChart className="w-5 h-5 text-success" />
            </div>
            <p className="text-3xl font-bold text-success mb-2">324</p>
            <p className="text-xs text-muted-foreground">Across all habits</p>
          </Card>

          {/* Card 4 */}
          <Card className="p-6 card-elevated">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground">AI Score</h3>
              <PieChart className="w-5 h-5 text-primary" />
            </div>
            <p className="text-3xl font-bold text-primary mb-2">92</p>
            <p className="text-xs text-muted-foreground">/100 Overall Health</p>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 card-elevated">
            <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Pattern Analysis</h2>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <LineChart className="w-16 h-16 text-muted-foreground/30" />
            </div>
          </Card>

          <Card className="p-6 card-elevated">
            <h2 className="text-lg font-semibold text-foreground mb-4">Habit Distribution</h2>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <PieChart className="w-16 h-16 text-muted-foreground/30" />
            </div>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card className="p-6 card-elevated">
          <h2 className="text-lg font-semibold text-foreground mb-4">AI Recommendations</h2>
          <div className="space-y-3">
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-sm font-medium text-foreground">📊 Consistency Boost: Your afternoon habits have 23% better completion rate. Schedule more important habits then.</p>
            </div>
            <div className="p-3 bg-accent/5 rounded-lg border border-accent/20">
              <p className="text-sm font-medium text-foreground">🎯 Pattern Detected: You're more productive on weekends. Consider adding challenging habits to your weekend routine.</p>
            </div>
            <div className="p-3 bg-success/5 rounded-lg border border-success/20">
              <p className="text-sm font-medium text-foreground">✨ Keep Going: 7-day streak milestone is within reach. Just 2 more completions!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
