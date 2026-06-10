# 🌿 Verdant Digital

> Premium full-stack business website and digital agency platform — featuring an AI chat assistant, admin CMS dashboard, blog, portfolio, and more.

[![TypeScript](https://img.shields.io/badge/TypeScript-99%25-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-Vite-61DAFB?style=flat-square&logo=react)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

---

## 📌 About

**Verdant Digital** is a modern, full-stack agency website built with React + TypeScript. It includes a complete frontend experience with an AI-powered chat assistant (Gemini API), an admin CMS dashboard, portfolio showcase, services listing, blog, and a contact section — all backed by a lightweight JSON database and a Node.js/Express server.

---

## ✨ Features

- 🤖 **AI Chat Assistant** — Integrated with Google Gemini API for intelligent responses
- 🛠️ **Admin Dashboard** — Manage content, view messages, and update site data
- 📁 **Portfolio Showcase** — Display client projects with categories and details
- 💼 **Services Section** — List agency services with descriptions
- 📝 **Blog** — Publish and manage blog posts
- 📬 **Contact Form** — Capture inquiries directly into the database
- 🧭 **Responsive Navbar & Footer** — Fully mobile-friendly navigation
- 🗄️ **JSON Database** — File-based persistence via `verdant_db.json`

---

## 🗂️ Project Structure

```
verdant-digital/
├── src/
│   ├── components/
│   │   ├── AIChat.tsx          # AI chat assistant
│   │   ├── AboutView.tsx       # About page
│   │   ├── AdminDashboard.tsx  # Admin CMS panel
│   │   ├── BlogView.tsx        # Blog listing
│   │   ├── ContactView.tsx     # Contact form
│   │   ├── Footer.tsx          # Site footer
│   │   ├── HomeView.tsx        # Landing/home page
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── PortfolioView.tsx   # Portfolio gallery
│   │   └── ServicesView.tsx    # Services listing
│   ├── db/
│   │   └── db.ts               # Database helper functions
│   ├── App.tsx                 # Main app & routing
│   ├── main.tsx                # Entry point
│   ├── types.ts                # TypeScript type definitions
│   └── index.css               # Global styles
├── server.ts                   # Express backend server
├── verdant_db.json             # JSON database
├── index.html
├── vite.config.ts
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mawiya-47/Verdant-Digital.git
cd Verdant-Digital

# 2. Install dependencies
npm install

# 3. Add your Gemini API key
# Create a .env.local file in the root:
echo "GEMINI_API_KEY=your_api_key_here" > .env.local

# 4. Start the development server
npm run dev
```

The app will be running at **http://localhost:3000**

---

## 🔧 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Vite |
| Styling | CSS (custom) |
| Backend | Node.js, Express, tsx |
| AI | Google Gemini API |
| Database | JSON file (`verdant_db.json`) |

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Mawiya** — [@mawiya-47](https://github.com/mawiya-47)
