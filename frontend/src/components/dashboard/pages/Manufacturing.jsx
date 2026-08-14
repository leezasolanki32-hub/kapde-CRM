import React, { useState } from 'react';
import { Factory } from "lucide-react";

/* ───────────── New Job Order Modal ───────────── */
const NewJobOrderModal = ({ onClose }) => {
  const [form, setForm] = useState({
    item: '',
    quantity: '',
    batchNo: `BJ-${Math.floor(1000 + Math.random() * 9000)}`,
    startDate: new Date().toISOString().split('T')[0],
    completionDate: '',
    priority: 'Medium',
    line: 'Main Line',
    notes: ''
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputCls = "w-full border border-[#E2DED6] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7] focus:ring-1 focus:ring-[#a855f7] transition bg-white";
  const labelCls = "block text-[12px] font-semibold text-[#4B4B4F] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DED6]">
          <div>
            <h2 className="text-[18px] font-bold text-[#1C1C1E]">Create New Job Order</h2>
            <p className="text-[12px] text-[#6B6B70] mt-0.5">Define production details for the new batch</p>
          </div>
          <button onClick={onClose} className="text-[#6B6B70] hover:text-[#1C1C1E] text-[22px] leading-none transition">×</button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div className="col-span-2">
              <label className={labelCls}>Item to Manufacture <span className="text-red-500">*</span></label>
              <select name="item" value={form.item} onChange={handle} className={inputCls}>
                <option value="">Select an Item</option>
                <option>Denim Jeans - Slim Fit</option>
                <option>Cotton Shirt - Casual</option>
                <option>Silk Scarf</option>
                <option>Woolen Sweater</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Target Quantity <span className="text-red-500">*</span></label>
              <input type="number" name="quantity" value={form.quantity} onChange={handle} className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Batch Number</label>
              <input name="batchNo" value={form.batchNo} onChange={handle} className={inputCls} />
            </div>
          </div>

          <p className="text-[11px] font-bold text-[#a855f7] uppercase tracking-wider mb-3">Scheduling</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Start Date</label>
              <input type="date" name="startDate" value={form.startDate} onChange={handle} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Expected Completion</label>
              <input type="date" name="completionDate" value={form.completionDate} onChange={handle} className={inputCls} />
            </div>
          </div>

          <p className="text-[11px] font-bold text-[#a855f7] uppercase tracking-wider mb-3">Line & Priority</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Production Line</label>
              <select name="line" value={form.line} onChange={handle} className={inputCls}>
                <option>Main Line</option>
                <option>Assembly Line A</option>
                <option>Packaging Unit</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Priority</label>
              <select name="priority" value={form.priority} onChange={handle} className={inputCls}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls}>Instructions / Notes</label>
            <textarea name="notes" value={form.notes} onChange={handle} rows={3} className={inputCls + " resize-none"} placeholder="Special handling instructions..." />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#E2DED6] bg-[#FAFAFA] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-md border border-[#E2DED6] text-[13px] text-[#4B4B4F] hover:bg-[#F3F0EC] transition font-medium">Cancel</button>
          <button onClick={onClose} className="px-6 py-2 rounded-md bg-[#a855f7] text-white text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm">Create Job Order</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Bill of Materials (BOM) Modal ───────────── */
const BOMModal = ({ onClose }) => {
  const boms = [
    { 
      product: 'Denim Jeans - Slim Fit', 
      materials: [
        { name: 'Denim Fabric', qty: '1.5 Meters' },
        { name: 'Steel Buttons', qty: '4 Pcs' },
        { name: 'Thread (Blue)', qty: '10 Meters' },
        { name: 'Zipper (5 inch)', qty: '1 Pcs' }
      ]
    },
    { 
      product: 'Cotton Shirt - Casual', 
      materials: [
        { name: 'Cotton Fabric', qty: '2.0 Meters' },
        { name: 'Plastic Buttons', qty: '7 Pcs' },
        { name: 'Thread (White)', qty: '12 Meters' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2DED6]">
          <div>
            <h2 className="text-[18px] font-bold text-[#1C1C1E]">Bill of Materials (BOM)</h2>
            <p className="text-[12px] text-[#6B6B70] mt-0.5">Raw materials required for finished goods</p>
          </div>
          <button onClick={onClose} className="text-[#6B6B70] hover:text-[#1C1C1E] text-[22px] leading-none transition">×</button>
        </div>

        <div className="overflow-y-auto p-6 flex-1">
          <div className="space-y-6">
            {boms.map((bom, idx) => (
              <div key={idx} className="border border-[#E2DED6] rounded-xl overflow-hidden shadow-sm">
                <div className="bg-[#f3e8ff] px-4 py-2 border-b border-[#E2DED6] flex justify-between items-center">
                  <span className="font-bold text-[#9333ea] text-[14px]">{bom.product}</span>
                  <span className="text-[11px] bg-white px-2 py-0.5 rounded-full text-[#a855f7] font-bold shadow-sm">Standard BOM</span>
                </div>
                <table className="w-full text-left text-[13px]">
                  <thead className="bg-[#FAFAFA] text-[#6B6B70] font-bold text-[11px] uppercase tracking-wider">
                    <tr>
                      <th className="px-4 py-3">Raw Material</th>
                      <th className="px-4 py-3 text-right">Quantity Required</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2DED6]">
                    {bom.materials.map((m, mIdx) => (
                      <tr key={mIdx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-[#1C1C1E] font-medium">{m.name}</td>
                        <td className="px-4 py-3 text-right font-bold text-[#6B6B70]">{m.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#E2DED6] bg-[#FAFAFA] flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="bg-[#1C1C1E] text-white px-6 py-2 rounded-md text-[13px] font-bold hover:bg-[#333] transition shadow-sm">Close</button>
        </div>
      </div>
    </div>
  );
};

const Manufacturing = () => {

  const [showJobModal, setShowJobModal] = useState(false);
  const [showBOMModal, setShowBOMModal] = useState(false);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showJobModal && <NewJobOrderModal onClose={() => setShowJobModal(false)} />}
      {showBOMModal && <BOMModal onClose={() => setShowBOMModal(false)} />}


      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Manufacturing</h1>
        <div className="flex items-center gap-3">
          <button onClick={() => setShowJobModal(true)} className="bg-[#a855f7] text-white px-5 py-2 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#9333ea]">+ New Job Order</button>
        </div>
      </div>

      <div className="bg-white border border-[#E2DED6] rounded-xl p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-[#f3e8ff] rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-[40px]"><Factory size={16} className="inline-block" /></span>
        </div>
        <h3 className="text-[20px] font-bold text-[#1C1C1E] mb-2">Production Tracking</h3>
        <p className="text-[15px] text-[#6B6B70] max-w-md mx-auto mb-8">
          Manage your production lines, job orders, and material consumption in one place.
        </p>
        <div className="flex justify-center gap-4">
          <button onClick={() => setShowJobModal(true)} className="bg-[#a855f7] text-white px-6 py-2.5 rounded-md text-[14px] font-bold shadow-md hover:bg-[#9333ea]">Start First Job</button>
          <button onClick={() => setShowBOMModal(true)} className="bg-white border border-[#1C1C1E] text-[#1C1C1E] px-6 py-2.5 rounded-md text-[14px] font-bold hover:bg-[#f9f9f9]">View BOM</button>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#FAF8F4] border border-[#E2DED6] rounded-xl">
          <div className="text-[12px] font-bold text-[#a855f7] uppercase mb-1">Stock in Production</div>
          <div className="text-[24px] font-bold text-[#1C1C1E]">₹ 0.00</div>
        </div>
        <div className="p-6 bg-[#FAF8F4] border border-[#E2DED6] rounded-xl">
          <div className="text-[12px] font-bold text-[#a855f7] uppercase mb-1">Active Jobs</div>
          <div className="text-[24px] font-bold text-[#1C1C1E]">0</div>
        </div>
        <div className="p-6 bg-[#FAF8F4] border border-[#E2DED6] rounded-xl">
          <div className="text-[12px] font-bold text-[#a855f7] uppercase mb-1">Pending Requests</div>
          <div className="text-[24px] font-bold text-[#1C1C1E]">0</div>
        </div>
      </div>
    </div>
  );
};

export default Manufacturing;
