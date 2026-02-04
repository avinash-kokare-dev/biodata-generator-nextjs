
"use client";
import React, { useState } from 'react';
import { Button } from '../../components/Button';

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 5000);
    setFormState({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="bg-white rounded-[60px] shadow-2xl overflow-hidden border border-stone-200 flex flex-col lg:flex-row">
          
          {/* Contact Info Sidebar */}
          <div className="lg:w-1/3 bg-slate-950 text-white p-12 sm:p-20 relative overflow-hidden flex flex-col justify-between">
            <div className="relative z-10">
              <span className="text-amber-500 font-script text-3xl mb-6 block">Get in touch</span>
              <h1 className="text-4xl sm:text-5xl font-serif font-bold italic mb-8">Let’s connect.</h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-12">
                Have questions about our templates or need help crafting your story? We're here to assist you.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Email Us</p>
                    <p className="font-bold">hello@eternalbond.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Support Hours</p>
                    <p className="font-bold">Mon - Sat: 9am - 7pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Background pattern */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[80px] -mr-32 -mb-32"></div>
          </div>

          {/* Contact Form */}
          <div className="lg:w-2/3 p-12 sm:p-20 bg-white">
            {isSent ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-5xl mb-8">✓</div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 italic">Message Sent!</h2>
                <p className="text-slate-500 max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setIsSent(false)} className="mt-8 text-rose-600 font-black uppercase text-xs tracking-widest hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Your Name</label>
                    <input 
                      required
                      type="text" 
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      placeholder="e.g. Aarav Malhotra" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Email Address</label>
                    <input 
                      required
                      type="email" 
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      placeholder="hello@example.com" 
                      className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-slate-400 tracking-widest">Your Message</label>
                  <textarea 
                    required
                    rows={6} 
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    placeholder="Tell us how we can help you..." 
                    className="w-full bg-stone-50 border border-stone-200 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-rose-200 transition-all font-medium resize-none"
                  />
                </div>
                <Button type="submit" variant="primary" size="lg" className="w-full py-5 rounded-2xl shadow-xl shadow-rose-900/10">
                  Send Message
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
