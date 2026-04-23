import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { HeroSplitReveal } from './animate.js';
import { AnimatedCursor } from './AnimateCursor';
import { animate, stagger } from 'animejs';
import { ProjectDetailPage } from './ProjectDetailPage';
import { motion } from 'framer-motion';

// ── Hero ────────────────────────────────────────────────────────────────────
const Hero = () => {
  const nameRef = useRef(null);
  const subContentRef = useRef(null);
  const circlesRef = useRef(null);
  const base = process.env.PUBLIC_URL;

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

    // Animate circles
    if (circlesRef.current) {
      const circles = circlesRef.current.querySelectorAll('circle');
      animate(circles, {
        opacity: [0, 1],
        strokeDashoffset: [200, 0],
        duration: 1200,
        delay: stagger(150, { start: 400 }),
        easing: 'easeInOutQuad',
      });
    }
  }, []);

  return (
    <header className="bg-white text-slate-900 py-24 px-6 font-['IBM_Plex_Mono'] overflow-hidden min-h-screen flex items-center">
      <div className="max-w-6xl mx-auto flex items-center font-['IBM_Plex_Mono'] justify-between gap-12 w-full">
        {/* Left Content */}
        <div className="flex-1 max-w-lg">
          <h1
            ref={nameRef}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
          >
            Andreas.
          </h1>
          <p className="text-2xl md:text-3xl text-slate-800 font-semibold mt-4 mb-10 leading-snug">
            I build apps that power business operations and drive growth, specializing in mobile and backend development.
          </p>
          <div ref={subContentRef}>
            <p className="text-sm md:text-lg text-slate-500 mb-10 opacity-0 leading-relaxed">
              Software Developer based in Jakarta, Indonesia
            </p>
            <div className="flex flex-row gap-3 opacity-0">
              <a href="mailto:drez.dev77@gmail.com">
                <button className="px-6 py-3 border border-blue-600 text-blue-600 text-sm font-semibold rounded hover:bg-blue-50 transition-colors w-fit">
                  Get in touch
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-[-30%] top-1/4 -translate-y-1/2 w-72 h-72 z-0
  lg:relative lg:top-auto lg:right-[-15%] lg:translate-y-0
  lg:flex-1 lg:flex lg:items-center lg:justify-center
  lg:w-[800px] lg:h-[800px]"
        >
          <motion.img
            src={`${base}/hero-component.png`}
            alt="Hero background"
            className="w-full h-full object-contain opacity-70"
            style={{ transformOrigin: "center" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </header>
  );
};



const HatchDivider = () => (
  <div className="h-4 w-full overflow-hidden">
    <svg
      viewBox="0 0 800 28"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <pattern
          id="hatch"
          patternUnits="userSpaceOnUse"
          width="14"
          height="14"
          patternTransform="rotate(45)"
        >
          <line x1="0" y1="0" x2="0" y2="14" stroke="#e2e8f0" strokeWidth="6" />
        </pattern>
      </defs>
      <rect width="800" height="28" fill="url(#hatch)" />
    </svg>
  </div>
);



const Experience = () => {

  const jobs = [
    {
      company: "Arista Group",
      role: "Senior Staff Development",
      period: "Jul 2024 - Now",
      desc: "Developed API integrations between ATPM and internal ADMS systems. Conducted AI research for business intelligence. Implement N8N workflows to replace old tech stack",
    },
    {
      company: "Freelance",
      role: "Full-Stack Developer",
      period: "Jul 2024 - Now",
      desc: "Provided freelance development services for various clients, focusing on full-stack solutions.",
    },
    {
      company: "PT Ramayana Lestari Sentosa",
      role: "IT Developer",
      period: "Nov 2023 - Jun 2024",
      desc: "Enhance the Rtools Application code structure foundation using BLoC state management. Build feature and bug fixes on Ramayana Web Application using Laravel",
    },
    {
      company: "PT Phincon",
      role: "Android Bootcamp",
      period: "Aug 2023 - Oct 2023",
      desc: "Developed TokoPhincon E-commerce app using Kotlin and Clean Architecture (MVVM).",
    },
    {
      company: "PT Talian Infodinamika",
      role: "Intern Flutter Developer",
      period: "Feb 2022 - Jul 2023",
      desc: "Help team to develop and maintain Talpro (Talian Product) HRIS internal company application, collaborate with UI/UX team and Backend team",
    },
  ];

  const sectionRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        animate(itemsRef.current.filter(Boolean), {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 0.6,
          delay: stagger(0.12),
          easing: [0.16, 1, 0.3, 1],
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-white px-6"
      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
    >
      <div className="max-w-6xl mx-auto ">
        <h2 className="text-2xl font-bold mb-12 text-slate-900">
          Developer Journey
        </h2>

        <div className="border border-slate-200">
          {jobs.map((job, i) => (
            <div key={i}>
              {/* Card */}
              <div
                ref={(el) => {
                  if (el) itemsRef.current[i] = el;
                }}
                className="border border-slate-200 px-6 py-5"
                style={{ opacity: 0 }}
              >
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  {job.role}
                </h3>
                <p
                  className="text-xs font-semibold mb-3"
                  style={{ color: "#6B63D6" }}
                >
                  {job.company} / {job.period}
                </p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {job.desc}
                </p>
              </div>

              {/* Hatch divider between cards */}
              {i < jobs.length - 1 && <HatchDivider />}
            </div>
          ))}
        </div>
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
      name: 'Abang Gas',
      tech: 'Flutter · Doku · Laravel',
      year: '2025',
      features: [
        { text: 'Functionaly search address using google map SDK', color: '#3b82f6' },
        { text: 'Doku wallet integration', color: '#f97316' },
        { text: 'Real-time order status push notification', color: '#8b5cf6' },
      ],
    },
    {
      id: 'sehati',
      name: 'Project Sehati',
      tech: 'Flutter · BLE · Supabase',
      year: '2025',
      features: [
        { text: 'Real-time CTG monitoring via Bluetooth Low Energy', color: '#3b82f6' },
        { text: 'Maternal health tracking dashboard', color: '#14b8a6' },
        { text: 'Supabase realtime data sync', color: '#8b5cf6' },
      ],
    },
    {
      id: 'ceosuite',
      name: 'CEO SUITE',
      tech: 'Flutter · MobX · Midtrans',
      year: '2024',
      features: [
        { text: 'Premium office space browsing and booking', color: '#3b82f6' },
        { text: 'Midtrans payment gateway integration', color: '#f97316' },
        { text: 'MobX state management architecture', color: '#8b5cf6' },
      ],
    },
    {
      id: 'petrokimia',
      name: 'Petrokimia',
      tech: 'Flutter · MobX',
      year: '2025',
      features: [
        { text: 'Manage multiple projects with detailed overviews, forecasts and reports', color: '#3b82f6' },
        { text: 'Internal operations management', color: '#f97316' },
        { text: 'MobX state management', color: '#8b5cf6' },
      ],
    },
    {
      id: 'vault',
      name: 'Vault Automotive Museum',
      tech: 'React Native · Supabase',
      year: '2026',
      features: [
        { text: 'Booking real time availability', color: '#3b82f6' },
        { text: 'Supabase backend ', color: '#14b8a6' },
        { text: 'Payment Gateway with Doku ', color: '#8b5cf6' },
      ],
    },
    {
      id: 'vaultMobile',
      name: 'Vault Automotive - Front Officer',
      tech: 'Flutter · Supabase',
      year: '2026',
      features: [
        { text: 'Front officer check-in and ticketing flow', color: '#3b82f6' },
        { text: 'Supabase realtime sync', color: '#14b8a6' },
      ],
    },
    {
      id: 'rpm',
      name: 'RPM Express',
      tech: 'Flutter',
      year: '2025',
      features: [
        { text: 'Customer: Booking pickup, timeline package history', color: '#3b82f6' },
        { text: 'Driver: Receive customer order, update package detail, create barcode per package', color: '#f97316' },
        { text: 'Checker: Receive package from driver, check the details of package', color: '#8b5cf6' },
      ],
    },
    {
      id: 'collaborate',
      name: "Let's Collaborate",
      tech: '',
      year: '2026',
      features: [],
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animate(cardRefs.current.filter(Boolean), {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: stagger(80),
        ease: 'outExpo',
      });
    }, { threshold: 0.1 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-[#FAFAFA] px-6 font-['IBM_Plex_Mono']">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-12 text-slate-900">Featured Projects</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            p.id === 'collaborate' ? (
              <a href="mailto:drez.dev77@gmail.com" className="block">
                <div
                  key="collaborate"
                  ref={el => cardRefs.current[i] = el}
                  className="bg-blue-50 p-6 rounded-lg border-2 border-dashed border-blue-400 opacity-0 text-left relative cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  {/* Corner brackets */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-blue-400"></div>
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-blue-400"></div>
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-blue-400"></div>
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-blue-400"></div>

                  <h3 className="text-lg font-bold text-blue-600 mb-1">[Let's Collaborate]</h3>
                  <p className="text-xs text-blue-400 font-semibold mb-8">2026</p>

                  <div className="flex justify-center mb-6">
                    <div className="w-12 h-12 border-2 border-blue-400 rounded-lg flex items-center justify-center">
                      <span className="text-2xl text-blue-400 font-light">+</span>
                    </div>
                  </div>

                  <p className="text-sm text-blue-500 text-center leading-relaxed">
                    Im open to any collaboration opportunity, freelance or part-time Just reach me out!
                  </p>
                </div>
              </a>
            ) : (
              <button
                key={p.id}
                ref={el => cardRefs.current[i] = el}
                onClick={() => onSelectProject(p.id)}
                className="bg-white p-5 rounded-lg border border-slate-200 opacity-0 text-left hover:shadow-md transition-shadow flex flex-col gap-3"
              >
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{p.name}</h3>
                  <p className="text-xs text-slate-400">{p.year}</p>
                </div>
                <hr className="border-slate-100" />
                <div className="flex flex-wrap gap-2">
                  {p.tech.split(' · ').map(t => (
                    <span key={t} className="px-3 py-1 text-xs border border-slate-200 rounded-full text-slate-500">{t}</span>
                  ))}
                </div>
                <ul className="flex flex-col gap-2">
                  {p.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.color }} />
                      {f.text}
                    </li>
                  ))}
                </ul>
                <hr className="border-slate-100" />
                <div className="flex justify-end">
                  <span className="text-xs text-blue-600 font-semibold">View Work →</span>
                </div>
              </button>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Skills & Expertise ────────────────────────────────────────────────────────
const Skills = () => {
  const base = process.env.PUBLIC_URL;
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  const coreSkills = [
    { image: `${base}/skills_code_blocks.png`, title: "Full-Stack", desc: "Bridging application interfaces with robust backends." },
    { image: `${base}/skills_data_table.png`, title: "Database", desc: "Expertise in SQL Server, PostgreSQL, and Supabase for scalable data." },
    { image: `${base}/skills_account_tree.png`, title: "Integration", desc: "Streamlining data flows between systems." }
  ];

  const skillGroups = [
    { category: "Mobile\nDevelopment", items: ["Flutter/Dart"] },
    { category: "Backend & Web", items: ["Golang", "Laravel", "REST API", "Node.js"] },
    { category: "Database &\nCloud", items: ["PostgreSQL", "SQL Server", "Firebase", "Supabase"] },
    { category: "Tools & DevOps", items: ["CI/CD (Codemagic)", "Github/Gitlab", "Postman", "AI (Cursor)", "N8N", "Openclaw"] },
    { category: "Whatsapp Integration", items: ["Mekari Qontak", "WuzAPI"] },
    { category: "Payment Integration", items: ["Doku", "Xendit"] },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      if (contentRef.current) {
        const children = Array.from(contentRef.current.children);
        animate(children, {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
          delay: stagger(100),
          ease: 'outExpo',
        });
      }
    }, { threshold: 0.1 });

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 bg-white px-6 font-['IBM_Plex_Mono']">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-2 text-slate-900">Skills & Expertise</h2>
        <p className="text-sm text-slate-600 mb-12 leading-relaxed">Software engineer focused build software solutions that remove operational bottlenecks and improve reliability, choosing the right architecture and technology stack based on the problem, not the trend.</p>

        {/* Core Skills */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {coreSkills.map((skill, i) => {
            return (
              <div key={i} className="p-6 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <img src={skill.image} alt={skill.title} className="w-2 h-2" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{skill.title}</h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{skill.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Skill Groups */}
        <div ref={contentRef} className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group, i) => (
            <div key={i} className="opacity-0 p-6 border border-slate-200 rounded-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-4 whitespace-pre-line">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-white text-slate-600 text-xs rounded-full border border-orange-300 text-orange-600 font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ── Footer ──────────────────────────────────────────────────────────────────
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
      className="py-12 px-6 bg-white border-t border-slate-100 font-['IBM_Plex_Mono'] opacity-0"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-1">Andreas.</h3>
            <p className="text-xs text-slate-500">Software Developer</p>
            <p className="text-xs text-slate-500">drez.dev77@gmail.com</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2">
            <a href="https://www.linkedin.com/in/andreas-hendrawan-853a20240" className="text-xs text-blue-600 font-semibold hover:text-blue-700">LinkedIn →</a>
            {/* <a href="#" className="text-xs text-blue-600 font-semibold hover:text-blue-700">Notion →</a> */}
          </div>
        </div>
        <div className="border-t border-slate-100 pt-8 text-center">
          <p className="text-xs text-slate-400">© 2026 Andreas Happy Hendrawan. Built with React & Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
};

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [currentProject, setCurrentProject] = useState(null);

  const handleSelectProject = (id) => {
    setCurrentProject(id);
  };

  const handleBack = () => {
    setCurrentProject(null);
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const SectionTransition = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        opacity: { duration: 1.2, ease: "easeOut" },
        y: { duration: 1.2, ease: "easeOut" },
        scale: { duration: 1.2, ease: "easeOut" },
        rotate: { duration: 50, repeat: Infinity, ease: "linear" },
      }}
    >
      {children}
    </motion.div>
  );

  if (currentProject) {
    return (
      <>
        <AnimatedCursor />
        <ProjectDetailPage projectId={currentProject} onBack={handleBack} />
      </>
    );
  }

  return (
    <div
      className="h-screen overflow-y-scroll font-['IBM_Plex_Mono']"
      style={{ scrollSnapType: 'y mandatory' }}
    >
      <AnimatedCursor />

      <section style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <SectionTransition>
          <Hero />
        </SectionTransition>
      </section>

      <section id="projects" style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <SectionTransition>
          <Projects onSelectProject={handleSelectProject} />
        </SectionTransition>
      </section>

      <section style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <SectionTransition>
          <Skills />
        </SectionTransition>
      </section>

      <section style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <SectionTransition>
          <Experience />
        </SectionTransition>
      </section>

      <section style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}>
        <SectionTransition>
          <Footer />
        </SectionTransition>
      </section>
    </div>
  );
}

export default App;