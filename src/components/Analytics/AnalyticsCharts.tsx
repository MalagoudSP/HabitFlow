import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeatmapProps {
  data: Record<string, number>;
  maxValue?: number;
  title?: string;
}

export const CalendarHeatmap: React.FC<HeatmapProps> = ({ data, maxValue = 7, title = 'Activity Heatmap' }) => {
  const getColor = (value: number) => {
    if (value === 0) return '#e5e7eb';
    const intensity = value / maxValue;
    if (intensity < 0.25) return '#dcfce7';
    if (intensity < 0.5) return '#86efac';
    if (intensity < 0.75) return '#22c55e';
    return '#16a34a';
  };

  const weeks: React.ReactNode[][] = [];
  const sortedDates = Object.keys(data).sort();

  if (sortedDates.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>No activity data available</CardDescription>
        </CardHeader>
        <CardContent className="h-32 flex items-center justify-center text-gray-500">
          Complete habits to see your activity heatmap
        </CardContent>
      </Card>
    );
  }

  const startDate = new Date(sortedDates[0]);
  const endDate = new Date(sortedDates[sortedDates.length - 1]);
  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate() - currentDate.getDay());

  let currentWeek: React.ReactNode[] = [];

  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const value = data[dateStr] || 0;

    currentWeek.push(
      <div
        key={dateStr}
        className="w-8 h-8 rounded-sm border border-gray-200 cursor-pointer"
        style={{ backgroundColor: getColor(value) }}
        title={`${dateStr}: ${value} habits`}
      />
    );

    if (currentWeek.length === 7) {
      weeks.push([...currentWeek]);
      currentWeek = [];
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (currentWeek.length > 0) {
    weeks.push([...currentWeek]);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Habits completed per day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {weeks.map((week, idx) => (
            <div key={idx} className="flex gap-1">
              {week}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

interface PerformanceChartProps {
  data: Array<{ date: string; completion: number; target?: number }>;
  title?: string;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title = 'Completion Rate Trend',
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Your completion rate over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 100]} />
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
            <Line
              type="monotone"
              dataKey="completion"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              name="Completion %"
            />
            {data[0]?.target && (
              <Line
                type="monotone"
                dataKey="target"
                stroke="#9ca3af"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Target %"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface StreakComparison {
  habit: string;
  current: number;
  best: number;
}

export const StreakComparison: React.FC<{ data: StreakComparison[]; title?: string }> = ({
  data,
  title = 'Streak Comparison',
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Current vs best streaks</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 200, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis type="category" dataKey="habit" width={190} />
            <Tooltip />
            <Legend />
            <Bar dataKey="current" fill="#ef4444" name="Current Streak" />
            <Bar dataKey="best" fill="#22c55e" name="Best Streak" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface HabitDistribution {
  name: string;
  value: number;
  color: string;
}

export const HabitDistribution: React.FC<{ data: HabitDistribution[]; title?: string }> = ({
  data,
  title = 'Habits by Category',
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Distribution of your habits</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

interface ConsistencyData {
  day: string;
  completions: number;
}

export const WeeklyConsistency: React.FC<{ data: ConsistencyData[]; title?: string }> = ({
  data,
  title = 'Weekly Consistency',
}) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Your consistency by day of week</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completions" fill="#10b981" name="Completions" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default {
  CalendarHeatmap,
  PerformanceChart,
  StreakComparison,
  HabitDistribution,
  WeeklyConsistency,
};
