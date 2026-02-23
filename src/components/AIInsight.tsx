import { Card } from "@/components/ui/card";
import { Brain, TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

interface AIInsightProps {
  type: "recommendation" | "insight" | "warning" | "opportunity";
  title: string;
  description: string;
  impact?: string;
}

export function AIInsight({ type, title, description, impact }: AIInsightProps) {
  const iconMap = {
    recommendation: <Lightbulb className="w-5 h-5" />,
    insight: <Brain className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    opportunity: <TrendingUp className="w-5 h-5" />,
  };

  const colorMap = {
    recommendation: { bg: "bg-accent/5", border: "border-accent/20", text: "text-accent" },
    insight: { bg: "bg-primary/5", border: "border-primary/20", text: "text-primary" },
    warning: { bg: "bg-destructive/5", border: "border-destructive/20", text: "text-destructive" },
    opportunity: { bg: "bg-success/5", border: "border-success/20", text: "text-success" },
  };

  const colors = colorMap[type];

  return (
    <Card className={`p-4 ${colors.bg} border-2 ${colors.border}`}>
      <div className="flex items-start gap-3">
        <div className={colors.text}>{iconMap[type]}</div>
        <div>
          <h3 className="font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          {impact && <p className="text-xs font-medium text-foreground mt-2">💡 {impact}</p>}
        </div>
      </div>
    </Card>
  );
}
