/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Terminal, 
  TrendingUp, 
  ChevronDown, 
  ShieldCheck, 
  Star,
  Users,
  CodeXml,
  Bot
} from 'lucide-react';
import { Testimonial } from '../types';

interface HomeViewProps {
  setTab: (tab: string) => void;
  testimonials: Testimonial[];
}

export default function HomeView({ setTab, testimonials }: HomeViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const stats = [
    { value: '99%', label: 'Avg Lighthouse Speed', desc: 'Server-first optimization metrics' },
    { value: '$40M+', label: 'Volume Processed', desc: 'Secure custom credit-card routing' },
    { value: '70%', label: 'Ops Admin Saved', desc: 'Via coordinate AI agent flows' },
    { value: '45+', label: 'Products Deployed', desc: 'Bespoke web agency builds' },
  ];

  const clientLogos = [
    { name: 'Aegis System', tech: 'AI Orchestrator' },
    { name: 'Aura Pay', tech: 'Core SaaS' },
    { name: 'Vanguard Realty', tech: 'Interactive Portal' },
    { name: 'QuantOps', tech: 'Data Hub' },
    { name: 'Nerve Health', tech: 'Web Systems' }
  ];

  const teaserServices = [
    {
      title: 'AI Workflow Integration',
      desc: 'Build coordinate autonomous networks. Multi-agent brains parsing logs, answering leads, and optimizing supplier bids.',
      icon: Bot,
      color: 'from-emerald-500 to-emerald-400'
    },
    {
      title: 'High-Performance Web Platforms',
      desc: 'Blazing edge server architectures with React 19. Scores above 98% on Core Web Vitals to maximize direct client checkouts.',
      icon: CodeXml,
      color: 'from-teal-500 to-emerald-400'
    },
    {
      title: 'Multi-Tenant SaaS Core',
      desc: 'Secure multi-tenant microservices, Stripe integrations, dynamic pricing tables, and client billing portals.',
      icon: Cpu,
      color: 'from-emerald-600 to-teal-400'
    }
  ];

  const faqs = [
    {
      q: 'Why should we prefer Verdant Digital over standard boilerplate teams?',
      a: 'We do not build generic template sites. Every line of our code is optimized for performance, security, and aesthetics. We are specialists in full-stack engineering, and we integrate Gemini AI models natively into your operations to secure tangible reductions in administrative labor.'
    },
    {
      q: 'Do you design custom multi-agent AI ecosystems for existing applications?',
      a: 'Absolutely. We analyze your team workflow bottlenecks (e.g., ticket responses, contract reviews, item categorizations) and deploy custom server-side autonomous agent workflows using modern models to execute these tasks securely in seconds.'
    },
    {
      q: 'How does your payment structure work for agency projects?',
      a: 'We work on transparent, fixed-scope development packages and milestone retainers. This ensures you know exactly when code modules compile, with zero hidden hourly fees. All contracts include direct slack channels with our tech directors.'
    },
    {
      q: 'Will our application be fully responsive and search-engine optimized?',
      a: 'Every platform we engineer comes built with responsive layouts and clean Semantic HTML. We secure technical SEO rankings, implement optimized site maps, structure schema tags, and target optimal Core Web Vitals scores by default.'
    }
  ];

  return (
    <div id="home-view-container" className="pt-28 space-y-28 bg-[#050505] overflow-hidden min-h-screen">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none animate-glow-slow-1"></div>
      <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] bg-emerald-850/10 rounded-full blur-[110px] pointer-events-none animate-glow-slow-2"></div>

      {/* 1. HERO HERO SECTION */}
      <header id="hero-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Hero Text */}
          <div className="col-span-1 lg:col-span-7 flex flex-col space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono">Next-Gen AI & Web Agency</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-bold leading-[1.05] tracking-tight text-white">
              Engineering <br/>
              <span className="text-emerald-500">Digital Prestige</span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-400 max-w-xl leading-relaxed">
              From AI-powered automations to high-performance SaaS ecosystems. We build the infrastructure for the world's most ambitious digital brands.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                id="hero-primary-cta"
                onClick={() => setTab('contact')}
                className="group flex items-center justify-center space-x-3 px-8 py-4 bg-emerald-600 rounded-2xl hover:bg-emerald-500 text-black font-extrabold text-sm uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(16,185,129,0.35)] cursor-pointer"
              >
                <span>Book Strategy Call</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                id="hero-secondary-cta"
                onClick={() => setTab('portfolio')}
                className="flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer text-sm"
              >
                <span>View Our Work</span>
              </button>
            </div>

            <div className="flex items-center space-x-4 pt-4">
              <div className="flex -space-x-2.5">
                <div className="w-9 h-9 rounded-full border-2 border-[#050505] bg-gray-800 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Partner 1" className="w-full h-full object-cover" />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#050505] bg-gray-700 flex items-center justify-center overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Partner 2" className="w-full h-full object-cover" />
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-[#050505] bg-emerald-900/60 flex items-center justify-center text-[10px] font-bold text-emerald-400">50+</div>
              </div>
              <span className="text-xs text-gray-500 font-medium">Trusted by global innovators for digital speed & scale</span>
            </div>
          </div>

          {/* Right: Glassmorphism Dashboard Preview */}
          <div className="col-span-1 lg:col-span-5 relative mt-8 lg:mt-0">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 sm:p-8 shadow-2xl relative z-10 transition-all duration-300 hover:border-white/20">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1 font-mono">Monthly Performance</p>
                  <h3 className="text-3xl font-extrabold text-emerald-400 tracking-tight">+124.8%</h3>
                </div>
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-sm font-medium text-white">AI Automation Engine</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">Active</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500/40"></div>
                    <span className="text-sm font-medium text-white">SEO Indexing Nodes</span>
                  </div>
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest text-opacity-50">Queued</span>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between hover:bg-white/10 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 font-bold"></div>
                    <span className="text-sm font-medium text-white">Global Scalability Metric</span>
                  </div>
                  <span className="text-xs font-mono text-emerald-300 uppercase font-bold">Optimal</span>
                </div>
              </div>

              <div className="mt-8 h-20 flex items-end justify-between px-2">
                <div className="w-2 h-8 bg-emerald-500/20 rounded-full transition-all duration-500 hover:h-12"></div>
                <div className="w-2 h-16 bg-emerald-500/40 rounded-full transition-all duration-500 hover:h-20"></div>
                <div className="w-2 h-12 bg-emerald-500/20 rounded-full transition-all duration-500 hover:h-16"></div>
                <div className="w-2 h-20 bg-emerald-500 rounded-full transition-all duration-500 hover:h-24"></div>
                <div className="w-2 h-10 bg-emerald-500/30 rounded-full transition-all duration-500 hover:h-14"></div>
                <div className="w-2 h-24 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.5)] transition-all duration-500 hover:h-28"></div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-600/30 rounded-full blur-3xl pointer-events-none"></div>
          </div>
        </div>
      </header>

      {/* 2. LOGOS CAROUSEL MOCKUP */}
      <section id="logos-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <p className="text-xs uppercase tracking-widest text-[#9ccdbe] font-mono mb-8 font-semibold">
          TRUSTED ENGINE FOR HIGH-GROWTH BRAND OPERATIONS
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clientLogos.map((lg, i) => (
            <div 
              key={i} 
              className="px-6 py-4 rounded-xl bg-[#090e0c]/60 border border-white/5 backdrop-blur-sm flex flex-col justify-center items-center aspect-[5/2] hover:border-emerald-500/20 transition-all group"
            >
              <span className="font-sans font-black text-sm tracking-tight text-gray-400 group-hover:text-white transition-colors uppercase">
                {lg.name}
              </span>
              <span className="font-mono text-[9px] text-emerald-500/60 group-hover:text-emerald-400 transition-colors">
                {lg.tech}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BUSINESS STATISTICS GRID */}
      <section id="statistics-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-b from-[#090e0c]/80 to-[#040706]/90 border border-white/5 rounded-3xl p-8 sm:p-12 relative overflow-hidden backdrop-blur-md shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((st, i) => (
              <div key={i} className="space-y-2 text-center sm:text-left">
                <p className="font-sans font-black text-4xl sm:text-5xl text-white tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">
                    {st.value}
                  </span>
                </p>
                <div>
                  <h4 className="font-sans font-bold text-sm text-emerald-400 tracking-wide">
                    {st.label}
                  </h4>
                  <p className="text-xs text-gray-500 leading-normal mt-0.5">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PREMIUM COMPRESSED PREVIEWS */}
      <section id="features-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Elite Digital Offerings
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-400">
            A meticulous pairing of cutting-edge artificial intelligence, resilient engineering frameworks, and premium web design styles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teaserServices.map((srv, idx) => {
            const IconComp = srv.icon;
            return (
              <div 
                key={idx} 
                className="group p-6 rounded-2xl bg-[#090e0c]/40 border border-white/5 hover:border-emerald-500/20 py-8 relative overflow-hidden backdrop-blur-sm shadow-xl hover:-translate-y-1 transition-all"
              >
                {/* Decorative hover light */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                
                <div className="inline-flex w-12 h-12 rounded-xl bg-emerald-950/80 border border-emerald-500/20 items-center justify-center text-emerald-400 mb-6 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                  <IconComp className="w-6 h-6" />
                </div>

                <h3 className="font-sans font-bold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {srv.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed mb-6">
                  {srv.desc}
                </p>

                <button
                  onClick={() => setTab('services')}
                  className="flex items-center space-x-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  <span>Explore Specs</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. SEEDED TESTIMONIALS SLATE */}
      <section id="testimonials-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Co-authored Success stories
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-400">
            Read direct feedback from international enterprise clients and software leaders who upgraded using our custom architectural designs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="p-6 rounded-2xl bg-[#090e0c]/50 border border-white/5 flex flex-col justify-between backdrop-blur-sm relative shadow-lg"
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-0.5 text-emerald-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm italic leading-relaxed">
                  "{t.feedback}"
                </p>
              </div>

              <div className="flex items-center space-x-3 pt-6 border-t border-white/5 mt-6">
                <img 
                  src={t.imageUrl} 
                  alt={t.name} 
                  className="w-10 h-10 rounded-full border border-emerald-500/20 object-cover"
                />
                <div>
                  <h4 className="font-sans font-bold text-xs text-white">
                    {t.name}
                  </h4>
                  <p className="text-[10px] text-gray-500">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. EXPANDABLE GORGEOUS FAQS GRID */}
      <section id="faqs-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Engineering FAQ
          </h2>
          <p className="max-w-xl mx-auto text-sm text-gray-400">
            Answers regarding integration limits, platform ownership, and contract delivery guidelines.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div 
                key={idx}
                className="rounded-xl border border-white/5 bg-[#090e0c]/40 overflow-hidden transition-all duration-300"
              >
                <button
                  id={`home-faq-toggle-${idx}`}
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between text-white hover:text-emerald-400 focus:outline-none cursor-pointer transition-colors"
                >
                  <span className="font-sans font-bold text-sm sm:text-base pr-4">
                    {f.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-emerald-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-white/5 text-xs sm:text-sm text-gray-400 leading-relaxed animate-in fade-in slide-in-from-top-1 duration-200">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. CONTACT ACTION STRIP CTA */}
      <section id="contact-cta-segment" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-tr from-[#091510] to-[#040806] border border-emerald-500/15 relative overflow-hidden backdrop-blur-md shadow-2xl text-center space-y-6">
          <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          <h3 className="font-sans font-black text-3xl sm:text-5xl text-white tracking-tight leading-none">
            Ready to upgrade your system metrics?
          </h3>
          
          <p className="max-w-lg mx-auto text-xs sm:text-sm text-gray-400">
            Schedule a comprehensive, value-briefing call with our software consultants. No obligations, direct action scoping.
          </p>

          <div>
            <button
              id="cta-bottom-btn"
              onClick={() => setTab('contact')}
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-sm uppercase tracking-wide shadow-lg cursor-pointer hover:shadow-cyan-500/15 transition-all"
            >
              <span>Initialize Scoping Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
