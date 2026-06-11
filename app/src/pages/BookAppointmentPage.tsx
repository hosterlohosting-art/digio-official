import { useState } from 'react';
import SEO from '../components/SEO';
import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';
import ScrollReveal from '../components/ScrollReveal';
import CharacterScatter from '../components/CharacterScatter';
import { CheckCircle2, CheckCircle } from 'lucide-react';

const inputClass = "w-full bg-white border border-[#ddd0f4] rounded-xl px-5 py-3.5 text-[#0d0520] placeholder:text-[#7d718c] text-sm focus:border-[#6a00ff] focus:shadow-[0_0_20px_rgba(106,0,255,0.15)] transition-all outline-none";
const labelClass = "text-xs font-medium text-[#7d718c] uppercase tracking-wider mb-1.5 block";

export default function BookAppointmentPage() {
  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    phone: '',
    email: '',
    service: 'Website Design',
    budget: 'Under £3,000',
    message: '',
    preferredTime: 'Morning 9-12',
    website: '', // honeypot spam protection
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.website) {
      // If honeypot is filled, simulate success silently
      setStatus('success');
      setFormData({
        name: '',
        businessName: '',
        phone: '',
        email: '',
        service: 'Website Design',
        budget: 'Under £3,000',
        message: '',
        preferredTime: 'Morning 9-12',
        website: '',
      });
      return;
    }

    setStatus('loading');

    try {
      const payload = {
        _subject: 'New Appointment Booking Request',
        name: formData.name,
        businessName: formData.businessName,
        phone: formData.phone,
        email: formData.email,
        service: formData.service,
        budget: formData.budget,
        preferredTime: formData.preferredTime,
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

      if (res1.ok || res2.ok) {
        setStatus('success');
        setFormData({
          name: '',
          businessName: '',
          phone: '',
          email: '',
          service: 'Website Design',
          budget: 'Under £3,000',
          message: '',
          preferredTime: 'Morning 9-12',
          website: '',
        });
      } else {
        setStatus('error');
        setStatusMessage('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setStatus('error');
      setStatusMessage('Network error. Please try calling or emailing us directly.');
    }
  };

  return (
    <>
      <SEO
        title="Book a Free Consultation | Website & Marketing Audit | Digioverse"
        description="Book a free same-day appointment with Digioverse to discuss your website, SEO, digital marketing, branding, or business growth project."
      />

      {/* Hero Section */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-[#f7f7fa] relative overflow-hidden">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12 relative z-10">
          <Breadcrumb current="Book Appointment" />

          <div className="max-w-[850px] mt-6">
            <CharacterScatter
              text="Book Your Free Same-Day Appointment"
              className="text-[40px] sm:text-[50px] md:text-[64px] font-semibold text-[#0d0520] leading-[1.08] tracking-[-0.03em] font-['Plus_Jakarta_Sans']"
              as="h1"
            />
            <ScrollReveal delay={0.2}>
              <p className="text-lg md:text-xl text-[#53445f] mt-6 leading-relaxed font-['Plus_Jakarta_Sans']">
                Speak with Digioverse and get clear advice about your website, marketing, branding, or digital growth plan. No pressure. No confusion. Just honest guidance for your business.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Booking Form + Details */}
      <section className="pb-24 bg-[#f7f7fa]">
        <div className="max-w-[1280px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Form */}
            <div className="lg:col-span-7 bg-white rounded-[28px] border border-[#ddd0f4] p-6 md:p-10 shadow-[0_4px_24px_rgba(13,5,32,0.02)]">
              {status === 'success' ? (
                <ScrollReveal>
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-[rgba(106,0,255,0.08)] text-[#6a00ff] rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Appointment Requested!</h3>
                    <p className="text-sm text-[#53445f] mt-4 leading-relaxed max-w-[450px] mx-auto">
                      Thank you. We have received your discovery session request. One of our UK strategists will review your project details and contact you shortly to confirm your exact meeting time.
                    </p>
                    <button 
                      onClick={() => setStatus('idle')}
                      className="mt-8 text-sm font-semibold text-[#6a00ff] hover:underline"
                    >
                      Need to submit another request? Click here
                    </button>
                  </div>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Honeypot field for spam prevention */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className={labelClass}>Full Name *</label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange}
                        placeholder="John Smith" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label htmlFor="businessName" className={labelClass}>Business Name</label>
                      <input 
                        type="text" 
                        id="businessName" 
                        name="businessName" 
                        value={formData.businessName} 
                        onChange={handleChange}
                        placeholder="e.g. Acme UK Ltd" 
                        className={inputClass} 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className={labelClass}>Phone Number *</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required 
                        value={formData.phone} 
                        onChange={handleChange}
                        placeholder="e.g. 07123 456789" 
                        className={inputClass} 
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email Address *</label>
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        value={formData.email} 
                        onChange={handleChange}
                        placeholder="john@example.co.uk" 
                        className={inputClass} 
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="service" className={labelClass}>Service Needed</label>
                      <select 
                        id="service" 
                        name="service" 
                        value={formData.service} 
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="Website Design">Website Design</option>
                        <option value="SEO">SEO Services</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="Meta Ads">Meta Ads</option>
                        <option value="Branding">Branding & Graphics</option>
                        <option value="Social Media">Social Media</option>
                        <option value="SaaS Development">SaaS Development</option>
                        <option value="Website Maintenance">Website Maintenance</option>
                        <option value="Hosting & Email">Hosting & Email</option>
                        <option value="Not Sure">Not Sure / Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="budget" className={labelClass}>Budget Range</label>
                      <select 
                        id="budget" 
                        name="budget" 
                        value={formData.budget} 
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="Under £3,000">Under £3,000</option>
                        <option value="£3,000-£5,000">£3,000 - £5,000</option>
                        <option value="£5,000-£10,000">£5,000 - £10,000</option>
                        <option value="£10,000-£25,000">£10,000 - £25,000</option>
                        <option value="£25,000+">£25,000+</option>
                        <option value="Discuss on Call">Discuss on Call</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="preferredTime" className={labelClass}>Preferred Appointment Time</label>
                    <select 
                      id="preferredTime" 
                      name="preferredTime" 
                      value={formData.preferredTime} 
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Morning 9-12">Morning (9 AM - 12 PM)</option>
                      <option value="Afternoon 12-3">Afternoon (12 PM - 3 PM)</option>
                      <option value="Evening 3-6">Evening (3 PM - 6 PM)</option>
                      <option value="Any Time">Any Time</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>Tell Us About Your Project *</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      required 
                      value={formData.message} 
                      onChange={handleChange}
                      rows={5}
                      placeholder="Please tell us a bit about your business and what you want to achieve..." 
                      className={`${inputClass} resize-none`} 
                    />
                  </div>

                  {status === 'error' && (
                    <div className="bg-[rgba(239,68,68,0.06)] border border-red-200 rounded-xl p-4 text-xs text-red-600 font-semibold leading-relaxed">
                      {statusMessage}
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    disabled={status === 'loading'}
                    fullWidth
                  >
                    {status === 'loading' ? 'Scheduling...' : 'Schedule My Free Appointment'}
                  </Button>
                </form>
              )}
            </div>

            {/* Right Column: Benefits & Steps */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Benefits */}
              <div className="bg-white rounded-[28px] border border-[#ddd0f4] p-8 shadow-[0_4px_24px_rgba(13,5,32,0.01)]">
                <h3 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mb-6">Discovery Call Benefits</h3>
                <ul className="space-y-4">
                  {[
                    'Free professional website advice',
                    'Bespoke digital marketing & strategy insights',
                    'Tailored service package recommendations',
                    'UK business-focused local guidance',
                    'Immediate actionable improvements for your current site',
                    'Same-day and next-day appointment availability',
                  ].map((benefit) => (
                    <li key={benefit} className="flex gap-3 text-sm text-[#53445f] leading-relaxed items-start">
                      <CheckCircle2 className="w-5 h-5 text-[#6a00ff] shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What Happens Next? */}
              <div className="bg-white rounded-[28px] border border-[#ddd0f4] p-8 shadow-[0_4px_24px_rgba(13,5,32,0.01)]">
                <h3 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans'] mb-6">What Happens Next?</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: '01',
                      title: 'Submit Form',
                      desc: 'Fill out this quick form with your project details and preferred time.',
                    },
                    {
                      step: '02',
                      title: 'Time Confirmation',
                      desc: 'We will confirm your calendar slot via email or WhatsApp within 1 hour.',
                    },
                    {
                      step: '03',
                      title: 'Discovery Meeting',
                      desc: 'We have a friendly, no-pressure chat about your goals and recommend a path.',
                    },
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 items-start">
                      <span className="w-8 h-8 rounded-full bg-[rgba(106,0,255,0.08)] text-[#6a00ff] flex items-center justify-center text-xs font-bold shrink-0">
                        {item.step}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{item.title}</h4>
                        <p className="text-xs text-[#7d718c] mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}
