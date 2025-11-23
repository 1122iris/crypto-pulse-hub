import { useQuery } from "@tanstack/react-query";
import { fetchLatestAdvices } from "@/lib/api";
import { CryptoData, TOKEN_NAMES } from "@/types/crypto";
import {
  MOCK_PRICES,
  generateMockPriceChange,
  calculateSentiment,
} from "@/lib/mockPrices";

export function useCryptoAdvices() {
  const query = useQuery({
    queryKey: ["crypto-advices"],
    queryFn: async () => {
      const advices = await fetchLatestAdvices();

      if (advices.length === 0) {
        throw new Error("No investment advice available. Please check backend data.");
      }

      // Transform API data to CryptoData format
      const transformed: CryptoData[] = advices.map((advice) => {
        const mockData = MOCK_PRICES[advice.symbol] || {
          volume: "N/A",
          marketCap: "N/A",
        };

        return {
          symbol: advice.symbol,
          name: TOKEN_NAMES[advice.symbol] || advice.symbol,
          price: advice.price ?? 0, // Use API price, fallback to 0 if not available
          change: generateMockPriceChange(),
          recommendation: advice.advice_action,
          strength: advice.advice_strength,
          reasoning: advice.reason,
          sentiment: calculateSentiment(
            advice.advice_action,
            advice.advice_strength
          ),
          volume: mockData.volume,
          marketCap: mockData.marketCap,
          predictedAt: advice.predicted_at,
        };
      });

      return transformed;
    },
    refetchInterval: 30000, // Auto-refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });

  return query;
}
