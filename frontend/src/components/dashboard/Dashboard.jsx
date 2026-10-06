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
        return <Overview plan={plan} setPlan={setPlan} activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'Leads':
        return <Leads setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateLead':
        return <CreateLead setActiveTab={setActiveTab} previousTab={previousTab} currentUser={currentUser} />;
      case 'Quotes':
        return <Quotes setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateQuotation':
        return <CreateQuotation setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'Orders':
        return <Orders currentUser={currentUser} />;
      case 'Invoices':
        return <Invoices setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateInvoice':
        return <CreateInvoice setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreditNotes':
        return <CreditNotes setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateCreditNote':
        return <CreateCreditNote setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'Proforma Invoices':
        return <ProformaInvoices setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateProformaInvoice':
        return <CreateProformaInvoice setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateAppointment':
        return <CreateAppointment setActiveTab={setActiveTab} previousTab={previousTab} currentUser={currentUser} />;
      case 'CreateRecoveryEntry':
        return <CreateRecoveryEntry setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'Recovery':
        return <Recovery setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'Support':
        return <Support setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateTicket':
        return <CreateTicket setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateConnection':
        return <CreateConnection setActiveTab={setActiveTab} previousTab={previousTab} currentUser={currentUser} />;
      case 'Customers':
        return <Customers setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'Accounts':
        return <Accounts setActiveTab={setActiveTab} currentUser={currentUser} />;
      case 'CreateVoucher':
        return <CreateVoucher setActiveTab={setActiveTab} previousTab={previousTab} currentUser={currentUser} />;
      case 'Purchases':
        return <Purchases setActiveTab={setActiveTab} setEditingInvoice={setEditingInvoice} currentUser={currentUser} />;
      case 'CreateSupplierInvoice':
        return <CreateSupplierInvoice
          setActiveTab={setActiveTab}
          previousTab={previousTab}
          editData={editingInvoice}
          clearEdit={() => setEditingInvoice(null)}
        />;
      case 'CreateDebitNote':
        return <CreateDebitNote setActiveTab={setActiveTab} previousTab={previousTab} currentUser={currentUser} />;
      case 'Purch Orders':
        return <PurchaseOrders setActiveTab={setActiveTab} setEditingOrder={setEditingOrder} currentUser={currentUser} />;
      case 'CreatePurchaseOrder':
        return <CreatePurchaseOrder
          setActiveTab={setActiveTab}
          previousTab={previousTab}
          editData={editingOrder}
          clearEdit={() => setEditingOrder(null)}
        />;
      case 'Inventory':
        return <Inventory currentUser={currentUser} />;
      case 'Manufacturing':
        return <Manufacturing currentUser={currentUser} />;
      case 'Tasks':
        return <Tasks currentUser={currentUser} />;
      case 'Suppliers':
        return <Suppliers currentUser={currentUser} />;
      case 'Connections':
        return <Connections currentUser={currentUser} />;
      case 'Your Store':
        return <YourStore currentUser={currentUser} />;
      case 'Search':
        return <Search currentUser={currentUser} />;
      case 'Reports':
        return <Reports currentUser={currentUser} />;
      case 'Notifications':
        return <Notifications currentUser={currentUser} />;
      case 'AI Insights':
        return <AIInsights currentUser={currentUser} />;
      case 'User':
        return <UserAccount currentUser={currentUser} />;
      default:
        return <Overview plan={plan} setPlan={setPlan} activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser} />;
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
    <div className="flex min-h-screen font-sans text-[#e8f0fe] relative bg-[#0a1628]">

      {/* Animated Soft Blue Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
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
        className={`fixed top-0 bottom-0 left-0 z-50 transition-all duration-300 flex flex-col p-4 overflow-y-auto no-scrollbar shadow-sm bg-[#0a1628]/30 backdrop-blur-xl border-r border-[#3b82f6]/10
          ${isCollapsed ? 'w-[80px]' : 'w-[260px]'} 
          ${showMobileSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >

        <div className="flex flex-col mb-10 px-2 pt-2">
          <div className={`flex ${isCollapsed ? 'flex-col gap-4 items-center' : 'items-center justify-between'} mb-2`}>
            {!isCollapsed && (
              <div className="flex items-center gap-2 animate-[fadeIn_0.3s_ease-out]">
                <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center text-[#e8f0fe] font-bold text-[20px] shadow-sm">K</div>
                <span className="text-[22px] font-bold tracking-tight text-[#e8f0fe] whitespace-nowrap" style={{ fontFamily: "'Playfair Display', serif" }}>Kapde</span>
              </div>
            )}
            {isCollapsed && (
              <div className="w-8 h-8 bg-[#3b82f6] rounded-lg flex items-center justify-center text-[#e8f0fe] font-bold text-[18px] shadow-sm mb-1">K</div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-1.5 rounded-lg hover:bg-[#0a1628] text-[#93c5fd] hover:text-[#3b82f6] transition-all`}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>
          {!isCollapsed && (
            <div className="text-[10px] text-[#93c5fd] tracking-[0.12em] uppercase font-bold animate-[fadeIn_0.3s_ease-out]" style={{ fontFamily: "'DM Sans', sans-serif", opacity: 0.8 }}>
              Manage your clothing business
            </div>
          )}
        </div>

        <div className={`text-[11px] font-bold text-[#3b82f6]/60 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
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

        <div className={`text-[11px] font-bold text-[#3b82f6]/60 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
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

        <div className={`text-[11px] font-bold text-[#3b82f6]/60 uppercase tracking-wider mb-2 ${isCollapsed ? 'text-center' : 'px-4'}`}>
          {isCollapsed ? '•••' : 'Network'}
        </div>
        <div className="flex flex-col gap-1 mb-6">
          <SidebarItem icon={<Globe size={18} />} label="Connections" active={activeTab === 'Connections'} onClick={() => setActiveTab('Connections')} isCollapsed={isCollapsed} locked={isLocked('Connections')} />
          <SidebarItem icon={<Store size={18} />} label="Your Store" active={activeTab === 'Your Store'} onClick={() => setActiveTab('Your Store')} isCollapsed={isCollapsed} locked={isLocked('Your Store')} />
          <SidebarItem icon={<SearchIcon size={18} />} label="Search" active={activeTab === 'Search'} onClick={() => setActiveTab('Search')} isCollapsed={isCollapsed} locked={isLocked('Search')} />
          <SidebarItem icon={<BarChart3 size={18} />} label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} isCollapsed={isCollapsed} locked={isLocked('Reports')} />
        </div>

        {plan !== 'Business' && !isCollapsed && (
          <div className="mx-2 mb-6 p-4 rounded-xl bg-gradient-to-br from-[#0a1628] to-[#ffffff] border border-[#93c5fd] shadow-sm">
            <div className="text-[12px] font-bold text-[#2563eb] mb-1">
              {plan === 'Starter' ? 'Trial Period: 5 Days left' : 'Upgrade to Business'}
            </div>
            <div className="text-[10px] text-[#93c5fd] mb-3">
              {plan === 'Starter' ? 'Enjoy full access to all features' : 'Unlock Multi-Store & AI'}
            </div>
            <button
              onClick={() => setShowUpgradeModal(true)}
              className="w-full py-2 bg-[#3b82f6] text-[#e8f0fe] text-[11px] font-bold rounded-lg hover:bg-[#2563eb] transition shadow-md"
            >
              {plan === 'Starter' ? 'View Plans & Upgrade' : 'Upgrade Now'}
            </button>
          </div>
        )}

        <div
          className="mt-12 flex items-center gap-2 text-[#93c5fd] hover:bg-red-50 hover:text-red-500 px-4 py-2 rounded-lg cursor-pointer text-[14px] font-semibold transition"
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
      <div className={`flex-1 transition-all duration-300 relative z-10 p-4 md:p-8 
        ${isCollapsed ? 'md:ml-[80px]' : 'md:ml-[260px]'}
      `}>
        <div className="bg-[#f8f9fa] w-full min-h-[calc(100vh-64px)] rounded-[32px] overflow-hidden p-6 md:p-8 text-[#0f172a] shadow-xl">
        <header className="flex justify-between items-center mb-0 md:mb-2 min-h-[40px]">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 bg-[#0a1628]/60 backdrop-blur-md rounded-lg text-[#3b82f6] border border-[#3b82f6]/20"
              onClick={() => setShowMobileSidebar(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-6">
            <div
              onClick={() => setActiveTab('Notifications')}
              className={`flex items-center gap-1.5 text-[14px] font-medium cursor-pointer transition p-2 rounded-lg ${activeTab === 'Notifications' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' : 'text-[#64748b] hover:bg-gray-100'}`}
            >
              <span className="text-lg"><Bell size={16} className="inline-block" /></span>
              <span className="bg-[#f43f5e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center -ml-3 -mt-3 border-2 border-white font-bold shadow-sm">2</span>
            </div>
            <div
              onClick={() => setActiveTab('User')}
              className={`flex items-center gap-3 cursor-pointer group p-1.5 pr-4 rounded-xl transition ${activeTab === 'User' ? 'bg-white border border-[#3b82f6]/30 shadow-sm' : 'border border-gray-200 bg-white hover:border-[#3b82f6]/30'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold transition shadow-sm ${activeTab === 'User' ? 'bg-[#3b82f6] text-white' : 'bg-[#f1f5f9] text-[#3b82f6] border border-gray-200 group-hover:bg-[#3b82f6] group-hover:text-white'}`}>
                {currentUser?.ownerName ? currentUser.ownerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'JD'}
              </div>
              <div className="hidden md:block">
                <div className={`text-[14px] font-bold ${activeTab === 'User' ? 'text-[#3b82f6]' : 'text-[#0f172a]'}`}>
                  {currentUser?.ownerName || 'John Doe'}
                </div>
                <div className="text-[11px] text-[#64748b] font-medium uppercase tracking-wide">
                  {currentUser?.shopName || 'User'}
                </div>
              </div>
            </div>
          </div>
        </header>

        {renderContent()}
        </div>
      </div>

      {/* Upgrade Pricing Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0a1628] rounded-2xl w-full max-w-4xl shadow-2xl animate-[scaleIn_0.2s_ease-out] overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b border-[#1e3a5f] bg-gradient-to-r from-[#0a1628] to-[#05080f] flex justify-between items-center">
              <div>
                <h2 className="text-[22px] font-bold text-[#e8f0fe]">Choose Your Plan</h2>
                <p className="text-[13px] text-[#93c5fd] mt-1">Unlock more features to grow your clothing business</p>
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="w-8 h-8 rounded-full bg-[#0a1628] border border-[#1e3a5f] flex items-center justify-center text-[#93c5fd] hover:text-[#e8f0fe] hover:border-[#3b82f6] transition text-lg">&times;</button>
            </div>

            {/* Pricing Cards */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Starter */}
              <div className={`rounded-xl p-6 border-2 transition-all ${plan === 'Starter' ? 'border-[#3b82f6] bg-[#0a1628]/30 shadow-lg' : 'border-[#1e3a5f] hover:border-[#93c5fd]'}`}>
                <div className="text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider mb-1">Starter</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[36px] font-bold text-[#e8f0fe]">Free</span>
                </div>
                <div className="text-[12px] text-[#10b981] font-semibold mb-4">5-Day Free Trial</div>
                <div className="border-t border-[#1e3a5f] pt-4 mb-4">
                  <div className="text-[12px] font-bold text-[#e8f0fe] mb-3">Includes:</div>
                  <ul className="space-y-2 text-[13px] text-[#93c5fd]">
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Full Dashboard Access</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Up to 200 Customers</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> All Modules (Trial)</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Basic Reports</li>
                    <li className="flex items-center gap-2"><span className="text-[#ef4444]">✗</span> <span className="line-through opacity-60">Priority Support</span></li>
                    <li className="flex items-center gap-2"><span className="text-[#ef4444]">✗</span> <span className="line-through opacity-60">Multi-Store</span></li>
                  </ul>
                </div>
                {plan === 'Starter' ? (
                  <div className="w-full py-2.5 bg-[#0a1628] text-[#3b82f6] text-[13px] font-bold rounded-lg text-center border border-[#93c5fd]">Current Plan</div>
                ) : (
                  <button onClick={() => { setPlan('Starter'); setShowUpgradeModal(false); }} className="w-full py-2.5 bg-[#0a1628] text-[#93c5fd] text-[13px] font-bold rounded-lg border border-[#1e3a5f] hover:border-[#3b82f6] transition">Switch to Starter</button>
                )}
              </div>

              {/* Professional — Recommended */}
              <div className={`rounded-xl p-6 border-2 relative transition-all ${plan === 'Professional' ? 'border-[#3b82f6] bg-[#0a1628]/30 shadow-lg' : 'border-[#3b82f6]/50 hover:border-[#3b82f6]'}`}>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#3b82f6] text-[#e8f0fe] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">Recommended</div>
                <div className="text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider mb-1">Professional</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[36px] font-bold text-[#e8f0fe]">₹999</span>
                  <span className="text-[14px] text-[#93c5fd] mb-1">/month</span>
                </div>
                <div className="text-[12px] text-[#3b82f6] font-semibold mb-4">Save 20% on annual</div>
                <div className="border-t border-[#1e3a5f] pt-4 mb-4">
                  <div className="text-[12px] font-bold text-[#e8f0fe] mb-3">Everything in Starter, plus:</div>
                  <ul className="space-y-2 text-[13px] text-[#93c5fd]">
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Unlimited Customers</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Quotes & Invoicing</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Inventory Management</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Purchase Orders</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Priority Support</li>
                    <li className="flex items-center gap-2"><span className="text-[#ef4444]">✗</span> <span className="line-through opacity-60">Advanced Analytics</span></li>
                  </ul>
                </div>
                {plan === 'Professional' ? (
                  <div className="w-full py-2.5 bg-[#0a1628] text-[#3b82f6] text-[13px] font-bold rounded-lg text-center border border-[#93c5fd]">Current Plan</div>
                ) : (
                  <button onClick={() => { setPlan('Professional'); setShowUpgradeModal(false); }} className="w-full py-2.5 bg-[#3b82f6] text-[#e8f0fe] text-[13px] font-bold rounded-lg hover:bg-[#2563eb] transition shadow-md">Upgrade to Professional</button>
                )}
              </div>

              {/* Business */}
              <div className={`rounded-xl p-6 border-2 transition-all ${plan === 'Business' ? 'border-[#3b82f6] bg-[#0a1628]/30 shadow-lg' : 'border-[#1e3a5f] hover:border-[#93c5fd]'}`}>
                <div className="text-[11px] font-bold text-[#93c5fd] uppercase tracking-wider mb-1">Business</div>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-[36px] font-bold text-[#e8f0fe]">₹2,499</span>
                  <span className="text-[14px] text-[#93c5fd] mb-1">/month</span>
                </div>
                <div className="text-[12px] text-[#3b82f6] font-semibold mb-4">Best for growing teams</div>
                <div className="border-t border-[#1e3a5f] pt-4 mb-4">
                  <div className="text-[12px] font-bold text-[#e8f0fe] mb-3">Everything in Professional, plus:</div>
                  <ul className="space-y-2 text-[13px] text-[#93c5fd]">
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Advanced Analytics & Reports</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Manufacturing Module</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Multi-Store Management</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> AI-Powered Insights</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Global Connections</li>
                    <li className="flex items-center gap-2"><span className="text-[#10b981]">✓</span> Dedicated Account Manager</li>
                  </ul>
                </div>
                {plan === 'Business' ? (
                  <div className="w-full py-2.5 bg-[#0a1628] text-[#3b82f6] text-[13px] font-bold rounded-lg text-center border border-[#93c5fd]">Current Plan</div>
                ) : (
                  <button onClick={() => { setPlan('Business'); setShowUpgradeModal(false); }} className="w-full py-2.5 bg-gradient-to-r from-[#3b82f6] to-[#1d4ed8] text-[#e8f0fe] text-[13px] font-bold rounded-lg hover:from-[#2563eb] hover:to-[#6d28d9] transition shadow-md">Upgrade to Business</button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 pb-6 flex items-center justify-between border-t border-[#1e3a5f] pt-4">
              <div className="flex items-center gap-2 text-[12px] text-[#93c5fd]">
                <span className="text-[#10b981]">🔒</span> Secure payment · Cancel anytime · 30-day money-back guarantee
              </div>
              <button onClick={() => setShowUpgradeModal(false)} className="text-[13px] font-bold text-[#93c5fd] hover:text-[#3b82f6] transition">Maybe Later</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
