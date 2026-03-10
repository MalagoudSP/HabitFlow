import { OpenAI } from 'openai';
import { Habit, HabitAnalytics, JournalEntry, UserLevel } from '@/types/habit';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // Only for demo - use backend in production
});

export const aiService = {
  // Generate daily habit recommendations
  async generateDailyRecommendations(habits: Habit[], stats: any): Promise<string> {
    const habitSummary = habits
      .map(h => `${h.name} (${h.category}, ${h.streak} day streak)`)
      .join(', ');

    const prompt = `As a habit coach, provide a brief, motivating daily recommendation for this user based on their habits:
    Habits: ${habitSummary}
    Completion Rate: ${stats.completionRate}%
    Current Streak: ${stats.longestStreak} days
    
    Keep it to 1-2 sentences and be encouraging.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    return message.choices[0].message.content || '';
  },

  // Analyze habit performance and provide insights
  async analyzeHabitPerformance(habit: Habit, analytics: HabitAnalytics): Promise<string> {
    const prompt = `Analyze this habit's performance and provide actionable insights:
    Habit: ${habit.name}
    Completion Rate: ${analytics.completionRate}%
    Current Streak: ${habit.streak} days
    Best Streak: ${habit.bestStreak} days
    Trend: ${analytics.trend}
    Prediction: ${(analytics.predictedSuccessRate * 100).toFixed(0)}% success rate
    
    Provide 2-3 specific, actionable suggestions to improve performance.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 200,
      messages: [{ role: 'user', content: prompt }],
    });

    return message.choices[0].message.content || '';
  },

  // Generate habit suggestions based on missing habits
  async suggestNewHabits(categories: string[], existingHabits: Habit[]): Promise<string[]> {
    const existingNames = existingHabits.map(h => h.name).join(', ');
    const prompt = `Suggest 3 NEW impactful habits in these categories: ${categories.join(', ')}
    Already tracking: ${existingNames}
    
    Return ONLY the habit names, one per line, no numbering or explanations.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    if (message.choices[0].message.content) {
      return message.choices[0].message.content
        .split('\n')
        .filter(line => line.trim())
        .slice(0, 3);
    }
    return [];
  },

  // Generate personalized motivation message
  async generateMotivation(streak: number, category: string, completionRate: number): Promise<string> {
    const mood =
      completionRate > 80
        ? 'excited'
        : completionRate > 60
          ? 'supportive'
          : 'encouraging';

    const prompt = `Generate a ${mood}, personalized 1-2 sentence motivation message for someone with:
    - A ${streak} day streak in ${category}
    - ${completionRate.toFixed(0)}% completion rate
    
    Be specific, authentic, and uplifting.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 100,
      messages: [{ role: 'user', content: prompt }],
    });

    return message.choices[0].message.content || '';
  },

  // Analyze journal entry and provide insights
  async analyzeJournalEntry(entry: JournalEntry, habits: Habit[]): Promise<{ insights: string; patterns: string[] }> {
    const habitContext = habits.map(h => `${h.name}: ${entry.habits.find(eh => eh.habitId === h.id)?.completed ? '✓' : '✗'}`).join(', ');

    const prompt = `Analyze this journal entry for patterns and insights:
    Mood: ${entry.mood}
    Entry: ${entry.content}
    Habits Completed: ${habitContext}
    
    Provide:
    1. Key pattern or insight (1 sentence)
    2. Three 2-3 word pattern tags (like: procrastination, low-energy, social-energy)`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    if (message.choices[0].message.content) {
      const response = message.choices[0].message.content;
      const lines = response.split('\n').filter(l => l.trim());
      return {
        insights: lines[0] || '',
        patterns: lines.slice(1, 4).map(p => p.replace(/^[\d\.\-\*]\s*/, '').trim()),
      };
    }

    return { insights: '', patterns: [] };
  },

  // Generate life score insights
  async generateLifeScoreInsights(scores: Record<string, number>, topHabit: string, bottomHabit: string): Promise<string> {
    const scoresText = Object.entries(scores)
      .map(([cat, score]) => `${cat}: ${score}/100`)
      .join(', ');

    const prompt = `Based on these life discipline scores, provide an encouraging 2-3 sentence overview:
    ${scoresText}
    
    Strongest area: ${topHabit}
    Area to improve: ${bottomHabit}
    
    Be balanced - celebrate strength and offer hope for improvement.`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 150,
      messages: [{ role: 'user', content: prompt }],
    });

    return message.choices[0].message.content || '';
  },

  // Predict habit failure and suggest prevention
  async predictAndPrevent(habit: Habit, missedCount: number, recentMissReasons: string[]): Promise<{ prediction: string; suggestion: string }> {
    const prompt = `Based on this habit data, predict failure risk and suggest prevention:
    Habit: ${habit.name}
    Missed in last week: ${missedCount} times
    Miss reasons: ${recentMissReasons.join(', ')}
    Category: ${habit.category}
    
    Respond with:
    1. Risk assessment (low/medium/high)
    2. One specific preventive action`;

    const message = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 120,
      messages: [{ role: 'user', content: prompt }],
    });

    if (message.choices[0].message.content) {
      const response = message.choices[0].message.content;
      const lines = response.split('\n').filter(l => l.trim());
      return {
        prediction: lines[0] || '',
        suggestion: lines[1] || '',
      };
    }

    return { prediction: '', suggestion: '' };
  },
};

export default aiService;
