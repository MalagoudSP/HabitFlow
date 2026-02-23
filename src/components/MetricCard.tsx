import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, Calendar, Users } from "lucide-react";

interface MetricCardProps {
  label: string;
  value: string | number;
  change?: string;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: "up" | "down" | "stable";
}

export function MetricCard({ label, value, change, icon, subtitle, trend }: MetricCardProps) {
  const trendColor = {
    up: "text-success",
    down: "text-destructive",
    stable: "text-muted-foreground",
  };

  return (
    <Card className="p-6 card-elevated">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground">{label}</h3>
        {icon && <div className="text-primary">{icon}</div>}
      </div>
      <div>
        <p className="text-3xl font-bold text-foreground mb-1">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {change && (
          <p className={`text-xs font-medium mt-2 ${trendColor[trend || "stable"]}`}>
            {trend === "up" && "↑ "}
            {trend === "down" && "↓ "}
            {change}
          </p>
        )}
      </div>
    </Card>
  );
}
