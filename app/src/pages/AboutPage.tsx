import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import ServiceCard from '../components/ServiceCard';
import StatCounter from '../components/StatCounter';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { 
  Lightbulb, Eye, BarChart3, Users, Shield, TrendingUp, ShoppingBag, Scale, 
  Heart, HardHat, Dumbbell, Briefcase, UtensilsCrossed, Cpu, Target, Compass, 
  Zap, CheckCircle2 
} from 'lucide-react';

const values = [

  { icon: Lightbulb, title: 'Innovation', description: 'We push boundaries. Every solution we build uses the latest technology and creative thinking to give our clients an edge.' },
  { icon: Eye, title: 'Transparency', description: 'No hidden fees, no jargon, no surprises. You\'ll always know exactly what we\'re doing, why we\'re doing it, and what it costs.' },
  { icon: BarChart3, title: 'Results-Driven', description: 'Beautiful design means nothing without performance. We measure success in leads, sales, rankings, and revenue — not just aesthetics.' },
  { icon: Users, title: 'True Partnership', description: 'We don\'t work for you — we work with you. Your success is our success, and we\'re invested for the long term.' },
  { icon: Shield, title: 'Uncompromising Quality', description: 'Every pixel, every line of code, every campaign is held to the highest standard. Good enough is never enough.' },
  { icon: TrendingUp, title: 'Continuous Growth', description: 'Digital never stands still, and neither do we. We\'re constantly learning, testing, and evolving to keep our clients ahead.' },
];

const team = [
  { 
    name: 'Ahsan', 
    role: 'Managing Director, Co-Founder & Developer', 
    bio: 'With 7+ years of professional experience in SEO, digital marketing, and full-stack software engineering, Ahsan drives the core technical architecture and organic visibility strategies for Digioverse.', 
    image: '/assets/ahsan_founder.jpg' 
  },
  { 
    name: 'Mehar Hassan', 
    role: 'Co-Founder & Head of Growth', 
    bio: 'Bringing 12+ years of elite experience in digital strategy and customer acquisition, Mehar Hassan architects high-converting advertising funnels and client growth pipelines that scale businesses.', 
    image: '/assets/mehar_founder.png' 
  },
  { 
    name: 'Musa Shahzad', 
    role: 'Senior Web & Automation Engineer', 
    bio: 'With 4+ years of specialized experience in high-performance frontend frameworks and deep database/API integrations, Musa constructs robust web applications and automated workflows.', 
    image: '/assets/musa.png' 
  },
];

const industries = [
  { icon: ShoppingBag, name: 'E-commerce' },
  { icon: Scale, name: 'Law Firms' },
  { icon: Heart, name: 'Healthcare' },
  { icon: HardHat, name: 'Construction' },
  { icon: Dumbbell, name: 'Fitness & Wellness' },
  { icon: Briefcase, name: 'Professional Services' },
  { icon: UtensilsCrossed, name: 'Hospitality' },
  { icon: Cpu, name: 'Technology' },
];

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Digioverse | Leading UK Digital Agency & Growth Partner"
        description="Learn about Digioverse, an elite UK web design, digital marketing, and growth agency. Discover our mission, values, and meet our founders Ahsan & Mehar."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="About" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">About Digioverse</span>
          <CharacterScatter text="We're Building the Future of Digital Business" className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h1" />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[800px] leading-relaxed">
              Founded in the United Kingdom with a clear and ambitious global vision, Digioverse serves as a premier growth partner and specialized digital agency. We design, build, and scale high-performance custom websites, bespoke web applications, enterprise-grade SaaS products, and aggressive paid media client acquisition funnels that transform high-growth startups into industry-leading icons.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="bg-[#f7f7fa] py-16 border-b border-[#ddd0f4]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-8">
            <ScrollReveal delay={0.1}>
              <div className="h-full bg-white rounded-[24px] p-8 md:p-10 border border-[#ddd0f4] shadow-[0_4px_24px_rgba(13,5,32,0.03)] hover:shadow-[0_12px_32px_rgba(13,5,32,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[rgba(106,0,255,0.08)] flex items-center justify-center text-[#6a00ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mb-4">Our Mission</h3>
                <p className="text-base text-[#53445f] leading-relaxed">
                  To empower UK businesses with high-converting websites, elite engineering, and hyper-targeted digital pipelines that turn digital presence into real-world market dominance. We bridge the gap between creative visual excellence and performance-driven technical execution.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="h-full bg-white rounded-[24px] p-8 md:p-10 border border-[#ddd0f4] shadow-[0_4px_24px_rgba(13,5,32,0.03)] hover:shadow-[0_12px_32px_rgba(13,5,32,0.06)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[rgba(106,0,255,0.08)] flex items-center justify-center text-[#6a00ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Compass className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mb-4">Our Vision</h3>
                <p className="text-base text-[#53445f] leading-relaxed">
                  To be the gold standard growth partner for ambitious brands worldwide, bridging sophisticated brand aesthetics and deep-tech SaaS architectures to redefine modern business scale and command instant customer trust.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-[#0d0520] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Story</span>
              <CharacterScatter text="From a Small UK Agency to a Global Digital Force" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
              <ScrollReveal delay={0.4}>
                <p className="text-lg text-[#c7a7ff] mt-6 leading-relaxed">
                  Digioverse was established with a singular, uncompromising vision: to design and engineer premium digital ecosystems that work tirelessly to acquire, retain, and convert high-value clients. What began as an agile, high-concept website design studio in Woking, Surrey has quickly matured into an elite, full-service digital powerhouse. Today, we architect and execute sophisticated digital solutions for forward-thinking enterprises across the United Kingdom, North America, Europe, and global startup hubs.
                </p>
                <p className="text-lg text-[#c7a7ff] mt-4 leading-relaxed">
                  Our technical track record speaks volumes: we have successfully delivered over 500 bespoke custom websites, launched more than 150 search-dominating technical SEO campaigns, and engineered over 50 proprietary SaaS product architectures. By aligning modern frontend React framework capabilities, ultra-fast headless Shopify backends, and robust cloud scaling databases, we ensure our clients bypass traditional growth plateaus.
                </p>
                <p className="text-lg text-[#c7a7ff] mt-4 leading-relaxed">
                  We don't settle for static page designs or simple templates. Every asset we construct is built around a customized commercial funnel, turning organic and paid search traffic into profitable client relationships.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3} className="relative">
              <img src="/assets/about-team.jpg" alt="Digioverse team" className="rounded-2xl w-full aspect-[4/3] object-cover" />
              <div className="absolute bottom-6 left-6 bg-[rgba(247,247,250,0.7)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.15)] rounded-[24px] p-6 shadow-[0_4px_24px_rgba(13,5,32,0.06)]">
                <StatCounter value={10} suffix="+" label="Years of Digital Excellence" dark />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Our Values</span>
            <CharacterScatter text="What We Stand For" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-lg text-[#53445f] mt-4 max-w-[480px] leading-relaxed">These principles guide every decision we make and every project we deliver.</p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.12}>
                <ServiceCard {...v} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-[#0d0520] py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(106,0,255,0.15),transparent_40%)]" />
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Why Digioverse</span>
            <CharacterScatter text="What Makes Us Different" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-lg text-[#c7a7ff] mt-4 max-w-[540px] leading-relaxed">
              We don't build generic templates or execute static campaigns. We engineer highly sophisticated business systems that yield measurable results.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                icon: Shield,
                title: "100% In-House (No Outsourcing)",
                desc: "Every line of React/Next.js code, custom design layout, and paid advertising campaign strategist is entirely in-house. We do not outsource your business success to third parties."
              },
              {
                icon: Cpu,
                title: "Elite Next.js & React Architectures",
                desc: "We build blazing-fast, custom headless single-page applications optimized for extreme Core Web Vitals performance, SEO authority, and seamless fluid transitions."
              },
              {
                icon: Users,
                title: "Direct Founder Accessibility",
                desc: "No bloated layers of junior account managers or sales reps. You work directly with founders Ahsan and Mehar Hassan to architect and scale your digital pipeline."
              },
              {
                icon: Zap,
                title: "Aggressive ROI & Conversion Focus",
                desc: "We reject vanity metrics. Every pixel, line of copy, and form path is strategically engineered to optimize conversion rates, generate qualified leads, and maximize revenue."
              },
              {
                icon: CheckCircle2,
                title: "End-to-End Growth Pipelines",
                desc: "From custom UI/UX design and search engine optimization (SEO) to hyper-targeted PPC ads and custom backend SaaS automation. We operate and refine the entire funnel."
              }
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.12}>
                <div className="h-full bg-[rgba(255,255,255,0.03)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.08)] rounded-[24px] p-8 hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(106,0,255,0.4)] transition-all duration-300 group hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(106,0,255,0.15)] flex items-center justify-center text-[#6a00ff] mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#f7f7fa] font-['Plus_Jakarta_Sans'] mb-3">{item.title}</h3>
                  <p className="text-sm text-[#c7a7ff] leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">The Team</span>
            <CharacterScatter text="Meet the Minds Behind Digioverse" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-lg text-[#53445f] mt-4 max-w-[520px] leading-relaxed">A friendly team of professional designers, developers, and marketers focused on your success.</p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-[1080px] mx-auto">
            {team.map((member, i) => (
              <ScrollReveal key={member.name} delay={i * 0.15} y={50}>
                <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(13,5,32,0.06)] hover:shadow-[0_8px_40px_rgba(13,5,32,0.12)] hover:-translate-y-1 transition-all duration-300 group">
                  <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#6a00ff] to-[#3b0a75]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy" 
                    />
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{member.name}</h4>
                    <span className="text-xs font-extrabold text-[#6a00ff] uppercase tracking-wider block mt-1">{member.role}</span>
                    <p className="text-sm text-[#53445f] mt-4 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">How We Think</span>
            <CharacterScatter text="Strategy-Led, Data-Driven, Creatively Executed" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-lg text-[#53445f] mt-4 max-w-[600px] mx-auto leading-relaxed">We combine strategic thinking with creative execution and data-driven optimization to deliver work that performs.</p>
          </ScrollReveal>
          <div className="max-w-[720px] mx-auto mt-20 space-y-20">
            {[
              { num: '01', title: 'Deep Discovery & Strategic Funnels', body: 'Before we craft a single visual block or compose a line of clean code, our strategists immerse themselves into the deep fundamentals of your business. We perform exhaustive competitor intelligence audits, map high-intent search queries, analyze consumer behavior psychology, and establish transparent key performance metrics. This strategic foundation guarantees that your digital presence is built exclusively to turn clicks into pipeline revenue.' },
              { num: '02', title: 'Flawless Creative & High-Performance Engineering', body: 'Strategy is only as good as the precision of its execution. Our award-winning design studio and elite developers bring the blueprint to life. We specialize in building custom headless content management systems, blazing-fast React and Next.js single-page applications, and high-fidelity, high-converting checkout flows. We maintain absolute typography alignment, elegant HSL-based color theory, and smooth micro-animations to command instant user trust.' },
              { num: '03', title: 'Relentless Optimization & Growth Analysis', body: 'We reject the "set-and-forget" agency mindset. Post-launch, our growth engineers leverage advanced analytics tracking, real-time user session heatmaps, detailed multi-variable A/B testing, and robust customer retention models. We monitor speed performance, tracking pixel health, and search engine crawling behaviors to drive consistent, compounding optimizations that maximize your marketing spend and customer lifetime value.' },
            ].map((item) => (
              <ScrollReveal key={item.num}>
                <div className="text-center">
                  <span className="text-[64px] font-bold text-[rgba(106,0,255,0.15)] font-['Plus_Jakarta_Sans'] leading-none">{item.num}</span>
                  <h3 className="text-3xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4">{item.title}</h3>
                  <p className="text-[#53445f] mt-4 leading-relaxed text-lg">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal className="text-center">
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Who We Serve</span>
            <CharacterScatter text="Industries We Work With" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h2" />
            <p className="text-[#53445f] mt-4 leading-relaxed">We've helped businesses across dozens of sectors grow their digital presence.</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-12">
            {industries.map((ind, i) => (
              <ScrollReveal key={ind.name} delay={i * 0.08}>
                <div className="bg-[rgba(247,247,250,0.7)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.15)] rounded-[24px] p-6 shadow-[inset_0_0_0_1px_rgba(200,224,232,0.5),0_4px_24px_rgba(13,5,32,0.06)] hover:shadow-[0_12px_48px_rgba(13,5,32,0.12)] transition-all duration-400">
                  <ind.icon className="w-6 h-6 text-[#6a00ff]" />
                  <h4 className="text-base font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-3">{ind.name}</h4>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d0520] py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <CharacterScatter text="Let's Build Something Great Together" className="text-[36px] md:text-[64px] font-semibold text-[#f7f7fa] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#c7a7ff] mt-5 max-w-[600px] mx-auto leading-relaxed">Whether you're a startup finding your feet or an established business ready to scale, we'd love to hear from you.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button to="/contact">Start a Project</Button>
              <Button variant="ghost" to="/work">View Our Work</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
