import { useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const canvasRef = useRef(null);

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

  useEffect(() => {
    const cards = document.querySelectorAll('.card-3d');
    const cleanups = [];
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
      cleanups.push(() => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

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

  // ── SKILLS ──────────────────────────────────────────────────────────────────
  const skills = [
    'PHP 8.2', 'Laravel 12', 'Livewire', 'Eloquent ORM', 'RBAC', 'Multi-Tenant SaaS', 'POS Systems', 'Python', 'Flask', 'CodeIgniter',
    'JavaScript', 'React', 'Vue.js', 'Node.js', 'HTML5', 'CSS3', 'Bootstrap', 'jQuery',
    'REST API', 'Payment Gateway Integration', 'Third-Party APIs',
    'MySQL / MariaDB', 'Auth & Role-Based Access', 'PWA', 'Chart.js',
    'AI Integration', 'LLM APIs', 'Gemini API', 'Groq API', 'Prompt Engineering',
    'Claude', 'Cursor', 'Codex',
    'Kotlin', 'Jetpack Compose', 'C++',
    'Linux', 'Cron Jobs', 'SMTP', 'Railway', 'Hostinger / cPanel', 'Gunicorn', 'DNS & SSL/TLS', 'Git', 'GitHub',
    'WordPress', 'Divi Builder', 'Elementor', 'SEO',
  ];

  // ── PROJECTS ─────────────────────────────────────────────────────────────────
  const projects = [
    // Current SaaS project
    {
      icon: '🏪',
      title: 'Repair Access — Multi-Tenant POS & Repair SaaS',
      live: false,
      desc: 'Multi-tenant POS and repair management SaaS for mobile phone repair businesses. Repair booking, technician assignment, quotation approvals, POS checkout, inventory, purchase orders, supplier returns, VAT and financial reports, branch-level data isolation with role-based access, and automated repair-status emails (Laravel Mail, SMTP, Cron Jobs). Currently in active development.',
      tags: ['PHP 8.2', 'Laravel 12', 'MySQL', 'Multi-Tenant', 'RBAC', 'Blade', 'Linux', 'cPanel'],
    },
    // Flagship
    {
      icon: '🧩',
      title: 'SoftAccess CRM & HR System',
      live: true,
      desc: 'Full-featured company CRM & HR platform built solo end-to-end: customer/deal pipeline, attendance, task assignment with automatic time tracking, payroll, leave approvals, notifications, dashboards, CSV exports and Admin/Employee roles. Installable as a PWA, deployed on Railway with cloud MySQL.',
      tags: ['Python', 'Flask', 'MySQL', 'Flask-Login', 'Chart.js', 'PWA', 'Railway'],
      link: 'https://web-production-a3a71.up.railway.app/',
    },
    // AI Projects
    {
      icon: '🤖',
      title: 'AI Expense Tracker',
      live: true,
      desc: 'Intelligent expense tracking app powered by Gemini API. Uses AI to auto-categorize expenses, detect spending patterns, and give smart financial insights. Built with Python Flask, deployed on Vercel.',
      tags: ['Python', 'Flask', 'Gemini API', 'AI', 'Vercel'],
      link: 'https://ai-expense-tracker-three-omega.vercel.app/',
    },
    {
      icon: '💬',
      title: 'AI Chat App',
      live: true,
      desc: 'Real-time AI chat application powered by Groq API for ultra-fast LLM responses. Built with Python Flask backend and deployed on Vercel with clean conversational UI.',
      tags: ['Python', 'Flask', 'Groq API', 'LLM', 'Vercel'],
      link: 'https://ai-chat-app-zeta-lac.vercel.app/',
    },
    {
      icon: '📱',
      title: 'AI Chat — Android App',
      live: false,
      desc: 'Native Android AI chat app built with Kotlin and Jetpack Compose, using the Gemini API for conversational responses.',
      tags: ['Kotlin', 'Jetpack Compose', 'Gemini API', 'Android'],
    },
    // WordPress / SEO
    {
      icon: 'snowflake',
      title: 'Hoda Cooling Center',
      live: true,
      desc: 'Full WordPress website built with Divi Builder. Handled complete SEO setup — fixed all broken 404 links with 301 redirects, added meta tags, structured data, and on-page SEO across all pages.',
      tags: ['WordPress', 'Divi Builder', 'SEO', 'Meta Tags', 'Redirects'],
      link: 'https://hodacoolingcenter.com/',
    },
    // Laravel UK Clients
    {
      icon: '⚡',
      title: 'iCanFix',
      live: true,
      desc: 'High-performance phone repair platform for UK market. Optimized with Laravel caching — reduced page load from 24s to under 2s.',
      tags: ['Laravel', 'Livewire', 'MySQL', 'Cache'],
      link: 'https://icanfix.co.uk/',
    },
    {
      icon: '🛠️',
      title: 'We Repair Any Phone',
      live: true,
      desc: 'Full-service mobile repair web app with dynamic device/service listings, booking flow, and clean responsive UI.',
      tags: ['Laravel', 'Livewire', 'PHP'],
      link: 'https://werepairanyphone.co.uk/',
    },
    {
      icon: '📡',
      title: 'KwikFix Phones',
      live: true,
      desc: 'Fast and responsive phone repair platform with smart service navigation, SEO-friendly slug URLs, and streamlined booking.',
      tags: ['Laravel', 'Livewire', 'MySQL'],
      link: 'https://kwikfixphones.co.uk/',
    },
    {
      icon: '🔬',
      title: 'Fon Expert',
      live: true,
      desc: 'Modern phone repair and buy/sell platform with intuitive service listings, dynamic pricing, and Livewire-powered interactions.',
      tags: ['Laravel', 'Livewire', 'JS'],
      link: 'https://fonexpert.uk/',
    },
    {
      icon: '🔧',
      title: 'House of Gadgets',
      live: true,
      desc: 'Repair service web app with dynamic service listings and booking functionality for UK market.',
      tags: ['Laravel', 'Livewire', 'MySQL'],
      link: 'https://houseofgadgets.co.uk/',
    },
    {
      icon: '🏢',
      title: 'HEX Halifax',
      live: true,
      desc: 'Business website with responsive design, clean UI, and optimized performance.',
      tags: ['Laravel', 'Livewire', 'PHP'],
      link: 'https://www.hexhalifax.co.uk/',
    },
    {
      icon: '📱',
      title: 'Phone Syndicate',
      live: true,
      desc: 'Repair service platform with smooth UX and scalable Laravel Livewire backend.',
      tags: ['Laravel', 'Livewire', 'MySQL'],
      link: 'https://phonesyndicate.co.uk/',
    },
    {
      icon: '📲',
      title: 'Phone Labs Burnley',
      live: true,
      desc: 'Mobile repair website with interactive UI and service-based functionality.',
      tags: ['Laravel', 'Livewire', 'JS'],
      link: 'https://phonelabsburnley.co.uk/',
    },
    {
      icon: '🛍️',
      title: 'Qaswa',
      live: true,
      desc: 'Business website with responsive layout and structured content using Laravel Livewire.',
      tags: ['Laravel', 'Livewire', 'MySQL'],
      link: 'https://qaswa.co.uk/',
    },
    {
      icon: '🔩',
      title: 'Repairs Hub',
      live: true,
      desc: 'Repair service web app with scalable structure and user-friendly interface.',
      tags: ['Laravel', 'Livewire', 'PHP'],
      link: 'https://repairshub.co.uk/',
    },
    // Non-live
    {
      icon: '🛒',
      title: 'POS Web Application',
      live: false,
      desc: 'System for managing products, sales, billing, and transactions with full admin panel.',
      tags: ['Laravel', 'PHP', 'MySQL'],
    },
    {
      icon: '🎓',
      title: 'Spark Institute',
      live: false,
      desc: 'Educational platform with authentication, course management, fee tracking, and admin panel.',
      tags: ['PHP', 'MySQL', 'Bootstrap'],
    },
  ];

  // ── EXPERIENCE ───────────────────────────────────────────────────────────────
  const experience = [
    {
      role: 'Full-Stack Laravel Developer — Repair Access (SaaS)',
      company: 'Multi-Tenant POS & Repair Management SaaS',
      badge: 'Current',
      label: 'Focus', value: 'SaaS Product', width: '90%',
      points: [
        'Building a multi-tenant POS and repair management SaaS for mobile repair businesses using Laravel 12, Eloquent ORM, migrations and role-based authentication',
        'Implemented repair booking, technician assignment, diagnostics, quotation approvals and repair status management',
        'Built POS checkout, inventory tracking, purchase orders, supplier returns, financial reporting and VAT management',
        'Implemented branch-level data isolation with role-based access for owners, managers and staff',
        'Automated repair-status emails with Laravel Mail, SMTP, scheduled Cron Jobs and customer consent controls',
        'Managed production deployment, migrations and maintenance on Linux-based cPanel hosting',
      ],
      tech: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Multi-Tenant', 'RBAC', 'SMTP', 'Cron Jobs', 'Linux'],
    },
    {
      role: 'Full Stack PHP Laravel Developer',
      company: 'Soft Access Pvt Ltd — Lahore, Pakistan',
      badge: '3 Years • Current',
      label: 'Duration', value: '3 Years', width: '100%',
      points: [
        'Built and maintained 15+ live websites and web applications for UK-based clients using Laravel, Livewire, PHP and MySQL',
        'Integrated payment gateways, IMEI/device-check services and other third-party APIs into production systems',
        'Built scalable RESTful backends, dynamic service listings, booking systems, POS and admin panels',
        'Optimized performance — reduced page load from 24s to under 2s on iCanFix using Laravel caching',
        'Used AI tools (Claude, ChatGPT) across the development lifecycle for code generation, debugging and code review',
      ],
      tech: ['Laravel', 'PHP', 'Livewire', 'MySQL', 'REST API', 'Payment APIs', 'JavaScript'],
    },
    {
      role: 'Python Flask Developer — CRM & HR System',
      company: 'Soft Access Pvt Ltd — Lahore, Pakistan',
      badge: '6 Months',
      label: 'Duration', value: '6 Months', width: '50%',
      points: [
        'Designed and built a complete CRM & HR system from scratch: customer/deal pipeline, attendance, tasks, payroll and leave workflows',
        'Designed the MySQL schema; implemented secure authentication (Flask-Login, password hashing) and Admin/Employee role-based access',
        'Built REST routes, Chart.js dashboards, CSV exports and file uploads',
        'Converted the app into an installable Progressive Web App (manifest + service worker) with a fully responsive mobile UI',
        'Deployed to production on Railway with cloud MySQL, Gunicorn and environment-based configuration',
      ],
      tech: ['Python', 'Flask', 'SQLAlchemy', 'MySQL', 'Chart.js', 'PWA', 'Railway'],
    },
    {
      role: 'DevOps / Website Deployment',
      company: 'Soft Access Pvt Ltd — Lahore, Pakistan',
      badge: '1 Year',
      label: 'Duration', value: '1 Year', width: '60%',
      points: [
        'Deployed and managed 15+ live PHP/Laravel and WordPress websites on Hostinger using cPanel',
        'Owned the deployment workflow: domain & DNS setup, file uploads via File Manager/FTP, MySQL creation & migration, Laravel environment setup',
        'Configured SSL certificates and HTTPS across all client sites',
        'Handled post-launch maintenance: backups, error troubleshooting, performance checks and uptime monitoring',
        'Coordinated go-lives directly with UK clients, delivering zero-downtime launches',
      ],
      tech: ['Hostinger', 'cPanel', 'Railway', 'DNS', 'SSL/TLS', 'FTP', 'Git'],
    },
    {
      role: 'AI Application Developer',
      company: 'Personal Projects — Vercel',
      badge: '2025 • Active',
      label: 'Focus', value: 'AI / LLM Apps', width: '80%',
      points: [
        'Built AI-powered web apps using Python Flask integrated with Gemini API and Groq API (LLM)',
        'Developed AI Expense Tracker — auto-categorizes expenses and gives smart insights using Gemini',
        'Built AI Chat App with ultra-fast LLM responses powered by Groq, plus a native Android version in Kotlin & Jetpack Compose',
        'Deployed AI projects live on Vercel with secure API key and environment variable management',
      ],
      tech: ['Python', 'Flask', 'Gemini API', 'Groq API', 'LLM', 'Kotlin', 'Vercel'],
    },
    {
      role: 'WordPress Developer & SEO Specialist',
      company: 'Freelance Projects',
      badge: '1 Year',
      label: 'Duration', value: '1 Year', width: '60%',
      points: [
        'Built WordPress websites using Divi Builder and Elementor with custom layouts and themes',
        'Performed full SEO audits — fixed 404 broken links with proper 301 redirects across all pages',
        'Added meta tags, structured data (Schema), and on-page SEO to improve search rankings',
        'Certified in WordPress Development from DigiSkills.pk',
      ],
      tech: ['WordPress', 'Divi Builder', 'Elementor', 'SEO', 'PHP', 'CSS'],
    },
    {
      role: 'Frontend Developer',
      company: 'Freelance & Projects',
      badge: '2 Years',
      label: 'Duration', value: '2 Years', width: '100%',
      points: [
        'Built responsive, mobile-first UIs using HTML5, CSS3, Bootstrap, JavaScript, jQuery and React',
        'Developed interactive web pages with modern design patterns and animations',
        'Ensured cross-browser compatibility and optimized page performance',
      ],
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'jQuery', 'React'],
    },
  ];

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
          <div className="hero-tag">✦ Full Stack Developer &amp; AI Builder</div>
          <h1 className="hero-name"><span>Shahida Bibi</span></h1>
          <p className="hero-title">
            Laravel · React · Node.js · Python Flask · REST APIs · AI/LLM Integration<br />
            Building, deploying &amp; scaling web apps and AI-powered products
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => scrollTo('#projects')}>View Projects</button>
            <button className="btn-outline" onClick={() => scrollTo('#contact')}>Contact Me</button>
            {/* Put your CV PDF in the /public folder with this exact name */}
            <a className="btn-outline" href="/Shahida_Bibi_Full_Stack_Developer_CV.pdf" download
               style={{ textDecoration: 'none', display: 'inline-block' }}>⬇ Download CV</a>
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
            <p>Full Stack Developer with 3+ years of professional experience in PHP Laravel, Python Flask, React and AI/LLM integrations. I own products end-to-end, including a multi-tenant POS &amp; repair management SaaS (Repair Access) — from backend architecture and REST/third-party API integration to deployment, security and post-launch support.</p>
            <p>I've delivered 15+ live production projects for UK-based clients, built a complete CRM &amp; HR platform solo (role-based auth, PWA, live on Railway), cut a client site's load time from 24s to under 2s, and built AI apps using Gemini and Groq APIs. I work daily in English with international clients.</p>
            <div className="about-stats">
              <div className="stat"><div className="stat-num">3+</div><div className="stat-label">Years Exp</div></div>
              <div className="stat"><div className="stat-num">15+</div><div className="stat-label">Live Projects</div></div>
              <div className="stat"><div className="stat-num">24s→2s</div><div className="stat-label">Load Time</div></div>
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
          {skills.map((s, i) => (
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
          {experience.map((e, i) => (
            <div key={i} className="exp-card reveal">
              <div className="exp-header">
                <div className="exp-left">
                  <div className="exp-role">{e.role}</div>
                  <div className="exp-company">{e.company}</div>
                </div>
                <div className="exp-badge">{e.badge}</div>
              </div>
              <div className="exp-duration-bar">
                <div className="exp-duration-label"><span>{e.label}</span><span>{e.value}</span></div>
                <div className="bar-track"><div className="bar-fill" style={{ width: e.width }}></div></div>
              </div>
              <ul className="exp-points">
                {e.points.map((pt, j) => <li key={j}>{pt}</li>)}
              </ul>
              <div className="exp-tech">
                {e.tech.map((t, j) => <span key={j}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects">
        <div className="section-title reveal">
          <h2>Projects</h2>
          <p>Live AI apps, SaaS-style platforms &amp; real-world web applications</p>
          <div className="title-line"></div>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <div key={i} className="project-card card-3d reveal">
              <div className="project-icon">{p.icon === 'snowflake' ? '❄️' : p.icon}</div>
              <div className="project-title">
                {p.title} {p.live && <span className="live-badge">LIVE</span>}
              </div>
              <div className="project-desc">{p.desc}</div>
              <div className="project-tags">{p.tags.map((t, j) => <span key={j} className="tag">{t}</span>)}</div>
              {p.link && (
                <a href={p.link} className="project-link" target="_blank" rel="noreferrer">
                  🔗 {p.link.replace('https://', '').replace('www.', '')}
                </a>
              )}
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
        <p>Designed &amp; Built with ❤️ by <strong>Shahida Bibi</strong> • Full Stack &amp; AI Developer</p>
      </footer>
    </>
  );
}