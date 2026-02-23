import { Button } from "@/components/ui/button";
import { BarChart3, Sparkles, Trophy, Users, Bell, Clock, Target, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AppNavigation() {
  const navigate = useNavigate();

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: Sparkles, label: "Analytics", href: "/analytics" },
    { icon: Trophy, label: "Gamification", href: "/gamification" },
    { icon: Users, label: "Social", href: "/social" },
    { icon: Target, label: "Goals", href: "/goals" },
    { icon: Bell, label: "Notifications", href: "/notifications" },
    { icon: Clock, label: "Scheduling", href: "/scheduling" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <nav className="border-b border-border bg-background sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
              HF
            </div>
            <span className="text-lg font-bold text-foreground">HabitFlow</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate("/settings")}>
            Profile
          </Button>
        </div>
        
        {/* Horizontal Scroll Navigation */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.href}
                variant="outline"
                size="sm"
                onClick={() => navigate(item.href)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
