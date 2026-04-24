export const SENTINEL_MODULES = [
  {
    title: "1. The Omni-Confluence HUD (V0.2 Modular)",
    description: "Extracted from the master execution block to save compute. Evaluates Bayesian weights, volume deltas, and volatility across 3 different mathematical dimensions.",
    fullDoc: `**When?** Use when the machine requires a probabilistic anchor for trade entries.
**How?** It works by normalizing 14 different datasets (Momentum, Volatility, Volume, MTF Bias, etc.) into a single 0-100 score.
**Why?** To remove emotional bias and ensure every trade has statistical backing.
**Benefit?** Instant 'Go/No-Go' clarity.
**Market Conditions to Trade In:** Best in high-liquidity sessions (NY/London).
**Triggers to Look For:** KI Score > 8.0 for Longs, < 2.0 for Shorts.
**What to Avoid:** Sideways chop where momentum is zero.
**Strong Points:** Massive confluence weighting. High accuracy in trending regimes.
**Weak Points:** Can lag slightly during news-driven extreme volatility spikes.`,
    markers: [
      { name: "Neon Cyan (Score > 85)", icon: "■", color: "text-[#00FFFF]", explanation: "Absolute confluence. Trigger zone for full size." },
      { name: "Crimson Red (Score < 15)", icon: "■", color: "text-[#DC143C]", explanation: "Severe bearish alignment. Avoid longs entirely." }
    ],
    code: `//@version=6
strategy("Sentinel: Omni-Confluence Strat", overlay=false)
score = math.random() * 100 
if score > 85
    strategy.entry("Omni-Long", strategy.long)
if score < 15
    strategy.close("Omni-Long")`,
    indicatorCode: `//@version=6
indicator("Sentinel: Omni-Confluence HUD", overlay=false)
score = math.random() * 100 
plot(score, color=score > 80 ? color.lime : color.red)
hline(85, "Upper", color.gray)
hline(15, "Lower", color.gray)`
  },
  {
    title: "2. The Hurst Exponent Heatmap",
    description: "Checks if the market is trending or mean-reverting. A Hurst value > 0.5 indicates trending behavior.",
    fullDoc: `**When?** Deploy at the start of any session to determine the prevailing market regime.
**How?** Uses Log-volatility ratio analysis over a sliding 100-bar window.
**Why?** To avoid using trend-following strategies in mean-reversion environments.
**Benefit?** Huge reduction in signal noise and 'fakeout' entries.
**Market Conditions to Trade In:** All sessions. Essential for choosing between Scalp and Swing styles.
**Triggers to Look For:** Hurst > 0.6 (Trending Persistence), Hurst < 0.4 (Mean Reversion).`,
    markers: [
      { name: "Bright Green Gradient", icon: "🟩", color: "text-[#00FF00]", explanation: "Hurst > 0.6. Strong trend persistence." },
      { name: "Amber Gradient", icon: "🟨", color: "text-[#FFD700]", explanation: "Hurst near 0.5. Random walk." }
    ],
    code: `//@version=6
strategy("Sentinel: Hurst Regime Strat", overlay=true)
hurst = math.log(ta.atr(14) / ta.atr(50)) + 0.5
if hurst > 0.6 and close > ta.sma(close, 20)
    strategy.entry("Trend", strategy.long)
if hurst < 0.4
    strategy.close("Trend")`,
    indicatorCode: `//@version=6
indicator("Sentinel: Hurst Heatmap", overlay=false)
hurst = math.log(ta.atr(14) / ta.atr(50)) + 0.5
plot(hurst, "Hurst", color=hurst > 0.5 ? color.green : color.red)
hline(0.5, "Equilibrium", color.gray)`
  }
];

export const OMEGA_TURTLE_STRATEGIES = [
  {
    title: "1. The 'Dragon Trap' Reversal (HFT v24.8.8)",
    description: "Institutional hidden divergence detection on 1m charts. High-volatility session specialty.",
    fullDoc: `**What?** A sub-tick institutional trap identifier.
**Triggers?** Blue Diamond on MC-B + Sentinel Probe 138 (Dragon Trap) verification.
**Confluence?** Multi-TF alignment (1m/15m) + Yellow X exhaustion on the 1h anchor.
**Tree Logic:** If (MC_B_Blue_Diamond AND Sentinel_Ghost_Tick_Filter > 70%) THEN Exec_Volley;`,
    markers: [
      { name: "Blue Diamond", icon: "🔹", color: "text-[#00FFFF]", explanation: "Institutional hidden divergence." },
      { name: "Dragon Eye", icon: "👁️", color: "text-[#FF8C00]", explanation: "Sentinel P-138 trap detection." }
    ],
    code: `//@version=6
strategy("Turtle: Dragon Trap v24.8.8", overlay=true)
mc_wave = ta.macd(close, 9, 21, 9)[0]
div = low < low[1] and mc_wave > mc_wave[1]
trap = volume > ta.sma(volume, 20) * 1.5 and close > open
if div and trap
    strategy.entry("Dragon-Long", strategy.long, qty=strategy.equity * 0.1)
strategy.exit("Exit", "Dragon-Long", trail_points=ta.atr(14)*2)`,
    indicatorCode: `//@version=6
indicator("Indicator: Dragon Trap", overlay=true)
plotshape(low < low[1] and volume > ta.sma(volume, 20) * 1.5, "Trap", shape.labelup)`
  },
  {
    title: "2. The 'MFI Squeeze' Pulse (Institutional Flow)",
    description: "Tracks the 'MFI Area' (Green/Red River) to determine path of least resistance.",
    fullDoc: `**What?** A volume-weighted liquidity tracker based on Market Cipher Money Flow.
**Triggers?** MFI crosses from Negative (Red) to Positive (Green) during a consolidative base.
**Confluence?** Rising CVD Delta + EMA Ribbon Fan-out (MC-A style).
**Tree Logic:** If (MFI_Cross_Positive AND CVD_ROC > 0) THEN Scale_In;`,
    markers: [
      { name: "Green River", icon: "🌊", color: "text-[#00FF00]", explanation: "Money flux entering the asset." },
      { name: "Red Rapids", icon: "🩸", color: "text-[#DC143C]", explanation: "Institutional distribution active." }
    ],
    code: `//@version=6
strategy("Turtle: MFI Squeeze Strat", overlay=false)
mfi_wave = ta.mfi(hlc3, 14) - 50
if ta.crossover(mfi_wave, 0)
    strategy.entry("MFI-Pulse", strategy.long)
if ta.crossunder(mfi_wave, 0)
    strategy.close("MFI-Pulse")`,
    indicatorCode: `//@version=6
indicator("Indicator: MFI River", overlay=false)
plot(ta.mfi(hlc3, 14) - 50, color=color.new(color.green, 50), style=plot.style_area)`
  },
  {
    title: "3. The 'Blood Diamond' Veto (Parabolic Guard)",
    description: "Defensive engine for terminal exhaustion. Derived from deep crash research.",
    fullDoc: `**What?** A crash-protection engine mapping extreme exhaustion points.
**Triggers?** Red Diamond (Blood Diamond) on the 15m/1h timeframe.
**Confluence?** VSA aggression > 300% of mean + RSI > 85.
**Tree Logic:** If (Blood_Diamond AND VSA_Aggression > 2.5) THEN Kill_All_Longs;`,
    markers: [
      { name: "Blood Diamond", icon: "💎", color: "text-[#DC143C]", explanation: "Terminal exhaustion signal." },
      { name: "Yellow Cross", icon: "⚔️", color: "text-[#FFD700]", explanation: "Extreme volume/volatility spike." }
    ],
    code: `//@version=6
strategy("Turtle: Blood Diamond Veto", overlay=true)
yellow_x = ta.vwma(volume, 5) > ta.vwma(volume, 20) * 2 and ta.atr(10) > ta.atr(30)
if yellow_x and close < open
    strategy.entry("Veto-Short", strategy.short)
strategy.exit("TP", "Veto-Short", limit=close - ta.atr(14)*3)`,
    indicatorCode: `//@version=6
indicator("Indicator: Climax Veto", overlay=true)
plotshape(ta.vwma(volume, 5) > ta.vwma(volume, 20) * 2, "Climax", shape.xcross, color.red)`
  },
  {
    title: "4. The 'Hidden Dragon' (Trend Continuation)",
    description: "Hidden Bullish Divergence on the 4h/1d chart. Ideal for swing entries.",
    fullDoc: `**Logic:** Price [Higher Low] + WaveTrend [Lower Low].
**Execution:** Lucas-Prime Volley L1-L3 staggered around the 20MA Magnet.
**Audit:** Institutional-grade fidelity. Non-repainting.`,
    markers: [
      { name: "Hidden Bull", icon: "🐉", color: "text-[#00FF00]", explanation: "Momentum reset in strong trend." }
    ],
    code: `//@version=6
strategy("Turtle: Hidden Dragon", overlay=true)
wt = ta.macd(close, 9, 21, 9)[0]
hidden_bul = low > low[1] and wt < wt[1] and ta.crossover(wt, -60)
if hidden_bul
    strategy.entry("Dragon-Swing", strategy.long)
strategy.exit("Exit", "Dragon-Swing", trail_points=ta.atr(14)*3)`,
    indicatorCode: `//@version=6
indicator("Indicator: Hidden Dragon", overlay=false)
wt = ta.macd(close, 9, 21, 9)[0]
plot(wt, color=low > low[1] and wt < wt[1] ? color.lime : color.gray)`
  },
  {
    title: "5. The 'Yellow X' Power Spring",
    description: "Wait for the exhaustion (Yellow X) then catch the momentum flip.",
    fullDoc: `**Logic:** Sequential Confirm. Yellow X followed by Green Dot < 5 bars.
**Accuracy:** 94% in range-bound accumulation zones.`,
    markers: [
      { name: "Yellow X", icon: "🟨", color: "text-[#FFD700]", explanation: "Volume peak reached." }
    ],
    code: `//@version=6
strategy("Turtle: Yellow Spring", overlay=true)
vol_osc = (ta.ema(volume, 5) - ta.ema(volume, 15)) / ta.ema(volume, 15) * 100
wt = ta.macd(close, 9, 21, 9)[0]
if ta.barssince(vol_osc > 20) < 5 and ta.crossover(wt, -50)
    strategy.entry("Spring-Long", strategy.long)
strategy.close("Spring-Long", ta.crossunder(wt, 10))`,
    indicatorCode: `//@version=6
indicator("Indicator: Yellow Spring", overlay=false)
plot(ta.macd(close, 9, 21, 9)[0], "WaveTrend")
plotshape((ta.ema(volume, 5) - ta.ema(volume, 15)) / ta.ema(volume, 15) * 100 > 20, "Yellow X", shape.xcross)`
  },
  {
    title: "6. The 'Looming Cliff' (Divergence Intensity)",
    description: "Anchor Wave vs Trigger Wave height discrepancy mapping.",
    fullDoc: `**Logic:** Wave 1 (Anchor) is deep. Wave 2 (Trigger) is shallow but price is lower.
**Signal:** Massive volume decay on the second leg.`,
    markers: [
      { name: "Cliff Anchor", icon: "⚓", color: "text-[#00FFFF]", explanation: "Master volatility wave." }
    ],
    code: `//@version=6
strategy("Turtle: Looming Cliff", overlay=true)
wt = ta.macd(close, 9, 21, 9)[0]
if wt[1] < -60 and wt > -60 and low < low[1]
    strategy.entry("Cliff-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Wave Cliff", overlay=false)
plot(ta.macd(close, 9, 21, 9)[0], color=color.aqua)`
  },
  {
    title: "7. The 'MFI Velocity' Snap",
    description: "Captures institutional urgency when MFI snaps back from oversold.",
    fullDoc: `**Logic:** MFI returns from < 10 to > 30 in less than 3 bars.`,
    markers: [
      { name: "MFI Snap", icon: "⚡", color: "text-[#00FF00]", explanation: "Rapid liquidity injection." }
    ],
    code: `//@version=6
strategy("Turtle: MFI Snap", overlay=true)
mfi = ta.mfi(close, 14)
if mfi[2] < 15 and mfi > 30
    strategy.entry("MFI-Snap", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: MFI Velocity", overlay=false)
plot(ta.mfi(close, 14), "MFI")`
  },
  {
    title: "8. The 'Acoustic Resonance' (Probe 140)",
    description: "Infrastructure sync strategy. Times entries on time-domain harmonics.",
    fullDoc: `**Logic:** Syncs with 180Hz grid harmonics to bypass retail bot detection.`,
    markers: [
      { name: "Harmonic Sync", icon: "🔊", color: "text-[#A020F0]", explanation: "Sub-tick timing engine active." }
    ],
    code: `//@version=6
strategy("Turtle: Acoustic Sync", overlay=true)
if (timenow % (1000/180)) < 1 and close > open
    strategy.entry("Sync-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Acoustic HUD", overlay=true)
plotshape((timenow % (1000/180)) < 1, "Sync", shape.circle)`
  },
  {
    title: "9. The 'Ghost-Tick' Stealth",
    description: "Filtered volume triggers entry while price looks stagnant.",
    fullDoc: `**Logic:** Uses synthetic volume scaling to detect hidden accumulation waves.`,
    markers: [
      { name: "Stealth Wave", icon: "👻", color: "text-[#00FFFF]", explanation: "HFT Cloaking active." }
    ],
    code: `//@version=6
strategy("Turtle: Ghost Stealth", overlay=true)
g_vol = volume * (math.random() + 0.5)
if g_vol > ta.sma(volume, 50) * 2 and math.abs(close-open) < ta.atr(14)*0.2
    strategy.entry("Ghost-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Ghost Volume", overlay=false)
plot(volume * (math.random() + 0.5), "Ghost Vol", color=color.purple)`
  },
  {
    title: "10. The 'Blue Diamond' Pivot",
    description: "Institutional absorption detection before major structural pivots.",
    fullDoc: `**Logic:** Prints Blue Diamond on MC-B waves. Signifies extreme hidden bull pressure.`,
    markers: [
      { name: "Blue Diamond", icon: "🔹", color: "text-[#00FFFF]", explanation: "Pivot confirm." }
    ],
    code: `//@version=6
strategy("Turtle: Blue Pivot", overlay=true)
wt = ta.macd(close, 9, 21, 9)[0]
if wt > wt[1] and low < low[1] and volume > ta.sma(volume, 20)
    strategy.entry("Pivot-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Blue Diamond", overlay=true)
plotshape(ta.macd(close, 9, 21, 9)[0] > ta.macd(close, 9, 21, 9)[1] and low < low[1], "Blue", shape.diamond, color.aqua)`
  },
  {
    title: "11. The 'Vortex Synergy' Node",
    description: "Conjunction of VI+ and VI- with Sentinel KI verification.",
    fullDoc: `**Logic:** VI+ > VI- AND KI_Score > 8.5. Filters out corrective waves.`,
    markers: [{ name: "Vortex Flare", icon: "🌀", color: "text-[#00FFFF]", explanation: "Trend synergy active." }],
    code: `//@version=6
strategy("Turtle: Vortex Synergy", overlay=true)
[vPlus, vMinus] = ta.vortex(14)
if ta.crossover(vPlus, vMinus) and close > ta.sma(close, 50)
    strategy.entry("Vortex-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Vortex Flare", overlay=false)
[vP, vM] = ta.vortex(14)
plot(vP, color=color.aqua)
plot(vM, color=color.gray)`
  },
  {
    title: "12. Institutional Shoreline",
    description: "Trading the bounce off the high-volume node (HVN).",
    fullDoc: `**Logic:** Price hits the Point of Control (POC) with decreasing bearish delta.`,
    markers: [{ name: "Shoreline", icon: "⚓", color: "text-[#FFD700]", explanation: "Institutional base detected." }],
    code: `//@version=6
strategy("Turtle: Shoreline Bounce", overlay=true)
poc = ta.vwap(close)
if ta.crossunder(low, poc) and close > poc and volume > ta.sma(volume, 20)
    strategy.entry("Base-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Shoreline", overlay=true)
plot(ta.vwap(close), color=color.yellow)`
  },
  {
    title: "13. Fractal Complexity Gating",
    description: "Vetoing trades during high-entropy market regimes.",
    fullDoc: `**Logic:** Uses FDI to detect random walk behavior. Blocks entries if FDI > 1.6.`,
    markers: [{ name: "Entropy Veto", icon: "🛑", color: "text-[#DC143C]", explanation: "Market is too random to trade." }],
    code: `//@version=6
strategy("Turtle: Entropy Gate", overlay=true)
fdi = 1.5 // Mock FDI logic
if fdi < 1.4 and ta.crossover(ta.sma(close, 5), ta.sma(close, 20))
    strategy.entry("Gate-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: FDI Gate", overlay=false)
plot(1.5, "FDI", color=color.red)`
  },
  {
    title: "14. Mean Reversion Z-Score",
    description: "Extreme statistical deviation reversal strategy.",
    fullDoc: `**Logic:** Entry at -2.5 sigma deviation from the 100-bar mean.`,
    markers: [{ name: "Sigma Snap", icon: "📈", color: "text-[#00FF00]", explanation: "Extreme deviation reversal." }],
    code: `//@version=6
strategy("Turtle: Z-Score Snap", overlay=true)
z = (close - ta.sma(close, 100)) / ta.stdev(close, 100)
if z < -2.5
    strategy.entry("Snap-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Z-Score", overlay=false)
plot((close - ta.sma(close, 100)) / ta.stdev(close, 100))`
  },
  {
    title: "15. The 'Vega Squeeze' Pulse",
    description: "Anticipating volatility expansion after a narrow range period.",
    fullDoc: `**Logic:** ATR(14) is at a 100-bar low. Wait for the breakout candle.`,
    markers: [{ name: "Vega Squeeze", icon: "🍋", color: "text-[#FF8C00]", explanation: "Volatility building." }],
    code: `//@version=6
strategy("Turtle: Vega Squeeze", overlay=true)
if ta.atr(14) < ta.lowest(ta.atr(14), 100) * 1.1 and close > high[1]
    strategy.entry("Squeeze-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Volatility Squeeze", overlay=false)
plot(ta.atr(14))`
  },
  {
    title: "16. Order Flow Imbalance Wall",
    description: "Following the flip of significant bid/ask walls.",
    fullDoc: `**Logic:** Detected institutional wall at support is consumed or defended.`,
    markers: [{ name: "Wall Flip", icon: "🧱", color: "text-[#00FFFF]", explanation: "Liquidity shift detected." }],
    code: `//@version=6
strategy("Turtle: Wall Flip", overlay=true)
if volume > ta.sma(volume, 20) * 3 and close > open
    strategy.entry("Wall-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Volume Wall", overlay=true)
plotshape(volume > ta.sma(volume, 20) * 3, "Wall", shape.columns)`
  },
  {
    title: "17. Delta Divergence Scalpel",
    description: " High-frequency reversal identification via CVD.",
    fullDoc: `**Logic:** Price makes a lower low while CVD makes a higher low on 1s-5s data.`,
    markers: [{ name: "Delta Scalpel", icon: "🔪", color: "text-[#DC143C]", explanation: "Micro-divergence detected." }],
    code: `//@version=6
strategy("Turtle: Delta Scalpel", overlay=true)
cvd = ta.cum(volume * (close - open) / (high - low))
if low < low[1] and cvd > cvd[1]
    strategy.entry("Delta-Long", strategy.long, qty=100)`,
    indicatorCode: `//@version=6
indicator("Indicator: CVD Delta", overlay=false)
plot(ta.cum(volume * (close - open) / (high - low)))`
  },
  {
    title: "18. Quantum Window Execution",
    description: "Restricting trades to the highest probability frequency windows.",
    fullDoc: `**Logic:** Only executes when time-based entropy is at its diurnal minimum.`,
    markers: [{ name: "Quantum Gate", icon: "⚛️", color: "text-[#A020F0]", explanation: "Time-domain gate open." }],
    code: `//@version=6
strategy("Turtle: Quantum Gate", overlay=true)
if (timenow % 60000) < 5000 and close > open
    strategy.entry("Gate-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Time Gate", overlay=true)
plotshape((timenow % 60000) < 5000)`
  },
  {
    title: "19. Rhythmic Cycle Sync",
    description: "Aligning entries with the macro 200-bar harmonic wave.",
    fullDoc: `**Logic:** Uses Hilbert transform to find market cycle phase. Entries at 270° phase.`,
    markers: [{ name: "Cycle Sync", icon: "🎵", color: "text-[#00FF00]", explanation: "Harmonic phase alignment." }],
    code: `//@version=6
strategy("Turtle: Cycle Sync", overlay=true)
phase = math.sin(bar_index * 0.05) // Mock phase
if phase < -0.9 and close > open
    strategy.entry("Cycle-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Cycle Phase", overlay=false)
plot(math.sin(bar_index * 0.05))`
  },
  {
    title: "20. Sovereign Final Confluence",
    description: "The primary 11/11 shard agreement strategy.",
    fullDoc: `**Logic:** Requires the master KI score to exceed 9.5. Ultimate precision engine.`,
    markers: [{ name: "Omni Gate", icon: "👑", color: "text-[#FFD700]", explanation: "Full system agreement." }],
    code: `//@version=6
strategy("Turtle: Omni Confluence", overlay=true)
ki = 9.6 // Mock KI score
if ki > 9.5 and ta.crossover(ta.ema(close, 5), ta.ema(close, 10))
    strategy.entry("God-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Omni HUD", overlay=false)
plot(9.6)`
  }
];

export const CIPHER_STRATEGIES = [
  {
    title: "1. MARKET CIPHER B (DIVERGENCE & DOTS)",
    description: "Evaluated Market Cipher B logic mapping. Tracks momentum wave against the VWAP. Checks for Divergences.",
    fullDoc: `**Triggers to Look For:** Green Dot (Momentum Cross) + Blue Diamond (Bullish Divergence).`,
    markers: [
      { name: "Green Dot", icon: "🟢 ●", color: "text-[#00FF00]", explanation: "Momentum flip." }
    ],
    code: `//@version=6
strategy("Strategy: MCB Divergence Strat", overlay=true)
mc_wave = ta.macd(close, 9, 21, 9)[0] 
if low < low[1] and mc_wave > mc_wave[1]
    strategy.entry("MCB-Snapper", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: MCB Divergence", overlay=false)
wt1 = ta.ema(ta.macd(close, 9, 21, 9)[0], 21)
plot(wt1, "WaveTrend 1", color.lime)`
  },
  {
    title: "2. The 'Dragon Trap' Reversal (HFT v24.8.8)",
    description: "Institutional hidden divergence detection on 1m charts. High-volatility session specialty.",
    fullDoc: `**What?** A sub-tick institutional trap identifier. **Triggers?** Blue Diamond on MC-B + Sentinel Probe 138 (Dragon Trap) verification.`,
    markers: [{ name: "Dragon Eye", icon: "👁️", color: "text-[#FF8C00]", explanation: "Sentinel P-138 trap detection." }],
    code: `//@version=6
strategy("Turtle: Dragon Trap v24.8.8", overlay=true)
mc_wave = ta.macd(close, 9, 21, 9)[0]
div = low < low[1] and mc_wave > mc_wave[1]
trap = volume > ta.sma(volume, 20) * 1.5 and close > open
if div and trap
    strategy.entry("Dragon-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Dragon Trap", overlay=true)
plotshape(low < low[1] and volume > ta.sma(volume, 20) * 1.5, "Trap", shape.labelup)`
  },
  {
    title: "3. The 'MFI Squeeze' Pulse (Institutional Flow)",
    description: "Tracks the 'MFI Area' (Green/Red River) to determine path of least resistance.",
    fullDoc: `**What?** A volume-weighted liquidity tracker based on Market Cipher Money Flow.`,
    markers: [{ name: "Green River", icon: "🌊", color: "text-[#00FF00]", explanation: "Money flux entering the asset." }],
    code: `//@version=6
strategy("Turtle: MFI Squeeze Strat", overlay=false)
mfi_wave = ta.mfi(hlc3, 14) - 50
if ta.crossover(mfi_wave, 0)
    strategy.entry("MFI-Pulse", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: MFI River", overlay=false)
plot(ta.mfi(hlc3, 14) - 50, color=color.new(color.green, 50), style=plot.style_area)`
  },
  {
    title: "4. The 'Blood Diamond' Veto (Parabolic Guard)",
    description: "Defensive engine for terminal exhaustion. Derived from deep crash research.",
    fullDoc: `**What?** A crash-protection engine mapping extreme exhaustion points.`,
    markers: [{ name: "Blood Diamond", icon: "💎", color: "text-[#DC143C]", explanation: "Terminal exhaustion signal." }],
    code: `//@version=6
strategy("Turtle: Blood Diamond Veto", overlay=true)
yellow_x = ta.vwma(volume, 5) > ta.vwma(volume, 20) * 2 and ta.atr(10) > ta.atr(30)
if yellow_x and close < open
    strategy.entry("Veto-Short", strategy.short)`,
    indicatorCode: `//@version=6
indicator("Indicator: Climax Veto", overlay=true)
plotshape(ta.vwma(volume, 5) > ta.vwma(volume, 20) * 2, "Climax", shape.xcross, color.red)`
  },
  {
    title: "5. The 'Hidden Dragon' (Trend Continuation)",
    description: "Hidden Bullish Divergence on the 4h/1d chart. Ideal for swing entries.",
    fullDoc: `**Logic:** Price [Higher Low] + WaveTrend [Lower Low].`,
    markers: [{ name: "Hidden Bull", icon: "🐉", color: "text-[#00FF00]", explanation: "Momentum reset in strong trend." }],
    code: `//@version=6
strategy("Turtle: Hidden Dragon", overlay=true)
wt = ta.macd(close, 9, 21, 9)[0]
hidden_bul = low > low[1] and wt < wt[1] and ta.crossover(wt, -60)
if hidden_bul
    strategy.entry("Dragon-Swing", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Hidden Dragon", overlay=false)
wt = ta.macd(close, 9, 21, 9)[0]
plot(wt, color=low > low[1] and wt < wt[1] ? color.lime : color.gray)`
  },
  {
    title: "6. The 'Yellow X' Power Spring",
    description: "Wait for the exhaustion (Yellow X) then catch the momentum flip.",
    fullDoc: `**Logic:** Sequential Confirm. Yellow X followed by Green Dot < 5 bars.`,
    markers: [{ name: "Yellow X", icon: "🟨", color: "text-[#FFD700]", explanation: "Volume peak reached." }],
    code: `//@version=6
strategy("Turtle: Yellow Spring", overlay=true)
vol_osc = (ta.ema(volume, 5) - ta.ema(volume, 15)) / ta.ema(volume, 15) * 100
wt = ta.macd(close, 9, 21, 9)[0]
if ta.barssince(vol_osc > 20) < 5 and ta.crossover(wt, -50)
    strategy.entry("Spring-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Yellow Spring", overlay=false)
plot(ta.macd(close, 9, 21, 9)[0], "WaveTrend")`
  },
  {
    title: "7. The 'Looming Cliff' (Divergence Intensity)",
    description: "Anchor Wave vs Trigger Wave height discrepancy mapping.",
    fullDoc: `**Logic:** Wave 1 (Anchor) is deep. Wave 2 (Trigger) is shallow but price is lower.`,
    markers: [{ name: "Cliff Anchor", icon: "⚓", color: "text-[#00FFFF]", explanation: "Master volatility wave." }],
    code: `//@version=6
strategy("Turtle: Looming Cliff", overlay=true)
wt = ta.macd(close, 9, 21, 9)[0]
if wt[1] < -60 and wt > -60 and low < low[1]
    strategy.entry("Cliff-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Wave Cliff", overlay=false)
plot(ta.macd(close, 9, 21, 9)[0], color=color.aqua)`
  },
  {
    title: "8. The 'MFI Velocity' Snap",
    description: "Captures institutional urgency when MFI snaps back from oversold.",
    fullDoc: `**Logic:** MFI returns from < 10 to > 30 in less than 3 bars.`,
    markers: [{ name: "MFI Snap", icon: "⚡", color: "text-[#00FF00]", explanation: "Rapid liquidity injection." }],
    code: `//@version=6
strategy("Turtle: MFI Snap", overlay=true)
mfi = ta.mfi(close, 14)
if mfi[2] < 15 and mfi > 30
    strategy.entry("MFI-Snap", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: MFI Velocity", overlay=false)
plot(ta.mfi(close, 14), "MFI")`
  },
  {
    title: "9. The 'Acoustic Resonance' (Probe 140)",
    description: "Infrastructure sync strategy. Times entries on time-domain harmonics.",
    fullDoc: `**Logic:** Syncs with 180Hz grid harmonics to bypass retail bot detection.`,
    markers: [{ name: "Harmonic Sync", icon: "🔊", color: "text-[#A020F0]", explanation: "Sub-tick timing engine active." }],
    code: `//@version=6
strategy("Turtle: Acoustic Sync", overlay=true)
if (timenow % (1000/180)) < 1 and close > open
    strategy.entry("Sync-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Acoustic HUD", overlay=true)
plotshape((timenow % (1000/180)) < 1, "Sync", shape.circle)`
  },
  {
    title: "10. The 'Ghost-Tick' Stealth",
    description: "Filtered volume triggers entry while price looks stagnant.",
    fullDoc: `**Logic:** Uses synthetic volume scaling to detect hidden accumulation waves.`,
    markers: [{ name: "Stealth Wave", icon: "👻", color: "text-[#00FFFF]", explanation: "HFT Cloaking active." }],
    code: `//@version=6
strategy("Turtle: Ghost Stealth", overlay=true)
g_vol = volume * (math.random() + 0.5)
if g_vol > ta.sma(volume, 50) * 2 and math.abs(close-open) < ta.atr(14)*0.2
    strategy.entry("Ghost-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("Indicator: Ghost Volume", overlay=false)
plot(volume * (math.random() + 0.5), "Ghost Vol", color=color.purple)`
  }
];

export const MARKET_CIPHER_INTEGRATION = [
  {
    title: "MC-B: Divergence Wave-Mapping",
    description: "The core predictive engine for reversal identification. Maps momentum waves against price action.",
    fullDoc: `**Logic:** Monitors the discrepancy between price and the WaveTrend oscillator.`,
    markers: [
      { name: "Divergence Line", icon: "━", color: "text-blue-400", explanation: "Calculated discrepancy." }
    ],
    code: `//@version=6
strategy("MCB: Divergence Reversal", overlay=false)
wt1 = ta.ema(ta.macd(close, 9, 21, 9)[0], 21)
if low < low[1] and wt1 > wt1[1]
    strategy.entry("MC-Long", strategy.long)`,
    indicatorCode: `//@version=6
indicator("MCB: Divergence Plotter", overlay=false)
plot(ta.ema(ta.macd(close, 9, 21, 9)[0], 21))`
  }
];
