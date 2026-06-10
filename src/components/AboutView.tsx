/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  Sparkles, 
  Target, 
  Flame, 
  GraduationCap, 
  Linkedin, 
  Twitter, 
  Cpu, 
  ShieldAlert,
  Terminal,
  Clock
} from 'lucide-react';

export default function AboutView() {
  
  const values = [
    {
      icon: Terminal,
      title: 'Architectural Cleanness',
      desc: 'We never write heavy throwaway bundles. We structure custom type grids, separate API proxies, and avoid inline hacks. Your codebase will look impeccable and survive multiple major upgrades without refactoring.'
    },
    {
      icon: Flame,
      title: 'Obsessive Speed',
      desc: 'Load time is a high-ticket customer conversion metrics. We benchmark and prune scripts meticulously to score >98% Lighthouse ratings out-of-the-box, giving your brand immediate competitive advantages in organic listings.'
    },
    {
      icon: Cpu,
      title: 'AI Native Operational Systems',
      desc: 'We believe human capital should think, not key. By architecting advanced server-side multi-agent pipelines with Gemini SDK integrations, we eliminate routine data silos and accelerate workflows up to 80x.'
    }
  ];

  const milestones = [
    { year: '2022', title: 'Agency Incubation', desc: 'Verdant Digital incubated in San Francisco as a high-end visual design boutique, creating immersive canvas structures.' },
    { year: '2023', title: 'Core Full-Stack Expansion', desc: 'Introduced Node.js and Postgres engineering pipelines, scaling from simple branding to complex subscription payment hubs.' },
    { year: '2024', title: 'AI Integration Rollout', desc: 'Pioneered custom AI agent orchestration models for logistics and healthcare clients, drastically lowering customer operations overhead.' },
    { year: '2026', title: 'The Multi-Agent Tech standard', desc: 'Operating as a premier technical business agency, transforming manual corporate processes into scalable algorithms.' }
  ];

  const team = [
    {
      name: 'Muhammad Mawiya',
      role: 'Global Tech Lead & Founder',
      bio: 'Enterprise systems architect specializing in secure hybrid React, cloud orchestration engines, and high-performance Web APIs.',
      imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop'
    },
    {
      name: 'Sarah Chen',
      role: 'Lead UI/UX Architect',
      bio: 'Former senior interaction director. Passionate about color pairings, backdrop filters, typography grids, and micro-interactions.',
      imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop'
    },
    {
      name: 'Alex Vance',
      role: 'AI Workflows Lead',
      bio: 'Pioneered custom multi-agent architectures utilizing Google Gemini models. Specialist in token efficiency systems.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
    }
  ];

  return (
    <div id="about-view-container" className="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden font-sans">
      
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none animate-glow-slow-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-emerald-850/10 rounded-full blur-[110px] pointer-events-none animate-glow-slow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* Mission Segment */}
        <section className="text-center space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Principles & Vision</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-none animate-pulse">
            We build what experts mock.
          </h1>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed pt-2">
            Verdant Digital was established with a singular focus: to strip away the bloat of modern software engineering. We pair tactile aesthetic mastery with secure production architectures to render absolute digital supremacy.
          </p>
        </section>

        {/* Core Values Bento Grid */}
        <section className="space-y-12 animate-in fade-in duration-500">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight text-center">
            How We Execute
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const IconComp = v.icon;
              return (
                <div key={i} className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden shadow-2xl space-y-4 transition-all duration-300 hover:border-emerald-500/20 hover:-translate-y-1">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-sans font-bold text-lg text-white">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-normal">
                    {v.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Corporate Timeline History */}
        <section className="space-y-12">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight text-center">
            Operational Milestones
          </h2>
          <div className="max-w-4xl mx-auto relative border-l border-white/10 pl-6 sm:pl-10 space-y-12 py-4">
            {milestones.map((mil, idx) => (
              <div key={idx} className="relative group">
                {/* Glowing Dot indicator */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-4 h-4 bg-[#050505] border-2 border-emerald-500 rounded-full group-hover:bg-emerald-400 group-hover:scale-110 transition-all shadow-[0_0_8px_#10b981]" />
                
                <div className="space-y-1.5">
                  <span className="font-mono text-xs text-emerald-400 font-bold tracking-widest uppercase mb-1 block">
                    YEAR OF {mil.year}
                  </span>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-white group-hover:text-emerald-300 transition-colors">
                    {mil.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans pr-4">
                    {mil.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Executive Directors section */}
        <section className="space-y-12">
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight text-center">
            Leadership Behind the Code
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((t, i) => (
              <div 
                key={i} 
                className="rounded-[32px] bg-white/5 border border-white/10 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col items-center p-6 text-center group hover:border-emerald-500/20 transition-all duration-300"
              >
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/15 group-hover:border-emerald-500/50 transition-all duration-300 mb-4">
                  <img src={t.imageUrl} alt={t.name} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1">
                  <h3 className="font-sans font-bold text-base sm:text-lg text-white">
                    {t.name}
                  </h3>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest font-bold">
                    {t.role}
                  </span>
                  <p className="text-xs text-gray-400 leading-relaxed pt-2 px-2">
                    {t.bio}
                  </p>
                </div>

                {/* Social icons on card elements */}
                <div className="flex items-center space-x-3 pt-4 text-gray-500">
                  <Linkedin className="w-4 h-4 hover:text-emerald-400 transition-colors cursor-pointer" />
                  <Twitter className="w-4 h-4 hover:text-emerald-400 transition-colors cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
