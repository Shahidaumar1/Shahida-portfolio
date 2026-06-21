import { useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let W, H;
    const particles = [];
    const COLORS = ['rgba(124,58,237,', 'rgba(6,182,212,', 'rgba(167,139,250,'];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 2 + 0.5,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.fill();
      });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(124,58,237,' + 0.15 * (1 - dist / 120) + ')';
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // 3D Card tilt
  useEffect(() => {
    const cards = document.querySelectorAll('.card-3d');
    cards.forEach((card) => {
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
      };
      const onLeave = () => { card.style.transform = ''; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });
  }, []);

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <canvas id="bg-canvas" ref={canvasRef}></canvas>

      {/* NAV */}
      <nav>
        <div className="nav-logo">SB</div>
        <div className="nav-links">
          <a onClick={() => scrollTo('#about')}>About</a>
          <a onClick={() => scrollTo('#skills')}>Skills</a>
          <a onClick={() => scrollTo('#experience')}>Experience</a>
          <a onClick={() => scrollTo('#projects')}>Projects</a>
          <a onClick={() => scrollTo('#contact')}>Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero">
        <div className="hero-inner reveal">
          <div className="hero-tag">✦ Full Stack Developer</div>
          <h1 className="hero-name"><span>Shahida Bibi</span></h1>
          <p className="hero-title">
            PHP Laravel Developer &amp; WordPress Expert<br />
            Building scalable web apps with modern tech stack
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('#projects')}>View Projects</button>
            <button className="btn-outline" onClick={() => scrollTo('#contact')}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="section-title reveal">
          <h2>About Me</h2>
          <div className="title-line"></div>
        </div>
        <div className="about-grid reveal">
          <div style={{ textAlign: 'center' }}>
            <div className="about-avatar">SB</div>
          </div>
          <div className="about-text">
            <h2>Hello, I'm Shahida 👋</h2>
            <p>Results-driven Full Stack Web Developer with 3+ years of experience. I specialize in building modern, responsive interfaces and powerful backends using PHP, Laravel, and MySQL.</p>
            <p>I've delivered multiple live projects for UK-based clients and focus on clean, optimized, and user-friendly solutions.</p>
            <div className="about-stats">
              <div className="stat"><div className="stat-num">3+</div><div className="stat-label">Years Exp</div></div>
              <div className="stat"><div className="stat-num">10+</div><div className="stat-label">Projects</div></div>
              <div className="stat"><div className="stat-num">4</div><div className="stat-label">Certificates</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills">
        <div className="section-title reveal">
          <h2>Tech Stack</h2>
          <p>Technologies I work with</p>
          <div className="title-line"></div>
        </div>
        <div className="skills-grid reveal">
          {['PHP','Laravel','JavaScript','React','Vue.js','Node.js','MySQL','HTML5','CSS3','Bootstrap','jQuery','WordPress','Livewire','REST API','C++','GitHub'].map((s, i) => (
            <div key={i} className={`skill-pill${i % 2 === 0 ? ' violet' : ''}`}>{s}</div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience">
        <div className="section-title reveal">
          <h2>Experience</h2>
          <p>My professional journey</p>
          <div className="title-line"></div>
        </div>
        <div className="exp-wrapper">

          <div className="exp-card reveal">
            <div className="exp-header">
              <div className="exp-left">
                <div className="exp-role">Full Stack PHP Laravel Developer</div>
                <div className="exp-company">Soft Access Pvt Ltd — Lahore, Pakistan</div>
              </div>
              <div className="exp-badge">1.5 Years • Current</div>
            </div>
            <div className="exp-duration-bar">
              <div className="exp-duration-label"><span>Duration</span><span>1.5 Years</span></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: '100%' }}></div></div>
            </div>
            <ul className="exp-points">
              <li>Developed and maintained multiple live web applications for UK-based clients using Laravel &amp; Livewire</li>
              <li>Built scalable RESTful APIs and backend systems with PHP, Laravel, and MySQL</li>
              <li>Delivered 6+ production-level projects including House of Gadgets, HEX Halifax, Phone Syndicate, and more</li>
              <li>Implemented dynamic service listings, booking systems, POS, and admin panels</li>
              <li>Collaborated with cross-functional teams for UI/UX improvements and performance optimization</li>
            </ul>
            <div className="exp-tech">
              {['Laravel','PHP','Livewire','MySQL','REST API','JavaScript','HTML/CSS'].map((t, i) => <span key={i}>{t}</span>)}
            </div>
          </div>

          <div className="exp-card reveal">
            <div className="exp-header">
              <div className="exp-left">
                <div className="exp-role">Frontend Developer</div>
                <div className="exp-company">Freelance &amp; Projects</div>
              </div>
              <div className="exp-badge">2 Years</div>
            </div>
            <div className="exp-duration-bar">
              <div className="exp-duration-label"><span>Duration</span><span>2 Years</span></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: '100%' }}></div></div>
            </div>
            <ul className="exp-points">
              <li>Built responsive, mobile-first UIs using HTML5, CSS3, Bootstrap, JavaScript, and jQuery</li>
              <li>Developed interactive web pages with modern design patterns and animations</li>
              <li>Created personal portfolio, freelance landing pages, and educational websites</li>
              <li>Ensured cross-browser compatibility and optimized page performance</li>
            </ul>
            <div className="exp-tech">
              {['HTML5','CSS3','JavaScript','Bootstrap','jQuery','React'].map((t, i) => <span key={i}>{t}</span>)}
            </div>
          </div>

          <div className="exp-card reveal">
            <div className="exp-header">
              <div className="exp-left">
                <div className="exp-role">WordPress Developer</div>
                <div className="exp-company">Freelance Projects</div>
              </div>
              <div className="exp-badge">1 Year</div>
            </div>
            <div className="exp-duration-bar">
              <div className="exp-duration-label"><span>Duration</span><span>1 Year</span></div>
              <div className="bar-track"><div className="bar-fill" style={{ width: '60%' }}></div></div>
            </div>
            <ul className="exp-points">
              <li>Developed and customized WordPress websites with custom themes and plugins</li>
              <li>Managed content, SEO optimization, and website maintenance for clients</li>
              <li>Certified in WordPress Development from DigiSkills.pk</li>
            </ul>
            <div className="exp-tech">
              {['WordPress','PHP','CSS','Elementor'].map((t, i) => <span key={i}>{t}</span>)}
            </div>
          </div>

        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-title reveal">
          <h2>Projects</h2>
          <p>Live and real-world applications</p>
          <div className="title-line"></div>
        </div>
        <div className="projects-grid">
          {[
            { icon: '🔧', title: 'House of Gadgets', live: true, desc: 'Repair service web app with dynamic service listings and booking functionality for UK market.', tags: ['Laravel','Livewire','MySQL'], link: 'https://houseofgadgets.co.uk/' },
            { icon: '🏢', title: 'HEX Halifax', live: true, desc: 'Business website with responsive design, clean UI, and optimized performance.', tags: ['Laravel','Livewire','PHP'], link: 'https://www.hexhalifax.co.uk/' },
            { icon: '📱', title: 'Phone Syndicate', live: true, desc: 'Repair service platform with smooth UX and scalable Laravel Livewire backend.', tags: ['Laravel','Livewire','MySQL'], link: 'https://phonesyndicate.co.uk/' },
            { icon: '📲', title: 'Phone Labs Burnley', live: true, desc: 'Mobile repair website with interactive UI and service-based functionality.', tags: ['Laravel','Livewire','JS'], link: 'https://phonelabsburnley.co.uk/' },
            { icon: '🛍️', title: 'Qaswa', live: true, desc: 'Business website with responsive layout and structured content using Laravel Livewire.', tags: ['Laravel','Livewire','MySQL'], link: 'https://qaswa.co.uk/' },
            { icon: '🔩', title: 'Repairs Hub', live: true, desc: 'Repair service web app with scalable structure and user-friendly interface.', tags: ['Laravel','Livewire','PHP'], link: 'https://repairshub.co.uk/' },
            { icon: '🛒', title: 'POS Web Application', live: false, desc: 'System for managing products, sales, billing, and transactions with full admin panel.', tags: ['Laravel','PHP','MySQL'] },
            { icon: '🎓', title: 'Spark Institute', live: false, desc: 'Educational platform with authentication, course management, fee tracking, and admin panel.', tags: ['PHP','MySQL','Bootstrap'] },
          ].map((p, i) => (
            <div key={i} className="project-card card-3d reveal">
              <div className="project-icon">{p.icon}</div>
              <div className="project-title">
                {p.title} {p.live && <span className="live-badge">LIVE</span>}
              </div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">{p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
              {p.link && <a href={p.link} className="project-link" target="_blank" rel="noreferrer">🔗 {p.link.replace('https://','').replace('www.','')}</a>}
            </div>
          ))}
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education">
        <div className="section-title reveal"><h2>Education</h2><div className="title-line"></div></div>
        <div className="certs-grid" style={{ maxWidth: 800, margin: '0 auto' }}>
          {[
            { icon: '🎓', name: 'BS Software Engineering', org: 'Virtual University of Pakistan • Expected 2027' },
            { icon: '📘', name: 'F.Sc Pre-Engineering', org: 'BISE Faisalabad • 2019 • 592/1100' },
            { icon: '📗', name: 'Matriculation Science', org: 'BISE Faisalabad • 2017 • 769/1100' },
          ].map((e, i) => (
            <div key={i} className="cert-card reveal">
              <div className="cert-icon">{e.icon}</div>
              <div><div className="cert-name">{e.name}</div><div className="cert-org">{e.org}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certs">
        <div className="section-title reveal"><h2>Certificates</h2><div className="title-line"></div></div>
        <div className="certs-grid reveal">
          {[
            { icon: '🏅', name: 'Full Stack Web Development', org: 'NAVTTC' },
            { icon: '🏅', name: 'WordPress Development', org: 'DigiSkills.pk' },
            { icon: '🏅', name: 'Freelancing Skills', org: 'DigiSkills.pk' },
            { icon: '🏅', name: 'C++ Programming', org: 'Cisco Networking Academy' },
          ].map((c, i) => (
            <div key={i} className="cert-card">
              <div className="cert-icon">{c.icon}</div>
              <div><div className="cert-name">{c.name}</div><div className="cert-org">{c.org}</div></div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <div className="contact-inner">
          <div className="section-title reveal">
            <h2>Get In Touch</h2>
            <p>Ready to work together? Let's connect!</p>
            <div className="title-line"></div>
          </div>
          <div className="contact-links reveal">
            <a className="contact-item" href="mailto:shahidaumarflp@gmail.com">📧 shahidaumarflp@gmail.com</a>
            <a className="contact-item" href="tel:+923435548204">📱 +92 343 5548204</a>
            <a className="contact-item" href="https://github.com/Shahidaumar1" target="_blank" rel="noreferrer">🐙 GitHub</a>
            <a className="contact-item" href="https://short-link.me/13hAO" target="_blank" rel="noreferrer">💼 LinkedIn</a>
            <div className="contact-item">📍 Lahore, Punjab, Pakistan</div>
          </div>
        </div>
      </section>

      <footer>
        <p>Designed &amp; Built with ❤️ by <strong>Shahida Bibi</strong> • Full Stack Developer</p>
      </footer>
    </>
  );
}
