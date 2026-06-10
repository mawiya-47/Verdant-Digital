/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  Map,
  ArrowUpRight,
  Inbox
} from 'lucide-react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  const [simulatedEmailSent, setSimulatedEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setLoading(true);
    setStatusMsg(null);
    setSimulatedEmailSent(false);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setIsError(false);
        setStatusMsg(data.message || 'Thank you! Your direct consultation request was securely logged.');
        setSimulatedEmailSent(true);
        setFormData({ name: '', email: '', subject: '', message: '' }); // reset
      } else {
        setIsError(true);
        setStatusMsg(data.error || 'Submission error. Please verify input fields.');
      }
    } catch {
      setLoading(false);
      setIsError(true);
      setStatusMsg('Communication failure. Please try again or email us directly.');
    }
  };

  return (
    <div id="contact-view-container" className="pt-32 pb-24 bg-[#050505] min-h-screen relative overflow-hidden font-sans">
      
      {/* Lights background */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-[130px] pointer-events-none animate-glow-slow-1" />
      <div className="absolute bottom-[10%] right-[-10%] w-[450px] h-[450px] bg-emerald-850/10 rounded-full blur-[110px] pointer-events-none animate-glow-slow-2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Title Pitch */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Scope Portal</span>
          </div>
          <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-none animate-fade-in">
            Let's build systems.
          </h1>
          <p className="text-sm text-gray-400">
            Submit your goals, metrics targets, or SaaS framework specifications below. Our lead software director schedules calls within 8 working hours.
          </p>
        </div>

        {/* Bento Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Card Module 1: Corporate Contacts & Simulated Maps (Left 5 cols) */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in duration-300">
            
            {/* Quick Contacts lists */}
            <div className="p-6 sm:p-8 rounded-[32px] bg-white/5 border border-white/10 space-y-6 backdrop-blur-xl shadow-2xl">
              <h3 className="font-sans font-bold text-xl text-white">
                Verdant Headquarters
              </h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-gray-300">
                <div className="flex items-start space-x-3.5">
                  <Mail className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-400 text-xs uppercase font-mono tracking-wider">Primary Operations</h4>
                    <a href="mailto:muhammadmawiya5@gmail.com" className="hover:text-emerald-400 transition-colors block mt-0.5">
                      muhammadmawiya5@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 border-t border-white/5 pt-4">
                  <MapPin className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-400 text-xs uppercase font-mono tracking-wider">Engineering Desk</h4>
                    <p className="mt-0.5 leading-relaxed text-gray-300">
                      100 Pine Street, Suite 1250<br />
                      San Francisco, California 94111, US
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3.5 border-t border-white/5 pt-4">
                  <Clock className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-sans font-bold text-gray-400 text-xs uppercase font-mono tracking-wider">Operational Hours</h4>
                    <p className="mt-0.5 text-gray-300 leading-normal">
                      Mon – Sat: 08:00 – 19:30 PST<br />
                      Emergency support: 24/7/365
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Google Dark Map Component */}
            <div className="rounded-[32px] border border-white/10 bg-white/5 overflow-hidden relative shadow-2xl backdrop-blur-xl">
              <div className="bg-white/5 px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center space-x-1.5 font-bold text-gray-300 uppercase">
                  <Map className="w-4 h-4 text-emerald-500" />
                  <span>Interactive HQ coordinates</span>
                </span>
                <span className="text-emerald-500 font-bold">37.792, -122.399</span>
              </div>
              
              {/* Custom Dark Grid Pattern acting as physical map layout */}
              <div className="h-44 bg-[#050505] relative flex flex-col justify-center items-center select-none overflow-hidden">
                <div className="absolute inset-0 opacity-15" style={{
                  backgroundImage: 'radial-gradient(circle, #10b981 1.2px, transparent 1.2px)',
                  backgroundSize: '16px 16px'
                }} />
                
                {/* Simulated Street structures */}
                <div className="absolute top-1/2 left-0 right-0 h-4 bg-white/5 border-y border-white/5 transform -translate-y-1/2" />
                <div className="absolute left-1/3 top-0 bottom-0 w-4 bg-white/5 border-x border-white/5" />
                <div className="absolute left-2/3 top-0 bottom-0 w-4 bg-white/5 border-x border-white/5" />

                {/* Pulse Location Radar pin */}
                <div className="absolute left-1/3 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <span className="relative flex h-6 w-6 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_12px_#10b981]" />
                  </span>
                  <div className="bg-[#050505] px-2.5 py-1 text-[10px] font-mono border border-emerald-500/30 rounded mt-1 shadow-md text-[#9ccdbe] uppercase font-bold tracking-wider">
                    Pine St. Suite 1250
                  </div>
                </div>

                <div className="absolute bottom-2 left-4 text-[9px] font-mono text-gray-800">
                  MAP LAYOUT CONFIGURED DIRECTLY FOR PORT 3000 IFRAME
                 </div>
              </div>
            </div>

          </div>

          {/* Card Module 2: Submission Scopes (Right 7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              
              {/* Form title */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div>
                  <h3 className="font-sans font-extrabold text-xl text-white">
                    Request Consultation Scope
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">Please populate all required fields securely.</p>
                </div>
                <Inbox className="w-5 h-5 text-emerald-500" />
              </div>

              {/* Status report nodes */}
              {statusMsg && (
                <div 
                  id="contact-status-report"
                  className={`p-4 rounded-xl border flex items-start space-x-3 text-xs sm:text-sm mb-6 ${
                    isError 
                      ? 'bg-red-500/10 border-red-500/20 text-red-400' 
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {isError ? (
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  )}
                  <div className="space-y-1">
                    <p className="font-bold">{isError ? 'Submission Interrupted' : 'Inquiry Successfully Logged'}</p>
                    <p className="text-xs text-gray-300 leading-normal">{statusMsg}</p>
                  </div>
                </div>
              )}

              {/* Simulated notification status details */}
              {simulatedEmailSent && (
                <div 
                  id="simulated-email-indicator"
                  className="p-3.5 rounded-xl bg-orange-500/5 border border-orange-500/20 text-xs text-orange-300 font-mono space-y-1 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                    <span className="font-bold uppercase tracking-wider text-[10px]">VERDANT SIMULATIVE LOG CONTROL:</span>
                  </div>
                  <p className="text-gray-400 leading-relaxed text-[10px]">
                    Automatic SMTP trigger was generated successfully! An intake alert has been piped to <span className="text-gray-200">muhammadmawiya5@gmail.com</span> detailing your consultation request. Verified status: OK.
                  </p>
                </div>
              )}

              {/* Submission Form core */}
              <form id="secured-contact-form" onSubmit={handleSubmit} className="space-y-5 text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                      Corporate Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Sterling"
                      className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@quantops.io"
                      className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                    Inquiry Subject *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="SaaS platform design / AI workflow audit"
                    className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 px-4 py-3 text-white placeholder-gray-600 focus:outline-none transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase font-mono tracking-widest text-emerald-500 font-bold block">
                    Technical Specifications / Budget *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="We want to automate custom contract indexing, build responsive Stripe tiers... (Include target launch schedules if possible)"
                    className="w-full rounded-xl bg-white/5 border border-white/10 hover:border-white/20 focus:border-emerald-500/60 p-4 text-white placeholder-gray-600 focus:outline-none transition-all font-sans leading-relaxed"
                  />
                </div>

                {/* Action Trigger Submit */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 px-8 py-3.5 rounded-full bg-white hover:bg-emerald-500 text-black hover:text-white font-bold text-sm uppercase transition-all duration-300 shadow-lg cursor-pointer disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-black" />
                        <span className="font-mono text-xs uppercase font-black tracking-wider text-black">SECURE BINDING TO DATABASE...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Architecture Scope</span>
                        <Send className="w-4 h-4 ml-1.5 text-current" />
                      </>
                    )}
                  </button>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
