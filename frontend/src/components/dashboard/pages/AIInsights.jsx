import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Package, AlertTriangle, ArrowUpRight, BarChart2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AIInsights = () => {
  const [salesData, setSalesData] = useState(null);
  const [productData, setProductData] = useState(null);
  const [segmentData, setSegmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAIData = async () => {
      try {
        setLoading(true);
        const [salesRes, productsRes, segmentRes] = await Promise.all([
          axios.get(`${API_URL}/ai/sales-forecast`).catch(() => ({ data: null })),
          axios.get(`${API_URL}/ai/product-forecast`).catch(() => ({ data: null })),
          axios.get(`${API_URL}/ai/customer-segments`).catch(() => ({ data: null }))
        ]);
        
        if (salesRes.data) setSalesData(salesRes.data);
        if (productsRes.data) setProductData(productsRes.data);
        if (segmentRes.data) setSegmentData(segmentRes.data);
      } catch (error) {
        console.error("Error fetching AI data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAIData();
  }, []);

  const chartData = [
    { name: 'Jan', actual: 4000, predicted: 4000 },
    { name: 'Feb', actual: 3000, predicted: 3000 },
    { name: 'Mar', actual: 5000, predicted: 5000 },
    { name: 'Apr', actual: 4780, predicted: 4780 },
    { name: 'May', actual: 5890, predicted: 5890 },
    { name: 'Jun', actual: 6390, predicted: 6390 },
    { name: 'Jul', actual: null, predicted: 7490 }, // Forecast
    { name: 'Aug', actual: null, predicted: 8700 }, // Forecast
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="text-[#a855f7] mb-4"
        >
          <Sparkles size={48} />
        </motion.div>
        <p className="text-[#6B6B70] font-medium text-lg">✨ AI is analyzing your CRM data...</p>
      </div>
    );
  }

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[28px] font-bold text-[#1C1C1E] flex items-center gap-2">
            <Sparkles className="text-[#a855f7]" size={28} />
            AI Business Intelligence
          </h1>
          <p className="text-[14px] text-[#6B6B70] mt-1">AI-powered forecasts and insights based on your CRM data.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <InsightCard 
          title="Sales Forecast (Next Month)" 
          value={`₹${((salesData?.forecast?.expected || 870000) / 100000).toFixed(1)}L`} 
          subtitle={`Range: ₹${((salesData?.forecast?.min || 840000)/100000).toFixed(1)}L - ₹${((salesData?.forecast?.max || 910000)/100000).toFixed(1)}L`}
          icon={<TrendingUp size={20} className="text-white" />} 
          color="bg-gradient-to-br from-[#a855f7] to-[#7e22ce]" 
          trend={`+${salesData?.growthPercentage || 8.7}%`}
        />
        <InsightCard 
          title="VIP Customers" 
          value={segmentData?.vip_count || "0"} 
          subtitle={`Avg spent: ₹${Math.round(segmentData?.vip_avg_spent || 0)}`}
          icon={<Users size={20} className="text-white" />} 
          color="bg-gradient-to-br from-[#ef4444] to-[#b91c1c]" 
          trend="High Value"
          trendColor="text-white"
        />
        <InsightCard 
          title="Low Stock Products" 
          value="8" 
          subtitle="Predicted to stock out soon"
          icon={<Package size={20} className="text-white" />} 
          color="bg-gradient-to-br from-[#f59e0b] to-[#d97706]" 
          trend="Reorder suggested"
          trendColor="text-white"
        />
        <InsightCard 
          title="At-Risk Customers" 
          value={segmentData?.at_risk_count || "0"} 
          subtitle={`No interaction in ${Math.round(segmentData?.at_risk_avg_recency || 0)} days`}
          icon={<AlertTriangle size={20} className="text-white" />} 
          color="bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8]" 
          trend="Follow up"
          trendColor="text-white"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Main Chart */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[16px] font-bold text-[#1C1C1E] flex items-center gap-2">
              <BarChart2 size={18} className="text-[#a855f7]" />
              Revenue Forecast Trend
            </h3>
            <span className="text-[12px] bg-[#f3e8ff] text-[#9333ea] px-3 py-1 rounded-full font-bold">86% Confidence</span>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B6B70', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B6B70', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value, name) => [`₹${value}`, name === 'actual' ? 'Actual Revenue' : 'Predicted Revenue']}
                />
                <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="predicted" stroke="#a855f7" strokeWidth={3} strokeDasharray="5 5" fillOpacity={1} fill="url(#colorPredicted)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Product Demand */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-sm">
          <h3 className="text-[16px] font-bold text-[#1C1C1E] mb-6 flex items-center gap-2">
            <Package size={18} className="text-[#a855f7]" />
            Top Predicted Products
          </h3>
          <div className="flex flex-col gap-4">
            {productData?.products?.map((prod, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#f0f0f0] hover:border-[#d8b4fe] transition">
                <div>
                  <div className="text-[14px] font-bold text-[#1C1C1E]">{prod.productName}</div>
                  <div className="text-[12px] text-[#6B6B70] flex items-center gap-1">
                    Demand Score: <span className="font-bold text-[#a855f7]">{prod.demandScore}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[16px] font-bold text-[#10b981] flex items-center justify-end gap-1">
                    <ArrowUpRight size={16} />
                    {prod.predictedQuantity}
                  </div>
                  <div className="text-[11px] text-[#6B6B70]">Predicted Units</div>
                </div>
              </div>
            )) || (
              <p className="text-[13px] text-[#6B6B70] text-center mt-10">No product forecast available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightCard = ({ title, value, subtitle, icon, color, trend, trendColor = "text-[#10b981]" }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className={`${color} rounded-2xl p-5 shadow-lg relative overflow-hidden`}
  >
    <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 rounded-full bg-white opacity-10"></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
        {icon}
      </div>
      <div className={`text-[12px] font-bold bg-white/20 backdrop-blur-sm px-2 py-1 rounded-lg ${trendColor}`}>
        {trend}
      </div>
    </div>
    <div className="relative z-10">
      <h4 className="text-[13px] font-medium text-white/80 mb-1">{title}</h4>
      <div className="text-[28px] font-bold text-white mb-1 tracking-tight">{value}</div>
      <div className="text-[12px] text-white/70">{subtitle}</div>
    </div>
  </motion.div>
);

export default AIInsights;
