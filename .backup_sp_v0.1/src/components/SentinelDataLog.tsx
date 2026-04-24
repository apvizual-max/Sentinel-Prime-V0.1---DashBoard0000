import React from 'react';

interface SentinelDataLogProps {
    title: string;
    items: string[];
}

export const SentinelDataLog: React.FC<SentinelDataLogProps> = ({ title, items }) => (
    <div className="bg-[#0A0A0A] border border-[#1F1F1F] rounded-xl p-4 mt-4">
        <h4 className="text-[10px] font-mono text-[#8E9299] uppercase tracking-widest mb-3 border-b border-[#1F1F1F] pb-2">{title}</h4>
        <ul className="list-disc list-inside space-y-1">
            {items.map((item, i) => (
                <li key={i} className="text-[9px] font-mono text-[#E4E3E0]">{item}</li>
            ))}
        </ul>
    </div>
);
