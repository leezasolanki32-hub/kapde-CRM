import React, { useState, useRef } from 'react';
import { MapPin, Check, Settings } from "lucide-react";

const STEPS = [
  { id: 1, label: 'Basic', desc: 'Set up the tagline, business description, logo, etc.' },
  { id: 2, label: 'Products & Market', desc: 'Define your products and target market.' },
  { id: 3, label: 'Purchases', desc: 'Configure your purchase preferences.' },
  { id: 4, label: 'Header', desc: 'Customize your website header.' },
  { id: 5, label: 'Offer', desc: 'Set up special offers and discounts.' },
  { id: 6, label: 'Catalog', desc: 'Manage your product catalog.' },
  { id: 7, label: 'About Company', desc: 'Add information about your company.' },
  { id: 8, label: 'Team', desc: 'Add team members and roles.' },
  { id: 9, label: 'FAQs', desc: 'Set up frequently asked questions.' },
  { id: 10, label: 'Contact', desc: 'Configure contact information.' }
];

/* ───────────── Preview Modal ───────────── */
const PreviewModal = ({ onClose, data }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10" style={{ background: 'rgba(0,0,0,0.7)' }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl h-full flex flex-col animate-[zoomIn_0.3s_ease-out] overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-[#1C1C1E] text-white">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <span className="text-[13px] font-medium opacity-70 ml-2">Live Preview - {data.companyName}</span>
          </div>
          <button onClick={onClose} className="text-white hover:text-red-400 text-[24px] leading-none">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-slate-50 relative">
          {/* Mock Website Navbar */}
          <nav className="bg-white px-8 py-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
              {data.logoPreview ? (
                <img src={data.logoPreview} alt="Logo" className="h-10 object-contain" />
              ) : (
                <div className="h-10 w-10 bg-[#a855f7] rounded-md flex items-center justify-center text-white font-bold text-xl">
                  {data.companyName.charAt(0)}
                </div>
              )}
              <span className="text-[18px] font-bold text-[#1C1C1E]">{data.companyName}</span>
            </div>
            <div className="hidden md:flex gap-6 text-[14px] text-[#6B6B70] font-medium">
              <span className="hover:text-[#a855f7] cursor-pointer">Home</span>
              <span className="hover:text-[#a855f7] cursor-pointer">Shop</span>
              <span className="hover:text-[#a855f7] cursor-pointer">About Us</span>
              <span className="hover:text-[#a855f7] cursor-pointer">Contact</span>
            </div>
          </nav>

          {/* Mock Hero Section */}
          <div className="py-24 px-8 text-center bg-gradient-to-br from-[#f3e8ff] to-[#faf5ff] border-b border-[#e9d5ff]">
            <h1 className="text-[48px] font-extrabold text-[#1C1C1E] tracking-tight mb-4">{data.companyName}</h1>
            <p className="text-[20px] text-[#6B6B70] max-w-2xl mx-auto mb-8 font-medium">
              {data.tagline || "Your awesome tagline will appear here."}
            </p>
            <button className="bg-[#1C1C1E] text-white px-8 py-3.5 rounded-full font-bold text-[15px] hover:bg-[#a855f7] transition-colors shadow-lg">Shop Now</button>
          </div>

          {/* Mock Content */}
          <div className="py-16 px-8 max-w-4xl mx-auto text-center">
            <h2 className="text-[24px] font-bold text-[#1C1C1E] mb-6">About Us</h2>
            <p className="text-[16px] text-[#6B6B70] leading-relaxed">
              {data.description || "Write a compelling description in the Setup Website tool to see it magically appear here. This space is perfect for telling your brand's unique story."}
            </p>
            <div className="mt-12 text-[#6B6B70] text-[14px]">
              <p><MapPin size={16} className="inline-block" /> {data.location}, {data.state}</p>
              {data.gstin && <p className="mt-2 text-[12px] opacity-70">GSTIN: {data.gstin}</p>}
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
      // Create a local preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setFormData({ ...formData, logoPreview: previewUrl });
    }
  };

  const activeStepData = STEPS.find(s => s.id === activeStep);
  const progressPercentage = Math.round((completedSteps.length / STEPS.length) * 100);

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      {showPreview && <PreviewModal onClose={() => setShowPreview(false)} data={formData} />}
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <h1 className="text-[24px] font-medium text-[#1C1C1E]">Setup Website</h1>
        <div className="flex items-center gap-4">
          <button onClick={handlePreview} className="bg-[#a855f7] text-white px-6 py-2 rounded-md text-[13px] font-bold shadow-sm hover:bg-[#9333ea] transition-colors">Preview</button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Steps */}
        <div className="md:w-1/4">
          <div className="flex flex-col gap-1 border-l-2 border-[#f0f0f0]">
            {STEPS.map((step) => {
              const isActive = step.id === activeStep;
              const isCompleted = completedSteps.includes(step.id);
              return (
                <button 
                  key={step.id} 
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center text-left gap-3 py-3 px-4 -ml-[1.5px] border-l-4 transition ${isActive ? 'border-[#a855f7] bg-[#FAF8F4] text-[#a855f7] font-bold' : 'border-transparent text-[#6B6B70] hover:bg-[#fafafa]'}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shadow-sm transition-colors ${isActive ? 'bg-[#a855f7] text-white' : isCompleted ? 'bg-[#16a34a] text-white' : 'bg-white border border-[#E2DED6]'}`}>
                    {isCompleted && !isActive ? '<Check size={16} className="inline-block" />' : step.id}
                  </div>
                  <span className="text-[13px]">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="md:w-3/4 animate-[slideUpFade_0.3s_ease-out]" key={activeStep}>
          <div className="bg-white border border-[#E2DED6] rounded-xl overflow-hidden shadow-sm">
            <div className="flex">
              <div className="bg-[#a855f7] text-white px-8 py-3.5 text-[14px] font-bold slanted-right relative pr-12 min-w-[200px]">
                {activeStepData?.label} Info
              </div>
              <div className="flex-1 bg-[#FAF8F4] border-b border-[#E2DED6] flex items-center px-6">
                <p className="text-[12px] text-[#6B6B70]">{activeStepData?.desc}</p>
              </div>
            </div>
            
            {activeStep === 1 ? (
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1C1C1E]">Company Name <span className="text-red-500">*</span></label>
                  <input name="companyName" value={formData.companyName} onChange={handleInputChange} type="text" className="border border-[#E2DED6] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1C1C1E]">Tagline</label>
                  <input name="tagline" value={formData.tagline} onChange={handleInputChange} type="text" placeholder="Tagline" className="border border-[#E2DED6] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1C1C1E]">Company Logo</label>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                  <button onClick={handleLogoUpload} className="border border-dashed border-[#E2DED6] rounded-lg p-10 flex flex-col items-center justify-center gap-2 bg-[#fcfcfc] hover:bg-[#FAF8F4] cursor-pointer transition relative overflow-hidden group min-h-[140px]">
                    {formData.logoPreview ? (
                      <>
                        <img src={formData.logoPreview} alt="Logo Preview" className="absolute inset-0 w-full h-full object-contain p-2" />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white text-[13px] font-bold">Change Logo</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <span className="text-[20px] text-[#16a34a]">+</span>
                        <span className="text-[14px] font-bold text-[#16a34a]">Upload Logo</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[13px] font-bold text-[#1C1C1E]">Description</label>
                  </div>
                  <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="No description yet..." className="flex-1 border border-[#E2DED6] rounded bg-[#fcfcfc] p-4 text-[13px] focus:outline-none focus:border-[#a855f7] resize-none h-full min-h-[100px]"></textarea>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1C1C1E]">Location <span className="text-red-500">*</span></label>
                  <input name="location" value={formData.location} onChange={handleInputChange} type="text" className="border border-[#E2DED6] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1C1C1E] opacity-0">State</label>
                  <input name="state" value={formData.state} onChange={handleInputChange} type="text" className="border border-[#E2DED6] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7]" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-bold text-[#1C1C1E]">GSTIN</label>
                  <input name="gstin" value={formData.gstin} onChange={handleInputChange} type="text" placeholder="GSTIN" className="border border-[#E2DED6] rounded px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#a855f7]" />
                </div>
              </div>
            ) : (
              <div className="p-16 text-center">
                <div className="text-[40px] mb-4"><Settings size={16} className="inline-block" />️</div>
                <h3 className="text-[18px] font-bold text-[#1C1C1E] mb-2">{activeStepData?.label} Configuration</h3>
                <p className="text-[14px] text-[#6B6B70]">This section is ready to be configured. Fill in your details below to save progress.</p>
              </div>
            )}

            <div className="p-6 flex justify-end bg-[#fafafa] border-t border-[#E2DED6]">
              <button onClick={handleSaveAndContinue} className="bg-[#a855f7] text-white px-10 py-2.5 rounded-md text-[14px] font-bold shadow-md hover:bg-[#9333ea] transition-colors">Save & Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourStore;
