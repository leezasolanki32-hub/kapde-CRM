import React, { useState } from 'react';
import { Search } from "lucide-react";

const LeadRow = ({ name, email, phone, source, status, date, type }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-[#ecfdf5] text-[#10b981]';
      case 'inactive': return 'bg-[#fef2f2] text-[#ef4444]';
      case 'new': return 'bg-[#eff6ff] text-[#3b82f6]';
      case 'raw': return 'bg-[#f5f5f5] text-[#737373]';
      default: return 'bg-[#f3f4f6] text-[#374151]';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#fafafc] transition-all border-b border-[#f1f1f4] group">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#f3e8ff] flex items-center justify-center text-[#a855f7] font-bold">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          {type === 'Star' && (
            <div className="absolute -top-1 -right-1 bg-[#facc15] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              ⭐
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#1C1C1E] group-hover:text-[#a855f7] transition-colors">{name}</h4>
            {type === 'Star' && <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.5 rounded uppercase tracking-wider border border-[#fde68a]">Star Lead</span>}
          </div>
          <div className="text-[12px] text-[#6B6B70]">{email} · {phone}</div>
        </div>
      </div>

      <div className="flex-1 hidden md:block">
        <div className="text-[13px] font-medium text-[#1C1C1E]">{source}</div>
        <div className="text-[11px] text-[#6B6B70]">Source Canal</div>
      </div>

      <div className="flex-1 text-center">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex-1 text-right">
        <div className="text-[13px] font-bold text-[#1C1C1E]">{date}</div>
        <div className="text-[11px] text-[#6B6B70]">Last Contact</div>
      </div>

      <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-[#f3e8ff] rounded-lg text-[#a855f7] transition-colors">
          <span className="text-lg">⋮</span>
        </button>
      </div>
    </div>
  );
};

const Leads = ({ setActiveTab }) => {
  const [filter, setFilter] = useState('All');

  const allLeads = [
    { name: 'Rohan Sharma', email: 'rohan.s@gmail.com', phone: '+91 98765 43210', source: 'Instagram Ad', status: 'Active', date: '2 hours ago', type: 'Star' },
    { name: 'Ananya Iyer', email: 'ananya.i@outlook.com', phone: '+91 91234 56789', source: 'Website Inquiry', status: 'New', date: '5 hours ago', type: 'Standard' },
    { name: 'Vikram Singh', email: 'vikram.v@yahoo.com', phone: '+91 88888 77777', source: 'Referral', status: 'Active', date: 'Yesterday', type: 'Star' },
    { name: 'Priya Verma', email: 'priya.v@gmail.com', phone: '+91 77777 66666', source: 'Facebook Shop', status: 'Raw', date: 'Oct 12, 2025', type: 'Standard' },
    { name: 'Siddharth M.', email: 'sid.m@gmail.com', phone: '+91 99999 00000', source: 'Direct Visit', status: 'Inactive', date: 'Oct 10, 2025', type: 'Standard' },
    { name: 'Kavita Devi', email: 'kavita@studio.in', phone: '+91 93456 78901', source: 'WhatsApp', status: 'New', date: '3 days ago', type: 'Star' },
    { name: 'Amit Bajaj', email: 'amit@bajaj.com', phone: '+91 92345 67890', source: 'Google Search', status: 'Inactive', date: '1 week ago', type: 'Standard' },
  ];

  const filteredLeads = allLeads.filter(lead => {
    if (filter === 'All') return true;
    if (filter === 'Star leads') return lead.type === 'Star';
    return lead.status.toLowerCase() === filter.toLowerCase();
  });

  const stats = [
    { label: 'Total Leads', value: '428', change: '+12.5%', color: '#a855f7' },
    { label: 'Active Leads', value: '156', change: '+5.2%', color: '#10b981' },
    { label: 'Conversion Rate', value: '8.4%', change: '+1.2%', color: '#3b82f6' },
    { label: 'Avg. Response', value: '14m', change: '-2m', color: '#f59e0b' },
  ];

  const filterTabs = ['All', 'Raw', 'New', 'Inactive', 'Active', 'Star leads'];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">Leads & Prospects</h2>
          <p className="text-[#6B6B70] text-[14px]">Grow your boutique with smart lead tracking and nurturing</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('CreateLead')}
            className="bg-[#a855f7] text-white px-6 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#9333ea] transition shadow-sm flex items-center gap-2"
          >
            <span>+</span> Create New Lead
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-[#E2DED6] rounded-2xl p-6 shadow-sm">
            <div className="text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider mb-2">{s.label}</div>
            <div className="flex items-end gap-3">
              <div className="text-2xl font-bold text-[#1C1C1E]">{s.value}</div>
              <div className="text-[11px] font-bold text-[#10b981] mb-1">{s.change} ↑</div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: '65%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Leads List Section */}
      <div className="bg-white border border-[#E2DED6] rounded-2xl shadow-sm overflow-hidden">
        {/* Tab Filter */}
        <div className="flex items-center gap-1 border-b border-[#f1f1f4] px-4 pt-4">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-3 text-[13px] font-bold transition-all relative ${filter === tab ? 'text-[#a855f7]' : 'text-[#6B6B70] hover:text-[#1C1C1E]'
                }`}
            >
              {tab}
              {filter === tab && (
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#a855f7] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* List Header */}
        <div className="bg-[#fafafc] px-6 py-3 flex text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider border-b border-[#f1f1f4]">
          <div className="flex-1">Lead Details</div>
          <div className="flex-1 hidden md:block">Source</div>
          <div className="flex-1 text-center">Status</div>
          <div className="flex-1 text-right">Engagement</div>
          <div className="ml-6 w-[20px]"></div>
        </div>

        {/* Scrollable list area */}
        <div className="flex flex-col">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead, i) => (
              <LeadRow key={i} {...lead} />
            ))
          ) : (
            <div className="p-20 text-center text-[#6B6B70]">
              <div className="text-4xl mb-4"><Search size={16} className="inline-block" /></div>
              <p className="text-[14px]">No leads found for this category</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-[#fafafc] px-6 py-4 border-t border-[#f1f1f4] flex justify-between items-center text-[12px] text-[#6B6B70]">
          <div>Showing {filteredLeads.length} leads</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#E2DED6] rounded hover:bg-white disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-[#E2DED6] rounded hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
