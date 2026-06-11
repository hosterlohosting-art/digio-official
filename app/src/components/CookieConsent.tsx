import { useState, useEffect } from 'react';
import Button from './Button';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:right-auto md:max-w-md z-[99999] bg-white border border-[#ddd0f4] p-6 rounded-[24px] shadow-[0_20px_50px_rgba(13,5,32,0.15)] animate-[fadeUp_0.5s_ease_forwards]">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-base font-bold text-[#0d0520] font-['Plus_Jakarta_Sans']">Cookie Consent</h3>
          <p className="text-xs text-[#53445f] leading-relaxed mt-2">
            We use cookies to optimize site performance, analyze traffic, and support lead generation tracking. By clicking "Accept All", you agree to our storage of cookies on your device.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="text-xs font-bold text-[#7d718c] hover:text-[#0d0520] border border-[#ddd0f4] hover:border-[#7d718c] px-5 py-2.5 rounded-full transition duration-200"
          >
            Reject All
          </button>
          <Button
            onClick={handleAccept}
            className="text-xs font-bold px-5 py-2.5 rounded-full"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
