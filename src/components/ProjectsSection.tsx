import { useState } from 'react';

export function ProjectsSection() {
  const [activeTab, setActiveTab] = useState('project1');

  const projects = [
    {
      id: 'project1',
      title: 'SMART HTML Viewer',
      description: 'بیننده پیشرفته فایل اچ تی ام ال هوشمند',
      image: 'https://raw.githubusercontent.com/Nima-Shaheswarzadeh/SMART-HTML-Viewer/main/Welcome-Page/Welcome-Page.jpeg',
      link: 'https://github.com/Nima-Shaheswarzadeh/SMART-HTML-Viewer/blob/main/Welcome-Page/Welcome-Page.html',
      tabLabel: 'پروژه اول',
    },
    {
      id: 'project2',
      title: 'Smartule Weekly Schedule',
      description: 'برنامه هفتگی پیشرفته هوشمند',
      image: 'https://raw.githubusercontent.com/Nima-Shaheswarzadeh/Smartule-weekly-schedule/main/Welcome%20Page/Welcome-Page.jpeg',
      link: '#',
      tabLabel: 'پروژه دوم',
    },
    {
      id: 'project3',
      title: 'پروژه تستی شماره ۳',
      description: 'این یک پروژه تستی است که به زودی تکمیل خواهد شد.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600',
      link: '#',
      tabLabel: 'پروژه سوم',
    },
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 px-4 sm:px-6 section-animate">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 section-title">
            پروژه‌های <span className="gradient-text">من</span>
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full neon-glow"></div>
        </div>

        <div className="fade-in flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap" role="tablist">
          {projects.map((project) => (
            <button
              key={project.id}
              className={`project-tab px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gray-800/50 font-bold transition hover:scale-105 text-sm sm:text-base ${
                activeTab === project.id ? 'active' : ''
              }`}
              onClick={() => setActiveTab(project.id)}
              role="tab"
              aria-selected={activeTab === project.id}
            >
              {project.tabLabel}
            </button>
          ))}
        </div>

        <div className="scale-in">
          {projects.map((project) => (
            <article
              key={project.id}
              className={`${activeTab === project.id ? 'block' : 'hidden'}`}
              role="tabpanel"
            >
              <div className="glass-card rounded-2xl overflow-hidden max-w-2xl mx-auto card-hover">
                <img src={project.image} alt={project.title} className="w-full h-48 sm:h-64 object-cover" loading="lazy" />
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-6 text-sm sm:text-base">{project.description}</p>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 gradient-bg px-5 sm:px-6 py-2 sm:py-3 rounded-full font-bold hover:opacity-90 transition hover:scale-105 text-sm sm:text-base neon-glow"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    رفتن به پروژه
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
