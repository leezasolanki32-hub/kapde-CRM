import React, { useState, useEffect } from 'react';
import { api } from '../../../api';

const MiniBarChart = ({ color }) => (
  <div className="flex items-end gap-1.5 h-10">
    <div className={`w-2 h-[40%] rounded-sm ${color} opacity-60`}></div>
    <div className={`w-2 h-[70%] rounded-sm ${color}`}></div>
    <div className={`w-2 h-[50%] rounded-sm ${color} opacity-80`}></div>
    <div className={`w-2 h-[100%] rounded-sm ${color}`}></div>
    <div className={`w-2 h-[60%] rounded-sm ${color} opacity-60`}></div>
  </div>
);

const StatCardImageStyle = ({ title, value, change, isPositive, color }) => (
  <div className="bg-white p-5 rounded-2xl flex justify-between items-center shadow-sm border border-gray-100">
    <div>
      <div className="text-[12px] text-gray-500 font-medium mb-1.5">{title}</div>
      <div className="text-[28px] font-bold text-[#0f172a] mb-1.5">{value}</div>
      <div className={`text-[11px] font-medium flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↗' : '↘'} {change} than last month
      </div>
    </div>
    <MiniBarChart color={color.split(' ')[0]} />
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
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 md:-mt-12 md:pr-[250px] relative z-10 pointer-events-none">
        <h1 className="text-[28px] font-bold text-[#0f172a] pointer-events-auto">Dashboard</h1>
      </div>

      {/* Row 1: 3 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <StatCardImageStyle 
          title="Total Revenue" 
          value={stats.totalRevenue} 
          change="2.3%" 
          isPositive={false} 
          color="bg-[#3b82f6]" 
        />
        <StatCardImageStyle 
          title="Active Customers" 
          value={stats.activeCustomers} 
          change="1.4%" 
          isPositive={false} 
          color="bg-[#ef4444]" 
        />
        <StatCardImageStyle 
          title="Total Orders" 
          value={stats.totalOrders} 
          change="5.1%" 
          isPositive={true} 
          color="bg-[#10b981]" 
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 flex-1">
        {/* Card 1: Donut Chart */}
        <div className="lg:col-span-3 bg-white border border-gray-100 p-6 rounded-[24px] flex flex-col items-center justify-center shadow-sm relative">
          <div className="w-full text-left text-[14px] font-bold text-[#0f172a] mb-8">Return Rate</div>
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
             <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
               <path strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f1f5f9" strokeWidth="6" />
               <path strokeDasharray="72, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="6" strokeLinecap="round" />
             </svg>
             <div className="absolute inset-0 flex items-center justify-center">
               <span className="text-[36px] font-bold text-[#0f172a]">72%</span>
             </div>
          </div>
          <div className="text-[11px] text-gray-500">Deviation Index 2%</div>
        </div>

        {/* Card 2: List */}
        <div className="lg:col-span-4 bg-white border border-gray-100 p-6 rounded-[24px] flex flex-col shadow-sm">
          <div className="text-[14px] font-bold text-[#0f172a] text-center mb-1">Customer Types</div>
          <div className="text-[44px] font-bold text-[#0f172a] text-center mb-6">86%</div>
          <div className="flex flex-col gap-3 mb-6">
            <div className="flex justify-between text-[13px] font-medium text-gray-600 items-center">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10b981]"></div> Retail</div>
              <span>52%</span>
            </div>
            <div className="flex justify-between text-[13px] font-medium text-gray-600 items-center">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10b981] opacity-60"></div> Wholesale</div>
              <span>22%</span>
            </div>
            <div className="flex justify-between text-[13px] font-medium text-gray-600 items-center">
              <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#10b981] opacity-30"></div> Corporate</div>
              <span>12%</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('Customers')}
            className="w-full py-2.5 rounded-xl border border-gray-200 text-[#0f172a] text-[13px] font-semibold hover:bg-gray-50 transition mt-auto"
          >
            View Details
          </button>
        </div>

        {/* Card 3: Map/Stats */}
        <div className="lg:col-span-5 bg-white border border-gray-100 p-6 rounded-[24px] shadow-sm flex flex-col relative overflow-hidden">
          <div className="text-[15px] font-bold text-[#0f172a] mb-1">Regional Sales Distribution</div>
          <div className="text-[12px] text-gray-500 mb-6 max-w-[200px]">Percentage of sales across different regions in India.</div>
          
          <div className="flex flex-col sm:flex-row z-10 h-full">
            <div className="flex flex-col gap-4 w-full sm:w-1/2 justify-center mb-6 sm:mb-0">
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0f172a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444]"></div> Maharashtra - 89%
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0f172a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] opacity-80"></div> Delhi - 82%
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0f172a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] opacity-60"></div> Karnataka - 85%
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0f172a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] opacity-40"></div> Gujarat - 80%
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium text-[#0f172a]">
                <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] opacity-30"></div> Others - 79%
              </div>
            </div>
            
            {/* Abstract Map Graphic */}
            <div className="w-full sm:w-1/2 flex items-center justify-center relative mt-4 sm:mt-0">
               <svg viewBox="0 0 100 100" className="w-[140px] h-[140px] text-[#ef4444] opacity-80" fill="currentColor">
                 <path d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90C27.9 90 10 72.1 10 50S27.9 10 50 10s40 17.9 40 40-17.9 40-40 40z" fillOpacity="0.1"/>
                 <circle cx="30" cy="40" r="4" />
                 <circle cx="60" cy="30" r="6" />
                 <circle cx="45" cy="70" r="5" />
                 <circle cx="70" cy="60" r="3" />
                 <path d="M30 40 L60 30 L70 60 L45 70 Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.3"/>
               </svg>
               {/* Tooltip-like element over map */}
               <div className="absolute top-[20%] -right-[5%] bg-[#0f172a] px-3 py-1.5 rounded-lg border border-gray-700 shadow-xl">
                 <div className="text-[10px] font-bold text-white">Maharashtra</div>
                 <div className="text-[9px] text-gray-400">High Level <span className="text-white ml-2">89%</span></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Two small cards stacked */}
        <div className="lg:col-span-5 flex flex-col gap-4 justify-between h-auto lg:h-[180px]">
          {/* Dark Oval */}
          <div className="bg-[#0f172a] px-6 py-4 rounded-[32px] flex items-center gap-5 shadow-lg flex-1">
            <div className="w-[52px] h-[52px] rounded-full border-4 border-[#f97316] flex items-center justify-center text-[13px] font-bold text-white shrink-0">
              76.2
            </div>
            <div>
              <div className="text-[15px] font-bold text-white mb-0.5">Business Growth Index</div>
              <div className="text-[12px] text-gray-400">Impact of AI insights on revenue</div>
            </div>
          </div>
          
          {/* Light Oval */}
          <div className="bg-white border border-gray-100 px-6 py-4 rounded-[32px] flex items-center gap-5 shadow-sm flex-1">
            <div className="w-[52px] h-[52px] rounded-full border-4 border-[#10b981] flex items-center justify-center text-[13px] font-bold text-[#0f172a] shrink-0">
              57m
            </div>
            <div>
              <div className="text-[15px] font-bold text-[#0f172a] mb-0.5">Active Daily Users</div>
              <div className="text-[12px] text-gray-500">Average daily active sessions in minutes</div>
            </div>
          </div>
        </div>

        {/* Community Banner */}
        <div className="lg:col-span-7 bg-gradient-to-br from-[#1d4ed8] to-[#3b82f6] rounded-[32px] p-8 flex flex-col justify-between relative overflow-hidden shadow-lg min-h-[180px]">
          {/* Abstract background shapes */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none overflow-hidden">
             <svg viewBox="0 0 200 200" className="absolute -right-10 top-0 w-full h-full text-white/10" fill="currentColor">
               <path d="M100,0 C155.228,0 200,44.772 200,100 C200,155.228 155.228,200 100,200 C44.772,200 0,155.228 0,100 C0,44.772 44.772,0 100,0 Z" />
             </svg>
             <svg viewBox="0 0 200 200" className="absolute -right-20 -bottom-10 w-[120%] h-[120%] text-white/5" fill="currentColor">
               <path d="M100,0 C155.228,0 200,44.772 200,100 C200,155.228 155.228,200 100,200 C44.772,200 0,155.228 0,100 C0,44.772 44.772,0 100,0 Z" />
             </svg>
          </div>
          
          <div className="flex items-center justify-between w-full relative z-10 mb-2">
            <div className="flex items-center gap-2 text-white/90 text-[13px] font-bold">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="currentColor"><path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9zM12 4.15L6.04 7.5 12 10.85l5.96-3.35L12 4.15z"/></svg>
              KapdeCRM Global
            </div>
            <div className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white cursor-pointer hover:bg-white/10 transition">
              ↗
            </div>
          </div>
          
          <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-end mt-auto gap-6 sm:gap-0">
            <div>
              <div className="text-[32px] font-bold text-white leading-[1.1] mb-4 max-w-[280px]">
                Let's join our community
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <img src="https://i.pravatar.cc/100?img=1" alt="user" className="w-8 h-8 rounded-full border-2 border-[#1d4ed8]" />
                  <img src="https://i.pravatar.cc/100?img=2" alt="user" className="w-8 h-8 rounded-full border-2 border-[#1d4ed8]" />
                  <img src="https://i.pravatar.cc/100?img=3" alt="user" className="w-8 h-8 rounded-full border-2 border-[#1d4ed8]" />
                </div>
                <div className="text-white text-[13px] font-medium">230k+ people</div>
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-col gap-2 items-end">
               <div className="bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] text-white font-semibold">Ecology Systems</div>
               <div className="bg-white text-[#1d4ed8] px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-lg flex items-center gap-2">Global Statistic <div className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8] animate-pulse"></div></div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Overview;
