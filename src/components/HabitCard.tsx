import { motion, AnimatePresence } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { Habit, categoryColors } from '@/types/habit';
import { StreakBadge } from './StreakBadge';
import { cn } from '@/lib/utils';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function HabitCard({ habit, onToggle, onDelete }: HabitCardProps) {
  const colors = categoryColors[habit.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      className={cn(
        'group relative p-5 rounded-2xl gradient-card border border-border/50 shadow-card',
        'transition-all duration-300 hover:border-primary/30 hover:shadow-glow'
      )}
    >
      {/* Delete button */}
      <button
        onClick={() => onDelete(habit.id)}
        className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex items-start gap-4">
        {/* Completion checkbox */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(habit.id)}
          className={cn(
            'relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl',
            'border-2 transition-all duration-300',
            habit.completedToday
              ? 'bg-primary/20 border-primary'
              : `${colors.bg} ${colors.border}`
          )}
        >
          <AnimatePresence mode="wait">
            {habit.completedToday ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="text-primary"
              >
                <Check size={24} strokeWidth={3} />
              </motion.div>
            ) : (
              <motion.span
                key="icon"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {habit.icon}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className={cn(
              'font-semibold truncate transition-colors',
              habit.completedToday ? 'text-muted-foreground line-through' : 'text-foreground'
            )}>
              {habit.name}
            </h3>
            <StreakBadge streak={habit.streak} size="sm" />
          </div>
          
          <div className="flex items-center gap-2">
            <span className={cn(
              'text-xs px-2 py-0.5 rounded-full capitalize',
              colors.bg,
              colors.text
            )}>
              {habit.category}
            </span>
            <span className="text-xs text-muted-foreground">
              {habit.target}x/week
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className={cn(
            'h-full rounded-full',
            habit.completedToday ? 'bg-primary' : 'bg-muted-foreground/30'
          )}
          initial={{ width: 0 }}
          animate={{ width: habit.completedToday ? '100%' : '0%' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}
