import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import CharacterScatter from '../components/CharacterScatter';
import Accordion from '../components/Accordion';
import { HelpCircle } from 'lucide-react';

const faqItems = [
  {
    question: 'How much does a website cost?',
    answer: 'Website pricing depends on the number of pages, design style, features, SEO requirements, and integrations. Digioverse offers flexible packages starting from £995 for startups and small businesses, with premium, ecommerce, and custom SaaS platforms built to fit your business.',
  },
  {
    question: 'Do you work with UK businesses only?',
    answer: 'Our main focus is the UK market, but we also work with selected businesses in the USA and internationally.',
  },
  {
    question: 'Can you redesign my existing website?',
    answer: 'Yes. We can redesign your current website to make it more modern, faster, mobile responsive, SEO-friendly, and conversion-focused.',
  },
  {
    question: 'Do you provide SEO with websites?',
    answer: 'Yes. Our websites include basic SEO structure, and we also offer advanced SEO services for businesses that want to grow organically on Google.',
  },
  {
    question: 'Can you manage my ads?',
    answer: 'Yes. We manage Google Ads, Facebook Ads, Instagram Ads, and WhatsApp-focused lead campaigns.',
  },
  {
    question: 'Do you provide hosting and business email?',
    answer: 'Yes. We can help with domain setup, hosting, SSL, and professional business email addresses.',
  },
  {
    question: 'Can I book a free consultation?',
    answer: 'Yes. You can book a free same-day appointment to discuss your website, marketing, branding, or business growth needs.',
  },
  {
    question: 'How long does it take to build a website?',
    answer: 'A typical business website takes 2-4 weeks from kickoff to launch. More complex projects with custom functionality or e-commerce can take 6-10 weeks.',
  },
  {
    question: 'What platforms do you build on?',
    answer: 'We build custom websites using React and Next.js for maximum performance. For content-managed sites, we work with WordPress, Sanity, and Strapi. For e-commerce, we specialise in Shopify and WooCommerce.',
  },
  {
    question: 'Do you offer ongoing support after launch?',
    answer: 'Yes. We offer monthly maintenance and support packages starting from £195/month including hosting, security updates, content changes, performance monitoring, and priority support.',
  },
  {
    question: 'What makes Digioverse different from other agencies?',
    answer: 'Three things: strategy-first approach, results-driven mindset, and true partnership. We measure success in leads and revenue, not just aesthetics.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply fill out our contact form, call us, or send us a WhatsApp message. We\'ll schedule a free 30-minute discovery call.',
  },
];

export default function FAQsPage() {
  return (
    <>
      <SEO
        title="FAQs | Digioverse Web Design & Digital Marketing UK"
        description="Find answers to common questions about Digioverse website design, SEO, digital marketing, pricing, hosting, business email, maintenance, and booking a free appointment."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 bg-[#f7f7fa] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Breadcrumb current="FAQs" />

          <div className="max-w-[800px] mt-6">
            <CharacterScatter
              text="Frequently Asked Questions"
              className="text-[40px] sm:text-[50px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.08] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
              as="h1"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#53445f] mt-6 leading-relaxed font-['Plus_Jakarta_Sans']">
                Everything you need to know about working with Digioverse. Can't find what you're looking for? Get in touch and we'll be happy to help.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Accordion List */}
      <section className="pb-16 bg-[#f7f7fa]">
        <div className="max-w-[850px] mx-auto px-5">
          <ScrollReveal>
            <div className="bg-white rounded-[24px] border border-[#ddd0f4] p-6 md:p-10 shadow-[0_4px_24px_rgba(13,5,32,0.02)]">
              <Accordion items={faqItems} />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="bg-[#0d0520] py-16 relative overflow-hidden">
        <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
          <ScrollReveal>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[rgba(106,0,255,0.15)] text-[#c7a7ff] mb-4">
              <HelpCircle className="w-6 h-6" />
            </div>
            <CharacterScatter
              text="Still Have Unanswered Questions?"
              className="text-[32px] md:text-[52px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']"
              as="h2"
            />
            <p className="text-base text-[#c7a7ff] mt-5 leading-relaxed max-w-[650px] mx-auto">
              If you have specific technical questions, custom requirements, or want to discuss pricing for a complex software application, get in touch today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button to="/contact">Contact Our Team</Button>
              <Button variant="ghost" to="/book-appointment">Book My Free Appointment</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
