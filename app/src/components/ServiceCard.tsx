import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: string;
  tags?: string[];
  className?: string;
}

export default function ServiceCard({ icon: Icon, title, description, link = '/services', tags, className = '' }: ServiceCardProps) {
  return (
    <div className={`bg-white rounded-[20px] p-8 shadow-[0_4px_24px_rgba(13,5,32,0.06)] hover:shadow-[0_8px_40px_rgba(13,5,32,0.1)] hover:-translate-y-1 hover:border-[#6a00ff] border border-transparent transition-all duration-300 group ${className}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
      <div className="w-14 h-14 rounded-2xl bg-[rgba(106,0,255,0.1)] flex items-center justify-center">
        <Icon className="w-7 h-7 text-[#6a00ff] group-hover:scale-105 transition-transform" />
      </div>
      <h3 className="text-2xl font-semibold text-[#0d0520] mt-5 font-['Plus_Jakarta_Sans']">{title}</h3>
      <p className="text-[#53445f] mt-3 text-base leading-relaxed">{description}</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={tag} className="text-xs font-medium text-[#6a00ff] bg-[rgba(106,0,255,0.1)] px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      )}
      <Link to={link} className="inline-flex items-center gap-1 text-sm font-medium text-[#6a00ff] mt-5 group/link">
        Learn More <span className="transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
      </Link>
    </div>
  );
}
