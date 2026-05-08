import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Camera } from 'lucide-react';

const widgetData = [
  { time: '09:00', value: 135 },
  { time: '09:30', value: 115 },
  { time: '10:00', value: 102 },
  { time: '10:30', value: 95 },
  { time: '11:00', value: 105 },
  { time: '11:30', value: 112 },
  { time: 'Ostatnio', value: 112 },
];

export default function PromoWidget() {
  return (
    <div className="font-sans max-w-[450px] p-6 rounded-[24px] bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-[0_20px_40px_rgba(0,0,0,0.4)] mx-auto overflow-hidden border border-white/10 relative z-10 w-full transform hover:scale-[1.02] transition-transform duration-500">
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="m-0 text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 to-violet-500">
            GlikoControl
          </h3>
          <p className="m-0 mt-1 text-[11px] text-slate-400 uppercase font-bold tracking-widest">
            Powered by Google Gemini AI
          </p>
        </div>
        <span className="bg-blue-500/20 border border-blue-500 text-blue-400 px-3.5 py-1.5 rounded-full text-[11px] font-extrabold uppercase">
          W Normie ✓
        </span>
      </div>
      
      <div className="relative bg-black/20 rounded-2xl p-3 border border-white/5 h-[160px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={widgetData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValueWidget" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="time" hide />
            <YAxis domain={[60, 180]} tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: 'none', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ color: '#34d399' }}
              labelStyle={{ display: 'none' }}
              cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '3 3' }}
            />
            <Area type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} fillOpacity={1} fill="url(#colorValueWidget)" 
                  activeDot={{ r: 6, fill: '#ffffff', stroke: '#3b82f6', strokeWidth: 2 }} 
                  dot={(props: any) => {
                     const { cx, cy, index } = props;
                     if (index === widgetData.length - 1) {
                        return <circle cx={cx} cy={cy} r={4} fill="#ffffff" stroke="#3b82f6" strokeWidth={2} key={index} />;
                     }
                     return <React.Fragment key={index}></React.Fragment>;
                  }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="flex gap-3 mt-5 text-[13px]">
        <div className="flex-1 text-center bg-emerald-500/15 text-emerald-400 p-4 rounded-2xl border border-emerald-500/20">
          <div className="text-2xl font-black">
            112<span className="text-xs text-emerald-300 ml-1">mg/dL</span>
          </div>
          <div className="text-[10px] uppercase mt-1 font-bold tracking-wider">Glikemia ➔</div>
        </div>
        <div className="flex-1 text-center bg-violet-500/15 text-violet-400 p-4 rounded-2xl border border-violet-500/20 flex flex-col justify-center items-center">
          <div className="text-base font-extrabold flex items-center gap-1.5">
            <Camera size={18} /> Skan Talerza
          </div>
          <div className="text-[10px] uppercase mt-1 font-bold tracking-wider opacity-80">Automatyczne WBT</div>
        </div>
      </div>
    </div>
  );
}
