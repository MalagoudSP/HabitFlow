import { motion } from 'framer-motion';
import { Target, Flame, Trophy, CheckCircle2, Sparkles } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';
import { ProgressRing } from '@/components/ProgressRing';
import { HabitCard } from '@/components/HabitCard';
import { StatCard } from '@/components/StatCard';
import { AddHabitDialog } from '@/components/AddHabitDialog';
import { MotivationalQuote } from '@/components/MotivationalQuote';
import { WeeklyHeatmap } from '@/components/WeeklyHeatmap';
import { AnimatePresence } from 'framer-motion';

const Index = () => {
  const { habits, toggleHabit, addHabit, deleteHabit, getStats } = useHabits();
  const stats = getStats();

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 glass border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="text-primary-foreground" size={22} />
              </div>
              <span className="text-xl font-bold text-foreground">HabitFlow</span>
            </motion.div>
            <AddHabitDialog onAdd={addHabit} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Greeting & Progress */}
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {greeting()}! <span className="animate-float inline-block">👋</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                You've completed <span className="text-primary font-semibold">{stats.completedToday}</span> of{' '}
                <span className="font-semibold">{stats.totalHabits}</span> habits today.
              </p>
              <p className="text-muted-foreground mt-1">Keep up the great work!</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center md:justify-end"
            >
              <ProgressRing progress={stats.weeklyProgress} size={180} strokeWidth={14}>
                <div className="text-center">
                  <p className="text-4xl font-bold text-foreground">{stats.weeklyProgress}%</p>
                  <p className="text-sm text-muted-foreground">Today's Goal</p>
                </div>
              </ProgressRing>
            </motion.div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              icon={Target}
              label="Total Habits"
              value={stats.totalHabits}
              delay={0}
            />
            <StatCard
              icon={CheckCircle2}
              label="Done Today"
              value={stats.completedToday}
              variant="primary"
              delay={0.1}
            />
            <StatCard
              icon={Flame}
              label="Best Streak"
              value={stats.longestStreak}
              subtitle="days"
              variant="streak"
              delay={0.2}
            />
            <StatCard
              icon={Trophy}
              label="Total Completions"
              value={stats.totalCompletions}
              delay={0.3}
            />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Habits List */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Today's Habits</h2>
              <span className="text-sm text-muted-foreground">
                {stats.completedToday}/{stats.totalHabits} completed
              </span>
            </div>
            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {habits.map((habit) => (
                  <HabitCard
                    key={habit.id}
                    habit={habit}
                    onToggle={toggleHabit}
                    onDelete={deleteHabit}
                  />
                ))}
              </AnimatePresence>
              {habits.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12 gradient-card rounded-2xl border border-border/50"
                >
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No habits yet</h3>
                  <p className="text-muted-foreground">Create your first habit to get started!</p>
                </motion.div>
              )}
            </div>
          </section>

          {/* Sidebar */}
          <aside className="space-y-6">
            <WeeklyHeatmap completedToday={stats.completedToday} totalHabits={stats.totalHabits} />
            <MotivationalQuote />
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Build better habits, one day at a time.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
