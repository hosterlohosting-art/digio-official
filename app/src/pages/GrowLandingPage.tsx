import React, { useState } from 'react';
import SEO from '../components/SEO';
import { 
  Phone, CheckCircle, Server, Search, Target, 
  ChevronDown, ChevronUp, Star, Check, Laptop, MessageSquare, MapPin, Mail, ShieldCheck,
  Zap, HeartHandshake, CreditCard, Layers, Compass, Code, Rocket
} from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import PortfolioCard from '../components/PortfolioCard';

// Custom Accordion Component for landing page FAQs
function AccordionItem({ question, answer, isOpen, onClick }: { question: string; answer: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className="border-b border-[#ddd0f4]/60 py-4">
      <button
        type="button"
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-2 text-[#0d0520] hover:text-[#6a00ff] font-semibold text-base font-['Plus_Jakarta_Sans'] transition-colors"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-[#6a00ff] shrink-0" /> : <ChevronDown className="w-5 h-5 text-[#7d718c] shrink-0" />}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[250px] opacity-100 mt-2' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-sm text-[#53445f] leading-relaxed font-['Outfit'] pr-8 pb-2">
          {answer}
        </p>
      </div>
    </div>
  );
}

const team = [
  { 
    name: 'Ahsan', 
    role: 'Managing Director & Developer', 
    bio: 'With 7+ years of experience in SEO, digital marketing, and full-stack software engineering, Ahsan drives the core technical architecture and organic visibility strategies for Digioverse.', 
    image: '/assets/ahsan_founder.jpg' 
  },
  { 
    name: 'Mehar Hassan', 
    role: 'Co-Founder & Head of Growth', 
    bio: 'Bringing 12+ years of elite experience in digital strategy and customer acquisition, Mehar Hassan architects high-converting advertising funnels and client growth pipelines.', 
    image: '/assets/mehar_founder.png' 
  },
  { 
    name: 'Musa Shahzad', 
    role: 'Senior Web & Automation Engineer', 
    bio: 'With 4+ years of specialized experience in frontend frameworks and API integrations, Musa constructs robust web applications and automated lead flows.', 
    image: '/assets/musa.png' 
  },
];

const featuredProjects = [
  { 
    image: '/assets/google_map_scrapper_mockup.jpg', 
    title: 'Google Ads Acquisition System', 
    businessType: 'PPC Lead Gen',
    description: 'Designed high-converting landing pages combined with optimized Google Search campaign structures for local service companies.',
    result: '320% Increase in Enquiries',
    link: '/work'
  },
  { 
    image: '/assets/hosterlo_mockup.jpg', 
    title: 'Premium Corporate Platform', 
    businessType: 'Web Development',
    description: 'A blazing-fast custom React website set up with secure SSL, premium hosting, sitemap registration, and Google schema integration.',
    result: 'Under 1.2s Load Speed',
    link: '/work'
  },
  { 
    image: '/assets/nexora_mockup.png', 
    title: 'SaaS Platform Release', 
    businessType: 'SaaS Product',
    description: 'Interactive dashboard interfaces and automated email setups helping growth brands acquire beta signups rapidly.',
    result: '4,500+ Signups Generated',
    link: '/work'
  },
];

const testimonials = [
  {
    stars: 5,
    quote: "Digioverse built a custom booking system and website for our clinic. We saw a 45% increase in online bookings within the first month. Ahsan and the team are absolute professionals.",
    author: "Sarah M.",
    role: "Clinic Owner, Woking",
    initials: "SM"
  },
  {
    stars: 5,
    quote: "Digioverse built our construction website and set up Google Ads. The calls started landing the second week of launch. Very responsive and transparent guys to work with.",
    author: "Thomas C.",
    role: "Carpentry Director, Surrey",
    initials: "TC"
  },
  {
    stars: 5,
    quote: "The transparency of pricing is what won us over. We got a custom site, branding, and Google Ads launched in 3 weeks. Our lead acquisition cost dropped by 40% immediately.",
    author: "David K.",
    role: "SaaS Founder, London",
    initials: "DK"
  }
];

export default function GrowLandingPage() {
  // Form submission states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    package: 'Business Growth (£999)',
    message: '',
    website: '', // Honeypot
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [activeFAQ, setActiveFAQ] = useState<number | null>(0);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // Honeypot check
    if (formData.website) {
      setTimeout(() => {
        setFormState('success');
        setFormData({ name: '', email: '', phone: '', package: 'Business Growth (£999)', message: '', website: '' });
      }, 800);
      return;
    }

    try {
      const payload = {
        _subject: `PPC Lead: ${formData.package} - ${formData.name}`,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        package: formData.package,
        message: formData.message || 'No additional comments.',
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
        throw new Error('Lead submission failed');
      }

      setFormState('success');
      setFormData({ name: '', email: '', phone: '', package: 'Business Growth (£999)', message: '', website: '' });
    } catch (err) {
      console.error(err);
      setFormState('error');
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById('lead-capture-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: 'What is included in the £499 Starter Website package?',
      a: 'This includes a premium brochure website (3-5 pages), custom design tailored to your branding, 1 year of free domain registration (.co.uk or .com), 1 year of secure SSL and high-speed hosting, and up to 3 professional business email accounts.'
    },
    {
      q: 'How long does it take to design and launch the website?',
      a: 'For our Starter and E-commerce packages, average delivery time is 2 to 3 weeks. For custom Business Growth platforms, it takes between 3 to 5 weeks depending on database integrations, CRM setups, and customized assets.'
    },
    {
      q: 'Do I own the website, domain, and hosting accounts?',
      a: 'Yes, 100%. Once project payment is complete, you own all design files, source code, domain names, and database entries. We can manage them for you on our cloud nodes or transfer them to your own host.'
    },
    {
      q: 'Who manages the Google Ads budget?',
      a: 'You pay Google directly for your ad clicks. We handle the technical campaign setup (negative keywords, ad copies, tracking tags, and bidding structures) under our flat service packages, ensuring you do not waste money.'
    },
    {
      q: 'What SEO setup is included in the package?',
      a: 'All packages include critical on-page SEO: custom metadata titles, meta descriptions, image alt tags, responsive page speeds, sitemaps, and indexing on Google and Bing search consoles. The Business Growth package adds Google Business Profile optimization and location page structures.'
    }
  ];

  return (
    <>
      <SEO
        title="Web Design & Google Ads for UK Businesses | Digioverse"
        description="Get a high-converting website, domain, fast hosting, business emails, and Google Ads setup from scratch. Fixed transparent pricing packages built to generate leads."
        keywords="web design agency uk, google ads marketing, custom website development, small business leads, domain hosting packages"
      />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Digioverse",
          "image": "https://digioverse.com/assets/favicon.jpg",
          "@id": "https://digioverse.com/#organization",
          "url": "https://digioverse.com/grow",
          "telephone": "+442046155575",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "1A North Rd",
            "addressLocality": "Woking",
            "addressRegion": "Surrey",
            "postalCode": "GU21 5DS",
            "addressCountry": "GB"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 51.3168285,
            "longitude": -0.5606473
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "32"
          }
        })}
      </script>

      {/* Simplified PPC Header */}
      <nav className="fixed top-0 left-0 w-full bg-[#f7f7fa]/85 backdrop-blur-[12px] border-b border-[#ddd0f4]/45 z-[1000] py-4 transition-all">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5" aria-label="Digioverse home">
            <img src="/assets/digioverse-logo.png" alt="Digioverse" className="h-11 w-auto drop-shadow-[0_8px_18px_rgba(13,5,32,0.14)]" />
          </a>

          <div className="flex items-center gap-4">
            <a 
              href="tel:+442046155575" 
              className="hidden sm:flex items-center gap-2 text-sm font-bold text-[#0d0520] hover:text-[#6a00ff] transition-colors"
            >
              <Phone className="w-4 h-4 text-[#6a00ff]" /> +44 2046 155575
            </a>
            <button
              onClick={scrollToForm}
              className="bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-all shadow-[0_4px_12px_rgba(106,0,255,0.15)]"
            >
              Get Free Proposal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section with Form Above-the-Fold */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-12 md:pt-40 md:pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,0,255,0.05),transparent_40%)] pointer-events-none" />
        
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-[55%_40%] gap-12 items-center">
            
            {/* Left: Value Proposition */}
            <div>
              <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider bg-[rgba(106,0,255,0.08)] px-4 py-1.5 rounded-full inline-block mb-5">
                All-In-One Business Growth Platform
              </span>
              <h1 className="text-[36px] sm:text-[46px] md:text-[56px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.03em] font-['Plus_Jakarta_Sans']">
                We Build Websites & Ads That Turn Visitors Into Customers
              </h1>
              <p className="text-base md:text-lg text-[#53445f] mt-6 leading-relaxed font-['Outfit']">
                Stop wasting budget on traffic that doesn't convert. We design lightning-fast sites, register your domain, set up hosting & professional emails, and launch high-ROI Google Ads campaigns—all from scratch.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d0520] text-sm">Fully Custom Website Design</h4>
                    <p className="text-xs text-[#7d718c]">Mobile-first layouts designed to capture UK customer intent.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d0520] text-sm">Domain, Cloud Hosting & Business Emails</h4>
                    <p className="text-xs text-[#7d718c]">Everything set up and configured. No technical headache for you.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#0d0520] text-sm">Active Google Ads Setup & Optimization</h4>
                    <p className="text-xs text-[#7d718c]">Instant visibility: placing you on page one when people are searching.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Teaser Lead Capture Form */}
            <div className="bg-white border border-[#ddd0f4]/60 rounded-3xl p-6 md:p-8 shadow-[0_12px_40px_rgba(13,5,32,0.06)]">
              <h3 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Request a Free Proposal</h3>
              <p className="text-xs text-[#7d718c] mt-1.5">No obligation. Let us show you how we can drive sales.</p>

              {formState === 'success' ? (
                <div className="mt-6 text-center bg-green-50 rounded-2xl p-6 border border-green-200 animate-[fadeIn_0.3s_ease]">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
                  <h4 className="font-bold text-[#0d0520] text-base">Request Received!</h4>
                  <p className="text-xs text-[#53445f] mt-1.5">We will analyze your business and contact you with a customized blueprint within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-6 space-y-4">
                  {/* Honeypot field */}
                  <div className="hidden">
                    <input 
                      type="text" 
                      name="website" 
                      value={formData.website} 
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })} 
                      placeholder="Website" 
                      tabIndex={-1} 
                      autoComplete="off" 
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2b094f] uppercase tracking-wider mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-2.5 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-[#2b094f] uppercase tracking-wider mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-2.5 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-[#2b094f] uppercase tracking-wider mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="07123 456789"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-2.5 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2b094f] uppercase tracking-wider mb-1">Select Growth Package *</label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl px-4 py-2.5 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium"
                    >
                      <option value="Starter Launch (£499)">Starter Launch (£499)</option>
                      <option value="Business Growth (£999)">Business Growth (£999)</option>
                      <option value="Ecommerce Store (£699)">Ecommerce Store (£699)</option>
                      <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-[#2b094f] uppercase tracking-wider mb-1">Project Details (Optional)</label>
                    <textarea
                      placeholder="Tell us about your company and what you want to achieve..."
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-[#f7f7fa] border border-[#ddd0f4] rounded-xl p-3.5 text-xs text-[#0d0520] focus:border-[#6a00ff] focus:bg-white transition-all outline-none font-medium resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="w-full bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_6px_16px_rgba(106,0,255,0.2)]"
                  >
                    {formState === 'loading' ? 'Submitting Details...' : 'Get Free Strategy Plan'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Trust Strip with Google Reviews & UK Credentials */}
      <section className="bg-white py-8 border-y border-[#ddd0f4]/60">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center text-center">
            
            {/* Google Reviews Trust Badge */}
            <div className="flex flex-col items-center justify-center border-r border-[#ddd0f4]/40 last:border-r-0">
              <div className="flex items-center gap-1.5 text-xs font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">
                <span className="text-[#4285F4]">G</span>
                <span className="text-[#EA4335]">o</span>
                <span className="text-[#FBBC05]">o</span>
                <span className="text-[#4285F4]">g</span>
                <span className="text-[#34A853]">l</span>
                <span className="text-[#EA4335]">e</span>
                <span>Rating</span>
              </div>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />)}
              </div>
              <span className="text-[10px] text-[#7d718c] font-bold mt-1">4.9/5 based on 32 Reviews</span>
            </div>

            {/* UK Registration Badge */}
            <div className="flex flex-col items-center justify-center border-r border-[#ddd0f4]/40 last:border-r-0">
              <span className="text-xs font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">UK Registered Agency</span>
              <span className="text-[10px] font-mono text-[#6a00ff] bg-purple-100 px-2 py-0.5 rounded mt-1.5 font-bold">No. 17236340</span>
              <span className="text-[10px] text-[#7d718c] font-bold mt-1">Digioverse LTD</span>
            </div>

            {/* Speed Check Badge */}
            <div className="flex flex-col items-center justify-center border-r border-[#ddd0f4]/40 last:border-r-0">
              <span className="text-xs font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">Lightning Fast Load</span>
              <div className="flex items-center gap-1 text-[10px] text-[#34A853] font-bold mt-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> 100/100 Core Web Vitals
              </div>
              <span className="text-[10px] text-[#7d718c] font-bold mt-1">React Static Generation</span>
            </div>

            {/* Secure Hosting Badge */}
            <div className="flex flex-col items-center justify-center last:border-r-0">
              <span className="text-xs font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">SSL Security Encryption</span>
              <div className="flex items-center gap-1 text-[#6a00ff] font-bold text-[10px] mt-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> Fully Secured Cloud Server
              </div>
              <span className="text-[10px] text-[#7d718c] font-bold mt-1">Free SSL Included</span>
            </div>

          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Our Edge</span>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans'] tracking-tight">
              Why UK Businesses Choose Digioverse
            </h2>
            <p className="text-sm text-[#53445f] mt-3 font-['Outfit']">
              We design and execute campaigns that lower lead costs and build premium brand authority.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ScrollReveal className="bg-[#f7f7fa] border border-[#ddd0f4]/45 p-7 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans']">Direct Founder Access</h4>
              <p className="text-xs text-[#53445f] mt-2.5 leading-relaxed font-['Outfit']">
                You work directly with lead developers and growth strategists, not junior account managers. No communication leakage.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1} className="bg-[#f7f7fa] border border-[#ddd0f4]/45 p-7 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans']">Lightning Fast Static Code</h4>
              <p className="text-xs text-[#53445f] mt-2.5 leading-relaxed font-['Outfit']">
                We write custom compiled code using frameworks like React. Zero bloated templates. Sites load in under a second.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-[#f7f7fa] border border-[#ddd0f4]/45 p-7 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans']">Transparent Fixed Pricing</h4>
              <p className="text-xs text-[#53445f] mt-2.5 leading-relaxed font-['Outfit']">
                Flat, upfront rates for design and setup. You know exactly what you are paying for, with zero hidden retainers or surprises.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.3} className="bg-[#f7f7fa] border border-[#ddd0f4]/45 p-7 rounded-3xl relative">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans']">Complete All-in-One Delivery</h4>
              <p className="text-xs text-[#53445f] mt-2.5 leading-relaxed font-['Outfit']">
                We coordinate everything: purchasing domains, setting up cloud nodes, configuring SSL, structuring SEO, and running Google campaigns.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* DETAILED PROJECT ROADMAP (HOW IT WORKS) */}
      <section className="bg-[#f7f7fa] py-16 md:py-24 border-y border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Project Timeline</span>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans'] tracking-tight">
              Our Step-by-Step Delivery Roadmap
            </h2>
            <p className="text-sm text-[#53445f] mt-3 font-['Outfit']">
              A transparent breakdown of how we build, configure, and launch your business platforms from scratch.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Visual connector line for timeline (desktop only) */}
            <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[#6a00ff] to-[#ddd0f4] z-0" />

            {/* Roadmap Phase 1 */}
            <ScrollReveal className="bg-white border border-[#ddd0f4]/40 p-6 rounded-3xl relative z-10 shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
              <div className="w-12 h-12 rounded-2xl bg-[#6a00ff] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shadow-[0_4px_12px_rgba(106,0,255,0.2)] mb-5">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6a00ff]">Phase 1</span>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans'] mt-1">Research & Strategy</h4>
              <span className="text-[10px] text-[#7d718c] font-semibold block mt-0.5">Days 1 - 5</span>
              <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                We perform competitor benchmarking, map out high-intent local keywords, structure lead acquisition paths, and finalize page hierarchies.
              </p>
            </ScrollReveal>

            {/* Roadmap Phase 2 */}
            <ScrollReveal delay={0.1} className="bg-white border border-[#ddd0f4]/40 p-6 rounded-3xl relative z-10 shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
              <div className="w-12 h-12 rounded-2xl bg-[#6a00ff] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shadow-[0_4px_12px_rgba(106,0,255,0.2)] mb-5">
                <Laptop className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6a00ff]">Phase 2</span>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans'] mt-1">Custom UI Design</h4>
              <span className="text-[10px] text-[#7d718c] font-semibold block mt-0.5">Days 6 - 12</span>
              <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                We construct a bespoke graphical interface in Figma matching your brand, layout high-converting call-to-actions, and author initial copywriting.
              </p>
            </ScrollReveal>

            {/* Roadmap Phase 3 */}
            <ScrollReveal delay={0.2} className="bg-white border border-[#ddd0f4]/40 p-6 rounded-3xl relative z-10 shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
              <div className="w-12 h-12 rounded-2xl bg-[#6a00ff] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shadow-[0_4px_12px_rgba(106,0,255,0.2)] mb-5">
                <Code className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6a00ff]">Phase 3</span>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans'] mt-1">Technical Coding</h4>
              <span className="text-[10px] text-[#7d718c] font-semibold block mt-0.5">Days 13 - 20</span>
              <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                Our engineers code the site using React/WordPress. We purchase the domain, set up cloud server hosting, configure SSL, sitemaps, and business emails.
              </p>
            </ScrollReveal>

            {/* Roadmap Phase 4 */}
            <ScrollReveal delay={0.3} className="bg-white border border-[#ddd0f4]/40 p-6 rounded-3xl relative z-10 shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
              <div className="w-12 h-12 rounded-2xl bg-[#3b0a75] text-white flex items-center justify-center font-bold text-sm font-['Plus_Jakarta_Sans'] shadow-[0_4px_12px_rgba(106,0,255,0.2)] mb-5">
                <Rocket className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6a00ff]">Phase 4</span>
              <h4 className="font-bold text-[#0d0520] text-base font-['Plus_Jakarta_Sans'] mt-1">Ads Launch & Optimization</h4>
              <span className="text-[10px] text-[#7d718c] font-semibold block mt-0.5">Days 21 - 25</span>
              <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                We trigger tracking tags, launch highly-optimized search keywords on Google Ads, set up conversion goals, and deliver live leads directly to your CRM.
              </p>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Visual Portfolio Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Proof of Work</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans'] tracking-tight">
                Our Recent Projects & Case Studies
              </h2>
              <p className="text-sm text-[#53445f] mt-2 font-['Outfit']">
                Explore real results from custom website development, PPC campaigns, and branding architectures.
              </p>
            </div>
            
            <button 
              onClick={scrollToForm}
              className="bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-3.5 px-6 rounded-xl transition-all shrink-0"
            >
              Get Your Custom Blueprint
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((p, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <PortfolioCard {...p} />
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Services Breakdown */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="grid lg:grid-cols-[40%_55%] gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Comprehensive Solutions</span>
              <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans']">
                Everything Handled From Scratch. No Stress.
              </h2>
              <p className="text-sm text-[#53445f] mt-4 leading-relaxed font-['Outfit']">
                Unlike freelancers who only design or agencies who only run ads, we build and manage the entire lead acquisition flow. You get a single team managing your online presence.
              </p>
              
              <div className="mt-8 flex gap-4">
                <button 
                  onClick={scrollToForm}
                  className="bg-[#0d0520] hover:bg-[#6a00ff] text-white text-xs font-bold py-3 px-6 rounded-xl transition-all"
                >
                  Request Call Back
                </button>
                <a 
                  href="https://wa.me/442046155575" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="border border-[#ddd0f4] hover:border-[#6a00ff] bg-white text-xs font-bold py-3 px-6 rounded-xl flex items-center gap-1.5 text-[#53445f] hover:text-[#6a00ff] transition-all"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white border border-[#ddd0f4]/45 p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0d0520] text-sm">Premium Web Design</h4>
                <p className="text-xs text-[#7d718c] mt-2 leading-relaxed">
                  Stunning, responsive interfaces designed specifically to prompt contact and book services.
                </p>
              </div>

              <div className="bg-white border border-[#ddd0f4]/45 p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                  <Server className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0d0520] text-sm">Domain & Hosting</h4>
                <p className="text-xs text-[#7d718c] mt-2 leading-relaxed">
                  We purchase domain names, configure secure SSL, and set up cloud nodes with high-speed delivery.
                </p>
              </div>

              <div className="bg-white border border-[#ddd0f4]/45 p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                  <Search className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0d0520] text-sm">Google Local SEO</h4>
                <p className="text-xs text-[#7d718c] mt-2 leading-relaxed">
                  On-page structuring, metadata optimizations, sitemaps, and Google Business Profile setup.
                </p>
              </div>

              <div className="bg-white border border-[#ddd0f4]/45 p-6 rounded-2xl shadow-[0_4px_20px_rgba(13,5,32,0.01)]">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] mb-4">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-[#0d0520] text-sm">Google Ads Campaigns</h4>
                <p className="text-xs text-[#7d718c] mt-2 leading-relaxed">
                  Keyword bidding, localized targeting, writing high-click copy, and configuring call extensions.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Meet the Founders / Team Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Who we are</span>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans']">
              Meet the Growth Engineers Behind Your Project
            </h2>
            <p className="text-sm text-[#53445f] mt-3 font-['Outfit']">
              We work directly with you. No account managers or call centers—just real engineers, designers, and growth strategists.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((t, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} className="bg-[#f7f7fa] border border-[#ddd0f4]/40 rounded-3xl p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#6a00ff] shadow-lg mb-4">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="font-bold text-[#0d0520] text-lg font-['Plus_Jakarta_Sans']">{t.name}</h4>
                <span className="text-xs font-semibold text-[#6a00ff] mt-1">{t.role}</span>
                <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                  {t.bio}
                </p>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Pricing Packages */}
      <section className="bg-[#f7f7fa] py-16 md:py-24 border-t border-[#ddd0f4]/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Clear Fixed Pricing</span>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans']">
              Simple Growth Packages
            </h2>
            <p className="text-sm text-[#53445f] mt-3 font-['Outfit']">
              Pick the tier that fits your company size. Absolutely no hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Package 1 */}
            <ScrollReveal className="bg-white border border-[#ddd0f4]/55 rounded-3xl p-8 flex flex-col justify-between h-full shadow-[0_4px_24px_rgba(13,5,32,0.02)]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6a00ff] bg-purple-100 px-3 py-1 rounded-full">
                  Startup Launch
                </span>
                <div className="mt-5">
                  <span className="text-4xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">£499</span>
                  <span className="text-xs text-[#7d718c] font-medium ml-1">fixed price</span>
                </div>
                <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                  Perfect brochure setup for local trades, consultants, and new startups.
                </p>
                <div className="border-t border-[#ddd0f4]/50 my-6" />
                <ul className="space-y-3.5 text-xs text-[#53445f]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Custom Website Design (3-5 pages)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Free Domain Name (.co.uk or .com)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Secure Cloud Hosting & SSL (1 Year)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> 3 Professional Business Emails</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Direct Response Lead Capture Form</li>
                </ul>
              </div>
              <button onClick={scrollToForm} className="w-full mt-8 py-3 bg-[#0d0520] hover:bg-[#6a00ff] text-white text-xs font-bold rounded-xl transition-all">
                Select Startup Launch
              </button>
            </ScrollReveal>

            {/* Package 2 */}
            <ScrollReveal delay={0.1} className="bg-white border-2 border-[#6a00ff] rounded-3xl p-8 flex flex-col justify-between h-full relative shadow-[0_12px_40px_rgba(106,0,255,0.06)]">
              <span className="absolute top-0 right-8 -translate-y-1/2 bg-[#6a00ff] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full">
                Most Popular
              </span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white bg-[#6a00ff] px-3 py-1 rounded-full">
                  Business Growth
                </span>
                <div className="mt-5">
                  <span className="text-4xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">£999</span>
                  <span className="text-xs text-[#7d718c] font-medium ml-1">fixed price</span>
                </div>
                <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                  For businesses ready to actively gain market share and search leads in the UK.
                </p>
                <div className="border-t border-[#ddd0f4]/50 my-6" />
                <ul className="space-y-3.5 text-xs text-[#53445f]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Complete Website Platform (10-25 pages)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Local SEO & GBP Setup (Woking/Surrey/London)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> 1 Year Hosting, Domain & Emails</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Google Ads PPC Campaign Setup</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Lead tracking & CRM Integration</li>
                </ul>
              </div>
              <button onClick={scrollToForm} className="w-full mt-8 py-3 bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold rounded-xl transition-all shadow-[0_6px_16px_rgba(106,0,255,0.15)]">
                Select Business Growth
              </button>
            </ScrollReveal>

            {/* Package 3 */}
            <ScrollReveal delay={0.2} className="bg-white border border-[#ddd0f4]/55 rounded-3xl p-8 flex flex-col justify-between h-full shadow-[0_4px_24px_rgba(13,5,32,0.02)]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#6a00ff] bg-purple-100 px-3 py-1 rounded-full">
                  Ecommerce Store
                </span>
                <div className="mt-5">
                  <span className="text-4xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">£699</span>
                  <span className="text-xs text-[#7d718c] font-medium ml-1">fixed price</span>
                </div>
                <p className="text-xs text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                  Complete online retail shop with inventory management.
                </p>
                <div className="border-t border-[#ddd0f4]/50 my-6" />
                <ul className="space-y-3.5 text-xs text-[#53445f]">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Custom Shop Design & Product Pages</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Payment Gateway Integration (Stripe/Paypal)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Domain, SSL & Dedicated Hosting (1 Year)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Branded emails & Order Automations</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-600 shrink-0" /> Stock tracking & Discount structures</li>
                </ul>
              </div>
              <button onClick={scrollToForm} className="w-full mt-8 py-3 bg-[#0d0520] hover:bg-[#6a00ff] text-white text-xs font-bold rounded-xl transition-all">
                Select Ecommerce Store
              </button>
            </ScrollReveal>
          </div>

          <p className="text-[10px] text-center text-[#7d718c] mt-10">
            * Starter footers include standard license support. Pricing excludes Google Ads advertising budget click payments.
          </p>
        </div>
      </section>

      {/* Trust & Testimonial Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="max-w-[600px] mx-auto text-center mb-16">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Client Testimonials</span>
            <h2 className="text-3xl md:text-[40px] font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans'] tracking-tight">
              What UK Business Owners Say About Us
            </h2>
            <p className="text-sm text-[#53445f] mt-3 font-['Outfit']">
              Our custom designs and targeted ad structures help firms convert more calls and leads.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1} className="bg-[#f7f7fa] border border-[#ddd0f4]/45 p-7 rounded-3xl relative flex flex-col justify-between shadow-[0_4px_24px_rgba(13,5,32,0.01)] hover:shadow-[0_8px_32px_rgba(13,5,32,0.03)] transition-all">
                <div>
                  <div className="flex items-center gap-0.5 mb-4">
                    {[...Array(t.stars)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#FBBC05] text-[#FBBC05]" />)}
                  </div>
                  <p className="text-xs text-[#53445f] italic leading-relaxed font-['Outfit']">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#ddd0f4]/55 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 text-[#6a00ff] flex items-center justify-center font-bold text-xs">
                    {t.initials}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-[#0d0520] font-['Plus_Jakarta_Sans']">{t.author}</h5>
                    <span className="text-[9px] text-[#7d718c] font-semibold">{t.role}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>

      {/* Map, Address & UK Corporate Trust Section */}
      <section className="bg-white py-16 md:py-24 border-t border-[#ddd0f4]/40">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          
          <div className="grid lg:grid-cols-[45%_50%] gap-12 items-center">
            {/* Left: Office Address Details */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Office Location</span>
                <h2 className="text-3xl font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans']">
                  Our UK Headquarters & Registered Office
                </h2>
                <p className="text-sm text-[#53445f] mt-3 leading-relaxed font-['Outfit']">
                  We are based in Woking, Surrey, with coverage extending across Surrey, Romford, London, and the wider UK. Stop by or book a virtual call.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0d0520] text-sm font-['Plus_Jakarta_Sans']">Physical Office Address</h5>
                    <p className="text-xs text-[#53445f] mt-1 leading-relaxed font-['Outfit']">
                      1A North Rd, Woking, Surrey, GU21 5DS, United Kingdom
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0d0520] text-sm font-['Plus_Jakarta_Sans']">Corporate Inquiries</h5>
                    <p className="text-xs text-[#53445f] mt-1 leading-relaxed font-['Outfit']">
                      support@digioverse.com | info@digioverse.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#6a00ff] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#0d0520] text-sm font-['Plus_Jakarta_Sans']">Call Support</h5>
                    <p className="text-xs text-[#53445f] mt-1 leading-relaxed font-['Outfit']">
                      +44 2046 155575 (Mon - Fri, 9am - 6pm GMT)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#f7f7fa] border border-[#ddd0f4]/50 p-5 rounded-2xl text-xs text-[#7d718c] leading-relaxed">
                <strong>DIGIOVERSE LTD</strong> is a company registered in England and Wales under Company Registration Number <strong>17236340</strong>.
              </div>
            </div>

            {/* Right: Embedded Google Map Reference or visual mockup */}
            <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-[#ddd0f4] shadow-[0_12px_36px_rgba(13,5,32,0.04)] bg-slate-100 relative">
              {/* Google Map iframe */}
              <iframe
                title="Digioverse Office Woking"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2493.6843477121727!2d-0.5606473233895521!3d51.31682857199432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876db4bcba30b65%3A0x673967406e57973d!2s1A%20North%20Rd%2C%20Woking%20GU21%205DS%2C%20UK!5e0!3m2!1sen!2sua!4v1718000000000!5m2!1sen!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="bg-[#f7f7fa] py-16 md:py-24 border-t border-[#ddd0f4]/40">
        <div className="max-w-[800px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 className="text-3xl font-bold text-[#0d0520] mt-3 font-['Plus_Jakarta_Sans']">
              Got Questions? We Have Answers.
            </h2>
          </div>

          <div className="space-y-2 bg-white p-6 md:p-8 rounded-3xl border border-[#ddd0f4]/50 shadow-[0_4px_24px_rgba(13,5,32,0.01)]">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={activeFAQ === index}
                onClick={() => setActiveFAQ(activeFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Lead capture anchor */}
      <section id="lead-capture-form" className="bg-[#0d0520] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[40%] bg-[#6a00ff]/10 rounded-full blur-[100px]" />
        
        <div className="max-w-[640px] mx-auto px-5 text-center relative z-10">
          <MessageSquare className="w-12 h-12 text-[#6a00ff] mx-auto" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-6 font-['Plus_Jakarta_Sans']">
            Ready to Dominate Your Local UK Market?
          </h2>
          <p className="text-xs text-[#c7a7ff] mt-3 leading-relaxed max-w-[480px] mx-auto">
            Give us 24 hours. Enter your contact details, and our growth specialists will construct a personalized website blueprint & target keyword list for your business.
          </p>

          {formState === 'success' ? (
            <div className="mt-8 text-center bg-white/5 rounded-2xl p-8 border border-white/10 animate-[fadeIn_0.3s_ease]">
              <CheckCircle className="w-12 h-12 text-[#6a00ff] mx-auto mb-3" />
              <h4 className="font-bold text-white text-base">Strategy Request Submitted!</h4>
              <p className="text-xs text-[#c7a7ff] mt-2">We will get in touch with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="mt-8 space-y-4 text-left bg-white/5 border border-white/10 p-6 sm:p-8 rounded-3xl backdrop-blur-md">
              {/* Honeypot */}
              <div className="hidden">
                <input 
                  type="text" 
                  name="website" 
                  value={formData.website} 
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })} 
                  placeholder="Website" 
                  tabIndex={-1} 
                  autoComplete="off" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#c7a7ff] uppercase tracking-wider mb-1">Company & Owner Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name & Business"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-[#c7a7ff] uppercase tracking-wider mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.co.uk"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#c7a7ff] uppercase tracking-wider mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="07123 456789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/20 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#c7a7ff] uppercase tracking-wider mb-1">Required Growth Package *</label>
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full bg-[#130d25] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none font-medium"
                >
                  <option value="Starter Launch (£499)">Starter Launch (£499)</option>
                  <option value="Business Growth (£999)">Business Growth (£999)</option>
                  <option value="Ecommerce Store (£699)">Ecommerce Store (£699)</option>
                  <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-[#c7a7ff] uppercase tracking-wider mb-1">Message (Optional)</label>
                <textarea
                  placeholder="Tell us about your services and target area..."
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder:text-white/20 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_6px_16px_rgba(106,0,255,0.2)] mt-2"
              >
                {formState === 'loading' ? 'Submitting Details...' : 'Request Free Consultation'}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
