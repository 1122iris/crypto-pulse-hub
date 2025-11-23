import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export type Recommendation = "buy" | "hold" | "sell";
export type Strength = "high" | "medium" | "low";

interface CryptoCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  recommendation: Recommendation;
  strength: Strength;
  isSelected?: boolean;
  onClick?: () => void;
}

export function CryptoCard({
  symbol,
  name,
  price,
  change,
  recommendation,
  strength,
  isSelected,
  onClick,
}: CryptoCardProps) {
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
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-lg border transition-all duration-300",
        "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
        isSelected
          ? "border-primary bg-card shadow-lg shadow-primary/20"
          : "border-border bg-card"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-lg text-foreground">{symbol}</h3>
            <Badge variant="outline" className={getRecommendationColor()}>
              {recommendation.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{name}</p>
        </div>
        <TrendingUp className="h-4 w-4 text-primary" />
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-bold text-foreground">
            ${price.toLocaleString()}
          </span>
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-primary" : "text-destructive"
            )}
          >
            {isPositive ? (
              <ArrowUpRight className="h-4 w-4" />
            ) : (
              <ArrowDownRight className="h-4 w-4" />
            )}
            {Math.abs(change).toFixed(2)}%
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Strength</span>
          <div className="flex items-center gap-1">{getStrengthDots()}</div>
        </div>
      </div>
    </button>
  );
}
