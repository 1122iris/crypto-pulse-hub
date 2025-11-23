import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { InfluencerCard } from "@/components/InfluencerCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateInfluencers, generateWhaleActivity, Stance } from "@/lib/mockInfluencers";
import { Users, TrendingUp, AlertTriangle } from "lucide-react";

export default function Influencers() {
  const [stanceFilter, setStanceFilter] = useState<Stance | "all">("all");
  
  const influencers = generateInfluencers();
  const whaleActivity = generateWhaleActivity();

  // Filter influencers by stance
  const filteredInfluencers = stanceFilter === "all" 
    ? influencers 
    : influencers.filter(inf => inf.recentStance === stanceFilter);

  // Calculate stats
  const bullishCount = influencers.filter(inf => inf.recentStance === "bullish").length;
  const bearishCount = influencers.filter(inf => inf.recentStance === "bearish").length;
  const neutralCount = influencers.filter(inf => inf.recentStance === "neutral").length;

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        onRefresh={handleRefresh}
        isRefreshing={false}
        lastUpdate={new Date()}
        hasData={true}
      />

      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            KOL Influence Tracker
          </h1>
          <p className="text-muted-foreground">
            Track top crypto influencers and their market sentiment
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Bullish Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{bullishCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((bullishCount / influencers.length) * 100)}% of tracked KOLs
              </p>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Bearish Sentiment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{bearishCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((bearishCount / influencers.length) * 100)}% of tracked KOLs
              </p>
            </CardContent>
          </Card>

          <Card className="border-muted">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-muted" />
                Neutral Stance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{neutralCount}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {Math.round((neutralCount / influencers.length) * 100)}% of tracked KOLs
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={(v) => setStanceFilter(v as Stance | "all")}>
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="all">All ({influencers.length})</TabsTrigger>
            <TabsTrigger value="bullish">Bullish ({bullishCount})</TabsTrigger>
            <TabsTrigger value="bearish">Bearish ({bearishCount})</TabsTrigger>
            <TabsTrigger value="neutral">Neutral ({neutralCount})</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Influencer List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredInfluencers.map((influencer, index) => (
            <div key={influencer.id} className="animate-slide-up-fade">
              <InfluencerCard 
                influencer={influencer} 
                rank={influencers.findIndex(inf => inf.id === influencer.id) + 1}
              />
            </div>
          ))}
        </div>

        {/* Whale Activity */}
        <Card className="border-warning/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Recent Whale Activity
            </CardTitle>
            <CardDescription>
              Large wallet movements detected in the last 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {whaleActivity.slice(0, 8).map((activity, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50 hover:border-warning/50 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.action === "buy" ? "bg-primary" :
                      activity.action === "sell" ? "bg-destructive" :
                      "bg-muted-foreground"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground font-mono">
                        {activity.address}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${
                      activity.action === "buy" ? "text-primary" :
                      activity.action === "sell" ? "text-destructive" :
                      "text-muted-foreground"
                    }`}>
                      {activity.action.toUpperCase()}
                    </p>
                    <p className="text-xs text-foreground">
                      {activity.amount}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
