import { useState } from 'react';
import { Link } from 'react-router-dom';

interface PortfolioCardProps {
  image: string;
  category?: string;
  title: string;
  businessType?: string;
  description?: string;
  result?: string;
  link?: string;
  className?: string;
}

export default function PortfolioCard({
  image,
  category,
  title,
  businessType,
  description,
  result,
  link = '/work',
  className = '',
}: PortfolioCardProps) {
  const [hovered, setHovered] = useState(false);

  if (businessType) {
    return (
      <div 
        className={`bg-white rounded-[24px] border border-[#ddd0f4] overflow-hidden flex flex-col justify-between hover:shadow-[0_20px_50px_rgba(13,5,32,0.06)] hover:-translate-y-1 transition-all duration-300 ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="aspect-[16/10] overflow-hidden bg-slate-900 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-600 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-4 left-4 bg-[#0d0520]/80 backdrop-blur-[12px] text-white px-3 py-1 rounded-full text-xs font-bold font-['Plus_Jakarta_Sans'] border border-white/10">
            {businessType}
          </div>
        </div>

        <div className="p-6 flex flex-col flex-grow justify-between">
          <div>
            <h4 className="text-xl font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">{title}</h4>
            <p className="text-[#53445f] text-sm mt-3 leading-relaxed font-['Plus_Jakarta_Sans']">{description}</p>
          </div>
          
          <div className="mt-5 pt-4 border-t border-[#ddd0f4]/50">
            <div className="flex items-center gap-2 text-xs font-bold text-[#6a00ff] uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6a00ff] inline-block animate-pulse" />
              <span>Result: {result}</span>
            </div>
            
            <Link 
              to={link}
              className={`inline-flex items-center justify-center w-full py-3.5 rounded-full font-extrabold text-sm transition-all duration-300 ${
                hovered 
                  ? 'bg-[#6a00ff] text-white shadow-[0_12px_30px_rgba(106,0,255,0.24)]' 
                  : 'bg-[#f7f7fa] text-[#0d0520] border border-[#ddd0f4] hover:bg-[#eee7ff]'
              }`}
            >
              View Project &rarr;
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={link}
      className={`relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer group block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(13,5,32,0.75)] via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <span className="text-xs font-medium text-[#6a00ff] uppercase tracking-wider">{category}</span>
        <h4 className="text-lg font-semibold text-[#f7f7fa] mt-1 font-['Plus_Jakarta_Sans']">{title}</h4>
      </div>
      {hovered && (
        <div className="absolute inset-0 flex items-center justify-center bg-[rgba(13,5,32,0.3)] transition-opacity duration-300">
          <span className="text-[#f7f7fa] font-medium text-sm">View Project &rarr;</span>
        </div>
      )}
    </Link>
  );
}
