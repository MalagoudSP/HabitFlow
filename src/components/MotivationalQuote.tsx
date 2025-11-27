import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  { text: "Small daily improvements lead to stunning results.", author: "Robin Sharma" },
  { text: "We are what we repeatedly do. Excellence is not an act, but a habit.", author: "Aristotle" },
  { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
  { text: "Motivation gets you going, but discipline keeps you growing.", author: "John C. Maxwell" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
  { text: "Your habits will determine your future.", author: "Jack Canfield" },
];

export function MotivationalQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-2xl p-6 relative overflow-hidden"
    >
      <Quote className="absolute top-4 left-4 text-primary/20" size={48} />
      <div className="relative z-10 pl-8">
        <p className="text-lg text-foreground/90 italic mb-3">
          "{randomQuote.text}"
        </p>
        <p className="text-sm text-muted-foreground">
          — {randomQuote.author}
        </p>
      </div>
    </motion.div>
  );
}
