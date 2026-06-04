import { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import PortfolioCard from '../components/PortfolioCard';
import StatCounter from '../components/StatCounter';
import Button from '../components/Button';
import SEO from '../components/SEO';

const filters = ['All', 'Paid Advertising', 'Web Development', 'Creative Studio', 'SEO', 'SaaS', 'Branding', 'Landing Pages'];

const projects = [
  { image: '/assets/ppc-lead-acquisition-funnel.png', category: 'Paid Advertising', title: 'Google Ads Acquisition System' },
  { image: '/assets/meta-ads-creative.jpg', category: 'Creative Studio', title: 'Meta Ads Creative Direction' },
  { image: '/assets/premium-tech-hero-bg.png', category: 'Web Development', title: 'Premium Tech Website System' },
  { image: '/assets/premium-saas-hero.png', category: 'SaaS', title: 'SaaS Launch Experience' },
  { image: '/assets/attorney-core-practice-platform.png', category: 'SaaS', title: 'Attorney Core Platform' },
  { image: '/assets/omnilo-logo.png', category: 'SaaS', title: 'Omnilo Lead Platform' },
  { image: '/assets/hosterlo-logo.png', category: 'Web Development', title: 'Hosterlo Infrastructure Brand' },
  { image: '/assets/gowasender-logo.png', category: 'SaaS', title: 'GoWaSender Messaging Product' },
  { image: '/assets/uh-properties-real-estate.png', category: 'SEO', title: 'UH Properties Digital Growth' },
  { image: '/assets/featured-blog.jpg', category: 'SEO', title: 'Search Content Engine' },
  { image: '/assets/omnilo-logo.png', category: 'Branding', title: 'Omnilo Corporate Rebrand & Design System' },
  { image: '/assets/hosterlo-logo.png', category: 'Branding', title: 'Hosterlo Infrastructure Identity Suite' },
  { image: '/assets/premium-tech-hero-bg.png', category: 'Landing Pages', title: 'UK Energy Direct Response Landing Page' },
  { image: '/assets/premium-saas-hero.png', category: 'Landing Pages', title: 'SaaS Beta Sign-up Landing Page' },
];

export default function WorkPage() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All' ? projects : projects.filter((p) => {
    if (activeFilter === 'SEO') return p.category === 'SEO';
    return p.category === activeFilter;
  });

  return (
    <>
      <SEO 
        title="Our Work | Premium Digital Agency & SEO Case Studies UK"
        description="Explore the Digioverse portfolio. Read real-world case studies in website design, search engine optimization (SEO), custom SaaS development, and high-ROI Google/Meta Ads campaigns."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Our Work" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Portfolio</span>
          <CharacterScatter text="Growth Systems, Products, and Premium Digital Work" className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h1" />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[560px] leading-relaxed">A selection of Digioverse platforms, campaign systems, creative assets, and growth-focused web experiences.</p>
          </ScrollReveal>
          <div className="flex flex-wrap gap-6 md:gap-12 mt-10">
            <StatCounter value={500} suffix="+" label="Projects Delivered" />
            <div className="hidden md:block w-px bg-[#ddd0f4]" />
            <StatCounter value={150} suffix="+" label="SEO Campaigns" />
            <div className="hidden md:block w-px bg-[#ddd0f4]" />
            <StatCounter value={50} suffix="+" label="SaaS Products" />
            <div className="hidden md:block w-px bg-[#ddd0f4]" />
            <StatCounter value={40} suffix="+" label="Industries Served" />
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#f7f7fa] py-6 sticky top-[72px] z-[100] border-b border-transparent backdrop-blur-[12px]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="flex flex-wrap gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 ${
                  activeFilter === f
                    ? 'bg-[#6a00ff] text-white border border-[#6a00ff]'
                    : 'text-[#53445f] border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="bg-[#f7f7fa] pt-12 pb-16 md:pb-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((p, i) => (
              <ScrollReveal key={`${activeFilter}-${p.title}`} delay={i * 0.08}>
                <PortfolioCard {...p} />
              </ScrollReveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#7d718c] py-20">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="bg-[#0d0520] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Featured Case Study</span>
          <CharacterScatter text="Google Ads Growth Engine: From Traffic to Qualified Pipeline" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] mt-4 max-w-[900px] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#c7a7ff] mt-4 max-w-[640px] leading-relaxed">How Digioverse turns creative, tracking, landing pages, and paid media into a measurable acquisition system.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-[55%_45%] gap-12 mt-16">
            <div>
              <ScrollReveal>
                <img src="/assets/ppc-lead-acquisition-funnel.png" alt="Google Ads growth dashboard" className="rounded-2xl w-full aspect-video object-cover" />
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <h4 className="text-xl font-semibold text-[#f7f7fa] font-['Plus_Jakarta_Sans'] mt-8">Challenge</h4>
                <p className="text-[#c7a7ff] mt-3 leading-relaxed">The client needed more than traffic. They needed a clean funnel, trusted brand signals, conversion tracking, and campaigns that could scale without wasting budget.</p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <h4 className="text-xl font-semibold text-[#f7f7fa] font-['Plus_Jakarta_Sans'] mt-6">Solution</h4>
                <p className="text-[#c7a7ff] mt-3 leading-relaxed">We rebuilt the offer, landing page structure, creative hooks, and analytics workflow so every campaign decision was tied to revenue-quality leads.</p>
              </ScrollReveal>
            </div>
            <div>
              <ScrollReveal delay={0.2}>
                <div className="bg-[rgba(247,247,250,0.7)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.15)] rounded-[24px] p-8">
                  <div className="space-y-6">
                    <StatCounter value={150} suffix="+" label="Monthly Leads" dark />
                    <div className="w-full h-px bg-[rgba(255,255,255,0.08)]" />
                    <StatCounter value={340} suffix="%" label="Increase in Organic Traffic" dark />
                    <div className="w-full h-px bg-[rgba(255,255,255,0.08)]" />
                    <div className="text-center">
                      <span className="text-5xl font-bold text-[#f7f7fa] font-['Plus_Jakarta_Sans']">#1</span>
                      <p className="text-xs text-[#7d718c] mt-2 uppercase tracking-wider">Google Ranking for Key Terms</p>
                    </div>
                    <div className="w-full h-px bg-[rgba(255,255,255,0.08)]" />
                    <div className="text-center">
                      <span className="text-5xl font-bold text-[#6a00ff] font-['Plus_Jakarta_Sans']">3x</span>
                      <p className="text-xs text-[#7d718c] mt-2 uppercase tracking-wider">Return on Investment</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.4}>
                <blockquote className="mt-8">
                  <p className="text-lg text-[#f7f7fa] italic leading-relaxed">"Digioverse completely transformed our business. The new website pays for itself every single week."</p>
                  <cite className="text-xs text-[#7d718c] not-italic mt-3 block">\u2014 James Mitchell, Director, Precision Heating Solutions</cite>
                </blockquote>
                <div className="flex gap-2 mt-4">
                  {['Web Design', 'SEO', 'Content Strategy'].map((t) => (
                    <span key={t} className="text-xs text-[#f7f7fa] border border-[rgba(255,255,255,0.2)] px-3 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0520] py-16 md:py-20 border-t border-[rgba(255,255,255,0.08)]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <CharacterScatter text="Have a Project in Mind?" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#c7a7ff] mt-5 leading-relaxed">Let's discuss how we can help you achieve your goals. Every great project starts with a conversation.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button to="/contact">Start Your Project</Button>
              <Button variant="ghost" to="/contact">Request Our Brochure</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
