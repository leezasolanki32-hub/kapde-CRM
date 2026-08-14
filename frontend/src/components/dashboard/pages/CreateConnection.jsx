import React, { useState } from 'react';
import { ArrowLeft, CheckCircle, ChevronDown, ChevronUp, UserPlus, Building, Phone, Mail, Tag } from 'lucide-react';

const CreateConnection = ({ setActiveTab, previousTab = 'Support' }) => {
  const [formData, setFormData] = useState({
    business: '',
    title: 'Mr.',
    firstName: '',
    lastName: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    categories: {
      Customer: true,
      Supplier: false,
      Neighbour: false,
      Friend: false
    }
  });

  const [showMoreDetails, setShowMoreDetails] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`\${import.meta.env.VITE_API_URL}/connections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Connection saved successfully!');
        setActiveTab(previousTab); // Go back to where they came from
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save connection');
      }
    } catch (err) {
      setError('Connection error. Is the backend running?');
    } finally {
      setLoading(false);
    }
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
          <h1 className="text-[28px] font-bold text-[#1C1C1E] tracking-tight">Enter Connection</h1>
          <p className="text-[14px] text-[#6B6B70] mt-1 font-medium">Add a new customer, supplier, or other contact</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2DED6] shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-6">
            
            {/* Business */}
            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                <Building size={14} className="text-[#a855f7]" /> Business <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="business"
                required
                value={formData.business}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                placeholder="Enter business name"
              />
            </div>

            {/* Name */}
            <div>
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                <UserPlus size={14} className="text-[#a855f7]" /> Name <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-4">
                <select
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-[90px] px-3 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
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
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                  placeholder="Last Name"
                />
              </div>
            </div>

            {/* Contact */}
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                  <Phone size={14} className="text-[#a855f7]" /> Mobile
                </label>
                <div className="flex gap-3">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="w-[90px] px-3 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
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
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
              
              <div className="flex items-center pt-8 px-2 text-[#6B6B70] font-bold text-[13px]">OR</div>
              
              <div className="flex-1">
                <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-1.5 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#a855f7]" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E2DED6] focus:outline-none focus:border-[#a855f7] focus:ring-4 focus:ring-purple-50 text-[14px] transition-all bg-slate-50 focus:bg-white"
                  placeholder="Enter email address"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="pt-2">
              <label className="block text-[12px] font-bold text-[#6B6B70] uppercase mb-3 flex items-center gap-1.5">
                <Tag size={14} className="text-[#a855f7]" /> Categories
              </label>
              <div className="flex flex-wrap gap-4">
                {Object.keys(formData.categories).map(category => {
                  // Set colors based on category to match screenshot
                  let colorClass = "";
                  if (category === "Customer") colorClass = formData.categories[category] ? "border-orange-400 bg-orange-50 text-orange-700" : "border-orange-200 bg-white text-orange-600";
                  if (category === "Supplier") colorClass = formData.categories[category] ? "border-blue-400 bg-blue-50 text-blue-700" : "border-blue-200 bg-white text-blue-600";
                  if (category === "Neighbour") colorClass = formData.categories[category] ? "border-green-400 bg-green-50 text-green-700" : "border-green-200 bg-white text-green-600";
                  if (category === "Friend") colorClass = formData.categories[category] ? "border-slate-400 bg-slate-50 text-slate-700" : "border-slate-200 bg-white text-slate-600";
                  
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => handleCategoryToggle(category)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${colorClass}`}
                    >
                      <div className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${formData.categories[category] ? 'bg-current border-current text-white' : 'border-current bg-transparent'}`}>
                        {formData.categories[category] && <CheckCircle size={12} strokeWidth={4} />}
                      </div>
                      <span className="text-[13px] font-medium">{category}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* More Details Toggle */}
            <div className="pt-4 border-t border-[#f0f0f0]">
              <button 
                type="button" 
                onClick={() => setShowMoreDetails(!showMoreDetails)}
                className="flex items-center gap-2 text-[#1C1C1E] font-bold text-[14px] hover:text-[#a855f7] transition-colors"
              >
                {showMoreDetails ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                Enter More Details
              </button>
              
              {showMoreDetails && (
                <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-[#E2DED6] text-[13px] text-[#6B6B70] italic">
                  Additional detail fields (e.g., GST Number, Address, Notes) would go here.
                </div>
              )}
            </div>

          </div>

          {/* Actions */}
          {error && <div className="text-red-500 text-[13px] font-bold px-6">{error}</div>}
          <div className="pt-6 border-t border-[#f0f0f0] flex justify-start">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-8 py-2.5 bg-[#008000] text-white rounded-xl font-bold text-[14px] hover:bg-[#006400] transition-all shadow-md disabled:opacity-70"
            >
              <CheckCircle size={18} /> {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateConnection;
