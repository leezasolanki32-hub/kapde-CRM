import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Printer } from "lucide-react";

const Invoices = ({ setActiveTab }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    template: 'Tax Invoice',
    paperSize: 'A4',
    orientation: 'Portrait',
    includeLogo: true,
    includeSignature: true
  });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/invoices`);
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-[24px] font-medium text-[#e8f0fe]">Invoices</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setShowPrintModal(true)}
            className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#2563eb] transition"
          >
            <Printer size={16} className="inline-block" />️ Print Settings
          </button>
          <button onClick={() => setActiveTab('CreditNotes')} className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[13px] font-semibold">Credit Notes</button>
          <button
            onClick={() => setActiveTab('Proforma Invoices')}
            className="bg-[#0a1628] border border-[#3b82f6] text-[#3b82f6] px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#132847] transition"
          >
            Proforma Invoices
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex items-center gap-4 bg-[#0a1628] p-2 rounded-lg border border-[#1e3a5f]">
          <select className="border-none text-[13px] focus:outline-none bg-transparent font-medium">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        <select className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-1.5 text-[13px] focus:border-[#3b82f6] focus:outline-none">
          <option>All Invoices</option>
        </select>
        <select className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-1.5 text-[13px] focus:border-[#3b82f6] focus:outline-none">
          <option>All Executives</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setActiveTab('CreateInvoice')} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-md text-[12px] font-bold hover:bg-[#2563eb] transition shadow-sm">+ Create Invoice</button>
          <button onClick={() => setActiveTab('CreateCreditNote')} className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[12px] font-bold hover:bg-[#333] transition shadow-sm">+ Create Credit Note</button>
        </div>
      </div>

      {invoices && invoices.length > 0 ? (
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-sm mb-10">
          <table className="w-full text-left">
            <thead className="bg-[#080d1a] border-b border-[#1e3a5f]">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Invoice No</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5f]">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-[#93c5fd]">Loading invoices...</td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv._id || inv.id} className="hover:bg-[#05080f] transition">
                    <td className="px-6 py-4 text-[13px] font-bold text-[#3b82f6]">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-[#e8f0fe]">{inv.customerName}</td>
                    <td className="px-6 py-4 text-[13px] text-[#93c5fd]">{inv.date}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-[#e8f0fe]">₹{inv.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-yellow-100 text-yellow-700">
                        {inv.status || 'Unpaid'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#3b82f6] hover:text-[#2563eb] font-bold text-[12px]">View</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[#fdfaff] border border-dashed border-[#93c5fd] p-4 rounded-lg text-center mb-10">
          <span className="text-[13px] text-[#6b21a8] font-medium font-serif italic">No invoices found in this period (Apr-2026).</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-8 hover:border-[#3b82f6] shadow-sm transition">
          <h3 className="text-[18px] font-bold text-[#e8f0fe] mb-2">Create a Party Invoice</h3>
          <p className="text-[14px] text-[#93c5fd] mb-6">Generate an invoice for business clients with detailed billing and GST compliance.</p>
          <button onClick={() => setActiveTab('CreateInvoice')} className="bg-[#3b82f6] text-[#e8f0fe] px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Create Party Invoice</button>
        </div>
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-8 hover:border-[#3b82f6] shadow-sm transition">
          <h3 className="text-[18px] font-bold text-[#e8f0fe] mb-2">Create a POS / Retail Invoice</h3>
          <p className="text-[14px] text-[#93c5fd] mb-6">Generate a quick receipt for individual retail customers with lightning speed.</p>
          <button onClick={() => setActiveTab('CreateInvoice')} className="bg-[#3b82f6] text-[#e8f0fe] px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Create POS / Retail Invoice</button>
        </div>
      </div>

      <TrainingResources />
      {/* Print Settings Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a1628] rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#1e3a5f] flex justify-between items-center bg-[#080d1a]">
              <h2 className="text-[18px] font-bold text-[#e8f0fe]">Invoice Print Settings</h2>
              <button onClick={() => setShowPrintModal(false)} className="text-[#93c5fd] hover:text-[#e8f0fe] transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-2">Select Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Tax Invoice', 'Retail Bill', 'Estimate'].map(t => (
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
                    alert('Preparing invoice for print...');
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

export default Invoices;
