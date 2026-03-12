import { Github, Linkedin, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">AJMAIN<span className="text-primary-accent">.</span></h2>
            <p className="text-text-secondary text-sm">Full Stack Developer & UI/UX Enthusiast</p>
          </div>

          <div className="flex gap-6">
            <a href="https://github.com/ajmain05" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/ajmain05/" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="https://www.facebook.com/ajmain.mahi.1" target="_blank" rel="noopener noreferrer" className="text-text-secondary hover:text-primary-accent transition-colors">
              <Facebook size={24} />
            </a>
          </div>

          <p className="text-text-secondary text-sm">
            © {currentYear} Ajmain Mahtab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
