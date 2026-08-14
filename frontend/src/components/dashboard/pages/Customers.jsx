import React, { useState, useEffect } from 'react';
import { TrainingResources } from '../DashboardComponents';
import { Calendar, Check } from 'lucide-react';

const Customers = ({ setActiveTab }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(`\${import.meta.env.VITE_API_URL}/connections?category=Customer`);
        const data = await response.json();
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
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Customers</h1>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#a855f7] text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-sm">+ Enter Customer</button>
          <button onClick={() => setActiveTab('CreateAppointment')} className="bg-[#1C1C1E] text-white px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#333] transition shadow-sm flex items-center gap-2"><Calendar size={16} /> Appointments</button>
          <button onClick={() => setShowImportModal(true)} className="bg-white border border-[#1C1C1E] text-[#1C1C1E] px-4 py-2 rounded-md text-[13px] font-bold hover:bg-[#f9f9f9] transition shadow-sm"><Check size={16} className="inline-block" /> Import Customers</button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-[#E2DED6] p-6 mb-8 overflow-hidden shadow-sm">
        <h3 className="text-[15px] font-bold text-[#1C1C1E] mb-4">Customer List</h3>
        {loading ? (
          <p className="text-[#6B6B70] text-[13px]">Loading customers...</p>
        ) : customers.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-[#6B6B70] text-[13px] mb-4">No customers found in database.</p>
            <button onClick={() => setActiveTab('CreateConnection')} className="bg-[#a855f7] text-white px-6 py-2.5 rounded-md text-[13px] font-bold hover:bg-[#9333ea] transition shadow-md">+ Click here to enter a customer.</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[13px]">
              <thead className="border-b border-[#F2F2F7]">
                <tr>
                  <th className="pb-3 font-medium text-[#6B6B70]">Name</th>
                  <th className="pb-3 font-medium text-[#6B6B70]">Email</th>
                  <th className="pb-3 font-medium text-[#6B6B70]">Phone</th>
                  <th className="pb-3 font-medium text-[#6B6B70]">Date Joined</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer._id} className="border-b border-[#F2F2F7] last:border-0 hover:bg-[#fcfaff] transition">
                    <td className="py-3 font-medium text-[#1C1C1E]">
                      {customer.title} {customer.firstName} {customer.lastName}
                      {customer.business && <div className="text-[11px] text-[#6B6B70] font-normal">{customer.business}</div>}
                    </td>
                    <td className="py-3 text-[#6B6B70]">{customer.email || '-'}</td>
                    <td className="py-3 text-[#6B6B70]">{customer.mobile ? `${customer.countryCode} ${customer.mobile}` : '-'}</td>
                    <td className="py-3 text-[#6B6B70]">{new Date(customer.createdAt).toLocaleDateString()}</td>
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
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">Import Customers</h2>
              <button onClick={() => setShowImportModal(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl">×</button>
            </div>
            
            <div className="p-6 space-y-5">
              <p className="text-[13px] text-[#6B6B70]">
                Upload a CSV or Excel file to bulk import your customers. Make sure your file follows the standard template.
              </p>
              
              <div className="border-2 border-dashed border-[#E2DED6] rounded-xl p-8 flex flex-col items-center justify-center bg-[#fafafa] hover:bg-[#f3e8ff] hover:border-[#a855f7] transition-all cursor-pointer group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                </div>
                <p className="text-[14px] font-bold text-[#1C1C1E] mb-1">Click to upload or drag and drop</p>
                <p className="text-[12px] text-[#6B6B70]">CSV, XLS, or XLSX (max 5MB)</p>
                <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
              </div>

              <div className="flex justify-between items-center">
                <button className="text-[#a855f7] text-[13px] font-bold hover:underline">
                  Download Template
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-[#f0f0f0] bg-[#fafafa] flex justify-end gap-3">
              <button
                onClick={() => setShowImportModal(false)}
                className="px-4 py-2 rounded-lg text-[13px] font-bold text-[#6B6B70] hover:bg-[#E2DED6] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Import started successfully!');
                  setShowImportModal(false);
                }}
                className="px-6 py-2 bg-[#1C1C1E] text-white rounded-lg text-[13px] font-bold hover:bg-[#333] transition shadow-md"
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
