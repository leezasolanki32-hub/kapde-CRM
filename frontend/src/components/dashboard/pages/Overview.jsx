import React from 'react';
import { StatCard, Bar, SegmentRow } from '../DashboardComponents';
import { ClipboardList, AlertTriangle, Check, ShoppingBag, Truck, Lightbulb, BarChart2 } from "lucide-react";

const PercentageAreaChart = () => (
  <div className="w-full mt-6 animate-[slideDownFade_0.5s_ease-out] h-full flex flex-col">
    <div className="relative flex-1 w-full bg-[#f3e8ff]/20 rounded-xl p-8 border border-[#d8b4fe]/15 overflow-hidden flex flex-col justify-center">
      {/* Y-Axis Labels */}
      <div className="absolute left-6 top-10 bottom-16 flex flex-col justify-between text-[11px] text-[#6B6B70] font-bold">
        <span>5 —</span><span>4 —</span><span>3 —</span><span>2 —</span><span>1 —</span>
      </div>

      {/* SVG Chart */}
      <div className="ml-8 h-full relative">
        <svg viewBox="0 0 1000 300" className="w-full h-[180px] preserve-3d">
          <path d="M 0 50 L 300 100 L 400 150 L 400 300 L 0 300 Z" fill="#00C4CC" className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
          <text x="150" y="180" fill="white" fontSize="40" fontWeight="bold" className="pointer-events-none">75%</text>

          <path d="M 400 150 L 600 160 L 750 220 L 750 300 L 400 300 Z" fill="#3B82F6" className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
          <text x="520" y="240" fill="white" fontSize="40" fontWeight="bold" className="pointer-events-none">50%</text>

          <path d="M 750 220 L 900 230 L 1000 250 L 1000 300 L 750 300 Z" fill="#FF6B9B" className="opacity-90 hover:opacity-100 transition-opacity cursor-pointer" />
          <text x="850" y="270" fill="white" fontSize="40" fontWeight="bold" className="pointer-events-none">15%</text>
          <line x1="0" y1="300" x2="1000" y2="300" stroke="#E2DED6" strokeWidth="2" />
        </svg>
        <div className="flex justify-between mt-2 text-[10px] text-[#6B6B70] px-2 font-bold">
          <span>10</span><span>20</span><span>30</span><span>40</span><span>50</span><span>60</span><span>70</span><span>80</span><span>90</span>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-3 gap-6 mt-6 px-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] text-[#00C4CC] font-bold">Option</span>
          <span className="text-[20px] text-[#00C4CC] font-bold">03</span>
        </div>
        <ul className="text-[10px] text-[#6B6B70] space-y-1 border-t border-[#f0f0f0] pt-2">
          <li>Capture audience attention</li>
          <li>Detailed revenue trends</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] text-[#3B82F6] font-bold">Option</span>
          <span className="text-[20px] text-[#3B82F6] font-bold">02</span>
        </div>
        <ul className="text-[10px] text-[#6B6B70] space-y-1 border-t border-[#f0f0f0] pt-2">
          <li>Customer reach</li>
          <li>Engagement metrics</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] text-[#FF6B9B] font-bold">Option</span>
          <span className="text-[20px] text-[#FF6B9B] font-bold">01</span>
        </div>
        <ul className="text-[10px] text-[#6B6B70] space-y-1 border-t border-[#f0f0f0] pt-2">
          <li>Final conversion</li>
          <li>Return on investment</li>
        </ul>
      </div>
    </div>
  </div>
);

const SalesFunnel = () => {
  const stages = [
    { label: 'Raw', value: '₹12.4L', count: 184, color: 'bg-[#f3e8ff]', text: 'text-[#a855f7]' },
    { label: 'New', value: '₹8.9L', count: 112, color: 'bg-[#e0f2fe]', text: 'text-[#0ea5e9]' },
    { label: 'Discussion', value: '₹5.2L', count: 64, color: 'bg-[#dcfce7]', text: 'text-[#16a34a]' },
    { label: 'Demo', value: '₹2.1L', count: 32, color: 'bg-[#fff7ed]', text: 'text-[#ea580c]' },
    { label: 'Proposal', value: '₹1.4L', count: 14, color: 'bg-[#fef2f2]', text: 'text-[#dc2626]' },
    { label: 'Decided', value: '₹95K', count: 9, color: 'bg-[#fafaf9]', text: 'text-[#44403c]' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-6 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#a855f7] to-[#d8b4fe]"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[#7c3aed]">Sales Funnel</h3>
        <span className="text-[11px] font-bold text-[#6B6B70] uppercase">4.8% Conv.</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {stages.map((s, i) => (
          <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-[#E2DED6] transition-all cursor-default ${s.color} bg-opacity-40`} style={{ width: `${100 - (i * 6)}%` }}>
            <div className="flex flex-col">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${s.text}`}>{s.label}</span>
              <span className="text-[13px] font-bold text-[#1C1C1E]">{s.value}</span>
            </div>
            <span className="text-[11px] font-bold text-[#6B6B70]">({s.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskNotification = ({ onManageTasks }) => (
  <div className="flex items-center gap-4 bg-[#fdfaf1]/80 backdrop-blur-sm border border-[#fde68a]/60 rounded-xl p-4 mb-8 animate-[pulse_3s_infinite] shadow-sm">
    <div className="w-10 h-10 rounded-full bg-[#f59e0b] bg-opacity-10 flex items-center justify-center text-[#f59e0b] text-xl border border-[#f59e0b] border-opacity-20 shadow-inner"><ClipboardList size={16} className="inline-block" /></div>
    <div className="flex-1">
      <div className="text-[14px] font-bold text-[#92400e] flex items-center gap-2">Priority Tasks Due Today <span className="bg-[#f59e0b] text-white text-[10px] px-1.5 py-0.5 rounded-full">3</span></div>
      <div className="text-[12px] text-[#b45309] font-medium opacity-80 mt-0.5">Follow up with Priya R. (VIP) · Restock Lavender Blazer · Process Shopify Batch</div>
    </div>
    <button onClick={onManageTasks} className="text-[12px] font-bold text-[#f59e0b] hover:bg-[#fff7ed] px-4 py-2 rounded-lg transition-all border border-[#fde68a]">Manage Tasks</button>
  </div>
);

const Overview = ({ plan, setPlan, setActiveTab }) => {
  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto">
      <TaskNotification onManageTasks={() => setActiveTab('Tasks')} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-[20px] font-bold text-[#1C1C1E] flex items-center gap-2">Overview <span className="text-[#6B6B70] font-normal">— Summer 2026</span></h1>
          <p className="text-[#6B6B70] text-[13px] mt-1">Last updated: today, 10:42 AM</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="bg-[#f3e8ff] px-2 py-1.5 rounded-md border border-[#d8b4fe] flex items-center gap-2 mr-2">
            <span className="text-[11px] font-bold text-[#9333ea] uppercase">Plan:</span>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className="bg-transparent border-none text-[13px] font-bold text-[#a855f7] focus:outline-none cursor-pointer">
              <option value="Starter">Starter (Free)</option>
              <option value="Professional">Professional</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <button onClick={() => setActiveTab('Customers')} className="bg-[#a855f7] text-white px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:bg-[#9333ea] shadow-sm">+ Add Customer</button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        <StatCard title="Total Revenue" value="₹38.4L" change="14.2%" isPositive={true} />
        <StatCard title="Active Customers" value={plan === 'Starter' ? '184 / 200' : '2,841'} change="8.6%" isPositive={true} />
        <StatCard title="Total Orders" value="1,472" change="12.4%" isPositive={true} />
        <StatCard title="Avg Order Value" value="₹2,340" change="5.1%" isPositive={true} />
        <StatCard title="Return Rate" value="11.2%" change="3.4%" isPositive={true} />
      </div>

      {/* Upper Section: All 6 Activity/Business Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {/* Box 1: Inventory Alerts */}
        <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#a855f7] to-[#d8b4fe]"></div>
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-[#7c3aed] text-[18px]">Inventory Alerts</h3>
              <span className="text-[12px] font-bold bg-[#fef2f2] text-[#ef4444] px-2.5 py-1 rounded w-fit mt-1.5">6 items low</span>
            </div>
            <button onClick={() => setActiveTab('Inventory')} className="bg-[#a855f7] text-white px-4 py-2 rounded-lg text-[14px] font-bold hover:bg-[#9333ea] transition-all shadow-sm">+ Add Stock</button>
          </div>
          <div className="flex flex-col gap-5 flex-1">
            {[
              { name: 'Linen Kurta Set', count: '8 left', color: 'bg-[#10b981]' },
              { name: 'Lavender Blazer', count: '5 left', color: 'bg-[#a855f7]' },
              { name: 'Coral Maxi Dress', count: '42 left', color: 'bg-[#f472b6]' },
              { name: 'Indigo Jogger', count: '12 left', color: 'bg-[#3b82f6]' },
              { name: 'Silk Scarves', count: '2 left', color: 'bg-[#ef4444]' },
              { name: 'Denim Jacket', count: '3 left', color: 'bg-[#f59e0b]' },
              { name: 'Cotton Tunic', count: '7 left', color: 'bg-[#10b981]' },
            ].map((inv, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-[#d8b4fe]/10">
                <div className="flex items-center gap-4">
                  <div className={`w-3.5 h-3.5 rounded-sm ${inv.color}`}></div>
                  <div className="text-[16px] font-bold text-[#1C1C1E]">{inv.name}</div>
                </div>
                <div className="text-[14px] font-bold text-[#6B6B70]">{inv.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 2: Top Suppliers */}
        <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#a855f7] to-[#d8b4fe]"></div>
          <h3 className="font-bold text-[#7c3aed] text-[18px] mb-8">Top Suppliers</h3>
          <div className="flex flex-col gap-5 flex-1">
            {[
              { name: 'Saree Palace', status: 'Active' },
              { name: 'Trendsetters Inc', status: 'In-Transit' },
              { name: 'Global Weaves', status: 'Active' },
              { name: 'Fit Fabrics', status: 'On Hold' },
              { name: 'Style Weaves', status: 'Active' },
              { name: 'Textile Hub', status: 'Active' },
              { name: 'Modern Silks', status: 'In-Transit' },
            ].map((sup, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-[#d8b4fe]/10">
                <div className="text-[16px] font-bold text-[#1C1C1E]">{sup.name}</div>
                <div className={`text-[12px] font-bold px-3.5 py-1.5 rounded ${sup.status === 'Active' ? 'bg-[#ecfdf5] text-[#10b981]' : 'bg-[#eff6ff] text-[#3b82f6]'}`}>{sup.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 3: Sales Funnel */}
        <SalesFunnel />

        {/* Box 4: Top Customers */}
        <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#a855f7] to-[#d8b4fe]"></div>
          <h3 className="font-bold text-[#7c3aed] text-[18px] mb-8">Top Customers</h3>
          <div className="flex flex-col gap-5 flex-1">
            {[
              { initials: 'PR', name: 'Priya R.', ltv: '₹58,400', c: 'bg-[#f3e8ff] text-[#a855f7]' },
              { initials: 'AM', name: 'Arjun M.', ltv: '₹44,200', c: 'bg-[#e0f2fe] text-[#0ea5e9]' },
              { initials: 'SK', name: 'Shruti K.', ltv: '₹28,900', c: 'bg-[#fef3c7] text-[#d97706]' },
              { initials: 'NP', name: 'Neha P.', ltv: '₹21,700', c: 'bg-[#fce7f3] text-[#db2777]' },
              { initials: 'MS', name: 'Meera S.', ltv: '₹12,400', c: 'bg-[#ecfdf5] text-[#10b981]' },
              { initials: 'RK', name: 'Rahul K.', ltv: '₹9,800', c: 'bg-[#fff7ed] text-[#ea580c]' },
              { initials: 'AD', name: 'Anjali D.', ltv: '₹8,200', c: 'bg-[#eef2ff] text-[#6366f1]' }
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-[#d8b4fe]/10">
                <div className="flex items-center gap-5">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold ${c.c}`}>{c.initials}</div>
                  <div className="text-[16px] font-bold text-[#1C1C1E]">{c.name}</div>
                </div>
                <div className="text-[16px] font-bold text-[#1C1C1E]">{c.ltv}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 5: Customer Segments */}
        <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#a855f7] to-[#d8b4fe]"></div>
          <h3 className="font-bold text-[#7c3aed] text-[18px] mb-8">Customer Segments</h3>
          <div className="flex flex-col gap-5 flex-1">
            <SegmentRow title="VIP / Loyalists" desc="AOV ₹4,800" users="112" colorClass="text-[#a855f7] bg-[#f3e8ff]" />
            <SegmentRow title="Repeat buyers" desc="AOV ₹2,100" users="1,056" colorClass="text-[#3b82f6] bg-[#eff6ff]" />
            <SegmentRow title="First time buyers" desc="AOV ₹1,450" users="893" colorClass="text-[#10b981] bg-[#ecfdf5]" />
            <SegmentRow title="Dormant clients" desc="No activity 60d" users="245" colorClass="text-[#ef4444] bg-[#fef2f2]" />
            <SegmentRow title="At Risk" desc="No order 30d" users="412" colorClass="text-[#f59e0b] bg-[#fffaf1]" />
            <SegmentRow title="Recent Leads" desc="Joined this week" users="87" colorClass="text-[#06b6d4] bg-[#ecfeff]" />
          </div>
        </div>

        {/* Box 6: Recent Activity */}
        <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#a855f7] to-[#d8b4fe]"></div>
          <h3 className="font-bold text-[#7c3aed] text-[18px] mb-8">Recent Activity</h3>
          <div className="flex flex-col gap-6 flex-1 relative before:absolute before:left-[17.5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#d8b4fe]/20">
            {[
              { icon: '⭐', bg: 'bg-[#f3e8ff]', text: 'Priya R. upgraded to VIP', time: '2h ago' },
              { icon: '⚠️', bg: 'bg-[#fef2f2]', text: 'Lavender Blazer stock alert', time: '3h ago' },
              { icon: '✅', bg: 'bg-[#ecfdf5]', text: 'Summer flash sale live', time: 'Yesterday' },
              { icon: '🛍️', bg: 'bg-[#eff6ff]', text: '147 new orders processed', time: 'Yesterday' },
              { icon: '🚚', bg: 'bg-[#fdf2f8]', text: 'Supplier order shipped', time: 'Yesterday' },
              { icon: '🆕', bg: 'bg-[#ecfeff]', text: '87 new leads captured', time: '2 days ago' },
              { icon: '💡', bg: 'bg-[#fef9c3]', text: 'New strategy report', time: '2 days ago' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 relative z-10">
                <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[13px] border-[2px] border-white ${act.bg}`}>{act.icon}</div>
                <div className="pt-1">
                  <div className="text-[15px] font-bold text-[#1C1C1E] leading-tight">{act.text}</div>
                  <div className="text-[12px] text-[#6B6B70] mt-0.5">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last Section: Revenue Growth Matrix (Full Width) */}
      <div className="relative">
        <div className="bg-gradient-to-br from-[#f3e8ff]/70 to-white/80 backdrop-blur-md border border-[#d8b4fe]/30 rounded-xl p-8 shadow-sm flex flex-col min-h-[480px] hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]"></div>
          <h3 className="font-bold text-[#7c3aed] text-xl underline decoration-[#d8b4fe] decoration-4 underline-offset-8 mb-4">Revenue Growth Matrix</h3>
          <p className="text-[14px] text-[#6B6B70] mb-6">Comprehensive tracking across all collection segments</p>
          <div className="flex-1">
            <PercentageAreaChart />
          </div>
        </div>

        {plan === 'Professional' && (
          <div className="absolute inset-0 z-20 backdrop-blur-[4px] bg-white/30 flex items-center justify-center rounded-xl border border-[#d8b4fe]/20">
            <div className="bg-white p-8 rounded-2xl shadow-2xl border border-[#f3e8ff] text-center max-w-[350px]">
              <div className="text-4xl mb-4"><BarChart2 size={16} className="inline-block" /></div>
              <h3 className="font-bold text-[#1C1C1E] mb-2">Upgrade to Business</h3>
              <p className="text-[13px] text-[#6B6B70] mb-6">Unlock full growth matrix and advanced matrix metrics with the Business plan.</p>
              <button onClick={() => setPlan('Business')} className="w-full bg-[#a855f7] text-white py-3 rounded-xl font-bold hover:bg-[#9333ea] shadow-lg transition-all">Upgrade to Business</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
