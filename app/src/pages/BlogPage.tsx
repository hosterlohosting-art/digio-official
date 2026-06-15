import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import CharacterScatter from '../components/CharacterScatter';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import SEO from '../components/SEO';
import { Calendar, Clock, Mail } from 'lucide-react';
import { blogArticles } from '../data/blogArticles';

const categories = ['All', 'Web Design', 'SEO', 'Google Ads', 'Meta Ads', 'Ecommerce', 'Business Automation', 'Hosting', 'SaaS', 'UK Business Growth'];


export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterState('loading');
    try {
      const payload = {
        _subject: 'New Newsletter Subscription',
        email: newsletterEmail,
      };

      const promise1 = fetch('https://formsubmit.co/ajax/thedigioverse@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const promise2 = fetch('https://formsubmit.co/ajax/digioverseuk@gmail.com', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload),
      });

      const [res1, res2] = await Promise.all([promise1, promise2]);

      if (!res1.ok && !res2.ok) {
        throw new Error('Subscription failed');
      }

      setNewsletterState('success');
      setNewsletterEmail('');
    } catch (error) {
      console.error(error);
      setNewsletterState('error');
    }
  };

  const featuredArticle = blogArticles[0];
  const filtered = activeCategory === 'All'
    ? blogArticles.filter((a) => a.slug !== featuredArticle.slug)
    : blogArticles.filter((a) => a.category === activeCategory);

  return (
    <>
      <SEO 
        title="UK Business Growth Blog | Digital Marketing Insights | Digioverse"
        description="Read expert insights on website design, SEO, Google & Meta Ads, conversion rate optimization, ecommerce growth, and business automation from the Digioverse team."
      />

      {/* Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-32 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current="Blog" />
          <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff]">Insights & Resources</span>
          <CharacterScatter text="Expert Insights for Growing Your Business Online" className="text-[36px] md:text-[64px] font-bold text-[#0d0520] leading-[1.1] tracking-[-0.02em] mt-4 font-['Plus_Jakarta_Sans']" as="h1" />
          <ScrollReveal delay={0.6}>
            <p className="text-lg text-[#53445f] mt-5 max-w-[520px] leading-relaxed">Practical advice, industry trends, and digital marketing strategies from the Digioverse team.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.8} className="flex flex-wrap gap-3 mt-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 ${
                  activeCategory === c
                    ? 'bg-[#6a00ff] text-white border border-[#6a00ff]'
                    : 'text-[#53445f] border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff]'
                }`}
              >
                {c}
              </button>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Post */}
      <section className="bg-[#f7f7fa] pb-12">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <ScrollReveal delay={0.5}>
            <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(13,5,32,0.06)] grid md:grid-cols-[60%_40%] animate-[fadeIn_0.5s_ease]">
              <div className="aspect-video md:aspect-auto overflow-hidden">
                <img src="/assets/featured-blog.jpg" alt={featuredArticle.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-600" />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="text-xs font-medium text-[#6a00ff] bg-[rgba(106,0,255,0.1)] px-4 py-1.5 rounded-full w-fit">{featuredArticle.category}</span>
                <h2 className="text-2xl md:text-3xl font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-4 leading-snug">{featuredArticle.title}</h2>
                <p className="text-[#53445f] mt-3 leading-relaxed">{featuredArticle.excerpt}</p>
                <div className="flex items-center gap-6 mt-6 text-xs text-[#7d718c]">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {featuredArticle.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredArticle.readTime} read</span>
                </div>
                <Button variant="tertiary" to={`/blog/${featuredArticle.slug}`} className="mt-6">Read Article</Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Grid */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((article, i) => (
              <ScrollReveal key={`${activeCategory}-${article.title}`} delay={i * 0.1}>
                <Link to={`/blog/${article.slug}`} className="block group h-full">
                  <article className="bg-white rounded-[20px] overflow-hidden shadow-[0_4px_24px_rgba(13,5,32,0.06)] group-hover:shadow-[0_8px_40px_rgba(13,5,32,0.1)] group-hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                    <div className="aspect-video bg-gradient-to-br from-[#eee7ff] to-[#ddd0f4] flex items-center justify-center overflow-hidden">
                      <span className="text-4xl font-bold text-[#6a00ff] font-['Plus_Jakarta_Sans'] opacity-30 group-hover:scale-110 transition-transform duration-300">{article.initials}</span>
                    </div>
                    <div className="p-7 flex-1 flex flex-col">
                      <span className="text-xs font-medium text-[#6a00ff] bg-[rgba(106,0,255,0.1)] px-3 py-1 rounded-full w-fit">{article.category}</span>
                      <h4 className="text-base font-semibold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-3 line-clamp-2 leading-snug group-hover:text-[#6a00ff] transition-colors">{article.title}</h4>
                      <p className="text-sm text-[#53445f] mt-2 line-clamp-2 leading-relaxed flex-1">{article.excerpt}</p>
                      <div className="flex items-center gap-4 mt-4 text-xs text-[#7d718c]">
                        <span>{article.date}</span>
                        <span>{article.readTime}</span>
                      </div>
                      <div className="border-t border-[#ddd0f4] mt-4 pt-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6a00ff] to-[#3b0a75] flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{article.initials}</span>
                        </div>
                        <span className="text-xs font-medium text-[#53445f]">{article.author}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-[#7d718c] py-20">No articles in this category yet.</p>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#0d0520] py-16 md:py-20">
        <div className="max-w-[640px] mx-auto px-5 text-center">
          <ScrollReveal>
            <Mail className="w-12 h-12 text-[#6a00ff] mx-auto" />
          </ScrollReveal>
          <CharacterScatter text="Get Weekly Insights Delivered to Your Inbox" className="text-[28px] md:text-5xl font-semibold text-[#f7f7fa] leading-[1.15] tracking-[-0.02em] mt-6 font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-[#c7a7ff] mt-4 leading-relaxed">Join 3,000+ business owners who get our best digital marketing tips every Tuesday. No spam, ever.</p>
            <form className="flex flex-col sm:flex-row gap-3 mt-8 max-w-[480px] mx-auto" onSubmit={handleNewsletterSubmit}>
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] rounded-xl px-5 py-3.5 text-[#f7f7fa] placeholder:text-[#7d718c] text-sm focus:border-[#6a00ff] focus:shadow-[0_0_20px_rgba(106,0,255,0.2)] transition-all outline-none"
              />
              <Button type="submit" className="shrink-0" disabled={newsletterState === 'loading'}>
                {newsletterState === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
            {newsletterState === 'success' && <p className="mt-3 text-center text-sm font-semibold text-[#6a00ff]">Thank you for subscribing! Check your inbox soon.</p>}
            {newsletterState === 'error' && <p className="mt-3 text-center text-sm font-semibold text-red-500">Could not subscribe. Please try again.</p>}
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f7f7fa] py-16 md:py-20">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <CharacterScatter text="Need Help With Your Digital Strategy?" className="text-[36px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']" as="h2" />
          <ScrollReveal delay={0.3}>
            <p className="text-lg text-[#53445f] mt-5 leading-relaxed">Our team is ready to help you grow. Book a free consultation and let's discuss your goals.</p>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              <Button to="/contact">Book a Free Call</Button>
              <Button variant="secondary" to="/services">View Our Services</Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
