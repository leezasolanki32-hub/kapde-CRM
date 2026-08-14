import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, Building, FileText, Calendar, Hash, ChevronDown, ChevronUp, User, Truck, IndianRupee } from 'lucide-react';

const CreateDebitNote = ({ setActiveTab, previousTab = 'Purchases' }) => {
  const [formData, setFormData] = useState({
    supplier: '',
    contact: '',
    debitNoteNumber: '',
    debitNoteDate: '',
    linkedInvoice: '',
    reason: 'Goods Returned',
    paymentMode: 'Adjustment',
    taxPercent: '18',
    narration: '',
  });

  const [items, setItems] = useState([
    { description: '', qty: '', unit: 'Pcs', rate: '', amount: '' }
  ]);
  const [showMore, setShowMore] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    setItems(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      if (field === 'qty' || field === 'rate') {
        const qty = parseFloat(field === 'qty' ? value : updated[index].qty) || 0;
        const rate = parseFloat(field === 'rate' ? value : updated[index].rate) || 0;
        updated[index].amount = (qty * rate).toFixed(2);
      }
      return updated;
    });
  };

  const addItem = () => setItems(prev => [...prev, { description: '', qty: '', unit: 'Pcs', rate: '', amount: '' }]);
  const removeItem = (index) => setItems(prev => prev.filter((_, i) => i !== index));

  const subtotal = items.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  const tax = subtotal * (parseFloat(formData.taxPercent) || 0) / 100;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setActiveTab(previousTab), 1500);
  };

  const inputClass = "w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white";
  const labelClass = "block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5";

  const reasons = [
    'Goods Returned',
    'Short Supply',
    'Damaged Goods',
    'Quality Issue',
    'Wrong Item Delivered',
    'Price Difference',
    'Other',
  ];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[900px] mx-auto p-4 lg:p-8">

      {/* Success Banner */}
      {saved && (
        <div className="mb-6 flex items-center gap-3 bg-green-50 border border-green-200 text-green-700 rounded-xl px-5 py-3 text-[14px] font-semibold animate-[slideUpFade_0.3s_ease-out]">
          <CheckCircle size={18} className="text-green-500" />
          Debit Note saved successfully! Redirecting...
        </div>
      )}
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => setActiveTab(previousTab)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-[#6B6B70]" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">Enter Debit Note</h1>
          <p className="text-[14px] text-[#6B6B70] mt-1 font-medium">Record a debit note against a supplier invoice</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Supplier Info */}
        <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm p-6 space-y-6">
          <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <Building size={16} className="text-[#a855f7]" /> Supplier Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}><Truck size={14} className="text-[#a855f7]" /> Supplier Name <span className="text-red-500">*</span></label>
              <input type="text" name="supplier" required value={formData.supplier} onChange={handleInputChange} className={inputClass} placeholder="Select or enter supplier" />
            </div>
            <div>
              <label className={labelClass}><User size={14} className="text-[#a855f7]" /> Contact Person</label>
              <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} className={inputClass} placeholder="Contact name" />
            </div>
          </div>
        </div>

        {/* Debit Note Details */}
        <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm p-6 space-y-6">
          <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-3">
            <FileText size={16} className="text-[#a855f7]" /> Debit Note Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className={labelClass}><Hash size={14} className="text-[#a855f7]" /> Debit Note No. <span className="text-red-500">*</span></label>
              <input type="text" name="debitNoteNumber" required value={formData.debitNoteNumber} onChange={handleInputChange} className={inputClass} placeholder="e.g. DN-001" />
            </div>
            <div>
              <label className={labelClass}><Calendar size={14} className="text-[#a855f7]" /> Date <span className="text-red-500">*</span></label>
              <input type="date" name="debitNoteDate" required value={formData.debitNoteDate} onChange={handleInputChange} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}><Hash size={14} className="text-[#a855f7]" /> Linked Invoice No.</label>
              <input type="text" name="linkedInvoice" value={formData.linkedInvoice} onChange={handleInputChange} className={inputClass} placeholder="e.g. Inv422" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>Reason for Debit Note <span className="text-red-500">*</span></label>
              <select name="reason" required value={formData.reason} onChange={handleInputChange} className={inputClass}>
                {reasons.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>Adjustment Mode</label>
              <select name="paymentMode" value={formData.paymentMode} onChange={handleInputChange} className={inputClass}>
                <option value="Adjustment">Adjustment (against future invoices)</option>
                <option value="Cash Refund">Cash Refund</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="UPI">UPI</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm p-6">
          <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-3 mb-4">
            Returned / Adjusted Items
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-[13px]">
              <thead>
                <tr className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider border-b border-[#f0f0f0]">
                  <th className="pb-2 text-left w-[40%]">Description</th>
                  <th className="pb-2 text-center w-[10%]">Qty</th>
                  <th className="pb-2 text-center w-[12%]">Unit</th>
                  <th className="pb-2 text-right w-[15%]">Rate (₹)</th>
                  <th className="pb-2 text-right w-[15%]">Amount (₹)</th>
                  <th className="pb-2 w-[8%]"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f8f8f8]">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 pr-3">
                      <input type="text" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] bg-slate-50 focus:bg-white transition" placeholder="Item description" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" min="0" value={item.qty} onChange={(e) => handleItemChange(index, 'qty', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] text-center bg-slate-50 focus:bg-white transition" placeholder="0" />
                    </td>
                    <td className="py-2 px-2">
                      <select value={item.unit} onChange={(e) => handleItemChange(index, 'unit', e.target.value)} className="w-full px-2 py-2 rounded-lg border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] bg-slate-50 focus:bg-white transition">
                        <option>Pcs</option><option>Mtr</option><option>Kg</option><option>Box</option><option>Set</option>
                      </select>
                    </td>
                    <td className="py-2 px-2">
                      <input type="number" min="0" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} className="w-full px-3 py-2 rounded-lg border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] text-right bg-slate-50 focus:bg-white transition" placeholder="0.00" />
                    </td>
                    <td className="py-2 px-2">
                      <input type="text" readOnly value={item.amount ? `₹${item.amount}` : ''} className="w-full px-3 py-2 rounded-lg border border-[#f0f0f0] text-[13px] text-right bg-[#fafafa] text-[#1C1C1E] font-bold" placeholder="₹0.00" />
                    </td>
                    <td className="py-2 pl-2 text-center">
                      {items.length > 1 && (
                        <button type="button" onClick={() => removeItem(index)} className="text-[#ef4444] hover:bg-[#fef2f2] p-1.5 rounded-lg transition text-[16px] font-bold">×</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={addItem} className="mt-4 text-[#a855f7] text-[13px] font-bold hover:underline flex items-center gap-1">
            + Add Item
          </button>

          {/* Totals */}
          <div className="mt-6 border-t border-[#f0f0f0] pt-4 flex flex-col items-end gap-2 text-[13px]">
            <div className="flex justify-between w-full max-w-[280px] text-[#6B6B70]">
              <span>Subtotal</span>
              <span className="font-bold text-[#1C1C1E]">₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-[280px] items-center gap-3">
              <span className="text-[#6B6B70]">GST %</span>
              <select name="taxPercent" value={formData.taxPercent} onChange={handleInputChange} className="border border-[#E2DED6] rounded-lg px-2 py-1 text-[13px] focus:outline-none focus:border-[#a855f7] bg-white w-[80px]">
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18">18%</option>
                <option value="28">28%</option>
              </select>
              <span className="font-bold text-[#1C1C1E]">₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between w-full max-w-[280px] border-t border-[#f0f0f0] pt-2 text-[15px]">
              <span className="font-bold text-[#1C1C1E]">Total Debit</span>
              <span className="font-bold text-[#ef4444]">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* More Details */}
        <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm p-6">
          <button type="button" onClick={() => setShowMore(!showMore)} className="flex items-center gap-2 text-[14px] font-bold text-[#1C1C1E] hover:text-[#a855f7] transition-colors w-full">
            {showMore ? <ChevronUp size={18} /> : <ChevronDown size={18} />} Additional Notes
          </button>
          {showMore && (
            <div className="mt-4">
              <label className={labelClass}><IndianRupee size={14} className="text-[#a855f7]" /> Narration / Notes</label>
              <textarea name="narration" value={formData.narration} onChange={handleInputChange} rows="3" className={`${inputClass} resize-none`} placeholder="Reason or additional notes about this debit note..."></textarea>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button type="button" onClick={() => setActiveTab(previousTab)} className="px-6 py-2.5 rounded-xl border border-[#E2DED6] text-[#6B6B70] font-bold text-[14px] hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#1C1C1E] text-white rounded-xl font-bold text-[14px] hover:bg-[#333] transition-all shadow-md">
            <CheckCircle size={18} /> Save Debit Note
          </button>
        </div>

      </form>
    </div>
  );
};

export default CreateDebitNote;
