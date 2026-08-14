import React, { useState } from 'react';
import { UserPlus, FileText, IndianRupee, Calendar, AlertTriangle, ArrowLeft, CheckCircle } from 'lucide-react';

const CreateRecoveryEntry = ({ setActiveTab }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    invoiceRef: '',
    amount: '',
    dueDate: '',
    riskLevel: 'Low',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('New recovery entry added successfully!');
    setActiveTab('Recovery');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[800px] mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('Recovery')}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-[#6B6B70]" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">New Recovery Entry</h1>
          <p className="text-[14px] text-[#6B6B70] mt-1 font-medium">Add a new outstanding payment to the recovery list</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Customer & Invoice section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-2">
              <UserPlus size={16} className="text-[#a855f7]" /> Customer & Invoice
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Customer Name *</label>
                <input
                  type="text"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                  placeholder="e.g., Vogue Boutique"
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Invoice Ref. *</label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B70]" size={16} />
                  <input
                    type="text"
                    name="invoiceRef"
                    required
                    value={formData.invoiceRef}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                    placeholder="INV-2026-..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Amount & Date section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-2">
              <IndianRupee size={16} className="text-[#a855f7]" /> Payment Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Overdue Amount (₹) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#6B6B70]">₹</span>
                  <input
                    type="number"
                    name="amount"
                    required
                    min="0"
                    step="0.01"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white font-bold text-[#1C1C1E]"
                    placeholder="0.00"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} /> Original Due Date *
                </label>
                <input
                  type="date"
                  name="dueDate"
                  required
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Risk & Notes section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-2">
              <AlertTriangle size={16} className="text-[#a855f7]" /> Recovery Assessment
            </h3>
            
            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Risk Level *</label>
              <div className="flex gap-4">
                {['Low', 'Medium', 'High'].map((level) => (
                  <label key={level} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border cursor-pointer transition-all ${formData.riskLevel === level ? (level === 'Low' ? 'border-emerald-500 bg-emerald-50 text-emerald-700 font-bold' : level === 'Medium' ? 'border-amber-500 bg-amber-50 text-amber-700 font-bold' : 'border-red-500 bg-red-50 text-red-700 font-bold') : 'border-[#E2DED6] hover:bg-slate-50 text-[#6B6B70] font-medium'}`}>
                    <input
                      type="radio"
                      name="riskLevel"
                      value={level}
                      checked={formData.riskLevel === level}
                      onChange={handleInputChange}
                      className="hidden"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white resize-none"
                placeholder="E.g., Customer promised to pay next week..."
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#f0f0f0] flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('Recovery')}
              className="px-6 py-2.5 rounded-xl border border-[#E2DED6] text-[#6B6B70] font-bold text-[14px] hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#a855f7] text-white rounded-xl font-bold text-[14px] hover:bg-[#9333ea] transition-all shadow-md shadow-purple-200"
            >
              <CheckCircle size={18} /> Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRecoveryEntry;
