import { useState, useEffect } from "react";
import { CryptoCard, Recommendation, Strength } from "@/components/CryptoCard";
import { RecommendationPanel } from "@/components/RecommendationPanel";
import { TrendingUp } from "lucide-react";

interface CryptoData {
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

const MOCK_DATA: CryptoData[] = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: 67245.32,
    change: 3.24,
    recommendation: "buy",
    strength: "high",
    reasoning:
      "Strong bullish sentiment detected across major social platforms. Whale accumulation patterns indicate institutional confidence. Technical indicators show sustained momentum above key resistance levels. Twitter mentions up 45% with predominantly positive sentiment. On-chain metrics suggest healthy network activity.",
    sentiment: 78,
    volume: "$31.2B",
    marketCap: "$1.32T",
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: 3542.89,
    change: 2.15,
    recommendation: "buy",
    strength: "medium",
    reasoning:
      "Reddit communities showing increased discussion around upcoming network upgrades. Developer activity remains strong. Social sentiment positive but slightly cautious due to network congestion concerns. Trading volume steady with growing DeFi integration mentions.",
    sentiment: 65,
    volume: "$15.8B",
    marketCap: "$425B",
  },
  {
    symbol: "SOL",
    name: "Solana",
    price: 142.67,
    change: -1.23,
    recommendation: "hold",
    strength: "medium",
    reasoning:
      "Mixed signals from social media. Strong ecosystem growth mentioned frequently, but recent network stability concerns tempering enthusiasm. Technical analysis suggests consolidation phase. Influencer sentiment divided between bullish long-term and cautious short-term outlook.",
    sentiment: 52,
    volume: "$2.4B",
    marketCap: "$65B",
  },
  {
    symbol: "ADA",
    name: "Cardano",
    price: 0.58,
    change: -2.45,
    recommendation: "hold",
    strength: "low",
    reasoning:
      "Sentiment weakening on Twitter and Reddit. Development progress updates generating mixed reactions. Price action showing indecision. Recommendation to wait for clearer signals before taking position. Community discussions focusing on competitor comparison.",
    sentiment: 45,
    volume: "$385M",
    marketCap: "$20.4B",
  },
  {
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.15,
    change: -4.67,
    recommendation: "sell",
    strength: "high",
    reasoning:
      "Sharp decline in social media engagement. Influencer mentions dropping significantly. Technical breakdown below support levels. Sentiment analysis shows growing negative bias. Meme-driven momentum fading with no fundamental catalysts on horizon.",
    sentiment: 28,
    volume: "$842M",
    marketCap: "$21.5B",
  },
];

const Index = () => {
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData>(MOCK_DATA[0]);
  const [cryptoData, setCryptoData] = useState<CryptoData[]>(MOCK_DATA);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCryptoData((prev) =>
        prev.map((crypto) => ({
          ...crypto,
          price: crypto.price * (1 + (Math.random() - 0.5) * 0.002),
          change: crypto.change + (Math.random() - 0.5) * 0.2,
          sentiment: Math.max(
            0,
            Math.min(100, crypto.sentiment + (Math.random() - 0.5) * 2)
          ),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Update selected crypto when data changes
  useEffect(() => {
    const updated = cryptoData.find((c) => c.symbol === selectedCrypto.symbol);
    if (updated) {
      setSelectedCrypto(updated);
    }
  }, [cryptoData, selectedCrypto.symbol]);

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
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">Live</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Crypto List */}
          <div className="lg:col-span-1 space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-foreground mb-1">
                Top Signals
              </h2>
              <p className="text-sm text-muted-foreground">
                Real-time recommendations from social sentiment
              </p>
            </div>

            <div className="space-y-3">
              {cryptoData.map((crypto) => (
                <CryptoCard
                  key={crypto.symbol}
                  {...crypto}
                  isSelected={selectedCrypto.symbol === crypto.symbol}
                  onClick={() => setSelectedCrypto(crypto)}
                />
              ))}
            </div>
          </div>

          {/* Right Panel - Detailed View */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-border bg-card overflow-hidden h-full shadow-lg">
              <RecommendationPanel {...selectedCrypto} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
