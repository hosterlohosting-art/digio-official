import {
  Monitor,
  Search,
  Fingerprint,
  Target
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import CharacterScatter from '../components/CharacterScatter';

const timeZoneSteps = [
  {
    step: '01',
    title: 'Flexible Discovery Call',
    desc: 'We schedule our initial strategy session around your local business hours (EST, CST, MST, PST).',
  },
  {
    step: '02',
    title: 'Active Design & Build',
    desc: 'Our UK team builds and refines your assets while you sleep, delivering daily progress reports.',
  },
  {
    step: '03',
    title: 'Launch & Direct Support',
    desc: 'Complete deployment on US server networks (AWS/Vercel CDN) and ongoing email/Slack support.',
  },
];

const usaServices = [
  {
    icon: Monitor,
    title: 'Website Design',
    desc: 'Premium, fast-loading, responsive site architectures designed to establish local trust and capture leads.',
  },
  {
    icon: Search,
    title: 'SEO & Content',
    desc: 'Organic rank strategies targeting US local and national keywords to outrank local search competitors.',
  },
  {
    icon: Fingerprint,
    title: 'Branding & Identity',
    desc: 'Stunning logo development, modern style guides, brand guidelines, and print collateral layout support.',
  },
  {
    icon: Target,
    desc: 'Focused conversion funnels, landing pages, and lead capture workflows that convert organic and paid visits.',
    title: 'Digital Marketing',
  },
];

export default function USALandingPage() {
  return (
    <>
      <SEO
        title="Web Design & Digital Marketing for USA Businesses | Digioverse"
        description="Digioverse also supports USA-based businesses with website design, SEO, branding, digital marketing, and online growth solutions."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-[#f7f7fa] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,0,255,0.05),transparent_40%)]" />
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Breadcrumb current="USA Services" />

          <div className="max-w-[850px] mt-6">
            <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider bg-[rgba(106,0,255,0.08)] px-4 py-1.5 rounded-full inline-block mb-4">
              USA Client Support
            </span>
            <CharacterScatter
              text="Helping USA Businesses Build Stronger Digital Brands"
              className="text-[40px] sm:text-[50px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.08] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
              as="h1"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#53445f] mt-6 leading-relaxed font-['Plus_Jakarta_Sans']">
                While Digioverse is focused mainly on the UK market, we support selected growth-minded businesses in the USA with premium website design, branding, organic SEO, and digital growth services.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Button to="/contact">Start Your USA Website Project</Button>
                <Button variant="secondary" to="/services">View Our Services</Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What We Offer USA Businesses */}
      <section className="py-16 bg-white border-y border-[#ddd0f4]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5">
              <ScrollReveal>
                <span className="text-xs font-bold text-[#6a00ff] uppercase tracking-wider block mb-2">Cross-Border Delivery</span>
                <h2 className="text-3xl md:text-4xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-tight">
                  High-Performance Web Design Without Borders
                </h2>
                <p className="text-sm md:text-base text-[#53445f] mt-6 leading-relaxed">
                  We understand that USA businesses need websites that look highly professional, load ultra-fast, rank well on search networks, and turn cold traffic into active customers.
                </p>
                <p className="text-sm md:text-base text-[#53445f] mt-4 leading-relaxed">
                  Our Surry-based agency specializes in providing custom-tailored frontend design and smart business growth systems for American service businesses, ecommerce stores, consultants, startups, and clinics.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
              {usaServices.map((service, i) => {
                const Icon = service.icon;
                return (
                  <ScrollReveal key={service.title} delay={i * 0.08}>
                    <div className="bg-[#f7f7fa] border border-[#ddd0f4] rounded-[20px] p-6 hover:shadow-[0_8px_24px_rgba(13,5,32,0.03)] hover:border-[#6a00ff] transition-all duration-300">
                      <div className="w-10 h-10 rounded-xl bg-[rgba(106,0,255,0.08)] flex items-center justify-center text-[#6a00ff]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4">{service.title}</h3>
                      <p className="text-xs text-[#53445f] mt-2 leading-relaxed">{service.desc}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* How We Work Across Time Zones */}
      <section className="py-16 md:py-20 bg-[#f7f7fa]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="max-w-[700px] mb-16 mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-tight">
              How We Work Across Time Zones
            </h2>
            <p className="text-sm md:text-base text-[#53445f] mt-4">
              Collaborating remotely with our UK agency is smooth, structured, and fast.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {timeZoneSteps.map((step, idx) => (
              <ScrollReveal key={step.title} delay={idx * 0.1}>
                <div className="bg-white border border-[#ddd0f4] rounded-[24px] p-8 relative h-full">
                  <span className="text-[44px] font-extrabold text-[rgba(106,0,255,0.1)] absolute top-4 right-6 font-['Plus_Jakarta_Sans'] leading-none">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] pr-12">{step.title}</h3>
                  <p className="text-xs md:text-sm text-[#53445f] mt-4 leading-relaxed">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#0d0520] py-16 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <CharacterScatter
            text="Let's Launch Your USA Website Project"
            className="text-[32px] md:text-[52px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-base text-[#c7a7ff] mt-5 leading-relaxed max-w-[650px] mx-auto">
              Ready to take your digital presence to a premium standard? Fill out our contact form and let us know your requirements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Start Your USA Website Project</Button>
              <Button variant="ghost" href="mailto:support@digioverse.com">Or Email Our Support Team</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
