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
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[28px] font-bold text-[#0f172a]">Customers</h1>
        <div className="flex flex-wrap items-center gap-2 mt-4 md:mt-0">
          <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#3b82f6] text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-sm">+ Enter Customer</button>
          <button onClick={() => setActiveTab('CreateAppointment')} className="bg-white border border-gray-200 text-[#0f172a] px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition shadow-sm flex items-center gap-2"><Calendar size={16} /> Appointments</button>
          <button onClick={() => setShowImportModal(true)} className="bg-[#0f172a] text-white px-4 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm flex items-center gap-2"><Check size={16} className="inline-block" /> Import Customers</button>
        </div>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 p-6 mb-8 overflow-hidden shadow-sm">
        <h3 className="text-[15px] font-bold text-[#0f172a] mb-4">Customer List</h3>
        {loading ? (
          <p className="text-gray-500 text-[13px]">Loading customers...</p>
        ) : customers.length === 0 ? (
          <div className="py-8 text-center flex flex-col items-center justify-center">
            <p className="text-gray-500 text-[13px] mb-4">No customers found in database.</p>
            <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#3b82f6] text-white px-6 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-[#2563eb] transition shadow-md">+ Click here to enter a customer</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-gray-100">
                <tr>
                  <th className="pb-3 font-semibold text-gray-500 uppercase text-[11px]">Name</th>
                  <th className="pb-3 font-semibold text-gray-500 uppercase text-[11px]">Email</th>
                  <th className="pb-3 font-semibold text-gray-500 uppercase text-[11px]">Phone</th>
                  <th className="pb-3 font-semibold text-gray-500 uppercase text-[11px]">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition">
                    <td className="py-4 font-medium text-[#0f172a]">
                      {customer.title} {customer.firstName} {customer.lastName}
                      {customer.business && <div className="text-[11px] text-gray-500 font-normal">{customer.business}</div>}
                    </td>
                    <td className="py-4 text-gray-600">{customer.email || '-'}</td>
                    <td className="py-4 text-gray-600">{customer.mobile ? `${customer.countryCode} ${customer.mobile}` : '-'}</td>
                    <td className="py-4 text-gray-600">{new Date(customer.createdAt).toLocaleDateString()}</td>
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
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-[18px] font-bold text-[#0f172a]">Import Customers</h2>
              <button onClick={() => setShowImportModal(false)} className="text-gray-400 hover:text-gray-700 transition text-xl">×</button>
            </div>
            
            <div className="p-6 space-y-5">
              <p className="text-[13px] text-gray-600">
                Upload a CSV or Excel file to bulk import your customers. Make sure your file follows the standard template.
              </p>
              
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-white hover:border-[#3b82f6] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-gray-100 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="text-[14px] font-bold text-[#0f172a] mb-1">Click to upload or drag and drop</p>
                <p className="text-[12px] text-gray-500">CSV, XLS, or XLSX (max 5MB)</p>
                <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
              </div>

              <div className="flex justify-between items-center">
                <button className="text-[#3b82f6] text-[13px] font-semibold hover:underline">
                  Download Template
                </button>
              </div>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-gray-600 hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Import started successfully!');
                  setShowImportModal(false);
                }}
                className="px-6 py-2.5 bg-[#0f172a] text-white rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition shadow-md"
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
