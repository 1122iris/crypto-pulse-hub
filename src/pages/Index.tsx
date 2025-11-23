import { useState, useEffect } from "react";
import { CryptoCard } from "@/components/CryptoCard";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { TrendingUp, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { fetchLatestAdvices, ApiError } from "@/lib/api";
import { CryptoData, TOKEN_NAMES } from "@/types/crypto";
import {
  MOCK_PRICES,
  generateMockPriceChange,
  calculateSentiment,
} from "@/lib/mockPrices";

const Index = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  // Load data from API
  const loadAdvices = async (showToast = false) => {
    try {
      setIsRefreshing(true);
      setError(null);

      const advices = await fetchLatestAdvices();

      if (advices.length === 0) {
        setError("No investment advice available. Please check backend data.");
        setCryptoData([]);
        setSelectedCrypto(null);
        return;
      }

      // Transform API data to CryptoData format
      const transformed: CryptoData[] = advices.map((advice) => {
        const mockPrice = MOCK_PRICES[advice.symbol] || {
          price: 0,
          volume: "N/A",
          marketCap: "N/A",
        };

        return {
          symbol: advice.symbol,
          name: TOKEN_NAMES[advice.symbol] || advice.symbol,
          price: mockPrice.price,
          change: generateMockPriceChange(),
          recommendation: advice.advice_action,
          strength: advice.advice_strength,
          reasoning: advice.reason,
          sentiment: calculateSentiment(
            advice.advice_action,
            advice.advice_strength
          ),
          volume: mockPrice.volume,
          marketCap: mockPrice.marketCap,
          predictedAt: advice.predicted_at,
        };
      });

      setCryptoData(transformed);
      
      // Auto-select first crypto if none selected
      if (!selectedCrypto || !transformed.find(c => c.symbol === selectedCrypto.symbol)) {
        setSelectedCrypto(transformed[0]);
      }

      setLastUpdate(new Date());

      if (showToast) {
        toast({
          title: "Data refreshed",
          description: `Loaded ${transformed.length} investment signals`,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : "Failed to load investment advice";

      setError(errorMessage);
      console.error("Failed to fetch advices:", err);

      if (showToast) {
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadAdvices();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadAdvices();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Update selected crypto when data changes
  useEffect(() => {
    if (selectedCrypto) {
      const updated = cryptoData.find((c) => c.symbol === selectedCrypto.symbol);
      if (updated) {
        setSelectedCrypto(updated);
      }
    }
  }, [cryptoData]);

  const handleRefresh = () => {
    loadAdvices(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading investment signals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Crypto Signals
                </h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Investment Dashboard
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {lastUpdate && (
                <div className="text-xs text-muted-foreground hidden sm:block">
                  Updated: {lastUpdate.toLocaleTimeString()}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              {!error && cryptoData.length > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm text-muted-foreground">Live</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Error State */}
      {error && (
        <div className="container mx-auto px-6 py-6">
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-6 flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                Connection Error
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{error}</p>
              <Button onClick={handleRefresh} size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!error && cryptoData.length > 0 && (
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Crypto List */}
            <div className="lg:col-span-1 space-y-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-foreground mb-1">
                  Latest Signals
                </h2>
                <p className="text-sm text-muted-foreground">
                  {cryptoData.length} active recommendations
                </p>
              </div>

              <div className="space-y-3">
                {cryptoData.map((crypto) => (
                  <CryptoCard
                    key={crypto.symbol}
                    {...crypto}
                    isSelected={selectedCrypto?.symbol === crypto.symbol}
                    onClick={() => setSelectedCrypto(crypto)}
                  />
                ))}
              </div>
            </div>

            {/* Right Panel - Detailed View */}
            <div className="lg:col-span-2">
              {selectedCrypto ? (
                <div className="rounded-lg border border-border bg-card overflow-hidden h-full shadow-lg">
                  <RecommendationPanel {...selectedCrypto} />
                </div>
              ) : (
                <div className="rounded-lg border border-border bg-card p-12 flex items-center justify-center h-full">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select a token to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
