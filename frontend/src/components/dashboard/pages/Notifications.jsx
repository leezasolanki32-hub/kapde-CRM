import React from 'react';
import { ShoppingBag, AlertTriangle } from "lucide-react";

const NotificationItem = ({ title, desc, time, type, isNew }) => (
  <div className={`p-6 border-b border-[#1e3a5f] hover:bg-[#132847] transition-all cursor-pointer flex items-start gap-4 ${isNew ? 'bg-[#1a2d4f]' : ''}`}>
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xl border ${
      type === 'order' ? 'bg-[#ecfdf5] border-[#10b981] text-[#10b981]' : 
      type === 'alert' ? 'bg-[#fff1f2] border-[#f43f5e] text-[#f43f5e]' : 
      'bg-[#0a1628] border-[#3b82f6] text-[#3b82f6]'
    }`}>
      {type === 'order' ? <ShoppingBag size={16} className="inline-block" /> : type === 'alert' ? <AlertTriangle size={16} className="inline-block" /> : 'ℹ️'}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h4 className={`text-[15px] font-bold ${isNew ? 'text-[#e8f0fe]' : 'text-[#93c5fd]'}`}>
          {title}
        </h4>
        <span className="text-[12px] text-[#93c5fd]">{time}</span>
      </div>
      <p className="text-[13px] text-[#93c5fd] mt-1 leading-relaxed">
        {desc}
      </p>
    </div>
    {isNew && <div className="w-2 h-2 rounded-full bg-[#3b82f6] mt-2 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div>}
  </div>
);

const Notifications = () => {
  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-[20px] font-bold text-[#e8f0fe]">Notifications</h1>
          <p className="text-[#93c5fd] text-[13px] mt-1">Manage your system alerts and business updates</p>
        </div>
        <button className="text-[13px] font-bold text-[#3b82f6] hover:underline px-4 py-2">Mark all as read</button>
      </div>

      <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl shadow-sm overflow-hidden mb-10">
        <div className="bg-[#0a1628] border-b border-[#1e3a5f] px-6 py-4 flex items-center gap-6">
          <span className="text-[13px] font-bold text-[#3b82f6] border-b-2 border-[#3b82f6] pb-4 -mb-4 cursor-pointer">All Activity</span>
          <span className="text-[13px] font-bold text-[#93c5fd] hover:text-[#e8f0fe] cursor-pointer">Orders</span>
          <span className="text-[13px] font-bold text-[#93c5fd] hover:text-[#e8f0fe] cursor-pointer">Inventory</span>
          <span className="text-[13px] font-bold text-[#93c5fd] hover:text-[#e8f0fe] cursor-pointer">Leads</span>
        </div>

        <NotificationItem 
          title="Stock Level Alert: Lavender Blazer" 
          desc="Inventory for 'Lavender Blazer (L)' has dropped below critical levels. 5 units remaining." 
          time="2h ago" 
          type="alert" 
          isNew={true} 
        />
        <NotificationItem 
          title="New High-Value Order" 
          desc="Priya R. has successfully placed a new order of ₹12,400 for the Summer Collection." 
          time="4h ago" 
          type="order" 
          isNew={true} 
        />
        <NotificationItem 
          title="VIP Status Update" 
          desc="Arjun M. has been automatically upgraded to VIP level based on purchase history." 
          time="6h ago" 
          type="info" 
          isNew={false} 
        />
        <NotificationItem 
          title="System Maintenance" 
          desc="Scheduled backup and performance optimization will occur at 2:00 AM tonight." 
          time="Yesterday" 
          type="info" 
          isNew={false} 
        />
        <NotificationItem 
          title="Campaign Results Live" 
          desc="Your 'Summer Flash Sale' report is now available for review in the Reports section." 
          time="Yesterday" 
          type="order" 
          isNew={false} 
        />
      </div>
      
      <div className="flex justify-center">
        <button className="bg-[#0a1628] border border-[#1e3a5f] text-[#0a1628] px-8 py-3 rounded-xl text-[14px] font-bold hover:bg-[#f9f9f9] transition-all shadow-sm">
          Load Previous Notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;
