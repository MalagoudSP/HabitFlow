# HabitFlow - Developer Implementation Guide

## Quick Start

### Installation
```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build
```

### Project Structure
```
HabitFlow/
├── public/
│   ├── manifest.json          # PWA manifest
│   └── sw.js                  # Service Worker
├── src/
│   ├── components/
│   │   ├── AppNavigation.tsx   # Main navigation
│   │   ├── AIInsight.tsx       # AI insight cards
│   │   ├── MetricCard.tsx      # Metric display
│   │   ├── MilestoneTracker.tsx
│   │   └── ui/                # Shadcn UI components
│   ├── pages/
│   │   ├── Landing.tsx         # Public landing page
│   │   ├── Index.tsx           # Main dashboard
│   │   ├── Analytics.tsx       # Analytics dashboard
│   │   ├── DeepAnalytics.tsx   # Advanced analytics
│   │   ├── Gamification.tsx    # Badges & levels
│   │   ├── MoodJournal.tsx     # Mood tracking
│   │   ├── Goals.tsx           # Goal linking
│   │   ├── Social.tsx          # Social features
│   │   ├── Notifications.tsx   # Smart notifications
│   │   ├── Scheduling.tsx      # Habit scheduling
│   │   ├── Settings.tsx        # Account settings
│   │   ├── Auth.tsx            # Authentication
│   │   └── NotFound.tsx        # 404 page
│   ├── context/
│   │   └── AuthContext.tsx     # Auth state
│   ├── hooks/
│   │   └── useHabits.ts        # Habit hooks
│   ├── types/
│   │   ├── habit.ts            # Habit types
│   │   └── user.ts             # User types
│   ├── App.tsx                 # Main app routes
│   ├── main.tsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML shell
├── tailwind.config.ts          # Tailwind config
├── tsconfig.json               # TypeScript config
├── package.json                # Dependencies
└── vite.config.ts              # Vite config
```

---

## Color System

### Corporate Professional Palette
```typescript
// Colors are defined in src/index.css as CSS variables

Primary Colors:
- --primary: hsl(217 91% 40%)     // #1655D5 (Professional Blue)
- --primary-foreground: hsl(0 0% 100%)

Secondary Colors:
- --secondary: hsl(210 10% 40%)   // #2C3E50 (Dark Gray)
- --secondary-foreground: hsl(0 0% 100%)

Neutral Colors:
- --background: hsl(210 40% 96%)  // #F5F8FA (Light)
- --foreground: hsl(220 13% 20%)  // #313A48 (Dark)
- --card: hsl(0 0% 100%)          // #FFFFFF (White)

Accent Colors:
- --accent: hsl(217 91% 50%)      // #2563EB
- --success: hsl(142 76% 46%)     // #8EC26F (Green)
- --destructive: hsl(0 84% 60%)   // #F63E5E (Red)

Utility Colors:
- --border: hsl(210 14% 89%)
- --input: hsl(210 14% 93%)
- --muted: hsl(210 14% 83%)
- --muted-foreground: hsl(215 13% 34%)
```

### Usage Examples
```tsx
// Primary button
<Button className="btn-primary">Save Changes</Button>

// Secondary button
<Button className="btn-secondary">Cancel</Button>

// Card with elevation
<Card className="card-elevated">...</Card>

// Text with gradient
<p className="text-gradient">AI Insights</p>

// Subtle shadow
<div className="shadow-card">...</div>
```

---

## Component Guidelines

### Creating New Feature Pages

```typescript
// Standard template for new pages
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IconName } from "lucide-react";

export default function FeatureName() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Feature Title</h1>
          <p className="text-muted-foreground">Feature description</p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature cards */}
        </div>
      </div>
    </div>
  );
}
```

### Using Reusable Components

```typescript
import { AIInsight } from "@/components/AIInsight";
import { MetricCard } from "@/components/MetricCard";
import { MilestoneTracker } from "@/components/MilestoneTracker";

// AI Insight Card
<AIInsight
  type="recommendation"
  title="Optimal Scheduling"
  description="Based on your data..."
  impact="+28% success rate"
/>

// Metric Display
<MetricCard
  label="Completion Rate"
  value="87.3%"
  change="+5.2%"
  trend="up"
/>

// Milestone Tracker
<MilestoneTracker
  vertical={true}
  milestones={[
    { name: "Week 4", description: "30% Goal", completed: true },
    { name: "Week 8", description: "60% Goal", completed: false },
  ]}
/>
```

---

## Styling Best Practices

### Responsive Grid System
```tsx
// Mobile-first responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Adapts from 1 column on mobile → 2 on tablet → 3 on desktop */}
</div>
```

### Card Layouts
```tsx
// Elevated card with professional styling
<Card className="p-6 card-elevated hover:shadow-card transition-all">
  <h2 className="text-lg font-semibold text-foreground mb-4">Title</h2>
  <p className="text-muted-foreground">Content</p>
</Card>
```

### Typography
```tsx
// Professional typography hierarchy
<h1 className="text-4xl md:text-5xl font-bold text-foreground">
  Large Heading (Hero/Section Titles)
</h1>

<h2 className="text-2xl font-bold text-foreground">
  Section Heading
</h2>

<h3 className="text-lg font-semibold text-foreground">
  Subsection Heading
</h3>

<p className="text-foreground">
  Regular text
</p>

<p className="text-muted-foreground">
  Secondary/supporting text
</p>
```

---

## Adding New Routes

### Update `src/App.tsx`

```typescript
import NewPage from "./pages/NewPage";

const AppRoutes = () => (
  <Routes>
    {/* ... existing routes ... */}
    <Route
      path="/new-feature"
      element={
        <ProtectedRoute>
          <NewPage />
        </ProtectedRoute>
      }
    />
    {/* ... catch-all route ... */}
  </Routes>
);
```

### Update `src/components/AppNavigation.tsx`

```typescript
const menuItems = [
  // ... existing items ...
  { icon: NewIcon, label: "New Feature", href: "/new-feature" },
];
```

---

## Working with Data

### Using React Context (Current Auth State)
```typescript
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  return (
    <>
      {isAuthenticated && <p>Welcome, {user?.name}</p>}
    </>
  );
}
```

### Using Custom Hooks (Habits)
```typescript
import { useHabits } from "@/hooks/useHabits";

function MyComponent() {
  const { habits, toggleHabit, addHabit, getStats } = useHabits();
  const stats = getStats();
  
  return (
    <>
      <p>Total Habits: {stats.totalHabits}</p>
    </>
  );
}
```

---

## Form Implementation Example

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NewHabitForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle submission
  };

  return (
    <Card className="p-6 card-elevated">
      <h2 className="text-lg font-semibold text-foreground mb-4">Add New Habit</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-foreground mb-2">
            Habit Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
            placeholder="e.g., Morning Run"
          />
        </div>

        <div className="flex gap-3">
          <Button type="submit" className="btn-primary">
            Add Habit
          </Button>
          <Button type="button" variant="outline">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
```

---

## Animation Patterns

### Professional Animations
```tsx
import { motion } from 'framer-motion';

// Fade in
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  Content
</motion.div>

// Slide in
<motion.div
  initial={{ opacity: 0, x: -20 }}
  animate={{ opacity: 1, x: 0 }}
>
  Content
</motion.div>

// Scale transition
<motion.div
  initial={{ scale: 0.9, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
>
  Content
</motion.div>
```

---

## Testing Checklist

Before submitting a new feature:

- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Color contrast meets accessibility standards
- [ ] All text uses appropriate font sizes
- [ ] Buttons are clickable and provide feedback
- [ ] Forms validate input appropriately
- [ ] Error states are handled gracefully
- [ ] Loading states are shown
- [ ] No console errors or warnings
- [ ] Routing works correctly
- [ ] Navigation updates appropriately

---

## Performance Tips

1. **Lazy Load Heavy Components**
   ```tsx
   const HeavyComponent = lazy(() => import('./Heavy'));
   ```

2. **Use React Query for Data**
   - Already integrated
   - Handles caching and synchronization

3. **Optimize Images**
   - Use WebP format where possible
   - Minimize file sizes
   - Use appropriate dimensions

4. **Code Splitting**
   - Leverage React Router's code splitting
   - Import components only when needed

---

## Deployment Checklist

- [ ] Build passes without errors: `bun run build`
- [ ] Service Worker registered and working
- [ ] PWA manifest configured
- [ ] Environment variables set
- [ ] Analytics tracking in place
- [ ] Testing completed
- [ ] Documentation updated
- [ ] Performance optimized

---

## Common Commands

```bash
# Development
bun run dev          # Start dev server
bun run build        # Build for production
bun run preview      # Preview production build

# Dependencies
bun add <package>    # Add new package
bun update          # Update packages

# Utilities
bun --version       # Check Bun version
```

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Shadcn/UI Components](https://ui.shadcn.com)
- [Lucide Icons](https://lucide.dev)
- [Framer Motion](https://www.framer.com/motion)

---

## Support & Questions

For questions or issues:
1. Check existing documentation
2. Review component examples
3. Check similar implementations
4. Create an issue with detailed description

---

**Happy Coding! 🚀**
