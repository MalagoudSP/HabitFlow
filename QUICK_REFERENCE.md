# HabitFlow - Quick Reference Guide

## 🚀 Getting Started

```bash
# Install and run
bun install
bun run dev

# Production build
bun run build
```

---

## 📍 Feature Routes Quick Map

| Feature | Route | Status | Description |
|---------|-------|--------|-------------|
| Landing | `/` | 🟢 Live | Public homepage |
| Dashboard | `/dashboard` | 🟢 Live | Main habit hub |
| Analytics | `/analytics` | 🟢 Live | AI-powered insights |
| Deep Analytics | `/deep-analytics` | 🟢 Live | Advanced analytics |
| Gamification | `/gamification` | 🟢 Live | Badges & levels |
| Mood Journal | `/mood-journal` | 🟢 Live | Mood tracking |
| Goals | `/goals` | 🟢 Live | Goal management |
| Social | `/social` | 🟢 Live | Community features |
| Notifications | `/notifications` | 🟢 Live | Smart reminders |
| Scheduling | `/scheduling` | 🟢 Live | AI scheduling |
| Settings | `/settings` | 🟢 Live | Account settings |

---

## 🎨 Color Palette Reference

```css
/* Primary */
Primary Blue:           #1655D5  (hsl(217 91% 40%))
Primary Foreground:     #FFFFFF  (hsl(0 0% 100%))

/* Background & Text */
Background:             #F5F8FA  (hsl(210 40% 96%))
Foreground:             #313A48  (hsl(220 13% 20%))
Card:                   #FFFFFF  (hsl(0 0% 100%))

/* Accents */
Accent:                 #2563EB  (hsl(217 91% 50%))
Success:                #8EC26F  (hsl(142 76% 46%))
Destructive:            #F63E5E  (hsl(0 84% 60%))

/* Utilities */
Border:                 #D9E0E8  (hsl(210 14% 89%))
Muted:                  #E8EEF5  (hsl(210 14% 83%))
Muted Foreground:       #5B6B7F  (hsl(215 13% 34%))
```

---

## 🧩 Component Usage

### Quick Component Reference

```tsx
// Import commonly used components
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AIInsight } from "@/components/AIInsight";
import { MetricCard } from "@/components/MetricCard";
import { MilestoneTracker } from "@/components/MilestoneTracker";
```

### Common Pattern Card Example
```tsx
<Card className="p-6 card-elevated">
  <h2 className="text-lg font-semibold text-foreground mb-4">Title</h2>
  <p className="text-muted-foreground">Description</p>
</Card>
```

### Button Styles
```tsx
// Primary (Blue)
<Button className="btn-primary">Save</Button>

// Secondary 
<Button className="btn-secondary">Secondary</Button>

// Outline
<Button variant="outline">Cancel</Button>
```

---

## 📐 Responsive Grid System

```tsx
// Mobile-first responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 col on mobile, 2 on tablet, 3 on desktop */}
</div>
```

---

## 🎯 AI Features at a Glance

### 1. Advanced Analytics 📊
- Habit success tracking
- Streak monitoring
- Weekly patterns
- AI recommendations

### 2. Gamification 🏆
- 5-level progression system
- 6 achievement badges
- Weekly leaderboards
- XP rewards

### 3. Mood Tracking 😊
- 5 emotional states
- Journal entries
- Mood vs. habit correlation
- 30-day analytics

### 4. Goal Linking 🎯
- Connect 2-5 habits per goal
- Milestone tracking
- Progress visualization
- Goal recommendations

### 5. Social Features 👥
- Achievement sharing
- Friend ranking
- Activity feeds
- Community support

### 6. Smart Notifications 🔔
- AI-optimized timing
- Multi-type notifications
- Preference customization
- Smart insights

### 7. Advanced Scheduling ⏰
- AI schedule generation
- Flexibility settings
- Time optimization
- Energy-based scheduling

### 8. Deep Analytics 📈
- Multi-period analysis
- Predictive modeling
- Habit comparison
- Risk assessment

### 9. PWA & Offline 📱
- Works without internet
- Installable as app
- Push notifications ready
- Background sync

### 10. Account Settings ⚙️
- 2FA framework
- Privacy controls
- Data export
- PWA management

---

## 📝 Styling Cheat Sheet

### Typography
```tsx
<h1 className="text-4xl md:text-5xl font-bold text-foreground">
  Large Heading
</h1>

<h2 className="text-2xl font-bold text-foreground">
  Section Heading
</h2>

<p className="text-muted-foreground">
  Secondary text
</p>
```

### Spacing
```tsx
<div className="p-6">         {/* Padding 24px */}
<div className="mb-8">         {/* Margin bottom 32px */}
<div className="gap-6">         {/* Gap 24px */}
```

### Common Classes
```tsx
className="card-elevated"       // Card with shadow
className="btn-primary"         // Primary button
className="text-gradient"       // Gradient text
className="shadow-card"         // Soft shadow
className="rounded-lg"          // Rounded corners
className="border border-border" // Professional border
```

---

## 🔑 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.x",
  "typescript": "^5.x",
  "tailwindcss": "^3.x",
  "framer-motion": "^10.x",
  "@tanstack/react-query": "^5.x",
  "lucide-react": "^0.x",
  "@hookform/resolvers": "^3.x",
  "react-hook-form": "^7.x"
}
```

---

## 🧪 Testing Checklist

- [ ] Page loads without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] Color contrast is readable
- [ ] Buttons are clickable
- [ ] Forms validate correctly
- [ ] Navigation works
- [ ] No console errors
- [ ] PWA service worker active
- [ ] Offline mode functions
- [ ] Animations are smooth

---

## 🚨 Common Issues & Solutions

### Issue: Colors look different
**Solution:** Check if using custom CSS variables from `src/index.css`

### Issue: Navigation not showing
**Solution:** Import and add `<AppNavigation />` component

### Issue: Service Worker not working
**Solution:** Check `public/sw.js` and browser DevTools

### Issue: TypeScript errors
**Solution:** Run `bun run build` to check compilation

---

## 📚 Documentation Files

- **TRANSFORMATION.md** - Design & feature transformation
- **AI_FEATURES.md** - Detailed AI capabilities
- **DEVELOPER_GUIDE.md** - Implementation guide
- **CHANGELOG.md** - Version history
- **This File** - Quick reference

---

## 🔗 File Structure Quick View

```
src/
├── pages/           # Feature pages (12 new)
├── components/      # Reusable components
│   ├── ui/         # Shadcn components
│   └── AI*.tsx     # AI-specific components
├── context/        # Auth context
├── hooks/          # Custom hooks
├── types/          # TypeScript types
├── App.tsx         # Route definitions
└── index.css       # Global styles

public/
├── manifest.json   # PWA metadata
└── sw.js          # Service Worker
```

---

## ⌨️ Quick Commands

```bash
# Development
bun run dev              # Start dev server

# Build & Deploy
bun run build            # Production build
bun run preview          # Preview build locally

# Package Management
bun add <package>        # Add dependency
bun update              # Update dependencies

# Verify
bun run build            # Check for errors
```

---

## 🎓 Learning Path

1. **Start with:** `DEVELOPER_GUIDE.md`
2. **Understand:** `TRANSFORMATION.md`
3. **Learn features:** `AI_FEATURES.md`
4. **Reference:** This file
5. **Check history:** `CHANGELOG.md`

---

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 13+)
- Mobile browsers: ✅ Full support with PWA

---

## 💡 Pro Tips

1. Use `className="animate-fade-in"` for smooth page transitions
2. Cards should use `card-elevated` class for professional look
3. Always use `text-foreground` for main text, `text-muted-foreground` for secondary
4. Responsive grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
5. Use `max-w-7xl mx-auto` for consistent page width
6. Add `transition-all` to interactive elements
7. Group related items with consistent `gap-6` spacing

---

## ❓ FAQ

**Q: How do I add a new feature page?**
A: Create file in `src/pages/`, add route in `App.tsx`, update `AppNavigation.tsx`

**Q: How do I change colors?**
A: Edit CSS variables in `src/index.css` - all colors reference these variables

**Q: Can users use offline?**
A: Yes! Service Worker caches app shell and syncs when online

**Q: Is this mobile-friendly?**
A: Yes! Fully responsive and installable as PWA app

**Q: How do I add authentication?**
A: Use `useAuth()` hook from `AuthContext`

---

**Version:** 1.0.0
**Last Updated:** February 23, 2025
**Status:** ✅ Production Ready

**Quick Links:**
- [Full Transformation Summary](TRANSFORMATION.md)
- [AI Features Details](AI_FEATURES.md)
- [Developer Guide](DEVELOPER_GUIDE.md)
