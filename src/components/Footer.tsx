/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Layers, 
  Send, 
  Linkedin, 
  Twitter, 
  Github, 
  Cpu, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Loader2
} from 'lucide-react';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/subscribers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      setLoading(false);
      
      if (res.ok) {
        setIsSuccess(true);
        setMessage(data.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setIsSuccess(false);
        setMessage(data.error || 'Subscription failed. Please check inputs.');
      }
    } catch (err) {
      setLoading(false);
      setIsSuccess(false);
      setMessage('Network error. Please try again.');
    }
  };

  const handleLinkClick = (tabValue: string) => {
    setTab(tabValue);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="agency-footer" className="bg-[#030605] border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      {/* Decorative localized glow layout */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-12 w-[300px] h-[300px] bg-emerald-900/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand pitch and corporate numbers */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-800 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <span className="font-sans font-extrabold text-xl tracking-tight text-white block">
                  Verdant<span className="text-emerald-400">.</span>
                </span>
                <span className="font-mono text-[9px] text-[#9ccdbe] uppercase tracking-widest block -mt-1 font-medium">
                  Digital Agency
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              We design and engineer bespoke AI Automation platforms, high-performance web products, and immersive digital designs for industry leaders.
            </p>

            <div className="space-y-2 pt-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-emerald-500" />
                <a href="mailto:muhammadmawiya5@gmail.com" className="hover:text-white transition-colors">
                  muhammadmawiya5@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span className="font-mono text-xs">+1 (555) VERDANT</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>San Francisco, California</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation map routes */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-3">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Web Engineering
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  AI Orchestration
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  SaaS Platforms
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Brand Systems & Design
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('services')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Technical SEO Audit
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Corporate shortcuts */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-3">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => handleLinkClick('about')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About Our Vision
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('portfolio')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('blog')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Engineering Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('contact')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Schedule Strategy Call
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('admin')} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscriber Core */}
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider border-l-2 border-emerald-500 pl-3">
              Verdant Dispatch
            </h4>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Receive raw technical briefings, operational guidelines, and AI automation research direct from our engineering desk.
            </p>

            <form id="footer-newsletter-form" onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative flex rounded-xl overflow-hidden border border-white/10 focus-within:border-emerald-500/50 bg-[#060a08] transition-all">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter business email"
                  required
                  className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-black px-4 cursor-pointer transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </div>

              {message && (
                <div 
                  id="newsletter-status-label"
                  className={`text-xs px-3 py-1.5 rounded-lg border ${
                    isSuccess 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-red-500/15 border-red-500/20 text-red-400'
                  }`}
                >
                  {message}
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Sleek Interface Bottom Tech Bar */}
        <div className="pt-8 pb-4 my-8 border-t border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap gap-x-12 gap-y-4">
            <div>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 font-mono">Capability</p>
              <p className="text-sm font-medium text-white">Full-Stack Typescript</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 font-mono">Intelligence</p>
              <p className="text-sm font-medium text-white">Custom GenAI Workflows</p>
            </div>
            <div>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mb-1 font-mono">Scale</p>
              <p className="text-sm font-medium text-white">Cloud Run Architecture</p>
            </div>
          </div>
          
          <div className="flex items-center flex-wrap gap-6 text-gray-500 grayscale opacity-45 font-black tracking-tighter text-sm">
            <span>CLOUDFLARE</span>
            <span>VERCEL</span>
            <span>PRISMA</span>
            <span>STRIPE</span>
          </div>
        </div>

        {/* Footer Base board */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500 space-y-4 sm:space-y-0">
          <div>
            <p>© 2026 Verdant Digital Agency. All rights reserved. Built with pride.</p>
            <p className="text-xs text-gray-600 mt-0.5">Author of Record: muhammadmawiya5@gmail.com</p>
          </div>

          {/* Social Icons links block */}
          <div className="flex items-center space-x-4">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-all">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-all">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-emerald-500/10 text-gray-400 hover:text-emerald-400 transition-all">
              <Github className="w-4 h-4" />
            </a>
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/5">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-gray-400">
                Core v2.6.8
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
