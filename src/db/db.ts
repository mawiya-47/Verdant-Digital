/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as fs from 'fs';
import * as path from 'path';
import { 
  User, 
  UserRole, 
  Category, 
  BlogPost, 
  Project, 
  Testimonial, 
  ContactMessage, 
  Subscriber,
  AnalyticsStats
} from '../types';

interface DatabaseSchema {
  users: User[];
  categories: Category[];
  posts: BlogPost[];
  projects: Project[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  subscribers: Subscriber[];
  viewsCounter: number;
}

const DB_FILE = path.join(process.cwd(), 'verdant_db.json');

// High-quality premium tech images from unsplash (real, safe, beautifully suited for emerald/dark glass format)
const SEED_DATA: DatabaseSchema = {
  users: [
    {
      id: 'usr_1',
      email: 'muhammadmawiya5@gmail.com',
      name: 'Mawiya Admin',
      role: UserRole.ADMIN,
      createdAt: '2026-05-01T12:00:00Z',
      password: 'adminpassword123' // Sandbox straightforward login or dynamic authenticate
    },
    {
      id: 'usr_2',
      email: 'editor@verdant.digital',
      name: 'Sarah Chen',
      role: UserRole.EDITOR,
      createdAt: '2026-05-10T09:30:00Z',
      password: 'editorpassword123'
    }
  ],
  categories: [
    { id: 'cat_web', name: 'Web Development', slug: 'web-development', description: 'Next-generation high-performance static and dynamic web experiences.' },
    { id: 'cat_ai', name: 'AI Automation', slug: 'ai-automation', description: 'Intelligent AI workflows, LLM agents, and custom GPT integrations.' },
    { id: 'cat_saas', name: 'SaaS Development', slug: 'saas-development', description: 'Scalable cloud-native products, billing loops, and multi-tenant systems.' },
    { id: 'cat_design', name: 'UI/UX Design', slug: 'ui-ux-design', description: 'Aura-grade dark mode, minimalist interfaces, and responsive interaction systems.' },
    { id: 'cat_seo', name: 'SEO Optimization', slug: 'seo-optimization', description: 'Technical SEO, copy positioning, and speed metrics.' }
  ],
  posts: [
    {
      id: 'post_1',
      title: 'The AI Autopilot: How Multi-Agent Workflows are Transforming Startups in 2026',
      slug: 'ai-autopilot-multi-agent-workflows',
      summary: 'Explore how modern businesses are leveraging coordinated AI agent networks to eliminate administrative overhead, scale customer service, and run development cycles.',
      content: `## The Era of Autonomous Business Operations

Many tech businesses have evolved past simple chatbot assistants. We are currently witnessing a massive sea change in workplace efficiency driven by **Multi-Agent Orchestration**. These networks consist of highly specialized AI agents possessing unique system roles, database endpoints, and toolkits, working in harmony to completely automate processes previously requiring days of manual work.

### How it Works: The Symphony of Agents

Unlike a single-turn agent that responds to immediate instructions, multi-agent frameworks divide and conquer complex projects:
1. **The Lead Strategist Agent**: Deconstructs user requirements into targeted technical tickets.
2. **The QA Sandbox Agent**: Generates custom test scripts and reviews outputs for syntax or edge cases.
3. **The Deployment Monitor**: Observes system metrics and rolls back any problematic releases in milliseconds.

\`\`\`typescript
// Concept block: Initializing an AI-to-Agent Event Handler
import { GoogleGenAI } from "@google/genai";

async function coordinateWorkflow(userGoal: string) {
  console.log("De-structuring task:", userGoal);
  // Agents collaborate internally...
}
\`\`\`

### Real Business Outcomes

Companies integrating this framework report a **70% decrease** in ticket processing times and up to **40% lower operations overhead**. Over the next 12 months, agencies not actively deploying AI agents will struggle to match the pricing, speed, and iteration frequency of autonomous systems. Here at **Verdant Digital**, we construct custom workflows tailored to your operational bottlenecks, elevating your engineers to orchestration managers.`,
      categoryId: 'cat_ai',
      tags: ['AI Automation', 'LLMs', 'Startups', 'Tech Trends'],
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
      published: true,
      author: 'Mawiya Admin',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
      createdAt: '2026-06-01T08:00:00Z',
      views: 245
    },
    {
      id: 'post_2',
      title: 'Building for the Extreme Web: Moving Beyond Standard React to Server-First Paradigms',
      slug: 'building-extreme-web-server-first',
      summary: 'A detailed critique of standard client-rendered apps. Learn how modern web development uses server-actions, static streaming, and edge routes for flawless loading speeds.',
      content: `## Speed as a Compelling Value Metric

Studies consistently establish that conversion levels drop by **7% for every single second** of delay in interactive load times. Yet, standard heavy client bundles continue to bloat web experiences, delivering a laggy experience to mobile clients.

### The Rise of Hybrid Architectures

By utilizing advanced frameworks pairing with Express or Next server infrastructures, we split the rendering burden:
*   **Static Generation at Edge**: Marketing copy and hero media render instantly without JavaScript execution.
*   **Deferred Hydration**: Interactive elements (like checkout buttons or portals) hydrate smoothly in the background.
*   **Bypassing the API Hop**: Server-side actions talk directly to private databases, reducing round-trip latency to nearly zero.

Our standard architectural stack at **Verdant Digital** strictly deploys optimized code, scoring above 98% in Core Web Vitals out-of-the-box.`,
      categoryId: 'cat_web',
      tags: ['Web Development', 'NextJS', 'Performance', 'UX'],
      imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop',
      published: true,
      author: 'Sarah Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      createdAt: '2026-06-04T14:20:00Z',
      views: 189
    },
    {
      id: 'post_3',
      title: 'Crafting Visually Magnetic Dark Layouts: The UX Science Behind Ambient Dark Interfaces',
      slug: 'crafting-visually-magnetic-dark-layouts',
      summary: 'Why emerald filters, blurred glass pillars, and contextual depth lines improve cognitive digestion and command higher premium prices in high-ticket software.',
      content: `## Emotional Alignment in UI/UX

Premium digital products look prestigious because they understand the mechanics of **architectural visual feedback**. High-end dark mode is not merely an inverted black canvas—it requires layered structures, cohesive color ranges, and deliberate micro-interactions.

### Keys to High-End Dark Polish

1.  **Never Use Pure Black**: Soft charcoals and slate greys (like \`#0a0f0d\`) allow depth shadows to remain visible, providing physical volume to elements.
2.  **Contextual Glows**: Utilizing emerald green or emerald cyan tints (\`rgba(16, 185, 129, 0.1)\`) focusing user focus toward primary actions.
3.  **The Glassmorphic Glass Stack**: Adding backdrop blur filters simulates physical glass sheets, creating three-dimensional clarity.
4.  **Sparsity & Tracking**: Spacing headings out with generous tracking (\`tracking-widest\`) evokes high-fashion editorials and upscale technology portals.

By treating user interface construction as digital sculpture rather than flat containers, **Verdant Digital** builds experiences that customers love to keep open on their secondary terminals.`,
      categoryId: 'cat_design',
      tags: ['Design System', 'UI/UX', 'Glassmorphism', 'Emerald Theme'],
      imageUrl: 'https://images.unsplash.com/photo-1618005198143-e5283b519a7f?q=80&w=1200&auto=format&fit=crop',
      published: true,
      author: 'Sarah Chen',
      authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      createdAt: '2026-06-06T11:15:00Z',
      views: 312
    }
  ],
  projects: [
    {
      id: 'proj_1',
      title: 'AuraPay SaaS Billing Engine',
      description: 'A comprehensive, multi-tenant billing core processing millions in secure subscriptions with real-time financial tracking.',
      detailedCaseStudy: 'We designed AuraPay from the ground up to solve complex enterprise tax matching and recurring billing retries. Built with low-latency edge caching, a modular visual control portal, and integrated Stripe endpoints, AuraPay delivers ultra-reliable payment routing. Our custom dashboard lets users deploy smart retry logic on card failures, resulting in a 14% direct reduction in involuntary customer churn.',
      client: 'Aura Financial Inc.',
      category: 'SaaS Development',
      tags: ['Prisma', 'React', 'Payment Systems', 'Stripe'],
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      liveUrl: 'https://aurapay.sample.verdant.digital',
      launchDate: '2026-01-15',
      featured: true
    },
    {
      id: 'proj_2',
      title: 'Aegis Intelligent Procurement Orchestrator',
      description: 'Autonomous multi-agent enterprise hub, parsing supplier proposals, matching catalog codes, and composing RFPs.',
      detailedCaseStudy: 'Aegis was struggling with manual procurement processes taking upwards of 3 weeks per supply campaign. Verdant Digital constructed a custom multi-agent environment utilizing modern Gemini models. The AI autonomously extracts line items from unstructured bid documents, benchmarks against historical invoice databases, flags discrepancies, and drafts optimal negotiation letters. Average process cycle times dropped from 21 days to less than 8 minutes.',
      client: 'Aegis Supply Chain Corp',
      category: 'AI Automation',
      tags: ['Gemini API', 'NodeJS', 'Automation', 'Workflows'],
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop',
      liveUrl: 'https://aegis.sample.verdant.digital',
      launchDate: '2026-03-22',
      featured: true
    },
    {
      id: 'proj_3',
      title: 'Vanguard Luxury Real Estate Portal',
      description: 'Highly immersive, fully interactive WebGL-backed real estate showcasing with custom micro-animations.',
      detailedCaseStudy: 'A high-end brokerage required a website that felt like a prestigious architectural museum. We built Vanguard utilizing pre-rendered lightweight models, high-performance web components, and beautiful frame transitions. The platform achieved outstanding Lighthouse scores of 99% and significantly increased international cash-buyer inquiries by more than 40% within two months of digital launch.',
      client: 'Vanguard Estates',
      category: 'Web Development',
      tags: ['ThreeJS', 'Tailwind CSS', 'Framer Motion', 'SEO'],
      imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      liveUrl: 'https://vanguard.sample.verdant.digital',
      launchDate: '2026-04-10',
      featured: true
    },
    {
      id: 'proj_4',
      title: 'Nerve Health App & Patient Center',
      description: 'Unified telemetry-grade healthcare application matching patients with specialized neurologists securely and fluidly.',
      detailedCaseStudy: 'Nerve came to us to build a hybrid React Native and web healthcare ecosystem. We engineered a HIPAA-aligned consultation platform which streams secure, high-definition data between general practitioners and clinical neurologists. Key tools include automatic prescription filing, dynamic scheduling calendars, and interactive visual charting showing critical nerve response patterns.',
      client: 'Nerve Health Solutions',
      category: 'Mobile Apps',
      tags: ['React Native', 'Healthcare', 'UI/UX', 'NodeJS'],
      imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      liveUrl: 'https://nerve.sample.verdant.digital',
      launchDate: '2026-05-18',
      featured: false
    }
  ],
  testimonials: [
    {
      id: 'test_1',
      name: 'Eleanor Vance',
      role: 'Chief Technology Officer',
      company: 'Aura Financial',
      feedback: 'Verdant Digital transformed our software vision into an ultra-reliable, lightning-fast product. Their technical expertise, code organization, and premium design language are second to none in the industry. Highly recommended!',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
      featured: true
    },
    {
      id: 'test_2',
      name: 'Marcus Sterling',
      role: 'VP of Product Operations',
      company: 'Aegis Supply Chain',
      feedback: 'The AI orchestration system designed by Verdant completely revolutionized our procurement. Manual audits that once consumed weeks of senior employee and consultant labor now complete securely in seconds. A game-changer.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
      featured: true
    },
    {
      id: 'test_3',
      name: 'David Vance',
      role: 'Managing Partner',
      company: 'Vanguard Estates',
      feedback: 'Our web presence needed to reflect the extreme luxury of the multi-million dollar portfolios we list. Verdant did not just meet the brief—they surpassed it. The aesthetics, smooth flow on mobile, and SEO rankings exceed all expectations.',
      rating: 5,
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      featured: true
    }
  ],
  messages: [
    {
      id: 'msg_1',
      name: 'Alex Rivera',
      email: 'a.rivera@quantops.io',
      subject: 'Inquiry for custom automated workflow',
      message: 'We are seeking an agency to design a pipeline connecting our customer databases with internal GPT structures. Would love to scope this with your lead AI engineer next week.',
      status: 'unread',
      createdAt: '2026-06-07T10:15:00Z'
    },
    {
      id: 'msg_2',
      name: 'Chloe Sinclair',
      email: 'chloe@sinclairdesign.com',
      subject: 'Collaboration opportunity on upcoming SaaS product launch',
      message: 'Hello, our agency is looking for a premium development partner to execute web engineering for our upcoming SaaS branding system. Let us discuss availability!',
      status: 'read',
      createdAt: '2026-06-06T15:40:00Z'
    }
  ],
  subscribers: [
    { id: 'sub_1', email: 'muhammadmawiya5@gmail.com', subscribedAt: '2026-06-01T09:00:00Z', status: 'active' },
    { id: 'sub_2', email: 'hello@agencygrowth.co', subscribedAt: '2026-06-03T11:20:00Z', status: 'active' },
    { id: 'sub_3', email: 'techenthusiast@gmail.com', subscribedAt: '2026-06-05T14:50:00Z', status: 'active' }
  ],
  viewsCounter: 1482
};

export class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.load();
  }

  private load(): DatabaseSchema {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf8');
        return JSON.parse(fileContent);
      }
    } catch (e) {
      console.error('Error loading database file, seeding instead', e);
    }
    this.save(SEED_DATA);
    return SEED_DATA;
  }

  private save(data: DatabaseSchema) {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error('Error saving database file:', e);
    }
  }

  // --- Users Operations ---
  getUsers(): User[] {
    return this.data.users.map(({ password, ...u }) => u) as User[];
  }

  getUserByEmail(email: string): User | undefined {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  authenticateUser(email: string, passwordString: string): User | undefined {
    const user = this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === passwordString);
    if (user) {
      const { password, ...safeUser } = user;
      return safeUser as User;
    }
    return undefined;
  }

  // --- Categories Operations ---
  getCategories(): Category[] {
    return this.data.categories;
  }

  // --- Blog Posts Operations ---
  getPosts(includeUnpublished = false): BlogPost[] {
    return includeUnpublished 
      ? this.data.posts 
      : this.data.posts.filter(p => p.published);
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    const post = this.data.posts.find(p => p.slug === slug);
    if (post) {
      post.views += 1;
      this.save(this.data);
    }
    return post;
  }

  addPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'views'>): BlogPost {
    const newPost: BlogPost = {
      ...postData,
      id: `post_${Date.now()}`,
      createdAt: new Date().toISOString(),
      views: 0
    };
    this.data.posts.unshift(newPost);
    this.save(this.data);
    return newPost;
  }

  editPost(id: string, postData: Partial<BlogPost>): BlogPost | undefined {
    const idx = this.data.posts.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    
    this.data.posts[idx] = {
      ...this.data.posts[idx],
      ...postData
    };
    this.save(this.data);
    return this.data.posts[idx];
  }

  deletePost(id: string): boolean {
    const prevLen = this.data.posts.length;
    this.data.posts = this.data.posts.filter(p => p.id !== id);
    if (this.data.posts.length !== prevLen) {
      this.save(this.data);
      return true;
    }
    return false;
  }

  // --- Projects Operations ---
  getProjects(): Project[] {
    return this.data.projects;
  }

  addProject(projectData: Omit<Project, 'id'>): Project {
    const newProj: Project = {
      ...projectData,
      id: `proj_${Date.now()}`
    };
    this.data.projects.unshift(newProj);
    this.save(this.data);
    return newProj;
  }

  editProject(id: string, projectData: Partial<Project>): Project | undefined {
    const idx = this.data.projects.findIndex(p => p.id === id);
    if (idx === -1) return undefined;

    this.data.projects[idx] = {
      ...this.data.projects[idx],
      ...projectData
    };
    this.save(this.data);
    return this.data.projects[idx];
  }

  deleteProject(id: string): boolean {
    const prevLen = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== id);
    if (this.data.projects.length !== prevLen) {
      this.save(this.data);
      return true;
    }
    return false;
  }

  // --- Testimonials Operations ---
  getTestimonials(): Testimonial[] {
    return this.data.testimonials;
  }

  // --- Contact Messages Operations ---
  getMessages(): ContactMessage[] {
    return this.data.messages;
  }

  addMessage(msgData: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msgData,
      id: `msg_${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.data.messages.unshift(newMsg);
    this.save(this.data);
    return newMsg;
  }

  updateMessageStatus(id: string, status: 'unread' | 'read' | 'replied', replyContent?: string): ContactMessage | undefined {
    const idx = this.data.messages.findIndex(m => m.id === id);
    if (idx === -1) return undefined;

    this.data.messages[idx].status = status;
    if (replyContent !== undefined) {
      this.data.messages[idx].replyContent = replyContent;
    }
    this.save(this.data);
    return this.data.messages[idx];
  }

  deleteMessage(id: string): boolean {
    const prevLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    if (this.data.messages.length !== prevLen) {
      this.save(this.data);
      return true;
    }
    return false;
  }

  // --- Newsletter Subscribers Operations ---
  getSubscribers(): Subscriber[] {
    return this.data.subscribers;
  }

  addSubscriber(email: string): { subscriber: Subscriber; isNew: boolean } {
    const cleanEmail = email.trim().toLowerCase();
    const existing = this.data.subscribers.find(s => s.email.toLowerCase() === cleanEmail);
    if (existing) {
      if (existing.status === 'unsubscribed') {
        existing.status = 'active';
        this.save(this.data);
        return { subscriber: existing, isNew: true };
      }
      return { subscriber: existing, isNew: false };
    }

    const newSub: Subscriber = {
      id: `sub_${Date.now()}`,
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
      status: 'active'
    };
    this.data.subscribers.push(newSub);
    this.save(this.data);
    return { subscriber: newSub, isNew: true };
  }

  unsubscribeEmail(email: string): boolean {
    const sub = this.data.subscribers.find(s => s.email.toLowerCase() === email.trim().toLowerCase());
    if (sub) {
      sub.status = 'unsubscribed';
      this.save(this.data);
      return true;
    }
    return false;
  }

  deleteSubscriber(id: string): boolean {
    const prevLen = this.data.subscribers.length;
    this.data.subscribers = this.data.subscribers.filter(s => s.id !== id);
    if (this.data.subscribers.length !== prevLen) {
      this.save(this.data);
      return true;
    }
    return false;
  }

  // --- Analytics Stats Helper ---
  incrementViews() {
    this.data.viewsCounter += 1;
    this.save(this.data);
  }

  getAnalytics(): AnalyticsStats {
    // Generate lovely stats trends for charts
    const leadsByDay = [
      { date: 'Mon', count: 4 },
      { date: 'Tue', count: 7 },
      { date: 'Wed', count: 5 },
      { date: 'Thu', count: 8 },
      { date: 'Fri', count: 12 },
      { date: 'Sat', count: 6 },
      { date: 'Sun', count: 9 },
    ];

    const trafficSource = [
      { source: 'Direct', count: 320 },
      { source: 'Google organic', count: 480 },
      { source: 'LinkedIn referral', count: 390 },
      { source: 'Newsletter', count: 180 },
      { source: 'GitHub / Dev sites', count: 112 },
    ];

    const categoryDistribution = this.data.categories.map(cat => {
      const pCount = this.data.projects.filter(p => p.category.toLowerCase().includes(cat.name.toLowerCase()) || cat.name.toLowerCase().includes(p.category.toLowerCase())).length;
      return {
        category: cat.name,
        count: pCount || 1 // guarantee at least a dynamic visualization weight
      };
    });

    const unreadMessagesCount = this.data.messages.filter(m => m.status === 'unread').length;

    return {
      viewsCount: this.data.viewsCounter,
      messagesCount: this.data.messages.length,
      subscribersCount: this.data.subscribers.filter(s => s.status === 'active').length,
      projectsCount: this.data.projects.length,
      unreadMessagesCount,
      trafficSource,
      leadsByDay,
      categoryDistribution
    };
  }
}

// In-memory single instance exports
export const db = new Database();
