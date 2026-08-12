import axios from 'axios';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (data: { email: string; password: string }) => apiClient.post('/auth/login', data),
  register: (data: { email: string; name: string; password: string }) => apiClient.post('/auth/register', data),
  profile: () => apiClient.get('/auth/profile'),
};

// API Endpoints
export const habitAPI = {
  // Habits
  getHabits: () => apiClient.get('/habits'),
  getHabit: (id: string) => apiClient.get(`/habits/${id}`),
  createHabit: (data: any) => apiClient.post('/habits', data),
  updateHabit: (id: string, data: any) => apiClient.put(`/habits/${id}`, data),
  deleteHabit: (id: string) => apiClient.delete(`/habits/${id}`),

  // Completions
  completeHabit: (habitId: string, data: any) => apiClient.post(`/habits/${habitId}/complete`, data),
  getCompletions: (habitId: string, startDate: string, endDate: string) =>
    apiClient.get(`/habits/${habitId}/completions`, { params: { startDate, endDate } }),

  // Analytics
  getHabitAnalytics: (habitId: string, period: string) =>
    apiClient.get(`/habits/${habitId}/analytics`, { params: { period } }),
  getUserStats: () => apiClient.get('/habits/stats'),
  getHeatmapData: (period: string) => apiClient.get('/analytics/heatmap', { params: { period } }),

  // Predictions
  predictHabitSuccess: (habitId: string) => apiClient.get(`/habits/${habitId}/prediction`),

  // Gamification
  getAchievements: () => apiClient.get('/gamification/achievements'),
  getUserLevel: () => apiClient.get('/gamification/level'),
  addXP: (amount: number, reason: string) => apiClient.post('/gamification/xp', { amount, reason }),

  // Journal
  getJournalEntries: (startDate: string, endDate: string) =>
    apiClient.get('/journal', { params: { startDate, endDate } }),
  createJournalEntry: (data: any) => apiClient.post('/journal', data),
  updateJournalEntry: (id: string, data: any) => apiClient.put(`/journal/${id}`, data),

  // Goals
  getGoals: () => apiClient.get('/goals'),
  createGoal: (data: any) => apiClient.post('/goals', data),
  updateGoal: (id: string, data: any) => apiClient.put(`/goals/${id}`, data),
  completeGoal: (id: string) => apiClient.post(`/goals/${id}/complete`, {}),

  // Social
  getUserProfile: (userId: string) => apiClient.get(`/users/${userId}`),
  getLeaderboard: (period: string) => apiClient.get('/leaderboard', { params: { period } }),
  followUser: (userId: string) => apiClient.post(`/users/${userId}/follow`, {}),
  unfollowUser: (userId: string) => apiClient.delete(`/users/${userId}/follow`),
  getActivityFeed: () => apiClient.get('/feed'),

  // Reminders
  getReminders: () => apiClient.get('/reminders'),
  createReminder: (data: any) => apiClient.post('/reminders', data),
  updateReminder: (id: string, data: any) => apiClient.put(`/reminders/${id}`, data),
  deleteReminder: (id: string) => apiClient.delete(`/reminders/${id}`),
};

export default apiClient;
