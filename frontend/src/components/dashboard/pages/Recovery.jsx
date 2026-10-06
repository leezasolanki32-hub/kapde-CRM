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
    <div className="flex items-center justify-between p-4 hover:bg-[#fafafc] transition-all border-b border-[#f1f1f4] group">
      <div className="flex items-center gap-4 flex-1">
        <div className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center text-[#3b82f6] font-bold">
          {name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h4 className="font-bold text-[#0a1628]">{name}</h4>
          <div className="text-[11px] text-[#334155]">Last reminder: {lastReminder}</div>
        </div>
      </div>

      <div className="flex-1 text-center font-bold text-[#0a1628]">
        ₹ {amount}
      </div>

      <div className="flex-1 text-center">
        <div className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getRiskColor(risk)} uppercase tracking-wider`}>
          {risk} Risk
        </div>
      </div>

      <div className="flex-1 text-center">
        <div className={`text-[13px] font-bold ${daysOverdue > 30 ? 'text-[#ef4444]' : 'text-[#f59e0b]'}`}>
          {daysOverdue} days
        </div>
        <div className="text-[10px] text-[#334155] uppercase font-bold tracking-tighter">Overdue</div>
      </div>

      <div className="flex items-center gap-2">
        <button className="p-2.5 bg-[#0a1628] border border-[#1e3a5f] rounded-lg text-[#334155] hover:bg-[#3b82f6] hover:text-[#0a1628] hover:border-[#3b82f6] transition-all shadow-sm" title="Call Customer">
          <Phone size={14} />
        </button>
        <button className="p-2.5 bg-[#0a1628] text-[#3b82f6] rounded-lg border border-[#93c5fd] hover:bg-[#3b82f6] hover:text-[#0a1628] transition-all shadow-sm flex items-center gap-2" title="Send WhatsApp/SMS">
          <Send size={14} />
          <span className="text-[12px] font-bold pr-1">Remind</span>
        </button>
      </div>
    </div>
  );
};

const Recovery = ({ setActiveTab }) => {
  const [filterActive, setFilterActive] = useState(false);

  const stats = [
    { title: 'Total Outstanding', value: '₹14.8L', change: '8.2% from last wk', isPositive: false, icon: <IndianRupee size={20} /> },
    { title: 'Overdue > 30 Days', value: '₹4.2L', change: '12% recovery rate', isPositive: true, icon: <AlertCircle size={20} /> },
    { title: 'Avg. Collection Period', value: '24 Days', change: '2 days faster', isPositive: true, icon: <TrendingUp size={20} /> },
    { title: 'Projected Recovery', value: '₹8.4L', change: 'Next 15 days', isPositive: true, icon: <Calendar size={20} /> },
  ];

  const debtors = [
    { name: "Priya Boutique", amount: "42,800", daysOverdue: 42, lastReminder: "2 days ago", risk: "High" },
    { name: "Global Threads", amount: "1,12,000", daysOverdue: 15, lastReminder: "1 week ago", risk: "Low" },
    { name: "Royal Silks", amount: "28,450", daysOverdue: 35, lastReminder: "Yesterday", risk: "Medium" },
    { name: "Vogue Studio", amount: "14,200", daysOverdue: 8, lastReminder: "Never", risk: "Low" },
    { name: "Urban Wear Co.", amount: "95,000", daysOverdue: 58, lastReminder: "4 days ago", risk: "High" },
  ];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#e8f0fe] tracking-tight flex items-center gap-3">
            Payment Recovery 
            <span className="px-2.5 py-0.5 bg-[#fef2f2] text-[#ef4444] text-[11px] font-bold rounded-full border border-[#fee2e2]">
              12 Overdue
            </span>
          </h1>
          <p className="text-[#93c5fd] text-[14px] mt-1">Monitor and accelerate your accounts receivable collections</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('CreateAppointment')}
            className="bg-[#0a1628] border border-[#1e3a5f] text-[#0a1628] px-4 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#f9f9f9] transition shadow-sm flex items-center gap-2"
          >
            <Calendar size={16} /> Appointments
          </button>
          <button 
            onClick={() => setActiveTab('CreateRecoveryEntry')}
            className="bg-[#3b82f6] text-[#e8f0fe] px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#2563eb] transition shadow-sm flex items-center gap-2"
          >
            <UserPlus size={16} /> New Entry
          </button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0a1628] p-6 rounded-2xl border border-[#1e3a5f] shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#0a1628] text-[#3b82f6] rounded-xl flex items-center justify-center group-hover:bg-[#3b82f6] group-hover:text-[#e8f0fe] transition-colors">
                {s.icon}
              </div>
              <ChevronRight size={16} className="text-[#1e3a5f]" />
            </div>
            <div className="text-[12px] font-bold text-[#93c5fd] uppercase tracking-wider">{s.title}</div>
            <div className="text-[28px] font-bold text-[#e8f0fe] mt-1">{s.value}</div>
            <div className="flex items-center gap-1.5 mt-2">
              <span className={`text-[12px] font-bold ${s.isPositive ? 'text-green-600' : 'text-red-500'}`}>
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
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl shadow-sm overflow-hidden">
            <div className="px-6 py-5 border-b border-[#f1f1f4] flex justify-between items-center bg-[#fafafc]">
              <h3 className="font-bold text-[#0a1628]">Pending Collections</h3>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setFilterActive(!filterActive)}
                  className={`p-2 rounded-lg border transition-all ${filterActive ? 'bg-[#3b82f6] text-[#0a1628] border-[#3b82f6]' : 'bg-[#0a1628] text-[#334155] border-[#1e3a5f] hover:bg-[#f9f9f9]'}`}
                >
                  <Filter size={14} />
                </button>
                <select className="bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-3 py-1.5 text-[12px] font-bold text-[#e8f0fe] focus:outline-none focus:border-[#3b82f6]">
                  <option>Newest First</option>
                  <option>Highest Amount</option>
                  <option>Risk Level</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col">
              {debtors.map((debtor, i) => (
                <RecoveryRow key={i} {...debtor} />
              ))}
            </div>

            <div className="p-4 bg-[#fafafc] border-t border-[#f1f1f4] text-center">
              <button className="text-[13px] font-bold text-[#3b82f6] hover:underline">View All Receivables →</button>
            </div>
          </div>
        </div>

        {/* Right Column: Insights & Training */}
        <div className="flex flex-col gap-8">
          {/* Collection Health */}
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-[#e8f0fe] mb-6">Aging Analysis</h3>
            <div className="space-y-6">
              {[
                { label: '0-30 Days', value: '₹8.4L', pct: 65, color: 'bg-emerald-500' },
                { label: '31-60 Days', value: '₹3.2L', pct: 25, color: 'bg-amber-500' },
                { label: '61+ Days', value: '₹2.1L', pct: 10, color: 'bg-red-500' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[13px] font-bold text-[#e8f0fe]">{item.label}</span>
                    <span className="text-[13px] font-bold text-[#e8f0fe]">{item.value}</span>
                  </div>
                  <div className="w-full h-2 bg-[#f1f1f4] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-4 bg-[#fefce8] border border-[#fef08a] rounded-xl">
              <div className="flex gap-2">
                <AlertCircle size={16} className="text-[#a16207] shrink-0" />
                <p className="text-[12px] text-[#854d0e] leading-relaxed">
                  <strong>Advice:</strong> 3 invoices are reaching critical 60-day limit. Manual intervention recommended.
                </p>
              </div>
            </div>
          </div>

          {/* Training Resources */}
          <div className="bg-[#e8f0fe] rounded-2xl p-6 text-[#0a1628] shadow-lg overflow-hidden relative">
            <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#3b82f6] opacity-20 blur-3xl rounded-full"></div>
            <h3 className="font-bold text-[16px] mb-4 relative z-10">Collection Suite™</h3>
            <p className="text-[12px] text-gray-400 mb-6 leading-relaxed relative z-10">Master the art of professional debt recovery with our exclusive resources.</p>
            
            <div className="space-y-3 relative z-10">
              <button className="w-full flex items-center justify-between p-3 bg-[#0a1628] bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all border border-[#3b82f6]/20 border-opacity-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#3b82f6] rounded-lg">
                    <BookOpen size={14} />
                  </div>
                  <span className="text-[13px] font-bold">Training Guide</span>
                </div>
                <ChevronRight size={14} className="text-gray-500" />
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-[#0a1628] bg-opacity-10 rounded-xl hover:bg-opacity-20 transition-all border border-[#3b82f6]/20 border-opacity-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#ef4444] rounded-lg">
                    <PlayCircle size={14} />
                  </div>
                  <span className="text-[13px] font-bold">Collection Scripts</span>
                </div>
                <ChevronRight size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recovery;
