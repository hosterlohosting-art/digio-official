import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Search, Zap, CheckCircle, Star, Laptop } from 'lucide-react';

export default function SurreyLocationPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Digioverse",
    "alternateName": "DIGIOVERSE LTD",
    "image": "https://digioverse.com/assets/favicon.jpg",
    "@id": "https://digioverse.com/locations/surrey/#localbusiness",
    "url": "https://digioverse.com/locations/surrey",
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
    "sameAs": [
      "https://clutch.co/profile/digioverse"
    ]
  };

  return (
    <>
      <SEO 
        title="Web Design & SEO Services in Surrey | Digioverse"
        description="Leading website design and SEO services in Surrey. We build bespoke, lightning-fast sites for businesses in Guildford, Woking, Weybridge, and across Surrey."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Surrey Web Design" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Surrey Growth & Development Partner</span>
          <CharacterScatter 
            text="Web Design & SEO Services in Surrey" 
            className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" 
            as="h1" 
          />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[800px] leading-relaxed">
              Digioverse helps businesses throughout Surrey scale online. From bespoke web design and custom ecommerce portals to local search engine optimization (SEO) campaigns, we build high-converting systems for companies in Guildford, Woking, Weybridge, Epsom, and beyond.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/book-appointment">Book a Free Discovery Call</Button>
              <Button variant="ghost" to="/pricing">View Packages & Cost</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Surrey Areas Served */}
      <section className="bg-white py-16 md:py-24 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[1fr_minmax(0,500px)] gap-12 items-center">
            <ScrollReveal>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Areas We Serve</span>
              <h2 className="text-3xl md:text-5xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4">
                Serving Businesses Across Surrey Towns
              </h2>
              <p className="text-[#53445f] mt-6 leading-relaxed">
                As a fully registered UK company headquartered in Woking, our team possesses local market intelligence. We design specialized conversion paths that speak directly to Surrey's high-value client base, serving businesses in:
              </p>
              
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  'Woking (GU21, GU22)',
                  'Guildford (GU1, GU2)',
                  'Weybridge (KT13)',
                  'Epsom (KT17, KT18, KT19)',
                  'Reigate & Redhill (RH2)',
                  'Farnham & Haslemere (GU9)'
                ].map((town, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[#0d0520] font-bold text-sm">
                    <div className="w-2 h-2 rounded-full bg-[#6a00ff]" />
                    <span>{town}</span>
                  </div>
                ))}
              </div>

              <p className="text-[#53445f] mt-6 leading-relaxed">
                Whether you need a custom landing page for local services or a complex custom SaaS platform with headless CMS integrations, we provide transparent rates, rapid delivery times, and direct founder support.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2} className="bg-[#f7f7fa] border border-[#ddd0f4] rounded-[28px] p-8 space-y-6">
              <h3 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Surrey Web Package Perks</h3>
              <div className="space-y-4">
                {[
                  { title: 'Local Schema Built-in', desc: 'We structure correct geographical meta tags into the page code to ensure immediate search engine discoverability.' },
                  { title: 'Ultra-Fast Loading Speed', desc: 'Statically-generated layouts mean your website loads instantly, reducing bounce rates and maximizing mobile customer retention.' },
                  { title: 'Direct Founder Access', desc: 'No complex agency bureaucracy. You communicate directly with founders Ahsan and Mehar Hassan to shape your strategy.' },
                  { title: 'Conversion Focused', desc: 'Interactive booking forms, WhatsApp integrations, and clear CTAs designed to turn organic search traffic into sales.' }
                ].map((perk, i) => (
                  <div key={i} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-[#6a00ff] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{perk.title}</h4>
                      <p className="text-xs text-[#53445f] mt-1 leading-relaxed">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Local Client Showcase (Surrey specific) */}
      <section className="bg-[#f7f7fa] py-16 md:py-24 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[850px] mx-auto text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Surrey Brand Success</span>
            <div className="flex justify-center gap-0.5 mt-4 mb-6">
              {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 text-[#6a00ff] fill-[#6a00ff]" />)}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-relaxed italic">
              "The web design looks incredibly premium, and it has completely changed how prospective clients view our business. We have had so many clients compliment our new branding and website. It's rare to find a local team that delivers elite engineering and commercial marketing strategy in one."
            </p>
            <div className="mt-8 pt-6 border-t border-[#ddd0f4]/80 inline-block">
              <h4 className="text-base font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Claire Robinson</h4>
              <p className="text-xs text-[#7d718c] font-semibold mt-1">Founder, Robinson Beauty, Surrey</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services List for Surrey Businesses */}
      <section className="bg-white py-16 md:py-24 border-b border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Services</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4">
              What We Do for Surrey Businesses
            </h2>
            <p className="text-base text-[#53445f] mt-4">
              We help local service providers, e-commerce storefronts, and startups get more visibility, build trust, and scale.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Laptop,
                title: "Custom Web Design",
                desc: "Beautiful, responsive websites hand-coded in React. Perfect for law firms, medical clinics, estate agents, and local service providers."
              },
              {
                icon: Search,
                title: "Local & Technical SEO",
                desc: "Optimize your Google Business Profile, fix server redirect issues, and target geographical keywords to dominate Surrey searches."
              },
              {
                icon: Zap,
                title: "Paid Advertising & Ads",
                desc: "Launch high-converting campaigns on Google Search, Facebook, and Instagram to generate immediate phone calls and enquiries."
              }
            ].map((s, idx) => (
              <div key={idx} className="bg-[#f7f7fa] border border-[#ddd0f4]/70 p-8 rounded-3xl hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#6a00ff]/10 text-[#6a00ff] flex items-center justify-center mb-6">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mb-3">{s.title}</h3>
                <p className="text-sm leading-relaxed text-[#53445f]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-[850px] mx-auto px-5">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Help & FAQ</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0d0520] mt-4 font-['Plus_Jakarta_Sans']">Surrey Web & SEO FAQ</h2>
          </div>
          
          <div className="space-y-6">
            {[
              {
                q: "Where are you based in Surrey?",
                a: "Our physical office is located in Woking at 1A North Road (GU21 5DS). We serve the entire Surrey county, including Guildford, Weybridge, Epsom, and Farnham. We offer both in-person meetings at our office and video calls."
              },
              {
                q: "Do you build custom websites or use WordPress?",
                a: "We offer both! For businesses needing ultra-performance, we build custom sites in React and Next.js. For clients who want an easy-to-use CMS, we design custom WordPress layouts that are fully optimized for speed and SEO."
              },
              {
                q: "What is your pricing structure for Surrey businesses?",
                a: "We believe in transparent pricing. Our starter website package begins at £99 (ideal for startups), while our comprehensive premium business packages start at £2,495. All pricing is one-time with zero hidden fees."
              },
              {
                q: "How can I book a free website audit?",
                a: "You can book a free same-day appointment on our /book-appointment page. Our founders will review your current site speed, security configuration, and local search rankings and provide a free action plan."
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

      {/* Latest Growth Resources Section */}
      <section className="bg-gradient-to-b from-white to-[#f7f7fa] py-16 md:py-24 border-t border-[#ddd0f4]/50">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="text-center max-w-[700px] mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">SEO & Growth Resources</span>
            <h2 className="text-3xl md:text-5xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4">
              Latest Insights for Surrey Businesses
            </h2>
            <p className="text-base text-[#53445f] mt-4">
              Actionable advice on website design pricing, local SEO, and platform performance compiled by our founders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Complete UK Local SEO Checklist: Dominate Surrey and Woking Local Search",
                desc: "A step-by-step local search checklist focusing on Google Business Profile, local schemas, map coordinates, and citation targets.",
                slug: "uk-local-seo-checklist-surrey-woking",
                readTime: "12 min read"
              },
              {
                title: "WordPress vs Custom React Code: Which is Better for Small Business SEO in the UK?",
                desc: "Comparing PageSpeed, Core Web Vitals, security overhead, and custom schema injection between WordPress and bespoke React code.",
                slug: "wordpress-vs-custom-react-seo",
                readTime: "11 min read"
              },
              {
                title: "How Much Does a Website Cost in the UK? (2026 Price Guide)",
                desc: "A completely transparent pricing guide breaking down freelance rates, agency pricing, and ongoing hosting/maintenance costs in the UK.",
                slug: "how-much-does-a-website-cost-uk",
                readTime: "9 min read"
              }
            ].map((article, i) => (
              <div key={i} className="bg-white border border-[#ddd0f4]/80 p-8 rounded-3xl hover:shadow-lg transition-all duration-300 flex flex-col h-full font-['Outfit']">
                <span className="text-xs text-[#7d718c] font-semibold">{article.readTime}</span>
                <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-3 mb-3 leading-snug hover:text-[#6a00ff] transition-colors">
                  <Link to={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="text-sm leading-relaxed text-[#53445f] flex-1 mb-6">{article.desc}</p>
                <Link to={`/blog/${article.slug}`} className="text-sm font-bold text-[#6a00ff] hover:text-[#3b0a75] transition-colors flex items-center gap-1.5 mt-auto">
                  Read Local Guide &rarr;
                </Link>
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
            Ready to Scale Your Surrey Business?
          </h2>
          <p className="text-base md:text-lg text-[#c7a7ff] mt-5 max-w-[620px] mx-auto leading-relaxed">
            Get a premium website design and rank for local keywords with our custom local SEO strategies.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button to="/book-appointment">Book Free Strategy Call</Button>
            <Button variant="ghost" to="https://wa.me/442046155575">WhatsApp Us Now</Button>
          </div>
        </div>
      </section>
    </>
  );
}
