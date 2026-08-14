import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Trash2, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Database, 
  TrendingUp, 
  LogOut, 
  ChevronDown, 
  Check, 
  X, 
  Award, 
  Activity, 
  Sparkles, 
  Clock,
  Coins,
  ShoppingCart,
  Calendar
} from 'lucide-react';
import { API_ADMIN_URL } from '../../config';

export const AdminDashboard = ({ setView, currentUser, setCurrentUser }) => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    premium: 0,
    trial: 0,
    newThisWeek: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [updatingPlanUserId, setUpdatingPlanUserId] = useState(null);

  // Shop Orders & Revenue Stats
  const [orders, setOrders] = useState([]);
  const [dailyStats, setDailyStats] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState('');
  const [activeTab, setActiveTab] = useState('boutiques'); // 'boutiques' or 'orders'
  const [ordersSearchQuery, setOrdersSearchQuery] = useState('');
  
  // Custom Confirmation Modal State
  const [userToDelete, setUserToDelete] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Verification Credentials Headers
  const getAdminHeaders = () => ({
    'Content-Type': 'application/json',
    'x-admin-email': 'freeeebird03@gmail.com',
    'x-admin-password': 'Leeza@2210202'
  });

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_ADMIN_URL}/users`, {
        method: 'GET',
        headers: getAdminHeaders()
      });
      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
        
        // Calculate Statistics
        const premiumCount = data.users.filter(u => u.plan === 'Professional' || u.plan === 'Business').length;
        const trialCount = data.users.filter(u => !u.plan || u.plan === 'Starter').length;
        
        // Mocking new users count this week based on creation date within 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const newThisWeekCount = data.users.filter(u => new Date(u.createdAt) > sevenDaysAgo).length;

        setStats({
          total: data.totalUsers,
          premium: premiumCount,
          trial: trialCount,
          newThisWeek: newThisWeekCount
        });
      } else {
        setError(data.message || 'Failed to retrieve registered users.');
      }
    } catch (err) {
      setError('Connection to admin server failed. Please ensure the backend is running.');
      console.error('[ADMIN] Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    setOrdersLoading(true);
    setOrdersError('');
    try {
      const response = await fetch(`${API_ADMIN_URL}/orders`, {
        method: 'GET',
        headers: getAdminHeaders()
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.orders);
        setDailyStats(data.dailyStats);
        setTotalRevenue(data.totalRevenue);
      } else {
        setOrdersError(data.message || 'Failed to retrieve orders.');
      }
    } catch (err) {
      setOrdersError('Connection to admin server failed. Please ensure the backend is running.');
      console.error('[ADMIN] Fetch orders error:', err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    // Security check: Only allow admin email
    if (!currentUser || (currentUser.email !== 'freeeebird03@gmail.com' && currentUser.role !== 'admin')) {
      setView('home');
      return;
    }
    fetchUsers();
    fetchOrders();
  }, [currentUser]);

  const togglePasswordVisibility = (userId) => {
    setVisiblePasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const handleUpdatePlan = async (userId, newPlan) => {
    setUpdatingPlanUserId(userId);
    try {
      const response = await fetch(`${API_ADMIN_URL}/users/${userId}`, {
        method: 'PUT',
        headers: getAdminHeaders(),
        body: JSON.stringify({ plan: newPlan })
      });
      const data = await response.json();

      if (data.success) {
        // Update local state
        setUsers(prevUsers => 
          prevUsers.map(user => 
            user.id === userId ? { ...user, plan: newPlan } : user
          )
        );
        // Refresh Stats
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, plan: newPlan } : user
        );
        const premiumCount = updatedUsers.filter(u => u.plan === 'Professional' || u.plan === 'Business').length;
        const trialCount = updatedUsers.filter(u => !u.plan || u.plan === 'Starter').length;
        setStats(prev => ({
          ...prev,
          premium: premiumCount,
          trial: trialCount
        }));
      } else {
        alert(data.message || 'Failed to update plan.');
      }
    } catch (err) {
      console.error('[ADMIN] Plan Update Error:', err);
      alert('Failed to connect to backend to update plan.');
    } finally {
      setUpdatingPlanUserId(null);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    // Safety check - make them type "DELETE" to prevent accidental clicks
    if (deleteConfirmText.toUpperCase() !== 'DELETE') {
      setDeleteError('Please type "DELETE" to confirm.');
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    try {
      const response = await fetch(`${API_ADMIN_URL}/users/${userToDelete.id}`, {
        method: 'DELETE',
        headers: getAdminHeaders()
      });
      const data = await response.json();

      if (data.success) {
        // Success: Close modal, clear state, refresh data
        setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
        setUserToDelete(null);
        setDeleteConfirmText('');
        fetchUsers(); // Refresh complete stats
      } else {
        setDeleteError(data.message || 'Failed to delete user.');
      }
    } catch (err) {
      console.error('[ADMIN] Delete User Error:', err);
      setDeleteError('Failed to connect to server to delete account.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = () => {
    if (setCurrentUser) setCurrentUser(null);
    setView('home');
  };

  // Filter & Search Logic
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.includes(searchQuery);

    const matchesPlan = 
      planFilter === 'all' || 
      (planFilter === 'Starter' && (user.plan === 'Starter' || !user.plan)) ||
      user.plan === planFilter;

    return matchesSearch && matchesPlan;
  });

  const filteredOrders = orders.filter(order => {
    const query = ordersSearchQuery.toLowerCase();
    return (
      (order.cust && order.cust.toLowerCase().includes(query)) ||
      (order.id && order.id.toLowerCase().includes(query)) ||
      (order.amt && String(order.amt).toLowerCase().includes(query)) ||
      (order.status && order.status.toLowerCase().includes(query)) ||
      (order.src && order.src.toLowerCase().includes(query))
    );
  });

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen bg-[#070313] text-[#F3F4F6] font-sans flex flex-col md:flex-row">
      
      {/* ── Left Sidebar Navigation ── */}
      <aside className="w-full md:w-64 bg-[#0a051d] border-b md:border-r border-[#261B4E] flex flex-col justify-between shrink-0 p-6 z-10">
        <div>
          {/* Logo Brand */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9333ea] to-[#ec4899] flex items-center justify-center shadow-lg shadow-[#9333ea]/30">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <span className="text-[20px] font-black tracking-tight bg-gradient-to-r from-white to-[#c084fc] bg-clip-text text-transparent">KapdeCRM</span>
              <span className="block text-[9px] uppercase tracking-widest text-[#a855f7] font-bold">Admin Portal</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab('boutiques')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-[14px] font-semibold text-left transition cursor-pointer ${
                activeTab === 'boutiques'
                  ? 'bg-[#9333ea]/15 border-[#9333ea]/40 text-[#c084fc] shadow-[0_0_15px_rgba(147,51,234,0.1)]'
                  : 'border-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              <Users size={18} />
              <span>Boutique Accounts</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-[14px] font-semibold text-left transition cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#9333ea]/15 border-[#9333ea]/40 text-[#c084fc] shadow-[0_0_15px_rgba(147,51,234,0.1)]'
                  : 'border-transparent text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              <ShoppingCart size={18} />
              <span>Orders & Revenue</span>
            </button>

            <button 
              onClick={() => alert("System Status: All services operational.\nDatabase: Connected (MongoDB)\nAPI Endpoints: Active")} 
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 border border-transparent text-[#9CA3AF] hover:text-white text-[14px] font-semibold text-left transition cursor-pointer"
            >
              <Activity size={18} />
              <span>System Health</span>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Logout */}
        <div className="mt-8 pt-6 border-t border-[#261B4E]">
          <div className="flex items-center gap-3 mb-4 p-2 bg-white/5 rounded-xl border border-white/5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-yellow-500 to-amber-600 flex items-center justify-center font-bold text-white text-[14px] shadow shadow-yellow-500/20">
              LS
            </div>
            <div className="overflow-hidden">
              <p className="text-[12px] font-bold text-white leading-tight truncate">Leeza Solanki</p>
              <p className="text-[10px] text-[#a855f7] font-semibold">Super Administrator</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-[#EF4444] text-[13px] font-bold transition cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout Panel</span>
          </button>
        </div>
      </aside>

      {/* ── Main Panel View Workspace ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 md:p-10">
        
        {/* Workspace Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 pb-6 border-b border-[#261B4E]">
          <div>
            <h1 className="text-[26px] font-black tracking-tight text-white flex items-center gap-3">
              Admin Control Panel
              <span className="text-[11px] bg-[#9333ea]/20 text-[#c084fc] px-2.5 py-1 rounded-full border border-[#9333ea]/30 font-bold uppercase tracking-wider">Live</span>
            </h1>
            <p className="text-[13px] text-[#9CA3AF] mt-1">Monitor registered stores, manage subscriptions, and audit credentials securely in MongoDB</p>
          </div>
          
          <button 
            onClick={() => { fetchUsers(); fetchOrders(); }} 
            className="self-start sm:self-center flex items-center gap-2 px-4 py-2 rounded-xl bg-[#261B4E]/65 hover:bg-[#261B4E] border border-[#3B2F7E] text-[13px] font-bold text-white transition cursor-pointer"
          >
            <Database size={15} className="text-[#a855f7]" />
            <span>Sync MongoDB</span>
          </button>
        </header>

        {/* ── KPI Metrics Dashboard Grid ── */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Total Boutique Owners */}
          <div className="bg-[#0a051d]/60 border border-[#261B4E] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#9333ea]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#9333ea]/5 rounded-bl-full -z-10 group-hover:bg-[#9333ea]/10 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#9CA3AF] text-[13px] font-medium uppercase tracking-wider">Total Boutiques</span>
              <div className="p-2 rounded-lg bg-[#9333ea]/10 border border-[#9333ea]/20 text-[#c084fc]">
                <Users size={18} />
              </div>
            </div>
            <div>
              <p className="text-[32px] font-black text-white leading-none tracking-tight">{loading ? '...' : stats.total}</p>
              <p className="text-[11px] text-[#c084fc] font-semibold mt-2 flex items-center gap-1.5">
                <TrendingUp size={12} />
                <span>Active CRM Workspaces</span>
              </p>
            </div>
          </div>

          {/* Card 2: Shop Collection Revenue */}
          <div className="bg-[#0a051d]/60 border border-[#261B4E] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#ec4899]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ec4899]/5 rounded-bl-full -z-10 group-hover:bg-[#ec4899]/10 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#9CA3AF] text-[13px] font-medium uppercase tracking-wider">Shop Collection</span>
              <div className="p-2 rounded-lg bg-[#ec4899]/10 border border-[#ec4899]/20 text-[#ec4899]">
                <Coins size={18} />
              </div>
            </div>
            <div>
              <p className="text-[32px] font-black text-white leading-none tracking-tight">
                {ordersLoading ? '...' : formatCurrency(totalRevenue)}
              </p>
              <p className="text-[11px] text-[#ec4899] font-semibold mt-2 flex items-center gap-1.5">
                <TrendingUp size={12} />
                <span>Total Shop Revenue</span>
              </p>
            </div>
          </div>

          {/* Card 3: Aggregated Orders */}
          <div className="bg-[#0a051d]/60 border border-[#261B4E] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-yellow-500/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/5 rounded-bl-full -z-10 group-hover:bg-yellow-500/10 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#9CA3AF] text-[13px] font-medium uppercase tracking-wider">Aggregated Orders</span>
              <div className="p-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-500">
                <ShoppingCart size={18} />
              </div>
            </div>
            <div>
              <p className="text-[32px] font-black text-white leading-none tracking-tight">
                {ordersLoading ? '...' : orders.length}
              </p>
              <p className="text-[11px] text-yellow-500 font-semibold mt-2 flex items-center gap-1.5">
                <Clock size={12} />
                <span>Day-to-day order count</span>
              </p>
            </div>
          </div>

          {/* Card 4: Database Status */}
          <div className="bg-[#0a051d]/60 border border-[#261B4E] rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group hover:border-[#10B981]/40 transition-all duration-300">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#10B981]/5 rounded-bl-full -z-10 group-hover:bg-[#10B981]/10 transition-all"></div>
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#9CA3AF] text-[13px] font-medium uppercase tracking-wider">MongoDB Link</span>
              <div className="p-2 rounded-lg bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981]">
                <Database size={18} />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#10B981]"></span>
                </span>
                <p className="text-[20px] font-black text-white leading-none tracking-tight">ONLINE</p>
              </div>
              <p className="text-[11px] text-[#10B981] font-semibold mt-2">
                All records securely synced
              </p>
            </div>
          </div>

        </section>

        {/* ── registered Users Workspace ── */}
        {activeTab === 'boutiques' && (
          <section className="bg-[#0a051d]/60 border border-[#261B4E] rounded-3xl overflow-hidden flex flex-col shadow-xl">
          
          {/* Table Toolbar Search & Filters */}
          <div className="p-6 border-b border-[#261B4E] flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="text"
                placeholder="Search owner, shop, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#140d2d] border border-[#261B4E] hover:border-[#3B2F7E] focus:border-[#9333ea] rounded-xl pl-11 pr-4 py-2.5 text-[14px] text-white outline-none placeholder-[#9CA3AF] transition"
              />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <label className="text-[13px] text-[#9CA3AF] font-bold">Plan Filter:</label>
              <select
                value={planFilter}
                onChange={(e) => setPlanFilter(e.target.value)}
                className="bg-[#140d2d] border border-[#261B4E] focus:border-[#9333ea] rounded-xl px-4 py-2.5 text-[13px] font-bold text-white outline-none cursor-pointer"
              >
                <option value="all">All Plans</option>
                <option value="Starter">Starter / Trial</option>
                <option value="Professional">Professional</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>

          {/* User List Table */}
          <div className="overflow-x-auto">
            
            {loading ? (
              <div className="p-20 text-center flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full border-4 border-t-[#a855f7] border-[#261B4E] animate-spin"></div>
                <p className="text-[#9CA3AF] text-[14px] font-semibold">Retrieving secure boutique owner accounts from database...</p>
              </div>
            ) : error ? (
              <div className="p-16 text-center max-w-lg mx-auto flex flex-col items-center justify-center gap-4">
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center shadow">
                  <ShieldAlert size={28} />
                </div>
                <h3 className="text-white text-[16px] font-black">Sync Failure</h3>
                <p className="text-[#9CA3AF] text-[13px] leading-relaxed">{error}</p>
                <button 
                  onClick={fetchUsers} 
                  className="mt-2 bg-[#9333ea] hover:bg-[#822cd2] text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition shadow shadow-[#9333ea]/20"
                >
                  Retry Database Connection
                </button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="p-20 text-center max-w-sm mx-auto flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/5 border border-white/5 text-[#9CA3AF] rounded-full flex items-center justify-center shadow">
                  <Users size={20} />
                </div>
                <h3 className="text-white text-[15px] font-bold mt-2">No Boutique Owners Found</h3>
                <p className="text-[#9CA3AF] text-[12px] leading-relaxed">We couldn't find any registered boutique owners matching your filter parameters.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b border-[#261B4E] bg-[#140d2d]/30">
                    <th className="p-5 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider">Boutique & Owner</th>
                    <th className="p-5 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider">Contact Address</th>
                    <th className="p-5 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider">Auditable Password</th>
                    <th className="p-5 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider">Sign-up Date</th>
                    <th className="p-5 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider">Active plan</th>
                    <th className="p-5 text-[11px] font-bold text-[#a855f7] uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#261B4E]/50">
                  {filteredUsers.map(user => {
                    const initials = user.ownerName
                      ? user.ownerName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2)
                      : 'US';
                    
                    const isPassVisible = visiblePasswords[user.id];

                    return (
                      <tr key={user.id} className="hover:bg-white/5 transition-all">
                        {/* Column 1: Boutique & Owner */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#9333ea] to-[#4f46e5] flex items-center justify-center font-bold text-white text-[13px] shadow">
                              {initials}
                            </div>
                            <div>
                              <p className="text-[14px] font-black text-white leading-snug">{user.ownerName}</p>
                              <p className="text-[12px] text-[#c084fc] font-semibold mt-0.5">{user.shopName}</p>
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Contact Address */}
                        <td className="p-5">
                          <p className="text-[13px] text-white font-medium">{user.email}</p>
                          <p className="text-[12px] text-[#9CA3AF] font-bold mt-1">+91 {user.mobile}</p>
                        </td>

                        {/* Column 3: Password */}
                        <td className="p-5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[13px] bg-[#140d2d] border border-[#261B4E] rounded px-3.5 py-1.5 text-white font-bold select-all">
                              {isPassVisible ? user.password : '••••••••'}
                            </span>
                            <button
                              onClick={() => togglePasswordVisibility(user.id)}
                              className="p-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-white/5 transition cursor-pointer"
                              title={isPassVisible ? 'Hide password' : 'Show password'}
                            >
                              {isPassVisible ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                          </div>
                        </td>

                        {/* Column 4: Creation Date */}
                        <td className="p-5">
                          <p className="text-[13px] text-white font-medium">{formatDate(user.createdAt)}</p>
                        </td>

                        {/* Column 5: Plan Tier */}
                        <td className="p-5">
                          <span className={`inline-flex items-center gap-1.5 text-[11px] font-black px-3 py-1 rounded-full uppercase border ${
                            user.plan === 'Business' 
                              ? 'bg-[#ec4899]/15 border-[#ec4899]/40 text-[#f472b6]' 
                              : user.plan === 'Professional' 
                                ? 'bg-[#9333ea]/15 border-[#9333ea]/40 text-[#c084fc]' 
                                : 'bg-yellow-500/10 border-yellow-500/30 text-yellow-500'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              user.plan === 'Business' ? 'bg-[#ec4899]' : user.plan === 'Professional' ? 'bg-[#9333ea]' : 'bg-yellow-500'
                            }`}></span>
                            {user.plan || 'Starter'}
                          </span>
                        </td>

                        {/* Column 6: Actions */}
                        <td className="p-5 text-right">
                          <div className="flex items-center justify-end gap-3">
                            {/* Change Plan Dropdown Selector */}
                            <div className="relative inline-block text-left">
                              <select
                                value={user.plan || 'Starter'}
                                disabled={updatingPlanUserId === user.id}
                                onChange={(e) => handleUpdatePlan(user.id, e.target.value)}
                                className="bg-[#140d2d] border border-[#261B4E] focus:border-[#9333ea] rounded-xl px-3 py-1.5 text-[12px] font-bold text-white outline-none cursor-pointer disabled:opacity-50 transition"
                              >
                                <option value="Starter">Starter</option>
                                <option value="Professional">Professional</option>
                                <option value="Business">Business</option>
                              </select>
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={() => {
                                setUserToDelete(user);
                                setDeleteConfirmText('');
                                setDeleteError('');
                              }}
                              className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 hover:border-transparent transition-all duration-300 cursor-pointer"
                              title="Delete boutique account from MongoDB"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}

          </div>

        </section>
        )}

        {/* ── Shop Orders & Day-to-Day Revenue Section ── */}
        {activeTab === 'orders' && (
          <section className="bg-[#0a051d]/60 border border-[#261B4E] rounded-3xl overflow-hidden flex flex-col shadow-xl animate-fadeIn">
            
            {/* Toolbar Search & Sub-tabs */}
            <div className="p-6 border-b border-[#261B4E] flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <h3 className="text-white text-[16px] font-bold">Shop Collections Audit</h3>
                <p className="text-[12px] text-[#9CA3AF] mt-0.5">Audit day-to-day transaction records and sales stats across boutiques</p>
              </div>
              
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input
                  type="text"
                  placeholder="Search customer, amount, status..."
                  value={ordersSearchQuery}
                  onChange={(e) => setOrdersSearchQuery(e.target.value)}
                  className="w-full bg-[#140d2d] border border-[#261B4E] hover:border-[#3B2F7E] focus:border-[#9333ea] rounded-xl pl-11 pr-4 py-2.5 text-[14px] text-white outline-none placeholder-[#9CA3AF] transition"
                />
              </div>
            </div>

            {/* Split Grid for day-to-day orders and detailed log */}
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#261B4E]">
              
              {/* Day-to-Day Earnings (Left: 5 cols) */}
              <div className="lg:col-span-5 p-6">
                <h4 className="text-[13px] font-bold text-[#c084fc] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Calendar size={15} />
                  <span>Day-to-Day Orders & Revenue</span>
                </h4>
                
                {ordersLoading ? (
                  <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-t-[#a855f7] border-[#261B4E] animate-spin"></div>
                    <p className="text-[#9CA3AF] text-[13px]">Calculating daily charts...</p>
                  </div>
                ) : dailyStats.length === 0 ? (
                  <div className="py-12 text-center text-[#9CA3AF] text-[13px]">No transactions logged yet.</div>
                ) : (
                  <div className="overflow-y-auto max-h-[500px] space-y-3 pr-2">
                    {dailyStats.map((stat, idx) => (
                      <div key={idx} className="bg-[#140d2d]/50 border border-[#261B4E] hover:border-[#9333ea]/30 p-4 rounded-2xl flex items-center justify-between transition">
                        <div>
                          <p className="text-[13px] text-[#9CA3AF] font-bold">{stat.date}</p>
                          <p className="text-[11px] text-[#c084fc] font-semibold mt-1">{stat.orderCount} {stat.orderCount === 1 ? 'order' : 'orders'} placed</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[15px] font-black text-white">{formatCurrency(stat.revenue)}</p>
                          <p className="text-[9px] uppercase tracking-widest text-[#10B981] font-bold mt-1">Collected</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Detailed Orders Audit Log (Right: 7 cols) */}
              <div className="lg:col-span-7 p-6">
                <h4 className="text-[13px] font-bold text-[#c084fc] uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Coins size={15} />
                  <span>Individual Order Records</span>
                </h4>

                <div className="overflow-y-auto max-h-[500px] space-y-3 pr-2">
                  {ordersLoading ? (
                    <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-t-[#a855f7] border-[#261B4E] animate-spin"></div>
                      <p className="text-[#9CA3AF] text-[13px]">Loading order list...</p>
                    </div>
                  ) : ordersError ? (
                    <div className="py-12 text-center text-red-400 text-[13px]">{ordersError}</div>
                  ) : filteredOrders.length === 0 ? (
                    <div className="py-12 text-center text-[#9CA3AF] text-[13px]">No matching order records found.</div>
                  ) : (
                    filteredOrders.map(order => (
                      <div key={order._id || order.id} className="bg-[#140d2d]/30 border border-[#261B4E]/60 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:border-[#9333ea]/35 transition-all">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#9333ea]/15 border border-[#9333ea]/30 flex items-center justify-center font-bold text-[#c084fc] text-[13px]">
                            {String(order.cust || 'C').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-[13px] font-black text-white">{order.cust}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-1">
                              <span className="text-[11px] text-[#9CA3AF] font-bold">ID: {order.id}</span>
                              <span className="text-[9px] bg-white/5 border border-white/10 text-white px-2 py-0.5 rounded-full font-semibold">{order.src}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                          <p className="text-[14px] font-black text-[#c084fc]">{String(order.amt).startsWith('₹') ? order.amt : `₹${order.amt}`}</p>
                          <span className={`inline-flex items-center text-[10px] font-black px-2 py-0.5 rounded-md uppercase ${
                            order.status === 'Delivered' || order.status === 'Completed' || order.status === 'Paid'
                              ? 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30'
                              : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* ── CUSTOM DELETION CONFIRMATION MODAL ── */}
      {userToDelete && (
        <div className="fixed inset-0 bg-[#020108]/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          
          <div className="bg-[#0b0621] border border-[#ef4444]/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl shadow-red-500/5 animate-[scaleUp_0.3s_ease-out] relative">
            
            {/* Red Accent Top Border Glow */}
            <div className="h-1.5 w-full bg-gradient-to-r from-red-500 to-[#ef4444]"></div>
            
            {/* Modal Header Close */}
            <button 
              onClick={() => setUserToDelete(null)}
              className="absolute top-5 right-5 p-2 text-[#9CA3AF] hover:text-white rounded-lg hover:bg-white/5 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="p-8">
              
              <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-6">
                <ShieldAlert size={28} />
              </div>

              <h3 className="text-[20px] font-black text-white leading-tight">Delete boutique account?</h3>
              <p className="text-[#9CA3AF] text-[13px] leading-relaxed mt-2.5">
                You are about to permanently delete <strong className="text-white">{userToDelete.ownerName}</strong>'s boutique workspace (<strong className="text-[#c084fc]">{userToDelete.shopName}</strong>) from MongoDB. This action is **irreversible** and all invoices, connections, and configurations will be wiped.
              </p>

              {/* Input Challenge */}
              <div className="mt-6">
                <label className="block text-[11px] font-bold text-[#9CA3AF] uppercase tracking-wider mb-2">
                  Type <span className="text-red-500">"DELETE"</span> to confirm authorization:
                </label>
                <input
                  type="text"
                  placeholder="Type here..."
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full bg-[#140d2d] border border-[#261B4E] focus:border-red-500 rounded-xl px-4 py-2.5 text-[14px] text-white font-bold outline-none transition"
                />
              </div>

              {deleteError && (
                <p className="text-[#EF4444] text-[12px] font-bold mt-3 flex items-center gap-1.5">
                  <ShieldAlert size={14} />
                  <span>{deleteError}</span>
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setUserToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl py-3 text-[13px] font-bold text-[#9CA3AF] hover:text-white transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  disabled={isDeleting || deleteConfirmText.toUpperCase() !== 'DELETE'}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-500/40 disabled:border-transparent text-white border border-transparent rounded-xl py-3 text-[13px] font-bold transition shadow shadow-red-500/20 cursor-pointer disabled:cursor-not-allowed"
                >
                  {isDeleting ? 'Deleting...' : 'Confirm Wipe'}
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};
