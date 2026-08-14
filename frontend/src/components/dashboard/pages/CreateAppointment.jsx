import React, { useState } from 'react';
import { Calendar, Clock, User, FileText, ArrowLeft, CheckCircle } from 'lucide-react';

const CreateAppointment = ({ setActiveTab, previousTab = 'Recovery' }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    appointmentDate: '',
    appointmentTime: '',
    purpose: '',
    notes: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment Scheduled successfully!');
    setActiveTab(previousTab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[800px] mx-auto p-4 lg:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setActiveTab(previousTab)}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-[#6B6B70]" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">Schedule Appointment</h1>
          <p className="text-[14px] text-[#6B6B70] mt-1 font-medium">Set up a meeting or fitting session with a customer</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Customer Details section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-2">
              <User size={16} className="text-[#a855f7]" /> Customer Information
            </h3>
            
            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                placeholder="Select or type customer name"
              />
            </div>
          </div>

          {/* Schedule section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-2">
              <Calendar size={16} className="text-[#a855f7]" /> Date & Time
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} /> Appointment Date *
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} /> Appointment Time *
                </label>
                <input
                  type="time"
                  name="appointmentTime"
                  required
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#1C1C1E] flex items-center gap-2 border-b border-[#f0f0f0] pb-2">
              <FileText size={16} className="text-[#a855f7]" /> Appointment Details
            </h3>
            
            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Purpose *</label>
              <select
                name="purpose"
                required
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
              >
                <option value="" disabled>Select purpose</option>
                <option value="Initial Consultation">Initial Consultation</option>
                <option value="Fitting">Fitting</option>
                <option value="Alteration">Alteration</option>
                <option value="Delivery/Pickup">Delivery / Pickup</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white resize-none"
                placeholder="Any special requirements or instructions..."
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#f0f0f0] flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(previousTab)}
              className="px-6 py-2.5 rounded-xl border border-[#E2DED6] text-[#6B6B70] font-bold text-[14px] hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#a855f7] text-white rounded-xl font-bold text-[14px] hover:bg-[#9333ea] transition-all shadow-md shadow-purple-200"
            >
              <CheckCircle size={18} /> Schedule Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAppointment;
