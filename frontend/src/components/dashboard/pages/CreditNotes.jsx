import React, { useState, useEffect } from 'react';
import { Banknote } from "lucide-react";

const CreditNotes = ({ setActiveTab }) => {
  const [creditNotes, setCreditNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreditNotes = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/credit-notes`);
        const data = await response.json();
        setCreditNotes(data);
      } catch (error) {
        console.error('Error fetching credit notes:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCreditNotes();
  }, []);
  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-[24px] font-medium text-[#e8f0fe]">Credit Notes</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab('Invoices')}
            className="bg-[#0a1628] border border-[#1e3a5f] text-[#e8f0fe] px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#132847] transition"
          >
            Back to Invoices
          </button>
          <button
            onClick={() => setActiveTab('CreateCreditNote')}
            className="bg-[#0f172a] text-[#e8f0fe] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#1e293b] transition shadow-sm"
          >
            + Create Credit Note
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
        <select className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-1.5 text-[13px] focus:border-[#0f172a] focus:outline-none">
          <option>All Statuses</option>
          <option>Used</option>
          <option>Unused</option>
        </select>
        <div className="ml-auto relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search CN number or customer..."
            className="w-full bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-2 text-[13px] focus:border-[#0f172a] focus:outline-none"
          />
        </div>
      </div>

      {creditNotes && creditNotes.length > 0 ? (
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-sm mb-10">
          <table className="w-full text-left">
            <thead className="bg-[#080d1a] border-b border-[#1e3a5f]">
              <tr>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">CN Number</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Linked Invoice</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5f]">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-[#93c5fd]">Loading credit notes...</td>
                </tr>
              ) : (
                creditNotes.map((cn) => (
                  <tr key={cn._id || cn.id} className="hover:bg-[#05080f] transition">
                    <td className="px-6 py-4 text-[13px] font-bold text-[#0f172a]">{cn.creditNoteNumber}</td>
                    <td className="px-6 py-4 text-[13px] font-medium text-[#e8f0fe]">{cn.customerName}</td>
                    <td className="px-6 py-4 text-[13px] text-[#93c5fd]">{cn.date}</td>
                    <td className="px-6 py-4 text-[13px] text-[#93c5fd] font-medium">{cn.linkedInvoice || cn.originalInvoiceRef || '-'}</td>
                    <td className="px-6 py-4 text-[13px] font-bold text-[#e8f0fe]">₹{cn.amount?.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase ${cn.status === 'Unused' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                        {cn.status || 'Unused'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[#0f172a] hover:text-[#334155] font-bold text-[12px]">View PDF</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-[#05080f] border border-dashed border-[#94a3b8] p-8 rounded-xl text-center mb-10 flex flex-col items-center justify-center">
          <div className="text-[40px] mb-3 opacity-50"><Banknote size={16} className="inline-block" /></div>
          <h3 className="text-[#0f172a] font-bold text-[15px] mb-1">No Credit Notes Found</h3>
          <p className="text-[13px] text-[#64748b] max-w-[300px] leading-relaxed mb-4">
            You haven't issued any credit notes yet. Create one to handle refunds or billing adjustments.
          </p>
          <button
            onClick={() => setActiveTab('CreateCreditNote')}
            className="bg-[#0a1628] border border-[#cbd5e1] text-[#0f172a] px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#f1f5f9] transition"
          >
            Create Your First Credit Note
          </button>
        </div>
      )}
    </div>
  );
};

export default CreditNotes;
