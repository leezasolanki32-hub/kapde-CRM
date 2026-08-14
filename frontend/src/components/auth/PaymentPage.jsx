import React, { useState } from 'react';

// --- PROCESSING VIEWS ---

const UPIProcessing = ({ price, currentPlan, billingCycle, setStep }) => (
  <div className="flex flex-col items-center justify-center py-10 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
    <div className="bg-white/90 backdrop-blur-2xl p-10 rounded-[50px] shadow-[0_30px_100px_rgba(168,85,247,0.15)] border border-white/40 flex flex-col items-center max-w-[440px] w-full relative overflow-hidden group">
       
       {/* HUD Glow Background */}
       <div className="absolute inset-0 bg-gradient-to-b from-[#a855f7]/5 to-transparent pointer-events-none"></div>
       
       <div className="relative z-10 text-[13px] font-black text-[#a855f7] uppercase tracking-[0.2em] mb-8">Scan to Activate Plan</div>
       
       {/* Premium Realistic QR Code */}
       <div className="relative mb-8">
          {/* Animated HUD Rings */}
          <div className="absolute -inset-6 border border-[#a855f7]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute -inset-10 border border-[#f472b6]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          
          <div className="w-[260px] h-[260px] bg-white rounded-[32px] p-6 shadow-inner border border-[#E2DED6] relative flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500 overflow-hidden">
              <img src="/upi_qr.png" alt="UPI QR Code" className="w-full h-full object-contain relative z-10" />
              {/* Scanner Beam Animation */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#a855f7] to-transparent animate-[scan_3s_ease-in-out_infinite] opacity-50 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-20"></div>
          </div>
       </div>

       <div className="text-center relative z-10 space-y-3 mb-10">
          <div className="flex items-center justify-center gap-2">
             <span className="text-[32px] font-black text-[#1C1C1E]">{price}</span>
             <span className="text-[14px] text-[#6B6B70] font-bold">/ mo</span>
          </div>
          <div className="px-6 py-2 bg-[#f3e8ff] rounded-full text-[#a855f7] text-[11px] font-black uppercase tracking-wider inline-block">
             Plan: {currentPlan} ({billingCycle})
          </div>
          <p className="text-[13px] text-[#6B6B70] font-medium max-w-[280px] mx-auto leading-relaxed">
             Open your preferred UPI app (GPay, PhonePe, Paytm) to complete activation.
          </p>
       </div>

       <div className="w-full space-y-4 relative z-10">
          <div className="flex justify-between items-center px-1">
             <span className="text-[11px] font-bold text-[#6B6B70] uppercase">Transaction Security</span>
             <span className="text-[11px] font-bold text-[#1D9E75] uppercase">Live</span>
          </div>
          <div className="w-full h-1.5 bg-[#FAF8F4] rounded-full overflow-hidden">
             <div className="h-full bg-gradient-to-r from-[#a855f7] to-[#f472b6] animate-[shimmer_2s_infinite] shadow-[0_0_10px_rgba(168,85,247,0.3)]" style={{ width: '45%' }}></div>
          </div>
          <div className="flex items-center justify-center gap-3 text-[12px] font-bold text-[#1D9E75]">
             <div className="w-2 h-2 rounded-full bg-[#1D9E75] animate-ping"></div>
             Verifying secure connection...
          </div>
       </div>
    </div>
    
    <button onClick={() => setStep('selection')} className="mt-10 text-[14px] font-bold text-[#6B6B70] hover:text-[#a855f7] transition-all hover:tracking-widest uppercase tracking-wider flex items-center gap-2">
       <span>&#8592;</span> Change Plan or Method
    </button>
  </div>
);

const CardProcessing = ({ price, setStep }) => (
  <div className="flex flex-col items-center justify-center py-6 animate-in fade-in slide-in-from-bottom-4 duration-700 relative z-10">
    <div className="bg-white p-12 rounded-[50px] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-white/60 max-w-[540px] w-full">
       <div className="flex justify-between items-center mb-10">
          <div className="text-[14px] font-black text-[#a855f7] uppercase tracking-widest">Secure Card Portal</div>
          <div className="flex gap-3 items-center">
             <div className="text-[11px] font-black text-[#1C1C1E]/20">VISA</div>
             <div className="text-[11px] font-black text-[#1C1C1E]/20">MASTERCARD</div>
             <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          </div>
       </div>

       <div className="space-y-7">
          <div className="space-y-2">
             <label className="text-[11px] font-black text-[#6B6B70] uppercase tracking-widest ml-1">Cardholder Name</label>
             <input type="text" placeholder="Fashion Boutique Name" className="w-full bg-[#FAF8F4] border-2 border-[#E2DED6] rounded-[20px] py-4.5 px-7 focus:border-[#a855f7] transition-all outline-none font-bold text-[#1C1C1E] shadow-sm" />
          </div>

          <div className="space-y-2">
             <label className="text-[11px] font-black text-[#6B6B70] uppercase tracking-widest ml-1">Card Number</label>
             <div className="relative">
                <input type="text" placeholder="0000 0000 0000 0000" className="w-full bg-[#FAF8F4] border-2 border-[#E2DED6] rounded-[20px] py-4.5 px-7 focus:border-[#a855f7] transition-all outline-none font-bold text-[#1C1C1E] tracking-[0.2em] shadow-sm" />
                <div className="absolute right-7 top-1/2 -translate-y-1/2 text-2xl opacity-20">&#128179;</div>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-7">
             <div className="space-y-2">
                <label className="text-[11px] font-black text-[#6B6B70] uppercase tracking-widest ml-1">Expiry Date</label>
                <input type="text" placeholder="MM / YY" className="w-full bg-[#FAF8F4] border-2 border-[#E2DED6] rounded-[20px] py-4.5 px-7 focus:border-[#a855f7] transition-all outline-none font-bold text-[#1C1C1E] shadow-sm" />
             </div>
             <div className="space-y-2">
                <label className="text-[11px] font-black text-[#6B6B70] uppercase tracking-widest ml-1">CVV Code</label>
                <input type="password" placeholder="***" className="w-full bg-[#FAF8F4] border-2 border-[#E2DED6] rounded-[20px] py-4.5 px-7 focus:border-[#a855f7] transition-all outline-none font-bold text-[#1C1C1E] shadow-sm" />
             </div>
          </div>

          <button className="w-full bg-gradient-to-r from-[#a855f7] to-[#f472b6] text-white font-black py-5 rounded-[22px] transition-all shadow-[0_15px_40px_rgba(168,85,247,0.2)] hover:scale-[1.02] active:scale-[0.98] mt-4 text-[16px]">
             Confirm Payment of {price}
          </button>
       </div>
    </div>

    <button onClick={() => setStep('selection')} className="mt-10 text-[14px] font-bold text-[#6B6B70] hover:text-[#a855f7] transition-all uppercase tracking-widest">
      Cancel and Go Back
    </button>
  </div>
);


export const PaymentPage = ({ setView, selectedPlan: initialPlan = "Professional", price: initialPrice = "₹999" }) => {
  const [currentPlan, setCurrentPlan] = useState(initialPlan);
  const [billingCycle, setBillingCycle] = useState(initialPrice.includes('year') || initialPrice.includes('749') || initialPrice.includes('1,874') ? 'yearly' : 'monthly');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [step, setStep] = useState('selection'); // 'selection' or 'processing'

  // Plan details map with billing cycles
  const planData = {
    'Professional': {
      monthly: '₹999',
      yearly: '₹749',
      totalYearly: '₹8,988',
      features: ['Unlimited Sales & Records', 'Smart Inventory Rack', 'Customer OTP Verification', 'Priority WhatsApp Support']
    },
    'Business': {
      monthly: '₹2,499',
      yearly: '₹1,874',
      totalYearly: '₹22,488',
      features: ['Up to 5 Branch Locations', 'Full WhatsApp Marketing', 'AI Sales Forecasting', 'Dedicated Account Manager']
    }
  };

  const price = planData[currentPlan]
    ? (billingCycle === 'yearly' ? planData[currentPlan].yearly : planData[currentPlan].monthly)
    : initialPrice;


  const handleBack = () => {
    if (step === 'processing') setStep('selection');
    else setView('home');
  };


  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col font-sans text-[#1C1C1E] relative overflow-hidden">
      
      {/* Intense Purple Abstract Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
         {/* More Vibrant Moving Mesh Gradients */}
         <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#a855f7]/10 rounded-full blur-[140px] animate-[pulse_12s_infinite]"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#f472b6]/10 rounded-full blur-[120px] animate-[pulse_10s_infinite_reverse]"></div>
         <div className="absolute top-[30%] left-[35%] w-[40%] h-[40%] bg-[#a855f7]/8 rounded-full blur-[100px] animate-[bounce_18s_infinite]"></div>
         
         {/* Moving Purple Silk Streaks */}
         <div className="absolute top-[20%] left-[-50%] w-[200%] h-[300px] bg-gradient-to-r from-transparent via-[#a855f7]/5 to-transparent -skew-y-12 animate-[silk_10s_linear_infinite]"></div>
         <div className="absolute bottom-[10%] left-[-50%] w-[200%] h-[400px] bg-gradient-to-r from-transparent via-[#f472b6]/3 to-transparent skew-y-6 animate-[silk_15s_linear_infinite_reverse]"></div>

         {/* Floating Abstract Particles (Vibrant Glass Orbs) */}
         <div className="absolute top-[10%] left-[12%] w-16 h-16 bg-gradient-to-tr from-[#a855f7]/20 to-[#f472b6]/20 rounded-full blur-sm animate-bounce duration-[8000ms]"></div>
         <div className="absolute bottom-[20%] left-[18%] w-10 h-10 bg-[#a855f7]/15 rounded-full blur-[1px] animate-pulse duration-[6000ms]"></div>
         <div className="absolute top-[50%] right-[10%] w-20 h-20 bg-[#f472b6]/15 rounded-full blur-md animate-bounce duration-[10000ms]"></div>
         <div className="absolute bottom-[15%] right-[15%] w-12 h-12 bg-[#a855f7]/15 rounded-full blur-sm animate-pulse duration-[7000ms]"></div>
         
         {/* Intense Dot Grid */}
         <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(#a855f7 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      </div>

      {/* Soft Header */}
      <nav className="bg-white/70 backdrop-blur-xl border-b border-[#E2DED6] px-[28px] flex items-center justify-between h-[70px] sticky top-0 z-50">
        <div className="font-serif text-[26px] text-[#a855f7] font-extrabold tracking-tight cursor-pointer" onClick={() => setView('home')}>
          Cloth<span className="text-[#f472b6]">CRM</span>
        </div>
        <button onClick={handleBack} className="text-[13px] text-[#6B6B70] hover:text-[#1C1C1E] transition-all flex items-center gap-2 font-bold uppercase tracking-wider">
          <span>&#8592;</span> {step === 'processing' ? 'Back' : 'Exit Checkout'}
        </button>
      </nav>

      <div className="flex-1 max-w-[1240px] mx-auto w-full p-6 lg:p-12 relative z-10">
        {step === 'selection' ? (
          <div className="flex flex-col lg:flex-row gap-16">
            {/* Left Side: Selection */}
            <div className="flex-1 space-y-12">
              <div>
                <h2 className="text-[42px] font-black text-[#1C1C1E] tracking-tight mb-4 leading-tight">Complete your Boutique Activation</h2>
                <p className="text-[#6B6B70] text-[17px] font-medium">Join 500+ premium fashion stores using Kapde CRM intelligence.</p>
              </div>

              {/* Billing Cycle Switcher */}
              <div className="space-y-4">
                <h3 className="text-[#1C1C1E] text-[12px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Billing Cycle</h3>
                <div className="bg-white border border-[#E2DED6] p-1.5 rounded-[24px] flex max-w-[360px] shadow-sm relative overflow-hidden">
                   <button 
                     onClick={() => setBillingCycle('monthly')}
                     className={`flex-1 py-4 px-6 rounded-[18px] font-black text-[14px] transition-all relative z-10 ${billingCycle === 'monthly' ? 'text-white' : 'text-[#6B6B70] hover:text-[#1C1C1E]'}`}
                   >
                     Monthly
                   </button>
                   <button 
                     onClick={() => setBillingCycle('yearly')}
                     className={`flex-1 py-4 px-6 rounded-[18px] font-black text-[14px] transition-all relative z-10 ${billingCycle === 'yearly' ? 'text-white' : 'text-[#6B6B70] hover:text-[#1C1C1E]'}`}
                   >
                     Yearly <span className="ml-1 text-[10px] bg-[#1D9E75] text-white px-2 py-0.5 rounded-full shadow-sm">Save 25%</span>
                   </button>
                   <div 
                     className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#1C1C1E] rounded-[18px] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${billingCycle === 'yearly' ? 'left-[calc(50%+3px)]' : 'left-1.5'}`}
                   ></div>
                </div>
              </div>

              {/* Plan Selector */}
              <div className="space-y-4">
                <h3 className="text-[#1C1C1E] text-[12px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Subscription Plan</h3>
                <div className="bg-white border border-[#E2DED6] p-2.5 rounded-[28px] shadow-sm inline-flex w-full">
                  <button 
                    onClick={() => setCurrentPlan('Professional')}
                    className={`flex-1 py-4.5 px-8 rounded-[20px] font-black transition-all ${currentPlan === 'Professional' ? 'bg-[#a855f7] text-white shadow-xl shadow-purple-200' : 'text-[#6B6B70] hover:bg-[#f3f0ea] hover:text-[#1C1C1E]'}`}
                  >
                    Professional
                  </button>
                  <button 
                    onClick={() => setCurrentPlan('Business')}
                    className={`flex-1 py-4.5 px-8 rounded-[20px] font-black transition-all ${currentPlan === 'Business' ? 'bg-[#a855f7] text-white shadow-xl shadow-purple-200' : 'text-[#6B6B70] hover:bg-[#f3f0ea] hover:text-[#1C1C1E]'}`}
                  >
                    Business
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-5">
                 <h3 className="text-[#1C1C1E] text-[12px] font-black uppercase tracking-[0.2em] opacity-40 ml-1">Payment Method</h3>
                
                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-7 rounded-[32px] border-2 transition-all flex items-center justify-between cursor-pointer group ${paymentMethod === 'upi' ? 'bg-[#f3e8ff] border-[#a855f7] shadow-lg shadow-purple-100' : 'bg-white border-[#E2DED6] hover:border-[#a855f7]/30'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform">&#128241;</div>
                    <div>
                      <div className="font-black text-[18px]">UPI Transfer</div>
                      <div className="text-[13px] text-[#6B6B70] font-medium tracking-wide">Instant activation via GPay, PhonePe or any app</div>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'upi' ? 'border-[#a855f7]' : 'border-[#E2DED6]'}`}>
                    {paymentMethod === 'upi' && <div className="w-4 h-4 rounded-full bg-[#a855f7]"></div>}
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-7 rounded-[32px] border-2 transition-all flex items-center justify-between cursor-pointer group ${paymentMethod === 'card' ? 'bg-[#f3e8ff] border-[#a855f7] shadow-lg shadow-purple-100' : 'bg-white border-[#E2DED6] hover:border-[#a855f7]/30'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-sm group-hover:scale-110 transition-transform">&#128179;</div>
                    <div>
                      <div className="font-black text-[18px]">Credit / Debit Card</div>
                      <div className="text-[13px] text-[#6B6B70] font-medium tracking-wide">All International & Local Cards accepted</div>
                    </div>
                  </div>
                  <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'card' ? 'border-[#a855f7]' : 'border-[#E2DED6]'}`}>
                    {paymentMethod === 'card' && <div className="w-4 h-4 rounded-full bg-[#a855f7]"></div>}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Final Summary Card */}
            <div className="w-full lg:w-[440px]">
              <div className="bg-white border border-[#E2DED6] rounded-[48px] p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)] sticky top-32 overflow-hidden">
                {/* Visual Flair */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#a855f7]/10 to-transparent rounded-bl-[100px]"></div>
                
                <h3 className="text-[22px] font-black mb-10 pb-5 border-b border-[#FAF8F4] relative z-10">Checkout Review</h3>
                
                <div className="space-y-8 mb-12 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B6B70] font-bold tracking-wide uppercase text-[11px]">Selected Tier</span>
                    <span className="bg-[#f3e8ff] text-[#a855f7] px-5 py-1.5 rounded-full text-[13px] font-black uppercase tracking-widest">{currentPlan}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-[#6B6B70] font-bold tracking-wide uppercase text-[11px]">Billing Cycle</span>
                    <span className="text-[#1C1C1E] font-black capitalize text-[16px]">{billingCycle}</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-[#FAF8F4] pt-8">
                    <span className="text-[#6B6B70] font-bold tracking-wide uppercase text-[11px]">Amount to Pay</span>
                    <div className="text-right">
                       <div className="text-[36px] font-black text-[#1C1C1E] leading-none mb-1">{price}</div>
                       <div className="text-[12px] text-[#6B6B70] font-bold uppercase tracking-wider">per month</div>
                    </div>
                  </div>

                  {billingCycle === 'yearly' && (
                    <div className="p-5 bg-[#f3fbf9] border border-[#d1f2eb] rounded-[24px] flex justify-between items-center shadow-sm">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-[#1D9E75] uppercase tracking-widest opacity-60">Yearly Total</span>
                          <span className="text-[16px] font-black text-[#1D9E75]">{planData[currentPlan].totalYearly}</span>
                       </div>
                       <div className="text-[11px] font-black text-white bg-[#1D9E75] px-3 py-1 rounded-lg">Best Value</div>
                    </div>
                  )}

                  <div className="bg-[#FAF8F4] p-7 rounded-[32px] space-y-4">
                    <p className="text-[11px] font-black text-[#1C1C1E] uppercase tracking-[0.2em] opacity-30 mb-2">Premium Features</p>
                    {planData[currentPlan].features.map((f, i) => (
                      <div key={i} className="flex items-start gap-3 text-[14px] font-bold text-[#1C1C1E]/70 leading-relaxed">
                        <span className="text-[#a855f7] mt-1 text-[16px]">&#10003;</span> {f}
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => setStep('processing')}
                  className="w-full bg-gradient-to-r from-[#a855f7] to-[#f472b6] hover:shadow-2xl hover:shadow-purple-200 active:scale-[0.98] text-white font-black py-6 rounded-[24px] transition-all text-[18px] shadow-lg relative z-10"
                >
                   Complete Activation
                </button>
                <p className="text-center text-[12px] text-[#6B6B70] font-bold mt-6 relative z-10 uppercase tracking-widest opacity-60">
                   Encrypted Checkout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-[800px] mx-auto w-full">
            {paymentMethod === 'upi' ? (
              <UPIProcessing 
                price={price} 
                currentPlan={currentPlan} 
                billingCycle={billingCycle} 
                setStep={setStep} 
              />
            ) : (
              <CardProcessing 
                price={price} 
                setStep={setStep} 
              />
            )}
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes silk {
          0% { transform: translateX(-50%) skewY(-12deg); }
          100% { transform: translateX(50%) skewY(-12deg); }
        }
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 0.5; }
          90% { opacity: 0.5; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};
