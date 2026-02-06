export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 section-animate">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 section-title">
            درباره <span className="gradient-text">من</span>
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full neon-glow"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="fade-in-left">
            <div className="relative rotate-in">
              <div className="absolute inset-0 gradient-bg rounded-2xl transform rotate-6 neon-glow"></div>
              <img
                src="https://raw.githubusercontent.com/Nima-Shaheswarzadeh/Nima-Shaheswarzadeh.github.io/main/Picture/Nima%20Person%209.16.png"
                alt="تصویر نیما شهسوارزاده"
                className="relative rounded-2xl shadow-2xl w-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>

          <div className="fade-in-right">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">یکمی از خودم . . .</h3>
            <p className="text-gray-400 leading-relaxed mb-6 text-sm sm:text-base">
              من یک توسعه‌دهنده و طراح با علاقه به تکنولوژی هستم. علاقه‌مند به یادگیری تکنولوژی‌های جدید و ساختن
              محصولاتی که تجربه کاربری عالی ارائه می‌دهند.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8 text-sm sm:text-base">
              تمرکز اصلی من روی Unity، C# و طراحی گرافیک است. به کار خلاقانه و حل مسائل پیچیده علاقه‌مندم.
            </p>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-8">
              <div className="glass-card p-3 sm:p-4 rounded-xl text-center card-hover">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">+۵</div>
                <div className="text-gray-400 text-xs sm:text-sm">مشتری راضی</div>
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-xl text-center card-hover">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">+۵</div>
                <div className="text-gray-400 text-xs sm:text-sm">پروژه موفق</div>
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-xl text-center card-hover">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">+۱</div>
                <div className="text-gray-400 text-xs sm:text-sm">سال تجربه</div>
              </div>
              <div className="glass-card p-3 sm:p-4 rounded-xl text-center card-hover">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">+۲</div>
                <div className="text-gray-400 text-xs sm:text-sm">جایزه</div>
              </div>
            </div>

            <a
              href="https://raw.githubusercontent.com/Nima-Shaheswarzadeh/Nima-Shaheswarzadeh.github.io/main/Picture/Nima%20Rezome.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 gradient-bg px-6 py-3 rounded-full font-bold hover:opacity-90 transition hover:scale-105 text-sm sm:text-base neon-glow"
            >
              <i className="fas fa-download"></i>
              دانلود رزومه
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
