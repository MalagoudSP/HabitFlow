import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Users, TrendingUp, Shield, Brain, BarChart3, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Insights",
      description: "Machine learning algorithms analyze your habits and provide personalized recommendations",
      color: "primary",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Deep dive into comprehensive habit analytics with predictive insights and patterns",
      color: "accent",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Gamification System",
      description: "Earn badges, level up, and compete on leaderboards to stay motivated",
      color: "success",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Social Features",
      description: "Connect with friends, share achievements, and motivate each other",
      color: "primary",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Goal Linking",
      description: "Connect habits to meaningful goals and track overall progress",
      color: "accent",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Smart Scheduling",
      description: "AI-optimized schedules based on your energy patterns and completion history",
      color: "success",
    },
  ];

  const stats = [
    { label: "Active Users", value: "50K+" },
    { label: "Habits Tracked", value: "500K+" },
    { label: "Avg Completion", value: "87%" },
    { label: "Daily Streaks", value: "100K+" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                HF
              </div>
              <span className="text-xl font-bold text-foreground">HabitFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate("/auth")}
              >
                Sign In
              </Button>
              <Button className="btn-primary" onClick={() => navigate("/auth")}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Habit Tracking</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Build Better Habits <br /> With{" "}
              <span className="text-transparent bg-clip-text bg-gradient-primary">AI Intelligence</span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Track, analyze, and optimize your habits with advanced AI insights, gamification, and social features.
              Master your goals with our comprehensive habit management platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="btn-primary gap-2" onClick={() => navigate("/auth")}>
                Start Free <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline">
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 card-elevated text-center">
                <p className="text-3xl font-bold text-primary mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Powerful Features</h2>
            <p className="text-lg text-muted-foreground">Everything you need to build and maintain better habits</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-8 card-elevated hover:shadow-card transition-all group">
                <div className={`w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary/20 transition-colors`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="p-12 card-elevated border-2 border-primary/30 bg-primary/5 text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Transform Your Habits?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users building better habits with HabitFlow's AI-powered platform.
            </p>
            <Button size="lg" className="btn-primary gap-2" onClick={() => navigate("/auth")}>
              Start Your Journey <ArrowRight className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Features</a></li>
                <li><a href="#" className="hover:text-primary">Pricing</a></li>
                <li><a href="#" className="hover:text-primary">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About</a></li>
                <li><a href="#" className="hover:text-primary">Blog</a></li>
                <li><a href="#" className="hover:text-primary">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Privacy</a></li>
                <li><a href="#" className="hover:text-primary">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Social</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Twitter</a></li>
                <li><a href="#" className="hover:text-primary">GitHub</a></li>
                <li><a href="#" className="hover:text-primary">Discord</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 HabitFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
