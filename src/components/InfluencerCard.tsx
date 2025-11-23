import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, CheckCircle } from "lucide-react";
import { Influencer, formatFollowers } from "@/lib/mockInfluencers";

interface InfluencerCardProps {
  influencer: Influencer;
  rank: number;
}

export function InfluencerCard({ influencer, rank }: InfluencerCardProps) {
  const stanceColor = 
    influencer.recentStance === "bullish" ? "bg-primary/20 text-primary border-primary/50" :
    influencer.recentStance === "bearish" ? "bg-destructive/20 text-destructive border-destructive/50" :
    "bg-muted text-muted-foreground border-border";
  
  const StanceIcon = 
    influencer.recentStance === "bullish" ? TrendingUp :
    influencer.recentStance === "bearish" ? TrendingDown :
    Minus;
  
  const strengthBadgeVariant = 
    influencer.stanceStrength === "high" ? "default" :
    influencer.stanceStrength === "medium" ? "secondary" :
    "outline";

  // Format last update time
  const lastUpdate = new Date(influencer.lastUpdate);
  const hoursAgo = Math.floor((Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60));
  const timeAgo = hoursAgo < 1 ? "Just now" : 
                  hoursAgo === 1 ? "1 hour ago" : 
                  hoursAgo < 24 ? `${hoursAgo} hours ago` :
                  `${Math.floor(hoursAgo / 24)} days ago`;

  return (
    <Card className="hover:border-primary/50 transition-all duration-300 group">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          {/* Rank Badge */}
          <div className="flex-shrink-0">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold ${
              rank <= 3 ? "bg-primary/20 text-primary border-2 border-primary" :
              "bg-muted text-muted-foreground"
            }`}>
              {rank}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src={influencer.avatar} 
                alt={influencer.name}
                className="w-16 h-16 rounded-full border-2 border-border"
              />
              {influencer.verified && (
                <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-1">
                  <CheckCircle className="h-4 w-4 text-primary-foreground" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {influencer.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {influencer.handle}
                </p>
              </div>
              <Badge variant="outline" className="flex-shrink-0 text-xs">
                {influencer.platform}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-3">
              <div>
                <p className="text-xs text-muted-foreground">Followers</p>
                <p className="text-sm font-semibold text-foreground">
                  {formatFollowers(influencer.followers)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Influence</p>
                <div className="flex items-center gap-1">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${influencer.influenceScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {influencer.influenceScore}
                  </span>
                </div>
              </div>
            </div>

            {/* Stance */}
            <div className="mt-3 flex items-center gap-2">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border ${stanceColor} transition-colors`}>
                <StanceIcon className="h-4 w-4" />
                <span className="text-xs font-medium capitalize">
                  {influencer.recentStance}
                </span>
              </div>
              <Badge variant={strengthBadgeVariant} className="text-xs">
                {influencer.stanceStrength} confidence
              </Badge>
            </div>

            <p className="text-xs text-muted-foreground mt-2">
              Updated {timeAgo}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
