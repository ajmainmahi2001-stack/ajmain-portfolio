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

      <div className="container mx-auto px-6 flex flex-col-reverse md:grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <h2 className="text-primary-accent font-medium tracking-widest uppercase mb-4 text-xs md:text-sm">
            Full Stack Developer
          </h2>
          <h1 className="text-3xl md:text-7xl font-bold mb-6 leading-tight">
            Ajmain <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-neon-highlight">Mahtab</span>
          </h1>
          <p className="text-text-secondary text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed">
            Crafting robust, scalable, and high-performance web applications with modern technologies. Specializing in end-to-end development from database architecture to pixel-perfect UI.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <a href="#projects" className="px-6 py-3 md:px-8 md:py-4 bg-primary-accent text-white rounded-full text-sm md:text-base font-semibold hover:bg-neon-highlight transition-all neon-border">
              View Projects
            </a>
            <a 
              href={`https://wa.me/${profile?.phone?.replace(/\D/g, '') || '8801926349081'}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-3 md:px-8 md:py-4 border border-primary-accent/50 text-white rounded-full text-sm md:text-base font-semibold hover:bg-primary-accent/10 transition-all"
            >
              Hire Me
            </a>
            {profile?.resumeUrl && (
              <a 
                href={profile.resumeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 text-white rounded-full text-sm md:text-base font-semibold hover:bg-white/10 transition-all flex items-center gap-2"
              >
                <Download size={18} /> CV
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative flex justify-center items-center w-full"
        >
          {/* Floating Icons Container */}
          <div className="relative w-64 h-64 md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-neon-highlight/10 rounded-full border border-primary-accent/20 animate-pulse" />
            
            {/* Center Image/Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 md:w-80 md:h-80 bg-card-bg rounded-full border-2 border-primary-accent/30 flex items-center justify-center animate-float overflow-hidden neon-border">
                {profile?.photoUrl ? (
                  <img 
                    src={getDirectDriveLink(profile.photoUrl)} 
                    alt={profile.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <Terminal size={60} className="text-primary-accent md:w-20 md:h-20" />
                )}
              </div>
            </div>

            {/* Orbiting Icons */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
              className="absolute inset-[-10%] md:inset-[-15%]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 md:p-4 bg-card-bg rounded-xl md:rounded-2xl border border-primary-accent/20 shadow-lg shadow-primary-accent/10">
                <Code2 size={16} className="text-neon-highlight md:w-6 md:h-6" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 md:p-4 bg-card-bg rounded-xl md:rounded-2xl border border-primary-accent/20 shadow-lg shadow-primary-accent/10">
                <Database size={16} className="text-primary-accent md:w-6 md:h-6" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 p-2 md:p-4 bg-card-bg rounded-xl md:rounded-2xl border border-primary-accent/20 shadow-lg shadow-primary-accent/10">
                <Server size={16} className="text-neon-highlight md:w-6 md:h-6" />
              </div>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 p-2 md:p-4 bg-card-bg rounded-xl md:rounded-2xl border border-primary-accent/20 shadow-lg shadow-primary-accent/10">
                <Globe size={16} className="text-primary-accent md:w-6 md:h-6" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
