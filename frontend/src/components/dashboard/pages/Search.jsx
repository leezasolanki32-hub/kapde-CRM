import React, { useState } from 'react';
import { Search as SearchIcon } from "lucide-react";

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
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="mb-8">
        <div className="text-[#93c5fd] text-[15px] font-medium mb-1">Kapde B2B Network</div>
        <h1 className="text-[28px] font-bold text-[#e8f0fe]">Supplier Search</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-[#080d1a] border-b border-[#1e3a5f]">
              <h3 className="font-bold text-[16px]">Select Industry</h3>
            </div>
            <div className="p-4 border-b border-[#1e3a5f]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Industries" 
                  value={industryQuery}
                  onChange={(e) => setIndustryQuery(e.target.value)}
                  className="w-full border border-[#1e3a5f] rounded-md px-3 py-1.5 pl-8 text-[13px] focus:border-[#3b82f6] outline-none" 
                />
                <span className="absolute left-2.5 top-2 text-[#93c5fd]"><SearchIcon size={16} className="inline-block" /></span>
              </div>
            </div>
            <div className="max-h-[500px] overflow-auto">
              {filteredIndustries.length > 0 ? (
                filteredIndustries.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleIndustrySelect(item)}
                    className={`p-4 border-b border-[#1e3a5f] text-[13px] hover:bg-[#faf4ff] cursor-pointer transition ${selectedIndustry === item ? 'bg-[#080d1a] border-l-4 border-l-[#3b82f6] font-bold text-[#3b82f6]' : 'border-l-4 border-l-transparent'}`}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#93c5fd] text-[13px] italic">No industries found.</div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 bg-[#080d1a] border-b border-[#1e3a5f]">
              <h3 className="font-bold text-[16px]">Select Segment</h3>
            </div>
            <div className="p-4 border-b border-[#1e3a5f]">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search Segments" 
                  value={segmentQuery}
                  onChange={(e) => setSegmentQuery(e.target.value)}
                  disabled={!selectedIndustry}
                  className={`w-full border border-[#1e3a5f] rounded-md px-3 py-1.5 pl-8 text-[13px] focus:border-[#3b82f6] outline-none ${!selectedIndustry ? 'bg-gray-50 opacity-60 cursor-not-allowed' : ''}`} 
                />
                <span className="absolute left-2.5 top-2 text-[#93c5fd]"><SearchIcon size={16} className="inline-block" /></span>
              </div>
            </div>
            <div className="max-h-[500px] overflow-auto">
              {!selectedIndustry ? (
                <div className="p-10 text-center animate-[fadeIn_0.3s_ease-out]">
                  <div className="bg-[#080d1a] border border-[#1e3a5f] p-4 rounded text-[13px] text-[#93c5fd]">
                    Please choose an industry first.
                  </div>
                </div>
              ) : filteredSegments.length > 0 ? (
                filteredSegments.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => setSelectedSegment(item)}
                    className={`p-4 border-b border-[#1e3a5f] text-[13px] hover:bg-[#faf4ff] cursor-pointer transition animate-[slideUpFade_0.2s_ease-out] ${selectedSegment === item ? 'bg-[#080d1a] border-l-4 border-l-[#3b82f6] font-bold text-[#3b82f6]' : 'border-l-4 border-l-transparent'}`}
                  >
                    {item}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-[#93c5fd] text-[13px] italic">No segments found.</div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-6 shadow-sm mb-6">
            <h3 className="font-bold text-[16px] mb-4">Location</h3>
            <div className="relative mb-8">
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full border border-[#1e3a5f] rounded-md px-4 py-2.5 text-[14px] focus:outline-none focus:border-[#3b82f6] bg-[#0a1628] appearance-none cursor-pointer"
              >
                {LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              <span className="absolute right-4 top-3 text-[#93c5fd] pointer-events-none">▼</span>
            </div>
            <button 
              onClick={handleSearch}
              className="w-full bg-[#3b82f6] text-[#e8f0fe] py-3 rounded-md font-bold text-[15px] flex items-center justify-center gap-2 hover:bg-[#2563eb] transition-all shadow-md active:scale-[0.98]"
            >
              <SearchIcon size={16} className="inline-block" /> Search
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Search;
