import { useState } from 'react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav
      id="navbar"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      role="navigation"
      aria-label="منوی اصلی"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://raw.githubusercontent.com/Nima-Shaheswarzadeh/Nima-Shaheswarzadeh.github.io/main/Picture/Nima%20LOGO.png"
              alt="لوگوی نیما شهسوارزاده"
              className="w-10 h-10 rounded-full object-cover logo-refresh neon-glow"
              onClick={() => location.reload()}
              title="کلیک برای رفرش صفحه"
              loading="lazy"
            />
          </div>

          <div
            id="desktopMenu"
            className="hidden md:flex gap-2 acrylic-blur rounded-full px-6 py-2"
          >
            <a href="#home" className="nav-link relative text-gray-300 hover:text-turquoise transition px-3 py-1">
              خانه
            </a>
            <a href="#about" className="nav-link relative text-gray-300 hover:text-turquoise transition px-3 py-1">
              درباره من
            </a>
            <a href="#skills" className="nav-link relative text-gray-300 hover:text-turquoise transition px-3 py-1">
              مهارت‌ها
            </a>
            <a href="#projects" className="nav-link relative text-gray-300 hover:text-turquoise transition px-3 py-1">
              پروژه‌ها
            </a>
            <a href="#experience" className="nav-link relative text-gray-300 hover:text-turquoise transition px-3 py-1">
              تجارب
            </a>
            <a href="#contact" className="nav-link relative text-gray-300 hover:text-turquoise transition px-3 py-1">
              تماس
            </a>
          </div>

          <button
            id="menuBtn"
            className="md:hidden text-2xl acrylic-blur p-2 rounded-lg"
            aria-label="باز کردن منو"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            id="mobileMenu"
            className="md:hidden mt-4 pb-4 acrylic-blur rounded-2xl"
            role="menu"
          >
            <div className="flex flex-col gap-4 p-4">
              <a
                href="#home"
                className="text-gray-300 hover:text-turquoise transition hover:bg-white/10 px-4 py-2 rounded-lg"
                role="menuitem"
                onClick={handleLinkClick}
              >
                خانه
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-turquoise transition hover:bg-white/10 px-4 py-2 rounded-lg"
                role="menuitem"
                onClick={handleLinkClick}
              >
                درباره من
              </a>
              <a
                href="#skills"
                className="text-gray-300 hover:text-turquoise transition hover:bg-white/10 px-4 py-2 rounded-lg"
                role="menuitem"
                onClick={handleLinkClick}
              >
                مهارت‌ها
              </a>
              <a
                href="#projects"
                className="text-gray-300 hover:text-turquoise transition hover:bg-white/10 px-4 py-2 rounded-lg"
                role="menuitem"
                onClick={handleLinkClick}
              >
                پروژه‌ها
              </a>
              <a
                href="#experience"
                className="text-gray-300 hover:text-turquoise transition hover:bg-white/10 px-4 py-2 rounded-lg"
                role="menuitem"
                onClick={handleLinkClick}
              >
                تجارب
              </a>
              <a
                href="#contact"
                className="text-gray-300 hover:text-turquoise transition hover:bg-white/10 px-4 py-2 rounded-lg"
                role="menuitem"
                onClick={handleLinkClick}
              >
                تماس
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
