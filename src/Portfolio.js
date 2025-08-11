import { useState, useEffect, useRef } from 'react';
import { Mail, ExternalLink, Github, Linkedin, Code, Palette, Database, Globe, Zap, Smartphone } from 'lucide-react';

const Portfolio = () => {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const sectionRefs = useRef({});

  // Loading animation
  useEffect(() => {
    const messages = [
      'Inicializando sistema...',
      'Cargando componentes...',
      'Preparando experiencia...',
      'Compilando código...',
      'Sistema listo!'
    ];

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + 20;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setShowWelcome(true), 500);
          return 100;
        }
        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Intersection observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(sectionRefs.current).forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [showPortfolio]);

  // Stars background effect
  useEffect(() => {
    if (!showPortfolio) return;

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.position = 'fixed';
      star.style.background = '#4c9aff';
      star.style.borderRadius = '50%';
      star.style.pointerEvents = 'none';
      star.style.zIndex = '1';
      star.style.left = Math.random() * 100 + '%';
      star.style.top = Math.random() * 100 + '%';
      star.style.width = Math.random() * 3 + 1 + 'px';
      star.style.height = star.style.width;
      star.style.opacity = Math.random() * 0.5 + 0.2;
      star.style.animation = `starTwinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
      
      document.body.appendChild(star);
      
      setTimeout(() => {
        if (document.body.contains(star)) {
          document.body.removeChild(star);
        }
      }, 10000);
    };

    // Create initial stars
    for (let i = 0; i < 50; i++) {
      setTimeout(createStar, Math.random() * 2000);
    }

    // Continue creating stars
    const starInterval = setInterval(createStar, 500);
    
    return () => clearInterval(starInterval);
  }, [showPortfolio]);

  const handleEnterSite = () => {
    setLoading(false);
    setTimeout(() => setShowPortfolio(true), 300);
  };

  const scrollToSection = (sectionId) => {
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = () => {
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    if (!email || !subject || !message) {
      alert('Por favor completa todos los campos');
      return;
    }

    // Crear el enlace mailto
    const mailtoLink = `mailto:matirom77@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`De: ${email}\n\nMensaje:\n${message}`)}`;
    
    // Abrir el cliente de correo
    window.location.href = mailtoLink;
    
    // Reset form
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';
  };

  const projects = [
    {
      id: 1,
      title: '15 Segundos',
      description: 'Juego de reflejos mentales hecho 100% en React. Pon a prueba tu velocidad de procesamiento mental.',
      icon: '⏱️',
      link: 'https://15-segundos.vercel.app/',
      tech: 'React, CSS3, JavaScript'
    },
    {
      id: 2,
      title: 'Actúa o Muere!',
      description: 'Juego de interpretaciones para grupos de teatro o similares. Hecho en React, también disponible para Android.',
      icon: '🎭',
      link: 'https://actua-o-mori.vercel.app/',
      tech: 'React, PWA, Android'
    },
    {
      id: 3,
      title: 'Este Portfolio',
      description: 'Portfolio web personal con animaciones sutiles, diseño moderno y estilo minimalista desarrollado en React.',
      icon: '✨',
      link: '#',
      tech: 'React, CSS3, Lucide Icons'
    },
    {
      id: 4,
      title: 'Próximo Proyecto',
      description: 'Siempre trabajando en algo nuevo. Mantente atento para ver qué viene después...',
      icon: '🚀',
      link: '#',
      tech: 'Por definir'
    }
  ];

  const skills = [
    { name: 'HTML/CSS', icon: <Globe className="w-8 h-8" />, color: '#e34f26' },
    { name: 'JavaScript', icon: <Zap className="w-8 h-8" />, color: '#f7df1e' },
    { name: 'React', icon: <Code className="w-8 h-8" />, color: '#61dafb' },
    { name: 'PHP/Laravel', icon: <Database className="w-8 h-8" />, color: '#777bb4' },
    { name: 'MySQL', icon: <Database className="w-8 h-8" />, color: '#4479a1' },
    { name: 'UI/UX', icon: <Palette className="w-8 h-8" />, color: '#ff6b6b' }
  ];

  if (loading && !showWelcome) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-96 h-1.5 bg-white/10 rounded-full overflow-hidden mb-6">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="text-slate-300 font-medium">
            {loadingProgress < 20 ? 'Inicializando sistema...' :
             loadingProgress < 40 ? 'Cargando componentes...' :
             loadingProgress < 60 ? 'Preparando experiencia...' :
             loadingProgress < 80 ? 'Compilando código...' :
             'Sistema listo!'}
          </p>
        </div>
      </div>
    );
  }

  if (showWelcome && !showPortfolio) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-6">
            BIENVENIDO A:<br />MATÍAS // DEV1989
          </h1>
          <p className="text-slate-300 mb-8 text-lg">Hola visitante, gracias por pasar 👋</p>
          <button
            onClick={handleEnterSite}
            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            INGRESAR
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <style jsx>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .glass {
          background: rgba(248, 250, 252, 0.08);
          border: 1px solid rgba(248, 250, 252, 0.12);
          backdrop-filter: blur(16px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
        }
        
        .glass-strong {
          background: rgba(248, 250, 252, 0.12);
          border: 1px solid rgba(248, 250, 252, 0.18);
          backdrop-filter: blur(20px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
        }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        .hover-lift {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.25),
            0 0 40px rgba(76, 154, 255, 0.1);
        }
        
        .hover-glow:hover {
          box-shadow: 
            0 0 20px rgba(76, 154, 255, 0.3),
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          border-color: rgba(76, 154, 255, 0.3);
        }
        
        .hover-scale {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-scale:hover {
          transform: scale(1.05);
        }
        
        .hover-float {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-float:hover {
          transform: translateY(-6px);
          filter: brightness(1.1);
        }
        
        .hover-shimmer {
          position: relative;
          overflow: hidden;
        }
        
        .hover-shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          transition: left 0.6s ease;
        }
        
        .hover-shimmer:hover::before {
          left: 100%;
        }
        
        .nav-glass {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.1);
          backdrop-filter: blur(16px) saturate(180%);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .skill-glass {
          background: rgba(30, 41, 59, 0.4);
          border: 1px solid rgba(148, 163, 184, 0.08);
          backdrop-filter: blur(12px);
          box-shadow: 
            0 4px 24px rgba(0, 0, 0, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }
        
        .project-glass {
          background: rgba(51, 65, 85, 0.3);
          border: 1px solid rgba(148, 163, 184, 0.1);
          backdrop-filter: blur(20px) saturate(180%);
          box-shadow: 
            0 8px 32px rgba(0, 0, 0, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="text-center py-20">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 bg-clip-text text-transparent mb-4">
            MATÍAS.EXE
          </h1>
          <p className="text-xl text-slate-300 font-medium max-w-2xl mx-auto">
            Técnico en Desarrollo de Software • Full Stack Developer • Entusiasta del UI/UX 
          </p>
        </header>

        {/* Navigation */}
        <nav className="flex justify-center gap-3 mb-20 flex-wrap">
          {[
            { label: '👤 Sobre mí', id: 'sobre-mi' },
            { label: '🚀 Proyectos', id: 'proyectos' },
            { label: '💻 Skills', id: 'skills' },
            { label: '📧 Contacto', id: 'contacto' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="px-6 py-3 nav-glass rounded-xl hover:bg-blue-500/15 hover:border-blue-400/25 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 hover-float font-medium tracking-wide relative group"
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ))}
        </nav>

        {/* About Section */}
        <section 
          ref={el => sectionRefs.current['sobre-mi'] = el}
          id="sobre-mi" 
          className={`mb-20 transition-all duration-700 ${
            visibleSections.has('sobre-mi') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
            Sobre mí
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-3 rounded-full"></div>
          </h2>
          
          <div className="glass-strong rounded-2xl p-8 hover-lift hover-glow transition-all duration-500 group">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-xl">👨‍💻</span>
                </div>
              </div>
              
              <p className="text-lg text-slate-300 leading-relaxed">
                Soy <span className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors duration-200">Técnico en Desarrollo de Software</span>, apasionado por
                crear experiencias digitales funcionales y estéticamente atractivas que resuelvan problemas reales.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Me especializo en desarrollo full-stack con énfasis en React, PHP/Laravel y diseño de interfaces de usuario.
              </p>
              <blockquote className="text-xl text-blue-400 font-medium italic border-l-4 border-blue-400/50 pl-6 py-4 bg-blue-400/5 rounded-r-xl hover:bg-blue-400/10 hover:border-blue-400 transition-all duration-300 hover-shimmer">
                "El código es el puente entre las ideas y la realidad."
              </blockquote>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section 
          ref={el => sectionRefs.current['proyectos'] = el}
          id="proyectos" 
          className={`mb-20 transition-all duration-700 ${
            visibleSections.has('proyectos') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
            Proyectos
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-3 rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="project-glass rounded-2xl p-6 hover-lift hover-glow transition-all duration-500 cursor-pointer group hover-shimmer"
                onClick={() => project.link !== '#' && window.open(project.link, '_blank')}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4 bg-gradient-to-br from-blue-400/20 to-purple-500/20 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 border border-white/10">
                  {project.icon}
                </div>
                
                <h3 className="text-xl font-semibold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-slate-300 mb-4 leading-relaxed group-hover:text-slate-200 transition-colors duration-200">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400 font-medium px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50">
                    {project.tech}
                  </span>
                  
                  {project.link !== '#' && (
                    <div className="flex items-center gap-2 text-emerald-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                      <span className="text-sm font-medium">Ver proyecto</span>
                      <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
                    </div>
                  )}
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section 
          ref={el => sectionRefs.current['skills'] = el}
          id="skills" 
          className={`mb-20 transition-all duration-700 ${
            visibleSections.has('skills') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
            Skills
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-3 rounded-full"></div>
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-glass rounded-xl p-6 text-center hover-float hover-glow transition-all duration-400 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-3 flex justify-center group-hover:scale-125 transition-all duration-300 group-hover:rotate-6" style={{ color: skill.color }}>
                  {skill.icon}
                </div>
                <h3 className="font-semibold text-white group-hover:text-slate-100 transition-colors duration-200">{skill.name}</h3>
                <div className="w-full h-1 bg-slate-700/50 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-out"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section 
          ref={el => sectionRefs.current['contacto'] = el}
          id="contacto" 
          className={`mb-20 transition-all duration-700 ${
            visibleSections.has('contacto') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-blue-400">
            Contacto
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto mt-3 rounded-full"></div>
          </h2>
          
          <div className="max-w-2xl mx-auto">
            <div className="glass-strong rounded-2xl p-8 hover-glow transition-all duration-500">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    required
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 hover:border-slate-400/20 transition-all duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Asunto
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    required
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 hover:border-slate-400/20 transition-all duration-300"
                    placeholder="¿De que querész hablar?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-white mb-2">
                    Mensaje
                  </label>
                  <textarea
                    id="contact-message"
                    rows="5"
                    required
                    className="w-full px-4 py-3 glass rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 hover:border-slate-400/20 transition-all duration-300 resize-vertical"
                    placeholder="Escribí tu mensaje acá..."
                  />
                </div>
                
                <button
                  onClick={handleSubmit}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-2 group"
                >
                  <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                  Enviar Mensaje
                </button>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-slate-400 mb-4">También podes encontrarme en:</p>
                <div className="flex justify-center gap-4">
                  <a
                    href="mailto:matirom77@gmail.com"
                    className="nav-glass p-4 rounded-xl hover:bg-blue-500/15 hover:border-blue-400/30 hover:scale-110 transition-all duration-300 group"
                  >
                    <Mail className="w-5 h-5 group-hover:text-blue-400 transition-colors duration-200" />
                  </a>
                  <a
                    href="https://github.com/chkx77/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-glass p-4 rounded-xl hover:bg-purple-500/15 hover:border-purple-400/30 hover:scale-110 transition-all duration-300 group"
                  >
                    <Github className="w-5 h-5 group-hover:text-purple-400 transition-colors duration-200" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/matias-romero-838925373/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-glass p-4 rounded-xl hover:bg-emerald-500/15 hover:border-emerald-400/30 hover:scale-110 transition-all duration-300 group"
                  >
                    <Linkedin className="w-5 h-5 group-hover:text-emerald-400 transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-slate-400">
          <p>&copy; 2025 MATÍAS // DEV1990. Hecho con ❤️ y React.</p>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;