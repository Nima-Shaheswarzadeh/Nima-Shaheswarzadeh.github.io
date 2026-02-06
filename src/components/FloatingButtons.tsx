import { useState } from 'react';

interface FloatingButtonsProps {
  showScrollTop: boolean;
}

export function FloatingButtons({ showScrollTop }: FloatingButtonsProps) {
  const [contactsVisible, setContactsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleContacts = () => {
    setContactsVisible(!contactsVisible);
  };

  const socialLinks = [
    { icon: 'fas fa-comment-dots', url: 'https://eitaa.com/Nima_Shaheswarzadeh', label: 'ایتا' },
    { icon: 'fab fa-telegram', url: 'https://t.me/Nima_Shaheswarzadeh', label: 'تلگرام' },
    { icon: 'fab fa-whatsapp', url: 'https://wa.me/989371164025', label: 'واتساپ' },
    { icon: 'fas fa-envelope', url: 'mailto:Nima.Shaheswarzadeh@gmail.com', label: 'ایمیل' },
    { icon: 'fab fa-github', url: 'https://github.com/Nima-Shaheswarzadeh', label: 'گیت‌هاب' },
    { icon: 'fas fa-heart', url: 'https://daramet.com/Nima-Sh', label: 'حمایت مالی' },
    { icon: 'fas fa-phone', url: 'tel:09371164025', label: 'تماس' },
  ];

  return (
    <div className="fixed bottom-6 left-6 sm:bottom-8 sm:left-8 z-50 flex flex-col items-start gap-3">
      {/* Contact buttons - vertical stack from bottom */}
      <div
        className="flex flex-col-reverse gap-2 transition-all duration-500 ease-out"
        style={{
          opacity: contactsVisible ? 1 : 0,
          transform: contactsVisible ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: contactsVisible ? 'auto' : 'none',
        }}
      >
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : undefined}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="w-10 h-10 sm:w-12 sm:h-12 acrylic-blur-light rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg neon-glow"
            aria-label={link.label}
            title={link.label}
            style={{
              transitionDelay: contactsVisible ? `${index * 50}ms` : '0ms',
            }}
          >
            <i className={`${link.icon} text-white text-sm sm:text-base`}></i>
          </a>
        ))}
      </div>

      {/* Main buttons container */}
      <div className="flex flex-col gap-2">
        {/* Collaboration button - rectangular */}
        <a
          href="#contact"
          className="acrylic-blur-light rounded-full px-4 py-2 flex items-center justify-center transition-all duration-300 hover:scale-105 shadow-lg neon-glow"
          style={{
            width: 'calc(2 * (2.5rem + 0.5rem))', // Two 10px buttons + gap
          }}
          aria-label="همکاری"
          title="همکاری"
        >
          <span
            className="text-white text-sm sm:text-base font-bold transition-all duration-300"
            style={{
              opacity: 1,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = '0 0 10px rgba(0, 255, 213, 0.8), 0 0 20px rgba(0, 255, 213, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
            }}
          >
            همکاری
          </span>
        </a>

        {/* Circular buttons container */}
        <div className="flex gap-2">
          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className={`w-10 h-10 sm:w-12 sm:h-12 acrylic-blur-light rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg neon-glow ${
              showScrollTop ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
            aria-label="برگشت به بالا"
            title="برگشت به بالا"
          >
            <i className="fas fa-arrow-up text-white"></i>
          </button>

          {/* Contact toggle button */}
          <button
            onClick={toggleContacts}
            className="w-10 h-10 sm:w-12 sm:h-12 acrylic-blur-light rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg neon-glow"
            aria-label="نمایش/پنهان کردن راه‌های ارتباطی"
            title="راه‌های ارتباطی"
            aria-expanded={contactsVisible}
          >
            <i className={`fas ${contactsVisible ? 'fa-times' : 'fa-envelope'} text-white`}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
