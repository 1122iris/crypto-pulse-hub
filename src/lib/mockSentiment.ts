/**
 * Mock sentiment data for demo purposes
 */

export interface SentimentDataPoint {
  date: string;
  timestamp: number;
  sentiment: number; // 0-100
  price: number;
  volume: number;
}

export interface SentimentEvent {
  date: string;
  timestamp: number;
  title: string;
  type: "positive" | "negative" | "neutral";
  impact: number; // sentiment change
}

export interface MultiCoinSentiment {
  symbol: string;
  name: string;
  currentSentiment: number;
  change24h: number;
  trend: "up" | "down" | "stable";
}

/**
 * Generate mock sentiment timeline data
 */
export function generateSentimentTimeline(
  symbol: string,
  days: number = 7
): { data: SentimentDataPoint[]; events: SentimentEvent[] } {
  const now = Date.now();
  const data: SentimentDataPoint[] = [];
  const events: SentimentEvent[] = [];
  
  let baseSentiment = 50 + Math.random() * 30; // 50-80 base
  
  // Generate hourly data points
  const hoursToGenerate = days * 24;
  
  for (let i = hoursToGenerate; i >= 0; i--) {
    const timestamp = now - i * 60 * 60 * 1000;
    const date = new Date(timestamp).toISOString();
    
    // Random walk with mean reversion
    const change = (Math.random() - 0.5) * 8;
    const meanReversion = (60 - baseSentiment) * 0.1;
    baseSentiment = Math.max(20, Math.min(95, baseSentiment + change + meanReversion));
    
    // Simulate price correlation with some lag
    const priceBase = symbol === "BTC" ? 67000 : symbol === "ETH" ? 3500 : 140;
    const priceVariation = (baseSentiment - 50) / 100;
    const price = priceBase * (1 + priceVariation + (Math.random() - 0.5) * 0.02);
    
    data.push({
      date,
      timestamp,
      sentiment: Math.round(baseSentiment * 10) / 10,
      price: Math.round(price * 100) / 100,
      volume: Math.round(Math.random() * 1000000000),
    });
    
    // Randomly add events (lower probability)
    if (Math.random() < 0.05) {
      const eventTypes: Array<"positive" | "negative" | "neutral"> = ["positive", "negative", "neutral"];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const impact = (Math.random() - 0.5) * 20;
      
      events.push({
        date,
        timestamp,
        title: generateEventTitle(symbol, eventType),
        type: eventType,
        impact,
      });
      
      // Apply impact to sentiment
      baseSentiment = Math.max(20, Math.min(95, baseSentiment + impact));
    }
  }
  
  return { data, events };
}

function generateEventTitle(symbol: string, type: "positive" | "negative" | "neutral"): string {
  const positiveEvents = [
    `Major ${symbol} whale accumulation detected`,
    `${symbol} mentioned by industry leader`,
    `Institutional buying surge for ${symbol}`,
    `${symbol} technical breakout confirmed`,
    `Positive ${symbol} development announcement`,
  ];
  
  const negativeEvents = [
    `Large ${symbol} sell-off detected`,
    `${symbol} faces regulatory concerns`,
    `Negative sentiment spike on ${symbol}`,
    `${symbol} whale distribution detected`,
    `FUD spreading about ${symbol}`,
  ];
  
  const neutralEvents = [
    `${symbol} consolidation phase`,
    `Mixed signals on ${symbol}`,
    `${symbol} sideways movement continues`,
    `Market indecision on ${symbol}`,
  ];
  
  if (type === "positive") return positiveEvents[Math.floor(Math.random() * positiveEvents.length)];
  if (type === "negative") return negativeEvents[Math.floor(Math.random() * negativeEvents.length)];
  return neutralEvents[Math.floor(Math.random() * neutralEvents.length)];
}

/**
 * Generate multi-coin sentiment comparison
 */
export function generateMultiCoinSentiment(): MultiCoinSentiment[] {
  const coins = [
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "XRP", name: "Ripple" },
    { symbol: "BNB", name: "Binance Coin" },
  ];
  
  return coins.map(coin => {
    const sentiment = 40 + Math.random() * 50; // 40-90
    const change24h = (Math.random() - 0.5) * 30;
    
    return {
      symbol: coin.symbol,
      name: coin.name,
      currentSentiment: Math.round(sentiment * 10) / 10,
      change24h: Math.round(change24h * 10) / 10,
      trend: change24h > 5 ? "up" : change24h < -5 ? "down" : "stable",
    };
  });
}
