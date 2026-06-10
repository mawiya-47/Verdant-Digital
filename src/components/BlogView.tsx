/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  BookOpen, 
  User, 
  Calendar, 
  Eye, 
  ArrowLeft, 
  Clock, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Tag
} from 'lucide-react';
import { BlogPost, Category } from '../types';

interface BlogViewProps {
  posts: BlogPost[];
  categories: Category[];
  onRefreshPosts: () => void;
}

export default function BlogView({ posts, categories, onRefreshPosts }: BlogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  // Filter posts based on Category Slug & Search Query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' 
      ? true 
      : post.categoryId.toLowerCase() === selectedCategory.toLowerCase();
      
    const matchesSearch = searchQuery.trim() === ''
      ? true
      : post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Handle setting active post (and trigger view counter server side)
  const handleOpenPost = async (post: BlogPost) => {
    try {
      // Trigger dynamic hit views count
      const res = await fetch(`/api/posts/${post.slug}`);
      if (res.ok) {
        const updatedPost = await res.json();
        setActivePost(updatedPost);
        onRefreshPosts(); // sync overall analytics
      } else {
        setActivePost(post);
      }
    } catch {
      setActivePost(post);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActivePost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    } catch {
      return 'June 8, 2026';
    }
  };

  const calculateReadTime = (text: string) => {
    const words = text.split(/\s+/).length;
    const minutes = Math.ceil(words / 220); // avg read rate
    return `${minutes} min read`;
  };

  // Safe renderer for headers vs code tags to achieve a premium Markdown feel
  const renderMarkdownText = (rawContent: string) => {
    return rawContent.split('\n').map((paragraph, index) => {
      const trimmed = paragraph.trim();
      
      if (trimmed.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-8 mb-4 font-sans border-b border-white/5 pb-2">
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg sm:text-xl font-bold text-emerald-400 tracking-tight mt-6 mb-3 font-sans">
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith('* ')) {
        return (
          <div key={index} className="flex items-start space-x-2 pl-4 y-1 my-2">
            <span className="text-emerald-500 mt-1.5 font-sans pr-1">•</span>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">{trimmed.slice(2)}</p>
          </div>
        );
      }
      if (trimmed.startsWith('1. ')) {
        return (
          <div key={index} className="flex items-start space-x-2 pl-4 y-1 my-2">
            <span className="text-emerald-400 font-mono text-xs mt-1 pr-1">1.</span>
            <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">{trimmed.slice(3)}</p>
          </div>
        );
      }
      if (trimmed.startsWith('```')) {
        if (trimmed === '```' || trimmed.startsWith('```typescript')) {
          // just filter code wrappers out safely or render minimal
          return null;
        }
      }
      if (trimmed.includes('import {') || trimmed.includes('async function')) {
        return (
          <pre key={index} className="bg-[#030605] border border-[#10b981]/20 rounded-xl p-4 my-4 overflow-x-auto text-xs sm:text-sm font-mono text-emerald-300">
            <code>{paragraph}</code>
          </pre>
        );
      }

      // Default safe paragraph styling
      if (trimmed === '') return <div key={index} className="h-3" />;
      
      return (
        <p key={index} className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed mt-3 mb-4">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div id="blog-view-container" className="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden font-sans">
      
      {/* Visual background lights */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[140px] pointer-events-none animate-glow-slow-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-emerald-850/10 rounded-full blur-[120px] pointer-events-none animate-glow-slow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            VIEW 1: DETAILED READ MODE (FULL ARTICLE TARGETED)
            ======================================================== */}
        {activePost ? (
          <article id="expanded-blog-post" className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            {/* Nav back button */}
            <button
              onClick={handleBackToList}
              className="group inline-flex items-center space-x-2 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-emerald-500 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back To Engineering Blog</span>
            </button>

            {/* Title segment */}
            <header className="space-y-4">
              <span className="px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[#10b981] text-xs font-mono font-bold uppercase tracking-widest">
                {categories.find(c => c.id === activePost.categoryId)?.name || 'Digital Insights'}
              </span>
              
              <h1 className="font-sans font-extrabold text-2xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mt-2">
                {activePost.title}
              </h1>

              {/* Meta information row */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pt-4 border-b border-t border-white/5 py-4 text-xs font-mono text-gray-500">
                <div className="flex items-center space-x-1.5 text-gray-300">
                  <img src={activePost.authorAvatar} alt={activePost.author} className="w-6 h-6 rounded-full border border-emerald-500/20" />
                  <span className="font-sans font-bold text-white">{activePost.author}</span>
                </div>
                <span className="text-gray-800">|</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(activePost.createdAt)}</span>
                </div>
                <span className="text-gray-800">|</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{calculateReadTime(activePost.content)}</span>
                </div>
                <span className="text-gray-800">|</span>
                <div className="flex items-center space-x-1 text-emerald-500">
                  <Eye className="w-3.5 h-3.5" />
                  <span>{activePost.views} views</span>
                </div>
              </div>
            </header>

            {/* Display banner Unsplash */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
              <img src={activePost.imageUrl} alt={activePost.title} className="w-full h-full object-cover" />
            </div>

            {/* Article prose markdown layout */}
            <div className="prose prose-invert prose-emerald max-w-none pt-4">
              {renderMarkdownText(activePost.content)}
            </div>

            {/* Article footer tags blocks */}
            <div className="pt-8 border-t border-white/5 flex flex-wrap gap-2 text-xs">
              <span className="font-mono text-gray-500 uppercase py-1 pr-2 font-bold flex items-center space-x-1.5">
                <Tag className="w-3.5 h-3.5 text-gray-600" />
                <span>Tagged under:</span>
              </span>
              {activePost.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-gray-400 font-mono text-[11px]">
                  #{tag}
                </span>
              ))}
            </div>

            {/* CTA action cards inside layout */}
            <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl text-center space-y-4 pt-8">
              <h4 className="font-sans font-black text-lg sm:text-xl text-white">
                Interested in deploying this custom solution?
              </h4>
              <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto">
                Verdant Digital designs, templates, and deploys high-volume infrastructure tailored specifically to this case framework.
              </p>
              <button
                onClick={handleBackToList}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-emerald-500 text-black hover:text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg"
              >
                Connect With Core Architects
              </button>
            </div>

          </article>
        ) : (
          
          /* ========================================================
             VIEW 2: GRID AND SEARCH LIST (STANDARD BLOG LISTING)
             ======================================================== */
          <div className="space-y-12">
            
            {/* Top titles */}
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Verdant Engineering Dispatch</span>
              </div>
              <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-none">
                Engineering Desk
              </h1>
              <p className="text-sm text-gray-400">
                Technical briefings, architecture reviews, and multi-agent optimization reports compiled straight from our operational engineers.
              </p>
            </div>

            {/* Filtering + Search toolbar */}
            <div className="p-4 sm:p-6 rounded-[32px] bg-white/5 border border-white/10 space-y-4 backdrop-blur-xl shadow-2xl">
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Search Bar input */}
                <div className="lg:col-span-1 relative flex items-center rounded-full overflow-hidden border border-white/10 focus-within:border-emerald-500/30 bg-black/40 transition-all px-4 py-2.5">
                  <Search className="w-4 h-4 text-gray-500 mr-2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search engineering papers..."
                    className="w-full bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
                  />
                </div>

                {/* Filter list of categories */}
                <div className="lg:col-span-2 flex flex-wrap gap-2 items-center justify-end">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide uppercase transition-all cursor-pointer ${
                      selectedCategory === 'All'
                        ? 'bg-emerald-500 text-black font-extrabold shadow-lg'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    ALL PAPERS
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.id)}
                      className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide uppercase transition-all cursor-pointer ${
                        selectedCategory === c.id
                          ? 'bg-emerald-500 text-black font-extrabold shadow-lg'
                          : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {c.name.split(' ')[0]} {/* short code tag */}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Sub text indicating filtered results layout */}
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest font-extrabold">
                RESOLVED ENTRIES ({filteredPosts.length})
              </span>
              {searchQuery && (
                <span className="text-xs text-gray-400">
                  Filtered by phrase: <strong className="text-emerald-400">"{searchQuery}"</strong>
                </span>
              )}
            </div>

            {/* Grid display layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  id={`blog-card-${post.id}`}
                  onClick={() => handleOpenPost(post)}
                  className="group rounded-[32px] bg-white/5 border border-white/10 hover:border-emerald-500/30 overflow-hidden shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    {/* Visual Unsplash Block */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent" />
                      
                      <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/85 border border-white/10 text-[9px] font-mono font-medium text-emerald-400">
                        {categories.find(c => c.id === post.categoryId)?.name || 'Digital'}
                      </span>
                    </div>

                    {/* Meta info & texts */}
                    <div className="p-6 space-y-3">
                      
                      <div className="flex items-center space-x-1.5 text-[10px] font-mono text-gray-500">
                        <span>{formatDate(post.createdAt)}</span>
                        <span>•</span>
                        <span>{calculateReadTime(post.content)}</span>
                      </div>

                      <h3 className="font-sans font-extrabold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-gray-400 line-clamp-2 leading-relaxed">
                        {post.summary}
                      </p>

                    </div>
                  </div>

                  {/* Read and count layout bottom */}
                  <div className="px-6 pb-6 pt-3 border-t border-white/5 mt-4 flex items-center justify-between text-[11px] font-mono text-gray-500">
                    <span className="flex items-center space-x-1.5">
                      <img src={post.authorAvatar} alt={post.author} className="w-5 h-5 rounded-full" />
                      <span className="text-gray-300">{post.author.split(' ')[0]}</span>
                    </span>

                    <span className="text-emerald-500 group-hover:text-emerald-400 transition-colors flex items-center space-x-0.5 font-bold uppercase tracking-wider">
                      <span>Explore Paper</span>
                      <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>

                </article>
              ))}

              {filteredPosts.length === 0 && (
                <div className="col-span-1 md:col-span-3 text-center py-20 rounded-3xl border border-white/5 bg-[#090e0c]/10 space-y-1">
                  <span className="font-mono text-xs text-gray-500 uppercase tracking-widest block">QUERY EXHAUSTED</span>
                  <p className="text-gray-400 text-sm font-sans">No engineering papers found matching your filters.</p>
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
