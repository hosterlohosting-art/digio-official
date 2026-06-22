import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Code, Target, Palette, Monitor, Search, ShoppingCart, Share2, Fingerprint, Printer, MapPin, Wrench, Server, Phone } from 'lucide-react';

const services = {
  Build: [
    { icon: Monitor, title: 'Website Design UK', desc: 'Premium bespoke design', href: '/services/website-design-uk' },
    { icon: Code, title: 'Web Development', desc: 'Custom React & Next.js platforms', href: '/services/web-development' },
    { icon: Monitor, title: 'WordPress Design', desc: 'Custom WordPress & WooCommerce', href: '/services/wordpress-website-design' },
    { icon: ShoppingCart, title: 'Shopify / E-commerce', desc: 'High-converting online stores', href: '/services/ecommerce' },
    { icon: Wrench, title: 'Website Maintenance', desc: 'Ongoing updates & security support', href: '/services/website-maintenance' },
    { icon: Server, title: 'Hosting & Business Email', desc: 'Reliable cloud email & hosting', href: '/services/hosting-email' },
  ],
  Grow: [
    { icon: Search, title: 'SEO Services UK', desc: 'Technical SEO & authority content', href: '/services/seo-content' },
    { icon: MapPin, title: 'Local SEO', desc: 'Dominate local search maps', href: '/services/local-seo' },
    { icon: Target, title: 'Google Ads', desc: 'High-intent PPC management', href: '/services/google-ads' },
    { icon: Target, title: 'Meta Ads', desc: 'Facebook & Instagram campaigns', href: '/services/meta-ads' },
    { icon: Share2, title: 'Social Media', desc: 'Content & community management', href: '/services/social-media' },
  ],
  Brand: [
    { icon: Fingerprint, title: 'Branding & Identity', desc: 'Complete brand systems', href: '/services/branding-identity' },
    { icon: Palette, title: 'Creative Studio', desc: 'Premium creative and collateral', href: '/services/creative-studio' },
    { icon: Printer, title: 'Flyer Design & Print', desc: 'Design to doorstep', href: '/services/flyer-design-print' },
  ],
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  const navLinks = [
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Projects', href: '/work' },
    { label: 'Products', href: '/products' },
    { label: 'Industries', href: '/industries' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-400 ${
          scrolled
            ? 'bg-[rgba(255,255,255,0.95)] backdrop-blur-[22px] shadow-[0_1px_0_rgba(221,208,244,0.9),0_18px_50px_rgba(13,5,32,0.08)]'
            : 'bg-[rgba(255,255,255,0.92)] backdrop-blur-[22px] shadow-[0_1px_0_rgba(221,208,244,0.85),0_18px_50px_rgba(13,5,32,0.15)]'
        }`}
      >


        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between h-[82px] md:h-[82px]">
          <Link to="/" className="flex items-center gap-3 transition-transform duration-300 hover:-translate-y-0.5" aria-label="Digioverse home">
            <img src="/assets/digioverse-logo.png" alt="Digioverse" className="h-11 w-auto drop-shadow-[0_8px_18px_rgba(13,5,32,0.14)]" />
            <span className="sr-only">Digioverse</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-[#f7f7fa] border border-[#ddd0f4] px-1.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
            <div
              className="relative"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link
                to="/services"
                className="text-xs font-extrabold text-[#2b094f] hover:text-[#6a00ff] relative group px-3.5 py-1.5"
              >
                Services
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#6a00ff] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>

              {megaOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[750px]">
                  <div className="bg-[rgba(247,247,250,0.97)] backdrop-blur-[24px] rounded-b-[20px] shadow-[0_16px_48px_rgba(13,5,32,0.12)] border border-[#ddd0f4] border-t-0 p-8 animate-[fadeIn_0.3s_ease]">
                    <div className="grid grid-cols-3 gap-6">
                      {Object.entries(services).map(([cat, items]) => (
                        <div key={cat}>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-[#7d718c] mb-3">{cat}</h4>
                          <div className="space-y-2">
                            {items.map((s) => (
                              <Link key={s.title} to={s.href} className="flex items-start gap-2 group/item py-1">
                                <s.icon className="w-4 h-4 text-[#6a00ff] mt-0.5 shrink-0" />
                                <div>
                                  <p className="text-sm font-medium text-[#0d0520] group-hover/item:text-[#6a00ff] transition-colors">{s.title}</p>
                                  <p className="text-xs text-[#7d718c] leading-tight mt-0.5">{s.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-xs font-extrabold text-[#2b094f] hover:text-[#6a00ff] relative group px-3.5 py-1.5"
              >
                {link.label}
                <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#6a00ff] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Sleek circular WhatsApp link */}
            <a
              href="https://wa.me/442046155575"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center justify-center w-10.5 h-10.5 border border-[#ddd0f4] bg-white text-[#2b094f] hover:text-[#6a00ff] hover:border-[#6a00ff] rounded-full hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_12px_rgba(13,5,32,0.02)]"
              title="Chat on WhatsApp: 020 4615 5575"
            >
              <svg className="w-4.5 h-4.5 fill-[#25D366]" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.01-5.078-2.854-6.924C16.379 2.036 13.918 1.023 11.3 1.02c-5.41 0-9.81 4.396-9.813 9.801-.001 1.77.472 3.498 1.368 5.037L1.825 21.8l6.162-1.616-.34-.23zm8.995-5.918c-.287-.143-1.697-.838-1.959-.933-.261-.096-.452-.143-.642.143-.19.286-.736.933-.902 1.124-.167.19-.333.214-.62.071-.286-.143-1.21-.446-2.305-1.424-.853-.76-1.428-1.7-1.595-1.985-.167-.286-.018-.44.125-.581.129-.127.287-.333.43-.5.143-.167.19-.286.286-.476.096-.19.048-.357-.024-.5-.071-.143-.642-1.548-.88-2.12-.232-.558-.467-.482-.642-.491-.167-.008-.357-.01-.548-.01-.19 0-.5.071-.762.357-.262.286-1 .976-1 2.38 0 1.405 1.023 2.762 1.166 2.952.143.19 2.013 3.074 4.877 4.31.682.293 1.215.469 1.63.601.687.218 1.312.187 1.806.114.55-.082 1.697-.692 1.937-1.36.24-.668.24-1.24.167-1.36-.072-.12-.262-.19-.548-.332z" />
              </svg>
            </a>
            
            {/* Sleek circular Phone link */}
            <a
              href="tel:+442046155575"
              className="hidden lg:inline-flex items-center justify-center w-10.5 h-10.5 border border-[#ddd0f4] bg-white text-[#2b094f] hover:text-[#6a00ff] hover:border-[#6a00ff] rounded-full hover:-translate-y-0.5 transition-all duration-300 shadow-[0_4px_12px_rgba(13,5,32,0.02)]"
              title="Call Landline: 020 4615 5575"
            >
              <Phone className="w-4 h-4 text-[#6a00ff]" />
            </a>

            <Link
              to="/book-appointment"
              className="hidden md:inline-flex bg-[#6a00ff] text-white font-bold text-xs px-5 py-3 rounded-full shadow-[0_14px_36px_rgba(106,0,255,0.28)] hover:bg-[#3b0a75] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Call
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-[#0d0520] hover:text-[#6a00ff] transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div className="absolute inset-0 bg-[#0d0520] translate-x-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center"
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-[#f7f7fa]" />
            </button>
            <nav className="flex flex-col justify-center h-full px-10 space-y-6">
              {navLinks.map((link, i) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-[#f7f7fa] font-semibold text-3xl opacity-0 animate-[slideIn_0.4s_ease_forwards]"
                  style={{ animationDelay: `${i * 0.08}s` }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/book-appointment"
                className="inline-flex bg-gradient-to-r from-[#6a00ff] to-[#3b0a75] text-white font-semibold text-base px-8 py-3.5 rounded-full mt-4 w-fit opacity-0 animate-[slideIn_0.4s_ease_forwards] shadow-[0_8px_24px_rgba(106,0,255,0.3)] hover:shadow-[0_12px_32px_rgba(106,0,255,0.45)] transition-all duration-300"
                style={{ animationDelay: '0.45s' }}
                onClick={() => setMobileOpen(false)}
              >
                Book Free Appointment
              </Link>
              {/* Call and WhatsApp Quick Action Buttons for Mobile */}
              <div className="flex flex-wrap gap-3 mt-4 opacity-0 animate-[slideIn_0.4s_ease_forwards]" style={{ animationDelay: '0.48s' }}>
                <a
                  href="tel:+442046155575"
                  className="flex items-center gap-2 border border-white/20 bg-white/5 text-[#f7f7fa] hover:bg-white/10 font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-[#c7a7ff]" />
                  <span>Call Landline</span>
                </a>
                <a
                  href="https://wa.me/442046155575"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#25D366] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_14px_rgba(37,211,102,0.2)]"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.803-4.394 9.806-9.799.002-2.618-1.01-5.078-2.854-6.924C16.379 2.036 13.918 1.023 11.3 1.02c-5.41 0-9.81 4.396-9.813 9.801-.001 1.77.472 3.498 1.368 5.037L1.825 21.8l6.162-1.616-.34-.23zm8.995-5.918c-.287-.143-1.697-.838-1.959-.933-.261-.096-.452-.143-.642.143-.19.286-.736.933-.902 1.124-.167.19-.333.214-.62.071-.286-.143-1.21-.446-2.305-1.424-.853-.76-1.428-1.7-1.595-1.985-.167-.286-.018-.44.125-.581.129-.127.287-.333.43-.5.143-.167.19-.286.286-.476.096-.19.048-.357-.024-.5-.071-.143-.642-1.548-.88-2.12-.232-.558-.467-.482-.642-.491-.167-.008-.357-.01-.548-.01-.19 0-.5.071-.762.357-.262.286-1 .976-1 2.38 0 1.405 1.023 2.762 1.166 2.952.143.19 2.013 3.074 4.877 4.31.682.293 1.215.469 1.63.601.687.218 1.312.187 1.806.114.55-.082 1.697-.692 1.937-1.36.24-.668.24-1.24.167-1.36-.072-.12-.262-.19-.548-.332z"/>
                  </svg>
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="pt-6 opacity-0 animate-[slideIn_0.4s_ease_forwards]" style={{ animationDelay: '0.54s' }}>
                <a href="tel:+442046155575" className="text-xs text-[#7d718c] block">+44 20 4615 5575</a>
                <a href="mailto:support@digioverse.com" className="text-xs text-[#7d718c] block mt-1">support@digioverse.com</a>
              </div>
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </>
  );
}
