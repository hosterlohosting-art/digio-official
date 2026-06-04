import {
  Scale,
  Calculator,
  Heart,
  Smile,
  Building2,
  HardHat,
  UtensilsCrossed,
  ShoppingBag,
  Sparkles,
  Car,
  Briefcase,
  Dumbbell,
  MapPin,
  Wrench,
  GraduationCap,
  HeartHandshake
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import CharacterScatter from '../components/CharacterScatter';

const industries = [
  {
    icon: Scale,
    name: 'Law Firms',
    desc: 'High-trust, professional website designs focused on conversion, authority, and secure consultation intake systems.',
  },
  {
    icon: Calculator,
    name: 'Accountants',
    desc: 'Sleek, modern web spaces with custom inquiry forms, booking tools, and trust signals for financial experts.',
  },
  {
    icon: Heart,
    name: 'Medical Clinics',
    desc: 'Patient-centric interfaces, private medical booking integrations, and compliance-driven technical frameworks.',
  },
  {
    icon: Smile,
    name: 'Dental Practices',
    desc: 'Visual-focused layouts detailing treatments, dentist profiles, patient reviews, and simple booking systems.',
  },
  {
    icon: Building2,
    name: 'Real Estate',
    desc: 'Bespoke agent sites, property listing cards, premium interactive filters, and rich photo/video showcases.',
  },
  {
    icon: HardHat,
    name: 'Construction',
    desc: 'Portfolio-focused layouts displaying big project showcases, commercial builder credentials, and estimate quote forms.',
  },
  {
    icon: UtensilsCrossed,
    name: 'Restaurants',
    desc: 'Mouth-watering visual layouts with responsive table reservations, online menus, and Google Map directions.',
  },
  {
    icon: ShoppingBag,
    name: 'Ecommerce Stores',
    desc: 'High-speed online shopping systems built to scale sales, product filters, cart checkouts, and seamless payments.',
  },
  {
    icon: Sparkles,
    name: 'Beauty Salons',
    desc: 'Stunning visual styling highlighting treatment books, portfolio grids, treatment pricing, and automated booking.',
  },
  {
    icon: Car,
    name: 'Car Dealerships',
    desc: 'Conversion-ready search tools, vehicle inventory cards, financing forms, and physical site visit bookings.',
  },
  {
    icon: Briefcase,
    name: 'Consultants',
    desc: 'Brand-focused portfolio pages, lead magnets, case studies, publication lists, and scheduled discovery call forms.',
  },
  {
    icon: Dumbbell,
    name: 'Coaches & Gyms',
    desc: 'Class schedules, gym membership package grids, virtual trainers showcase, and lead generation workflows.',
  },
  {
    icon: MapPin,
    name: 'Local Providers',
    desc: 'Highly optimized local SEO pages targeting specific UK cities and counties to attract nearby walk-ins or calls.',
  },
  {
    icon: Wrench,
    name: 'Trades Businesses',
    desc: 'Plumbers, electricians, and roofers. Quick-call layout, local trust badges, reviews, and rapid emergency quote forms.',
  },
  {
    icon: GraduationCap,
    name: 'Education Providers',
    desc: 'Clear navigation pathways, course lists, application portals, download packages, and prospectus request lists.',
  },
  {
    icon: HeartHandshake,
    name: 'Nonprofits',
    desc: 'Storytelling-centric UI, direct donation gateways integration, volunteer sign-up cards, and campaign milestones.',
  },
];

export default function IndustriesPage() {
  return (
    <>
      <SEO
        title="Web Design for UK Businesses | Industries Digioverse Serves"
        description="Digioverse provides website design and digital marketing services for UK businesses across legal, healthcare, real estate, construction, ecommerce, restaurants, trades, and professional services."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-[#f7f7fa] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Breadcrumb current="Industries" />

          <div className="max-w-[800px] mt-6">
            <CharacterScatter
              text="Digital Solutions for Different Industries"
              className="text-[40px] sm:text-[50px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.08] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
              as="h1"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#53445f] mt-6 leading-relaxed font-['Plus_Jakarta_Sans']">
                Digioverse works with businesses across multiple industries, creating websites and marketing strategies that match each brand's audience, goals, and market dynamics.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Grid of Industries */}
      <section className="pb-16 bg-[#f7f7fa]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              return (
                <ScrollReveal key={ind.name} delay={i * 0.05}>
                  <div className="h-full bg-white border border-[#ddd0f4] hover:border-[#6a00ff] rounded-[24px] p-6 transition-all duration-300 hover:shadow-[0_12px_32px_rgba(13,5,32,0.05)] hover:-translate-y-1 group">
                    <div className="w-12 h-12 rounded-2xl bg-[rgba(106,0,255,0.08)] flex items-center justify-center text-[#6a00ff] group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-5">{ind.name}</h3>
                    <p className="text-xs text-[#53445f] mt-2.5 leading-relaxed">{ind.desc}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Industry Specific Design Matters */}
      <section className="bg-white py-16 border-t border-[#ddd0f4]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] leading-tight">
                Why Industry-Specific Website Design & Strategy Matters
              </h2>
              <p className="text-sm md:text-base text-[#53445f] mt-6 leading-relaxed">
                A generic website page template won't work. The way a prospect evaluates a criminal defense lawyer is fundamentally different from how they select a dental clinic or purchase a luxury timepiece online.
              </p>
              <p className="text-sm md:text-base text-[#53445f] mt-4 leading-relaxed">
                At Digioverse, we study user behaviors, commercial intent, and competitor landscapes inside your specific niche. We implement the exact triggers, copywriting styles, calls to action, and app integrations required to build fast trust and drive commercial actions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {[
                  {
                    title: 'Tailored Conversion Funnels',
                    desc: 'We construct direct routes to convert users based on how they actually buy in your specific field.',
                  },
                  {
                    title: 'Strategic Niche Integrations',
                    desc: 'From booking platforms (Cliniko, Calendly) to MLS databases, we build seamless third-party app connections.',
                  },
                  {
                    title: 'SEO Content Foundations',
                    desc: 'We target specific, high-intent local and national keywords that rank you above local competitors in search.',
                  },
                ].map((item, idx) => (
                  <div key={item.title} className="flex gap-4 p-5 rounded-[20px] bg-[#f7f7fa] border border-[#ddd0f4]">
                    <span className="text-[#6a00ff] font-bold font-['Plus_Jakarta_Sans'] text-lg">0{idx + 1}</span>
                    <div>
                      <h4 className="font-bold text-[#0d0520] text-sm md:text-base font-['Plus_Jakarta_Sans']">{item.title}</h4>
                      <p className="text-xs text-[#7d718c] mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#0d0520] py-16 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <CharacterScatter
            text="Ready to Built the Perfect Website for Your Business?"
            className="text-[32px] md:text-[52px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-base text-[#c7a7ff] mt-5 leading-relaxed max-w-[650px] mx-auto">
              Tell us about your industry and business goals, and let's craft a custom digital strategy that generates more customers, phone calls, and revenue.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Build a Website for My Industry</Button>
              <Button variant="ghost" to="/book-appointment">Book a Consultation</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
