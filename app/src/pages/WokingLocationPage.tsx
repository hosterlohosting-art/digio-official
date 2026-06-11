import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { 
  MapPin, Phone, Mail, Clock, Shield, Search, Zap, 
  CheckCircle, Star, Laptop 
} from 'lucide-react';

export default function WokingLocationPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digioverse",
    "alternateName": "DIGIOVERSE LTD",
    "image": "https://digioverse.com/assets/favicon.jpg",
    "@id": "https://digioverse.com/locations/woking/#localbusiness",
    "url": "https://digioverse.com/locations/woking",
    "telephone": "+442046155575",
    "priceRange": "££",
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
      "latitude": 51.3188588,
      "longitude": -0.563065
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://clutch.co/profile/digioverse"
    ]
  };

  return (
    <>
      <SEO 
        title="Web Design & SEO Agency in Woking, Surrey | Digioverse"
        description="Looking for professional website design or SEO in Woking? Digioverse builds fast, custom, high-converting websites and Google ranking strategies for local businesses."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Woking Web Design" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Local SEO & Web Design Specialists</span>
          <CharacterScatter 
            text="Web Design & SEO Agency in Woking, Surrey" 
            className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" 
            as="h1" 
          />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[800px] leading-relaxed">
              Based at 1A North Road in Woking (GU21 5DS), Digioverse is your local partner for high-performance website engineering and target-driven local SEO campaigns. We design bespoke, lightning-fast React and Next.js sites that help businesses in Woking, Guildford, Weybridge, and across Surrey stand out, build trust, and rank at the top of Google.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/book-appointment">Book a Meeting in Woking</Button>
              <Button variant="ghost" to="#location-details">Find Our Woking Office</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Local Web Design */}
      <section className="bg-white py-16 md:py-24 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Why Go Local</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4">
                Custom Web Design & Local SEO Built to Win Surrey Customers
              </h2>
              <p className="text-[#53445f] mt-6 leading-relaxed">
                Generic templates and standard page-builders (like slow WordPress installations) often fail to capture the high expectations of the Surrey business ecosystem. They load slowly, drop conversion rates, and lack the clean semantic code needed to rank locally.
              </p>
              <p className="text-[#53445f] mt-4 leading-relaxed">
                At Digioverse, we build your site from the ground up using React and Next.js. We integrate Google Business Profile structures, local schema markup, and target geographical keywords to place your business exactly where Woking buyers are looking.
              </p>
              
              <ul className="mt-8 space-y-4">
                {[
                  'Hand-crafted custom design aligned to your brand guidelines.',
                  'Under 1-second load times optimized for mobile checkouts.',
                  'Complete local keyword integration (Woking, Surrey, Guildford).',
                  'Verified LocalBusiness schema so search engines see your NAP data.'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-[#53445f] font-semibold">
                    <CheckCircle className="w-5 h-5 text-[#6a00ff] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="grid sm:grid-cols-2 gap-6">
              <div className="bg-[#f7f7fa] border border-[#ddd0f4]/70 p-6 rounded-2xl">
                <Zap className="w-8 h-8 text-[#6a00ff] mb-4" />
                <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Blazing Fast Code</h3>
                <p className="text-xs text-[#53445f] mt-2 leading-relaxed">
                  Statically generated React layouts that rank higher on Google Core Web Vitals.
                </p>
              </div>
              <div className="bg-[#f7f7fa] border border-[#ddd0f4]/70 p-6 rounded-2xl">
                <Search className="w-8 h-8 text-[#6a00ff] mb-4" />
                <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Local SEO Target</h3>
                <p className="text-xs text-[#53445f] mt-2 leading-relaxed">
                  Map and directory citations built specifically for the Woking and Surrey directories.
                </p>
              </div>
              <div className="bg-[#f7f7fa] border border-[#ddd0f4]/70 p-6 rounded-2xl">
                <Laptop className="w-8 h-8 text-[#6a00ff] mb-4" />
                <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Mobile First</h3>
                <p className="text-xs text-[#53445f] mt-2 leading-relaxed">
                  Fluid responsive templates optimized for local users searching on smartphones.
                </p>
              </div>
              <div className="bg-[#f7f7fa] border border-[#ddd0f4]/70 p-6 rounded-2xl">
                <Shield className="w-8 h-8 text-[#6a00ff] mb-4" />
                <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Corporate Security</h3>
                <p className="text-xs text-[#53445f] mt-2 leading-relaxed">
                  Secure hosting, SSL integration, and strict security headers built-in.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Location Office Map & NAP Details */}
      <section id="location-details" className="bg-[#f7f7fa] py-16 md:py-24 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[450px_minmax(0,1fr)] gap-12 items-center">
            <ScrollReveal className="space-y-6">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Find Us Locally</span>
              <h2 className="text-3xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">
                Visit Our Woking Office
              </h2>
              <p className="text-[#53445f] leading-relaxed">
                Located near Woking Town Centre, our office is easily accessible for in-person project discovery sessions and strategy meetings. We are just a short walk from Woking Train Station.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#ddd0f4]/60">
                  <MapPin className="w-6 h-6 text-[#6a00ff] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#7d718c] uppercase">Office Address</h4>
                    <p className="text-sm font-semibold text-[#0d0520] mt-1">1A North Rd, Woking GU21 5DS, Surrey, UK</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#ddd0f4]/60">
                  <Phone className="w-6 h-6 text-[#6a00ff] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#7d718c] uppercase">Phone Number</h4>
                    <p className="text-sm font-semibold text-[#0d0520] mt-1">+44 20 4615 5575</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#ddd0f4]/60">
                  <Mail className="w-6 h-6 text-[#6a00ff] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#7d718c] uppercase">Support Email</h4>
                    <p className="text-sm font-semibold text-[#0d0520] mt-1">support@digioverse.com</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-white rounded-xl border border-[#ddd0f4]/60">
                  <Clock className="w-6 h-6 text-[#6a00ff] shrink-0" />
                  <div>
                    <h4 className="text-xs font-extrabold text-[#7d718c] uppercase">Working Hours</h4>
                    <p className="text-sm font-semibold text-[#0d0520] mt-1">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button to="/book-appointment" className="w-full text-center">Schedule a Meeting</Button>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-[#ddd0f4] shadow-[0_20px_50px_rgba(13,5,32,0.04)] bg-white p-2">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2493.5857211130635!2d-0.5630650233989357!3d51.31885882424991!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876dca3bb5eb127%3A0xe54e3d643ee16ba5!2s1A%20North%20Rd%2C%20Woking%20GU21%205DS%2C%20UK!5e0!3m2!1sen!2sus!4v1718110000000!5m2!1sen!2sus"
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '24px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Digioverse Woking Office Map"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Local Client Testimonial */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[850px] mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Surrey Business Testimonial</span>
            <div className="flex justify-center gap-0.5 mt-4 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-[#6a00ff] fill-[#6a00ff]" />)}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-relaxed italic">
              "Our local rankings in Woking and Guildford were non-existent. After Digioverse implemented their technical SEO structure and cleaned up our website speed, our search traffic grew by 200% in 3 months. In-person enquiries have skyrocketed."
            </p>
            <div className="mt-8 pt-6 border-t border-[#ddd0f4]/80 inline-block">
              <h4 className="text-base font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">David Cooper</h4>
              <p className="text-xs text-[#7d718c] font-semibold mt-1">Director, Cooper & Sons Legal, Surrey</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[850px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Local FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0d0520] mt-4 font-['Plus_Jakarta_Sans']">Woking Web Design & SEO FAQ</h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "Do you offer in-person meetings at your Woking office?",
                a: "Yes, absolutely. We welcome Woking and Surrey-based clients to visit our office at 1A North Road for in-person consultation, wireframe reviews, and digital strategy mapping. Please book an appointment in advance."
              },
              {
                q: "What local industries do you serve in Woking?",
                a: "We work with professional services (law firms, accountants), home maintenance companies (plumbing, building), clinic owners (dentists, medical practices), local restaurants, and scaling ecommerce brands throughout Woking, Horsell, Knaphill, and Guildford."
              },
              {
                q: "How long does local SEO take to see results in Surrey?",
                a: "For local searches (e.g. 'web designer near me' or 'accountants in Woking'), you can start seeing ranking improvements on Google Maps and organic results within 30 to 90 days. This depends heavily on existing competition and profile verification."
              },
              {
                q: "Can you help set up our Google Business Profile?",
                a: "Yes, as part of our Local SEO services, we assist you in registering, verifying, and optimizing your Google Business Profile (GBP), ensuring consistent NAP (Name, Address, Phone) citation matching."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f7f7fa] rounded-2xl border border-[#ddd0f4] p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] flex gap-3">
                  <span className="text-[#6a00ff]">Q:</span>
                  <span>{item.q}</span>
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#53445f] pl-6 border-l border-[#6a00ff]/30">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0d0520] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[rgba(106,0,255,0.08)] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-[#f7f7fa] tracking-tight font-['Plus_Jakarta_Sans']">
            Grow Your Woking Business Today
          </h2>
          <p className="text-base md:text-lg text-[#c7a7ff] mt-5 max-w-[620px] mx-auto leading-relaxed">
            Get a high-performance custom website and a tailored Local SEO plan to start capturing high-value Surrey customers.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button to="/book-appointment">Book Free Consultation</Button>
            <Button variant="ghost" to="https://wa.me/442046155575">WhatsApp Our Founders</Button>
          </div>
        </div>
      </section>
    </>
  );
}
