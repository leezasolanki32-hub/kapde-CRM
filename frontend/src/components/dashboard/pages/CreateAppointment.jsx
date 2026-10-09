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
          <ArrowLeft size={24} className="text-[#93c5fd]" />
        </button>
        <div>
          <h1 className="text-[28px] font-bold text-[#e8f0fe] tracking-tight">Schedule Appointment</h1>
          <p className="text-[14px] text-[#93c5fd] mt-1 font-medium">Set up a meeting or fitting session with a customer</p>
        </div>
      </div>

      <div className="bg-[#0a1628] rounded-2xl border border-[#1e3a5f] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Customer Details section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#e8f0fe] flex items-center gap-2 border-b border-[#1e3a5f] pb-2">
              <User size={16} className="text-[#3b82f6]" /> Customer Information
            </h3>
            
            <div>
              <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Customer Name *</label>
              <input
                type="text"
                name="customerName"
                required
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                placeholder="Select or type customer name"
              />
            </div>
          </div>

          {/* Schedule section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#e8f0fe] flex items-center gap-2 border-b border-[#1e3a5f] pb-2">
              <Calendar size={16} className="text-[#3b82f6]" /> Date & Time
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} /> Appointment Date *
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  required
                  value={formData.appointmentDate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                  <Clock size={14} /> Appointment Time *
                </label>
                <input
                  type="time"
                  name="appointmentTime"
                  required
                  value={formData.appointmentTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
                />
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="space-y-4">
            <h3 className="text-[14px] font-bold text-[#e8f0fe] flex items-center gap-2 border-b border-[#1e3a5f] pb-2">
              <FileText size={16} className="text-[#3b82f6]" /> Appointment Details
            </h3>
            
            <div>
              <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Purpose *</label>
              <select
                name="purpose"
                required
                value={formData.purpose}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f]"
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
              <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-900/30 text-[14px] transition-all bg-[#0f213a] text-[#e8f0fe] focus:bg-[#1e3a5f] resize-none"
                placeholder="Any special requirements or instructions..."
              ></textarea>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#1e3a5f] flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(previousTab)}
              className="px-6 py-2.5 rounded-xl border border-[#1e3a5f] text-[#93c5fd] font-bold text-[14px] hover:bg-[#1e3a5f] transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#3b82f6] text-[#e8f0fe] rounded-xl font-bold text-[14px] hover:bg-[#2563eb] transition-all shadow-md shadow-purple-200"
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
