import React, { useState } from 'react';
import { Printer } from "lucide-react";
import {
  Plus,
  Search,
  Filter,
  FileText,
  MoreHorizontal,
  Download,
  Calendar,
  ChevronDown,
  ArrowUpRight
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const styles = {
    'Draft': 'bg-slate-100 text-slate-600',
    'Sent': 'bg-blue-50 text-blue-600 border border-blue-100',
    'Confirmed': 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    'Expired': 'bg-rose-50 text-rose-600 border border-rose-100',
  };

  return (
    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${styles[status] || styles['Draft']}`}>
      {status}
    </span>
  );
};

const ProformaInvoices = ({ setActiveTab }) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState('All');
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  const [printSettings, setPrintSettings] = useState({
    template: 'Proforma Invoice',
    paperSize: 'A4',
    orientation: 'Portrait',
    includeLogo: true,
    includeSignature: true
  });

  const proformasData = [
    { id: 1, number: 'PI-2026-001', customer: 'Vogue Boutique', date: 'Jul 10, 2026', expiry: 'Jul 25, 2026', amount: 45000, status: 'Confirmed' },
    { id: 2, number: 'PI-2026-002', customer: 'Urban Threads', date: 'Jul 12, 2026', expiry: 'Jul 27, 2026', amount: 28400, status: 'Sent' },
    { id: 3, number: 'PI-2026-003', customer: 'Elite Fashion', date: 'Jul 14, 2026', expiry: 'Jul 29, 2026', amount: 15600, status: 'Draft' },
  ];

  const filteredProformas = proformasData.filter(pi => {
    const matchesSearch = pi.number.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pi.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = activeFilterTab === 'All' || pi.status === activeFilterTab;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto p-4 lg:p-8">

      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">Proforma Invoices</h1>
          <p className="text-[14px] text-[#6B6B70] mt-1 font-medium">Pre-billing documents for sales confirmation</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowPrintModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E2DED6] rounded-xl text-[14px] font-bold text-[#1C1C1E] hover:bg-slate-50 transition-all shadow-sm"
          >
            <Printer size={18} className="text-[#6B6B70]" /> Print Settings
          </button>
          <button
            onClick={() => setActiveTab('CreateProformaInvoice')}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#a855f7] text-white rounded-xl text-[14px] font-bold hover:bg-[#9333ea] transition-all shadow-lg shadow-purple-200"
          >
            <Plus size={18} /> New Proforma
          </button>
        </div>
      </div>

      {/* Utility Bar */}
      <div className="bg-white border border-[#E2DED6] rounded-2xl p-4 mb-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl w-full md:w-auto">
          {['All', 'Drafts', 'Sent', 'Confirmed'].map((tab) => {
            const statusFilter = tab === 'Drafts' ? 'Draft' : tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveFilterTab(statusFilter)}
                className={`px-5 py-2 rounded-lg text-[13px] font-bold transition-all ${activeFilterTab === statusFilter ? 'bg-white text-[#a855f7] shadow-sm' : 'text-[#6B6B70] hover:text-[#1C1C1E]'}`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B70]" size={16} />
            <input
              type="text"
              placeholder="Search proformas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-transparent rounded-xl text-[13px] focus:bg-white focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 outline-none transition-all"
            />
          </div>
          <button 
            onClick={() => setShowFilterModal(true)}
            className="p-2.5 bg-white border border-[#E2DED6] rounded-xl text-[#6B6B70] hover:text-[#a855f7] hover:border-[#a855f7] transition-all"
          >
            <Filter size={18} />
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#E2DED6] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-[#E2DED6]">
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider">PI Number</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider">Expiry</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider">Amount</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f8f8f8]">
              {filteredProformas.length > 0 ? filteredProformas.map((pi) => (
                <tr key={pi.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-50 text-[#a855f7] rounded-lg">
                        <FileText size={16} />
                      </div>
                      <span className="text-[14px] font-bold text-[#1C1C1E]">{pi.number}</span>
                    </div>
                  </td>
                  <td className="py-5 px-6 text-[14px] font-bold text-[#1C1C1E]">{pi.customer}</td>
                  <td className="py-5 px-6 text-[13px] font-medium text-[#6B6B70]">{pi.date}</td>
                  <td className="py-5 px-6 text-[13px] font-medium text-[#6B6B70]">{pi.expiry}</td>
                  <td className="py-5 px-6">
                    <span className="text-[14px] font-bold text-[#1C1C1E]">₹{pi.amount.toLocaleString()}</span>
                  </td>
                  <td className="py-5 px-6">
                    <StatusBadge status={pi.status} />
                  </td>
                  <td className="py-5 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-[#6B6B70] hover:text-[#a855f7] hover:bg-purple-50 rounded-lg transition-all">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-[#6B6B70] hover:text-[#1C1C1E] hover:bg-slate-100 rounded-lg transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-[#6B6B70]">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={32} className="text-[#E2DED6] mb-3" />
                      <p className="text-[14px] font-medium">No proforma invoices found matching your criteria.</p>
                      <button 
                        onClick={() => { setSearchQuery(''); setActiveFilterTab('All'); }}
                        className="mt-2 text-[#a855f7] text-[13px] hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Print Settings Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Print Settings</h2>
              <button onClick={() => setShowPrintModal(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-2">Select Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard', 'Detailed', 'Compact'].map(t => (
                    <button
                      key={t}
                      onClick={() => setPrintSettings({ ...printSettings, template: t })}
                      className={`px-3 py-2 text-[12px] font-medium rounded-lg border transition ${printSettings.template === t ? 'bg-[#f3e8ff] border-[#a855f7] text-[#a855f7]' : 'border-[#E2DED6] text-[#6B6B70] hover:bg-[#fafafa]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Paper Size</label>
                  <select
                    className="w-full border border-[#E2DED6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] bg-white transition cursor-pointer"
                    value={printSettings.paperSize}
                    onChange={(e) => setPrintSettings({ ...printSettings, paperSize: e.target.value })}
                  >
                    <option>A4</option>
                    <option>A5</option>
                    <option>Letter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Orientation</label>
                  <select
                    className="w-full border border-[#E2DED6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] bg-white transition cursor-pointer"
                    value={printSettings.orientation}
                    onChange={(e) => setPrintSettings({ ...printSettings, orientation: e.target.value })}
                  >
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Include Options</label>
                <div className="flex items-center justify-between p-3 bg-[#fafafa] rounded-lg border border-[#f0f0f0]">
                  <span className="text-[13px] text-[#1C1C1E]">Company Logo</span>
                  <input
                    type="checkbox"
                    checked={printSettings.includeLogo}
                    onChange={(e) => setPrintSettings({ ...printSettings, includeLogo: e.target.checked })}
                    className="w-4 h-4 accent-[#a855f7]"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#fafafa] rounded-lg border border-[#f0f0f0]">
                  <span className="text-[13px] text-[#1C1C1E]">Authorized Signature</span>
                  <input
                    type="checkbox"
                    checked={printSettings.includeSignature}
                    onChange={(e) => setPrintSettings({ ...printSettings, includeSignature: e.target.checked })}
                    className="w-4 h-4 accent-[#a855f7]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#E2DED6] text-[#6B6B70] rounded-lg text-[14px] font-semibold hover:bg-[#fafafa] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Preparing proforma invoice for print...');
                    setShowPrintModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[#1C1C1E] text-white rounded-lg text-[14px] font-semibold hover:bg-[#333] transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Printer size={16} className="inline-block" />️ Proceed to Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Advanced Filters</h2>
              <button onClick={() => setShowFilterModal(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-2">Date Range</label>
                <select className="w-full border border-[#E2DED6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] bg-white">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>This Month</option>
                </select>
              </div>
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-2">Amount Range</label>
                <select className="w-full border border-[#E2DED6] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] bg-white">
                  <option>Any Amount</option>
                  <option>Under ₹10,000</option>
                  <option>₹10,000 - ₹50,000</option>
                  <option>Over ₹50,000</option>
                </select>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#E2DED6] text-[#6B6B70] rounded-lg text-[14px] font-semibold hover:bg-[#fafafa] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowFilterModal(false)}
                  className="flex-1 px-4 py-2.5 bg-[#a855f7] text-white rounded-lg text-[14px] font-bold hover:bg-[#9333ea] transition shadow-sm"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProformaInvoices;
