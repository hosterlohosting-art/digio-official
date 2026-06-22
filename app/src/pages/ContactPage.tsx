import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import Accordion from '../components/Accordion';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Phone, Mail, MessageCircle, MapPin, Clock, PhoneCall, FileText, Linkedin, Instagram, Facebook } from 'lucide-react';


const faqItems = [
  { question: 'How much does a website cost?', answer: 'Our website projects start from £995 for a professional 5-page business website. E-commerce sites and custom platforms typically range from £3,995 to £5,000+ depending on complexity, and custom SaaS software platforms are scoped individually (contact us). We provide detailed, fixed-price quotes after our discovery calls — no hidden fees.' },
  { question: 'How long does it take to build a website?', answer: 'A typical business website takes 2\u20134 weeks from kickoff to launch. More complex projects with custom functionality or e-commerce can take 6\u201310 weeks. We\'ll give you a precise timeline in your proposal.' },
  { question: 'Do you work with businesses outside the UK?', answer: 'Absolutely. While we\'re based in Woking, UK, we work with clients across the US, Europe, and beyond. Our team is experienced in remote collaboration and we schedule calls to suit your timezone.' },
  { question: 'What platforms do you build on?', answer: 'We build custom websites using React and Next.js for maximum performance and flexibility. For content-managed sites, we work with WordPress, Sanity, and Strapi. For e-commerce, we specialise in Shopify and WooCommerce. We\'ll recommend the best platform for your specific needs.' },
  { question: 'Do you offer ongoing support after launch?', answer: 'Yes \u2014 we offer monthly maintenance and support packages starting from \u00a3195/month. This includes hosting, security updates, content changes, performance monitoring, and priority support.' },
  { question: 'Can you help with an existing website?', answer: 'Of course. We regularly take over existing websites for redesign, optimisation, or ongoing management. We\'ll start with a comprehensive audit and recommend the best path forward.' },
  { question: 'What makes Digioverse different from other agencies?', answer: 'Three things: strategy-first approach (we understand your business before we build), results-driven mindset (we measure success in leads and revenue, not just aesthetics), and true partnership (you get a dedicated team invested in your long-term success).' },
  { question: 'How do I get started?', answer: 'Simply fill out the contact form, call us on +44 20 4615 5575, or send us a WhatsApp message. We\'ll schedule a free 30-minute discovery call to understand your needs and recommend the right approach.' },
];

const trustItems = [
  { icon: Clock, title: '24-Hour Response', description: 'We respond to all enquiries within one business day.' },
  { icon: PhoneCall, title: 'Free Consultation', description: 'Every project starts with a complimentary discovery call.' },
  { icon: FileText, title: 'No Obligation Quotes', description: 'Detailed proposals with clear, fixed pricing.' },
  { icon: MapPin, title: 'UK-Based Team', description: 'Headquartered in Woking with clients worldwide.' },
];

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '', preferredTime: '',
    website: '', // honeypot spam protection
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      // If honeypot is filled, simulate success silently
      setFormState('success');
      setFormData({
        name: '', email: '', phone: '', company: '', service: '', budget: '', message: '', preferredTime: '', website: ''
      });
      return;
    }

    setFormState('loading');
    try {
      const payload = {
        _subject: 'New Message from Contact Form',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: formData.budget,
        preferredTime: formData.preferredTime,
        message: formData.message,
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
        throw new Error('Form submission failed');
      }

      setFormState('success');
      setFormData({ name: '', email: '', phone: '', company: '', service: '', budget: '', message: '', preferredTime: '', website: '' });
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  const inputClass = "w-full bg-white border border-[#ddd0f4] rounded-xl px-5 py-3.5 text-[#0d0520] placeholder:text-[#7d718c] text-sm focus:border-[#6a00ff] focus:shadow-[0_0_20px_rgba(106,0,255,0.15)] transition-all outline-none";
  const labelClass = "text-xs font-medium text-[#7d718c] uppercase tracking-wider mb-1.5 block";

  return (
    <>
      <SEO 
        title="Contact Digioverse | Elite UK Digital Marketing & Web Agency"
        description="Contact Digioverse today. Get a free, transparent website audit, custom quote, or schedule a free 30-minute growth discovery call. Phone +44 20 4615 5575."
      />
      {/* Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Contact" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Get in Touch</span>
          <CharacterScatter text="Let's Build Your Growth System" className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h1" />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[560px] leading-relaxed">Bring us your website, product, funnel, or campaign challenge. We will help you shape it into something premium and measurable.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.8} className="flex flex-wrap items-center gap-x-8 gap-y-4 mt-10">
            <a href="tel:+442046155575" className="flex items-center gap-2.5 text-[#0d0520] hover:text-[#6a00ff] transition-colors">
              <Phone className="w-5 h-5 text-[#6a00ff]" /> +44 20 4615 5575
            </a>
            <a href="mailto:support@digioverse.com" className="flex items-center gap-2.5 text-[#0d0520] hover:text-[#6a00ff] transition-colors">
              <Mail className="w-5 h-5 text-[#6a00ff]" /> support@digioverse.com
            </a>
            <a href="https://wa.me/442046155575" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-[#6a00ff] hover:opacity-80 transition-opacity">
              <MessageCircle className="w-5 h-5" /> WhatsApp
            </a>
            <span className="flex items-center gap-2 text-sm text-[#53445f] md:border-l md:border-[#ddd0f4] md:pl-8 mt-2 md:mt-0">
              <Clock className="w-4.5 h-4.5 text-[#6a00ff]" />
              <span className="font-semibold text-[#0d0520]">Working Hours:</span> Mon–Fri 09:00–18:00 GMT (Sat & Sun Closed)
            </span>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-[55%_40%] gap-12">
            {/* Form */}
            <ScrollReveal>
              <div className="bg-white rounded-[24px] shadow-[0_4px_24px_rgba(13,5,32,0.06)] p-8 md:p-12">
                <h3 className="text-xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans']">Send Us a Message</h3>
                <p className="text-sm text-[#53445f] mt-2">Fill out the form below and we'll get back to you within 24 hours.</p>

                {formState === 'success' ? (
                  <div className="py-12 text-center">
                    <p className="text-lg text-[#6a00ff] font-medium">\u2713 Message Sent! We'll be in touch soon.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 mt-8">
                    {/* Honeypot field for spam prevention */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Your Name *</label>
                      <input type="text" required minLength={2} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Smith" className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Email Address *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@yourcompany.com" className={inputClass} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Phone Number</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+44 7700 900000" className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>Company Name</label>
                        <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="Your Company Ltd" className={inputClass} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className={labelClass}>Service You're Interested In *</label>
                        <select required value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className={inputClass}>
                          <option value="">Select a service...</option>
                          {['Paid Advertising', 'SEO & Content', 'Web Development', 'Creative Studio', 'Email Marketing', 'CRO & Analytics', 'SaaS Development', 'Other / Not Sure'].map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className={labelClass}>Approximate Budget</label>
                        <select value={formData.budget} onChange={(e) => setFormData({ ...formData, budget: e.target.value })} className={inputClass}>
                          <option value="">Select budget range...</option>
                          {['Under \u00a33,000', '\u00a33,000 \u2013 \u00a310,000', '\u00a310,000 \u2013 \u00a325,000', '\u00a325,000 \u2013 \u00a350,000', '\u00a350,000+', 'Not Sure / Discuss'].map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Preferred Discovery Call Time *</label>
                      <select required value={formData.preferredTime} onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })} className={inputClass}>
                        <option value="">Select a preferred time slot...</option>
                        {['Same Day (ASAP)', 'Morning (09:00 - 12:00 GMT)', 'Afternoon (12:00 - 15:00 GMT)', 'Late Afternoon (15:00 - 18:00 GMT)', 'Next Business Day'].map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={labelClass}>Tell Us About Your Project *</label>
                      <textarea required minLength={20} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your project, goals, timeline, and any specific requirements..." rows={5} className={`${inputClass} resize-y min-h-[120px]`} />
                    </div>
                    <Button type="submit" className="w-full py-4" disabled={formState === 'loading'}>
                      {formState === 'loading' ? 'Sending...' : 'Send Message'}
                    </Button>
                    {formState === 'error' && <p className="text-sm text-red-500 text-center">Something went wrong. Please try again or email us directly.</p>}
                    <p className="text-xs text-[#7d718c] text-center mt-4">Your information is secure and will never be shared.</p>
                  </form>
                )}
              </div>
            </ScrollReveal>

            {/* Info Column */}
            <div className="space-y-8">
              <ScrollReveal delay={0.2}>
                <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(13,5,32,0.06)] p-8">
                  <h4 className="text-lg font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans']">What Happens Next?</h4>
                  <div className="space-y-4 mt-5">
                    {['We review your enquiry within 24 hours', 'Our team schedules a discovery call', 'We prepare a tailored proposal', 'Project kicks off with a dedicated team'].map((step, i) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#6a00ff] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</div>
                        <p className="text-sm text-[#53445f] leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(13,5,32,0.06)] p-8">
                  <h4 className="text-lg font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans']">Office Location</h4>
                  <div className="mt-4 space-y-1 text-sm">
                    <p className="text-[#0d0520] font-medium">Woking & Romford</p>
                    <p className="text-[#53445f]">United Kingdom</p>
                  </div>
                  <div className="mt-4 aspect-video rounded-xl overflow-hidden bg-[#eee7ff]">
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-0.57%2C51.31%2C-0.55%2C51.33&layer=mapnik&marker=51.32%2C-0.56"
                      className="w-full h-full border-0"
                      loading="lazy"
                      title="Digioverse Office Location"
                    />
                  </div>
                  <a href="https://www.google.com/maps/search/1A+North+Rd+Woking+GU21+5DS" target="_blank" rel="noopener noreferrer" className="text-sm text-[#6a00ff] font-medium mt-3 inline-flex items-center gap-1">
                    Get Directions &rarr;
                  </a>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="bg-white rounded-[20px] shadow-[0_4px_24px_rgba(13,5,32,0.06)] p-8">
                  <h4 className="text-lg font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans']">Connect With Us</h4>
                  <div className="mt-4 space-y-3">
                    <a href="tel:+442046155575" className="flex items-center gap-3 text-sm text-[#0d0520]"><Phone className="w-4 h-4 text-[#6a00ff]" /> +44 20 4615 5575</a>
                    <a href="mailto:support@digioverse.com" className="flex items-center gap-3 text-sm text-[#0d0520]"><Mail className="w-4 h-4 text-[#6a00ff]" /> support@digioverse.com</a>
                    <a href="https://wa.me/442046155575" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-[#6a00ff]"><MessageCircle className="w-4 h-4" /> WhatsApp Us</a>
                  </div>
                  <div className="mt-5">
                    <p className="text-xs text-[#7d718c] uppercase tracking-wider mb-3">Follow Us</p>
                    <div className="flex gap-4">
                      {[
                        { Icon: Linkedin, href: 'https://www.linkedin.com/company/digioverse/', label: 'LinkedIn' },
                        { Icon: Instagram, href: 'https://www.instagram.com/digioverse/', label: 'Instagram' },
                        { Icon: Facebook, href: 'https://www.facebook.com/digioverse/', label: 'Facebook' },
                      ].map((social) => (
                        <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="text-[#7d718c] hover:text-[#6a00ff] transition-colors"><social.Icon className="w-5 h-5" /></a>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[800px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">FAQ</span>
            <CharacterScatter text="Common Questions" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-[#53445f] mt-4">Everything you need to know about working with Digioverse.</p>
          </ScrollReveal>
          <ScrollReveal>
            <Accordion items={faqItems} />
          </ScrollReveal>
        </div>
      </section>

      {/* Trust Band */}
      <section className="bg-[#0d0520] py-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.12}>
                <div className="text-center">
                  <item.icon className="w-10 h-10 text-[#6a00ff] mx-auto" />
                  <h4 className="text-lg font-semibold text-[#f7f7fa] font-['Plus_Jakarta_Sans'] mt-4">{item.title}</h4>
                  <p className="text-sm text-[#7d718c] mt-2">{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0d0520] py-16 md:py-20 border-t border-[rgba(255,255,255,0.08)]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <CharacterScatter text="Ready to Transform Your Digital Presence?" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#c7a7ff] mt-5 leading-relaxed">The best time to start was yesterday. The second-best time is right now.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button to="/contact">Get a Free Quote</Button>
              <Button variant="ghost" href="tel:+442046155575">Call: +44 20 4615 5575</Button>
            </div>
            <p className="text-xs text-[#7d718c] mt-4">Prefer email? Reach us at <a href="mailto:support@digioverse.com" className="text-[#6a00ff] hover:underline">support@digioverse.com</a></p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
