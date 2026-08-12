import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JSONFile, Low } from 'lowdb'
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbFile = path.join(__dirname, 'db.json');
const adapter = new JSONFile(dbFile)
const db = new Low(adapter)

// Initialize DB with defaults if empty
await db.read()
db.data ||= { users: [], habits: [] }

const app = express();
const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'habitflow-secret';

app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(express.json());

const parseJSON = (value, fallback) => {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const serializeHabit = (row) => ({
  ...row,
  completedToday: row.completedToday === 1,
  reminderEnabled: row.reminderEnabled === 1,
  isArchived: row.isArchived === 1,
  completedDates: parseJSON(row.completedDates, []),
  missedDates: parseJSON(row.missedDates, []),
  missReasons: parseJSON(row.missReasons, {}),
  specificDays: parseJSON(row.specificDays, []),
});

const findUserByEmail = (email) => db.data.users.find(u => u.email === email);
const findUserById = (id) => db.data.users.find(u => u.id === id);

const createDemoUser = async () => {
  const demoEmail = 'test@example.com';
  const existing = findUserByEmail(demoEmail);
  if (existing) {
    return existing;
  }

  const passwordHash = bcrypt.hashSync('password123', 10);
  const newUser = {
    id: 'demo-user',
    email: demoEmail,
    name: 'Demo User',
    password: passwordHash,
    createdAt: new Date().toISOString(),
  };

  db.data.users.push(newUser)
  await db.write()

  const demoHabits = [
    {
      id: uuidv4(),
      userId: newUser.id,
      name: 'Morning Meditation',
      category: 'mindfulness',
      icon: '🧘',
      streak: 3,
      bestStreak: 5,
      completedToday: 0,
      completedDates: JSON.stringify([]),
      missedDates: JSON.stringify([]),
      missReasons: JSON.stringify({}),
      createdAt: new Date().toISOString(),
      target: 7,
      frequency: 'daily',
      reminderEnabled: 1,
      reminderTime: '06:00',
    },
    {
      id: uuidv4(),
      userId: newUser.id,
      name: 'Exercise 30 mins',
      category: 'fitness',
      icon: '🏃',
      streak: 5,
      bestStreak: 15,
      completedToday: 1,
      completedDates: JSON.stringify([new Date().toISOString().split('T')[0]]),
      missedDates: JSON.stringify([]),
      missReasons: JSON.stringify({}),
      createdAt: new Date().toISOString(),
      target: 5,
      frequency: 'weekly',
      reminderEnabled: 1,
      reminderTime: '18:00',
    },
    {
      id: uuidv4(),
      userId: newUser.id,
      name: 'Read 20 pages',
      category: 'learning',
      icon: '📖',
      streak: 8,
      bestStreak: 25,
      completedToday: 0,
      completedDates: JSON.stringify([]),
      missedDates: JSON.stringify([]),
      missReasons: JSON.stringify({}),
      createdAt: new Date().toISOString(),
      target: 7,
      frequency: 'daily',
      reminderEnabled: 0,
    },
    {
      id: uuidv4(),
      userId: newUser.id,
      name: 'Drink 8 glasses of water',
      category: 'health',
      icon: '💧',
      streak: 15,
      bestStreak: 60,
      completedToday: 1,
      completedDates: JSON.stringify([new Date().toISOString().split('T')[0]]),
      missedDates: JSON.stringify([]),
      missReasons: JSON.stringify({}),
      createdAt: new Date().toISOString(),
      target: 7,
      frequency: 'daily',
      reminderEnabled: 1,
      reminderTime: '09:00',
    },
  ];

  db.data.habits.push(...demoHabits)
  await db.write()

  return newUser;
};

await createDemoUser();

const generateToken = (userId) => jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = findUserById(payload.userId);
    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

app.post('/api/auth/register', async (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  if (findUserByEmail(email)) {
    return res.status(409).json({ message: 'User already exists.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    id: uuidv4(),
    email,
    name,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  db.data.users.push(newUser)
  await db.write()

  const token = generateToken(newUser.id);
  res.json({ user: { id: newUser.id, email: newUser.email, name: newUser.name, createdAt: newUser.createdAt }, token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Invalid email or password.' });
  }

  const token = generateToken(user.id);
  res.json({ user: { id: user.id, email: user.email, name: user.name, createdAt: user.createdAt }, token });
});

app.get('/api/auth/profile', authMiddleware, (req, res) => {
  const { id, email, name, createdAt } = req.user;
  res.json({ id, email, name, createdAt });
});

app.get('/api/habits', authMiddleware, (req, res) => {
  const habits = db.data.habits.filter(h => h.userId === req.user.id && h.isArchived === 0)
  res.json(habits.map(serializeHabit));
});

app.post('/api/habits', authMiddleware, async (req, res) => {
  const {
    name,
    description,
    category,
    icon,
    color,
    target = 7,
    frequency = 'daily',
    specificDays = [],
    reminderTime,
    reminderEnabled = false,
    goalMinutes,
    notes,
  } = req.body;

  const habit = {
    id: uuidv4(),
    userId: req.user.id,
    name,
    description: description || null,
    category: category || 'productivity',
    icon: icon || '✅',
    color: color || null,
    streak: 0,
    bestStreak: 0,
    completedToday: 0,
    completedDates: JSON.stringify([]),
    missedDates: JSON.stringify([]),
    missReasons: JSON.stringify({}),
    createdAt: new Date().toISOString(),
    target,
    frequency,
    specificDays: JSON.stringify(specificDays),
    reminderTime: reminderTime || null,
    reminderEnabled: reminderEnabled ? 1 : 0,
    goalMinutes: goalMinutes || null,
    notes: notes || null,
    lastCompletedAt: null,
    isArchived: 0,
  };

  db.data.habits.push(habit)
  await db.write()
  res.status(201).json(serializeHabit(habit));
});

app.put('/api/habits/:id', authMiddleware, async (req, res) => {
  const habit = db.data.habits.find(h => h.id === req.params.id && h.userId === req.user.id)
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found.' });
  }

  const updates = {
    name: req.body.name ?? habit.name,
    description: req.body.description ?? habit.description,
    category: req.body.category ?? habit.category,
    icon: req.body.icon ?? habit.icon,
    color: req.body.color ?? habit.color,
    target: req.body.target ?? habit.target,
    frequency: req.body.frequency ?? habit.frequency,
    specificDays: JSON.stringify(req.body.specificDays ?? parseJSON(habit.specificDays, [])),
    reminderTime: req.body.reminderTime ?? habit.reminderTime,
    reminderEnabled: req.body.reminderEnabled != null ? (req.body.reminderEnabled ? 1 : 0) : habit.reminderEnabled,
    goalMinutes: req.body.goalMinutes ?? habit.goalMinutes,
    notes: req.body.notes ?? habit.notes,
    isArchived: req.body.isArchived != null ? (req.body.isArchived ? 1 : 0) : habit.isArchived,
  };

  Object.assign(habit, {
    name: updates.name,
    description: updates.description,
    category: updates.category,
    icon: updates.icon,
    color: updates.color,
    target: updates.target,
    frequency: updates.frequency,
    specificDays: JSON.parse(updates.specificDays || '[]'),
    reminderTime: updates.reminderTime,
    reminderEnabled: updates.reminderEnabled,
    goalMinutes: updates.goalMinutes,
    notes: updates.notes,
    isArchived: updates.isArchived
  })
  await db.write()
  res.json(serializeHabit(habit));
});

app.delete('/api/habits/:id', authMiddleware, async (req, res) => {
  db.data.habits = db.data.habits.filter(h => !(h.id === req.params.id && h.userId === req.user.id))
  await db.write()
  res.json({ success: true });
});

app.post('/api/habits/:id/complete', authMiddleware, async (req, res) => {
  const habit = db.data.habits.find(h => h.id === req.params.id && h.userId === req.user.id)
  if (!habit) {
    return res.status(404).json({ message: 'Habit not found.' });
  }

  const today = new Date().toISOString().split('T')[0];
  const completedDates = parseJSON(habit.completedDates, []);
  const missedDates = parseJSON(habit.missedDates, []);
  const missReasons = parseJSON(habit.missReasons, {});
  const isCompleting = habit.completedToday === 0;

  const newCompletedDates = isCompleting
    ? [...completedDates.filter((date) => date !== today), today]
    : completedDates.filter((date) => date !== today);

  const newMissedDates = isCompleting
    ? missedDates.filter((date) => date !== today)
    : [...missedDates.filter((date) => date !== today), today];

  if (!isCompleting && req.body.missReason) {
    missReasons[today] = req.body.missReason;
  }
  if (isCompleting) {
    delete missReasons[today];
  }

  const newStreak = isCompleting ? habit.streak + 1 : 0;
  const bestStreak = isCompleting ? Math.max(habit.bestStreak, newStreak) : habit.bestStreak;

  habit.completedToday = isCompleting ? 1 : 0
  habit.completedDates = JSON.stringify(newCompletedDates)
  habit.missedDates = JSON.stringify(newMissedDates)
  habit.missReasons = JSON.stringify(missReasons)
  habit.streak = newStreak
  habit.bestStreak = bestStreak
  habit.lastCompletedAt = isCompleting ? new Date().toISOString() : habit.lastCompletedAt
  await db.write()

  const updatedHabits = db.data.habits.filter(h => h.userId === req.user.id && h.isArchived === 0)
  res.json(updatedHabits.map(serializeHabit));
});

app.get('/api/habits/stats', authMiddleware, (req, res) => {
  const habits = db.data.habits.filter(h => h.userId === req.user.id && h.isArchived === 0).map(serializeHabit)
  const completedToday = habits.filter((h) => h.completedToday).length;
  const longestStreak = habits.reduce((acc, h) => Math.max(acc, h.streak), 0);
  const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
  const weeklyProgress = habits.length > 0 ? Math.round((completedToday / habits.length) * 100) : 0;
  res.json({ totalHabits: habits.length, completedToday, longestStreak, totalCompletions, weeklyProgress });
});

app.listen(PORT, () => {
  console.log(`HabitFlow backend listening on http://localhost:${PORT}`);
});
