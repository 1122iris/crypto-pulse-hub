import { Bitcoin, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  // Crypto icons positions (circular)
  const cryptoIcons = [
    { icon: "₿", delay: "0s", color: "text-primary" },
    { icon: "Ξ", delay: "0.2s", color: "text-chart-2" },
    { icon: "◎", delay: "0.4s", color: "text-chart-3" },
    { icon: "✕", delay: "0.6s", color: "text-chart-4" },
    { icon: "Ð", delay: "0.8s", color: "text-chart-5" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Central rotating logo with orbiting crypto icons */}
        <div className="relative w-40 h-40">
          {/* Central logo */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl animate-pulse" />
              <div className="relative p-6 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/40 animate-spin-slow">
                <TrendingUp className="w-12 h-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Orbiting crypto icons */}
          {cryptoIcons.map((crypto, index) => (
            <div
              key={index}
              className="absolute inset-0 animate-orbit"
              style={{
                animationDelay: crypto.delay,
              }}
            >
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 text-2xl font-bold ${crypto.color} drop-shadow-[0_0_8px_currentColor]`}
              >
                {crypto.icon}
              </div>
            </div>
          ))}

          {/* Particle effects */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-primary/60 rounded-full animate-particle"
                style={{
                  top: "50%",
                  left: "50%",
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: "2s",
                }}
              />
            ))}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 space-y-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary rounded-full transition-all duration-300 shadow-[0_0_10px_currentColor] shadow-primary/50"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground text-center animate-pulse">
            Analyzing market sentiment...
          </p>
        </div>
      </div>
    </div>
  );
}
