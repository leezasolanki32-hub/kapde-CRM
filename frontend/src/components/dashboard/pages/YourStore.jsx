import React, { useState, useRef } from 'react';
import { MapPin, Check, Settings, Upload, Image as ImageIcon } from "lucide-react";

const STEPS = [
  { id: 1, label: 'Company Info', desc: 'Basic details about your boutique' },
  { id: 2, label: 'Theme Colors', desc: 'Choose your brand colors' },
  { id: 3, label: 'Typography', desc: 'Select fonts for your store' },
  { id: 4, label: 'Header & Footer', desc: 'Configure navigation' },
  { id: 5, label: 'Home Page', desc: 'Design your landing page' },
  { id: 6, label: 'Products', desc: 'Display settings for shop' },
  { id: 7, label: 'Checkout', desc: 'Customize checkout flow' },
  { id: 8, label: 'Policies', desc: 'Terms & conditions' },
  { id: 9, label: 'Social Links', desc: 'Connect your social media' },
  { id: 10, label: 'Domain', desc: 'Custom domain setup' }
];

/* ───────────── Preview Modal ───────────── */
const PreviewModal = ({ onClose, data }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10" style={{ background: 'rgba(0,0,0,0.4)' }}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-full flex flex-col animate-[zoomIn_0.3s_ease-out] overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-100 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
            </div>
            <div className="bg-white px-4 py-1 rounded-md text-[12px] font-medium text-gray-500 shadow-sm border border-gray-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Preview - {data.companyName}
            </div>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-[24px] leading-none transition-colors">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-gray-50 relative">
          {/* Mock Website Navbar */}
          <nav className="bg-white px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-10 border-b border-gray-100">
            <div className="flex items-center gap-4">
              {data.logoPreview ? (
                <img src={data.logoPreview} alt="Logo" className="h-10 object-contain" />
              ) : (
                <div className="h-10 w-10 bg-[#0f172a] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">
                  {data.companyName.charAt(0)}
                </div>
              )}
              <span className="text-[20px] font-bold text-[#0f172a] tracking-tight">{data.companyName}</span>
            </div>
            <div className="hidden md:flex gap-8 text-[14px] text-gray-500 font-semibold uppercase tracking-wider">
              <span className="text-[#0f172a] cursor-pointer">Home</span>
              <span className="hover:text-[#0f172a] transition-colors cursor-pointer">Shop</span>
              <span className="hover:text-[#0f172a] transition-colors cursor-pointer">About Us</span>
              <span className="hover:text-[#0f172a] transition-colors cursor-pointer">Contact</span>
            </div>
          </nav>

          {/* Mock Hero Section */}
          <div className="py-24 px-8 text-center bg-white border-b border-gray-100">
            <h1 className="text-[56px] font-extrabold text-[#0f172a] tracking-tight mb-6 leading-tight">{data.companyName}</h1>
            <p className="text-[20px] text-gray-500 max-w-2xl mx-auto mb-10 font-medium">
              {data.tagline || "Your awesome tagline will appear here."}
            </p>
            <button className="bg-[#0f172a] text-white px-10 py-4 rounded-full font-bold text-[15px] hover:bg-gray-800 transition-colors shadow-xl hover:shadow-2xl hover:-translate-y-1 transform duration-200">Shop Now</button>
          </div>

          {/* Mock Content */}
          <div className="py-20 px-8 max-w-4xl mx-auto text-center">
            <h2 className="text-[28px] font-bold text-[#0f172a] mb-8">Our Story</h2>
            <p className="text-[18px] text-gray-500 leading-relaxed font-medium">
              {data.description || "Write a compelling description in the Setup Website tool to see it magically appear here. This space is perfect for telling your brand's unique story."}
            </p>
            <div className="mt-16 inline-flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 text-gray-600 font-medium">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 text-[#3b82f6]">
                <MapPin size={24} />
              </div>
              <p className="text-[16px]">{data.location}, {data.state}</p>
              {data.gstin && <p className="mt-2 text-[13px] text-gray-400 font-semibold uppercase tracking-wider">GSTIN: {data.gstin}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const YourStore = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([5, 9]); // Pre-completed examples from UI
  
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    companyName: 'My Boutique',
    tagline: '',
    description: '',
    location: 'GANDHINAGAR',
    state: 'Gujarat',
    gstin: '',
    logoPreview: null
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }
  };

  const handleSaveAndContinue = () => {
    handleSave();
    if (activeStep < 10) setActiveStep(activeStep + 1);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleLogoUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, logoPreview: previewUrl });
    }
  };

  const activeStepData = STEPS.find(s => s.id === activeStep);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} data={formData} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
        <div>
          <h1 className="text-[32px] font-bold text-[#0f172a] tracking-tight">Website Setup</h1>
          <p className="text-gray-500 font-medium mt-1">Configure your online storefront and branding.</p>
        </div>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <button onClick={handlePreview} className="bg-white border border-gray-200 text-[#0f172a] px-6 py-2.5 rounded-xl text-[14px] font-bold shadow-sm hover:bg-gray-50 transition-colors">View Live Store</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Steps */}
        <div className="md:w-1/4">
          <div className="flex flex-col gap-2">
            {STEPS.map((step) => {
              const isActive = step.id === activeStep;
              const isCompleted = completedSteps.includes(step.id);
              return (
                <button 
                  key={step.id} 
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center text-left gap-4 py-3 px-5 rounded-2xl transition-all ${isActive ? 'bg-blue-50 text-blue-700 font-bold border border-blue-100 shadow-sm' : 'bg-transparent text-gray-500 hover:bg-gray-50 font-medium'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold shadow-sm transition-colors ${isActive ? 'bg-[#3b82f6] text-white' : isCompleted ? 'bg-green-500 text-white' : 'bg-white border border-gray-300 text-gray-400'}`}>
                    {isCompleted && !isActive ? <Check size={14} /> : step.id}
                  </div>
                  <span className="text-[14px]">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4 animate-[slideUpFade_0.3s_ease-out]" key={activeStep}>
          <div className="bg-white border border-gray-200 rounded-[32px] overflow-hidden shadow-sm">
            
            {/* Header / Info bar */}
            <div className="border-b border-gray-100 bg-gray-50/50 p-8 flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-[20px] font-bold text-[#0f172a] tracking-tight">{activeStepData?.label}</h2>
                <p className="text-[14px] text-gray-500 font-medium mt-1">{activeStepData?.desc}</p>
              </div>
              <div className="mt-4 md:mt-0 text-[12px] font-bold text-blue-600 bg-blue-50 px-4 py-1.5 rounded-full uppercase tracking-wider">
                Step {activeStep} of {STEPS.length}
              </div>
            </div>
            
            {activeStep === 1 ? (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Company Name <span className="text-red-500">*</span></label>
                  <input name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-[#0f172a] font-semibold focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Tagline</label>
                  <input name="tagline" value={formData.tagline} onChange={handleInputChange} type="text" placeholder="e.g., Premium Fashion for Everyone" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">Company Logo</label>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  <button onClick={handleLogoUpload} className="border-2 border-dashed border-gray-300 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-gray-50 hover:bg-gray-100 hover:border-gray-400 cursor-pointer transition-all relative overflow-hidden group min-h-[200px]">
                    {formData.logoPreview ? (
                      <>
                        <img src={formData.logoPreview} alt="Logo Preview" className="absolute inset-0 w-full h-full object-contain p-4" />
                        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                          <Upload size={24} className="text-[#3b82f6]" />
                          <span className="text-[#3b82f6] text-[14px] font-bold">Replace Image</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-500 mb-2">
                          <ImageIcon size={28} />
                        </div>
                        <span className="text-[15px] font-bold text-[#0f172a]">Upload your logo</span>
                        <span className="text-[13px] text-gray-500 font-medium">PNG, JPG up to 5MB</span>
                      </>
                    )}
                  </button>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">About Your Store</label>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Tell your customers about your brand story, values, and what makes your clothing unique..." className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl p-5 text-[14px] text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all shadow-sm resize-none h-full min-h-[200px]"></textarea>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">City / Location <span className="text-red-500">*</span></label>
                  <input name="location" value={formData.location} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-[#0f172a] font-semibold focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">State</label>
                  <input name="state" value={formData.state} onChange={handleInputChange} type="text" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all shadow-sm" />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-[13px] font-bold text-gray-700 uppercase tracking-wide">GSTIN (Optional)</label>
                  <input name="gstin" value={formData.gstin} onChange={handleInputChange} type="text" placeholder="e.g., 22AAAAA0000A1Z5" className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all shadow-sm w-full md:w-1/2" />
                </div>
              </div>
            ) : (
              <div className="p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-6 border border-gray-100">
                  <Settings size={32} />
                </div>
                <h3 className="text-[22px] font-bold text-[#0f172a] mb-2">{activeStepData?.label} Configuration</h3>
                <p className="text-[15px] text-gray-500 font-medium max-w-md">This section is ready to be configured. Fill in your details below to save progress.</p>
              </div>
            )}

            <div className="p-8 flex justify-end bg-gray-50/50 border-t border-gray-100">
              <button onClick={handleSaveAndContinue} className="bg-[#3b82f6] text-white px-8 py-3.5 rounded-xl text-[14px] font-bold shadow-md hover:bg-[#2563eb] hover:shadow-lg hover:-translate-y-0.5 transition-all">Save & Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourStore;
