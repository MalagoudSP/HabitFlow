import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings, Shield, Zap, Database, Smartphone } from "lucide-react";
import { Toggle } from "@/components/ui/toggle";

export default function AccountSettings() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Account Settings</h1>
          <p className="text-muted-foreground">Manage your profile and account preferences</p>
        </div>

        {/* Profile Section */}
        <Card className="p-8 card-elevated mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            Profile Information
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="john@example.com"
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
              <textarea
                defaultValue="Building better habits, one day at a time."
                className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground resize-none"
                rows={4}
              />
            </div>

            <Button className="btn-primary w-full">Save Changes</Button>
          </div>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-8 card-elevated mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6" />
            Privacy & Security
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Toggle defaultPressed={false} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Profile Visibility</h3>
                <p className="text-sm text-muted-foreground">Allow others to see your achievements</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Activity Logging</h3>
                <p className="text-sm text-muted-foreground">Store your activity history</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>
          </div>
        </Card>

        {/* AI Features */}
        <Card className="p-8 card-elevated mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Zap className="w-6 h-6" />
            AI & Analytics
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">AI Recommendations</h3>
                <p className="text-sm text-muted-foreground">Get personalized AI insights and suggestions</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Smart Scheduling</h3>
                <p className="text-sm text-muted-foreground">Let AI optimize your habit schedule</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Predictive Analytics</h3>
                <p className="text-sm text-muted-foreground">Predict habit success with machine learning</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-8 card-elevated mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Database className="w-6 h-6" />
            Data Management
          </h2>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              📥 Download My Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              🔄 Export Habits
            </Button>
          </div>
        </Card>

        {/* PWA Settings */}
        <Card className="p-8 card-elevated mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6" />
            PWA & Offline
          </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Offline Mode</h3>
                <p className="text-sm text-muted-foreground">Use the app without internet connection</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/20 border border-border">
              <div>
                <h3 className="font-semibold text-foreground">Push Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive desktop and mobile notifications</p>
              </div>
              <Toggle defaultPressed={true} />
            </div>

            <Button variant="outline" className="w-full justify-start">
              📱 Install as App
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-8 card-elevated border-destructive bg-destructive/5">
          <h2 className="text-2xl font-bold text-destructive mb-6">Danger Zone</h2>

          <div className="space-y-3">
            <Button variant="outline" className="w-full">
              Change Password
            </Button>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
