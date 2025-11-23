import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, TrendingDown, DollarSign, Bitcoin, Zap } from "lucide-react";

interface StopLossDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  symbol: string;
  currentPrice: number;
}

export const StopLossDialog = ({ open, onOpenChange, symbol, currentPrice }: StopLossDialogProps) => {
  const [takeProfitPrice, setTakeProfitPrice] = useState(currentPrice * 1.15);
  const [stopLossPrice, setStopLossPrice] = useState(currentPrice * 0.85);
  const [takeProfitPercent, setTakeProfitPercent] = useState(15);
  const [stopLossPercent, setStopLossPercent] = useState(15);

  const handleTakeProfitPercentChange = (value: number[]) => {
    const percent = value[0];
    setTakeProfitPercent(percent);
    setTakeProfitPrice(currentPrice * (1 + percent / 100));
  };

  const handleStopLossPercentChange = (value: number[]) => {
    const percent = value[0];
    setStopLossPercent(percent);
    setStopLossPrice(currentPrice * (1 - percent / 100));
  };

  const handleSave = () => {
    // Fake save - just show success message
    console.log("Saved:", { symbol, takeProfitPrice, stopLossPrice });
    onOpenChange(false);
  };

  const profitAmount = takeProfitPrice - currentPrice;
  const lossAmount = currentPrice - stopLossPrice;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] overflow-hidden relative">
        {/* Animated Background Bitcoin Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <Bitcoin className="absolute top-10 -left-10 h-40 w-40 animate-[spin_20s_linear_infinite]" />
          <Bitcoin className="absolute bottom-10 -right-10 h-32 w-32 animate-[spin_15s_linear_infinite_reverse]" />
          <Zap className="absolute top-1/2 left-1/4 h-16 w-16 text-primary animate-pulse" />
        </div>

        <DialogHeader className="relative">
          <DialogTitle className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl animate-pulse" />
              <Bitcoin className="h-6 w-6 text-primary animate-[spin_3s_linear_infinite] relative" />
            </div>
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              设置止盈止损 - {symbol}
            </span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4 relative">
          {/* Current Price */}
          <div className="rounded-lg bg-gradient-to-br from-primary/10 via-muted/50 to-primary/5 p-4 border border-primary/20 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <div className="flex items-center justify-between relative">
              <div className="flex-1">
                <div className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
                  <Zap className="h-3 w-3 text-primary animate-pulse" />
                  当前价格
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                  ${currentPrice.toLocaleString()}
                </div>
              </div>
              <Bitcoin className="h-12 w-12 text-primary/20 animate-[spin_4s_linear_infinite]" />
            </div>
          </div>

          {/* Take Profit */}
          <div className="space-y-3 p-4 rounded-lg border border-green-500/20 bg-green-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-2 relative">
              <div className="p-1.5 rounded-full bg-green-500/20">
                <TrendingUp className="h-4 w-4 text-green-500 animate-pulse" />
              </div>
              <Label className="text-base font-semibold">止盈设置</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="takeProfit">目标价格</Label>
              <Input
                id="takeProfit"
                type="number"
                value={takeProfitPrice.toFixed(2)}
                onChange={(e) => {
                  const price = parseFloat(e.target.value);
                  setTakeProfitPrice(price);
                  setTakeProfitPercent(((price - currentPrice) / currentPrice) * 100);
                }}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <Label>涨幅百分比</Label>
                <span className="text-green-500 font-semibold">+{takeProfitPercent.toFixed(1)}%</span>
              </div>
              <Slider
                value={[takeProfitPercent]}
                onValueChange={handleTakeProfitPercentChange}
                min={1}
                max={100}
                step={1}
                className="py-4"
              />
              <div className="text-xs text-muted-foreground text-right">
                预计收益: +${profitAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Stop Loss */}
          <div className="space-y-3 p-4 rounded-lg border border-red-500/20 bg-red-500/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <div className="flex items-center gap-2 relative">
              <div className="p-1.5 rounded-full bg-red-500/20">
                <TrendingDown className="h-4 w-4 text-red-500 animate-pulse" />
              </div>
              <Label className="text-base font-semibold">止损设置</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="stopLoss">止损价格</Label>
              <Input
                id="stopLoss"
                type="number"
                value={stopLossPrice.toFixed(2)}
                onChange={(e) => {
                  const price = parseFloat(e.target.value);
                  setStopLossPrice(price);
                  setStopLossPercent(((currentPrice - price) / currentPrice) * 100);
                }}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <Label>跌幅百分比</Label>
                <span className="text-red-500 font-semibold">-{stopLossPercent.toFixed(1)}%</span>
              </div>
              <Slider
                value={[stopLossPercent]}
                onValueChange={handleStopLossPercentChange}
                min={1}
                max={50}
                step={1}
                className="py-4"
              />
              <div className="text-xs text-muted-foreground text-right">
                最大损失: -${lossAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </div>
            </div>
          </div>

          {/* Risk/Reward Ratio */}
          <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 p-4 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="flex items-center justify-between relative">
              <div>
                <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                  <Zap className="h-3 w-3 text-primary" />
                  风险收益比
                </div>
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
                  1 : {(profitAmount / lossAmount).toFixed(2)}
                </div>
              </div>
              <Bitcoin className="h-10 w-10 text-primary/30 animate-[spin_5s_linear_infinite]" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 relative">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button className="flex-1 relative overflow-hidden group" onClick={handleSave}>
            <span className="relative z-10">保存设置</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-green-500 to-primary bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite]" />
            <Zap className="h-4 w-4 ml-2 relative z-10 animate-pulse" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
