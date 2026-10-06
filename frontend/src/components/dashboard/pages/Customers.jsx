import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Calendar, Check } from 'lucide-react';
import { api } from '../../../api';

const Customers = ({ setActiveTab, currentUser }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        if (!currentUser?.id) return;
        const data = await api.getCustomers(currentUser.id);
        setCustomers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#e8f0fe]">Customers</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#3b82f6] text-[#e8f0fe] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-sm">+ Enter Customer</button>
          <button onClick={() => setActiveTab('CreateAppointment')} className="bg-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#333] transition shadow-sm flex items-center gap-2"><Calendar size={16} /> Appointments</button>
          <button onClick={() => setShowImportModal(true)} className="bg-[#0a1628] border border-[#e8f0fe] text-[#0a1628] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#f9f9f9] transition shadow-sm"><Check size={16} className="inline-block" /> Import Customers</button>
        </div>
      </div>

      <div className="bg-[#0a1628] rounded-xl border border-[#1e3a5f] p-6 mb-8 overflow-hidden shadow-sm">
        <h3 className="text-[15px] font-bold text-[#e8f0fe] mb-4">Customer List</h3>
        {loading ? (
          <p className="text-[#93c5fd] text-[13px]">Loading customers...</p>
        ) : customers.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[#93c5fd] text-[13px] mb-4">No customers found in database.</p>
            <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#3b82f6] text-[#e8f0fe] px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#2563eb] transition shadow-md">+ Click here to enter a customer.</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-[#F2F2F7]">
                <tr>
                  <th className="pb-3 font-medium text-[#93c5fd]">Name</th>
                  <th className="pb-3 font-medium text-[#93c5fd]">Email</th>
                  <th className="pb-3 font-medium text-[#93c5fd]">Phone</th>
                  <th className="pb-3 font-medium text-[#93c5fd]">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="border-b border-[#F2F2F7] last:border-0 hover:bg-[#fcfaff] transition">
                    <td className="py-3 font-medium text-[#0a1628]">
                      {customer.title} {customer.firstName} {customer.lastName}
                      {customer.business && <div className="text-[11px] text-[#334155] font-normal">{customer.business}</div>}
                    </td>
                    <td className="py-3 text-[#334155]">{customer.email || '-'}</td>
                    <td className="py-3 text-[#334155]">{customer.mobile ? `${customer.countryCode} ${customer.mobile}` : '-'}</td>
                    <td className="py-3 text-[#334155]">{new Date(customer.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <TrainingResources />

      {/* Import Customers Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a1628] rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#1e3a5f] flex justify-between items-center bg-[#080d1a]">
              <h2 className="text-[18px] font-bold text-[#e8f0fe]">Import Customers</h2>
              <button onClick={() => setShowImportModal(false)} className="text-[#93c5fd] hover:text-[#e8f0fe] transition text-xl">×</button>
            </div>
            
            <div className="p-6 space-y-5">
              <p className="text-[13px] text-[#93c5fd]">
                Upload a CSV or Excel file to bulk import your customers. Make sure your file follows the standard template.
              </p>
              
              <div className="border-2 border-dashed border-[#1e3a5f] rounded-xl p-8 flex flex-col items-center justify-center bg-[#0a1628] hover:bg-[#132847] hover:border-[#3b82f6] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-[#0a1628] rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="text-[14px] font-bold text-[#e8f0fe] mb-1">Click to upload or drag and drop</p>
                <p className="text-[12px] text-[#93c5fd]">CSV, XLS, or XLSX (max 5MB)</p>
                <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
              </div>

              <div className="flex justify-between items-center">
                <button className="text-[#3b82f6] text-[13px] font-bold hover:underline">
                  Download Template
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-[#1e3a5f] bg-[#0a1628] flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-lg text-[13px] font-bold text-[#93c5fd] hover:bg-[#1e3a5f] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Import started successfully!');
                  setShowImportModal(false);
                }}
                className="px-6 py-2 bg-[#e8f0fe] text-[#0a1628] rounded-lg text-[13px] font-bold hover:bg-[#333] transition shadow-md"
              >
                Start Import
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
