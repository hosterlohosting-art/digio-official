import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Check, ArrowRight } from 'lucide-react';

const products = [
  {
    image: '/assets/attorney_core_mockup.jpg',
    name: 'Attorney Core',
    category: 'Legal SaaS',
    description: 'Practice management software for modern law firms with case workflows, client intake, billing, and document automation.',
    tags: ['Legal Tech', 'Client Portal', 'Billing', 'Automation'],
    features: [
      'Bespoke intake pipeline configurations',
      'Automated client case dashboard access',
      'Encrypted client files & document generation',
      'One-click Stripe invoice generation & billing',
    ],
    cta: 'Book Attorney Core Demo',
  },
  {
    image: '/assets/omnilo_mockup.png',
    name: 'Omnilo',
    category: 'CRM & Lead Management',
    description: 'A lead and outreach platform built to help service businesses capture, organise, and convert opportunities faster.',
    tags: ['Lead Capture', 'CRM', 'Marketing Automation'],
    features: [
      'Unified multi-channel inbox (Form, Email, Chat)',
      'Automated follow-up reminders & email grids',
      'Interactive pipeline boards for deal tracking',
      'Integrated web analytics & conversions tracker',
    ],
    cta: 'Explore Omnilo features',
  },
  {
    image: '/assets/hosterlo_mockup.jpg',
    name: 'Hosterlo',
    category: 'Cloud Infrastructure',
    description: 'Managed hosting and infrastructure for fast, secure websites with dependable support and modern deployment workflows.',
    tags: ['Managed Hosting', 'Cloud Security', 'Enterprise CDN'],
    features: [
      'Statically generated CDN edges (<0.8s load)',
      'Automated daily backups & recovery checkpoints',
      'Free SSL security certificates & firewalls',
      '24/7 technical developer support & monitoring',
    ],
    cta: 'Check Hosting Plans',
  },
  {
    image: '/assets/gowasender-dashboard-v2.png',
    name: 'goWASender',
    category: 'Messaging Platform',
    description: 'WhatsApp communication tooling for campaigns, reminders, and customer engagement at scale.',
    tags: ['WhatsApp APIs', 'Mass Messaging', 'CRM Integrations'],
    features: [
      'Bespoke automated campaign setups',
      'Client appointment & reminders automation',
      'Interactive chat-bot flows & integrations',
      'Full delivery analytics & logs reporting',
    ],
    cta: 'Explore goWASender APIs',
  },
];

export default function ProductsPage() {
  return (
    <>
      <SEO
        title="Our SaaS Products & Software Solutions | Digioverse"
        description="Explore Digioverse proprietary software platforms: Attorney Core (legal CRM), Omnilo (outreach CRM), Hosterlo (managed hosting), and goWASender (WhatsApp automation)."
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Our Products" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Software Ecosystem</span>
          <CharacterScatter
            text="Proprietary SaaS Products Built for Growth"
            className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']"
            as="h1"
          />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[600px] leading-relaxed">
              We construct custom web applications and develop operational tools that scale daily workflow, lead pipelines, and messaging outreach.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Products Grid */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12">
            {products.map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 0.1} y={60}>
                <div className="bg-white rounded-[24px] overflow-hidden border border-[#ddd0f4] shadow-[0_4px_24px_rgba(13,5,32,0.03)] hover:shadow-[0_16px_48px_rgba(13,5,32,0.08)] hover:-translate-y-1.5 transition-all duration-400 flex flex-col h-full group">
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-[#6a00ff]/5 to-[#3b0a75]/5 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover object-top transition-transform duration-750 group-hover:scale-103"
                      loading="lazy"
                    />
                    <span className="absolute top-4 left-4 bg-[#6a00ff] text-white text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                      {p.category}
                    </span>
                  </div>
                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {p.tags.map((tag) => (
                        <span key={tag} className="text-xs font-semibold text-[#6a00ff] bg-[#6a00ff]/10 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{p.name}</h3>
                    <p className="text-sm text-[#53445f] mt-3 leading-relaxed flex-grow">{p.description}</p>
                    
                    <hr className="border-[#ddd0f4] my-6" />

                    <h4 className="text-xs font-extrabold uppercase text-[#7d718c] tracking-wider mb-3">Core Features</h4>
                    <ul className="space-y-2.5 mb-8">
                      {p.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-[#53445f] leading-relaxed">
                          <Check className="w-4 h-4 text-[#6a00ff] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Button to="/book-appointment" className="w-full justify-center">
                      <span>{p.cta}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0d0520] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(106,0,255,0.15),transparent_40%)]" />
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <CharacterScatter
            text="Need a Fully Customized Platform?"
            className="text-[32px] md:text-[52px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-[#c7a7ff] mt-5 leading-relaxed">
              If your business requires a custom database workflow, customized SaaS panels, full API syncs, or custom web portals, our engineering team can design it from scratch.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Discuss Custom Projects</Button>
              <Button variant="ghost" href="tel:+442046155575">
                Call Our Office
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
