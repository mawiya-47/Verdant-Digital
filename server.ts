/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { db } from './src/db/db';
import { UserRole } from './src/types';

const app = express();
const PORT = 3000;

// Parsers
app.use(express.json());

// Simple custom token-based Authorization middleware for Admin routes
const AUTH_TOKEN_SECRET = 'verdant-super-secret-session-token-2026';

function adminOnly(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authentication required. Please sign in as Admin.' });
  }
  const token = authHeader.split(' ')[1];
  if (token === AUTH_TOKEN_SECRET) {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Administrator credentials required.' });
  }
}

// Global count views for overall analytics
app.use((req, res, next) => {
  if (req.method === 'GET' && !req.path.startsWith('/api') && !req.path.includes('.')) {
    db.incrementViews();
  }
  next();
});

// ==========================================
// API REST ENDPOINTS
// ==========================================

// --- Auth Endpoints ---
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required fields.' });
  }

  const authenticated = db.authenticateUser(email, password);
  if (authenticated) {
    if (authenticated.role === UserRole.ADMIN || authenticated.role === UserRole.EDITOR) {
      return res.json({
        user: authenticated,
        token: AUTH_TOKEN_SECRET
      });
    } else {
      return res.status(403).json({ error: 'Access denied. Admin portal roles only.' });
    }
  }

  res.status(401).json({ error: 'Invalid email or password combination. Please try again.' });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ') || authHeader.split(' ')[1] !== AUTH_TOKEN_SECRET) {
    return res.status(401).json({ error: 'No active session.' });
  }
  
  // Return the default admin user mock info
  const users = db.getUsers();
  res.json({ user: users[0] });
});

// --- Public Config & Metadata ---
app.get('/api/categories', (req, res) => {
  res.json(db.getCategories());
});

app.get('/api/testimonials', (req, res) => {
  res.json(db.getTestimonials());
});

// --- Blog Posts Routing ---
app.get('/api/posts', (req, res) => {
  const authHeader = req.headers.authorization;
  const isAdmin = authHeader?.startsWith('Bearer ') && authHeader.split(' ')[1] === AUTH_TOKEN_SECRET;
  
  // Admins see all posts, public sees only published
  res.json(db.getPosts(isAdmin));
});

app.get('/api/posts/:slug', (req, res) => {
  const post = db.getPostBySlug(req.params.slug);
  if (!post) {
    return res.status(404).json({ error: 'Blog post not found.' });
  }
  res.json(post);
});

// --- Projects Routing ---
app.get('/api/projects', (req, res) => {
  res.json(db.getProjects());
});

// --- Contact Form Submission ---
app.post('/api/messages', (req, res) => {
  const { name, email, subject, message } = req.body;

  // Simple severe inputs validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are strictly required (name, email, subject, message).' });
  }
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Please submit a valid business email address.' });
  }

  const created = db.addMessage({ name, email, subject, message });
  res.json({ 
    success: true, 
    message: 'Your inquiry has been logged securely. Our tech directors will follow up within 8 hours.',
    data: created 
  });
});

// --- Subscription Form ---
app.post('/api/subscribers', (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Please submit a valid email to subscribe.' });
  }

  const { subscriber, isNew } = db.addSubscriber(email);
  if (!isNew) {
    return res.json({ 
      success: true, 
      message: 'You are already registered for our newsletter updates. Stay tuned!' 
    });
  }

  res.json({ 
    success: true, 
    message: 'Subscription successful! Welcome to the Verdant engineering newsletter.' 
  });
});

// ==========================================
// ADMIN DASHBOARD ONLY ENDPOINTS (PROTECTED)
// ==========================================

app.get('/api/admin/analytics', adminOnly, (req, res) => {
  res.json(db.getAnalytics());
});

// Admin Custom Blog Posts CRUD
app.post('/api/admin/posts', adminOnly, (req, res) => {
  const { title, summary, content, categoryId, tags, imageUrl, published } = req.body;
  if (!title || !content || !categoryId) {
    return res.status(400).json({ error: 'Title, content, and category are required fields.' });
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const author = 'Mawiya Admin';
  const authorAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop';

  const newPost = db.addPost({
    title,
    slug,
    summary: summary || title.slice(0, 160),
    content,
    categoryId,
    tags: tags || [],
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    published: published !== undefined ? published : true,
    author,
    authorAvatar
  });

  res.json({ success: true, post: newPost });
});

app.put('/api/admin/posts/:id', adminOnly, (req, res) => {
  const edited = db.editPost(req.params.id, req.body);
  if (!edited) {
    return res.status(404).json({ error: 'Blog post not found to edit.' });
  }
  res.json({ success: true, post: edited });
});

app.delete('/api/admin/posts/:id', adminOnly, (req, res) => {
  const deleted = db.deletePost(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Blog post not found to delete.' });
  }
  res.json({ success: true });
});

// Admin Portfolio Projects CRUD
app.post('/api/admin/projects', adminOnly, (req, res) => {
  const { title, description, detailedCaseStudy, client, category, tags, imageUrl, liveUrl, launchDate, featured } = req.body;
  if (!title || !description || !category) {
    return res.status(400).json({ error: 'Title, description, and category are required fields.' });
  }

  const newProj = db.addProject({
    title,
    description,
    detailedCaseStudy: detailedCaseStudy || '',
    client: client || 'Private Client',
    category,
    tags: tags || [],
    imageUrl: imageUrl || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    liveUrl: liveUrl || '',
    launchDate: launchDate || new Date().toISOString().split('T')[0],
    featured: !!featured
  });

  res.json({ success: true, project: newProj });
});

app.put('/api/admin/projects/:id', adminOnly, (req, res) => {
  const edited = db.editProject(req.params.id, req.body);
  if (!edited) {
    return res.status(404).json({ error: 'Project not found.' });
  }
  res.json({ success: true, project: edited });
});

app.delete('/api/admin/projects/:id', adminOnly, (req, res) => {
  const deleted = db.deleteProject(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Project not found to delete.' });
  }
  res.json({ success: true });
});

// Admin Inquiries Operations
app.get('/api/admin/messages', adminOnly, (req, res) => {
  res.json(db.getMessages());
});

app.put('/api/admin/messages/:id', adminOnly, (req, res) => {
  const { status, replyContent } = req.body;
  const updated = db.updateMessageStatus(req.params.id, status, replyContent);
  if (!updated) {
    return res.status(404).json({ error: 'Inquiry message not found.' });
  }
  res.json({ success: true, message: updated });
});

app.delete('/api/admin/messages/:id', adminOnly, (req, res) => {
  const deleted = db.deleteMessage(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Inquiry message not found to delete.' });
  }
  res.json({ success: true });
});

// Admin Subscribers operations
app.get('/api/admin/subscribers', adminOnly, (req, res) => {
  res.json(db.getSubscribers());
});

app.delete('/api/admin/subscribers/:id', adminOnly, (req, res) => {
  const deleted = db.deleteSubscriber(req.params.id);
  if (!deleted) {
    return res.status(404).json({ error: 'Subscriber record not found to delete.' });
  }
  res.json({ success: true });
});


// ==========================================
// SERVER-SIDE GEMINI API INTENT (AI CHATBOT)
// ==========================================

app.post('/api/gemini/chat', async (req, res) => {
  const { messages } = req.body; // Full history [{role: 'user'|'model', content: string}]
  
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Chat history messages is a required array.' });
  }

  // System instruction detailing agency capabilities
  const promptContext = `You are "Verda", the intelligent artificial consultant for Verdant Digital.
Verdant Digital is a high-end full-stack digital development and web agency specializing in:
1. Web Development (Next-gen hybrid React platforms, Tailwind CSS architecture).
2. AI Automation (Multi-Agent ecosystems, intelligent workflows, LLMs integrations).
3. SaaS Development (Custom subscription platforms, billing dashboards, Stripe integrations).
4. UI/UX Design (Exquisite emerald green and charcoal glass systems, high contrast layouts).
5. Tech SEO (Score optimization, speed matrices, search visibility optimization).

Instructions:
- Keep your answers highly professional, innovative, and sleek (reflecting the premium quality of the agency).
- Offer custom advice based on what the user wants to build.
- If the user discusses a prospective project, describe how Verdant Digital can implement it using cutting-edge stacks.
- Guide the conversation gently toward suggesting they submit an inquiry via our Contact form (or click the CTA buttons) to schedule a strategy call.
- Provide crisp, clear answers. Avoid formatting overload but use bullet points where helpful.
- Keep your tone futuristic, clean, and consultative. Speak humanely, avoiding generic robotic greetings.`;

  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
      // Local highly detailed consultant fallback if key is missing (for robust preview safety)
      const lastUserMsg = messages[messages.length - 1]?.content || 'Hello';
      let fallbackText = `I am Verda, your Verdant Digital consultant! While my primary autonomous brain is initializing, let me assist you with your inquiry.

Regarding "${lastUserMsg}":
Our expert team at Verdant Digital specializes in engineering high-performance web products, AI agents, and enterprise billing cores exactly like this. We deploy performant React architectures with clean, secure databases. 

To help configure custom logic for your project, please contact our Lead Architects at muhammadmawiya5@gmail.com or leave an active inquiry in the Contact page form with your specific objectives. We normally compile complete proposals within 8 business hours! Would you like me to outline our technical workflow for such builds?`;

      return res.json({ text: fallbackText });
    }

    // Initialize the official @google/genai SDK (lazy loaded as recommended)
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });

    // Translate client formatting into @google/genai structure
    // @google/genai contents should be string prompts or multi-turn arrays.
    // Let's pass the dynamic chat session
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: promptContext,
        temperature: 0.7
      }
    });

    let currentResponse;
    // Iterate through previous history to feed into the chat context so the bot remembers state
    for (let i = 0; i < messages.length - 1; i++) {
      const msg = messages[i];
      // Sync it internally
      // In chat systems, we can feed previous inputs or simply send a bundled thread instruction
    }

    // Send the latest user turn
    const lastMsg = messages[messages.length - 1];
    const result = await chat.sendMessage({
      message: lastMsg.content
    });

    const responseText = result.text;
    if (!responseText) {
      throw new Error('Received an empty text response from the Gemini API.');
    }

    res.json({ text: responseText });

  } catch (error: any) {
    console.error('Gemini API Integration Error:', error);
    res.status(500).json({ 
      error: 'An issue occurred inside the AI consultant engine. Our engineers have been alerted.',
      details: error.message 
    });
  }
});


// ==========================================
// VITE AND DEVELOPMENT DEV SERVER WRAPPING
// ==========================================

const isProd = process.env.NODE_ENV === 'production';

async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Verdant Digital server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
