import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { CheckCircle } from 'lucide-react';
import { Printer, Pencil } from "lucide-react";

const PurchaseOrders = ({ setActiveTab, setEditingOrder }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPrintSettings, setShowPrintSettings] = useState(false);
  const [printSaved, setPrintSaved] = useState(false);
  const [printSettings, setPrintSettings] = useState({
    paperSize: 'A4',
    orientation: 'Portrait',
    marginTop: '10',
    marginBottom: '10',
    marginLeft: '10',
    marginRight: '10',
    showHeader: true,
    showFooter: true,
    showLogo: true,
    showSignature: false,
    copies: '1',
    colorMode: 'Color',
  });

  const handlePrintChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrintSettings(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`\${import.meta.env.VITE_API_URL}/purchase-orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching purchase orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Purchase Orders</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPrintSettings(true)}
            className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#333] transition"
          >
            <Printer size={16} className="inline-block" />️ Print Settings
          </button>
        </div>
      </div>

      {/* Filters + Create */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="flex gap-4">
          <select className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#a855f7]">
            <option>This Month</option>
          </select>
          <select className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#a855f7]">
            <option>Pending</option>
          </select>
        </div>
        <button
          onClick={() => setActiveTab('CreatePurchaseOrder')}
          className="bg-[#a855f7] text-white px-4 py-2 rounded-md text-[12px] font-bold hover:bg-[#9333ea] shadow-sm"
        >
          + Create Purchase Order
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-[#E2DED6] rounded-xl overflow-x-auto mb-8 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAF8F4] border-b border-[#E2DED6]">
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E]">Supplier</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E]">Contact</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E]">Order No.</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E]">Order Date</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E]">Taxable (₹)</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E]">Amount (₹)</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-[#6B6B70]">Loading purchase orders...</td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="7" className="py-8 text-center text-[#6B6B70]">No purchase orders found.</td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order._id || order.id} className="border-b border-[#f0f0f0] hover:bg-[#faf4ff]">
                  <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{order.supplier}</td>
                  <td className="py-4 px-6 text-[13px] text-[#1C1C1E]">{order.contact}</td>
                  <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{order.orderNumber}</td>
                  <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{order.orderDate}</td>
                  <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{order.taxable}</td>
                  <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{order.amount}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      onClick={() => {
                        setEditingOrder(order);
                        setActiveTab('CreatePurchaseOrder');
                      }}
                      className="bg-[#f3e8ff] text-[#a855f7] p-2 rounded shadow-sm hover:bg-[#e9d5ff] transition"
                      title="Edit order"
                    >
                      <Pencil size={16} className="inline-block" />️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="p-4 bg-[#FAF8F4] border-t border-[#E2DED6]">
          <button
            onClick={() => setActiveTab('CreatePurchaseOrder')}
            className="bg-[#a855f7] text-white px-5 py-2 rounded-md text-[12px] font-bold hover:bg-[#9333ea] transition shadow-sm"
          >
            + Click here to enter a purchase order.
          </button>
        </div>
      </div>

      <TrainingResources />

      {/* Print Settings Modal */}
      {showPrintSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <div>
                <h2 className="text-[18px] font-bold text-[#1C1C1E]"><Printer size={16} className="inline-block" />️ Print Settings</h2>
                <p className="text-[12px] text-[#6B6B70] mt-0.5">Configure how your purchase orders are printed</p>
              </div>
              <button
                onClick={() => setShowPrintSettings(false)}
                className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl font-bold"
              >×</button>
            </div>

            <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">

              {/* Page Setup */}
              <div>
                <h3 className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider mb-3">Page Setup</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-bold text-[#1C1C1E] mb-1.5">Paper Size</label>
                    <select name="paperSize" value={printSettings.paperSize} onChange={handlePrintChange} className="w-full px-3 py-2 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] bg-slate-50">
                      <option value="A4">A4</option>
                      <option value="A5">A5</option>
                      <option value="Letter">Letter</option>
                      <option value="Legal">Legal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-[#1C1C1E] mb-1.5">Orientation</label>
                    <select name="orientation" value={printSettings.orientation} onChange={handlePrintChange} className="w-full px-3 py-2 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] bg-slate-50">
                      <option value="Portrait">Portrait</option>
                      <option value="Landscape">Landscape</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Margins */}
              <div>
                <h3 className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider mb-3">Margins (mm)</h3>
                <div className="grid grid-cols-4 gap-3">
                  {['marginTop', 'marginBottom', 'marginLeft', 'marginRight'].map((m) => (
                    <div key={m}>
                      <label className="block text-[11px] font-bold text-[#6B6B70] mb-1 capitalize">{m.replace('margin', '')}</label>
                      <input
                        type="number" name={m} value={printSettings[m]}
                        onChange={handlePrintChange} min="0" max="50"
                        className="w-full px-3 py-2 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] text-center bg-slate-50"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Print Options */}
              <div>
                <h3 className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider mb-3">Print Options</h3>
                <div className="space-y-3">
                  {[
                    { key: 'showHeader', label: 'Show Header (Company Name & Address)' },
                    { key: 'showFooter', label: 'Show Footer (Terms & Bank Details)' },
                    { key: 'showLogo', label: 'Print Company Logo' },
                    { key: 'showSignature', label: 'Include Signature Line' },
                  ].map(opt => (
                    <label key={opt.key} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        type="checkbox" name={opt.key}
                        checked={printSettings[opt.key]}
                        onChange={handlePrintChange}
                        className="w-4 h-4 accent-[#a855f7] rounded"
                      />
                      <span className="text-[13px] text-[#1C1C1E] group-hover:text-[#a855f7] transition-colors">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Copies & Color */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#1C1C1E] mb-1.5">No. of Copies</label>
                  <input
                    type="number" name="copies" min="1" max="10"
                    value={printSettings.copies} onChange={handlePrintChange}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] bg-slate-50 text-center"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#1C1C1E] mb-1.5">Color Mode</label>
                  <select name="colorMode" value={printSettings.colorMode} onChange={handlePrintChange} className="w-full px-3 py-2 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] text-[13px] bg-slate-50">
                    <option value="Color">Color</option>
                    <option value="Black & White">Black & White</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#f0f0f0] bg-[#fafafa] flex justify-end gap-3">
              <button
                onClick={() => setShowPrintSettings(false)}
                className="px-4 py-2 rounded-lg text-[13px] font-bold text-[#6B6B70] hover:bg-[#E2DED6] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setPrintSaved(true);
                  setTimeout(() => {
                    setPrintSaved(false);
                    setShowPrintSettings(false);
                  }, 1200);
                }}
                className="px-6 py-2 bg-[#a855f7] text-white rounded-lg text-[13px] font-bold hover:bg-[#9333ea] transition shadow-md flex items-center gap-2"
              >
                {printSaved ? (
                  <><CheckCircle size={15} /> Saved!</>
                ) : (
                  'Save & Print'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PurchaseOrders;
