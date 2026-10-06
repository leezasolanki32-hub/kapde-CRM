import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, UserPlus, Phone, Mail, Globe, Tag } from 'lucide-react';

const CreateLead = ({ setActiveTab, previousTab = 'Leads' }) => {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    firstName: '',
    lastName: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    source: 'Website Inquiry',
    status: 'New',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Lead created successfully!');
    setActiveTab(previousTab);
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
          <h1 className="text-[28px] font-bold text-[#e8f0fe] tracking-tight">Create New Lead</h1>
          <p className="text-[14px] text-[#93c5fd] mt-1 font-medium">Add a new prospective customer to your pipeline</p>
        </div>
      </div>

      <div className="bg-[#0a1628] rounded-2xl border border-[#1e3a5f] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                <UserPlus size={14} className="text-[#3b82f6]" /> Name <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-[90px] px-3 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                >
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                </select>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="flex-1 w-full">
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-[#3b82f6]" /> Mobile
                </label>
                <div className="flex gap-3">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-[90px] px-3 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              
              <div className="flex-1 w-full">
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#3b82f6]" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Lead Tracking */}
            <div className="flex flex-col md:flex-row items-start gap-6 pt-2">
              <div className="flex-1 w-full">
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                  <Globe size={14} className="text-[#3b82f6]" /> Source
                </label>
                <select
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                >
                  <option value="Website Inquiry">Website Inquiry</option>
                  <option value="Instagram Ad">Instagram Ad</option>
                  <option value="Facebook Shop">Facebook Shop</option>
                  <option value="Referral">Referral</option>
                  <option value="Direct Visit">Direct Visit</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Google Search">Google Search</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex-1 w-full">
                <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5 flex items-center gap-1.5">
                  <Tag size={14} className="text-[#3b82f6]" /> Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628]"
                >
                  <option value="New">New</option>
                  <option value="Raw">Raw</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Notes */}
            <div className="pt-2">
              <label className="block text-[12px] font-bold text-[#93c5fd] uppercase mb-1.5">
                Notes / Requirements
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2.5 rounded-xl border border-[#1e3a5f] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-[#0a1628] resize-none"
                placeholder="E.g. Looking for a bridal outfit, budget is around 50k..."
              ></textarea>
            </div>

          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-[#1e3a5f] flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => setActiveTab(previousTab)}
              className="px-6 py-2.5 rounded-xl border border-[#1e3a5f] text-[#93c5fd] font-bold text-[14px] hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#3b82f6] text-[#e8f0fe] rounded-xl font-bold text-[14px] hover:bg-[#2563eb] transition-all shadow-md shadow-purple-200"
            >
              <CheckCircle size={18} /> Save Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLead;
