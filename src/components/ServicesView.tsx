/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  CodeXml, 
  Bot, 
  Cpu, 
  Smartphone, 
  Palette, 
  Search, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface ServicesViewProps {
  setTab: (tab: string) => void;
}

export default function ServicesView({ setTab }: ServicesViewProps) {
  
  const servicesList = [
    {
      id: 'web',
      icon: CodeXml,
      title: 'Web Development',
      tagline: 'High-speed, server-first, fluid interfaces.',
      desc: 'We construct digital platforms and brand landing pages designed to hydrate fully in milliseconds. Overweight client bundles are dropped in favor of static edge delivery and modular hydration grids.',
      techStack: ['React 19', 'Next.js', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      metrics: ['Core Web Vitals > 98%', 'Mobile Speed under 1.2s', '99.9% Cloud Run Uptime'],
      color: 'border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
    },
    {
      id: 'ai',
      icon: Bot,
      title: 'AI Automation & Agents',
      tagline: 'Multi-agent environments executing routine audits.',
      desc: 'Elevate your enterprise operators to workflow choreographers. We deploy coordinated autonomous developer networks that parse contract clauses, process invoices, and manage client-assistance tickers.',
      techStack: ['Gemini API SDK', 'Multi-Agent Frameworks', 'Intelligent Prompt Engineering', 'Vector Database Systems'],
      metrics: ['70% reduction in average ticket handling times', 'Save up to 40% on operating overhead', 'Secure local prompt caching'],
      color: 'border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
    },
    {
      id: 'saas',
      icon: Cpu,
      title: 'SaaS Development',
      tagline: 'Scalable subscription architectures ready to process.',
      desc: 'Robust multi-tenant backends engineered to route secure subscription metrics without failure. Includes client billing portals, pricing matrices, usage trackers, and webhook listeners.',
      techStack: ['Node.js', 'Express', 'Prisma ORM', 'PostgreSQL', 'JWT Authentication', 'Stripe Integration'],
      metrics: ['Durable JWT security protocols', '14% relative decrease in credit card failures', 'Flexible metered billing options'],
      color: 'border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
    },
    {
      id: 'mobile',
      icon: Smartphone,
      title: 'Mobile Applications',
      tagline: 'Premium native apps running smooth 120 FPS.',
      desc: 'Immersive iOS and Android tools that feel tactile and responsive. Integrated directly with your private cloud database and core notification routers to maximize daily active users.',
      techStack: ['React Native', 'Expo System', 'Swift / Kotlin', 'Secure SQLite Cache', 'Push Event Engines'],
      metrics: ['Average App Store rating over 4.7', 'Smooth 120Hz native frames', 'Offline durability caching'],
      color: 'border-[#10b981]/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
    },
    {
      id: 'design',
      icon: Palette,
      title: 'UI/UX Design Systems',
      tagline: 'High-contrast, dark-mode, glass visual design.',
      desc: 'Exquisite aesthetic pairings to command premium service values. Our systems leverage backdrop blur layers, emerald highlight triggers, balanced proportions, and physical visual hierarchies.',
      techStack: ['Luxury Dark Mode Design', 'Custom Figma Libraries', 'Interactive Prototypes', 'Responsive CSS Tokens'],
      metrics: ['35% surge in client session duration', 'Consistent CSS variable matching', 'Fully WCAG double-A alignment'],
      color: 'border-teal-500/20 shadow-[0_0_15px_rgba(20,184,166,0.05)]'
    },
    {
      id: 'seo',
      icon: Search,
      title: 'SEO & Growth Auditing',
      tagline: 'Technical crawability and conversion optimization.',
      desc: 'Rank organically where intent is high. We perform code optimization audits, configure metadata trees, construct structured schema tags, and align key marketing positions.',
      techStack: ['Technical Crawler Alignment', 'Custom Schema Markups', 'Core Speed Optimization', 'Analytics Instrumentation'],
      metrics: ['Top 3 ranks on high-value business buyer tags', 'Search impressions surge over 120%', 'Duble organic conversion ratios'],
      color: 'border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
    }
  ];

  const handleBookService = (serviceName: string) => {
    // Navigate to contact and focus inquiry message with dynamic service selection
    setTab('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="services-view-container" className="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none animate-glow-slow-1" />
      <div className="absolute bottom-[10%] left-[-10%] w-[450px] h-[450px] bg-emerald-850/10 rounded-full blur-[110px] pointer-events-none animate-glow-slow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Header Block and Brand Pitch */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verdant Service Standard</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            What We Build
          </h1>
          <p className="text-sm sm:text-base text-gray-400">
            Professional enterprise-level technical services. We do not cut corners. We do not write bloated scripts. Everything compiles securely, loads instantly, and runs with elite speed.
          </p>
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv) => {
            const IconComp = srv.icon;
            return (
              <div
                key={srv.id}
                id={`service-card-${srv.id}`}
                className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between shadow-2xl relative group"
              >
                <div className="space-y-6">
                  {/* Top Header and Icons */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-[10px] text-gray-600 font-black tracking-widest uppercase">
                      // {srv.id.toUpperCase()}_ENG_0
                    </span>
                  </div>

                  {/* Descriptions block */}
                  <div className="space-y-2">
                    <h3 className="font-sans font-bold text-xl text-white">
                      {srv.title}
                    </h3>
                    <p className="font-sans text-xs text-emerald-400 font-semibold tracking-wide">
                      {srv.tagline}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed pt-1">
                      {srv.desc}
                    </p>
                  </div>

                  {/* Dev Technologies Pillars */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-extrabold">
                      Technology Stack
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {srv.techStack.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-mono text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Operations Metrics List */}
                  <div className="space-y-2 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-mono tracking-widest uppercase text-emerald-500 font-extrabold">
                      Target Outcome Metrics
                    </h4>
                    <ul className="space-y-1.5 text-xs text-gray-400 font-medium">
                      {srv.metrics.map((met, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{met}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Submit Cta button */}
                <div className="pt-8">
                  <button
                    id={`service-book-btn-${srv.id}`}
                    onClick={() => handleBookService(srv.title)}
                    className="w-full relative flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-white hover:bg-emerald-500 text-black hover:text-white text-xs font-bold uppercase transition-all duration-300 cursor-pointer shadow-lg group-hover:shadow-emerald-500/10"
                  >
                    <span>Request Blueprint Consultation</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Closing banner */}
        <div className="rounded-[32px] bg-white/5 border border-white/10 p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="space-y-1 text-center md:text-left relative z-10">
            <h3 className="font-sans font-bold text-lg text-white">
              Seeking custom platform engineering specifications?
            </h3>
            <p className="text-xs text-gray-400">
              We design hybrid multi-tenant portals, custom offline-first native components, and unified LLM logic.
            </p>
          </div>
          <button
            onClick={() => setTab('contact')}
            className="w-full md:w-auto px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 cursor-pointer uppercase relative z-10 shadow-lg"
          >
            Schedule Free Strategy Briefing
          </button>
        </div>

      </div>
    </div>
  );
}
