import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Smartphone, Linkedin, Mail } from 'lucide-react';
import { ChevronLeft, ChevronRight, ExternalLink, Search } from 'lucide-react';
import { HeaderTextReveal, EntranceAnimation, FloatAnimation, HeroSplitReveal } from './animate.js';
import { AnimatedCursor } from './AnimateCursor';
import { animate, stagger, createTimeline, onScroll } from 'animejs';
import { ProjectDetailPage } from './ProjectDetailPage';

// ── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => {
  const nameRef = useRef(null);
  const subContentRef = useRef(null);

  useEffect(() => {
    if (nameRef.current) HeroSplitReveal(nameRef.current);
    if (subContentRef.current) {
      animate(subContentRef.current.children, {
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 800,
        delay: stagger(200, { start: 600 }),
        easing: 'easeOutQuart',
      });
    }
  }, []);

  return (
    <header className="bg-slate-900 text-white py-20 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1
          ref={nameRef}
          className="text-5xl font-bold mb-4 flex flex-wrap leading-tight justify-center gap-2"
        >
          Andreas Happy Hendrawan
        </h1>
        <div ref={subContentRef}>
          <p className="text-xl text-blue-400 font-medium mb-6 opacity-0">
            Software Engineer | Mobile Development (Kotlin & Flutter)
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8 opacity-0">
            Software engineer focused on mobile development, building reliable and
            scalable applications using Kotlin and Flutter.
          </p>
          <div className="flex justify-center gap-4 opacity-0">
            {/* Social buttons here */}
          </div>
        </div>
      </div>
    </header>
  );
};

// ── CoreFocus — counter + bar animate in on scroll ──────────────────────────
const CoreFocus = () => {
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const barRefs = useRef([]);

  const items = [
    { label: 'Full-Stack', sub: 'Bridging Mobile interfaces with robust Golang & Laravel backends.', value: 90 },
    { label: 'Database',   sub: 'Expertise in SQL Server, PostgreSQL, and Supabase for scalable data.', value: 85 },
    { label: 'Integration',sub: 'Streamlining ATPM systems and internal ADMS architectures.', value: 80 },
  ];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      // Labels slide up staggered
      animate(itemRefs.current, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 700,
        delay: stagger(150),
        ease: 'outExpo',
      });

      // Progress bars grow from 0
      barRefs.current.forEach((bar, i) => {
        if (!bar) return;
        animate(bar, {
          width: [`0%`, `${items[i].value}%`],
          duration: 1000,
          delay: 300 + i * 150,
          ease: 'inOut(3)',
        });
      });
    }, { threshold: 0.3 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-slate-900 text-white px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">
        {items.map((item, i) => (
          <div key={i} ref={el => itemRefs.current[i] = el} className="opacity-0">
            <div className="text-blue-400 font-bold text-4xl mb-2">{item.label}</div>
            <p className="text-slate-400 mb-4">{item.sub}</p>
            {/* Animated progress bar */}
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div
                ref={el => barRefs.current[i] = el}
                className="h-full bg-blue-500 rounded-full"
                style={{ width: '0%' }}
              />
            </div>
            <p className="text-slate-500 text-xs mt-1">{item.value}%</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Experience ───────────────────────────────────────────────────────────────
const Experience = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  const lineRef = useRef(null);

  const jobs = [
    { company: "PT Arista Group", role: "Senior Staff Developer", period: "Jul 2024 - Now", desc: "Developed API integrations between ATPM and internal ADMS systems. Conducted AI research for business intelligence. Implement N8N workflows to replace old tech stack" },
    { company: "Freelance", role: "Full-Stack Developer", period: "Nov 2023 - Now", desc: "Provided freelance development services for various clients, focusing on full-stack solutions." },
    { company: "PT Ramayana Lestari Sentosa", role: "IT Developer", period: "Nov 2023 - Jun 2024", desc: "Enhance the Rtools Application code structure foundation using BLoC state management. Build feature and bug fixes on Ramayana Web Application using Laravel " },
    { company: "PT Phincon", role: "Android Bootcamp", period: "Aug 2023 - Oct 2023", desc: "Developed TokoPhincon E-commerce app using Kotlin and Clean Architecture (MVVM)." },
    { company: "PT Talian Infodinamika", role: "Intern Flutter Developer", period: "Feb 2022 - Jul 2023", desc: "Help team to develop and maintain Talpro (Talian Product) HRIS internal company application, collaborate with UI/UX team and Backend team" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      // Timeline line draws down
      if (lineRef.current) {
        animate(lineRef.current, {
          scaleY: [0, 1],
          duration: 800,
          ease: 'inOut(3)',
          transformOrigin: 'top',
        });
      }

      // Cards slide in from left
      animate(itemsRef.current, {
        opacity: [0, 1],
        translateX: [-40, 0],
        duration: 600,
        delay: stagger(180, { start: 200 }),
        ease: 'outExpo',
      });
    }, { threshold: 0.2 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Developer Journey</h2>
      <div className="max-w-3xl mx-auto space-y-8 relative">
        {/* Animated vertical line */}
        <div
          ref={lineRef}
          className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded origin-top"
          style={{ transform: 'scaleY(0)' }}
        />
        {jobs.map((job, i) => (
          <div
            key={i}
            ref={el => itemsRef.current[i] = el}
            className="border-l-4 border-blue-500 pl-6 py-2 opacity-0"
          >
            <span className="text-sm text-blue-600 font-bold uppercase">{job.period}</span>
            <h3 className="text-xl font-bold">{job.role}</h3>
            <p className="text-slate-600 font-medium">{job.company}</p>
            <p className="text-slate-500 mt-2 leading-relaxed">{job.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Projects ─────────────────────────────────────────────────────────────────
const Projects = ({ onSelectProject }) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const projects = [
    {
      id: 'abanggas',
      name: 'AbangGas',
      tech: 'Flutter · Doku · Laravel',
      desc: 'E-commerce platform for gas/water delivery with 5k+ users downloaded ',
      year: '2025',
    },
    {
      id: 'sehati',
      name: 'Project Sehati',
      tech: 'Flutter · BLE · Supabase',
      desc: 'Healthcare app for maternal health and real-time CTG monitoring via Bluetooth Low Energy.',
      year: '2025',
    },
    {
      id: 'ceosuite',
      name: 'CEO SUITE',
      tech: 'Flutter · MobX · Midtrans',
      desc: 'Premium office space booking app with integrated payment gateways.',
      year: '2024',
    },
    {
      id: 'petrokimia',
      name: 'Petrokimia',
      tech: 'Flutter · MobX',
      desc: 'Internal retail operations app with 1-device-1-account security enforcement.',
      year: '2025',
    },
    {
      id: 'vault',
      name: 'Vault Automotive Museum',
      tech: 'React Native · Supabase ',
      desc: 'API integration layer between ATPM and internal dealer management systems.',
      year: '2026',
    },
    
    {
      id: 'vaultMobile',
      name: 'Vault Automotive Museum - Front Officer',
      tech: 'Flutter · Supabase ',
      desc: 'API integration layer between ATPM and internal dealer management systems.',
      year: '2026',
    },
    {
      id: 'rpm',
      name: 'RPM Express',
      tech: 'Flutter',
      desc: 'API integration layer between ATPM and internal dealer management systems.',
      year: '2025',
    },
    
    {
      id: 'adms',
      name: 'ADMS Arista',
      tech: 'Golang · Laravel · PostgreSQL',
      desc: 'API integration layer between ATPM and internal dealer management systems.',
      year: '2024',
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animate(cardRefs.current, {
        opacity: [0, 1],
        translateY: [50, 0],
        scale: [0.95, 1],
        duration: 700,
        delay: stagger(100),
        ease: 'outBack(1.2)',
      });
    }, { threshold: 0.1 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleEnter = (el) => animate(el, { scale: 1.03, translateY: -4, duration: 250, ease: 'outQuart' });
  const handleLeave = (el) => animate(el, { scale: 1, translateY: 0, duration: 300, ease: 'outBack' });

  return (
    <section ref={sectionRef} className="py-20 bg-slate-50 px-6">
      <h2 className="text-3xl font-bold text-center mb-3">Featured Projects</h2>
      <p className="text-slate-500 text-center mb-12 text-sm">Click any project to explore the full case study</p>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <div
            key={p.id}
            ref={el => cardRefs.current[i] = el}
            onClick={() => onSelectProject(p.id)}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 opacity-0 cursor-pointer group"
            onMouseEnter={e => handleEnter(e.currentTarget)}
            onMouseLeave={e => handleLeave(e.currentTarget)}
          >
            {/* Top row */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                <Smartphone size={20} />
              </div>
              <span className="text-xs text-slate-400 font-medium">{p.year}</span>
            </div>

            <h3 className="text-lg font-bold mb-1 group-hover:text-blue-600 transition-colors">{p.name}</h3>
            <p className="text-xs text-blue-600 font-semibold mb-3">{p.tech}</p>
            <p className="text-slate-500 text-sm leading-relaxed mb-4">{p.desc}</p>

            {/* CTA */}
            <div className="flex items-center gap-1 text-xs font-bold text-blue-500 group-hover:gap-2 transition-all">
              View case study <ExternalLink size={12} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
// ── Gallery ──────────────────────────────────────────────────────────────────
const Gallery = () => {
  const portfolioItems = [
    { title: "Vault Automotive Museum", category: "React Native · Supabase", image: "/vault/logo.png", description: "Core landing experience for the Vault app ecosystem." },
    { title: "AbangGas", category: "Flutter · MobX · Doku", image: "/abanggas/abanggas_thumbnail.png", description: "Gas delivery platform with tracking and wallet integration." },
    { title: "CEO SUITE", category: "Flutter · MobX · Midtrans", image: "/ceo_suite/ceosuite_thumbnail.png", description: "Premium office booking app with memberships and payment flow." },
    { title: "Petrokimia", category: "Flutter · MobX ", image: "/petrokimia/logo_promize.jpg", description: "Premium office booking app with memberships and payment flow." },
    { title: "RPM", category: "Flutter · MobX ", image: "/rpm_express/logo.png", description: "Premium office booking app with memberships and payment flow." },
  
  ];

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const viewportRef = useRef(null);
  const tileRefs = useRef([]);

  const normalizeLoopPosition = (el) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft <= 1) el.scrollLeft += half;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
  };

  const slideBy = (direction) => {
    const el = viewportRef.current;
    if (!el) return;
    const step = Math.max(280, Math.floor(el.clientWidth * 0.75));
    const next = direction === 'left' ? el.scrollLeft - step : el.scrollLeft + step;
    el.scrollTo({ left: next, behavior: 'smooth' });
  };

  const tiles = useMemo(() => {
    // Bento sizing pattern (cols x rows), repeats for depth.
    const sizes = [
      { c: 2, r: 2 }, // hero
      { c: 1, r: 1 },
      { c: 1, r: 2 },
      { c: 2, r: 1 },
      { c: 1, r: 1 },
      { c: 2, r: 2 },
      { c: 1, r: 1 },
      { c: 2, r: 1 },
      { c: 1, r: 2 },
      { c: 1, r: 1 },
    ];

    return portfolioItems.map((it, i) => ({
      ...it,
      size: sizes[i % sizes.length],
    }));
  }, []);


  // Entrance animations (title + tiles)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [26, 0],
        duration: 800,
        ease: 'outExpo',
      });

      const tilesEl = tileRefs.current.filter(Boolean);
      animate(tilesEl, {
        opacity: [0, 1],
        translateY: [26, 0],
        scale: [0.96, 1],
        duration: 650,
        delay: stagger(55),
        ease: 'outBack(1.2)',
      });
    }, { threshold: 0.12 });

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Start away from edge so left/right manual sliding always works.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const half = el.scrollWidth / 2;
      if (half > 0 && el.scrollLeft === 0) el.scrollLeft = half / 2;
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-slate-900 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-4xl font-bold text-white mb-4">Visual Portfolio</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto mb-6" />
          <p className="text-slate-400 max-w-xl mx-auto">
            A quick visual scan of shipped work in a bento layout using real project assets.
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 mb-4">
          <button
            type="button"
            onClick={() => slideBy('left')}
            className="w-10 h-10 rounded-full border border-white/20 text-slate-200 hover:text-white hover:border-white/40 bg-slate-800/70 transition-colors flex items-center justify-center"
            aria-label="Slide left"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => slideBy('right')}
            className="w-10 h-10 rounded-full border border-white/20 text-slate-200 hover:text-white hover:border-white/40 bg-slate-800/70 transition-colors flex items-center justify-center"
            aria-label="Slide right"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Scroll viewport */}
        <div
          ref={viewportRef}
          className="relative overflow-x-auto overflow-y-hidden scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-900 to-transparent z-10" />
         
          {/* Bento grid: auto-flow columns; each column is 2 grid cols wide */}
          <div
            className="grid gap-5 pr-10"
            style={{
              gridAutoFlow: 'column',
              gridAutoColumns: 'minmax(360px, 360px)',
              gridTemplateRows: 'repeat(4, minmax(110px, 1fr))',
              paddingBottom: 10,
            }}
          >
            {tiles.map((item, i) => (
              <button
                key={`${item.title}-${item.image}-${i}`}
                ref={el => { tileRefs.current[i] = el; }}
                className="group relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-2xl opacity-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                style={{
                  gridColumn: `span ${item.size.c}`,
                  gridRow: `span ${item.size.r}`,
                  minHeight: 120,
                }}
                onMouseEnter={e => animate(e.currentTarget, { scale: 1.015, duration: 220, ease: 'outQuart' })}
                onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 260, ease: 'outBack(1.1)' })}
              >
               <div className="absolute inset-0 overflow-hidden rounded-2xl">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain scale-90 transition-all duration-700 grayscale-[0.4] group-hover:grayscale-0 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent" />

                <div className="relative h-full w-full p-5 flex flex-col justify-end">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-blue-400 text-[11px] font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-white/70 text-[11px] font-semibold uppercase tracking-widest flex items-center gap-1.5">
                      <Search size={13} /> View
                    </span>
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-black mt-1 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-xs md:text-sm leading-relaxed mt-2 max-w-[52ch] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    {item.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs mt-6">
          Use arrows to slide left or right.
        </p>
      </div>
    </section>
  );
};

// ── Skills — tags pop in like bubbles ────────────────────────────────────────
const Skills = () => {
  const sectionRef = useRef(null);
  const groupRefs = useRef([]);
  const tagRefs = useRef([]);

  const skillGroups = [
    { category: "Mobile Development", items: ["Kotlin", "Flutter/Dart", "BLoC/MobX", "MVVM", "Retrofit"] },
    { category: "Backend & Web",      items: ["Golang", "Laravel", "Node.js", "REST API"] },
    { category: "Database & Cloud",   items: ["PostgreSQL", "SQL Server", "Supabase", "Firebase"] },
    { category: "Tools & DevOps",     items: ["CI/CD (Codemagic)", "AI (Cursor)", "Github/Gitlab", "Postman"] }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      // Group cards slide up
      animate(groupRefs.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: stagger(120),
        ease: 'outExpo',
      });

      // Skill tags pop in with scale bounce
      animate(tagRefs.current.filter(Boolean), {
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 400,
        delay: stagger(40, { start: 300 }),
        ease: 'outBack(2)',
      });
    }, { threshold: 0.2 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Hover wiggle on skill tags
  const wiggle = (el) => {
    animate(el, {
      rotate: [0, -4, 4, -2, 2, 0],
      duration: 400,
      ease: 'inOut(2)',
    });
  };

  let tagIdx = 0;

  return (
    <section ref={sectionRef} className="py-20 bg-white px-6">
      <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillGroups.map((group, i) => (
          <div
            key={i}
            ref={el => groupRefs.current[i] = el}
            className="p-6 bg-slate-50 rounded-2xl border border-slate-100 opacity-0"
          >
            <h3 className="font-bold text-blue-600 mb-4">{group.category}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => {
                const idx = tagIdx++;
                return (
                  <span
                    key={skill}
                    ref={el => tagRefs.current[idx] = el}
                    className="px-3 py-1 bg-white text-slate-700 text-sm rounded-md shadow-sm border border-slate-200 opacity-0 cursor-none"
                    onMouseEnter={e => wiggle(e.currentTarget)}
                  >
                    {skill}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// ── Footer — text shimmer on mount ──────────────────────────────────────────
const Footer = () => {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animate(footerRef.current, {
        opacity: [0, 1],
        translateY: [10, 0],
        duration: 600,
        ease: 'outQuart',
      });
    }, { threshold: 0.5 });

    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="py-10 text-center text-slate-400 text-sm border-t border-slate-100 opacity-0"
    >
      © 2026 Andreas Happy Hendrawan. Built with React & Tailwind CSS.
    </footer>
  );
};

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [currentProject, setCurrentProject] = useState(null); // ← this line must be INSIDE App()

  // Scroll to top when navigating to a project
  const handleSelectProject = (id) => {
    setCurrentProject(id);
  };

  const handleBack = () => {
    setCurrentProject(null);
    // Scroll back to projects section after a tick
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Show project detail page
  if (currentProject) {
    return (
      <>
        <AnimatedCursor />
        <ProjectDetailPage projectId={currentProject} onBack={handleBack} />
      </>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      <AnimatedCursor />
      <Hero />
      <CoreFocus />
      <Experience />
      {/* <Gallery /> */}
      <section id="projects">
        <Projects onSelectProject={handleSelectProject} />
      </section>
      <Skills />
      <Footer />
    </div>
  );
}

export default App;