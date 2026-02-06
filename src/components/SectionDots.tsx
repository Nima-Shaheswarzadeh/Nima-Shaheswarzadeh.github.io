interface SectionDotsProps {
  activeSection: string;
}

export function SectionDots({ activeSection }: SectionDotsProps) {
  const sections = [
    { id: 'home', title: 'خانه', label: 'رفتن به بخش خانه' },
    { id: 'about', title: 'درباره من', label: 'رفتن به بخش درباره من' },
    { id: 'skills', title: 'مهارت‌ها', label: 'رفتن به بخش مهارت‌ها' },
    { id: 'projects', title: 'پروژه‌ها', label: 'رفتن به بخش پروژه‌ها' },
    { id: 'experience', title: 'تجارب', label: 'رفتن به بخش تجارب' },
    { id: 'contact', title: 'تماس', label: 'رفتن به بخش تماس' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="sectionDots"
      className="fixed right-4 sm:right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-3"
      aria-label="ناوبری بخش‌ها"
    >
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`section-dot ${activeSection === section.id ? 'active' : ''}`}
          data-section={section.id}
          title={section.title}
          aria-label={section.label}
          onClick={(e) => handleClick(e, section.id)}
        >
          <span className="dot-inner"></span>
        </a>
      ))}
    </nav>
  );
}
