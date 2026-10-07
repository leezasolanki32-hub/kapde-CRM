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
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[28px] font-bold text-[#0f172a]">Invoices</h1>
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setShowPrintModal(true)}
            className="bg-white border border-gray-200 text-[#0f172a] px-4 py-2.5 rounded-xl text-[13px] font-semibold flex items-center gap-2 hover:bg-gray-50 transition shadow-sm"
          >
            <Printer size={16} className="inline-block text-[#3b82f6]" /> Print Settings
          </button>
          <button onClick={() => setActiveTab('CreditNotes')} className="bg-white border border-gray-200 text-[#0f172a] px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition shadow-sm">Credit Notes</button>
          <button
            onClick={() => setActiveTab('Proforma Invoices')}
            className="bg-[#0f172a] text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm"
          >
            Proforma Invoices
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex items-center gap-4 bg-white px-3 py-2 rounded-xl border border-gray-200 shadow-sm">
          <select className="border-none text-[13px] focus:outline-none bg-transparent font-semibold text-[#0f172a] cursor-pointer">
            <option>This Month</option>
            <option>Last Month</option>
          </select>
        </div>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-[13px] font-semibold text-[#0f172a] focus:border-[#3b82f6] focus:outline-none shadow-sm cursor-pointer">
          <option>All Invoices</option>
        </select>
        <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-[13px] font-semibold text-[#0f172a] focus:border-[#3b82f6] focus:outline-none shadow-sm cursor-pointer">
          <option>All Executives</option>
        </select>
        <div className="ml-auto flex gap-2">
          <button onClick={() => setActiveTab('CreateInvoice')} className="bg-[#3b82f6] text-white px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-sm">+ Create Invoice</button>
          <button onClick={() => setActiveTab('CreateCreditNote')} className="bg-white border border-gray-200 text-[#0f172a] px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition shadow-sm">+ Create Credit Note</button>
        </div>
      </div>

      {invoices && invoices.length > 0 ? (
        <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm mb-10">
          <table className="w-full text-left">
            <thead className="bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Invoice No</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500 text-[13px]">Loading invoices...</td>
                </tr>
              ) : (
                invoices.map((inv) => (
                  <tr key={inv._id || inv.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-[13px] font-bold text-[#3b82f6]">{inv.invoiceNumber}</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-[#0f172a]">{inv.customerName}</td>
                    <td className="px-6 py-4 text-[13px] text-gray-500">{inv.date}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-[#0f172a]">₹{inv.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase bg-amber-50 text-amber-600">
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
        <div className="bg-gray-50 border border-dashed border-gray-200 p-6 rounded-2xl text-center mb-10 shadow-sm flex items-center justify-center">
          <span className="text-[13px] text-gray-500 font-medium">No invoices found in this period (Apr-2026).</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-gray-100 rounded-[24px] p-8 hover:border-[#3b82f6]/30 shadow-sm transition">
          <h3 className="text-[18px] font-bold text-[#0f172a] mb-2">Create a Party Invoice</h3>
          <p className="text-[14px] text-gray-500 mb-6">Generate an invoice for business clients with detailed billing and GST compliance.</p>
          <button onClick={() => setActiveTab('CreateInvoice')} className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-md">+ Create Party Invoice</button>
        </div>
        <div className="bg-white border border-gray-100 rounded-[24px] p-8 hover:border-[#3b82f6]/30 shadow-sm transition">
          <h3 className="text-[18px] font-bold text-[#0f172a] mb-2">Create a POS / Retail Invoice</h3>
          <p className="text-[14px] text-gray-500 mb-6">Generate a quick receipt for individual retail customers with lightning speed.</p>
          <button onClick={() => setActiveTab('CreateInvoice')} className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-md">+ Create POS / Retail Invoice</button>
        </div>
      </div>

      <TrainingResources />
      
      {/* Print Settings Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-[18px] font-bold text-[#0f172a]">Invoice Print Settings</h2>
              <button onClick={() => setShowPrintModal(false)} className="text-gray-400 hover:text-gray-700 transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-gray-500 uppercase mb-2">Select Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Tax Invoice', 'Retail Bill', 'Estimate'].map(t => (
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
                    alert('Preparing invoice for print...');
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

export default Invoices;
