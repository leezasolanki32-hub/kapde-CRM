import React, { useState, useEffect } from 'react';
import { StatCard, Bar, SegmentRow } from '../DashboardComponents';
import { ClipboardList, AlertTriangle, Check, ShoppingBag, Truck, Lightbulb, BarChart2 } from "lucide-react";
import { api } from '../../../api';

const PercentageAreaChart = () => (
  <div className="w-full mt-6 animate-[slideDownFade_0.5s_ease-out] h-full flex flex-col">
    <div className="relative flex-1 w-full bg-[#0a1628]/20 rounded-xl p-8 border border-[#93c5fd]/15 overflow-hidden flex flex-col justify-center">
      {/* Y-Axis Labels */}
      <div className="absolute left-6 top-10 bottom-16 flex flex-col justify-between text-[11px] text-[#93c5fd] font-bold">
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
          <line x1="0" y1="300" x2="1000" y2="300" stroke="#1e3a5f" strokeWidth="2" />
        </svg>
        <div className="flex justify-between mt-2 text-[10px] text-[#93c5fd] px-2 font-bold">
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
        <ul className="text-[10px] text-[#93c5fd] space-y-1 border-t border-[#1e3a5f] pt-2">
          <li>Capture audience attention</li>
          <li>Detailed revenue trends</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] text-[#3B82F6] font-bold">Option</span>
          <span className="text-[20px] text-[#3B82F6] font-bold">02</span>
        </div>
        <ul className="text-[10px] text-[#93c5fd] space-y-1 border-t border-[#1e3a5f] pt-2">
          <li>Customer reach</li>
          <li>Engagement metrics</li>
        </ul>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[12px] text-[#FF6B9B] font-bold">Option</span>
          <span className="text-[20px] text-[#FF6B9B] font-bold">01</span>
        </div>
        <ul className="text-[10px] text-[#93c5fd] space-y-1 border-t border-[#1e3a5f] pt-2">
          <li>Final conversion</li>
          <li>Return on investment</li>
        </ul>
      </div>
    </div>
  </div>
);

const SalesFunnel = () => {
  const stages = [
    { label: 'Raw', value: '₹12.4L', count: 184, color: 'bg-[#0a1628]', text: 'text-[#3b82f6]' },
    { label: 'New', value: '₹8.9L', count: 112, color: 'bg-[#080d1a]', text: 'text-[#0ea5e9]' },
    { label: 'Discussion', value: '₹5.2L', count: 64, color: 'bg-[#dcfce7]', text: 'text-[#16a34a]' },
    { label: 'Demo', value: '₹2.1L', count: 32, color: 'bg-[#fff7ed]', text: 'text-[#ea580c]' },
    { label: 'Proposal', value: '₹1.4L', count: 14, color: 'bg-[#fef2f2]', text: 'text-[#dc2626]' },
    { label: 'Decided', value: '₹95K', count: 9, color: 'bg-[#fafaf9]', text: 'text-[#44403c]' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0a1628]/70 to-[#0a1628]/80 backdrop-blur-md border border-[#93c5fd]/30 rounded-xl p-6 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden card-hover-lift animate-fade-in-up" style={{ animationDelay: '150ms' }}>
      <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#3b82f6] to-[#93c5fd]"></div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-[#1d4ed8]">Sales Funnel</h3>
        <span className="text-[11px] font-bold text-[#93c5fd] uppercase">4.8% Conv.</span>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {stages.map((s, i) => (
          <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg border border-transparent hover:border-[#1e3a5f] transition-all cursor-default ${s.color} bg-opacity-40`} style={{ width: `${100 - (i * 6)}%` }}>
            <div className="flex flex-col">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${s.text}`}>{s.label}</span>
              <span className="text-[13px] font-bold text-[#e8f0fe]">{s.value}</span>
            </div>
            <span className="text-[11px] font-bold text-[#93c5fd]">({s.count})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskNotification = ({ onManageTasks }) => (
  <div className="flex items-center gap-4 bg-[#080d1a]/80 backdrop-blur-sm border border-[#f59e0b]/60 rounded-xl p-4 mb-8 animate-[pulse_3s_infinite] shadow-sm">
    <div className="w-10 h-10 rounded-full bg-[#f59e0b] bg-opacity-10 flex items-center justify-center text-[#f59e0b] text-xl border border-[#f59e0b] border-opacity-20 shadow-inner"><ClipboardList size={16} className="inline-block" /></div>
    <div className="flex-1">
      <div className="text-[14px] font-bold text-[#fcd34d] flex items-center gap-2">Priority Tasks Due Today <span className="bg-[#f59e0b] text-[#e8f0fe] text-[10px] px-1.5 py-0.5 rounded-full">3</span></div>
      <div className="text-[12px] text-[#fbbf24] font-medium opacity-80 mt-0.5">Follow up with Priya R. (VIP) · Restock Lavender Blazer · Process Shopify Batch</div>
    </div>
    <button onClick={onManageTasks} className="text-[12px] font-bold text-[#f59e0b] hover:bg-[#f59e0b]/20 px-4 py-2 rounded-lg transition-all border border-[#f59e0b]">Manage Tasks</button>
  </div>
);

const Overview = ({ plan, setPlan, setActiveTab, currentUser }) => {
  const [stats, setStats] = useState({
    totalRevenue: '₹0',
    activeCustomers: '0',
    totalOrders: '0',
    avgOrderValue: '₹0',
    returnRate: '0%'
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        if (!currentUser?.id) return;
        const [orders, customers] = await Promise.all([
          api.getOrders(currentUser.id),
          api.getCustomers(currentUser.id)
        ]);

        const revenue = orders.reduce((sum, order) => sum + (parseFloat(order.amt?.toString().replace(/[^0-9.-]+/g, '')) || 0), 0);
        
        setStats({
          totalRevenue: `₹${revenue.toLocaleString()}`,
          activeCustomers: `${customers.length}`,
          totalOrders: `${orders.length}`,
          avgOrderValue: orders.length > 0 ? `₹${Math.round(revenue / orders.length).toLocaleString()}` : '₹0',
          returnRate: '0%'
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
    fetchDashboardStats();
  }, [currentUser]);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto">
      <TaskNotification onManageTasks={() => setActiveTab('Tasks')} />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-[20px] font-bold text-[#e8f0fe] flex items-center gap-2">Overview <span className="text-[#93c5fd] font-normal">— Summer 2026</span></h1>
          <p className="text-[#93c5fd] text-[13px] mt-1">Last updated: today, 10:42 AM</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <div className="bg-[#0a1628] px-2 py-1.5 rounded-md border border-[#93c5fd] flex items-center gap-2 mr-2">
            <span className="text-[11px] font-bold text-[#2563eb] uppercase">Plan:</span>
            <select value={plan} onChange={(e) => setPlan(e.target.value)} className="bg-transparent border-none text-[13px] font-bold text-[#3b82f6] focus:outline-none cursor-pointer">
              <option value="Starter">Starter (Free)</option>
              <option value="Professional">Professional</option>
              <option value="Business">Business</option>
            </select>
          </div>
          <button onClick={() => setActiveTab('Customers')} className="bg-[#3b82f6] text-[#e8f0fe] px-5 py-2.5 rounded-lg text-[14px] font-semibold hover:bg-[#2563eb] shadow-sm">+ Add Customer</button>
        </div>
      </div>

      {/* Top Stats Cards */}
      <div className="flex gap-4 md:gap-6 mb-10 overflow-x-auto pb-4 no-scrollbar">
        <StatCard title="Total Revenue" value={stats.totalRevenue} change="0%" isPositive={true} />
        <StatCard title="Active Customers" value={stats.activeCustomers} change="0%" isPositive={true} />
        <StatCard title="Total Orders" value={stats.totalOrders} change="0%" isPositive={true} />
        <StatCard title="Avg Order Value" value={stats.avgOrderValue} change="0%" isPositive={true} />
        <StatCard title="Return Rate" value={stats.returnRate} change="0%" isPositive={true} />
      </div>

      {/* Upper Section: All 6 Activity/Business Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-10">
        {/* Box 1: Inventory Alerts */}
        <div className="bg-gradient-to-br from-[#0a1628]/70 to-[#0a1628]/80 backdrop-blur-md border border-[#93c5fd]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden card-hover-lift animate-fade-in-up">
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#3b82f6] to-[#93c5fd]"></div>
          <div className="flex justify-between items-start mb-8">
            <div className="flex flex-col">
              <h3 className="font-bold text-[#1d4ed8] text-[18px]">Inventory Alerts</h3>
              <span className="text-[12px] font-bold bg-[#fef2f2] text-[#ef4444] px-2.5 py-1 rounded w-fit mt-1.5">6 items low</span>
            </div>
            <button onClick={() => setActiveTab('Inventory')} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-lg text-[14px] font-bold hover:bg-[#2563eb] transition-all shadow-sm">+ Add Stock</button>
          </div>
          <div className="flex flex-col gap-5 flex-1">
            {[].map((c, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-[#93c5fd]/10">
                <div className="flex items-center gap-5">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-[13px] font-bold ${c.c}`}>{c.initials}</div>
                  <div className="text-[16px] font-bold text-[#e8f0fe]">{c.name}</div>
                </div>
                <div className="text-[16px] font-bold text-[#e8f0fe]">{c.ltv}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Box 5: Customer Segments */}
        <div className="bg-gradient-to-br from-[#0a1628]/70 to-[#0a1628]/80 backdrop-blur-md border border-[#93c5fd]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden card-hover-lift animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#3b82f6] to-[#93c5fd]"></div>
          <h3 className="font-bold text-[#1d4ed8] text-[18px] mb-8">Customer Segments</h3>
          <div className="flex flex-col gap-5 flex-1">
            <SegmentRow title="VIP / Loyalists" desc="AOV ₹4,800" users="112" colorClass="text-[#3b82f6] bg-[#0a1628]" />
            <SegmentRow title="Repeat buyers" desc="AOV ₹2,100" users="1,056" colorClass="text-[#3b82f6] bg-[#0a1628]" />
            <SegmentRow title="First time buyers" desc="AOV ₹1,450" users="893" colorClass="text-[#10b981] bg-[#ecfdf5]" />
            <SegmentRow title="Dormant clients" desc="No activity 60d" users="245" colorClass="text-[#ef4444] bg-[#fef2f2]" />
            <SegmentRow title="At Risk" desc="No order 30d" users="412" colorClass="text-[#f59e0b] bg-[#fffaf1]" />
            <SegmentRow title="Recent Leads" desc="Joined this week" users="87" colorClass="text-[#06b6d4] bg-[#ecfeff]" />
          </div>
        </div>

        {/* Box 6: Recent Activity */}
        <div className="bg-gradient-to-br from-[#0a1628]/70 to-[#0a1628]/80 backdrop-blur-md border border-[#93c5fd]/30 rounded-xl p-7 shadow-sm h-full flex flex-col hover:shadow-lg hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden card-hover-lift animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-[#3b82f6] to-[#93c5fd]"></div>
          <h3 className="font-bold text-[#1d4ed8] text-[18px] mb-8">Recent Activity</h3>
          <div className="flex flex-col gap-6 flex-1 relative before:absolute before:left-[17.5px] before:top-2 before:bottom-2 before:w-[2px] before:bg-[#93c5fd]/20">
            {[
              { icon: '⭐', bg: 'bg-[#0a1628]', text: 'Priya R. upgraded to VIP', time: '2h ago' },
              { icon: '⚠️', bg: 'bg-[#fef2f2]', text: 'Lavender Blazer stock alert', time: '3h ago' },
              { icon: '✅', bg: 'bg-[#ecfdf5]', text: 'Summer flash sale live', time: 'Yesterday' },
              { icon: '🛍️', bg: 'bg-[#0a1628]', text: '147 new orders processed', time: 'Yesterday' },
              { icon: '🚚', bg: 'bg-[#fdf2f8]', text: 'Supplier order shipped', time: 'Yesterday' },
              { icon: '🆕', bg: 'bg-[#ecfeff]', text: '87 new leads captured', time: '2 days ago' },
              { icon: '💡', bg: 'bg-[#fef9c3]', text: 'New strategy report', time: '2 days ago' },
            ].map((act, i) => (
              <div key={i} className="flex items-start gap-4 relative z-10">
                <div className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-[13px] border-[2px] border-[#3b82f6]/20 ${act.bg}`}>{act.icon}</div>
                <div className="pt-1">
                  <div className="text-[15px] font-bold text-[#e8f0fe] leading-tight">{act.text}</div>
                  <div className="text-[12px] text-[#93c5fd] mt-0.5">{act.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Last Section: Revenue Growth Matrix (Full Width) */}
      <div className="relative">
        <div className="bg-gradient-to-br from-[#0a1628]/70 to-[#0a1628]/80 backdrop-blur-md border border-[#93c5fd]/30 rounded-xl p-8 shadow-sm flex flex-col min-h-[480px] hover:shadow-lg hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden card-hover-lift animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]"></div>
          <h3 className="font-bold text-[#1d4ed8] text-xl underline decoration-[#93c5fd] decoration-4 underline-offset-8 mb-4">Revenue Growth Matrix</h3>
          <p className="text-[14px] text-[#93c5fd] mb-6">Comprehensive tracking across all collection segments</p>
          <div className="flex-1">
            <PercentageAreaChart />
          </div>
        </div>

        {plan === 'Professional' && (
          <div className="absolute inset-0 z-20 backdrop-blur-[4px] bg-[#0a1628]/30 flex items-center justify-center rounded-xl border border-[#93c5fd]/20">
            <div className="bg-[#0a1628] p-8 rounded-2xl shadow-2xl border border-[#0a1628] text-center max-w-[350px]">
              <div className="text-4xl mb-4"><BarChart2 size={16} className="inline-block" /></div>
              <h3 className="font-bold text-[#e8f0fe] mb-2">Upgrade to Business</h3>
              <p className="text-[13px] text-[#93c5fd] mb-6">Unlock full growth matrix and advanced matrix metrics with the Business plan.</p>
              <button onClick={() => setPlan('Business')} className="w-full bg-[#3b82f6] text-[#e8f0fe] py-3 rounded-xl font-bold hover:bg-[#2563eb] shadow-lg transition-all">Upgrade to Business</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Overview;
