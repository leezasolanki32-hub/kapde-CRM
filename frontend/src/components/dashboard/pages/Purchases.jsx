import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Pencil } from 'lucide-react';
import { Receipt, Coins, Landmark } from "lucide-react";

const Purchases = ({ setActiveTab, setEditingInvoice }) => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('This Month');
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await fetch(`\${import.meta.env.VITE_API_URL}/supplier-invoices`);
        const data = await response.json();
        setInvoices(data);
      } catch (error) {
        console.error('Error fetching supplier invoices:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Supplier Invoices</h1>
        <div className="flex items-center gap-2 mt-3 md:mt-0">
          <button
            onClick={() => setShowReport(true)}
            className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#333] transition"
          >
            Report
          </button>
        </div>
      </div>

      {/* Filter row + Action buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#a855f7] w-[160px]"
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Quarter</option>
          <option>This Year</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('CreateSupplierInvoice')}
            className="bg-[#a855f7] text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm"
          >
            + Enter Supplier Invoice
          </button>
          <button
            onClick={() => setActiveTab('CreateDebitNote')}
            className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#333] transition shadow-sm"
          >
            + Enter Debit Note
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-[#E2DED6] shadow-sm overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#FAF8F4] border-b border-[#E2DED6]">
              <tr>
                <th className="py-3 px-5 font-bold text-[#1C1C1E]">Supplier</th>
                <th className="py-3 px-5 font-bold text-[#1C1C1E]">Contact</th>
                <th className="py-3 px-5 font-bold text-[#a855f7]">Invoice No.</th>
                <th className="py-3 px-5 font-bold text-[#a855f7]">Invoice Date</th>
                <th className="py-3 px-5 font-bold text-[#1C1C1E]">Taxable (₹)</th>
                <th className="py-3 px-5 font-bold text-[#1C1C1E]">Amount (₹)</th>
                <th className="py-3 px-5 font-bold text-[#1C1C1E]">Credit Month</th>
                <th className="py-3 px-5"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#6B6B70] text-[13px]">
                    Loading invoices...
                  </td>
                </tr>
              ) : invoices.length > 0 ? (
                invoices.map((inv) => (
                  <tr key={inv._id || inv.id} className="border-b border-[#F2F2F7] last:border-0 hover:bg-[#fcfaff] transition">
                    <td className="py-3 px-5 text-[#a855f7] font-medium hover:underline cursor-pointer">{inv.supplier}</td>
                    <td className="py-3 px-5 text-[#6B6B70]">{inv.contact}</td>
                    <td className="py-3 px-5 text-[#a855f7] font-medium hover:underline cursor-pointer">{inv.invoiceNo}</td>
                    <td className="py-3 px-5 text-[#6B6B70]">{inv.invoiceDate}</td>
                    <td className="py-3 px-5 text-[#1C1C1E]">{inv.taxable}</td>
                    <td className="py-3 px-5 text-[#1C1C1E] font-bold">{inv.amount}</td>
                    <td className="py-3 px-5 text-[#6B6B70]">{inv.creditMonth}</td>
                    <td className="py-3 px-5">
                      <button
                        onClick={() => {
                          setEditingInvoice(inv);
                          setActiveTab('CreateSupplierInvoice');
                        }}
                        className="p-1.5 rounded-md bg-[#fef3c7] hover:bg-[#fde68a] transition text-[#b45309]"
                        title="Edit invoice"
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-[#6B6B70] text-[13px]">
                    No invoices found for this period.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Click to enter invoice CTA */}
        <div className="p-4 border-t border-[#F2F2F7]">
          <button
            onClick={() => setActiveTab('CreateSupplierInvoice')}
            className="bg-[#a855f7] text-white px-5 py-2 rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm"
          >
            + Click here to enter an invoice.
          </button>
        </div>
      </div>

      <TrainingResources />

      {/* Report Modal */}
      {showReport && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <div>
                <h2 className="text-[18px] font-bold text-[#1C1C1E]">Supplier Invoice Report</h2>
                <p className="text-[12px] text-[#6B6B70] mt-0.5">Summary for {filter}</p>
              </div>
              <button onClick={() => setShowReport(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl font-bold">×</button>
            </div>

            {/* Stats Cards */}
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { label: 'Total Invoices', value: '1', icon: '<Receipt size={16} className="inline-block" />', color: '#a855f7' },
                { label: 'Total Amount', value: '₹1,500.00', icon: '<Coins size={16} className="inline-block" />', color: '#10b981' },
                { label: 'Total Taxable', value: '₹1,500.00', icon: '<Landmark size={16} className="inline-block" />️', color: '#3b82f6' },
                { label: 'Pending Payments', value: '₹0.00', icon: '⏳', color: '#f59e0b' },
              ].map((stat, i) => (
                <div key={i} className="bg-[#fafafa] border border-[#f0f0f0] rounded-xl p-4">
                  <div className="text-[22px] mb-1">{stat.icon}</div>
                  <div className="text-[12px] font-bold text-[#6B6B70] uppercase tracking-wide mb-1">{stat.label}</div>
                  <div className="text-[20px] font-bold" style={{ color: stat.color }}>{stat.value}</div>
                </div>
              ))}
            </div>

            {/* Breakdown Table */}
            <div className="px-6 pb-2">
              <h3 className="text-[12px] font-bold text-[#6B6B70] uppercase tracking-wider mb-3">Invoice Breakdown</h3>
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#f0f0f0] text-[11px] text-[#6B6B70] font-bold uppercase">
                    <th className="pb-2 text-left">Supplier</th>
                    <th className="pb-2 text-center">Invoice No.</th>
                    <th className="pb-2 text-right">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-[#f8f8f8] last:border-0">
                      <td className="py-2.5 text-[#1C1C1E] font-medium">{inv.supplier}</td>
                      <td className="py-2.5 text-center text-[#a855f7]">{inv.invoiceNo}</td>
                      <td className="py-2.5 text-right font-bold text-[#1C1C1E]">₹{inv.amount}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-[#f0f0f0]">
                    <td colSpan={2} className="pt-3 font-bold text-[#1C1C1E] text-[13px]">Total</td>
                    <td className="pt-3 text-right font-bold text-[#a855f7] text-[14px]">₹{invoices.reduce((s, inv) => s + parseFloat(inv.amount.replace(',', '')), 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#f0f0f0] bg-[#fafafa] flex justify-end">
              <button
                onClick={() => setShowReport(false)}
                className="px-6 py-2 bg-[#1C1C1E] text-white rounded-lg text-[13px] font-bold hover:bg-[#333] transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchases;
