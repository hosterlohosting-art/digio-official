import Breadcrumb from '../components/Breadcrumb';
import Button from '../components/Button';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

const content = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'How Digioverse (trading as DIGIOVERSE LTD, registered in England and Wales under company number 17236340) handles enquiries, project information, and website data.',
    sections: [
      ['Information we collect', 'We collect details you submit through forms, including name, email, phone, company, service interest, budget, and project notes.'],
      ['How we use it', 'We use this information to respond to enquiries, prepare proposals, deliver services, improve our website, and maintain client communication.'],
      ['Client & Niche Specific Policies', 'Please note that our specific operational policies, delivery terms, and service agreements differ for every client. They are tailored according to their industry niche, business requirements, and the explicit project scopes discussed and agreed upon during onboarding.'],
      ['Data sharing', 'We do not sell personal data. We may use trusted service providers for hosting, analytics, email, and project delivery where needed.'],
      ['Your rights', 'You can request access, correction, or deletion of your personal information by contacting support@digioverse.com.'],
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'The basic terms for using the Digioverse website and starting a project with DIGIOVERSE LTD (Company Number: 17236340).',
    sections: [
      ['Website use', 'This website is provided for general information about Digioverse services, products, and contact options.'],
      ['Project proposals', 'Any pricing, timelines, or deliverables become binding only when confirmed in a written proposal or agreement.'],
      ['Intellectual property', 'Digioverse content, visuals, layouts, and brand assets may not be copied or reused without permission.'],
      ['Contact', 'For questions about these terms, contact support@digioverse.com.'],
    ],
  },
};

export default function LegalPage({ type }: LegalPageProps) {
  const page = content[type];

  return (
    <>
      <section className="bg-gradient-to-b from-[#f7f7fa] to-[#eee7ff] pt-36 pb-20">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 lg:px-12">
          <Breadcrumb current={page.title} />
          <span className="mt-8 inline-block text-xs font-extrabold uppercase tracking-wide text-[#6a00ff]">Digioverse</span>
          <h1 className="mt-4 text-[42px] md:text-[68px] leading-[1.02] font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">{page.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-[#53445f]">{page.intro}</p>
        </div>
      </section>

      <section className="bg-[#f7f7fa] py-16 md:py-24">
        <div className="max-w-[960px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="space-y-5">
            {page.sections.map(([title, body]) => (
              <div key={title} className="rounded-[24px] bg-white border border-[#ddd0f4] p-7 shadow-[0_10px_30px_rgba(13,5,32,0.05)]">
                <h2 className="text-xl font-extrabold text-[#0d0520] font-['Plus_Jakarta_Sans']">{title}</h2>
                <p className="mt-3 leading-relaxed text-[#53445f]">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Button to="/contact">Contact Digioverse</Button>
          </div>
        </div>
      </section>
    </>
  );
}
