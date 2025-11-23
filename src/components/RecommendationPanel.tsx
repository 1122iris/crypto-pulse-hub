import { TrendingUp, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Recommendation, Strength } from "./CryptoCard";

interface RecommendationPanelProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  recommendation: Recommendation;
  strength: Strength;
  reasoning: string;
  sentiment: number;
  volume: string;
  marketCap: string;
}

export function RecommendationPanel({
  symbol,
  name,
  price,
  change,
  recommendation,
  strength,
  reasoning,
  sentiment,
  volume,
  marketCap,
}: RecommendationPanelProps) {
  const isPositive = change > 0;

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case "buy":
        return <CheckCircle className="h-6 w-6 text-primary" />;
      case "hold":
        return <AlertCircle className="h-6 w-6 text-warning" />;
      case "sell":
        return <XCircle className="h-6 w-6 text-destructive" />;
    }
  };

  const getRecommendationGradient = () => {
    switch (recommendation) {
      case "buy":
        return "from-primary/20 to-transparent";
      case "hold":
        return "from-warning/20 to-transparent";
      case "sell":
        return "from-destructive/20 to-transparent";
    }
  };

  const getSentimentColor = () => {
    if (sentiment >= 70) return "text-primary";
    if (sentiment >= 40) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="h-full flex flex-col">
      <div
        className={cn(
          "p-6 rounded-t-lg border-b border-border bg-gradient-to-br",
          getRecommendationGradient()
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-1">{symbol}</h2>
            <p className="text-muted-foreground">{name}</p>
          </div>
          {getRecommendationIcon()}
        </div>

        <div className="space-y-3">
          <div>
            <div className="text-4xl font-bold text-foreground mb-2">
              ${price.toLocaleString()}
            </div>
            <div
              className={cn(
                "flex items-center gap-2 text-lg font-medium",
                isPositive ? "text-primary" : "text-destructive"
              )}
            >
              <TrendingUp
                className={cn("h-5 w-5", !isPositive && "rotate-180")}
              />
              {isPositive ? "+" : ""}
              {change.toFixed(2)}% (24h)
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className={cn(
                "text-sm px-3 py-1",
                recommendation === "buy" &&
                  "bg-primary/20 text-primary border-primary/50",
                recommendation === "hold" &&
                  "bg-warning/20 text-warning border-warning/50",
                recommendation === "sell" &&
                  "bg-destructive/20 text-destructive border-destructive/50"
              )}
            >
              {recommendation.toUpperCase()} SIGNAL
            </Badge>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {strength.toUpperCase()} STRENGTH
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            AI Analysis
          </h3>
          <p className="text-muted-foreground leading-relaxed">{reasoning}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border border-border bg-secondary">
            <div className="text-sm text-muted-foreground mb-1">
              Social Sentiment
            </div>
            <div className={cn("text-2xl font-bold", getSentimentColor())}>
              {sentiment}%
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={cn(
                  "h-full transition-all duration-500",
                  sentiment >= 70 && "bg-primary",
                  sentiment >= 40 && sentiment < 70 && "bg-warning",
                  sentiment < 40 && "bg-destructive"
                )}
                style={{ width: `${sentiment}%` }}
              />
            </div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-secondary">
            <div className="text-sm text-muted-foreground mb-1">24h Volume</div>
            <div className="text-2xl font-bold text-foreground">{volume}</div>
            <div className="text-xs text-muted-foreground mt-1">USD</div>
          </div>

          <div className="p-4 rounded-lg border border-border bg-secondary col-span-2">
            <div className="text-sm text-muted-foreground mb-1">Market Cap</div>
            <div className="text-2xl font-bold text-foreground">{marketCap}</div>
            <div className="text-xs text-muted-foreground mt-1">USD</div>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-primary/30 bg-primary/5">
          <div className="flex items-start gap-3">
            <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-foreground mb-1">
                Key Insight
              </div>
              <p className="text-sm text-muted-foreground">
                Based on current social media trends and market indicators, this
                recommendation has been generated with {strength} confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
