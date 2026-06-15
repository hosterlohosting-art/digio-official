import { useParams, Link, Navigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { blogArticles } from '../data/blogArticles';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import ScrollReveal from '../components/ScrollReveal';
import Button from '../components/Button';
import { Calendar, Clock, ChevronLeft, Send, CheckCircle, Share2, Copy } from 'lucide-react';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  
  // Lead form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    website: '', // Honeypot
  });
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Find article
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  // Ref list for headings to handle dynamic TOC activation
  const headingRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      // Progress bar calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }

      // Determine active section based on scroll
      let currentSection = '';
      const headings = Object.values(headingRefs.current).filter(Boolean);
      for (const h of headings) {
        if (h) {
          const rect = h.getBoundingClientRect();
          if (rect.top <= 120) {
            currentSection = h.id;
          }
        }
      }
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article]);

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: url,
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');

    // Honeypot detection
    if (formData.website) {
      setTimeout(() => {
        setFormState('success');
        setFormData({ name: '', email: '', message: '', website: '' });
      }, 800);
      return;
    }

    try {
      const payload = {
        _subject: `New Lead from Blog: ${article.title}`,
        name: formData.name,
        email: formData.email,
        message: formData.message,
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
        throw new Error('Form submission failed');
      }

      setFormState('success');
      setFormData({ name: '', email: '', message: '', website: '' });
    } catch (error) {
      console.error(error);
      setFormState('error');
    }
  };

  // Helper to slugify heading contents for IDs
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  // Extract headings for the Table of Contents
  const headings = article.content.filter(
    (section) => section.type === 'heading-2' || section.type === 'heading-3'
  );

  return (
    <>
      <SEO
        title={article.metaTitle}
        description={article.metaDescription}
        keywords={article.keywords}
      />

      {/* JSON-LD Schema.org Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(article.schema)}
      </script>

      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-[#6a00ff] z-[2000] transition-all duration-100 ease-out" 
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Article Header */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-36 pb-16">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current={article.title} />
          
          <div className="mt-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-1 text-sm font-semibold text-[#6a00ff] hover:text-[#3b0a75] transition-colors mb-6"
            >
              <ChevronLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>

          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-wide text-[#6a00ff] bg-[rgba(106,0,255,0.1)] px-4 py-1.5 rounded-full">
              {article.category}
            </span>
            <h1 className="text-[32px] md:text-5xl lg:text-[56px] font-bold text-[#0d0520] leading-[1.15] tracking-[-0.02em] mt-5 font-['Plus_Jakarta_Sans']">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 mt-8 text-sm text-[#7d718c]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6a00ff] to-[#3b0a75] flex items-center justify-center text-white text-xs font-bold shadow-[0_4px_12px_rgba(106,0,255,0.15)]">
                  {article.initials}
                </div>
                <span className="font-medium text-[#2b094f]">{article.author}</span>
              </div>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.date}</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {article.readTime} read</span>
              
              <button 
                onClick={handleShare}
                className="flex items-center gap-1.5 text-[#6a00ff] hover:text-[#3b0a75] font-semibold transition-colors ml-auto md:ml-0"
              >
                {copied ? <span className="text-xs text-green-600 font-bold">Link Copied!</span> : (
                  <>
                    <Share2 className="w-4 h-4" /> Share Article
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="bg-[#f7f7fa] py-12 md:py-20">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-[68%_28%] gap-12">
            
            {/* Left Column: Article Body */}
            <article className="bg-white rounded-[24px] shadow-[0_4px_30px_rgba(13,5,32,0.04)] border border-white/50 p-6 md:p-12">
              <div className="prose prose-purple max-w-none">
                {article.content.map((sec, idx) => {
                  switch (sec.type) {
                    case 'paragraph':
                      return (
                        <p key={idx} className="text-[16px] md:text-[17px] text-[#53445f] leading-relaxed mb-6 font-['Outfit']">
                          {sec.content?.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#0d0520] font-extrabold">{part}</strong> : part)}
                        </p>
                      );
                    case 'heading-2': {
                      const headingId = slugify(sec.content || '');
                      return (
                        <h2 
                          key={idx}
                          id={headingId}
                          ref={(el) => { headingRefs.current[headingId] = el; }}
                          className="text-2xl md:text-[28px] font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-10 mb-4 border-b border-[#ddd0f4]/40 pb-2"
                        >
                          {sec.content}
                        </h2>
                      );
                    }
                    case 'heading-3': {
                      const headingId = slugify(sec.content || '');
                      return (
                        <h3 
                          key={idx}
                          id={headingId}
                          ref={(el) => { headingRefs.current[headingId] = el; }}
                          className="text-xl md:text-[22px] font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-8 mb-3"
                        >
                          {sec.content}
                        </h3>
                      );
                    }
                    case 'list':
                      return (
                        <ul key={idx} className="list-disc pl-6 mb-6 space-y-3 text-[#53445f] font-['Outfit']">
                          {sec.items?.map((item, i) => (
                            <li key={i} className="text-[16px]">
                              {item.split('**').map((part, index) => index % 2 === 1 ? <strong key={index} className="text-[#0d0520] font-bold">{part}</strong> : part)}
                            </li>
                          ))}
                        </ul>
                      );
                    case 'quote':
                      return (
                        <blockquote key={idx} className="border-l-4 border-[#6a00ff] pl-6 my-8 italic text-lg text-[#2b094f] font-medium bg-[#f7f7fa]/50 py-4 pr-4 rounded-r-xl">
                          {sec.content}
                        </blockquote>
                      );
                    case 'callout':
                      return (
                        <div key={idx} className="bg-gradient-to-r from-[#eee7ff] to-[#f7f7fa] border border-[#ddd0f4] rounded-2xl p-6 my-8 text-[15px] text-[#2b094f] font-medium shadow-[0_4px_12px_rgba(106,0,255,0.03)]">
                          {sec.content?.split('**').map((part, i) => i % 2 === 1 ? <strong key={i} className="text-[#6a00ff]">{part}</strong> : part)}
                        </div>
                      );
                    case 'table':
                      return (
                        <div key={idx} className="overflow-x-auto my-8 rounded-xl border border-[#ddd0f4] shadow-[0_4px_20px_rgba(13,5,32,0.02)]">
                          <table className="w-full border-collapse text-left text-sm">
                            <thead>
                              <tr className="bg-[#0d0520] text-white">
                                {sec.headers?.map((header, i) => (
                                  <th key={i} className="p-4 font-semibold font-['Plus_Jakarta_Sans']">{header}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {sec.rows?.map((row, i) => (
                                <tr key={i} className="border-b border-[#ddd0f4]/60 hover:bg-[#eee7ff]/20 transition-colors">
                                  {row.map((cell, j) => (
                                    <td key={j} className="p-4 text-[#53445f] font-['Outfit']">{cell}</td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>

              {/* Bottom Author Bio Card */}
              <div className="border-t border-[#ddd0f4] mt-12 pt-8 flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6a00ff] to-[#3b0a75] flex items-center justify-center text-white text-xl font-bold shadow-[0_4px_16px_rgba(106,0,255,0.2)]">
                  {article.initials}
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#6a00ff]">Written By</span>
                  <h4 className="text-base font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mt-0.5">{article.author}</h4>
                  <p className="text-sm text-[#7d718c] mt-1">Growth & Search Strategy Lead at Digioverse. Focused on high-performance web optimization and SEO engineering in the UK.</p>
                </div>
              </div>
            </article>

            {/* Right Column: Sticky Sidebar */}
            <aside className="space-y-8">
              
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-white rounded-[24px] border border-white p-6 shadow-[0_4px_24px_rgba(13,5,32,0.04)] sticky top-28">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-[#0d0520] border-b border-[#ddd0f4]/60 pb-3 font-['Plus_Jakarta_Sans']">
                    Table of Contents
                  </h4>
                  <ul className="mt-4 space-y-2.5">
                    {headings.map((h, i) => {
                      const headingId = slugify(h.content || '');
                      const isActive = activeSection === headingId;
                      return (
                        <li 
                          key={i}
                          style={{ paddingLeft: h.type === 'heading-3' ? '12px' : '0' }}
                        >
                          <a 
                            href={`#${headingId}`}
                            className={`text-sm transition-all duration-200 block leading-snug py-0.5 ${
                              isActive 
                                ? 'text-[#6a00ff] font-semibold border-l-2 border-[#6a00ff] pl-2 -ml-2.5' 
                                : 'text-[#7d718c] hover:text-[#6a00ff]'
                            }`}
                          >
                            {h.content}
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Quick share button in TOC */}
                  <button
                    onClick={handleShare}
                    className="w-full mt-6 py-3 border border-[#ddd0f4] hover:border-[#6a00ff] hover:text-[#6a00ff] rounded-xl text-xs font-bold text-[#2b094f] transition-all flex items-center justify-center gap-2 bg-white"
                  >
                    {copied ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-600" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> Copy Link
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Lead Capture CTA Widget */}
              <div className="bg-gradient-to-b from-[#0d0520] to-[#1a0b38] rounded-[24px] p-6 text-white shadow-[0_12px_40px_rgba(13,5,32,0.18)] sticky top-[380px]">
                <h4 className="text-lg font-bold font-['Plus_Jakarta_Sans'] leading-tight">Get a Free Growth Strategy</h4>
                <p className="text-xs text-[#c7a7ff] mt-2">Let our team analyze your website. Enter your email below to schedule a free 30-minute consultation.</p>

                {formState === 'success' ? (
                  <div className="mt-6 text-center bg-white/10 rounded-xl p-5 border border-white/10 animate-[fadeIn_0.3s_ease]">
                    <CheckCircle className="w-10 h-10 text-[#6a00ff] mx-auto mb-2" />
                    <h5 className="font-bold text-sm">Strategy Request Sent!</h5>
                    <p className="text-xs text-[#c7a7ff] mt-1">We will contact you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="mt-6 space-y-3">
                    {/* Honeypot Field */}
                    <div className="hidden">
                      <input 
                        type="text" 
                        name="website" 
                        value={formData.website} 
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })} 
                        placeholder="Website" 
                        tabIndex={-1} 
                        autoComplete="off" 
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none"
                      />
                    </div>
                    <div>
                      <textarea
                        placeholder="Tell us about your project..."
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-white/40 focus:border-[#6a00ff] focus:bg-white/10 transition-all outline-none resize-none"
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full bg-[#6a00ff] hover:bg-[#3b0a75] text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_8px_20px_rgba(106,0,255,0.25)]"
                    >
                      {formState === 'loading' ? 'Sending...' : (
                        <>
                          <Send className="w-3.5 h-3.5" /> Book Growth Discovery
                        </>
                      )}
                    </button>
                    {formState === 'error' && (
                      <p className="text-red-400 text-[10px] text-center mt-1 font-semibold">Failed to send. Please retry.</p>
                    )}
                  </form>
                )}
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Blog CTA Section */}
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] py-16 md:py-24 border-t border-[#ddd0f4]/40">
        <div className="max-w-[800px] mx-auto px-5 text-center">
          <h2 className="text-[32px] md:text-5xl font-semibold text-[#0d0520] leading-[1.1] tracking-[-0.02em] font-['Plus_Jakarta_Sans']">
            Ready to Outrank Your Competitors?
          </h2>
          <p className="text-[17px] text-[#53445f] mt-5 max-w-[580px] mx-auto leading-relaxed">
            Let us design a high-converting web and search strategy tailored specifically to your UK business target.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Button to="/book-appointment">Book Free Consultation</Button>
            <Button variant="secondary" to="/contact">Get in Touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
