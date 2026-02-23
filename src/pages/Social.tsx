import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Users, ThumbsUp, MessageCircle } from "lucide-react";

export default function Social() {
  const socialPosts = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "👩‍💼",
      action: "completed a 30-day meditation streak!",
      likes: 234,
      comments: 18,
      timestamp: "2 hours ago",
      habit: "Daily Meditation",
      liked: true,
    },
    {
      id: 2,
      user: "Alex Johnson",
      avatar: "👨‍💻",
      action: "reached Level 5 in Gamification!",
      likes: 156,
      comments: 12,
      timestamp: "4 hours ago",
      habit: "Habit Mastery",
      liked: false,
    },
    {
      id: 3,
      user: "Emma Davis",
      avatar: "👩‍🎓",
      action: "shared their fitness goal progress (85%)",
      likes: 289,
      comments: 31,
      timestamp: "6 hours ago",
      habit: "Get Fit in 90 Days",
      liked: false,
    },
  ];

  const friends = [
    { name: "Sarah Chen", status: "56 day streak", avatar: "👩‍💼", isFollowing: true },
    { name: "Alex Johnson", status: "32 day streak", avatar: "👨‍💻", isFollowing: true },
    { name: "Emma Davis", status: "78 day streak", avatar: "👩‍🎓", isFollowing: false },
    { name: "Michael Brown", status: "24 day streak", avatar: "👨‍🔬", isFollowing: false },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Social & Sharing Features</h1>
          <p className="text-muted-foreground">Connect with friends, share achievements, and motivate each other</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Social Feed */}
          <div className="lg:col-span-2 space-y-4">
            {/* Share Action */}
            <Card className="p-6 card-elevated">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share Your Achievement
              </h2>
              <textarea
                className="w-full p-4 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground resize-none"
                placeholder="Share your progress, milestone, or motivational message..."
                rows={4}
              />
              <div className="flex justify-end gap-3 mt-4">
                <Button variant="outline">Cancel</Button>
                <Button className="btn-primary">Post Achievement</Button>
              </div>
            </Card>

            {/* Social Feed */}
            {socialPosts.map((post) => (
              <Card key={post.id} className="p-6 card-elevated">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{post.avatar}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground">{post.user}</h3>
                    <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>

                <p className="text-foreground mb-3">
                  <span className="font-semibold">{post.user}</span> {post.action}
                </p>

                <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <span className="text-sm font-medium text-primary">📍 {post.habit}</span>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <button
                    className={`flex items-center gap-2 text-sm transition-colors ${
                      post.liked ? "text-primary font-medium" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <ThumbsUp className={"w-4 h-4"} />
                    {post.likes} {post.liked && "(You)"}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments}
                  </button>
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Friends List */}
            <Card className="p-6 card-elevated">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Friends
              </h2>
              <div className="space-y-3">
                {friends.map((friend) => (
                  <div key={friend.name} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                    <div className="text-2xl">{friend.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{friend.name}</p>
                      <p className="text-xs text-muted-foreground">{friend.status}</p>
                    </div>
                    <Button
                      variant={friend.isFollowing ? "outline" : "default"}
                      size="sm"
                      className={friend.isFollowing ? "" : "btn-primary"}
                    >
                      {friend.isFollowing ? "Following" : "Follow"}
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Find More Friends
              </Button>
            </Card>

            {/* Weekly Rankings */}
            <Card className="p-6 card-elevated">
              <h2 className="text-lg font-semibold text-foreground mb-4">Weekly Rankings</h2>
              <div className="space-y-2">
                {[
                  { rank: 1, name: "You", xp: 450, medal: "🥇" },
                  { rank: 2, name: "Sarah Chen", xp: 428, medal: "🥈" },
                  { rank: 3, name: "Emma Davis", xp: 412, medal: "🥉" },
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{user.medal}</span>
                      <span className="text-sm font-medium text-foreground">{user.name}</span>
                    </div>
                    <span className="text-sm font-bold text-primary">{user.xp} XP</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
