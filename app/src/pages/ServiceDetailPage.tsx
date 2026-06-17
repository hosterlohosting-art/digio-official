import { Navigate, useParams } from 'react-router-dom';
import {
  BarChart3,
  Boxes,
  Code,
  FileText,
  Fingerprint,
  Mail,
  Monitor,
  Palette,
  PenTool,
  Printer,
  Search,
  Share2,
  ShoppingCart,
  Target,
  CheckCircle2,
  MapPin,
  Wrench,
  Server
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import SEO from '../components/SEO';

interface ServiceInfo {
  icon: React.ComponentType<any>;
  title: string;
  eyebrow: string;
  intro: string;
  image: string;
  outcomes: string[];
  copy: string;
  seoTitle?: string;
  seoDescription?: string;
}

const serviceData: Record<string, ServiceInfo> = {
  'website-design': {
    icon: Monitor,
    title: 'Website Design',
    eyebrow: 'Build',
    intro: 'Premium bespoke website design that establishes instant brand trust, commands high-value pricing, and guides prospects seamlessly toward commercial enquiries.',
    image: '/assets/premium-tech-hero-bg.png',
    outcomes: ['Conversion-focused structure', 'Mobile responsive design', 'Corporate luxury aesthetics', 'Ultra-fast interface UX'],
    copy: 'We design premium, high-fidelity corporate websites that reflect the exceptional standard of your business. We avoid standard pre-made templates and slow builder frameworks. Our UI/UX design process maps out strategic, high-intent client conversion pathways. By balancing precise typography pairing, robust dark-mode options, smooth transitions, and high-end imagery, we make sure that your target audience immediately recognizes your company as a reliable market authority.',
    seoTitle: 'Website Design UK | Professional Web Design Agency',
    seoDescription: 'Digioverse offers professional website design in the UK for small businesses, startups, service providers, ecommerce brands, and growing companies.',
  },
  'website-design-uk': {
    icon: Monitor,
    title: 'Website Design UK',
    eyebrow: 'Build',
    intro: 'Premium bespoke website design that establishes instant brand trust, commands high-value pricing, and guides UK prospects seamlessly toward commercial enquiries.',
    image: '/assets/premium-tech-hero-bg.png',
    outcomes: ['UK-focused UI/UX design', 'Mobile responsive layouts', 'Clear booking/WhatsApp integration', 'Strong conversion pathways'],
    copy: 'We design premium, high-converting websites for businesses across the UK. By avoiding generic layouts and slow page builder setups, we deliver clean, fast, and modern React and Next.js platforms. Our designs are strategically optimized for the UK market, making sure your brand looks established, reliable, and perfectly aligned with search patterns.',
    seoTitle: 'Website Design UK | Premium Web Design Agency Surrey',
    seoDescription: 'Digioverse offers bespoke, high-converting website designs for businesses in Surrey and across the UK. Fast-loading, responsive, and SEO-friendly.',
  },
  'wordpress-website-design': {
    icon: Monitor,
    title: 'WordPress Website Design',
    eyebrow: 'Build',
    intro: 'Professional WordPress websites designed for UK businesses with responsive layouts, SEO setup, fast loading speed, and easy content management.',
    image: '/assets/premium-tech-hero-bg.png',
    outcomes: ['Easy content management', 'SEO-friendly structure', 'Mobile responsive design', 'Plugin ecosystem access'],
    copy: 'WordPress is one of the most flexible platforms for business websites. Digioverse builds professional WordPress websites that are easy to update, SEO-friendly, mobile responsive, and designed to convert visitors into leads. Whether you are a small business, service provider, consultant, law firm, clinic, real estate business, local company, agency, coach, or startup, WordPress gives you the power to manage your content independently while maintaining a premium, professional appearance.',
    seoTitle: 'WordPress Website Design UK | Digioverse',
    seoDescription: 'Get a professional WordPress website designed for your UK business with responsive layouts, SEO setup, fast loading speed, and easy content management.',
  },
  'web-development': {
    icon: Code,
    title: 'Web Development',
    eyebrow: 'Build',
    intro: 'Cutting-edge frontend and full-stack software development delivering lightning-fast, high-security React and Next.js digital platforms.',
    image: '/assets/premium-saas-hero.png',
    outcomes: ['Next.js & React frameworks', 'Headless CMS integrations', 'PageSpeed & Core Web Vitals', 'Robust cloud architecture'],
    copy: 'We specialize in custom web development that prioritizes performance, search crawlers, and absolute data security. By employing modern decoupled architectures, single-page application systems, and modern cloud deployment pipelines, we construct web assets that load in milliseconds. We seamlessly integrate with headless Content Management Systems such as Sanity, Strapi, and WordPress, allowing your brand to publish authority assets while maintaining zero-vulnerability codebases.',
    seoTitle: 'Website Development UK | Custom Web Development Services',
    seoDescription: 'Digioverse provides custom website development services in the UK, including WordPress, ecommerce, landing pages, business websites, integrations, and automation.',
  },
  ecommerce: {
    icon: ShoppingCart,
    title: 'E-commerce',
    eyebrow: 'Build',
    intro: 'High-performance online shopping channels designed to convert visitors, maximize checkout throughput, and accelerate retention growth.',
    image: '/assets/shopify-fashion-store.png',
    outcomes: ['Shopify & WooCommerce scale', 'Frictionless checkout paths', 'Upsell & retention engines', 'GA4 conversion tracking'],
    copy: 'We construct premium, high-volume e-commerce stores designed to scale. Whether configuring highly customizable headless Shopify architectures or building secure WooCommerce setups, we focus on maximizing your average order value and lifetime customer retention. We optimize product listing pages, deploy robust search engines, implement swift merchant integrations, and install granular tracking metrics to make sure every paid campaign is fully leveraged.',
    seoTitle: 'Ecommerce Website Design UK | Shopify & Online Store Design',
    seoDescription: 'Digioverse designs ecommerce websites and Shopify stores for UK businesses, helping brands sell products online with secure payments and smooth shopping experiences.',
  },
  'landing-pages': {
    icon: FileText,
    title: 'Landing Pages',
    eyebrow: 'Build',
    intro: 'Bespoke, direct-response landing pages meticulously styled to maximize conversion rates for paid Meta, Google, and LinkedIn campaigns.',
    image: '/assets/ppc-lead-acquisition-funnel.png',
    outcomes: ['Persuasive copy hierarchy', 'Optimized form captures', 'Rigorous A/B test setups', 'Flawless campaign tracking'],
    copy: 'A high-converting landing page must do one job with absolute perfection: convert visitors into qualified leads. We architect single-offer landing pages engineered to captivate paid traffic. By employing proven copy frameworks, psychological formatting patterns, rapid loading times, and friction-free lead capture forms, we ensure that your digital advertising spend results in the highest possible conversion rate and lowest cost per acquisition.',
    seoTitle: 'Landing Page Design UK | Digioverse',
    seoDescription: 'Conversion-focused landing pages for paid advertising campaigns.',
  },
  'saas-products': {
    icon: Boxes,
    title: 'SaaS Products',
    eyebrow: 'Build',
    intro: 'End-to-end proprietary software product development, backend architecture engineering, and high-fidelity dashboard design.',
    image: '/assets/attorney-core-practice-platform.png',
    outcomes: ['MVP strategy & planning', 'Complex dashboard UX', 'Secure API integrations', 'Scalable server databases'],
    copy: 'We transform complex software concepts into elegant, highly intuitive SaaS platforms and internal business tools. Our full-stack engineering team builds robust data pipelines, integrates secure payment gateways (Stripe), constructs reusable React components, and deploys high-availability servers. We pay meticulous attention to dashboard UX layouts and onboarding flows to maximize user retention and simplify daily complex operational workflows.',
    seoTitle: 'Business Automation & SaaS Products | Digioverse',
    seoDescription: 'Digioverse provides business automation and SaaS solutions to help companies manage bookings, leads, customers, appointments, websites, and digital operations.',
  },
  'website-maintenance': {
    icon: Wrench,
    title: 'Website Maintenance',
    eyebrow: 'Build',
    intro: 'Keep your website secure, updated, fast, and fully working with professional ongoing maintenance and support services.',
    image: '/assets/premium-saas-hero.png',
    outcomes: ['Security monitoring & backups', 'Plugin & software updates', 'Speed & performance checks', 'Monthly support & bug fixes'],
    copy: 'A website needs regular care after launch. Digioverse provides ongoing maintenance to keep your site secure, updated, backed up, and performing properly. Our maintenance services include website updates, plugin updates, bug fixes, security monitoring, backups, speed checks, content updates, form testing, broken link checks, and monthly support.',
    seoTitle: 'Website Maintenance UK | Updates, Security & Support',
    seoDescription: 'Keep your website secure, updated, fast, and fully working with Digioverse website maintenance services for UK businesses.',
  },
  'hosting-email': {
    icon: Server,
    title: 'Hosting & Business Email',
    eyebrow: 'Build',
    intro: 'Reliable hosting, domain setup, SSL protection, and professional business email addresses for a professional online presence.',
    image: '/assets/hosterlo-logo.png',
    outcomes: ['Domain & hosting setup', 'SSL certificate installation', 'Business email configuration', 'Technical support & migration'],
    copy: 'Your website needs strong hosting, a secure domain setup, SSL protection, and professional business email addresses. Digioverse helps you set everything up properly so your business looks professional from day one. Our services include domain setup, hosting setup, SSL certificate, business email setup, website migration, DNS setup, email configuration, and technical support.',
    seoTitle: 'Web Hosting & Business Email UK | Digioverse',
    seoDescription: 'Digioverse provides hosting, domain, SSL, and business email setup for UK businesses that need a professional online presence.',
  },
  'seo-content': {
    icon: Search,
    title: 'SEO & Content',
    eyebrow: 'Grow',
    intro: 'Technical search engine optimization, semantic authority content engines, and high-value keyword indexing growth campaigns.',
    image: '/assets/featured-blog.jpg',
    outcomes: ['Comprehensive site audits', 'Strategic keyword clustering', 'Semantic content planning', 'White-hat backlink building'],
    copy: 'Our search optimization division is built around practical domain authority growth and bottom-line revenue. We analyze site speed bottlenecks, eliminate crawling issues, structure modern schema markup, and design extensive keyword content pipelines. By publishing highly authoritative, search-intent-driven articles and generating quality backlinks, we place your brand at the summit of search engines to secure a steady stream of passive organic leads.',
    seoTitle: 'SEO Services UK | Search Engine Optimisation Agency',
    seoDescription: 'Improve your Google rankings with Digioverse SEO services for UK businesses, including technical SEO, local SEO, keyword optimisation, content strategy, and website audits.',
  },
  'local-seo': {
    icon: MapPin,
    title: 'Local SEO',
    eyebrow: 'Grow',
    intro: 'Help local UK customers find your business on Google with optimised local search visibility, Google Business Profile management, and location-specific strategies.',
    image: '/assets/featured-blog.jpg',
    outcomes: ['Google Business Profile optimisation', 'Local keyword targeting', 'Location landing pages', 'Map visibility improvement'],
    copy: 'If your business serves a specific city, town, or region, local SEO helps you appear when nearby customers search for your services. Digioverse helps UK businesses improve their local visibility and attract more local enquiries through Google Business Profile optimisation, local keyword targeting, location landing pages, review strategy, map visibility, local citations, service area optimisation, and local content structure.',
    seoTitle: 'Local SEO Services UK | Get Found Locally on Google',
    seoDescription: 'Digioverse helps UK local businesses improve local search visibility with Google Business Profile optimisation, local keywords, location pages, and local SEO strategy.',
  },
  'google-ads': {
    icon: Target,
    title: 'Google Ads Management',
    eyebrow: 'Grow',
    intro: 'Google Ads campaigns built for real leads, enquiries, calls, bookings, and measurable results for UK businesses.',
    image: '/assets/ppc-lead-acquisition-funnel.png',
    outcomes: ['Campaign setup & management', 'Keyword research & targeting', 'Conversion & call tracking', 'Monthly performance reports'],
    copy: 'Google Ads helps your business appear in front of people who are already searching for your service. Digioverse creates and manages campaigns focused on enquiries, calls, bookings, and measurable results. Our services include campaign setup, keyword research, search ads, landing page strategy, conversion tracking, call tracking, ad copywriting, budget optimisation, and monthly performance reports.',
    seoTitle: 'Google Ads Management UK | PPC Agency for Lead Generation',
    seoDescription: 'Digioverse manages Google Ads campaigns for UK businesses, helping generate leads, enquiries, calls, bookings, and sales through targeted PPC advertising.',
  },
  'meta-ads': {
    icon: Share2,
    title: 'Meta Ads Management',
    eyebrow: 'Grow',
    intro: 'Facebook and Instagram ad campaigns designed to generate leads, WhatsApp messages, bookings, engagement, and brand awareness for UK businesses.',
    image: '/assets/meta-ads-creative.jpg',
    outcomes: ['Lead generation campaigns', 'WhatsApp message ads', 'Retargeting & lookalike audiences', 'Creative design & copywriting'],
    copy: 'Meta ads are powerful for reaching the right audience and driving enquiries through Facebook, Instagram, Messenger, and WhatsApp. Digioverse creates eye-catching campaigns designed to attract, engage, and convert. Our campaign types include lead generation ads, WhatsApp message campaigns, brand awareness campaigns, engagement campaigns, retargeting ads, offer-based ads, creative design, ad copywriting, and audience targeting.',
    seoTitle: 'Meta Ads Management UK | Facebook & Instagram Ads Agency',
    seoDescription: 'Digioverse creates Facebook and Instagram ad campaigns for UK businesses to generate leads, WhatsApp messages, bookings, engagement, and brand awareness.',
  },
  'paid-advertising': {
    icon: Target,
    title: 'Paid Advertising',
    eyebrow: 'Grow',
    intro: 'High-ROAS Google Ads, Meta Ads, and LinkedIn campaigns constructed around targeted audience funnels and transparent ROI data.',
    image: '/assets/meta-ads-creative.jpg',
    outcomes: ['Strategic account structure', 'Rigorous creative tests', 'Custom tracking installation', 'Ongoing bidding management'],
    copy: 'Paid media advertising requires an aligned, multi-channel growth system. We connect premium direct-response visual creatives, high-converting custom landing pages, and advanced server-side conversion tracking APIs (Meta Conversions API) to ensure your marketing spend is fully optimized. Our certified media buyers continuously test bidding approaches, keywords, and creative variants to deliver measurable revenue.',
    seoTitle: 'Paid Advertising UK | Google & Meta Ads Agency',
    seoDescription: 'High-ROAS Google Ads, Meta Ads, and LinkedIn campaigns for UK businesses.',
  },
  'social-media': {
    icon: Share2,
    title: 'Social Media',
    eyebrow: 'Grow',
    intro: 'High-end social media content and brand systems that build industry credibility, grow followers, and nurture client trust.',
    image: '/assets/premium-saas-hero.png',
    outcomes: ['Professional visual themes', 'Strategic content calendars', 'Premium graphic assets', 'Multi-channel brand voice'],
    copy: 'We help premium brands show up consistently across major visual social channels with elite visual guidelines. Our creative studio constructs high-fidelity posts, educational infographics, and engaging short-form video assets that support your broader marketing goals. By maintaining a clean, high-end design language and professional tone, we transform your social channels into powerful business credibility platforms.',
    seoTitle: 'Social Media Management UK | Content Design & Posting',
    seoDescription: 'Digioverse provides social media management for UK businesses, including content planning, post design, captions, scheduling, branding, and growth strategy.',
  },
  'content-marketing': {
    icon: PenTool,
    title: 'Content Marketing',
    eyebrow: 'Grow',
    intro: 'Deep-dive technical articles, authoritative lead magnets, and case studies styled to build market authority and close deals.',
    image: '/assets/featured-blog.jpg',
    outcomes: ['Authority asset creation', 'Lead magnet lead flows', 'Case study copy layouts', 'Search-engine-optimized blogs'],
    copy: 'Content should never exist simply as filler. We build rich, deeply informative content assets that address the specific, high-intent questions your target buyers ask before making a purchase. By producing premium whitepapers, thorough diagnostic guides, and data-backed client success stories, we establish your brand as a trustworthy market authority that helps your sales team close deals faster.',
    seoTitle: 'Content Marketing UK | Digioverse',
    seoDescription: 'Technical articles, lead magnets, case studies, and content assets for market authority.',
  },
  'cro-analytics': {
    icon: BarChart3,
    title: 'CRO & Analytics',
    eyebrow: 'Grow',
    intro: 'Conversion rate improvements backed by real user session heatmaps, empirical funnel analyses, and rigorous A/B testing.',
    image: '/assets/cro-analytics.jpg',
    outcomes: ['GA4 tracking & audits', 'Friction funnel analyses', 'Session heatmap reviews', 'A/B testing roadmaps'],
    copy: 'We eliminate the guesswork from digital growth by analyzing empirical user behavior. Our optimization engineers identify site bottlenecks, test alternate headers, re-structure forms, and simplify pricing tables to turn your existing traffic into revenue. We implement precise Google Analytics and Tag Manager setups so you always know exactly which design changes are driving business value.',
    seoTitle: 'CRO & Analytics UK | Digioverse',
    seoDescription: 'Conversion rate optimization backed by real user data, heatmaps, and A/B testing.',
  },
  'branding-identity': {
    icon: Fingerprint,
    title: 'Branding & Identity',
    eyebrow: 'Brand',
    intro: 'Premium, unified visual identity systems that command industry pricing authority and establish instant corporate credibility.',
    image: '/assets/premium-tech-hero-bg.png',
    outcomes: ['Bespoke logo design suites', 'Corporate color pairing systems', 'Clean typeface hierarchies', 'Complete brand books'],
    copy: 'Your visual identity communicates your brand value before your sales team ever speaks a word. We design cohesive, premium branding packages that command market authority and set you apart from low-cost competitors. From modern typography guidelines to elegant, HSL-based color theory and digital/print layout blueprints, we ensure your business feels established, expensive, and reliable.',
    seoTitle: 'Branding & Graphic Design Services UK | Digioverse',
    seoDescription: 'Digioverse offers branding and graphic design services for UK businesses, including logos, brand identity, flyers, business cards, brochures, social media graphics, and ad creatives.',
  },
  'creative-studio': {
    icon: Palette,
    title: 'Creative Studio',
    eyebrow: 'Brand',
    intro: 'Polished graphic design and marketing collateral styled to keep your corporate brand visually consistent across all channels.',
    image: '/assets/meta-ads-creative.jpg',
    outcomes: ['Marketing brochure design', 'Ad creative visual sets', 'Sales pitch deck designs', 'Polished print collateral'],
    copy: 'Our creative studio serves as a dedicated partner for high-growth enterprises. We design ultra-clean, conversion-focused marketing collateral, digital brochures, high-performance social graphics, and custom pitch visual decks. By maintaining meticulous grid spacing, modern styling layouts, and clean typographic structures, we ensure your company assets consistently convey high quality.',
    seoTitle: 'Creative Studio UK | Digioverse',
    seoDescription: 'Premium graphic design for marketing collateral, brochures, social assets, and pitch decks.',
  },
  'flyer-design-print': {
    icon: Printer,
    title: 'Flyer Design & Print',
    eyebrow: 'Brand',
    intro: 'Premium print collateral, high-impact flyer layouts, and corporate stationery designed to capture offline local attention.',
    image: '/assets/premium-tech-hero-bg.png',
    outcomes: ['High-contrast print design', 'Frictionless call-to-actions', 'Premium texture paper selection', 'Local print management support'],
    copy: 'We bridge the gap between digital excellence and offline local marketing. Our designers construct high-impact flyer designs that feature strong offer hierarchies, highly readable contact sections, and explicit action triggers. We manage the technical preparation, CMYK color profiles, and paper selections, ensuring your print assets arrive at your doorstep looking exceptionally professional.',
    seoTitle: 'Flyer Design & Print UK | Digioverse',
    seoDescription: 'High-impact flyer design and print management for offline local marketing.',
  },
  'business-emails': {
    icon: Mail,
    title: 'Business Emails',
    eyebrow: 'Brand',
    intro: 'Secure branded business email setup, Google Workspace integration, and DMARC/DKIM authentication for ultimate credibility.',
    image: '/assets/hosterlo-logo.png',
    outcomes: ['Google Workspace / M365', 'Custom domain setup', 'SPF/DKIM/DMARC configurations', 'Deliverability rate audits'],
    copy: 'Operating with basic consumer email addresses significantly damages your brand trust. We migrate, configure, and secure professional business emails under your custom domain. By deploying advanced SPF, DKIM, and DMARC security protocols, we protect your domain from spoofing and ensure that your client communications land directly in the inbox, not the spam folder.',
    seoTitle: 'Business Email Setup UK | Digioverse',
    seoDescription: 'Secure branded business email setup with Google Workspace integration.',
  },
};

type ServiceSlug = keyof typeof serviceData;

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug as ServiceSlug] : null;

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.intro,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Digioverse",
      "image": "https://digioverse.com/assets/digioverse-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1A North Rd",
        "addressLocality": "Woking",
        "addressRegion": "Surrey",
        "postalCode": "GU21 5DS",
        "addressCountry": "GB"
      },
      "telephone": "+442046155575",
      "priceRange": "££"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    }
  };

  const Icon = service.icon;

  return (
    <>
      <SEO 
        title={service.seoTitle || `${service.title} | Digioverse`} 
        description={service.seoDescription || service.intro} 
      />

      {/* JSON-LD Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>

      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-28 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current={service.title} parent={{ label: 'Services', href: '/services' }} />
          <div className="grid lg:grid-cols-[minmax(0,1fr)_460px] gap-12 items-center mt-8">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full bg-white border border-[#ddd0f4] px-4 py-2 shadow-[0_12px_30px_rgba(13,5,32,0.06)]">
                <Icon className="w-5 h-5 text-[#6a00ff]" />
                <span className="text-xs font-extrabold uppercase tracking-wide text-[#6a00ff]">{service.eyebrow}</span>
              </div>
              <h1 className="mt-6 text-[42px] md:text-[68px] leading-[1.02] font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">{service.title}</h1>
              <p className="mt-6 max-w-[620px] text-lg leading-relaxed text-[#53445f]">{service.intro}</p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button to="/contact">Start This Project</Button>
                <Button variant="secondary" to="/services">View All Services</Button>
              </div>
            </div>
            <div className="rounded-[28px] bg-white p-4 shadow-[0_28px_80px_rgba(13,5,32,0.14)] border border-[#ddd0f4]">
              <img src={service.image} alt={service.title} className="aspect-[4/3] w-full rounded-[20px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7fa] py-16 md:py-20">
        <div className="max-w-[1120px] mx-auto px-5 md:px-8 lg:px-12 grid lg:grid-cols-[0.9fr_1.1fr] gap-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wide text-[#6a00ff]">What You Get</span>
            <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">Built to look premium and perform clearly.</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-[#53445f]">{service.copy}</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-8">
              {service.outcomes.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-[#ddd0f4] p-5 shadow-[0_10px_30px_rgba(13,5,32,0.05)]">
                  <CheckCircle2 className="w-5 h-5 text-[#6a00ff] shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-[#0d0520]">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-[28px] bg-[#0d0520] p-7 md:p-9">
              <h3 className="text-2xl font-extrabold text-white font-['Plus_Jakarta_Sans']">Want this for your business?</h3>
              <p className="mt-3 text-[#c7a7ff]">Tell us what you are building and we will recommend the cleanest way forward.</p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Button to="/book-appointment">Book a Free Appointment</Button>
                <Button variant="ghost" to="/contact">Get a Free Quote</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
