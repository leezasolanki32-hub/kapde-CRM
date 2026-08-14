import React, { useState } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Search, TrendingUp, Star, Scale, ClipboardList, Landmark, Package, ShoppingCart, FileText } from "lucide-react";

/* ───────────── Add Ledger Modal ───────────── */
const AddLedgerModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    group: 'Current Assets',
    openingBalance: '0.00',
    type: 'Dr'
  });

  const inputCls = "w-full border border-[#E2DED6] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition bg-white";
  const labelCls = "block text-[12px] font-semibold text-[#4B4B4F] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DED6]">
          <h2 className="text-[18px] font-bold text-[#1C1C1E]">Create New Ledger</h2>
          <button onClick={onClose} className="text-[#6B6B70] hover:text-[#1C1C1E] text-[22px]">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className={labelCls}>Ledger Name <span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className={inputCls} placeholder="e.g. HDFC Bank" />
          </div>
          <div>
            <label className={labelCls}>Under Group</label>
            <select className={inputCls} value={form.group} onChange={(e) => setForm({...form, group: e.target.value})}>
              <option>Current Assets</option>
              <option>Fixed Assets</option>
              <option>Equity</option>
              <option>Direct Income</option>
              <option>Indirect Expense</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Opening Balance</label>
              <input type="number" className={inputCls} value={form.openingBalance} onChange={(e) => setForm({...form, openingBalance: e.target.value})} />
            </div>
            <div>
              <label className={labelCls}>Balance Type</label>
              <select className={inputCls} value={form.type} onChange={(e) => setForm({...form, type: e.target.value})}>
                <option>Dr</option>
                <option>Cr</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2DED6] bg-[#FAFAFA] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-md border border-[#E2DED6] text-[13px] font-medium hover:bg-slate-50 transition">Cancel</button>
          <button onClick={onClose} className="px-6 py-2 rounded-md bg-[#a855f7] text-white text-[13px] font-bold hover:bg-[#9333ea] shadow-sm">Save Ledger</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Find Ledger Modal ───────────── */
const FindLedgerModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-[slideUpFade_0.3s_ease-out]">
        <div className="px-6 py-5 border-b border-[#E2DED6]">
          <div className="relative">
            <input autoFocus type="text" placeholder="Type to search ledgers (e.g. Sales, Cash...)" className="w-full pl-10 pr-4 py-3 border border-[#E2DED6] rounded-xl text-[15px] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 transition-all shadow-sm" />
            <span className="absolute left-3.5 top-3.5 text-[18px]"><Search size={16} className="inline-block" /></span>
          </div>
        </div>
        <div className="p-2 max-h-[350px] overflow-y-auto">
          {['Cash', 'Sales', 'Purchase', 'Bank Account', 'HDFC Bank', 'GST Payable', 'Furniture', 'Rent Expense'].map((l, i) => (
            <div key={i} className="px-4 py-3 hover:bg-[#f3e8ff] rounded-lg cursor-pointer flex justify-between items-center transition-colors group">
              <span className="text-[14px] font-medium text-[#1C1C1E] group-hover:text-[#9333ea]">{l}</span>
              <span className="text-[11px] text-[#6B6B70] uppercase font-bold tracking-wider">ID #802{i}</span>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-[#E2DED6] bg-[#FAFAFA] rounded-b-2xl flex justify-between items-center">
          <p className="text-[11px] text-[#6B6B70]">Press <kbd className="bg-white border border-[#E2DED6] px-1 rounded text-[10px]">ESC</kbd> to close</p>
          <button onClick={onClose} className="text-[13px] font-bold text-[#a855f7] hover:underline">Close</button>
        </div>
      </div>
    </div>
  );
};


const Accounts = ({ setActiveTab }) => {
  const [showLedgerModal, setShowLedgerModal] = useState(false);
  const [showFindModal, setShowFindModal] = useState(false);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showLedgerModal && <AddLedgerModal onClose={() => setShowLedgerModal(false)} />}
      {showFindModal && <FindLedgerModal onClose={() => setShowFindModal(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Accounts</h1>
        <div className="flex items-center gap-3">
          <div className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] text-[#6B6B70] shadow-sm font-medium">FY 2026-2027</div>
          <button onClick={() => setActiveTab('CreateVoucher')} className="bg-[#a855f7] text-white px-4 py-2 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#9333ea] transition">+ Enter Voucher</button>
          <button onClick={() => setActiveTab('Purchases')} className="bg-white border border-[#E2DED6] text-[#1C1C1E] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#f9f9f9] transition shadow-sm">Purchases</button>
          <button onClick={() => setActiveTab('Orders')} className="bg-white border border-[#E2DED6] text-[#1C1C1E] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#f9f9f9] transition shadow-sm"><TrendingUp size={16} className="inline-block" /> Sales</button>
        </div>
      </div>


      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white border border-[#E2DED6] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#E2DED6] flex justify-between items-center bg-[#FAF8F4]">
              <h3 className="font-bold text-[15px] text-[#1C1C1E]">Groups & Ledgers</h3>
              <div className="flex items-center gap-3">
                <label className="text-[12px] flex items-center gap-2 cursor-pointer text-[#6B6B70]">
                  <input type="checkbox" className="accent-[#a855f7]" /> Hide zeroes
                </label>
                <button onClick={() => setShowLedgerModal(true)} className="bg-[#a855f7] text-white w-6 h-6 rounded flex items-center justify-center text-[18px] hover:bg-[#9333ea] transition shadow-sm">+</button>
              </div>
            </div>
            <div className="overflow-auto max-h-[500px]">
              <table className="w-full text-left text-[13px]">
                <tbody>
                  {[
                    'Current Assets', 'Fixed Assets', 'Equity', 'Long Term Liabilities', 'Short Term Liabilities',
                    'Direct Income', 'Indirect Income', 'Sales', 'Direct Expense', 'Indirect Expense', 'Purchase'
                  ].map((item, i) => (
                    <tr key={i} className="border-b border-[#f0f0f0] hover:bg-[#faf4ff]">
                      <td className="py-3 px-5 font-medium text-[#1C1C1E]">{item}</td>
                      <td className="py-3 px-5 text-right font-bold text-[#6B6B70]">0.00 Db</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <button onClick={() => setShowLedgerModal(true)} className="mt-4 bg-[#a855f7] text-white px-5 py-2.5 rounded-md text-[12px] font-bold hover:bg-[#9333ea] shadow-md transition-all">+ Create Ledger / Sub-Group</button>
        </div>

        <div className="lg:w-1/3 flex flex-col gap-8">
          <div className="bg-white border border-[#E2DED6] rounded-xl p-6 shadow-sm">
            <h3 className="font-bold text-[15px] mb-4">Favourite Ledgers</h3>
            <div className="bg-[#f9f9f9] border border-dashed border-[#d1d5db] p-8 rounded-lg text-center">
              <p className="text-[12px] text-[#6B6B70]">Click <Star size={16} className="inline-block" /> next to the name of a ledger to mark it as favourite.</p>
            </div>
          </div>

          <div className="bg-white border border-[#E2DED6] rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-[15px]">Quick Access</h3>
              <button onClick={() => setShowFindModal(true)} className="bg-[#fff1f2] border border-[#fecdd3] text-[#e11d48] px-3 py-1.5 rounded text-[11px] font-bold hover:bg-[#e11d48] hover:text-white transition-all duration-300"><Search size={16} className="inline-block" /> Find Ledger</button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Balance Sheet', icon: '<Scale size={16} className="inline-block" />️' },
                { label: 'Profit & Loss', icon: '<TrendingUp size={16} className="inline-block" />' },
                { label: 'Trial Balance', icon: '<ClipboardList size={16} className="inline-block" />' },
                { label: 'GST Ledgers', icon: '<Landmark size={16} className="inline-block" />️' },
                { label: 'Reconciliation', icon: '₹' },
                { label: 'Stock Value', icon: '<Package size={16} className="inline-block" />' },
                { label: 'Purchase Orders', icon: '<ShoppingCart size={16} className="inline-block" />', tab: 'Purch Orders' },
                { label: 'Credit Notes', icon: '<FileText size={16} className="inline-block" />', tab: 'CreditNotes' },
                { label: 'Debit Notes', icon: '<FileText size={16} className="inline-block" />', tab: 'CreateDebitNote' }
              ].map((btn, i) => (
                <button 
                  key={i} 
                  onClick={() => btn.tab && setActiveTab(btn.tab)}
                  className="bg-[#f3e8ff] border border-[#d8b4fe] text-[#a855f7] p-3 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-[#a855f7] hover:text-white transition-all shadow-sm group"
                >

                  <span className="text-[20px] group-hover:scale-110 transition-transform">{btn.icon}</span>
                  <span className="text-[11px] font-bold uppercase tracking-tight whitespace-nowrap">{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <TrainingResources />
      </div>
    </div>
  );
};

export default Accounts;
