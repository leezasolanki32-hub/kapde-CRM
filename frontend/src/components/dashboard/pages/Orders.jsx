import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Printer, Search, Eye } from "lucide-react";

const Orders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    cust: '',
    amt: '',
    status: 'Pending',
    src: 'Website',
    exec: 'Meet Patel'
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`\${import.meta.env.VITE_API_URL}/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const [printSettings, setPrintSettings] = useState({
    template: 'Invoice',
    paperSize: 'A4',
    orientation: 'Portrait',
    includeLogo: true,
    includeSignature: true
  });

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    const id = `ORD-2026-${Math.random().toString(36).substr(2, 2).toUpperCase()}${Math.floor(Math.random() * 10)}`;
    const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    const shipDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });

    let statusColor = 'bg-yellow-100 text-yellow-700';
    if (newOrder.status === 'Processing') statusColor = 'bg-blue-100 text-blue-700';
    if (newOrder.status === 'Shipped') statusColor = 'bg-green-100 text-green-700';
    if (newOrder.status === 'Returned') statusColor = 'bg-red-100 text-red-700';

    const orderToAdd = {
      ...newOrder,
      id,
      date,
      ship: shipDate,
      color: statusColor,
      amt: parseFloat(newOrder.amt).toLocaleString('en-IN', { minimumFractionDigits: 2 })
    };

    try {
      const response = await fetch(`\${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderToAdd)
      });

      if (response.ok) {
        const savedOrder = await response.json();
        setOrders([savedOrder, ...orders]);
        setShowCreateModal(false);
        setNewOrder({ cust: '', amt: '', status: 'Pending', src: 'Website', exec: 'Meet Patel' });
      } else {
        alert('Failed to save order');
      }
    } catch (error) {
      alert('Error saving order. Is the backend running?');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = activeTab === 'All' || order.status === activeTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.cust.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const tabs = ['All Orders', 'Pending', 'Processing', 'Shipped', 'Returned'];

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Order Management</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowPrintModal(true)}
            className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#333] transition"
          >
            <Printer size={16} className="inline-block" />️ Batch Print
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#a855f7] text-white px-4 py-2 rounded-md text-[13px] font-semibold flex items-center gap-2 hover:bg-[#9333ea] transition ml-2 shadow-sm"
          >
            + Create New Order
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 border-b border-[#E2DED6] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab === 'All Orders' ? 'All' : tab)}
              className={`px-4 py-1.5 text-[13px] font-medium rounded-md transition whitespace-nowrap ${(activeTab === 'All' && tab === 'All Orders') || activeTab === tab
                ? 'bg-[#a855f7] text-white shadow-sm'
                : 'text-[#6B6B70] border border-transparent hover:border-[#E2DED6]'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Order ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-[#E2DED6] text-[13px] rounded-md px-3 py-1.5 pl-8 w-[180px] focus:outline-none focus:border-[#a855f7] bg-white"
            />
            <span className="absolute left-2.5 top-2 text-[#6B6B70]"><Search size={16} className="inline-block" /></span>
          </div>
          <select className="border border-[#E2DED6] text-[13px] rounded-md px-3 py-1.5 focus:outline-none focus:border-[#a855f7] bg-white">
            <option>Last 30 Days</option>
            <option>Last 6 Months</option>
            <option>2026 Season</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#E2DED6] rounded-lg overflow-x-auto mb-6 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAF8F4] border-b border-[#E2DED6]">
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Order ID</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Customer</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Amount (₹)</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Status</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Placed on</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Delivery</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Source</th>
              <th className="py-3 px-4 text-[12px] font-bold text-[#1C1C1E] whitespace-nowrap">Executive</th>
              <th className="py-4 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="py-8 text-center text-[#6B6B70] text-[14px]">Loading orders...</td>
              </tr>
            ) : filteredOrders.length > 0 ? (
              filteredOrders.map((order, idx) => (
                <tr key={order._id || idx} className="border-b border-[#f0f0f0] hover:bg-[#faf4ff] transition">
                  <td className="py-4 px-4 text-[13px] font-bold text-[#a855f7] whitespace-nowrap">{order.id}</td>
                  <td className="py-4 px-4 text-[13px] text-[#1C1C1E] whitespace-nowrap">{order.cust}</td>
                  <td className="py-4 px-4 text-[13px] font-medium text-[#1C1C1E] whitespace-nowrap">{order.amt}</td>
                  <td className="py-4 px-4">
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${order.color || 'bg-gray-100 text-gray-700'}`}>{order.status}</span>
                  </td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{order.date}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{order.ship}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{order.src}</td>
                  <td className="py-4 px-4 text-[13px] text-[#6B6B70] whitespace-nowrap">{order.exec}</td>
                  <td className="py-4 px-4 text-center">
                    <button className="bg-[#f3e8ff] text-[#a855f7] p-1.5 rounded hover:bg-[#e9d5ff] transition shadow-sm"><Eye size={16} className="inline-block" />️</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="py-8 text-center text-[#6B6B70] text-[14px]">No orders found for this status.</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="p-4 border-t border-[#f0f0f0] bg-[#FAF8F4] flex justify-between items-center">
          <span className="text-[12px] text-[#6B6B70]">Showing {filteredOrders.length} of {orders.length} filtered orders</span>
          <button className="bg-[#a855f7] text-white px-4 py-2 text-[13px] font-medium rounded-md hover:bg-[#9333ea] transition shadow-sm">
            Load More Orders
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E2DED6] rounded-xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-[#6B6B70] uppercase mb-1">Total Fulfillment</div>
          <div className="text-[24px] font-serif font-bold text-[#1C1C1E] mb-2">94.2%</div>
          <div className="text-[12px] text-green-600 font-medium">▲ 2.1% this week</div>
        </div>
        <div className="bg-white border border-[#E2DED6] rounded-xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-[#6B6B70] uppercase mb-1">Avg. Shipping Time</div>
          <div className="text-[24px] font-serif font-bold text-[#1C1C1E] mb-2">2.4 Days</div>
          <div className="text-[12px] text-[#6B6B70] font-medium">Standard Ground</div>
        </div>
        <div className="bg-white border border-[#E2DED6] rounded-xl p-6 shadow-sm">
          <div className="text-[11px] font-bold text-[#6B6B70] uppercase mb-1">Active Returns</div>
          <div className="text-[24px] font-serif font-bold text-[#1C1C1E] mb-2">12</div>
          <div className="text-[12px] text-red-500 font-medium">▼ Needs Attention</div>
        </div>
      </div>

      <TrainingResources />

      {/* Create Order Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Create New Order</h2>
              <button onClick={() => setShowCreateModal(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl">×</button>
            </div>
            <form onSubmit={handleCreateOrder} className="p-6 space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Customer Name</label>
                <input
                  required
                  type="text"
                  placeholder="Enter customer name"
                  className="w-full border border-[#E2DED6] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7] bg-white transition"
                  value={newOrder.cust}
                  onChange={(e) => setNewOrder({ ...newOrder, cust: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Amount (₹)</label>
                  <input
                    required
                    type="number"
                    placeholder="0.00"
                    className="w-full border border-[#E2DED6] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7] bg-white transition"
                    value={newOrder.amt}
                    onChange={(e) => setNewOrder({ ...newOrder, amt: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Status</label>
                  <select
                    className="w-full border border-[#E2DED6] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7] bg-white transition cursor-pointer"
                    value={newOrder.status}
                    onChange={(e) => setNewOrder({ ...newOrder, status: e.target.value })}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Returned</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Source</label>
                  <select
                    className="w-full border border-[#E2DED6] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7] bg-white transition cursor-pointer"
                    value={newOrder.src}
                    onChange={(e) => setNewOrder({ ...newOrder, src: e.target.value })}
                  >
                    <option>Website</option>
                    <option>Mobile App</option>
                    <option>Wholesale</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1">Executive</label>
                  <select
                    className="w-full border border-[#E2DED6] rounded-lg px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7] bg-white transition cursor-pointer"
                    value={newOrder.exec}
                    onChange={(e) => setNewOrder({ ...newOrder, exec: e.target.value })}
                  >
                    <option>Meet Patel</option>
                    <option>Sanjay M.</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2.5 border border-[#E2DED6] text-[#6B6B70] rounded-lg text-[14px] font-semibold hover:bg-[#fafafa] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-[#a855f7] text-white rounded-lg text-[14px] font-semibold hover:bg-[#9333ea] transition shadow-sm"
                >
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Print Settings Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Batch Print Settings</h2>
              <button onClick={() => setShowPrintModal(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl">×</button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-2">Select Template</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Invoice', 'Packing Slip', 'Label'].map(t => (
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
                    alert('Print job sent to queue!');
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

export default Orders;
