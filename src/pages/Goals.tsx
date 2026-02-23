import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Link as LinkIcon, CheckCircle } from "lucide-react";

export default function Goals() {
  const goals = [
    {
      id: 1,
      title: "Get Fit in 90 Days",
      description: "Achieve fitness goals through consistent exercise habits",
      linkedHabits: ["Morning Run", "Evening Yoga", "Strength Training"],
      progress: 65,
      daysLeft: 28,
      milestones: [
        { name: "Week 4: 30% Goal", completed: true },
        { name: "Week 8: 60% Goal", completed: true },
        { name: "Week 12: Full Goal", completed: false },
      ],
    },
    {
      id: 2,
      title: "Read 12 Books",
      description: "Complete one book per month",
      linkedHabits: ["Daily Reading", "Book Discussion"],
      progress: 42,
      daysLeft: 60,
      milestones: [
        { name: "3 Books", completed: true },
        { name: "6 Books", completed: false },
        { name: "12 Books", completed: false },
      ],
    },
    {
      id: 3,
      title: "Mindfulness Mastery",
      description: "Build a strong meditation practice",
      linkedHabits: ["Morning Meditation", "Evening Reflection"],
      progress: 78,
      daysLeft: 15,
      milestones: [
        { name: "50 Days Streak", completed: true },
        { name: "100 Days Streak", completed: false },
        { name: "365 Days Streak", completed: false },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Goal Linking System</h1>
          <p className="text-muted-foreground">Connect habits to meaningful goals and track your progress</p>
        </div>

        {/* Goals Grid */}
        <div className="space-y-6">
          {goals.map((goal) => (
            <Card key={goal.id} className="p-6 card-elevated">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2 mb-2">
                    <Target className="w-6 h-6 text-primary" />
                    {goal.title}
                  </h2>
                  <p className="text-muted-foreground">{goal.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-primary">{goal.progress}%</div>
                  <div className="text-xs text-muted-foreground">{goal.daysLeft} days left</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                  <div
                    className="bg-gradient-primary h-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Linked Habits */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <LinkIcon className="w-4 h-4" />
                  Linked Habits
                </h3>
                <div className="flex flex-wrap gap-2">
                  {goal.linkedHabits.map((habit) => (
                    <div
                      key={habit}
                      className="px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                    >
                      {habit}
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Milestones
                </h3>
                <div className="space-y-2">
                  {goal.milestones.map((milestone, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          milestone.completed
                            ? "bg-success text-white"
                            : "border-2 border-muted bg-muted/20"
                        }`}
                      >
                        {milestone.completed && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <span
                        className={milestone.completed ? "text-success font-medium line-through opacity-60" : "text-foreground font-medium"}
                      >
                        {milestone.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="btn-primary flex-1">Edit Goal</Button>
                <Button variant="outline" className="flex-1">View Details</Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Add New Goal */}
        <div className="mt-8">
          <Card className="p-8 card-elevated border-2 border-dashed border-primary/30 text-center">
            <Target className="w-12 h-12 text-primary/30 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Create New Goal</h3>
            <p className="text-muted-foreground mb-4">Set meaningful goals and link them to your habits</p>
            <Button className="btn-primary">Create Goal</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
