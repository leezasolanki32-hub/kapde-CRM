import React, { useState, useEffect } from 'react';
import { FileText, Video, Check, Handshake } from "lucide-react";
import { TrainingResources } from '../DashboardComponents';

/* ───────────── Add Supplier Modal ───────────── */
const AddSupplierModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    category: 'Raw Materials',
    address: ''
  });

  const [loading, setLoading] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submitSupplier = async () => {
    if (!form.name) return;
    setLoading(true);
    
    // Map the local form to the Connection model fields
    const newConnection = {
      business: form.name,
      firstName: form.contactPerson || 'Unknown',
      lastName: ' ',
      email: form.email,
      mobile: form.phone,
      categories: { Supplier: true },
      notes: `${form.category}\n${form.address}`
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/connections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConnection)
      });
      if (response.ok) {
        const data = await response.json();
        onAdd(data);
        onClose();
      } else {
        alert('Failed to save supplier');
      }
    } catch (error) {
      alert('Error saving supplier');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full border border-[#1e3a5f] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] focus:ring-1 focus:ring-[#3b82f6] transition bg-[#0a1628]";
  const labelCls = "block text-[12px] font-semibold text-[#4B4B4F] mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] flex flex-col animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e3a5f]">
          <div>
            <h2 className="text-[18px] font-bold text-[#e8f0fe]">Add New Supplier</h2>
            <p className="text-[12px] text-[#93c5fd] mt-0.5">Register a new vendor in your system</p>
          </div>
          <button onClick={onClose} className="text-[#93c5fd] hover:text-[#e8f0fe] text-[22px] leading-none transition">×</button>
        </div>

        <div className="overflow-y-auto px-6 py-5 flex-1">
          <div className="mb-4">
            <label className={labelCls}>Supplier Name <span className="text-red-500">*</span></label>
            <input name="name" value={form.name} onChange={handle} className={inputCls} placeholder="e.g. Global Textiles Ltd" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Contact Person</label>
              <input name="contactPerson" value={form.contactPerson} onChange={handle} className={inputCls} placeholder="e.g. Mike Johnson" />
            </div>
            <div>
              <label className={labelCls}>Category</label>
              <select name="category" value={form.category} onChange={handle} className={inputCls}>
                <option>Raw Materials</option>
                <option>Packaging</option>
                <option>Accessories</option>
                <option>Machinery</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" name="email" value={form.email} onChange={handle} className={inputCls} placeholder="mike@global.com" />
            </div>
            <div>
              <label className={labelCls}>Phone</label>
              <input name="phone" value={form.phone} onChange={handle} className={inputCls} placeholder="+91 98765 43210" />
            </div>
          </div>
          <div>
            <label className={labelCls}>Address</label>
            <textarea name="address" value={form.address} onChange={handle} rows={2} className={inputCls + " resize-none"} placeholder="Full office/warehouse address..." />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#1e3a5f] bg-[#0a1628] rounded-b-2xl">
          <button onClick={onClose} className="px-5 py-2 rounded-md border border-[#1e3a5f] text-[13px] text-[#4B4B4F] hover:bg-[#F3F0EC] transition font-medium">Cancel</button>
          <button 
            disabled={loading}
            onClick={submitSupplier} 
            className="px-6 py-2 rounded-md bg-[#3b82f6] text-[#e8f0fe] text-[13px] font-bold hover:bg-[#2563eb] transition shadow-sm disabled:opacity-70"
          >
            {loading ? 'Saving...' : 'Save Supplier'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Import Suppliers Modal ───────────── */
const ImportModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-[slideUpFade_0.3s_ease-out]">
        <div className="p-6 border-b border-[#1e3a5f] flex justify-between items-center">
          <h2 className="text-[18px] font-bold text-[#e8f0fe]">Import Suppliers</h2>
          <button onClick={onClose} className="text-[#93c5fd] text-[22px]">×</button>
        </div>
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-[#0a1628] rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-[30px]"><FileText size={16} className="inline-block" /></span>
          </div>
          <p className="text-[14px] text-[#4B4B4F] mb-6">Upload your Excel or CSV file to import bulk supplier data.</p>
          <div className="border-2 border-dashed border-[#1e3a5f] rounded-xl p-10 hover:border-[#3b82f6] hover:bg-[#fcfaff] transition cursor-pointer group">
            <div className="text-[13px] font-bold text-[#3b82f6] mb-1 group-hover:scale-105 transition-transform">Click to select file</div>
            <div className="text-[11px] text-[#334155]">Maximum file size: 10MB</div>
          </div>
        </div>
        <div className="px-6 py-4 border-t border-[#1e3a5f] bg-[#0a1628] rounded-b-2xl flex justify-between items-center">
          <button className="text-[13px] font-bold text-[#3b82f6] hover:underline">Download Template</button>
          <div className="flex gap-3">
            <button onClick={onClose} className="px-4 py-2 border border-[#1e3a5f] rounded-md text-[13px] font-medium">Cancel</button>
            <button className="px-5 py-2 bg-[#3b82f6] text-[#e8f0fe] rounded-md text-[13px] font-bold opacity-50 cursor-not-allowed">Import Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Supplier Details Modal ───────────── */
const SupplierDetailsModal = ({ supplier, onClose }) => {
  if (!supplier) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-2xl mx-4 animate-[slideUpFade_0.3s_ease-out] overflow-hidden">
        <div className="bg-[#3b82f6] p-8 text-[#e8f0fe] relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-[#e8f0fe]/80 hover:text-[#e8f0fe] text-[24px]">×</button>
          <div className="text-[11px] font-bold uppercase tracking-widest opacity-80 mb-1">Supplier Profile</div>
          <h2 className="text-[28px] font-bold leading-tight">{supplier.name}</h2>
          <div className="flex gap-4 mt-4">
            <div className="bg-[#0a1628]/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm uppercase">{supplier.category}</div>
            <div className="bg-[#0a1628]/20 px-3 py-1 rounded-full text-[11px] font-bold backdrop-blur-sm uppercase tracking-wide">ID: SUP-{supplier.id.toString().slice(-4)}</div>
          </div>
        </div>
        <div className="p-8 grid grid-cols-2 gap-8">
          <div>
            <h4 className="text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider mb-3">Contact Details</h4>
            <div className="space-y-4">
              <div>
                <div className="text-[10px] text-[#9CA3AF] uppercase font-bold mb-0.5">Contact Person</div>
                <div className="text-[14px] font-bold text-[#e8f0fe]">{supplier.contact}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#9CA3AF] uppercase font-bold mb-0.5">Email Address</div>
                <div className="text-[14px] font-bold text-[#e8f0fe] underline decoration-[#3b82f6]/30">{supplier.email}</div>
              </div>
              <div>
                <div className="text-[10px] text-[#9CA3AF] uppercase font-bold mb-0.5">Phone Number</div>
                <div className="text-[14px] font-bold text-[#e8f0fe]">{supplier.phone}</div>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider mb-3">Statistics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#FDFCFB] border border-[#1e3a5f] p-3 rounded-xl">
                <div className="text-[10px] text-[#93c5fd] uppercase font-bold">Orders</div>
                <div className="text-[18px] font-bold text-[#3b82f6]">12</div>
              </div>
              <div className="bg-[#FDFCFB] border border-[#1e3a5f] p-3 rounded-xl">
                <div className="text-[10px] text-[#93c5fd] uppercase font-bold">Spend</div>
                <div className="text-[18px] font-bold text-[#e8f0fe]">₹45k</div>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider mb-2">Internal Note</h4>
              <p className="text-[13px] text-[#93c5fd] italic leading-relaxed">"Reliable vendor for high-quality denim and cotton blends. Always delivers on time."</p>
            </div>
          </div>
        </div>
        <div className="px-8 py-5 bg-[#0a1628] border-t border-[#1e3a5f] flex justify-end gap-3">
          <button className="px-6 py-2 border border-[#1e3a5f] rounded-md text-[13px] font-bold text-[#93c5fd] hover:bg-[#132847] transition">Edit Profile</button>
          <button className="px-6 py-2 bg-[#e8f0fe] text-[#0a1628] rounded-md text-[13px] font-bold hover:bg-[#333] transition">Create Purchase Order</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Video Demo Modal ───────────── */
const VideoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-[#0a1628] rounded-2xl shadow-2xl w-full max-w-4xl mx-4 animate-[zoomIn_0.3s_ease-out] overflow-hidden">
        <div className="p-4 border-b border-[#1e3a5f] flex justify-between items-center bg-[#080d1a]">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl"><Video size={16} className="inline-block" /></span>
            <h2 className="text-[16px] font-bold text-[#e8f0fe]">KapdeCRM Demo: Supplier Management</h2>
          </div>
          <button onClick={onClose} className="text-[#93c5fd] hover:text-[#e8f0fe] text-[24px]">×</button>
        </div>
        <div className="aspect-video bg-black relative flex items-center justify-center">
          <video 
            className="w-full h-full object-contain"
            controls
            autoPlay
            src="/demo_video.mp4"
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-6 bg-[#0a1628] flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0a1628] flex items-center justify-center text-[#3b82f6] font-bold">K</div>
            <div>
              <div className="text-[14px] font-bold text-[#e8f0fe]">Kapde Support Team</div>
              <div className="text-[12px] text-[#93c5fd]">Published on May 4, 2026 • 2:45 min</div>
            </div>
          </div>
          <button onClick={onClose} className="bg-[#3b82f6] text-[#e8f0fe] px-6 py-2 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">Done Watching</button>
        </div>
      </div>
    </div>
  );
};


// (Keep Modals untouched down to Suppliers component)

const Suppliers = () => {
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({ category: 'All Categories' });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/connections?category=Supplier`);
      const data = await response.json();
      
      // Map backend connection format to supplier format expected by the UI
      const mappedSuppliers = data.map(conn => ({
        id: conn._id,
        name: conn.business || `${conn.firstName} ${conn.lastName}`,
        contact: `${conn.firstName} ${conn.lastName}`,
        category: (conn.notes && conn.notes.split('\n')[0]) || 'Raw Materials',
        email: conn.email || '-',
        phone: conn.mobile ? `${conn.countryCode || ''} ${conn.mobile}` : '-',
        address: (conn.notes && conn.notes.split('\n')[1]) || '-'
      }));
      
      setSuppliers(mappedSuppliers);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSupplier = (supplier) => {
    // Re-fetch suppliers to get the latest from DB
    fetchSuppliers();
  };

  const filteredSuppliers = suppliers.filter(s => 
    filters.category === 'All Categories' || s.category === filters.category
  );

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showSupplierModal && <AddSupplierModal onClose={() => setShowSupplierModal(false)} onAdd={addSupplier} />}
      {showImportModal && <ImportModal onClose={() => setShowImportModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}
      {selectedSupplier && <SupplierDetailsModal supplier={selectedSupplier} onClose={() => setSelectedSupplier(null)} />}


      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#e8f0fe]">Suppliers</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setShowSupplierModal(true)} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-sm">+ Enter Supplier</button>
          <button onClick={() => setShowImportModal(true)} className="bg-[#0a1628] border border-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#f9f9f9] transition shadow-sm"><Check size={16} className="inline-block" /> Import Suppliers</button>
        </div>
      </div>

      <div className="flex gap-4 mb-6">
        <select className="bg-[#0a1628] border border-[#1e3a5f] px-4 py-2 rounded-md text-[12px] focus:outline-none focus:border-[#3b82f6] w-[200px] shadow-sm font-medium">
          <option>All Managers</option>
          <option>Sanjay Malhotra</option>
          <option>Jane Smith</option>
        </select>
        <select 
          className="bg-[#0a1628] border border-[#1e3a5f] px-4 py-2 rounded-md text-[12px] focus:outline-none focus:border-[#3b82f6] w-[180px] shadow-sm font-medium"
          value={filters.category}
          onChange={(e) => setFilters({...filters, category: e.target.value})}
        >
          <option>All Categories</option>
          <option>Raw Materials</option>
          <option>Packaging</option>
          <option>Accessories</option>
          <option>Machinery</option>
        </select>
      </div>

      {loading ? (
        <div className="py-12 text-center text-[#93c5fd] text-[14px]">Loading suppliers...</div>
      ) : filteredSuppliers.length > 0 ? (
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-[13px]">
            <thead className="bg-[#0a1628] border-b border-[#1e3a5f] text-[#93c5fd] font-bold uppercase text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Supplier Name</th>
                <th className="px-6 py-4">Contact Person</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e3a5f]">
              {filteredSuppliers.map(s => (
                <tr key={s.id} className="hover:bg-[#faf5ff] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#e8f0fe]">{s.name}</div>
                    <div className="text-[11px] text-[#3b82f6] font-bold">SUP-{s.id.toString().slice(-4)}</div>
                  </td>
                  <td className="px-6 py-4 text-[#e8f0fe] font-medium">{s.contact}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded bg-[#0a1628] text-[#3b82f6] text-[11px] font-bold uppercase">{s.category}</span>
                  </td>
                  <td className="px-6 py-4 text-[#93c5fd]">
                    <div className="font-medium">{s.email}</div>
                    <div className="text-[11px]">{s.phone}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedSupplier(s)}
                      className="text-[#3b82f6] hover:bg-[#3b82f6] hover:text-[#e8f0fe] px-3 py-1.5 rounded-md font-bold text-[12px] transition-all border border-transparent hover:shadow-sm"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (

        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-12 text-center shadow-sm">
          <div className="w-20 h-20 bg-[#0a1628] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-[40px]"><Handshake size={16} className="inline-block" /></span>
          </div>
          <h3 className="text-[20px] font-bold text-[#e8f0fe] mb-2">No Suppliers Found</h3>
          <p className="text-[15px] text-[#93c5fd] max-w-md mx-auto mb-8">
            Start building your supply chain by adding your first supplier or importing them from a list.
          </p>
          <button onClick={() => setShowSupplierModal(true)} className="bg-[#3b82f6] text-[#e8f0fe] px-8 py-3 rounded-md text-[15px] font-bold shadow-md hover:bg-[#2563eb] transition-all">
            + Enter Your First Supplier
          </button>
        </div>
      )}

      <div className="mt-12 flex gap-4">
        <button 
          onClick={() => setShowVideoModal(true)}
          className="bg-[#0a1628] border border-[#1e3a5f] px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#132847] hover:text-[#3b82f6] hover:border-[#3b82f6] transition-all shadow-sm text-[#93c5fd] flex items-center gap-2 group"
        >
          <span className="group-hover:scale-125 transition-transform"><Video size={16} className="inline-block" /></span> Training Materials
        </button>
      </div>
    </div>
  );
};


export default Suppliers;
