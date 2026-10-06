import React, { useState } from 'react';
import { Search } from "lucide-react";

const LeadRow = ({ name, email, phone, source, status, date, type }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-[#ecfdf5] text-[#10b981]';
      case 'inactive': return 'bg-[#fef2f2] text-[#ef4444]';
      case 'new': return 'bg-[#0a1628] text-[#3b82f6]';
      case 'raw': return 'bg-[#f5f5f5] text-[#737373]';
      default: return 'bg-[#f3f4f6] text-[#374151]';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-[#fafafc] transition-all border-b border-[#f1f1f4] group">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center text-[#3b82f6] font-bold">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          {type === 'Star' && (
            <div className="absolute -top-1 -right-1 bg-[#facc15] text-[#0a1628] text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#3b82f6]/20 shadow-sm">
              ⭐
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#0a1628] group-hover:text-[#3b82f6] transition-colors">{name}</h4>
            {type === 'Star' && <span className="text-[10px] font-bold text-[#b45309] bg-[#fef3c7] px-1.5 py-0.5 rounded uppercase tracking-wider border border-[#f59e0b]">Star Lead</span>}
          </div>
          <div className="text-[12px] text-[#334155]">{email} · {phone}</div>
        </div>
      </div>

      <div className="flex-1 hidden md:block">
        <div className="text-[13px] font-medium text-[#0a1628]">{source}</div>
        <div className="text-[11px] text-[#334155]">Source Canal</div>
      </div>

      <div className="flex-1 text-center">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex-1 text-right">
        <div className="text-[13px] font-bold text-[#0a1628]">{date}</div>
        <div className="text-[11px] text-[#334155]">Last Contact</div>
      </div>

      <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-[#132847] rounded-lg text-[#3b82f6] transition-colors">
          <span className="text-lg">⋮</span>
        </button>
      </div>
    </div>
  );
};

const Leads = ({ setActiveTab }) => {
  const [filter, setFilter] = useState('All');

  const allLeads = [];

  const filteredLeads = allLeads.filter(lead => {
    if (filter === 'All') return true;
    if (filter === 'Star leads') return lead.type === 'Star';
    return lead.status.toLowerCase() === filter.toLowerCase();
  });

  const stats = [
    { label: 'Total Leads', value: '428', change: '+12.5%', color: '#3b82f6' },
    { label: 'Active Leads', value: '156', change: '+5.2%', color: '#10b981' },
    { label: 'Conversion Rate', value: '8.4%', change: '+1.2%', color: '#3b82f6' },
    { label: 'Avg. Response', value: '14m', change: '-2m', color: '#f59e0b' },
  ];

  const filterTabs = ['All', 'Raw', 'New', 'Inactive', 'Active', 'Star leads'];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-[#e8f0fe] tracking-tight">Leads & Prospects</h2>
          <p className="text-[#93c5fd] text-[14px]">Grow your boutique with smart lead tracking and nurturing</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('CreateLead')}
            className="bg-[#3b82f6] text-[#e8f0fe] px-6 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#2563eb] transition shadow-sm flex items-center gap-2"
          >
            <span>+</span> Create New Lead
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-6 shadow-sm">
            <div className="text-[12px] font-bold text-[#93c5fd] uppercase tracking-wider mb-2">{s.label}</div>
            <div className="flex items-end gap-3">
              <div className="text-2xl font-bold text-[#e8f0fe]">{s.value}</div>
              <div className="text-[11px] font-bold text-[#10b981] mb-1">{s.change} ↑</div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-[#f3f4f6] rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: '65%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Leads List Section */}
      <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl shadow-sm overflow-hidden">
        {/* Tab Filter */}
        <div className="flex items-center gap-1 border-b border-[#f1f1f4] px-4 pt-4">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-3 text-[13px] font-bold transition-all relative ${filter === tab ? 'text-[#3b82f6]' : 'text-[#93c5fd] hover:text-[#e8f0fe]'
                }`}
            >
              {tab}
              {filter === tab && (
                <div className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#3b82f6] rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* List Header */}
        <div className="bg-[#fafafc] px-6 py-3 flex text-[11px] font-bold text-[#334155] uppercase tracking-wider border-b border-[#f1f1f4]">
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
            <div className="p-20 text-center text-[#93c5fd]">
              <div className="text-4xl mb-4"><Search size={16} className="inline-block" /></div>
              <p className="text-[14px]">No leads found for this category</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-[#fafafc] px-6 py-4 border-t border-[#f1f1f4] flex justify-between items-center text-[12px] text-[#334155]">
          <div>Showing {filteredLeads.length} leads</div>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-[#1e3a5f] rounded hover:bg-[#132847] disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 border border-[#1e3a5f] rounded hover:bg-[#132847]">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
