import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle } from "lucide-react";

interface MilestoneProps {
  milestones: Array<{
    name: string;
    description?: string;
    completed: boolean;
    date?: string;
  }>;
  vertical?: boolean;
}

export function MilestoneTracker({ milestones, vertical = false }: MilestoneProps) {
  if (vertical) {
    return (
      <div className="space-y-4">
        {milestones.map((milestone, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="mt-1">
              {milestone.completed ? (
                <div className="w-6 h-6 rounded-full bg-success flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-success-foreground" />
                </div>
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 pb-4 border-l-2 border-muted last:border-0 last:pb-0">
              <h4 className={`font-semibold ${milestone.completed ? "text-success line-through opacity-60" : "text-foreground"}`}>
                {milestone.name}
              </h4>
              {milestone.description && <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>}
              {milestone.date && <Badge variant="secondary" className="mt-2">{milestone.date}</Badge>}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-2 items-end">
      {milestones.map((milestone, idx) => (
        <div key={idx} className="flex-1 text-center">
          <div className={`rounded-lg p-3 mb-2 ${milestone.completed ? "bg-success/20" : "bg-muted/20"}`}>
            {milestone.completed ? (
              <CheckCircle className="w-5 h-5 mx-auto text-success" />
            ) : (
              <Circle className="w-5 h-5 mx-auto text-muted-foreground" />
            )}
          </div>
          <p className="text-xs font-medium text-foreground">{milestone.name}</p>
        </div>
      ))}
    </div>
  );
}
