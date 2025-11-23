import { RefreshCw, AlertCircle, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { CompactCryptoCard } from "@/components/CompactCryptoCard";
import { useCryptoAdvices } from "@/hooks/useCryptoAdvices";

const Dashboard = () => {
  const { data: cryptoData, isLoading, error, refetch } = useCryptoAdvices();

  const handleRefresh = async () => {
    const result = await refetch();
    if (result.isSuccess) {
      toast({
        title: "Data refreshed",
        description: `Loaded ${result.data.length} investment signals`,
      });
    }
  };

  // Calculate statistics
  const stats = cryptoData
    ? {
        buy: cryptoData.filter((c) => c.recommendation === "buy").length,
        hold: cryptoData.filter((c) => c.recommendation === "hold").length,
        sell: cryptoData.filter((c) => c.recommendation === "sell").length,
        avgChange:
          cryptoData.reduce((sum, c) => sum + c.change, 0) / cryptoData.length,
      }
    : null;

  const lastUpdate = cryptoData ? new Date() : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading portfolio data...</p>
        </div>
      </div>
    );
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
        <div className="container mx-auto px-6 py-6">
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

      {/* Main Content - Dashboard Layout */}
      {!error && cryptoData && cryptoData.length > 0 && (
        <div className="container mx-auto px-6 py-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Portfolio Dashboard
            </h2>
            <p className="text-muted-foreground">
              Quick overview of all tracked cryptocurrencies
            </p>
          </div>

          {/* Statistics Bar */}
          {stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">
                  Buy Signals
                </div>
                <div className="text-2xl font-bold text-primary">
                  {stats.buy}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">
                  Hold Signals
                </div>
                <div className="text-2xl font-bold text-warning">
                  {stats.hold}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1">
                  Sell Signals
                </div>
                <div className="text-2xl font-bold text-destructive">
                  {stats.sell}
                </div>
              </div>
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  Avg Change
                </div>
                <div
                  className={`text-2xl font-bold ${
                    stats.avgChange >= 0 ? "text-primary" : "text-destructive"
                  }`}
                >
                  {stats.avgChange >= 0 ? "+" : ""}
                  {stats.avgChange.toFixed(2)}%
                </div>
              </div>
            </div>
          )}

          {/* Crypto Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cryptoData.map((crypto) => (
              <CompactCryptoCard key={crypto.symbol} {...crypto} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
