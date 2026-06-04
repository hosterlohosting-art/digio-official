import { Check, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import CharacterScatter from '../components/CharacterScatter';

const packages = [
  {
    name: 'Starter Website',
    price: '£995',
    description: 'Best for new businesses and startups wanting a professional online presence.',
    features: [
      'Up to 5 custom-designed pages',
      'Fully mobile responsive design',
      'Contact form with email delivery',
      'Basic SEO and meta tag setup',
      'WhatsApp quick-chat integration',
      'Free 30-minute kickoff consultation',
      'SSL certificate & secure hosting setup',
    ],
    cta: 'Get Started with Starter',
    popular: false,
  },
  {
    name: 'Business Website',
    price: '£2,495',
    description: 'Best for growing companies needing advanced features and lead generation.',
    features: [
      'Up to 10 custom-designed pages',
      'Premium custom UI/UX design',
      'Full search engine optimization structure',
      'Online booking / appointment integration',
      'Blog / content management system setup',
      'Advanced page speed optimization',
      'Google Analytics & Search Console setup',
      'Standard CRM / email tool connection',
    ],
    cta: 'Grow My Business',
    popular: false,
  },
  {
    name: 'Premium Website',
    price: '£4,995',
    description: 'Best for established brands wanting an industry-leading high-end digital presence.',
    features: [
      'Bespoke, custom UI design system',
      'Advanced animations and interactions',
      'Conversion-focused layouts & copy structure',
      'SEO content writing / architecture guidance',
      'Multiple custom lead capture & landing pages',
      'Deep CRM, database & automation integration',
      '30 days of dedicated post-launch support',
      'Complete domain, DNS, and hosting transfer',
    ],
    cta: 'Go Premium Now',
    popular: true,
  },
  {
    name: 'Ecommerce Website',
    price: '£3,995',
    description: 'Best for online stores and product-focused brands ready to scale sales.',
    features: [
      'Complete Shopify or WooCommerce setup',
      'Unlimited product catalog layout integration',
      'Shopping cart & secure checkout system',
      'Stripe, PayPal & modern payment gateways',
      'Shipping, taxes & inventory management',
      'Full ecommerce SEO structure & products schema',
      'Comprehensive admin store training session',
      'Standard discount & voucher systems',
    ],
    cta: 'Launch My Store',
    popular: false,
  },
  {
    name: 'SaaS & Custom Apps',
    price: 'Contact Us',
    description: 'Best for custom SaaS platforms, complex dashboards, API integrations, and cloud software.',
    features: [
      'Custom React/Next.js dashboard UX',
      'Secure PostgreSQL / MongoDB databases',
      'Robust REST & Webhook API integrations',
      'Stripe subscriptions & invoicing setup',
      'Role-based access & admin permissions',
      'Full cloud deployment & DevOps scaling',
      'Dedicated support & server SLAs',
    ],
    cta: 'Get Custom Quote',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <>
      <SEO
        title="Website Design Packages UK | Affordable Web Design Pricing"
        description="Explore Digioverse website design packages for UK businesses, including starter websites, business websites, premium websites, ecommerce stores, SEO, hosting, and support."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-[#f7f7fa] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Breadcrumb current="Pricing" />
          
          <div className="max-w-[800px] mt-6">
            <CharacterScatter
              text="Website Packages Built for Every Stage of Business"
              className="text-[40px] sm:text-[50px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.08] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
              as="h1"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#53445f] mt-6 leading-relaxed font-['Plus_Jakarta_Sans']">
                Every business has different needs. Digioverse offers flexible website and marketing packages designed for startups, small businesses, growing companies, and ecommerce brands.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-16 bg-[#f7f7fa]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {packages.map((pkg, i) => (
              <ScrollReveal key={pkg.name} delay={i * 0.1}>
                <div
                  className={`h-full flex flex-col bg-white rounded-[24px] p-8 transition-all duration-300 relative border ${
                    pkg.popular
                      ? 'border-[#6a00ff] shadow-[0_20px_50px_rgba(106,0,255,0.12)] -translate-y-2'
                      : 'border-[#ddd0f4] shadow-[0_4px_24px_rgba(13,5,32,0.03)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(13,5,32,0.06)]'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#6a00ff] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-full">
                      Most Popular
                    </span>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{pkg.name}</h3>
                    <p className="text-xs text-[#7d718c] mt-2 h-12 leading-relaxed">{pkg.description}</p>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">{pkg.price}</span>
                      {pkg.price !== 'Contact Us' && (
                        <span className="text-xs text-[#7d718c] font-semibold">one-off</span>
                      )}
                    </div>
                  </div>

                  <hr className="border-[#ddd0f4] my-6" />

                  <ul className="space-y-3.5 flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] text-[#53445f] leading-relaxed">
                        <Check className="w-4 h-4 text-[#6a00ff] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    to="/book-appointment"
                    variant={pkg.popular ? 'primary' : 'secondary'}
                    className="w-full mt-8"
                  >
                    {pkg.cta}
                  </Button>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <p className="text-xs text-[#7d718c] text-center mt-8">All prices exclude VAT. Transparent, clear quotes are discussed and finalized during our discovery calls.</p>
        </div>
      </section>

      {/* Not sure which package */}
      <section className="bg-white py-12 border-t border-[#ddd0f4]">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(106,0,255,0.08)] text-[#6a00ff] mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Not sure which package fits your business?</h2>
            <p className="text-sm md:text-base text-[#53445f] mt-3 leading-relaxed max-w-[600px] mx-auto">
              We understand. Every business has unique goals and specifications. Let's have a friendly 30-minute discovery call where we can hear about your project and suggest the ideal path.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/book-appointment">Book a Free Appointment</Button>
              <Button variant="secondary" to="/contact">Ask a Custom Question</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Request custom quote */}
      <section className="bg-[#0d0520] py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(106,0,255,0.15),transparent_40%)]" />
        <div className="max-w-[900px] mx-auto px-5 text-center relative z-10">
          <CharacterScatter
            text="Need a Fully Custom Enterprise Solution?"
            className="text-[32px] md:text-[52px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']"
            as="h2"
          />
          <ScrollReveal delay={0.2}>
            <p className="text-base md:text-lg text-[#c7a7ff] mt-5 leading-relaxed max-w-[700px] mx-auto">
              Looking for custom SaaS platform design, web portals, bespoke API integrations, specialized web software, or a website with 20+ pages? Our design and engineering team has you covered.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Request a Custom Quote</Button>
              <Button variant="ghost" href="tel:+442046155575">Or Call +44 20 4615 5575</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
