/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import PortfolioView from './components/PortfolioView';
import AboutView from './components/AboutView';
import BlogView from './components/BlogView';
import ContactView from './components/ContactView';
import AdminDashboard from './components/AdminDashboard';
import { BlogPost, Project, Category, Testimonial } from './types';

export default function App() {
  const [tab, setTab] = useState<string>('home');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Dynamic API Database States
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [dataLoading, setDataLoading] = useState<boolean>(true);

  // Initialize and check persisted admin session token
  useEffect(() => {
    const token = localStorage.getItem('verdant_admin_token');
    if (token) {
      verifyAdminToken(token);
    }
    // Pull basic public dataset (Blogs, categories, portfolio, testimonials)
    fetchPublicWorkspaceData();
  }, []);

  const verifyAdminToken = async (token: string) => {
    try {
      const res = await fetch('/api/admin/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        setIsAdmin(true);
      } else {
        // stale token
        localStorage.removeItem('verdant_admin_token');
        setIsAdmin(false);
      }
    } catch {
      setIsAdmin(false);
    }
  };

  const fetchPublicWorkspaceData = async () => {
    setDataLoading(true);
    try {
      // 1. Pull Blogs list
      const blogRes = await fetch('/api/posts');
      if (blogRes.ok) {
        const blogData = await blogRes.json();
        setPosts(blogData);
      }

      // 2. Pull categories nodes
      const catRes = await fetch('/api/categories');
      if (catRes.ok) {
        const catData = await catRes.json();
        setCategories(catData);
      }

      // 3. Pull Projects lists
      const projRes = await fetch('/api/projects');
      if (projRes.ok) {
        const projData = await projRes.json();
        setProjects(projData);
      }

      // 4. Pull Testimonials
      const testRes = await fetch('/api/testimonials');
      if (testRes.ok) {
        const testData = await testRes.json();
        setTestimonials(testData);
      }
    } catch (e) {
      console.error('Error fetching dynamic CMS dataset', e);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLoginSuccess = (token: string) => {
    setIsAdmin(true);
    setTab('admin'); // switch immediately to dashboard view
    fetchPublicWorkspaceData(); // refresh with any edits
  };

  const handleLogout = () => {
    localStorage.removeItem('verdant_admin_token');
    setIsAdmin(false);
    setTab('home');
    alert('Logged out from terminal session securely.');
  };

  // Safe router switches
  const renderTabContent = () => {
    switch (tab) {
      case 'home':
        return <HomeView setTab={setTab} testimonials={testimonials} />;
      case 'services':
        return <ServicesView setTab={setTab} />;
      case 'portfolio':
        return <PortfolioView projects={projects} />;
      case 'about':
        return <AboutView />;
      case 'blog':
        return (
          <BlogView 
            posts={posts} 
            categories={categories} 
            onRefreshPosts={fetchPublicWorkspaceData} 
          />
        );
      case 'contact':
        return <ContactView />;
      case 'admin':
        return (
          <AdminDashboard 
            isAdmin={isAdmin} 
            onLoginSuccess={handleLoginSuccess} 
            onLogout={handleLogout} 
            posts={posts} 
            categories={categories} 
            projects={projects} 
            onRefreshData={fetchPublicWorkspaceData} 
          />
        );
      default:
        return <HomeView setTab={setTab} testimonials={testimonials} />;
    }
  };

  return (
    <div className="bg-[#050505] min-h-screen text-gray-200 selection:bg-emerald-500 selection:text-black scroll-smooth relative">
      
      {/* Dynamic Navigation System */}
      <Navbar 
        currentTab={tab} 
        setTab={setTab} 
        isAdminLoggedIn={isAdmin} 
        onLogoutAdmin={handleLogout} 
      />

      {/* Main Core View Area */}
      <main id="app-view-main" className="min-h-[calc(100vh-80px)]">
        {dataLoading && posts.length === 0 ? (
          <div className="h-screen w-full flex flex-col justify-center items-center bg-[#050505] font-mono text-xs text-gray-500">
            <span className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">V</span>
            <p className="animate-pulse">DECRYPTING VERDANT ENTRYS GRID SYSTEM DATA...</p>
          </div>
        ) : (
          renderTabContent()
        )}
      </main>

      {/* AI Bot floating panel (Verda) */}
      <AIChat />

      {/* Dynamic Site Footer */}
      <Footer setTab={setTab} />

    </div>
  );
}
