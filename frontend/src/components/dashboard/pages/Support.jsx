import React, { useState } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Search, Printer } from "lucide-react";

const Support = ({ setActiveTab }) => {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    template: 'Standard',
    paperSize: 'A4',
    orientation: 'Portrait',
    includeLogo: true,
    includeSignature: true
  });

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-[24px] font-medium text-[#e8f0fe]">Support Ticketing</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="Search" className="border border-[#1e3a5f] rounded-md px-3 py-2 pl-9 text-[13px] focus:border-[#3b82f6] focus:outline-none shadow-sm" />
            <span className="absolute left-3 top-2.5 text-[#93c5fd]"><Search size={16} className="inline-block" /></span>
          </div>
          <button onClick={() => setActiveTab('CreateTicket')} className="bg-[#3b82f6] text-[#e8f0fe] px-5 py-2 rounded-md text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-sm">+ Add</button>
          <button 
            onClick={() => setShowPrintModal(true)}
            className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#333] transition shadow-sm"
          >
            <Printer size={16} className="inline-block" />️ Print Settings
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <select className="bg-[#0a1628] border border-[#1e3a5f] px-3 py-1.5 rounded-md text-[13px] focus:outline-none focus:border-[#3b82f6]">
          <option>Pending</option>
          <option>Solved</option>
        </select>
        <select className="bg-[#0a1628] border border-[#1e3a5f] px-3 py-1.5 rounded-md text-[13px] focus:outline-none focus:border-[#3b82f6]">
          <option>Select Executive</option>
        </select>
      </div>

      <div className="bg-[#faf4ff] border border-dashed border-[#bfdbfe] p-3 rounded-md mb-10 w-fit px-6">
        <span className="text-[13px] text-[#2563eb] italic font-serif">No support tickets found.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-8 hover:border-[#3b82f6] transition shadow-sm">
          <h3 className="text-[17px] font-bold text-[#e8f0fe] mb-2 uppercase tracking-tight">Enter a Support Ticket</h3>
          <p className="text-[14px] text-[#93c5fd] mb-6">Log a new support ticket to track and resolve customer issues efficiently.</p>
          <button onClick={() => setActiveTab('CreateTicket')} className="bg-[#3b82f6] text-[#e8f0fe] px-5 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Enter Ticket</button>
        </div>
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-8 hover:border-[#3b82f6] transition shadow-sm">
          <h3 className="text-[17px] font-bold text-[#e8f0fe] mb-2 uppercase tracking-tight">Enter a Customer</h3>
          <p className="text-[14px] text-[#93c5fd] mb-6">Add customer details to keep a record of your clients and maintain their tickets.</p>
          <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#3b82f6] text-[#e8f0fe] px-5 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Enter Customer</button>
        </div>
      </div>

      <TrainingResources />

      {/* Print Settings Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a1628] rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#1e3a5f] flex justify-between items-center bg-[#080d1a]">
              <h2 className="text-[18px] font-bold text-[#e8f0fe]">Print Settings</h2>
              <button onClick={() => setShowPrintModal(false)} className="text-[#93c5fd] hover:text-[#e8f0fe] transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-2">Select Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard', 'Detailed', 'Compact'].map(t => (
                    <button
                      key={t}
                      onClick={() => setPrintSettings({ ...printSettings, template: t })}
                      className={`px-3 py-2 text-[12px] font-medium rounded-lg border transition ${printSettings.template === t ? 'bg-[#0a1628] border-[#3b82f6] text-[#3b82f6]' : 'border-[#1e3a5f] text-[#93c5fd] hover:bg-[#132847]'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1">Paper Size</label>
                  <select
                    className="w-full border border-[#1e3a5f] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] bg-[#0a1628] transition cursor-pointer"
                    value={printSettings.paperSize}
                    onChange={(e) => setPrintSettings({ ...printSettings, paperSize: e.target.value })}
                  >
                    <option>A4</option>
                    <option>A5</option>
                    <option>Letter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1">Orientation</label>
                  <select
                    className="w-full border border-[#1e3a5f] rounded-lg px-3 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] bg-[#0a1628] transition cursor-pointer"
                    value={printSettings.orientation}
                    onChange={(e) => setPrintSettings({ ...printSettings, orientation: e.target.value })}
                  >
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1">Include Options</label>
                <div className="flex items-center justify-between p-3 bg-[#0a1628] rounded-lg border border-[#1e3a5f]">
                  <span className="text-[13px] text-[#e8f0fe]">Company Logo</span>
                  <input
                    type="checkbox"
                    checked={printSettings.includeLogo}
                    onChange={(e) => setPrintSettings({ ...printSettings, includeLogo: e.target.checked })}
                    className="w-4 h-4 accent-[#3b82f6]"
                  />
                </div>
                <div className="flex items-center justify-between p-3 bg-[#0a1628] rounded-lg border border-[#1e3a5f]">
                  <span className="text-[13px] text-[#e8f0fe]">Authorized Signature</span>
                  <input
                    type="checkbox"
                    checked={printSettings.includeSignature}
                    onChange={(e) => setPrintSettings({ ...printSettings, includeSignature: e.target.checked })}
                    className="w-4 h-4 accent-[#3b82f6]"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#1e3a5f] text-[#93c5fd] rounded-lg text-[14px] font-semibold hover:bg-[#132847] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Preparing support ticket list for print...');
                    setShowPrintModal(false);
                  }}
                  className="flex-1 px-4 py-2.5 bg-[#e8f0fe] text-[#0a1628] rounded-lg text-[14px] font-semibold hover:bg-[#333] transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Printer size={16} className="inline-block" />️ Proceed to Print
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
