import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp, ExternalLink, BarChart3, Users, Shield, Twitter, MessageCircle, Heart, Repeat2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCryptoAdvices } from "@/hooks/useCryptoAdvices";
import { cn } from "@/lib/utils";

const FAKE_EXCHANGES = [
  { name: "Binance", fee: "0.1%", volume: "$2.4B", rating: 4.8, url: "#" },
  { name: "Coinbase", fee: "0.5%", volume: "$1.8B", rating: 4.6, url: "#" },
  { name: "Kraken", fee: "0.26%", volume: "$890M", rating: 4.5, url: "#" },
  { name: "OKX", fee: "0.15%", volume: "$1.2B", rating: 4.7, url: "#" },
];

const FAKE_PRICE_PREDICTIONS = [
  { timeframe: "24h", price: "+2.5%", confidence: "high" },
  { timeframe: "7d", price: "+8.3%", confidence: "medium" },
  { timeframe: "30d", price: "+15.7%", confidence: "medium" },
  { timeframe: "90d", price: "+24.2%", confidence: "low" },
];

const FAKE_SOCIAL_METRICS = {
  twitterMentions: "12.4K",
  sentiment: "Bullish",
  topInfluencers: ["@CryptoWhale", "@BlockchainBoss", "@Web3Guru"],
  trendingScore: 87,
};

const FAKE_SOCIAL_POSTS = (symbol: string) => [
  {
    author: "CZ 🔶 BN",
    handle: "@cz_binance",
    avatar: "👤",
    content: `${symbol} is showing strong fundamentals. The community growth is impressive. Always DYOR, but the metrics look promising. 🚀`,
    likes: "24.5K",
    retweets: "8.3K",
    replies: "3.2K",
    time: "2h ago",
    url: "https://twitter.com/cz_binance/status/fake123456789",
    verified: true,
  },
  {
    author: "Vitalik.eth",
    handle: "@VitalikButerin",
    avatar: "👤",
    content: `Interesting developments in the ${symbol} ecosystem. The technical architecture is sound and scalability improvements are notable. Looking forward to seeing how this evolves.`,
    likes: "18.2K",
    retweets: "5.7K",
    replies: "2.1K",
    time: "5h ago",
    url: "https://twitter.com/VitalikButerin/status/fake987654321",
    verified: true,
  },
  {
    author: "Crypto Rover",
    handle: "@rovercrc",
    avatar: "👤",
    content: `JUST IN: ${symbol} whale activity detected! 🐋\n\n• 3 large transactions in past hour\n• Total volume: $47M\n• Accumulation pattern forming\n\nThis is HUGE! 📈 #Crypto #${symbol}`,
    likes: "12.8K",
    retweets: "4.2K",
    replies: "1.8K",
    time: "8h ago",
    url: "https://twitter.com/rovercrc/status/fake456789123",
    verified: true,
  },
  {
    author: "Crypto Wendy O",
    handle: "@CryptoWendyO",
    avatar: "👤",
    content: `My ${symbol} analysis:\n\n✅ Strong support at current levels\n✅ RSI showing bullish divergence\n✅ Social sentiment at ATH\n✅ Institutional interest growing\n\nNFA but looking good! 💎🙌`,
    likes: "9.4K",
    retweets: "2.9K",
    replies: "1.3K",
    time: "12h ago",
    url: "https://twitter.com/CryptoWendyO/status/fake789123456",
    verified: false,
  },
];

export default function CryptoDetail() {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();
  const { data: cryptoData } = useCryptoAdvices();

  const crypto = cryptoData?.find((c) => c.symbol === symbol);

  if (!crypto) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Crypto not found</p>
          <Button onClick={() => navigate("/")} className="mt-4">
            Back to Feed
          </Button>
        </div>
      </div>
    );
  }

  const isPositive = crypto.change > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 max-w-6xl">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Feed
          </Button>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold text-foreground">{crypto.symbol}</h1>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-sm px-3 py-1 font-semibold",
                    crypto.recommendation === "buy" &&
                      "bg-primary/20 text-primary border-primary/50",
                    crypto.recommendation === "hold" &&
                      "bg-warning/20 text-warning border-warning/50",
                    crypto.recommendation === "sell" &&
                      "bg-destructive/20 text-destructive border-destructive/50"
                  )}
                >
                  {crypto.recommendation.toUpperCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground text-lg">{crypto.name}</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-foreground">
                ${crypto.price.toLocaleString()}
              </div>
              <div
                className={cn(
                  "flex items-center justify-end gap-1 text-lg font-medium mt-1",
                  isPositive ? "text-primary" : "text-destructive"
                )}
              >
                <TrendingUp
                  className={cn("h-5 w-5", !isPositive && "rotate-180")}
                />
                {isPositive ? "+" : ""}
                {crypto.change.toFixed(2)}% (24h)
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Analysis */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                AI Deep Analysis
              </h2>
              <p className="text-foreground leading-relaxed mb-4">
                {crypto.reasoning}
              </p>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-foreground">
                  <strong>Key Insight:</strong> Our AI models analyze over 500K social media posts daily. 
                  Current sentiment shows {FAKE_SOCIAL_METRICS.sentiment.toLowerCase()} patterns with 
                  {FAKE_SOCIAL_METRICS.twitterMentions} mentions in the last 24 hours.
                </p>
              </div>
            </div>

            {/* Price Predictions */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Price Predictions
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {FAKE_PRICE_PREDICTIONS.map((pred) => (
                  <div
                    key={pred.timeframe}
                    className="p-4 rounded-lg border border-border bg-secondary/50"
                  >
                    <div className="text-sm text-muted-foreground mb-1">
                      {pred.timeframe}
                    </div>
                    <div className="text-2xl font-bold text-primary mb-2">
                      {pred.price}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {pred.confidence} confidence
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Metrics */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Social Sentiment
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Twitter Mentions</span>
                  <span className="text-foreground font-semibold">
                    {FAKE_SOCIAL_METRICS.twitterMentions}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Overall Sentiment</span>
                  <Badge
                    variant="outline"
                    className="bg-primary/20 text-primary border-primary/50"
                  >
                    {FAKE_SOCIAL_METRICS.sentiment}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Trending Score</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${FAKE_SOCIAL_METRICS.trendingScore}%` }}
                      />
                    </div>
                    <span className="text-foreground font-semibold">
                      {FAKE_SOCIAL_METRICS.trendingScore}/100
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Trending Posts */}
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Twitter className="h-5 w-5 text-primary" />
                Trending Posts
              </h2>
              <div className="space-y-4">
                {FAKE_SOCIAL_POSTS(crypto.symbol).map((post, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg border border-border bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="text-2xl">{post.avatar}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-foreground">
                            {post.author}
                          </span>
                          {post.verified && (
                            <span className="text-primary text-sm">✓</span>
                          )}
                          <span className="text-muted-foreground text-sm">
                            {post.handle}
                          </span>
                          <span className="text-muted-foreground text-sm">
                            • {post.time}
                          </span>
                        </div>
                        <p className="text-foreground text-sm leading-relaxed mb-3">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-6 text-muted-foreground text-sm">
                          <div className="flex items-center gap-1 hover:text-primary cursor-pointer">
                            <MessageCircle className="h-4 w-4" />
                            <span>{post.replies}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-primary cursor-pointer">
                            <Repeat2 className="h-4 w-4" />
                            <span>{post.retweets}</span>
                          </div>
                          <div className="flex items-center gap-1 hover:text-destructive cursor-pointer">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                          <a
                            href={post.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 hover:text-primary ml-auto"
                            onClick={(e) => e.preventDefault()}
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span>View on X</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Trading Platforms */}
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 sticky top-24">
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Where to Buy
              </h2>
              <div className="space-y-4">
                {FAKE_EXCHANGES.map((exchange) => (
                  <div
                    key={exchange.name}
                    className="p-4 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-foreground text-lg">
                          {exchange.name}
                        </h3>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <span>⭐</span>
                          <span>{exchange.rating}/5.0</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Fee: {exchange.fee}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-3">
                      24h Volume: {exchange.volume}
                    </div>
                    <Button className="w-full" size="sm">
                      Trade on {exchange.name}
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 inline mr-1" />
                  Always verify platform legitimacy and use 2FA for security
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
