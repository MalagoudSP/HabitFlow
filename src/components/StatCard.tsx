import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: 'default' | 'primary' | 'streak';
  delay?: number;
}

export function StatCard({ icon: Icon, label, value, subtitle, variant = 'default', delay = 0 }: StatCardProps) {
  const variants = {
    default: 'gradient-card border-border/50',
    primary: 'gradient-card border-primary/30 shadow-glow',
    streak: 'gradient-card border-accent/30 shadow-streak',
  };

  const iconVariants = {
    default: 'bg-secondary text-muted-foreground',
    primary: 'gradient-primary text-primary-foreground',
    streak: 'gradient-streak text-accent-foreground',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        'p-5 rounded-2xl border',
        variants[variant]
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn('p-3 rounded-xl', iconVariants[variant])}>
          <Icon size={22} />
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{label}</p>
          <motion.p 
            className="text-3xl font-bold text-foreground"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
          >
            {value}
          </motion.p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
