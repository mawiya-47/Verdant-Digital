/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  LayoutDashboard, 
  Layers, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  isAdminLoggedIn: boolean;
  onLogoutAdmin: () => void;
}

export default function Navbar({ currentTab, setTab, isAdminLoggedIn, onLogoutAdmin }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { label: 'Home', value: 'home' },
    { label: 'Services', value: 'services' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'About Us', value: 'about' },
    { label: 'Blog', value: 'blog' },
    { label: 'Contact', value: 'contact' },
  ];

  const handleTabClick = (tabValue: string) => {
    setTab(tabValue);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      id="main-navigation-bar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3.5 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo Brand with dynamic glowing cursor */}
          <button
            id="nav-logo-button"
            onClick={() => handleTabClick('home')}
            className="group flex items-center space-x-3 text-left cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center rotate-12 shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
              <div className="w-4 h-4 bg-black rounded-sm"></div>
            </div>
            <div>
              <span className="font-sans text-xl font-bold tracking-tight uppercase text-white">
                Verdant<span className="text-emerald-500">Digital</span>
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => {
              const isActive = currentTab === item.value;
              return (
                <button
                  key={item.value}
                  id={`nav-tab-${item.value}`}
                  onClick={() => handleTabClick(item.value)}
                  className={`text-sm font-medium transition-colors duration-300 cursor-pointer ${
                    isActive 
                      ? 'text-emerald-400 font-semibold' 
                      : 'text-gray-400 hover:text-emerald-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {isAdminLoggedIn ? (
              <div id="admin-logged-in-actions" className="flex items-center space-x-2 mr-2">
                <button
                  id="nav-admin-dashboard-btn"
                  onClick={() => handleTabClick('admin')}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full border border-emerald-500/30 text-xs font-semibold tracking-wide uppercase transition-all ${
                    currentTab === 'admin'
                      ? 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                      : 'text-emerald-400 hover:bg-emerald-500/10'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </button>
                <button
                  id="nav-admin-logout-btn"
                  onClick={onLogoutAdmin}
                  className="px-3 py-1.5 rounded-full border border-white/10 hover:border-red-500/50 text-xs font-semibold tracking-wide uppercase text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                id="nav-go-to-admin-btn"
                onClick={() => handleTabClick('admin')}
                className="flex items-center space-x-1 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide text-gray-400 hover:text-emerald-400 border border-white/5 hover:border-emerald-500/20 transition-all mr-2"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
            )}

            <button
              id="nav-consultation-cta-btn"
              onClick={() => handleTabClick('contact')}
              className="px-6 py-2.5 bg-white text-black text-xs font-bold rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 cursor-pointer uppercase shadow-lg hover:shadow-emerald-500/10"
            >
              START A PROJECT
            </button>
          </div>

          {/* Mobile Hamburger toggle button */}
          <div className="flex items-center md:hidden space-x-2">
            <button
              id="nav-mobile-admin-access-btn"
              onClick={() => handleTabClick('admin')}
              className={`p-2 rounded-lg border border-white/5 transition-all ${
                currentTab === 'admin' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-400 hover:text-white'
              }`}
              title="Admin Panel"
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>
            <button
              id="navbar-mobile-hamburger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-white/5 text-gray-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer menu */}
      {mobileMenuOpen && (
        <div id="nav-mobile-drawer" className="md:hidden absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-lg border-b border-white/10 shadow-2xl py-4 px-6 space-y-2 animate-in fade-in slide-in-from-top-5 duration-200">
          {menuItems.map((item) => {
            const isActive = currentTab === item.value;
            return (
              <button
                key={item.value}
                id={`nav-mobile-tab-${item.value}`}
                onClick={() => handleTabClick(item.value)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-500/10 text-emerald-400 font-bold border-l-2 border-emerald-500' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          
          <div className="pt-4 border-t border-white/5 flex flex-col space-y-3 pb-2">
            {isAdminLoggedIn ? (
              <div className="flex items-center justify-between px-4">
                <span className="text-xs text-gray-500">Logged in as Admin</span>
                <button
                  id="nav-mobile-logout-btn"
                  onClick={() => {
                    onLogoutAdmin();
                    setMobileMenuOpen(false);
                  }}
                  className="text-xs font-bold text-red-400 uppercase py-1 px-3 rounded-lg bg-red-400/5 hover:bg-red-400/10"
                >
                  Logout
                </button>
              </div>
            ) : null}
            <button
              id="nav-mobile-cta"
              onClick={() => handleTabClick('contact')}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-xl bg-emerald-500 text-[#030705] font-bold text-sm transition-all shadow-[0_4px_12px_rgba(16,185,129,0.2)]"
            >
              <span>Get Free Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
