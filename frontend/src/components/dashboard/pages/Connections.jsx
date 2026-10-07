import React, { useState } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Video, Calendar, Search, Pencil } from "lucide-react";

/* ───────────── Video Demo Modal ───────────── */
const VideoModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl mx-4 animate-[zoomIn_0.3s_ease-out] overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-red-500 text-xl"><Video size={16} /></span>
            <h2 className="text-[16px] font-bold text-[#0f172a]">KapdeCRM Demo: Connections Management</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-[24px]">×</button>
        </div>
        <div className="aspect-video bg-black relative flex items-center justify-center">
          <video className="w-full h-full object-contain" controls autoPlay src="/demo_video.mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="p-6 bg-white flex justify-between items-center">
          <button onClick={onClose} className="bg-[#3b82f6] text-white px-6 py-2 rounded-xl text-[13px] font-bold hover:bg-[#2563eb] transition shadow-sm ml-auto">Done Watching</button>
        </div>
      </div>
    </div>
  );
};

/* ───────────── Add Connection Modal ───────────── */
const AddConnectionModal = ({ onClose, onAdd }) => {
  const [form, setForm] = useState({ company: '', contact: '', relation: 'Customers', phone: '', email: '' });
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 animate-[slideUpFade_0.3s_ease-out] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-[18px] font-bold text-[#0f172a]">Add Connection</h2>
          <button onClick={onClose} className="text-[20px] text-gray-400 hover:text-gray-700">×</button>
        </div>
        <div className="p-6 space-y-4">
          <div><label className="block text-[12px] font-bold text-gray-700 mb-1">Company</label><input name="company" onChange={handle} className={inputCls} placeholder="Company Name" /></div>
          <div><label className="block text-[12px] font-bold text-gray-700 mb-1">Contact Person</label><input name="contact" onChange={handle} className={inputCls} placeholder="John Doe" /></div>
          <div>
            <label className="block text-[12px] font-bold text-gray-700 mb-1">Relation</label>
            <select name="relation" onChange={handle} className={inputCls}>
              <option>Customers</option><option>Suppliers</option><option>Neighbours</option><option>Friends</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 bg-gray-50 border-t border-gray-100">
          <button onClick={onClose} className="px-5 py-2 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
          <button onClick={() => { onAdd(form); onClose(); }} className="px-5 py-2 bg-[#3b82f6] text-white rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#2563eb] transition">Save</button>
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
  const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-2 text-[13px] focus:outline-none focus:border-[#3b82f6] bg-white";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg mx-4 animate-[slideUpFade_0.3s_ease-out] overflow-hidden">
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-[18px] font-bold text-[#0f172a]">{isScheduling ? 'Schedule New Appointment' : 'Appointments Planner'}</h2>
          <button onClick={onClose} className="text-[20px] text-gray-400 hover:text-gray-700">×</button>
        </div>
        
        {isScheduling ? (
          <div className="p-6">
            <div className="space-y-4">
              <div><label className="block text-[12px] font-bold text-gray-700 mb-1">Select Connection</label>
                <select name="contact" onChange={handle} className={inputCls}>
                  <option value="">Select someone...</option>
                  <option>Rajesh Kumar (Alpha Traders)</option>
                  <option>Anita Desai (Global Fabrics)</option>
                  <option>Kapde Helpline</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-[12px] font-bold text-gray-700 mb-1">Date</label><input type="date" name="date" onChange={handle} className={inputCls} /></div>
                <div><label className="block text-[12px] font-bold text-gray-700 mb-1">Time</label><input type="time" name="time" onChange={handle} className={inputCls} /></div>
              </div>
              <div><label className="block text-[12px] font-bold text-gray-700 mb-1">Topic / Agenda</label><input name="topic" onChange={handle} className={inputCls} placeholder="e.g., Discuss new fabric samples" /></div>
              <div>
                <label className="block text-[12px] font-bold text-gray-700 mb-1">Location</label>
                <select name="location" onChange={handle} className={inputCls}>
                  <option>Online Meeting</option>
                  <option>Phone Call</option>
                  <option>In-Person (Our Office)</option>
                  <option>In-Person (Client Site)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-100">
              <button onClick={() => setIsScheduling(false)} className="px-5 py-2 border border-gray-200 rounded-xl text-[13px] font-semibold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
              <button onClick={() => { alert('Appointment Scheduled!'); setIsScheduling(false); }} className="px-5 py-2 bg-[#3b82f6] text-white rounded-xl text-[13px] font-bold hover:bg-[#2563eb] transition shadow-sm">Schedule Meeting</button>
            </div>
          </div>
        ) : (
          <div className="p-10 text-center">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-[#3b82f6]" />
            </div>
            <h3 className="text-[18px] font-bold text-[#0f172a] mb-2">No Upcoming Appointments</h3>
            <p className="text-[14px] text-gray-500 mb-6">Schedule meetings with your connections to keep track of interactions.</p>
            <button onClick={() => setIsScheduling(true)} className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[14px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Schedule New</button>
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
  
  const [connections, setConnections] = useState([]);

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
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      {showAddModal && <AddConnectionModal onClose={() => setShowAddModal(false)} onAdd={addConnection} />}
      {showApptsModal && <AppointmentsModal onClose={() => setShowApptsModal(false)} />}
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} />}

      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[28px] font-bold text-[#0f172a]">Connections</h1>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-200 rounded-xl px-4 py-2.5 pl-10 text-[13px] outline-none focus:border-[#3b82f6] bg-white shadow-sm transition w-full md:w-64" 
            />
            <span className="absolute left-3.5 top-3 text-gray-400 text-[12px]"><Search size={16} /></span>
          </div>
          <button onClick={() => setShowAddModal(true)} className="bg-[#3b82f6] text-white px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-sm hover:bg-[#2563eb]">+ Enter Connection</button>
          <button onClick={() => setShowApptsModal(true)} className="bg-white text-[#0f172a] border border-gray-200 px-5 py-2.5 rounded-xl text-[13px] font-bold shadow-sm hover:bg-gray-50 transition">Appointments</button>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {['All', 'Customers', 'Suppliers', 'Neighbours', 'Friends'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-xl text-[13px] font-semibold transition-all ${
              activeTab === tab 
                ? 'bg-[#0f172a] text-white shadow-md' 
                : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900 shadow-sm'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-8">
        <select className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#0f172a] focus:outline-none focus:border-[#3b82f6] shadow-sm w-[200px]">
          <option>All Executives</option>
        </select>
        <select className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-[13px] font-medium text-[#0f172a] focus:outline-none focus:border-[#3b82f6] shadow-sm w-[180px]">
          <option>All States</option>
        </select>
      </div>

      <div className="bg-white border border-gray-100 rounded-[24px] overflow-hidden mb-8 shadow-sm">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Company</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Relation</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Last Talk</th>
              <th className="py-4 px-6 text-[12px] font-bold text-gray-500 uppercase tracking-wider">Next Action</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody>
            {filteredConnections.map((conn) => (
              <tr key={conn.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                <td className="py-4 px-6 text-[13px] font-bold text-[#0f172a]">{conn.company || '-'}</td>
                <td className="py-4 px-6 text-[13px] font-medium text-gray-700">{conn.contact}</td>
                <td className="py-4 px-6 text-[13px]">
                  <span className={`w-2.5 h-2.5 ${getRelationColor(conn.relation)} rounded-full inline-block mr-2`}></span>
                  <span className="text-gray-600 font-medium">{conn.relation}</span>
                </td>
                <td className="py-4 px-6 text-[13px] text-gray-500 font-medium">{conn.lastTalk}</td>
                <td className="py-4 px-6 text-[13px] text-gray-500 font-medium">{conn.nextAction}</td>
                <td className="py-4 px-6 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => alert(`Opening WhatsApp for ${conn.contact}`)} className="bg-green-50 px-3 py-1.5 rounded-lg text-green-600 font-bold text-[11px] hover:bg-green-100 transition border border-green-200">WhatsApp</button>
                    <button onClick={() => alert(`Drafting Email to ${conn.contact}`)} className="bg-amber-50 px-3 py-1.5 rounded-lg text-amber-600 font-bold text-[11px] hover:bg-amber-100 transition border border-amber-200">Email</button>
                    <button className="bg-blue-50 p-1.5 rounded-lg text-blue-600 border border-blue-200 hover:bg-blue-100 transition"><Pencil size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredConnections.length === 0 && (
              <tr>
                <td colSpan="6" className="py-12 text-center text-gray-400">
                  <div className="text-[14px] font-medium">No connections found.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setShowVideoModal(true)}
          className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition-all shadow-sm text-gray-600 flex items-center gap-2 group"
        >
          <span className="group-hover:scale-125 transition-transform"><Video size={16} className="text-[#3b82f6]" /></span> Training Materials
        </button>
      </div>
    </div>
  );
};

export default Connections;
