import React, { useState } from 'react';
import { ReportCard } from '../DashboardComponents';
import { Search, Settings } from "lucide-react";
import { 
  User, Target, Hourglass, Smartphone,
  BarChart3, Coins, Timer, RefreshCw, Users, MessageSquare,
  Scale, TrendingDown, FileText, Landmark,
  Package, CheckCircle, Box, Factory,
  Scissors, XCircle, ClipboardList, Clock
} from 'lucide-react';

const Reports = () => {
  const [activeReportTab, setActiveReportTab] = useState('All');

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 bg-[#0a1628] p-6 rounded-2xl border border-[#1e3a5f] shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
        <div>
          <h1 className="text-[28px] font-extrabold text-[#e8f0fe] tracking-tight mb-1">Reports & Analytics</h1>
          <p className="text-[14px] text-[#93c5fd] font-medium">Visualize and analyze your shop's performance</p>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="relative group">
            <input type="text" placeholder="Search reports..." className="border border-[#1e3a5f] rounded-xl px-4 py-2.5 pl-11 text-[14px] outline-none focus:border-[#3b82f6] bg-[#0a1628] focus:bg-[#0a1628] w-[280px] transition-all group-hover:shadow-sm" />
            <span className="absolute left-4 top-3 text-[#93c5fd] text-[14px]"><Search size={16} className="inline-block" /></span>
          </div>
          <button className="bg-[#0a1628] border border-[#1e3a5f] p-2.5 rounded-xl hover:bg-[#132847] hover:border-[#e8f0fe] transition-all shadow-sm">
            <Settings size={16} className="inline-block" />️
          </button>
        </div>
      </div>

      <div className="flex gap-3 mb-12 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Leads', 'Sales', 'Accounts', 'Inventory', 'Production', 'General'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveReportTab(tab)}
            className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all duration-300 whitespace-nowrap shadow-sm ${activeReportTab === tab ? 'bg-[#e8f0fe] text-[#0a1628] scale-105' : 'bg-[#0a1628] border border-[#1e3a5f] text-[#334155] hover:border-[#e8f0fe] hover:text-[#0a1628] hover:shadow-md'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-12 mb-20">
        {(activeReportTab === 'All' || activeReportTab === 'Leads') && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="px-4 py-1.5 rounded-full bg-[#0a1628] text-[#3b82f6] text-[12px] font-bold uppercase tracking-widest border border-[#93c5fd] shadow-sm">
                Leads & Prospects
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard title="Lead Interactions" desc="Monitor interaction efforts by your team with your leads." icon={<User size={20} />} />
              <ReportCard title="Prospect Interactions" desc="Analyze interactions with qualified, high-intent prospects." icon={<Target size={20} />} />
              <ReportCard title="No Interaction" desc="Identify leads which have not been contacted recently." icon={<Hourglass size={20} />} />
              <ReportCard title="Follow-ups" desc="Track scheduled follow-up tasks and conversion rates." icon={<Smartphone size={20} />} />
            </div>
          </section>
        )}

        {(activeReportTab === 'All' || activeReportTab === 'Sales') && (
          <section>
            <div className="flex items-center gap-4 mb-8 mt-12">
              <div className="px-4 py-1.5 rounded-full bg-[#080d1a] text-[#0284c7] text-[12px] font-bold uppercase tracking-widest border border-[#bae6fd] shadow-sm">
                Quotations & Orders
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard title="Monthly Sales Analysis" desc="Analyze monthly sales metrics and top performing products." icon={<BarChart3 size={20} />} />
              <ReportCard title="Trade Profitability" desc="Compare purchase v/s sales margins per product line." icon={<Coins size={20} />} />
              <ReportCard title="Order Delay Analysis" desc="Identify and analyze reasons for processing delays." icon={<Timer size={20} />} />
              <ReportCard title="Customer Repeat Business" desc="Track loyalty metrics and repeat purchase behavior." icon={<RefreshCw size={20} />} />
              <ReportCard title="Sales Team Performance" desc="Evaluate effectiveness and efforts of your sales team." icon={<Users size={20} />} />
              <ReportCard title="Feedback Analysis" desc="Review customer feedback across order completion." icon={<MessageSquare size={20} />} />
            </div>
          </section>
        )}

        {(activeReportTab === 'All' || activeReportTab === 'Accounts') && (
          <section>
            <div className="flex items-center gap-4 mb-8 mt-12">
              <div className="px-4 py-1.5 rounded-full bg-[#dcfce7] text-[#16a34a] text-[12px] font-bold uppercase tracking-widest border border-[#bbf7d0] shadow-sm">
                Finance & Accounts
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard title="Balance Sheet" desc="Know your current assets, liabilities, and equity." icon={<Scale size={20} />} />
              <ReportCard title="Profit & Loss" desc="Detail track of your income levels and expenses." icon={<TrendingDown size={20} />} />
              <ReportCard title="Trial Balance" desc="Get a quick technical overview of account balances." icon={<FileText size={20} />} />
              <ReportCard title="GSTR 3B Calculation" desc="Summarize sales and purchases for GST filing." icon={<Landmark size={20} />} />
            </div>
          </section>
        )}

        {(activeReportTab === 'All' || activeReportTab === 'Inventory') && (
          <section>
            <div className="flex items-center gap-4 mb-8 mt-12">
              <div className="px-4 py-1.5 rounded-full bg-[#ffedd5] text-[#ea580c] text-[12px] font-bold uppercase tracking-widest border border-[#fed7aa] shadow-sm">
                Inventory Tracking
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard title="Dispatch History" desc="Summary of dispatch transactions for a selected period." icon={<Package size={20} />} />
              <ReportCard title="Stock Availability" desc="Verification of available materials for production." icon={<CheckCircle size={20} />} />
              <ReportCard title="Non-Moving Stocks" desc="Identify items which haven't sold in 60+ days." icon={<Box size={20} />} />
              <ReportCard title="Production History" desc="Review history of production jobs and output." icon={<Factory size={20} />} />
            </div>
          </section>
        )}

        {(activeReportTab === 'All' || activeReportTab === 'Production') && (
          <section>
            <div className="flex items-center gap-4 mb-8 mt-12">
              <div className="px-4 py-1.5 rounded-full bg-[#fce7f3] text-[#db2777] text-[12px] font-bold uppercase tracking-widest border border-[#fbcfe8] shadow-sm">
                Manufacturing
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard title="Consumption Analysis" desc="Ideal vs actual material usage for production jobs." icon={<Scissors size={20} />} />
              <ReportCard title="Rejection Analysis" desc="Causes of rejection and contribution to output loss." icon={<XCircle size={20} />} />
              <ReportCard title="Production Output" desc="Day-wise statistics, including work done and yield." icon={<Factory size={20} />} />
            </div>
          </section>
        )}

        {(activeReportTab === 'All' || activeReportTab === 'General') && (
          <section>
            <div className="flex items-center gap-4 mb-8 mt-12">
              <div className="px-4 py-1.5 rounded-full bg-[#f3f4f6] text-[#4b5563] text-[12px] font-bold uppercase tracking-widest border border-[#e5e7eb] shadow-sm">
                Activity & Tasks
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-[#1e3a5f] to-transparent"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ReportCard title="Task History" desc="Detailed log of shop tasks completed over time." icon={<ClipboardList size={20} />} />
              <ReportCard title="Activity Log" desc="Track all user activities and system interactions." icon={<Clock size={20} />} />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Reports;
