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
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[28px] font-bold text-[#0f172a]">Support Ticketing</h1>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input type="text" placeholder="Search" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-[13px] text-[#0f172a] focus:border-[#3b82f6] focus:outline-none shadow-sm transition w-full md:w-64" />
            <span className="absolute left-3.5 top-3 text-gray-400"><Search size={16} /></span>
          </div>
          <button onClick={() => setActiveTab('CreateTicket')} className="bg-[#3b82f6] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-sm">+ Add</button>
          <button 
            onClick={() => setShowPrintModal(true)}
            className="bg-white border border-gray-200 text-[#0f172a] px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition shadow-sm flex items-center gap-2"
          >
            <Printer size={16} className="text-[#3b82f6]" /> Print Settings
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#0f172a] focus:outline-none focus:border-[#3b82f6] shadow-sm cursor-pointer">
          <option>Pending</option>
          <option>Solved</option>
        </select>
        <select className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-[13px] font-semibold text-[#0f172a] focus:outline-none focus:border-[#3b82f6] shadow-sm cursor-pointer">
          <option>Select Executive</option>
        </select>
      </div>

      <div className="bg-gray-50 border border-dashed border-gray-200 p-6 rounded-2xl mb-10 text-center shadow-sm flex items-center justify-center">
        <span className="text-[13px] text-gray-500 font-medium">No support tickets found.</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-100 rounded-[24px] p-8 hover:border-[#3b82f6]/30 transition shadow-sm">
          <h3 className="text-[18px] font-bold text-[#0f172a] mb-2 uppercase tracking-tight">Enter a Support Ticket</h3>
          <p className="text-[14px] text-gray-500 mb-6">Log a new support ticket to track and resolve customer issues efficiently.</p>
          <button onClick={() => setActiveTab('CreateTicket')} className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Enter Ticket</button>
        </div>
        <div className="bg-white border border-gray-100 rounded-[24px] p-8 hover:border-[#3b82f6]/30 transition shadow-sm">
          <h3 className="text-[18px] font-bold text-[#0f172a] mb-2 uppercase tracking-tight">Enter a Customer</h3>
          <p className="text-[14px] text-gray-500 mb-6">Add customer details to keep a record of your clients and maintain their tickets.</p>
          <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Enter Customer</button>
        </div>
      </div>

      <TrainingResources />

      {/* Print Settings Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-[18px] font-bold text-[#0f172a]">Print Settings</h2>
              <button onClick={() => setShowPrintModal(false)} className="text-gray-400 hover:text-gray-700 transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase mb-2">Select Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Standard', 'Detailed', 'Compact'].map(t => (
                    <button
                      key={t}
                      onClick={() => setPrintSettings({ ...printSettings, template: t })}
                      className={`px-3 py-2 text-[12px] font-semibold rounded-xl border transition ${printSettings.template === t ? 'bg-blue-50 border-[#3b82f6] text-[#3b82f6]' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-500 uppercase mb-1">Paper Size</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] font-medium focus:outline-none focus:border-[#3b82f6] bg-white transition cursor-pointer text-[#0f172a]"
                    value={printSettings.paperSize}
                    onChange={(e) => setPrintSettings({ ...printSettings, paperSize: e.target.value })}
                  >
                    <option>A4</option>
                    <option>A5</option>
                    <option>Letter</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-500 uppercase mb-1">Orientation</label>
                  <select
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-[13px] font-medium focus:outline-none focus:border-[#3b82f6] bg-white transition cursor-pointer text-[#0f172a]"
                    value={printSettings.orientation}
                    onChange={(e) => setPrintSettings({ ...printSettings, orientation: e.target.value })}
                  >
                    <option>Portrait</option>
                    <option>Landscape</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-[12px] font-bold text-gray-500 uppercase mb-1">Include Options</label>
                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[13px] font-medium text-[#0f172a]">Company Logo</span>
                  <input
                    type="checkbox"
                    checked={printSettings.includeLogo}
                    onChange={(e) => setPrintSettings({ ...printSettings, includeLogo: e.target.checked })}
                    className="w-4 h-4 accent-[#3b82f6]"
                  />
                </div>
                <div className="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[13px] font-medium text-[#0f172a]">Authorized Signature</span>
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
                  className="flex-1 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Preparing support ticket list for print...');
                    setShowPrintModal(false);
                  }}
                  className="flex-1 px-5 py-2.5 bg-[#0f172a] text-white rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Printer size={16} className="inline-block" /> Proceed to Print
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
