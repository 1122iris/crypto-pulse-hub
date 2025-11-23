import { TrendingUp, RefreshCw } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdate: Date | null;
  hasData: boolean;
}

export function Navigation({
  onRefresh,
  isRefreshing,
  lastUpdate,
  hasData,
}: NavigationProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
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

            <nav className="hidden md:flex items-center gap-1">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                Insights
              </NavLink>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/20 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )
                }
              >
                Dashboard
              </NavLink>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {lastUpdate && (
              <div className="text-xs text-muted-foreground hidden sm:block">
                Updated: {lastUpdate.toLocaleTimeString()}
              </div>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="gap-2"
            >
              <RefreshCw
                className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            {hasData && (
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  Live
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="flex md:hidden items-center gap-1 mt-3 pt-3 border-t border-border">
          <NavLink
            to="/"
            className={({ isActive }) =>
              cn(
                "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors text-center",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            Insights
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              cn(
                "flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors text-center",
                isActive
                  ? "bg-primary/20 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )
            }
          >
            Dashboard
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
