import React, { useState } from 'react';
import { HelpCircle } from "lucide-react";

export const SidebarItem = ({ icon, label, active, onClick, isCollapsed, locked }) => (
  <div
    className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-3 px-4 py-2.5'} rounded-lg transition-all duration-300 relative ${locked ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'} ${active ? 'bg-[#a855f7]/10 text-[#a855f7] font-semibold border border-[#a855f7]/20 shadow-sm' : locked ? 'text-[#64748b]' : 'text-[#64748b] hover:bg-[#a855f7]/5 hover:text-[#a855f7]'}`}
    onClick={locked ? null : onClick}
    title={locked ? `${label} (Requires Upgrade)` : (isCollapsed ? label : '')}
  >
    <span className={`${isCollapsed ? 'text-[20px]' : 'text-[18px]'}`}>{icon}</span>
    {!isCollapsed && <span className="text-[14px] whitespace-nowrap overflow-hidden flex-1">{label}</span>}
    {!isCollapsed && locked && <span className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded ml-auto">🔒</span>}
    {isCollapsed && locked && <span className="absolute top-0 right-0 text-[10px]">🔒</span>}
  </div>
);

export const StatCard = ({ title, value, change, isPositive }) => (
  <div className="bg-gradient-to-br from-[#f3e8ff]/80 to-white/90 backdrop-blur-md p-6 rounded-xl border border-[#d8b4fe]/30 flex-1 min-w-[200px] shadow-sm hover:shadow-lg hover:border-[#a855f7]/40 transition-all duration-300 relative overflow-hidden">
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#a855f7] to-[#d8b4fe]"></div>
    <div className="text-[12px] font-bold text-[#7c3aed] uppercase tracking-wider mb-2">{title}</div>
    <div className="text-[32px] font-serif font-bold text-[#1C1C1E] mb-2">{value}</div>
    <div className={`text-[13px] font-medium flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
      {isPositive ? '▲' : '▼'} {change}
    </div>
  </div>
);

export const Bar = ({ heights }) => (
  <div className="w-[45px] flex flex-col justify-end gap-1 h-[200px] group relative cursor-pointer">
    {heights.map((h, i) => (
      <div
        key={i}
        style={{ height: h.val }}
        className={`w-full rounded-sm ${h.color} transition-all hover:brightness-110`}
      />
    ))}
  </div>
);

export const SegmentRow = ({ title, desc, limit, users, colorClass }) => (
  <div className="mb-4">
    <div className="flex justify-between items-end mb-1">
      <div>
        <div className="text-[14px] font-bold text-[#1C1C1E]">{title}</div>
        <div className="text-[12px] text-[#6B6B70]">{desc}</div>
      </div>
      <div className="text-right">
        <span className="text-[14px] font-bold text-[#1C1C1E] mr-2">{users}</span>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${colorClass}`}>{limit}</span>
      </div>
    </div>
    <div className="w-full h-1.5 bg-[#f3e8ff]/40 rounded-full overflow-hidden mt-2">
      <div className={`h-full ${colorClass.split(' ')[0].replace('text-', 'bg-')} bg-opacity-60`} style={{ width: `${(parseInt(users.replace(/,/g, '')) / 3000) * 100}%` }}></div>
    </div>
  </div>
);

export const ReportCard = ({ title, desc, icon }) => (
  <div className="bg-white/60 backdrop-blur-md border border-[#d8b4fe]/20 rounded-xl p-6 hover:border-[#d8b4fe]/40 hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)] transition-all duration-500 cursor-pointer group hover:-translate-y-2 relative overflow-hidden animate-[scaleIn_0.6s_ease-out_both] hover:scale-[1.02]">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#f3e8ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -z-0"></div>

    <div className="relative z-10 flex items-start justify-between mb-4">
      <div className="w-12 h-12 flex items-center justify-center bg-[#f3e8ff]/50 group-hover:bg-[#a855f7] text-[#7c3aed] group-hover:text-white rounded-xl shadow-sm transition-all duration-500 border border-[#d8b4fe]/20 group-hover:border-transparent">
        {icon}
      </div>
      <div className="w-8 h-8 rounded-full bg-[#f3e8ff]/30 flex items-center justify-center text-[#d8b4fe] group-hover:text-[#a855f7] group-hover:bg-[#f3e8ff] transition-all duration-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </div>
    </div>

    <div className="relative z-10">
      <h3 className="text-[16px] font-bold text-[#1C1C1E] mb-2 group-hover:text-[#a855f7] transition-colors">{title}</h3>
      <p className="text-[13px] text-[#88888C] font-serif leading-relaxed line-clamp-2">{desc}</p>
    </div>
  </div>
);

export const TrainingResources = () => {
  const [showMaterialsModal, setShowMaterialsModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  return (
    <>
      <div className="flex gap-4 mt-auto pt-8">
        <button
          onClick={() => setShowMaterialsModal(true)}
          className="bg-white/60 backdrop-blur-sm border border-[#d8b4fe]/30 px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#f3e8ff] hover:border-[#d8b4fe] transition flex items-center gap-2 text-[#7c3aed]"
        >
          <HelpCircle size={16} className="inline-block" /> Training Materials
        </button>
        <button
          onClick={() => setShowVideoModal(true)}
          className="bg-white/60 backdrop-blur-sm border border-[#d8b4fe]/30 px-4 py-2 rounded-md text-[13px] font-semibold hover:bg-[#f3e8ff] hover:border-[#d8b4fe] transition flex items-center gap-2 text-[#7c3aed]"
        >
          ▶ Watch Training
        </button>
      </div>

      {/* Materials Modal */}
      {showMaterialsModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-[#f0f0f0] flex justify-between items-center bg-[#FAF8F4]">
              <h2 className="text-[18px] font-bold text-[#1C1C1E]">About KapdeCRM</h2>
              <button onClick={() => setShowMaterialsModal(false)} className="text-[#6B6B70] hover:text-[#1C1C1E] transition text-xl">×</button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto prose prose-sm">
              <h3 className="text-xl font-bold text-[#1C1C1E] mb-4">Welcome to KapdeCRM</h3>
              <p className="text-[#6B6B70] mb-4 leading-relaxed">
                KapdeCRM is your all-in-one solution for managing a modern clothing business. From tracking leads and generating quotes, to managing inventory and overseeing manufacturing, our platform is designed to streamline your entire operational workflow.
              </p>

              <h4 className="font-bold text-[#1C1C1E] mt-6 mb-2">Key Modules</h4>
              <ul className="list-disc pl-5 space-y-2 text-[#6B6B70]">
                <li><strong>Sales:</strong> Manage Quotes, Orders, Invoices, Proforma Invoices, and monitor Payment Recovery.</li>
                <li><strong>Operations:</strong> Track Inventory, oversee Manufacturing processes, manage Suppliers, and assign Tasks.</li>
                <li><strong>Network:</strong> Manage your Store, review advanced Reports, and connect with other businesses.</li>
              </ul>

              <div className="mt-8 p-4 bg-[#f3e8ff] rounded-xl border border-[#d8b4fe]">
                <h4 className="font-bold text-[#a855f7] mb-1">Need more help?</h4>
                <p className="text-[#6B6B70] text-sm">Our support team is available 24/7. Use the "Support" module to log a ticket and we'll get back to you immediately.</p>
              </div>
            </div>
            <div className="p-4 border-t border-[#f0f0f0] bg-gray-50 flex justify-end">
              <button onClick={() => setShowMaterialsModal(false)} className="px-6 py-2 bg-[#1C1C1E] text-white rounded-lg text-[13px] font-bold hover:bg-[#333] transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
          <div className="bg-black rounded-2xl w-full max-w-4xl shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden relative">
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition"
            >
              ×
            </button>

            <div className="aspect-video bg-black w-full h-full flex items-center justify-center">
              <video
                src="/demo_video.mp4"
                controls
                autoPlay
                className="w-full h-full max-h-[85vh] object-contain"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
