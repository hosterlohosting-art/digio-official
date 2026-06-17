import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbProps {
  current: string;
  parent?: { label: string; href: string };
}

export default function Breadcrumb({ current, parent }: BreadcrumbProps) {
  const { pathname } = useLocation();
  const currentUrl = `https://digioverse.com${pathname}`;

  // Build BreadcrumbList schema
  const itemListElement = [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://digioverse.com/"
    }
  ];

  if (parent) {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": parent.label,
      "item": `https://digioverse.com${parent.href}`
    });
    itemListElement.push({
      "@type": "ListItem",
      "position": 3,
      "name": current,
      "item": currentUrl
    });
  } else {
    itemListElement.push({
      "@type": "ListItem",
      "position": 2,
      "name": current,
      "item": currentUrl
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };

  return (
    <>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <nav className="text-xs text-[#7d718c] uppercase tracking-wider mb-4 font-['Outfit']">
        <Link to="/" className="hover:text-[#6a00ff] transition-colors">Home</Link>
        <span className="mx-2">/</span>
        {parent && (
          <>
            <Link to={parent.href} className="hover:text-[#6a00ff] transition-colors">{parent.label}</Link>
            <span className="mx-2">/</span>
          </>
        )}
        <span className="text-[#53445f] font-semibold">{current}</span>
      </nav>
    </>
  );
}
