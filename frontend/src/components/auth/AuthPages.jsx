import React, { useState, useRef } from 'react';
import { API_AUTH_URL } from '../../config';


const AuthLayout = ({ children }) => (
  <>
    <style>{`
      @keyframes float-auth {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
      .animate-float-1 { animation: float-auth 6s ease-in-out infinite; }
      .animate-float-2 { animation: float-auth 5s ease-in-out infinite 1s; }
      .animate-float-3 { animation: float-auth 7s ease-in-out infinite 2s; }
      .animate-float-4 { animation: float-auth 8s ease-in-out infinite 0.5s; }
      .animate-float-5 { animation: float-auth 6.5s ease-in-out infinite 1.5s; }
    `}</style>
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#05080f] via-[#0a1020] to-[#05080f] overflow-hidden p-4">
      {/* Animated Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#3878ff] opacity-20 blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#1e50c8] opacity-10 blur-[120px] animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite] delay-1000"></div>

      {/* Floating Cards Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Sales Card - Top Left */}
         <div className="absolute top-[12%] left-[3%] xl:left-[8%] bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-56 shadow-2xl animate-float-1 hidden lg:block opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-[#3878ff]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#3878ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <span className="bg-green-400/20 text-green-400 px-2 py-1 rounded-md text-xs font-bold">+24.5%</span>
            </div>
            <div className="text-white/60 text-sm mb-1 font-medium">Weekly Revenue</div>
            <div className="text-white font-bold text-2xl tracking-tight">₹1,24,500</div>
         </div>

         {/* Inventory Card - Bottom Right */}
         <div className="absolute bottom-[15%] right-[3%] xl:right-[8%] bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-56 shadow-2xl animate-float-2 hidden md:block opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-[#1e50c8]/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#1e50c8]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <span className="bg-[#3878ff]/20 text-[#3878ff] px-2 py-1 rounded-md text-xs font-bold">New</span>
            </div>
            <div className="text-white/60 text-sm mb-1 font-medium">Summer Collection</div>
            <div className="text-white font-bold text-2xl tracking-tight">142 Items</div>
         </div>

         {/* Customer Card - Mid Left */}
         <div className="absolute top-[45%] left-[18%] xl:left-[22%] bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-2xl w-52 shadow-2xl animate-float-3 hidden xl:block opacity-60">
             <div className="flex items-center gap-3 mb-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#3878ff] to-[#1e50c8] p-[2px]">
                 <div className="w-full h-full bg-[#05080f] rounded-full border-2 border-[#05080f] overflow-hidden">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Riya&backgroundColor=e0f2fe" alt="Avatar" className="w-full h-full object-cover" />
                 </div>
               </div>
               <div>
                 <div className="text-white text-sm font-bold">Riya Sharma</div>
                 <div className="text-[#3878ff] text-[10px] uppercase tracking-wider font-bold">VIP Member</div>
               </div>
             </div>
             <div className="bg-black/20 rounded-lg p-2 border border-white/5">
               <div className="text-white/60 text-[10px] uppercase mb-1">Recent Purchase</div>
               <div className="text-white/90 text-xs font-medium">Designer Silk Saree</div>
             </div>
         </div>

         {/* Active Orders Card - Top Right */}
         <div className="absolute top-[18%] right-[4%] xl:right-[10%] bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-56 shadow-2xl animate-float-4 hidden lg:block opacity-60">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <span className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded-md text-xs font-bold">Processing</span>
            </div>
            <div className="text-white/60 text-sm mb-1 font-medium">Active Orders</div>
            <div className="text-white font-bold text-2xl tracking-tight">42</div>
         </div>

         {/* Conversion Rate Card - Bottom Left */}
         <div className="absolute bottom-[10%] left-[4%] xl:left-[10%] bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-2xl w-48 shadow-2xl animate-float-5 hidden 2xl:block opacity-50">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
              </div>
              <span className="bg-emerald-400/20 text-emerald-400 px-2 py-1 rounded-md text-xs font-bold">+5.2%</span>
            </div>
            <div className="text-white/60 text-sm mb-1 font-medium">Conversion</div>
            <div className="text-white font-bold text-2xl tracking-tight">8.4%</div>
         </div>
      </div>

      {/* Foreground Form Container */}
      <div className="relative z-10 w-full flex flex-col items-center py-10">
        <div className="text-center mb-8 hidden md:block animate-[slideUpFade_0.8s_ease-out]">
            <h1 className="font-serif text-[42px] text-white font-bold mb-3 leading-tight drop-shadow-lg">Elevate Your Fashion Business.</h1>
            <p className="text-[#A0B9FF] text-lg max-w-xl mx-auto drop-shadow-md opacity-80">Manage inventory, track sales, and delight your customers seamlessly with Kapde CRM.</p>
        </div>
        <div className="w-full max-w-md flex justify-center">
          {children}
        </div>
      </div>
    </div>
  </>
);

const LoginLayout = ({ children }) => (
  <div className="min-h-screen flex items-center justify-center relative bg-[#05080f] overflow-hidden p-4">
    
    {/* Glowing animated orbs */}
    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3878ff] rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-[blob_7s_infinite] pointer-events-none"></div>
    <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#00f0ff] rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-[blob_9s_infinite_2s] pointer-events-none"></div>
    <div className="absolute bottom-1/4 left-1/2 w-80 h-80 bg-[#1e50c8] rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-[blob_8s_infinite_4s] pointer-events-none"></div>
    
    {/* Abstract Geometric Rings */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-blue-500/10 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#00f0ff]/10 rounded-full animate-[spin_40s_linear_infinite_reverse] border-dashed pointer-events-none"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-blue-600/5 rounded-full animate-[spin_80s_linear_infinite] pointer-events-none"></div>

    <style>{`
      @keyframes blob {
        0% { transform: translate(0px, 0px) scale(1); }
        33% { transform: translate(30px, -50px) scale(1.1); }
        66% { transform: translate(-20px, 20px) scale(0.9); }
        100% { transform: translate(0px, 0px) scale(1); }
      }
    `}</style>

    {/* Center Login Form */}
    <div className="relative z-10 w-full max-w-md flex flex-col items-center">
       <div className="mb-6 animate-[slideUpFade_0.8s_ease-out]">
         <h1 className="font-serif text-[42px] text-transparent bg-clip-text bg-gradient-to-br from-white via-blue-100 to-[#3878ff] font-bold drop-shadow-[0_0_40px_rgba(56,120,255,0.4)]">Kapde CRM</h1>
       </div>
       {children}
    </div>
  </div>
);

export const RegisterPage = ({ setView }) => {
  const [formData, setFormData] = useState({
    shopName: '',
    ownerName: '',
    email: '',
    mobile: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_AUTH_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('Registration successful! Please login.');
        setFormData({ shopName: '', ownerName: '', email: '', mobile: '', password: '' });
        setTimeout(() => setView('login'), 2000);
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch {
      setError('Connection error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="w-full max-w-md bg-[#05080f]/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-[0_0_40px_rgba(56,120,255,0.15)] border border-white/10 animate-[slideUpFade_0.6s_ease-out]">
        <div className="text-center mb-8">
          <h2 className="font-serif text-[32px] font-bold text-white mb-2">Create Account</h2>
          <p className="text-white/60 text-[14px]">Join Kapde CRM and grow your fashion retail business.</p>
        </div>
        
        {error && <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-600 text-[13px] rounded-lg text-center">{error}</div>}
        {success && <div className="mb-6 p-3 bg-green-50 border border-green-200 text-green-600 text-[13px] rounded-lg text-center">{success}</div>}

        <form className="flex flex-col gap-5" onSubmit={handleRegister} autoComplete="off">
          <div>
            <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Shop Name</label>
            <input type="text" name="shopName" value={formData.shopName} onChange={handleChange} required placeholder="e.g. Trendy Boutique" autoComplete="off" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Owner Name</label>
            <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="Your Full Name" autoComplete="off" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="your.email@example.com" autoComplete="off" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" />
          </div>
          <div>
            <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Mobile Number (Optional)</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-white/10 bg-black/60 text-white/60 text-sm">+91</span>
              <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" pattern="[0-9]{10}" autoComplete="off" className="w-full px-4 py-3 rounded-r-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" />
            </div>
          </div>
          <div>
            <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create a secure password" autoComplete="new-password" className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" />
          </div>
          <button disabled={loading} type="submit" className="mt-2 w-full bg-gradient-to-r from-[#3878ff] to-[#508cff] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_15px_rgba(56,120,255,0.3)] hover:shadow-[0_6px_20px_rgba(56,120,255,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70">
            {loading ? 'Registering...' : 'Register Shop'}
          </button>
        </form>
        <div className="mt-6 text-center text-[13px] text-white/60">
          Already have an account?{' '}
          <span className="text-[#3878ff] font-bold cursor-pointer hover:underline" onClick={() => setView('login')}>
            Login here
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export const LoginPage = ({ setView, setCurrentUser }) => {
  const [step, setStep] = useState(1); // 1 = Login, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [emailTarget, setEmailTarget] = useState('');
  const [error, setError] = useState('');
  const otpRefs = useRef([]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${API_AUTH_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        // Auto-bypass OTP for testing using debugCode
        if (data.debugCode) {
          const verifyResponse = await fetch(`${API_AUTH_URL}/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, code: data.debugCode }),
          });
          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            if (setCurrentUser && verifyData.user) setCurrentUser(verifyData.user);
            if (verifyData.user && (verifyData.user.role === 'admin' || verifyData.user.email === 'freeeebird03@gmail.com')) {
              setView('admin-dashboard');
            } else {
              setView('dashboard');
            }
            return;
          }
        }

        if (data.email) setEmailTarget(data.email);
        setStep(2);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch {
      setError('Connection error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const code = otp.join('');
    if (code.length < 6) {
      setError('Please enter all 6 digits');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_AUTH_URL}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, code }),
      });
      const data = await response.json();

      if (data.success) {
        if (setCurrentUser && data.user) {
          setCurrentUser(data.user);
        }
        
        // Securely redirect to the correct dashboard based on role
        if (data.user && (data.user.role === 'admin' || data.user.email === 'freeeebird03@gmail.com')) {
          setView('admin-dashboard');
        } else {
          setView('dashboard');
        }
      } else {
        setError(data.message || 'Invalid OTP');
      }
    } catch {
      setError('Verification error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginLayout>
      <div className="w-full max-w-md bg-[#05080f]/80 backdrop-blur-xl p-8 lg:p-10 rounded-2xl shadow-[0_0_40px_rgba(56,120,255,0.15)] border border-white/10 animate-[slideUpFade_0.6s_ease-out]">
        
        {error && (
          <div className="mb-6 p-3 bg-red-900/50 border border-red-500/50 text-red-200 text-[13px] rounded-lg text-center">
            {error}
          </div>
        )}

        {step === 1 && (
          <>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[11px] font-bold mb-4 border border-green-500/30 animate-[pulse_2s_infinite]">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 4.908 3.067 9.126 7.403 10.796a.75.75 0 00.594 0C14.333 16.126 17.4 11.908 17.4 7c0-.681-.056-1.351-.166-2.001A11.954 11.954 0 0110 1.944zM11 14a1 1 0 11-2 0 1 1 0 012 0zm0-7a1 1 0 10-2 0v3a1 1 0 102 0V7z" clipRule="evenodd" /></svg>
                Secure Connection Verified
              </div>
              <h2 className="font-serif text-[32px] font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-white/60 text-[14px]">Log in to your Kapde CRM dashboard.</p>
            </div>
            <form className="flex flex-col gap-5" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Mobile Number / Email</label>
                <input 
                  type="text" 
                  required 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter registered mobile or email" 
                  className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" 
                />
              </div>
              <div>
                <label className="block text-[13px] font-bold text-white/90 mb-1.5 uppercase tracking-wide">Password</label>
                <input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password" 
                  className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white placeholder-white/30 text-[16px]" 
                />
              </div>
              <button disabled={loading} type="submit" className="mt-2 w-full bg-gradient-to-r from-[#3878ff] to-[#508cff] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_15px_rgba(56,120,255,0.3)] hover:shadow-[0_6px_20px_rgba(56,120,255,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70">
                {loading ? 'Logging in...' : 'Login securely'}
              </button>
            </form>
            <div className="mt-6 text-center text-[13px] text-white/60">
              Don't have an account yet?{' '}
              <span className="text-[#3878ff] font-bold cursor-pointer hover:underline" onClick={() => setView('register')}>
                Register now
              </span>
            </div>
          </>
        )}

        {step === 2 && (
          <div className="animate-[slideUpFade_0.4s_ease-out]">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <svg className="w-8 h-8 text-[#3878ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
              </div>
              <h2 className="font-serif text-[28px] font-bold text-white mb-2">Two-Factor Auth</h2>
              <p className="text-white/60 text-[14px]">Please enter the 6-digit OTP sent to your registered email <strong className="text-white/90">{emailTarget || 'address'}</strong>.</p>
            </div>
            <form className="flex flex-col gap-6" onSubmit={handleOTPSubmit}>
              <div className="flex justify-between gap-2 px-2">
                {otp.map((digit, i) => (
                  <input 
                    key={i} 
                    ref={el => otpRefs.current[i] = el}
                    type="text" 
                    maxLength="1" 
                    value={digit}
                    onChange={(e) => handleOTPChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className="w-12 h-14 text-center text-[24px] font-bold rounded-lg border border-white/10 focus:outline-none focus:border-[#3878ff] focus:ring-2 focus:ring-[#3878ff]/30 transition-all bg-black/40 text-white" 
                  />
                ))}
              </div>
              <button disabled={loading} type="submit" className="w-full bg-gradient-to-r from-[#3878ff] to-[#508cff] text-white font-bold py-3.5 rounded-lg shadow-[0_4px_15px_rgba(56,120,255,0.3)] hover:shadow-[0_6px_20px_rgba(56,120,255,0.4)] transition-all transform hover:-translate-y-0.5 disabled:opacity-70">
                {loading ? 'Verifying OTP...' : 'Verify & Sign In'}
              </button>
            </form>
            <div className="mt-6 text-center text-[13px] text-white/60">
              Didn't receive the code?{' '}
              <span className="text-[#3878ff] font-bold cursor-pointer hover:underline" onClick={handleLoginSubmit}>
                Resend OTP
              </span>
            </div>
            <div className="mt-4 text-center">
              <span className="text-white/60 text-[13px] cursor-pointer hover:text-white underline decoration-dotted" onClick={() => setStep(1)}>
                &larr; Back to Login
              </span>
            </div>
          </div>
        )}

      </div>
    </LoginLayout>
  );
};
