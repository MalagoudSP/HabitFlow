import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HabitCategory, categoryColors, categoryIcons } from '@/types/habit';
import { cn } from '@/lib/utils';

interface AddHabitDialogProps {
  onAdd: (name: string, category: HabitCategory, icon: string, target: number) => void;
}

const categories: HabitCategory[] = ['health', 'fitness', 'mindfulness', 'productivity', 'learning', 'social'];

const icons = ['🎯', '💪', '🧘', '📚', '💧', '🏃', '😴', '🍎', '📝', '🎨', '🎵', '🌱'];

export function AddHabitDialog({ onAdd }: AddHabitDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<HabitCategory>('health');
  const [icon, setIcon] = useState('🎯');
  const [target, setTarget] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onAdd(name.trim(), category, icon, target);
      setName('');
      setCategory('health');
      setIcon('🎯');
      setTarget(7);
      setIsOpen(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="gradient-primary text-primary-foreground font-semibold shadow-glow hover:opacity-90 transition-opacity"
      >
        <Plus size={20} className="mr-2" />
        New Habit
      </Button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            />

            {/* Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
            >
              <div className="gradient-card border border-border rounded-3xl p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Create New Habit</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"
                  >
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name input */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Habit Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Morning meditation"
                      className="bg-secondary border-border"
                    />
                  </div>

                  {/* Icon selector */}
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <div className="flex flex-wrap gap-2">
                      {icons.map((i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setIcon(i)}
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all',
                            icon === i
                              ? 'bg-primary/20 border-2 border-primary'
                              : 'bg-secondary hover:bg-secondary/80'
                          )}
                        >
                          {i}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Category selector */}
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {categories.map((cat) => {
                        const colors = categoryColors[cat];
                        return (
                          <button
                            key={cat}
                            type="button"
                            onClick={() => setCategory(cat)}
                            className={cn(
                              'px-3 py-2 rounded-lg text-sm capitalize transition-all flex items-center gap-2',
                              category === cat
                                ? `${colors.bg} ${colors.text} border-2 ${colors.border}`
                                : 'bg-secondary hover:bg-secondary/80 text-muted-foreground'
                            )}
                          >
                            <span>{categoryIcons[cat]}</span>
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Target selector */}
                  <div className="space-y-2">
                    <Label>Weekly Target: {target}x</Label>
                    <input
                      type="range"
                      min={1}
                      max={7}
                      value={target}
                      onChange={(e) => setTarget(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1x</span>
                      <span>7x</span>
                    </div>
                  </div>

                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full gradient-primary text-primary-foreground font-semibold"
                  >
                    Create Habit
                  </Button>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
