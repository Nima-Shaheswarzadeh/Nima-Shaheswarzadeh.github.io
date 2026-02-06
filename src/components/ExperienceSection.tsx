export function ExperienceSection() {
  const experiences = [
    {
      title: 'IR Streets',
      company: 'Unami',
      year: '۱۴۰۴',
      description:
        'بازی ایرانی «خیابان‌های ایران» تولیدشده در استودیو بازی‌سازی یونامی، با هدف شرکت در رقابت بازی‌سازان ایرانی و کمک به پیشرفت صنعت ملی گیم ساخته شده است.',
    },
    {
      title: 'Game Nub',
      company: 'افزونه‌های گیم ناب',
      year: '۱۴۰۳ تا ۱۴۰۴',
      description: 'ساخت افزونه‌های سفارشی برای سایت گیم ناب',
    },
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 px-4 sm:px-6 section-animate">
      <div className="max-w-4xl mx-auto">
        <div className="fade-in text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 section-title">
            تجربه‌های <span className="gradient-text">کاری</span>
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full neon-glow"></div>
        </div>

        <div className="relative">
          <div
            className="absolute right-4 sm:right-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-blue-800"
            style={{ background: 'linear-gradient(to bottom, #00ffd5, #1e3a5f)' }}
            aria-hidden="true"
          ></div>

          <div className="space-y-10 sm:space-y-12">
            {experiences.map((exp, index) => (
              <article
                key={index}
                className="fade-in-right relative pr-12 sm:pr-16"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div
                  className="absolute right-2 sm:right-4 w-5 h-5 rounded-full gradient-bg border-4 border-gray-900 pulse-animation neon-glow"
                  aria-hidden="true"
                ></div>
                <div className="glass-card p-4 sm:p-6 rounded-2xl card-hover">
                  <div className="flex flex-wrap justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg sm:text-xl font-bold">{exp.title}</h3>
                    <span style={{ color: '#00ffd5' }} className="text-xs sm:text-sm">
                      {exp.year}
                    </span>
                  </div>
                  <p className="mb-3 text-sm sm:text-base" style={{ color: '#3a6ea5' }}>
                    {exp.company}
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base">{exp.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
