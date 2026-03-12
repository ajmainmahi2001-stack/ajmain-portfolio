import { motion } from 'framer-motion';
import { Code2, Database, Globe, Server, Terminal, Cpu, Download } from 'lucide-react';
import { Profile } from '../types';
import { getDirectDriveLink } from '../utils';

export default function Hero({ profile }: { profile: Profile | null }) {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary-accent/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-neon-highlight/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-primary-accent font-medium tracking-widest uppercase mb-4 text-sm">
            Full Stack Developer
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Ajmain <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-neon-highlight">Mahtab</span>
          </h1>
          <p className="text-text-secondary text-lg mb-8 max-w-lg leading-relaxed">
            Crafting robust, scalable, and high-performance web applications with modern technologies. Specializing in end-to-end development from database architecture to pixel-perfect UI.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="px-8 py-4 bg-primary-accent text-white rounded-full font-semibold hover:bg-neon-highlight transition-all neon-border">
              View Projects
            </a>
            <a 
              href={`https://wa.me/${profile?.phone?.replace(/\D/g, '') || '8801926349081'}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 border border-primary-accent/50 text-white rounded-full font-semibold hover:bg-primary-accent/10 transition-all"
            >
              Hire Me
            </a>
            {profile?.resumeUrl && (
              <a 
                href={profile.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white rounded-full font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Download size={18} /> Download CV
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center"
        >
          {/* Floating Icons */}
          <div className="relative w-full aspect-square max-w-md">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-neon-highlight/10 rounded-full border border-primary-accent/20 animate-pulse" />
            
            {/* Center Image/Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 md:w-72 md:h-72 bg-card-bg rounded-full border-2 border-primary-accent/30 flex items-center justify-center animate-float overflow-hidden neon-border">
                {profile?.photoUrl ? (
                  <img 
                    src={getDirectDriveLink(profile.photoUrl)} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Terminal size={80} className="text-primary-accent" />
                )}
              </div>
            </div>

            {/* Orbiting Icons */}
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 bg-card-bg rounded-2xl border border-primary-accent/20">
                <Code2 size={24} className="text-neon-highlight" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-4 bg-card-bg rounded-2xl border border-primary-accent/20">
                <Database size={24} className="text-primary-accent" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-4 bg-card-bg rounded-2xl border border-primary-accent/20">
                <Server size={24} className="text-neon-highlight" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-4 bg-card-bg rounded-2xl border border-primary-accent/20">
                <Globe size={24} className="text-primary-accent" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
