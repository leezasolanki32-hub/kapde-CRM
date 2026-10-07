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
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 bg-white p-8 rounded-[24px] border border-gray-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-transparent rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-[32px] font-bold text-[#0f172a] tracking-tight mb-2">Reports & Analytics</h1>
          <p className="text-[15px] text-gray-500 font-medium">Visualize and analyze your business performance</p>
        </div>
        <div className="flex items-center gap-4 mt-6 md:mt-0 relative z-10">
          <div className="relative group">
            <input type="text" placeholder="Search reports..." className="border border-gray-200 rounded-xl px-4 py-3 pl-11 text-[14px] text-[#0f172a] font-medium outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 bg-gray-50 w-[280px] transition-all shadow-sm" />
            <span className="absolute left-4 top-3.5 text-gray-400"><Search size={18} /></span>
          </div>
          <button className="bg-white border border-gray-200 p-3 rounded-xl hover:bg-gray-50 transition-all shadow-sm text-gray-600 hover:text-[#0f172a]">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-12 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Leads', 'Sales', 'Accounts', 'Inventory', 'Production', 'General'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveReportTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-[14px] font-bold transition-all shadow-sm ${
              activeReportTab === tab 
                ? 'bg-[#0f172a] text-white' 
                : 'bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-[#0f172a]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-12 mb-20">
        {(activeReportTab === 'All' || activeReportTab === 'Leads') && (
          <section>
            <div className="flex items-center gap-4 mb-8">
              <div className="px-5 py-2 rounded-full bg-blue-50 text-blue-600 text-[12px] font-bold uppercase tracking-widest border border-blue-100 shadow-sm">
                Leads & Prospects
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
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
              <div className="px-5 py-2 rounded-full bg-sky-50 text-sky-600 text-[12px] font-bold uppercase tracking-widest border border-sky-100 shadow-sm">
                Quotations & Orders
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
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
              <div className="px-5 py-2 rounded-full bg-emerald-50 text-emerald-600 text-[12px] font-bold uppercase tracking-widest border border-emerald-100 shadow-sm">
                Finance & Accounts
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
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
              <div className="px-5 py-2 rounded-full bg-orange-50 text-orange-600 text-[12px] font-bold uppercase tracking-widest border border-orange-100 shadow-sm">
                Inventory Tracking
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
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
              <div className="px-5 py-2 rounded-full bg-pink-50 text-pink-600 text-[12px] font-bold uppercase tracking-widest border border-pink-100 shadow-sm">
                Manufacturing
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
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
              <div className="px-5 py-2 rounded-full bg-gray-100 text-gray-600 text-[12px] font-bold uppercase tracking-widest border border-gray-200 shadow-sm">
                Activity & Tasks
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
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
