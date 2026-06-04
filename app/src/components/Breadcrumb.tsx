import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  current: string;
}

export default function Breadcrumb({ current }: BreadcrumbProps) {
  return (
    <nav className="text-xs text-[#7d718c] uppercase tracking-wider mb-4">
      <Link to="/" className="hover:text-[#6a00ff] transition-colors">Home</Link>
      <span className="mx-2">/</span>
      <span>{current}</span>
    </nav>
  );
}
