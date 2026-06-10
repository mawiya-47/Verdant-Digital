/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  Loader2, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      content: 'Greetings. I am **Verda**, your Verdant Digital tech concierge. I can specify architectural blueprints for Web Engineering, Multi-agent autonomous workflows, or estimate custom SaaS budgets. What business systems can I help you automate today?'
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Handle send message
  const handleSend = async (customPrompt?: string) => {
    const textToSend = (customPrompt || inputVal).trim();
    if (!textToSend || loading) return;

    if (!customPrompt) {
      setInputVal('');
    }

    const updatedHistory: ChatMessage[] = [
      ...messages,
      { role: 'user', content: textToSend }
    ];

    setMessages(updatedHistory);
    setLoading(true);

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedHistory })
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok && data.text) {
        setMessages([
          ...updatedHistory,
          { role: 'model', content: data.text }
        ]);
      } else {
        setMessages([
          ...updatedHistory,
          { 
            role: 'model', 
            content: 'I apologize. I am temporarily experiencing connection latency. However, you can secure priority consult with our Lead Engineers instantly by sending a note to muhammadmawiya5@gmail.com!' 
          }
        ]);
      }
    } catch (err) {
      setLoading(false);
      setMessages([
        ...updatedHistory,
        { 
          role: 'model', 
          content: 'I encountered a communication network disconnect. Let us retry immediately, or feel free to utilize our Contact Form to secure an offline briefing.' 
        }
      ]);
    }
  };

  const clearHistory = () => {
    setMessages([
      {
        role: 'model',
        content: 'Greetings. I am **Verda**, your Verdant Digital tech concierge. Thread refreshed! What beautiful system are we scoping next?'
      }
    ]);
  };

  // Quick suggestion tags based on requested services
  const suggestions = [
    { label: '🤖 Build AI Agents', prompt: 'Tell me about designing Multi-Agent workflows for startups' },
    { label: '⚡ Fast Next.js Core', prompt: 'What technologies do you use to achieve sub-second load times?' },
    { label: '💰 Custom Quote', prompt: 'I want to build a multi-tenant SaaS platform. How do we scope the architecture?' },
  ];

  return (
    <div id="ai-chat-concierge" className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* 1. Closed state glowing float button */}
      {!isOpen && (
        <button
          id="ai-coach-badge-btn"
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 text-black shadow-[0_4px_24px_rgba(16,185,129,0.35)] hover:shadow-[0_4px_30px_rgba(16,185,129,0.55)] border border-emerald-400/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <div className="absolute -inset-1 rounded-full bg-emerald-500/20 blur-md opacity-70 group-hover:opacity-100 animate-pulse" />
          <MessageSquare className="w-6 h-6 relative z-10 transition-transform group-hover:rotate-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400" />
          </span>
        </button>
      )}

      {/* 2. Opened Floating Chat Window */}
      {isOpen && (
        <div
          id="ai-consultant-card"
          className="w-80 sm:w-96 h-[480px] sm:h-[550px] rounded-[32px] bg-neutral-950/95 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300"
        >
          
          {/* Header Panel */}
          <div className="px-5 py-4.5 bg-white/5 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Bot className="w-4.5 h-4.5 animate-bounce" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-extrabold text-white">Verda Assistant</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
                </div>
                <p className="text-[10px] text-gray-400 font-mono">POWERED BY GEMINI AI</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              <button 
                onClick={clearHistory}
                className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-400 hover:bg-white/5 transition-colors cursor-pointer"
                title="Clear thread"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>

          {/* Messages Node Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => {
              const isAI = msg.role === 'model';
              return (
                <div key={i} className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                    isAI 
                      ? 'bg-white/5 text-gray-200 border border-white/10 rounded-tl-none' 
                      : 'bg-emerald-500 text-black font-semibold rounded-tr-none shadow-lg'
                  }`}>
                    {/* Minimal block styling for code or bold markdowns */}
                    <div className="space-y-1">
                      {msg.content.split('\n').map((line, idx) => {
                        // Very basic bold markup support *text*
                        const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                        return (
                          <p key={idx} dangerouslySetInnerHTML={{ __html: formatted }} />
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 text-gray-400 rounded-2xl rounded-tl-none px-4 py-2 text-xs flex items-center space-x-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
                  <span className="font-mono text-[10px]">VERDA IS PROCESSING SYSTEM SPECS...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick Suggestions Shelf */}
          {messages.length === 1 && (
            <div className="px-4 py-2.5 border-t border-white/10 bg-[#050505] space-y-1.5">
              <span className="text-[9px] font-mono tracking-widest text-[#9ccdbe] uppercase block font-bold">
                Suggested Blueprints
              </span>
              <div className="flex flex-col space-y-1.5">
                {suggestions.map((sg, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(sg.prompt)}
                    className="w-full text-left bg-white/5 hover:bg-emerald-500 hover:text-black border border-white/10 hover:border-emerald-500/30 text-xs text-gray-300 py-1.5 px-3 rounded-lg transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <span>{sg.label}</span>
                    <ArrowRight className="w-3 h-3 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message form entry */}
          <div className="p-3.5 bg-neutral-950 border-t border-white/10">
            <form
              id="ai-assistant-submission-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center space-x-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 focus-within:border-emerald-500/50 transition-all"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask Verda about engineering designs..."
                disabled={loading}
                className="flex-1 bg-transparent border-none text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || loading}
                className="p-1.5 rounded-full bg-white hover:bg-emerald-500 text-black hover:text-white disabled:opacity-40 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

    </div>
  );
}
