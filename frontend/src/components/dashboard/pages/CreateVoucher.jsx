import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, FileText, IndianRupee, Calendar, Layers } from 'lucide-react';

const CreateVoucher = ({ setActiveTab, previousTab = 'Accounts' }) => {
  const [formData, setFormData] = useState({
    voucherType: 'Payment',
    voucherNumber: '',
    voucherDate: '',
    debitLedger: '',
    creditLedger: '',
    amount: '',
    narration: '',
    paymentMode: 'Cash',
    referenceNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Voucher saved successfully!');
    setActiveTab(previousTab);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]";
  const labelClass = "block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5";

  const voucherTypes = ['Payment', 'Receipt', 'Contra', 'Journal', 'Sales', 'Purchase'];
  const ledgers = [
    'Cash', 'Bank Account', 'Sales', 'Purchase', 'Current Assets',
    'Fixed Assets', 'Equity', 'Direct Income', 'Indirect Income',
    'Direct Expense', 'Indirect Expense', 'GST Payable', 'GST Input Credit'
  ];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[800px] mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab(previousTab)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-[#93c5fd]" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#e8f0fe] tracking-tight">Enter Voucher</h1>
          <p className="text-[14px] text-[#93c5fd] mt-1 font-medium">Record a new accounting transaction entry</p>
        </div>
      </div>

      <div className="bg-[#0a1628] rounded-2xl border border-[#1e3a5f] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">

          {/* Voucher Type Tabs */}
          <div>
            <label className={labelClass}><Layers size={14} className="text-[#3b82f6]" /> Voucher Type</label>
            <div className="flex flex-wrap gap-2">
              {voucherTypes.map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, voucherType: type }))}
                  className={`px-4 py-2 rounded-xl text-[13px] font-bold border transition-all ${
                    formData.voucherType === type
                      ? 'bg-[#3b82f6] text-[#e8f0fe] border-[#3b82f6] shadow-md shadow-purple-200'
                      : 'bg-[#0a1628] text-[#93c5fd] border-[#1e3a5f] hover:bg-[#132847] hover:border-[#3b82f6] hover:text-[#3b82f6]'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Voucher Number & Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}><FileText size={14} className="text-[#3b82f6]" /> Voucher No.</label>
              <input
                type="text"
                name="voucherNumber"
                value={formData.voucherNumber}
                onChange={handleInputChange}
                className={inputClass}
                placeholder="Auto-generated (e.g. PAY-001)"
              />
            </div>
            <div>
              <label className={labelClass}><Calendar size={14} className="text-[#3b82f6]" /> Date <span className="text-red-500">*</span></label>
              <input
                type="date"
                name="voucherDate"
                required
                value={formData.voucherDate}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
          </div>

          {/* Debit & Credit Ledgers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Dr – Debit Ledger <span className="text-red-500">*</span></label>
              <select name="debitLedger" required value={formData.debitLedger} onChange={handleInputChange} className={inputClass}>
                <option value="" disabled>Select ledger</option>
                {ledgers.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Cr – Credit Ledger <span className="text-red-500">*</span></label>
              <select name="creditLedger" required value={formData.creditLedger} onChange={handleInputChange} className={inputClass}>
                <option value="" disabled>Select ledger</option>
                {ledgers.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Amount & Payment Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}><IndianRupee size={14} className="text-[#3b82f6]" /> Amount <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#93c5fd] font-bold">₹</span>
                <input
                  type="number"
                  name="amount"
                  required
                  min="0"
                  value={formData.amount}
                  onChange={handleInputChange}
                  className={`${inputClass} pl-8`}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Payment Mode</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleInputChange} className={inputClass}>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
                <option value="Cheque">Cheque</option>
                <option value="Card">Card</option>
              </select>
            </div>
          </div>

          {/* Reference Number */}
          <div>
            <label className={labelClass}>Reference / Cheque No.</label>
            <input
              type="text"
              name="referenceNumber"
              value={formData.referenceNumber}
              onChange={handleInputChange}
              className={inputClass}
              placeholder="e.g. CHQ-12345 or UTR number"
            />
          </div>

          {/* Narration */}
          <div>
            <label className={labelClass}>Narration / Description</label>
            <textarea
              name="narration"
              value={formData.narration}
              onChange={handleInputChange}
              rows="3"
              className={`${inputClass} resize-none`}
              placeholder="Brief description of this transaction..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#1e3a5f] flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(previousTab)}
              className="px-6 py-2.5 rounded-xl border border-[#1e3a5f] text-[#93c5fd] font-bold text-[14px] hover:bg-[#1e3a5f] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#3b82f6] text-[#e8f0fe] rounded-xl font-bold text-[14px] hover:bg-[#2563eb] transition-all shadow-md shadow-purple-200"
            >
              <CheckCircle size={18} /> Save Voucher
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateVoucher;
