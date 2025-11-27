import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface StreakBadgeProps {
  streak: number;
  size?: 'sm' | 'md' | 'lg';
}

export function StreakBadge({ streak, size = 'md' }: StreakBadgeProps) {
  const sizeClasses = {
    sm: 'text-xs gap-0.5 px-1.5 py-0.5',
    md: 'text-sm gap-1 px-2 py-1',
    lg: 'text-base gap-1.5 px-3 py-1.5',
  };

  const iconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
  };

  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className={`inline-flex items-center rounded-full gradient-streak text-accent-foreground font-semibold shadow-streak ${sizeClasses[size]}`}
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
      >
        <Flame size={iconSizes[size]} className="fill-current" />
      </motion.div>
      <span>{streak}</span>
    </motion.div>
  );
}
