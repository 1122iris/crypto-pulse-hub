export type AdviceAction = "buy" | "hold" | "sell";
export type AdviceStrength = "high" | "medium" | "low";

export interface ApiAdvice {
  symbol: string;
  advice_action: AdviceAction;
  advice_strength: AdviceStrength;
  reason: string;
  predicted_at: number; // UNIX timestamp in seconds
  kline_24h?: unknown | null;
}

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  recommendation: AdviceAction;
  strength: AdviceStrength;
  reasoning: string;
  sentiment: number;
  volume: string;
  marketCap: string;
  predictedAt: number;
}

// Token name mapping
export const TOKEN_NAMES: Record<string, string> = {
  USDT: "Tether",
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDC: "USD Coin",
  SOL: "Solana",
  XRP: "Ripple",
  ZEC: "Zcash",
  BNB: "Binance Coin",
  DOGE: "Dogecoin",
};

// Default tracked tokens
export const TRACKED_TOKENS = [
  "USDT",
  "BTC",
  "ETH",
  "USDC",
  "SOL",
  "XRP",
  "ZEC",
  "BNB",
  "DOGE",
] as const;
