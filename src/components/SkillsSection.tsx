export function SkillsSection() {
  const technicalSkills = [
    { name: 'HTML', percentage: '30%' },
    { name: 'CSS / JavaScript', percentage: '40%' },
    { name: 'Python', percentage: '50%' },
    { name: 'C# / Unity', percentage: '60%' },
    { name: 'Photoshop / ai', percentage: '70%' },
    { name: 'Scratch', percentage: '80%' },
    { name: 'Visual Studio / VS Code', percentage: '90%' },
  ];

  const tools = [
    { icon: 'fab fa-html5', color: 'text-orange-500', name: 'HTML' },
    { icon: 'fab fa-css3-alt', color: 'text-blue-400', name: 'CSS' },
    { icon: 'fab fa-js', color: 'text-yellow-400', name: 'JavaScript' },
    { icon: 'fab fa-python', color: 'text-blue-300', name: 'Python' },
    { icon: 'fas fa-code', color: '', name: 'C# / Unity', style: { color: '#00ffd5' } },
    { icon: 'fas fa-image', color: 'text-blue-500', name: 'Photoshop' },
    { icon: 'fas fa-robot', color: 'text-purple-400', name: 'AI' },
    { icon: 'fab fa-github', color: 'text-gray-300', name: 'GitHub' },
    { icon: 'fab fa-unity', color: 'text-gray-300', name: 'Unity' },
    { icon: 'fas fa-cat', color: 'text-orange-400', name: 'Scratch' },
    { icon: 'fas fa-laptop-code', color: 'text-purple-500', name: 'Visual Studio' },
    { icon: 'fas fa-file-code', color: 'text-blue-500', name: 'VS Code' },
  ];

  return (
    <section id="skills" className="py-16 sm:py-20 px-4 sm:px-6 section-animate">
      <div className="max-w-6xl mx-auto">
        <div className="fade-in text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 section-title">
            مهارت‌های <span className="gradient-text">من</span>
          </h2>
          <div className="w-24 h-1 gradient-bg mx-auto rounded-full neon-glow"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12">
          <div className="fade-in-left">
            <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-code" style={{ color: '#00ffd5' }}></i>
              مهارت‌های فنی
            </h3>

            <div className="space-y-5 sm:space-y-6">
              {technicalSkills.map((skill, index) => (
                <div key={index} className="scale-in" style={{ transitionDelay: `${(index + 1) * 0.1}s` }}>
                  <div className="flex justify-between mb-2 text-sm sm:text-base">
                    <span>{skill.name}</span>
                    <span style={{ color: '#00ffd5' }}>{skill.percentage}</span>
                  </div>
                  <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    <div className="skill-bar h-full gradient-bg rounded-full" data-width={skill.percentage}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in-right">
            <h3 className="text-lg sm:text-xl font-bold mb-6 flex items-center gap-2">
              <i className="fas fa-tools" style={{ color: '#00ffd5' }}></i>
              ابزارها و تکنولوژی‌ها
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="glass-card p-3 sm:p-4 rounded-xl text-center card-hover scale-in"
                  style={{ transitionDelay: `${(index + 1) * 0.05}s` }}
                >
                  <i className={`${tool.icon} text-3xl sm:text-4xl ${tool.color} mb-2`} style={tool.style}></i>
                  <div className="text-xs sm:text-sm">{tool.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
