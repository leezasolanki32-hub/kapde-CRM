import React, { useState } from 'react';
import { Search } from "lucide-react";

const LeadRow = ({ name, email, phone, source, status, date, type }) => {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-emerald-50 text-emerald-600';
      case 'inactive': return 'bg-rose-50 text-rose-600';
      case 'new': return 'bg-blue-50 text-blue-600';
      case 'raw': return 'bg-gray-100 text-gray-600';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-all border-b border-gray-50 group">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
            {name.split(' ').map(n => n[0]).join('')}
          </div>
          {type === 'Star' && (
            <div className="absolute -top-1 -right-1 bg-amber-400 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
              ⭐
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-[#0f172a] group-hover:text-[#3b82f6] transition-colors">{name}</h4>
            {type === 'Star' && <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded uppercase tracking-wider border border-amber-200">Star Lead</span>}
          </div>
          <div className="text-[12px] text-gray-500">{email} · {phone}</div>
        </div>
      </div>

      <div className="flex-1 hidden md:block">
        <div className="text-[13px] font-medium text-[#0f172a]">{source}</div>
        <div className="text-[11px] text-gray-400">Source Canal</div>
      </div>

      <div className="flex-1 text-center">
        <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${getStatusStyle(status)}`}>
          {status}
        </span>
      </div>

      <div className="flex-1 text-right">
        <div className="text-[13px] font-bold text-[#0f172a]">{date}</div>
        <div className="text-[11px] text-gray-400">Last Contact</div>
      </div>

      <div className="ml-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-[#3b82f6] transition-colors">
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
    { label: 'Conversion Rate', value: '8.4%', change: '+1.2%', color: '#8b5cf6' },
    { label: 'Avg. Response', value: '14m', change: '-2m', color: '#f59e0b' },
  ];

  const filterTabs = ['All', 'Raw', 'New', 'Inactive', 'Active', 'Star leads'];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h2 className="text-[28px] font-bold text-[#0f172a] tracking-tight">Leads & Prospects</h2>
          <p className="text-gray-500 text-[14px]">Grow your boutique with smart lead tracking and nurturing</p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button 
            onClick={() => setActiveTab('CreateLead')}
            className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#2563eb] transition shadow-sm flex items-center gap-2"
          >
            <span>+</span> Create New Lead
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((s, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm">
            <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-2">{s.label}</div>
            <div className="flex items-end gap-3">
              <div className="text-[32px] font-bold text-[#0f172a] tracking-tight">{s.value}</div>
              <div className="text-[12px] font-bold text-green-500 mb-1.5">{s.change} ↑</div>
            </div>
            <div className="mt-4 h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ backgroundColor: s.color, width: '65%' }}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Leads List Section */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden mb-10">
        {/* Tab Filter */}
        <div className="flex items-center gap-1 border-b border-gray-100 px-6 pt-4 bg-gray-50/50">
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-3 text-[13px] font-bold transition-all relative ${filter === tab ? 'text-[#3b82f6]' : 'text-gray-500 hover:text-gray-800'
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
        <div className="bg-white px-6 py-4 flex text-[11px] font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
          <div className="flex-1">Lead Details</div>
          <div className="flex-1 hidden md:block">Source</div>
          <div className="flex-1 text-center">Status</div>
          <div className="flex-1 text-right">Engagement</div>
          <div className="ml-6 w-[20px]"></div>
        </div>

        {/* Scrollable list area */}
        <div className="flex flex-col bg-white">
          {filteredLeads.length > 0 ? (
            filteredLeads.map((lead, i) => (
              <LeadRow key={i} {...lead} />
            ))
          ) : (
            <div className="py-20 text-center text-gray-400 flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search size={24} className="text-gray-300" />
              </div>
              <p className="text-[14px] font-medium text-gray-500">No leads found for this category.</p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-white px-6 py-4 border-t border-gray-100 flex justify-between items-center text-[13px] text-gray-500 font-medium">
          <div>Showing {filteredLeads.length} leads</div>
          <div className="flex gap-2">
            <button className="px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition disabled:opacity-50 font-semibold text-gray-600">Prev</button>
            <button className="px-4 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition font-semibold text-gray-600">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leads;
