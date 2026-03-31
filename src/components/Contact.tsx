import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Profile } from '../types';

export default function Contact({ profile }: { profile: Profile | null }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! I will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 grid lg:grid-cols-2 gap-10 md:gap-16">
          <div>
            <h2 className="text-2xl md:text-5xl font-bold mb-6 md:mb-8 text-center lg:text-left">Let's build something <span className="text-primary-accent">extraordinary</span> together.</h2>
            <p className="text-text-secondary text-sm md:text-lg mb-8 md:mb-12 text-center lg:text-left">
              Whether you have a specific project in mind or just want to chat about the latest in tech, I'm always open to new opportunities.
            </p>
 
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary-accent border border-primary-accent/20">
                  <Mail size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest">Email Me</p>
                  <p className="text-base md:text-lg font-medium text-white break-all">ajmainmahi2001@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-neon-highlight/10 rounded-xl md:rounded-2xl flex items-center justify-center text-neon-highlight border border-neon-highlight/20">
                  <Phone size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest">Call Me</p>
                  <p className="text-base md:text-lg font-medium text-white">+8801926349081</p>
                </div>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-primary-accent border border-primary-accent/20">
                  <MapPin size={20} className="md:w-6 md:h-6" />
                </div>
                <div>
                  <p className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest">Location</p>
                  <p className="text-base md:text-lg font-medium text-white">Chattogram, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" required className="w-full bg-bg/50 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-sm md:text-base focus:border-primary-accent outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" required className="w-full bg-bg/50 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-sm md:text-base focus:border-primary-accent outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Subject</label>
              <input type="text" required className="w-full bg-bg/50 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-sm md:text-base focus:border-primary-accent outline-none transition-all" placeholder="Project Inquiry" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Message</label>
              <textarea rows={4} required className="w-full bg-bg/50 border border-white/10 rounded-xl md:rounded-2xl px-4 md:px-6 py-3 md:py-4 text-white text-sm md:text-base focus:border-primary-accent outline-none transition-all resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 md:py-5 bg-primary-accent text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base flex items-center justify-center gap-3 hover:bg-neon-highlight transition-all neon-border">
              Send Message <Send size={18} className="md:w-5 md:h-5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
