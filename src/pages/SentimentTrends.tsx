import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SentimentChart } from "@/components/SentimentChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateSentimentTimeline, generateMultiCoinSentiment } from "@/lib/mockSentiment";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export default function SentimentTrends() {
  const [timeframe, setTimeframe] = useState<7 | 30>(7);
  
  // Generate data for multiple coins
  const coins = ["BTC", "ETH", "SOL", "XRP", "BNB"];
  const sentimentData = coins.map(symbol => ({
    symbol,
    ...generateSentimentTimeline(symbol, timeframe)
  }));

  const multiCoinSentiment = generateMultiCoinSentiment();

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
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Sentiment Trend Analysis
          </h1>
          <p className="text-muted-foreground">
            Real-time social media sentiment tracking and market mood indicators
          </p>
        </div>

        {/* Multi-Coin Overview */}
        <Card className="mb-8 border-primary/20">
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {multiCoinSentiment.map((coin) => {
                const TrendIcon = 
                  coin.trend === "up" ? TrendingUp :
                  coin.trend === "down" ? TrendingDown :
                  Minus;
                
                const trendColor = 
                  coin.trend === "up" ? "text-primary" :
                  coin.trend === "down" ? "text-destructive" :
                  "text-muted-foreground";

                return (
                  <div 
                    key={coin.symbol}
                    className="p-4 rounded-lg border border-border bg-card/50 hover:border-primary/50 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {coin.symbol}
                      </span>
                      <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {coin.currentSentiment.toFixed(1)}
                    </div>
                    <div className={`text-xs ${coin.change24h > 0 ? "text-primary" : "text-destructive"}`}>
                      {coin.change24h > 0 ? "+" : ""}{coin.change24h.toFixed(1)} (24h)
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Timeframe Selection */}
        <Tabs defaultValue="7d" className="mb-6" onValueChange={(v) => setTimeframe(v === "7d" ? 7 : 30)}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="7d">7 Days</TabsTrigger>
            <TabsTrigger value="30d">30 Days</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Individual Coin Charts */}
        <div className="space-y-6">
          {sentimentData.map(({ symbol, data, events }) => (
            <div key={symbol} className="animate-slide-up-fade">
              <SentimentChart
                data={data}
                events={events}
                title={`${symbol} Sentiment Analysis`}
                description={`${timeframe}-day social media sentiment trends`}
                showPrice={false}
              />
            </div>
          ))}
        </div>

        {/* Info Section */}
        <Card className="mt-8 bg-muted/30">
          <CardHeader>
            <CardTitle className="text-base">Understanding Sentiment Scores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">Bullish (70-100)</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Strong positive sentiment, high buying interest
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="font-medium text-foreground">Neutral (30-70)</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Mixed signals, market indecision
                </p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="font-medium text-foreground">Bearish (0-30)</span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Negative sentiment, selling pressure
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
