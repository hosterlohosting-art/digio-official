import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Check } from 'lucide-react';
import {
  Monitor,
  Code,
  ShoppingCart,
  FileText,
  Boxes,
  Search,
  Target,
  Share2,
  PenTool,
  BarChart3,
  Fingerprint,
  Palette,
  Printer,
  Mail,
  Wrench,
  Server,
  MapPin
} from 'lucide-react';

const categories = {
  Build: {
    icon: Code,
    desc: 'Websites, platforms, and products built for performance and scale.',
    services: [
      { icon: Monitor, title: 'Website Design', description: 'Bespoke, high-converting responsive website designs architected on modern design principles. We combine deliberate conversion funnel styling, precise visual typography hierarchies, and premium interactive components that establish immediate customer trust and turn high-intent traffic into commercial inquiries.', tags: ['Responsive', 'UI/UX', 'Conversion-Focused'], link: '/services/website-design' },
      { icon: Monitor, title: 'WordPress Website Design', description: 'Professional WordPress websites designed for UK businesses with responsive layouts, SEO setup, fast loading speed, and easy content management. Perfect for quick deployment and custom themes.', tags: ['WordPress', 'Responsive', 'CMS'], link: '/services/wordpress-website-design' },
      { icon: Code, title: 'Web Development', description: 'State-of-the-art custom-coded frontend and backend software development utilizing ultra-fast frameworks. We build lightweight React and Next.js applications integrated with secure, robust headless content management systems like Sanity and Strapi to guarantee maximum security, scalability, and PageSpeed compliance.', tags: ['React', 'Next.js', 'Headless CMS'], link: '/services/web-development' },
      { icon: ShoppingCart, title: 'E-commerce Solutions', description: 'High-performance headless and monolithic e-commerce stores designed to scale on Shopify and WooCommerce. We construct frictionless online shopping architectures, integrate custom checkout channels, deploy high-converting upsell pipelines, and optimize retention tracking to maximize customer lifetime value.', tags: ['Shopify', 'WooCommerce', 'Custom'], link: '/services/ecommerce' },
      { icon: FileText, title: 'Landing Pages', description: 'Single-offer marketing landing pages engineered for maximum direct-response campaign conversion. We implement rigorous behavioral A/B tested copy patterns, clean lead capture integrations, tracking pixels, and high-impact calls-to-action to convert paid Google and Meta campaign traffic.', tags: ['A/B Testing', 'CRO', 'Ads-Ready'], link: '/services/landing-pages' },
      { icon: Wrench, title: 'Website Maintenance', description: 'Keep your website secure, updated, fast, and fully working with professional ongoing maintenance and support services. Includes regular backups, software patches, and content updates.', tags: ['Support', 'Security', 'Updates'], link: '/services/website-maintenance' },
      { icon: Server, title: 'Hosting & Business Email', description: 'Reliable hosting, domain setup, SSL protection, and professional business email addresses for a professional online presence. Connect with Google Workspace or Microsoft 365.', tags: ['Hosting', 'Domains', 'Business Email'], link: '/services/hosting-email' },
      { icon: Boxes, title: 'SaaS Product Development', description: 'End-to-end proprietary SaaS architecture and product development from minimum viable product validation to enterprise platform scale. We build secure cloud database infrastructures, clean APIs, elegant administrative dashboard UX layouts, and scalable system capabilities.', tags: ['MVP', 'Full-Stack', 'Cloud'], link: '/services/saas-products' },
    ],
  },
  Grow: {
    icon: Target,
    desc: 'Data-driven marketing strategies that deliver measurable growth.',
    services: [
      { icon: Search, title: 'SEO Services UK', description: 'Advanced technical SEO audits, strategic keyword research, on-page optimization, and high-quality authority backlink building. We implement structured semantic data, build authoritative keyword clusters, and design content engines that drive consistent organic search placements and inbound leads.', tags: ['Technical SEO', 'Content Strategy', 'Link Building'], link: '/services/seo-content' },
      { icon: MapPin, title: 'Local SEO', description: 'Help local UK customers find your business on Google with optimised local search visibility, Google Business Profile management, and location-specific strategies.', tags: ['Google Maps', 'Local SEO', 'Citations'], link: '/services/local-seo' },
      { icon: Target, title: 'Google Ads Management', description: 'Google Ads campaigns built for real leads, enquiries, calls, bookings, and measurable results for UK businesses. Target high-intent queries and capture immediate sales.', tags: ['PPC', 'Google Ads', 'ROI'], link: '/services/google-ads' },
      { icon: Share2, title: 'Meta Ads Management', description: 'Facebook and Instagram ad campaigns designed to generate leads, WhatsApp messages, bookings, engagement, and brand awareness for UK businesses. Maximize advertising spend.', tags: ['Facebook Ads', 'Instagram', 'Leads'], link: '/services/meta-ads' },
      { icon: Target, title: 'Paid Advertising', description: 'High-ROAS Google Ads, Meta Ads, and LinkedIn campaign management. Our performance marketing division engineers highly targeted audience funnels, performs creative testing patterns, manages bidding optimization, and provides transparent dashboard analytics tracking.', tags: ['Google Ads', 'Meta', 'LinkedIn'], link: '/services/paid-advertising' },
      { icon: Share2, title: 'Social Media Management', description: 'Strategic brand content creation, community engagement management, and organic community growth programs. We establish a premium, cohesive voice for your business across Instagram, LinkedIn, and YouTube, elevating brand equity and building loyal organic followings.', tags: ['Content', 'Community', 'Paid Social'], link: '/services/social-media' },
      { icon: PenTool, title: 'Content Marketing', description: 'Search-optimized blog articles, technical whitepapers, detailed e-books, and engaging video collateral. We construct structured content assets built around real customer inquiries and search intent to establish market authority and nurture prospects through the marketing funnel.', tags: ['Blogs', 'Video', 'Whitepapers'], link: '/services/content-marketing' },
      { icon: BarChart3, title: 'CRO & Analytics', description: 'Actionable conversion rate optimization backed by empirical data. We audit drop-off funnels, review real-time session recording heatmaps, deploy multi-variant A/B test patterns, and configure advanced Google Analytics 4 tracking to extract maximum revenue from your existing traffic.', tags: ['Heatmaps', 'A/B Testing', 'Funnels'], link: '/services/cro-analytics' },
    ],
  },
  Brand: {
    icon: Palette,
    desc: 'Identity systems and design that make brands unforgettable.',
    services: [
      { icon: Fingerprint, title: 'Branding & Identity', description: 'Premium, cohesive brand identity systems including bespoke logo designs, curated color system theories, modern font pairing guides, and verbal messaging blueprints that distinguish your company, command pricing authority, and build immediate industry trust.', tags: ['Logo', 'Guidelines', 'Messaging'], link: '/services/branding-identity' },
      { icon: Palette, title: 'Creative Studio', description: 'High-end corporate graphic design for marketing collateral, digital and print brochures, high-performance social assets, and premium pitch deck visuals that maintain absolute visual consistency and look exceptionally polished at every touchpoint.', tags: ['Print', 'Digital', 'Social'], link: '/services/creative-studio' },
      { icon: Printer, title: 'Flyer Design & Printing', description: 'Stunning, high-impact flyer and layout designs with professional local printing and delivery systems. We establish clear visual hierarchies, strong campaign offer structures, and explicit conversion triggers to maximize offline local promotions.', tags: ['Design', 'Print', 'Delivery'], link: '/services/flyer-design-print' },
      { icon: Mail, title: 'Professional Email Setup', description: 'Official branded business email infrastructure configuration under your custom domain. We integrate professional Google Workspace or Microsoft 365 environments, configure secure SPF, DKIM, and DMARC authentications, and ensure maximum deliverability.', tags: ['Branded Email', 'Security', 'Setup'], link: '/services/business-emails' },
    ],
  },
};

const pricingTiers = [
  {
    name: 'Starter Package',
    price: '£995',
    note: 'One-time project fee',
    features: ['5-page website design', 'Mobile responsive layout', 'Contact form & maps integration', 'Basic SEO configuration', '1 month post-launch support'],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Business Package',
    price: '£2,495',
    note: 'One-time project fee',
    features: ['10-page website design', 'Advanced custom features', 'Full booking integration', 'Core speed optimizations', 'Google Analytics setup', '3 months priority support'],
    featured: true,
    cta: 'Most Popular',
  },
  {
    name: 'Premium Package',
    price: '£4,995',
    note: 'One-time project fee',
    features: ['Fully custom UI design system', 'Enterprise page counts', 'CRM / automation setup', 'Dedicated account strategist', '6 months post-launch support', 'SLA server uptime guarantee'],
    featured: false,
    cta: 'Get Premium Now',
  },
  {
    name: 'SaaS & Custom Apps',
    price: 'Contact Us',
    note: 'Custom project pricing',
    features: ['Bespoke React/Next.js software', 'Secure cloud database & APIs', 'Stripe payment integration', 'Admin dashboard UX layouts', 'DevOps & server scaling support', 'SLA server uptime guarantee'],
    featured: false,
    cta: 'Talk to Our Team',
  },
];

export default function ServicesPage() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    }
  }, [location]);

  return (
    <>
      <SEO
        title="Web Design & Digital Marketing Services UK | Digioverse"
        description="Digioverse offers professional website design, custom web development, local SEO, Google Ads, Meta Ads, branding, hosting, and business automation services in the UK."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Services" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Services</span>
          <CharacterScatter text="Digital Services Designed to Grow Your Business" className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h1" />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[800px] leading-relaxed">
              From engineering a robust, ultra-fast custom digital foundation to launching hyper-targeted customer acquisition campaigns, we provide specialized, end-to-end services. Our methodologies are carefully calibrated to deliver measurable commercial returns, elevate domain authority, and scale your brand predictably.
            </p>
            <div className="flex items-center gap-6 mt-8">
              <span className="text-[#53445f]">Not sure what you need?</span>
              <Button variant="tertiary" to="/contact">Get Free Advice</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Categories */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          {Object.entries(categories).map(([cat, data], ci) => (
            <div key={cat} className={ci > 0 ? 'mt-24' : ''}>
              <ScrollReveal className="flex items-center gap-4 mb-10">
                <div className="w-10 h-10 rounded-full bg-[rgba(106,0,255,0.1)] flex items-center justify-center">
                  <data.icon className="w-5 h-5 text-[#6a00ff]" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans']">{cat}</h2>
                  <p className="text-sm text-[#53445f]">{data.desc}</p>
                </div>
              </ScrollReveal>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.services.map((s, i) => (
                  <ScrollReveal key={s.title} delay={i * 0.05}>
                    <ServiceCard {...s} />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Web Development Deep Dive */}
      <section id="website-design" className="bg-[#0d0520] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Flagship Service</span>
              <CharacterScatter text="Web Development That Converts" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
              <ScrollReveal delay={0.4}>
                <p className="text-lg text-[#c7a7ff] mt-5 leading-relaxed">
                  Your corporate website functions as the digital focal point of your business brand and your single most important salesperson. We design and engineer premium, high-fidelity custom websites that do not rely on slow themes or generic builders. Every page layout is strategically mapped to command immediate visitor trust, build instant credibility, validate premium pricing models, and guide prospects seamlessly toward high-intent inquiries.
                </p>
                <p className="text-lg text-[#c7a7ff] mt-4 leading-relaxed">
                  By utilizing modern decoupled frontends (React, Next.js) and lightweight headless Content Management Systems, we deliver lightning-fast loading speeds that excel in Core Web Vitals and search crawler rankings.
                </p>
                <ul className="mt-8 space-y-3">
                  {['Mobile-first responsive design', 'Conversion-optimised layouts', 'SEO-friendly architecture', 'Fast loading (Core Web Vitals)', 'CMS integration (WordPress, Sanity, Strapi)', 'Accessibility compliant (WCAG 2.1)'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[#f7f7fa]">
                      <Check className="w-5 h-5 text-[#6a00ff] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button to="/contact" className="mt-8">Get a Free Website Quote</Button>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3}>
              <img src="/assets/heating-services.jpg" alt="Website design showcase" className="rounded-2xl w-full aspect-[4/3] object-cover" />
              <div className="flex gap-8 mt-6">
                <StatCounter value={995} prefix="£" label="Starting Price" dark />
                <div className="w-px bg-[rgba(255,255,255,0.15)]" />
                <StatCounter value={4} suffix=" Weeks" label="Typical Delivery" dark />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* SEO Deep Dive */}
      <section id="seo" className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ScrollReveal delay={0.3} className="order-2 md:order-1">
              <img src="/assets/featured-blog.jpg" alt="SEO services showcase" className="rounded-2xl w-full aspect-[4/3] object-cover" />
            </ScrollReveal>
            <div className="order-1 md:order-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Flagship Service</span>
              <CharacterScatter text="SEO That Dominates Search Rankings" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
              <ScrollReveal delay={0.4}>
                <p className="text-lg text-[#53445f] mt-5 leading-relaxed">
                  Over 93% of all modern online journeys begin with a query on a search engine. If your company website does not appear at the summit of organic search rankings for high-intent keywords, you are effectively yielding qualified customer leads directly to your competitors.
                </p>
                <p className="text-lg text-[#53445f] mt-4 leading-relaxed">
                  Our elite search optimization division combines rigorous technical code audits, deep keyword search volume analysis, authoritative semantic content clustering, and ethical, white-hat link acquisition campaigns to maximize your domain authority and establish permanent organic search prominence.
                </p>
                <ul className="mt-8 space-y-3">
                  {['Technical SEO audits & fixes', 'Keyword research & strategy', 'On-page optimisation', 'Content creation & optimisation', 'Link building & digital PR', 'Monthly reporting & analysis'].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[#0d0520]">
                      <Check className="w-5 h-5 text-[#6a00ff] shrink-0" /> {item}
                    </li>
                  ))}
                </ul>
                <Button to="/contact" className="mt-8">Get a Free SEO Audit</Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-[#f7f7fa] py-16 md:py-20">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Compare</span>
            <CharacterScatter text="Find the Right Service for Your Business" className="text-[36px] md:text-5xl font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-[#53445f] mt-4">Not sure where to start? Compare our core services side by side.</p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-xl">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#6a00ff] text-white">
                    <th className="text-left p-4 font-semibold">Feature</th>
                    <th className="p-4 font-semibold text-center">Web Development</th>
                    <th className="p-4 font-semibold text-center">SEO</th>
                    <th className="p-4 font-semibold text-center">Digital Marketing</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Best For', 'New businesses, redesigns', 'Established sites needing traffic', 'Businesses wanting leads fast'],
                    ['Timeline', '2–6 weeks', '3–6 months (ongoing)', 'Immediate (ongoing)'],
                    ['Investment', 'From £995', 'From £995/month', 'From £1,495/month'],
                    ['Key Deliverable', 'Live website', 'Rankings & traffic', 'Leads & sales'],
                    ['Our Approach', 'Strategy → Design → Build → Launch', 'Audit → Optimise → Content → Scale', 'Plan → Execute → Measure → Optimise'],
                  ].map((row, i) => (
                    <tr key={i} className="bg-white hover:bg-[#eee7ff] border-b border-[#ddd0f4] transition-colors">
                      <td className="p-4 font-semibold text-[#0d0520] sticky left-0 bg-white">{row[0]}</td>
                      <td className="p-4 text-center text-[#53445f]">{row[1]}</td>
                      <td className="p-4 text-center text-[#53445f]">{row[2]}</td>
                      <td className="p-4 text-center text-[#53445f]">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
          <div className="text-center mt-8">
            <Button variant="secondary" to="/contact">Still unsure? Talk to our team</Button>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Pricing</span>
            <CharacterScatter text="Transparent Pricing, No Surprises" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-[#53445f] mt-4 leading-relaxed">Every project is unique, but here are our typical starting points.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12 items-start">
            {pricingTiers.map((tier, i) => (
              <ScrollReveal key={tier.name} delay={i * 0.15}>
                <div className={`bg-white rounded-[20px] p-10 shadow-[0_4px_24px_rgba(13,5,32,0.06)] relative ${tier.featured ? 'border-2 border-[#6a00ff] shadow-[0_0_40px_rgba(106,0,255,0.2)] -translate-y-2' : ''}`}>
                  {tier.featured && (
                    <span className="absolute -top-3 right-6 bg-[#6a00ff] text-white text-[10px] font-semibold uppercase tracking-wider px-4 py-1.5 rounded-full">Most Popular</span>
                  )}
                  <h3 className="text-2xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans']">{tier.name}</h3>
                  <p className="text-4xl font-bold text-[#6a00ff] font-['Plus_Jakarta_Sans'] mt-4">{tier.price}</p>
                  <p className="text-xs text-[#7d718c] mt-1">{tier.note}</p>
                  <div className="w-full h-px bg-[#ddd0f4] my-6" />
                  <ul className="space-y-3">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-[#53445f]">
                        <Check className="w-4 h-4 text-[#6a00ff] shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant={tier.featured ? 'primary' : 'secondary'}
                    to="/pricing"
                    className="w-full mt-8"
                  >
                    {tier.cta}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-xs text-[#7d718c] text-center mt-6">All prices exclude VAT. Custom quotes available for complex projects.</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0520] py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <CharacterScatter text="Ready to Get Started?" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#c7a7ff] mt-5 leading-relaxed">Book a free consultation and we\'ll help you choose the right services for your business goals.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button to="/book-appointment">Book a Free Appointment</Button>
              <Button variant="ghost" to="/contact">Request a Website Quote</Button>
            </div>
            <p className="text-xs text-[#7d718c] mt-4">Or call us on +44 20 4615 5575</p>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
