import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Message sent successfully! I will get back to you soon.');
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card rounded-[3rem] p-8 md:p-16 grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">Let's build something <span className="text-primary-accent">extraordinary</span> together.</h2>
            <p className="text-text-secondary text-lg mb-12">
              Whether you have a specific project in mind or just want to chat about the latest in tech, I'm always open to new opportunities.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary-accent/10 rounded-2xl flex items-center justify-center text-primary-accent border border-primary-accent/20">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Email Me</p>
                  <p className="text-lg font-medium text-white">ajmainmahi2001@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-neon-highlight/10 rounded-2xl flex items-center justify-center text-neon-highlight border border-neon-highlight/20">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Call Me</p>
                  <p className="text-lg font-medium text-white">+8801926349081</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-primary-accent/10 rounded-2xl flex items-center justify-center text-primary-accent border border-primary-accent/20">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest">Location</p>
                  <p className="text-lg font-medium text-white">Dhaka, Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" required className="w-full bg-bg/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary-accent outline-none transition-all" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Email Address</label>
                <input type="email" required className="w-full bg-bg/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary-accent outline-none transition-all" placeholder="john@example.com" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Subject</label>
              <input type="text" required className="w-full bg-bg/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary-accent outline-none transition-all" placeholder="Project Inquiry" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1">Message</label>
              <textarea rows={5} required className="w-full bg-bg/50 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-primary-accent outline-none transition-all resize-none" placeholder="Tell me about your project..."></textarea>
            </div>
            <button type="submit" className="w-full py-5 bg-primary-accent text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-neon-highlight transition-all neon-border">
              Send Message <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
