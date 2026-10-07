import React, { useState } from 'react';
import { Search as SearchIcon, MapPin, Building2, Layers } from "lucide-react";

const INDUSTRIES_DATA = {
  'Fabrics & Textiles': ['Cotton', 'Silk', 'Polyester', 'Denim', 'Linen', 'Wool', 'Blends'],
  'Apparel Manufacturing': ['Men\'s Wear', 'Women\'s Wear', 'Kid\'s Wear', 'Uniforms', 'Activewear', 'Ethnic Wear'],
  'Trims & Accessories': ['Buttons', 'Zippers', 'Labels & Tags', 'Threads', 'Lace & Ribbons', 'Elastic'],
  'Machinery & Equipment': ['Sewing Machines', 'Cutting Machines', 'Ironing Equipment', 'Printing Machines', 'Embroidery Machines'],
  'Packaging Materials': ['Poly Bags', 'Cardboard Boxes', 'Hangers', 'Packing Tape'],
  'Dyes & Chemicals': ['Fabric Dyes', 'Bleaching Agents', 'Printing Inks', 'Fabric Softeners'],
  'Logistics & Transport': ['Freight Forwarding', 'Courier Services', 'Warehousing', 'Export Agents'],
  'Job Work Services': ['Dyeing', 'Printing', 'Embroidery', 'Washing', 'Stitching']
};

const LOCATIONS = ['All India', 'Gujarat', 'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu'];

const Search = () => {
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedSegment, setSelectedSegment] = useState('');
  const [industryQuery, setIndustryQuery] = useState('');
  const [segmentQuery, setSegmentQuery] = useState('');
  const [location, setLocation] = useState('All India');

  const filteredIndustries = Object.keys(INDUSTRIES_DATA).filter(ind => 
    ind.toLowerCase().includes(industryQuery.toLowerCase())
  );

  const availableSegments = selectedIndustry ? INDUSTRIES_DATA[selectedIndustry] : [];
  const filteredSegments = availableSegments.filter(seg => 
    seg.toLowerCase().includes(segmentQuery.toLowerCase())
  );

  const handleIndustrySelect = (industry) => {
    setSelectedIndustry(industry);
    setSelectedSegment(''); // Reset segment when industry changes
    setSegmentQuery('');
  };

  const handleSearch = () => {
    if (!selectedIndustry) {
      alert("Please select an industry first.");
      return;
    }
    alert(`Searching for Suppliers:\nIndustry: ${selectedIndustry}\nSegment: ${selectedSegment || 'All Segments'}\nLocation: ${location}`);
  };

  return (
    <div className="animate-[slideUpFade_0.4s_ease-out] w-full max-w-[1600px] mx-auto pb-10">
      <div className="mb-10">
        <div className="text-blue-600 text-[14px] font-bold uppercase tracking-wider mb-2">Kapde B2B Network</div>
        <h1 className="text-[32px] font-bold text-[#0f172a] tracking-tight">Supplier Search</h1>
        <p className="text-gray-500 font-medium mt-1">Find and connect with top suppliers across the industry.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Select Industry */}
        <div className="lg:w-1/3 flex flex-col h-[700px]">
          <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm flex flex-col h-full">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Building2 size={20} />
              </div>
              <h3 className="font-bold text-[18px] text-[#0f172a]">Select Industry</h3>
            </div>
            
            <div className="p-5 border-b border-gray-100">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Industries..." 
                  value={industryQuery}
                  onChange={(e) => setIndustryQuery(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-[14px] font-medium text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-400" 
                />
                <span className="absolute left-3.5 top-3.5 text-gray-400"><SearchIcon size={18} /></span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-2">
              {filteredIndustries.length > 0 ? (
                filteredIndustries.map((item, i) => {
                  const isSelected = selectedIndustry === item;
                  return (
                    <div 
                      key={i} 
                      onClick={() => handleIndustrySelect(item)}
                      className={`p-4 mx-2 my-1 rounded-xl text-[14px] font-medium cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-blue-50 text-blue-700 font-bold shadow-sm border border-blue-100' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#0f172a] border border-transparent'
                      }`}
                    >
                      {item}
                    </div>
                  );
                })
              ) : (
                <div className="p-10 text-center text-gray-400 text-[14px]">No industries found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Select Segment */}
        <div className="lg:w-1/3 flex flex-col h-[700px]">
          <div className="bg-white border border-gray-200 rounded-[24px] overflow-hidden shadow-sm flex flex-col h-full">
            <div className="p-6 bg-gray-50/50 border-b border-gray-100 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${selectedIndustry ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                <Layers size={20} />
              </div>
              <h3 className={`font-bold text-[18px] transition-colors ${selectedIndustry ? 'text-[#0f172a]' : 'text-gray-400'}`}>Select Segment</h3>
            </div>
            
            <div className="p-5 border-b border-gray-100">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Segments..." 
                  value={segmentQuery}
                  onChange={(e) => setSegmentQuery(e.target.value)}
                  disabled={!selectedIndustry}
                  className={`w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 pl-10 text-[14px] font-medium text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all placeholder:text-gray-400 ${!selectedIndustry ? 'opacity-60 cursor-not-allowed bg-gray-100' : ''}`} 
                />
                <span className="absolute left-3.5 top-3.5 text-gray-400"><SearchIcon size={18} /></span>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto no-scrollbar p-2">
              {!selectedIndustry ? (
                <div className="h-full flex items-center justify-center p-10 text-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="bg-gray-50 border border-gray-200 p-6 rounded-2xl text-[14px] text-gray-500 font-medium">
                    Please choose an industry first to view available segments.
                  </div>
                </div>
              ) : filteredSegments.length > 0 ? (
                filteredSegments.map((item, i) => {
                  const isSelected = selectedSegment === item;
                  return (
                    <div 
                      key={i} 
                      onClick={() => setSelectedSegment(item)}
                      className={`p-4 mx-2 my-1 rounded-xl text-[14px] font-medium cursor-pointer transition-all animate-[slideUpFade_0.2s_ease-out] ${
                        isSelected 
                          ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm border border-indigo-100' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-[#0f172a] border border-transparent'
                      }`}
                    >
                      {item}
                    </div>
                  );
                })
              ) : (
                <div className="p-10 text-center text-gray-400 text-[14px]">No segments found.</div>
              )}
            </div>
          </div>
        </div>

        {/* Action Panel */}
        <div className="lg:w-1/3">
          <div className="bg-white border border-gray-200 rounded-[24px] p-8 shadow-sm mb-6 sticky top-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <h3 className="font-bold text-[18px] text-[#0f172a]">Location</h3>
            </div>
            
            <div className="relative mb-10">
              <label className="block text-[13px] font-bold text-gray-700 uppercase tracking-wide mb-2">Filter by Region</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] font-semibold text-[#0f172a] focus:outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-blue-50 transition-all appearance-none cursor-pointer shadow-sm"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <span className="absolute right-4 bottom-4 text-gray-500 pointer-events-none">▼</span>
            </div>
            
            <button 
              onClick={handleSearch}
              className={`w-full py-4 rounded-xl font-bold text-[16px] flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                selectedIndustry 
                  ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none hover:shadow-none hover:translate-y-0'
              }`}
            >
              <SearchIcon size={20} /> Search Suppliers
            </button>
            
            {!selectedIndustry && (
              <p className="text-center text-[13px] text-gray-400 mt-4 font-medium">Select an industry to start searching</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Search;
