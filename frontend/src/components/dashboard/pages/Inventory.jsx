import React, { useState, useRef } from 'react';
import { Download, FileText, Folder, AlertTriangle, Check, Search, Settings } from "lucide-react";
import { TrainingResources } from '../DashboardComponents';

/* ───────────── Add Item Modal ───────────── */
const AddItemModal = ({ onClose }) => {
  const [form, setForm] = useState({
    itemName: '', itemCode: '', itemType: 'Products',
    category: '', subCategory: '', unit: '',
    hsnCode: '', openingStock: '', reorderLevel: '',
    costPrice: '', sellingPrice: '', store: '',
    description: '', tags: '',
  });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const inputCls = "w-full border border-[#1e3a5f] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition bg-[#0a1628]";
  const labelCls = "block text-[12px] font-semibold text-[#4B4B4F] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
          <div>
            <h2 className="text-[18px] font-bold text-[#e8f0fe]">Add New Item</h2>
            <p className="text-[12px] text-[#93c5fd] mt-0.5">Fill in the details to add a stock item</p>
          </div>
          <button onClick={onClose} className="text-[#93c5fd] hover:text-[#e8f0fe] text-[22px] leading-none transition">×</button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">
          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Basic Information</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Item Name <span className="text-red-500">*</span></label>
              <input name="itemName" value={form.itemName} onChange={handle} className={inputCls} placeholder="e.g. Cotton Fabric Roll" />
            </div>
            <div>
              <label className={labelCls}>Item Code / SKU</label>
              <input name="itemCode" value={form.itemCode} onChange={handle} className={inputCls} placeholder="e.g. SKU-0001" />
            </div>
            <div>
              <label className={labelCls}>Item Type <span className="text-red-500">*</span></label>
              <select name="itemType" value={form.itemType} onChange={handle} className={inputCls}>
                <option>Products</option>
                <option>Materials</option>
                <option>Spares</option>
                <option>Assemblies</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Unit of Measurement <span className="text-red-500">*</span></label>
              <select name="unit" value={form.unit} onChange={handle} className={inputCls}>
                <option value="">Select Unit</option>
                <option>Pcs</option>
                <option>Kg</option>
                <option>Meters</option>
                <option>Liters</option>
                <option>Box</option>
                <option>Set</option>
              </select>
            </div>
          </div>

          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Category</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Category</label>
              <select name="category" value={form.category} onChange={handle} className={inputCls}>
                <option value="">Select Category</option>
                <option>Raw Materials</option>
                <option>Finished Goods</option>
                <option>Packaging</option>
                <option>Tools & Equipment</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Sub-Category</label>
              <input name="subCategory" value={form.subCategory} onChange={handle} className={inputCls} placeholder="e.g. Woven Fabric" />
            </div>
            <div>
              <label className={labelCls}>HSN / SAC Code</label>
              <input name="hsnCode" value={form.hsnCode} onChange={handle} className={inputCls} placeholder="e.g. 5208" />
            </div>
            <div>
              <label className={labelCls}>Store / Location</label>
              <select name="store" value={form.store} onChange={handle} className={inputCls}>
                <option value="">Select Store</option>
                <option>Main Warehouse</option>
                <option>Store A</option>
                <option>Store B</option>
              </select>
            </div>
          </div>

          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Stock Details</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Opening Stock Quantity</label>
              <input type="number" name="openingStock" value={form.openingStock} onChange={handle} className={inputCls} placeholder="0" />
            </div>
            <div>
              <label className={labelCls}>Reorder Level</label>
              <input type="number" name="reorderLevel" value={form.reorderLevel} onChange={handle} className={inputCls} placeholder="0" />
            </div>
          </div>

          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Pricing</p>
          <div className="grid grid-cols-2 gap-4 mb-5">
            <div>
              <label className={labelCls}>Cost Price (₹)</label>
              <input type="number" name="costPrice" value={form.costPrice} onChange={handle} className={inputCls} placeholder="0.00" />
            </div>
            <div>
              <label className={labelCls}>Selling Price (₹)</label>
              <input type="number" name="sellingPrice" value={form.sellingPrice} onChange={handle} className={inputCls} placeholder="0.00" />
            </div>
          </div>

          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Additional Details</p>
          <div className="mb-4">
            <label className={labelCls}>Tags</label>
            <input name="tags" value={form.tags} onChange={handle} className={inputCls} placeholder="e.g. cotton, fabric, export (comma separated)" />
          </div>
          <div className="mb-2">
            <label className={labelCls}>Description</label>
            <textarea name="description" value={form.description} onChange={handle} rows={3} className={inputCls + " resize-none"} placeholder="Brief description of the item..." />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1e3a5f] bg-[#0a1628] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-md border border-[#1e3a5f] text-[13px] text-[#4B4B4F] hover:bg-[#F3F0EC] transition font-medium">Cancel</button>
          <button className="px-6 py-2 rounded-md bg-[#3b82f6] text-[#e8f0fe] text-[13px] font-bold hover:bg-[#2563eb] transition shadow-sm">+ Save Item</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Import Items Modal ───────────── */
const ImportModal = ({ onClose }) => {
  const fileRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [form, setForm] = useState({ itemType: 'Products', store: '', overwrite: false });

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const onFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const inputCls = "w-full border border-[#1e3a5f] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition bg-[#0a1628]";
  const labelCls = "block text-[12px] font-semibold text-[#4B4B4F] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-xl mx-4 max-h-[90vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
          <div>
            <h2 className="text-[18px] font-bold text-[#e8f0fe]">Import Items from Excel</h2>
            <p className="text-[12px] text-[#93c5fd] mt-0.5">Upload your Excel file to bulk import stock items</p>
          </div>
          <button onClick={onClose} className="text-[#93c5fd] hover:text-[#e8f0fe] text-[22px] leading-none transition">×</button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">

          {/* Download Template */}
          <div className="flex items-center justify-between bg-[#f5f0ff] border border-[#93c5fd] rounded-xl px-4 py-3 mb-5">
            <div>
              <p className="text-[13px] font-semibold text-[#6d28d9]"><Download size={16} className="inline-block" /> Download Template</p>
              <p className="text-[11px] text-[#1d4ed8] mt-0.5">Use our Excel template to ensure correct format</p>
            </div>
            <button className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-1.5 rounded-md text-[12px] font-bold hover:bg-[#2563eb] transition">
              Download
            </button>
          </div>

          {/* File Drop Zone */}
          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Upload File</p>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current.click()}
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition mb-5 ${
              dragging ? 'border-[#3b82f6] bg-[#faf5ff]' : 'border-[#d1d5db] bg-[#0a1628] hover:border-[#3b82f6] hover:bg-[#faf5ff]'
            }`}
          >
            <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={onFileChange} />
            {file ? (
              <div>
                <p className="text-[22px] mb-1"><FileText size={16} className="inline-block" /></p>
                <p className="text-[13px] font-semibold text-[#e8f0fe]">{file.name}</p>
                <p className="text-[11px] text-[#93c5fd] mt-1">{(file.size / 1024).toFixed(1)} KB · Click to change file</p>
              </div>
            ) : (
              <div>
                <p className="text-[32px] mb-2"><Folder size={16} className="inline-block" /></p>
                <p className="text-[13px] font-semibold text-[#e8f0fe]">Drag & drop your file here</p>
                <p className="text-[11px] text-[#93c5fd] mt-1">or <span className="text-[#3b82f6] font-semibold">browse</span> to upload</p>
                <p className="text-[10px] text-[#9CA3AF] mt-2">Supports: .xlsx, .xls, .csv</p>
              </div>
            )}
          </div>

          {/* Import Options */}
          <p className="text-[11px] font-bold text-[#3b82f6] uppercase tracking-wider mb-3">Import Options</p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Item Type</label>
              <select name="itemType" value={form.itemType} onChange={handle} className={inputCls}>
                <option>Products</option>
                <option>Materials</option>
                <option>Spares</option>
                <option>Assemblies</option>
              </select>
            </div>
            <div>
              <label className={labelCls}>Default Store</label>
              <select name="store" value={form.store} onChange={handle} className={inputCls}>
                <option value="">Select Store</option>
                <option>Main Warehouse</option>
                <option>Store A</option>
                <option>Store B</option>
              </select>
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input type="checkbox" name="overwrite" checked={form.overwrite} onChange={handle}
              className="accent-[#3b82f6] w-4 h-4 rounded" />
            <span className="text-[12px] text-[#4B4B4F] font-medium">Overwrite existing items with same SKU</span>
          </label>

          {/* Info Note */}
          <div className="mt-5 bg-[#fffbeb] border border-[#fcd34d] rounded-lg px-4 py-3">
            <p className="text-[11px] text-[#92400e] font-semibold"><AlertTriangle size={16} className="inline-block" />️ Note</p>
            <p className="text-[11px] text-[#92400e] mt-1">Make sure the file follows the downloaded template format. Invalid rows will be skipped during import.</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1e3a5f] bg-[#0a1628] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-md border border-[#1e3a5f] text-[13px] text-[#4B4B4F] hover:bg-[#F3F0EC] transition font-medium">Cancel</button>
          <button
            disabled={!file}
            className={`px-6 py-2 rounded-md text-[13px] font-bold transition shadow-sm ${
              file ? 'bg-[#e8f0fe] text-[#0a1628] hover:bg-[#333]' : 'bg-[#1e3a5f] text-[#9CA3AF] cursor-not-allowed'
            }`}
          >
            <Check size={16} className="inline-block" /> Start Import
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Inventory Settings Modal ───────────── */
const InventorySettingsModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('Units');
  const [items, setItems] = useState({
    Units: ['Pcs', 'Kg', 'Meters', 'Liters', 'Box', 'Set'],
    Stores: ['Main Warehouse', 'Store A', 'Store B'],
    Categories: ['Raw Materials', 'Finished Goods', 'Packaging', 'Tools & Equipment'],
    HSN: ['5208', '6204', '6302']
  });
  const [newItem, setNewItem] = useState('');

  const addItem = () => {
    if (!newItem.trim()) return;
    setItems({ ...items, [activeTab]: [...items[activeTab], newItem.trim()] });
    setNewItem('');
  };

  const removeItem = (idx) => {
    const updated = items[activeTab].filter((_, i) => i !== idx);
    setItems({ ...items, [activeTab]: updated });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-xl mx-4 max-h-[85vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
          <div>
            <h2 className="text-[18px] font-bold text-[#e8f0fe]">Inventory Settings</h2>
            <p className="text-[12px] text-[#93c5fd] mt-0.5">Configure master data for your inventory</p>
          </div>
          <button onClick={onClose} className="text-[#93c5fd] hover:text-[#e8f0fe] text-[22px] leading-none transition">×</button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 border-r border-[#1e3a5f] bg-[#0a1628] p-4 flex flex-col gap-1">
            {Object.keys(items).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`text-left px-4 py-2 rounded-lg text-[13px] font-semibold transition ${
                  activeTab === tab ? 'bg-[#3b82f6] text-[#e8f0fe] shadow-md' : 'text-[#93c5fd] hover:bg-[#F3F0EC]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col p-6">
            <h3 className="text-[14px] font-bold text-[#e8f0fe] mb-4">Manage {activeTab}</h3>
            
            <div className="flex gap-2 mb-6">
              <input 
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                placeholder={`Add new ${activeTab.slice(0, -1).toLowerCase()}...`}
                className="flex-1 border border-[#1e3a5f] rounded-md px-3 py-1.5 text-[13px] focus:outline-none focus:border-[#3b82f6]"
              />
              <button onClick={addItem} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-1.5 rounded-md text-[12px] font-bold hover:bg-[#2563eb] transition">Add</button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="space-y-2">
                {items[activeTab].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-[#0a1628] border border-[#1e3a5f] rounded-lg px-4 py-2 text-[13px] hover:border-[#3b82f6] transition group">
                    <span className="text-[#e8f0fe] font-medium">{item}</span>
                    <button onClick={() => removeItem(idx)} className="text-[#9CA3AF] hover:text-red-500 transition opacity-0 group-hover:opacity-100 text-lg">×</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-[#1e3a5f] bg-[#0a1628] flex justify-end rounded-b-2xl">
          <button onClick={onClose} className="bg-[#e8f0fe] text-[#0a1628] px-6 py-2 rounded-md text-[13px] font-bold hover:bg-[#333] transition shadow-sm">Done</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Main Page ───────────── */

const Inventory = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Filter States
  const [activeTab, setActiveTab] = useState('All');
  const [filters, setFilters] = useState({
    category: 'All Categories',
    subCategory: 'All Sub-Categories',
    stockStatus: 'All Stock Items',
    importance: 'All Importance Levels',
    itemScope: 'All Items',
    tagSearch: ''
  });

  // Sample Data
  const [inventoryItems, setInventoryItems] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchTab = activeTab === 'All' || item.type === activeTab;
    const matchCat = filters.category === 'All Categories' || item.category === filters.category;
    const matchTag = !filters.tagSearch || item.tags.toLowerCase().includes(filters.tagSearch.toLowerCase());
    // For simplicity, we only implement a few filter logics, others are UI-only for now
    return matchTab && matchCat && matchTag;
  });

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showAddModal && <AddItemModal onClose={() => setShowAddModal(false)} />}
      {showImportModal && <ImportModal onClose={() => setShowImportModal(false)} />}
      {showSettingsModal && <InventorySettingsModal onClose={() => setShowSettingsModal(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#e8f0fe]">Inventory</h1>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search Items..." 
              className="border border-[#1e3a5f] rounded-md px-3 py-1.5 pl-8 text-[13px] focus:border-[#3b82f6] outline-none shadow-sm w-[200px]" 
            />
            <span className="absolute left-2.5 top-2 text-[#93c5fd] text-[12px]"><Search size={16} className="inline-block" /></span>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-md text-[12px] font-bold hover:bg-[#2563eb] transition">+ Add Item</button>
          <button onClick={() => setShowImportModal(true)} className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[12px] font-bold hover:bg-[#333] transition"><Check size={16} className="inline-block" /> Import Items</button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-3 mb-6 flex-nowrap overflow-x-auto no-scrollbar pb-2">
        {['All', 'Products', 'Materials', 'Spares', 'Assemblies'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded text-[13px] font-medium transition-all ${
              activeTab === tab 
                ? 'bg-[#3b82f6] text-[#e8f0fe] shadow-md' 
                : 'bg-[#0a1628] border border-[#1e3a5f] text-[#93c5fd] hover:border-[#3b82f6] hover:text-[#3b82f6]'
            }`}
          >
            {tab !== 'All' && <span className="mr-2">■</span>}
            {tab}
          </button>
        ))}
        <div className="ml-auto bg-[#0a1628] border border-[#93c5fd] text-[#3b82f6] text-[11px] font-bold px-3 py-1.5 rounded shadow-sm">Valuation : Standard Cost</div>
      </div>

      {/* Filter Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <select name="category" value={filters.category} onChange={handleFilterChange} className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#3b82f6] shadow-sm">
          <option>All Categories</option>
          <option>Raw Materials</option>
          <option>Finished Goods</option>
          <option>Packaging</option>
          <option>Tools & Equipment</option>
        </select>
        <select name="subCategory" value={filters.subCategory} onChange={handleFilterChange} className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#3b82f6] shadow-sm">
          <option>All Sub-Categories</option>
          <option>Woven</option>
          <option>Menswear</option>
          <option>Accessories</option>
          <option>Hardware</option>
        </select>
        <select name="stockStatus" value={filters.stockStatus} onChange={handleFilterChange} className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#3b82f6] shadow-sm">
          <option>All Stock Items</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Out of Stock</option>
        </select>
        <select name="importance" value={filters.importance} onChange={handleFilterChange} className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#3b82f6] shadow-sm">
          <option>All Importance Levels</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </div>

      {/* Filter Row 2 */}
      <div className="flex gap-4 mb-8">
        <select name="itemScope" value={filters.itemScope} onChange={handleFilterChange} className="bg-[#0a1628] border border-[#1e3a5f] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#3b82f6] w-1/4 shadow-sm">
          <option>All Items</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <div className="relative w-3/4">
          <input 
            type="text" 
            name="tagSearch"
            value={filters.tagSearch}
            onChange={handleFilterChange}
            placeholder="Search by Tag (e.g. cotton, jeans)" 
            className="w-full border border-[#1e3a5f] rounded-md px-3 py-2 text-[12px] focus:outline-none focus:border-[#3b82f6] shadow-sm" 
          />
          <span className="absolute right-3 top-2.5 text-green-500 text-[12px]"><Check size={16} className="inline-block" /></span>
        </div>
      </div>

      {/* Table / Results */}
      <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-sm mb-10">
        <table className="w-full text-left text-[13px]">
          <thead className="bg-[#0a1628] border-b border-[#1e3a5f] text-[#93c5fd] font-bold uppercase text-[11px] tracking-wider">
            <tr>
              <th className="px-6 py-4">Item Name</th>
              <th className="px-6 py-4">Code</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-right">Stock</th>
              <th className="px-6 py-4 text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e3a5f]">
            {filteredItems.length > 0 ? filteredItems.map(item => (
              <tr key={item.id} className="hover:bg-[#faf5ff] transition-colors cursor-pointer group">
                <td className="px-6 py-4">
                  <div className="font-bold text-[#e8f0fe]">{item.name}</div>
                  <div className="text-[11px] text-[#93c5fd]">{item.unit}</div>
                </td>
                <td className="px-6 py-4 text-[#93c5fd] font-medium">{item.code}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-[#0a1628] text-[#3b82f6] text-[11px] font-bold">{item.type}</span>
                </td>
                <td className="px-6 py-4 text-[#93c5fd]">{item.category}</td>
                <td className="px-6 py-4 text-right font-bold text-[#e8f0fe]">{item.stock}</td>
                <td className="px-6 py-4 text-right font-bold text-[#3b82f6]">₹{item.price}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-[#93c5fd] italic">
                  No stock items found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-[14px] mb-2 uppercase">Add Item Manually</h3>
          <p className="text-[12px] text-[#93c5fd] mb-6">Add first stock item manually easily.</p>
          <button onClick={() => setShowAddModal(true)} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-md text-[11px] font-bold hover:bg-[#2563eb] transition">+ Add Item</button>
        </div>
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-[14px] mb-2 uppercase">Import Items from Excel</h3>
          <p className="text-[12px] text-[#93c5fd] mb-6">Import list of Items through Excel by downloading our template.</p>
          <button onClick={() => setShowImportModal(true)} className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[11px] font-bold hover:bg-[#333] transition"><Check size={16} className="inline-block" /> Import Items</button>
        </div>
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-[14px] mb-2 uppercase">Configure Data for Stock</h3>
          <p className="text-[12px] text-[#93c5fd] mb-6">Configure data for stock like units, Stores, HSN/SAC, Categories etc.</p>
          <button onClick={() => setShowSettingsModal(true)} className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[11px] font-bold hover:bg-[#333] transition"><Settings size={16} className="inline-block" />️ Inventory Settings</button>
        </div>
      </div>

      <TrainingResources />
    </div>
  );
};

export default Inventory;
