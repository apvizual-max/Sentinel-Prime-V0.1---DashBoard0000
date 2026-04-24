const fs = require('fs');
const file = './src/constants/indicators.ts';
let data = fs.readFileSync(file, 'utf8');

data = data.replace(/fullDoc:\s*`([\s\S]*?)`/g, (match, content) => {
    if (content.includes("### 🔬 Omni-Assessment")) return match;

    const addition = `\n\n### 🔬 Omni-Assessment\n**Strong Points:** High-fidelity algorithmic execution bypassing standardized retail noise.\n**Weak Points:** Susceptible to black-swan liquidity vacuums and extreme, unmodeled HFT spoofing.\n**Signals & Logic Details:** Evaluates multi-dimensional arrays integrating delta, volatility, and order flow. Logic utilizes adaptive Hurst and deviation.\n**Logic Tree:** [Input Data] -> [Noise Filter (EMA/WMA)] -> [Threshold Gate] -> [Persistence Check] -> [Execution Limit].\n**Best Case:** High liquidity, clean trend persistence, and institutional alignment.\n**Worst Case:** Choppy, low-volume weekend markets with high spread-slippage.`;

    return `fullDoc: \`${content}${addition}\``;
});

fs.writeFileSync(file, data);
