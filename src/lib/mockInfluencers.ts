/**
 * Mock KOL (Key Opinion Leader) data for demo purposes
 */

export type Stance = "bullish" | "bearish" | "neutral";

export interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  influenceScore: number; // 0-100
  recentStance: Stance;
  stanceStrength: "high" | "medium" | "low";
  lastUpdate: string;
  platform: "Twitter" | "YouTube" | "Telegram" | "Reddit";
  verified: boolean;
}

export interface StanceHistory {
  date: string;
  timestamp: number;
  stance: Stance;
  confidence: number;
  event?: string;
}

export interface WhaleActivity {
  address: string;
  action: "buy" | "sell" | "hold";
  amount: string;
  timestamp: number;
  impact: number; // sentiment impact
}

/**
 * Generate mock influencer data
 */
export function generateInfluencers(): Influencer[] {
  const influencers: Influencer[] = [
    {
      id: "1",
      name: "Changpeng Zhao",
      handle: "@cz_binance",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=CZ",
      followers: 9200000,
      influenceScore: 98,
      recentStance: "bullish",
      stanceStrength: "high",
      lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: true,
    },
    {
      id: "2",
      name: "Vitalik Buterin",
      handle: "@VitalikButerin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vitalik",
      followers: 5400000,
      influenceScore: 96,
      recentStance: "neutral",
      stanceStrength: "medium",
      lastUpdate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: true,
    },
    {
      id: "3",
      name: "Michael Saylor",
      handle: "@saylor",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Saylor",
      followers: 3100000,
      influenceScore: 94,
      recentStance: "bullish",
      stanceStrength: "high",
      lastUpdate: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: true,
    },
    {
      id: "4",
      name: "BitBoy Crypto",
      handle: "@BitBoy_Crypto",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=BitBoy",
      followers: 1800000,
      influenceScore: 88,
      recentStance: "bullish",
      stanceStrength: "medium",
      lastUpdate: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      platform: "YouTube",
      verified: true,
    },
    {
      id: "5",
      name: "Crypto Rover",
      handle: "@rovercrc",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rover",
      followers: 1200000,
      influenceScore: 85,
      recentStance: "bearish",
      stanceStrength: "low",
      lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: true,
    },
    {
      id: "6",
      name: "Crypto Cobain",
      handle: "@CryptoCobain",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Cobain",
      followers: 980000,
      influenceScore: 82,
      recentStance: "neutral",
      stanceStrength: "high",
      lastUpdate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: true,
    },
    {
      id: "7",
      name: "Crypto Wendy O",
      handle: "@CryptoWendyO",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Wendy",
      followers: 850000,
      influenceScore: 79,
      recentStance: "bullish",
      stanceStrength: "medium",
      lastUpdate: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: false,
    },
    {
      id: "8",
      name: "Lark Davis",
      handle: "@TheCryptoLark",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lark",
      followers: 780000,
      influenceScore: 76,
      recentStance: "bullish",
      stanceStrength: "high",
      lastUpdate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      platform: "YouTube",
      verified: true,
    },
    {
      id: "9",
      name: "Ivan on Tech",
      handle: "@IvanOnTech",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ivan",
      followers: 650000,
      influenceScore: 73,
      recentStance: "neutral",
      stanceStrength: "low",
      lastUpdate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      platform: "YouTube",
      verified: true,
    },
    {
      id: "10",
      name: "Ben Armstrong",
      handle: "@Bitboy_Crypto",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ben",
      followers: 620000,
      influenceScore: 70,
      recentStance: "bearish",
      stanceStrength: "medium",
      lastUpdate: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      platform: "Twitter",
      verified: false,
    },
  ];
  
  return influencers;
}

/**
 * Generate stance history for an influencer
 */
export function generateStanceHistory(influencerId: string, days: number = 30): StanceHistory[] {
  const history: StanceHistory[] = [];
  const now = Date.now();
  
  let currentStance: Stance = "neutral";
  
  // Generate daily stance data
  for (let i = days; i >= 0; i--) {
    const timestamp = now - i * 24 * 60 * 60 * 1000;
    const date = new Date(timestamp).toISOString();
    
    // Randomly change stance (20% probability)
    if (Math.random() < 0.2) {
      const stances: Stance[] = ["bullish", "bearish", "neutral"];
      currentStance = stances[Math.floor(Math.random() * stances.length)];
    }
    
    history.push({
      date,
      timestamp,
      stance: currentStance,
      confidence: 60 + Math.random() * 35, // 60-95
      event: Math.random() < 0.15 ? generateStanceEvent(currentStance) : undefined,
    });
  }
  
  return history;
}

function generateStanceEvent(stance: Stance): string {
  const events = {
    bullish: [
      "Posted bullish thread",
      "Announced accumulation",
      "Positive market outlook",
      "Technical analysis bullish",
    ],
    bearish: [
      "Warning of correction",
      "Critical market analysis",
      "Reduced position",
      "Bearish technical signal",
    ],
    neutral: [
      "Awaiting confirmation",
      "Mixed signals analysis",
      "Market consolidation",
      "Wait-and-see approach",
    ],
  };
  
  const eventList = events[stance];
  return eventList[Math.floor(Math.random() * eventList.length)];
}

/**
 * Generate whale activity data
 */
export function generateWhaleActivity(): WhaleActivity[] {
  const activities: WhaleActivity[] = [];
  const now = Date.now();
  
  for (let i = 0; i < 15; i++) {
    const timestamp = now - Math.random() * 7 * 24 * 60 * 60 * 1000;
    const actions: Array<"buy" | "sell" | "hold"> = ["buy", "sell", "hold"];
    const action = actions[Math.floor(Math.random() * actions.length)];
    
    activities.push({
      address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      action,
      amount: `${(Math.random() * 1000 + 100).toFixed(2)} BTC`,
      timestamp,
      impact: action === "buy" ? Math.random() * 15 : action === "sell" ? -Math.random() * 15 : 0,
    });
  }
  
  // Sort by timestamp descending
  activities.sort((a, b) => b.timestamp - a.timestamp);
  
  return activities;
}

/**
 * Format follower count
 */
export function formatFollowers(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}K`;
  }
  return count.toString();
}
