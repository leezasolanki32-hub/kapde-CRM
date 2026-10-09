import React, { useState } from 'react';
import { 
  IndianRupee, 
  Send, 
  Phone, 
  AlertCircle, 
  TrendingUp, 
  ChevronRight,
  UserPlus,
  Calendar,
  BookOpen,
  PlayCircle,
  Filter
} from 'lucide-react';
import { StatCard } from '../DashboardComponents';

const RecoveryRow = ({ name, amount, daysOverdue, lastReminder, risk }) => {
  const getRiskColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'bg-red-50 text-red-600 border-red-200';
      case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'low': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default: return 'bg-slate-50 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="flex items-center justify-between p-5 hover:bg-blue-50/30 transition-all border-b border-gray-100 group bg-white">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[14px]">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-bold text-[#0f172a] text-[15px]">{name}</h4>
          <div className="text-[12px] text-gray-500 font-medium">Last reminder: {lastReminder}</div>
        </div>
      </div>

      <div className="flex-1 text-center font-bold text-[#0f172a] text-[16px]">
        ₹ {amount}
      </div>

      <div className="flex-1 text-center">
        <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold border ${getRiskColor(risk)} uppercase tracking-wider shadow-sm`}>
          {risk} Risk
        </div>
      </div>

      <div className="flex-1 text-center">
        <div className={`text-[15px] font-bold ${daysOverdue > 30 ? 'text-red-500' : 'text-amber-500'}`}>
          {daysOverdue} days
        </div>
        <div className="text-[11px] text-gray-500 uppercase font-bold tracking-tighter">Overdue</div>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => alert(`Calling ${name} at registered number...`)}
          className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 active:scale-95 cursor-pointer transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
          title="Call Customer"
        >
          <Phone size={16} />
        </button>
        <button 
          onClick={() => alert(`Sending automated reminder to ${name}...`)}
          className="p-2.5 bg-white border border-gray-200 text-blue-600 rounded-xl hover:bg-blue-50 hover:border-blue-200 active:scale-95 cursor-pointer transition-all shadow-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20" 
          title="Send WhatsApp/SMS"
        >
          <Send size={16} />
          <span className="text-[13px] font-bold pr-1">Remind</span>
        </button>
      </div>
    </div>
  );
};

const Recovery = ({ setActiveTab }) => {
  const [filterActive, setFilterActive] = useState(false);

  const stats = [
    { title: 'Total Outstanding', value: '₹14.8L', change: '8.2% from last wk', isPositive: false, icon: <IndianRupee size={22} /> },
    { title: 'Overdue > 30 Days', value: '₹4.2L', change: '12% recovery rate', isPositive: true, icon: <AlertCircle size={22} /> },
    { title: 'Avg. Collection Period', value: '24 Days', change: '2 days faster', isPositive: true, icon: <TrendingUp size={22} /> },
    { title: 'Projected Recovery', value: '₹8.4L', change: 'Next 15 days', isPositive: true, icon: <Calendar size={22} /> },
  ];

  const debtors = [
    { name: "Priya Boutique", amount: "42,800", daysOverdue: 42, lastReminder: "2 days ago", risk: "High" },
    { name: "Global Threads", amount: "1,12,000", daysOverdue: 15, lastReminder: "1 week ago", risk: "Low" },
    { name: "Royal Silks", amount: "28,450", daysOverdue: 35, lastReminder: "Yesterday", risk: "Medium" },
    { name: "Vogue Studio", amount: "14,200", daysOverdue: 8, lastReminder: "Never", risk: "Low" },
    { name: "Urban Wear Co.", amount: "95,000", daysOverdue: 58, lastReminder: "4 days ago", risk: "High" },
  ];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-red-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-[32px] font-bold text-[#0f172a] tracking-tight flex items-center gap-4 mb-2">
            Payment Recovery 
            <span className="px-3 py-1 bg-red-50 text-red-600 text-[13px] font-bold rounded-full border border-red-100 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              12 Overdue
            </span>
          </h1>
          <p className="text-gray-500 text-[15px] font-medium">Monitor and accelerate your accounts receivable collections.</p>
        </div>
        <div className="flex gap-4 mt-6 md:mt-0 relative z-10">
          <button 
            onClick={() => setActiveTab('CreateAppointment')}
            className="bg-white border border-gray-200 text-gray-700 px-5 py-3 rounded-xl text-[14px] font-bold hover:bg-gray-50 hover:border-gray-300 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all shadow-sm flex items-center gap-2"
          >
            <Calendar size={18} /> Appointments
          </button>
          <button 
            onClick={() => setActiveTab('CreateRecoveryEntry')}
            className="bg-[#3b82f6] text-white px-6 py-3 rounded-xl text-[15px] font-bold hover:bg-[#2563eb] active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <UserPlus size={18} /> New Entry
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 hover:-translate-y-1 transition-all duration-300 group">
            <div className="flex items-center justify-between mb-5">
              <div className="w-12 h-12 bg-gray-50 text-gray-500 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors border border-gray-100 group-hover:border-blue-100">
                {s.icon}
              </div>
              <ChevronRight size={18} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
            </div>
            <div className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-1">{s.title}</div>
            <div className="text-[32px] font-bold text-[#0f172a] tracking-tight">{s.value}</div>
            <div className="flex items-center gap-1.5 mt-3">
              <span className={`text-[13px] font-bold px-2 py-0.5 rounded-md ${s.isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Debtors List */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden flex flex-col h-full">
            <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50/50 gap-4">
              <h3 className="font-bold text-[18px] text-[#0f172a]">Pending Collections</h3>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setFilterActive(!filterActive)}
                  className={`p-2.5 rounded-xl border transition-all ${filterActive ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}`}
                >
                  <Filter size={16} />
                </button>
                <div className="relative">
                  <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 pr-8 text-[14px] font-bold text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 appearance-none shadow-sm cursor-pointer transition-all">
                    <option>Newest First</option>
                    <option>Highest Amount</option>
                    <option>Risk Level</option>
                  </select>
                  <span className="absolute right-3 top-3 text-gray-400 pointer-events-none">▼</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col flex-1">
              {debtors.map((debtor, i) => (
                <RecoveryRow key={i} {...debtor} />
              ))}
            </div>

            <div className="p-5 bg-gray-50/50 border-t border-gray-100 text-center mt-auto">
              <button className="text-[14px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                View All Receivables →
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Training */}
        <div className="flex flex-col gap-8">
          {/* Collection Health */}
          <div className="bg-white border border-gray-100 rounded-[24px] p-8 shadow-sm">
            <h3 className="font-bold text-[18px] text-[#0f172a] mb-6 flex items-center gap-2">
              <TrendingUp size={20} className="text-blue-500" />
              Aging Analysis
            </h3>
            <div className="space-y-6">
              {[
                { label: '0-30 Days', value: '₹8.4L', pct: 65, color: 'bg-emerald-500' },
                { label: '31-60 Days', value: '₹3.2L', pct: 25, color: 'bg-amber-500' },
                { label: '61+ Days', value: '₹2.1L', pct: 10, color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[14px] font-bold text-gray-600">{item.label}</span>
                    <span className="text-[15px] font-bold text-[#0f172a]">{item.value}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[13px] text-amber-900 leading-relaxed font-medium">
                  <strong className="font-bold">Action Required:</strong> 3 invoices are reaching the critical 60-day limit. Manual intervention is highly recommended today.
                </p>
              </div>
            </div>
          </div>

          {/* Training Resources */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-[24px] p-8 text-[#0f172a] shadow-sm border border-blue-100 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-40 blur-3xl rounded-full"></div>
            
            <h3 className="font-bold text-[18px] mb-2 relative z-10 text-indigo-900">Collection Suite™</h3>
            <p className="text-[14px] text-indigo-700/80 mb-8 leading-relaxed relative z-10 font-medium">Master the art of professional debt recovery with our exclusive resources.</p>
            
            <div className="space-y-4 relative z-10">
              <button 
                onClick={() => alert('Opening Training Guide...')}
                className="w-full flex items-center justify-between p-4 bg-white/60 hover:bg-white active:scale-[0.98] cursor-pointer rounded-xl transition-all border border-white/40 shadow-sm group focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-indigo-100 text-indigo-600 rounded-lg group-hover:scale-110 transition-transform">
                    <BookOpen size={18} />
                  </div>
                  <span className="text-[14px] font-bold text-indigo-900">Training Guide</span>
                </div>
                <ChevronRight size={18} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
              </button>
              
              <button 
                onClick={() => alert('Opening Collection Scripts...')}
                className="w-full flex items-center justify-between p-4 bg-white/60 hover:bg-white active:scale-[0.98] cursor-pointer rounded-xl transition-all border border-white/40 shadow-sm group focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2.5 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                    <PlayCircle size={18} />
                  </div>
                  <span className="text-[14px] font-bold text-indigo-900">Collection Scripts</span>
                </div>
                <ChevronRight size={18} className="text-indigo-400 group-hover:text-indigo-600 transition-colors" />
              </button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Recovery;
