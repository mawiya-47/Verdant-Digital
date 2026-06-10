/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Inbox, 
  BookOpen, 
  Users, 
  TrendingUp, 
  Activity, 
  Eye, 
  Plus, 
  Trash2, 
  Edit2, 
  Check, 
  Send, 
  Loader2,
  RefreshCw,
  EyeOff,
  FolderOpen,
  Mail,
  LogOut,
  Sparkles
} from 'lucide-react';
import { BlogPost, Project, ContactMessage, Subscriber, AnalyticsStats, UserRole, Category } from '../types';

interface AdminDashboardProps {
  isAdmin: boolean;
  onLoginSuccess: (token: string) => void;
  onLogout: () => void;
  posts: BlogPost[];
  categories: Category[];
  projects: Project[];
  onRefreshData: () => void;
}

export default function AdminDashboard({ 
  isAdmin, 
  onLoginSuccess, 
  onLogout, 
  posts, 
  categories, 
  projects,
  onRefreshData
}: AdminDashboardProps) {
  
  // Login State
  const [email, setEmail] = useState('muhammadmawiya5@gmail.com');
  const [password, setPassword] = useState('adminpassword123');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Active Admin Sub-Panel Tab
  const [activeSubTab, setActiveSubTab] = useState<'analytics' | 'posts' | 'projects' | 'leads' | 'subscribers'>('analytics');

  // Analytics State
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(false);

  // Incoming Leads State
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMsgId, setSelectedMsgId] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState('');
  const [replyLoading, setReplyLoading] = useState(false);

  // Subscribers State
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  // Blog Editor State
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    summary: '',
    content: '',
    categoryId: 'cat_web',
    tagsString: '',
    imageUrl: '',
    published: true
  });
  const [postSubmitting, setPostSubmitting] = useState(false);

  // Portfolio Editor State
  const [editingProj, setEditingProj] = useState<Project | null>(null);
  const [isAddingProj, setIsAddingProj] = useState(false);
  const [projForm, setProjForm] = useState({
    title: '',
    description: '',
    detailedCaseStudy: '',
    client: '',
    category: 'Web Development',
    tagsString: '',
    imageUrl: '',
    liveUrl: '',
    launchDate: '',
    featured: true
  });
  const [projSubmitting, setProjSubmitting] = useState(false);

  // Load analytics and admin data when logged in
  useEffect(() => {
    if (isAdmin) {
      loadAnalyticsAndDashboardData();
    }
  }, [isAdmin, activeSubTab]);

  const loadAnalyticsAndDashboardData = async () => {
    setStatsLoading(true);
    const token = localStorage.getItem('verdant_admin_token');

    try {
      // 1. Fetch Analytics
      const statsRes = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }

      // 2. Fetch Messages
      const msgRes = await fetch('/api/admin/messages', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (msgRes.ok) {
        const msgData = await msgRes.json();
        setMessages(msgData);
      }

      // 3. Fetch Subscribers
      const subRes = await fetch('/api/admin/subscribers', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (subRes.ok) {
        const subData = await subRes.json();
        setSubscribers(subData);
      }
    } catch (e) {
      console.error('Error fetching admin data', e);
    } finally {
      setStatsLoading(false);
    }
  };

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoginLoading(true);
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      setLoginLoading(false);

      if (res.ok && data.token) {
        localStorage.setItem('verdant_admin_token', data.token);
        onLoginSuccess(data.token);
      } else {
        setLoginError(data.error || 'Authentication rejected. Email or password incorrect.');
      }
    } catch {
      setLoginLoading(false);
      setLoginError('Local network timeout. Failed to contact server auth block.');
    }
  };

  // --- Blog Management Actions ---
  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setIsAddingPost(false);
    setPostForm({
      title: post.title,
      summary: post.summary,
      content: post.content,
      categoryId: post.categoryId,
      tagsString: post.tags.join(', '),
      imageUrl: post.imageUrl,
      published: post.published
    });
  };

  const handleOpenAddPost = () => {
    setIsAddingPost(true);
    setEditingPost(null);
    setPostForm({
      title: '',
      summary: '',
      content: '',
      categoryId: 'cat_web',
      tagsString: 'Web Design, Deployment',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      published: true
    });
  };

  const submitPostForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setPostSubmitting(true);
    const token = localStorage.getItem('verdant_admin_token');

    const formattedPayload = {
      ...postForm,
      tags: postForm.tagsString.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      let res;
      if (isAddingPost) {
        res = await fetch('/api/admin/posts', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formattedPayload)
        });
      } else if (editingPost) {
        res = await fetch(`/api/admin/posts/${editingPost.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formattedPayload)
        });
      }

      if (res && res.ok) {
        setIsAddingPost(false);
        setEditingPost(null);
        onRefreshData(); // reload posts lists
        loadAnalyticsAndDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPostSubmitting(false);
    }
  };

  const togglePostPublishStatus = async (post: BlogPost) => {
    const token = localStorage.getItem('verdant_admin_token');
    try {
      const res = await fetch(`/api/admin/posts/${post.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ published: !post.published })
      });
      if (res.ok) {
        onRefreshData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBlogPost = async (id: string) => {
    if (!window.confirm('Are you absolutely sure you want to delete this blog post?')) return;
    const token = localStorage.getItem('verdant_admin_token');
    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        onRefreshData();
        loadAnalyticsAndDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Portfolio Management Actions ---
  const handleOpenEditProj = (p: Project) => {
    setEditingProj(p);
    setIsAddingProj(false);
    setProjForm({
      title: p.title,
      description: p.description,
      detailedCaseStudy: p.detailedCaseStudy || '',
      client: p.client || '',
      category: p.category,
      tagsString: p.tags.join(', '),
      imageUrl: p.imageUrl,
      liveUrl: p.liveUrl || '',
      launchDate: p.launchDate || '',
      featured: p.featured
    });
  };

  const handleOpenAddProj = () => {
    setIsAddingProj(true);
    setEditingProj(null);
    setProjForm({
      title: '',
      description: '',
      detailedCaseStudy: '',
      client: '',
      category: 'Web Development',
      tagsString: 'NextJS, Tailwind, Prisma',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      liveUrl: 'https://sample.verdant.digital',
      launchDate: '2026-06',
      featured: true
    });
  };

  const submitProjForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setProjSubmitting(true);
    const token = localStorage.getItem('verdant_admin_token');

    const formattedPayload = {
      ...projForm,
      tags: projForm.tagsString.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      let res;
      if (isAddingProj) {
        res = await fetch('/api/admin/projects', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formattedPayload)
        });
      } else if (editingProj) {
        res = await fetch(`/api/admin/projects/${editingProj.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(formattedPayload)
        });
      }

      if (res && res.ok) {
        setIsAddingProj(false);
        setEditingProj(null);
        onRefreshData(); // refresh parent state
        loadAnalyticsAndDashboardData();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProjSubmitting(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!window.confirm('Delete this case portfolio? Code maps will persist.')) return;
    const token = localStorage.getItem('verdant_admin_token');
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        onRefreshData();
        loadAnalyticsAndDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Leads / Messages Actions ---
  const handleMarkMsgRead = async (msg: ContactMessage) => {
    if (msg.status === 'unread') {
      const token = localStorage.getItem('verdant_admin_token');
      try {
        await fetch(`/api/admin/messages/${msg.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ status: 'read' })
        });
        loadAnalyticsAndDashboardData();
      } catch (e) {
        console.error(e);
      }
    }
    setSelectedMsgId(msg.id === selectedMsgId ? null : msg.id);
    setReplyInput('');
  };

  const handleSendSimulatorReply = async (msg: ContactMessage) => {
    if (!replyInput.trim()) return;

    setReplyLoading(true);
    const token = localStorage.getItem('verdant_admin_token');

    try {
      const res = await fetch(`/api/admin/messages/${msg.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: 'replied', replyContent: replyInput })
      });
      if (res.ok) {
        setReplyInput('');
        loadAnalyticsAndDashboardData();
        alert('Simulated email response successfully dispatched! Status updated.');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setReplyLoading(false);
    }
  };

  const deleteMessage = async (id: string) => {
    const token = localStorage.getItem('verdant_admin_token');
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        loadAnalyticsAndDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // --- Members / Subscribers Actions ---
  const deleteSubscriber = async (id: string) => {
    const token = localStorage.getItem('verdant_admin_token');
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        loadAnalyticsAndDashboardData();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="admin-view-root" className="pt-32 pb-24 bg-[#050505] min-h-screen relative font-sans">
      
      {/* Glow lamps */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-950/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ========================================================
            VIEW A: ADMIN CREDENTIALS CHALLENGE (LOGGED OUT)
            ======================================================== */}
        {!isAdmin ? (
          <div className="max-w-md mx-auto relative z-20">
            <div className="p-8 sm:p-10 rounded-[32px] bg-white/5 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden space-y-6">
              
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl" />
              
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                  <Lock className="w-6 h-6 animate-pulse" />
                </div>
                <h1 className="font-sans font-black text-2xl text-white tracking-tight mt-1">Admin CMS Entry</h1>
                <p className="text-xs text-gray-500">Authorized personnel only. Secure terminal.</p>
              </div>

              {loginError && (
                <div id="login-error-card" className="p-3 rounded-xl border border-red-500/20 bg-red-500/10 text-xs text-red-400 text-center">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4 text-xs sm:text-sm">
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-500 font-bold block">
                    Secured User Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="muhammadmawiya5@gmail.com"
                    className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-3 text-white placeholder-gray-650 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] uppercase font-mono tracking-wider text-emerald-500 font-bold block">
                      Admin Password
                    </label>
                    <span className="text-[9px] font-mono text-gray-600 block">DEMO: adminpassword123</span>
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-3 text-white placeholder-gray-650 focus:outline-none transition-all"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3.5 rounded-full bg-white hover:bg-emerald-500 text-black hover:text-white font-bold text-sm uppercase tracking-wider shadow-lg active:scale-95 transition-all cursor-pointer"
                  >
                    {loginLoading ? (
                      <Loader2 className="w-4.5 h-4.5 animate-spin" />
                    ) : (
                      <>
                        <span>Decrypt Session Console</span>
                        <ShieldCheck className="w-4.5 h-4.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              <div className="pt-4 border-t border-white/5 text-center">
                <p className="text-[10px] text-gray-600 font-mono">
                  VERDANT CORE CRYPTOGRAPHIC ENVELOPE SECURED
                </p>
              </div>

            </div>
          </div>
        ) : (
          
          /* ========================================================
             VIEW B: FULLCMS COMMAND SYSTEMS (LOGGED IN STATE)
             ======================================================== */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Command Bar Node */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                  <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    CMS Command Center
                  </h1>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">Welcome, Muahmmad Mawiya. Active terminal port 3000.</p>
              </div>

              {/* Sub actions right */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={loadAnalyticsAndDashboardData}
                  disabled={statsLoading}
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all cursor-pointer"
                  title="Resync Data"
                >
                  <RefreshCw className={`w-4 h-4 ${statsLoading ? 'animate-spin text-emerald-400' : ''}`} />
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-white/10 hover:border-red-500/40 text-xs font-mono font-bold uppercase tracking-wider text-gray-400 hover:text-red-400 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Sub-Tabs Selector row */}
            <div id="admin-tab-indicators" className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
              {[
                { label: 'System Analytics', val: 'analytics', icon: Activity },
                { label: 'Manage Blog Posts', val: 'posts', icon: BookOpen },
                { label: 'Manage Portfolio', val: 'projects', icon: FolderOpen },
                { label: 'Client Inquiries', val: 'leads', icon: Inbox },
                { label: 'Subscribers List', val: 'subscribers', icon: Users },
              ].map((tb) => {
                const isSelected = activeSubTab === tb.val;
                const IconComp = tb.icon;
                return (
                  <button
                    key={tb.val}
                    id={`admin-subtab-btn-${tb.val}`}
                    onClick={() => {
                      setActiveSubTab(tb.val as any);
                      setIsAddingPost(false);
                      setEditingPost(null);
                      setIsAddingProj(false);
                      setEditingProj(null);
                    }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-emerald-500 text-black font-extrabold shadow-md' 
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComp className="w-4 h-4" />
                    <span>{tb.label}</span>
                  </button>
                );
              })}
            </div>

            {/* ========================================================
                ADMIN TAB 1: SYSTEM ANALYTICS & CHARTS
                ======================================================== */}
            {activeSubTab === 'analytics' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                
                {statsLoading && !stats ? (
                  <div className="text-center py-20 text-gray-400 font-mono text-xs">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-400 mx-auto mb-2" />
                    LOADING CRYPTOGRAPHIC STATS METRICS...
                  </div>
                ) : stats ? (
                  <>
                    {/* Stat Cards row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      
                      <div className="p-4 rounded-2xl bg-[#090e0c]/40 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-[10px] font-mono tracking-widest font-bold">TOTAL TRAFFIC VIEWS</span>
                          <Eye className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="font-sans font-black text-2xl sm:text-3xl text-white">{stats.viewsCount}</p>
                        <p className="text-[10px] text-gray-500 tracking-wider">Accumulated edge hits</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#090e0c]/40 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-[10px] font-mono tracking-widest font-bold">CONTACT MESSAGES</span>
                          <Inbox className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="font-sans font-black text-2xl sm:text-3xl text-white">{stats.messagesCount}</p>
                        {stats.unreadMessagesCount > 0 ? (
                          <p className="text-[10px] text-emerald-400 font-bold animate-pulse">● {stats.unreadMessagesCount} unread submissions</p>
                        ) : (
                          <p className="text-[10px] text-gray-500">All messages read</p>
                        )}
                      </div>

                      <div className="p-4 rounded-2xl bg-[#090e0c]/40 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-[10px] font-mono tracking-widest font-bold">ACTIVE DISPATCH SUB_</span>
                          <Users className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="font-sans font-black text-2xl sm:text-3xl text-white">{stats.subscribersCount}</p>
                        <p className="text-[10px] text-gray-500">Newsletter active emails</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-[#090e0c]/40 border border-white/5 space-y-2">
                        <div className="flex items-center justify-between text-gray-500">
                          <span className="text-[10px] font-mono tracking-widest font-bold">BUILT ARTIFACTS</span>
                          <FolderOpen className="w-4 h-4 text-emerald-400" />
                        </div>
                        <p className="font-sans font-black text-2xl sm:text-3xl text-white">{stats.projectsCount}</p>
                        <p className="text-[10px] text-gray-500">Portfolio case files</p>
                      </div>

                    </div>

                    {/* Highly polished CSS vector visualization section (Prisinte, robust, beautiful layout) */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Left Block: Leads Trend Charts */}
                      <div className="p-6 rounded-2xl border border-white/5 bg-[#090e0c]/40 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                            Daily Lead Registration Matrix (Week-to-date)
                          </h3>
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>

                        {/* Interactive simple vector bar indicators charting */}
                        <div className="h-44 flex items-end justify-between px-2 pt-4">
                          {stats.leadsByDay.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center flex-1 space-y-2">
                              <span className="text-[10px] font-mono text-emerald-400 font-bold">{item.count}</span>
                              {/* Physical bar with height dynamically weight */}
                              <div 
                                className="w-8 rounded-t bg-gradient-to-t from-emerald-600/35 to-emerald-400 transition-all duration-500 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                                style={{ height: `${item.count * 10}px` }}
                              />
                              <span className="text-[11px] font-mono text-gray-500">{item.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right Block: Traffic Origins Distribution */}
                      <div className="p-6 rounded-2xl border border-white/5 bg-[#090e0c]/40 space-y-4">
                        <div className="flex justify-between items-center border-b border-white/5 pb-2">
                          <h3 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                            Core Traffic Ingress Origins
                          </h3>
                          <Activity className="w-4 h-4 text-emerald-400" />
                        </div>

                        {/* Horizontal distribution bar logs */}
                        <div className="space-y-3.5 pt-2">
                          {stats.trafficSource.map((src, i) => {
                            const percentage = Math.round((src.count / 1482) * 100);
                            return (
                              <div key={i} className="space-y-1">
                                <div className="flex items-center justify-between text-xs text-gray-300">
                                  <span className="font-medium font-sans">{src.source}</span>
                                  <span className="font-mono text-emerald-400 font-extrabold">{src.count} hits ({percentage}%)</span>
                                </div>
                                <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                                  <div 
                                    className="h-full bg-emerald-500 rounded-full" 
                                    style={{ width: `${percentage * 3.5}%` }} // multiply scale
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </>
                ) : null}

              </div>
            )}

            {/* ========================================================
                ADMIN TAB 2: MANAGE BLOG POSTS (CMS)
                ======================================================== */}
            {activeSubTab === 'posts' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {/* Form or listing trigger */}
                {!isAddingPost && !editingPost ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-gray-500 font-extrabold uppercase">
                        COMPILED ARTICLES ({posts.length})
                      </span>
                      <button
                        id="add-new-post-trigger"
                        onClick={handleOpenAddPost}
                        className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4 text-black" />
                        <span>Add New Entry</span>
                      </button>
                    </div>

                    <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden bg-[#090e0c]/40 font-sans">
                      {posts.map((post) => (
                        <div key={post.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400 font-mono">[{post.id}]</span>
                              <h3 className="font-sans font-bold text-sm sm:text-base text-white">{post.title}</h3>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1">{post.summary}</p>
                            <div className="flex items-center space-x-4 text-[10px] font-mono text-gray-500">
                              <span>VIEWS: {post.views}</span>
                              <span>•</span>
                              <span>STATUS: {post.published ? <strong className="text-emerald-400 font-bold">PUBLISHED</strong> : <strong className="text-yellow-600">DRAFT</strong>}</span>
                            </div>
                          </div>

                          {/* Post row actions list */}
                          <div className="flex items-center space-x-2">
                            <button
                              id={`toggle-publish-post-${post.id}`}
                              onClick={() => togglePostPublishStatus(post)}
                              className={`p-2 rounded-lg border transition-all text-xs font-mono font-bold ${
                                post.published 
                                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                                  : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500'
                              }`}
                              title={post.published ? 'Set Draft' : 'Publish live'}
                            >
                              {post.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                            </button>
                            <button
                              id={`edit-post-btn-${post.id}`}
                              onClick={() => handleOpenEditPost(post)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Edit details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              id={`delete-post-btn-${post.id}`}
                              onClick={() => deleteBlogPost(post.id)}
                              className="p-2 rounded-lg bg-red-400/5 hover:bg-red-400/10 border border-red-500/10 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                              title="Delete Post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  
                  /* Dynamic Editor slide pane */
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#090e0c]/60 border border-emerald-500/10 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h3 className="font-sans font-black text-lg text-white">
                        {isAddingPost ? 'Write New Engineering Dispatch' : `Editing Post: ${editingPost?.title}`}
                      </h3>
                      <button
                        onClick={() => {
                          setIsAddingPost(false);
                          setEditingPost(null);
                        }}
                        className="text-xs uppercase font-mono text-gray-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={submitPostForm} className="space-y-4 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Article Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={postForm.title}
                            onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                            placeholder="e.g. Scaling Headless Payment Ports"
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Category Code *
                          </label>
                          <select
                            value={postForm.categoryId}
                            onChange={(e) => setPostForm({ ...postForm, categoryId: e.target.value })}
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white focus:outline-none transition-all"
                          >
                            {categories.map(c => (
                              <option key={c.id} className="bg-[#090e0c]" value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                          Image cover Url
                        </label>
                        <input
                          type="text"
                          value={postForm.imageUrl}
                          onChange={(e) => setPostForm({ ...postForm, imageUrl: e.target.value })}
                          placeholder="https://images.unsplash.com/..."
                          className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                          Short Post Summary * (Shows up on listings card previews)
                        </label>
                        <input
                          type="text"
                          required
                          value={postForm.summary}
                          onChange={(e) => setPostForm({ ...postForm, summary: e.target.value })}
                          placeholder="Explore why static and dynamic compilation blocks reduce mobile payload latency..."
                          className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Comma-separated Tags
                          </label>
                          <input
                            type="text"
                            value={postForm.tagsString}
                            onChange={(e) => setPostForm({ ...postForm, tagsString: e.target.value })}
                            placeholder="Next.js, UI/UX, Speed"
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5 flex items-center justify-around border border-white/5 rounded-xl px-4 bg-black/20">
                          <span className="text-xs text-gray-400 font-mono uppercase tracking-wide">Publish live immediately?</span>
                          <input
                            type="checkbox"
                            checked={postForm.published}
                            onChange={(e) => setPostForm({ ...postForm, published: e.target.checked })}
                            className="w-4 h-4 rounded text-emerald-500 bg-black border-white/10 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      {/* Markdown rich text body input */}
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Article content writes (Markdown Format Supported) *
                          </label>
                          <span className="text-[9px] font-mono text-gray-600 block">Use ## for Headers, * for bullets</span>
                        </div>
                        <textarea
                          required
                          rows={8}
                          value={postForm.content}
                          onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                          placeholder="## System Orchestrations \n\nWrite article contents here..."
                          className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 p-4 text-white placeholder-gray-700 focus:outline-none transition-all font-mono text-xs leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex items-center space-x-2 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingPost(false);
                            setEditingPost(null);
                          }}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-400 rounded-xl transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={postSubmitting}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
                        >
                          {postSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-4 h-4" />}
                          <span>Compile Draft Document</span>
                        </button>
                      </div>

                    </form>

                  </div>
                )}

              </div>
            )}

            {/* ========================================================
                ADMIN TAB 3: MANAGE PORTFOLIO
                ======================================================== */}
            {activeSubTab === 'projects' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                
                {!isAddingProj && !editingProj ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-gray-500 font-extrabold uppercase">
                        CASE ARTIFACTS ({projects.length})
                      </span>
                      <button
                        onClick={handleOpenAddProj}
                        className="flex items-center space-x-1 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider cursor-pointer transition-all"
                      >
                        <Plus className="w-4 h-4 text-black" />
                        <span>Add New Project Case</span>
                      </button>
                    </div>

                    <div className="divide-y divide-white/5 border border-white/5 rounded-2xl overflow-hidden bg-[#090e0c]/40 font-sans">
                      {projects.map((p) => (
                        <div key={p.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500 font-mono">[{p.id}]</span>
                              <h3 className="font-sans font-bold text-sm sm:text-base text-white">{p.title}</h3>
                            </div>
                            <p className="text-xs text-gray-400 line-clamp-1">{p.description}</p>
                            <div className="flex items-center space-x-4 text-[10px] font-mono text-gray-500">
                              <span>CLIENT: {p.client || 'Enterprise'}</span>
                              <span>•</span>
                              <span>ROLE CATEGORY: {p.category}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleOpenEditProj(p)}
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-gray-400 hover:text-white transition-all cursor-pointer"
                              title="Edit Case details"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteProject(p.id)}
                              className="p-2 rounded-lg bg-red-400/5 hover:bg-red-400/10 border border-red-500/10 text-red-400 hover:text-red-300 transition-all cursor-pointer"
                              title="Delete Portfolio Case"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  
                  /* Projects form editor */
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#090e0c]/60 border border-emerald-500/10 space-y-6">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                      <h3 className="font-sans font-black text-lg text-white">
                        {isAddingProj ? 'Establish New Case File' : `Editing Case: ${editingProj?.title}`}
                      </h3>
                      <button
                        onClick={() => {
                          setIsAddingProj(false);
                          setEditingProj(null);
                        }}
                        className="text-xs uppercase font-mono text-gray-500 hover:text-white"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={submitProjForm} className="space-y-4 text-xs sm:text-sm">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2 space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Project Title *
                          </label>
                          <input
                            type="text"
                            required
                            value={projForm.title}
                            onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                            placeholder="e.g. AuraPay Core System"
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Service Category *
                          </label>
                          <select
                            value={projForm.category}
                            onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white focus:outline-none transition-all"
                          >
                            <option value="Web Development">Web Development</option>
                            <option value="AI Automation">AI Automation</option>
                            <option value="SaaS Development">SaaS Development</option>
                            <option value="Mobile Apps">Mobile Apps</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Client Name
                          </label>
                          <input
                            type="text"
                            value={projForm.client}
                            onChange={(e) => setProjForm({ ...projForm, client: e.target.value })}
                            placeholder="Aura pay Inc"
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Case Cover image
                          </label>
                          <input
                            type="text"
                            value={projForm.imageUrl}
                            onChange={(e) => setProjForm({ ...projForm, imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Production Live URL
                          </label>
                          <input
                            type="text"
                            value={projForm.liveUrl}
                            onChange={(e) => setProjForm({ ...projForm, liveUrl: e.target.value })}
                            placeholder="https://aurapay.sample.digital"
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                            Launch date
                          </label>
                          <input
                            type="text"
                            value={projForm.launchDate}
                            onChange={(e) => setProjForm({ ...projForm, launchDate: e.target.value })}
                            placeholder="2026-06"
                            className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                          />
                        </div>

                        <div className="space-y-1.5 flex items-center justify-around border border-white/5 rounded-xl px-4 bg-black/30">
                          <label className="text-xs text-gray-400 font-mono uppercase tracking-wide">Featured Case?</label>
                          <input
                            type="checkbox"
                            checked={projForm.featured}
                            onChange={(e) => setProjForm({ ...projForm, featured: e.target.checked })}
                            className="w-4 h-4 rounded text-emerald-500 bg-black border-white/10 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                          Technical Tag Tokens
                        </label>
                        <input
                          type="text"
                          value={projForm.tagsString}
                          onChange={(e) => setProjForm({ ...projForm, tagsString: e.target.value })}
                          placeholder="NodeJS, Stripe API, Express"
                          className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                          Brief Outline *
                        </label>
                        <input
                          type="text"
                          required
                          value={projForm.description}
                          onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                          placeholder="A comprehensive corporate subscription framework engineered on Postgres ORM schema nodes..."
                          className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-2.5 text-white placeholder-gray-700 focus:outline-none transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                          Long Technical Deepdive description (Markdown Format) *
                        </label>
                        <textarea
                          required
                          rows={6}
                          value={projForm.detailedCaseStudy}
                          onChange={(e) => setProjForm({ ...projForm, detailedCaseStudy: e.target.value })}
                          placeholder="We constructed the Stripe web hook listener inside an Express router and verified hashes securely..."
                          className="w-full rounded-xl bg-black/40 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 p-4 text-white placeholder-gray-700 focus:outline-none transition-all font-mono text-xs leading-relaxed"
                        />
                      </div>

                      <div className="pt-2 flex items-center space-x-2 justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingProj(false);
                            setEditingProj(null);
                          }}
                          className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-gray-400 rounded-xl transition-all cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={projSubmitting}
                          className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center space-x-1.5 cursor-pointer disabled:opacity-40"
                        >
                          {projSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-4 h-4" />}
                          <span>Compile Portfolio Case</span>
                        </button>
                      </div>

                    </form>

                  </div>
                )}

              </div>
            )}

            {/* ========================================================
                ADMIN TAB 4: CLIENT INBOX LEADS (CONTACTS)
                ======================================================== */}
            {activeSubTab === 'leads' && (
              <div className="space-y-4 animate-in fade-in duration-200 font-sans">
                <span className="font-mono text-[10px] text-gray-500 font-extrabold uppercase">
                  INCOMING DEPLOYMENT SCOPES ({messages.length})
                </span>

                <div className="grid grid-cols-1 gap-4">
                  {messages.map((msg) => {
                    const isSelected = selectedMsgId === msg.id;
                    return (
                      <div 
                        key={msg.id}
                        id={`admin-msg-card-${msg.id}`}
                        className={`rounded-2xl border transition-all duration-350 bg-[#090e0c]/45 backdrop-blur-sm shadow overflow-hidden ${
                          msg.status === 'unread' 
                            ? 'border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                            : 'border-white/5'
                        }`}
                      >
                        {/* Compact top trigger panel */}
                        <div 
                          onClick={() => handleMarkMsgRead(msg)}
                          className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-all select-none"
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center space-x-3">
                              {msg.status === 'unread' && (
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_6px_#10b981]" />
                              )}
                              <h3 className="font-extrabold text-sm sm:text-base text-white">{msg.name}</h3>
                              <span className="text-[10px] font-mono text-gray-500">({msg.email})</span>
                            </div>
                            <p className="text-xs text-emerald-400 font-semibold tracking-wide font-sans">{msg.subject}</p>
                            <span className="text-[10px] font-mono text-gray-600 block">SUBMITTED AT: {new Date(msg.createdAt).toLocaleString()}</span>
                          </div>

                          <div className="flex items-center space-x-4">
                            {/* Visual Status Pills badge */}
                            <span className={`px-2.5 py-1 rounded inline-block text-[10px] font-mono uppercase font-black tracking-widest ${
                              msg.status === 'unread' 
                                ? 'bg-[#0f1d17] text-emerald-400 border border-emerald-500/10' 
                                : msg.status === 'read' 
                                ? 'bg-white/5 text-gray-500' 
                                : 'bg-emerald-500 text-black font-extrabold'
                            }`}>
                              {msg.status.toUpperCase()}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteMessage(msg.id);
                              }}
                              className="p-2 rounded-lg bg-red-400/5 hover:bg-red-400/10 text-red-500 hover:text-red-400 transition-colors"
                              title="Delete Scope Inquiry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Extended detailed workspace & simulator forms */}
                        {isSelected && (
                          <div className="px-5 pb-6 pt-2 border-t border-white/5 bg-black/35 space-y-4 animate-in slide-in-from-top-2 duration-300">
                            
                            <div className="p-4 rounded-xl bg-[#040807] border border-white/5 space-y-1 text-xs leading-relaxed text-gray-300">
                              <span className="font-mono text-gray-600 text-[10px] tracking-widest uppercase block font-extrabold">INQUIRY CONTEXT:</span>
                              <p className="font-normal font-sans pr-2 py-0.5 select-text">{msg.message}</p>
                            </div>

                            {msg.replyContent && (
                              <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 space-y-1 text-xs text-emerald-400">
                                <span className="font-mono text-[9px] uppercase tracking-widest font-black block">ADMIN SIMULATED DISPATCH SENT FORTH:</span>
                                <p className="italic select-text font-sans leading-relaxed">"{msg.replyContent}"</p>
                              </div>
                            )}

                            {/* Responder box form */}
                            {msg.status !== 'replied' && (
                              <div className="space-y-2 pt-2 border-t border-white/5">
                                <h4 className="text-[10px] font-mono tracking-widest uppercase text-emerald-500 font-extrabold block">
                                  Dispatch Client Response (Simulated Mail Dispatch)
                                </h4>
                                
                                <div className="flex items-center space-x-2 rounded-xl bg-black border border-white/10 px-3 py-1.5 focus-within:border-emerald-500/40">
                                  <input
                                    type="text"
                                    value={replyInput}
                                    onChange={(e) => setReplyInput(e.target.value)}
                                    placeholder="e.g. Thanks Alex, scheduling strategy session tomorrow at 10AM PST. We will forward details shortly..."
                                    className="flex-1 bg-transparent border-none text-xs text-white placeholder-gray-600 focus:outline-none"
                                  />
                                  <button
                                    onClick={() => handleSendSimulatorReply(msg)}
                                    disabled={!replyInput.trim() || replyLoading}
                                    className="px-4 py-2 rounded-lg bg-emerald-500 text-black font-extrabold text-xs uppercase tracking-wider flex items-center space-x-1 cursor-pointer hover:bg-emerald-400"
                                  >
                                    {replyLoading ? <Loader2 className="w-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                    <span>Send Simulator reply</span>
                                  </button>
                                </div>
                              </div>
                            )}

                          </div>
                        )}

                      </div>
                    );
                  })}

                  {messages.length === 0 && (
                    <div className="text-center py-16 text-gray-500 rounded-2xl border border-white/5 bg-[#090e0c]/10">
                      No customer leads logged in this system yet. Run contact submission form to test.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* ========================================================
                ADMIN TAB 5: NEWSLETTER SUBSCRIBERS DIRECTORY
                ======================================================== */}
            {activeSubTab === 'subscribers' && (
              <div className="space-y-4 animate-in fade-in duration-200 font-sans">
                <span className="font-mono text-[10px] text-gray-500 font-extrabold uppercase">
                  REGISTERED USERS DIRECTORY ({subscribers.length})
                </span>

                <div className="border border-white/5 bg-[#090e0c]/40 rounded-2xl divide-y divide-white/5 overflow-hidden">
                  {subscribers.map((sub, i) => (
                    <div key={sub.id} className="p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-xs text-gray-500 font-mono">[{i + 1}]</span>
                        <div className="w-7 h-7 rounded-full bg-emerald-900/40 border border-emerald-500/10 flex items-center justify-center text-emerald-400">
                          <Mail className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white pr-2 select-all">{sub.email}</p>
                          <span className="text-[10px] text-gray-500 font-mono">JOINED: {new Date(sub.subscribedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs">
                        {/* Status tag */}
                        <span className={`px-2 py-0.5 rounded text-[9px] font-mono tracking-wider text-center uppercase font-bold ${
                          sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-white/5 text-gray-500'
                        }`}>
                          {sub.status}
                        </span>

                        <button
                          onClick={() => deleteSubscriber(sub.id)}
                          className="p-1.5 rounded bg-red-400/5 hover:bg-red-400/10 border border-red-500/10 text-red-500 hover:text-red-400 cursor-pointer transition-colors"
                          title="Purge Subscriber record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {subscribers.length === 0 && (
                    <div className="text-center py-16 text-gray-500 font-mono text-xs">
                      No subscribers mapped to this container yet. Subscribe email in footer to log.
                    </div>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
