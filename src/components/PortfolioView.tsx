/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Filter, 
  ArrowUpRight, 
  X, 
  Sparkles, 
  Calendar, 
  Users, 
  CodeXml, 
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';
import { Project } from '../types';

interface PortfolioViewProps {
  projects: Project[];
}

export default function PortfolioView({ projects }: PortfolioViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  // Categories extracted dynamically from database projects for robust matching + 'All'
  const filterCategories = ['All', 'Web Development', 'AI Automation', 'SaaS Development', 'Mobile Apps'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim());

  return (
    <div id="portfolio-view-container" className="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden">
      
      {/* Glow rings */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-990/15 rounded-full blur-[130px] pointer-events-none animate-glow-slow-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-emerald-850/10 rounded-full blur-[110px] pointer-events-none animate-glow-slow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Header segment */}
        <div className="text-center space-y-4 max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verdant Proven Implementations</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-none">
            Our Case Studies
          </h1>
          <p className="text-sm text-gray-400">
            A selective showcase of production systems, automated AI agent fleets, and core billing products deployed for partners worldwide. Click open any case card to view details.
          </p>
        </div>

        {/* Categories Filtering Pill Row */}
        <div 
          id="portfolio-filtering-row" 
          className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-6"
        >
          {filterCategories.map((cat, idx) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm transition-all font-semibold border cursor-pointer ${
                  isSelected 
                    ? 'bg-emerald-500 text-black border-emerald-500 shadow-lg font-bold' 
                    : 'bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              id={`portfolio-card-${p.id}`}
              onClick={() => setActiveProjectModal(p)}
              className="group rounded-[32px] bg-white/5 border border-white/10 hover:border-emerald-500/30 overflow-hidden cursor-pointer transition-all duration-300 backdrop-blur-xl relative flex flex-col justify-between shadow-2xl hover:-translate-y-1"
            >
              {/* Featured Badge tag in top left */}
              {p.featured && (
                <div className="absolute top-4 left-4 z-20 flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-emerald-500 text-[#030705] font-mono text-[9px] uppercase font-black tracking-widest shadow-md">
                  <Sparkles className="w-3 h-3 text-black" />
                  <span>Elite Feature</span>
                </div>
              )}

              {/* Display Unsplash Image container with zoom transitions */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-white/5">
                <img 
                  src={p.imageUrl} 
                  alt={p.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30" />
                
                {/* Custom float tech logo */}
                <span className="absolute bottom-4 right-4 bg-black/75 border border-white/10 text-[10px] text-gray-300 font-mono font-medium px-2.5 py-1 rounded-md">
                  {p.category}
                </span>
              </div>

              {/* Text briefs inside card */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1.5">
                  <h3 className="font-sans font-extrabold text-xl sm:text-2xl text-white group-hover:text-emerald-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Sub Tags pill block */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {p.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-mono text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Interactive bottom bar card */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-4 text-xs font-mono">
                  <span className="text-gray-500">
                    CLIENT: <strong className="text-gray-300 font-sans">{p.client || 'Enterprise'}</strong>
                  </span>
                  
                  <span className="text-emerald-400 group-hover:translate-x-1.5 transition-transform flex items-center space-x-1 uppercase font-bold text-[10px] tracking-wide">
                    <span>Explore Case Study</span>
                    <ArrowUpRight className="w-4 h-4 ml-0.5" />
                  </span>
                </div>
              </div>

            </div>
          ))}

          {filteredProjects.length === 0 && (
            <div className="col-span-1 md:col-span-2 text-center py-20 rounded-3xl border border-white/5 bg-[#090e0c]/10">
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block mb-1">DATA RESOLUTION WARNING</span>
              <p className="text-gray-400 font-sans text-sm">No systems found matching the selected category filter.</p>
            </div>
          )}
        </div>

      </div>

      {/* 4. DETAILS FLOATING CASE STUDY OVERLAY MODAL */}
      {activeProjectModal && (
        <div 
          id="case-study-details-modal" 
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="w-full max-w-4xl rounded-[32px] bg-neutral-950/95 border border-white/10 overflow-hidden shadow-2xl relative block animate-in zoom-in-95 duration-200">
            
            {/* Top Close indicator */}
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-xl bg-black/85 border border-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal cover block */}
            <div className="relative h-60 sm:h-80 w-full overflow-hidden">
              <img 
                src={activeProjectModal.imageUrl} 
                alt={activeProjectModal.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/50" />
              
              <div className="absolute bottom-6 left-6 sm:left-10 z-10 space-y-1 max-w-[80%]">
                <span className="px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-mono uppercase font-black tracking-widest shadow-lg">
                  {activeProjectModal.category}
                </span>
                <h2 className="font-sans font-black text-2xl sm:text-4xl text-white tracking-tight leading-tight mt-2">
                  {activeProjectModal.title}
                </h2>
              </div>
            </div>

            {/* Body contents */}
            <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Detailed Technical Writes Column (Left 2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase text-emerald-500 font-extrabold">
                    SYSTEM CASE STUDY OUTLINE
                  </h4>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-white">
                    The Problem & Engineering Solution
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans whitespace-pre-wrap">
                  {activeProjectModal.detailedCaseStudy || 'This technical deployment centered around eliminating database replication bottlenecks, upgrading UI layer responsiveness, and packing custom JWT security headers. The unified application achieves impeccable latency performance.'}
                </p>

                {/* Simulated Success nodes */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <h4 className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase block font-bold flex items-center space-x-1.5 ">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>ENGINEERING SUCCESS CRITERIA</span>
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400 font-sans">
                    <li>• Sub-millisecond database queries</li>
                    <li>• Automated QA coverage exceeded 90%</li>
                    <li>• Secure CORS-safe API proxying</li>
                    <li>• Zero downtime Cloud Run routing</li>
                  </ul>
                </div>
              </div>

              {/* Sidebar Quick Details column (Right 1 col) */}
              <div className="space-y-6 lg:border-l lg:border-white/5 lg:pl-8">
                
                {/* Details grid widget */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-extrabold">
                    METADATA PARAMS
                  </h4>
                  
                  <div className="space-y-3 text-xs">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>
                        CLIENT: <strong className="text-white font-sans">{activeProjectModal.client || 'Quant Financial'}</strong>
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>
                        LAUNCHED: <strong className="text-white font-mono">{activeProjectModal.launchDate || '2026-04'}</strong>
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 text-gray-400">
                      <CodeXml className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span>
                        STACK: <strong className="text-white font-sans">TS Engine, Tailwind</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stacks details */}
                <div className="space-y-2 pt-2 border-t border-white/5 font-sans">
                  <h4 className="text-[10px] font-mono tracking-widest uppercase text-gray-500 font-extrabold">
                    DEVELOPED ARTIFACTS
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProjectModal.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Live simulated triggers */}
                {activeProjectModal.liveUrl && (
                  <div className="pt-6 border-t border-white/5">
                    <a
                      href={activeProjectModal.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider hover:bg-emerald-400 hover:shadow-[0_0_12px_#10b981] transition-all"
                    >
                      <span>Launch Live Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}

              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
