import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            设置止盈止损 - {symbol}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Price */}
          <div className="rounded-lg bg-muted/50 p-4">
            <div className="text-sm text-muted-foreground mb-1">当前价格</div>
            <div className="text-2xl font-bold">${currentPrice.toLocaleString()}</div>
          </div>

          {/* Take Profit */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
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
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
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
          <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
            <div className="text-sm text-muted-foreground mb-2">风险收益比</div>
            <div className="text-xl font-bold text-primary">
              1 : {(profitAmount / lossAmount).toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button className="flex-1" onClick={handleSave}>
            保存设置
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
