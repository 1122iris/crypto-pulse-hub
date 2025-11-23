import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { SentimentDataPoint, SentimentEvent } from "@/lib/mockSentiment";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, TrendingDown, AlertCircle } from "lucide-react";

interface SentimentChartProps {
  data: SentimentDataPoint[];
  events: SentimentEvent[];
  title: string;
  description?: string;
  showPrice?: boolean;
}

export function SentimentChart({ data, events, title, description, showPrice = false }: SentimentChartProps) {
  // Format data for display
  const chartData = data.map((point, index) => {
    const date = new Date(point.timestamp);
    const hasEvent = events.some(e => 
      Math.abs(new Date(e.timestamp).getTime() - date.getTime()) < 60 * 60 * 1000
    );
    
    return {
      time: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: date.toLocaleString(),
      sentiment: point.sentiment,
      price: point.price,
      hasEvent,
    };
  });

  // Sample data for display (show every 4th point to reduce clutter)
  const displayData = chartData.filter((_, i) => i % 4 === 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const sentiment = data.sentiment;
      const sentimentColor = sentiment > 70 ? "text-primary" : sentiment < 40 ? "text-destructive" : "text-warning";
      
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-xs text-muted-foreground mb-2">{data.fullDate}</p>
          <div className="space-y-1">
            <p className={`text-sm font-semibold ${sentimentColor}`}>
              Sentiment: {sentiment.toFixed(1)}
            </p>
            {showPrice && (
              <p className="text-sm text-foreground">
                Price: ${data.price.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  // Calculate trend
  const firstSentiment = data[0]?.sentiment || 50;
  const lastSentiment = data[data.length - 1]?.sentiment || 50;
  const sentimentChange = lastSentiment - firstSentiment;
  const trend = sentimentChange > 0 ? "up" : sentimentChange < 0 ? "down" : "stable";

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              {title}
              {trend === "up" && <TrendingUp className="h-5 w-5 text-primary" />}
              {trend === "down" && <TrendingDown className="h-5 w-5 text-destructive" />}
            </CardTitle>
            {description && (
              <CardDescription className="mt-1">{description}</CardDescription>
            )}
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-foreground">
              {lastSentiment.toFixed(1)}
            </p>
            <p className={`text-sm ${sentimentChange > 0 ? "text-primary" : sentimentChange < 0 ? "text-destructive" : "text-muted-foreground"}`}>
              {sentimentChange > 0 ? "+" : ""}{sentimentChange.toFixed(1)} pts
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={displayData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              domain={[0, 100]}
              stroke="hsl(var(--muted-foreground))"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
              iconType="line"
            />
            
            {/* Reference lines for sentiment zones */}
            <ReferenceLine y={70} stroke="hsl(var(--primary))" strokeDasharray="3 3" strokeOpacity={0.3} />
            <ReferenceLine y={50} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" strokeOpacity={0.3} />
            <ReferenceLine y={30} stroke="hsl(var(--destructive))" strokeDasharray="3 3" strokeOpacity={0.3} />
            
            <Line 
              type="monotone" 
              dataKey="sentiment" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={(props: any) => {
                if (props.payload.hasEvent) {
                  return (
                    <circle 
                      cx={props.cx} 
                      cy={props.cy} 
                      r={6} 
                      fill="hsl(var(--warning))"
                      stroke="hsl(var(--background))"
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              }}
              name="Sentiment Score"
            />
            {showPrice && (
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                yAxisId="right"
                name="Price"
                hide
              />
            )}
          </LineChart>
        </ResponsiveContainer>
        
        {/* Event markers */}
        {events.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-4 w-4 text-warning" />
              <h4 className="text-sm font-medium text-foreground">Key Events</h4>
            </div>
            <div className="space-y-2">
              {events.slice(0, 3).map((event, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs">
                  <div className={`w-2 h-2 rounded-full mt-1 flex-shrink-0 ${
                    event.type === "positive" ? "bg-primary" : 
                    event.type === "negative" ? "bg-destructive" : "bg-muted-foreground"
                  }`} />
                  <div className="flex-1">
                    <p className="text-muted-foreground">
                      {new Date(event.timestamp).toLocaleString('en-US', { 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    <p className="text-foreground">{event.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
