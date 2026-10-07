import React, { useState } from 'react';
import { HelpCircle } from "lucide-react";

export const SidebarItem = ({ icon, label, active, onClick, isCollapsed, locked }) => (
  <div
    className={`flex items-center ${isCollapsed ? 'justify-center w-10 h-10 mx-auto' : 'gap-3 px-4 py-2.5'} rounded-lg transition-all duration-300 relative ${locked ? 'opacity-60 grayscale cursor-not-allowed' : 'cursor-pointer'} ${active ? 'bg-[#3b82f6]/10 text-[#3b82f6] font-semibold border border-[#3b82f6]/20 shadow-sm' : locked ? 'text-[#64748b]' : 'text-[#64748b] hover:bg-[#3b82f6]/5 hover:text-[#3b82f6]'}`}
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
  <div className="bg-gradient-to-br from-[#0a1628]/80 to-[#0a1628]/90 backdrop-blur-md p-6 rounded-xl border border-[#93c5fd]/30 flex-1 min-w-[200px] shadow-sm hover:shadow-lg hover:border-[#3b82f6]/40 transition-all duration-300 relative overflow-hidden card-hover-lift animate-fade-in-up">
    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#3b82f6] to-[#93c5fd]"></div>
    <div className="text-[12px] font-bold text-[#1d4ed8] uppercase tracking-wider mb-2">{title}</div>
    <div className="text-[32px] font-serif font-bold text-[#e8f0fe] mb-2">{value}</div>
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
        <div className="text-[14px] font-bold text-[#e8f0fe]">{title}</div>
        <div className="text-[12px] text-[#93c5fd]">{desc}</div>
      </div>
      <div className="text-right">
        <span className="text-[14px] font-bold text-[#e8f0fe] mr-2">{users}</span>
        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${colorClass}`}>{limit}</span>
      </div>
    </div>
    <div className="w-full h-1.5 bg-[#0a1628]/40 rounded-full overflow-hidden mt-2">
      <div className={`h-full ${colorClass.split(' ')[0].replace('text-', 'bg-')} bg-opacity-60`} style={{ width: `${(parseInt(users.replace(/,/g, '')) / 3000) * 100}%` }}></div>
    </div>
  </div>
);

export const ReportCard = ({ title, desc, icon }) => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 hover:border-gray-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer group hover:-translate-y-1 relative overflow-hidden animate-[scaleIn_0.4s_ease-out_both]">
    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full -z-0"></div>

    <div className="relative z-10 flex items-start justify-between mb-4">
      <div className="w-12 h-12 flex items-center justify-center bg-gray-50 group-hover:bg-blue-50 text-gray-500 group-hover:text-blue-600 rounded-xl transition-all duration-300 border border-gray-100 group-hover:border-blue-100 shadow-sm">
        {icon}
      </div>
      <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all duration-300">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
      </div>
    </div>

    <div className="relative z-10 mt-6">
      <h3 className="text-[16px] font-bold text-[#0f172a] mb-2 group-hover:text-blue-600 transition-colors">{title}</h3>
      <p className="text-[13px] text-gray-500 font-medium leading-relaxed line-clamp-2">{desc}</p>
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
          className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-[#0f172a]"
        >
          <HelpCircle size={16} className="inline-block text-[#3b82f6]" /> Training Materials
        </button>
        <button
          onClick={() => setShowVideoModal(true)}
          className="bg-white border border-gray-200 px-5 py-2.5 rounded-xl text-[13px] font-semibold hover:bg-gray-50 transition shadow-sm flex items-center gap-2 text-[#0f172a]"
        >
          <span className="text-[#3b82f6]">▶</span> Watch Training
        </button>
      </div>

      {/* Materials Modal */}
      {showMaterialsModal && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-[18px] font-bold text-[#0f172a]">About KapdeCRM</h2>
              <button onClick={() => setShowMaterialsModal(false)} className="text-gray-400 hover:text-gray-700 transition text-xl">×</button>
            </div>
            <div className="p-8 max-h-[70vh] overflow-y-auto prose prose-sm text-gray-600">
              <h3 className="text-xl font-bold text-[#0f172a] mb-4">Welcome to KapdeCRM</h3>
              <p className="mb-4 leading-relaxed">
                KapdeCRM is your all-in-one solution for managing a modern clothing business. From tracking leads and generating quotes, to managing inventory and overseeing manufacturing, our platform is designed to streamline your entire operational workflow.
              </p>

              <h4 className="font-bold text-[#0f172a] mt-6 mb-2">Key Modules</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Sales:</strong> Manage Quotes, Orders, Invoices, Proforma Invoices, and monitor Payment Recovery.</li>
                <li><strong>Operations:</strong> Track Inventory, oversee Manufacturing processes, manage Suppliers, and assign Tasks.</li>
                <li><strong>Network:</strong> Manage your Store, review advanced Reports, and connect with other businesses.</li>
              </ul>

              <div className="mt-8 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                <h4 className="font-bold text-[#3b82f6] mb-1">Need more help?</h4>
                <p className="text-blue-900 text-[13px]">Our support team is available 24/7. Use the "Support" module to log a ticket and we'll get back to you immediately.</p>
              </div>
            </div>
            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end">
              <button onClick={() => setShowMaterialsModal(false)} className="px-6 py-2.5 bg-[#0f172a] text-white rounded-xl text-[13px] font-semibold hover:bg-gray-800 transition shadow-sm">
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
              className="absolute top-4 right-4 z-10 w-8 h-8 bg-black/50 hover:bg-black/80 text-[#e8f0fe] rounded-full flex items-center justify-center transition"
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
