import React from 'react';
import { User, Building, Shield, Plug, ShoppingCart, Truck, Phone } from "lucide-react";

const SettingCard = ({ title, subtitle, icon, children }) => (
  <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-8 shadow-sm flex flex-col gap-6">
    <div className="flex justify-between items-start">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#0a1628] flex items-center justify-center text-xl border border-[#93c5fd] text-[#3b82f6] shadow-inner">
          {icon}
        </div>
        <div>
          <h3 className="text-[17px] font-bold text-[#e8f0fe]">{title}</h3>
          <p className="text-[13px] text-[#93c5fd] mt-0.5">{subtitle}</p>
        </div>
      </div>
      <button className="text-[14px] font-bold text-[#3b82f6] hover:bg-[#132847] px-4 py-2 rounded-lg transition-all border border-[#0a1628]">Edit</button>
    </div>
    <div className="pt-2 border-t border-[#fcfcfc]">
      {children}
    </div>
  </div>
);

const UserAccount = ({ currentUser }) => {
  return (
    <div className="animate-[slideUpFade_0.4s_ease-out]">
      <div className="mb-10">
        <h1 className="text-[20px] font-bold text-[#e8f0fe]">My Account</h1>
        <p className="text-[#93c5fd] text-[13px] mt-1">Manage your identity, organization, and profile settings</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
        {/* Profile Card */}
        <SettingCard title="User Identity" subtitle="Manage your personal information and roles" icon={<User size={20} />}>
          <div className="flex flex-col gap-6 mt-4">
            <div className="flex items-center gap-6 pb-6 border-b border-[#f9f9f9]">
              <div className="w-20 h-20 rounded-full bg-[#0a1628] border-2 border-[#3b82f6] flex items-center justify-center text-[#3b82f6] text-[24px] font-bold shadow-md">
                {currentUser?.ownerName ? currentUser.ownerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'US'}
              </div>
              <div>
                <h4 className="text-[18px] font-bold text-[#e8f0fe]">{currentUser?.ownerName || 'Boutique Owner'}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#0a1628] text-[#3b82f6] text-[11px] font-bold px-2 py-0.5 rounded uppercase border border-[#93c5fd]">
                    {currentUser?.role === 'admin' ? 'System Admin' : 'Shop Owner'}
                  </span>
                  <span className="text-[13px] text-[#93c5fd] font-medium italic opacity-70">
                    UID: {currentUser?.id ? currentUser.id.slice(-6).toUpperCase() : '482910'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">Email Address</label>
                <p className="text-[15px] font-bold text-[#e8f0fe] mt-1">{currentUser?.email || 'not.configured@kapdecrm.com'}</p>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">Phone Number</label>
                <p className="text-[15px] font-bold text-[#e8f0fe] mt-1">{currentUser?.mobile ? `+91 ${currentUser.mobile}` : 'Not Configured'}</p>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">Language</label>
                <p className="text-[15px] font-bold text-[#e8f0fe] mt-1">English (Professional)</p>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">Timezone</label>
                <p className="text-[15px] font-bold text-[#e8f0fe] mt-1">IST (UTC +5:30)</p>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Organization Card */}
        <SettingCard title="Organization Info" subtitle="Business and branding configuration" icon={<Building size={20} />}>
          <div className="flex flex-col gap-6 mt-4">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">Business Name</label>
                <div className="flex items-center gap-4 mt-1">
                   <div className="w-10 h-10 bg-[#3b82f6] rounded flex items-center justify-center text-[#e8f0fe] font-bold text-lg">
                     {currentUser?.shopName ? currentUser.shopName[0].toUpperCase() : 'K'}
                   </div>
                   <p className="text-[16px] font-bold text-[#e8f0fe]">{currentUser?.shopName || 'Kapde Clothing Enterprise'}</p>
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">GSTIN / Tax ID</label>
                <p className="text-[15px] font-bold text-[#e8f0fe] mt-1 italic opacity-60">Not Configured</p>
              </div>
              <div>
                <label className="text-[11px] font-bold text-[#93c5fd] uppercase">Active Plan</label>
                <p className="text-[15px] font-bold text-[#2563eb] mt-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#2563eb]"></span>
                  {currentUser?.plan || 'Starter'} Subscription Plan
                </p>
              </div>
            </div>
          </div>
        </SettingCard>

        {/* Security Card */}
        <SettingCard title="Security & Login" subtitle="Passwords and active sessions" icon={<Shield size={20} />}>
          <div className="flex flex-col gap-5 mt-4">
             <div className="flex items-center justify-between p-4 bg-[#05080f] rounded-xl border border-[#1e3a5f]">
                <div className="flex items-center gap-3">
                   <span className="bg-[#ecfdf5] text-[#10b981] px-2 py-0.5 rounded text-[10px] font-bold uppercase">Active</span>
                   <p className="text-[14px] font-bold text-[#e8f0fe]">2-Step Verification</p>
                </div>
                <button className="text-[12px] font-bold text-[#93c5fd] hover:text-[#ef4444]">Disable</button>
             </div>
             <div className="flex items-center justify-between p-4 bg-[#05080f] rounded-xl border border-[#1e3a5f]">
                <p className="text-[14px] font-bold text-[#e8f0fe]">Last Password Change</p>
                <p className="text-[13px] text-[#93c5fd] font-medium">12 days ago</p>
             </div>
          </div>
        </SettingCard>

        {/* Integration Card */}
        <SettingCard title="Integrations" subtitle="Connected apps and marketplace" icon={<Plug size={20} />}>
          <div className="flex gap-4 mt-4">
             <div className="w-12 h-12 rounded-full bg-[#f9f9f9] border border-[#1e3a5f] flex items-center justify-center text-lg filter grayscale opacity-50"><ShoppingCart size={16} className="inline-block" /></div>
             <div className="w-12 h-12 rounded-full bg-[#f9f9f9] border border-[#1e3a5f] flex items-center justify-center text-lg filter grayscale opacity-50"><Truck size={16} className="inline-block" /></div>
             <div className="w-12 h-12 rounded-full bg-[#f9f9f9] border border-[#1e3a5f] flex items-center justify-center text-lg filter grayscale opacity-50"><Phone size={16} className="inline-block" /></div>
             <button className="flex-1 border-2 border-dashed border-[#1e3a5f] rounded-xl text-[12px] font-bold text-[#93c5fd] hover:border-[#3b82f6] hover:text-[#3b82f6] transition-all">+ Connect Store</button>
          </div>
        </SettingCard>
      </div>
    </div>
  );
};

export default UserAccount;
