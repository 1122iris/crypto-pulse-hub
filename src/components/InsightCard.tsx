import {
  TrendingUp,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CryptoData } from "@/types/crypto";
import { useNavigate } from "react-router-dom";

interface InsightCardProps extends CryptoData {}

export function InsightCard({
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
  predictedAt,
}: InsightCardProps) {
  const isPositive = change > 0;
  const navigate = useNavigate();

  const getRecommendationIcon = () => {
    switch (recommendation) {
      case "buy":
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case "hold":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      case "sell":
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getRecommendationBorder = () => {
    switch (recommendation) {
      case "buy":
        return "border-primary/30 shadow-primary/10";
      case "hold":
        return "border-warning/30 shadow-warning/10";
      case "sell":
        return "border-destructive/30 shadow-destructive/10";
    }
  };

  const getRecommendationGradient = () => {
    switch (recommendation) {
      case "buy":
        return "from-primary/10 to-transparent";
      case "hold":
        return "from-warning/10 to-transparent";
      case "sell":
        return "from-destructive/10 to-transparent";
    }
  };

  const getSentimentColor = () => {
    if (sentiment >= 70) return "text-primary";
    if (sentiment >= 40) return "text-warning";
    return "text-destructive";
  };

  const getStrengthDots = () => {
    const dots = { high: 3, medium: 2, low: 1 }[strength];
    return Array(3)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full transition-all",
            i < dots ? "bg-primary" : "bg-muted"
          )}
        />
      ));
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  return (
    <div
      className={cn(
        "rounded-lg border bg-card shadow-lg hover:shadow-xl transition-all duration-300",
        getRecommendationBorder()
      )}
    >
      {/* Header with gradient */}
      <div
        className={cn(
          "p-6 rounded-t-lg bg-gradient-to-br",
          getRecommendationGradient()
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-2xl font-bold text-foreground">{symbol}</h3>
              {getRecommendationIcon()}
            </div>
            <p className="text-muted-foreground">{name}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-foreground">
              ${price.toLocaleString()}
            </div>
            <div
              className={cn(
                "flex items-center justify-end gap-1 text-sm font-medium mt-1",
                isPositive ? "text-primary" : "text-destructive"
              )}
            >
              <TrendingUp
                className={cn("h-4 w-4", !isPositive && "rotate-180")}
              />
              {isPositive ? "+" : ""}
              {change.toFixed(2)}% (24h)
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Badge
            variant="outline"
            className={cn(
              "text-sm px-3 py-1 font-semibold",
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
          <div className="flex items-center gap-1 ml-auto">
            {getStrengthDots()}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* AI Analysis - Enhanced */}
        <div className="relative p-5 rounded-xl border-2 border-primary/40 bg-gradient-to-br from-primary/15 via-primary/8 to-transparent overflow-hidden shadow-lg shadow-primary/5">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 opacity-60" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-primary/25 ring-2 ring-primary/30">
                <AlertCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground flex items-center gap-2">
                  AI Analysis
                  <span className="px-2 py-0.5 text-xs font-semibold bg-primary/20 text-primary rounded-full border border-primary/30">
                    LIVE
                  </span>
                </h4>
                <p className="text-xs text-muted-foreground/80">Social Sentiment Intelligence</p>
              </div>
            </div>
            <p className="text-base text-foreground leading-relaxed font-medium">
              {reasoning}
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border border-border bg-secondary/50">
            <div className="text-xs text-muted-foreground mb-1">Sentiment</div>
            <div className={cn("text-lg font-bold", getSentimentColor())}>
              {sentiment}%
            </div>
            <div className="mt-2 h-1.5 bg-muted rounded-full overflow-hidden">
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

          <div className="p-3 rounded-lg border border-border bg-secondary/50">
            <div className="text-xs text-muted-foreground mb-1">Volume 24h</div>
            <div className="text-lg font-bold text-foreground">{volume}</div>
            <div className="text-xs text-muted-foreground mt-1">USD</div>
          </div>

          <div className="p-3 rounded-lg border border-border bg-secondary/50">
            <div className="text-xs text-muted-foreground mb-1">Market Cap</div>
            <div className="text-lg font-bold text-foreground">{marketCap}</div>
            <div className="text-xs text-muted-foreground mt-1">USD</div>
          </div>
        </div>

        {/* Timestamp and View Details */}
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>Predicted at {formatTime(predictedAt)}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/crypto/${symbol}`)}
            className="text-primary border-primary/50 hover:bg-primary/10"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
