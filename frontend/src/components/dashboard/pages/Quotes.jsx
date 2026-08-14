import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Printer, FileText, Pencil } from "lucide-react";

const Quotes = ({ setActiveTab }) => {
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    template: 'Quotation',
    paperSize: 'A4',
    orientation: 'Portrait',
    includeLogo: true,
    includeSignature: true
  });
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchQuotations = async () => {
      try {
        const response = await fetch(`\${import.meta.env.VITE_API_URL}/quotations`);
        const data = await response.json();
        setQuotations(data);
      } catch (error) {
        console.error('Error fetching quotations:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotations();
  }, []);

  const filteredQuotations = filter === 'All'
    ? quotations
    : quotations.filter(q => q.type === filter);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Quotations</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPrintModal(true)}
            className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#333] transition"
          >
            <Printer size={16} className="inline-block" />️ Print Settings
          </button>
          <button
            onClick={() => setActiveTab('CreateQuotation')}
            className="bg-[#a855f7] text-white px-4 py-2 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#9333ea] transition ml-2"
          >
            + Create Quotation
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 border-b border-[#E2DED6] pb-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('All')}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-md w-full md:w-auto transition ${filter === 'All' ? 'bg-[#a855f7] text-white' : 'text-[#6B6B70] border border-transparent hover:border-[#E2DED6]'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('Quotations')}
            className={`px-4 py-1.5 text-[13px] font-medium rounded-md whitespace-nowrap transition ${filter === 'Quotations' ? 'bg-[#a855f7] text-white' : 'bg-transparent border border-[#a855f7] text-[#a855f7] hover:bg-[#f3e8ff]'}`}
          >
            Quotations
          </button>
          <button
            onClick={() => setActiveTab('Proforma Invoices')}
            className="text-[#6B6B70] px-4 py-1.5 text-[13px] font-medium border border-transparent hover:border-[#E2DED6] rounded-md whitespace-nowrap"
          >
            Proforma Invoices
          </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <select className="border border-[#E2DED6] text-[13px] rounded-md px-3 py-1.5 w-[140px] focus:outline-none focus:border-[#a855f7] bg-white">
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#E2DED6] rounded-lg overflow-x-auto mb-6 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[#FAF8F4] border-b border-[#E2DED6]">
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Quote No.</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Customer</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Amount (₹)</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Valid Date</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Issued on</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Issued by</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Type</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Executive</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E]"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-[#6B6B70]">Loading quotations...</td>
              </tr>
            ) : filteredQuotations.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-[#6B6B70]">No quotations found.</td>
              </tr>
            ) : (
              filteredQuotations.map((quote, idx) => (
                <tr key={quote.id || idx} className="border-b border-[#f0f0f0] hover:bg-[#faf4ff] transition">
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{quote.quoteNumber}</td>
                  <td className="py-4 px-4 text-[13px] text-[#1C1C1E] whitespace-nowrap">{quote.customerName || 'N/A'}</td>
                  <td className="py-4 px-4 text-[13px] text-[#1C1C1E] whitespace-nowrap">{quote.amount?.toLocaleString() || '0'}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{quote.validUntil || '-'}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{quote.date || '-'}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">Admin</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{quote.type || 'Quotations'}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{quote.executive || 'Admin'}</td>
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setActiveTab('CreateProformaInvoice')}
                        title="Convert to Proforma"
                        className="bg-[#f0fdf4] text-[#166534] p-1.5 rounded hover:bg-[#dcfce7] transition shadow-sm"
                      >
                        <FileText size={16} className="inline-block" />
                      </button>
                      <button
                        onClick={() => setActiveTab('CreateQuotation')}
                        className="bg-[#f3e8ff] text-[#a855f7] p-1.5 rounded hover:bg-[#e9d5ff] transition shadow-sm"
                      >
                        <Pencil size={16} className="inline-block" />️
                      </button>
                    </div>
                  </td>
                </tr>
              )))}
          </tbody>
        </table>
        <div className="p-4 border-t border-[#f0f0f0] bg-[#FAF8F4]">
          <button
            onClick={() => setActiveTab('CreateQuotation')}
            className="bg-[#a855f7] text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-[#9333ea] transition shadow-sm"
          >
            + Click here to enter a quotation
          </button>
        </div>
      </div>

      <TrainingResources />

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
                  {['Quotation', 'Estimates', 'Draft'].map(t => (
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
                    alert('Preparing quotation for print...');
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
    </div>
  );
};

export default Quotes;
