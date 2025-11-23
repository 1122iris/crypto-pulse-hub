import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { CryptoData } from "@/types/crypto";

interface CompactCryptoCardProps extends CryptoData {}

export function CompactCryptoCard({
  symbol,
  name,
  price,
  change,
  recommendation,
  strength,
}: CompactCryptoCardProps) {
  const isPositive = change > 0;

  const getRecommendationColor = () => {
    switch (recommendation) {
      case "buy":
        return "bg-primary/20 text-primary border-primary/50";
      case "hold":
        return "bg-warning/20 text-warning border-warning/50";
      case "sell":
        return "bg-destructive/20 text-destructive border-destructive/50";
    }
  };

  const getCardBorderColor = () => {
    switch (recommendation) {
      case "buy":
        return "hover:border-primary/50 hover:shadow-primary/20";
      case "hold":
        return "hover:border-warning/50 hover:shadow-warning/20";
      case "sell":
        return "hover:border-destructive/50 hover:shadow-destructive/20";
    }
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

  return (
    <div
      className={cn(
        "p-5 rounded-lg border border-border bg-card shadow-md",
        "transition-all duration-300 hover:shadow-lg",
        getCardBorderColor()
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-foreground">{symbol}</h3>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
        <Badge
          variant="outline"
          className={cn("text-xs px-2 py-0.5", getRecommendationColor())}
        >
          {recommendation.toUpperCase()}
        </Badge>
      </div>

      {/* Price */}
      <div className="mb-3">
        <div className="text-3xl font-bold text-foreground mb-1">
          ${price.toLocaleString()}
        </div>
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-primary" : "text-destructive"
          )}
        >
          {isPositive ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          {isPositive ? "+" : ""}
          {change.toFixed(2)}% (24h)
        </div>
      </div>

      {/* Strength Indicator */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground">
          {strength.toUpperCase()} Strength
        </span>
        <div className="flex items-center gap-1">{getStrengthDots()}</div>
      </div>
    </div>
  );
}
