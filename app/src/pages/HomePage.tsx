import GradientGlowBackground from '../components/GradientGlowBackground';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';
import Button from '../components/Button';
import SEO from '../components/SEO';
import Accordion from '../components/Accordion';
import { Monitor, Target, Search, Palette, Code, ClipboardList, PenTool, TrendingUp, Star, CheckCircle, Zap, Shield, HeartHandshake, HelpCircle, Infinity, MapPin, Compass, Lock, CreditCard, LayoutGrid, Cloud, Globe, Coins, UtensilsCrossed, Scale, Heart, Car, Sparkles, Building, Wrench, Rocket } from 'lucide-react';
import { useState } from 'react';

const services = [
  { icon: Monitor, title: 'Website Design', description: 'Modern websites that make your business look professional and turn visitors into leads.', link: '/services/web-development' },
  { icon: Search, title: 'SEO & Content', description: 'Search-friendly pages and content that help customers find you online.', link: '/services/seo-content' },
  { icon: Palette, title: 'Branding & Graphics', description: 'Logos, social posts, flyers, and brand visuals that make your business look trusted.', link: '/services/creative-studio' },
  { icon: Target, title: 'Paid Advertising', description: 'Facebook, Instagram, and Google ad campaigns designed to bring enquiries.', link: '/services/paid-advertising' },
  { icon: Zap, title: 'Automation & Systems', description: 'Forms, booking systems, CRM flows, and WhatsApp integrations to save time.', link: '/services/saas-products' },
  { icon: TrendingUp, title: 'Business Growth Support', description: 'Ongoing digital support for updates, campaigns, and improvements.', link: '/services' },
];



const processSteps = [
  { icon: ClipboardList, title: 'Free Consultation', description: 'We understand your business and goals.' },
  { icon: PenTool, title: 'Plan & Content', description: 'We prepare the website structure, content, and growth plan.' },
  { icon: Code, title: 'Design & Build', description: 'We create a clean, mobile-friendly, professional website.' },
  { icon: TrendingUp, title: 'Launch & Support', description: 'We help you go live and guide you after launch.' },
];

const whyDigioverse = [
  { icon: Zap, title: 'No Generic Templates', desc: 'Hand-crafted, custom React and Next.js platforms built from scratch. Absolutely zero page-builders or slow code frameworks.' },
  { icon: Search, title: 'Dominate UK Search', desc: 'Enterprise semantic SEO structured directly into the code. Comprehensive local schema, keyword mapping, and local GBP setup.' },
  { icon: CheckCircle, title: 'Conversion First Design', desc: 'Strategic copy structures, premium custom booking panels, and instant-messaging integrations built to maximize leads.' },
  { icon: Shield, title: 'Lightning Fast Speeds', desc: 'Decoupled, statically-generated code assets optimized to load under 0.8s. Absolute perfection on Google Core Web Vitals.' },
  { icon: HelpCircle, title: 'Built For All Industries', desc: 'Specialized architectures for legal services, accounting, medical clinics, ecommerce stores, home maintenance, and SaaS platforms.' },
  { icon: HeartHandshake, title: 'Direct Founder Access', desc: 'Work directly with founders Ahsan (7+ years of experience in SEO & development) and Mehar Hassan (12+ years of experience in digital marketing and growth).' }
];

const team = [
  { 
    name: 'Ahsan', 
    role: 'Managing Director, Co-Founder & Developer', 
    bio: 'With 7+ years of professional experience in SEO, digital marketing, and full-stack software engineering, Ahsan drives the core technical architecture and organic visibility strategies for Digioverse.', 
    image: '/assets/ahsan_founder.jpg' 
  },
  { 
    name: 'Mehar Hassan', 
    role: 'Co-Founder & Head of Growth', 
    bio: 'Bringing 12+ years of elite experience in digital strategy and customer acquisition, Mehar Hassan architects high-converting advertising funnels and client growth pipelines that scale businesses.', 
    image: '/assets/mehar_founder.png' 
  },
  { 
    name: 'Musa Shahzad', 
    role: 'Senior Web & Automation Engineer', 
    bio: 'With 4+ years of specialized experience in high-performance frontend frameworks and deep database/API integrations, Musa constructs robust web applications and automated workflows.', 
    image: '/assets/musa.png' 
  },
];

const previewPackages = [
  { name: 'Starter Website', price: '£499*', desc: 'Custom 5-page setup ideal for startups.' },
  { name: 'Business Website', price: '£999', desc: '10-page premium setup with full Booking/CMS.' },
  { name: 'Premium Website', price: '£1,499', desc: 'Custom enterprise branding and UI animations.' },
  { name: 'Ecommerce Store', price: '£699', desc: 'Shopify / WooCommerce scaling powerhouse.' }
];

const trustLogos = [
  { name: 'Omnilo', icon: Infinity },
  { name: 'LocatePro', icon: MapPin },
  { name: 'BrightPath', icon: Compass },
  { name: 'TechVault', icon: Lock },
  { name: 'NovaPay', icon: CreditCard },
  { name: 'UrbanGrid', icon: LayoutGrid },
  { name: 'CloudSync', icon: Cloud },
  { name: 'Digioverse', icon: Globe },
];

export default function HomePage() {
  const [leadState, setLeadState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [leadForm, setLeadForm] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    budget: '£100 - £500',
    message: '',
    website: '', // honeypot spam protection
  });

  const submitLead = async (event: React.FormEvent) => {
    event.preventDefault();

    if (leadForm.website) {
      // If honeypot is filled, simulate success silently
      setLeadState('success');
      setLeadForm({ name: '', email: '', service: 'Web Development', budget: '£100 - £500', message: '', website: '' });
      return;
    }

    setLeadState('loading');

    try {
      const payload = {
        _subject: 'New Lead Plan Request - Homepage',
        name: leadForm.name,
        email: leadForm.email,
        service: leadForm.service,
        budget: leadForm.budget,
        message: leadForm.message,
      };

      const promise1 = fetch('https://formsubmit.co/ajax/thedigioverse@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const promise2 = fetch('https://formsubmit.co/ajax/digioverseuk@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const [res1, res2] = await Promise.all([promise1, promise2]);

      if (!res1.ok && !res2.ok) {
        throw new Error('Lead form failed');
      }

      setLeadState('success');
      setLeadForm({ name: '', email: '', service: 'Web Development', budget: '£100 - £500', message: '', website: '' });
    } catch (error) {
      console.error(error);
      setLeadState('error');
    }
  };

  return (
    <>
      <SEO 
        title="Web Design & Digital Marketing Agency UK | Digioverse" 
        description="Digioverse helps UK businesses build powerful websites, stronger brands, and digital systems that convert visitors into real customers. Book a free same-day appointment."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Digioverse",
            "alternateName": "DIGIOVERSE LTD",
            "url": "https://digioverse.com",
            "logo": "https://digioverse.com/assets/favicon.jpg",
            "telephone": "+442046155575",
            "email": "support@digioverse.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "1A North Rd",
              "addressLocality": "Woking",
              "addressRegion": "Surrey",
              "postalCode": "GU21 5DS",
              "addressCountry": "GB"
            },
            "sameAs": [
              "https://clutch.co/profile/digioverse"
            ]
          })
        }}
      />

      {/* Hero */}
      <section className="relative min-h-[90dvh] bg-[#0d0520] overflow-hidden flex items-center pt-24 pb-12">
        <GradientGlowBackground />
        <div className="absolute inset-0 bg-[rgba(13,5,32,0.26)] mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_52%,rgba(106,0,255,0.34),transparent_34%),linear-gradient(180deg,rgba(13,5,32,0.34)_0%,rgba(13,5,32,0.2)_34%,rgba(13,5,32,0.9)_100%)] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 220px rgba(13,5,32,0.76)' }} />

        <div className="relative z-[2] max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pb-6 w-full pointer-events-none">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_420px] gap-10 lg:gap-16 items-end pointer-events-auto">
            <div className="max-w-[720px]">
              <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#c7a7ff] mb-4">UK Digital Growth Agency</span>
              <CharacterScatter
                text="Professional Websites & Digital Marketing That Bring Real Customers"
                className="hero-title text-[#f7f7fa] font-['Plus_Jakarta_Sans']"
                as="h1"
                delay={0.6}
              />
              <p className="text-lg text-[rgba(247,247,250,0.8)] mt-4 max-w-[620px] leading-relaxed opacity-0 animate-[fadeUp_0.8s_ease_1.2s_forwards]">
                Digioverse helps UK businesses build modern websites, stronger brands, SEO-ready content, and digital marketing systems that turn visitors into enquiries, bookings, and sales.
              </p>
              <div className="flex flex-wrap gap-4 mt-6 opacity-0 animate-[fadeUp_0.8s_ease_1.6s_forwards]">
                <Button to="/book-appointment">Book Free Appointment</Button>
                <Button variant="ghost" to="/pricing">View Website Packages</Button>
              </div>
              <div className="flex items-center gap-8 mt-8 opacity-0 animate-[fadeUp_0.6s_ease_2.0s_forwards]">
                <span className="text-xs text-[rgba(247,247,250,0.6)]">Trusted by startups, local businesses, service providers, and growing brands.</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 text-[#6a00ff] fill-[#6a00ff]" />)}
                </div>
                <span className="text-xs text-[rgba(247,247,250,0.6)]">4.9/5 Client Rating</span>
              </div>
            </div>

            <form
              onSubmit={submitLead}
              className="w-full rounded-[28px] border border-white/20 bg-white/90 p-6 md:p-7 shadow-[0_28px_80px_rgba(13,5,32,0.32)] backdrop-blur-[22px] opacity-0 animate-[fadeUp_0.8s_ease_1.35s_forwards]"
            >
              <div className="mb-5">
                <span className="text-[11px] font-extrabold uppercase tracking-wide text-[#6a00ff]">Free Growth Review</span>
                <h2 className="mt-2 text-2xl font-extrabold leading-tight text-[#0d0520] font-['Plus_Jakarta_Sans']">Get a Free Website & Growth Plan</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#53445f]">Tell us about your business and we’ll send you the best plan for your website, branding, SEO, or digital marketing.</p>
              </div>

              <div className="space-y-3">
                {/* Honeypot field for spam prevention */}
                <div className="hidden" aria-hidden="true">
                  <input
                    type="text"
                    name="website"
                    value={leadForm.website}
                    onChange={(event) => setLeadForm({ ...leadForm, website: event.target.value })}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <input
                  required
                  minLength={2}
                  value={leadForm.name}
                  onChange={(event) => setLeadForm({ ...leadForm, name: event.target.value })}
                  className="w-full rounded-2xl border border-[#ddd0f4] bg-white px-4 py-3 text-sm font-medium text-[#0d0520] outline-none transition focus:border-[#6a00ff] focus:shadow-[0_0_0_4px_rgba(106,0,255,0.12)]"
                  placeholder="Your name"
                />
                <input
                  required
                  type="email"
                  value={leadForm.email}
                  onChange={(event) => setLeadForm({ ...leadForm, email: event.target.value })}
                  className="w-full rounded-2xl border border-[#ddd0f4] bg-white px-4 py-3 text-sm font-medium text-[#0d0520] outline-none transition focus:border-[#6a00ff] focus:shadow-[0_0_0_4px_rgba(106,0,255,0.12)]"
                  placeholder="Email address"
                />
                <select
                  value={leadForm.service}
                  onChange={(event) => setLeadForm({ ...leadForm, service: event.target.value })}
                  className="w-full rounded-2xl border border-[#ddd0f4] bg-white px-4 py-3 text-sm font-medium text-[#0d0520] outline-none transition focus:border-[#6a00ff] focus:shadow-[0_0_0_4px_rgba(106,0,255,0.12)]"
                >
                  {['Web Development', 'Paid Advertising', 'SEO & Content', 'Creative Studio', 'SaaS Product', 'Not Sure Yet'].map((service) => (
                    <option key={service}>{service}</option>
                  ))}
                </select>
                <select
                  value={leadForm.budget}
                  onChange={(event) => setLeadForm({ ...leadForm, budget: event.target.value })}
                  className="w-full rounded-2xl border border-[#ddd0f4] bg-white px-4 py-3 text-sm font-medium text-[#0d0520] outline-none transition focus:border-[#6a00ff] focus:shadow-[0_0_0_4px_rgba(106,0,255,0.12)]"
                >
                  {['£100 - £500', '£500 - £1,500', '£1,500 - £3,000', '£3,000 - £5,000', '£5,000 - £10,000', '£10,000+'].map((tier) => (
                    <option key={tier} value={tier}>Budget: {tier}</option>
                  ))}
                </select>
                <textarea
                  required
                  minLength={12}
                  value={leadForm.message}
                  onChange={(event) => setLeadForm({ ...leadForm, message: event.target.value })}
                  className="min-h-[96px] w-full resize-y rounded-2xl border border-[#ddd0f4] bg-white px-4 py-3 text-sm font-medium text-[#0d0520] outline-none transition focus:border-[#6a00ff] focus:shadow-[0_0_0_4px_rgba(106,0,255,0.12)]"
                  placeholder="Tell us about your business, goals, or what you want to improve."
                />
              </div>

              <button
                type="submit"
                disabled={leadState === 'loading'}
                className="mt-4 w-full rounded-full bg-gradient-to-r from-[#6a00ff] to-[#3b0a75] px-6 py-3.5 text-sm font-extrabold text-white shadow-[0_18px_42px_rgba(106,0,255,0.28)] transition hover:-translate-y-0.5 disabled:opacity-60"
              >
                {leadState === 'loading' ? 'Sending...' : 'Get My Free Plan'}
              </button>
              {leadState === 'success' && <p className="mt-3 text-center text-sm font-semibold text-[#3b0a75]">Thank you. We will contact you shortly.</p>}
              {leadState === 'error' && <p className="mt-3 text-center text-sm font-semibold text-red-600">Could not send. Please try again or use the contact page.</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-[#f7f7fa] pt-12 pb-6 border-b border-[#ddd0f4]/35">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-[#7d718c] mb-8">
            Trusted by UK startups, local businesses, service brands, and growing companies
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-[1000px] mx-auto">
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#ddd0f4]/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300">
              <Zap className="w-6 h-6 text-[#6a00ff] mb-2" />
              <span className="text-xs md:text-sm font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">Fast Website Delivery</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#ddd0f4]/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300">
              <Search className="w-6 h-6 text-[#6a00ff] mb-2" />
              <span className="text-xs md:text-sm font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">SEO-Friendly Structure</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#ddd0f4]/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300">
              <ClipboardList className="w-6 h-6 text-[#6a00ff] mb-2" />
              <span className="text-xs md:text-sm font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">WhatsApp & Lead Forms</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl border border-[#ddd0f4]/60 hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300">
              <Coins className="w-6 h-6 text-[#6a00ff] mb-2" />
              <span className="text-xs md:text-sm font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">Affordable UK Packages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar (Marquee Logo Slider) */}
      <section className="bg-[#f7f7fa] py-8 border-b border-[#ddd0f4]/50 relative overflow-hidden">
        {/* Marquee Wrapper with Fade Gradients */}
        <div className="relative w-full overflow-hidden py-4 select-none bg-[#f7f7fa]">
          {/* Left Gradient Fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#f7f7fa] via-[#f7f7fa]/80 to-transparent z-10 pointer-events-none" />
          
          {/* Slider Container */}
          <div className="flex w-max animate-[marquee_25s_linear_infinite] hover:[animation-play-state:paused] items-center">
            {/* Set 1 */}
            <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {trustLogos.map((logo, idx) => (
                <div key={`logo-1-${idx}`} className="flex items-center gap-3 text-[#7d718c]/70 hover:text-[#6a00ff] transition-colors duration-300">
                  <logo.icon className="w-6 h-6 stroke-[2]" />
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">{logo.name}</span>
                </div>
              ))}
            </div>
            {/* Set 2 (Duplicate for seamless loop) */}
            <div className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24">
              {trustLogos.map((logo, idx) => (
                <div key={`logo-2-${idx}`} className="flex items-center gap-3 text-[#7d718c]/70 hover:text-[#6a00ff] transition-colors duration-300">
                  <logo.icon className="w-6 h-6 stroke-[2]" />
                  <span className="text-xl md:text-2xl font-extrabold tracking-tight font-['Plus_Jakarta_Sans']">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#f7f7fa] via-[#f7f7fa]/80 to-transparent z-10 pointer-events-none" />
        </div>

        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatCounter value={500} suffix="+" label="Websites Delivered" />
            <StatCounter value={150} suffix="+" label="SEO Campaigns" />
            <StatCounter value={50} suffix="+" label="SaaS Products Built" />
            <StatCounter value={40} suffix="+" label="Industries Served" />
          </div>
        </div>
      </section>

      {/* Starting from £99 Website Package Section */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-20 border-b border-[#ddd0f4]/60">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="bg-white rounded-[32px] border border-[#ddd0f4] p-8 md:p-12 shadow-[0_20px_50px_rgba(13,5,32,0.04)] relative overflow-hidden">
            {/* Glowing corner or background accent */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[rgba(106,0,255,0.03)] translate-x-1/3 -translate-y-1/3 pointer-events-none" />
            
            <div className="grid lg:grid-cols-[1fr_minmax(0,480px)] gap-10 lg:gap-16 items-center">
              <div>
                <span className="inline-block text-xs font-semibold uppercase tracking-wide text-[#6a00ff] mb-4">Affordable Launch Package</span>
                <CharacterScatter 
                  text="Launch Your Business Online from £99" 
                  className="text-[32px] sm:text-[42px] md:text-[52px] font-extrabold text-[#0d0520] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" 
                  as="h2" 
                />
                <p className="text-base md:text-lg text-[#53445f] mt-4 leading-relaxed">
                  Perfect for startups, small businesses, and service providers who need a clean, professional website without high upfront costs.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button to="/pricing">See Website Packages</Button>
                  <Button variant="ghost" to="/book-appointment">Book Discovery Call</Button>
                </div>
              </div>

              <div className="bg-[#f7f7fa] rounded-2xl border border-[#ddd0f4]/80 p-6 md:p-8">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-sm font-bold text-[#7d718c] uppercase">Starting at</span>
                  <span className="text-4xl md:text-5xl font-black text-[#0d0520] font-['Plus_Jakarta_Sans']">£99</span>
                  <span className="text-xs text-[#7d718c] font-semibold uppercase">one-off</span>
                </div>
                <ul className="space-y-4">
                  {[
                    'Domain & Hosting Guidance',
                    'Business Email Setup',
                    'Mobile-Friendly Website',
                    'Contact / WhatsApp Form',
                    'Basic SEO Setup',
                    '7 Days Support'
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-[#53445f] font-semibold">
                      <CheckCircle className="w-5 h-5 text-[#6a00ff] shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Website Packages Preview Section */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Pricing</span>
              <CharacterScatter 
                text="Transparent Website Packages" 
                className="text-[36px] md:text-[56px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" 
                as="h2" 
              />
              <p className="text-base text-[#53445f] mt-4 max-w-[500px]">
                High-end design matching your exact business stage. Clear rates, zero hidden extras.
              </p>
            </div>
            <Button variant="secondary" to="/pricing">View Feature Comparison</Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {previewPackages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.08} className="bg-white border border-[#ddd0f4] p-8 rounded-[24px] hover:shadow-[0_20px_40px_rgba(13,5,32,0.06)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{pkg.name}</h3>
                  <p className="text-xs text-[#7d718c] mt-2 leading-relaxed h-10">{pkg.desc}</p>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">{pkg.price}</span>
                    <span className="text-[10px] text-[#7d718c] font-semibold uppercase">one-off</span>
                  </div>
                </div>
                <Button to="/book-appointment" variant="tertiary" className="w-full mt-6 text-center">
                  Book Discovery Call
                </Button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">What We Do</span>
            <CharacterScatter text="Everything Your Business Needs to Grow Online" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-lg text-[#53445f] mt-4 max-w-[520px] leading-relaxed">From acquisition campaigns to web platforms and brand systems, we build the full growth stack.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.12}>
                <ServiceCard {...s} />
              </ScrollReveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" to="/services">View All Services</Button>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase / Recent Work (Minimized Teaser) */}
      <section className="bg-[#f7f7fa] py-16 md:py-20 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Projects</span>
            <CharacterScatter text="Bespoke Work Built for Commercial Impact" className="text-[36px] md:text-[56px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-base text-[#53445f] mt-4 max-w-[620px] mx-auto leading-relaxed">
              Explore our full collection of custom website systems, digital products, SEO search campaigns, and high-ROI landing pages built for businesses across the UK.
            </p>
            <div className="mt-8">
              <Button to="/work">Explore Our Projects Portfolio &rarr;</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SaaS Products (Minimized Teaser) */}
      <section className="bg-[#f7f7fa] py-16 md:py-20 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 text-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#3b0a75]">Our SaaS Products</span>
            <CharacterScatter text="Proprietary Tools Built to Automate Operations" className="text-[36px] md:text-[56px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-base text-[#53445f] mt-4 max-w-[620px] mx-auto leading-relaxed">
              We engineer managed cloud hosting services, legal CRM software, WhatsApp marketing automation suites, and custom database web applications.
            </p>
            <div className="mt-8">
              <Button to="/products" variant="secondary">View Our SaaS Products &rarr;</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Industries Section */}
      <section className="bg-[#f7f7fa] py-16 md:py-24 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center max-w-[800px] mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Industries We Serve</span>
            <CharacterScatter 
              text="Websites & Marketing for Different Industries" 
              className="text-[36px] md:text-[56px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" 
              as="h2" 
            />
            <p className="text-base md:text-lg text-[#53445f] mt-4 leading-relaxed">
              We design specialized digital conversion paths matching the unique demands of your specific sector.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Restaurants & Takeaways', icon: UtensilsCrossed },
              { name: 'Law Firms', icon: Scale },
              { name: 'Clinics & Dentists', icon: Heart },
              { name: 'Taxi & Transport', icon: Car },
              { name: 'Beauty & Fashion', icon: Sparkles },
              { name: 'Real Estate', icon: Building },
              { name: 'Local Services', icon: Wrench },
              { name: 'SaaS & Startups', icon: Rocket },
            ].map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.08} className="bg-white border border-[#ddd0f4]/70 p-6 rounded-[24px] hover:shadow-[0_15px_35px_rgba(13,5,32,0.04)] hover:-translate-y-1 transition-all duration-300 group text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl bg-[#6a00ff]/10 text-[#6a00ff] flex items-center justify-center mb-4 group-hover:bg-[#6a00ff] group-hover:text-white transition-all duration-300">
                  <ind.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="text-sm md:text-base font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-tight">{ind.name}</h3>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Digioverse Section */}
      <section className="bg-[#0d0520] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,0,255,0.06),transparent_50%)]" />
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-[800px] mx-auto mb-20">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Why Digioverse</span>
            <CharacterScatter 
              text="The Premium Standard in Custom Web Design & Growth" 
              className="text-[36px] md:text-[56px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" 
              as="h2" 
            />
            <p className="text-base md:text-lg text-[#c7a7ff] mt-4 leading-relaxed">
              We reject standard page builders and generic themes. Every Digioverse site is hand-coded in React & Next.js to deliver corporate luxury visuals, unbeatable speed, and absolute lead generation authority.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {whyDigioverse.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.08} className="bg-white/5 border border-white/10 hover:border-[#6a00ff]/30 hover:bg-white/10 p-8 rounded-[24px] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-[#6a00ff]/10 text-[#6a00ff] flex items-center justify-center group-hover:bg-[#6a00ff] group-hover:text-white transition-all duration-300">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#f7f7fa] font-['Plus_Jakarta_Sans'] mt-6">{item.title}</h3>
                <p className="text-[#c7a7ff]/80 text-sm mt-3 leading-relaxed">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Showcase */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center max-w-[800px] mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Team</span>
            <CharacterScatter text="Meet Our Founders & Technical Leaders" className="text-[36px] md:text-[56px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-base md:text-lg text-[#53445f] mt-4 leading-relaxed">
              We are a dedicated team of digital marketing, software development, and SEO experts committed to growing your business.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-[1080px] mx-auto">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.15} y={50}>
                <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(13,5,32,0.06)] hover:shadow-[0_8px_40px_rgba(13,5,32,0.12)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#6a00ff] to-[#3b0a75]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{member.name}</h4>
                    <span className="text-xs font-extrabold text-[#6a00ff] uppercase tracking-wider block mt-1">{member.role}</span>
                    <p className="text-sm text-[#53445f] mt-4 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16 md:py-24 border-t border-b border-[#ddd0f4]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Process</span>
            <CharacterScatter text="How We Work" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-lg text-[#53445f] mt-4 max-w-[480px] mx-auto leading-relaxed">A proven 4-step process that takes you from idea to launch — and beyond.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-4 gap-8 mt-16 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-[#6a00ff] to-[#3b0a75]" />
            {processSteps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.2} className="text-center relative">
                <div className="w-12 h-12 rounded-full border-2 border-[#6a00ff] flex items-center justify-center mx-auto bg-white z-10 relative">
                  <step.icon className="w-5 h-5 text-[#6a00ff]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-6">{step.title}</h3>
                <p className="text-[#53445f] mt-3 leading-relaxed text-sm">{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Reviews Section */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center max-w-[800px] mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Client Proof</span>
            <CharacterScatter 
              text="What Our Clients Say" 
              className="text-[36px] md:text-[56px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" 
              as="h2" 
            />
            <p className="text-base md:text-lg text-[#53445f] mt-4 leading-relaxed">
              We measure our success by the results, phone calls, and revenue we generate for our clients.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-[1100px] mx-auto">
            {[
              {
                text: "Digioverse built a bespoke booking system and website for our clinic. We saw a 45% increase in online bookings within the first month. Ahsan and the team are absolute professionals.",
                author: "Dr. Sarah Jenkins",
                role: "Director, Harley Street Clinic, London",
                rating: 5
              },
              {
                text: "As a startup, we needed a fast, high-quality website without breaking the bank. The £99 starter package and subsequent growth support helped us launch with full confidence. Highly recommended!",
                author: "Mark Henderson",
                role: "Founder, EcoClean UK",
                rating: 5
              },
              {
                text: "Our organic rankings were non-existent. After Digioverse implemented their technical SEO structure, our search traffic grew by 200% in 3 months. The lead forms and WhatsApp integration work seamlessly.",
                author: "David Cooper",
                role: "Director, Cooper & Sons Legal",
                rating: 5
              },
              {
                text: "The design looks incredibly premium. We've had so many clients compliment our new branding and website. It's rare to find an agency that delivers elite engineering and commercial strategy in one.",
                author: "Claire Robinson",
                role: "Founder, Robinson Beauty Surrey",
                rating: 5
              }
            ].map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="bg-white border border-[#ddd0f4]/80 p-8 rounded-[28px] shadow-[0_4px_24px_rgba(13,5,32,0.02)] hover:shadow-lg transition-all duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 text-[#6a00ff] fill-[#6a00ff]" />
                  ))}
                </div>
                <p className="text-[#53445f] text-base leading-relaxed italic">"{t.text}"</p>
                <div className="mt-6 pt-4 border-t border-[#ddd0f4]/50">
                  <h4 className="text-sm font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{t.author}</h4>
                  <p className="text-xs text-[#7d718c] font-medium mt-0.5">{t.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24 border-t border-b border-[#ddd0f4]/50">
        <div className="max-w-[850px] mx-auto px-5">
          <ScrollReveal className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">FAQ</span>
            <CharacterScatter text="Frequently Asked Questions" className="text-[32px] md:text-[48px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
          </ScrollReveal>
          <ScrollReveal>
            <div className="bg-[#f7f7fa] rounded-[24px] border border-[#ddd0f4] p-6 md:p-8 shadow-[0_4px_24px_rgba(13,5,32,0.01)]">
              <Accordion 
                items={[
                  {
                    question: 'How much does a website cost?',
                    answer: 'Website pricing depends on the layout, pages, and features. We offer highly affordable launch packages starting from £99 for startups, with premium business and e-commerce setups tailored for growing brands.',
                  },
                  {
                    question: 'How long does it take to build a website?',
                    answer: 'Our starter website package can be delivered in 3-7 days. Customized premium business setups typically take 2-4 weeks, while complex platforms and e-commerce systems range from 6-8 weeks.',
                  },
                  {
                    question: 'Do you provide SEO with websites?',
                    answer: 'Yes. Every website we build includes an SEO-ready structure, clean semantic markup, page-speed optimization, and localized keywords to help customers find you on Google.',
                  },
                  {
                    question: 'Can you set up my domain, hosting, and business emails?',
                    answer: 'Yes. We offer complete guidance and configuration support for setting up your domain, secure hosting, SSL certificates, and professional Microsoft 365 or Google Workspace business emails.',
                  },
                  {
                    question: 'Do you offer ongoing support after launch?',
                    answer: 'Yes. We provide 7 days of complimentary post-launch support with all projects, along with optional monthly growth and maintenance packages for updates, hosting, and optimizations.',
                  }
                ]} 
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#0d0520] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[rgba(106,0,255,0.08)] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[rgba(106,0,255,0.08)] translate-x-1/2 translate-y-1/2 pointer-events-none" />
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <CharacterScatter text="Ready to Make Your Business Look Professional Online?" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#c7a7ff] mt-5 max-w-[620px] mx-auto leading-relaxed">
              Book a free same-day appointment and get a clear plan for your website, branding, SEO, or digital marketing.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button to="/book-appointment">Book Free Appointment</Button>
              <Button variant="ghost" to="https://wa.me/442046155575">WhatsApp Us Now</Button>
            </div>
            <p className="text-xs text-[#7d718c] mt-4">Or <a href="https://wa.me/442046155575" target="_blank" rel="noopener noreferrer" className="text-[#6a00ff] hover:underline">WhatsApp us anytime on +44 20 4615 5575</a></p>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
      `}</style>
    </>
  );
}
