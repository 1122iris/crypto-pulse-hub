/**
 * Mock price data for tokens
 * In production, this should be replaced with real price API (e.g., CoinGecko, Binance)
 */
export const MOCK_PRICES: Record<string, { price: number; volume: string; marketCap: string }> = {
  USDT: {
    price: 1.0,
    volume: "$45.2B",
    marketCap: "$95.4B",
  },
  BTC: {
    price: 67245.32,
    volume: "$31.2B",
    marketCap: "$1.32T",
  },
  ETH: {
    price: 3542.89,
    volume: "$15.8B",
    marketCap: "$425B",
  },
  USDC: {
    price: 1.0,
    volume: "$8.3B",
    marketCap: "$36.7B",
  },
  SOL: {
    price: 142.67,
    volume: "$2.4B",
    marketCap: "$65B",
  },
  XRP: {
    price: 0.52,
    volume: "$1.8B",
    marketCap: "$28.4B",
  },
  ZEC: {
    price: 28.45,
    volume: "$42M",
    marketCap: "$452M",
  },
  BNB: {
    price: 312.45,
    volume: "$680M",
    marketCap: "$48.2B",
  },
  DOGE: {
    price: 0.15,
    volume: "$842M",
    marketCap: "$21.5B",
  },
};

/**
 * Generate mock price change
 */
export function generateMockPriceChange(): number {
  return (Math.random() - 0.5) * 10; // -5% to +5%
}

/**
 * Calculate sentiment score from advice
 */
export function calculateSentiment(
  action: string,
  strength: string
): number {
  let base = 50;
  
  // Adjust based on action
  switch (action) {
    case "buy":
      base = 70;
      break;
    case "hold":
      base = 50;
      break;
    case "sell":
      base = 30;
      break;
  }

  // Adjust based on strength
  switch (strength) {
    case "high":
      base += 15;
      break;
    case "medium":
      base += 5;
      break;
    case "low":
      base -= 5;
      break;
  }

  return Math.min(100, Math.max(0, base));
}
