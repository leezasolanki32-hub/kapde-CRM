import React, { useState, useEffect, useRef } from 'react';
import { Hero3DAnimation } from './components/Hero3DAnimation';

import { RegisterPage, LoginPage } from './components/auth/AuthPages';
import { Dashboard } from './components/dashboard/Dashboard';
import { PaymentPage } from './components/auth/PaymentPage';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { AIAssistantButton } from './components/ai/AIAssistantButton';
import './App.css';

/* ── Scroll Reveal Hook ── */
const useScrollReveal = () => {
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
};

/* ════════════════════════════════════════
   NAVBAR
   ════════════════════════════════════════ */
const Navbar = ({ setView, handleNavClick, view }) => {
  const isAuthPage = view === 'register' || view === 'login';
  const [scrolled, setScrolled] = useState(false);

  // Reset to transparent and top of page on refresh / home load
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    if (view === 'home') {
      setScrolled(false);
      window.scrollTo(0, 0);
    }
  }, [view]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${isAuthPage ? 'auth-navbar' : ''}`}>
      <div className="logo" onClick={() => setView('home')}>
        Kapde<span className="brand-crm">CRM</span>
      </div>
      {view === 'home' && (
        <div className="flex items-center gap-4">
          <ul className="nav-links">
            {['features', 'pricing', 'demo', 'about'].map(s => (
              <li key={s}><a href={`#${s}`} className="nav-link" onClick={e => handleNavClick(e, s)}>{s}</a></li>
            ))}
          </ul>
          <div className="nav-actions">
            <button onClick={() => setView('register')} className="btn-get-started">Join</button>
            <button onClick={() => setView('login')} className="btn-login">Login</button>
          </div>
        </div>
      )}
    </nav>

  );
};

/* ════════════════════════════════════════
   HERO — Editorial Fashion Layout
   ════════════════════════════════════════ */




/* ════════════════════════════════════════
   DASHBOARD PREVIEW
   ════════════════════════════════════════ */
const DashboardPreview = ({ setView }) => (
  <section id="demo" className="py-24 px-8" style={{ background: 'var(--bg-section-2)' }}>
    <div className="max-w-[1100px] mx-auto">
      <div className="text-center mb-16 reveal">
        <div className="section-label">Live Preview</div>
        <h2 className="section-heading">Your New <em style={{ color: 'var(--brand-accent)' }}>Command Center</em></h2>
        <p className="section-sub mx-auto">See how KapdeCRM transforms daily boutique operations into a seamless workflow.</p>
      </div>
      <div className="reveal dash-preview-frame">
        <div className="dash-preview-bar">
          <div className="dash-dot" style={{ background: '#FF5F57' }} />
          <div className="dash-dot" style={{ background: '#FEBC2E' }} />
          <div className="dash-dot" style={{ background: '#28C840' }} />
          <div className="flex-1 text-center text-[10px] font-bold tracking-[2px] uppercase text-[var(--text-muted)]">KapdeCRM — Live</div>
        </div>
        <div className="relative aspect-[16/9] bg-[#FDFCFB] overflow-hidden rounded-b-xl">
          <video src="/demo_video.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.05] origin-top" />
          <div className="absolute bottom-8 right-8 z-20">
            <button onClick={() => setView('register')} className="hero-cta-primary text-[13px] py-3 px-6 shadow-xl">Get Started →</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════
   CUSTOMER FEATURES
   ════════════════════════════════════════ */
const features = [
  { icon: '👥', title: 'Customer Profiles', desc: 'Store every detail, purchase history, and preferences in one unified profile.' },
  { icon: '📊', title: 'Sales Analytics', desc: 'Track revenue trends, top buyers, and spending patterns with stunning charts.' },
  { icon: '🔔', title: 'Smart Reminders', desc: 'Auto-remind for follow-ups, festivals, and restock alerts — never miss a sale.' },
  { icon: '⭐', title: 'VIP Segmentation', desc: 'Automatically identify and nurture your most valuable customers.' },
  { icon: '📦', title: 'Inventory Control', desc: 'Track every garment from hanger to customer with zero friction.' },
  { icon: '💬', title: 'WhatsApp Integration', desc: 'Send automated messages, offers, and updates directly via WhatsApp.' },
];

const CustomerFeatures = () => (
  <section id="features" className="py-24 px-8" style={{ background: 'var(--bg-section-1)' }}>
    <div className="max-w-[1100px] mx-auto">
      <div className="text-center mb-16 reveal">
        <div className="section-label" style={{ color: 'var(--brand-accent)' }}>Features</div>
        <h2 className="section-heading" style={{ color: 'var(--text-primary)' }}>Everything Your Shop <em style={{ color: 'var(--brand-accent)' }}>Needs</em></h2>
        <p className="section-sub mx-auto" style={{ color: 'var(--text-muted)' }}>Powerful tools designed for clothing retailers — no tech skills required.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className={`p-7 reveal reveal-delay-${(i % 4) + 1}`} style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '16px' }}>
            <div className="feature-icon-wrap"><span className="text-[22px]">{f.icon}</span></div>
            <h3 className="text-[16px] font-bold text-[var(--text-primary)] mb-2">{f.title}</h3>
            <p className="text-[13px] text-[var(--text-muted)] leading-[1.7]">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);



/* ════════════════════════════════════════
   TESTIMONIALS
   ════════════════════════════════════════ */
const testimonials = [
  { quote: 'This CRM transformed how I manage my boutique. Repeat sales went up 35% in just 2 months!', name: 'Sunita Agarwal', role: 'Sunita\'s Fashion Studio, Ahmedabad' },
  { quote: 'Finally a CRM that understands clothing retail. The inventory tracking alone saved us hours every week.', name: 'Raj Mehta', role: 'Royal Threads, Mumbai' },
  { quote: 'The WhatsApp automation feature is incredible. Our customer engagement has never been better.', name: 'Priya Sharma', role: 'Elegance Boutique, Delhi' },
];

const Testimonials = () => (
  <section className="py-24 px-8" style={{ background: 'var(--bg-section-1)' }}>
    <div className="max-w-[1100px] mx-auto">
      <div className="text-center mb-16 reveal">
        <div className="section-label">Testimonials</div>
        <h2 className="section-heading">Loved by <em style={{ color: 'var(--brand-accent)' }}>Retailers</em></h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className={`p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--border-color)] reveal reveal-delay-${i + 1}`}>
            <div className="text-[var(--brand-accent)] text-lg mb-4">★★★★★</div>
            <p className="text-[var(--text-primary)] text-[14px] leading-relaxed mb-6">"{t.quote}"</p>
            <div className="text-[13px] font-bold text-[var(--brand-primary)]">{t.name}</div>
            <div className="text-[11px] text-[var(--text-muted)] mt-1">{t.role}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════
   PRICING (reusing App.css classes)
   ════════════════════════════════════════ */
const Pricing = ({ setView, handlePlanSelection }) => {
  const [annual, setAnnual] = useState(false);
  return (
    <div className="pricing-page" id="pricing">
      <div className="top-label"><span>Pricing Plans</span></div>
      <div className="top-title" style={{ fontFamily: 'Cormorant Garamond,serif' }}>Invest in your shop's <em>growth</em></div>
      <div className="top-sub">No hidden fees. Cancel anytime. Start free — upgrade when you're ready.</div>
      <div className="toggle-wrap">
        <span className={`toggle-label ${!annual ? 'active' : ''}`} onClick={() => setAnnual(false)}>Monthly</span>
        <div className={`toggle-track ${annual ? 'on' : ''}`} onClick={() => setAnnual(!annual)}><div className="toggle-thumb" /></div>
        <span className={`toggle-label ${annual ? 'active' : ''}`} onClick={() => setAnnual(true)}>Annual</span>
        <span className="save-pill">Save 25%</span>
      </div>
      <div className="cards">
        {/* TRIAL */}
        <div className="plan-card reveal reveal-delay-1">
          <div className="card-header">
            <div className="plan-name">5-Day Trial</div>
            <div className="price-row"><span className="price-big">Free</span></div>
            <div className="price-annual">Full power for 5 days</div>
            <div className="plan-tagline">Experience KapdeCRM with no limitations for 5 days.</div>
          </div>
          <div className="card-features">
            <div className="feat-group-title">Included</div>
            {['Full Dashboard', 'Inventory Management', 'OTP Verification', 'WhatsApp Alerts', 'VIP Analysis'].map(f => (
              <div key={f} className="feat-row"><span className="icon yes">✓</span><span>{f}</span></div>
            ))}
          </div>
          <div className="card-footer">
            <div className="limit-note">No credit card required</div>
            <button onClick={() => setView('register')} className="plan-btn outline">Start Free Trial</button>
          </div>
        </div>
        {/* PROFESSIONAL */}
        <div className="plan-card featured reveal reveal-delay-2">
          <div className="pop-tag">★ Most Popular</div>
          <div className="card-header">
            <div className="plan-name t">Professional</div>
            <div className="price-row"><span className="price-big">{annual ? '₹749' : '₹999'}</span><span className="price-per">/mo</span></div>
            <div className="price-annual">{annual ? '₹8,988/year — Save ₹3,000' : 'Billed monthly'}</div>
            <div className="plan-tagline">For growing boutiques that want smarter insights.</div>
          </div>
          <div className="card-features">
            <div className="feat-group-title">Management</div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Unlimited Sales & Customers</span><span className="feat-badge">Unlimited</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Advanced Inventory</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>CSV Import & Export</span></div>
            <div className="feat-group-title">Analytics</div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Revenue Forecasting</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Festival Alerts</span><span className="feat-badge">Auto</span></div>
            <div className="feat-group-title">Support</div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Priority Email + WhatsApp</span></div>
          </div>
          <div className="card-footer">
            <div className="limit-note">Best for single-store owners</div>
            <button onClick={() => handlePlanSelection('Professional', annual ? '₹749' : '₹999')} className="plan-btn solid">Get Professional</button>
          </div>
        </div>
        {/* BUSINESS */}
        <div className="plan-card enterprise reveal reveal-delay-3">
          <div className="ent-tag">👑 Business</div>
          <div className="card-header">
            <div className="plan-name g">Business</div>
            <div className="price-row"><span className="price-big">{annual ? '₹1,874' : '₹2,499'}</span><span className="price-per">/mo</span></div>
            <div className="price-annual">{annual ? '₹22,488/year — Save ₹7,500' : 'Billed monthly'}</div>
            <div className="plan-tagline">For multi-branch stores needing full power.</div>
          </div>
          <div className="card-features">
            <div className="feat-group-title">Expansion</div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Up to 5 Branches</span><span className="feat-badge gold">Multi-Store</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Unlimited Staff</span></div>
            <div className="feat-group-title">Marketing</div>
            <div className="feat-row"><span className="icon yes">✓</span><span>WhatsApp Automation</span><span className="feat-badge gold">New</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Loyalty Points</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>AI Sales Predictions</span></div>
            <div className="feat-group-title">Support</div>
            <div className="feat-row"><span className="icon yes">✓</span><span>Dedicated Account Manager</span></div>
            <div className="feat-row"><span className="icon yes">✓</span><span>24/7 On-call Support</span></div>
          </div>
          <div className="card-footer">
            <div className="limit-note">Free onboarding included</div>
            <button onClick={() => handlePlanSelection('Business', annual ? '₹1,874' : '₹2,499')} className="plan-btn gold-btn">Get Business Plan</button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════
   FAQ
   ════════════════════════════════════════ */
const faqData = [
  { q: 'Can I switch plans anytime?', a: 'Yes! Upgrade or downgrade instantly. Billing adjusts automatically.' },
  { q: 'Is my data safe?', a: 'Absolutely. Encrypted, backed up daily, and you own your data — export anytime.' },
  { q: 'Do I need a computer?', a: 'KapdeCRM works on both mobile and desktop. Manage from anywhere.' },
  { q: 'What happens after trial?', a: 'Your data stays safe. You move to free tier — upgrade whenever ready.' },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="py-24 px-8" style={{ background: 'var(--bg-section-2)', borderTop: '1px solid var(--border-color)' }}>
      <div className="max-w-[700px] mx-auto">
        <div className="text-center mb-12 reveal">
          <h2 className="section-heading">Frequently Asked <em style={{ color: 'var(--brand-accent)' }}>Questions</em></h2>
        </div>
        {faqData.map((item, i) => (
          <div key={i} className="reveal mb-3 overflow-hidden cursor-pointer rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]" onClick={() => setOpen(open === i ? null : i)}>
            <div className="flex justify-between items-center p-5">
              <span className="text-[15px] font-semibold text-[var(--text-primary)]">{item.q}</span>
              <span className="text-[var(--brand-primary)] text-[12px] transition-transform" style={{ transform: open === i ? 'rotate(180deg)' : '' }}>▼</span>
            </div>
            <div style={{ maxHeight: open === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
              <div className="px-5 pb-5 text-[14px] text-[var(--text-secondary)] leading-[1.7]">{item.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ════════════════════════════════════════
   FINAL CTA
   ════════════════════════════════════════ */
const FinalCTA = ({ setView }) => (
  <section className="py-24 px-8 text-center" style={{ background: 'var(--bg-section-1)', color: 'var(--text-primary)' }}>
    <div className="reveal">
      <h2 className="section-heading mb-4" style={{ color: 'var(--text-primary)' }}>Start Managing Smarter <em style={{ color: 'var(--brand-accent)' }}>Today</em></h2>
      <p className="text-[var(--text-muted)] text-[15px] mb-8">Join 500+ clothing shops already using KapdeCRM</p>
      <button onClick={() => setView('register')} className="hero-cta-primary">Create Free Account →</button>
    </div>
  </section>
);

/* ════════════════════════════════════════
   ABOUT SECTION — Editorial Brand Story
   ════════════════════════════════════════ */
const About = () => (
  <section id="about" className="py-24 px-8" style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)' }}>
    <div className="max-w-[1100px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Brand Narrative */}
        <div className="lg:col-span-7 reveal">
          <div className="section-label">Our Story</div>
          <h2 className="section-heading" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700 }}>
            Tailored for the Art of <em style={{ color: 'var(--brand-accent)' }}>Boutique</em> Retail
          </h2>
          <div className="text-[15px] text-[var(--text-secondary)] space-y-6 leading-[1.8] mt-6">
            <p>
              Traditional CRMs are built for enterprise tech teams, packed with cluttered columns and complex spreadsheets. But we believe clothing boutiques operate on a different frequency — one of personal styling, touch, and deep human relationships.
            </p>
            <p>
              <strong>KapdeCRM</strong> was born out of a desire to bring digital elegance to fashion curators. We wanted to design a workspace as premium as the silk on your racks, helping you remember client sizes, favorite designer labels, and specific outfit preferences without breaking your flow.
            </p>
            <p className="italic text-[var(--brand-primary)] font-medium">
              "Our mission is simple: to preserve the intimacy of custom tailoring and premium retail in a modern, automated world."
            </p>
          </div>

          {/* Visual Stats Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 pt-8 border-t" style={{ borderColor: 'var(--border-color)' }}>
            {[
              { value: '500+', label: 'Boutiques' },
              { value: '10k+', label: 'Customers' },
              { value: '35%', label: 'Repeat Boost' },
              { value: '99%', label: 'Retention' }
            ].map((stat, i) => (
              <div key={i} className="text-center sm:text-left">
                <div className="text-[28px] font-bold text-[var(--text-primary)]" style={{ fontFamily: 'Playfair Display, serif' }}>{stat.value}</div>
                <div className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider font-semibold mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Editorial Columns / Feature Showcases */}
        <div className="lg:col-span-5 space-y-6 reveal reveal-delay-2">
          {[
            {
              icon: '✨',
              title: 'Personalized Touch',
              desc: 'Remember client birthdays, fit profiles, and purchase sizes. Build styling sheets that feel incredibly personal.'
            },
            {
              icon: '🧵',
              title: 'Seamless Curation',
              desc: 'Track fabric inventory, vendor orders, and custom tailoring requests from hanger to checkout with ease.'
            },
            {
              icon: '💌',
              title: 'Smart Connections',
              desc: 'Deliver automated WhatsApp previews, collection launches, and festival greetings in seconds.'
            }
          ].map((item, idx) => (
            <div key={idx} className="flex gap-4 p-5 rounded-2xl transition-all" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <div className="text-[24px] flex-shrink-0 mt-1">{item.icon}</div>
              <div>
                <h4 className="text-[15px] font-bold text-[var(--text-primary)] mb-1">{item.title}</h4>
                <p className="text-[13px] text-[var(--text-muted)] leading-[1.6]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </section>
);

/* ════════════════════════════════════════
   FOOTER
   ════════════════════════════════════════ */
const Footer = () => (
  <footer className="py-12 px-8 text-center" style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)' }}>
    <p className="text-[var(--text-muted)] text-[12px]">© 2025 <span className="text-[var(--brand-primary)]">KapdeCRM</span> — Built with love for clothing shop owners</p>
  </footer>
);

/* ════════════════════════════════════════
   APP
   ════════════════════════════════════════ */
function App() {
  const [view, setView] = useState('home');
  const [selectedPlan, setSelectedPlan] = useState({ name: 'Professional', price: '₹999' });
  const [currentUser, setCurrentUser] = useState(null);
  useScrollReveal();

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    if (view !== 'home') {
      setView('home');
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanSelection = (name, price) => {
    setSelectedPlan({ name, price });
    setView('payment');
  };

  return (
    <div className="font-sans bg-[var(--bg-main)] text-[var(--text-primary)] text-[15px] leading-[1.6] min-h-screen flex flex-col">
      {(view === 'home' || view === 'register' || view === 'login') && <Navbar setView={setView} handleNavClick={handleNavClick} view={view} />}
      <div className="flex-1 block">
        {view === 'home' && (
          <>
            <div style={{ display: 'block', width: '100%', position: 'relative' }}>
              <Hero3DAnimation setView={setView} />
            </div>
            <DashboardPreview setView={setView} />
            <CustomerFeatures />
            <Testimonials />
            <Pricing setView={setView} handlePlanSelection={handlePlanSelection} />
            <About />
            <FAQ />
            <FinalCTA setView={setView} />
          </>
        )}
        {view === 'features' && <CustomerFeatures />}
        {view === 'pricing' && <Pricing setView={setView} handlePlanSelection={handlePlanSelection} />}
        {view === 'about' && (
          <div className="pt-16">
            <About />
            <FinalCTA setView={setView} />
          </div>
        )}
        {view === 'demo' && <DashboardPreview setView={setView} />}
        {view === 'dashboard' && <Dashboard setView={setView} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        {view === 'admin-dashboard' && <AdminDashboard setView={setView} currentUser={currentUser} setCurrentUser={setCurrentUser} />}
        {view === 'payment' && <PaymentPage setView={setView} selectedPlan={selectedPlan.name} price={selectedPlan.price} />}
        {view === 'register' && <RegisterPage setView={setView} />}
        {view === 'login' && <LoginPage setView={setView} setCurrentUser={setCurrentUser} />}
      </div>
      {view === 'home' && <Footer />}

      {/* Global AI Assistant for Landing Page and Dashboard */}
      {(view === 'home' || view === 'dashboard' || view === 'admin-dashboard') && (
        <AIAssistantButton context={view === 'home' ? 'landing' : 'dashboard'} />
      )}
    </div>
  );
}

export default App;
