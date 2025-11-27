import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface WeeklyHeatmapProps {
  completedToday: number;
  totalHabits: number;
}

export function WeeklyHeatmap({ completedToday, totalHabits }: WeeklyHeatmapProps) {
  // Simulate weekly data (in a real app, this would come from habit data)
  const weekData = [
    { day: 'Mon', percentage: 80 },
    { day: 'Tue', percentage: 100 },
    { day: 'Wed', percentage: 60 },
    { day: 'Thu', percentage: 90 },
    { day: 'Fri', percentage: 70 },
    { day: 'Sat', percentage: 40 },
    { day: 'Sun', percentage: totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0 },
  ];

  const getIntensity = (percentage: number) => {
    if (percentage === 0) return 'bg-secondary';
    if (percentage < 40) return 'bg-primary/20';
    if (percentage < 70) return 'bg-primary/50';
    if (percentage < 100) return 'bg-primary/80';
    return 'bg-primary';
  };

  return (
    <div className="gradient-card border border-border/50 rounded-2xl p-5">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">This Week</h3>
      <div className="flex gap-2">
        {weekData.map((data, index) => (
          <motion.div
            key={data.day}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex-1 flex flex-col items-center gap-2"
          >
            <div
              className={cn(
                'w-full aspect-square rounded-lg transition-colors',
                getIntensity(data.percentage)
              )}
            />
            <span className="text-xs text-muted-foreground">{data.day}</span>
          </motion.div>
        ))}
      </div>
      <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted-foreground">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded bg-secondary" />
          <div className="w-3 h-3 rounded bg-primary/20" />
          <div className="w-3 h-3 rounded bg-primary/50" />
          <div className="w-3 h-3 rounded bg-primary/80" />
          <div className="w-3 h-3 rounded bg-primary" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
