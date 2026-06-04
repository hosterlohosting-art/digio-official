import {
  Users,
  Search,
  Zap,
  CreditCard,
  Headphones,
  MapPin,
  Monitor,
  Target,
  Share2,
  Fingerprint,
  Server
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import CharacterScatter from '../components/CharacterScatter';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';

const features = [
  {
    icon: Users,
    title: 'UK-Based Team',
    desc: 'Our team is headquartered in Woking, Surrey with deep understanding of the UK market, consumers, and standards.',
  },
  {
    icon: Headphones,
    title: 'Industry Experience',
    desc: 'We\'ve designed systems and sites for law firms, clinics, construction, retail, and professional services across the UK.',
  },
  {
    icon: Search,
    title: 'SEO for UK Search',
    desc: 'Our organic search campaigns are optimized specifically for UK spelling, local search patterns, and Google Business Profiles.',
  },
  {
    icon: Zap,
    title: 'Fast & Responsive',
    desc: 'Every website we deliver is built mobile-first, loading in under 1.5 seconds to match UK customers browsing patterns.',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    desc: 'Clear, fixed-price website packages and marketing campaigns. No hidden surprises, know exactly what you are paying for.',
  },
  {
    icon: Headphones,
    title: 'Ongoing Support',
    desc: 'We do not disappear after launching. Monthly support packages, hosting, speed audits, and organic advice included.',
  },
];

const cities = [
  'London', 'Birmingham', 'Manchester', 'Leeds', 'Glasgow', 'Liverpool', 
  'Bristol', 'Sheffield', 'Leicester', 'Edinburgh', 'Cardiff', 'Nottingham', 
  'Newcastle', 'Southampton', 'Brighton', 'Woking'
];

const servicesList = [
  {
    icon: Monitor,
    title: 'Website Design',
    description: 'Bespoke, premium website designs built for mobile browsing and extreme commercial conversions.',
    link: '/services/website-design',
  },
  {
    icon: Search,
    title: 'SEO Services',
    description: 'Rank on Google organically for high-intent search terms that bring valuable local and national customers.',
    link: '/services/seo-content',
  },
  {
    icon: Target,
    title: 'Google Ads',
    description: 'Pay-per-click lead campaigns designed to place your business at the very top of Google when searchers look.',
    link: '/services/google-ads',
  },
  {
    icon: Share2,
    title: 'Meta Ads',
    description: 'Highly engaging Facebook and Instagram lead capture ads and automated WhatsApp message funnels.',
    link: '/services/meta-ads',
  },
  {
    icon: Fingerprint,
    title: 'Branding & Design',
    description: 'Harmonious brand styling, logo design, print templates, social graphics, and comprehensive design packs.',
    link: '/services/branding-identity',
  },
  {
    icon: Server,
    title: 'Hosting & Email',
    description: 'Ultra-secure premium web hosting, SSL setup, and branded business email setup (Google Workspace).',
    link: '/services/hosting-email',
  },
];

export default function UKLandingPage() {
  return (
    <>
      <SEO
        title="Web Design Agency UK | Digioverse"
        description="Digioverse is a UK-focused web design and digital marketing agency helping businesses across the UK grow online with websites, SEO, ads, branding, and automation."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-[#f7f7fa] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,0,255,0.05),transparent_40%)]" />
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Breadcrumb current="UK Services" />

          <div className="max-w-[850px] mt-6">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider bg-[rgba(106,0,255,0.08)] px-4 py-1.5 rounded-full inline-block mb-4">
              UK Digital Agency
            </span>
            <CharacterScatter
              text="Web Design & Digital Marketing for UK Businesses"
              className="text-[40px] sm:text-[50px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.08] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
              as="h1"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#53445f] mt-6 leading-relaxed font-['Plus_Jakarta_Sans']">
                Digioverse helps businesses across the United Kingdom create powerful websites and digital marketing systems that attract customers, build high trust, and generate real enquiries.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button to="/book-appointment">Book a Free UK Consultation</Button>
                <Button variant="secondary" to="/services">View Our Services</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="bg-white py-12 border-y border-[#ddd0f4]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
            <ScrollReveal>
              <StatCounter value={500} suffix="+" label="Premium Projects" />
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <StatCounter value={150} suffix="+" label="SEO Campaigns" />
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="col-span-2 md:col-span-1">
              <StatCounter value={40} suffix="+" label="Industries Served" />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Why Choose Digioverse */}
      <section className="py-16 md:py-20 bg-[#f7f7fa]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[700px] mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-tight">
              Why UK Businesses Partner with Digioverse
            </h2>
            <p className="text-sm md:text-base text-[#53445f] mt-4">
              We focus entirely on the UK market, keeping our processes clean, local, and deeply grounded in what drives conversions here.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <ScrollReveal key={feat.title} delay={i * 0.08}>
                  <div className="bg-white border border-[#ddd0f4] rounded-[24px] p-8 shadow-[0_4px_24px_rgba(13,5,32,0.01)] hover:shadow-[0_8px_32px_rgba(13,5,32,0.04)] transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(106,0,255,0.08)] flex items-center justify-center text-[#6a00ff]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-5">{feat.title}</h3>
                    <p className="text-xs md:text-sm text-[#53445f] mt-3 leading-relaxed">{feat.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="bg-white py-16 border-y border-[#ddd0f4]">
        <div className="max-w-[1000px] mx-auto px-5 text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Serving Businesses Across the UK</h2>
            <p className="text-sm text-[#53445f] mt-3 max-w-[650px] mx-auto leading-relaxed">
              We work with growth-minded businesses, startups, and service providers in towns and cities throughout the United Kingdom.
            </p>
            <div className="flex flex-wrap justify-center gap-3 mt-10">
              {cities.map((city) => (
                <span 
                  key={city} 
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#53445f] bg-[#f7f7fa] border border-[#ddd0f4] px-4 py-2 rounded-full hover:border-[#6a00ff] hover:text-[#6a00ff] transition-all duration-300 cursor-default"
                >
                  <MapPin className="w-3 h-3" />
                  {city}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Overview Grid */}
      <section className="py-16 md:py-20 bg-[#f7f7fa]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[700px] mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-tight">
              Our Core UK Services
            </h2>
            <p className="text-sm md:text-base text-[#53445f] mt-4">
              From premium custom codebases to complete local SEO and targeted lead generation ads, we provide everything your brand needs under one roof.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, idx) => (
              <ScrollReveal key={service.title} delay={idx * 0.08}>
                <ServiceCard 
                  icon={service.icon} 
                  title={service.title} 
                  description={service.description} 
                  link={service.link}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#0d0520] py-16 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <CharacterScatter
            text="Ready to Grow Your UK Business?"
            className="text-[32px] md:text-[52px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-base text-[#c7a7ff] mt-5 leading-relaxed max-w-[650px] mx-auto">
              Schedule your free 30-minute consultation call with one of our UK digital growth strategists today. No pressure, just honest support.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/book-appointment">Book a Free UK Business Consultation</Button>
              <Button variant="ghost" to="/contact">Send Us a Direct Message</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
