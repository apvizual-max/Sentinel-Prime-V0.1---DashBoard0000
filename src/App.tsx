import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { 
  Terminal, Activity, Lock, BrainCircuit, Cpu, Eye, Network, Globe, 
  Waves, Compass, Hexagon, CircleDashed, ListOrdered, AlertTriangle, 
  Server, Database, BookOpen, Layers, LayoutTemplate, Crosshair, Check, Copy, Bot,
  Monitor, Zap, Gauge, Play, TrendingUp, ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SentinelDataLog } from './components/SentinelDataLog';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { STRATEGY_CODE } from './constants/strategy';
import { SENTINEL_MODULES, CIPHER_STRATEGIES, OMEGA_TURTLE_STRATEGIES } from './constants/indicators';
import { 
  DOCS_MD, LOSS_REPORT_MD, VISUALS_MD, 
  AGENT_PRIMING_MD, CIPHER_TURTLE_MD, MC_RESEARCH_MD, MARKET_CIPHER_INTEGRATION_TAB_MD,
  MARKET_CIPHER_INTEGRATION_MD, DEEP_DATA_EXTRACTION_MD
} from './constants/markdown';

const VULNERABILITY_LOG = [
    "SYNC_DELAY_CVD: 14ms latency in Binance/Bybit cross-delta mapping.",
    "SLIPPAGE_BIAS: 0.4% unaccounted slippage on SOL/USD limit clusters.",
    "ORACLE_DRIFT: Chainlink V3 heartbeat lag during high-frequency volatility.",
    "HFT_SHADOWING: MEV bots frontrunning entry nodes on decentralized routing.",
    "GAMMA_EXPOSURE: Unhedged gamma in the Omega risk-pool during Sunday gaps.",
    "ORDER_BOOK_DENSITY: Fragile liquidity at 0.5% depth on Kraken spot feed.",
    "Z-SCORE_ANOMALY: Statistical outlier bias in the Mean Reversion module.",
    "VWAP_CENTROID_DRIFT: Anchor point drift leading to false mean-reversion signals.",
    "MARCH_2020_SKEW: Heavy historical bias in backtest weights for long regimes.",
    "API_QUOTA_CEILING: Exchange rate limit caps preventing FoT execution.",
    "COLD_START_LATENCY: Node initialization delay in the first 100 ticks.",
    "CROSS_EXCHANGE_ARB: Price discrepancies causing signal jitter in the Cortex.",
    "LIQUIDITY_VOID_REFILL: Delayed detection of spoofed orders in the S/R channel.",
    "NEURAL_OVERFIT: Gradient descent bias toward recent price action.",
    "MA_CONVERGENCE_LAG: Moving average crossover delays in 4h regimes.",
    "TRAP_VALIDATION_ERROR: False stop-gun identification during wick expansion.",
    "DELTA_DENSITY_CAPPED: Truncated Buy/Sell volume data in sub-tick shards.",
    "QUANTUM_WINDOW_LEAK: Frequency leak outside the designated trade gates.",
    "DBS_SENTIMENT_NOISE: Social scraping sentiment drift on low-cap assets.",
    "EXECUTION_STREAM_DESYNC: Delayed visual feedback in the Sovereign C2 dashboard."
];
const PROPOSALS = [
    "DYNAMIC_HURST: Auto-adjust entry gates based on active Hurst exponent.",
    "GHOST_NODE_INTEGRITY: Implement zero-tick cloaking for all limit orders.",
    "VORTEX_CONFLUENCE_SCALING: Double bias weight during Vortex Synergy overlaps.",
    "OMEGA_CLOAK_V2: Hide all C2 telemetry from public exchange scrapers.",
    "QUANTUM_ENTROPY_FILTER: Apply Shannon entropy filters to the Micro-Shard.",
    "INSTITUTIONAL_HEARTBEAT: Extract heartbeat pulses from Whale wallet activity.",
    "AIR_GAP_ORACLE: Integrate decentralised air-gap oracles for bias safety.",
    "ATR_VOLLEY_SCALING: Scale entry size based on the ATR/SMA volatility ratio.",
    "REGIME_DETECTION_AI: Auto-switch between Scalp/Swing modes using LLM logic.",
    "STOP_GUN_INVERSION: Trade the reversal of STOP_TRAP signals.",
    "DELTA_FLIP_CONFIRMATION: Require 3-tick delta flip before V2 execution.",
    "Z-SCORE_CALIBRATION_OFF: Manual offset for Mean Reversion during trend-extension.",
    "MULTI_NODE_CONSENSUS: Require 7/11 Shard consensus for foT orders.",
    "SENTINEL_DASHBOARD_3D: Implement GL-rendering for the Vortex matrix.",
    "TA_VAMA_RESTRICTION: Enforce ta.vwma standards across all community modules.",
    "MFI_FLOW_DIVERGENCE: Add hidden MFI divergence alerts to the Vision Set.",
    "FIBO_TIME_PYRAMID: Integrate time-based Fibonacci projections for exits.",
    "DARK_POOL_SURVEILLANCE: Monitor non-displayed liquidity in the Matrix.",
    "ALPHA_SYNC_V3: Upgrade cross-pair correlation factors in the Dashboard.",
    "SOVEREIGN_LEGEND_PERSISTENCE: Implement browser-cache state for legend drag."
];
const PROPRIETARY_LINKS = [
    "https://www.youtube.com/watch?v=bxkm4Kjubqs",
    "https://www.youtube.com/watch?v=3_uxBnfdUbk",
    "https://www.youtube.com/watch?v=YoCBxKncrV4",
    "https://www.youtube.com/watch?v=bXS8ELP7Arw",
    "https://www.youtube.com/watch?v=Ysqsy3atinU",
    "https://www.youtube.com/watch?v=a7RAbpFe7ek",
    "https://www.youtube.com/watch?v=nO-9QTqt1fo",
    "https://www.youtube.com/watch?v=QzI_3HK2uHo",
    "https://www.youtube.com/watch?v=G6Nrac0AZ44",
    "https://www.youtube.com/watch?v=bxoKtZx_KkQ",
    "https://www.youtube.com/watch?v=PL_uFIpNS-w",
    "https://www.youtube.com/watch?v=droZPe64lhE",
    "https://www.youtube.com/watch?v=JG5CJJ79T90",
    "https://www.youtube.com/shorts/8uSWW0h3Mh0",
    "https://www.youtube.com/watch?v=AmWNX4iOojc",
    "https://www.youtube.com/watch?v=7U8zYPnqeco",
    "https://www.youtube.com/watch?v=qOcmFI6CNWs",
    "https://www.youtube.com/watch?v=seMjDTLZW_Y",
    "https://www.youtube.com/watch?v=DYW_M-hoOn8"
];
import { EVOLUTION_PROPOSALS_MD } from './constants/proposals';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STYLE_METRICS = {
  scalp: { 
    label: 'Scalp Assessment', 
    tf: '1s - 5m', 
    views: ['5s', '1m', '15m'],
    shards: ['HFT Speed', 'Sub-Tick Delta', 'CVD Velocity', 'Liquidity Sweep'],
    visionSet: ['Sub-Tick Heatmap', 'Order Book Imbalance', 'Tick Velocity', 'Thermal Jitter Grid']
  },
  dayTrade: { 
    label: 'Day Trade Trend', 
    tf: '5m - 30m', 
    views: ['15m', '1h', '1d'],
    shards: ['SR Channel', 'VWAP Centroid', 'Volume Oscillator', 'Pivot Break', 'DBSI Sentiment'],
    visionSet: ['Volume Centroids', 'S/R Channel Depth', 'Daily Bias', 'Institutional Blocks']
  },
  swing: { 
    label: 'Swing Reversion', 
    tf: '1h - 4h', 
    views: ['1h', '4h', '1d'],
    shards: ['Hurst persistence', 'HTF Bias', 'ATR Expansion', 'Volume Profile', 'FDI Market Randomness'],
    visionSet: ['Hurst Persistence', 'Macro Structure', 'Volatilty Surface', 'Fractal Dimension Index']
  },
  invest: { 
    label: 'Institutional Invest', 
    tf: '1d+', 
    views: ['1d', '1w', '1M'],
    shards: ['Log Curvature', 'Cycle Mapping', 'On-Chain Flow', 'Whale Tracking', 'Z-Score Mean Dev'],
    visionSet: ['Logarithmic Growth', 'Cycle Fractal', 'Whale Wallets', 'Gaussian Normalization']
  }
};

const SovereignLegend = () => (
  <motion.div 
    drag
    dragMomentum={false}
    initial={{ x: 24, y: -24 }}
    className="fixed bottom-6 left-6 z-[100] bg-[#050505]/90 backdrop-blur-xl border border-[#00FFFF]/20 p-5 rounded-2xl w-72 shadow-[0_0_50px_rgba(0,0,0,0.8)] cursor-grab active:cursor-grabbing hover:border-[#00FFFF]/40 transition-colors"
  >
    {/* (Rest of SovereignLegend...) */}
  </motion.div>
);

export default function App() {
  // ... (Full original App content follows, ending at line 1682)
}
