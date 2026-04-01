// ProjectDetailPage.jsx
import { useEffect, useRef, useState } from 'react';
import { animate, stagger } from 'animejs';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag, X, ChevronLeft, ChevronRight } from 'lucide-react';

// ─── Project Data ─────────────────────────────────────────────────────────────
export const PROJECT_DATA = {
  sehati: {
    id: 'sehati',
    name: 'Project Sehati',
    tagline: 'Maternal Health Monitoring Platform',
    category: 'Healthcare · Mobile',
    type: 'mobile',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200&h=600',
    accent: '#3b82f6',
    year: '2024',
    role: 'Lead Mobile Developer',
    status: 'Production',
    description: `A comprehensive maternal health application designed to bridge the gap between patients and healthcare providers. The app enables real-time CTG (cardiotocography) monitoring by streaming fetal heart rate data from a BLE medical device directly into the app.\n\nMothers can track pregnancy milestones, receive push notifications for appointments, and share clinical reports instantly with their ob-gyn. The system was built with an offline-first architecture ensuring reliability in areas with poor connectivity.`,
    highlights: [
      'Real-time BLE data streaming from CTG hardware device',
      'Offline-first architecture with Supabase background sync',
      'Role-based access: patient, midwife, and doctor views',
      'Automated PDF report generation for clinical records',
      'Push notification reminders for prenatal checkups',
    ],
    gallery: [
      { url: '/sehati/Screenshot%202026-04-01%20141834.png', caption: 'CTG Monitoring Screen' },
      { url: '/sehati/Screenshot%202026-04-01%20141913.png', caption: 'Pregnancy Tracker' },
      { url: '/sehati/Screenshot%202026-04-01%20142025.png', caption: 'Doctor Dashboard' },
      { url: '/sehati/Screenshot%202026-04-01%20142118.png', caption: 'Report Generation' },
      { url: '/sehati/Screenshot%202026-04-01%20142206.png', caption: 'Patient Profile' },
      { url: '/sehati/Screenshot%202026-04-01%20142302.png', caption: 'Health Insights' },
    ],
    techStack: [
      { label: 'Flutter', group: 'Mobile' },
      { label: 'Dart', group: 'Mobile' },
      { label: 'BLoC', group: 'State Management' },
      { label: 'BLE (bluetooth_low_energy)', group: 'Hardware' },
      { label: 'Supabase', group: 'Backend' },
      { label: 'PostgreSQL', group: 'Database' },
      { label: 'Firebase FCM', group: 'Notifications' },
      { label: 'Figma', group: 'Design' },
    ],
  },
  abanggas: {
    id: 'abanggas',
    name: 'AbangGas',
    tagline: 'On-Demand Gas Delivery Platform',
    category: 'E-Commerce · Logistics',
    type: 'mobile',
    image: '/abanggas/abanggas_thumbnail.png',
    accent: '#f97316',
    year: '2024',
    role: 'Full-Stack Mobile Developer',
    status: 'Production',
    description: `An end-to-end e-commerce platform for liquefied petroleum gas delivery. Customers order gas cylinders via the app, track their delivery in real time on a live map, and pay through an integrated digital wallet powered by Doku.\n\nThe platform includes a dedicated driver app with route optimization and a Laravel-powered admin panel for dispatch management and inventory tracking.`,
    highlights: [
      'Live order tracking with Google Maps SDK integration',
      'Doku payment gateway & in-app wallet top-up',
      'Dedicated driver app with optimized routing',
      'Laravel admin panel for order dispatch & inventory',
      'Real-time order status push notifications',
    ],
    gallery: [
      { url: '/abanggas/Home%20-%20Guest%20Mode.png', caption: 'Home & Order Screen' },
      { url: '/abanggas/Cari%20agen.png', caption: 'Agent Search' },
      { url: '/abanggas/Products.png', caption: 'Product Catalog' },
      { url: '/abanggas/promo%20-%20detail%20_%20with%20t%26c.png', caption: 'Promo Detail' },
      { url: '/abanggas/status%20pesanan.png', caption: 'Order Status' },
    ],
    techStack: [
      { label: 'Flutter', group: 'Mobile' },
      { label: 'Dart', group: 'Mobile' },
      { label: 'BLoC', group: 'State Management' },
      { label: 'Laravel', group: 'Backend' },
      { label: 'Doku', group: 'Payment' },
      { label: 'Google Maps SDK', group: 'Services' },
      { label: 'MySQL', group: 'Database' },
      { label: 'REST API', group: 'Integration' },
    ],
  },
  ceosuite: {
    id: 'ceosuite',
    name: 'CEO SUITE',
    tagline: 'Premium Office Space Booking System',
    category: 'PropTech · Mobile',
    type: 'mobile',
    image: '/ceo_suite/ceosuite_thumbnail.png',
    accent: '#8b5cf6',
    year: '2023',
    role: 'Mobile Developer',
    status: 'Production',
    description: `A premium coworking and private office booking application serving high-end clientele. Users browse available rooms, check real-time availability, and complete bookings with integrated Midtrans payment processing.\n\nThe app features MobX for reactive state management, ensuring a smooth and responsive booking experience. It also supports membership tiers, loyalty points, and receipt generation.`,
    highlights: [
      'Real-time room availability with calendar view',
      'Midtrans payment gateway with multiple methods',
      'Membership tiers & loyalty points system',
      'Booking history and e-receipt generation',
      'MobX reactive state for snappy UI updates',
    ],
    gallery: [
      { url: '/ceo_suite/home%20-%20alt%201.png', caption: 'Office Listings' },
      { url: '/ceo_suite/product%20page.png', caption: 'Room Detail' },
      { url: '/ceo_suite/booking.png', caption: 'Booking Form' },
      { url: '/ceo_suite/Booking%20Details.png', caption: 'Booking Details' },
      { url: '/ceo_suite/success.png', caption: 'Payment Success' },
      { url: '/ceo_suite/Already%20Sign%20In.png', caption: 'Member Login' },
    ],
    techStack: [
      { label: 'Flutter', group: 'Mobile' },
      { label: 'Dart', group: 'Mobile' },
      { label: 'MobX', group: 'State Management' },
      { label: 'Midtrans', group: 'Payment' },
      { label: 'REST API', group: 'Integration' },
      { label: 'Firebase', group: 'Backend' },
      { label: 'Figma', group: 'Design' },
    ],
  },
  rtools: {
    id: 'rtools',
    name: 'RTools',
    tagline: 'Internal Retail Operations App',
    category: 'Enterprise · Mobile',
    type: 'mobile',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200&h=600',
    accent: '#10b981',
    year: '2023',
    role: 'IT Developer',
    status: 'Internal',
    description: `An internal mobile application built for PT Ramayana Lestari Sentosa to streamline retail operations across hundreds of store branches. The app provides real-time sales dashboards, inventory management, and staff management tools.\n\nA key security requirement was 1-device-1-account enforcement to prevent unauthorized access. Built with BLoC architecture for maintainability across a large codebase.`,
    highlights: [
      '1-device-1-account security enforcement',
      'Real-time sales and inventory dashboards',
      'Multi-branch support across 100+ stores',
      'BLoC architecture for scalable codebase',
      'Offline mode with background data sync',
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400&h=700', caption: 'Sales Dashboard' },
      { url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=400&h=700', caption: 'Inventory Management' },
      { url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=400&h=700', caption: 'Branch Overview' },
    ],
    techStack: [
      { label: 'Flutter', group: 'Mobile' },
      { label: 'Dart', group: 'Mobile' },
      { label: 'BLoC', group: 'State Management' },
      { label: 'REST API', group: 'Integration' },
      { label: 'SQL Server', group: 'Database' },
      { label: 'Laravel', group: 'Backend' },
    ],
  },
  tokophincon: {
    id: 'tokophincon',
    name: 'TokoPhincon',
    tagline: 'Android E-Commerce Training App',
    category: 'E-Commerce · Android',
    type: 'mobile',
    image: '/vault/home.png',
    accent: '#ef4444',
    year: '2023',
    role: 'Android Trainee',
    status: 'Training Project',
    description: `A fully-featured Android e-commerce application developed during training at PT Phincon. Built from scratch following Clean Architecture and MVVM principles, the app demonstrates production-level Android development practices.\n\nFeatures include product catalog with search/filter, cart management, user authentication with JWT, and order history. Retrofit handles all REST API communication with proper error handling.`,
    highlights: [
      'Clean Architecture (MVVM) from the ground up',
      'Product catalog with search, filter, and sort',
      'JWT-based authentication & session management',
      'Cart & checkout with order history',
      'Retrofit + OkHttp for robust API integration',
    ],
    gallery: [
      { url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=400&h=700', caption: 'Product Catalog' },
      { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=400&h=700', caption: 'Shopping Cart' },
      { url: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400&h=700', caption: 'Checkout Flow' },
    ],
    techStack: [
      { label: 'Kotlin', group: 'Android' },
      { label: 'MVVM', group: 'Architecture' },
      { label: 'Clean Architecture', group: 'Architecture' },
      { label: 'Retrofit', group: 'Networking' },
      { label: 'Room DB', group: 'Database' },
      { label: 'Coroutines', group: 'Async' },
      { label: 'Hilt', group: 'DI' },
      { label: 'REST API', group: 'Integration' },
    ],
  },
  adms: {
    id: 'adms',
    name: 'ADMS Arista',
    tagline: 'Automotive Dealer Management System',
    category: 'Enterprise · Backend',
    type: 'web',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=1200&h=600',
    accent: '#06b6d4',
    year: '2024',
    role: 'IT Supervisor / Senior Staff Developer',
    status: 'Production',
    description: `A large-scale API integration layer connecting ATPM (Agen Tunggal Pemegang Merek) manufacturer systems with PT Arista Group's internal Automotive Dealer Management System. Built with Golang for high-throughput, low-latency data exchange.\n\nAlso conducted internal AI research for business intelligence features, exploring LLM-based insights for sales forecasting and inventory prediction.`,
    highlights: [
      'High-throughput API bridge between ATPM and ADMS',
      'Golang microservices for performance-critical paths',
      'AI/LLM research for BI sales forecasting',
      'PostgreSQL with complex multi-join reporting queries',
      'CI/CD pipeline via Codemagic for automated deploys',
    ],
    gallery: [
      { url: '/vault/home.png', caption: 'API Architecture Overview' },
      { url: '/vault/booking', caption: 'Analytics Dashboard' },
      { url: '/vault/pg.png', caption: 'Dealer Management Panel' },
      { url: '/vault/admin.png', caption: 'Dealer Management Panel' },
    ],
    techStack: [
      { label: 'Golang', group: 'Backend' },
      { label: 'Laravel', group: 'Backend' },
      { label: 'PostgreSQL', group: 'Database' },
      { label: 'SQL Server', group: 'Database' },
      { label: 'REST API', group: 'Integration' },
      { label: 'AI / LLM', group: 'Research' },
      { label: 'Codemagic CI/CD', group: 'DevOps' },
      { label: 'Postman', group: 'Tools' },
    ],
  },
   vault: {
    id: 'vault',
    name: 'Vault Auto Museum',
    tagline: 'Automotive Dealer Management System',
    category: 'Enterprise · Backend',
    type: 'web',
    image: '/vault/home.png', 
    accent: '#06b6d4',
    year: '2024',
    role: 'IT Supervisor / Senior Staff Developer',
    status: 'Production',
    description: `A large-scale API integration layer connecting ATPM (Agen Tunggal Pemegang Merek) manufacturer systems with PT Arista Group's internal Automotive Dealer Management System. Built with Golang for high-throughput, low-latency data exchange.\n\nAlso conducted internal AI research for business intelligence features, exploring LLM-based insights for sales forecasting and inventory prediction.`,
    highlights: [
      'High-throughput API bridge between ATPM and ADMS',
      'Golang microservices for performance-critical paths',
      'AI/LLM research for BI sales forecasting',
      'PostgreSQL with complex multi-join reporting queries',
      'CI/CD pipeline via Codemagic for automated deploys',
    ],
    gallery: [
      { url: '/vault/home.png', caption: 'home' },
      { url: '/vault/booking.png', caption: 'booking' },
      { url: '/vault/pg.png', caption: 'payment-getway' },
      { url: '/vault/admin.png', caption: 'admin' },
    ],
    techStack: [
      { label: 'Golang', group: 'Backend' },
      { label: 'Laravel', group: 'Backend' },
      { label: 'PostgreSQL', group: 'Database' },
      { label: 'SQL Server', group: 'Database' },
      { label: 'REST API', group: 'Integration' },
      { label: 'AI / LLM', group: 'Research' },
      { label: 'Codemagic CI/CD', group: 'DevOps' },
      { label: 'Postman', group: 'Tools' },
    ],
  },
  
};

const groupTech = (stack) =>
  stack.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item.label);
    return acc;
  }, {});

// ─── Phone Frame ──────────────────────────────────────────────────────────────
const PhoneFrame = ({ src, caption, onClick }) => (
  <div className="flex flex-col items-center gap-3 cursor-pointer group" onClick={onClick}>
    <div className="relative transition-transform duration-300 group-hover:scale-105" style={{ width: 150 }}>
      <div
        className="relative rounded-[2rem] overflow-hidden shadow-2xl"
        style={{ background: '#1e293b', border: '8px solid #334155', boxShadow: '0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px #475569' }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 rounded-b-xl" style={{ width: 56, height: 14, background: '#1e293b' }} />
        {/* Screen */}
        <div style={{ paddingTop: '177%', position: 'relative' }}>
          <img src={src} alt={caption} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full backdrop-blur">View</span>
          </div>
        </div>
        {/* Home bar */}
        <div className="flex justify-center py-2">
          <div className="w-10 h-1 rounded-full bg-slate-600" />
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-500 text-center leading-tight max-w-[120px]">{caption}</p>
  </div>
);

// ─── Browser Frame ────────────────────────────────────────────────────────────
const BrowserFrame = ({ src, caption, accent, onClick }) => (
  <div className="flex flex-col gap-2 cursor-pointer group" onClick={onClick}>
    <div
      className="relative rounded-xl overflow-hidden transition-transform duration-300 group-hover:scale-[1.015]"
      style={{ background: '#1e293b', border: '1px solid #334155', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4" style={{ height: 36, background: '#0f172a', borderBottom: '1px solid #334155' }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <div className="flex-1 mx-3 px-3 py-1 rounded text-xs text-slate-500 flex items-center gap-1.5" style={{ background: '#1e293b', border: '1px solid #334155' }}>
          <span style={{ color: accent, fontSize: 10 }}>●</span>
          <span className="truncate text-slate-400">{caption.toLowerCase().replace(/\s+/g, '-')}.internal</span>
        </div>
      </div>
      {/* Screenshot */}
      <div style={{ paddingTop: '58%', position: 'relative' }}>
        <img src={src} alt={caption} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <span className="text-white text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full backdrop-blur">Expand</span>
        </div>
      </div>
    </div>
    <p className="text-xs text-slate-500 pl-1">{caption}</p>
  </div>
);

// ─── Lightbox ─────────────────────────────────────────────────────────────────
const Lightbox = ({ images, startIndex, onClose }) => {
  const [idx, setIdx] = useState(startIndex);
  const overlayRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    animate(overlayRef.current, { opacity: [0, 1], duration: 250, ease: 'outQuart' });
    animate(imgRef.current, { opacity: [0, 1], scale: [0.88, 1], duration: 350, ease: 'outBack(1.4)' });
  }, []);

  useEffect(() => {
    if (imgRef.current) animate(imgRef.current, { opacity: [0.4, 1], scale: [0.96, 1], duration: 250, ease: 'outQuart' });
  }, [idx]);

  const prev = () => setIdx(i => (i - 1 + images.length) % images.length);
  const next = () => setIdx(i => (i + 1) % images.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ opacity: 0, background: 'rgba(2,6,23,0.96)' }}
      onClick={e => { if (e.target === overlayRef.current) onClose(); }}
    >
      <button className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors p-2" onClick={onClose}>
        <X size={22} />
      </button>
      {images.length > 1 && (
        <button className="absolute left-4 md:left-8 text-slate-400 hover:text-white transition-colors p-2 z-10" onClick={prev}>
          <ChevronLeft size={32} />
        </button>
      )}
      <div ref={imgRef} className="w-full max-w-2xl px-12 md:px-20" style={{ opacity: 0 }}>
        <img src={images[idx].url} alt={images[idx].caption} className="w-full rounded-2xl shadow-2xl object-contain max-h-[80vh]" />
        <p className="text-center text-slate-400 text-sm mt-4 font-medium">{images[idx].caption}</p>
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-3">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                className="rounded-full transition-all duration-200"
                style={{ width: i === idx ? 20 : 6, height: 6, background: i === idx ? '#fff' : '#475569' }}
              />
            ))}
          </div>
        )}
      </div>
      {images.length > 1 && (
        <button className="absolute right-4 md:right-8 text-slate-400 hover:text-white transition-colors p-2 z-10" onClick={next}>
          <ChevronRight size={32} />
        </button>
      )}
    </div>
  );
};

// ─── Gallery Section ──────────────────────────────────────────────────────────
const ProjectGallery = ({ project }) => {
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const galleryRef = useRef(null);
  const frameRefs = useRef([]);

  useEffect(() => { frameRefs.current = []; }, [project.id]);

  useEffect(() => {
    if (!galleryRef.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      animate(galleryRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 500, ease: 'outExpo' });
      const frames = frameRefs.current.filter(Boolean);
      animate(frames, {
        opacity: [0, 1],
        translateY: [40, 0],
        scale: [0.92, 1],
        duration: 600,
        delay: stagger(100, { start: 200 }),
        ease: 'outBack(1.2)',
      });
    }, { threshold: 0.05 });
    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [project.id]);

  const isMobile = project.type === 'mobile';

  return (
    <>
  <div ref={galleryRef} className="w-full max-w-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xs font-bold uppercase tracking-widest whitespace-nowrap" style={{ color: project.accent }}>
            {isMobile ? '📱 App Screens' : '🖥️ Interface Preview'}
          </h2>
          <div className="flex-1 h-px" style={{ background: `${project.accent}25` }} />
          <span className="text-xs text-slate-600 whitespace-nowrap">
            {project.gallery.length} screens
          </span>
        </div>

        {isMobile ? (
          /* Phone frames — scrollable row */
         <div
        className="flex w-full max-w-full gap-6 overflow-x-auto overflow-y-hidden pb-4 scroll-smooth"
        style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
        }}
        >
        {project.gallery.map((item, i) => (
            <div
            key={i}
            ref={el => { frameRefs.current[i] = el; }}
            className="flex-shrink-0"
            style={{ width: 160 }}
            >
            <PhoneFrame
                src={item.url}
                caption={item.caption}
                onClick={() => setLightboxIdx(i)}
            />
            </div>
        ))}
        </div>
        ) : (
          /* Browser frames — stacked */
          <div className="space-y-5">
            {project.gallery.map((item, i) => (
              <div key={i} ref={el => { frameRefs.current[i] = el; }} style={{  }}>
                <BrowserFrame src={item.url} caption={item.caption} accent={project.accent} onClick={() => setLightboxIdx(i)} />
              </div>
            ))}
          </div>
        )}
      </div>

      {lightboxIdx !== null && (
        <Lightbox images={project.gallery} startIndex={lightboxIdx} onClose={() => setLightboxIdx(null)} />
      )}
    </>
  );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
export const ProjectDetailPage = ({ projectId, onBack }) => {
  const project = PROJECT_DATA[projectId];

  const heroRef       = useRef(null);
  const titleRef      = useRef(null);
  const metaRef       = useRef(null);
  const overviewRef   = useRef(null);
  const featuresRef   = useRef(null);
  const techColRef    = useRef(null);
  const highlightsRef = useRef([]);
  const tagRefs       = useRef([]);

  useEffect(() => { highlightsRef.current = []; tagRefs.current = []; }, [projectId]);

  useEffect(() => {
    if (!project) return;
    window.scrollTo(0, 0);

    animate(heroRef.current, { opacity: [0, 1], scale: [1.04, 1], duration: 900, ease: 'outExpo' });
    animate(titleRef.current, { opacity: [0, 1], translateY: [40, 0], duration: 700, delay: 200, ease: 'outExpo' });
    animate(metaRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 600, delay: 400, ease: 'outQuart' });

    const t1 = setTimeout(() => {
      if (overviewRef.current) animate(overviewRef.current, { opacity: [0, 1], translateY: [30, 0], duration: 600, ease: 'outExpo' });
      if (techColRef.current) animate(techColRef.current, { opacity: [0, 1], translateY: [30, 0], duration: 600, ease: 'outExpo' });
    }, 500);

    const t2 = setTimeout(() => {
      if (featuresRef.current) animate(featuresRef.current, { opacity: [0, 1], translateY: [20, 0], duration: 500, ease: 'outExpo' });
    }, 700);

    const t3 = setTimeout(() => {
      const highlights = highlightsRef.current.filter(Boolean);
      if (highlights.length > 0) animate(highlights, { opacity: [0, 1], translateX: [-24, 0], duration: 500, delay: stagger(80), ease: 'outExpo' });
      const tags = tagRefs.current.filter(Boolean);
      if (tags.length > 0) animate(tags, { opacity: [0, 1], scale: [0.6, 1], duration: 400, delay: stagger(35), ease: 'outBack(2)' });
    }, 900);

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [projectId, project]);

  if (!project) return null;

  const grouped = groupTech(project.techStack);
  let tagIdx = 0;

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Back */}
      <div className="fixed top-6 left-6 z-50">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 backdrop-blur border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all text-sm font-medium"
          onMouseEnter={e => animate(e.currentTarget, { translateX: -3, duration: 200, ease: 'outQuart' })}
          onMouseLeave={e => animate(e.currentTarget, { translateX: 0, duration: 200, ease: 'outQuart' })}
        >
          <ArrowLeft size={15} /> Back
        </button>
      </div>

      {/* Hero */}
      <div ref={heroRef} className="relative h-[55vh] w-full overflow-hidden" style={{ opacity: 0, borderBottom: `2px solid ${project.accent}22` }}>
        <img src={project.image} alt={project.name} className="w-full h-full object-cover" style={{ filter: 'brightness(0.35) saturate(0.7)' }} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
        {/* Badges */}
        <div className="absolute top-8 right-8 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: '#ffffff11', color: '#94a3b8', border: '1px solid #33415544' }}>
            {project.type === 'mobile' ? '📱 Mobile' : '🖥️ Web'}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
            style={{ background: `${project.accent}22`, color: project.accent, border: `1px solid ${project.accent}44` }}>
            {project.status}
          </span>
        </div>
        <div ref={titleRef} className="absolute bottom-10 left-8 md:left-16" style={{ opacity: 0 }}>
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: project.accent }}>{project.category}</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none mb-2">{project.name}</h1>
          <p className="text-slate-400 text-lg md:text-xl">{project.tagline}</p>
        </div>
      </div>

      {/* Meta */}
      <div ref={metaRef} className="border-b border-slate-800" style={{ opacity: 0 }}>
        <div className="max-w-5xl mx-auto px-6 md:px-16 py-6 flex flex-wrap gap-8">
          {[
            { icon: <User size={14} />, label: 'Role', value: project.role },
            { icon: <Calendar size={14} />, label: 'Year', value: project.year },
            { icon: <Tag size={14} />, label: 'Category', value: project.category },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="text-slate-500">{item.icon}</span>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-sm font-semibold text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16">
        <div className="grid md:grid-cols-3 gap-16 min-w-0">

          {/* Left col */}
          <div className="md:col-span-2 space-y-12 min-w-0">
            {/* Overview */}
            <div ref={overviewRef} style={{ opacity: 0 }}>
              <h2 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: project.accent }}>Overview</h2>
              {project.description.split('\n\n').map((para, i) => (
                <p key={i} className="text-slate-300 leading-relaxed mb-4 text-[15px]">{para}</p>
              ))}
            </div>

            {/* Gallery */}
            <ProjectGallery project={project} />

            {/* Features */}
            <div ref={featuresRef} >
              <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: project.accent }}>Key Features</h2>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} ref={el => { highlightsRef.current[i] = el; }} className="flex items-start gap-3" style={{ opacity: 0 }}>
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: project.accent }} />
                    <span className="text-slate-300 text-sm leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right col */}
          <div ref={techColRef} style={{ opacity: 0 }}>
            <h2 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: project.accent }}>Tech Stack</h2>
            <div className="space-y-6">
              {Object.entries(grouped).map(([group, labels]) => (
                <div key={group}>
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{group}</p>
                  <div className="flex flex-wrap gap-2">
                    {labels.map((label) => {
                      const idx = tagIdx++;
                      return (
                        <span key={label} ref={el => { tagRefs.current[idx] = el; }}
                          className="px-3 py-1 rounded-md text-xs font-semibold"
                          style={{ opacity: 0, background: `${project.accent}18`, color: project.accent, border: `1px solid ${project.accent}33` }}
                          onMouseEnter={e => animate(e.currentTarget, { scale: 1.08, duration: 150, ease: 'outQuart' })}
                          onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 200, ease: 'outBack' })}
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 h-px w-full" style={{ background: `${project.accent}22` }} />

            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold"
                style={{ background: project.accent, color: '#fff' }}
                onMouseEnter={e => animate(e.currentTarget, { scale: 1.02, duration: 150, ease: 'outQuart' })}
                onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 200, ease: 'outBack' })}>
                <ExternalLink size={14} /> View Live
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white transition-all"
                onMouseEnter={e => animate(e.currentTarget, { scale: 1.02, duration: 150, ease: 'outQuart' })}
                onMouseLeave={e => animate(e.currentTarget, { scale: 1, duration: 200, ease: 'outBack' })}>
                <Github size={14} /> Source Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};