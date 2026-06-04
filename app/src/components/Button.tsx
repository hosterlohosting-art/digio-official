import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

interface ButtonProps {
  variant?: Variant;
  href?: string;
  to?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
  external?: boolean;
}

export default function Button({
  variant = 'primary',
  href,
  to,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
  external = false,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded-full font-semibold text-[15px] transition-all duration-300 cursor-pointer ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 pointer-events-none' : ''}`;

  const variants: Record<Variant, string> = {
    primary: 'bg-ocean-gradient text-white px-8 py-3.5 shadow-[0_0_40px_rgba(106,0,255,0.2)] hover:shadow-[0_0_60px_rgba(106,0,255,0.35)] hover:-translate-y-0.5',
    secondary: 'border-[1.5px] border-[#6a00ff] text-[#6a00ff] bg-transparent px-8 py-3.5 hover:bg-[rgba(106,0,255,0.08)] hover:border-2',
    tertiary: 'text-[#6a00ff] font-medium text-sm bg-transparent px-0 py-0 group',
    ghost: 'bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.15)] text-[#f7f7fa] px-8 py-3.5 hover:bg-[rgba(255,255,255,0.15)]',
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
        {variant === 'tertiary' && <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
        {children}
        {variant === 'tertiary' && <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
      {variant === 'tertiary' && <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>}
    </button>
  );
}
