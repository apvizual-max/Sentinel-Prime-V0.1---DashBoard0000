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

// Import our decoupled constants
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

// ══════════════════════════════════════════════════════════════════════════════
// REACT UI DASHBOARD - SENTINEL PRIME V0.4.3 (OMEGA LEVIATHAN CLOUD MITIGATIONS)
// ══════════════════════════════════════════════════════════════════════════════
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
    <div className="flex items-center justify-between mb-4 border-b border-[#1F1F1F] pb-3 select-none">
        <div className="flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#00FFFF] animate-spin-slow" />
            <span className="text-[10px] font-black font-mono text-[#00FFFF] uppercase tracking-[0.2em]">Sovereign Legend Shard</span>
        </div>
        <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-[#00FFFF]/40"></div>
            <div className="w-1 h-1 rounded-full bg-[#00FFFF]/20"></div>
        </div>
    </div>
    <div className="space-y-4">
        <div className="flex items-start gap-3 group">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#00FF00] shadow-[0_0_10px_#00FF00] mt-0.5 group-hover:scale-125 transition-transform"></div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white font-mono leading-none">DEEP GREEN</span>
                <span className="text-[8px] text-[#555] font-mono uppercase mt-0.5 whitespace-nowrap">Institutional Conviction Gate</span>
            </div>
        </div>
        <div className="flex items-start gap-3 group">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#A020F0] shadow-[0_0_10px_#A020F0] mt-0.5 animate-pulse group-hover:scale-125 transition-transform"></div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white font-mono leading-none">BLINKING PURPLE</span>
                <span className="text-[8px] text-[#555] font-mono uppercase mt-0.5 whitespace-nowrap">Exhaustion Veto Invariant</span>
            </div>
        </div>
        <div className="flex items-start gap-3 group">
            <div className="w-2.5 h-2.5 rounded-sm bg-[#DC143C] shadow-[0_0_10px_#DC143C] mt-0.5 group-hover:scale-125 transition-transform"></div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white font-mono leading-none">CRIMSON VOID</span>
                <span className="text-[8px] text-[#555] font-mono uppercase mt-0.5 whitespace-nowrap">Liquidity Trap Detection</span>
            </div>
        </div>
    </div>
    <div className="mt-5 pt-4 border-t border-[#1F1F1F] select-none">
        <div className="flex justify-between items-center text-[8px] font-mono text-[#8E9299] mb-1.5 uppercase tracking-widest">
            <span>Precision Core</span>
            <span className="text-[#00FFFF] font-bold">ALPHA SYNC</span>
        </div>
        <div className="h-1.5 bg-[#0D0D0D] rounded-full overflow-hidden border border-[#141414]">
            <motion.div 
                animate={{ width: ['92%', '98%', '92%'] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="h-full bg-gradient-to-r from-[#00FFFF] to-[#A020F0] shadow-[0_0_10px_#00FFFF]"
            />
        </div>
        <div className="flex justify-between mt-2">
            <span className="text-[7px] font-mono text-[#333]">V24.8.8</span>
            <span className="text-[7px] font-mono text-[#333]">INSTITUTIONAL_GRADE</span>
        </div>
    </div>
  </motion.div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'docs' | 'visuals' | 'strategy' | 'indicators' | 'cipher' | 'cipher-integ' | 'loss' | 'agent' | 'turtle' | 'proposals'>('dashboard');
  const [viewType, setViewType] = useState<'strategy' | 'indicator'>('strategy');
  const [activeStyle, setActiveStyle] = useState<'scalp' | 'dayTrade' | 'swing' | 'invest'>('scalp');
  const [selectedPair, setSelectedPair] = useState('BTCUSD');
  const [pulse, setPulse] = useState(false);
  const [ping, setPing] = useState(12);
  const [bayesian, setBayesian] = useState(68);
  const [bias, setBias] = useState(74);
  const [tick, setTick] = useState(0);

  // Rhythm Engine
  const [rhythm, setRhythm] = useState(0);
  const [rhythmSpeed, setRhythmSpeed] = useState(1);
  const [activeTF, setActiveTF] = useState('15m');

  // Rhythm Engine Synchronization
  useEffect(() => {
    const TF_MAP: Record<string, number> = {
      '1m': 4.0, '5m': 3.2, '15m': 2.5,
      '1h': 1.8, '4h': 1.2, '1d': 1.0,
      '1w': 0.6, '1M': 0.3
    };
    
    const styleMult = activeStyle === 'scalp' ? 1.5 : activeStyle === 'dayTrade' ? 1.0 : activeStyle === 'swing' ? 0.7 : 0.4;
    setRhythmSpeed((TF_MAP[activeTF] || 1) * styleMult);
  }, [activeTF, activeStyle]);


  // Mock sentinel/omega engine signals
  const is_quantum_window = () => (tick % 10 < 3); // Frequency-based window
  const can_fire = () => (Math.random() > 0.85);

  const [shardScores, setShardScores] = useState({ micro: 92, scalp: 85, intra: 45, macro: 70 });
  const [weights, setWeights] = useState({ 
    wyckoff: 1.0, 
    cvd: 1.2, 
    mfi: 0.8, 
    pa: 1.5,
    neural: 1.1,
    vortex: 0.9 
  });
  const [enabledShards, setEnabledShards] = useState({ 
    wyckoff: true, 
    cvd: true, 
    mfi: true, 
    pa: true,
    neural: true,
    vortex: true 
  });

  // Calculate Weighted KI Score for UI with Quantum Window factor
  const quantumFactor = is_quantum_window() ? 1.0 : 0.8;
  const weightedKiScore = (
    (shardScores.micro * (enabledShards.cvd ? weights.cvd : 0) + 
     shardScores.scalp * (enabledShards.pa ? weights.pa : 0) + 
     shardScores.intra * (enabledShards.wyckoff ? weights.wyckoff : 0) + 
     shardScores.macro * (enabledShards.mfi ? weights.mfi : 0) +
     90 * (enabledShards.neural ? weights.neural : 0) +
     75 * (enabledShards.vortex ? weights.vortex : 0)) / 
    ((enabledShards.cvd ? weights.cvd : 0) + 
     (enabledShards.pa ? weights.pa : 0) + 
     (enabledShards.wyckoff ? weights.wyckoff : 0) + 
     (enabledShards.mfi ? weights.mfi : 0) +
     (enabledShards.neural ? weights.neural : 0) +
     (enabledShards.vortex ? weights.vortex : 0) || 1) * 0.1 * quantumFactor
  ).toFixed(2);
  
  // Logical Shard Descriptions for useful data representation
  const SHARD_MAP = {
    micro: [
      { id: 101, n: 'VELO', f: 'Acc-V', d: 'High-frequency Ticks/sec velocity mapping', style: 'scalp' },
      { id: 105, n: 'OFI', f: 'Flow', d: 'Order Flow Imbalance (Wall Press)', style: 'scalp' },
      { id: 110, n: 'NERVE', f: 'Volatility', d: 'Stdev/ATR micro-volatility gate', style: 'scalp' },
      { id: 115, n: 'VOID', f: 'Liquidity', d: 'Micro-structure Gap Scan', style: 'scalp' },
      { id: 120, n: 'ENTR', f: 'Chaos', d: 'Shannon Entropy entry-point signal', style: 'scalp' },
      { id: 121, n: 'THERM', f: 'Cloak', d: 'Thermal Jitter grid smoothing', style: 'scalp' },
      { id: 122, n: 'ACOUS', f: 'Drift', d: 'Sub-tick resonance harmonic analysis', style: 'scalp' },
      ...Array(18).fill({ id: 0, n: 'PROBE', f: 'EXT', d: 'IDLE', style: 'scalp' })
    ],
    scalp: [
      { id: 126, n: 'LUNG', f: 'Panic', d: 'Institutional Absorption (Panic Lungs)', style: 'dayTrade' },
      { id: 130, n: 'DELTA', f: 'Diff', d: 'Cumulative Buy/Sell Delta discrepancy', style: 'dayTrade' },
      { id: 135, n: 'HERD', f: 'Psych', d: 'Retail RSI-Bias herd behavior', style: 'dayTrade' },
      { id: 138, n: 'TRAP', f: 'Liquidity', d: 'Stop-Gun trap validation', style: 'dayTrade' },
      { id: 150, n: 'PEAK', f: 'Exhaust', d: 'Institutional Exhaustion Volume Spike', style: 'dayTrade' },
      { id: 155, n: 'Z-S', f: 'Normal', d: 'Quant-Statistical Mean Deviation', style: 'dayTrade' },
      ...Array(19).fill({ id: 0, n: 'PROBE', f: 'EXT', d: 'IDLE', style: 'dayTrade' })
    ],
    intra: [
      { id: 140, n: 'ECHO', f: 'Acoustic', d: 'Time-domain harmonic resonance detection', style: 'swing' },
      { id: 145, n: 'DISP', f: 'Inst.', d: 'Institutional Spread Dispersion Analysis', style: 'swing' },
      { id: 151, n: 'MIND', f: 'Hurst', d: 'Hurst Exponent Persistence (Trend Strength)', style: 'swing' },
      { id: 155, n: 'VWAP', f: 'Centroid', d: 'VWAP Harmonic Anchor Centroid', style: 'swing' },
      { id: 165, n: 'FDI', f: 'Random', d: 'Fractal Dimension Index (Market Complexity)', style: 'swing' },
      ...Array(20).fill({ id: 0, n: 'PROBE', f: 'EXT', d: 'IDLE', style: 'swing' })
    ],
    macro: [
      { id: 170, n: 'RHYTH', f: 'Fractal', d: 'Macro Cycle Harmonic Rhythmic Analysis', style: 'invest' },
      { id: 175, n: 'FIBO', f: 'Time', d: 'Fibonacci Pivot Time-Cycle Projection', style: 'invest' },
      { id: 180, n: 'WHAL', f: 'Accum', d: 'Whale Wallet Accumulation Mapping', style: 'invest' },
      { id: 190, n: 'MEAN', f: 'Dev', d: 'Statistical Z-Score Mean Reversion', style: 'invest' },
      { id: 200, n: 'VETO', f: 'Guard', d: 'Terminal Exhaustion Safety Veto', style: 'invest' },
      ...Array(20).fill({ id: 0, n: 'PROBE', f: 'EXT', d: 'IDLE', style: 'invest' })
    ]
  };

  const [shardGrids, setShardGrids] = useState({
    micro: Array(25).fill(0), scalp: Array(25).fill(0), intra: Array(25).fill(0), macro: Array(25).fill(0)
  });

  const cybernetic_trail_mod = 0.7; // Simulating the decay
  const i_max_daily_dd = 3.5;
  const current_daily_dd = 0.42;

  // 3. SYNCHRONIZATION ASSESSMENT
  const [resonance, setResonance] = useState(0);
  useEffect(() => {
    const it = setInterval(() => setResonance(Math.sin(Date.now() / 2000) * 0.15), 100);
    return () => clearInterval(it);
  }, []);

  const ki = parseFloat(weightedKiScore);
  const styleShift = activeStyle === 'scalp' ? 1.0 : activeStyle === 'dayTrade' ? 0.7 : activeStyle === 'swing' ? 0.4 : 0.1;
  const syncc_level = Math.max(0, Math.min(10, ((ki * 0.8) + (styleShift * 0.2)) * (1 + resonance)));

  useEffect(() => {
    // Generate initial grids once
    const generateInitialGrid = (score: number) => Array.from({length: 25}, () => Math.random() * 100 < score ? 1 : Math.random() * 100 < 5 ? 2 : 0);
    setShardGrids({
        micro: generateInitialGrid(92), scalp: generateInitialGrid(85), intra: generateInitialGrid(45), macro: generateInitialGrid(70)
    });

    // V24.8.8: Dynamic Update Rates (Prioritizing Scalping but slowing down for readability)
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setPulse(p => !p);
      setPing(Math.floor(Math.random() * 5) + 8);
      
      // Force bias update to prevent static states
      setBias(prev => {
          const shift = (Math.random() - 0.5) * 15;
          const next = Math.min(Math.max(prev + shift, -100), 100);
          return next;
      });
      
      if (Math.random() > 0.4) {
        setBayesian(prev => Math.min(Math.max(prev + (Math.random() > 0.5 ? 2 : -2) * 2, 40), 95));
      }
      
      setShardScores(prev => {
          const factor = activeStyle === 'scalp' ? 1.5 : activeStyle === 'dayTrade' ? 1.0 : 0.5;
          const nextScores = {
              micro: Math.min(100, Math.max(0, prev.micro + (Math.random() - 0.5) * 10 * factor)), // Scalp-優先
              scalp: Math.min(100, Math.max(0, prev.scalp + (Math.random() - 0.5) * 8 * factor)),
              intra: Math.min(100, Math.max(0, prev.intra + (Math.random() - 0.5) * 6 * factor)),
              macro: Math.min(100, Math.max(0, prev.macro + (Math.random() - 0.5) * 4 * factor))
          };

          const generateGrid = (score: number) => Array.from({length: 25}, () => {
              // Decay function: probability of red (2) decreases as tick increases
              const redProb = Math.max(0, 0.06 - (tick * 0.0001)); 
              if (Math.random() < redProb) return 2; 
              if (Math.random() * 100 < score) return 1; 
              return 0; 
          });

          setShardGrids({
              micro: generateGrid(nextScores.micro),
              scalp: generateGrid(nextScores.scalp),
              intra: generateGrid(nextScores.intra),
              macro: generateGrid(nextScores.macro)
          });

          return nextScores;
      });
    }, 4500); // Slowed down from 3s to 4.5s for "High Fidelity" observation
    return () => clearInterval(interval);
  }, [activeStyle]); // Re-sync when style changes

  const [copiedObj, setCopiedObj] = useState<string | null>(null);
  const copyToClipboard = (code: string, objId: string) => {
    navigator.clipboard.writeText(code);
    setCopiedObj(objId);
    setTimeout(() => setCopiedObj(null), 2000);
  };

  const renderNavButton = (id: typeof activeTab, label: string, Icon: React.ElementType, colorClass: { activeBg: string; activeText: string; activeBorder: string; hoverText: string }) => {
    const isActive = activeTab === id;
    return (
      <button 
        onClick={() => setActiveTab(id)} 
        className={cn(
          "px-3 py-2 text-[10px] font-mono uppercase tracking-wider rounded transition-all flex items-center gap-2 border border-transparent whitespace-nowrap",
          isActive 
            ? `${colorClass.activeBg} ${colorClass.activeText} ${colorClass.activeBorder}` 
            : `text-[#8E9299] hover:${colorClass.hoverText} bg-[#0A0A0A]`
        )}
      >
        <Icon className="w-3.5 h-3.5"/> {label}
      </button>
    );
  };

  const vibrationMultiplier = activeStyle === 'scalp' ? 2.5 : activeStyle === 'dayTrade' ? 1.5 : activeStyle === 'swing' ? 0.8 : 0.3;
  const flowSmoothness = activeStyle === 'invest' ? 10 : activeStyle === 'swing' ? 5 : 2;

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] font-sans selection:bg-[#00FFFF] selection:text-black overflow-x-hidden flex flex-col">
      <SovereignLegend />
      <header className="border-b border-[#141414] bg-[#0A0A0A] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-[#00FFFF]/10 rounded-lg border border-[#00FFFF]/30 shadow-[0_0_15px_rgba(0,255,255,0.2)]">
              <Eye className={cn("w-6 h-6 text-[#00FFFF] transition-opacity duration-300", pulse ? "opacity-100" : "opacity-70")} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white uppercase italic">SENTINEL PRIME V0.4.3: OMEGA LEVIATHAN</h1>
              <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono text-[#8E9299] uppercase tracking-widest mt-1">
                <span className="text-[#00FFFF]">Visual Matrix</span><span>|</span>
                <span className="text-[#A020F0]">Sovereign C2</span><span>|</span>
                <span className="text-[#FFD700]">Cloud Webhooks</span><span>|</span>
                <span className="text-[#DC143C]">All Vulnerabilities Mitigated</span>
              </div>
            </div>
          </div>
          <div className="flex bg-[#141414] rounded-lg p-1 border border-[#1F1F1F]">
            <span className="text-[10px] font-mono text-[#8E9299] px-2 py-1">AWS PING: <span className="text-[#00FF00]">{ping}ms</span></span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex-grow">
        {/* Navigation Tabs (9-Tab Layout Restored) */}
        <div className="flex flex-wrap gap-2 border-b border-[#1F1F1F] pb-4 mb-8">
            {renderNavButton('dashboard', 'Dashboards', Monitor, { activeBg: 'bg-[#00FFFF]/10', activeText: 'text-[#00FFFF]', activeBorder: 'border-[#00FFFF]/30', hoverText: 'text-[#00FFFF]' })}
            {renderNavButton('docs', 'Sentinel Map', Globe, { activeBg: 'bg-[#FFD700]/10', activeText: 'text-[#FFD700]', activeBorder: 'border-[#FFD700]/30', hoverText: 'text-[#FFD700]' })}
    {renderNavButton('visuals', 'Visual Paradigm', Eye, { activeBg: 'bg-[#00FF00]/10', activeText: 'text-[#00FF00]', activeBorder: 'border-[#00FF00]/30', hoverText: 'text-[#00FF00]' })}
    {renderNavButton('cipher-integ', 'Market Cipher', Waves, { activeBg: 'bg-[#00FFFF]/10', activeText: 'text-[#00FFFF]', activeBorder: 'border-[#00FFFF]/30', hoverText: 'text-[#00FFFF]' })}
    {renderNavButton('strategy', 'V0.4 Strategy', Terminal, { activeBg: 'bg-white/10', activeText: 'text-white', activeBorder: 'border-white/30', hoverText: 'text-white' })}
            {renderNavButton('indicators', 'Sentinel Modules', Cpu, { activeBg: 'bg-[#FF8C00]/10', activeText: 'text-[#FF8C00]', activeBorder: 'border-[#FF8C00]/30', hoverText: 'text-[#FF8C00]' })}
            {renderNavButton('cipher', 'Cipher Strategies', TrendingUp, { activeBg: 'bg-[#A020F0]/10', activeText: 'text-[#A020F0]', activeBorder: 'border-[#A020F0]/30', hoverText: 'text-[#A020F0]' })}
            {renderNavButton('turtle', 'Omega Turtle', Lock, { activeBg: 'bg-[#00FFFF]/10', activeText: 'text-[#00FFFF]', activeBorder: 'border-[#00FFFF]/30', hoverText: 'text-[#00FFFF]' })}
            {renderNavButton('agent', 'Prime Gemini', Bot, { activeBg: 'bg-[#00FFFF]/10', activeText: 'text-[#00FFFF]', activeBorder: 'border-[#00FFFF]/30', hoverText: 'text-[#00FFFF]' })}
            {renderNavButton('loss', 'System Health', AlertTriangle, { activeBg: 'bg-[#DC143C]/10', activeText: 'text-[#DC143C]', activeBorder: 'border-[#DC143C]/30', hoverText: 'text-[#DC143C]' })}
            {renderNavButton('proposals', 'Evolution', Network, { activeBg: 'bg-[#FF00FF]/10', activeText: 'text-[#FF00FF]', activeBorder: 'border-[#FF00FF]/30', hoverText: 'text-[#FF00FF]' })}
        </div>

        <AnimatePresence mode="wait">
        
        {/* 1. DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
        <motion.div key="dashboard" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="grid grid-cols-12 gap-6">
            
            {/* KI SCORE ALPHA (PROFESSIONAL TOP BAR) */}
            <div className="col-span-12 bg-[#0A0A0A] border-[2px] border-[#1F1F1F] p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center relative overflow-hidden group shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
                <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] pointer-events-none"></div>
                <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-[#444] uppercase tracking-[0.3em] mb-1 font-bold">Cortex KI Score Engine</span>
                        <div className="flex items-end gap-2">
                             <span className="text-5xl font-black font-mono text-[#00FFFF] tabular-nums tracking-tighter drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">{weightedKiScore}</span>
                             <span className={cn("text-xs font-mono mb-2", bias > 0 ? "text-[#00FF00]" : "text-[#DC143C]")}>
                                 {bias > 0 ? "▲" : "▼"} {Math.abs(bias).toFixed(1)}%
                             </span>
                        </div>
                    </div>
                    <div className="h-10 w-[1px] bg-[#1F1F1F] hidden md:block"></div>
                    <div className="flex flex-col">
                        <span className="text-[10px] font-mono text-[#8E9299] uppercase tracking-[0.2em] mb-1">Style Assessment</span>
                        <div className="flex gap-1">
                            {STYLE_METRICS[activeStyle].views.map((v, i) => (
                                <span key={v} className={cn(
                                    "px-2 py-0.5 rounded text-[10px] font-mono border transition-all",
                                    i === 0 ? "bg-[#00FFFF]/20 border-[#00FFFF]/40 text-[#00FFFF]" : "bg-[#141414] border-[#1F1F1F] text-[#8E9299]"
                                )}>{v}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex gap-8 items-center mt-4 md:mt-0 relative z-10 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-mono text-[#444] uppercase mb-1">C2 PING</span>
                        <span className="text-xs font-mono text-[#00FF00]">{ping}ms</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-mono text-[#444] uppercase mb-1">DRAWDOWN</span>
                        <span className="text-xs font-mono text-white">0.42%</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-[9px] font-mono text-[#444] uppercase mb-1">H-PERSIST</span>
                        <span className="text-xs font-mono text-[#A020F0]">0.68</span>
                    </div>
                </div>
            </div>

            {/* STYLE SWITCHER ENGINE (PHASE-ALIGNED SELECTORS) */}
            <div className="col-span-12 flex flex-col items-center mb-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#1F1F1F]"></div>
                    <span className="text-[10px] font-mono text-[#444] uppercase tracking-[0.5em] font-bold">Execution Regime Selector</span>
                    <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#1F1F1F]"></div>
                </div>
                <div className="bg-[#050505] p-1 rounded-2xl border border-[#1F1F1F] flex items-center gap-1">
                    {['scalp', 'dayTrade', 'swing', 'invest'].map((style) => (
                        <button
                            key={style}
                            onClick={() => setActiveStyle(style as keyof typeof STYLE_METRICS)}
                            className={cn(
                                "px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all",
                                activeStyle === style 
                                    ? "bg-[#00FFFF]/10 text-[#00FFFF] border border-[#00FFFF]/20 shadow-[0_0_15px_rgba(0,255,255,0.1)]" 
                                    : "text-[#444] hover:text-[#8E9299]"
                            )}
                        >
                            {style === 'dayTrade' ? 'Day Trade' : style}
                        </button>
                    ))}
                 </div>
            </div>

            {/* 3-TIMEFRAME CHART ROW (REFOCUSED V24.8.8) */}
            <div className="col-span-12 bg-[#0A0A0A] border-[2px] border-[#1F1F1F] rounded-2xl p-6 mb-6 relative overflow-hidden group shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-[0.02] pointer-events-none"></div>
                 <div className="flex justify-between items-center mb-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="p-2.5 bg-[#A020F0]/10 border border-[#A020F0]/30 rounded-xl shadow-[0_0_15px_rgba(160,32,240,0.1)]">
                            <Layers className="w-6 h-6 text-[#A020F0]"/>
                        </div>
                        <div>
                            <h3 className="text-base font-black font-mono text-white tracking-[0.25em] uppercase italic">Sovereign MTF Engine</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-[9px] font-mono text-[#00FFFF] uppercase tracking-widest bg-[#00FFFF]/5 px-1.5 py-0.5 rounded border border-[#00FFFF]/10">INITIAL_TRIGGER_ENABLED</span>
                                <span className="text-[9px] font-mono text-[#444] uppercase tracking-tighter">v24.8.8_Core</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex bg-[#0D0D0D] p-1 border border-[#1F1F1F] rounded-lg gap-1">
                            {['1m', '15m', '1h', '1d', '1w'].map(tf => (
                                <button
                                    key={tf}
                                    onClick={() => setActiveTF(tf)}
                                    className={cn(
                                        "px-2.5 py-1 rounded text-[9px] font-mono font-bold transition-all duration-300 active:scale-90",
                                        activeTF === tf 
                                            ? "bg-[#00FFFF] text-black shadow-[0_0_10px_rgba(0,255,255,0.4)]" 
                                            : "text-[#444] hover:text-[#8E9299] hover:bg-white/5"
                                    )}
                                >
                                    {tf.toUpperCase()}
                                </button>
                            ))}
                        </div>
                        <select 
                            value={selectedPair} 
                            onChange={(e) => setSelectedPair(e.target.value)}
                            className="bg-[#0D0D0D] border border-[#1F1F1F] text-[#00FFFF] text-[10px] font-mono px-4 py-2 rounded-lg outline-none focus:border-[#00FFFF]/50 transition-all uppercase tracking-[0.2em] font-bold cursor-pointer"
                        >
                            <option value="BTCUSD">BTC/USD (C2 PRIME)</option>
                            <option value="ETHUSD">ETH/USD (C2 PRIME)</option>
                            <option value="SOLUSD">SOL/USD (C2 PRIME)</option>
                            <option value="XRPUSD">XRP/USD (C2 PRIME)</option>
                        </select>
                    </div>
                </div>
                {/* Visuals Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                    {['15m', '1d', '1w'].map((tf, i) => {
                        const score = i === 0 ? 88 : i === 1 ? 42 : 71;
                        const isBull = score > 50;
                        return (
                            <div key={tf} className="bg-[#050505] border border-[#1F1F1F] rounded-2xl p-6 overflow-hidden relative group/chart-card hover:border-[#A020F0]/50 transition-all duration-500 shadow-2xl">
                                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1F1F1F] to-transparent"></div>
                                <div className="absolute top-0 right-0 p-4 flex flex-col items-end gap-1 opacity-40 group-hover/chart-card:opacity-100 transition-opacity">
                                     <span className="text-[8px] font-mono text-[#444] uppercase tracking-[0.2em]">Bias Magnitude</span>
                                     <span className={cn("text-sm font-black font-mono", isBull ? "text-[#00FF00]" : "text-[#DC143C]")}>
                                        {isBull ? "+" : "-"}{Math.abs(score-50)*2}%
                                     </span>
                                </div>
                                <div className="flex flex-col mb-6">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={cn("w-1.5 h-1.5 rounded-full", isBull ? "bg-[#00FF00]" : "bg-[#DC143C]")}></div>
                                        <span className="text-xs font-black font-mono text-[#A020F0] tracking-[0.3em]">{tf.toUpperCase()} SCALE</span>
                                    </div>
                                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest leading-none">Primary Confluence Node</span>
                                </div>
                                
                                <div className="h-40 bg-[#080808] border border-[#141414] rounded-2xl relative overflow-hidden group/chart p-4">
                                     {/* SIGNAL INDICATOR (INITIAL TRIGGER - NOT CONFIRMATION) */}
                                     {tick % 2 !== 0 && (
                                         <div className={cn(
                                             "absolute top-5 left-5 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/90 border-2 rounded-lg shadow-[0_0_20px_rgba(0,0,0,1)]",
                                             isBull ? "border-[#00FF00]/60 text-[#00FF00]" : "border-[#DC143C]/60 text-[#DC143C]"
                                         )}>
                                             <div className={cn("w-2 h-2 rounded-full animate-ping", isBull ? "bg-[#00FF00]" : "bg-[#DC143C]")}></div>
                                             <span className="text-[10px] font-black font-mono uppercase tracking-[0.25em]">{isBull ? "BUY" : "SELL"}_TRIGGER</span>
                                         </div>
                                     )}

                                     <svg className="w-full h-full opacity-70 filter drop-shadow-[0_0_4px_rgba(0,0,0,0.5)]" viewBox="0 0 100 40" preserveAspectRatio="none">
                                         <path 
                                            d={`M 0 ${20 + Math.sin(tick*0.05*rhythmSpeed + i*10) * 12} L 20 ${15 + Math.cos(tick*0.04*rhythmSpeed)*10} L 40 ${25 + Math.sin(tick*0.08*rhythmSpeed)*15} L 60 ${10 + Math.cos(tick*0.03*rhythmSpeed)*12} L 80 ${30 + Math.sin(tick*0.1*rhythmSpeed)*10} L 100 ${20 + Math.cos(tick*0.05*rhythmSpeed)*10}`}
                                            fill="none" 
                                            stroke={isBull ? "#00FF00" : "#DC143C"} 
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            className="transition-all duration-700"
                                         />
                                     </svg>
                                </div>
                            </div>
                        )
                    })}
                 </div>

                 {/* SHARD WEIGHT INPUT ENGINE */}
                 <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8 pt-6 border-t border-[#1F1F1F]">
                    {(Object.keys(weights) as Array<keyof typeof weights>).map((wKey) => (
                        <div key={wKey} className="flex flex-col gap-1">
                            <span className="text-[8px] font-mono text-[#8E9299] uppercase tracking-[0.2em]">{wKey}</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="0.1"
                                    max="2.0"
                                    step="0.1"
                                    value={weights[wKey]}
                                    onChange={(e) => setWeights(prev => ({...prev, [wKey]: parseFloat(e.target.value)}))}
                                    className="w-full h-1 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-[#00FFFF]"
                                />
                                <span className="text-[9px] font-mono text-white min-w-[20px] text-right">{weights[wKey].toFixed(1)}</span>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>

            {/* PREDICTIVE LIMIT ORDER MATRIX TRACKER [V25.0 NEW] */}
            <div className="col-span-12 lg:col-span-12 bg-[#0A0A0A] border border-[#00FFFF]/20 p-6 rounded-2xl relative overflow-hidden mb-6">
                <div className="absolute top-0 right-0 w-32 h-20 bg-gradient-to-bl from-[#00FFFF]/10 to-transparent blur-2xl"></div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Crosshair className="w-8 h-8 text-[#00FFFF] animate-pulse"/>
                            <div className="absolute inset-0 bg-[#00FFFF]/20 blur-md animate-pulse rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="text-sm font-black font-mono text-[#00FFFF] tracking-[0.3em] uppercase">Predictive Limit Order Matrix</h3>
                            <p className="text-[10px] font-mono text-[#444] uppercase tracking-tighter">Analyzing S/R Channels for Institutional Infiltration</p>
                        </div>
                    </div>
                    
                    <div className="flex-grow grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                        {[
                            { label: 'Liquidity Gap', val: (bayesian/10 + 2).toFixed(2) + ' ticks', color: 'text-[#00FFFF]' },
                            { label: 'Absorb Density', val: (Math.abs(bias)/10).toFixed(2), color: 'text-[#A020F0]' },
                            { label: 'Frontrun Guard', val: '99.8%', color: 'text-[#00FF00]' },
                            { label: 'CVD Slope', val: bias > 0 ? '+12.4' : '-8.1', color: bias > 0 ? 'text-[#00FF00]' : 'text-[#DC143C]' }
                        ].map((m, i) => (
                            <div key={i} className="flex flex-col bg-[#050505] p-2 rounded border border-[#141414]">
                                <span className="text-[7px] font-mono text-[#444] uppercase mb-0.5">{m.label}</span>
                                <span className={cn("text-xs font-black font-mono", m.color)}>{m.val}</span>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-end gap-2 pr-2">
                        <div className="flex gap-1.5">
                            <span className="text-[8px] font-mono text-[#8E9299]">PROBE_140_ECHO:</span>
                            <span className="text-[8px] font-mono text-[#00FF00]">ACTIVE</span>
                        </div>
                        <div className="flex gap-1.5">
                            <span className="text-[8px] font-mono text-[#8E9299]">PROBE_160_SR:</span>
                            <span className="text-[8px] font-mono text-[#00FF00]">CALIBRATED</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-6 h-8 bg-[#050505] rounded-lg border border-[#141414] overflow-hidden flex items-center px-4 relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00FFFF]/5 to-transparent animate-shimmer"></div>
                    <div className="flex items-center gap-3 w-full">
                        <span className="text-[8px] font-mono text-[#00FFFF] font-black whitespace-nowrap uppercase tracking-[0.2em]">Matrix Placement Status:</span>
                        <div className="flex-grow flex items-center justify-center gap-4">
                             {['BID_POCKET', 'ASK_POCKET', 'MID_LIQ', 'DARK_NODE'].map((node, i) => (
                                 <div key={node} className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity">
                                     <div className={cn("w-1.5 h-1.5 rounded-full", tick % 4 === i ? "bg-[#00FFFF] animate-ping" : "bg-[#1F1F1F]")}></div>
                                     <span className="text-[7px] font-mono text-white/50">{node}</span>
                                 </div>
                             ))}
                        </div>
                        <span className="text-[8px] font-mono text-[#444] font-black uppercase">Alpha_v25.0</span>
                    </div>
                </div>
            </div>

            <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden group">
                    <div className="absolute top-0 w-full h-[2px] bg-lime-400/50 shadow-[0_0_10px_#A3E635]"></div>
                    <span className="text-[9px] text-[#8E9299] font-mono mb-1 text-center leading-tight">PRISM METER</span>
                    <div className="w-full h-1 bg-[#050505] rounded-full overflow-hidden mt-1 flex">
                        <div className="h-full bg-[#DC143C]" style={{ width: '20%' }}></div>
                        <div className="h-full bg-[#FF8C00]" style={{ width: '20%' }}></div>
                        <div className="h-full bg-[#00FFFF]" style={{ width: '40%' }}></div>
                        <div className="h-full bg-[#00FF00]" style={{ width: '20%' }}></div>
                    </div>
                    <span className="text-xs font-mono text-white mt-2">BULLISH</span>
                </div>
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-[#00FFFF]/50 shadow-[0_0_10px_#00FFFF]"></div>
                    <span className="text-[9px] text-[#8E9299] font-mono mb-1 text-center leading-tight">LOGIC HEATMAP</span>
                    <div className="grid grid-cols-4 gap-0.5 mt-1">
                        {Array.from({length: 8}).map((_, i) => (
                            <div key={i} className={cn("w-2 h-2 rounded-[1px]", i % 3 === 0 ? "bg-[#00FFFF]" : "bg-[#1A1A1A]")}></div>
                        ))}
                    </div>
                </div>
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-amber-400/50 shadow-[0_0_10px_#FBBF24]"></div>
                    <span className="text-[10px] text-[#8E9299] font-mono mb-1 text-center leading-tight">TURTLE RISK</span>
                    <span className="text-xl md:text-2xl text-amber-400 font-bold font-mono">1.5%</span>
                </div>
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-lime-400/50 shadow-[0_0_10px_#A3E635]"></div>
                    <span className="text-[10px] text-[#8E9299] font-mono mb-1 text-center leading-tight">PROP DD</span>
                    <span className="text-xl md:text-2xl text-lime-400 font-bold font-mono">0.42%</span>
                </div>
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-[#A020F0]/50 shadow-[0_0_10px_#A020F0]"></div>
                    <span className="text-[10px] text-[#8E9299] font-mono mb-1 text-center leading-tight">THROTTLE</span>
                    <span className="text-xl md:text-2xl text-[#A020F0] font-bold font-mono">FAST</span>
                </div>
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-[#FFD700]/50 shadow-[0_0_10px_#FFD700]"></div>
                    <span className="text-[9px] text-[#8E9299] font-mono mb-1 text-center leading-tight">HURST ENTROPY</span>
                    <span className="text-xl text-[#FFD700] font-bold font-mono">0.68</span>
                </div>
                <div className="bg-[#141414] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-[#00FF00]/50 shadow-[0_0_10px_#00FF00]"></div>
                    <span className="text-[9px] text-[#8E9299] font-mono mb-1 text-center leading-tight">BBO HEALTH</span>
                    <span className="text-sm text-[#00FF00] font-bold font-mono uppercase tracking-tighter">99.85%</span>
                </div>
                <div className="bg-[#141414] border border-[#00FFFF]/20 p-2 md:p-4 rounded-xl flex flex-col justify-center items-center relative overflow-hidden">
                    <div className="absolute top-0 w-full h-[2px] bg-[#00FFFF]/50 shadow-[0_0_10px_#00FFFF]"></div>
                    <span className="text-[9px] md:text-[10px] text-[#8E9299] font-mono mb-1 text-center leading-tight">C2 HASH</span>
                    <span className="text-[10px] md:text-[11px] text-[#00FFFF] font-bold font-mono tracking-widest mt-1">1.5_20_0</span>
                    <span className="text-[7px] md:text-[8px] text-[#00FFFF] font-mono mt-1 px-1 bg-[#00FFFF]/10 rounded shadow-[0_0_5px_rgba(0,255,255,0.4)] whitespace-nowrap">AIR-GAP SYNCED</span>
                </div>
            </div>

            <div className="col-span-12 bg-[#141414] border border-[#1F1F1F] rounded-2xl p-6 relative mt-4 overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-[#00FFFF]/5 blur-3xl pointer-events-none"></div>
                 <div className="flex justify-between items-center mb-6 border-b border-[#1F1F1F] pb-4">
                    <h2 className="text-[#A020F0] font-mono uppercase tracking-[0.2em] text-[10px] flex items-center gap-2">
                         <BrainCircuit className={cn("w-3.5 h-3.5", activeStyle === 'scalp' ? "animate-spin" : "animate-pulse")}/> 
                         KI-Engine: 100 Pantheon Shard Resolver <span className="text-white">|</span> {activeStyle.toUpperCase()} Mode
                    </h2>
                    <div className="text-[10px] font-mono text-[#8E9299] flex items-center gap-4">
                        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> CONNECTION: SOVEREIGN_V4</div>
                        <div>STYLE_ASSESSMENT: <span className="text-[#00FFFF]">{shardScores.micro > 80 ? 'READY' : 'WAITING'}</span></div>
                        <div>STOCH_SYNC: <span className="text-[#FF8C00]">MTF_ALIGN</span></div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {(Object.entries(weights) as [keyof typeof weights, number][]).map(([key, value]) => (
                        <div key={key} className={cn(
                            "bg-[#0D0D0D] border p-3 rounded-xl flex flex-col gap-2 relative group overflow-hidden transition-all",
                            enabledShards[key] ? "border-[#1F1F1F]" : "border-transparent opacity-30 grayscale"
                        )}>
                            <div className="flex justify-between items-center z-10">
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="checkbox" 
                                        checked={enabledShards[key]} 
                                        onChange={() => setEnabledShards(prev => ({ ...prev, [key]: !prev[key] }))}
                                        className="w-3 h-3 accent-[#00FFFF] cursor-pointer"
                                    />
                                    <span className="text-[9px] font-mono text-[#8E9299] uppercase tracking-widest leading-none">{key} weight</span>
                                </div>
                                <span className={cn("text-xs font-mono font-bold leading-none", enabledShards[key] ? (value > 1 ? "text-[#00FFFF]" : "text-[#FF8C00]") : "text-gray-600")}>x{value.toFixed(1)}</span>
                            </div>
                            <input 
                                type="range" 
                                min="0" 
                                max="2" 
                                step="0.1" 
                                value={value} 
                                disabled={!enabledShards[key]}
                                onChange={(e) => setWeights(prev => ({ ...prev, [key]: parseFloat(e.target.value) }))}
                                className="w-full h-1 bg-[#1F1F1F] rounded-lg appearance-none cursor-pointer accent-[#00FFFF] disabled:cursor-not-allowed"
                            />
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        {/* STYLE-GROUPED SHARD MATRIX */}
                        {['micro', 'scalp', 'intra', 'macro'].map((key) => {
                            const configMap = {
                                micro: { label: 'MICRO / SCALP', styleMatch: 'scalp', icon: Monitor, color: '#FF00FF' },
                                scalp: { label: 'INTRADAY / DAY', styleMatch: 'dayTrade', icon: Zap, color: '#00FFFF' },
                                intra: { label: 'SWING / REVERSION', styleMatch: 'swing', icon: Waves, color: '#00FF00' },
                                macro: { label: 'MACRO / INVEST', styleMatch: 'invest', icon: Network, color: '#A020F0' }
                            };
                            const m = configMap[key as keyof typeof configMap];
                            const isSelectedStyle = activeStyle === m.styleMatch;
                            
                            return (
                                <div key={key} className={cn(
                                    "p-4 rounded-xl border transition-all duration-500 relative group overflow-hidden", 
                                    isSelectedStyle ? `border-[#00FFFF]/50 bg-[#00FFFF]/5 shadow-[0_0_20px_rgba(0,255,255,0.1)]` : "border-[#1F1F1F] bg-[#0A0A0A] opacity-30 grayscale hover:opacity-60"
                                )}>
                                    <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${m.color}66, transparent)` }}></div>
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[10px] font-mono text-white tracking-widest flex items-center gap-2 uppercase">
                                            <m.icon className="w-3 h-3" style={{ color: isSelectedStyle ? '#00FFFF' : m.color }}/> {m.label}
                                        </span>
                                        <span className="text-xs font-bold font-mono" style={{ color: isSelectedStyle ? '#00FFFF' : m.color }}>{Math.round(shardScores[key as keyof typeof shardScores])}%</span>
                                    </div>
                                    <div className="grid grid-cols-5 gap-1.5 justify-items-center">
                                        {shardGrids[key as keyof typeof shardGrids].map((state, i) => {
                                            const shardInfo = SHARD_MAP[key as keyof typeof SHARD_MAP][i];
                                            return (
                                                <div 
                                                    key={i} 
                                                    title={`${shardInfo?.n ?? 'PROBE'} [${shardInfo?.f ?? 'EXT'}]: ${shardInfo?.d ?? 'IDLE'}\nWEIGHT: x${(weights[key as keyof typeof weights] ?? 0).toFixed(1)}`}
                                                    className={cn(
                                                        "w-full aspect-square transition-all duration-700 shadow-sm relative rounded-[2px] group/shard cursor-help overflow-hidden",
                                                        state === 1 ? "shadow-md border border-white/10" : 
                                                        state === 2 ? "bg-[#DC143C] animate-pulse" : 
                                                        "bg-[#111] hover:bg-[#1A1A1A]"
                                                    )} 
                                                    style={{ backgroundColor: state === 1 ? (isSelectedStyle ? '#00FFFF' : m.color) : undefined }}
                                                >
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/shard:opacity-100 transition-opacity bg-black/80 z-20">
                                                        <span className="text-[7px] font-mono text-[#00FFFF] font-bold">{shardInfo.n}</span>
                                                        <span className="text-[5px] font-mono text-white/50">{shardInfo.f}</span>
                                                    </div>
                                                    {activeStyle === m.styleMatch && state === 1 && Math.random() > 0.7 && (
                                                        <div className="absolute inset-0 bg-white/20 animate-ping rounded-[1px]"></div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    <div className="mt-3 text-[7px] font-mono text-[#8E9299] uppercase tracking-tighter flex justify-between">
                                        <span>SIGNAL: {shardScores[key as keyof typeof shardScores] > 60 ? 'STABLE' : 'DRIFT'}</span>
                                        <span className={isSelectedStyle ? "text-[#00FFFF]" : ""}>{isSelectedStyle ? 'STYLE_ACTIVE' : 'IDLE'}</span>
                                    </div>
                                </div>
                            );
                        })}
                </div>

                {/* VISUAL ALPHA ENGINE (CHART SIMULATION) */}
                <div className="h-[300px] w-full bg-[#050505] rounded-xl relative border border-[#1F1F1F] mb-6 overflow-hidden">
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#1F1F1F 1px, transparent 1px), linear-gradient(90deg, #1F1F1F 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                    
                    {/* Header Overlay */}
                    <div className="absolute top-4 left-4 flex gap-4 items-start z-10 w-full pr-8 justify-between">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-mono text-[#00FFFF] uppercase tracking-widest">{activeStyle} Execution Stream</span>
                             <div className="flex items-center gap-3">
                                <span className="text-xl font-bold font-mono text-white italic">SYNCC_LEVEL:</span>
                                <div className="flex items-center gap-2 group/sync relative">
                                    <div className="w-32 h-3 bg-[#1A1A1A] rounded-full overflow-hidden border border-[#222]">
                                        <motion.div 
                                            initial={{width: 0}}
                                            animate={{width: `${bayesian}%`}}
                                            className="h-full bg-gradient-to-r from-[#00FFFF] to-[#A020F0] relative"
                                        >
                                            <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                                        </motion.div>
                                    </div>
                                    <span className="text-xl font-bold font-mono text-[#00FFFF] ml-2">{bayesian}%</span>
                                    <div className="absolute bottom-full left-0 mb-4 px-3 py-2 bg-[#0A0A0A]/95 border border-[#00FFFF]/30 backdrop-blur-xl rounded-lg text-[10px] font-mono text-[#E4E3E0] opacity-0 group-hover/sync:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 whitespace-nowrap z-50 shadow-2xl">
                                        <div className="text-[#00FFFF] mb-1 font-bold">SOVEREIGN PHASE-LOCK</div>
                                        <div>DRIFT: {((bayesian/100)*ping).toFixed(0)}μs</div>
                                        <div>TRUST: 0.999%</div>
                                        <div>AIR-GAP: SECURE</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1 ml-4 py-1 px-2 bg-[#00FFFF]/10 border border-[#00FFFF]/20 rounded shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                                    <div className="w-1 h-1 rounded-full bg-[#00FFFF] animate-ping"></div>
                                    <span className="text-[8px] font-mono text-[#00FFFF] font-bold tracking-widest uppercase">Sync v24.8.8</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="flex flex-col items-end text-right">
                             <div className="text-[8px] font-mono text-[#8E9299] uppercase">Mean Reversion Elasticity</div>
                             <div className="text-xs font-mono text-white">σ: {(Math.random()*0.5).toFixed(3)}</div>
                        </div>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={cn("w-full h-full flex items-center justify-around px-12 transition-all duration-1000", activeStyle === 'scalp' ? 'scale-110' : 'scale-100')}>
                            {Array.from({length: activeStyle === 'scalp' ? 12 : 24}).map((_, i) => (
                                <motion.div 
                                    key={i} 
                                    className="flex flex-col items-center gap-1"
                                    animate={{ height: [20, Math.random()*100 + 50, 20] }}
                                    transition={{ duration: 2 / rhythmSpeed, repeat: Infinity, delay: i * (0.1 / rhythmSpeed) }}
                                >
                                    <div className="w-[1px] h-full bg-gray-800 relative">
                                        <div 
                                            className={cn("absolute left-1/2 -translate-x-1/2 w-2 rounded shadow-sm", (i + tick) % 3 === 0 ? "bg-[#DC143C] shadow-[#DC143C]/20" : "bg-[#00FF00] shadow-[#00FF00]/20")}
                                            style={{ height: '30%', top: '35%' }}
                                        ></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Sovereign Glow for Invest Style */}
                    {activeStyle === 'invest' && (
                        <div className="absolute inset-0 bg-[#A020F0]/5 animate-pulse flex items-center justify-center">
                            <div className="text-[15vw] font-black text-white/[0.02] select-none tracking-[2em]">SOVEREIGN</div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[#1F1F1F] pt-4 mb-6">
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-3 rounded-lg flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                             <Hexagon className="w-5 h-5 text-[#00FFFF] group-hover:rotate-90 transition-transform duration-700"/>
                             <div className="flex flex-col">
                                 <span className="text-[10px] font-mono text-white tracking-widest uppercase">Correlated Signals</span>
                                 <span className="text-[8px] font-mono text-[#8E9299]">VOLUME + SPEED + BIAS</span>
                             </div>
                         </div>
                         <div className="flex gap-1.5">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]/50"></div>
                             <div className="w-1.5 h-1.5 rounded-full bg-[#00FFFF]/20"></div>
                         </div>
                    </div>
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-3 rounded-lg flex items-center justify-between group">
                         <div className="flex items-center gap-3">
                             <Activity className="w-5 h-5 text-[#FFD700] animate-pulse"/>
                             <div className="flex flex-col">
                                 <span className="text-[10px] font-mono text-white tracking-widest uppercase">Style Confluence</span>
                                 <span className="text-[8px] font-mono text-[#8E9299]">{activeStyle} REQUIREMENTS MET</span>
                             </div>
                         </div>
                         <Check className="w-4 h-4 text-[#00FF00]"/>
                    </div>
                </div>

                 <div className="flex gap-4 justify-end border-t border-[#1F1F1F] pt-4 mb-6">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#00FFFF] shadow-[0_0_5px_#00FFFF]"></div><span className="text-[9px] font-mono text-[#8E9299]">CONFLUENCE TRIGGERED</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#DC143C]"></div><span className="text-[9px] font-mono text-[#8E9299]">YELLOW X VETO</span></div>
                    <div className="flex items-center gap-2"><div className="w-2 h-2 bg-[#1A1A1A] border border-[#333]"></div><span className="text-[9px] font-mono text-[#8E9299]">OFFLINE/IDLE</span></div>
                </div>

                {/* ADVANCED EXECUTION VISUALIZERS */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 border-t border-[#1F1F1F] pt-6">
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl relative overflow-hidden group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <ListOrdered className="w-4 h-4 text-[#00FFFF]" />
                                <span className="text-xs font-bold tracking-widest text-[#E4E3E0] uppercase">Lucas-Prime Limit Matrix</span>
                            </div>
                            <span className="text-[8px] font-mono text-[#00FFFF] animate-pulse">FRONT-RUN ACTIVE</span>
                        </div>
                        <div className="absolute top-10 right-4 text-[7px] font-mono text-white/20 uppercase text-right leading-none pointer-events-none">
                            Staggered Limit Entry<br/>Spread Bypass: 0.05%<br/>Volley Multiplier: 1.618
                        </div>
                        
                        {/* Dynamic Orderbook Visualization */}
                        <div className="space-y-1">
                            {[
                                { label: 'S_CIP_P3', weight: '20%', offset: 'ATR10', color: '#DC143C' },
                                { label: 'S_CIP_P2', weight: '30%', offset: 'ATR(0.5)', color: '#DC143C' },
                                { label: 'S_CIP_P1', weight: '50%', offset: 'SR_UPPER', color: '#DC143C' }
                            ].map((level, i) => {
                                // Add dynamic movement to represent active price intent
                                const isActive = (tick + i) % 5 === 0;
                                return (
                                    <div key={level.label} className={cn(
                                        "flex justify-between items-center p-2 rounded text-[10px] font-mono border transition-all duration-300 relative overflow-hidden",
                                        isActive ? "bg-[#DC143C]/40 border-[#DC143C]/60 translate-x-1" : "bg-[#DC143C]/10 border-[#DC143C]/20"
                                    )}>
                                        {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer"></div>}
                                        <span className="text-[#DC143C] relative z-10 font-bold">{level.label} [{level.weight}]</span>
                                        <span className="text-[#8E9299] relative z-10">{level.offset}</span>
                                    </div>
                                );
                            })}
                            
                            <div className="py-2 text-center text-[9px] text-[#8E9299] font-mono relative overflow-hidden group">
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <span className="animate-pulse">=== SPREAD BLEED BYPASSED ===</span>
                            </div>

                            {[
                                { label: 'L_CIP_P1', weight: '50%', offset: 'SR_LOWER', color: '#00FF00' },
                                { label: 'L_CIP_P2', weight: '30%', offset: 'ATR(0.5)', color: '#00FF00' },
                                { label: 'L_CIP_P3', weight: '20%', offset: 'ATR10', color: '#00FF00' }
                            ].map((level, i) => {
                                const isActive = (tick + i + 2) % 5 === 0;
                                return (
                                    <div key={level.label} className={cn(
                                        "flex justify-between items-center p-2 rounded text-[10px] font-mono border transition-all duration-300 relative overflow-hidden",
                                        isActive ? "bg-[#00FF00]/40 border-[#00FF00]/60 -translate-x-1" : "bg-[#00FF00]/10 border-[#00FF00]/20"
                                    )}>
                                        {isActive && <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent animate-shimmer"></div>}
                                        <span className="text-[#00FF00] relative z-10 font-bold">{level.label} [{level.weight}]</span>
                                        <span className="text-[#8E9299] relative z-10">{level.offset}</span>
                                    </div>
                                );
                            })}

                            {/* Unified Webhook Output Visualization */}
                            <div className="mt-4 pt-3 border-t border-[#1F1F1F]">
                                 <div className="text-[9px] text-[#A020F0] mb-1 uppercase tracking-widest font-bold">SOVEREIGN PAYLOAD (API LIMIT BYPASS)</div>
                                 <div className="bg-[#050505] p-2 rounded text-[7px] sm:text-[8px] md:text-[9px] text-[#A9B1D6] font-mono break-all border border-[#1F1F1F]">
                                     {"{"}"bot":"SENTINEL", "action":"VOLLEY_LONG", "L1":100, "L2":99.5, "L3":99{"}"}
                                 </div>
                            </div>
                        </div>
                    </div>

                    {/* GHOST-TICK MICROSTRUCTURE */}
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-5 rounded-xl flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-[#A020F0] font-mono uppercase tracking-widest text-xs flex items-center gap-2">
                                <Waves className="w-3 h-3"/> Ghost-Tick Substructure
                            </h3>
                            <span className="text-[#8E9299] text-[10px] font-mono">HFT CLOAK</span>
                        </div>
                        
                        <div className="flex-grow flex items-end gap-1 px-2 border-b border-l border-[#1F1F1F] pb-1 min-h-[140px]">
                            {Array.from({length: 30}).map((_, i) => {
                                // Add \`tick\` dependency to force recalculation on every interval tick
                                const height = 10 + (Math.sin(tick * 0.1 + i) * 40 + 40) + Math.random() * 20; 
                                const isFake = height > 70 && Math.random() > 0.5;
                                return (
                                    <div 
                                        key={i} 
                                        style={{ height: `${Math.min(100, Math.max(10, height))}%` }}
                                        className={cn("w-full transition-all duration-300", isFake ? "bg-[#1A1A1A] border border-[#DC143C]" : "bg-[#A020F0]")}
                                        title={isFake ? "Filtered Ghost Tick" : "Real Sub-Tick Volume"}
                                    ></div>
                                );
                            })}
                        </div>
                        <div className="flex justify-between mt-2 px-2">
                             <span className="text-[9px] text-[#A020F0] font-mono">REAL VOL</span>
                             <span className="text-[9px] text-[#DC143C] font-mono">FILTERED SPOOFS</span>
                        </div>
                    </div>

                    {/* TURTLE RISK GOVERNANCE MODULE */}
                    <div className="bg-[#0A0A0A] border border-[#ff3131]/30 p-5 rounded-xl shadow-[0_0_20px_rgba(255,49,49,0.05)] flex flex-col relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#ff3131]/5 pointer-events-none"></div>
                        <div className="flex justify-between items-center mb-4 relative z-10">
                            <h3 className="text-[#DC143C] font-mono uppercase tracking-widest text-[10px] flex items-center gap-2">
                                <Lock className="w-3 h-3 text-[#DC143C]"/> Turtle Strategy & Unified Bias
                            </h3>
                            <div className="flex items-center gap-1">
                                <span className={cn("w-1.5 h-1.5 rounded-full bg-[#00FFFF]", pulse ? "animate-pulse" : "")}></span>
                                <span className="text-[8px] font-mono text-[#8E9299]">CIPHER_SYNC</span>
                            </div>
                        </div>
                        
                        <div className="space-y-4 relative z-10 flex-grow">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-[#141414] p-3 rounded border border-[#1F1F1F]">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[8px] font-mono text-[#8E9299] uppercase">Bias Sync</span>
                                        <span className={cn("text-[8px] font-mono px-1 rounded bg-[#00FFFF]/10 text-[#00FFFF]", bias * (activeStyle === 'scalp' ? 1 : -1) < 30 && "bg-[#DC143C]/10 text-[#DC143C]")}>
                                            {bias * (activeStyle === 'scalp' ? 1 : -1) > 30 ? 'ALIGNED' : 'CONFLICT'}
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold font-mono text-white">x{(1.0 + (weights.pa * 0.45)).toFixed(2)}</span>
                                </div>
                                <div className="bg-[#141414] p-3 rounded border border-[#1F1F1F]">
                                    <span className="text-[8px] font-mono text-[#8E9299] uppercase block mb-1">VSA Scale</span>
                                    <span className="text-lg font-bold font-mono text-[#FF8C00]">1.48x</span>
                                </div>
                            </div>
                            
                            <div className="bg-[#141414] p-3 rounded border border-[#1F1F1F] flex flex-col gap-1">
                                <span className="text-[8px] font-mono text-[#8E9299] uppercase">Causal Silence Engine</span>
                                <div className="h-6 flex items-center gap-0.5">
                                    {Array.from({length: 20}).map((_, i) => (
                                        <div key={i} className={cn("flex-1 h-full rounded-[1px]", i < (bayesian / 5) ? "bg-[#00FFFF]/50" : "bg-white/5")}></div>
                                    ))}
                                </div>
                                <div className="flex justify-between text-[7px] font-mono text-[#444] mt-1">
                                    <span>CHAOS: { (100-bayesian).toFixed(1) }%</span>
                                    <span>SILENCE: { bayesian.toFixed(1) }%</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-[#141414] p-3 rounded border border-[#1F1F1F] flex flex-col justify-center items-center">
                                    <span className="text-[8px] font-mono text-[#8E9299] uppercase mb-1">HW Entropy</span>
                                    <Gauge className="w-4 h-4 text-[#A020F0] mb-1"/>
                                    <span className="text-[10px] font-mono text-white">{(Math.random()*0.001).toFixed(6)}s</span>
                                </div>
                                <div className="bg-[#141414] p-3 rounded border border-[#1F1F1F] flex flex-col justify-center items-center">
                                    <span className="text-[8px] font-mono text-[#8E9299] uppercase mb-1">Node Sync</span>
                                    <div className="flex gap-0.5">
                                        {Array.from({length: 4}).map((_, i) => (
                                            <div key={i} className={cn("w-2 h-2 rounded-full", i === 3 ? "bg-[#DC143C]" : "bg-[#00FF00]")}></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex justify-between items-center relative z-10">
                             <span className="text-[8px] font-mono text-[#8E9299]">OMEGA_RECOVERY</span>
                             <div className={cn("w-1.5 h-1.5 rounded-full", current_daily_dd < i_max_daily_dd * 0.5 ? "bg-[#00FF00]" : "bg-[#FFD700]")}></div>
                        </div>
                    </div>
                </div>

                {/* VISUAL PARADIGM OVERHAUL: ORDER BOOK & LIQUIDITY FLOW */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6 border-t border-[#1F1F1F] pt-6">
                    {/* ORDER BOOK IMBALANCE (DELTA) */}
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-between">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono text-white tracking-widest uppercase">OB Delta Imbalance</span>
                            <div className={cn("w-2 h-2 rounded-full", bias > 0 ? "bg-[#00FF00] animate-pulse" : "bg-[#DC143C] animate-pulse")}></div>
                        </div>
                        <div className="space-y-2">
                            <div className="h-2 w-full bg-[#1A1A1A] rounded overflow-hidden flex">
                                <div className="transition-all duration-1000 bg-[#00FF00]" style={{ width: `${50 + (bias/2)}%` }}></div>
                                <div className="transition-all duration-1000 bg-[#DC143C]" style={{ width: `${50 - (bias/2)}%` }}></div>
                            </div>
                            <div className="flex justify-between text-[8px] font-mono">
                                <span className="text-[#00FF00]">BID {(50 + (bias/2)).toFixed(1)}%</span>
                                <span className="text-[#DC143C]">ASK {(50 - (bias/2)).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>

                    {/* VOLUMETRIC CENTROIDS (VWAP) */}
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-between">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono text-white tracking-widest uppercase">Volumetric Centroids</span>
                            <CircleDashed className="w-3 h-3 text-[#A020F0]"/>
                        </div>
                        <div className="flex justify-between items-end">
                            <div className="text-xl font-mono text-white tracking-tight">64,230<span className="text-[10px] text-[#A020F0]">.50</span></div>
                            <div className="text-[8px] font-mono text-[#8E9299] uppercase">Anchor Point</div>
                        </div>
                    </div>

                    {/* FUNDING RATE HEATMAP */}
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-between">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono text-white tracking-widest uppercase">Funding Heatmap</span>
                            <Compass className="w-3 h-3 text-[#FF8C00]"/>
                        </div>
                        <div className="grid grid-cols-4 gap-1">
                            {Array.from({length: 8}).map((_, i) => (
                                <div key={i} className={cn("h-4 rounded-[2px]", Math.random() > 0.5 ? "bg-[#FF8C00]/80" : "bg-[#00FFFF]/80")}></div>
                            ))}
                        </div>
                    </div>

                    {/* OPEN INTEREST METRICS */}
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-between">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono text-white tracking-widest uppercase">OI Sweep Markers</span>
                            <ListOrdered className="w-3 h-3 text-[#00FFFF]"/>
                        </div>
                        <div className="flex items-center gap-2">
                             <TrendingUp className="w-4 h-4 text-[#00FFFF]"/>
                             <span className="text-white font-mono text-sm">+2.45B</span>
                             <span className="text-[8px] font-mono text-[#8E9299]">vs 1H Avg</span>
                        </div>
                    </div>

                    {/* CASCADE VISUALIZER */}
                    <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-4 rounded-xl flex flex-col justify-between">
                         <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono text-white tracking-widest uppercase">Liq Cascade</span>
                            <AlertTriangle className={cn("w-3 h-3 text-[#DC143C]", pulse ? "animate-pulse" : "")}/>
                        </div>
                        <div className="flex flex-col gap-1">
                             {[90, 60, 30].map((w, i) => (
                                 <div key={i} className="h-1 bg-[#1A1A1A] w-full rounded relative shadow-inner overflow-hidden">
                                    <div 
                                        className="absolute top-0 right-0 h-full bg-[#DC143C] shadow-[0_0_5px_#DC143C] transition-all duration-1000"
                                        style={{ width: `${w + (Math.sin(tick * 0.5 + i) * 10)}%` }}
                                    />
                                 </div>
                             ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        )}

        {/* 2. DOCS TAB */}
        {activeTab === 'docs' && (
            <motion.div key="docs" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-[#141414] p-8 border border-[#FFD700]/20 rounded-2xl shadow-xl prose prose-invert max-w-none text-xs text-[#8E9299] font-mono markdown-body">
                    <Markdown>{DOCS_MD}</Markdown>
                </div>
            </motion.div>
        )}

        {/* 3. VISUALS TAB */}
        {activeTab === 'visuals' && (
            <motion.div key="visuals" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-[#141414] p-8 border border-[#00FF00]/20 rounded-2xl shadow-xl prose prose-invert max-w-none text-xs text-[#8E9299] font-mono markdown-body mb-8">
                    <Markdown>{VISUALS_MD}</Markdown>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                     {/* Dynamic Assessment Matrix */}
                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 overflow-hidden relative">
                         <div className="flex justify-between items-center mb-6">
                             <div>
                                <h3 className="text-[#00FF00] font-mono text-sm uppercase tracking-widest font-bold">Style Shard Assessment</h3>
                                <p className="text-[10px] text-[#8E9299] font-mono mt-1 italic">Active Filtering: {activeStyle.toUpperCase()}</p>
                             </div>
                             <div className="p-2 bg-[#00FF00]/10 rounded border border-[#00FF00]/20">
                                 <Monitor className="w-4 h-4 text-[#00FF00]"/>
                             </div>
                         </div>
                         <div className="grid grid-cols-1 gap-4">
                             {STYLE_METRICS[activeStyle].shards.map((shard, i) => (
                                 <div key={i} className="flex justify-between items-center bg-[#141414] p-3 rounded-lg border border-[#1F1F1F]">
                                     <div className="flex items-center gap-3">
                                         <div className="w-1.5 h-1.5 rounded-full bg-[#00FF00] shadow-[0_0_5px_#00FF00]"/>
                                         <span className="text-[11px] font-mono text-white/80 uppercase">{shard}</span>
                                     </div>
                                     <span className="text-xs font-mono text-[#00FF00] font-bold">{(Math.random()*20 + 80).toFixed(1)}%</span>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Visual Spectrum Engine */}
                     <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl p-6 overflow-hidden relative">
                         <div className="flex justify-between items-center mb-6">
                             <div>
                                <h3 className="text-[#A020F0] font-mono text-sm uppercase tracking-widest font-bold">Vision Set Correlation</h3>
                                <p className="text-[10px] text-[#8E9299] font-mono mt-1 italic">Hardware Acceleration: ACTIVE</p>
                             </div>
                             <div className="p-2 bg-[#A020F0]/10 rounded border border-[#A020F0]/20">
                                 <Eye className="w-4 h-4 text-[#A020F0]"/>
                             </div>
                         </div>
                         <div className="grid grid-cols-1 gap-4">
                             {STYLE_METRICS[activeStyle].visionSet.map((vision, i) => (
                                 <div key={i} className="flex flex-col bg-[#141414] p-3 rounded-lg border border-[#1F1F1F] gap-2">
                                     <div className="flex justify-between items-center">
                                         <span className="text-[10px] font-mono text-[#8E9299] uppercase">{vision}</span>
                                         <span className="text-[9px] font-mono text-white/40">NODE_{i+102}</span>
                                     </div>
                                     <div className="h-1.5 bg-[#050505] rounded-full overflow-hidden">
                                         <motion.div 
                                            initial={{width: 0}}
                                            animate={{width: `${Math.random()*40 + 60}%`}}
                                            className="h-full bg-gradient-to-r from-[#A020F0] to-[#E4E3E0]/20"
                                         />
                                     </div>
                                 </div>
                             ))}
                         </div>
                     </div>
                </div>
            </motion.div>
        )}

        {/* 4. STRATEGY TAB */}
        {activeTab === 'strategy' && (
            <motion.div key="strategy" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden relative">
                <div className="absolute top-4 right-4 z-10">
                    <button onClick={() => copyToClipboard(STRATEGY_CODE, 'strategy')} className="flex items-center gap-2 px-3 py-1 bg-[#141414] hover:bg-[#1A1A1A] text-white rounded text-xs font-mono border border-[#333] transition-colors">
                        {copiedObj === 'strategy' ? <Check className="w-3 h-3 text-[#00FF00]"/> : <Copy className="w-3 h-3"/>} Copy Master Strategy
                    </button>
               </div>
                <div className="px-6 py-4 bg-[#141414] border-b border-[#1F1F1F] flex gap-3 flex-col sm:flex-row justify-between">
                    <span className="text-[#FFFFFF] font-mono text-[10px] uppercase tracking-widest">&gt; SentinelPrime V0.4.3: OMEGA LEVIATHAN</span>
                    <span className="text-[#FFFF00] font-mono text-[10px] uppercase tracking-widest font-bold border border-[#FFFF00]/50 px-2 rounded flex items-center gap-1"><Zap className="w-3 h-3"/> V0.4 CIPHER + SOVEREIGN C2</span>
                </div>
                <pre className="p-6 text-xs font-mono leading-relaxed overflow-auto max-h-[700px] text-[#A9B1D6] custom-scrollbar">
                    <code>{STRATEGY_CODE}</code>
                </pre>
            </motion.div>
        )}

        {/* 5. SENTINEL MODULES TAB (Modular Strategies) */}
        {activeTab === 'indicators' && (
            <motion.div key="indicators" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest pl-1">Module Engine Mode</span>
                        <div className="flex gap-2 bg-[#0D0D0D] p-1 border border-[#1F1F1F] rounded-lg">
                            {(['strategy', 'indicator'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setViewType(type)}
                                    className={cn(
                                        "px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded transition-all",
                                        viewType === type ? "bg-[#FF8C00] text-black font-bold shadow-[0_0_15px_rgba(255,140,0,0.3)]" : "text-[#8E9299] hover:text-white"
                                    )}
                                >
                                    {type} View
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {SENTINEL_MODULES.map((ind, idx) => (
                    <div key={idx} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden shadow-lg">
                        <div className="px-6 py-4 border-b border-[#1F1F1F] flex justify-between items-center bg-[#0D0D0D]">
                            <div className="flex items-center gap-3">
                                <Cpu className="w-4 h-4 text-[#FF8C00]"/>
                                <h3 className="text-[#FF8C00] font-mono text-xs uppercase tracking-widest font-bold">{ind.title}</h3>
                            </div>
                            <button onClick={() => copyToClipboard(viewType === 'strategy' ? ind.code : (ind as any).indicatorCode || ind.code, `reg-ind-${idx}`)} className="flex items-center gap-2 px-3 py-1 bg-[#141414] hover:bg-[#1A1A1A] text-white rounded text-[10px] font-mono border border-[#333] transition-all">
                                {copiedObj === `reg-ind-${idx}` ? (
                                    <><Check className="w-3 h-3 text-[#00FF00]"/> COPIED</>
                                ) : (
                                    <><Copy className="w-3 h-3 text-[#8E9299]"/> COPY {viewType === 'strategy' ? 'STRAT' : 'INDICATOR'}</>
                                )}
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 border-b border-[#141414] pb-8">
                                <div className="space-y-6 font-mono text-xs">
                                    <div>
                                        <span className="text-white font-bold block mb-2 uppercase border-b border-[#333] pb-1">Code Explanation</span>
                                        <p className="text-[#8E9299] leading-relaxed">{ind.description}</p>
                                    </div>
                                    <div>
                                        <span className="text-white font-bold block mb-3 uppercase border-b border-[#333] pb-1">Strategy Parameters</span>
                                        <div className="grid grid-cols-2 gap-2">
                                             <div className="bg-[#141414] p-2 rounded border border-[#222]"><span className="text-[#FFD700] block">ATR Multi:</span><span className="text-white">1.54x</span></div>
                                             <div className="bg-[#141414] p-2 rounded border border-[#222]"><span className="text-[#FFD700] block">DD Limit:</span><span className="text-white">3.5%</span></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#050505] border border-[#1F1F1F] rounded relative">
                                    <div className="absolute top-2 left-2 text-[8px] text-[#444] font-mono">PINE_V6_{viewType.toUpperCase()}_CORE</div>
                                    <pre className="p-4 pt-8 text-[10px] font-mono leading-relaxed overflow-auto h-full max-h-[300px] text-[#A9B1D6] custom-scrollbar">
                                        <code>{viewType === 'strategy' ? ind.code : (ind as any).indicatorCode || ind.code}</code>
                                    </pre>
                                </div>
                            </div>

                            {/* Detailed Strategy Documentation as requested */}
                            {ind.fullDoc && (
                                <div className="mt-4 p-8 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl prose prose-invert max-w-none text-xs font-mono markdown-body">
                                     <Markdown>{ind.fullDoc}</Markdown>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        )}

        {/* 6. CIPHER STRATEGIES TAB */}
        {activeTab === 'cipher' && (
            <motion.div key="cipher" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}} className="space-y-6">
                <div className="bg-[#050505] p-8 border border-[#A020F0]/30 rounded-2xl shadow-xl prose prose-invert max-w-none text-xs text-[#8E9299] font-mono markdown-body mb-8">
                    <Markdown>{MARKET_CIPHER_INTEGRATION_MD}</Markdown>
                </div>
                <div className="bg-[#050505] p-8 border border-[#A020F0]/10 rounded-2xl shadow-xl prose prose-invert max-w-none text-xs text-[#8E9299] font-mono markdown-body mb-8">
                    <Markdown>{MC_RESEARCH_MD}</Markdown>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-4">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest pl-1">Cipher Logic Mode</span>
                        <div className="flex gap-2 bg-[#0D0D0D] p-1 border border-[#1F1F1F] rounded-lg">
                            {(['strategy', 'indicator'] as const).map(type => (
                                <button
                                    key={type}
                                    onClick={() => setViewType(type)}
                                    className={cn(
                                        "px-4 py-2 text-[10px] font-mono uppercase tracking-widest rounded transition-all",
                                        viewType === type ? "bg-[#A020F0] text-white font-bold shadow-[0_0_15px_rgba(160,32,240,0.3)]" : "text-[#8E9299] hover:text-white"
                                    )}
                                >
                                    {type} View
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {CIPHER_STRATEGIES.map((ind, idx) => (
                    <div key={idx} className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-2xl overflow-hidden shadow-lg">
                        <div className="px-6 py-4 border-b border-[#1F1F1F] flex justify-between items-center bg-[#0D0D0D]">
                            <div className="flex items-center gap-3">
                                <TrendingUp className="w-4 h-4 text-[#FFD700]"/>
                                <h3 className="text-[#FFD700] font-mono text-xs uppercase tracking-widest font-bold">{ind.title}</h3>
                            </div>
                            <button onClick={() => copyToClipboard(viewType === 'strategy' ? ind.code : (ind as any).indicatorCode || ind.code, `cip-ind-${idx}`)} className="flex items-center gap-2 px-3 py-1 bg-[#141414] hover:bg-[#1A1A1A] text-white rounded text-[10px] font-mono border border-[#333] transition-all">
                                {copiedObj === `cip-ind-${idx}` ? (
                                    <><Check className="w-3 h-3 text-[#00FF00]"/> COPIED</>
                                ) : (
                                    <><Copy className="w-3 h-3 text-[#8E9299]"/> COPY {viewType === 'strategy' ? 'STRAT' : 'INDICATOR'}</>
                                )}
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 border-b border-[#141414] pb-8">
                                <div className="space-y-6 font-mono text-xs">
                                    <div><p className="text-[#8E9299] leading-relaxed">{ind.description}</p></div>
                                    <div>
                                        <ul className="space-y-3">
                                            {ind.markers.map((marker, mIdx) => (
                                                <li key={mIdx} className="flex flex-col bg-[#141414] border border-[#222] p-3 rounded text-[#8E9299]">
                                                    <div className="flex items-center gap-2 mb-1"><span className={cn("text-lg drop-shadow-md", (marker as any).color || "")}>{marker.icon}</span><span className="text-white font-bold">{marker.name}</span></div>
                                                    <span className="leading-snug">{marker.explanation}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="bg-[#050505] border border-[#1F1F1F] rounded relative">
                                    <div className="absolute top-2 left-2 text-[8px] text-[#444] font-mono">PINE_V6_CIPHER_{viewType.toUpperCase()}_CORE</div>
                                    <pre className="p-4 pt-8 text-[10px] font-mono leading-relaxed overflow-auto h-full max-h-[300px] text-[#A9B1D6] custom-scrollbar">
                                        <code>{viewType === 'strategy' ? ind.code : (ind as any).indicatorCode || ind.code}</code>
                                    </pre>
                                </div>
                            </div>
                            
                            {/* Detailed Strategy Documentation as requested */}
                            {ind.fullDoc && (
                                <div className="mt-4 p-8 bg-[#0D0D0D] border border-[#1F1F1F] rounded-xl prose prose-invert max-w-none text-xs font-mono markdown-body">
                                     <Markdown>{ind.fullDoc}</Markdown>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        )}

        {/* 6. MARKET CIPHER INTEGRATION TAB */}
        {activeTab === 'cipher-integ' && (
        <motion.div key="cipher-integ" initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} exit={{opacity:0, scale:0.98}} className="space-y-6">
            <div className="bg-[#0A0A0A] border border-[#1F1F1F] p-8 rounded-2xl relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 p-8">
                    <Waves className="w-24 h-24 text-[#00FFFF] opacity-5 animate-pulse" />
                </div>
                <div className="prose prose-invert prose-sm max-w-none mb-12">
                    <div className="flex items-center gap-4 mb-8 border-b border-[#1F1F1F] pb-4">
                        <div className="p-3 bg-[#00FFFF]/10 rounded-xl border border-[#00FFFF]/30">
                            <Waves className="w-6 h-6 text-[#00FFFF]"/>
                        </div>
                        <div>
                            <h2 className="!m-0 text-white font-bold tracking-[0.2em] uppercase">Market Cipher Integration</h2>
                            <p className="!m-0 text-[10px] font-mono text-[#8E9299] uppercase tracking-widest mt-1">Sovereign Confluence Alpha v24.8.6</p>
                        </div>
                    </div>
                    <Markdown>{MARKET_CIPHER_INTEGRATION_MD}</Markdown>
                </div>
                
                {/* Visual Enrichment for Cipher Integration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#111] p-6 rounded-2xl border border-[#1F1F1F] relative overflow-hidden group">
                        <div className="text-[10px] font-mono text-[#00FFFF] mb-4 uppercase tracking-widest">Momentum Wave Drift</div>
                        <div className="h-32 flex items-center justify-center relative bg-[#050505] rounded-xl border border-[#1F1F1F] overflow-hidden">
                             {/* Animated Wave Simulation */}
                             <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <motion.path 
                                    animate={{ d: [
                                        "M0 50 Q 25 30, 50 50 T 100 50",
                                        "M0 50 Q 25 70, 50 50 T 100 50",
                                        "M0 50 Q 25 30, 50 50 T 100 50"
                                    ]}}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    fill="none" stroke="#00FFFF" strokeWidth="0.5"
                                />
                             </svg>
                            <Waves className="w-10 h-10 text-[#00FFFF] animate-pulse relative z-10" />
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-[8px] font-mono text-[#8E9299] uppercase">MFI Status</span>
                            <span className="text-[10px] font-mono text-[#00FF00]">LIQUIDITY+: 0.84</span>
                        </div>
                    </div>

                    <div className="bg-[#111] p-6 rounded-2xl border border-[#1F1F1F] relative">
                        <div className="text-[10px] font-mono text-[#FFD700] mb-4 uppercase tracking-widest">Exhaustion Veto Status</div>
                        <div className="h-32 flex items-center justify-center bg-[#050505] rounded-xl border border-[#1F1F1F] relative">
                            <Crosshair className="w-10 h-10 text-[#FFD700] animate-spin-slow opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-black text-white/5 tracking-tighter">YELLOW_X</span>
                            </div>
                            <Check className="w-8 h-8 text-[#00FF00] absolute" />
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-[8px] font-mono text-[#8E9299] uppercase">Veto Gate</span>
                            <span className="text-[10px] font-mono text-[#00FF00]">CLEAR TO TRADE</span>
                        </div>
                    </div>

                    <div className="bg-[#111] p-6 rounded-2xl border border-[#1F1F1F]">
                        <div className="text-[10px] font-mono text-[#DC143C] mb-4 uppercase tracking-widest">Divergence Scalar</div>
                        <div className="h-32 flex flex-col items-center justify-center bg-[#050505] rounded-xl border border-[#1F1F1F]">
                             <TrendingUp className="w-10 h-10 text-[#DC143C] mb-2" />
                             <div className="text-2xl font-mono text-white">12.8°</div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <span className="text-[8px] font-mono text-[#8E9299] uppercase">Bias Confidence</span>
                            <span className="text-[10px] font-mono text-[#DC143C]">BULLISH DELTA</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
        )}
    {/* 7. OMEGA TURTLE TAB (STRATEGY & RISK) */}
    {activeTab === 'turtle' && (
        <motion.div key="turtle" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="space-y-6">
            <h2 className="text-2xl font-black text-white">Omega Turtle</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4">
                    <h3 className="text-sm font-mono text-[#00FFFF] mb-3">Proprietary Research Links</h3>
                    <ul className="space-y-1">
                        {PROPRIETARY_LINKS.map((link, i) => <li key={i}><a href={link} target="_blank" rel="noreferrer" className="text-[10px] font-mono text-[#444] hover:text-[#00FFFF] truncate block">{link}</a></li>)}
                    </ul>
                    <div className="mt-8 pt-6 border-t border-[#1F1F1F] prose prose-invert prose-xs max-w-none">
                        <Markdown>{DEEP_DATA_EXTRACTION_MD}</Markdown>
                    </div>
                </div>
                <div className="space-y-6">
                  <SentinelDataLog title="Vulnerability Log" items={VULNERABILITY_LOG} />
                  <SentinelDataLog title="Proposals" items={PROPOSALS} />
                </div>
            </div>
            {/* ... rest of turtle content ... */}
            <div className="bg-[#0D0D0D] p-8 border border-[#00FFFF]/20 rounded-2xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Lock className="w-24 h-24 text-[#00FFFF] animate-pulse" />
                </div>
                <div className="prose prose-invert prose-sm max-w-none mb-12 relative z-10">
                     <div className="flex items-center gap-4 mb-8 border-b border-[#1F1F1F] pb-4">
                        <div className="p-3 bg-[#00FFFF]/10 rounded-xl border border-[#00FFFF]/30">
                            <Lock className="w-6 h-6 text-[#00FFFF]"/>
                        </div>
                        <div>
                            <h2 className="!m-0 text-white font-bold tracking-[0.2em] uppercase">Omega Turtle Governance</h2>
                            <p className="!m-0 text-[10px] font-mono text-[#8E9299] uppercase tracking-widest mt-1">Sovereign-Cipher Risk Matrix v24.8.8</p>
                        </div>
                    </div>
                    <Markdown>{CIPHER_TURTLE_MD}</Markdown>
                </div>

                <div className="grid grid-cols-1 gap-8 relative z-10">
                    {OMEGA_TURTLE_STRATEGIES.map((strat, i) => (
                        <div key={i} className="bg-[#070707] border border-[#1F1F1F] rounded-2xl overflow-hidden group hover:border-[#00FFFF]/40 transition-all duration-500">
                             <div className="p-6 border-b border-[#141414] bg-gradient-to-r from-[#00FFFF]/5 to-transparent flex justify-between items-center">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-black border border-[#1F1F1F] flex items-center justify-center font-bold text-[#00FFFF] font-mono shadow-inner">
                                        {i + 1}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-bold tracking-widest uppercase text-sm m-0">{strat.title}</h3>
                                        <p className="text-[10px] text-[#8E9299] font-mono m-0 mt-1 uppercase tracking-tighter">{strat.description}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => copyToClipboard(strat.code, `strat-${i}-s`)}
                                        className="p-2.5 rounded-lg bg-[#050505] border border-[#1F1F1F] text-[#8E9299] hover:text-[#00FFFF] hover:border-[#00FFFF]/30 transition-all active:scale-95 flex items-center gap-2"
                                        title="Copy Strategy Code"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest">{copiedObj === `strat-${i}-s` ? 'COPIED' : 'STRAT'}</span>
                                    </button>
                                     <button 
                                        onClick={() => copyToClipboard(strat.indicatorCode, `strat-${i}-i`)}
                                        className="p-2.5 rounded-lg bg-[#050505] border border-[#1F1F1F] text-[#8E9299] hover:text-[#FF8C00] hover:border-[#FF8C00]/30 transition-all active:scale-95 flex items-center gap-2"
                                        title="Copy Indicator Code"
                                    >
                                        <Copy className="w-3.5 h-3.5" />
                                        <span className="text-[8px] font-mono uppercase tracking-widest">{copiedObj === `strat-${i}-i` ? 'COPIED' : 'INDICATOR'}</span>
                                    </button>
                                </div>
                             </div>

                             <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="p-8 font-mono text-[11px] leading-relaxed border-b lg:border-b-0 lg:border-r border-[#141414] text-[#A9B1D6] markdown-body custom-scrollbar h-[400px] overflow-y-auto bg-[#0A0A0A]/50">
                                    <Markdown>{strat.fullDoc}</Markdown>
                                </div>
                                <div className="relative bg-[#050505] h-[400px]">
                                    <div className="absolute top-2 left-2 text-[8px] text-[#444] font-mono uppercase tracking-widest z-10">PINE_V6_STRAT_DEBUG</div>
                                    <pre className="p-8 pt-10 text-[10px] font-mono leading-relaxed overflow-auto h-full text-[#00FFFF]/80 custom-scrollbar selection:bg-white selection:text-black">
                                        <code>{strat.code}</code>
                                    </pre>
                                    <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-30">
                                        <CircleDashed className="w-4 h-4 animate-spin text-[#00FFFF]" />
                                        <span className="text-[9px] font-mono text-[#00FFFF] uppercase tracking-[0.3em]">Code Verified</span>
                                    </div>
                                </div>
                             </div>

                             <div className="p-4 bg-[#0A0A0A] border-t border-[#141414] flex flex-wrap gap-4">
                                {strat.markers.map((mark, mi) => (
                                    <div key={mi} className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-[#050505] border border-[#1F1F1F]">
                                        <span className="text-[14px]">{mark.icon}</span>
                                        <div className="flex flex-col">
                                            <span className={cn("text-[9px] font-bold font-mono tracking-widest uppercase", mark.color)}>{mark.name}</span>
                                            <span className="text-[7px] text-[#555] font-mono uppercase leading-none mt-0.5">{mark.explanation}</span>
                                        </div>
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    )}

        {/* 8. AGENT PRIMING TAB */}
        {activeTab === 'agent' && (
            <motion.div key="agent" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-[#141414] p-8 border border-[#00FFFF]/20 rounded-2xl shadow-xl prose prose-invert max-w-none text-xs text-[#8E9299] font-mono markdown-body">
                    <div className="flex border-b border-[#1F1F1F] mb-6 pb-4 items-center gap-3">
                        <Bot className="w-5 h-5 text-[#00FFFF]"/>
                        <h2 className="!border-none !m-0 !p-0 !text-white text-lg font-bold tracking-widest uppercase">THE SENTINEL MASTER PROMPT (v24.8.6)</h2>
                    </div>
                    <Markdown>{AGENT_PRIMING_MD}</Markdown>
                </div>
            </motion.div>
        )}

        {/* 9. LOSS ASSESSMENT TAB */}
        {activeTab === 'loss' && (
            <motion.div key="loss" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-[#141414] p-8 border border-[#DC143C]/20 rounded-2xl shadow-xl prose prose-invert max-w-none text-xs text-[#8E9299] font-mono markdown-body">
                    <Markdown>{LOSS_REPORT_MD}</Markdown>
                </div>
            </motion.div>
        )}

        {/* 10. PROPOSALS EVOLUTION TAB */}
        {activeTab === 'proposals' && (
            <motion.div key="proposals" initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-10}}>
                <div className="bg-[#050505] p-8 border border-[#FF00FF]/30 rounded-2xl shadow-[0_0_30px_rgba(255,0,255,0.05)] prose prose-invert max-w-none text-[11px] text-[#A9B1D6] font-mono markdown-body custom-scrollbar h-[80vh] overflow-y-auto">
                     <Markdown>{EVOLUTION_PROPOSALS_MD}</Markdown>
                </div>
            </motion.div>
        )}

        </AnimatePresence>
      </main>

      <footer className="border-t border-[#141414] py-8 mt-auto bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                        <div className="flex items-center gap-1">
                            <Layers className="w-4 h-4 text-[#00FFFF]" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white">
                                SentinelPrime V24.8.8: The Sovereign Master Update
                            </span>
                        </div>
          <div className="text-[10px] text-[#4A4A4A] font-mono uppercase tracking-widest">
            © 2026 Sovereign Quantum Trading Architects
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0D0D0D; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #1F1F1F; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #3A3A3A; }
        
        /* Markdown Styling Engine */
        .markdown-body h2 { color: #00FFFF; font-size: 1.1rem; margin-top: 1.5rem; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #1F1F1F; padding-bottom: 0.5rem; }
        .markdown-body h3 { color: #A020F0; font-size: 0.95rem; margin-top: 1.5rem; text-transform: uppercase; }
        .markdown-body h4 { color: #DC143C; font-size: 0.85rem; margin-top: 1.5rem; }
        .markdown-body p { margin-bottom: 1rem; line-height: 1.6; }
        .markdown-body ul { list-style-type: none; padding-left: 0; }
        .markdown-body li { position: relative; padding-left: 1rem; margin-bottom: 0.75rem; }
        .markdown-body li::before { content: "▹"; position: absolute; left: 0; color: #00FFFF; }
        .markdown-body strong { color: white; font-weight: 700; }
        .markdown-body code { background: #141414; padding: 0.2rem 0.4rem; border-radius: 4px; border: 1px solid #1F1F1F; color: #FFD700; }
        .markdown-body a { color: #00FFFF; text-decoration: underline; }
      `}} />
    </div>
  );
}
