import { useEffect, useState } from 'react';

export function HeroSection() {
  const [typingText, setTypingText] = useState('');
  const texts = [
    'علاقمند به تکنولوژی هستم !',
    'طراح وب هستم !',
    'متخصص یونیتی هستم !',
    'آشنا به C# هستم !',
    'گرافیست هستم !',
    'طراح عکس هستم !',
  ];
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = texts[textIndex];

        if (isDeleting) {
          setTypingText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setTypingText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        }

        if (!isDeleting && charIndex === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && charIndex === 0) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

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
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="blob w-72 h-72 bg-cyan-500 top-20 right-20" aria-hidden="true"></div>
      <div className="blob w-96 h-96 bg-teal-400 bottom-20 left-20" style={{ animationDelay: '2s' }} aria-hidden="true"></div>
      <div className="blob w-64 h-64 bg-blue-800 top-1/2 left-1/2" style={{ animationDelay: '4s' }} aria-hidden="true"></div>

      <div className="relative z-10 text-center px-4 sm:px-6">
        <div className="mb-8 scale-in float-animation">
          <img
            src="https://raw.githubusercontent.com/Nima-Shaheswarzadeh/Nima-Shaheswarzadeh.github.io/main/Picture/Nima%20Person%201.1.png"
            alt="عکس پروفایل نیما شهسوارزاده"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mx-auto border-4 border-turquoise shadow-2xl object-cover pulse-animation neon-glow"
            style={{ borderColor: '#00ffd5' }}
            loading="eager"
          />
        </div>

        <p
          className="text-turquoise text-base sm:text-lg mb-4 fade-in neon-text-glow"
          style={{ transitionDelay: '0.2s', color: '#00ffd5' }}
        >
          خوش اومدین ، من
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 fade-in" style={{ transitionDelay: '0.4s' }}>
          <span className="gradient-text">نیما شهسوارزاده</span>
        </h1>

        <div className="text-lg sm:text-xl md:text-2xl text-gray-400 mb-8 h-8 fade-in" style={{ transitionDelay: '0.6s' }}>
          <span className="typing-effect pl-2">{typingText}</span>
        </div>

        <div className="flex gap-4 justify-center mb-12 fade-in" style={{ transitionDelay: '0.8s' }}>
          <button
            onClick={() => {
              if (window.innerWidth < 768) {
                document.getElementById('menuBtn')?.click();
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="gradient-bg px-6 sm:px-8 py-3 rounded-full font-bold hover:opacity-90 transition transform hover:scale-105 text-sm sm:text-base neon-glow"
          >
            <i className="fas fa-bars ml-2"></i>
            بیشتر بدانید
          </button>
        </div>

        <div className="flex gap-3 sm:gap-4 justify-center flex-wrap fade-in" id="hero-social-icons" style={{ transitionDelay: '1s' }}>
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target={link.url.startsWith('http') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="social-icon text-xl sm:text-2xl text-gray-400 hover:text-turquoise"
              title={link.label}
              aria-label={link.label}
            >
              <i className={link.icon}></i>
            </a>
          ))}
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce" aria-hidden="true">
        <i className="fas fa-chevron-down text-2xl" style={{ color: '#00ffd5' }}></i>
      </div>
    </section>
  );
}
