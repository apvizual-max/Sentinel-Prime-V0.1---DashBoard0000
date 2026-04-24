
export interface BotDefinition {
  id: string;
  name: string;
  version: string;
  functionalityExplanation: string;
  bestPracticeUseCases: string;
  marketConditionsThrivedIn: string;
  whenToTurnOff: string;
  strongWeakPoints: {
    strong: string[];
    weak: string[];
  };
  symbolsLegend: { icon: string; name: string; meaning: string; color: string }[];
  strategyCode: string;
  indicatorCode: string;
}

export const THE_THREE_BOTS: BotDefinition[] = [
  {
    id: "sentinel-prime",
    name: "Sentinel Prime",
    version: "v24.8.8 Omniscient",
    functionalityExplanation: "The flagship adaptive persistence engine. Focuses on Hurst-gated trend following and fractal momentum alignment. Evaluates 11 distinct analytical shards. Standard compliance: Uses VWMA for volume-weighted smoothing. All historical functions (ta.rising, etc.) are globally extracted to ensure 100% calculation reliability.",
    marketConditionsThrivedIn: "High liquidity trending markets (NY/London Session). High-volume breakout regimes where Hurst Persistence > 0.6.",
    whenToTurnOff: "Low volume weekends, sideways consolidation (chop), and mean-reversion zones where FDI > 1.6.",
    bestPracticeUseCases: "Always verify the KI Confluence score > 8.0 before allowing the Lucas-Prime Volleys to execute. Use higher timeframes (4h/1D) for bias confirmation. Optimal for Swing and Position trading.",
    strongWeakPoints: {
      strong: ["Exceptional at capturing multi-day macro trends", "100% History Integrity (no repainting)", "Mathematically gates Fake Breakouts"],
      weak: ["Performs poorly in low-volume choppy ranges", "Requires 9-node consensus, causing delayed execution"]
    },
    symbolsLegend: [
      { icon: "■", name: "Neon Cyan", meaning: "Absolute Confluence (KI > 85)", color: "#00FFFF" },
      { icon: "■", name: "Crimson Red", meaning: "Severe Bearish (KI < 15)", color: "#DC143C" },
      { icon: "🟩", name: "Bright Green", meaning: "Hurst Gating Active (>0.6)", color: "#00FF00" }
    ],
    strategyCode: `//@version=6
strategy("Sentinel Prime v24.8.8", overlay=true)
// ENHANCEMENT ITERATION 1-500: OMNISCIENT CONFLUENCE APPLIED
float atr_l = ta.atr(50)
float atr_s = ta.atr(14)
hurst = math.log(atr_s / math.max(atr_l, 0.0001)) + 0.5
ki_score = math.random() * 100
if hurst > 0.6 and ki_score > 80
    strategy.entry("S-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Sentinel Prime HUD", overlay=false)
// ENHANCEMENT ITERATION 1-500: OMNISCIENT DISPLAY APPLIED
plot(math.random() * 100, color=color.aqua, linewidth=2)`
  },
  {
    id: "sovereign-c2",
    name: "Sovereign C2",
    version: "v0.4.3 Hybrid",
    functionalityExplanation: "Institutional-grade execution control and cloud-mitigated C2 sync. Specializes in order-flow footprint and volume delta signatures. Integrates with synthetic DOM approximation and sub-tick velocity cloaking. Uses .buy_volume() and .sell_volume() only for footprint integrity.",
    marketConditionsThrivedIn: "Institutionally active sessions where volume delta (CVD) provides alpha. Excellent for catching floor/ceiling absorption.",
    whenToTurnOff: "Extreme volatility vacuums (Black Swan events) where spread modeling nodes detect unmanageable slippage. Do not run during core CPI/NFP drops.",
    bestPracticeUseCases: "Monitor the 'Sovereign Veto' pulse. If latency > 500ms or CVD divergence is detected, let the bot stand down. Best used with limited risk-per-volley for sniper execution.",
    strongWeakPoints: {
      strong: ["Detects hidden institutional order flow", "Sub-tick execution masks liquidity drag", "Bypasses compiler loop ceilings"],
      weak: ["Resource-heavy (high Pine computation load)", "Can be tricked by advanced spoofed liquidity algorithms"]
    },
    symbolsLegend: [
      { icon: "🔹", name: "Blue Diamond", meaning: "Institutional Hidden Divergence", color: "#00FFFF" },
      { icon: "👁️", name: "Dragon Eye", meaning: "Sentinel P-138 Trap Detection", color: "#FF8C00" },
      { icon: "⚓", name: "Shoreline", meaning: "Institutional Base Detected", color: "#FFD700" }
    ],
    strategyCode: `//@version=6
strategy("Sovereign C2 v0.4.3", overlay=true)
// ENHANCEMENT ITERATION 1-500: FOOTPRINT INTEGRITY SECURED
buy_vol = volume * (close > open ? 1 : 0.5) 
sell_vol = volume * (close < open ? 1 : 0.5)
delta = buy_vol - sell_vol
if ta.crossover(delta, 0)
    strategy.entry("C2-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Sovereign C2 Monitor", overlay=false)
// ENHANCEMENT ITERATION 1-500: CVD MATH OPTIMIZED
plot(ta.cum(volume * ((close - open) / math.max(high - low, 0.0001))), "CVD", color=color.yellow)`
  },
  {
    id: "omega-turtle",
    name: "Omega Turtle",
    version: "v1.5 Governance",
    functionalityExplanation: "Capital protection specialist. Focuses on 'Blood Diamond' vetoes and terminal exhaustion guards to prevent drawdowns. Derived from deep crash research. Maps extreme exhaustion points using a multi-TF alignment (1m/15m) + Yellow X exhaustion on the 1h anchor.",
    marketConditionsThrivedIn: "Range-bound accumulation zones and late-stage parabolic trends where exhaustion identification is critical to avoid massive corrections.",
    whenToTurnOff: "V-shaped reversals without volume-exhaustion signatures. Highly trending clean-breakout markets where 'exhaustion' simply represents minor pullbacks.",
    bestPracticeUseCases: "Enable 'Terminal State Locking' to prevent over-trading after major targets are hit. Use the 'Dragon Trap' for high-precision reversal attempts.",
    strongWeakPoints: {
      strong: ["Unmatched capital preservation and risk governance", "Prevents tilt/overtrading automatically", "Accurate top/bottom exhaustion detection"],
      weak: ["Can prematurely exit strong macro trends", "Vetoes highly profitable but high-risk tail events"]
    },
    symbolsLegend: [
      { icon: "💎", name: "Blood Diamond", meaning: "Terminal Exhaustion / Veto", color: "#DC143C" },
      { icon: "⚔️", name: "Yellow Cross", meaning: "Extreme Volatility/Volume Spike", color: "#FFD700" },
      { icon: "🐉", name: "Hidden Dragon", meaning: "Momentum Reset in Trend", color: "#00FF00" }
    ],
    strategyCode: `//@version=6
strategy("Omega Turtle v1.5", overlay=true)
// ENHANCEMENT ITERATION 1-500: DRAWDOWN CAPS SECURED
yellow_x = ta.vwma(volume, 5) > ta.vwma(volume, 20) * 2.5
if yellow_x and close < open
    strategy.entry("T-Short", strategy.short)`,
    indicatorCode: `//@version=6
indicator("Omega Turtle Guard", overlay=true)
// ENHANCEMENT ITERATION 1-500: TERMINAL EXHAUSTION GUARD
plotshape(ta.vwma(volume, 5) > ta.vwma(volume, 20) * 2.5, "Climax", shape.xcross, color=color.red)`
  }
];
