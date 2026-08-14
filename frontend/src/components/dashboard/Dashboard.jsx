import React, { useState } from 'react';
import { SidebarItem } from './DashboardComponents';
import {
  Users,
  Quote,
  ShoppingCart,
  FileText,
  IndianRupee,
  LifeBuoy,
  Globe,
  Box,
  Factory,
  ClipboardList,
  Search as SearchIcon,
  BarChart3,
  Store,
  LayoutDashboard,
  Sparkles
} from 'lucide-react';

// Page Imports
import Overview from './pages/Overview';
import Quotes from './pages/Quotes';
import Orders from './pages/Orders';
import Invoices from './pages/Invoices';
import Recovery from './pages/Recovery';
import Support from './pages/Support';
import Customers from './pages/Customers';
import Accounts from './pages/Accounts';
import Purchases from './pages/Purchases';
import PurchaseOrders from './pages/PurchaseOrders';
import Inventory from './pages/Inventory';
import Manufacturing from './pages/Manufacturing';
import Tasks from './pages/Tasks';
import Suppliers from './pages/Suppliers';
import Connections from './pages/Connections';
import YourStore from './pages/YourStore';
import Search from './pages/Search';
import Reports from './pages/Reports';
import Leads from './pages/Leads';
import Notifications from './pages/Notifications';
import UserAccount from './pages/UserAccount';
import CreateQuotation from './pages/CreateQuotation';
import CreateInvoice from './pages/CreateInvoice';
import CreateCreditNote from './pages/CreateCreditNote';
import CreditNotes from './pages/CreditNotes';
import ProformaInvoices from './pages/ProformaInvoices';
import CreateProformaInvoice from './pages/CreateProformaInvoice';
import CreateAppointment from './pages/CreateAppointment';
import CreateRecoveryEntry from './pages/CreateRecoveryEntry';
import CreateTicket from './pages/CreateTicket';
import CreateConnection from './pages/CreateConnection';
import AIInsights from './pages/AIInsights';

import CreateVoucher from './pages/CreateVoucher';
import CreateLead from './pages/CreateLead';
import CreateSupplierInvoice from './pages/CreateSupplierInvoice';
import CreateDebitNote from './pages/CreateDebitNote';
import CreatePurchaseOrder from './pages/CreatePurchaseOrder';
import { Bell } from "lucide-react";

export const Dashboard = ({ setView, currentUser, setCurrentUser }) => {
  const [activeTabState, setActiveTabState] = useState('Overview');
  const [previousTab, setPreviousTab] = useState('Overview');

  const activeTab = activeTabState;
  const setActiveTab = (newTab) => {
    setPreviousTab(activeTabState);
    setActiveTabState(newTab);
    setShowMobileSidebar(false); // Close sidebar on mobile when tab changes
  };

  const [plan, setPlan] = useState(currentUser?.plan || 'Starter'); // Starter, Professional, Business
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);











  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
      case 'CRM':
        return <Overview plan={plan} setPlan={setPlan} activeTab={activeTab} setActiveTab={setActiveTab} />;
      case 'Leads':
        return <Leads setActiveTab={setActiveTab} />;
      case 'CreateLead':
        return <CreateLead setActiveTab={setActiveTab} previousTab={previousTab} />;
      case 'Quotes':
        return <Quotes setActiveTab={setActiveTab} />;
      case 'CreateQuotation':
        return <CreateQuotation setActiveTab={setActiveTab} />;
      case 'Orders':
        return <Orders />;
      case 'Invoices':
        return <Invoices setActiveTab={setActiveTab} />;
      case 'CreateInvoice':
        return <CreateInvoice setActiveTab={setActiveTab} />;
      case 'CreditNotes':
        return <CreditNotes setActiveTab={setActiveTab} />;
      case 'CreateCreditNote':
        return <CreateCreditNote setActiveTab={setActiveTab} />;
      case 'Proforma Invoices':
        return <ProformaInvoices setActiveTab={setActiveTab} />;
      case 'CreateProformaInvoice':
        return <CreateProformaInvoice setActiveTab={setActiveTab} />;
      case 'CreateAppointment':
        return <CreateAppointment setActiveTab={setActiveTab} previousTab={previousTab} />;
      case 'CreateRecoveryEntry':
        return <CreateRecoveryEntry setActiveTab={setActiveTab} />;
      case 'Recovery':
        return <Recovery setActiveTab={setActiveTab} />;
      case 'Support':
        return <Support setActiveTab={setActiveTab} />;
      case 'CreateTicket':
        return <CreateTicket setActiveTab={setActiveTab} />;
      case 'CreateConnection':
        return <CreateConnection setActiveTab={setActiveTab} previousTab={previousTab} />;
      case 'Customers':
        return <Customers setActiveTab={setActiveTab} />;
      case 'Accounts':
        return <Accounts setActiveTab={setActiveTab} />;
      case 'CreateVoucher':
        return <CreateVoucher setActiveTab={setActiveTab} previousTab={previousTab} />;
      case 'Purchases':
        return <Purchases setActiveTab={setActiveTab} setEditingInvoice={setEditingInvoice} />;
      case 'CreateSupplierInvoice':
        return <CreateSupplierInvoice
          setActiveTab={setActiveTab}
          previousTab={previousTab}
          editData={editingInvoice}
          clearEdit={() => setEditingInvoice(null)}
        />;
      case 'CreateDebitNote':
        return <CreateDebitNote setActiveTab={setActiveTab} previousTab={previousTab} />;
      case 'Purch Orders':
        return <PurchaseOrders setActiveTab={setActiveTab} setEditingOrder={setEditingOrder} />;
      case 'CreatePurchaseOrder':
        return <CreatePurchaseOrder
          setActiveTab={setActiveTab}
          previousTab={previousTab}
          editData={editingOrder}
          clearEdit={() => setEditingOrder(null)}
        />;
      case 'Inventory':
        return <Inventory />;
      case 'Manufacturing':
        return <Manufacturing />;
      case 'Tasks':
        return <Tasks />;
      case 'Suppliers':
        return <Suppliers />;
      case 'Connections':
        return <Connections />;
      case 'Your Store':
        return <YourStore />;
      case 'Search':
        return <Search />;
      case 'Reports':
        return <Reports />;
      case 'Notifications':
        return <Notifications />;
      case 'AI Insights':
        return <AIInsights />;
      case 'User':
        return <UserAccount currentUser={currentUser} />;
      default:
        return <Overview plan={plan} setPlan={setPlan} activeTab={activeTab} setActiveTab={setActiveTab} />;
    }
  };

  const isLocked = (feature) => {
    // Business and Starter (5-Day Free Trial) have access to every function
    if (plan === 'Business' || plan === 'Starter') return false;

    // Professional Plan is limited
    if (plan === 'Professional') {
      const businessOnly = ['Manufacturing', 'Accounts', 'Connections', 'Your Store', 'Search', 'Reports', 'Recovery', 'Proforma Invoices'];
      return businessOnly.includes(feature);
    }
    return false;
  };

  return (
    <div className="flex min-h-screen font-sans text-[#1C1C1E] relative" style={{ background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 20%, #faf5ff 50%, #f5f3ff 80%, #faf5ff 100%)' }}>

      {/* Animated Soft Purple Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] left-[5%] w-[600px] h-[600px] rounded-full opacity-40 animate-pulse" style={{ background: 'radial-gradient(circle, #d8b4fe, transparent 70%)' }}></div>
        <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full opacity-30" style={{ background: 'radial-gradient(circle, #e9d5ff, transparent 70%)', animation: 'float 14s ease-in-out infinite reverse' }}></div>
        <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] rounded-full opacity-25" style={{ background: 'radial-gradient(circle, #c4b5fd, transparent 70%)', animation: 'float 10s ease-in-out infinite' }}></div>
        <div className="absolute top-[20%] left-[50%] w-[350px] h-[350px] rounded-full opacity-20" style={{ background: 'radial-gradient(circle, #ddd6fe, transparent 70%)', animation: 'float 16s ease-in-out infinite reverse' }}></div>
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {showMobileSidebar && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[45] md:hidden"
          onClick={() => setShowMobileSidebar(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 flex flex-col p-4 overflow-y-auto no-scrollbar shadow-sm bg-[#f3e8ff]/30 backdrop-blur-xl border-r border-[#a855f7]/10
          ${isCollapsed ? 'w-[80px]' : 'w-[260px]'} 
          ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >

        <div className="flex flex-col mb-10 px-2 pt-2">
          <div className={`flex ${isCollapsed ? 'flex-col gap-4 items-center' : 'items-center justify-between'} mb-2`}>
            {!isCollapsed && (
              <div className="flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
                <div className="w-8 h-8 bg-[#a855f7] rounded-lg flex items-center justify-center text-white font-bold text-[20px] shadow-sm">K</div>
                <span className="text-[22px] font-bold tracking-tight text-[#1C1C1E] whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>Kapde</span>
              </div>
            )}
            {isCollapsed && (
              <div className="w-8 h-8 bg-[#a855f7] rounded-lg flex items-center justify-center text-white font-bold text-[18px] shadow-sm mb-1">K</div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-lg hover:bg-[#f3e8ff] text-[#6B6B70] hover:text-[#a855f7] transition-all`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          {!isCollapsed && (
            <div className="text-[10px] text-[#6B6B70] tracking-[0.12em] uppercase font-bold animate-[fadeIn_0.3s_ease-out]" style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0.8 }}>
              Manage your clothing business
            </div>
          )}
        </div>

        <div className={`text-[11px] font-bold text-[#a855f7]/60 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
          {isCollapsed ? '•••' : 'Sales'}
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <SidebarItem icon={<LayoutDashboard size={18} />} label="Overview" active={activeTab === 'Overview'} onClick={() => setActiveTab('Overview')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<Sparkles size={18} />} label="AI Insights" active={activeTab === 'AI Insights'} onClick={() => setActiveTab('AI Insights')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<Quote size={18} />} label="Quotes" active={activeTab === 'Quotes'} onClick={() => setActiveTab('Quotes')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<ShoppingCart size={18} />} label="Orders" active={activeTab === 'Orders'} onClick={() => setActiveTab('Orders')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<FileText size={18} />} label="Invoices" active={activeTab === 'Invoices'} onClick={() => setActiveTab('Invoices')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<FileText size={18} />} label="Proforma Invoices" active={activeTab === 'Proforma Invoices'} onClick={() => setActiveTab('Proforma Invoices')} isCollapsed={isCollapsed} locked={isLocked('Proforma Invoices')} />
          <SidebarItem icon={<IndianRupee size={18} />} label="Recovery" active={activeTab === 'Recovery'} onClick={() => setActiveTab('Recovery')} isCollapsed={isCollapsed} locked={isLocked('Recovery')} />
          <SidebarItem icon={<LifeBuoy size={18} />} label="Support" active={activeTab === 'Support'} onClick={() => setActiveTab('Support')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<Users size={18} />} label="Customers" active={activeTab === 'Customers'} onClick={() => setActiveTab('Customers')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<ClipboardList size={18} />} label="Leads" active={activeTab === 'Leads'} onClick={() => setActiveTab('Leads')} isCollapsed={isCollapsed} locked={isLocked('Leads')} />
        </div>

        <div className={`text-[11px] font-bold text-[#a855f7]/60 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
          {isCollapsed ? '•••' : 'Operations'}
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <SidebarItem icon={<IndianRupee size={18} />} label="Accounts" active={activeTab === 'Accounts'} onClick={() => setActiveTab('Accounts')} isCollapsed={isCollapsed} locked={isLocked('Accounts')} />
          <SidebarItem icon={<ShoppingCart size={18} />} label="Purchases" active={activeTab === 'Purchases'} onClick={() => setActiveTab('Purchases')} isCollapsed={isCollapsed} locked={isLocked('Purchases')} />
          <SidebarItem icon={<ClipboardList size={18} />} label="Purch Orders" active={activeTab === 'Purch Orders'} onClick={() => setActiveTab('Purch Orders')} isCollapsed={isCollapsed} locked={isLocked('Purch Orders')} />
          <SidebarItem icon={<Box size={18} />} label="Inventory" active={activeTab === 'Inventory'} onClick={() => setActiveTab('Inventory')} isCollapsed={isCollapsed} />
          <SidebarItem icon={<Factory size={18} />} label="Manufacturing" active={activeTab === 'Manufacturing'} onClick={() => setActiveTab('Manufacturing')} isCollapsed={isCollapsed} locked={isLocked('Manufacturing')} />
          <SidebarItem icon={<ClipboardList size={18} />} label="Tasks" active={activeTab === 'Tasks'} onClick={() => setActiveTab('Tasks')} isCollapsed={isCollapsed} locked={isLocked('Tasks')} />
          <SidebarItem icon={<Users size={18} />} label="Suppliers" active={activeTab === 'Suppliers'} onClick={() => setActiveTab('Suppliers')} isCollapsed={isCollapsed} locked={isLocked('Suppliers')} />
        </div>

        <div className={`text-[11px] font-bold text-[#a855f7]/60 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
          {isCollapsed ? '•••' : 'Network'}
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <SidebarItem icon={<Globe size={18} />} label="Connections" active={activeTab === 'Connections'} onClick={() => setActiveTab('Connections')} isCollapsed={isCollapsed} locked={isLocked('Connections')} />
          <SidebarItem icon={<Store size={18} />} label="Your Store" active={activeTab === 'Your Store'} onClick={() => setActiveTab('Your Store')} isCollapsed={isCollapsed} locked={isLocked('Your Store')} />
          <SidebarItem icon={<SearchIcon size={18} />} label="Search" active={activeTab === 'Search'} onClick={() => setActiveTab('Search')} isCollapsed={isCollapsed} locked={isLocked('Search')} />
          <SidebarItem icon={<BarChart3 size={18} />} label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} isCollapsed={isCollapsed} locked={isLocked('Reports')} />
        </div>

        {plan !== 'Business' && !isCollapsed && (
          <div className="mx-2 mb-6 p-4 rounded-xl bg-gradient-to-br from-[#f3e8ff] to-[#ffffff] border border-[#d8b4fe] shadow-sm">
            <div className="text-[12px] font-bold text-[#9333ea] mb-1">
              {plan === 'Starter' ? 'Trial Period: 5 Days left' : 'Upgrade to Business'}
            </div>
            <div className="text-[10px] text-[#6B6B70] mb-3">
              {plan === 'Starter' ? 'Enjoy full access to all features' : 'Unlock Multi-Store & AI'}
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-2 bg-[#a855f7] text-white text-[11px] font-bold rounded-lg hover:bg-[#9333ea] transition shadow-md"
            >
              {plan === 'Starter' ? 'View Plans & Upgrade' : 'Upgrade Now'}
            </button>
          </div>
        )}

        <div
          className="mt-12 flex items-center gap-2 text-[#6B6B70] hover:bg-red-50 hover:text-red-500 px-4 py-2 rounded-lg cursor-pointer text-[14px] font-semibold transition"
          onClick={() => {
            if (setCurrentUser) setCurrentUser(null);
            setView('home');
          }}
        >
          <span>⎋</span>
          <span>Logout</span>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 relative z-10 p-4 md:p-8 pb-20 
        ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-[260px]'}
      `}>
        <header className="flex justify-between items-center mb-6 md:mb-10">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 bg-white/60 backdrop-blur-md rounded-lg text-[#a855f7] border border-[#a855f7]/20"
              onClick={() => setShowMobileSidebar(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-white/40 rounded-full px-3 md:px-4 py-1 md:py-1.5 shadow-sm">
              <span className="text-[10px] md:text-[13px] font-bold uppercase px-2 md:px-3 bg-[#a855f7]/10 text-[#a855f7] rounded-full py-0.5 border border-[#a855f7]/20">
                {plan === 'Starter' ? 'Trial' : `${plan}`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div
              onClick={() => setActiveTab('Notifications')}
              className={`flex items-center gap-1.5 text-[14px] font-medium cursor-pointer transition p-2 rounded-lg ${activeTab === 'Notifications' ? 'bg-[#a855f7]/10 text-[#a855f7]' : 'text-[#1C1C1E] hover:bg-white/40'}`}
            >
              <span className="text-lg"><Bell size={16} className="inline-block" /></span>
              <span className="bg-[#f43f5e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center -ml-3 -mt-3 border-2 border-white font-bold shadow-sm">2</span>
            </div>
            <div
              onClick={() => setActiveTab('User')}
              className={`flex items-center gap-3 cursor-pointer group p-1.5 pr-4 rounded-xl transition ${activeTab === 'User' ? 'bg-white/80 border border-[#d8b4fe] shadow-sm' : 'border border-white/20 bg-white/40 hover:bg-white/60'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition shadow-sm ${activeTab === 'User' ? 'bg-[#a855f7] text-white' : 'bg-white text-[#a855f7] border border-[#d8b4fe] group-hover:bg-[#a855f7] group-hover:text-white'}`}>
                {currentUser?.ownerName ? currentUser.ownerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
              </div>
              <div className="hidden md:block">
                <div className={`text-[14px] font-bold ${activeTab === 'User' ? 'text-[#9333ea]' : 'text-[#1C1C1E]'}`}>
                  {currentUser?.ownerName || 'John Doe'}
                </div>
                <div className="text-[11px] text-[#6B6B70] font-medium opacity-80 uppercase tracking-wide">
                  {currentUser?.shopName || 'User'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
      </div>

      {/* Upgrade Pricing Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#f0f0f0] bg-gradient-to-r from-[#f3e8ff] to-white flex justify-between items-center">
              <div>
                <h2 className="text-[22px] font-bold text-[#1C1C1E]">Choose Your Plan</h2>
                <p className="text-[13px] text-[#6B6B70] mt-1">Unlock more features to grow your clothing business</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="w-8 h-8 rounded-full bg-white border border-[#E2DED6] flex items-center justify-center text-[#6B6B70] hover:text-[#1C1C1E] hover:border-[#a855f7] transition text-lg">&times;</button>
            </div>

            {/* Pricing Cards */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Starter */}
              <div className={`rounded-xl p-6 border-2 transition-all ${plan === 'Starter' ? 'border-[#a855f7] bg-[#f3e8ff]/30 shadow-lg' : 'border-[#E2DED6] hover:border-[#d8b4fe]'}`}>
                <div className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider mb-1">Starter</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[36px] font-bold text-[#1C1C1E]">Free</span>
                </div>
                <div className="text-[12px] text-[#10b981] font-semibold mb-4">5-Day Free Trial</div>
                <div className="border-t border-[#f0f0f0] pt-4 mb-4">
                  <div className="text-[12px] font-bold text-[#1C1C1E] mb-3">Includes:</div>
                  <ul className="space-y-2 text-[13px] text-[#6B6B70]">
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Full Dashboard Access</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Up to 200 Customers</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> All Modules (Trial)</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Basic Reports</li>
                    <li className="flex items-center gap-2"><span className="text-[#ef4444]">✗</span> <span className="line-through opacity-60">Priority Support</span></li>
                    <li className="flex items-center gap-2"><span className="text-[#ef4444]">✗</span> <span className="line-through opacity-60">Multi-Store</span></li>
                  </ul>
                </div>
                {plan === 'Starter' ? (
                  <div className="w-full py-2.5 bg-[#f3e8ff] text-[#a855f7] text-[13px] font-bold rounded-lg text-center border border-[#d8b4fe]">Current Plan</div>
                ) : (
                  <button onClick={() => { setPlan('Starter'); setShowUpgradeModal(false); }} className="w-full py-2.5 bg-white text-[#6B6B70] text-[13px] font-bold rounded-lg border border-[#E2DED6] hover:border-[#a855f7] transition">Switch to Starter</button>
                )}
              </div>

              {/* Professional — Recommended */}
              <div className={`rounded-xl p-6 border-2 relative transition-all ${plan === 'Professional' ? 'border-[#a855f7] bg-[#f3e8ff]/30 shadow-lg' : 'border-[#a855f7]/50 hover:border-[#a855f7]'}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#a855f7] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Recommended</div>
                <div className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider mb-1">Professional</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[36px] font-bold text-[#1C1C1E]">₹999</span>
                  <span className="text-[14px] text-[#6B6B70] mb-1">/month</span>
                </div>
                <div className="text-[12px] text-[#a855f7] font-semibold mb-4">Save 20% on annual</div>
                <div className="border-t border-[#f0f0f0] pt-4 mb-4">
                  <div className="text-[12px] font-bold text-[#1C1C1E] mb-3">Everything in Starter, plus:</div>
                  <ul className="space-y-2 text-[13px] text-[#6B6B70]">
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Unlimited Customers</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Quotes & Invoicing</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Inventory Management</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Purchase Orders</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Priority Support</li>
                    <li className="flex items-center gap-2"><span className="text-[#ef4444]">✗</span> <span className="line-through opacity-60">Advanced Analytics</span></li>
                  </ul>
                </div>
                {plan === 'Professional' ? (
                  <div className="w-full py-2.5 bg-[#f3e8ff] text-[#a855f7] text-[13px] font-bold rounded-lg text-center border border-[#d8b4fe]">Current Plan</div>
                ) : (
                  <button onClick={() => { setPlan('Professional'); setShowUpgradeModal(false); }} className="w-full py-2.5 bg-[#a855f7] text-white text-[13px] font-bold rounded-lg hover:bg-[#9333ea] transition shadow-md">Upgrade to Professional</button>
                )}
              </div>

              {/* Business */}
              <div className={`rounded-xl p-6 border-2 transition-all ${plan === 'Business' ? 'border-[#a855f7] bg-[#f3e8ff]/30 shadow-lg' : 'border-[#E2DED6] hover:border-[#d8b4fe]'}`}>
                <div className="text-[11px] font-bold text-[#6B6B70] uppercase tracking-wider mb-1">Business</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[36px] font-bold text-[#1C1C1E]">₹2,499</span>
                  <span className="text-[14px] text-[#6B6B70] mb-1">/month</span>
                </div>
                <div className="text-[12px] text-[#a855f7] font-semibold mb-4">Best for growing teams</div>
                <div className="border-t border-[#f0f0f0] pt-4 mb-4">
                  <div className="text-[12px] font-bold text-[#1C1C1E] mb-3">Everything in Professional, plus:</div>
                  <ul className="space-y-2 text-[13px] text-[#6B6B70]">
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Advanced Analytics & Reports</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Manufacturing Module</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Multi-Store Management</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> AI-Powered Insights</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Global Connections</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Dedicated Account Manager</li>
                  </ul>
                </div>
                {plan === 'Business' ? (
                  <div className="w-full py-2.5 bg-[#f3e8ff] text-[#a855f7] text-[13px] font-bold rounded-lg text-center border border-[#d8b4fe]">Current Plan</div>
                ) : (
                  <button onClick={() => { setPlan('Business'); setShowUpgradeModal(false); }} className="w-full py-2.5 bg-gradient-to-r from-[#a855f7] to-[#7c3aed] text-white text-[13px] font-bold rounded-lg hover:from-[#9333ea] hover:to-[#6d28d9] transition shadow-md">Upgrade to Business</button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 pb-6 flex items-center justify-between border-t border-[#f0f0f0] pt-4">
              <div className="flex items-center gap-2 text-[12px] text-[#6B6B70]">
                <span className="text-[#10b981]">🔒</span> Secure payment · Cancel anytime · 30-day money-back guarantee
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-[13px] font-bold text-[#6B6B70] hover:text-[#a855f7] transition">Maybe Later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
