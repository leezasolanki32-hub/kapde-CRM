import React, { useState } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Video, Calendar, Search, Pencil } from "lucide-react";

/* ───────────── Video Demo Modal ───────────── */
const VideoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.6)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 animate-[zoomIn_0.3s_ease-out] overflow-hidden">
        <div className="p-4 border-b border-[#E2DED6] flex justify-between items-center bg-[#FAF8F4]">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl"><Video size={16} className="inline-block" /></span>
            <h2 className="text-[16px] font-bold text-[#1C1C1E]">KapdeCRM Demo: Connections Management</h2>
          </div>
          <button onClick={onClose} className="text-[#6B6B70] hover:text-[#1C1C1E] text-[24px]">×</button>
        </div>
        <div className="aspect-video bg-black relative flex items-center justify-center">
          <video className="w-full h-full object-contain" controls autoPlay src="/demo_video.mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-6 bg-white flex justify-between items-center">
          <button onClick={onClose} className="bg-[#a855f7] text-white px-6 py-2 rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-md ml-auto">Done Watching</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Add Connection Modal ───────────── */
const AddConnectionModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ company: '', contact: '', relation: 'Customers', phone: '', email: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const inputCls = "w-full border border-[#E2DED6] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E2DED6]">
          <h2 className="text-[18px] font-bold text-[#1C1C1E]">Add Connection</h2>
          <button onClick={onClose} className="text-[20px] text-[#6B6B70]">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div><label className="block text-[12px] font-bold mb-1">Company</label><input name="company" onChange={handle} className={inputCls} placeholder="Company Name" /></div>
          <div><label className="block text-[12px] font-bold mb-1">Contact Person</label><input name="contact" onChange={handle} className={inputCls} placeholder="John Doe" /></div>
          <div>
            <label className="block text-[12px] font-bold mb-1">Relation</label>
            <select name="relation" onChange={handle} className={inputCls}>
              <option>Customers</option><option>Suppliers</option><option>Neighbours</option><option>Friends</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 bg-[#FAFAFA] border-t border-[#E2DED6] rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2 border rounded-md text-[13px]">Cancel</button>
          <button onClick={() => { onAdd(form); onClose(); }} className="px-4 py-2 bg-[#a855f7] text-white rounded-md text-[13px] font-bold">Save</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Appointments Modal ───────────── */
const AppointmentsModal = ({ onClose }) => {
  const [isScheduling, setIsScheduling] = useState(false);
  const [form, setForm] = useState({ contact: '', date: '', time: '', topic: '', location: 'Online Meeting' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const inputCls = "w-full border border-[#E2DED6] rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-[#a855f7]";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 animate-[slideUpFade_0.3s_ease-out]">
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E2DED6]">
          <h2 className="text-[18px] font-bold text-[#1C1C1E]">{isScheduling ? 'Schedule New Appointment' : 'Appointments Planner'}</h2>
          <button onClick={onClose} className="text-[20px] text-[#6B6B70]">×</button>
        </div>
        
        {isScheduling ? (
          <div className="p-6">
            <div className="space-y-4">
              <div><label className="block text-[12px] font-bold mb-1">Select Connection</label>
                <select name="contact" onChange={handle} className={inputCls}>
                  <option value="">Select someone...</option>
                  <option>Rajesh Kumar (Alpha Traders)</option>
                  <option>Anita Desai (Global Fabrics)</option>
                  <option>Kapde Helpline</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[12px] font-bold mb-1">Date</label><input type="date" name="date" onChange={handle} className={inputCls} /></div>
                <div><label className="block text-[12px] font-bold mb-1">Time</label><input type="time" name="time" onChange={handle} className={inputCls} /></div>
              </div>
              <div><label className="block text-[12px] font-bold mb-1">Topic / Agenda</label><input name="topic" onChange={handle} className={inputCls} placeholder="e.g., Discuss new fabric samples" /></div>
              <div>
                <label className="block text-[12px] font-bold mb-1">Location</label>
                <select name="location" onChange={handle} className={inputCls}>
                  <option>Online Meeting</option>
                  <option>Phone Call</option>
                  <option>In-Person (Our Office)</option>
                  <option>In-Person (Client Site)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-[#E2DED6]">
              <button onClick={() => setIsScheduling(false)} className="px-4 py-2 border rounded-md text-[13px] hover:bg-slate-50 transition">Cancel</button>
              <button onClick={() => { alert('Appointment Scheduled!'); setIsScheduling(false); }} className="px-5 py-2 bg-[#a855f7] text-white rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm">Schedule Meeting</button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <div className="text-[40px] mb-4"><Calendar size={16} className="inline-block" /></div>
            <h3 className="text-[16px] font-bold text-[#1C1C1E] mb-2">No Upcoming Appointments</h3>
            <p className="text-[13px] text-[#6B6B70] mb-6">Schedule meetings with your connections to keep track of interactions.</p>
            <button onClick={() => setIsScheduling(true)} className="bg-[#a855f7] text-white px-5 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm">+ Schedule New</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Connections = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showApptsModal, setShowApptsModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  
  const [connections, setConnections] = useState([
    { id: 1, company: 'Alpha Traders', contact: 'Rajesh Kumar', relation: 'Customers', lastTalk: '2 days ago', nextAction: 'Call on Friday' },
    { id: 2, company: 'Global Fabrics', contact: 'Anita Desai', relation: 'Suppliers', lastTalk: 'Yesterday', nextAction: 'Send PO' },
    { id: 3, company: '-', contact: 'Kapde Helpline', relation: 'Friends', lastTalk: '-', nextAction: '-' },
  ]);

  const addConnection = (conn) => {
    setConnections([{ ...conn, id: Date.now(), lastTalk: 'Just now', nextAction: 'Follow up' }, ...connections]);
  };

  const filteredConnections = connections.filter(c => {
    const matchTab = activeTab === 'All' || c.relation === activeTab;
    const matchSearch = c.company.toLowerCase().includes(search.toLowerCase()) || c.contact.toLowerCase().includes(search.toLowerCase());
    return matchTab && matchSearch;
  });

  const getRelationColor = (relation) => {
    switch(relation) {
      case 'Customers': return 'bg-[#8b5cf6]'; // Violet
      case 'Suppliers': return 'bg-[#10b981]'; // Emerald
      case 'Neighbours': return 'bg-[#0ea5e9]'; // Sky Blue
      default: return 'bg-[#f43f5e]'; // Rose for Friends
    }
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showAddModal && <AddConnectionModal onClose={() => setShowAddModal(false)} onAdd={addConnection} />}
      {showApptsModal && <AppointmentsModal onClose={() => setShowApptsModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Connections</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-[#E2DED6] rounded-md px-3 py-1.5 pl-8 text-[13px] outline-none focus:border-[#a855f7] bg-white shadow-sm" 
            />
            <span className="absolute left-2.5 top-2 text-[#6B6B70] text-[12px]"><Search size={16} className="inline-block" /></span>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#a855f7] text-white px-5 py-2 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#9333ea]">+ Enter Connection</button>
          <button onClick={() => setShowApptsModal(true)} className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#333] transition">Appointments</button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Customers', 'Suppliers', 'Neighbours', 'Friends'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded text-[13px] font-medium transition-all ${
              activeTab === tab 
                ? 'bg-[#a855f7] text-white shadow-md' 
                : 'bg-white border border-[#E2DED6] text-[#6B6B70] hover:border-[#a855f7] hover:text-[#a855f7]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <select className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#a855f7] w-[200px]">
          <option>All Executives</option>
        </select>
        <select className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] focus:outline-none focus:border-[#a855f7] w-[180px]">
          <option>All States</option>
        </select>
      </div>

      <div className="bg-white border border-[#E2DED6] rounded-xl overflow-x-auto mb-8 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-[#FAF8F4] border-b border-[#E2DED6]">
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E] uppercase">Company</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E] uppercase">Contact</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E] uppercase">Relation</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E] uppercase">Last Talk</th>
              <th className="py-3 px-6 text-[12px] font-bold text-[#1C1C1E] uppercase">Next Action</th>
              <th className="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredConnections.map((conn) => (
              <tr key={conn.id} className="border-b border-[#f0f0f0] hover:bg-[#faf4ff]">
                <td className="py-4 px-6 text-[13px] font-medium text-[#1C1C1E]">{conn.company || '-'}</td>
                <td className="py-4 px-6 text-[13px] font-medium text-[#1C1C1E]">{conn.contact}</td>
                <td className="py-4 px-6 text-[13px]">
                  <span className={`w-3 h-3 ${getRelationColor(conn.relation)} rounded-sm inline-block mr-2`}></span>
                  <span className="text-[#6B6B70]">{conn.relation}</span>
                </td>
                <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{conn.lastTalk}</td>
                <td className="py-4 px-6 text-[13px] text-[#6B6B70]">{conn.nextAction}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => alert(`Opening WhatsApp for ${conn.contact}`)} className="bg-[#f3e8ff] px-3 py-1.5 rounded text-[#25d366] font-bold text-[11px] hover:bg-[#25d366] hover:text-white transition">WhatsApp</button>
                    <button onClick={() => alert(`Drafting Email to ${conn.contact}`)} className="bg-[#f3e8ff] px-3 py-1.5 rounded text-[#f59e0b] font-bold text-[11px] hover:bg-[#f59e0b] hover:text-white transition">Email</button>
                    <button className="bg-[#f3e8ff] p-1.5 rounded text-[#a855f7] border border-[#e9d5ff] hover:bg-[#a855f7] hover:text-white transition"><Pencil size={16} className="inline-block" />️</button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredConnections.length === 0 && (
              <tr>
                <td colSpan="6" className="py-8 text-center text-[#6B6B70] text-[13px]">No connections found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setShowVideoModal(true)}
          className="bg-white border border-[#E2DED6] px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#f3e8ff] hover:text-[#a855f7] hover:border-[#a855f7] transition-all shadow-sm text-[#6B6B70] flex items-center gap-2 group"
        >
          <span className="group-hover:scale-125 transition-transform"><Video size={16} className="inline-block" /></span> Training Materials
        </button>
      </div>
    </div>
  );
};

export default Connections;
