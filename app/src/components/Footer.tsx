import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0d0520] text-[#f7f7fa] border-t border-[#ddd0f4]/10">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 pt-16 pb-8">
        {/* Premium CTA Row inside Footer */}
        <div className="border-b border-[rgba(255,255,255,0.08)] pb-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-bold font-display text-[#f7f7fa]">
              Ready to grow your UK business?
            </h3>
            <p className="text-sm text-[#c7a7ff] mt-1.5 max-w-lg">
              Book a free same-day appointment or get a free custom website audit. Let's discuss your digital conversion goals today.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link 
              to="/book-appointment" 
              className="bg-[#6a00ff] hover:bg-[#5900d6] text-white text-sm font-semibold px-6 py-3 rounded-full shadow-[0_10px_25px_rgba(106,0,255,0.25)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Book Free Appointment
            </Link>
            <Link 
              to="/contact" 
              className="border border-[#c7a7ff]/30 hover:border-[#c7a7ff] text-[#f7f7fa] text-sm font-semibold px-6 py-3 rounded-full hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Free Audit
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div>
            <Link to="/" className="inline-flex items-center" aria-label="Digioverse home">
              <img src="/assets/digioverse-logo.png" alt="Digioverse" className="h-10 w-auto brightness-0 invert" />
            </Link>
            <p className="text-[#c7a7ff] mt-4 text-sm leading-relaxed max-w-[280px]">
              Digioverse helps UK businesses build powerful websites, stronger brands, and digital systems that convert visitors into real customers.
            </p>
            <div className="flex gap-4 mt-6">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/company/digioverse/', label: 'LinkedIn' },
                { Icon: Instagram, href: 'https://www.instagram.com/digioverse/', label: 'Instagram' },
                { Icon: Facebook, href: 'https://www.facebook.com/digioverse/', label: 'Facebook' },
              ].map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-[#7d718c] hover:text-[#6a00ff] transition-colors" aria-label={social.label}>
                  <social.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff] mb-4">Services</h4>
            <div className="space-y-3">
              {[
                { label: 'Website Design UK', href: '/services/website-design-uk' },
                { label: 'WordPress Design', href: '/services/wordpress-website-design' },
                { label: 'Web Development', href: '/services/web-development' },
                { label: 'SEO & Content', href: '/services/seo-content' },
                { label: 'Local SEO Services', href: '/services/local-seo' },
                { label: 'Google Ads PPC', href: '/services/google-ads' },
                { label: 'Meta Ads Management', href: '/services/meta-ads' },
              ].map((s) => (
                <Link key={s.label} to={s.href} className="block text-sm text-[#7d718c] hover:text-[#f7f7fa] transition-colors">{s.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff] mb-4">Company</h4>
            <div className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Our Projects', href: '/work' },
                { label: 'Our Products', href: '/products' },
                { label: 'Pricing Packages', href: '/pricing' },
                { label: 'Industries We Serve', href: '/industries' },
                { label: 'Frequently Asked FAQs', href: '/faqs' },
                { label: 'Book Appointment', href: '/book-appointment' },
                { label: 'Latest News & Blog', href: '/blog' },
              ].map((item) => (
                <Link key={item.label} to={item.href} className="block text-sm text-[#7d718c] hover:text-[#f7f7fa] transition-colors">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff] mb-4">Get in Touch</h4>
            <div className="space-y-3">
              <a href="tel:+442046155575" className="flex items-center gap-2 text-sm text-[#f7f7fa] hover:text-[#6a00ff] transition-colors">
                <Phone className="w-4 h-4 text-[#6a00ff]" /> +44 20 4615 5575
              </a>
              <a href="mailto:support@digioverse.com" className="flex items-center gap-2 text-sm text-[#f7f7fa] hover:text-[#6a00ff] transition-colors">
                <Mail className="w-4 h-4 text-[#6a00ff]" /> support@digioverse.com
              </a>
              <div className="flex items-start gap-2 text-sm text-[#7d718c]">
                <MapPin className="w-4 h-4 text-[#6a00ff] shrink-0 mt-0.5" />
                <span>Woking & Romford, UK</span>
              </div>
              <a href="https://wa.me/442046155575" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#6a00ff] hover:underline font-semibold mt-1">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-[rgba(255,255,255,0.08)] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap items-center gap-3.5 text-xs text-[#7d718c]">
            <span className="font-semibold uppercase tracking-wider text-[10px]">We Accept Payments:</span>
            <div className="flex flex-wrap items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-300">
              {/* PayPal */}
              <span className="text-[11px] font-black tracking-wider uppercase">PayPal</span>
              <span className="text-[#7d718c]/30 text-xs">|</span>
              {/* Stripe */}
              <span className="text-[11px] font-black tracking-wider uppercase">Stripe</span>
              <span className="text-[#7d718c]/30 text-xs">|</span>
              {/* Visa */}
              <span className="text-[11px] font-black italic tracking-wider uppercase">Visa</span>
              <span className="text-[#7d718c]/30 text-xs">|</span>
              {/* Mastercard */}
              <span className="text-[11px] font-bold tracking-wider uppercase">Mastercard</span>
              <span className="text-[#7d718c]/30 text-xs">|</span>
              {/* Wise */}
              <span className="text-[11px] font-extrabold tracking-wider uppercase">Wise</span>
              <span className="text-[#7d718c]/30 text-xs">|</span>
              {/* Google Pay */}
              <span className="text-[11px] font-bold uppercase">Google Pay</span>
              <span className="text-[#7d718c]/30 text-xs">|</span>
              {/* Apple Pay */}
              <span className="text-[11px] font-bold uppercase">Apple Pay</span>
            </div>
          </div>
          <div className="text-xs text-[#7d718c] font-semibold text-center sm:text-right">
            Secure 256-bit SSL encrypted payments.
          </div>
        </div>

        <div className="border-t border-[rgba(255,255,255,0.08)] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="text-xs text-[#7d718c]">&copy; 2026 Digioverse. All rights reserved.</p>
            <p className="text-[10px] text-[#7d718c]/70 mt-1">Digioverse LTD | Registered in UK | Company Number: 17236340</p>
          </div>
          <div className="flex gap-4 text-xs text-[#7d718c]">
            <Link to="/uk" className="hover:text-[#f7f7fa] transition-colors">UK Agency</Link>
            <span>&middot;</span>
            <Link to="/usa" className="hover:text-[#f7f7fa] transition-colors">US Support</Link>
            <span>&middot;</span>
            <Link to="/privacy" className="hover:text-[#f7f7fa] transition-colors">Privacy Policy</Link>
            <span>&middot;</span>
            <Link to="/terms" className="hover:text-[#f7f7fa] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
