export function ContactSection() {
  const contacts = [
    {
      icon: 'fas fa-envelope',
      title: 'ایمیل',
      value: 'Nima.Shaheswarzadeh@gmail.com',
      link: 'mailto:Nima.Shaheswarzadeh@gmail.com',
      label: 'ارسال ایمیل',
    },
    {
      icon: 'fas fa-phone',
      title: 'تلفن',
      value: '۰۹۳۷۱۱۶۴۰۲۵',
      link: 'tel:09371164025',
      label: 'تماس تلفنی',
    },
    {
      icon: 'fab fa-telegram',
      title: 'تلگرام',
      value: '@Nima_Shaheswarzadeh',
      link: 'https://t.me/Nima_Shaheswarzadeh',
      label: 'تلگرام',
    },
    {
      icon: 'fab fa-whatsapp',
      title: 'واتساپ',
      value: '+98 937 116 4025',
      link: 'https://wa.me/989371164025',
      label: 'واتساپ',
    },
    {
      icon: 'fab fa-github',
      title: 'گیت‌هاب',
      value: 'github.com/Nima-Shaheswarzadeh',
      link: 'https://github.com/Nima-Shaheswarzadeh',
      label: 'گیت‌هاب',
    },
  ];

  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 section-animate">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 section-title">
            تماس با <span className="gradient-text">من</span>
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full neon-glow"></div>
          <p className="text-gray-400 mt-6 text-sm sm:text-base">
            آماده همکاری در پروژه‌های جدید هستم. با من در ارتباط باشید!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="fade-in-left order-2 md:order-1">
            <img
              src="https://raw.githubusercontent.com/Nima-Shaheswarzadeh/Nima-Shaheswarzadeh.github.io/main/Picture/Nima%20Card.png"
              alt="کارت ویزیت نیما شهسوارزاده"
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto hover:scale-105 transition-transform duration-500 float-animation neon-glow"
              loading="lazy"
            />
          </div>

          <div className="fade-in-right order-1 md:order-2">
            <div className="space-y-4 sm:space-y-6">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={contact.link}
                  target={contact.link.startsWith('http') ? '_blank' : undefined}
                  rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-3 sm:gap-4 glass-card p-3 sm:p-4 rounded-xl card-hover"
                  aria-label={contact.label}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 gradient-bg rounded-full flex items-center justify-center flex-shrink-0 neon-glow">
                    <i className={`${contact.icon} text-xl sm:text-2xl`}></i>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base">{contact.title}</h3>
                    <span className="text-gray-400 text-xs sm:text-sm break-all">{contact.value}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
