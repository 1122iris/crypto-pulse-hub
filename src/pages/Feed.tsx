import { RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { InsightCard } from "@/components/InsightCard";
import { useCryptoAdvices } from "@/hooks/useCryptoAdvices";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { useState, useEffect } from "react";

const Feed = () => {
  const { data: cryptoData, isLoading, error, refetch } = useCryptoAdvices();
  const [showLoading, setShowLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  // Show loading animation for at least 2 seconds on first load
  useEffect(() => {
    if (!isLoading && cryptoData) {
      const timer = setTimeout(() => {
        setShowLoading(false);
        // Small delay before showing content for smooth transition
        setTimeout(() => setShowContent(true), 100);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, cryptoData]);

  const handleRefresh = async () => {
    const result = await refetch();
    if (result.isSuccess) {
      toast({
        title: "Data refreshed",
        description: `Loaded ${result.data.length} investment signals`,
      });
    }
  };

  // Get last update time from query
  const lastUpdate = cryptoData ? new Date() : null;

  // Show loading animation on initial load or when still loading
  if (isLoading || showLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation
        onRefresh={handleRefresh}
        isRefreshing={false}
        lastUpdate={lastUpdate}
        hasData={!!cryptoData && cryptoData.length > 0}
      />

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-6 py-6 max-w-4xl">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Connection Error
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                {error instanceof Error ? error.message : "Failed to load data"}
              </p>
              <Button onClick={handleRefresh} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content - Feed Layout */}
      {!error && cryptoData && cryptoData.length > 0 && (
        <div className="container mx-auto px-6 py-6 max-w-4xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Latest Investment Insights
            </h2>
            <p className="text-muted-foreground">
              AI-powered recommendations based on social media sentiment analysis
            </p>
          </div>

          <div className="space-y-6">
            {cryptoData.map((crypto, index) => (
              <div
                key={crypto.symbol}
                className={`animate-slide-up-fade stagger-${Math.min(index + 1, 5)}`}
              >
                <InsightCard {...crypto} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
